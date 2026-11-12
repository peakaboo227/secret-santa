import "server-only";
import { and, eq } from "drizzle-orm";
import {
  checkDetails,
  checkHost,
  clean,
  earliestToday,
  hasErrors,
  MAX_LENGTH,
  type DetailsErrors,
  type HostErrors,
} from "@/lib/create-group";
import { isOwner } from "./access";
import { makeGameCode, makePin } from "./crypto";
import { db, schema } from "./db";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Who may create a group: in v1, only a device that opened the owner link. */
export async function canCreateGroup(): Promise<boolean> {
  return isOwner();
}

export type SaveGroupInput = {
  /** Set when the host went back from the pin step: update that group instead of making a new one. */
  groupId?: string;
  groupName: string;
  budget: string;
  giftDay: string;
  hostName: string;
  playing: boolean;
};

export type SaveGroupResult =
  | { ok: true; groupId: string; pin: string }
  | { ok: false; errors: DetailsErrors & HostErrors };

/**
 * Saves a new group with the host as its first name, and makes the host's PIN.
 * Returns only the group id and the host's own PIN, nothing else from the database.
 */
export async function saveGroup(input: SaveGroupInput): Promise<SaveGroupResult | null> {
  if (!(await canCreateGroup())) return null;

  const errors = { ...checkDetails(input, earliestToday()), ...checkHost(input.hostName) };
  if (hasErrors(errors)) return { ok: false, errors };

  const group = {
    name: clean(input.groupName, MAX_LENGTH.groupName),
    budget: clean(input.budget, MAX_LENGTH.budget),
    giftDay: input.giftDay,
  };
  const host = { realName: clean(input.hostName, MAX_LENGTH.hostName), playing: !!input.playing };

  if (input.groupId && UUID.test(input.groupId)) {
    const existing = await db()
      .select({ pin: schema.members.pin, stage: schema.groups.stage })
      .from(schema.groups)
      .innerJoin(schema.members, and(eq(schema.members.groupId, schema.groups.id), eq(schema.members.isHost, true)))
      .where(eq(schema.groups.id, input.groupId))
      .limit(1);
    const row = existing[0];
    if (row && row.stage === "setup") {
      await db().batch([
        db().update(schema.groups).set(group).where(eq(schema.groups.id, input.groupId)),
        db()
          .update(schema.members)
          .set(host)
          .where(and(eq(schema.members.groupId, input.groupId), eq(schema.members.isHost, true))),
      ]);
      return { ok: true, groupId: input.groupId, pin: row.pin };
    }
  }

  const groupId = crypto.randomUUID();
  const pin = makePin();
  await db().batch([
    db().insert(schema.groups).values({ id: groupId, gameCode: makeGameCode(), ...group }),
    db().insert(schema.members).values({ groupId, isHost: true, pin, ...host }),
  ]);
  return { ok: true, groupId, pin };
}

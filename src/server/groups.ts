import "server-only";
import { and, eq, isNull } from "drizzle-orm";
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
import { isPetSlug } from "@/components/boo/Pet";
import { pickPetName } from "@/lib/pet-names";
import { getDevice, isOwner, rememberDevice } from "./access";
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
      .select({ pin: schema.members.pin, stage: schema.groups.stage, joinedAt: schema.members.joinedAt })
      .from(schema.groups)
      .innerJoin(schema.members, and(eq(schema.members.groupId, schema.groups.id), eq(schema.members.isHost, true)))
      .where(eq(schema.groups.id, input.groupId))
      .limit(1);
    const row = existing[0];
    if (row && row.stage === "setup" && !row.joinedAt) {
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

/** A group the creator is still setting up: saved, but the host hasn't chosen a pet yet. */
export type GroupDraft = {
  groupId: string;
  groupName: string;
  budget: string;
  giftDay: string;
  hostName: string;
  playing: boolean;
  pin: string;
};

async function hostRow(groupId: string) {
  if (!UUID.test(groupId)) return null;
  const rows = await db()
    .select({
      memberId: schema.members.id,
      groupName: schema.groups.name,
      budget: schema.groups.budget,
      giftDay: schema.groups.giftDay,
      gameCode: schema.groups.gameCode,
      stage: schema.groups.stage,
      hostName: schema.members.realName,
      playing: schema.members.playing,
      pin: schema.members.pin,
      joinedAt: schema.members.joinedAt,
    })
    .from(schema.groups)
    .innerJoin(schema.members, and(eq(schema.members.groupId, schema.groups.id), eq(schema.members.isHost, true)))
    .where(eq(schema.groups.id, groupId))
    .limit(1);
  return rows[0] ?? null;
}

/** Where a host goes once their pet is chosen: meet your pet if playing, otherwise the manage page. */
function afterPet(row: { playing: boolean; gameCode: string }, groupId: string): string {
  return row.playing ? `/g/${row.gameCode}/meet` : `/manage/${groupId}`;
}

/**
 * The creator's own unfinished group, to reopen create group at "your pin" (back from choose your pet).
 * Only for the device that may create groups, and only until the host has chosen a pet.
 */
export async function getGroupDraft(groupId: string): Promise<GroupDraft | null> {
  if (!(await canCreateGroup())) return null;
  const row = await hostRow(groupId);
  if (!row || row.stage !== "setup" || row.joinedAt) return null;
  return {
    groupId,
    groupName: row.groupName,
    budget: row.budget ?? "",
    giftDay: row.giftDay ?? "",
    hostName: row.hostName,
    playing: row.playing,
    pin: row.pin,
  };
}

export type HostPetStep =
  | { state: "choose"; groupName: string; budget: string; giftDay: string }
  /** The host already has a pet: send them on. */
  | { state: "done"; next: string };

/** What the host's choose your pet screen needs: the group header, or where to go if a pet is already chosen. */
export async function getHostPetStep(groupId: string): Promise<HostPetStep | null> {
  if (!(await canCreateGroup())) return null;
  const row = await hostRow(groupId);
  if (!row) return null;
  if (row.joinedAt) return { state: "done", next: afterPet(row, groupId) };
  return { state: "choose", groupName: row.groupName, budget: row.budget ?? "", giftDay: row.giftDay ?? "" };
}

/**
 * The host chooses their pet right after creating the group: saves the pet, gives them a pet name,
 * and remembers this device as the host. Returns where to go next, or null if not allowed.
 */
export async function chooseHostPet(groupId: string, pet: string): Promise<string | null> {
  if (!(await canCreateGroup()) || !isPetSlug(pet)) return null;
  const row = await hostRow(groupId);
  if (!row) return null;
  if (row.joinedAt) return afterPet(row, groupId);

  const taken = await db()
    .select({ petName: schema.members.petName })
    .from(schema.members)
    .where(eq(schema.members.groupId, groupId));
  const petName = pickPetName(taken.flatMap((m) => (m.petName ? [m.petName] : [])));
  if (!petName) return null;

  const updated = await db()
    .update(schema.members)
    .set({ pet, petName, joinedAt: new Date() })
    .where(and(eq(schema.members.id, row.memberId), isNull(schema.members.joinedAt)))
    .returning({ id: schema.members.id });
  if (updated.length === 0) return afterPet(row, groupId);

  await rememberDevice({ memberId: row.memberId, groupId });
  return afterPet(row, groupId);
}

export type MeetPet = {
  groupName: string;
  budget: string;
  giftDay: string;
  /** The member's own pet and pet name. Never anyone else's. */
  pet: string;
  petName: string;
};

/** Meet your pet: this device's own pet in the group behind this game code, or null. */
export async function getMeetPet(gameCode: string): Promise<MeetPet | null> {
  const device = await getDevice();
  if (!device) return null;
  const rows = await db()
    .select({
      groupName: schema.groups.name,
      budget: schema.groups.budget,
      giftDay: schema.groups.giftDay,
      pet: schema.members.pet,
      petName: schema.members.petName,
    })
    .from(schema.members)
    .innerJoin(schema.groups, eq(schema.groups.id, schema.members.groupId))
    .where(and(eq(schema.members.id, device.memberId), eq(schema.groups.gameCode, gameCode)))
    .limit(1);
  const row = rows[0];
  if (!row || !row.pet || !row.petName) return null;
  return { groupName: row.groupName, budget: row.budget ?? "", giftDay: row.giftDay ?? "", pet: row.pet, petName: row.petName };
}

export type InstructionsPage = {
  groupName: string;
  budget: string;
  giftDay: string;
  /** Where "continue" goes: the manage page for the host, the member's own space for everyone else. */
  next: { kind: "manage"; href: string } | { kind: "wishlist"; href: string };
};

/** Instructions, first time: the group header and where this device goes next. Members of the group only. */
export async function getInstructionsPage(gameCode: string): Promise<InstructionsPage | null> {
  const device = await getDevice();
  if (!device) return null;
  const rows = await db()
    .select({ id: schema.groups.id, name: schema.groups.name, budget: schema.groups.budget, giftDay: schema.groups.giftDay })
    .from(schema.groups)
    .where(and(eq(schema.groups.id, device.groupId), eq(schema.groups.gameCode, gameCode)))
    .limit(1);
  const group = rows[0];
  if (!group) return null;
  return {
    groupName: group.name,
    budget: group.budget ?? "",
    giftDay: group.giftDay ?? "",
    next: device.isHost
      ? { kind: "manage", href: `/manage/${group.id}` }
      : { kind: "wishlist", href: `/g/${gameCode}` },
  };
}

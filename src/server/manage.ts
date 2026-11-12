import "server-only";
import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { canManageGroup, getDevice, isOwner } from "./access";
import { db, schema } from "./db";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DRAWN_STAGES = new Set(["drawn", "exchange", "revealed"]);

export type ManagedGroup = { id: string; name: string; names: number; joined: number; drawn: boolean };

export type Home = {
  /** In v1 only a device that opened the owner link may create groups. */
  canCreate: boolean;
  /** The groups this device manages: every group for the owner, its own group for a host. */
  groups: ManagedGroup[];
};

/** What the app home shows this device. Counts only, never names, characters or pairings. */
export async function getHome(): Promise<Home> {
  const owner = await isOwner();
  const device = owner ? null : await getDevice();
  if (!owner && !(device && device.isHost)) return { canCreate: false, groups: [] };

  const groups = await db()
    .select({ id: schema.groups.id, name: schema.groups.name, stage: schema.groups.stage, createdAt: schema.groups.createdAt })
    .from(schema.groups)
    .where(owner ? undefined : eq(schema.groups.id, device!.groupId))
    .orderBy(schema.groups.createdAt);
  if (groups.length === 0) return { canCreate: owner, groups: [] };

  const members = await db()
    .select({ groupId: schema.members.groupId, joinedAt: schema.members.joinedAt })
    .from(schema.members)
    .where(
      inArray(
        schema.members.groupId,
        groups.map((g) => g.id),
      ),
    );

  return {
    canCreate: owner,
    groups: groups.map((g) => {
      const mine = members.filter((m) => m.groupId === g.id);
      return {
        id: g.id,
        name: g.name,
        names: mine.length,
        joined: mine.filter((m) => m.joinedAt).length,
        drawn: DRAWN_STAGES.has(g.stage),
      };
    }),
  };
}

export type ManageName = {
  id: string;
  realName: string;
  /** This row is the device's own name. */
  you: boolean;
  /** false = on the list but left out of the draw (a host who isn't playing). */
  playing: boolean;
  joined: boolean;
  hasWishlist: boolean;
};

export type ManagePage = {
  groupName: string;
  budget: string;
  giftDay: string;
  /** The game link without "https://", as shown, and in full, as copied. */
  gameLink: { shown: string; full: string };
  names: ManageName[];
};

async function appAddress(): Promise<string> {
  const fromEnv = process.env.APP_URL?.replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  return `${h.get("x-forwarded-proto") ?? "https"}://${host}`;
}

/**
 * The manage page for a device that may manage this group (its host, or the owner).
 * Per name it returns only: the real name, joined yes/no, wishlist yes/no. Never characters,
 * character names, wishlist content, PINs or pairings.
 */
export async function getManagePage(groupId: string): Promise<ManagePage | null> {
  if (!UUID.test(groupId) || !(await canManageGroup(groupId))) return null;

  const groups = await db()
    .select({
      name: schema.groups.name,
      budget: schema.groups.budget,
      giftDay: schema.groups.giftDay,
      gameCode: schema.groups.gameCode,
    })
    .from(schema.groups)
    .where(eq(schema.groups.id, groupId))
    .limit(1);
  const group = groups[0];
  if (!group) return null;

  const [members, wishOwners, device, address] = await Promise.all([
    db()
      .select({
        id: schema.members.id,
        realName: schema.members.realName,
        isHost: schema.members.isHost,
        playing: schema.members.playing,
        joinedAt: schema.members.joinedAt,
        createdAt: schema.members.createdAt,
      })
      .from(schema.members)
      .where(eq(schema.members.groupId, groupId))
      .orderBy(schema.members.createdAt),
    db().selectDistinct({ memberId: schema.wishes.memberId }).from(schema.wishes).where(eq(schema.wishes.groupId, groupId)),
    getDevice(),
    appAddress(),
  ]);
  const withWishes = new Set(wishOwners.map((w) => w.memberId));
  const full = `${address}/g/${group.gameCode}`;

  return {
    groupName: group.name,
    budget: group.budget ?? "",
    giftDay: group.giftDay ?? "",
    gameLink: { shown: full.replace(/^https?:\/\//, ""), full },
    names: members.map((m) => ({
      id: m.id,
      realName: m.realName,
      you: device?.memberId === m.id,
      playing: m.playing,
      joined: !!m.joinedAt,
      hasWishlist: withWishes.has(m.id),
    })),
  };
}

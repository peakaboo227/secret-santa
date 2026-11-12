import "server-only";
import { and, eq, isNull } from "drizzle-orm";
import { cookies } from "next/headers";
import { hashToken, ownerCookieValue, randomToken, safeEqual } from "./crypto";
import { db, schema } from "./db";

/**
 * The server access layer. Every read or write of game data starts here:
 * first work out who the device is, then what that role may see, then return only those fields.
 */

export const DEVICE_COOKIE = "ss_device";
export const OWNER_COOKIE = "ss_owner";

export type Device = {
  memberId: string;
  groupId: string;
  isHost: boolean;
  playing: boolean;
};

/** Who is this device? A member of exactly one group, or null. */
export async function getDevice(): Promise<Device | null> {
  const token = (await cookies()).get(DEVICE_COOKIE)?.value;
  if (!token) return null;
  const rows = await db()
    .select({
      memberId: schema.members.id,
      groupId: schema.members.groupId,
      isHost: schema.members.isHost,
      playing: schema.members.playing,
    })
    .from(schema.deviceSessions)
    .innerJoin(schema.members, eq(schema.members.id, schema.deviceSessions.memberId))
    .where(and(eq(schema.deviceSessions.tokenHash, hashToken(token)), isNull(schema.deviceSessions.revokedAt)))
    .limit(1);
  return rows[0] ?? null;
}

/** Remember this device as a member for the whole game: a random token in a cookie, only its hash stored. */
export async function rememberDevice(member: { memberId: string; groupId: string }): Promise<void> {
  const token = randomToken();
  await db().insert(schema.deviceSessions).values({ ...member, tokenHash: hashToken(token) });
  (await cookies()).set(DEVICE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
}

/**
 * Does this device hold the owner link? The owner may manage every group, as a backup,
 * but is never a player: owner access never reveals pets, pairings or wishlists by itself.
 */
export async function isOwner(): Promise<boolean> {
  const secret = process.env.OWNER_LINK_SECRET;
  if (!secret) return false;
  const value = (await cookies()).get(OWNER_COOKIE)?.value;
  return !!value && safeEqual(value, ownerCookieValue(secret));
}

/** Can this device manage this group? Its host, or the owner. */
export async function canManageGroup(groupId: string): Promise<boolean> {
  if (await isOwner()) return true;
  const device = await getDevice();
  return !!device && device.isHost && device.groupId === groupId;
}

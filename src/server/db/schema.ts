// Database schema. Groups are the root: every other row belongs to exactly one group,
// so more groups and hosts can come later without a redesign.
// Change it, then run `npm run db:generate` to write a migration into drizzle/.
// Never use `drizzle-kit push`.
import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").primaryKey().defaultRandom();
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const groupRef = () =>
  uuid("group_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" });

/** Where a group is in its season. Privacy rules key off this (see CLAUDE.md). */
export const groupStage = pgEnum("group_stage", ["setup", "joining", "drawn", "exchange", "revealed"]);
export const santaStatus = pgEnum("santa_status", ["not_viewed", "viewed", "preparing"]);
export const boardOutcome = pgEnum("board_outcome", ["waiting", "handed", "skipped"]);

export const groups = pgTable("groups", {
  id: id(),
  name: text("name").notNull(),
  /** Random code in the game link: /g/<code>. Not guessable. */
  gameCode: text("game_code").notNull().unique(),
  /** Free text so the host can write "200k" or "about 10 euro". */
  budget: text("budget"),
  giftDay: date("gift_day"),
  stage: groupStage("stage").notNull().default("setup"),
  /** Set when the gift exchange starts. Before this the host sees no pets and no pairings. */
  exchangeStartedAt: timestamp("exchange_started_at", { withTimezone: true }),
  createdAt: createdAt(),
});

export const members = pgTable(
  "members",
  {
    id: id(),
    groupId: groupRef(),
    /** Exactly as the host typed it. Never shown to the member's santa. */
    realName: text("real_name").notNull(),
    /** scrypt hash, never the PIN itself. Null until the member joins. */
    pinHash: text("pin_hash"),
    pet: text("pet"),
    petName: text("pet_name"),
    isHost: boolean("is_host").notNull().default(false),
    /** false = on the host's list but not in the draw. */
    playing: boolean("playing").notNull().default(true),
    joinedAt: timestamp("joined_at", { withTimezone: true }),
    failedPinAttempts: integer("failed_pin_attempts").notNull().default(0),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("members_group_real_name_uq").on(t.groupId, t.realName),
    // One pet per group, so a pet is enough to tell members apart. Nulls (not joined yet) don't clash.
    uniqueIndex("members_group_pet_uq").on(t.groupId, t.pet),
    index("members_group_idx").on(t.groupId),
  ],
);

/** One direction: giver may not draw receiver. Add two rows for "neither way". */
export const exclusions = pgTable(
  "exclusions",
  {
    id: id(),
    groupId: groupRef(),
    giverId: uuid("giver_id").notNull().references(() => members.id, { onDelete: "cascade" }),
    receiverId: uuid("receiver_id").notNull().references(() => members.id, { onDelete: "cascade" }),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("exclusions_pair_uq").on(t.giverId, t.receiverId),
    check("exclusions_not_self", sql`${t.giverId} <> ${t.receiverId}`),
  ],
);

export const wishes = pgTable(
  "wishes",
  {
    id: id(),
    groupId: groupRef(),
    memberId: uuid("member_id").notNull().references(() => members.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    link: text("link"),
    position: integer("position").notNull().default(0),
    createdAt: createdAt(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("wishes_member_idx").on(t.memberId)],
);

/** The draw. One row per giver; santa status is the giver's progress on their gift. */
export const pairings = pgTable(
  "pairings",
  {
    id: id(),
    groupId: groupRef(),
    giverId: uuid("giver_id").notNull().references(() => members.id, { onDelete: "cascade" }),
    receiverId: uuid("receiver_id").notNull().references(() => members.id, { onDelete: "cascade" }),
    santaStatus: santaStatus("santa_status").notNull().default("not_viewed"),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("pairings_group_giver_uq").on(t.groupId, t.giverId),
    uniqueIndex("pairings_group_receiver_uq").on(t.groupId, t.receiverId),
    check("pairings_not_self", sql`${t.giverId} <> ${t.receiverId}`),
  ],
);

/** A remembered device. The cookie holds a random token; only its SHA-256 hash is stored. */
export const deviceSessions = pgTable(
  "device_sessions",
  {
    id: id(),
    groupId: groupRef(),
    memberId: uuid("member_id").notNull().references(() => members.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    createdAt: createdAt(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (t) => [index("device_sessions_member_idx").on(t.memberId)],
);

/** Exchange day: one row per receiver, in the order gifts are handed out. */
export const exchangeBoard = pgTable(
  "exchange_board",
  {
    id: id(),
    groupId: groupRef(),
    receiverId: uuid("receiver_id").notNull().references(() => members.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    outcome: boardOutcome("outcome").notNull().default("waiting"),
    /** Who the receiver guesses their santa is. */
    guessMemberId: uuid("guess_member_id").references(() => members.id, { onDelete: "set null" }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("exchange_board_group_receiver_uq").on(t.groupId, t.receiverId),
    uniqueIndex("exchange_board_group_position_uq").on(t.groupId, t.position),
  ],
);

/** How far the group's reveal has gone: how many santas are unmasked so far. */
export const revealProgress = pgTable("reveal_progress", {
  groupId: uuid("group_id")
    .primaryKey()
    .references(() => groups.id, { onDelete: "cascade" }),
  revealedCount: integer("revealed_count").notNull().default(0),
  startedAt: timestamp("started_at", { withTimezone: true }),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

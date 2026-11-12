"use server";

import { saveGroup, type SaveGroupResult } from "@/server/groups";

const text = (value: unknown) => (typeof value === "string" ? value : "");

/** Create group, step 2 "continue": saves the group and returns the host's PIN. */
export async function saveGroupAction(input: unknown): Promise<SaveGroupResult> {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const result = await saveGroup({
    groupId: text(raw.groupId) || undefined,
    groupName: text(raw.groupName),
    budget: text(raw.budget),
    giftDay: text(raw.giftDay),
    hostName: text(raw.hostName),
    playing: raw.playing === true,
  });
  if (!result) throw new Error("not allowed");
  return result;
}

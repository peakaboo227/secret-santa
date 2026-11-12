"use server";

import { redirect } from "next/navigation";
import { chooseHostPet, saveGroup, type SaveGroupResult } from "@/server/groups";

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

/** Choose your pet (host): saves the pet, remembers this device as the host, and moves on. */
export async function chooseHostPetAction(groupId: unknown, pet: unknown): Promise<void> {
  const next = await chooseHostPet(text(groupId), text(pet));
  if (!next) throw new Error("not allowed");
  redirect(next);
}

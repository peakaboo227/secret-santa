// The pet names the app hands out. Each is used once per group; two people can share a pet,
// so the pet name is what tells them apart. v1 starts with the prototype's ten; the product owner
// will grow the list to 30+.
export const PET_NAMES = ["bánh bao", "mochi", "xôi", "bơ", "cốm", "kem", "mít", "na", "su", "tép"] as const;

/** A random pet name nobody in the group has yet, or null when every name is taken. */
export function pickPetName(taken: readonly string[], random: () => number = Math.random): string | null {
  const free = PET_NAMES.filter((name) => !taken.includes(name));
  if (free.length === 0) return null;
  return free[Math.floor(random() * free.length)] ?? null;
}

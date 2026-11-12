import { describe, expect, it } from "vitest";
import { formatGiftDay, groupInfoLine } from "./format";
import { PET_NAMES, pickPetName } from "./pet-names";

describe("pet names", () => {
  it("never gives a name someone in the group already has", () => {
    const taken: string[] = [];
    for (let i = 0; i < PET_NAMES.length; i++) {
      const name = pickPetName(taken);
      expect(name).not.toBeNull();
      expect(taken).not.toContain(name);
      taken.push(name!);
    }
    expect(pickPetName(taken)).toBeNull();
  });

  it("keeps pet names lowercase and unique", () => {
    expect(new Set(PET_NAMES).size).toBe(PET_NAMES.length);
    for (const name of PET_NAMES) expect(name).toBe(name.toLowerCase());
  });
});

describe("group header", () => {
  it("shows the gift day as day and short month", () => {
    expect(formatGiftDay("2026-12-24")).toBe("24 dec");
    expect(formatGiftDay("2027-01-05")).toBe("5 jan");
    expect(groupInfoLine("300k", "2026-12-24")).toBe("budget 300k · gift day 24 dec");
  });
});

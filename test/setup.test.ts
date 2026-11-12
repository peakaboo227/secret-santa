import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { copy } from "@/copy";
import { hashPin, hashToken, verifyPin } from "@/server/crypto";
import { buildComponentsCss, SOURCE, TARGET } from "../scripts/sync-design-system.mjs";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("project setup", () => {
  it("keeps all ui text lowercase", () => {
    for (const text of strings(copy)) expect(text).toBe(text.toLowerCase());
  });

  it("keeps the component css in sync with the design system, without google fonts", () => {
    const expected = buildComponentsCss(readFileSync(SOURCE, "utf8"));
    const actual = readFileSync(TARGET, "utf8");
    expect(actual).toBe(expected);
    expect(actual).not.toMatch(/fonts\.googleapis|https?:\/\//);
  });

  it("hashes pins and never stores them in plain text", async () => {
    const stored = await hashPin("0427");
    expect(stored).not.toContain("0427");
    expect(await verifyPin("0427", stored)).toBe(true);
    expect(await verifyPin("0428", stored)).toBe(false);
  });

  it("hashes device tokens", () => {
    expect(hashToken("abc")).toBe(hashToken("abc"));
    expect(hashToken("abc")).not.toBe("abc");
  });
});

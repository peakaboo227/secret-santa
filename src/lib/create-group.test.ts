import { describe, expect, it } from "vitest";
import { checkDetails, checkHost, earliestToday } from "./create-group";

const ok = { groupName: "christmas 2026", budget: "300k", giftDay: "2026-12-24" };

describe("create group rules", () => {
  it("needs a name, a budget and a gift day", () => {
    expect(checkDetails(ok, "2026-11-12")).toEqual({});
    expect(checkDetails({ groupName: " ", budget: "", giftDay: "" }, "2026-11-12")).toEqual({
      groupName: true,
      budget: true,
      giftDay: "empty",
    });
  });

  it("refuses a gift day in the past, but allows today", () => {
    expect(checkDetails({ ...ok, giftDay: "2026-11-11" }, "2026-11-12").giftDay).toBe("past");
    expect(checkDetails({ ...ok, giftDay: "2026-11-12" }, "2026-11-12")).toEqual({});
    expect(checkDetails({ ...ok, giftDay: "2026-02-30" }, "2026-01-01").giftDay).toBe("empty");
  });

  it("on the server, only refuses a day that is over everywhere", () => {
    expect(earliestToday(new Date("2026-11-12T05:00:00Z"))).toBe("2026-11-11");
    expect(earliestToday(new Date("2026-11-12T13:00:00Z"))).toBe("2026-11-12");
  });

  it("needs the host's name", () => {
    expect(checkHost("thảo")).toEqual({});
    expect(checkHost("  ")).toEqual({ hostName: true });
  });
});

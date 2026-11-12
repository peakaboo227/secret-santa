import { copy, fill } from "@/copy";

/** "2026-12-24" -> "24 dec", as the group header shows the gift day. */
export function formatGiftDay(isoDate: string): string {
  const [, month, day] = isoDate.split("-").map(Number);
  return `${day} ${copy.months[(month ?? 1) - 1]}`;
}

/** The line under the group name: "budget 300k · gift day 24 dec". */
export function groupInfoLine(budget: string, giftDay: string): string {
  return fill(copy.group.info, { budget, day: formatGiftDay(giftDay) });
}

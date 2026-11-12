// Rules for the create group form (H1), shared by the browser (to show errors at once)
// and the server (which checks again before saving). No database, no secrets.

/** Longest text the form accepts, so a stray paste can't fill the screen. */
export const MAX_LENGTH = { groupName: 60, budget: 40, hostName: 40 } as const;

export type DetailsInput = { groupName: string; budget: string; giftDay: string };
export type DetailsErrors = { groupName?: true; budget?: true; giftDay?: "empty" | "past" };
export type HostErrors = { hostName?: true };

/** Today as YYYY-MM-DD in the device's own time zone. */
export function localToday(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * The earliest "today" anywhere on earth (UTC-12), as YYYY-MM-DD. The server doesn't know the host's
 * time zone, so it only refuses a day that is already over everywhere; the browser checks the exact local day.
 */
export function earliestToday(now = new Date()): string {
  return new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/** Step 1: group name, budget and gift day are required; gift day can't be before `today`. */
export function checkDetails(input: DetailsInput, today: string): DetailsErrors {
  const errors: DetailsErrors = {};
  if (!input.groupName.trim()) errors.groupName = true;
  if (!input.budget.trim()) errors.budget = true;
  if (!input.giftDay) errors.giftDay = "empty";
  else if (!isRealDate(input.giftDay)) errors.giftDay = "empty";
  else if (input.giftDay < today) errors.giftDay = "past";
  return errors;
}

/** Step 2: the host's own name is required. */
export function checkHost(hostName: string): HostErrors {
  return hostName.trim() ? {} : { hostName: true };
}

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}

/** Fits a value to its maximum length after trimming, as the server stores it. */
export function clean(value: string, max: number): string {
  return value.trim().slice(0, max);
}

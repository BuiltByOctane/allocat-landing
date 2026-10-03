/**
 * Where the wallet strip stands at each chapter. The balance is the story's spine:
 * it drains through the leak, resets on the rewind, and ends with nothing unaccounted for.
 * Sample numbers only.
 */
export const BEATS = {
  hero: { day: 1, amount: 62000, label: "just landed" },
  leak: { day: 12, amount: 18400, label: "left, somehow" },
  question: { day: 18, amount: 3150, label: "left. Spent on what?" },
  rewind: { day: 1, amount: 0, label: "left to assign" },
  sms: { day: 9, amount: 7651, label: "left for food" },
  learn: { day: 15, amount: 6890, label: "left for food" },
  nudge: { day: 24, amount: 420, label: "left for fun" },
  picture: { day: 27, amount: 15000, label: "saved this month" },
  calm: { day: 30, amount: 0, label: "unaccounted for" },
} as const;

export type BeatId = keyof typeof BEATS;
export const MONTH_DAYS = 30;

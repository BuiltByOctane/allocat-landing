/** Sample-money formatter for the story fragments: ₹62,000 (Indian digit grouping). */
export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

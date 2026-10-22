/**
 * iOS auto-tracking waitlist signup → allocat-web /api/waitlist.
 *
 * Unlike the funnel beacon this is a real request the visitor waits on, so it
 * reports failure. The body is sent as text/plain to keep it a CORS-simple
 * request (no preflight), same as the beacon.
 */

// The endpoint is public, so a default keeps the form working on a deploy whose
// build env was never given VITE_WAITLIST_ENDPOINT.
const ENDPOINT =
  (import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined) || "https://allocat.xyz/api/waitlist";

export type WaitlistPreference = "native" | "web" | "either";
export type WaitlistSource = "cta" | "home_section";

export const PREFERENCE_OPTIONS: Array<{ value: WaitlistPreference; label: string }> = [
  { value: "native", label: "I need a native App Store app" },
  { value: "web", label: "A web app is fine if it auto-tracks" },
  { value: "either", label: "Either works for me" },
];

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: "invalid_email" | "invalid_preference" | "rate_limited" | "network" };

function platform(): string {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) {
    return "ios";
  }
  return "desktop";
}

export async function joinWaitlist(input: {
  email: string;
  preference: WaitlistPreference;
  source: WaitlistSource;
  /** Honeypot value; real visitors leave it empty. */
  website?: string;
}): Promise<WaitlistResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ ...input, platform: platform() }),
    });
    if (res.ok) return { ok: true };
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    if (body?.error === "invalid_email" || body?.error === "invalid_preference" || body?.error === "rate_limited") {
      return { ok: false, error: body.error };
    }
    return { ok: false, error: "network" };
  } catch {
    return { ok: false, error: "network" };
  }
}

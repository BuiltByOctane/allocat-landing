/**
 * Anonymous funnel beacon.
 *
 * The landing site had no analytics at all, which meant no way to tell whether
 * anyone who reads the page actually goes to the Play Store. This sends the
 * minimum needed to answer that: an event name, a coarse platform, the path and
 * the referrer. No cookies, no ids, no third-party script, nothing that can be
 * joined back to a person — the receiving endpoint (allocat-web /api/track)
 * reduces the referrer to a hostname and never stores an IP.
 *
 * Beacons are strictly fire-and-forget: every failure path is a silent no-op, and
 * nothing here may ever delay or block a navigation.
 */

const ENDPOINT = import.meta.env.VITE_TRACK_ENDPOINT as string | undefined;

export type TrackEvent =
  | "page_view"
  | "cta_play_click"
  | "cta_login_click"
  | "pwa_ios_help"
  | "cta_waitlist_open"
  | "waitlist_join";

function platform(): string {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) {
    return "ios";
  }
  return "desktop";
}

export function track(event: TrackEvent): void {
  if (!ENDPOINT || typeof window === "undefined" || !navigator.sendBeacon) return;
  try {
    // text/plain keeps sendBeacon a CORS-simple request: a preflight would be
    // dropped when the page is unloading and the event lost.
    const body = new Blob(
      [
        JSON.stringify({
          event,
          platform: platform(),
          path: window.location.pathname,
          referrer: document.referrer || null,
        }),
      ],
      { type: "text/plain" },
    );
    navigator.sendBeacon(ENDPOINT, body);
  } catch {
    /* never let analytics break a click */
  }
}

/** Ready-made click handler: `onClick={trackClick("cta_play_click")}`. */
export function trackClick(event: TrackEvent) {
  return () => track(event);
}

const SESSION_KEY = "allocat-landing-view";

/** One page_view per browser session, so a refresh-happy reader counts once. */
export function trackPageViewOnce(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Private mode / storage blocked — still worth counting the view.
  }
  track("page_view");
}

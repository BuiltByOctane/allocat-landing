import { useEffect, useState } from "react";

export type Platform = "android" | "ios" | "desktop";

/**
 * Detects the visitor's platform from the user-agent so download CTAs can adapt:
 * Android → Play Store, iOS → PWA install, desktop → both.
 *
 * Defaults to "desktop" until mounted (SSR/first-paint safe).
 */
export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      setPlatform("android");
      return;
    }
    // iPhone/iPod/iPad — plus iPadOS 13+, which reports a Mac UA but is touch-capable.
    const isIOS =
      /iphone|ipad|ipod/i.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    if (isIOS) {
      setPlatform("ios");
      return;
    }
    setPlatform("desktop");
  }, []);

  return platform;
}

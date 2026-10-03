import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface SceneOptions {
  /** Element pinned while the timeline scrubs (desktop only). Omit for no pin. */
  pin?: RefObject<HTMLElement>;
  /** Scroll distance the scrub spans while pinned. */
  end?: string;
}

/**
 * One story scene. Build the timeline with `from()`/`fromTo()` so the server-rendered
 * markup is the finished state: reduced-motion visitors (and no-JS) simply see that.
 *
 * - desktop: pinned and scrubbed by scroll
 * - mobile:  plays once when the scene scrolls into view (no pinning on small screens)
 */
export function useScene(
  root: RefObject<HTMLElement>,
  build: (tl: gsap.core.Timeline) => void,
  { pin, end = "+=120%" }: SceneOptions = {},
) {
  useIsoLayoutEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(
      {
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const desktop = Boolean(ctx.conditions?.desktop);
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: desktop
            ? { trigger: pin?.current ?? root.current, start: pin ? "top top" : "top 70%", end, pin: pin?.current ?? false, scrub: 0.6 }
            : { trigger: root.current, start: "top 72%" },
        });
        build(tl);
      },
    );
    return () => mm.revert();
    // build is a fresh closure every render; the scene is built once per mount.
  }, []);
}

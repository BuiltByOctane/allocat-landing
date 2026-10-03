import { useCallback, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Staggered page reveal for PaydayHero's `.hero-*` elements (they start at opacity 0).
 * Home runs it when the loading screen exits; other pages call `reveal` on mount.
 */
export function useHeroReveal() {
  const [revealed, setRevealed] = useState(false);
  const done = useRef(false);

  const reveal = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setRevealed(true);

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo("#main-nav", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 });
    tl.fromTo(
      ".hero-logo, .hero-brand",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12 },
      "-=0.3",
    );
    tl.fromTo(
      ".hero-tagline, .hero-sub",
      { y: 20, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.12 },
      "-=0.6",
    );
    tl.fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.4");
  }, []);

  return { revealed, reveal };
}

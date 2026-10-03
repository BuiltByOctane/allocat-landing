import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Steps a small scene 0 → `steps` once it scrolls into view (reduced motion: straight to the end).
 * `replay()` runs it again, for the scenes that offer a "Play again" control.
 */
export function useSequence(steps: number, gap = 1100) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStep(steps);
      return;
    }
    setStep(0);
    const timers = Array.from({ length: steps }, (_, i) => setTimeout(() => setStep(i + 1), 400 + i * gap));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, steps, gap, run]);

  return { ref, step, replay: () => setRun((r) => r + 1) };
}


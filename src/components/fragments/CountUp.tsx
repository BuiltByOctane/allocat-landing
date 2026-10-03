import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { inr } from "@/lib/format";

interface CountUpProps {
  value: number;
  /** Starting value for the first run; later changes tween from the previous value. */
  from?: number;
  /** Hold at `from` until true (e.g. the hero waits for the loading screen). */
  start?: boolean;
  duration?: number;
  className?: string;
}

/** Rupee figure that eases between values. Renders the final value on the server. */
const CountUp = ({ value, from, start = true, duration = 900, className }: CountUpProps) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const current = useRef(from ?? value);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (from !== undefined && !reduce) setShown(from);
    }
    if (!start) return;
    if (reduce) {
      current.current = value;
      setShown(value);
      return;
    }
    const begin = current.current;
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      t0 ??= ts;
      const p = Math.min((ts - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      current.current = begin + (value - begin) * eased;
      setShown(current.current);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, start, duration, reduce, from]);

  return <span className={className}>{inr(shown)}</span>;
};

export default CountUp;

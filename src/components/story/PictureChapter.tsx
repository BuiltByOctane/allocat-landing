import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { inr } from "@/lib/format";
import Chapter from "./Chapter";

const WORTH = "M0 70 C 30 66, 50 60, 80 58 S 130 44, 160 40 S 220 24, 260 14";

/** Day 27. The month is one slice of a longer picture: net worth, goals, debts, and questions. */
const PictureChapter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const on = inView || reduce;
  const t = (delay: number) => ({ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : delay, ease: "easeOut" as const });

  return (
    <Chapter
      id="picture"
      beat="picture"
      day="27"
      when="Zoom out"
      flip
      title="The month adds up to something."
      scene={
        <div ref={ref} className="mx-auto grid max-w-[460px] grid-cols-2 gap-3">
          {/* Net worth: the hero tile, spans both columns */}
          <div className="col-span-2 rounded-card border border-border bg-card p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-muted-foreground">Net worth</span>
              <span className="text-[13px] font-bold text-pos">+{inr(15000)} this month</span>
            </div>
            <span className="figure mt-1 block text-[30px] text-foreground">{inr(482300)}</span>
            <svg viewBox="0 0 260 80" preserveAspectRatio="none" className="mt-3 h-20 w-full overflow-visible" aria-hidden>
              <motion.path
                d={WORTH}
                fill="none"
                stroke="hsl(var(--accent-color))"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: on ? 1 : 0 }}
                transition={t(0)}
              />
            </svg>
          </div>

          {/* Goal ring */}
          <div className="rounded-stat border border-border bg-card p-4">
            <svg viewBox="0 0 64 64" className="mb-3 h-14 w-14 -rotate-90" aria-hidden>
              <circle cx="32" cy="32" r="26" fill="none" stroke="var(--tile)" strokeWidth="7" />
              <motion.circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="hsl(var(--accent-color))"
                strokeWidth="7"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 0.68 : 0 }}
                animate={{ pathLength: on ? 0.68 : 0 }}
                transition={t(0.3)}
              />
            </svg>
            <span className="block text-[14px] font-bold text-foreground">Goa trip</span>
            <span className="block text-[12px] text-muted-foreground">68% of {inr(40000)}</span>
          </div>

          {/* Debt shrinking */}
          <div className="rounded-stat border border-border bg-card p-4">
            <span className="block text-[14px] font-bold text-foreground">Owed to Rahul</span>
            <span className="figure mt-2 block text-[22px] text-foreground">{inr(1500)}</span>
            <div className="mt-3 h-2 overflow-hidden rounded-pill bg-tile">
              <motion.div
                className="h-full rounded-pill bg-foreground/70"
                initial={{ width: reduce ? "27%" : "100%" }}
                animate={{ width: on ? "27%" : "100%" }}
                transition={t(0.5)}
              />
            </div>
            <span className="mt-2 block text-[12px] text-muted-foreground">down from {inr(5500)}</span>
          </div>

          {/* Ask AlloCat AI */}
          <div className="col-span-2 flex flex-col gap-2 rounded-card bg-secondary p-4">
            <span className="self-end rounded-[18px] rounded-br-md bg-card px-3.5 py-2 text-[14px] text-foreground">
              Can I afford a ₹3,000 dinner this week?
            </span>
            <span className="flex max-w-[92%] items-start gap-2 rounded-[18px] rounded-bl-md bg-accent px-3.5 py-2 text-[14px] text-accent-ink">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
              Fun has ₹420 left. Moving ₹2,600 from Food would cover it, but Food is already tight.
            </span>
          </div>
        </div>
      }
    >
      <p>
        Add what you own and what you owe, and watch net worth climb month by month. Set goals
        and see them fill. Keep track of money you've lent or borrowed.
      </p>
      <p>And when you have a question, ask AlloCat AI. It answers from your real numbers.</p>
    </Chapter>
  );
};

export default PictureChapter;

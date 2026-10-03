import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { DownloadCTA } from "@/components/DownloadCTA";
import { inr } from "@/lib/format";
import { useBeat } from "./StoryContext";

// Where the ₹62,000 actually went, budget by budget. Lime at falling strength keeps it one family.
const SPLIT = [
  { name: "Rent", amount: 22000, alpha: 1 },
  { name: "Savings", amount: 15000, alpha: 0.78 },
  { name: "Food", amount: 9000, alpha: 0.6 },
  { name: "Bills", amount: 8000, alpha: 0.45 },
  { name: "Fun", amount: 8000, alpha: 0.3 },
];
const TOTAL = SPLIT.reduce((s, x) => s + x.amount, 0);

/** Day 30. The month closes with every rupee accounted for. Story's last chapter + first real CTA. */
const CalmChapter = () => {
  const ref = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const inView = useInView(bar, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  useBeat("calm", ref);

  return (
    <section id="calm" ref={ref} className="relative px-6 py-28 md:px-10 md:py-40 lg:px-16">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-6 flex items-end gap-3">
          <span className="day-numeral" aria-hidden>
            30
          </span>
          <span className="pb-2 text-[14px] font-semibold text-muted-foreground">Day 30, month end</span>
        </div>
        <h2 className="t-display-lg mb-10 max-w-[18ch] text-balance text-foreground">
          Same salary. This time, nothing went missing.
        </h2>

        <div ref={bar} className="mb-4 flex h-16 w-full overflow-hidden rounded-[20px] md:h-20">
          {SPLIT.map((s, i) => (
            <motion.div
              key={s.name}
              className="h-full origin-left"
              style={{ width: `${(s.amount / TOTAL) * 100}%`, background: `hsl(var(--accent-color) / ${s.alpha})` }}
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={{ scaleX: inView || reduce ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.15, ease: "easeOut" }}
            />
          ))}
        </div>
        <ul className="mb-14 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-5">
          {SPLIT.map((s) => (
            <li key={s.name} className="flex items-center gap-2.5">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: `hsl(var(--accent-color) / ${s.alpha})` }}
                aria-hidden
              />
              <span className="text-[14px] text-muted-foreground">
                <span className="font-bold text-foreground">{s.name}</span> {inr(s.amount)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-8 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="t-body max-w-[30rem] text-muted-foreground">
            You know where all {inr(TOTAL)} went, and ₹15,000 of it is still yours. Next payday,
            you do it again in a few minutes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <DownloadCTA size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalmChapter;

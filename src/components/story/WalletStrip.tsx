import { AnimatePresence, motion } from "framer-motion";
import CountUp from "@/components/fragments/CountUp";
import { useStory } from "./StoryContext";
import { BEATS, MONTH_DAYS } from "./beats";

/**
 * The running balance that follows the reader through the month.
 * Hidden on the hero (which shows the same figure big) and outside the story.
 */
const WalletStrip = () => {
  const { beat } = useStory();
  const state = beat && beat !== "hero" ? BEATS[beat] : null;

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
          aria-live="polite"
        >
          <div className="glass-dock flex max-w-full items-center gap-3 rounded-pill border border-border py-2 pl-2 pr-5">
            <span className="grid h-10 min-w-[64px] place-items-center rounded-pill bg-accent px-3 font-display text-[15px] font-bold text-accent-ink">
              Day {state.day}
            </span>
            <span className="flex min-w-0 items-baseline gap-2">
              <CountUp value={state.amount} duration={1600} className="figure text-[19px] text-foreground" />
              <span className="truncate text-[13px] font-medium text-muted-foreground">{state.label}</span>
            </span>
            <span className="ml-1 hidden h-1.5 w-16 overflow-hidden rounded-pill bg-tile sm:block" aria-hidden>
              <span
                className="block h-full rounded-pill bg-foreground/60 transition-[width] duration-700"
                style={{ width: `${(state.day / MONTH_DAYS) * 100}%` }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WalletStrip;

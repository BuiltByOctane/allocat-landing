import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Crown } from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import { useBeat } from "@/components/story/StoryContext";
import LimeCard from "@/components/neo/LimeCard";

/**
 * Home: short teasers for the two long-form pages, plus the founding offer.
 * The full story and the founder note live on their own routes.
 */
const Glimpses = () => {
  const ref = useRef<HTMLElement>(null);
  useBeat(null, ref);

  return (
    <section ref={ref} className="bg-background pb-20 md:pb-28">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-10 lg:px-16">
        <motion.div {...fadeUp}>
          <Link
            to="/story"
            className="group flex h-full flex-col rounded-card border border-border bg-card p-7 transition-colors hover:border-foreground/30"
          >
            <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-tile bg-tile text-muted-foreground">
              <CalendarDays className="h-5 w-5" />
            </span>
            <h3 className="t-title mb-2 text-foreground">A month with AlloCat</h3>
            <p className="t-body mb-6 flex-1 text-muted-foreground">
              Payday to day 30: watch the small spends leak, then see how envelopes and SMS tracking stop it.
            </p>
            <span className="inline-flex items-center gap-2 text-[14px] font-bold text-foreground">
              See the month <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
          <Link to="/why-free" className="group block h-full">
            <LimeCard className="flex h-full flex-col p-7">
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-tile bg-accent-ink/10">
                <Crown className="h-5 w-5" />
              </span>
              <h3 className="t-title mb-2">Why I built it, and why it&apos;s free</h3>
              <p className="t-body mb-6 flex-1 opacity-85">
                &ldquo;Two years of envelope budgeting in Google Keep notes. The method worked. The logging didn&apos;t.&rdquo;
                Free today, and early users lock founding-member pricing.
              </p>
              <span className="inline-flex items-center gap-2 text-[14px] font-bold">
                Read the story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </LimeCard>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Glimpses;

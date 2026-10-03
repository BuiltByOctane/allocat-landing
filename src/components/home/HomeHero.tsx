import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Sparkles } from "lucide-react";
import { DownloadCTA } from "@/components/DownloadCTA";
import NotificationCard from "@/components/fragments/NotificationCard";
import Envelope from "@/components/fragments/Envelope";

// Each spend lands as a bank notification, then drops into its envelope.
const DEMO = [
  { merchant: "Swiggy", amount: 349, via: "UPI · HDFC Bank", envelope: "Food", left: 6151, total: 9000 },
  { merchant: "Uber", amount: 212, via: "Card · ICICI Bank", envelope: "Travel", left: 2788, total: 4000 },
  { merchant: "BigBasket", amount: 1180, via: "UPI · SBI", envelope: "Groceries", left: 4820, total: 8000 },
];
const CYCLE_MS = 3200;

const TRUST = ["Free, no card", "SMS stays on your phone", "No ads"];

/**
 * Home hero: the whole pitch in one screen. Distinct from /story's payday opener.
 * `.hero-*` classes are animated in by useHeroReveal.
 */
const HomeHero = ({ revealed }: { revealed: boolean }) => {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!revealed || reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % DEMO.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [revealed, reduce]);

  const d = DEMO[i];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-20 pt-28 md:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <div className="hero-logo mb-7 inline-flex items-center gap-2 rounded-pill border border-border bg-card px-3.5 py-1.5 opacity-0">
            <Sparkles className="h-3.5 w-3.5 text-accent-strong" />
            <span className="text-[12.5px] font-semibold text-muted-foreground">
              Free today · early users get founding-member pricing
            </span>
          </div>

          <h1 className="hero-tagline mb-6 font-display text-[clamp(44px,5.4vw,76px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-foreground opacity-0">
            Budget every rupee.
            <br />
            <span className="text-muted-foreground">Your spends log themselves.</span>
          </h1>

          <p className="hero-sub t-body mb-8 max-w-[34rem] text-muted-foreground opacity-0">
            Give your income a plan on payday. AlloCat reads your bank&apos;s UPI and card SMS right on your phone,
            catches every spend and puts it in the right budget. No typing, no month-end mystery.
          </p>

          <div className="hero-cta mb-7 flex flex-col gap-3 opacity-0 sm:flex-row">
            <DownloadCTA size="lg" />
          </div>

          <ul className="hero-cta flex flex-wrap gap-x-5 gap-y-2 opacity-0">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-accent-strong" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Live demo: notification → auto-allocated → envelope updates */}
        <div className="hero-brand opacity-0" aria-hidden>
          <div className="rounded-card border border-border bg-background/60 p-4 md:p-5">
            <p className="mb-3 text-[12px] font-semibold text-muted-foreground">Just now</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={d.merchant}
                initial={reduce ? false : { opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 14 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col gap-3"
              >
                <NotificationCard merchant={d.merchant} amount={d.amount} via={d.via} when="now" />
                <div className="flex items-center justify-center gap-2 text-[12.5px] font-semibold text-muted-foreground">
                  <ArrowDown className="h-3.5 w-3.5" />
                  Auto-allocated to <span className="text-foreground">{d.envelope}</span>
                </div>
                <Envelope name={d.envelope} left={d.left} total={d.total} highlight />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Infinity as InfinityIcon } from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import SectionBadge from "@/components/neo/SectionBadge";
import { PillButton } from "@/components/neo/PillButton";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.octane.allocat";

const freeFeatures = [
  "Smart budgets & categories",
  "SMS auto-tracking — spends log themselves",
  "Net worth tracking & snapshots",
  "Up to 3 savings goals",
  "Up to 5 assets",
  "Track up to 2 debts / lent money",
  "Offline-first & private by design",
  "Themes, accents, light & dark",
];

const premiumFeatures = [
  "Everything in Free",
  "AlloCat AI — chat & spending insights",
  "Unlimited savings goals",
  "Unlimited assets",
  "Unlimited debts & lent money",
  "40-day free trial — no card needed",
  "Priority updates",
];

/** Google Play badge-style mark. */
const PlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor" aria-hidden>
    <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
  </svg>
);

const PricingSection = () => {
  const [annual, setAnnual] = useState(true);

  const price = annual ? "₹699" : "₹79";
  const per = annual ? "/year" : "/month";

  return (
    <section id="pricing" className="bg-background py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-12 text-center md:mb-16">
          <SectionBadge className="mb-6">Pricing</SectionBadge>
          <h2 className="t-display-lg mb-4 text-foreground">
            Start free.
            <br />
            <span className="text-muted-foreground">Upgrade when you&apos;re ready.</span>
          </h2>
          <p className="t-body mx-auto max-w-lg text-muted-foreground">
            Every core feature is free forever — including SMS auto-tracking. Go Premium for
            AlloCat AI and no limits.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div {...fadeUp} className="mb-10 flex items-center justify-center gap-3">
          <span className={`text-sm font-bold ${annual ? "text-muted-foreground" : "text-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual((v) => !v)}
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            className="relative h-7 w-12 rounded-pill border border-border bg-card transition-colors"
          >
            <span
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-accent-strong transition-all ${
                annual ? "left-[26px]" : "left-1"
              }`}
            />
          </button>
          <span className={`text-sm font-bold ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual
          </span>
          <span className="rounded-pill bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-ink">
            Save 26%
          </span>
        </motion.div>

        {/* Cards */}
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {/* Free */}
          <motion.div
            {...fadeUp}
            className="flex flex-col rounded-card border border-border bg-card p-8 md:p-10"
          >
            <h3 className="t-title mb-1 text-foreground">Free</h3>
            <p className="t-body mb-6 text-muted-foreground">For everyday money tracking.</p>
            <div className="mb-8 flex items-baseline gap-1">
              <span className="figure text-[44px] leading-none text-foreground">₹0</span>
              <span className="t-label text-muted-foreground">/forever</span>
            </div>
            <ul className="mb-8 flex-1 space-y-3.5">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                  <span className="t-body text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <PillButton asChild variant="outline" size="lg">
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                <PlayIcon className="h-4 w-4" /> Get it on Google Play
              </a>
            </PillButton>
          </motion.div>

          {/* Premium */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.1 }}
            className="relative flex flex-col rounded-card border-2 border-accent-strong bg-card p-8 md:p-10"
          >
            <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-pill bg-accent px-3 py-1 text-[11px] font-bold text-accent-ink">
              <Sparkles className="h-3 w-3" /> Most popular
            </span>
            <h3 className="t-title mb-1 text-foreground">Premium</h3>
            <p className="t-body mb-6 text-muted-foreground">AI insights and zero limits.</p>
            <div className="mb-2 flex items-baseline gap-1">
              <span className="figure text-[44px] leading-none text-foreground">{price}</span>
              <span className="t-label text-muted-foreground">{per}</span>
            </div>
            <p className="mb-8 text-[13px] font-semibold text-accent-strong">
              {annual ? "Just ₹58/mo, billed yearly" : "or ₹699/year — save 26%"}
            </p>
            <ul className="mb-8 flex-1 space-y-3.5">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  {f === "Everything in Free" ? (
                    <InfinityIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                  ) : (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                  )}
                  <span className="t-body text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <PillButton asChild variant="lime" size="lg">
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                <PlayIcon className="h-4 w-4" /> Start 40-day free trial
              </a>
            </PillButton>
          </motion.div>
        </div>

        {/* Billing note */}
        <motion.p {...fadeUp} className="mx-auto max-w-xl text-center text-[13px] text-muted-foreground">
          Premium is purchased securely through Google Play in the Android app. Your subscription
          unlocks AlloCat everywhere you sign in — web and mobile.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;

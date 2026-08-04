import { motion } from "framer-motion";
import { Check, Heart, Server, Sparkles, ShieldCheck } from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import SectionBadge from "@/components/neo/SectionBadge";
import LimeCard from "@/components/neo/LimeCard";
import { PillButton } from "@/components/neo/PillButton";
import { AppStoreButton } from "@/components/DownloadCTA";
import { KOFI_URL } from "@/lib/links";

const includedFeatures = [
  "Smart budgets & categories",
  "Automatic spend detection from bank SMS",
  "Net worth tracking & snapshots",
  "Unlimited savings goals",
  "Unlimited assets",
  "Unlimited debt & lent-money tracking",
  "AlloCat AI, chat and spending insights",
  "Private by design, no ads, no tracking",
  "Themes, accents, light & dark",
];

const costs = [
  {
    icon: Server,
    title: "Servers & database",
    body: "Hosting, sync and backups for every account.",
  },
  {
    icon: Sparkles,
    title: "AlloCat AI",
    body: "Every chat message costs real money to run.",
  },
  {
    icon: ShieldCheck,
    title: "Store & domain",
    body: "Play developer account, signing, the allocat.xyz name.",
  },
];

const SupportSection = () => (
  <section id="support" className="bg-background py-20 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-12 text-center md:mb-16">
        <SectionBadge className="mb-6">Why it&apos;s free</SectionBadge>
        <h2 className="t-display-lg mb-4 text-foreground">
          Everything, free.
          <br />
          <span className="text-muted-foreground">Not the trial kind.</span>
        </h2>
        <p className="t-body mx-auto max-w-lg text-muted-foreground">
          No plans, no trial countdown, no locked features. Every account gets the whole
          app, and it stays that way.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* What you get */}
        <motion.div
          {...fadeUp}
          className="flex flex-col rounded-card border border-border bg-card p-8 md:p-10"
        >
          <h3 className="t-title mb-1 text-foreground">What you get</h3>
          <p className="t-body mb-6 text-muted-foreground">All of it, on every account.</p>
          <div className="mb-8 flex items-baseline gap-1">
            <span className="figure text-[44px] leading-none text-foreground">₹0</span>
            <span className="t-label text-muted-foreground">/forever</span>
          </div>
          <ul className="mb-8 flex-1 space-y-3.5">
            {includedFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                <span className="t-body text-foreground">{f}</span>
              </li>
            ))}
          </ul>
          <AppStoreButton variant="lime" size="lg" />
        </motion.div>

        {/* Why, and the ask */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <LimeCard className="p-8 md:p-10">
            <h3 className="t-title mb-3">So how does this work?</h3>
            <p className="t-body opacity-85">
              AlloCat is built by one person who wanted a money app that didn&apos;t nag.
              Charging for it would have made it exactly the thing I was trying to avoid,
              so it&apos;s free. No ads, and your data is never sold or shared. Bank SMS
              is read on your device and never leaves it.
            </p>
          </LimeCard>

          <div className="flex flex-col rounded-card border border-border bg-card p-8 md:p-10">
            <h3 className="t-heading mb-5 text-foreground">What it costs to run</h3>
            <ul className="mb-8 flex-1 space-y-5">
              {costs.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-tile bg-tile text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold text-foreground">{title}</span>
                    <span className="t-body text-muted-foreground">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <PillButton variant="lime" size="lg" asChild>
              <a href={KOFI_URL} target="_blank" rel="noopener noreferrer">
                <Heart className="h-4 w-4" /> Support on Ko-fi
              </a>
            </PillButton>
          </div>
        </motion.div>
      </div>

      {/* Note */}
      <motion.p
        {...fadeUp}
        className="mx-auto mt-12 max-w-xl text-center text-[13px] text-muted-foreground"
      >
        Supporting is a tip, not a purchase. It unlocks nothing. Supporters get a small
        thank-you badge and the same AlloCat as everyone else.
      </motion.p>
    </div>
  </section>
);

export default SupportSection;

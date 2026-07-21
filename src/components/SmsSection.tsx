import { motion } from "framer-motion";
import {
  Smartphone,
  Cpu,
  ShieldCheck,
  Sparkles,
  MessageSquareText,
  ArrowRight,
  BellRing,
} from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import SectionBadge from "@/components/neo/SectionBadge";
import PhoneMockup from "@/components/neo/PhoneMockup";
import LimeCard from "@/components/neo/LimeCard";
import Chip from "@/components/neo/Chip";

const pillars = [
  {
    icon: Cpu,
    title: "On-device",
    body: "Your transaction SMS is read and understood right there on your phone. No server ever sees the message.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Only the amount, date, and merchant get saved. The SMS itself is never stored or sent anywhere.",
  },
  {
    icon: Sparkles,
    title: "Learns your merchants",
    body: "Teach AlloCat a merchant once. Next time, it puts the spend in the right budget on its own.",
  },
  {
    icon: BellRing,
    title: "Budget alerts",
    body: "If a budget is about to run out, or already has, AlloCat tells you right away.",
  },
];

const SmsSection = () => (
  <section id="sms" className="relative overflow-hidden bg-background py-20 md:py-32">
    {/* Lime glow */}
    <div
      className="pointer-events-none absolute right-0 top-1/4 h-[480px] w-[480px] translate-x-1/3 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(var(--accent-color) / 0.14) 0%, transparent 70%)" }}
    />

    <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-14 max-w-2xl">
        <SectionBadge className="mb-6" icon={<Smartphone className="h-3 w-3" />}>
          New · Android
        </SectionBadge>
        <h2 className="t-display-lg mb-4 text-foreground">
          How the auto-detect
          <br />
          <span className="gradient-text">actually works</span>
        </h2>
        <p className="t-body text-muted-foreground">
          When your bank or UPI app sends a transaction SMS, AlloCat reads it right there on your
          phone. Nothing is uploaded. Allocate it in one tap, or let AlloCat do it for you once it
          knows the merchant.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: phone mockup + flow */}
        <motion.div {...fadeUp} className="flex flex-col items-center gap-8">
          <PhoneMockup src="/sms-pending.png" alt="Pending transactions ready to allocate to a budget" width="290px" />

          {/* On-device flow strip */}
          <div className="flex w-full max-w-sm items-center justify-between gap-2 text-center">
            {[
              { icon: MessageSquareText, label: "SMS arrives" },
              { icon: Cpu, label: "Read on your phone" },
              { icon: Sparkles, label: "You allocate it" },
              { icon: BellRing, label: "Notified if low" },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex flex-1 items-center gap-2">
                <div className="flex flex-1 flex-col items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-tile bg-tile text-foreground">
                    <step.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="t-label text-muted-foreground">{step.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: lime callout + pillars */}
        <div className="flex flex-col gap-5">
          <motion.div {...fadeUp}>
            <LimeCard className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <Chip variant="onDark">Privacy</Chip>
                <Smartphone className="h-5 w-5 text-accent-ink/70" />
              </div>
              <p className="t-title max-w-sm text-accent-ink">
                Your bank SMS never leaves your phone.
              </p>
              <p className="mt-2 text-[13px] font-medium text-accent-ink/80">
                It's read locally, not uploaded. Only debits are tracked, credits are ignored.
              </p>
            </LimeCard>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay: i * 0.08 }}
                className="flex flex-col gap-3 rounded-stat border border-border bg-card p-5"
              >
                <span className="grid h-[34px] w-[34px] place-items-center rounded-tile bg-tile text-foreground">
                  <p.icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="t-heading text-foreground">{p.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SmsSection;

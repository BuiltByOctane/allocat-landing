import { motion } from "framer-motion";
import {
  BellRing,
  TrendingDown,
  Lightbulb,
  ShieldCheck,
  Target,
  Globe,
  Zap,
} from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import SectionBadge from "@/components/neo/SectionBadge";

const insights = [
  {
    icon: BellRing,
    tone: "neg" as const,
    title: "Budget Running Low",
    message: "Your Food budget has ₹500 left, with 10 days to go in the month.",
  },
  {
    icon: TrendingDown,
    tone: "pos" as const,
    title: "Savings Opportunity",
    message: "Reducing subscriptions could save you ₹2,000/month. Review now?",
  },
  {
    icon: Target,
    tone: "accent" as const,
    title: "Goal Progress",
    message: "You're on track! 67% of your vacation goal reached. Keep it up!",
  },
  {
    icon: Lightbulb,
    tone: "accent" as const,
    title: "Smart Tip",
    message: "Auto-saving ₹500/week could grow your emergency fund by ₹26,000/year.",
  },
  {
    icon: Globe,
    tone: "pos" as const,
    title: "Multi-Currency",
    message: "Your $1,200 USD balance is tracked separately from your ₹ accounts, formatted natively.",
  },
  {
    icon: ShieldCheck,
    tone: "pos" as const,
    title: "Budget Shield",
    message: "Great job! You stayed within budget for Travel, 3 months running.",
  },
];

const toneClasses: Record<"pos" | "neg" | "accent", string> = {
  pos: "bg-tile text-pos",
  neg: "bg-tile text-neg",
  accent: "bg-accent text-accent-ink",
};

const InsightsSection = () => (
  <section id="insights" className="relative overflow-hidden bg-background py-20 md:py-32">
    {/* Faint lime glow */}
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(var(--accent-color) / 0.08) 0%, transparent 70%)" }}
    />

    <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-16 text-center md:mb-20">
        <SectionBadge className="mb-6" icon={<Zap className="h-3 w-3 text-accent-strong" />}>
          AI-Powered
        </SectionBadge>
        <h2 className="t-display-lg mb-4 text-foreground">
          Budgeting is the core.
          <br />
          <span className="text-muted-foreground">Here's what else you get.</span>
        </h2>
        <p className="t-body mx-auto max-w-lg text-muted-foreground">
          AlloCat also keeps an eye on the bigger picture and answers your questions when you need
          it.
        </p>
      </motion.div>

      {/* Insights grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.title + i}
            {...fadeUp}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay: i * 0.08 }}
            className="group relative cursor-default rounded-stat border border-border bg-card p-6 transition-all duration-500 hover:border-foreground/15"
          >
            <div className="mb-3 flex items-start gap-3">
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-tile transition-transform duration-300 group-hover:scale-110 ${toneClasses[insight.tone]}`}
              >
                <insight.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="t-heading text-foreground">{insight.title}</h3>
                <p className="mt-0.5 text-[11px] font-medium text-muted-foreground/70">Just now</p>
              </div>
            </div>
            <p className="t-body pl-[52px] text-muted-foreground">{insight.message}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default InsightsSection;

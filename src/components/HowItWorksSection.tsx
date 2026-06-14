import { motion } from "framer-motion";
import { UserPlus, LayoutDashboard, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import SectionBadge from "@/components/neo/SectionBadge";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up",
    description:
      "Create your free account with just an email or Google. No credit card needed — start in seconds.",
  },
  {
    icon: LayoutDashboard,
    number: "02",
    title: "Set Up Your Finances",
    description:
      "Set a budget, add categories and your currency, and let SMS auto-logging capture spends for you on Android.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Talk to AlloCat AI",
    description:
      "Ask your AI assistant anything about your spending. Get real, data-backed answers drawn from your actual financial data.",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="bg-background py-20 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-16 text-center md:mb-20">
        <SectionBadge className="mb-6">How It Works</SectionBadge>
        <h2 className="t-display-lg mb-4 text-foreground">
          Get started in
          <br />
          <span className="text-muted-foreground">three simple steps</span>
        </h2>
        <p className="t-body mx-auto max-w-lg text-muted-foreground">
          No complex setup. No learning curve. Start managing your finances in under a minute.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            {...fadeUp}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay: i * 0.15 }}
            className="group relative"
          >
            {/* Connector line (desktop) */}
            {i < steps.length - 1 && (
              <div className="absolute left-[calc(50%+3.5rem)] top-12 hidden h-px w-[calc(100%-4rem)] bg-border md:block" />
            )}

            <div className="relative rounded-card border border-border bg-card p-8 transition-all duration-500 hover:border-foreground/15">
              {/* Icon + number */}
              <div className="mb-6 flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-tile bg-tile text-foreground transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="figure text-4xl text-accent-strong">{step.number}</span>
              </div>

              {/* Text */}
              <h3 className="t-title mb-3 text-foreground">{step.title}</h3>
              <p className="t-body text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;

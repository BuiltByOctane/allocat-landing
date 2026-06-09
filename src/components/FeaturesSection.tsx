import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  PieChart,
  BarChart3,
  Brain,
  Target,
  CreditCard,
} from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import SectionBadge from "@/components/neo/SectionBadge";
import PhoneMockup from "@/components/neo/PhoneMockup";

const features = [
  {
    icon: Wallet,
    title: "Budget Management",
    description:
      "Set a monthly budget, create spending categories with emoji, and track exactly how much is allocated vs. used — in real time.",
  },
  {
    icon: BarChart3,
    title: "Quick Spend Logging",
    description:
      "Log a spend in seconds from the dashboard. Pick a category, enter the amount — done. No tedious forms.",
  },
  {
    icon: PieChart,
    title: "Net Worth Tracking",
    description:
      "Add your assets and liabilities. AlloCat calculates your net worth and shows your growth over time with a clean chart.",
  },
  {
    icon: Target,
    title: "Financial Goals",
    description:
      "Set savings goals — a new phone, an emergency fund, a vacation — and watch your progress move forward.",
  },
  {
    icon: CreditCard,
    title: "Debt & Lent Money",
    description:
      "Track what you owe and what others owe you. Manage debts and lent money in one place, with clear repayment records.",
  },
  {
    icon: Brain,
    title: "AlloCat AI",
    description:
      "Talk to your finances. The built-in AI assistant has access to your real data and can answer questions, spot patterns, and suggest actions.",
  },
];

// Swappable placeholders — regenerated from the running Neo·Lime app.
const featureImages = [
  "/budget.png", // Budget Management
  "/dashboard.png", // Quick Spend Logging
  "/netWorth.png", // Net Worth Tracking
  "/fingoals.png", // Financial Goals
  "/dept.png", // Debt & Lent Money
  "/ai.png", // AlloCat AI
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="relative bg-background py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-16 text-center md:mb-20">
          <SectionBadge className="mb-6">Features</SectionBadge>
          <h2 className="t-display-lg mb-4 text-foreground">
            Everything you need to
            <br />
            <span className="text-muted-foreground">master your money</span>
          </h2>
          <p className="t-body mx-auto max-w-lg text-muted-foreground">
            From auto-logged SMS spends to AI-powered insights — AlloCat is your complete,
            distraction-free financial companion.
          </p>
        </motion.div>

        {/* Sticky scroll layout */}
        <div className="relative grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:gap-20">
          {/* Left: sticky phone mockup (desktop) */}
          <div className="sticky top-10 hidden h-screen items-center justify-center pb-20 pl-4 md:flex">
            <PhoneMockup width="320px" className="top-5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeFeature}
                  src={featureImages[activeFeature]}
                  alt={features[activeFeature].title}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </AnimatePresence>
            </PhoneMockup>
          </div>

          {/* Right: scrolling text blocks */}
          <div className="relative z-10 flex flex-col space-y-24 py-10 md:space-y-0 md:py-[20vh]">
            {features.map((feature, i) => {
              const active = activeFeature === i;
              return (
                <motion.div
                  key={i}
                  onViewportEnter={() => setActiveFeature(i)}
                  viewport={{ margin: "-40% 0px -40% 0px", amount: "some" }}
                  className="flex flex-col justify-center md:min-h-[80vh]"
                >
                  {/* Mobile divider */}
                  <div className="mb-8 h-px w-full bg-border md:hidden" />

                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-tile transition-colors duration-300 ${
                        active ? "bg-accent text-accent-ink" : "bg-tile text-foreground"
                      }`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <span className="t-label text-muted-foreground/70">
                      Feature 0{i + 1}
                    </span>
                  </div>

                  <h3
                    className={`t-display-md mb-4 transition-colors duration-300 ${
                      active ? "text-foreground" : "text-foreground/60 md:text-muted-foreground"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p className="t-body text-muted-foreground">{feature.description}</p>

                  {/* Mobile phone mockup */}
                  <PhoneMockup
                    src={featureImages[i]}
                    alt={feature.title}
                    width="200px"
                    className="mx-auto mt-10 md:hidden"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

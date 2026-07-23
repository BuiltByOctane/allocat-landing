import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  PieChart,
  BellRing,
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
    title: "Budget every rupee",
    description:
      "At the start of the month, split your income into budgets, like rent, food, and fun money. Every rupee gets a job before you spend it, so nothing just disappears.",
  },
  {
    icon: BellRing,
    title: "Spends notice themselves",
    description:
      "Pay with UPI or a card and your bank sends an SMS. AlloCat reads it right on your phone and lets you know a spend just happened, no typing required.",
  },
  {
    icon: PieChart,
    title: "Net worth, tracked",
    description:
      "Add what you own and what you owe. AlloCat adds it up and shows how it grows over time with a clean chart.",
  },
  {
    icon: Target,
    title: "Goals that keep moving",
    description:
      "Saving for something? Set a goal and watch your progress grow every time you save.",
  },
  {
    icon: CreditCard,
    title: "Debt & lent money",
    description:
      "Track what you owe and what people owe you, in one place, with clear repayment records.",
  },
  {
    icon: Brain,
    title: "Ask AlloCat AI",
    description:
      "Have a question about your money? Ask AlloCat AI. It looks at your real numbers and gives you a real answer.",
  },
];

// Swappable placeholders, regenerated from the running Neo·Lime app.
const featureImages = [
  "/budget.png", // Budget every rupee
  "/sms-pending.png", // Spends notice themselves
  "/netWorth.png", // Net worth, tracked
  "/fingoals.png", // Goals that keep moving
  "/debt.png", // Debt & lent money
  "/ai.png", // Ask AlloCat AI
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
            Give every rupee
            <br />
            <span className="text-muted-foreground">a job</span>
          </h2>
          <p className="t-body mx-auto max-w-lg text-muted-foreground">
            Budget your income once a month. AlloCat keeps track of the rest, from spends to net
            worth to goals.
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
                  className="absolute inset-0 h-full w-full object-top"
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

import { useRef } from "react";
import { motion } from "framer-motion";
import { Wallet, MessageSquareText, MousePointerClick, ShieldCheck } from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import { useBeat } from "@/components/story/StoryContext";

const STEPS = [
  {
    icon: Wallet,
    title: "Budget on payday",
    body: "Split your income into envelopes: rent, food, savings, fun. Every rupee gets a job.",
  },
  {
    icon: MessageSquareText,
    title: "Spends get caught",
    body: "Your bank texts you on every UPI or card payment. AlloCat notices it automatically.",
  },
  {
    icon: MousePointerClick,
    title: "One tap to allocate",
    body: "Put each spend in the right envelope. Known merchants go there on their own.",
  },
];

/** Home: the whole app in three steps, plus the privacy promise. */
const HowItWorks = () => {
  const ref = useRef<HTMLElement>(null);
  useBeat(null, ref);

  return (
    <section id="how-it-works" ref={ref} className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <motion.div {...fadeUp} className="mb-10 text-center md:mb-14">
          <p className="mb-4 text-[14px] font-semibold text-muted-foreground">How it works</p>
          <h2 className="t-display-lg text-balance text-foreground">
            Envelope budgeting, without the logging.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="rounded-card border border-border bg-card p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-tile bg-accent text-accent-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-[28px] font-bold leading-none text-foreground/15">{i + 1}</span>
              </div>
              <h3 className="t-heading mb-2 text-foreground">{title}</h3>
              <p className="t-body text-muted-foreground">{body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp}
          id="privacy"
          className="mt-4 flex items-start gap-3.5 rounded-card border border-border bg-card p-6"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile bg-tile text-accent-strong">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <p className="t-body text-muted-foreground">
            <span className="font-bold text-foreground">Your SMS never leaves your phone.</span> AlloCat reads new
            bank messages on-device and syncs only the amount and merchant. It never reads your old inbox. No ads,
            and your data is never sold.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

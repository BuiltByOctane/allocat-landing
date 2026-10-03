import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import NotificationCard from "@/components/fragments/NotificationCard";
import Chapter from "./Chapter";
import { useSequence } from "@/hooks/useSequence";

/** Day 15. Once a merchant is taught, its spends file themselves. */
const LearnChapter = () => {
  const { ref, step } = useSequence(3, 1000);

  return (
    <Chapter
      id="learn"
      beat="learn"
      day="15"
      when="A week later"
      flip
      title="Tell it once. It remembers."
      scene={
        <div ref={ref} className="mx-auto flex max-w-[400px] flex-col gap-3">
          <div className="flex items-center justify-between rounded-[20px] border border-border bg-card px-4 py-3.5">
            <span className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-accent-strong" />
              <span className="text-[14px] font-bold text-foreground">Swiggy always goes to Food</span>
            </span>
            <span className="h-6 w-10 rounded-pill bg-accent p-0.5" aria-hidden>
              <span className="ml-auto block h-5 w-5 rounded-full bg-accent-ink" />
            </span>
          </div>

          <motion.div animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 16 }} transition={{ duration: 0.45 }}>
            <NotificationCard merchant="Swiggy" amount={761} via="UPI, HDFC Bank" when="Day 15" />
          </motion.div>

          <motion.div
            animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.94 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 self-end rounded-pill bg-accent py-2 pl-2 pr-4 text-accent-ink"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-ink text-accent">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-[14px] font-bold">Filed to Food on its own</span>
          </motion.div>

          <motion.p
            animate={{ opacity: step >= 3 ? 1 : 0 }}
            className="self-end pr-2 text-[13px] text-muted-foreground"
          >
            You didn't open the app.
          </motion.p>
        </div>
      }
    >
      <p>
        The first time a new merchant shows up, you pick the budget. After that, AlloCat files
        that merchant's spends for you, and still tells you each time it does.
      </p>
    </Chapter>
  );
};

export default LearnChapter;

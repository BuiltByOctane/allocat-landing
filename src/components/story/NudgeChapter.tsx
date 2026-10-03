import { motion } from "framer-motion";
import AlertToast from "@/components/fragments/AlertToast";
import Envelope from "@/components/fragments/Envelope";
import Chapter from "./Chapter";
import { useSequence } from "@/hooks/useSequence";

/** Day 24. A budget runs low, and you hear about it before it's gone. */
const NudgeChapter = () => {
  const { ref, step } = useSequence(2, 900);

  return (
    <Chapter
      id="nudge"
      beat="nudge"
      day="24"
      when="Late in the month"
      title="A heads-up, not a surprise."
      scene={
        <div ref={ref} className="relative mx-auto max-w-[400px] pt-16">
          <motion.div
            className="absolute inset-x-0 top-0 z-10"
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <AlertToast title="Fun is almost out" body="₹420 left, with 6 days to go." />
          </motion.div>
          <div className="flex flex-col gap-2.5 pt-10">
            <Envelope name="Food" left={3240} total={9000} />
            <Envelope name="Fun" left={420} total={8000} tone="low" highlight={step >= 2} />
          </div>
        </div>
      }
    >
      <p>
        When a budget is about to run out, or already has, AlloCat tells you right away. You
        still have six days to do something about it, instead of finding out on the 30th.
      </p>
    </Chapter>
  );
};

export default NudgeChapter;

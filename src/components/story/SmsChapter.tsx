import { motion } from "framer-motion";
import { useSequence } from "@/hooks/useSequence";
import { Check, RotateCcw, Smartphone } from "lucide-react";
import SmsBubble from "@/components/fragments/SmsBubble";
import Envelope from "@/components/fragments/Envelope";
import LimeCard from "@/components/neo/LimeCard";
import Chapter from "./Chapter";

const FINAL = 4;

/** Any day. A spend happens; AlloCat reads the bank SMS on the phone and files it. */
const SmsChapter = () => {
  const { ref, step, replay } = useSequence(FINAL);

  return (
    <Chapter
      id="sms"
      beat="sms"
      day="9"
      when="Any day, any spend"
      title="You pay. AlloCat notices."
      scene={
        <div ref={ref} className="mx-auto flex max-w-[400px] flex-col gap-4">
          <motion.div animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 16 }} transition={{ duration: 0.45 }}>
            <SmsBubble
              sender="HDFC Bank"
              reveal={step >= 2}
              parts={[
                "Rs.",
                { pick: "349.00" },
                " debited from A/c XX4321 to ",
                { pick: "SWIGGY" },
                " via UPI on ",
                { pick: "09-10" },
                ". Not you? Call 1800...",
              ]}
            />
          </motion.div>

          <motion.div
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 16 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3 self-end rounded-pill border border-border bg-card py-2 pl-2 pr-4"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-ink">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-[14px] font-bold text-foreground">₹349 at Swiggy, filed to Food</span>
          </motion.div>

          <Envelope name="Food" left={step >= FINAL ? 7651 : 8000} total={9000} highlight={step >= FINAL} />

          <button
            type="button"
            onClick={replay}
            className="flex items-center gap-1.5 self-center rounded-pill px-3 py-1.5 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Play again
          </button>
        </div>
      }
    >
      <p>
        Your bank already texts you after every UPI or card payment. On Android, AlloCat reads
        that message as it arrives, pulls out the amount, merchant and date, and asks which
        budget it belongs to. No typing.
      </p>
      <div id="privacy">
        <LimeCard className="mt-8 p-6">
          <div className="mb-2 flex items-center gap-2">
            <Smartphone className="h-[18px] w-[18px]" />
            <span className="t-heading">Read on your phone. Never uploaded.</span>
          </div>
          <ul className="space-y-1.5 text-[14px] font-medium text-accent-ink/80">
            <li>The SMS is understood on your device and stays there.</li>
            <li>Only the amount, merchant and date are saved.</li>
            <li>It never opens your existing inbox, only new bank messages.</li>
            <li>Only spends are tracked. Credits are ignored.</li>
          </ul>
        </LimeCard>
      </div>
    </Chapter>
  );
};

export default SmsChapter;

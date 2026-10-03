import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motionVariants";

/** /why-free opener: the real reason AlloCat exists, in the developer's words. */
const FounderStory = () => (
  <section id="founder" className="bg-background px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
    <motion.article {...fadeUp} className="mx-auto max-w-[680px]">
      <p className="mb-5 text-[14px] font-semibold text-muted-foreground">Why I built AlloCat</p>
      <h1 className="t-display-lg mb-10 text-balance text-foreground">
        The method worked. The logging didn&apos;t.
      </h1>

      <div className="space-y-6 text-[17px] leading-relaxed text-foreground/85 md:text-[18px]">
        <p>
          For two years I ran my money the envelope way, in Google Keep notes. On payday every rupee got a job: rent,
          groceries, savings, fun. When an envelope ran dry, that spending stopped. It worked.
        </p>
        <p>
          Except for the logging. Every UPI payment and every card swipe had to be typed in by hand. Miss a few days
          and the notes stopped telling the truth. By month end I&apos;d be staring at them asking the same question:{" "}
          <em className="font-semibold text-foreground">where did it actually go?</em>
        </p>
        <p>
          So I built AlloCat to keep the envelopes and drop the chore. Your bank already texts you on every spend.
          AlloCat reads those messages on your phone, notices the spend, and helps you put it in the right envelope
          in one tap. Month end stops being a mystery.
        </p>
        <p>
          It&apos;s free today. Premium will come eventually, adding new things on top and never taking away what&apos;s
          free. Join early and you lock founding-member pricing.
        </p>
      </div>

      <p className="mt-10 font-display text-[18px] font-bold text-foreground">— the developer</p>
    </motion.article>
  </section>
);

export default FounderStory;

import { useRef } from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import { useBeat } from "@/components/story/StoryContext";
import WaitlistForm from "@/components/WaitlistForm";

/** Home: SMS auto-tracking is Android-only today; collect iPhone interest. */
const IosWaitlist = () => {
  const ref = useRef<HTMLElement>(null);
  useBeat(null, ref);

  return (
    <section id="ios" ref={ref} className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-10 lg:px-16">
        <motion.div {...fadeUp}>
          <p className="mb-4 inline-flex items-center gap-2 text-[14px] font-semibold text-muted-foreground">
            <Smartphone className="h-4 w-4" /> Coming to iPhone
          </p>
          <h2 className="t-display-lg mb-5 text-balance text-foreground">
            Auto-tracking is coming to iPhone.
          </h2>
          <p className="t-body text-muted-foreground">
            On Android, AlloCat already turns your bank SMS into tracked spends. We're bringing the
            same hands-free tracking to iOS. Join the waitlist and tell us how you'd like it: a native App Store
            app, or the web app you can use today.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="rounded-card border border-border bg-card p-6 md:p-7"
        >
          <WaitlistForm source="home_section" />
        </motion.div>
      </div>
    </section>
  );
};

export default IosWaitlist;

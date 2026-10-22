import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motionVariants";
import { useBeat } from "@/components/story/StoryContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes, all of it. Budgets, goals, assets, debts, reports, SMS auto-tracking and AlloCat AI are available on every account, with no caps and no trial clock. There is no paid tier today.",
  },
  {
    q: "Will there be a paid version?",
    a: "Eventually, yes. Running AlloCat costs money: servers, the AI model, the Play developer account. A Premium tier will come later and add new features on top. Everything you can use today stays free, nothing gets moved behind a paywall.",
  },
  {
    q: "Will you add ads or sell my data?",
    a: "No. There are no ads and no trackers, and your financial data is never sold or shared. Ads would defeat the point of building a calm money app in the first place.",
  },
  {
    q: "What is a founding member?",
    a: "Early users can claim a founding-member spot in the app with one tap. It's free and costs nothing now. When Premium launches, founding members get exclusive founding-member pricing, and we'll let you know the moment it's live. Spots are open for a limited time.",
  },
  {
    q: "Is my bank SMS data safe?",
    a: "It never leaves your phone. AlloCat only receives new incoming messages (it never reads your existing inbox) and parses them on-device. Only the extracted amount, merchant and a hashed duplicate key are synced; the raw message text stays local.",
  },
  {
    q: "Is AlloCat on iPhone?",
    a: "Yes, as a web app: open it in Safari and add it to your Home Screen. Hands-free auto-tracking like on Android is what we're bringing to iPhone next. Join the iOS waitlist on the home page and we'll email you once when it's ready.",
  },
  {
    q: "Are there any limits at all?",
    a: "One practical one: AI chat has a daily message allowance per account, because each message costs real money to run. Everything else in the app is unlimited, and hitting the AI cap doesn't affect anything else.",
  },
];

/** Questions shown on the brief home page; /why-free shows them all. */
const SHORT = new Set([
  "Is it really free?",
  "Is my bank SMS data safe?",
  "Will there be a paid version?",
  "What is a founding member?",
  "Is AlloCat on iPhone?",
]);

const FaqSection = ({ short = false }: { short?: boolean }) => {
  const items = short ? faqs.filter((f) => SHORT.has(f.q)) : faqs;
  const ref = useRef<HTMLElement>(null);
  useBeat(null, ref);

  return (
  <section id="faq" ref={ref} className="bg-background py-20 md:py-32">
    <div className="mx-auto max-w-[820px] px-6 md:px-10 lg:px-16">
      <motion.div {...fadeUp} className="mb-10 text-center md:mb-14">
        <h2 className="t-display-lg mb-4 text-balance text-foreground">The obvious questions, answered plainly.</h2>
      </motion.div>

      <motion.div {...fadeUp}>
        <Accordion type="single" collapsible className="w-full">
          {items.map(({ q, a }) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="t-heading text-left text-foreground hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="t-body text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
  );
};

export default FaqSection;

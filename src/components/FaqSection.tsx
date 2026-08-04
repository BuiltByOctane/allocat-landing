import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motionVariants";
import SectionBadge from "@/components/neo/SectionBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes, all of it. Budgets, goals, assets, debts, reports, SMS auto-tracking and AlloCat AI are available on every account, with no caps and no trial clock. There is no paid tier to upgrade to.",
  },
  {
    q: "Then how do you make money?",
    a: "I don't. AlloCat is a side project, not a business. Running it costs money: servers, the AI model, the Play developer account. I cover that myself. If people chip in on Ko-fi, that helps, but nothing depends on it.",
  },
  {
    q: "Will you add ads or sell my data?",
    a: "No. There are no ads and no trackers, and your financial data is never sold or shared. Ads would defeat the point of building a calm money app in the first place.",
  },
  {
    q: "What does supporting actually get me?",
    a: "A small thank-you badge in the app, and my genuine gratitude. That's it: no extra features, no higher limits, no early access. Supporting is a tip, not a purchase, and everyone uses the same AlloCat.",
  },
  {
    q: "Is my bank SMS data safe?",
    a: "It never leaves your phone. AlloCat only receives new incoming messages (it never reads your existing inbox) and parses them on-device. Only the extracted amount, merchant and a hashed duplicate key are synced; the raw message text stays local.",
  },
  {
    q: "Are there any limits at all?",
    a: "One practical one: AI chat has a daily message allowance per account, because each message costs real money to run. Everything else in the app is unlimited, and hitting the AI cap doesn't affect anything else.",
  },
];

const FaqSection = () => (
  <section id="faq" className="bg-background py-20 md:py-32">
    <div className="mx-auto max-w-[820px] px-6 md:px-10 lg:px-16">
      <motion.div {...fadeUp} className="mb-10 text-center md:mb-14">
        <SectionBadge className="mb-6">FAQ</SectionBadge>
        <h2 className="t-display-lg mb-4 text-foreground">
          The obvious questions.
          <br />
          <span className="text-muted-foreground">Answered plainly.</span>
        </h2>
      </motion.div>

      <motion.div {...fadeUp}>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(({ q, a }) => (
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

export default FaqSection;

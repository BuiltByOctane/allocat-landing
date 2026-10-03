import { useRef } from "react";
import NotificationCard from "@/components/fragments/NotificationCard";
import { useScene } from "@/hooks/useScene";
import Chapter from "./Chapter";

const SPENDS = [
  { merchant: "Swiggy", amount: 349, via: "UPI, HDFC Bank", when: "Day 2" },
  { merchant: "Uber", amount: 212, via: "UPI, HDFC Bank", when: "Day 3" },
  { merchant: "Amazon", amount: 2499, via: "Credit card ••21", when: "Day 4" },
  { merchant: "Zomato", amount: 486, via: "UPI, HDFC Bank", when: "Day 6" },
  { merchant: "BookMyShow", amount: 760, via: "UPI, HDFC Bank", when: "Day 8" },
  { merchant: "Blinkit", amount: 1134, via: "UPI, HDFC Bank", when: "Day 11" },
];

/** Days 2–12. Small spends pile up while the balance quietly drains. Scrubbed on desktop. */
const LeakChapter = () => {
  const pin = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useScene(
    root,
    (tl) => {
      tl.from("[data-spend]", { y: 36, opacity: 0, stagger: 0.5, duration: 0.6 }).from("[data-more]", {
        opacity: 0,
        duration: 0.4,
      });
    },
    { pin, end: "+=140%" },
  );

  return (
    <div ref={root}>
      <Chapter
        ref={pin}
        id="leak"
        beat="leak"
        day="12"
        when="Days 2 to 12"
        tall
        title="Then it starts leaking."
        scene={
          <div className="mx-auto max-w-[400px]">
            <div className="flex flex-col gap-2.5">
              {SPENDS.map((s) => (
                <div data-spend key={s.merchant}>
                  <NotificationCard {...s} />
                </div>
              ))}
            </div>
            <p data-more className="mt-4 text-center text-[13px] text-muted-foreground">
              and 57 more like these
            </p>
          </div>
        }
      >
        <p>
          Watch the balance below. A ₹349 dinner. A ₹212 cab. Nothing big, nothing you'd call a mistake. Each one feels
          too small to count, so nobody counts them.
        </p>
      </Chapter>
    </div>
  );
};

export default LeakChapter;

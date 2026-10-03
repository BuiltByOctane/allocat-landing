import { useRef } from "react";
import Envelope from "@/components/fragments/Envelope";
import { useScene } from "@/hooks/useScene";
import { inr } from "@/lib/format";
import Chapter from "./Chapter";
import { BEATS } from "./beats";

const BUDGETS = [
  { name: "Rent", total: 22000 },
  { name: "Savings", total: 15000 },
  { name: "Bills", total: 8000 },
  { name: "Food", total: 9000 },
  { name: "Fun", total: 8000 },
];

/** Rewind to day 1: the same salary, split into budgets before a rupee is spent. */
const EnvelopesChapter = () => {
  const pin = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const toAssign = useRef<HTMLSpanElement>(null);

  useScene(
    root,
    (tl) => {
      const money = { v: BEATS.hero.amount };
      tl.from("[data-envelope]", { x: 40, opacity: 0, stagger: 0.45, duration: 0.5 }, 0)
        .from("[data-envelope] [data-bar]", { scaleX: 0, stagger: 0.45, duration: 0.6, ease: "power1.out" }, 0.15)
        .fromTo(
          money,
          { v: BEATS.hero.amount },
          {
            v: 0,
            duration: BUDGETS.length * 0.45 + 0.3,
            ease: "none",
            onUpdate: () => {
              if (toAssign.current) toAssign.current.textContent = inr(money.v);
            },
          },
          0,
        )
        .from("[data-assigned]", { opacity: 0, y: 8, duration: 0.4 });
    },
    { pin, end: "+=130%" },
  );

  return (
    <div ref={root}>
      <Chapter
        ref={pin}
        id="story"
        beat="rewind"
        day="1"
        when="Rewind. Payday again."
        tall
        flip
        title="This time, every rupee gets a job first."
        scene={
          <div className="mx-auto max-w-[420px]">
            <div className="mb-4 flex items-center justify-between rounded-pill bg-accent py-2.5 pl-5 pr-2.5 text-accent-ink">
              <span className="text-[14px] font-bold">Left to assign</span>
              <span ref={toAssign} className="figure rounded-pill bg-accent-ink px-3.5 py-1.5 text-[18px] text-accent">
                {inr(0)}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {BUDGETS.map((b) => (
                <div data-envelope key={b.name}>
                  <Envelope name={b.name} left={b.total} total={b.total} />
                </div>
              ))}
            </div>
            <p data-assigned className="mt-4 text-center text-[13px] text-muted-foreground">
              ₹62,000 planned. Nothing left floating.
            </p>
          </div>
        }
      >
        <p>
          Same salary, same month. Before you spend anything, split it into budgets: rent, bills,
          food, fun, savings. Takes a few minutes on payday.
        </p>
        <p>Now every spend has somewhere to go, and every budget shows what's left.</p>
      </Chapter>
    </div>
  );
};

export default EnvelopesChapter;

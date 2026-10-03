import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { DownloadCTA } from "@/components/DownloadCTA";
import CountUp from "@/components/fragments/CountUp";
import { useBeat } from "./StoryContext";
import { BEATS, MONTH_DAYS } from "./beats";

/**
 * Day 1. The page opens on payday: the salary credit, counted in.
 * `.hero-*` classes are animated in by the reveal timeline in pages/Index.tsx.
 */
const PaydayHero = ({
  revealed,
  followHref = "#leak",
  followLabel = "Follow the month",
}: {
  revealed: boolean;
  /** Where the bottom arrow goes: the next chapter on /story, the story page from home. */
  followHref?: string;
  followLabel?: string;
}) => {
  const ref = useRef<HTMLElement>(null);
  useBeat("hero", ref);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-16 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
        <div className="hero-logo mb-10 flex items-end gap-3 opacity-0">
          <span className="day-numeral" aria-hidden>
            1
          </span>
          <span className="pb-2 text-[14px] font-semibold text-muted-foreground">Day 1, payday</span>
        </div>

        <div className="hero-brand mb-6 max-w-sm opacity-0">
          <div className="flex items-center gap-3 rounded-[20px] border border-border bg-card px-4 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-tile bg-accent font-display font-bold text-accent-ink">
              ₹
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-bold text-foreground">Salary credited</span>
              <span className="block text-[12px] text-muted-foreground">To your account, 9:02 am</span>
            </span>
          </div>
        </div>

        <h1 className="hero-tagline mb-8 opacity-0">
          <CountUp
            value={BEATS.hero.amount}
            from={0}
            start={revealed}
            duration={1400}
            className="hero-figure block text-foreground"
          />
          <span className="t-display-md mt-3 block max-w-[22ch] text-balance text-muted-foreground">
            just landed. Where will it be on the 30th?
          </span>
        </h1>

        <p className="hero-sub t-body mb-9 max-w-[34rem] text-muted-foreground opacity-0">
          AlloCat is a free money app. You give every rupee a job on payday, and it notices your
          UPI and card spends from bank SMS, right on your phone, so nothing slips away unseen.
        </p>

        <div className="hero-cta flex flex-col gap-3 opacity-0 sm:flex-row">
          <DownloadCTA size="lg" />
        </div>
        </div>

        {/* The month ahead: day 1 lit, 29 to go. Desktop only; the story walks through it. */}
        <div className="hero-cta hidden opacity-0 lg:block" aria-hidden>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: MONTH_DAYS }, (_, i) => i + 1).map((d) => (
              <span
                key={d}
                className={
                  d === 1
                    ? "grid aspect-square place-items-center rounded-tile bg-accent font-display text-[15px] font-bold text-accent-ink"
                    : d === MONTH_DAYS
                      ? "grid aspect-square place-items-center rounded-tile border border-dashed border-foreground/30 text-[13px] font-semibold text-foreground/70"
                      : "grid aspect-square place-items-center rounded-tile bg-tile text-[13px] font-medium text-muted-foreground/70"
                }
              >
                {d}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-muted-foreground">29 days of spending ahead.</p>
        </div>
      </div>

      <a
        href={followHref}
        className="hero-cta absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[13px] font-semibold text-muted-foreground opacity-0 transition-colors hover:text-foreground"
      >
        <ArrowDown className="h-4 w-4" /> {followLabel}
      </a>
    </section>
  );
};

export default PaydayHero;

import { cn } from "@/lib/utils";
import { inr } from "@/lib/format";

interface EnvelopeProps {
  name: string;
  left: number;
  total: number;
  tone?: "ok" | "low";
  /** Static bar instead of the width transition (scrubbed scenes animate it themselves). */
  className?: string;
  highlight?: boolean;
}

/** One budget: name, what's left of it, and a fill bar. */
const Envelope = ({ name, left, total, tone = "ok", className, highlight }: EnvelopeProps) => {
  const pct = Math.max(0, Math.min(100, (left / total) * 100));
  return (
    <div
      className={cn(
        "rounded-stat border bg-card px-4 py-3.5 transition-colors duration-500",
        highlight ? "border-accent/70" : "border-border",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[14px] font-bold text-foreground">{name}</span>
        <span className="text-[13px] tabular-nums text-muted-foreground">
          <span className={cn("font-bold", tone === "low" ? "text-neg" : "text-foreground")}>{inr(left)}</span> of{" "}
          {inr(total)}
        </span>
      </div>
      <div className="mt-2.5 h-2 overflow-hidden rounded-pill bg-tile">
        <div
          data-bar
          className={cn(
            "h-full origin-left rounded-pill transition-[width] duration-700 ease-out",
            tone === "low" ? "bg-neg" : "bg-accent",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default Envelope;

import * as React from "react";
import { cn } from "@/lib/utils";

interface LimeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  watermark?: boolean;
}

/**
 * Signature lime accent surface (mirrors the app's HeroCard).
 * bg-accent + accent-ink text, 26px radius, optional faint cat-paw watermark.
 */
const LimeCard = ({ className, watermark = true, children, ...props }: LimeCardProps) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-card bg-accent text-accent-ink",
      className
    )}
    {...props}
  >
    {watermark && (
      <div className="wordmark-watermark pointer-events-none absolute inset-0" aria-hidden />
    )}
    <div className="relative">{children}</div>
  </div>
);

export default LimeCard;

import * as React from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  /** Screenshot source. Ignored if `children` is provided. */
  src?: string;
  alt?: string;
  /** Custom inner content (e.g. an AnimatePresence cross-fade). Overrides `src`. */
  children?: React.ReactNode;
  /** CSS width, e.g. "320px". */
  width?: string;
  /** CSS aspect-ratio, e.g. "1000 / 2000". */
  ratio?: string;
  className?: string;
}

/**
 * Theme-aware phone frame with a swappable screenshot.
 * Screenshots are regenerated from the running Neo·Lime app.
 */
const PhoneMockup = ({
  src,
  alt = "",
  children,
  width = "320px",
  ratio = "1000 / 2000",
  className,
}: PhoneMockupProps) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-[2.5rem] border-[3px] border-border bg-card shadow-[0_40px_90px_-20px_rgba(0,0,0,0.45)]",
      className
    )}
    style={{ width, aspectRatio: ratio }}
  >
    {/* Dynamic island / notch */}
    {/* <div className="absolute left-1/2 top-3 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" /> */}

    <div className="absolute inset-0 overflow-hidden rounded-[2.25rem]">
      {children ?? (
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" />
      )}
    </div>

    {/* Glare */}
    <div className="pointer-events-none absolute inset-0 z-10 rounded-[2.25rem] bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
  </div>
);

export default PhoneMockup;

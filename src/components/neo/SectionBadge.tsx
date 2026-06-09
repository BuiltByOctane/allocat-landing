import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

/** Pill eyebrow shown above each section heading. */
const SectionBadge = ({ children, icon, className }: SectionBadgeProps) => (
  <div
    className={cn(
      "inline-flex items-center gap-1.5 rounded-pill border border-border bg-chip px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground",
      className
    )}
  >
    {icon}
    {children}
  </div>
);

export default SectionBadge;

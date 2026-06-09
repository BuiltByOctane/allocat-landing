import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  children?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Paired stat box (mirrors the app's StatCard).
 * Icon tile + uppercase label + big .figure value (or arbitrary children).
 */
const StatCard = ({ icon, label, value, children, tone = "light", className }: StatCardProps) => {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-stat p-5",
        dark
          ? "bg-pill text-pill-foreground"
          : "bg-card text-card-foreground border border-border",
        className
      )}
    >
      <span
        className={cn(
          "grid h-[34px] w-[34px] place-items-center rounded-tile",
          dark ? "bg-white/[0.12] text-accent" : "bg-tile text-foreground"
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            "t-label",
            dark ? "text-white/55" : "text-muted-foreground"
          )}
        >
          {label}
        </span>
        {value && <span className="figure text-[22px]">{value}</span>}
        {children}
      </div>
    </div>
  );
};

export default StatCard;

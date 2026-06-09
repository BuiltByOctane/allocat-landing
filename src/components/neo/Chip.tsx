import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chip = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-chip border border-border text-muted-foreground",
        lime: "bg-accent text-accent-ink",
        outline: "border border-border text-foreground",
        onDark: "bg-white/[0.14] text-accent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chip> {}

const Chip = ({ className, variant, ...props }: ChipProps) => (
  <span className={cn(chip({ variant }), className)} {...props} />
);

export default Chip;

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillButton = cva(
  "inline-flex items-center justify-center gap-2 rounded-pill font-bold transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-pill text-pill-foreground hover:opacity-90",
        lime: "bg-accent text-accent-ink hover:brightness-[0.97]",
        outline: "border border-border bg-card text-foreground hover:border-foreground/40",
        ghost: "bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        sm: "min-h-[38px] px-4 text-[13px]",
        md: "min-h-[46px] px-5 text-sm",
        lg: "min-h-[52px] px-7 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillButton> {
  asChild?: boolean;
}

const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(pillButton({ variant, size }), className)} {...props} />
    );
  }
);
PillButton.displayName = "PillButton";

export { PillButton, pillButton };

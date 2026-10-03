import { cn } from "@/lib/utils";
import { inr } from "@/lib/format";

interface NotificationCardProps {
  merchant: string;
  amount: number;
  via: string;
  when: string;
  className?: string;
}

/** A bank/UPI payment notification, the way it lands on a lock screen. */
const NotificationCard = ({ merchant, amount, via, when, className }: NotificationCardProps) => (
  <div className={cn("flex items-center gap-3 rounded-[20px] border border-border bg-card px-4 py-3", className)}>
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-tile bg-tile font-display text-[15px] font-bold text-foreground">
      {merchant[0]}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-[14px] font-bold text-foreground">
        Paid {inr(amount)} to {merchant}
      </span>
      <span className="block truncate text-[12px] text-muted-foreground">{via}</span>
    </span>
    <span className="shrink-0 text-[11px] font-medium text-muted-foreground">{when}</span>
  </div>
);

export default NotificationCard;

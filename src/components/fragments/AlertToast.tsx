import { BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

/** A budget alert, as AlloCat shows it on the phone. */
const AlertToast = ({ title, body, className }: { title: string; body: string; className?: string }) => (
  <div
    className={cn(
      "flex items-start gap-3 rounded-[20px] border border-border bg-card p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]",
      className,
    )}
    role="presentation"
  >
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-tile bg-warn/20 text-warn">
      <BellRing className="h-[18px] w-[18px]" />
    </span>
    <span>
      <span className="block text-[14px] font-bold text-foreground">{title}</span>
      <span className="block text-[13px] leading-snug text-muted-foreground">{body}</span>
    </span>
  </div>
);

export default AlertToast;

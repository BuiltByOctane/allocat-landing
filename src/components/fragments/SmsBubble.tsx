import { cn } from "@/lib/utils";

interface SmsBubbleProps {
  sender: string;
  /** Message split into plain strings and the parts AlloCat extracts. */
  parts: (string | { pick: string })[];
  /** Underline the extracted parts. */
  reveal?: boolean;
  className?: string;
}

/** An incoming bank SMS; the picked-out fields light up when `reveal` is on. */
const SmsBubble = ({ sender, parts, reveal, className }: SmsBubbleProps) => (
  <div className={cn("max-w-[340px]", className)}>
    <span className="mb-1.5 block pl-3 text-[12px] font-semibold text-muted-foreground">{sender}</span>
    <p className="rounded-[22px] rounded-bl-md bg-secondary px-4 py-3 text-[14px] leading-relaxed text-foreground">
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <mark
            key={i}
            className={cn(
              "rounded-[6px] bg-transparent px-0.5 font-bold text-foreground transition-colors duration-500",
              reveal && "bg-accent text-accent-ink",
            )}
          >
            {p.pick}
          </mark>
        ),
      )}
    </p>
  </div>
);

export default SmsBubble;

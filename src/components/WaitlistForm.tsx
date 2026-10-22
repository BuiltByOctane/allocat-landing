import { useId, useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { PillButton } from "@/components/neo/PillButton";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import {
  joinWaitlist,
  PREFERENCE_OPTIONS,
  type WaitlistPreference,
  type WaitlistSource,
} from "@/lib/waitlist";

const ERRORS = {
  invalid_email: "That email doesn't look right. Mind checking it?",
  invalid_preference: "Pick the option that fits you best.",
  rate_limited: "Too many tries. Give it a few minutes and try again.",
  network: "Couldn't reach us just now. Please try again.",
} as const;

/**
 * iOS auto-tracking waitlist: email + native-vs-web preference.
 * Used by the iPhone CTA dialog and the home-page section.
 */
const WaitlistForm = ({ source, className }: { source: WaitlistSource; className?: string }) => {
  const id = useId();
  const [email, setEmail] = useState("");
  const [preference, setPreference] = useState<WaitlistPreference | null>(null);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<keyof typeof ERRORS | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!preference) {
      setError("invalid_preference");
      return;
    }
    setError(null);
    setStatus("submitting");
    const res = await joinWaitlist({ email, preference, source, website });
    // `in` narrowing: this project's tsconfig isn't strict, so `res.ok` won't discriminate.
    if ("error" in res) {
      setStatus("idle");
      setError(res.error);
    } else {
      setStatus("done");
      track("waitlist_join");
    }
  };

  if (status === "done") {
    return (
      <div className={cn("flex flex-col items-center gap-3 py-4 text-center", className)} role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-ink">
          <Check className="h-5 w-5" />
        </span>
        <p className="t-heading text-foreground">You're on the list.</p>
        <p className="t-body text-muted-foreground">
          We'll email you when auto-tracking lands on iPhone.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-4 text-left", className)} noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className="text-[13px] font-bold text-foreground">
          Email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-[48px] rounded-tile border border-border bg-background px-4 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-[13px] font-bold text-foreground">
          How would you like AlloCat on iPhone?
        </legend>
        {PREFERENCE_OPTIONS.map((o) => (
          <label
            key={o.value}
            className={cn(
              "flex min-h-[48px] cursor-pointer items-center gap-3 rounded-tile border px-4 py-2.5 text-[14px] transition-colors",
              preference === o.value
                ? "border-foreground bg-card font-semibold text-foreground"
                : "border-border bg-background text-muted-foreground hover:border-foreground/30",
            )}
          >
            <input
              type="radio"
              name={`${id}-preference`}
              value={o.value}
              checked={preference === o.value}
              onChange={() => setPreference(o.value)}
              className="h-4 w-4 accent-[hsl(var(--accent-strong))]"
            />
            {o.label}
          </label>
        ))}
      </fieldset>

      {/* Honeypot: hidden from people and screen readers, filled by naive bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {error && (
        <p className="text-[13px] font-semibold text-destructive" role="alert">
          {ERRORS[error]}
        </p>
      )}

      <PillButton type="submit" variant="lime" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Join the iOS waitlist
      </PillButton>
      <p className="text-center text-[12px] text-muted-foreground">One email when it launches. No spam.</p>
    </form>
  );
};

export default WaitlistForm;

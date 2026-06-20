import { useState } from "react";
import { ArrowRight, Share, Plus, X } from "lucide-react";
import { PillButton } from "@/components/neo/PillButton";
import { usePlatform } from "@/hooks/use-platform";
import { LOGIN_URL, PLAY_STORE_URL } from "@/lib/links";

type Size = "sm" | "md" | "lg";

/** Google Play badge-style mark. */
export const PlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor" aria-hidden>
    <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
  </svg>
);

const PlayStoreButton = ({
  variant = "outline",
  size = "lg",
  label = "Get it on Google Play",
  className,
}: {
  variant?: "lime" | "outline";
  size?: Size;
  label?: string;
  className?: string;
}) => (
  <PillButton asChild variant={variant} size={size} className={className}>
    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
      <PlayIcon className="h-4 w-4" /> {label}
    </a>
  </PillButton>
);

/**
 * iOS "install the PWA" CTA. iOS Safari has no programmatic install prompt, so
 * the button reveals the manual Add-to-Home-Screen steps and a link to open the app.
 */
const IosInstallButton = ({
  variant = "lime",
  size = "lg",
  label = "Add to Home Screen",
  className,
}: {
  variant?: "lime" | "outline";
  size?: Size;
  label?: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <PillButton
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Share className="h-4 w-4" /> {label}
      </PillButton>

      {open && (
        <div className="absolute bottom-[calc(100%+0.75rem)] left-1/2 z-50 w-[280px] -translate-x-1/2 rounded-card border border-border bg-card p-4 text-left shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">Install on iPhone</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ol className="space-y-2.5 text-[13px] text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                1
              </span>
              <span className="flex items-center gap-1">
                Tap the <Share className="inline h-3.5 w-3.5 text-foreground" /> Share button
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                2
              </span>
              <span className="flex items-center gap-1">
                Choose <Plus className="inline h-3.5 w-3.5 text-foreground" /> Add to Home Screen
              </span>
            </li>
          </ol>
          <PillButton asChild variant="lime" size="md" className="mt-4 w-full">
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Open AlloCat <ArrowRight className="h-4 w-4" />
            </a>
          </PillButton>
        </div>
      )}
    </div>
  );
};

/**
 * Single adaptive store button for use inside pricing cards.
 * iOS → PWA install, Android/desktop → Play Store (with the given label).
 */
export const AppStoreButton = ({
  variant = "outline",
  size = "lg",
  label = "Get it on Google Play",
  iosLabel = "Add to Home Screen",
  className,
}: {
  variant?: "lime" | "outline";
  size?: Size;
  label?: string;
  iosLabel?: string;
  className?: string;
}) => {
  const platform = usePlatform();
  if (platform === "ios") {
    return <IosInstallButton variant={variant} size={size} label={iosLabel} className={className} />;
  }
  return <PlayStoreButton variant={variant} size={size} label={label} className={className} />;
};

/**
 * Primary download CTA pair for Hero / Footer. Adapts to the visitor's device:
 * - Android → Play Store (primary) + open in browser
 * - iOS     → Add to Home Screen (primary) + open in browser
 * - Desktop → Try AlloCat + Get it on Google Play
 */
export const DownloadCTA = ({ size = "lg" }: { size?: Size }) => {
  const platform = usePlatform();

  if (platform === "android") {
    return (
      <>
        <PlayStoreButton variant="lime" size={size} />
        <PillButton asChild variant="outline" size={size}>
          <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
            Open in browser <ArrowRight className="h-4 w-4" />
          </a>
        </PillButton>
      </>
    );
  }

  if (platform === "ios") {
    return (
      <>
        <IosInstallButton variant="lime" size={size} />
        <PillButton asChild variant="outline" size={size}>
          <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
            Open in browser <ArrowRight className="h-4 w-4" />
          </a>
        </PillButton>
      </>
    );
  }

  // desktop
  return (
    <>
      <PillButton asChild variant="lime" size={size}>
        <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
          Try AlloCat <ArrowRight className="h-4 w-4" />
        </a>
      </PillButton>
      <PlayStoreButton variant="outline" size={size} />
    </>
  );
};

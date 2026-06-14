import { useRef } from "react";
import { ArrowRight, ShieldCheck, WifiOff } from "lucide-react";
import { PillButton } from "@/components/neo/PillButton";
import LimeCard from "@/components/neo/LimeCard";
import Chip from "@/components/neo/Chip";

const LOGIN_URL = "https://allocat.xyz/auth/login";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.octane.allocat";

/** Google Play badge-style mark. */
const PlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor" aria-hidden>
    <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z" />
  </svg>
);

interface HeroSectionProps {
  revealed: boolean;
}

const HeroSection = (_props: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-28"
    >
      {/* Subtle theme-aware dot-grid */}
      <div
        className="absolute inset-0 text-foreground opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Lime glow framing the center */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent-color) / 0.18) 0%, transparent 68%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Logo */}
        <div className="hero-logo mb-6 opacity-0" style={{ willChange: "opacity, transform" }}>
          <img
            src="/allocat.png"
            alt="AlloCat logo"
            className="mx-auto h-20 w-20 dark:invert md:h-24 md:w-24"
          />
        </div>

        {/* Eyebrow */}
        <div className="hero-brand mb-6 opacity-0" style={{ willChange: "opacity, transform" }}>
          <Chip variant="default">Personal finance, automated</Chip>
        </div>

        {/* Headline */}
        <h1
          className="hero-tagline t-display-hero mb-5 max-w-2xl text-balance text-foreground opacity-0"
          style={{ willChange: "opacity, transform, filter" }}
        >
          Plan your money.{" "}
          <span className="gradient-text">Live your life.</span>
        </h1>

        {/* Sub */}
        <p
          className="hero-sub t-body mb-9 max-w-xl text-muted-foreground opacity-0"
          style={{ willChange: "opacity, transform, filter" }}
        >
          An offline-first finance app. Budgets, net worth, goals, debt — and SMS spends that log
          themselves. Free to start, no card required.
        </p>

        {/* CTAs */}
        <div
          className="hero-cta mb-12 flex flex-col gap-3 opacity-0 sm:flex-row"
          style={{ willChange: "opacity, transform" }}
        >
          <PillButton asChild variant="lime" size="lg">
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Try AlloCat <ArrowRight className="h-4 w-4" />
            </a>
          </PillButton>
          <PillButton asChild variant="outline" size="lg">
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              <PlayIcon className="h-4 w-4" /> Get it on Google Play
            </a>
          </PillButton>
        </div>

        {/* Signature lime trust card */}
        <div
          className="hero-cta flex w-full max-w-md items-stretch gap-3 opacity-0"
          style={{ willChange: "opacity, transform" }}
        >
          <LimeCard className="flex flex-1 flex-col items-start justify-center gap-2 p-5 text-left">
            <span className="figure text-[38px] leading-none">100%</span>
            <span className="t-label leading-[1.3] text-accent-ink/70">On-device<br />&amp; private</span>
          </LimeCard>
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-1 items-center gap-2.5 rounded-stat border border-border bg-card px-4">
              <WifiOff className="h-4 w-4 text-foreground" />
              <span className="text-[13px] font-bold text-foreground">Works offline</span>
            </div>
            <div className="flex flex-1 items-center gap-2.5 rounded-stat border border-border bg-card px-4">
              <ShieldCheck className="h-4 w-4 text-foreground" />
              <span className="text-[13px] font-bold text-foreground">No ads, no tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-cta absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0">
        <span className="t-label text-muted-foreground/70">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-border">
          <div className="absolute h-2 w-full animate-scroll-down bg-accent-strong" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

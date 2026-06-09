import { useRef } from "react";
import { ArrowRight, Github, ShieldCheck, WifiOff } from "lucide-react";
import { PillButton } from "@/components/neo/PillButton";
import LimeCard from "@/components/neo/LimeCard";
import Chip from "@/components/neo/Chip";

const LOGIN_URL = "https://allocat.xyz/auth/login";
const GITHUB_URL = "https://github.com/devoctane/allocat";

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
          <Chip variant="default">Open-source personal finance</Chip>
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
          A free, open-source, offline-first finance app. Budgets, net worth, goals, debt — and
          SMS spends that log themselves. No subscriptions. No noise.
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
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> View on GitHub
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

import { useEffect, useRef } from "react";
import { Github } from "lucide-react";
import { PillButton } from "@/components/neo/PillButton";
import gsap from "gsap";

const LOGIN_URL = "https://allocat.xyz/auth/login";
const GITHUB_URL = "https://github.com/devoctane/allocat";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "SMS Auto-Log", href: "#sms" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contribute", href: "#contribute" },
  ],
  Features: [
    { label: "Budgets & categories", href: "#features" },
    { label: "Net worth & goals", href: "#features" },
    { label: "Debt & lent money", href: "#features" },
    { label: "AlloCat AI", href: "#insights" },
  ],
  Resources: [
    { label: "GitHub", href: GITHUB_URL },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const Footer = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const marqueeText = "PLAN YOUR MONEY. LIVE YOUR LIFE. • ".repeat(10);

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pb-8 pt-16 md:pt-24">
      <div className="relative z-10">
        {/* Marquee */}
        <div className="mb-16 overflow-hidden md:mb-24">
          <div ref={marqueeRef} className="inline-block whitespace-nowrap">
            <span className="font-display text-5xl font-bold text-foreground/[0.05] md:text-7xl lg:text-8xl">
              {marqueeText}
            </span>
          </div>
        </div>

        {/* CTA section */}
        <div className="mb-16 px-4 text-center md:mb-24">
          <h2 className="t-display-lg mb-4 text-foreground">
            Start for free at
            <br />
            <span className="gradient-text">allocat.xyz</span>
          </h2>
          <p className="t-body mx-auto mb-8 max-w-md text-muted-foreground">
            Open source, free forever. No credit card required.
          </p>
          <div className="inline-flex flex-col justify-center gap-4 sm:flex-row">
            <PillButton asChild variant="lime" size="lg">
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Try AlloCat
              </a>
            </PillButton>
            <PillButton asChild variant="outline" size="lg">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </PillButton>
          </div>
        </div>

        {/* Footer grid */}
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <div className="mb-16 grid grid-cols-2 gap-10 border-t border-border pt-12 md:grid-cols-5">
            {/* Logo column */}
            <div className="col-span-2">
              <a href="#hero" className="group mb-4 flex w-fit items-center gap-2.5">
                <img
                  src="/allocat.png"
                  alt="AlloCat"
                  className="h-8 w-8 transition-opacity group-hover:opacity-70 dark:invert"
                />
                <span className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-muted-foreground">
                  allocat
                </span>
              </a>
              <p className="t-body mb-6 max-w-xs text-muted-foreground">
                A free, open-source personal finance app. Plan your money. Live your life.
              </p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="t-label mb-4 text-foreground">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <span className="text-xs text-muted-foreground">
              Built by © {new Date().getFullYear()}{" "}
              <a
                href="https://www.devoctane.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground hover:underline"
              >
                Octane Innovations
              </a>
              . Open source under MIT.
            </span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent-strong" />
              <span className="text-xs text-muted-foreground">Open source &amp; actively maintained</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { PillButton } from "@/components/neo/PillButton";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Features", target: "features" },
  { label: "SMS Auto-Log", target: "sms" },
  { label: "How It Works", target: "how-it-works" },
  { label: "Contribute", target: "contribute" },
];

const LOGIN_URL = "https://allocat.xyz/auth/login";
const GITHUB_URL = "https://github.com/devoctane/allocat";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (target: string) => {
    setMobileOpen(false);
    const el = document.getElementById(target);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-4 flex items-center justify-between px-3 transition-all duration-300 md:mx-auto md:max-w-[1100px] md:px-5 ${
            scrolled
              ? "glass-dock rounded-nav border border-border py-2.5"
              : "border border-transparent py-2"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleNav("hero")}
            className="flex items-center gap-2.5 pl-2 transition-opacity hover:opacity-70"
          >
            <img src="/allocat.png" alt="AlloCat" className="h-7 w-7 dark:invert" />
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              allocat
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.target)}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2.5 md:flex">
            <ThemeToggle />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-pill border border-border bg-card text-muted-foreground transition-all hover:text-foreground active:scale-[0.92]"
              title="View on GitHub"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <PillButton asChild variant="lime" size="sm">
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Try AlloCat
              </a>
            </PillButton>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[2px] w-5 origin-center bg-foreground transition-all duration-300 ${mobileOpen ? "translate-y-[8px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 origin-center bg-foreground transition-all duration-300 ${mobileOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-background/95 pt-20 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.target)}
              className="font-display text-2xl font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-4 flex flex-col items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <PillButton asChild variant="lime" size="lg">
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                Try AlloCat
              </a>
            </PillButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

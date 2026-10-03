import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PillButton } from "@/components/neo/PillButton";
import ThemeToggle from "@/components/ThemeToggle";
import { LOGIN_URL } from "@/lib/links";
import { track, trackClick } from "@/lib/track";

/** `to` is a route, optionally with an anchor ("/#how-it-works"). */
const NAV_LINKS = [
  { label: "How it works", to: "/#how-it-works" },
  { label: "The story", to: "/story" },
  { label: "Why free", to: "/why-free" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNav = (to: string) => {
    setMobileOpen(false);
    const [path, anchor] = to.split("#");
    const target = path || "/";
    if (target === pathname) {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(to);
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
            onClick={() => handleNav("/")}
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
                onClick={() => handleNav(link.to)}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2.5 md:flex">
            {/* <ThemeToggle /> */}
            <PillButton asChild variant="lime" size="sm">
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackClick("cta_login_click")}
              >
                Try AlloCat
              </a>
            </PillButton>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* <ThemeToggle /> */}
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
              onClick={() => handleNav(link.to)}
              className="font-display text-2xl font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-4 flex flex-col items-center gap-4">
            <PillButton asChild variant="lime" size="lg">
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("cta_login_click");
                  setMobileOpen(false);
                }}
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

import { motion } from "framer-motion";
import {
  GitFork,
  Bug,
  Lightbulb,
  Github,
  Star,
  WifiOff,
  ShieldCheck,
  Palette,
} from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import SectionBadge from "@/components/neo/SectionBadge";
import { PillButton } from "@/components/neo/PillButton";

const GITHUB_URL = "https://github.com/devoctane/allocat";

const ways = [
  {
    icon: GitFork,
    title: "Fork & Build",
    description:
      "Clone the repo, build features you want to see, and open a pull request. Every contribution counts.",
  },
  {
    icon: Bug,
    title: "Report Bugs",
    description:
      "Found something broken? Open an issue on GitHub and help us squash it for everyone.",
  },
  {
    icon: Lightbulb,
    title: "Suggest Features",
    description:
      "Have an idea? Start a discussion and help shape what AlloCat becomes next.",
  },
];

const trust = [
  { icon: WifiOff, label: "Offline-first PWA" },
  { icon: ShieldCheck, label: "Private by design" },
  { icon: Palette, label: "Themes & accents" },
  { icon: Github, label: "MIT licensed" },
];

const ContributeSection = () => (
  <section id="contribute" className="bg-background py-20 md:py-32">
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-16 text-center md:mb-20">
        <SectionBadge className="mb-6">Open Source</SectionBadge>
        <h2 className="t-display-lg mb-4 text-foreground">
          Built in the open.
          <br />
          <span className="text-muted-foreground">Improved together.</span>
        </h2>
        <p className="t-body mx-auto max-w-lg text-muted-foreground">
          AlloCat is free and open source. Whether you want to fix a bug, ship a feature, or share
          an idea — you're welcome here.
        </p>
      </motion.div>

      {/* Trust strip */}
      <motion.div {...fadeUp} className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {trust.map((t) => (
          <div
            key={t.label}
            className="inline-flex items-center gap-2 rounded-pill border border-border bg-card px-4 py-2"
          >
            <t.icon className="h-4 w-4 text-accent-strong" />
            <span className="text-[13px] font-bold text-foreground">{t.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Contribution cards */}
      <div className="mb-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {ways.map((way, i) => (
          <motion.div
            key={way.title}
            {...fadeUp}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay: i * 0.12 }}
            className="group rounded-card border border-border bg-card p-8 transition-all duration-500 hover:border-foreground/15"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-tile bg-tile text-foreground transition-transform duration-300 group-hover:scale-110">
              <way.icon className="h-6 w-6" />
            </div>
            <h3 className="t-title mb-2 text-foreground">{way.title}</h3>
            <p className="t-body text-muted-foreground">{way.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA block */}
      <motion.div {...fadeUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <PillButton asChild variant="lime" size="lg">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" /> Fork on GitHub
          </a>
        </PillButton>
        <PillButton asChild variant="outline" size="lg">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Star className="h-4 w-4" /> Star the repo
          </a>
        </PillButton>
      </motion.div>
    </div>
  </section>
);

export default ContributeSection;

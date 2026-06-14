import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SmsSection from "@/components/SmsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InsightsSection from "@/components/InsightsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);

    // Staggered page-reveal timeline after loading screen exits
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Navbar slides down
    tl.fromTo(
      "#main-nav",
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );

    // Hero logo + brand
    tl.fromTo(
      ".hero-logo, .hero-brand",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1 },
      "-=0.3"
    );

    // Tagline + sub — blur-in
    tl.fromTo(
      ".hero-tagline, .hero-sub",
      { y: 20, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.12 },
      "-=0.5"
    );

    // CTAs + scroll indicator
    tl.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
      "-=0.4"
    );
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
      <Navbar />
      <HeroSection revealed={revealed} />
      <FeaturesSection />
      <SmsSection />
      <HowItWorksSection />
      <InsightsSection />
      <PricingSection />
      <Footer />
    </>
  );
};

export default Index;

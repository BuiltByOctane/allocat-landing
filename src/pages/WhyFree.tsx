import { useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import FounderStory from "@/components/whyfree/FounderStory";
import SupportSection from "@/components/SupportSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

/** Founder note, what it costs, Premium + founding-member offer, full FAQ. */
const WhyFree = () => {
  useEffect(() => {
    gsap.fromTo("#main-nav", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" });
  }, []);

  return (
    <>
      <Seo
        path="/why-free"
        title="Why AlloCat is free"
        description="Two years of envelope budgeting in a Google Sheet, and the manual logging that broke it. Why AlloCat exists, why it's free today, and how early users lock founding-member pricing."
      />
      <Navbar />
      <main>
        <FounderStory />
        <SupportSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
};

export default WhyFree;

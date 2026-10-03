import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import Glimpses from "@/components/home/Glimpses";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { useHeroReveal } from "@/hooks/useHeroReveal";

/**
 * Home is deliberately brief: what it is, how it works, is it safe and free, download.
 * The long-form month story lives at /story and the founder note at /why-free.
 */
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { revealed, reveal } = useHeroReveal();

  const handleLoadComplete = () => {
    setIsLoading(false);
    reveal();
  };

  return (
    <>
      <Seo
        path="/"
        title="AlloCat: Budget Every Rupee, Automatically"
        description="AlloCat is a free personal finance app. Budget your income on payday, then let AlloCat notice your UPI and card spends from bank SMS, right on your phone, and help you allocate them. No ads."
      />
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
      <Navbar />
      <main>
        <HomeHero revealed={revealed} />
        <HowItWorks />
        <Glimpses />
        <FaqSection short />
      </main>
      <Footer />
    </>
  );
};

export default Index;

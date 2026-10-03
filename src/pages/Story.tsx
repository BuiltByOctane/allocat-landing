import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import { StoryProvider } from "@/components/story/StoryContext";
import WalletStrip from "@/components/story/WalletStrip";
import PaydayHero from "@/components/story/PaydayHero";
import LeakChapter from "@/components/story/LeakChapter";
import QuestionChapter from "@/components/story/QuestionChapter";
import EnvelopesChapter from "@/components/story/EnvelopesChapter";
import SmsChapter from "@/components/story/SmsChapter";
import LearnChapter from "@/components/story/LearnChapter";
import NudgeChapter from "@/components/story/NudgeChapter";
import PictureChapter from "@/components/story/PictureChapter";
import CalmChapter from "@/components/story/CalmChapter";
import Footer from "@/components/Footer";
import { useHeroReveal } from "@/hooks/useHeroReveal";

/**
 * The month story: payday → the leak → "where did it go?" → rewind with budgets →
 * SMS notices spends → it learns → a nudge → the bigger picture → month end, nothing missing.
 */
const Story = () => {
  const { revealed, reveal } = useHeroReveal();
  useEffect(reveal, [reveal]);

  return (
    <StoryProvider>
      <Seo
        path="/story"
        title="A month with AlloCat"
        description="Follow one salary from payday to day 30: the small spends that leak away, and how envelope budgets and automatic SMS spend tracking keep every rupee accounted for."
      />
      <Navbar />
      <main>
        <PaydayHero revealed={revealed} />
        <LeakChapter />
        <QuestionChapter />
        <EnvelopesChapter />
        <SmsChapter />
        <LearnChapter />
        <NudgeChapter />
        <PictureChapter />
        <CalmChapter />
      </main>
      <Footer />
      <WalletStrip />
    </StoryProvider>
  );
};

export default Story;

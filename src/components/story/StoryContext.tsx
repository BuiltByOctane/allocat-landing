import { createContext, useContext, useEffect, useState, type ReactNode, type RefObject } from "react";
import type { BeatId } from "./beats";

interface StoryState {
  beat: BeatId | null;
  setBeat: (beat: BeatId | null) => void;
}

const StoryContext = createContext<StoryState>({ beat: null, setBeat: () => {} });

export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [beat, setBeat] = useState<BeatId | null>(null);
  return <StoryContext.Provider value={{ beat, setBeat }}>{children}</StoryContext.Provider>;
};

export const useStory = () => useContext(StoryContext);

/**
 * Marks `ref` as the chapter for `beat` while it crosses the middle of the viewport.
 * Pass `null` for sections outside the story (pricing, FAQ) so the strip steps aside.
 */
export function useBeat(beat: BeatId | null, ref: RefObject<HTMLElement>) {
  const { setBeat } = useStory();
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setBeat(beat),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [beat, ref, setBeat]);
}

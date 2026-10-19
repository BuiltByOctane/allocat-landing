import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeUp } from "@/lib/motionVariants";
import { useBeat } from "@/components/story/StoryContext";
import { DownloadCTA } from "@/components/DownloadCTA";

/**
 * Home: the product demo, recorded on a real phone with a voiceover and burnt-in subtitles.
 * It has sound, so it never autoplays: a poster and a play button until the visitor taps,
 * and preload="none" keeps the 11 MB file off the initial page load.
 */
const DemoVideo = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  useBeat(null, ref);

  const start = () => {
    setStarted(true);
    void videoRef.current?.play();
  };

  return (
    <section id="demo" ref={ref} className="bg-background pb-20 md:pb-28">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 md:px-10 lg:px-16">
        <motion.div {...fadeUp} className="order-2 text-center md:order-1 md:text-left">
          <p className="mb-4 text-[14px] font-semibold text-muted-foreground">See it in action</p>
          <h2 className="t-display-lg mb-5 text-balance text-foreground">Watch it catch a chai.</h2>
          <p className="t-body mb-8 text-muted-foreground">
            A chai paid on UPI, picked up from the bank SMS and logged in one tap. Then loans, goals and the
            month-end report. Three and a half minutes, recorded on a real phone.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <DownloadCTA size="lg" />
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="order-1 mx-auto w-full max-w-[340px] md:order-2"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-card p-2 shadow-sm">
            <div className="relative aspect-[720/1564] overflow-hidden rounded-[24px] bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src="/demo/allocat-demo.mp4"
                poster="/demo/allocat-demo-poster.jpg"
                preload="none"
                playsInline
                controls={started}
                onPlay={() => setStarted(true)}
                aria-label="AlloCat product demo with voiceover and subtitles"
              />
              {!started && (
                <button
                  type="button"
                  onClick={start}
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 transition-colors hover:bg-black/35"
                  aria-label="Play the AlloCat demo video"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg transition-transform group-hover:scale-105">
                    <Play className="ml-1 h-7 w-7 fill-current" />
                  </span>
                  <span className="rounded-full bg-black/60 px-3 py-1 text-[13px] font-semibold text-white">
                    Watch the demo · 3:38
                  </span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideo;

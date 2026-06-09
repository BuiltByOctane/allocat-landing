import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Track", "Budget", "Grow", "logo"];
const DURATION = 3600;

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => Math.min(i + 1, WORDS.length - 1));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const tick = useCallback(
    (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(Math.floor((elapsed / DURATION) * 100), 100);
      setCount(progress);
      if (progress < 100) {
        requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        // Trigger exit animation then call onComplete
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
        }, 200);
      }
    },
    [onComplete]
  );

  useEffect(() => {
    requestAnimationFrame(tick);
  }, [tick]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-background"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top left — Logo */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 p-8"
          >
            <img src="/allocat.png" alt="AlloCat" className="h-8 w-8 dark:invert" />
            <span className="font-display text-sm font-bold tracking-tight text-foreground">
              allocat
            </span>
          </motion.div>

          {/* Center — rotating word */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {WORDS[wordIndex] === "logo" ? (
                <motion.img
                  key="logo"
                  src="/allocat.png"
                  alt="AlloCat Logo"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-24 w-24 dark:invert md:h-32 md:w-32"
                />
              ) : (
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="t-display-md text-5xl text-foreground md:text-7xl"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom — counter */}
          <div className="flex flex-col items-end p-8">
            <span className="figure text-6xl text-foreground md:text-8xl lg:text-9xl">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          {/* Progress bar — lime */}
          <div className="h-[3px] w-full bg-border">
            <div
              className="h-full origin-left bg-accent transition-transform duration-75"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
        </motion.div>
      ) : (
        // Curtain panel that slides up and off screen
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[9999] bg-background"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

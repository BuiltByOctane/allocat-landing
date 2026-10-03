import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BeatId } from "./beats";
import { useBeat } from "./StoryContext";

interface ChapterProps {
  id: string;
  beat: BeatId;
  /** The big numeral: "12", "2–12". */
  day: string;
  /** Sentence-case caption next to it. */
  when: string;
  title: ReactNode;
  children?: ReactNode;
  /** The animated fragment. */
  scene: ReactNode;
  /** Put the scene on the left (desktop) to keep the page from reading like a template. */
  flip?: boolean;
  /** Full-viewport height so the scene can pin while it scrubs. */
  tall?: boolean;
  className?: string;
}

/** Shared chapter shell: day marker, line, short paragraph, fragment. */
const Chapter = forwardRef<HTMLDivElement, ChapterProps>(
  ({ id, beat, day, when, title, children, scene, flip, tall, className }, pinRef) => {
    const sectionRef = useRef<HTMLElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(pinRef, () => innerRef.current as HTMLDivElement);
    useBeat(beat, sectionRef);

    return (
      <section id={id} ref={sectionRef} className={cn("relative px-6 md:px-10 lg:px-16", className)}>
        <div
          ref={innerRef}
          className={cn(
            "mx-auto grid max-w-[1200px] items-center gap-12 py-24 md:grid-cols-2 md:gap-16 md:py-32",
            tall && "md:min-h-screen md:py-16",
          )}
        >
          <div className={cn("max-w-[34rem]", flip && "md:order-2")}>
            <div className="mb-6 flex items-end gap-3">
              <span className="day-numeral" aria-hidden>
                {day}
              </span>
              <span className="pb-2 text-[14px] font-semibold text-muted-foreground">{when}</span>
            </div>
            <h2 className="t-display-lg mb-5 text-balance text-foreground">{title}</h2>
            {children && <div className="t-body max-w-[30rem] space-y-4 text-muted-foreground">{children}</div>}
          </div>
          <div className={cn("relative", flip && "md:order-1")}>{scene}</div>
        </div>
      </section>
    );
  },
);
Chapter.displayName = "Chapter";

export default Chapter;

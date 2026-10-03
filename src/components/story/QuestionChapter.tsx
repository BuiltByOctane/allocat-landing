import { useRef } from "react";
import { useBeat } from "./StoryContext";

/** Day 18. The quiet beat: no fragment, just the question everyone has asked. */
const QuestionChapter = () => {
  const ref = useRef<HTMLElement>(null);
  useBeat("question", ref);

  return (
    <section id="question" ref={ref} className="relative px-6 py-32 md:px-10 md:py-48 lg:px-16">
      <div className="mx-auto max-w-[1000px] text-center">
        <p className="mb-6 text-[14px] font-semibold text-muted-foreground">Day 18. ₹3,150 left.</p>
        <h2 className="question-type text-balance text-foreground">Where did it all go?</h2>
        <p className="t-body mx-auto mt-8 max-w-[30rem] text-muted-foreground">
          You didn't overspend on purpose. You just never saw it leave. The bank app shows every
          payment, and still can't tell you what the month went on.
        </p>
      </div>
    </section>
  );
};

export default QuestionChapter;

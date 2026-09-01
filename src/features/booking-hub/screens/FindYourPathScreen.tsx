import { useEffect, useRef } from "react";
import { PageIntro } from "../components/PageIntro";
import { scrollToRegion } from "../lib/session";

export function FindYourPathScreen({
  step,
  onAnswer,
}: {
  step: 1 | 2 | 3;
  onAnswer: (step: 1 | 2 | 3, value: string) => void;
}) {
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToRegion(topRef.current);
  }, [step]);

  const questions: Record<1 | 2 | 3, { q: string; opts: { label: string; value: string }[] }> = {
    1: {
      q: "Do you know where you want to stay?",
      opts: [
        { label: "Yes, I have a specific hotel or destination in mind", value: "specific" },
        { label: "Not yet, I'd love some recommendations", value: "recommendations" },
      ],
    },
    2: {
      q: "How soon do you want to book?",
      opts: [
        { label: "Right now, I'm ready to go", value: "now" },
        { label: "I've got some time, I want to get this right", value: "time" },
      ],
    },
    3: {
      q: "What matters most to you?",
      opts: [
        { label: "Lowest price, booked fast", value: "price" },
        {
          label: "Quality advice, great perks, and confidence that my trip will actually be great",
          value: "quality",
        },
      ],
    },
  };
  const { q, opts } = questions[step];
  return (
    <>
      <PageIntro eyebrow="Quick quiz" title="Let's find your lane." />
      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-12">
        <div ref={topRef} className="mx-auto max-w-[680px]" style={{ scrollMarginTop: 96 }}>
          <div className="mb-8 flex gap-2 md:mb-10">
            {[1, 2, 3].map((d) => (
              <span
                key={d}
                className={`h-7 w-[3px] ${d <= step ? "bg-brand" : "bg-hairline"}`}
              />
            ))}
          </div>
          <div key={step} className="animate-step">
            <h2 className="section-heading mb-6 text-ink">{q}</h2>
            <div className="flex flex-col gap-3">
              {opts.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => onAnswer(step, value)}
                  className="flex min-h-14 items-center gap-4 rounded-[8px] border border-line bg-background px-5 py-4 text-left text-[16px] leading-6 text-ink transition-all duration-[180ms] hover:border-ink hover:bg-soft"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { Btn } from "../components/Button";
import { PageIntro } from "../components/PageIntro";

export function FindYourPathResultScreen({
  result,
  onContinue,
}: {
  result: { path: "book-now" | "concierge" };
  onContinue: () => void;
}) {
  const isBookNow = result.path === "book-now";
  return (
    <>
      <PageIntro eyebrow="Your result" title="Here's our read." />
      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-[680px]">
          <h2 className="section-heading mb-6 text-ink">
            {isBookNow ? "Book Direct looks right for you" : "Concierge looks right for you"}
          </h2>
          <p className="body-copy mb-10 text-ink-muted">
            {isBookNow
              ? "You know what you want and you're ready to move fast, let's get you the best rate."
              : "A bit of guidance will go a long way here, let's get to know your trip."}
          </p>
          <Btn variant="accent" onClick={onContinue}>
            {isBookNow ? "Continue to booking" : "Continue to trip planning"}
          </Btn>
        </div>
      </div>
    </>
  );
}

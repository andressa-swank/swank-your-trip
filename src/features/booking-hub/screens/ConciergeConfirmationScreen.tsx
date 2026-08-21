import { PageIntro } from "../components/PageIntro";

export function ConciergeConfirmationScreen({ onHome }: { onHome: () => void }) {
  return (
    <>
      <PageIntro title="Your request is in!" />
      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-[680px]">
          <p className="body-copy text-ink-muted">
            We'll be in touch if we need any additional information. Your personalized proposal will be ready
            within 1–3 business days, depending on the complexity of your trip.
          </p>

          <div className="mt-10 rounded-[8px] border border-hairline bg-soft p-6 md:p-8">
            <h2 className="section-heading text-ink">Want to talk it through?</h2>
            <p className="mt-4 text-[16px] leading-7 text-ink-muted">
              If you'd like one-on-one advice in the meantime, you can book an optional consultation with Don or
              one of our Travel Specialists.
            </p>
            <a
              href="https://calendly.com/book-swankguide"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base button-accent mt-6"
            >
              Book a Consultation
            </a>
            <p className="mt-4 text-[15px] leading-6 text-ink-muted">
              Your consultation fee will be credited toward your planning fee.
            </p>
          </div>

          <button onClick={onHome} className="text-link mt-8 inline-flex min-h-11 items-center text-[15px]">
            Back to start
          </button>
        </div>
      </div>
    </>
  );
}

import { PageIntro } from "../components/PageIntro";

export function ConciergeConfirmationScreen(_: { onHome: () => void }) {
  return (
    <>
      <PageIntro title="Your request is in!" />
      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-[680px]">
          <p className="body-copy text-ink-muted">
            We'll be in touch if we need any additional information. Your personalized proposal will
            be ready within 1–3 business days.
          </p>

          <div className="mt-10 rounded-[8px] border border-hairline bg-soft p-6 md:p-8">
            <h2 className="section-heading text-ink">Want to talk it through?</h2>
            <p className="mt-4 text-[16px] leading-7 text-ink-muted">
              Book an optional consultation with Don or one of our Travel Specialists.
            </p>
            <a
              href="https://calendly.com/book-swankguide"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base button-accent mt-6"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}


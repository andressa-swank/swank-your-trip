import { Btn } from "../components/Button";
import { PageIntro } from "../components/PageIntro";
import type { Screen } from "../types";

export function ConciergeHowScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const steps = [
    "Tell us the basics of your trip",
    "We go deeper, by email or on a consultation call, until it's right",
    "We handle the details. You show up and enjoy.",
  ];
  const benefits = [
    "Save hours of research, planning, and logistics",
    "VIP perks you can't book yourself",
    "One expert, start to finish",
    "Your call on how much help you want",
  ];
  return (
    <>
      <PageIntro
        eyebrow="Concierge"
        title="How Concierge Works"
        sub="A guided way to book, minus the hours of research. Scroll to see how it flows."
      >
        <div className="mt-8">
          <Btn variant="accent" onClick={() => onNav("intake")}>
            Plan my trip
          </Btn>
        </div>
      </PageIntro>

      <div className="page-container py-12 md:py-[72px]">
        <div className="max-w-[820px]">
          <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">
            The process
          </p>
          {steps.map((s, i) => (
            <div key={s} className="flex items-start gap-5 border-b border-hairline py-6 last:border-b-0">
              <span className="text-[15px] leading-8 text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <p className="section-heading text-ink">{s}</p>
            </div>
          ))}

          <p className="mb-6 mt-12 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">
            Why this lane
          </p>
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-3 border-b border-hairline py-4 text-[16px] leading-7 text-ink-muted last:border-b-0">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {b}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-hairline bg-soft py-12 md:py-16">
        <div className="page-container">
          <h2 className="section-heading mb-6 text-ink">Levels of support</h2>
          <div className="grid max-w-[820px] gap-6 sm:grid-cols-2">
            <div className="surface-card p-6">
              <p className="mb-2 text-[16px] leading-6 text-ink">Hotel only + perks</p>
              <p className="text-[15px] uppercase tracking-wide text-ink-muted">Free</p>
            </div>
            <div className="surface-card p-6">
              <p className="mb-2 text-[16px] leading-6 text-ink">Every detail handled</p>
              <p className="text-[15px] uppercase tracking-wide text-ink-muted">From $30/day</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

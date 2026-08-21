import { useEffect, useRef, useState } from "react";
import heroPhoto from "@/assets/hero-photo.png.asset.json";
import { Btn } from "../components/Button";
import { Eyebrow } from "../components/Eyebrow";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { TestedStaysSection } from "../components/TestedStaysSection";
import type { Screen } from "../types";

export function LandingScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCardsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cardAnim = (i: number) =>
    cardsVisible
      ? { animation: `content-enter 450ms cubic-bezier(0.22,1,0.36,1) ${i * 80}ms forwards` }
      : { opacity: 0 };

  return (
    <>
      <section className="landing-hero bg-ink">
        <img
          src={heroPhoto.url}
          alt="Infinity pool reflecting palm trees at a beachfront resort"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="page-container relative z-10 pb-10 md:pb-[72px]">
          <div className="animate-enter max-w-[680px]">
            <Eyebrow className="text-brand">Booking Hub</Eyebrow>
            <h1 className="display-heading mt-3 text-white">
              Pick your
              <br />
              path.
            </h1>
            <p className="body-copy mt-5 max-w-[620px] text-white/85">
              Two ways to book with us. However much help you want, we've got a lane for it.
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[12px] uppercase tracking-[0.14em] text-white/70">
          Scroll
        </div>
      </section>

      <section className="page-container py-12 md:py-[72px]">
        <div ref={cardsRef} className="choice-grid">
          <div className="surface-card choice-card" style={cardAnim(0)}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="section-heading text-ink">Concierge</h2>
              <span className="badge-pill shrink-0 bg-brand uppercase tracking-wide text-ink">
                Recommended
              </span>
            </div>
            <p className="text-[16px] leading-7 text-ink-muted">
              From just a hotel booking with perks to full trip planning — we advise, book, and handle
              everything.
            </p>
            <p className="mt-6 text-[15px] leading-6 italic text-ink-muted">
              Not instant. We get to know you first. Worth it — takes less than 2 minutes to start.
            </p>
            <div className="mt-8 flex-1" />
            <Btn full variant="accent" onClick={() => onNav("intake")}>
              Plan my trip
            </Btn>
          </div>

          <div className="surface-card choice-card" style={cardAnim(1)}>
            <h2 className="section-heading mb-4 text-ink">Book Direct</h2>
            <p className="text-[16px] leading-7 text-ink-muted">
              Curated hotels at the best price, booked instantly.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Personally vetted — no sponsorships, no paid placements",
                "Compare rates across major platforms in seconds",
                "Trip-prep kit plus our destination e-book with every booking",
              ].map((li) => (
                <div key={li} className="flex gap-3 text-[16px] leading-7 text-ink-muted">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex-1" />
            <Btn full variant="secondary" onClick={() => onNav("destination")}>
              Book Now
            </Btn>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-soft py-12 md:py-16">
        <div className="page-container flex flex-col items-center gap-6 text-center">
          <p className="body-copy max-w-[680px] text-ink">
            Not sure which fits? Answer three quick questions and we'll point you the right way.
          </p>
          <Btn variant="secondary" onClick={() => onNav("quiz-1")}>
            Help me decide
          </Btn>
        </div>
      </section>

      <TestimonialsSection />
      <TestedStaysSection />
    </>
  );
}

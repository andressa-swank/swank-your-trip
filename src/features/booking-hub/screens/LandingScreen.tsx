import { useEffect, useRef, useState } from "react";
import heroPhoto from "@/assets/hero-photo.png.asset.json";
import conciergePhoto from "@/assets/concierge-group-rafting.jpg.asset.json";
import bookDirectPhoto from "@/assets/book-direct-hero.webp";
import { Btn } from "../components/Button";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { TestedStaysSection } from "../components/TestedStaysSection";
import type { Screen } from "../types";

export function LandingScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCardsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardAnim = (index: number) => cardsVisible
    ? { animation: `content-enter 450ms cubic-bezier(0.22,1,0.36,1) ${index * 80}ms forwards` }
    : { opacity: 0 };

  return (
    <>
      <section className="landing-hero bg-ink">
        <img src={heroPhoto.url} alt="Infinity pool reflecting palm trees at a beachfront resort" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="page-container relative z-10">
          <div className="animate-enter mx-auto max-w-[680px]">
            <h1 className="display-heading text-white">Pick your path</h1>
          </div>
        </div>
      </section>

      <section className="page-container py-12 md:py-[72px]">
        <p className="mx-auto mb-10 max-w-[680px] text-center text-[20px] leading-[30px] text-ink">
          Two ways to book with us. However much help you want, we've got a lane for it.
        </p>
        <div ref={cardsRef} className="choice-grid">
          <article className="choice-card" style={cardAnim(0)}>
            <div className="choice-card__media">
              <img src={conciergePhoto.url} alt="" />
              <span className="choice-card__recommended">Recommended</span>
            </div>
            <div className="choice-card__content">
              <h2>Concierge</h2>
              <p>From just a hotel booking with perks to full trip planning — we advise, book, and handle everything.</p>
              <div className="choice-card__details">
                <span>Not instant — we get to know you first</span>
                <span>Takes less than 2 minutes to start</span>
                <button type="button" onClick={() => onNav("how")}>Discover How Concierge Works</button>
              </div>
              <Btn variant="accent" onClick={() => onNav("intake")}>Plan my trip</Btn>
            </div>
          </article>

          <article className="choice-card" style={cardAnim(1)}>
            <div className="choice-card__media"><img src={bookDirectPhoto} alt="" /></div>
            <div className="choice-card__content">
              <h2>Book Direct</h2>
              <p>Curated hotels at the best price, booked instantly.</p>
              <div className="choice-card__details">
                <span>Personally vetted — no sponsorships, no paid placements</span>
                <span>Compare rates across major platforms in seconds</span>
                <span>Trip-prep kit plus our destination e-book with every booking</span>
              </div>
              <Btn variant="secondary" onClick={() => onNav("destination")}>Book Now</Btn>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-hairline bg-soft py-12 md:py-16">
        <div className="page-container flex flex-col items-center gap-6 text-center">
          <p className="body-copy max-w-[680px] text-ink">Not sure which fits? Answer three quick questions and we'll point you the right way.</p>
          <Btn variant="secondary" onClick={() => onNav("quiz-1")}>Help me decide</Btn>
        </div>
      </section>

      <TestimonialsSection />
      <TestedStaysSection />
    </>
  );
}

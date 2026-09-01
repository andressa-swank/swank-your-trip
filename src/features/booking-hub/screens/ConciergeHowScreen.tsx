import { useEffect, useState } from "react";
import type { Screen } from "../types";

const HERO = "/__l5e/assets-v1/81eb00a4-25f4-42a0-86bc-2fc1a3bc7da2/concierge-how-pool.jpg";
const CLOSING = "/__l5e/assets-v1/e61d9d8c-127c-4ef6-a2bf-fd09d3663260/concierge-how-cover.jpg";

const reasons = [
  { n: "01", title: "Perks you can't get on your own + VIP", desc: "Room upgrades, free breakfast, late checkout. We advocate for the best perks." },
  { n: "02", title: "Price monitoring", desc: "For cancellable bookings, we track your rate. If it drops, we rebook. You save." },
  { n: "03", title: "Save hours of research", desc: "We've done the legwork. No sponsorships, no paid placements. Honest picks you can trust." },
  { n: "04", title: "Free destination guide", desc: "Our insider guide packed with everything you need for a great trip." },
];

const testimonials = [
  { quote: "Your recommendations are absolutely 10 out of 10. Keep up the great work. We'll definitely be back.", author: "David and friends, Playa Viva" },
  { quote: "Anyone can plan a trip, but when you want the details to matter, their insights and knowledge turn it into an unforgettable experience.", author: "Trisha, honeymoon in Bali" },
  { quote: "The Swank team were awesome, great communication, real value, and the right accommodation options.", author: "Rob, family trip in Thailand" },
];

function DetailIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="8" y="6" width="32" height="36" rx="2" /><path d="M15 16h18M15 24h18M15 32h10" /></svg>;
}
function ProposalIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="5" y="10" width="38" height="28" rx="2" /><path d="M6 12l18 15 18-15" /></svg>;
}
function ApprovalIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="18" /><path d="M16 24l6 6 12-13" /></svg>;
}

export function ConciergeHowScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [testimonial, setTestimonial] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollY(window.scrollY);
      setProgress(Math.min(100, (window.scrollY / max) * 100));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const current = testimonials[testimonial];
  const cycle = (direction: number) =>
    setTestimonial((value) => (value + direction + testimonials.length) % testimonials.length);

  return (
    <div className="concierge-how">
      <div className="concierge-scroll-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      {scrollY > 480 && (
        <div className="concierge-scroll-header">
          <button type="button" className="concierge-mini-brand" onClick={() => onNav("gate")}>
            <span /> Swank Guide
          </button>
          <button type="button" className="concierge-pill concierge-pill-small" onClick={() => onNav("intake")}>Let's get started</button>
        </div>
      )}

      {scrollY > 640 && (
        <div className="concierge-floating-cta">
          <span>Takes less than two minutes.</span>
          <button type="button" className="concierge-pill" onClick={() => onNav("intake")}>Let's get started</button>
        </div>
      )}

      <section className="concierge-how-hero">
        <img src={HERO} alt="" />
        <div className="concierge-photo-overlay" />
        <h1>Why Us. What You Get. How It Works</h1>
      </section>

      <section className="concierge-reasons">
        {reasons.map((reason, index) => (
          <article key={reason.n} style={{ animationDelay: `${index * 80}ms` }}>
            <span>{reason.n}</span>
            <h2>{reason.title}</h2>
            <p>{reason.desc}</p>
          </article>
        ))}
      </section>

      <p className="concierge-commission">We earn a commission when you book. That's how we keep the lights on — it costs you nothing extra.</p>

      <section className="concierge-levels">
        <header>
          <h2>Levels of service</h2>
          <p>From hotel bookings with perks to your full trip planned</p>
        </header>
        <div className="concierge-level-gradient" />
        <div className="concierge-level-grid">
          <article><h3>Hotel + VIP perks</h3><p>Free</p></article>
          <article><h3>Full concierge planning</h3><p>From $30/day</p></article>
        </div>
        <p className="concierge-fee-note">Some levels have a planning fee — many are refundable after your trip. <span>See how it works →</span></p>
      </section>

      <section className="concierge-expect">
        <h2>What to expect</h2>
        <div>
          <article><DetailIcon /><h3>Give us your trip details</h3></article>
          <article><ProposalIcon /><h3>We'll send you a proposal</h3></article>
          <article><ApprovalIcon /><h3>You approve or request changes — we handle everything</h3></article>
        </div>
      </section>

      <div className="concierge-start-block">
        <button type="button" className="concierge-pill concierge-pill-large" onClick={() => onNav("intake")}>Let's get started</button>
        <p>Takes less than two minutes</p>
      </div>

      <section className="concierge-closing">
        <img src={CLOSING} alt="" />
        <div className="concierge-photo-overlay" />
        <div className="concierge-closing-content">
          <button type="button" onClick={() => cycle(-1)} aria-label="Previous testimonial">‹</button>
          <blockquote key={testimonial}>
            <p>“{current.quote}”</p>
            <footer>{current.author}</footer>
          </blockquote>
          <button type="button" onClick={() => cycle(1)} aria-label="Next testimonial">›</button>
        </div>
      </section>
    </div>
  );
}

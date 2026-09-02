import { useState } from "react";
import heroPhoto from "@/assets/hero-photo.png.asset.json";
import conciergePhoto from "@/assets/concierge-group-rafting.jpg.asset.json";
import bookDirectPhoto from "@/assets/book-direct-hero.webp";
import { Btn } from "../components/Button";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { TestedStaysSection } from "../components/TestedStaysSection";
import type { Screen } from "../types";

/** Same three questions/options as the Find Your Path quiz (FindYourPathScreen). */
const QUIZ_QUESTIONS: Record<1 | 2 | 3, { q: string; opts: { label: string; value: string }[] }> = {
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

const POPULAR_DESTINATIONS = [
  {
    name: "Thailand",
    photoSlot: "popular-destination-thailand",
    desc: "Barefoot luxury on quiet beaches, from design-forward hillside resorts to remote jungle escapes.",
  },
  {
    name: "Bali",
    photoSlot: "popular-destination-bali",
    desc: "Rice terraces, temples and boutique villas where design and culture meet.",
  },
  {
    name: "Mexico",
    photoSlot: "popular-destination-mexico",
    desc: "From Tulum's beach clubs to Mexico City's design scene, unexpected and unforgettable.",
  },
  {
    name: "Costa Rica",
    photoSlot: "popular-destination-costa-rica",
    desc: "Rainforest canopies, volcano views, and low-key sophistication on the Pacific coast.",
  },
];

const SMARTER_POINTS = [
  {
    title: "Unlock meaningful perks",
    desc: "Better rooms, complimentary breakfast, hotel credits, and more.",
  },
  {
    title: "Have our team in your corner",
    desc: "Our professional travel designers are always ready to handle the details and step in when you need us.",
  },
  {
    title: "Arrive prepared",
    desc: "Get our original eBook guide filled with handpicked places and recommendations.",
  },
];

export function LandingScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState<1 | 2 | 3>(1);
  const [quizAnswers, setQuizAnswers] = useState<{ q1?: string; q2?: string; q3?: string }>({});

  function resetQuiz() {
    setQuizStep(1);
    setQuizAnswers({});
  }

  function toggleQuiz() {
    setQuizOpen((open) => !open);
    resetQuiz();
  }

  function answerQuiz(value: string) {
    const next = { ...quizAnswers, [`q${quizStep}`]: value };
    setQuizAnswers(next);
    if (quizStep < 3) {
      setQuizStep((quizStep + 1) as 2 | 3);
      return;
    }
    const score =
      (next.q1 === "recommendations" ? 2 : 0) +
      (next.q2 === "time" ? 1 : 0) +
      (next.q3 === "quality" ? 3 : 0);
    setQuizOpen(false);
    resetQuiz();
    onNav(score <= 2 ? "destination" : "intake");
  }

  const question = QUIZ_QUESTIONS[quizStep];

  return (
    <>
      {/* Section 1 — Hero */}
      <section className="landing-hero landing-section bg-ink">
        <img
          src={heroPhoto.url}
          alt="Infinity pool reflecting palm trees at a beachfront resort"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="page-container relative z-10">
          <div className="animate-enter mx-auto max-w-[680px]">
            <h1 className="display-heading text-white">Pick your path</h1>
          </div>
        </div>
      </section>

      {/* Section 2 — Intro + two choice cards */}
      <section className="landing-section page-container py-[72px]">
        <p className="mx-auto mb-10 max-w-[680px] text-center text-[20px] leading-[30px] text-ink">
          Two ways to book with us. However much help you want, we've got a lane for it.
        </p>
        <div className="choice-grid">
          <article className="choice-card">
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

          <article className="choice-card">
            <div className="choice-card__media">
              <img src={bookDirectPhoto} alt="" />
            </div>
            <div className="choice-card__content">
              <h2>Book Direct</h2>
              <p>Curated hotels at the best price, booked instantly.</p>
              <div className="choice-card__details">
                <span>Personally vetted — no sponsorships, no paid placements</span>
                <span>Compare rates across major platforms in seconds</span>
                <span>Trip-prep kit plus our destination e-book with every booking</span>
              </div>
              <div className="flex-1" aria-hidden="true" />
              <button type="button" className="btn-base choice-card__cta--dark" onClick={() => onNav("destination")}>
                Book Now
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Section 3 — "Not sure which fits?" split with inline quiz */}
      <section className="decide-split landing-section">
        <div className="decide-split__left">
          <h2>Not sure which fits? Answer three quick questions and we'll point you the right way.</h2>
          <button type="button" className="decide-toggle" onClick={toggleQuiz} aria-expanded={quizOpen}>
            {quizOpen ? "Close" : "Help me decide"}
          </button>
          {quizOpen && (
            <div className="decide-quiz">
              <div className="decide-quiz__bars" aria-hidden="true">
                {[1, 2, 3].map((bar) => (
                  <span key={bar} className={bar <= quizStep ? "is-done" : ""} />
                ))}
              </div>
              <div key={quizStep} className="animate-step">
                <h3>{question.q}</h3>
                <div className="decide-quiz__options">
                  {question.opts.map(({ label, value }) => (
                    <button key={value} type="button" onClick={() => answerQuiz(value)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="decide-split__right">
          {/* PHOTO SLOT "decide-split-right": drop the real photo in here */}
          <div className="photo-slot" data-photo-slot="decide-split-right" aria-hidden="true" />
        </div>
      </section>

      {/* Section 4 — Testimonials */}
      <TestimonialsSection />

      {/* Section 5 — Popular Destinations */}
      <section className="popular-destinations landing-section">
        <div className="page-container">
          <div className="popular-destinations__header">
            <h2 className="landing-h2">Popular Destinations</h2>
            <button type="button" className="popular-destinations__cta" onClick={() => onNav("destination")}>
              Discover all hotel destinations
            </button>
          </div>
          <div className="popular-destinations__grid">
            {POPULAR_DESTINATIONS.map((destination) => (
              <div key={destination.name}>
                {/* PHOTO SLOT per destination: see data-photo-slot */}
                <div className="photo-slot" data-photo-slot={destination.photoSlot} aria-hidden="true" />
                <h3>{destination.name}</h3>
                <p>{destination.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — "Why book with Swank" heading */}
      <section className="why-swank landing-section">
        <div className="page-container">
          <h2 className="landing-h2">Why book with Swank</h2>
        </div>
      </section>

      {/* Section 7 — Video / About us band */}
      <section className="video-band landing-section">
        <div className="video-band__frame">
          {/* PHOTO SLOT "video-band-cover": drop the real video cover photo in here */}
          <div className="photo-slot" data-photo-slot="video-band-cover" aria-hidden="true" />
          <div className="video-band__overlay" />
          <button type="button" className="video-band__cta">
            About us
            <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
              <path d="M0 0 L16 9 L0 18 Z" fill="#231f20" />
            </svg>
          </button>
        </div>
      </section>

      {/* Section 8 — A smarter way to book */}
      <section className="smarter-section landing-section">
        <div className="smarter-section__container">
          <div>
            <h2>A smarter way to book</h2>
            <p className="smarter-section__lead">
              Booking with Swank gives you the same official hotel rate (often a better one) with more value built in.
              Hotels recognize Swank bookings differently, which can unlock added benefits at no extra cost to you.
            </p>
            <div className="smarter-section__actions">
              <button type="button" className="smarter-cta smarter-cta--dark" onClick={() => onNav("intake")}>
                Swank your journey
              </button>
              <button type="button" className="smarter-cta smarter-cta--light">More about us</button>
            </div>
          </div>
          <div className="smarter-section__points">
            {SMARTER_POINTS.map((point) => (
              <div key={point.title} className="smarter-point">
                <span className="smarter-point__bar" aria-hidden="true" />
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9 — Spacer */}
      <div className="landing-spacer" aria-hidden="true" />

      {/* Section 10 — Stats */}
      <TestedStaysSection onBookWithSwank={() => onNav("intake")} onBookDirect={() => onNav("destination")} />
    </>
  );
}

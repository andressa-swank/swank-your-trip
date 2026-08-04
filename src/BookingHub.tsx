import { useEffect, useRef, useState } from "react";
import heroPhoto from "@/assets/hero-photo.png.asset.json";
import amanPoolPhoto from "@/assets/aman-pool.webp";

/**
 * Swank Guide — Booking Hub (V2: Editorial & Immersive)
 * Wire INTAKE_ENDPOINT to a real backend; empty means "log + continue".
 */

type Screen =
  | "gate"
  | "quiz-1"
  | "quiz-2"
  | "quiz-3"
  | "quiz-result"
  | "how"
  | "intake"
  | "confirm"
  | "destination"
  | "hotel-bangkok";

const INTAKE_ENDPOINT = "";

const DESTINATIONS = [
  { name: "Bangkok, Thailand", built: true },
  { name: "Koh Samui, Thailand", built: false },
  { name: "Greater Phuket, Thailand", built: false },
  { name: "Chiang Mai & Rai, Thailand", built: false },
  { name: "Pattaya & Hua Hin, Thailand", built: false },
  { name: "Bali, Indonesia", built: false },
  { name: "India", built: false },
  { name: "Sri Lanka", built: false },
  { name: "Caribbean", built: false },
  { name: "Central America", built: false },
  { name: "Europe", built: false },
  { name: "Mexico", built: false },
  { name: "Nordic", built: false },
  { name: "US + Canada", built: false },
];

type Hotel = {
  id: string;
  name: string;
  tier: "Best Value" | "Mid-Range" | "Splurge";
  badge: "stayed" | "trusted";
  photoTag: string;
  photoBg: string;
  desc: string;
};

const HOTELS: Hotel[] = [
  { id: "hotel-como", name: "COMO Metropolitan Bangkok", tier: "Best Value", badge: "stayed", photoTag: "COMO Bangkok", photoBg: "#1e3a1e", desc: "Understated, design-forward, calm. One of the most consistently well-executed hotels in the city, and usually one of the better-priced options at this quality level." },
  { id: "hotel-standard", name: "The Standard Bangkok", tier: "Best Value", badge: "stayed", photoTag: "The Standard", photoBg: "#1a1a2a", desc: "The most fun option on this list. Playful design, a great rooftop, strong restaurants and bars, a genuinely energetic vibe. Often surprisingly well-priced." },
  { id: "hotel-sala", name: "Sala Rattanakosin", tier: "Best Value", badge: "trusted", photoTag: "Sala Rattanakosin", photoBg: "#2a1a1a", desc: "Small, intimate, directly across the river from Wat Arun. The views are the whole point. Not full-service. Better for design-conscious travelers who value atmosphere over amenities." },
  { id: "hotel-peninsula", name: "The Peninsula Bangkok", tier: "Mid-Range", badge: "stayed", photoTag: "Peninsula Bangkok", photoBg: "#1a2020", desc: "The gold standard for classic Bangkok luxe. Impeccable service, serious river views, one of the best pool setups in the city. Consistently punches above its rate." },
  { id: "hotel-kimpton", name: "Kimpton Maa-Lai", tier: "Mid-Range", badge: "trusted", photoTag: "Kimpton Maa-Lai", photoBg: "#201a20", desc: "Feels more boutique than its size suggests. Thoughtful design, next to Lumphini Park, reliably good value. Smart pick for stylish travelers without the top-tier price tag." },
  { id: "hotel-sukhothai", name: "The Sukhothai Bangkok", tier: "Mid-Range", badge: "trusted", photoTag: "The Sukhothai", photoBg: "#202015", desc: "Classic Bangkok in every sense. Traditional Thai architecture, lush gardens, a calm that's rare in the city. The Celadon restaurant is a destination in its own right." },
  { id: "hotel-siam", name: "The Siam", tier: "Splurge", badge: "stayed", photoTag: "The Siam", photoBg: "#201a10", desc: "The best design hotel in Bangkok. Bill Bensley, riverfront, feels like a private residence crossed with a museum. The pool, the bar, the rooms: all exceptional." },
  { id: "hotel-fourseasons", name: "Four Seasons Bangkok", tier: "Splurge", badge: "stayed", photoTag: "Four Seasons", photoBg: "#1a1a20", desc: "A newer property that has quickly become one of the strongest in the city. Beautifully designed, serious pool complex, prime Chao Phraya riverfront." },
  { id: "hotel-mandarin", name: "Mandarin Oriental Bangkok", tier: "Splurge", badge: "stayed", photoTag: "Mandarin Oriental", photoBg: "#1a1a1a", desc: "A Bangkok icon with real history. The jazz bar, the riverside setting, the sense of place. Book it for the experience, shop the rates carefully." },
];

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

function Btn({
  variant = "primary",
  full,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "secondary";
  full?: boolean;
}) {
  const variants: Record<string, string> = {
    primary: "button-primary",
    accent: "button-accent",
    secondary: "button-secondary",
  };
  return (
    <button
      {...props}
      className={`btn-base ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.14em] ${className}`}>{children}</p>
  );
}

function Header({ onNav }: { onNav: (s: Screen) => void }) {
  const links: { label: string; screen?: Screen }[] = [
    { label: "Destinations", screen: "destination" },
    { label: "Hotels", screen: "destination" },
    { label: "Experiences" },
    { label: "Why We're Different", screen: "how" },
    { label: "Booking Hub", screen: "gate" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background">
      <div className="page-container flex h-16 items-center justify-between md:h-[72px]">
        <button
          onClick={() => onNav("gate")}
          className="flex min-h-11 items-center gap-2"
          aria-label="Swank Guide home"
        >
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
          <span className="text-[17px] font-medium text-ink">Swank Guide</span>
        </button>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => l.screen && onNav(l.screen)}
              className="text-[15px] leading-5 font-normal text-ink-muted transition-colors duration-[180ms] hover:text-ink"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center text-xl text-ink md:hidden"
        >
          ☰
        </span>
      </div>
    </header>
  );
}

function Footer({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <footer className="border-t border-hairline bg-background py-10 md:py-16">
      <div className="page-container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">Services</p>
            <div className="space-y-3 text-[15px] leading-6 text-ink-muted">
              <p>See how we curate our picks</p>
              <p>
                <button onClick={() => onNav("destination")} className="text-link">
                  Book a hotel stay
                </button>
              </p>
              <p>5990 more hotels with perks</p>
              <p>We VIP you with Fora</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-[4px] border border-line px-4 py-3 text-center text-[12px] font-medium uppercase leading-[18px] tracking-wide text-ink-muted">
              IATA
              <br />
              ACCREDITED
            </div>
            <div className="rounded-[4px] border border-line px-4 py-3 text-center text-[12px] font-medium uppercase leading-[18px] tracking-wide text-ink-muted">
              FORA
              <br />
              CERTIFIED
            </div>
          </div>

          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">Community</p>
            <div className="space-y-3 text-[15px] leading-6 text-ink-muted">
              <p>
                <button onClick={() => onNav("how")} className="text-link">
                  Why we're different
                </button>
              </p>
              <p>Blog</p>
              <p>FAQ</p>
              <p>Newsletter</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[14px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026, Swank Guide</span>
          <div className="flex flex-wrap gap-6">
            <span>Contact</span>
            <span>Terms of Use</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Compact white internal page introduction used by every non-landing screen. */
function PageIntro({
  eyebrow,
  title,
  sub,
  onBack,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  onBack?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-hairline bg-background pb-8 pt-10 md:pb-12 md:pt-16">
      <div className="page-container">
        {eyebrow &&
          (onBack ? (
            <button onClick={onBack} className="mb-3 flex min-h-11 items-center text-ink-muted transition-opacity duration-[180ms] hover:opacity-70">
              <Eyebrow>{eyebrow}</Eyebrow>
            </button>
          ) : (
            <Eyebrow className="mb-3 text-ink-muted">{eyebrow}</Eyebrow>
          ))}
        <h1 className="display-heading text-ink" style={{ scrollMarginTop: 96 }}>
          {title}
        </h1>
        {sub && <p className="mt-5 max-w-[680px] body-copy text-ink-muted">{sub}</p>}
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------


const TESTIMONIALS = [
  {
    quote:
      "Anyone can plan a trip, but when you want the details to matter, their insights and knowledge turn it into an unforgettable experience.",
    author: "Trisha, honeymoon in Bali",
  },
  {
    quote: "The Swank team were awesome, great communication, real value, and the right accommodation options.",
    author: "Rob, family trip in Thailand",
  },
  {
    quote: "Thank you for your videos, expertise, and guidance. This hotel will shape our design aesthetic forever.",
    author: "Logan, honeymoon in Bangkok",
  },
  {
    quote: "Good communication, promised benefits and upgrades delivered, and we felt safe with them.",
    author: "Ben",
  },
  {
    quote: "We loved the pre-arrival guide, it made packing easy and helped us know what to expect.",
    author: "Jordan, couple trip in Costa Rica",
  },
];

function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const changeTestimonial = (direction: number) => {
    setIndex((current) => (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => changeTestimonial(1), 6000);
    return () => window.clearInterval(timer);
  }, [index, paused]);

  const testimonial = TESTIMONIALS[index];

  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="page-container">
        <h2 id="testimonials-title" className="testimonials-title">
          What they say
        </h2>

        <div className="testimonials-carousel">
          <button
            type="button"
            className="testimonial-arrow"
            onClick={() => changeTestimonial(-1)}
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="testimonial-stage">
            <span className="testimonial-mark" aria-hidden="true">
              “
            </span>
            <blockquote key={index} className="testimonial-copy">
              <p>“{testimonial.quote}”</p>
              <footer>{testimonial.author}</footer>
            </blockquote>
          </div>

          <button
            type="button"
            className="testimonial-arrow"
            onClick={() => changeTestimonial(1)}
            aria-label="Next testimonial"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="testimonial-dots" aria-label="Choose a testimonial">
          {TESTIMONIALS.map((item, dotIndex) => (
            <button
              type="button"
              key={item.author}
              className={dotIndex === index ? "is-active" : ""}
              onClick={() => setIndex(dotIndex)}
              aria-label={\`Show testimonial \${dotIndex + 1}\`}
              aria-current={dotIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestedStaysSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={\`tested-stays-section \${visible ? "is-visible" : ""}\`}
      aria-labelledby="tested-stays-title"
    >
      <div className="tested-stays-heading">
        <h2 id="tested-stays-title">Every stay tested.</h2>
      </div>

      <div className="tested-stays-photo">
        <img
          src={amanPoolPhoto}
          alt="Infinity pools overlooking the sea at a cliffside resort"
          width={2048}
          height={1024}
          loading="lazy"
        />
        <div className="tested-stays-overlay" />
        <div className="tested-stays-metrics page-container">
          {[
            ["60+", "Countries visited"],
            ["400", "Hotels personally tested"],
            ["0", "Paid placements"],
          ].map(([number, label], metricIndex) => (
            <div
              key={label}
              className="tested-stays-metric"
              style={{ transitionDelay: \`\${metricIndex * 120}ms\` }}
            >
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GateScreen({ onNav }: { onNav: (s: Screen) => void }) {
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
              Plan my trip →
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
                "Free destination guide with every booking",
              ].map((li) => (
                <div key={li} className="flex gap-3 text-[16px] leading-7 text-ink-muted">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex-1" />
            <Btn full variant="secondary" onClick={() => onNav("destination")}>
              Book Now →
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
            Help me decide →
          </Btn>
        </div>
      </section>

      <TestimonialsSection />
      <TestedStaysSection />
    </>
  );
}

function QuizScreen({
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
                className={`h-[3px] flex-1 ${d <= step ? "bg-ink" : "bg-hairline"}`}
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

function QuizResultScreen({
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
            {isBookNow ? "Continue to booking →" : "Continue to trip planning →"}
          </Btn>
        </div>
      </div>
    </>
  );
}

function HowScreen({ onNav }: { onNav: (s: Screen) => void }) {
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
            Plan my trip →
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

type IntakeData = {
  hp: string;
  fname: string;
  email: string;
  cc: string;
  phone: string;
  dest: string;
  when: string;
  whenNote: string;
  party: string;
  partyNote: string;
  experience: string;
  budget: string;
  stage: string;
};

const emptyIntake: IntakeData = {
  hp: "",
  fname: "",
  email: "",
  cc: "+1",
  phone: "",
  dest: "",
  when: "",
  whenNote: "",
  party: "",
  partyNote: "",
  experience: "",
  budget: "",
  stage: "",
};

function scrollToRegion(el: HTMLElement | null) {
  if (!el || typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

function OptionRow({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`mb-3 flex min-h-14 w-full items-center gap-3 rounded-[8px] border px-4 py-3 text-left text-[16px] leading-6 transition-all duration-[180ms] ${
        selected
          ? "border-ink bg-soft font-medium text-ink"
          : "border-line bg-background text-ink-muted hover:border-ink"
      }`}
    >
      <span
        className={`h-3 w-3 shrink-0 rounded-full border ${selected ? "border-ink bg-ink" : "border-line bg-background"}`}
      />
      {label}
    </button>
  );
}

function IntakeScreen({
  onSubmitted,
  onSwitchToBookDirect,
}: {
  onSubmitted: () => void;
  onSwitchToBookDirect: () => void;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<IntakeData>(emptyIntake);
  const [emailError, setEmailError] = useState(false);
  const [sending, setSending] = useState(false);
  const formTop = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToRegion(formTop.current);
  }, [step]);

  const patch = (p: Partial<IntakeData>) => setData((d) => ({ ...d, ...p }));

  async function submit() {
    if (sending) return;
    if (!data.email || !data.email.includes("@")) {
      setStep(1);
      setEmailError(true);
      return;
    }
    setSending(true);
    const payload = {
      source: "Booking Hub — Concierge",
      lane: "Concierge",
      hp: data.hp,
      firstName: data.fname,
      email: data.email,
      phone: data.phone ? `${data.cc} ${data.phone}`.trim() : "",
      destination: data.dest,
      travelWhen: [data.when, data.whenNote].filter(Boolean).join(" — "),
      partySize: [data.party, data.partyNote].filter(Boolean).join(" — "),
      experience: data.experience,
      budget: data.budget,
      planningStage: data.stage,
    };
    if (!INTAKE_ENDPOINT) {
      console.log("[Swank intake] would POST:", payload);
      setSending(false);
      onSubmitted();
      return;
    }
    try {
      await fetch(INTAKE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[Swank intake] submit failed:", err);
    } finally {
      setSending(false);
      onSubmitted();
    }
  }

  const pct = [14, 28, 42, 56, 70, 84, 98][step - 1];

  return (
    <>
      <PageIntro eyebrow="Concierge" title="Tell us about your trip." />
      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-12">
        <div ref={formTop} className="mx-auto max-w-[680px]" style={{ scrollMarginTop: 96 }}>
          <div className="mb-8 md:mb-10">
            <div className="mb-2 flex items-center justify-between text-[12px] uppercase tracking-[0.14em] text-ink-muted">
              <span>{step} of 7</span>
            </div>
            <div className="h-[3px] w-full overflow-hidden bg-hairline">
              <div
                className="h-full bg-ink transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div key={step} className="animate-step">
            {step === 1 && (
              <>
                <h2 className="section-heading mb-6 text-ink">First, the basics.</h2>
                <input
                  value={data.hp}
                  onChange={(e) => patch({ hp: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="field-label" htmlFor="fname">
                      First name or nickname
                    </label>
                    <input
                      id="fname"
                      value={data.fname}
                      onChange={(e) => patch({ fname: e.target.value })}
                      placeholder="First name or nickname"
                      className="field-control"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      value={data.email}
                      onChange={(e) => {
                        patch({ email: e.target.value });
                        if (emailError) setEmailError(false);
                      }}
                      type="email"
                      placeholder="Email address"
                      aria-invalid={emailError}
                      aria-describedby="email-error"
                      className="field-control"
                    />
                    {emailError && (
                      <p id="email-error" className="field-error">
                        We'll need a real email address to send your proposal.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="phone">
                      Phone number
                    </label>
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                      <select
                        value={data.cc}
                        onChange={(e) => patch({ cc: e.target.value })}
                        aria-label="Country code"
                        className="field-control w-auto"
                      >
                        <option value="+1">US +1</option>
                        <option value="+44">UK +44</option>
                        <option value="+61">Australia +61</option>
                        <option value="+55">Brazil +55</option>
                      </select>
                      <input
                        id="phone"
                        value={data.phone}
                        onChange={(e) => patch({ phone: e.target.value })}
                        type="tel"
                        placeholder="Phone number"
                        className="field-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(2)}>
                    Next →
                  </Btn>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="section-heading mb-6 text-ink">Where are you going?</h2>
                <label className="field-label" htmlFor="dest">
                  Destination
                </label>
                <input
                  id="dest"
                  value={data.dest}
                  onChange={(e) => patch({ dest: e.target.value })}
                  placeholder="e.g. Thailand, Paris, anywhere warm..."
                  className="field-control"
                />
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(3)}>
                    Next →
                  </Btn>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="section-heading mb-6 text-ink">When are you traveling?</h2>
                {["I have exact dates", "I'm flexible, I have a rough timeframe", "I'm very early, just exploring"].map(
                  (o) => (
                    <OptionRow key={o} label={o} selected={data.when === o} onClick={() => patch({ when: o })} />
                  ),
                )}
                <div className="mt-5">
                  <label className="field-label" htmlFor="whenNote">
                    Timing notes
                  </label>
                  <input
                    id="whenNote"
                    value={data.whenNote}
                    onChange={(e) => patch({ whenNote: e.target.value })}
                    placeholder="e.g. two weeks in October, early 2027..."
                    className="field-control"
                  />
                </div>
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(4)}>
                    Next →
                  </Btn>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="section-heading mb-6 text-ink">How many people are traveling?</h2>
                {["Just me", "2 travelers", "3 or more, family or group trip"].map((o) => (
                  <OptionRow key={o} label={o} selected={data.party === o} onClick={() => patch({ party: o })} />
                ))}
                <div className="mt-5">
                  <label className="field-label" htmlFor="partyNote">
                    Group details
                  </label>
                  <input
                    id="partyNote"
                    value={data.partyNote}
                    onChange={(e) => patch({ partyNote: e.target.value })}
                    placeholder="Any details on kids' ages or group makeup?"
                    className="field-control"
                  />
                </div>
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(5)}>
                    Next →
                  </Btn>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 className="section-heading mb-6 text-ink">
                  What kind of experience are you looking for?
                </h2>
                <label className="field-label" htmlFor="experience">
                  Experience
                </label>
                <textarea
                  id="experience"
                  value={data.experience}
                  onChange={(e) => patch({ experience: e.target.value })}
                  placeholder="e.g. romantic anniversary, boutique and design-forward, something off the beaten path..."
                  className="field-control"
                />
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(6)}>
                    Next →
                  </Btn>
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <h2 className="section-heading mb-6 text-ink">Approximate nightly hotel budget?</h2>
                {["Under $200 / night", "$200 – $400 / night", "$400 – $700 / night", "$700+ / night", "Flexible, show me the best options"].map(
                  (o) => (
                    <OptionRow key={o} label={o} selected={data.budget === o} onClick={() => patch({ budget: o })} />
                  ),
                )}
                <div className="mt-10">
                  <Btn full variant="accent" onClick={() => setStep(7)}>
                    Next →
                  </Btn>
                </div>
              </>
            )}

            {step === 7 && (
              <>
                <h2 className="section-heading mb-6 text-ink">Where are you in the planning process?</h2>
                {[
                  "Just starting to explore ideas",
                  "I have a rough plan, need help filling it in",
                  "My flights are booked, I need hotels and logistics",
                  "I know exactly what I want, just need someone to book it",
                ].map((o) => (
                  <OptionRow key={o} label={o} selected={data.stage === o} onClick={() => patch({ stage: o })} />
                ))}
                <div className="mt-10">
                  <Btn full variant="accent" disabled={sending} onClick={submit}>
                    {sending ? "Sending…" : "Submit →"}
                  </Btn>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-10 border-t border-hairline bg-background py-4 text-center">
        <p className="text-[15px] leading-6 text-ink-muted">
          Prefer to book it yourself now?{" "}
          <button onClick={onSwitchToBookDirect} className="text-link font-medium">
            Switch to Book Direct →
          </button>
        </p>
      </div>
    </>
  );
}

function ConfirmScreen({ onHome }: { onHome: () => void }) {
  return (
    <>
      <PageIntro title="Done." />
      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-[680px]">
          <h2 className="section-heading mb-4 text-ink">We're on it.</h2>
          <p className="body-copy mb-8 text-ink-muted">
            In the meantime, we've sent you a confirmation email. If you don't see it in the next few minutes,
            check your spam folder and mark us as safe.
          </p>
          <div className="rounded-[8px] border border-hairline bg-soft p-6">
            <p className="mb-3 text-[15px] font-medium text-ink">What happens next</p>
            {[
              "We'll be in touch within 24 hours",
              "We may have a quick follow-up question or two",
              "Your proposal will be ready within one to three days depending on complexity",
            ].map((li) => (
              <div key={li} className="flex gap-3 py-2 text-[16px] leading-7 text-ink-muted">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                <span>{li}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] leading-6 italic text-ink-muted">
            Changes, group policies, and refund details will be included in your proposal.
          </p>
          <button onClick={onHome} className="text-link mt-8 inline-flex min-h-11 items-center text-[15px]">
            ← Back to start
          </button>
        </div>
      </div>
    </>
  );
}

function DestinationScreen({
  onGoHotel,
  onSwitchConcierge,
}: {
  onGoHotel: () => void;
  onSwitchConcierge: () => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const hotelMatches = q ? HOTELS.filter((h) => h.name.toLowerCase().includes(q)) : [];
  const destMatches = q ? DESTINATIONS.filter((d) => d.name.toLowerCase().includes(q)) : DESTINATIONS;
  const noMatches = q && hotelMatches.length === 0 && destMatches.length === 0;

  const rowCls =
    "flex items-center justify-between gap-3 border-b border-hairline py-3 text-[17px] leading-7 last:border-b-0";

  return (
    <>
      <PageIntro eyebrow="Book Direct" title="Where are you going?" />
      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-12">
        <div className="relative mb-12 max-w-[680px]">
          <label className="field-label" htmlFor="destination-search">
            Destination
          </label>
          <input
            id="destination-search"
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search a city or country..."
            className="field-control"
          />
          {open && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-72 overflow-y-auto rounded-[8px] border border-line bg-background shadow-[var(--shadow-subtle)]">
              {noMatches && (
                <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 text-[15px] text-ink-muted">
                  <span>"{query}" is not one of our destinations or hotels yet</span>
                  <span className="badge-pill shrink-0 bg-soft uppercase tracking-wide text-ink-muted">
                    Coming soon
                  </span>
                </div>
              )}
              {hotelMatches.map((h) => (
                <div
                  key={h.id}
                  onMouseDown={onGoHotel}
                  className="flex cursor-pointer items-center justify-between gap-3 border-b border-hairline px-4 py-3 text-[16px] text-ink hover:bg-soft"
                >
                  <span>{h.name}</span>
                  <span className="badge-pill shrink-0 bg-brand uppercase tracking-wide text-ink">
                    Hotel
                  </span>
                </div>
              ))}
              {destMatches.map((d) => (
                <div
                  key={d.name}
                  onMouseDown={() => d.built && onGoHotel()}
                  className={`flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 text-[16px] last:border-b-0 ${
                    d.built ? "cursor-pointer text-ink hover:bg-soft" : "cursor-default text-ink-muted"
                  }`}
                >
                  <span>{d.name}</span>
                  {!d.built && (
                    <span className="badge-pill shrink-0 bg-soft uppercase tracking-wide text-ink-muted">
                      Coming soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-hairline" />
          <span className="text-[12px] uppercase tracking-[0.14em] text-ink-muted">Or browse by region</span>
          <div className="h-px flex-1 bg-hairline" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          <div className="rounded-[8px] border border-hairline bg-background p-5 md:p-7">
            <h2 className="mb-4 text-[22px] leading-[30px] font-normal text-ink">Regions</h2>
            {["Asia", "Caribbean", "Central America", "Europe", "Mexico", "Nordic", "US + Canada"].map((r, i) => (
              <div
                key={r}
                className={`${rowCls} ${i === 0 ? "font-medium text-ink" : "cursor-pointer text-ink-muted hover:text-ink hover:underline"}`}
              >
                <span>{r}</span> <span aria-hidden="true">›</span>
              </div>
            ))}
          </div>
          <div className="rounded-[8px] border border-hairline bg-background p-5 md:p-7">
            <h2 className="mb-4 text-[22px] leading-[30px] font-normal text-ink">Asia</h2>
            {["Thailand", "Bali", "India", "Sri Lanka"].map((c, i) => (
              <div
                key={c}
                className={`${rowCls} ${i === 0 ? "font-medium text-ink" : "cursor-pointer text-ink-muted hover:text-ink hover:underline"}`}
              >
                <span>{c}</span> <span aria-hidden="true">›</span>
              </div>
            ))}
          </div>
          <div className="rounded-[8px] border border-hairline bg-background p-5 md:p-7">
            <h2 className="mb-4 text-[22px] leading-[30px] font-normal text-ink">Thailand</h2>
            <button
              onClick={onGoHotel}
              className={`${rowCls} w-full font-medium text-ink hover:underline`}
            >
              <span>Bangkok</span> <span aria-hidden="true">›</span>
            </button>
            {["Koh Samui", "Greater Phuket", "Chiang Mai & Chiang Rai", "Pattaya & Hua Hin"].map((c) => (
              <div key={c} className={`${rowCls} text-ink-muted`}>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-hairline py-6 text-center">
        <button onClick={onSwitchConcierge} className="text-link min-h-11 font-medium">
          Switch to Concierge →
        </button>
      </div>
    </>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  const [open, setOpen] = useState(false);
  const isBestValue = hotel.tier === "Best Value";
  return (
    <article className="flex flex-col overflow-hidden rounded-[8px] border border-hairline bg-background transition-shadow duration-[180ms] hover:shadow-[var(--shadow-subtle)]">
      <div className="hotel-card__media">
        <span className="px-4 text-center text-[12px] leading-[18px] text-ink-muted">
          [ {hotel.photoTag} ]
        </span>
        <span
          className={`badge-pill absolute bottom-3 left-3 ${
            hotel.badge === "stayed" ? "bg-brand text-ink" : "bg-ink text-white"
          }`}
        >
          {hotel.badge === "stayed" ? "✦ Swank Tested" : "✦ Trusted Pick"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="mb-2 text-[24px] leading-8 font-normal text-ink">{hotel.name}</h3>
        <p className="mb-6 text-[16px] leading-7 text-ink-muted">{hotel.desc}</p>
        <div className="mt-auto flex flex-col gap-3">
          <button className="btn-base button-primary w-full justify-between">
            <span>Book with Swank</span>
            <span className="badge-pill shrink-0 whitespace-nowrap bg-brand uppercase tracking-wide text-ink">
              {isBestValue ? "Best Value" : "Swank Value"}
            </span>
          </button>
          <button onClick={() => setOpen((o) => !o)} className="text-link self-start text-[15px] leading-6">
            {isBestValue
              ? open
                ? "Why best value? −"
                : "Why best value? +"
              : open
                ? "Why this rate? −"
                : "Why this rate? +"}
          </button>
          {open && (
            <div className="rounded-[8px] border-l-[3px] border-brand bg-soft p-4 text-[15px] leading-6 italic text-ink-muted">
              Hotels treat our bookings differently: better rooms, real perks, our team in your corner.
              You'll also receive our trip-prep kit.
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button className="btn-base button-secondary w-full">Booking.com</button>
            <button className="btn-base button-secondary w-full">Expedia</button>
          </div>
        </div>
      </div>
    </article>
  );
}

function HotelBangkokScreen({
  onChangeDestination,
  onSwitchConcierge,
}: {
  onChangeDestination: () => void;
  onSwitchConcierge: () => void;
}) {
  const tiers: Hotel["tier"][] = ["Best Value", "Mid-Range", "Splurge"];
  const tierSub: Record<Hotel["tier"], string> = {
    "Best Value": "Stylish hotels that won't break the bank",
    "Mid-Range": "The best balance of price and experience",
    Splurge: "",
  };
  return (
    <>
      <PageIntro
        eyebrow="← Change destination"
        title="Bangkok"
        sub="Book Direct"
        onBack={onChangeDestination}
      />

      <div className="page-container pt-8 md:pt-12">
        <div className="max-w-[820px]">
          <p className="text-[16px] leading-7 text-ink-muted">
            <strong className="font-medium text-ink">
              No sponsorships. No paid placements. Every recommendation is independent.
            </strong>{" "}
            Book whichever way works best for you — you're supporting honest travel journalism either way.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[15px] leading-6 text-ink-muted">
            <p>
              <span className="font-medium text-ink">✦ Swank Tested</span> Don stayed here personally, on
              his own dime.
            </p>
            <p>
              <span className="font-medium text-ink">✦ Trusted Pick</span> Visited, vetted, and recommended
              by our team.
            </p>
          </div>
        </div>
      </div>

      <div className="page-container pb-16 pt-12 md:pb-24">
        {tiers.map((tier) => (
          <div key={tier} className="mb-12 last:mb-0 md:mb-16">
            <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-hairline pb-4">
              <h2 className="text-[22px] leading-[30px] font-normal text-ink">{tier}</h2>
              {tierSub[tier] && <span className="text-[15px] leading-6 text-ink-muted">{tierSub[tier]}</span>}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3">
              {HOTELS.filter((h) => h.tier === tier).map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 rounded-[8px] border border-hairline bg-soft p-6 md:p-8">
          <p className="text-[16px] leading-7 text-ink-muted">
            <strong className="font-medium text-ink">
              Book through any of our links and we'll send you our free Bangkok destination guide
            </strong>
            : where to eat, what to skip, and the spots worth your time. Forward your confirmation to{" "}
            <span className="text-link">vip@swankguide.com</span>
          </p>
        </div>
      </div>

      <div className="border-t border-hairline py-6 text-center">
        <button onClick={onSwitchConcierge} className="text-link min-h-11 font-medium">
          Switch to Concierge →
        </button>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export default function BookingHub() {
  const [screen, setScreen] = useState<Screen>("gate");
  const [quizAnswers, setQuizAnswers] = useState<{ q1?: string; q2?: string; q3?: string }>({});
  const [quizResult, setQuizResult] = useState<{ path: "book-now" | "concierge" } | null>(null);

  function handleQuizAnswer(step: 1 | 2 | 3, value: string) {
    const next = { ...quizAnswers, [`q${step}`]: value };
    setQuizAnswers(next);
    if (step < 3) {
      setScreen(`quiz-${step + 1}` as Screen);
      return;
    }
    const score =
      (next.q1 === "recommendations" ? 2 : 0) +
      (next.q2 === "time" ? 1 : 0) +
      (next.q3 === "quality" ? 3 : 0);
    setQuizResult({ path: score <= 2 ? "book-now" : "concierge" });
    setQuizAnswers({});
    setScreen("quiz-result");
  }

  const showFloatingCta = !["gate", "intake", "destination", "hotel-bangkok"].includes(screen);

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink antialiased">
      <Header onNav={setScreen} />

      <main className="flex-1">
        {screen === "gate" && <GateScreen onNav={setScreen} />}
        {(screen === "quiz-1" || screen === "quiz-2" || screen === "quiz-3") && (
          <QuizScreen step={Number(screen.split("-")[1]) as 1 | 2 | 3} onAnswer={handleQuizAnswer} />
        )}
        {screen === "quiz-result" && quizResult && (
          <QuizResultScreen
            result={quizResult}
            onContinue={() => setScreen(quizResult.path === "book-now" ? "destination" : "intake")}
          />
        )}
        {screen === "how" && <HowScreen onNav={setScreen} />}
        {screen === "intake" && (
          <IntakeScreen onSubmitted={() => setScreen("confirm")} onSwitchToBookDirect={() => setScreen("destination")} />
        )}
        {screen === "confirm" && <ConfirmScreen onHome={() => setScreen("gate")} />}
        {screen === "destination" && (
          <DestinationScreen onGoHotel={() => setScreen("hotel-bangkok")} onSwitchConcierge={() => setScreen("how")} />
        )}
        {screen === "hotel-bangkok" && (
          <HotelBangkokScreen
            onChangeDestination={() => setScreen("destination")}
            onSwitchConcierge={() => setScreen("how")}
          />
        )}
      </main>

      <Footer onNav={setScreen} />

      {showFloatingCta && (
        <button
          onClick={() => setScreen("gate")}
          className="btn-base button-accent fixed bottom-6 right-6 z-40 shadow-[var(--shadow-subtle)]"
        >
          Plan Trip
        </button>
      )}
    </div>
  );
}

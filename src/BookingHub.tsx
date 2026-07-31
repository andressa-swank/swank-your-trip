import { useState } from "react";

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
  variant?: "primary" | "ghost-light" | "ghost-dark";
  full?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-60";
  const variants: Record<string, string> = {
    primary:
      "bg-[#f0e40c] text-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(240,228,12,0.4)]",
    "ghost-light":
      "bg-transparent text-[#1a1a1a] border-[1.5px] border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f0e40c] hover:-translate-y-0.5",
    "ghost-dark":
      "bg-transparent text-white border-[1.5px] border-white/55 hover:bg-white/10 hover:border-white hover:-translate-y-0.5",
  };
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${className}`}>{children}</p>
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
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-black/10 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
      <button onClick={() => onNav("gate")} className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f0e40c]" />
        <span className="text-[17px] font-medium tracking-[-0.02em] text-[#1a1a1a]">Swank Guide</span>
      </button>
      <nav className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <button
            key={l.label}
            onClick={() => l.screen && onNav(l.screen)}
            className="text-[13.5px] text-[#555] transition-colors hover:text-[#1a1a1a]"
          >
            {l.label}
          </button>
        ))}
      </nav>
      <span className="text-xl text-[#1a1a1a] md:hidden">☰</span>
    </header>
  );
}

function Footer({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <footer className="border-t border-black/10 bg-[#efede9] px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b6866]">Services</p>
            <div className="space-y-2.5 text-sm text-[#444]">
              <p>See how we curate our picks</p>
              <p>
                <button onClick={() => onNav("destination")} className="hover:text-[#1a1a1a] hover:underline">
                  Book a hotel stay
                </button>
              </p>
              <p>5990 more hotels with perks</p>
              <p>We VIP you with Fora</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-lg border border-black/15 px-4 py-3 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-[#6b6866]">
              IATA
              <br />
              ACCREDITED
            </div>
            <div className="rounded-lg border border-black/15 px-4 py-3 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-[#6b6866]">
              FORA
              <br />
              CERTIFIED
            </div>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b6866]">Community</p>
            <div className="space-y-2.5 text-sm text-[#444]">
              <p>
                <button onClick={() => onNav("how")} className="hover:text-[#1a1a1a] hover:underline">
                  Why we're different
                </button>
              </p>
              <p>Blog</p>
              <p>FAQ</p>
              <p>Newsletter</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-black/10 pt-6 text-[12.5px] text-[#6b6866] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026, Swank Guide</span>
          <div className="flex gap-6">
            <span>Contact</span>
            <span>Terms of Use</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Short dark gradient hero used by every non-photo screen. */
function DarkHero({
  eyebrow,
  title,
  sub,
  onBack,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  onBack?: () => void;
}) {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2e2b28] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-[1200px]">
        {eyebrow &&
          (onBack ? (
            <button onClick={onBack} className="mb-4 block sm:mb-5">
              <Eyebrow className="text-[#f0e40c]">{eyebrow}</Eyebrow>
            </button>
          ) : (
            <Eyebrow className="mb-4 text-[#f0e40c] sm:mb-5">{eyebrow}</Eyebrow>
          ))}
        <h1 className="text-[clamp(34px,6vw,64px)] font-light leading-[1.12] tracking-[-0.03em] text-white">
          {title}
        </h1>
        {sub && <p className="mt-4 text-[15px] leading-relaxed text-white/60 sm:mt-5">{sub}</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------

function GateScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-[#1a1a1a]">
        <img
          src="/hero-photo.png"
          alt="Riverside luxury hotel pool at dusk"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-28 sm:px-8 sm:pb-32">
          <Eyebrow className="mb-7 text-[#f0e40c]">Booking Hub</Eyebrow>
          <h1 className="max-w-[14ch] text-[clamp(42px,8vw,92px)] font-light leading-[1.12] tracking-[-0.04em] text-white">
            Pick your
            <br />
            path.
          </h1>
          <p className="mt-8 max-w-[46ch] text-[16.5px] leading-relaxed text-white/70">
            Two ways to book with us. However much help you want, we've got a lane for it.
          </p>
        </div>
        <div className="absolute bottom-7 right-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/50">
          Scroll <span>↓</span>
        </div>

      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="text-[13px] font-semibold text-[#c9a600]">01</span>
          <h2 className="text-[clamp(24px,3.4vw,34px)] font-light tracking-[-0.02em]">
            Choose how much help you want
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative rounded-3xl border-[1.5px] border-[#1a1a1a] bg-white p-8 shadow-sm transition-transform hover:-translate-y-1.5 hover:shadow-xl">
            <span className="absolute right-6 top-6 rounded-full bg-[#f0e40c] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1a1a1a]">
              Recommended
            </span>
            <h3 className="mb-3 text-[26px] font-light tracking-[-0.02em]">Concierge</h3>
            <p className="mb-4 text-[14.5px] leading-relaxed text-[#6b6866]">
              From just a hotel booking with perks to full trip planning — we advise, book, and handle
              everything.
            </p>
            <p className="mb-6 text-[13px] italic text-[#6b6866]">
              Not instant. We get to know you first. Worth it — takes less than 2 minutes to start.
            </p>
            <Btn full onClick={() => onNav("intake")}>
              Plan my trip →
            </Btn>
          </div>

          <div className="rounded-3xl border-[1.5px] border-black/10 bg-white p-8 shadow-sm transition-transform hover:-translate-y-1.5 hover:shadow-xl">
            <h3 className="mb-3 text-[26px] font-light tracking-[-0.02em]">Book Direct</h3>
            <p className="mb-5 text-[14.5px] leading-relaxed text-[#6b6866]">
              Curated hotels at the best price, booked instantly.
            </p>
            <div className="mb-6 space-y-3">
              {[
                "Personally vetted — no sponsorships, no paid placements",
                "Compare rates across major platforms in seconds",
                "Free destination guide with every booking",
              ].map((li) => (
                <div key={li} className="flex gap-3 text-[13.5px] leading-snug text-[#444]">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a600]" />
                  {li}
                </div>
              ))}
            </div>
            <Btn full variant="ghost-light" onClick={() => onNav("destination")}>
              Book Now →
            </Btn>
          </div>
        </div>
      </section>

      <section className="bg-[#efede9] px-5 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
          <p className="max-w-[52ch] text-[16px] leading-relaxed text-[#444]">
            Not sure which fits? Answer three quick questions and we'll point you the right way.
          </p>
          <Btn variant="ghost-light" onClick={() => onNav("quiz-1")}>
            Help me decide →
          </Btn>
        </div>
      </section>
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
      <DarkHero eyebrow="Quick quiz" title="Let's find your lane." />
      <div className="mx-auto max-w-[680px] px-5 py-14 pb-24 sm:px-8 sm:py-20">
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((d) => (
            <span
              key={d}
              className={`h-1.5 flex-1 rounded-full ${d <= step ? "bg-[#f0e40c]" : "bg-black/10"}`}
            />
          ))}
        </div>
        <h2 className="mb-7 text-[clamp(24px,3.4vw,32px)] font-light leading-snug tracking-[-0.02em]">
          {q}
        </h2>
        <div className="flex flex-col gap-3.5">
          {opts.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onAnswer(step, value)}
              className="flex items-center gap-4 rounded-2xl border-[1.5px] border-black/10 bg-white px-6 py-5 text-left text-base text-[#2e2b28] shadow-sm transition-all hover:-translate-y-1 hover:border-[#f0e40c] hover:shadow-md"
            >
              <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#f0e40c]" />
              {label}
            </button>
          ))}
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
      <DarkHero eyebrow="Your result" title="Here's our read." />
      <div className="mx-auto max-w-[680px] px-5 py-14 pb-24 sm:px-8 sm:py-20">
        <h2 className="mb-4 text-[clamp(26px,3.6vw,36px)] font-light tracking-[-0.02em]">
          {isBookNow ? "Book Direct looks right for you" : "Concierge looks right for you"}
        </h2>
        <p className="mb-8 text-base leading-relaxed text-[#6b6866]">
          {isBookNow
            ? "You know what you want and you're ready to move fast, let's get you the best rate."
            : "A bit of guidance will go a long way here, let's get to know your trip."}
        </p>
        <Btn onClick={onContinue}>
          {isBookNow ? "Continue to booking →" : "Continue to trip planning →"}
        </Btn>
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
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2e2b28] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[820px]">
          <Eyebrow className="mb-4 text-[#f0e40c]">Concierge</Eyebrow>
          <h1 className="text-[clamp(34px,6vw,60px)] font-light leading-[1.05] tracking-[-0.03em] text-white">
            How Concierge Works
          </h1>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/65">
            A guided way to book, minus the hours of research. Scroll to see how it flows.
          </p>
          <div className="mt-7">
            <Btn onClick={() => onNav("intake")}>Plan my trip →</Btn>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[820px] px-5 py-14 sm:px-8 sm:py-16">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b6866]">
          The process
        </p>
        {steps.map((s, i) => (
          <div key={s} className="flex items-start gap-5 border-b border-black/10 py-6 last:border-b-0">
            <span className="text-[13px] font-semibold text-[#c9a600]">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-[clamp(18px,2.4vw,22px)] font-light leading-snug tracking-[-0.01em]">{s}</p>
          </div>
        ))}

        <p className="mb-6 mt-14 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b6866]">
          Why this lane
        </p>
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-3.5 border-b border-black/10 py-4 last:border-b-0 text-[15px] text-[#444]">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f0e40c]" />
            {b}
          </div>
        ))}
      </div>

      <div className="bg-[#efede9] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-[820px]">
          <h2 className="mb-6 text-[clamp(22px,3vw,28px)] font-light tracking-[-0.02em]">
            Levels of support
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="mb-2 text-[15px] font-medium">Hotel only + perks</p>
              <p className="text-[13px] uppercase tracking-wide text-[#c9a600]">Free</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="mb-2 text-[15px] font-medium">Every detail handled</p>
              <p className="text-[13px] uppercase tracking-wide text-[#c9a600]">From $30/day</p>
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

const inputCls =
  "w-full rounded-lg border-[1.5px] border-black/10 bg-[#efede9] px-4 py-4 text-[15px] focus:border-[#c9a600] focus:bg-white focus:outline-none";

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
      className={`mb-2.5 flex w-full items-center gap-3.5 rounded-xl border-[1.5px] px-5 py-4 text-left text-[15px] transition-all ${
        selected
          ? "border-[#f0e40c] bg-[#fbf6a6]/50 text-[#1a1a1a]"
          : "border-black/10 bg-white text-[#444] hover:border-[#1a1a1a]"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${selected ? "bg-[#c9a600]" : "bg-black/15"}`}
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

  const patch = (p: Partial<IntakeData>) => setData((d) => ({ ...d, ...p }));

  async function submit() {
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
      <DarkHero eyebrow="Concierge" title="Tell us about your trip." />
      <div className="mx-auto max-w-[600px] px-5 py-12 pb-16 sm:px-8">
        <div className="mb-7">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[#6b6866]">
            <span>{step} of 7</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[#f0e40c] transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div>
          {step === 1 && (
            <>
              <p className="mb-5 text-[clamp(21px,2.6vw,26px)] font-light leading-snug tracking-[-0.02em]">
                First, the basics.
              </p>
              <input
                value={data.hp}
                onChange={(e) => patch({ hp: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <input
                value={data.fname}
                onChange={(e) => patch({ fname: e.target.value })}
                placeholder="First name or nickname"
                className={`mb-3 ${inputCls}`}
              />
              <input
                value={data.email}
                onChange={(e) => {
                  patch({ email: e.target.value });
                  if (emailError) setEmailError(false);
                }}
                type="email"
                placeholder="Email address"
                aria-describedby="email-error"
                className={`mb-1 w-full rounded-lg border-[1.5px] px-4 py-4 text-[15px] focus:outline-none ${
                  emailError
                    ? "border-[#b3261e] bg-[#fdecea]"
                    : "border-black/10 bg-[#efede9] focus:border-[#c9a600] focus:bg-white"
                }`}
              />
              {emailError && (
                <p id="email-error" className="mb-2 text-[12.5px] text-[#b3261e]">
                  We'll need a real email address to send your proposal.
                </p>
              )}
              <div className="mb-5 mt-3 grid grid-cols-[auto_1fr] gap-2.5">
                <select
                  value={data.cc}
                  onChange={(e) => patch({ cc: e.target.value })}
                  aria-label="Country code"
                  className="rounded-lg border-[1.5px] border-black/10 bg-[#efede9] px-3 py-4 text-[15px] focus:border-[#c9a600] focus:bg-white focus:outline-none"
                >
                  <option value="+1">US +1</option>
                  <option value="+44">UK +44</option>
                  <option value="+61">Australia +61</option>
                  <option value="+55">Brazil +55</option>
                </select>
                <input
                  value={data.phone}
                  onChange={(e) => patch({ phone: e.target.value })}
                  type="tel"
                  placeholder="Phone number"
                  className={inputCls}
                />
              </div>
              <Btn full onClick={() => setStep(2)}>
                Next →
              </Btn>
            </>
          )}

          {step === 2 && (
            <>
              <p className="mb-5 text-[clamp(21px,2.6vw,26px)] font-light leading-snug tracking-[-0.02em]">
                Where are you going?
              </p>
              <input
                value={data.dest}
                onChange={(e) => patch({ dest: e.target.value })}
                placeholder="e.g. Thailand, Paris, anywhere warm..."
                className={`mb-3 ${inputCls}`}
              />
              <Btn full onClick={() => setStep(3)}>
                Next →
              </Btn>
            </>
          )}

          {step === 3 && (
            <>
              <p className="mb-5 text-[clamp(21px,2.6vw,26px)] font-light leading-snug tracking-[-0.02em]">
                When are you traveling?
              </p>
              {["I have exact dates", "I'm flexible, I have a rough timeframe", "I'm very early, just exploring"].map(
                (o) => (
                  <OptionRow key={o} label={o} selected={data.when === o} onClick={() => patch({ when: o })} />
                ),
              )}
              <input
                value={data.whenNote}
                onChange={(e) => patch({ whenNote: e.target.value })}
                placeholder="e.g. two weeks in October, early 2027..."
                className={`mb-3 mt-2 ${inputCls}`}
              />
              <Btn full onClick={() => setStep(4)}>
                Next →
              </Btn>
            </>
          )}

          {step === 4 && (
            <>
              <p className="mb-5 text-[clamp(21px,2.6vw,26px)] font-light leading-snug tracking-[-0.02em]">
                How many people are traveling?
              </p>
              {["Just me", "2 travelers", "3 or more, family or group trip"].map((o) => (
                <OptionRow key={o} label={o} selected={data.party === o} onClick={() => patch({ party: o })} />
              ))}
              <input
                value={data.partyNote}
                onChange={(e) => patch({ partyNote: e.target.value })}
                placeholder="Any details on kids' ages or group makeup?"
                className={`mb-3 mt-2 ${inputCls}`}
              />
              <Btn full onClick={() => setStep(5)}>
                Next →
              </Btn>
            </>
          )}

          {step === 5 && (
            <>
              <p className="mb-5 text-[clamp(21px,2.6vw,26px)] font-light leading-snug tracking-[-0.02em]">
                What kind of experience are you looking for?
              </p>
              <textarea
                value={data.experience}
                onChange={(e) => patch({ experience: e.target.value })}
                placeholder="e.g. romantic anniversary, boutique and design-forward, something off the beaten path..."
                className={`mb-3 h-28 resize-none ${inputCls}`}
              />
              <Btn full onClick={() => setStep(6)}>
                Next →
              </Btn>
            </>
          )}

          {step === 6 && (
            <>
              <p className="mb-5 text-[clamp(21px,2.6vw,26px)] font-light leading-snug tracking-[-0.02em]">
                Approximate nightly hotel budget?
              </p>
              {["Under $200 / night", "$200 – $400 / night", "$400 – $700 / night", "$700+ / night", "Flexible, show me the best options"].map(
                (o) => (
                  <OptionRow key={o} label={o} selected={data.budget === o} onClick={() => patch({ budget: o })} />
                ),
              )}
              <Btn full className="mt-2" onClick={() => setStep(7)}>
                Next →
              </Btn>
            </>
          )}

          {step === 7 && (
            <>
              <p className="mb-5 text-[clamp(21px,2.6vw,26px)] font-light leading-snug tracking-[-0.02em]">
                Where are you in the planning process?
              </p>
              {[
                "Just starting to explore ideas",
                "I have a rough plan, need help filling it in",
                "My flights are booked, I need hotels and logistics",
                "I know exactly what I want, just need someone to book it",
              ].map((o) => (
                <OptionRow key={o} label={o} selected={data.stage === o} onClick={() => patch({ stage: o })} />
              ))}
              <Btn full className="mt-2" disabled={sending} onClick={submit}>
                {sending ? "Sending…" : "Submit →"}
              </Btn>
            </>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 z-10 mt-4 border-t border-black/10 bg-white/92 py-4 text-center backdrop-blur">
        <p className="text-sm text-[#6b6866]">
          Prefer to book it yourself now?{" "}
          <button
            onClick={onSwitchToBookDirect}
            className="border-b-2 border-[#f0e40c] font-medium text-[#1a1a1a] hover:text-black"
          >
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
      <DarkHero title="Done." />
      <div className="mx-auto max-w-[600px] px-5 py-14 pb-24 sm:px-8 sm:py-20">
        <h2 className="mb-3.5 text-[clamp(26px,3.4vw,32px)] font-light tracking-[-0.02em]">We're on it.</h2>
        <p className="mb-6 text-base leading-relaxed text-[#6b6866]">
          In the meantime, we've sent you a confirmation email. If you don't see it in the next few minutes,
          check your spam folder and mark us as safe.
        </p>
        <div className="rounded-2xl bg-[#efede9] p-6">
          <p className="mb-3 text-[13px] font-semibold">What happens next</p>
          {[
            "We'll be in touch within 24 hours",
            "We may have a quick follow-up question or two",
            "Your proposal will be ready within one to three days depending on complexity",
          ].map((li) => (
            <div key={li} className="relative py-1.5 pl-6 text-sm leading-snug text-[#444]">
              <span className="absolute left-1 top-3 h-1.5 w-1.5 rounded-full bg-[#c9a600]" />
              {li}
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] italic text-[#6b6866]">
          Changes, group policies, and refund details will be included in your proposal.
        </p>
        <button onClick={onHome} className="mt-6 inline-block text-[13px] text-[#6b6866] underline">
          ← Back to start
        </button>
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

  return (
    <>
      <DarkHero eyebrow="Book Direct" title="Where are you going?" />
      <div className="mx-auto max-w-[980px] px-5 py-12 pb-24 sm:px-8 sm:py-16">
        <div className="relative mb-5">
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b6866]">
            Destination
          </label>
          <input
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search a city or country..."
            className="w-full rounded-lg border-[1.5px] border-black/10 bg-white px-5 py-4 text-base shadow-sm focus:border-[#c9a600] focus:outline-none"
          />
          {open && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-72 overflow-y-auto rounded-2xl bg-white shadow-xl">
              {noMatches && (
                <div className="flex items-center justify-between gap-2 border-b border-black/10 px-4 py-4 text-sm text-[#6b6866]">
                  <span>"{query}" is not one of our destinations or hotels yet</span>
                  <span className="flex-shrink-0 rounded-full bg-[#efede9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#6b6866]">
                    Coming soon
                  </span>
                </div>
              )}
              {hotelMatches.map((h) => (
                <div
                  key={h.id}
                  onMouseDown={onGoHotel}
                  className="flex cursor-pointer items-center justify-between gap-2 border-b border-black/10 px-4 py-4 text-sm hover:bg-[#fbf6a6]"
                >
                  <span>{h.name}</span>
                  <span className="flex-shrink-0 rounded-full bg-[#f0e40c] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#1a1a1a]">
                    Hotel
                  </span>
                </div>
              ))}
              {destMatches.map((d) => (
                <div
                  key={d.name}
                  onMouseDown={() => d.built && onGoHotel()}
                  className={`flex items-center justify-between gap-2 border-b border-black/10 px-4 py-4 text-sm last:border-b-0 ${
                    d.built ? "cursor-pointer hover:bg-[#fbf6a6]" : "cursor-default text-[#6b6866]"
                  }`}
                >
                  <span>{d.name}</span>
                  {!d.built && (
                    <span className="flex-shrink-0 rounded-full bg-[#efede9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#6b6866]">
                      Coming soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="my-7 flex items-center gap-3.5">
          <div className="h-px flex-1 bg-black/10" />
          <span className="text-[11px] uppercase tracking-[0.1em] text-[#6b6866]">Or browse by region</span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <div className="flex overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex-1 border-r border-black/10">
            {["Asia", "Caribbean", "Central America", "Europe", "Mexico", "Nordic", "US + Canada"].map((r, i) => (
              <div
                key={r}
                className={`flex justify-between border-b border-black/10 px-4 py-3.5 text-[13.5px] last:border-b-0 ${
                  i === 0
                    ? "bg-[#f0e40c] font-semibold text-[#1a1a1a]"
                    : "cursor-pointer text-[#555] hover:bg-[#efede9]"
                }`}
              >
                {r} <span>›</span>
              </div>
            ))}
          </div>
          <div className="flex-1 border-r border-black/10">
            {["Thailand", "Bali", "India", "Sri Lanka"].map((c, i) => (
              <div
                key={c}
                className={`flex justify-between border-b border-black/10 px-4 py-3.5 text-[13.5px] last:border-b-0 ${
                  i === 0
                    ? "bg-[#efede9] font-medium text-[#1a1a1a]"
                    : "cursor-pointer text-[#555] hover:bg-[#efede9]"
                }`}
              >
                {c} <span>›</span>
              </div>
            ))}
          </div>
          <div className="flex-1">
            <div
              onClick={onGoHotel}
              className="cursor-pointer border-b border-black/10 bg-[#efede9] px-4 py-3.5 text-[13.5px] font-medium text-[#1a1a1a]"
            >
              Bangkok
            </div>
            {["Koh Samui", "Greater Phuket", "Chiang Mai & Chiang Rai", "Pattaya & Hua Hin"].map((c, i, arr) => (
              <div
                key={c}
                className={`px-4 py-3.5 text-[13.5px] text-[#555] ${
                  i < arr.length - 1 ? "border-b border-black/10" : ""
                }`}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-black/10 py-4 text-center">
        <button onClick={onSwitchConcierge} className="border-b-2 border-[#f0e40c] font-medium text-[#1a1a1a]">
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
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div
        className="relative flex aspect-[3/2] w-full items-center justify-center"
        style={{ background: hotel.photoBg }}
      >
        <span className="text-[10px] uppercase tracking-[0.08em] text-white/30">[ {hotel.photoTag} ]</span>
        <span
          className={`absolute bottom-3.5 left-3.5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide ${
            hotel.badge === "stayed" ? "bg-[#f0e40c] text-[#1a1a1a]" : "bg-black/85 text-white backdrop-blur"
          }`}
        >
          {hotel.badge === "stayed" ? "✦ Swank Tested" : "✦ Trusted Pick"}
        </span>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-lg font-normal">{hotel.name}</h3>
        <p className="mb-4 text-[13.5px] leading-relaxed text-[#6b6866]">{hotel.desc}</p>
        <div className="flex flex-col gap-2.5">
          <div>
            <button className="flex w-full items-center justify-between rounded-full bg-[#1a1a1a] px-4 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:shadow-md">
              <span>Book with Swank</span>
              <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-[#f0e40c] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#1a1a1a]">
                {isBestValue ? "Best Value" : "Swank Value"}
              </span>
            </button>
            <button onClick={() => setOpen((o) => !o)} className="mt-2 block text-xs text-[#6b6866] underline">
              {isBestValue
                ? open
                  ? "Why best value? −"
                  : "Why best value? +"
                : open
                  ? "Why this rate? −"
                  : "Why this rate? +"}
            </button>
            {open && (
              <div className="mt-2 rounded-lg border-l-[3px] border-[#f0e40c] bg-[#efede9] p-3.5 text-xs italic leading-relaxed text-[#6b6866]">
                Hotels treat our bookings differently: better rooms, real perks, our team in your corner.
                You'll also receive our trip-prep kit.
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button className="rounded-full border-[1.5px] border-black/10 bg-[#efede9] py-3 text-[13px] font-medium text-[#555] hover:border-[#1a1a1a] hover:bg-white">
              Booking.com
            </button>
            <button className="rounded-full border-[1.5px] border-black/10 bg-[#efede9] py-3 text-[13px] font-medium text-[#555] hover:border-[#1a1a1a] hover:bg-white">
              Expedia
            </button>
          </div>
        </div>
      </div>
    </div>
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
      <DarkHero eyebrow="← Change destination" title="Bangkok" sub="Book Direct" onBack={onChangeDestination} />

      <div className="mx-auto max-w-[1440px] px-5 pb-2 pt-6 sm:px-8">
        <p className="text-[15px] leading-relaxed text-[#6b6866]">
          <strong className="font-medium text-[#1a1a1a]">
            No sponsorships. No paid placements. Every recommendation is independent.
          </strong>{" "}
          Book whichever way works best for you — you're supporting honest travel journalism either way.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#6b6866]">
          <p>
            <span className="font-semibold text-[#1a1a1a]">✦ Swank Tested</span> Don stayed here personally,
            on his own dime.
          </p>
          <p>
            <span className="font-semibold text-[#1a1a1a]">✦ Trusted Pick</span> Visited, vetted, and
            recommended by our team.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-3 sm:px-8">
        {tiers.map((tier) => (
          <div key={tier}>
            <div className="mb-4 mt-8 flex items-baseline gap-3.5 border-b border-black/10 pb-3">
              <h2 className="text-[22px] font-normal">{tier}</h2>
              {tierSub[tier] && <span className="text-[13px] text-[#6b6866]">{tierSub[tier]}</span>}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HOTELS.filter((h) => h.tier === tier).map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-10 rounded-3xl bg-[#1a1a1a] p-7">
          <p className="text-[14.5px] leading-relaxed text-white/75">
            <strong className="text-[#f0e40c]">
              Book through any of our links and we'll send you our free Bangkok destination guide
            </strong>
            : where to eat, what to skip, and the spots worth your time. Forward your confirmation to{" "}
            <span className="text-[#f0e40c] underline">vip@swankguide.com</span>
          </p>
        </div>
      </div>

      <div className="border-t border-black/10 py-4 text-center">
        <button onClick={onSwitchConcierge} className="border-b-2 border-[#f0e40c] font-medium text-[#1a1a1a]">
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
    <div className="min-h-screen bg-[#f7f5f1] font-sans text-[#1a1a1a] antialiased">
      <Header onNav={setScreen} />

      {screen === "gate" && <GateScreen onNav={setScreen} />}
      {(screen === "quiz-1" || screen === "quiz-2" || screen === "quiz-3") && (
        <QuizScreen
          step={Number(screen.split("-")[1]) as 1 | 2 | 3}
          onAnswer={handleQuizAnswer}
        />
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

      <Footer onNav={setScreen} />

      {showFloatingCta && (
        <button
          onClick={() => setScreen("gate")}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-[#f0e40c] px-7 py-3.5 text-sm font-bold text-[#1a1a1a] shadow-lg transition-transform hover:-translate-y-1"
        >
          Plan Trip
        </button>
      )}
    </div>
  );
}

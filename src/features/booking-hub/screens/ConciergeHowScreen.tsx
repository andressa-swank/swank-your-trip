import raftingAsset from "@/assets/concierge-group-rafting.jpg.asset.json";
import { Btn } from "../components/Button";
import { PageIntro } from "../components/PageIntro";
import type { Screen } from "../types";

const TIERS = [
  {
    title: "Level 1: Hotels + perks + VIP",
    desc: "Already know your hotel? We'll hunt down the best rate and unlock VIP perks, upgrades, late checkout, welcome amenities. At no cost to you.",
    cta: "Book with perks",
    price: "Free",
    note: null as string | null,
    badge: null as string | null,
  },
  {
    title: "Level 2: Hotels + transfers & tours",
    desc: "Everything in Level 1, plus zero airport pickup lottery. Every transfer and tour is vetted and pre-booked, no surprises, no haggling.",
    cta: "Add a transfer or tour",
    price: "$25",
    note: "Per transfer or tour",
    badge: null,
  },
  {
    title: "Level 3: Concierge",
    desc: "Everything in Levels 1–2, plus our specialty: matching you with hotels that have real character, tested by us, fit to your style and budget.",
    cta: "Find my hotel",
    price: "$30",
    note: "Per night",
    badge: "Most popular",
  },
  {
    title: "Level 4: Concierge plus",
    desc: 'The full "just take care of it" tier, your entire itinerary designed by experts: where to go, how long, activities, and flights.',
    cta: "Plan my full trip",
    price: "$50",
    note: "Per night",
    badge: null,
  },
];

const REFUNDS = [
  { label: "Trip spend under $5,000", value: "Non-refundable", muted: true },
  { label: "Trip spend $5,000–$12,000", value: "50% refunded", muted: false },
  { label: "Trip spend over $12,000", value: "75% refunded", muted: false },
];

const CHANGES = [
  {
    title: "Small change",
    desc: "You're changing one thing, whether that's one hotel, one date, or one vendor. The rest of your trip stays the same.",
    price: "First one free, then $75",
  },
  {
    title: "Big change",
    desc: "You're changing something that affects your whole trip, like new dates across several hotels, a different route, or adding or removing a destination.",
    price: "$200",
  },
];

export function ConciergeHowScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <>
      <PageIntro
        eyebrow="Concierge"
        title="How concierge works"
        sub="Takes less than two minutes."
      >
        <div className="mt-8">
          <Btn variant="accent" onClick={() => onNav("intake")}>
            Let&apos;s get started
          </Btn>
        </div>
      </PageIntro>

      <section className="page-container py-12 md:py-[72px]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="section-heading text-ink">Choose your level of support</h2>
          <p className="mt-6 body-copy text-ink-muted">
            Every trip gets the same care, though not every trip takes the same work. We pour our
            expertise, time, and industry relationships into making sure your travel is seamless, and
            below you&apos;ll find what&apos;s included at each level, what it costs, and how much
            comes back to you after you travel, since many of our fees are refunded. Fees are per
            trip for up to two travelers, not per person.
          </p>

          <div className="mt-10">
            {TIERS.map((tier) => (
              <div
                key={tier.title}
                className="grid gap-4 border-b border-hairline py-8 last:border-b-0 md:grid-cols-[4px_1fr_200px] md:gap-5"
              >
                <span className="hidden h-10 w-1 bg-brand md:block" />
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="text-[20px] font-medium leading-7 text-ink">{tier.title}</h3>
                    {tier.badge && (
                      <span className="rounded-full bg-brand px-3.5 py-[5px] text-[13px] font-medium text-ink">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className="mb-4 max-w-[560px] body-copy text-ink-muted">{tier.desc}</p>
                  <button
                    type="button"
                    onClick={() => onNav("intake")}
                    className="text-[14px] text-ink underline underline-offset-4 transition-opacity duration-[180ms] hover:opacity-70"
                  >
                    {tier.cta}
                  </button>
                </div>
                <div className="md:text-right">
                  <p className="text-[22px] font-medium leading-7 text-ink">{tier.price}</p>
                  {tier.note && (
                    <span className="mt-1 block text-[14px] text-ink-muted">{tier.note}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-soft py-12 md:py-16">
        <div className="page-container">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="section-heading text-ink">What&apos;s refundable</h2>
            <p className="mt-6 body-copy text-ink-muted">
              The more you book with us, the more we can give back. This applies to the nightly fees
              for concierge and concierge plus. Transfer, tour, and change fees are non-refundable,
              and if your trip is canceled, the fee is non-refundable.
            </p>
            <div className="mt-10 border-t border-hairline">
              {REFUNDS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-hairline py-6"
                >
                  <span className="text-[16px] leading-6 text-ink">{row.label}</span>
                  <span
                    className={
                      row.muted
                        ? "text-[15px] text-ink-muted"
                        : "text-[15px] font-medium text-ink"
                    }
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-container py-12 md:py-[72px]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="section-heading text-ink">
            Groups of three or more start at concierge plus
          </h2>
          <p className="mt-6 body-copy text-ink-muted">
            We love planning family and group trips, though they just take more work behind the
            scenes. Most booking systems are built for two people per room; add a third traveler or a
            child and the process goes manual, with direct back-and-forth on age policies and
            adjoining rooms. Concierge plus gives us the dedicated time to handle it all, so your
            crew travels without a hitch.
          </p>
        </div>
      </section>

      <figure className="m-0">
        <img
          src={raftingAsset.url}
          alt="A group of travelers whitewater rafting together down a river"
          loading="lazy"
          className="h-[280px] w-full object-cover md:h-[520px]"
        />
      </figure>

      <section className="border-t border-hairline py-12 md:py-16">
        <div className="page-container">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="section-heading text-ink">Changes to your trip</h2>
            <p className="mt-6 body-copy text-ink-muted">
              Plans change, and we get it. Your first minor change is on us. After that, changes carry
              a non-refundable fee, because every change means real work behind the scenes.
            </p>
            <div className="mt-10">
              {CHANGES.map((row) => (
                <div
                  key={row.title}
                  className="grid gap-4 border-b border-hairline py-8 last:border-b-0 md:grid-cols-[4px_1fr_200px] md:gap-5"
                >
                  <span className="hidden h-10 w-1 bg-brand md:block" />
                  <div>
                    <h3 className="mb-2 text-[20px] font-medium leading-7 text-ink">{row.title}</h3>
                    <p className="max-w-[680px] body-copy text-ink-muted">{row.desc}</p>
                  </div>
                  <p className="whitespace-nowrap text-[15px] font-medium text-ink md:text-right">
                    {row.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-soft py-12 text-center md:py-16">
        <div className="page-container">
          <h2 className="section-heading mx-auto max-w-[820px] text-ink">
            Skip the guesswork. Let the Swank team build your trip.
          </h2>
          <div className="mt-8">
            <Btn variant="accent" onClick={() => onNav("intake")}>
              Let&apos;s get started
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}

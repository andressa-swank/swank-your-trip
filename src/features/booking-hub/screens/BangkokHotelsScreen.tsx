import { HotelCard } from "../components/HotelCard";
import { PageIntro } from "../components/PageIntro";
import { HOTELS } from "../data/hotels";
import type { Hotel } from "../types";

export function BangkokHotelsScreen({
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
        eyebrow="\n"
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
            <div className="hotel-card-grid grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3">
              {HOTELS.filter((h) => h.tier === tier).map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 rounded-[8px] border border-hairline bg-soft p-6 md:p-8">
          <p className="text-[16px] leading-7 text-ink-muted">
            <strong className="font-medium text-ink">
              Book through any of our links and you'll receive our trip-prep kit plus our Bangkok destination e-book
            </strong>
            : where to eat, what to skip, and the spots worth your time. Forward your confirmation to{" "}
            <span className="text-link">vip@swankguide.com</span>
          </p>
        </div>
      </div>

      <div className="border-t border-hairline py-6 text-center">
        <button onClick={onSwitchConcierge} className="text-link min-h-11 font-medium">
          Switch to Concierge
        </button>
      </div>
    </>
  );
}

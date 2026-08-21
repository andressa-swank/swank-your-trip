import { useState } from "react";
import bookDirectHero from "@/assets/book-direct-hero.webp";
import { Eyebrow } from "../components/Eyebrow";
import { DESTINATIONS } from "../data/destinations";
import { HOTELS, MOST_BOOKED_HOTELS } from "../data/hotels";

export function DestinationScreen({
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
      <section className="book-direct-hero">
        <img
          src={bookDirectHero}
          alt="Historic Italian villa surrounded by gardens and Tuscan hills"
          width={1200}
          height={800}
        />
        <div className="book-direct-hero__overlay" />
        <div className="page-container book-direct-hero__content">
          <Eyebrow className="text-white/80">Book Direct</Eyebrow>
          <h1 className="display-heading mt-3 max-w-[760px] text-white">Where are you going?</h1>
        </div>
      </section>
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

        <section className="mt-16 border-t border-hairline pt-12 md:mt-20 md:pt-16" aria-labelledby="most-booked-title">
          <div className="mb-8 max-w-[720px] md:mb-10">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              Guest favorites
            </p>
            <h2 id="most-booked-title" className="section-heading text-ink">
              Most booked with Swank
            </h2>
            <p className="mt-3 text-[16px] leading-7 text-ink-muted">
              The hotels our travelers ask for and book most often.
            </p>
          </div>

          <div className="listing-grid">
            {MOST_BOOKED_HOTELS.map((hotel) => (
              <article
                key={hotel}
                className="group flex flex-col bg-background transition-all duration-[180ms] hover:-translate-y-0.5"
              >
                <div className="hotel-card__media">
                  <span className="max-w-[82%] px-4 text-center text-[12px] leading-[18px] text-ink-muted">
                    [ {hotel} ]
                  </span>
                  <span className="badge-pill absolute bottom-3 left-3 bg-brand uppercase tracking-wide text-ink">
                    Most booked
                  </span>
                </div>
                <div className="listing-card__body">
                  <h3 className="listing-card__name">{hotel}</h3>
                </div>
              </article>
            ))}
          </div>

        </section>
      </div>
      <div className="border-t border-hairline py-6 text-center">
        <button onClick={onSwitchConcierge} className="text-link min-h-11 font-medium">
          Switch to Concierge
        </button>
      </div>
    </>
  );
}

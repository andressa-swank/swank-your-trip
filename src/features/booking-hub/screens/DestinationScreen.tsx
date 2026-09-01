import { useState, type FormEvent } from "react";
import bookDirectHero from "@/assets/book-direct-hero.webp";
import { HotelCard } from "../components/HotelCard";
import { DESTINATION_REGIONS, type DestinationItem } from "../data/destinations";
import { HOTELS, MOST_BOOKED_HOTELS } from "../data/hotels";

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const DESCRIPTIONS: Record<string, string> = {
  "The Sarojin": "Just north of Phuket's crowds, The Sarojin is an elegant, design-forward boutique resort with real value. Quiet beach, lush grounds, great food—and one of the best hotel deals in Thailand.",
  "Pimalai Resort & Spa": "The Pimalai Resort & Spa combines true barefoot luxury with remote jungle surroundings and a long stretch of quiet Koh Lanta beach. An independent Thai-owned resort that's elegant but unpretentious—big on privacy, service, and low-key sophistication.",
  "The Surin Phuket": "The Surin Phuket perches on Thailand's finest sand, where Aman architect Ed Tuttle's hillside cottages blend tropical luxury with understated elegance. Think design-forward minimalism meets barefoot sophistication—a resort that whispers rather than shouts.",
};

function MostBookedCard({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="most-booked-card">
      <div className="most-booked-card__media">
        <span>[ {name} ]</span>
        <span className="most-booked-tag">Most booked</span>
        <span className="most-booked-card__hover">View Hotel</span>
      </div>
      <div className="most-booked-card__body">
        <h3>{name}</h3>
        <p>{DESCRIPTIONS[name] ?? LOREM}</p>
        <div className="most-booked-card__actions">
          <div className="most-booked-card__primary">
            <button type="button">Book with Swank</button><span>Best Value</span>
          </div>
          <button type="button" className="most-booked-card__why" onClick={() => setOpen((value) => !value)}>Best Value – Why?</button>
          {open && <div className="hotel-card__why-panel">Hotels treat our bookings differently: better rooms, real perks, and our team in your corner.</div>}
          <div className="most-booked-card__secondary">
            <button type="button">Booking.com</button><button type="button">Expedia</button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function DestinationScreen({
  onGoHotel,
  onSwitchConcierge,
}: {
  onGoHotel: () => void;
  onSwitchConcierge: () => void;
}) {
  const [search, setSearch] = useState({ query: "", checkIn: "", checkOut: "", guests: "2" });
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState(HOTELS);
  const [openRegions, setOpenRegions] = useState<Record<string, boolean>>({});
  const [activeChildren, setActiveChildren] = useState<Record<string, string | null>>({});

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const query = search.query.trim().toLowerCase();
    setResults(HOTELS.filter((hotel) => !query || [hotel.name, "bangkok, thailand", hotel.tier].some((value) => value.toLowerCase().includes(query))));
    setHasSearched(true);
  }

  function chooseItem(region: string, item: DestinationItem) {
    if (item.goHotel) onGoHotel();
    else if (item.children) setActiveChildren((current) => ({ ...current, [region]: item.label }));
  }

  return (
    <>
      <section className="destination-hero">
        <img src={bookDirectHero} alt="Historic Italian villa surrounded by gardens and Tuscan hills" />
        <div />
        <h1>Book Direct</h1>
      </section>

      <div className="destination-page">
        <form className="destination-search" onSubmit={submitSearch}>
          <label className="destination-search__query">
            <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.2" /><path d="M12.5 12.5L16 16" /></svg>
            <input value={search.query} onChange={(event) => setSearch({ ...search, query: event.target.value })} placeholder="Destination or hotel name" />
          </label>
          <span className="destination-search__divider" />
          <label><span>Check-in</span><input type="date" value={search.checkIn} onChange={(event) => setSearch({ ...search, checkIn: event.target.value })} /></label>
          <span className="destination-search__divider" />
          <label><span>Check-out</span><input type="date" value={search.checkOut} onChange={(event) => setSearch({ ...search, checkOut: event.target.value })} /></label>
          <span className="destination-search__divider" />
          <label><span>Guests</span><select value={search.guests} onChange={(event) => setSearch({ ...search, guests: event.target.value })}><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4+">4+ guests</option></select></label>
          <button type="submit">Search</button>
        </form>

        <section className="destination-browse">
          <h2>Browse by Destination</h2>
          <div className="destination-region-grid">
            {DESTINATION_REGIONS.map((region) => {
              const open = !!openRegions[region.label];
              const activeLabel = activeChildren[region.label];
              const activeItem = activeLabel ? region.items.find((item) => item.label === activeLabel) : undefined;
              const visibleItems = activeItem?.children ?? region.items;
              return (
                <article key={region.label} className={open ? "is-open" : ""}>
                  <button type="button" className="destination-region__toggle" onClick={() => {
                    setOpenRegions((current) => ({ ...current, [region.label]: !open }));
                    if (open) setActiveChildren((current) => ({ ...current, [region.label]: null }));
                  }}>
                    <span>{region.label}</span><span>{open ? "–" : "+"}</span>
                  </button>
                  {open && (
                    <div className="destination-region__items">
                      {activeItem && <button type="button" className="destination-region__back" onClick={() => setActiveChildren((current) => ({ ...current, [region.label]: null }))}>← Back to {region.label}</button>}
                      {visibleItems.map((item) => (
                        <button type="button" key={item.label} onClick={() => chooseItem(region.label, item)}>
                          <span>{item.label}</span>
                          {item.children || item.goHotel ? <span>›</span> : !item.href ? <small>Coming soon</small> : null}
                        </button>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {hasSearched && (
          <section className="destination-results">
            <p>Search results</p>
            <h2>Hotels matching your search</h2>
            {results.length ? <div className="hotel-card-grid">{results.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}</div> : <div className="destination-no-results">We do not have a Swank search result for that yet. Try Bangkok, or browse by destination above.</div>}
          </section>
        )}

        <section className="most-booked-section">
          <h2>Most booked hotels</h2>
          <div className="most-booked-grid">{MOST_BOOKED_HOTELS.map((hotel) => <MostBookedCard key={hotel} name={hotel} />)}</div>
        </section>
      </div>

      <div className="destination-switch"><button type="button" onClick={onSwitchConcierge}>Switch to Concierge</button></div>
    </>
  );
}

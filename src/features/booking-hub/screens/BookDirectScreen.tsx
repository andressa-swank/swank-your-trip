import { Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import bookDirectHero from "@/assets/book-direct-hero.webp";

type HotelTier = "Best Value" | "Mid-Range" | "Splurge";
type HotelBadge = "stayed" | "trusted";
type AvailabilityStatus = "loading" | "available" | "unavailable";

type Hotel = {
  id: string;
  name: string;
  destination: string;
  tier: HotelTier;
  badge: HotelBadge;
  photoTag: string;
  desc: string;
  affiliateLinks: { label: string; href: string }[];
};

type MostBookedHotel = {
  name: string;
  photoTag: string;
  desc: string;
  affiliateLinks: { label: string; href: string }[];
};

type SearchForm = { query: string; checkIn: string; checkOut: string; guests: string };
type Availability = { status: AvailabilityStatus; price?: string; bookingUrl?: string };
type DestinationItem = { label: string; href?: string; children?: DestinationItem[] };
type DestinationRegion = { label: string; items: DestinationItem[] };

const WEBBEDS_ENDPOINT = "/api/webbeds/searchhotels";
const MOST_BOOKED_PLACEHOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const DEFAULT_AFFILIATE_LINKS = [{ label: "Booking.com", href: "#" }, { label: "Expedia", href: "#" }];

const HOTELS: Hotel[] = [
  { id: "hotel-como", name: "COMO Metropolitan Bangkok", destination: "Bangkok, Thailand", tier: "Best Value", badge: "stayed", photoTag: "COMO Bangkok", desc: "Understated, design-forward, calm. One of the most consistently well-executed hotels in the city, and usually one of the better-priced options at this quality level.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
  { id: "hotel-standard", name: "The Standard Bangkok", destination: "Bangkok, Thailand", tier: "Best Value", badge: "stayed", photoTag: "The Standard", desc: "The most fun option on this list. Playful design, a great rooftop, strong restaurants and bars, a genuinely energetic vibe. Often surprisingly well-priced.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
  { id: "hotel-sala", name: "Sala Rattanakosin", destination: "Bangkok, Thailand", tier: "Best Value", badge: "trusted", photoTag: "Sala Rattanakosin", desc: "Small, intimate, directly across the river from Wat Arun. The views are the whole point. Not full-service. Better for design-conscious travelers who value atmosphere over amenities.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
  { id: "hotel-peninsula", name: "The Peninsula Bangkok", destination: "Bangkok, Thailand", tier: "Mid-Range", badge: "stayed", photoTag: "Peninsula Bangkok", desc: "The gold standard for classic Bangkok luxe. Impeccable service, serious river views, one of the best pool setups in the city. Consistently punches above its rate.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
  { id: "hotel-kimpton", name: "Kimpton Maa-Lai", destination: "Bangkok, Thailand", tier: "Mid-Range", badge: "trusted", photoTag: "Kimpton Maa-Lai", desc: "Feels more boutique than its size suggests. Thoughtful design, next to Lumphini Park, reliably good value. Smart pick for stylish travelers without the top-tier price tag.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
  { id: "hotel-sukhothai", name: "The Sukhothai Bangkok", destination: "Bangkok, Thailand", tier: "Mid-Range", badge: "trusted", photoTag: "The Sukhothai", desc: "Classic Bangkok in every sense. Traditional Thai architecture, lush gardens, a calm that's rare in the city. The Celadon restaurant is a destination in its own right.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
  { id: "hotel-siam", name: "The Siam", destination: "Bangkok, Thailand", tier: "Splurge", badge: "stayed", photoTag: "The Siam", desc: "The best design hotel in Bangkok. Bill Bensley, riverfront, feels like a private residence crossed with a museum. The pool, the bar, the rooms: all exceptional.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
  { id: "hotel-fourseasons", name: "Four Seasons Bangkok", destination: "Bangkok, Thailand", tier: "Splurge", badge: "stayed", photoTag: "Four Seasons", desc: "A newer property that has quickly become one of the strongest in the city. Beautifully designed, serious pool complex, prime Chao Phraya riverfront.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
  { id: "hotel-mandarin", name: "Mandarin Oriental Bangkok", destination: "Bangkok, Thailand", tier: "Splurge", badge: "stayed", photoTag: "Mandarin Oriental", desc: "A Bangkok icon with real history. The jazz bar, the riverside setting, the sense of place. Book it for the experience, shop the rates carefully.", affiliateLinks: DEFAULT_AFFILIATE_LINKS },
];

const MOST_BOOKED_HOTELS: MostBookedHotel[] = [
  "The Sarojin",
  "Pimalai Resort & Spa",
  "The Surin Phuket",
  "The Peninsula Bangkok",
  "Four Seasons Hotel Bangkok at Chao Phraya River",
  "Amor Arenal Adults Friendly",
  "Pavillon Faubourg Saint-Germain & Spa",
  "Virgin Hotels Edinburgh",
  "Hotel de Nell",
  "Be Tulum",
  "Fort Printers",
  "Nantipa",
].map((name) => ({ name, photoTag: name, desc: MOST_BOOKED_PLACEHOLDER, affiliateLinks: DEFAULT_AFFILIATE_LINKS }));

const DESTINATION_REGIONS: DestinationRegion[] = [
  { label: "Asia", items: [{ label: "Thailand", children: [{ label: "Bangkok", href: "/book-direct/bangkok" }] }, { label: "Bali" }, { label: "India" }, { label: "Sri Lanka" }] },
  { label: "Caribbean & Central America", items: [{ label: "Jamaica" }, { label: "St. Lucia" }, { label: "Costa Rica" }] },
  { label: "Europe", items: [{ label: "France" }, { label: "Italy" }, { label: "UK" }] },
  { label: "Mexico", items: [{ label: "Zihuatanejo" }, { label: "Tulum" }] },
  { label: "Nordic Region", items: [{ label: "Iceland" }, { label: "Norway" }] },
  { label: "US + Canada", items: [{ label: "USA" }, { label: "Canada" }] },
];

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[12px] font-medium uppercase tracking-[0.14em] ${className}`}>{children}</p>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", to: "/" },
    { label: "Concierge", to: "/concierge" },
    { label: "Book Direct", to: "/book-direct" },
    { label: "Find Your Path", to: "/find-your-path" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background">
      <div className="page-container flex h-16 items-center justify-between md:h-[72px]">
        <Link to="/" className="flex min-h-11 items-center gap-2" aria-label="Swank Guide home">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
          <span className="text-[17px] font-medium text-ink">Swank Guide</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} activeOptions={{ exact: link.to === "/" }} className="text-[15px] leading-5 font-normal text-ink-muted transition-colors duration-[180ms] hover:text-ink" activeProps={{ className: "text-ink font-medium border-b-2 border-brand pb-0.5" }}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="flex h-11 w-11 items-center justify-center text-xl text-ink md:hidden">
          {open ? "x" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-hairline bg-background md:hidden">
          <div className="page-container flex flex-col py-2">
            {links.map((link) => (
              <Link key={link.to} to={link.to} activeOptions={{ exact: link.to === "/" }} onClick={() => setOpen(false)} className="py-3 text-[15px] leading-5 text-ink-muted" activeProps={{ className: "text-ink font-medium" }}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function SearchBar({ onSearch }: { onSearch: (form: SearchForm) => void }) {
  const [form, setForm] = useState<SearchForm>({ query: "", checkIn: "", checkOut: "", guests: "2" });
  const update = (field: keyof SearchForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(form);
  }

  return (
    <form onSubmit={submit} className="rounded-[8px] border border-hairline bg-background p-4 shadow-[var(--shadow-subtle)] md:p-5">
      <div className="search-bar md:items-end">
        <div>
          <label className="field-label" htmlFor="book-direct-query">City or Hotel</label>
          <input id="book-direct-query" value={form.query} onChange={(event) => update("query", event.target.value)} placeholder="Bangkok or hotel name" className="field-control" />
        </div>
        <div>
          <label className="field-label" htmlFor="book-direct-check-in">Check-in</label>
          <input id="book-direct-check-in" required type="date" value={form.checkIn} onChange={(event) => update("checkIn", event.target.value)} className="field-control" />
        </div>
        <div>
          <label className="field-label" htmlFor="book-direct-check-out">Check-out</label>
          <input id="book-direct-check-out" required type="date" value={form.checkOut} onChange={(event) => update("checkOut", event.target.value)} className="field-control" />
        </div>
        <div>
          <label className="field-label" htmlFor="book-direct-guests">Guests</label>
          <select id="book-direct-guests" value={form.guests} onChange={(event) => update("guests", event.target.value)} className="field-control">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
        <button type="submit" className="btn-base button-accent min-h-14 whitespace-nowrap">Book Now</button>
      </div>
      <p className="mt-3 text-[14px] leading-6 text-ink-muted">{"\n"}</p>
    </form>
  );
}

function normalizeApiResponse(data: unknown): Record<string, Availability> {
  const list = Array.isArray(data) ? data : Array.isArray((data as { hotels?: unknown[] })?.hotels) ? (data as { hotels: unknown[] }).hotels : [];
  return Object.fromEntries(
    list
      .map((item) => {
        const hotel = item as { id?: string; hotelId?: string; price?: string; fromPrice?: string; bookingUrl?: string };
        const id = hotel.hotelId ?? hotel.id ?? "";
        return [id, { status: "available", price: hotel.fromPrice ?? hotel.price, bookingUrl: hotel.bookingUrl }];
      })
      .filter(([id]) => Boolean(id)),
  );
}

async function fetchAvailability(hotels: Hotel[], form: SearchForm): Promise<Record<string, Availability>> {
  const response = await fetch(WEBBEDS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destinationOrHotel: form.query,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
      hotels: hotels.map((hotel) => ({ id: hotel.id, name: hotel.name, destination: hotel.destination })),
    }),
  });

  if (!response.ok) throw new Error("WebBeds availability request failed");
  const available = normalizeApiResponse(await response.json());
  return Object.fromEntries(hotels.map((hotel) => [hotel.id, available[hotel.id] ?? { status: "unavailable" }]));
}

function HotelResultCard({ hotel, availability }: { hotel: Hotel; availability: Availability | undefined }) {
  const [open, setOpen] = useState(false);
  const isLoading = availability?.status === "loading";
  const isBestValue = hotel.tier === "Best Value";

  return (
    <article className="flex flex-col overflow-hidden rounded-[8px] border border-hairline bg-background transition-shadow duration-[180ms] hover:shadow-[var(--shadow-subtle)]">
      <div className="hotel-card__media">
        <span className="px-4 text-center text-[12px] leading-[18px] text-ink-muted">[ {hotel.photoTag} ]</span>
        <span className={`badge-pill absolute bottom-3 left-3 ${hotel.badge === "stayed" ? "bg-brand text-ink" : "bg-ink text-white"}`}>{hotel.badge === "stayed" ? "Swank Tested" : "Trusted Pick"}</span>
      </div>
      <div className="hotel-card flex flex-1 flex-col">
        <h3 className="hotel-card__title">{hotel.name}</h3>
        <p className="hotel-card__description mb-6">{hotel.desc}</p>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center">
            <a href={availability?.bookingUrl ?? "#"} className="hotel-card__cta-primary flex-1">Book with Swank</a>
            <span className="hotel-card__value-tag">{availability?.price ?? (isBestValue ? "Best Value" : "Swank Value")}</span>
          </div>
          {isLoading && <div className="rounded-[8px] border border-hairline bg-soft p-4 text-[15px] leading-6 text-ink-muted">Checking Swank availability for your dates...</div>}
          <button onClick={() => setOpen((value) => !value)} className="text-link self-start text-[15px] leading-6">{isBestValue ? "Why best value?" : "Why this rate?"}</button>
          {open && <div className="rounded-[8px] border-l-[3px] border-brand bg-soft p-4 text-[15px] leading-6 italic text-ink-muted">Hotels treat our bookings differently: better rooms, real perks, our team in your corner. You'll receive our trip-prep kit plus our destination e-book.</div>}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {hotel.affiliateLinks.map((link) => <a key={link.label} href={link.href} className="hotel-card__cta-secondary" target="_blank" rel="noopener noreferrer">{link.label}</a>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function MostBookedHotelCard({ hotel }: { hotel: MostBookedHotel }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="flex flex-col overflow-hidden rounded-[8px] border border-hairline bg-background transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-[var(--shadow-subtle)]">
      <div className="hotel-card__media">
        <span className="max-w-[82%] px-4 text-center text-[12px] leading-[18px] text-ink-muted">[ {hotel.photoTag} ]</span>
        <span className="most-booked-tag">most booked</span>
      </div>
      <div className="hotel-card flex flex-1 flex-col">
        <h3 className="hotel-card__title">{hotel.name}</h3>
        <p className="hotel-card__description mb-6">{hotel.desc}</p>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center">
            <a href="#" className="hotel-card__cta-primary flex-1">Book with Swank</a>
            <span className="hotel-card__value-tag">Best Value</span>
          </div>
          <button onClick={() => setOpen((value) => !value)} className="text-link self-start text-[15px] leading-6">Why best value?</button>
          {open && <div className="rounded-[8px] border-l-[3px] border-brand bg-soft p-4 text-[15px] leading-6 italic text-ink-muted">Hotels treat our bookings differently: better rooms, real perks, our team in your corner. You'll receive our trip-prep kit plus our destination e-book.</div>}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {hotel.affiliateLinks.map((link) => <a key={link.label} href={link.href} className="hotel-card__cta-secondary" target="_blank" rel="noopener noreferrer">{link.label}</a>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function DestinationRegionCard({ region }: { region: DestinationRegion }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<DestinationItem | null>(null);
  const visibleItems = activeItem?.children ?? region.items;

  function toggleOpen() {
    setOpen((current) => !current);
    setActiveItem(null);
  }

  return (
    <article className="overflow-hidden rounded-[8px] border border-hairline bg-background transition-shadow duration-[180ms] hover:shadow-[var(--shadow-subtle)]">
      <button type="button" onClick={toggleOpen} className="flex min-h-20 w-full items-center justify-between px-5 py-4 text-left text-[20px] leading-7 text-ink md:px-6">
        <span>{region.label}</span>
        <span aria-hidden="true" className="text-[22px] leading-none text-ink-muted">{open ? "-" : "+"}</span>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="border-t border-hairline bg-soft p-4 md:p-5">
            {activeItem && (
              <button type="button" onClick={() => setActiveItem(null)} className="mb-3 text-[14px] leading-5 text-ink-muted underline underline-offset-4">
                Back to {region.label}
              </button>
            )}
            <div className="space-y-2">
              {visibleItems.map((item) => {
                if (item.href) {
                  return (
                    <Link key={item.label} to={item.href} className="flex min-h-12 items-center justify-between rounded-[8px] border border-line bg-background px-4 py-3 text-[16px] text-ink hover:bg-brand">
                      <span>{item.label}</span>
                      <span aria-hidden="true">›</span>
                    </Link>
                  );
                }

                if (item.children) {
                  return (
                    <button key={item.label} type="button" onClick={() => setActiveItem(item)} className="flex min-h-12 w-full items-center justify-between rounded-[8px] border border-line bg-background px-4 py-3 text-left text-[16px] text-ink hover:bg-brand">
                      <span>{item.label}</span>
                      <span aria-hidden="true">›</span>
                    </button>
                  );
                }

                return (
                  <div key={item.label} className="flex min-h-12 items-center justify-between rounded-[8px] border border-hairline bg-background px-4 py-3 text-[16px] text-ink-muted">
                    <span>{item.label}</span>
                    <span className="badge-pill bg-soft uppercase tracking-wide text-ink-muted">Coming soon</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function DestinationSection() {
  return (
    <section className="mt-12 border-b border-hairline pb-12" aria-labelledby="destination-nav-title">
      <div className="mb-6 max-w-[720px]">
        <Eyebrow className="mb-3 text-ink-muted">{"\n"}</Eyebrow>
        <h2 id="destination-nav-title" className="section-heading text-ink">Browse by Destination</h2>
      </div>
      <div className="destination-grid">
        {DESTINATION_REGIONS.map((region) => <DestinationRegionCard key={region.label} region={region} />)}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline bg-background py-10 md:py-16">
      <div className="page-container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">Services</p>
            <div className="space-y-3 text-[15px] leading-6 text-ink-muted">
              <p>See how we curate our picks</p>
              <p><Link to="/book-direct" className="text-link">Book a hotel stay</Link></p>
              <p>5990 more hotels with perks</p>
              <p>We VIP you with Fora</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-[4px] border border-line px-4 py-3 text-center text-[12px] font-medium uppercase leading-[18px] tracking-wide text-ink-muted">IATA<br />ACCREDITED</div>
            <div className="rounded-[4px] border border-line px-4 py-3 text-center text-[12px] font-medium uppercase leading-[18px] tracking-wide text-ink-muted">FORA<br />CERTIFIED</div>
          </div>
          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">Community</p>
            <div className="space-y-3 text-[15px] leading-6 text-ink-muted">
              <p><Link to="/concierge" className="text-link">Why we're different</Link></p>
              <p>Blog</p><p>FAQ</p><p>Newsletter</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[14px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026, Swank Guide</span>
          <div className="flex flex-wrap gap-6"><span>Contact</span><span>Terms of Use</span><span>Privacy</span></div>
        </div>
      </div>
    </footer>
  );
}

export default function BookDirectScreen() {
  const [search, setSearch] = useState<SearchForm | null>(null);
  const [availability, setAvailability] = useState<Record<string, Availability>>({});
  const [error, setError] = useState("");

  const searchResults = useMemo(() => {
    if (!search) return [];
    const query = search.query.trim().toLowerCase();
    return HOTELS.filter((hotel) => !query || [hotel.name, hotel.destination, hotel.tier].some((value) => value.toLowerCase().includes(query)));
  }, [search]);

  async function handleSearch(form: SearchForm) {
    setSearch(form);
    setError("");
    const query = form.query.trim().toLowerCase();
    const scopedHotels = HOTELS.filter((hotel) => !query || [hotel.name, hotel.destination, hotel.tier].some((value) => value.toLowerCase().includes(query)));
    setAvailability(Object.fromEntries(scopedHotels.map((hotel) => [hotel.id, { status: "loading" as const }])));

    try {
      setAvailability(await fetchAvailability(scopedHotels, form));
    } catch (err) {
      console.error("[Book Direct] availability failed", err);
      setError("We couldn't check Swank availability for those dates. You can still browse destinations or use affiliate links in destination pages.");
      setAvailability({});
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink antialiased">
      <Header />
      <main className="flex-1">
        <section className="book-direct-hero">
          <img src={bookDirectHero} alt="Historic Italian villa surrounded by gardens and Tuscan hills" width={1200} height={800} />
          <div className="book-direct-hero__overlay" />
          <div className="page-container book-direct-hero__content">
            <Eyebrow className="text-white/80">{"\n"}</Eyebrow>
            <h1 className="display-heading mt-3 max-w-[760px] text-white">Book Direct</h1>
          </div>
        </section>

        <section className="page-container -mt-10 relative z-10 pb-16 md:pb-24">
          <SearchBar onSearch={handleSearch} />
          {error && <p className="mt-5 rounded-[8px] border border-hairline bg-soft p-4 text-[15px] leading-6 text-ink-muted">{error}</p>}

          <DestinationSection />

          <section className="mt-12 border-b border-hairline pb-12" aria-labelledby="most-booked-title">
            <div className="mb-8 max-w-[720px]">
              <Eyebrow className="mb-3 text-ink-muted">{"\n"}</Eyebrow>
            <h2 id="most-booked-title" className="section-heading text-ink">Most booked hotels</h2>
          </div>
          <div className="hotel-card-grid grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3">
            {MOST_BOOKED_HOTELS.map((hotel) => <MostBookedHotelCard key={hotel.name} hotel={hotel} />)}
          </div>
          </section>

          {search && (
            <section className="mt-12 border-b border-hairline pb-12" aria-labelledby="search-results-title">
              <div className="mb-8 max-w-[720px]">
                <Eyebrow className="mb-3 text-ink-muted">Search results</Eyebrow>
                <h2 id="search-results-title" className="section-heading text-ink">Hotels matching your search</h2>
                <p className="mt-3 text-[16px] leading-7 text-ink-muted">The cards keep the Swank model. Book with Swank is the API route, and affiliate buttons stay as the parallel external route.</p>
              </div>
              {searchResults.length > 0 ? (
                <div className="hotel-card-grid grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3">
                  {searchResults.map((hotel) => <HotelResultCard key={hotel.id} hotel={hotel} availability={availability[hotel.id]} />)}
                </div>
              ) : (
                <div className="rounded-[8px] border border-hairline bg-soft p-6 md:p-8">
                  <p className="text-[16px] leading-7 text-ink-muted">We do not have a Swank search result for that yet. Try Bangkok, or browse by destination above.</p>
                </div>
              )}
            </section>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

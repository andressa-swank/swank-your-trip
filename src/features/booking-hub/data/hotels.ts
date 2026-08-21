import type { Hotel } from "../types";

export const HOTELS: Hotel[] = [
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

export const MOST_BOOKED_HOTELS = [
  "The Sarojin",
  "Pimalai Resort & Spa",
  "The Surin Phuket",
  "The Peninsula Bangkok",
  "Four Seasons Hotel Bangkok at Chao Phraya River",
  "Amor Arenal Adults Friendly",
  "Pavillon Faubourg Saint-Germain & Spa",
  "Virgin Hotels Edinburgh",
  "Hôtel de Nell",
  "Be Tulum",
  "Fort Printers",
  "Nantipa",
];

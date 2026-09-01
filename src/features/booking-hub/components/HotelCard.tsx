import { useState } from "react";
import type { Hotel } from "../types";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const [open, setOpen] = useState(false);
  const isBestValue = hotel.tier === "Best Value";
  return (
    <article className="hotel-card-shell">
      <div className="hotel-card__media" style={{ backgroundColor: hotel.photoBg }}>
        <span className="px-4 text-center text-[12px] leading-[18px] text-ink-muted">[ {hotel.photoTag} ]</span>
        <span className={`badge-pill absolute bottom-3 left-3 ${hotel.badge === "stayed" ? "bg-brand text-ink" : "bg-ink text-white"}`}>
          {hotel.badge === "stayed" ? "Swank Tested" : "Trusted Pick"}
        </span>
      </div>
      <div className="hotel-card">
        <h3 className="hotel-card__title">{hotel.name}</h3>
        <p className="hotel-card__description">{hotel.desc}</p>
        <div className="hotel-card__actions">
          <div className="hotel-card__primary-row">
            <button type="button" className="hotel-card__cta-primary">Book with Swank</button>
            <span className="hotel-card__value-tag">{isBestValue ? "Best Value" : "Swank Value"}</span>
          </div>
          <button type="button" onClick={() => setOpen((value) => !value)} className="hotel-card__why">
            {isBestValue ? "Why best value?" : "Why this rate?"}
          </button>
          {open && <div className="hotel-card__why-panel">Hotels treat our bookings differently: better rooms, real perks, our team in your corner. You'll receive our trip-prep kit plus our destination e-book.</div>}
          <div className="hotel-card__secondary-row">
            <button type="button" className="hotel-card__cta-secondary">Booking.com</button>
            <button type="button" className="hotel-card__cta-secondary">Expedia</button>
          </div>
        </div>
      </div>
    </article>
  );
}

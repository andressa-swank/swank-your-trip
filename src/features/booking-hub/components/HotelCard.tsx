import { useState } from "react";
import type { Hotel } from "../types";

export function HotelCard({ hotel }: { hotel: Hotel }) {
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
          {hotel.badge === "stayed" ? "Swank Tested" : "Trusted Pick"}
        </span>
      </div>
      <div className="hotel-card flex flex-1 flex-col">
        <h3 className="hotel-card__title">{hotel.name}</h3>
        <p className="hotel-card__description mb-6">{hotel.desc}</p>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center">
            <button className="hotel-card__cta-primary flex-1">Book with Swank</button>
            <span className="hotel-card__value-tag">{isBestValue ? "Best Value" : "Swank Value"}</span>
          </div>
          <button onClick={() => setOpen((o) => !o)} className="text-link self-start text-[15px] leading-6">
            {isBestValue ? "Why best value?" : "Why this rate?"}
          </button>
          {open && (
            <div className="rounded-[8px] border-l-[3px] border-brand bg-soft p-4 text-[15px] leading-6 italic text-ink-muted">
              Hotels treat our bookings differently: better rooms, real perks, our team in your corner.
              You'll receive our trip-prep kit plus our destination e-book.
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button className="hotel-card__cta-secondary">Booking.com</button>
            <button className="hotel-card__cta-secondary">Expedia</button>
          </div>
        </div>
      </div>
    </article>
  );
}

import { useState } from "react";
import { TESTIMONIALS } from "../data/testimonials";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index] ?? TESTIMONIALS[0]!;

  return (
    <section className="testimonials-section landing-section" aria-label="Guest testimonials">
      <div className="page-container">
        <div className="testimonial-tabs">
          {TESTIMONIALS.map((item, tabIndex) => (
            <button
              type="button"
              key={item.label}
              className={tabIndex === index ? "is-active" : ""}
              onClick={() => setIndex(tabIndex)}
              aria-pressed={tabIndex === index}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div key={index} className="testimonial-panel">
          {/* PHOTO SLOT per testimonial: see photoSlot in data/testimonials.ts */}
          <div className="testimonial-photo" data-photo-slot={testimonial.photoSlot} aria-hidden="true" />
          <div>
            <blockquote className="testimonial-quote">
              <p>"{testimonial.quote}"</p>
            </blockquote>
            <p className="testimonial-author">{testimonial.author}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

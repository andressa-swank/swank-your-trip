import { useEffect, useState } from "react";
import { TESTIMONIALS } from "../data/testimonials";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const changeTestimonial = (direction: number) => {
    setIndex((current) => (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => changeTestimonial(1), 6000);
    return () => window.clearInterval(timer);
  }, [index, paused]);

  const testimonial = TESTIMONIALS[index] ?? TESTIMONIALS[0]!;

  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="page-container">
        <h2 id="testimonials-title" className="testimonials-title">
          What they say
        </h2>

        <div className="testimonials-carousel">
          <button
            type="button"
            className="testimonial-arrow"
            onClick={() => changeTestimonial(-1)}
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="testimonial-stage">
            <span className="testimonial-mark" aria-hidden="true">
              “
            </span>
            <blockquote key={index} className="testimonial-copy">
              <p>“{testimonial.quote}”</p>
              <footer>{testimonial.author}</footer>
            </blockquote>
          </div>

          <button
            type="button"
            className="testimonial-arrow"
            onClick={() => changeTestimonial(1)}
            aria-label="Next testimonial"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="testimonial-dots" aria-label="Choose a testimonial">
          {TESTIMONIALS.map((item, dotIndex) => (
            <button
              type="button"
              key={item.author}
              className={dotIndex === index ? "is-active" : ""}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show testimonial ${dotIndex + 1}`}
              aria-current={dotIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import amanPoolPhoto from "@/assets/aman-pool.webp";

export function TestedStaysSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`tested-stays-section ${visible ? "is-visible" : ""}`}
      aria-labelledby="tested-stays-title"
    >
      <div className="tested-stays-heading">
        <h2 id="tested-stays-title">Every stay tested.</h2>
      </div>

      <div className="tested-stays-photo">
        <img
          src={amanPoolPhoto}
          alt="Infinity pools overlooking the sea at a cliffside resort"
          width={2048}
          height={1024}
          loading="lazy"
        />
        <div className="tested-stays-overlay" />
        <div className="tested-stays-metrics page-container">
          {[
            ["60+", "Countries visited"],
            ["400", "Hotels personally tested"],
            ["0", "Paid placements"],
          ].map(([number, label], metricIndex) => (
            <div
              key={label}
              className="tested-stays-metric"
              style={{ transitionDelay: `${metricIndex * 120}ms` }}
            >
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

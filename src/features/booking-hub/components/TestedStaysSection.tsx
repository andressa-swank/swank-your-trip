const METRICS = [
  { label: "Countries visited", value: "60+" },
  { label: "Hotels personally tested", value: "400+" },
  { label: "Travel stories filmed on YouTube", value: "550+" },
  { label: "Paid placements", value: "0" },
] as const;

export function TestedStaysSection({
  onBookWithSwank,
  onBookDirect,
}: {
  onBookWithSwank?: () => void;
  onBookDirect?: () => void;
}) {
  return (
    <section className="stats-split landing-section" aria-label="Swank in numbers">
      <div className="stats-split__panel">
        <div className="stats-split__metrics">
          {METRICS.map((metric) => (
            <div key={metric.label} className="stats-metric">
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
        <div className="stats-split__actions">
          <button type="button" className="stats-cta stats-cta--dark" onClick={onBookWithSwank}>
            Book with Swank
          </button>
          <button type="button" className="stats-cta stats-cta--light" onClick={onBookDirect}>
            Book direct
          </button>
        </div>
      </div>
      <div className="stats-split__photo">
        {/* PHOTO SLOT "stats-split-right": drop the real photo in here */}
        <div className="photo-slot" data-photo-slot="stats-split-right" aria-hidden="true" />
      </div>
    </section>
  );
}

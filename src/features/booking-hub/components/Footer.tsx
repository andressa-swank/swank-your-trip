import type { Screen } from "../types";

export function Footer({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <footer className="border-t border-hairline bg-background py-10 md:py-16">
      <div className="page-container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">Services</p>
            <div className="space-y-3 text-[15px] leading-6 text-ink-muted">
              <p>See how we curate our picks</p>
              <p>
                <button onClick={() => onNav("destination")} className="text-link">
                  Book a hotel stay
                </button>
              </p>
              <p>5990 more hotels with perks</p>
              <p>We VIP you with Fora</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-[4px] border border-line px-4 py-3 text-center text-[12px] font-medium uppercase leading-[18px] tracking-wide text-ink-muted">
              IATA
              <br />
              ACCREDITED
            </div>
            <div className="rounded-[4px] border border-line px-4 py-3 text-center text-[12px] font-medium uppercase leading-[18px] tracking-wide text-ink-muted">
              FORA
              <br />
              CERTIFIED
            </div>
          </div>

          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">Community</p>
            <div className="space-y-3 text-[15px] leading-6 text-ink-muted">
              <p>
                <button onClick={() => onNav("how")} className="text-link">
                  Why we're different
                </button>
              </p>
              <p>Blog</p>
              <p>FAQ</p>
              <p>Newsletter</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[14px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026, Swank Guide</span>
          <div className="flex flex-wrap gap-6">
            <span>Contact</span>
            <span>Terms of Use</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

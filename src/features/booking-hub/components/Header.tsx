import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Screen } from "../types";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Concierge", to: "/concierge" },
  { label: "Book Direct", to: "/book-direct" },
  { label: "Find Your Path", to: "/find-your-path" },
] as const;

export function Header(_props: { onNav?: (s: Screen) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background">
      <div className="page-container flex h-16 items-center justify-between md:h-[72px]">
        <Link to="/" className="flex min-h-11 items-center gap-2" aria-label="Swank Guide home">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
          <span className="text-[17px] font-medium text-ink">Swank Guide</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-[15px] leading-5 font-normal text-ink-muted transition-colors duration-[180ms] hover:text-ink"
              activeProps={{
                className: "text-ink font-medium border-b-2 border-brand pb-0.5",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center text-xl text-ink md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-hairline bg-background md:hidden">
          <div className="page-container flex flex-col py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] leading-5 text-ink-muted"
                activeProps={{ className: "text-ink font-medium" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

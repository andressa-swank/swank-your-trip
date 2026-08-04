# Fix build error, then verify the four Booking Hub sections

**Build is currently broken.** Three lines in `src/BookingHub.tsx` (331, 364, 389) contain escaped backticks (`` \` `` and `\${`) inside template literals, which breaks TypeScript parsing for the whole file. First step is to unescape them so the file compiles again.


All four requested changes already exist in `src/BookingHub.tsx` and `src/styles.css` from the previous pass:

- **Book Direct hero** — full-width villa photo (`src/assets/book-direct-hero.webp`), 500px desktop / 420px mobile, bottom-left eyebrow + title over a graded overlay, followed by the untouched search field and "Browse by region" grid.
- **Most booked with Swank** — 12 named cards after the region grid and before "Switch to Concierge", 3/2/1 columns, 24px column gap, 32px row gap, 4:3 neutral placeholders with a yellow "Most booked" badge, no prices or descriptions.
- **What they say** — auto-advancing carousel (6s), fade-and-rise transition, arrows, five dots, pause on hover/focus, reduced-motion off, stable stage height, large yellow quote mark, placed before "Every stay tested".
- **Every stay tested** — white heading band, full-width Aman pool photo, three overlaid metrics, scale-in image and staggered metric entrance, once only, immediately before the footer.

## What this pass does

1. Run the preview at 375px, 768px, 1024px and 1440px and screenshot the landing screen and the Book Direct screen.
2. Confirm in the live preview: testimonials advance on their own and arrows/dots restart the timer; the villa hero keeps the building visible on mobile; all 12 hotel names render; destination search and region browsing still navigate to Bangkok; the new sections sit above the footer.
3. Fix only defects found during that check — overflow, clipping, cropping, header overlap, spacing that misses the stated values. No copy, data, routing or logic changes.

## Technical notes

Work stays in `src/BookingHub.tsx` (section markup) and `src/styles.css` (the existing `.book-direct-hero`, `.testimonials-*`, `.tested-stays-*` blocks). Verification uses a headless browser against the running dev server; no new dependencies or assets.

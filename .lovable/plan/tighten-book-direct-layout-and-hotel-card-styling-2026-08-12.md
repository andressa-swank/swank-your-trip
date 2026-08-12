# Tighten Book Direct layout and hotel card styling

Apply the CSS edits provided by the user to the Book Direct page, keeping all existing copy, routes, and functionality intact.

## Scope

Only presentation changes in `src/styles.css` and `src/components/BookDirectHybrid.tsx`. No logic, data, or routing changes.

## Changes

### 1. Global layout tokens (`src/styles.css`)

- `.page-container`: change side padding from `20px` to `24px`; keep `max-width: 1695px` and centering.
- Add `section + section { margin-top: 48px; }` to replace the current looser section spacing.

### 2. Book Direct hero (`src/styles.css`)

- `.book-direct-hero`: reduce `min-height` from `500px` to `340px`.
- `.book-direct-hero__content`: reduce `padding-top` from `160px` to `64px` and `padding-bottom` from `56px` to `40px`.
- Keep mobile overrides at `420px` min-height and current mobile padding.

### 3. Search bar (`src/components/BookDirectHybrid.tsx`)

- Replace the fluid grid with a fixed 5-column layout: `grid-template-columns: 2fr 1fr 1fr 0.8fr auto`.
- Set `gap: 16px`.
- Cap width at `max-width: 1200px`.

### 4. Destination grid (`src/components/BookDirectHybrid.tsx`)

- Change the region grid from responsive `1 / 2 / 3` columns to a flat `repeat(3, 1fr)`.
- Set `gap: 20px`.

### 5. Hotel card grid and padding (`src/styles.css` + `src/components/BookDirectHybrid.tsx`)

- Add `.hotel-card-grid { margin: 0 -10px; }`.
- Add `.hotel-card { padding: 25px 10px; }`.
- Wrap the Most-booked and Search-results grids with `.hotel-card-grid`.

### 6. Hotel card badges and CTAs

- **Most Booked badge**: white background, `#231F20` text and 1px border, 4px radius, 12px uppercase, 500 weight, 28px height, `4px 10px` padding. Remove the yellow background.
- **Primary CTA**: keep `#F4E30C` background and `#231F20` text, but change radius to `4px`, height to `44px`, padding to `0 16px`, font `14px Suisse Medium`.
- **Best Value tag**: render as a separate discreet inline tag (`margin-left: 8px`, 11px, 500 weight, no background/border) instead of a badge inside the primary button.
- **Secondary CTAs** (Booking.com / Expedia): `36px` height, `13px` font, `4px` radius, transparent background, `1px solid #E5E5E5` border, `#333333` text.

### 7. Hotel card typography

- Card title: `26px / 39px`, `Suisse Medium`, `#333333`.
- Card description: `14px / 20px`, `Suisse Regular`, `#333333`.

## Verification

- Run the dev build to confirm no TypeScript or CSS errors.
- Check the Book Direct page at 375px, 768px, 1024px, and 1440px viewports for correct column counts, no overflow, and intact search/region/hotel-card behavior.

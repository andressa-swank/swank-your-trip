# Match Bangkok hotel cards to Book Direct card styling

Make the hotel cards on `/book-direct/bangkok` use the exact same layout, colors, borders, buttons, and typography as the cards on `/book-direct`, while keeping all existing Bangkok copy unchanged.

## Changes

### 1. Card body padding (`src/BookingHub.tsx` — `HotelCard`)
- Replace `flex flex-1 flex-col p-5 md:p-6` with `hotel-card flex flex-1 flex-col` (25px 10px padding, matching Book Direct).

### 2. Card typography
- Title: replace inline `text-[24px] leading-8 font-normal text-ink` with `hotel-card__title` (26px/39px Suisse Medium, #333333).
- Description: replace inline `text-[16px] leading-7 text-ink-muted` with `hotel-card__description mb-6` (14px/20px Suisse Regular, #333333).

### 3. Primary CTA and value tag
- Replace the `btn-base button-primary w-full justify-between` button that wraps "Book with Swank" and a badge.
- Use `hotel-card__cta-primary flex-1` for "Book with Swank".
- Render the "Best Value" / "Swank Value" label as a separate `hotel-card__value-tag` sibling (margin-left 8px, 11px, no background/border), exactly like Book Direct.

### 4. Secondary CTAs
- Replace `btn-base button-secondary w-full` for Booking.com / Expedia with `hotel-card__cta-secondary` (36px height, 13px font, transparent background, 1px #E5E5E5 border, 4px radius).

### 5. Toggle button
- Remove the `+` / `-` expand/collapse indicators from "Why best value?" / "Why this rate?" so only the text remains, matching Book Direct.

### 6. Badge icon
- Remove the leading `✦` symbol from "Swank Tested" and "Trusted Pick" badges so the badge text matches Book Direct exactly.

### 7. Grid wrapper
- Add the `hotel-card-grid` class to the existing Bangkok hotel grid (`grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3`) so the negative horizontal margins align with the Book Direct page.

## Verification

- Run the dev build to confirm no TypeScript or JSX errors.
- View `/book-direct/bangkok` and compare cards side-by-side with `/book-direct` to confirm matching padding, typography, primary/accent CTA styling, secondary CTA borders, and badge appearance.
- Check at 375px, 768px, and 1024px viewports to confirm responsive behavior matches Book Direct.
# Remove "+" from value toggles and trim Most-booked placeholder text

Two small copy edits in `src/components/BookDirectHybrid.tsx` only.

## Changes

1. **Remove the expand/collapse "+" symbol from all hotel cards**
   - In `HotelResultCard` (line ~209): change the toggle button label from `Why best value? {open ? "-" : "+"}` / `Why this rate? {open ? "-" : "+"}` to just the text without the trailing symbol.
   - In `MostBookedHotelCard` (line ~237): change `Why best value? {open ? "-" : "+"}` to just `Why best value?`.
   - Keep the toggle button functional; only remove the visual `+`/`-` indicator.

2. **Trim the Most-booked hotel placeholder description**
   - Update the `MOST_BOOKED_PLACEHOLDER` constant (line ~33) from:
     `"One sentence about the hotel Lorem ipsum dolor sit amet..."`
     to:
     `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."`
   - This removes the leading "One sentence about the hotel" text from all 12 Most-booked cards while keeping the Lorem ipsum body.

## Verification

- Run the dev build to confirm no TypeScript or JSX errors.
- Spot-check the Book Direct page to confirm:
  - The "Why best value?" buttons no longer show a `+`.
  - The Most-booked cards display only the Lorem ipsum paragraph.
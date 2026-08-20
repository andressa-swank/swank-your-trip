# Swank Guide Booking Flow

This project is the Swank Guide booking hub built with Lovable, React, TanStack Router, Vite, and Tailwind.

The app has two primary user paths:

1. Concierge: a guided trip-planning intake flow.
2. Book Direct: a hybrid hotel booking flow with curated editorial cards, affiliate links, and future live availability via API.

**Live app:** https://swank-your-trip.lovable.app

## Current Routes

| Route | Purpose |
| --- | --- |
| `/` | Booking Hub landing page. Lets the user choose Concierge, Book Direct, or Find Your Path. |
| `/concierge` | Starts the Concierge intake form. This is the main Concierge navigation target. |
| `/concierge/how` | Explains How Concierge Works. This is a separate informational page. |
| `/concierge/start` | Compatibility route for the Concierge intake form. |
| `/concierge/confirmation` | Confirmation screen after Concierge submission. |
| `/book-direct` | Book Direct entry page with search, destination browsing, and most booked hotel cards. |
| `/book-direct/bangkok` | Bangkok destination page with curated Swank hotel cards. |
| `/find-your-path` | Three-question quiz that routes users toward Concierge or Book Direct. |
| `/find-your-path/result` | Quiz result page. |

## Concierge Flow

The top navigation item `Concierge` should open `/concierge` and land at the beginning of the intake form.

`/concierge/how` is the separate education page for How Concierge Works. It is not a step inside the form. On desktop, the intake page exposes it as a discreet fixed tab on the left side of the screen. On mobile, the same access appears as a compact button below the form title area.

The Concierge intake collects trip basics across multiple steps and currently logs/submits through the placeholder intake flow. The API endpoint should be wired in `src/BookingHub.tsx` through `INTAKE_ENDPOINT` when the backend is ready.

## Book Direct Flow

Book Direct is hybrid:

1. Users can search by city or hotel with dates and guests.
2. Search with dates is the future API route for live availability.
3. Users can browse without dates through destination cards and curated editorial hotel cards.
4. Bangkok is the first real destination page. Other destinations can remain visible as coming soon.

The Book Direct page should not show all Bangkok hotel cards directly on the main Book Direct page. Bangkok hotel cards belong under `/book-direct/bangkok`.

## Hotel Card Rules

All editorial hotel cards should follow the same model:

- Swank photo or placeholder image area.
- Badge such as `Swank Tested`, `Trusted Pick`, or `Most Booked`.
- Hotel name.
- One-sentence Swank description.
- Primary CTA: `Book with Swank`.
- Value tag such as `Best Value` or `Swank Value`.
- Expandable explanation: `Why best value?` or `Why this rate?`.
- Affiliate buttons: `Booking.com` and `Expedia` when available.

The primary yellow should be reserved for the Swank CTA. Most Booked badges should be quieter and not use the main yellow CTA treatment.

## API And Affiliate Logic

Before the user enters dates, cards should render instantly from Swank editorial/catalog data. No WebBeds request is needed at page load.

After the user enters dates and searches, the API can check availability for matching hotels. The API result should add live price/availability and the `Book with Swank` route where available. It should not remove affiliate buttons.

Recommended behavior:

1. Affiliate buttons remain visible if available.
2. WebBeds availability loads per hotel or per visible hotel batch.
3. While loading, only the price/availability area changes.
4. If WebBeds returns a rate, show the Swank booking path.
5. If WebBeds does not return a rate, leave the card as an editorial/affiliate card.

Inside the WebBeds booking flow, affiliate links should not appear. Affiliate links are a parallel route from the card, not a step inside the Swank booking flow.

## Main Files

| File | Purpose |
| --- | --- |
| `src/BookingHub.tsx` | Shared booking hub screens, Concierge flow, and internal flow navigation. |
| `src/components/BookDirectHybrid.tsx` | Book Direct page, search UI, destination browsing, and hotel results/cards. |
| `src/routes/concierge.tsx` | `/concierge`, starts the intake form and exposes the How Concierge Works access. |
| `src/routes/concierge.how.tsx` | `/concierge/how`, explains How Concierge Works. |
| `src/routes/book-direct.tsx` | `/book-direct`, main Book Direct entry page. |
| `src/routes/book-direct.bangkok.tsx` | `/book-direct/bangkok`, Bangkok editorial hotel page. |
| `src/styles.css` | Global styling and shared component styles. |
| `src/concierge-flow.css` | Concierge-specific side/mobile access styling for How Concierge Works. |
| `src/book-direct-card.css` | Book Direct hotel card styling overrides. |

## Development

```sh
npm i
npm run dev
```

Build:

```sh
npm run build
```

Lint:

```sh
npm run lint
```

## Build With Lovable

Continue developing this project in the Lovable editor:

https://lovable.dev/projects/cad70e4e-f0d5-4e34-be53-5bbacc83a375

Lovable commits changes directly to this repository. Before merging older branches, compare them against `main`, because some old branches contain prototype code that is no longer aligned with the current app flow.

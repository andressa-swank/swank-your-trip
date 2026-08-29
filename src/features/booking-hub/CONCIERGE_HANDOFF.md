# Concierge handoff

The complete portable implementation package is now located at:

- [Concierge Handoff implementation package](./concierge-handoff/README.md)

It includes both a standalone React/TypeScript version and a WordPress-ready HTML/CSS/JavaScript version, with the full seven-step form, How Concierge Works, confirmation state, Book Direct switch, payload contract, endpoint configuration, and installation instructions.

---

# Concierge handoff

This folder contains the working Concierge flow used by the Swank Guide Booking Hub.

## Public routes

| URL | Route file | Screen |
| --- | --- | --- |
| `/concierge` | `src/routes/concierge.tsx` | Seven-step trip intake form |
| `/concierge/how` | `src/routes/concierge.how.tsx` | How Concierge Works |
| `/concierge/confirmation` | `src/routes/concierge.confirmation.tsx` | Submission confirmation |

TanStack Start generates `src/routeTree.gen.ts`. Do not edit that file manually.

## Concierge screens

All working Concierge UI is already separated from the other screens:

- `screens/ConciergeIntakeScreen.tsx` — the complete seven-step form, validation, draft persistence, payload construction, submission, and the sticky “Switch to Book Direct” control.
- `screens/ConciergeHowScreen.tsx` — the “How Concierge Works” page, process, benefits, support levels, and “Plan my trip” CTA.
- `screens/ConciergeConfirmationScreen.tsx` — the post-submission result, consultation CTA, and return-to-start action.
- `BookingHub.tsx` — the shared shell that connects these screens to navigation, header, footer, and route changes.

## Shared Concierge dependencies

The Concierge screens import these shared files:

- `components/Button.tsx`
- `components/FormProgress.tsx`
- `components/OptionRow.tsx`
- `components/PageIntro.tsx`
- `components/Header.tsx`
- `components/Footer.tsx`
- `lib/session.ts`
- `constants.ts`
- `types.ts`
- `src/styles.css`
- `src/concierge-flow.css`

When moving this flow into another website, copy the three Concierge screens plus the shared dependencies above, or replace those dependencies with equivalents from the destination site's design system.

## Form behavior

The form has seven steps:

1. Name, email, and phone
2. Destination
3. Travel timing
4. Party size
5. Desired experience
6. Approximate nightly hotel budget
7. Planning stage

Draft data and the active step are stored in `sessionStorage`. The keys and helpers live in `lib/session.ts`.

The submission logic lives in `ConciergeIntakeScreen.tsx`. It builds a normalized payload and posts JSON to `INTAKE_ENDPOINT`, defined in `constants.ts`.

Before production implementation, configure `INTAKE_ENDPOINT` to the site's real backend/API. If no endpoint is set, the current implementation logs the payload and continues to the confirmation screen for prototype purposes.

## Navigation behavior

- Submitting the form opens `/concierge/confirmation`.
- “How Concierge Works” opens `/concierge/how`.
- “Plan my trip” returns to `/concierge`.
- The sticky “Switch to Book Direct” control opens `/book-direct`.
- “Back to start” on confirmation returns to `/`.

## Developer implementation order

1. Bring over the shared styles and UI primitives.
2. Implement `/concierge/how`.
3. Implement the seven-step intake at `/concierge`.
4. Connect the real intake API endpoint.
5. Implement `/concierge/confirmation`.
6. Verify the Book Direct switch control and all mobile states.
7. Test refresh/back navigation and persisted drafts.

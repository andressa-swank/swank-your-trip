# Move "How Concierge Works" into the Concierge intake form header

## Goal
Relocate the "How Concierge Works" access point from a fixed floating element on `/concierge` into the normal document flow, directly below the "Tell us about your trip." title inside the Concierge intake form header.

## Current state
- `src/routes/concierge.tsx` wraps `BookingHub` in a `div.concierge-flow-shell` and renders a fixed-position `<Link to="/concierge-hall" className="concierge-how-access">` beside it.
- `src/concierge-flow.css` styles `.concierge-how-access` with `position: fixed`, side-tab borders, yellow hover background, and a separate mobile override.
- `src/BookingHub.tsx` renders the intake header with `<PageIntro eyebrow="Concierge" title="Tell us about your trip." />` and has no children passed to `PageIntro`.

## Changes

### 1. `src/BookingHub.tsx`
Replace the existing `PageIntro` self-closing tag inside `IntakeScreen` with:

```tsx
<PageIntro eyebrow="Concierge" title="Tell us about your trip.">
  <Link
    to="/concierge-hall"
    className="concierge-how-access"
    aria-label="Learn how Concierge works"
  >
    How Concierge Works
  </Link>
</PageIntro>
```

`Link` is already imported from `@tanstack/react-router`; no new import is needed.

### 2. `src/routes/concierge.tsx`
Remove the fixed wrapper link. Keep the session-reset logic and the child-route `<Outlet />` branch. The main `/concierge` return becomes only:

```tsx
return <BookingHub initialScreen="intake" />;
```

### 3. `src/concierge-flow.css`
Remove all fixed-position/side-tab/mobile-override styling for `.concierge-how-access`. Replace with inline underlined-link styles:

```css
.concierge-how-access {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 0;
  color: #6b6a69;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition:
    color 180ms ease,
    opacity 180ms ease;
}

.concierge-how-access:hover {
  color: #231f20;
  opacity: 1;
}
```

## Out of scope
No changes to Book Direct, Bangkok, Find Your Path, Home, Concierge confirmation, Concierge Hall content, form questions, copy, step logic, submission logic, global layout, header, or footer.

## Verification
After editing, verify these routes render correctly:
- `/concierge` — link appears below the title, form starts at step 1
- `/concierge/start`
- `/concierge-hall`
- `/concierge/confirmation`
- `/book-direct`
- `/book-direct/bangkok`

Confirm the final diff only touches `src/BookingHub.tsx`, `src/routes/concierge.tsx`, and `src/concierge-flow.css`.
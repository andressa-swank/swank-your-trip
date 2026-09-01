# Align the Concierge pages with the Booking Hub deck

## Scope
Only the three Concierge routes: `/concierge`, `/concierge/how`, `/concierge/confirmation`. Home, Book Direct, Bangkok and Find Your Path are untouched, even though the deck also shows them.

The deck (slides 9 and 10) covers the intake form and the confirmation page. It contains no "How Concierge Works" slides, so `/concierge/how` keeps the content already built from the previous deck — the only change there is a consistency pass so its typography matches the other two pages.

## 1. Concierge intake (`/concierge`)

Header, matched to slide 9:
- Title stays "Tell us about your trip".
- Keep the single intro line: "Our job? To make sure your trip feels exactly how you imagined — and to help you avoid those 'it looked better online' moments."
- Remove the second paragraph ("Share a few details below…") together with the inline "How Concierge Works" link, which the deck does not show.

Step 1 body, matched to slide 9:
- Section heading "First, the basics." unchanged.
- Three fields unchanged: first name or nickname, email address, phone number.
- Yellow pill "Next" button unchanged.

Everything else stays exactly as it is: 7 steps, all questions and options, progress bar, validation, session persistence, submit behaviour, "Back to previous question" from step 2 onward, and the sticky "Switch to Book Direct" footer.

## 2. Concierge confirmation (`/concierge/confirmation`)

Matched to slide 10 (deck copy only, extras removed):
- Title "Your request is in!" unchanged.
- Body trimmed to the deck sentence: "We'll be in touch if we need any additional information. Your personalized proposal will be ready within 1–3 business days." (drops ", depending on the complexity of your trip").
- Card keeps "Want to talk it through?" with the deck sentence: "Book an optional consultation with Don or one of our Travel Specialists."
- Yellow "Book a Consultation" button keeps its existing Calendly link.
- Remove the "Your consultation fee will be credited toward your planning fee." line and the "Back to start" link, neither of which appears in the deck.

## 3. Concierge how (`/concierge/how`)

Content unchanged. Single pass to make heading and body sizes consistent with the other two Concierge pages so the three read as one set.

## Technical notes
- Files touched: `src/features/booking-hub/screens/ConciergeIntakeScreen.tsx`, `src/features/booking-hub/screens/ConciergeConfirmationScreen.tsx`, and possibly `src/features/booking-hub/screens/ConciergeHowScreen.tsx`.
- Presentation-only edits. No changes to form state, step logic, validation, submission payload, routing, or the shared header/footer.
- The now-unused `Link` import in the intake screen is removed.

## Verification
Load `/concierge` (starts at step 1), walk to step 7, submit, and confirm `/concierge/confirmation` renders the trimmed copy. Check `/concierge/how` still renders end to end.

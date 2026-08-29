# Concierge Handoff — implementation package

This folder is the portable developer handoff for the Swank Guide Concierge flow. It contains the actual source code, not screenshots or a specification only.

## Choose the implementation

- **React site:** use `react/ConciergeFlow.tsx` and `react/concierge.css`.
- **WordPress/current Swank site:** use the three files in `wordpress/`.

## Included behavior

- How Concierge Works introduction
- Seven-step intake form
- Progress indicator
- Required email validation
- Back and next controls
- Session draft persistence
- JSON payload construction
- Configurable API endpoint
- Confirmation/result view
- Consultation link
- Switch to Book Direct control
- Responsive desktop/mobile styling

## WordPress installation

1. Load `wordpress/concierge.css` on the page.
2. Add the markup from `wordpress/concierge.html` where the flow should render.
3. Load `wordpress/concierge.js` after the markup, preferably with `defer`.
4. Set the real endpoint on the root element:

```html
<div id="swank-concierge" data-endpoint="https://YOUR-ENDPOINT"></div>
```

5. Replace the Book Direct and consultation URLs in the HTML data attributes if necessary.

The script posts JSON with `Content-Type: application/json`. The receiving API must allow requests from the Swank Guide website and return a successful HTTP status.

## React installation

Import the component and stylesheet:

```tsx
import { ConciergeFlow } from "./concierge-handoff/react/ConciergeFlow";
import "./concierge-handoff/react/concierge.css";

<ConciergeFlow
  endpoint="https://YOUR-ENDPOINT"
  bookDirectUrl="/book-direct"
  consultationUrl="https://calendly.com/book-swankguide"
/>
```

## Submission payload

```json
{
  "source": "Swank Website — Concierge",
  "lane": "Concierge",
  "firstName": "",
  "email": "",
  "phone": "",
  "destination": "",
  "travelWhen": "",
  "partySize": "",
  "experience": "",
  "budget": "",
  "planningStage": ""
}
```

## Production checklist

- Connect the real backend/Brevo endpoint.
- Add spam protection server-side.
- Confirm privacy/consent language with Swank.
- Test email delivery and CRM field mapping.
- Test mobile Safari and Chrome.
- Do not treat a front-end success screen as proof of CRM delivery; log and monitor API failures.

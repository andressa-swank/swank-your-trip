# Align the site with the audited Swank design spec

Bring the live tokens and components in line with the values captured from the reference site (colors, buttons, hotel cards, grid). Copy, routes, logic, and existing sections stay untouched — this is presentation only.

## Tokens

- Brand yellow: `#f0e40c` → `#F4E30C`
- Near-black (buttons, card text, tabs): add `#231F20` and use it for those surfaces
- Body / section-heading text: `#333333`
- Background stays `#FFFFFF`; hero H1 stays white over imagery
- Container max width goes from 1400px to the audited ~1695px effective content width (1710px viewport reference), padding unchanged

## Buttons

Primary becomes the pill component used across the reference site:
14px Suisse Medium, text `#231F20`, background `#F4E30C`, padding 12px 28px, radius 24px, no border, no shadow.
Accent and primary converge on this one style; secondary/ghost keeps a white background with 1px border and the same pill geometry so states stay coherent (the spec had no confirmed secondary, so this is the conservative match).

## Hotel cards

- Desktop grid becomes 5 columns, tablet 3, mobile 2 (currently 3/2/1)
- Card image: 3:2 aspect ratio, `object-fit: cover`, no border radius
- Card padding 25px 10px, ~20px net gutter
- Location tag 12px `#231F20`; hotel name 16px weight 500 `#231F20`; price line as plain body text below

## Not changed (needs confirmation before I touch it)

Header/nav layout, mega-menu, mobile nav, hotel detail tab active styling, gallery/amenities styling, and exact breakpoint pixel values — the audit marks these unverified, so I'll leave current behavior.

## Technical notes

All changes live in `src/styles.css` (token block, `.btn-base`/`.button-*`, `.hotel-card__media`, `.page-container`) and the grid class lists in `src/BookingHub.tsx`. No data, routing, or state changes. I'll verify at 375 / 768 / 1024 / 1440px for overflow and column counts.

# Elbrit — Predict the FIFA Champion (Football Draw)

A single-page, self-contained contest page. A doctor picks one team they think
will win the World Cup 2026, fills their details, and locks in the entry.

## Files
- `index.html` — the whole page. Self-contained: all CSS, JS, the Elbrit logo,
  and the Elbrit football are embedded, so it works offline and can be hosted
  anywhere. **Just open this file** (or serve the folder).
- `elbrit-logo.svg` — the Elbrit logo (also inlined into `index.html`).
- `elbrit-ball.png` — the Elbrit-branded football (transparent PNG) used in the
  background (also embedded into `index.html`).

## How to use
Open `index.html` in a browser, or host the folder on any static host / Netlify.

## Teams
Spain, France, England, Argentina (edit the `TEAMS` array near the bottom of
`index.html` to change them).

## Saving entries (submissions)
On "Lock in my pick" the page POSTs the entry to `/api/football`:

```
{ doctor_name, mobile, specialisation, city, clinic, team, team_code }
```

- If that endpoint exists (e.g. the Next.js `secondary-data-entry` app, which has
  an `/api/football` route writing to the ERPNext DocType `World Cup Prediction`),
  the entry is saved and the footer shows "Entry confirmed".
- If not, the page still shows the celebration and the footer reads
  "Entry recorded" — nothing is stored. Point the `fetch('/api/football', ...)`
  call in `index.html` at your real form/ERP endpoint to store entries.

## Notes
- The football and logo are Elbrit's own brand assets — no third-party marks.
- "FIFA" appears as text in the headline only; switch to "World Cup" if
  marketing/legal prefer.
- Animations respect the viewer's "reduced motion" setting.

# Elbrit — Predict the World Cup Champion

A Next.js + React Three Fiber (Three.js) single-page contest. A doctor picks the
team they think will win the World Cup 2026 (**Spain vs Argentina**), fills a
short 3-step wizard, and locks in the entry. Recreated from the Elbrit Lucky Draw
design — same 3D particle/pill backdrop, GSAP screen transitions, confetti, and
ERPNext / Raven submission — with the number keypad swapped for a team-card picker.

## Run it

```bash
npm install
npm run dev      # http://localhost:3007
```

Build for production: `npm run build && npm start`.

## Screens
1. **TeamPicker** — Elbrit 3D football hero + Spain / Argentina cards with flags. Lock → popup + confetti.
2. **WizardForm** — 3 steps: About you (name, specialisation) · How we reach you (email optional, phone) · Your practice (city, clinic).
3. **ThankYou** — chosen champion flag, summary card, confetti.

## Key files
- `components/Scene3D.tsx` — WebGL background (particles + floating pills/molecules, parallax).
- `components/TeamPicker.tsx` — the Spain vs Argentina chooser (replaces the old NumberPicker).
- `components/Flag.tsx` — inline Spain / Argentina flag SVGs.
- `components/WizardForm.tsx`, `Select.tsx`, `ThankYou.tsx` — form flow.
- `lib/types.ts` — `WorldCupEntry`, `TEAMS`, `SPECIALISATIONS`.
- `app/api/entry/route.ts` — validates + persists, then calls ERPNext + Raven.
- `lib/erpnext.ts`, `lib/raven.ts` — ERP / notification integration (**you're wiring this in VS Code**).

## Storing entries (ERP — left for you)
The form POSTs `{ name, email, phone, specialisation, city, clinic, team, teamCode }`
to `/api/entry`. That route pushes to the Forms Pro form via `lib/erpnext.ts`.
Update the field mappings there (`predicted_champion`, `team_code`) to match your
World Cup Forms Pro form, and set env vars per `.env.example`.

## The old standalone version
The earlier self-contained single-file version is archived in `_standalone-html/`.

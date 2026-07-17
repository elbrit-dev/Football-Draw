# ERP (Forms Pro) Setup — World Cup Prediction

This app already contains all the code needed to store entries in ERPNext.
**You do not need to write any code** — you only need to (1) create a Forms Pro
form in ERPNext and (2) put its Form id in an env var.

---

## 1. How the connection works (already built)

```
Browser (PredictionPicker + WizardForm)
      │  POST /api/entry   { name, email, phone, specialisation, city, clinic,
      │                      team, teamCode, goldenBoot, goldenBall, goldenGlove }
      ▼
Next.js route  app/api/entry/route.ts
      │  1. validates the payload (all 4 predictions must be valid options)
      │  2. saves a copy locally + logs it (LUCKY_DRAW_ENTRY in server logs)
      │  3. calls sendToErpnext()   ← lib/erpnext.ts
      │  4. calls sendRavenNotification() (optional) ← lib/raven.ts
      ▼
ERPNext Forms Pro — PUBLIC guest endpoint (no API key needed):
      POST {ERP_URL}/api/method/forms_pro.api.submission.submit_form_response
      body: { form_id, form_data: [ { fieldname, value }, ... ] }
      → the entry appears under the form's Responses.
```

Key point: the `fieldname`s the code sends must **exactly** match the field names
on your Forms Pro form. ERPNext silently ignores unknown fieldnames, so a typo
just means that column comes through blank — no error.

---

## 2. Fields to create on the Forms Pro form

Create the form with these **exact** field names (the `fieldname`, not just the label):

| Field label (yours)        | fieldname (must match)   | Type   | Required |
|----------------------------|--------------------------|--------|----------|
| Full name                  | `full_name`              | Data   | Yes      |
| Specialisation             | `specialisation`         | Data / Select | Yes |
| Mobile number              | `mobile_number`          | Phone  | Yes      |
| Email address              | `email_address`          | Data   | No       |
| City                       | `city`                   | Data   | Yes      |
| Clinic / hospital name     | `clinic_hospital_name`   | Data   | Yes      |
| Predicted champion         | `predicted_champion`     | Data   | Yes      |
| Team code                  | `team_code`              | Data   | No       |
| Golden Boot                | `golden_boot`            | Data   | Yes      |
| Golden Ball                | `golden_ball`            | Data   | Yes      |
| Golden Glove               | `golden_glove`           | Data   | Yes      |

Notes:
- `mobile_number` is a **Phone** field in Forms Pro and expects a country code —
  the app already formats it as `+91 …`, so leave it as Phone.
- If you name a field differently, either rename it to match the table above **or**
  change the matching `fieldname` in `lib/erpnext.ts` (lines ~42–56).

---

## 3. Create the form in ERPNext (step by step)

1. Log in to ERPNext (`https://erp.elbrit.org`).
2. Go to **Forms Pro** → **Form** → **New** (or open Forms Pro from the app list).
3. Give it a title, e.g. **"World Cup Prediction 2026"**.
4. Add each field from the table above. For every field, set the **Name /
   fieldname** to the exact value in the middle column.
5. Make sure the form is **published / public** (allow guest submissions) — the app
   submits as a guest, with no login.
6. **Save**, then open the form's page. Copy its **Form id** — it's the short code
   in the form's URL / route (the old lucky-draw form's id was `7upn0fs2f5`; yours
   will be different).

---

## 4. Wire the form id into the app

Create a file `.env.local` in this folder (copy from `.env.example`) and set:

```
ERP_URL=https://erp.elbrit.org
FORMS_PRO_FORM_ID=<your-new-form-id>
```

Then restart `npm run dev`. For production, set the same two vars in
**Netlify → Site settings → Environment variables**.

> Until `FORMS_PRO_FORM_ID` is set, the app **skips** the ERP push on purpose
> (the entry is still saved locally and logged), so you never post to the wrong
> form by accident.

---

## 5. (Optional) Raven channel notification

To ping a Raven channel on every entry, set in `.env.local` / Netlify:

```
RAVEN_API_KEY=<key of a user/bot that is a MEMBER of the channel>
RAVEN_API_SECRET=<secret>
RAVEN_CHANNEL_ID=Elbrit Life Sciences-pmt
```

Leave them blank to disable. Raven's send API needs auth (unlike Forms Pro).

---

## 6. Test it

1. Set `FORMS_PRO_FORM_ID`, restart the dev server.
2. Complete an entry in the app (pick 4 + fill the form + submit).
3. In ERPNext, open your form → **Responses** — the entry should be there with all
   4 predictions.
4. If it's missing: check the dev server console for `ERP_SUBMIT_FAILED …`, and
   confirm the fieldnames match exactly.

---

## Prompt for VS Code Claude (only if you want to change field mappings)

You don't need this to store entries — the code is done. Use it only if your ERP
admin named the form fields differently and you want Claude to re-map them:

> In this Next.js project, entries are pushed to an ERPNext Forms Pro form in
> `lib/erpnext.ts` via `POST {ERP_URL}/api/method/forms_pro.api.submission.submit_form_response`
> with `{ form_id, form_data: [{ fieldname, value }] }`. My Forms Pro form uses
> these field names: <paste your actual fieldnames>. Update the `form_data` array
> in `lib/erpnext.ts` so each `fieldname` matches my form exactly, keeping the
> same values from the `entry` object (name, specialisation, phone, city, clinic,
> email, team, teamCode, goldenBoot, goldenBall, goldenGlove). Don't change
> anything else.

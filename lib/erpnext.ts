import { StoredEntry } from "./types";

/**
 * Pushes a World Cup prediction entry into ERPNext via the Forms Pro public
 * submission API. This is a GUEST method, so no API key/secret is required; the
 * record shows up under the form's responses like a normal public submission.
 *
 *   POST {ERP_URL}/api/method/forms_pro.api.submission.submit_form_response
 *   body: { form_id, form_data: [{ fieldname, value }, ...] }
 *
 * The `fieldname`s below must EXACTLY match the field names on your Forms Pro
 * form (see ERP_SETUP.md). ERPNext ignores any fieldname it doesn't recognise,
 * so a mismatch fails silently — double-check them.
 *
 * Env:
 *   ERP_URL             base URL (default https://erp.elbrit.org)
 *   FORMS_PRO_FORM_ID   Form id to submit to — REQUIRED. Until it is set, ERP
 *                       submission is skipped (the entry is still saved + logged),
 *                       so we never post to the wrong form by accident.
 */

const SUBMIT_METHOD = "forms_pro.api.submission.submit_form_response";

/**
 * Forms Pro's mobile_number is a Frappe "Phone" field and requires a country
 * code. Normalise the user's input to an E.164-ish "+91 …" form (India) when
 * no explicit "+<code>" prefix is present.
 */
function formatPhone(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91 ${digits.slice(1)}`;
  return `+91 ${digits}`;
}

export async function sendToErpnext(
  entry: StoredEntry
): Promise<{ ok: boolean; skipped?: boolean; detail?: string }> {
  const base = (process.env.ERP_URL || "https://erp.elbrit.org").replace(/\/+$/, "");
  // "FIFA Football Winners" Forms Pro form (route forms_pro_AgcOAlc6, docname
  // 470breaqi8). Env var can override, but we default to the live form so the
  // deployed app submits without extra configuration.
  const formId = process.env.FORMS_PRO_FORM_ID || "470breaqi8";

  // list of { fieldname, value } — fieldnames match the Forms Pro form fields.
  const form_data: { fieldname: string; value: string | number }[] = [
    { fieldname: "full_name", value: entry.name },
    { fieldname: "specialisation", value: entry.specialisation },
    { fieldname: "mobile_number", value: formatPhone(entry.phone) },
    { fieldname: "city", value: entry.city },
    { fieldname: "clinic_hospital_name", value: entry.clinic },
    // World Cup predictions — adjust these fieldnames to match your Forms Pro form.
    { fieldname: "predicted_champion", value: entry.team },
    { fieldname: "team_code", value: entry.teamCode },
    { fieldname: "golden_boot", value: entry.goldenBoot },
    { fieldname: "golden_ball", value: entry.goldenBall },
    { fieldname: "golden_glove", value: entry.goldenGlove },
  ];
  // email is optional on the form — only send it when provided
  if (entry.email && entry.email.trim()) {
    form_data.push({ fieldname: "email_address", value: entry.email.trim() });
  }

  try {
    const res = await fetch(`${base}/api/method/${SUBMIT_METHOD}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // submission_status: "Submitted" marks the response as final (not a draft)
      // — this is exactly what the Forms Pro web form itself sends.
      body: JSON.stringify({ form_id: formId, form_data, submission_status: "Submitted" }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, detail: `HTTP ${res.status}: ${text.slice(0, 400)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "fetch failed" };
  }
}

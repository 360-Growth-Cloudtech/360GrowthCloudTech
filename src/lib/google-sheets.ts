import { leadToSheetRow, type LeadPayload } from "@/lib/schemas/lead";

async function appendViaAppsScript(lead: LeadPayload): Promise<void> {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!url) throw new Error("GOOGLE_APPS_SCRIPT_URL is not set");
  if (!secret) throw new Error("GOOGLE_APPS_SCRIPT_SECRET is not set");

  const [timestamp, formType, name, email, phone, company, service, date, time, message] =
    leadToSheetRow(lead);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      timestamp,
      formType,
      name,
      email,
      phone,
      company,
      service,
      date,
      time,
      message,
    }),
    redirect: "follow",
  });

  const text = await res.text();

  if (
    text.trimStart().startsWith("<!DOCTYPE") ||
    text.includes("accounts.google.com") ||
    text.includes("Page not found")
  ) {
    throw new Error(
      "Google Apps Script web app is not public. In Deploy → Manage deployments, set Who has access to Anyone, create a New version, then copy the Web app URL into GOOGLE_APPS_SCRIPT_URL.",
    );
  }

  let data: { success?: boolean; error?: string };
  try {
    data = JSON.parse(text) as { success?: boolean; error?: string };
  } catch {
    throw new Error(
      `Invalid response from Google Apps Script: ${text.slice(0, 120)}`,
    );
  }

  if (!data.success) {
    throw new Error(data.error ?? "Google Apps Script rejected the submission");
  }
}

async function appendViaServiceAccount(lead: LeadPayload): Promise<void> {
  const { google } = await import("googleapis");

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const keyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEETS_ID;

  if (!email || !keyRaw || !sheetId) {
    throw new Error("Google service account credentials are not fully configured");
  }

  const auth = new google.auth.JWT({
    email,
    key: keyRaw.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const row = leadToSheetRow(lead);

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "A:J",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

export async function appendLeadRow(lead: LeadPayload): Promise<void> {
  if (process.env.GOOGLE_APPS_SCRIPT_URL) {
    return appendViaAppsScript(lead);
  }
  return appendViaServiceAccount(lead);
}

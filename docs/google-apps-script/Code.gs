/**
 * 360GrowthCloudTech — Lead form webhook
 *
 * SETUP:
 * 1. Open your Google Sheet (360GrowthCloudTech Leads)
 * 2. Extensions → Apps Script → paste this entire file
 * 3. Run setupHeaders() once from the editor (authorize when prompted)
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL → GOOGLE_APPS_SCRIPT_URL in .env.local
 * 6. Set the same secret below and in GOOGLE_APPS_SCRIPT_SECRET in .env.local
 */

/** Must match GOOGLE_APPS_SCRIPT_SECRET in your Next.js .env.local */
const WEBHOOK_SECRET = "change-me-to-a-long-random-string";

/** Sheet tab name — must match your spreadsheet tab exactly */
const SHEET_NAME = "Lead";

/**
 * One-time setup: creates the header row if the sheet is empty.
 * Run manually from the Apps Script editor (▶ Run).
 */
function setupHeaders() {
  const sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Form Type",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Service",
      "Preferred Date",
      "Preferred Time",
      "Message",
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold");
  }
}

/**
 * Web app entry point — called by POST /api/leads from your website.
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (!payload.secret || payload.secret !== WEBHOOK_SECRET) {
      return jsonResponse_({ success: false, error: "Unauthorized" }, 401);
    }

    const row = [
      payload.timestamp || new Date().toISOString(),
      payload.formType || "",
      payload.name || "",
      payload.email || "",
      payload.phone || "",
      payload.company || "",
      payload.service || "",
      payload.date || "",
      payload.time || "",
      payload.message || "",
    ];

    const sheet = getSheet_();
    if (sheet.getLastRow() === 0) {
      setupHeaders();
    }
    sheet.appendRow(row);

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err.message || err) }, 500);
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet tab "' + SHEET_NAME + '" not found. Rename your tab or update SHEET_NAME.');
  }
  return sheet;
}

function jsonResponse_(body, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
  // Apps Script doesn't support HTTP status codes on web apps; include in body if needed
  if (statusCode && statusCode >= 400) {
    Logger.log("Error response: " + JSON.stringify(body));
  }
  return output;
}

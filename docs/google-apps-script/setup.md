# Google Apps Script setup (recommended — no service account)

Use this if you opened **Extensions → Apps Script** from your Google Sheet.

## Step 1 — Paste the code

1. Open your **360GrowthCloudTech Leads** Google Sheet
2. **Extensions → Apps Script**
3. Delete the default `myFunction` code
4. Copy everything from [`Code.gs`](./Code.gs) and paste into `Code.gs`
5. Change `WEBHOOK_SECRET` to a long random string (e.g. `gct-leads-8f3k2m9x7p1q`)
6. Change `SHEET_NAME` if your tab is not named `Sheet1`

## Step 2 — Create headers

1. In Apps Script, select **setupHeaders** from the function dropdown
2. Click **Run** → authorize when Google asks
3. Your sheet should now have the column headers in row 1

## Step 3 — Deploy as web app (critical)

1. Click **Deploy → New deployment** (or **Manage deployments → Edit → New version**)
2. Type: **Web app**
3. **Execute as:** Me
4. **Who has access:** **Anyone** ← required; if this is "Only myself", your website cannot send data
5. Click **Deploy** and copy the **Web app URL** (ends with `/exec`)

If you created a new Apps Script project (e.g. "Lead 360cloudtech"), you must use **that project's** Web app URL — old URLs from other projects will not work.

## Step 4 — Add to `.env.local`

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/...../exec
GOOGLE_APPS_SCRIPT_SECRET=gct-leads-8f3k2m9x7p1q
```

Use the **same secret** as `WEBHOOK_SECRET` in `Code.gs`.

You do **not** need `GOOGLE_SHEETS_ID` or service account keys when using Apps Script.

## Step 5 — Test

Restart `pnpm dev`, submit the contact form, and confirm a new row appears in your sheet.

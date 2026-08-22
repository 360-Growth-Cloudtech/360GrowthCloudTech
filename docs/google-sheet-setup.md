# Google Sheet setup for lead forms

Create a spreadsheet named **360GrowthCloudTech Leads** with this header row in row 1:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Form Type | Name | Email | Phone | Company | Service | Preferred Date | Preferred Time | Message |

## Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project (or use an existing one)
3. Enable **Google Sheets API**
4. **IAM & Admin → Service Accounts → Create service account**
5. Create a JSON key and download it
6. Copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
7. Copy `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (escape newlines as `\n` in `.env.local`)
8. Copy the Sheet ID from the URL → `GOOGLE_SHEETS_ID`

## Share the sheet

Open the Google Sheet → **Share** → add the service account email (e.g. `...@....iam.gserviceaccount.com`) as **Editor**.

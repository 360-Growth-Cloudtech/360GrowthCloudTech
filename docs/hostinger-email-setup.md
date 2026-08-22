# Hostinger email setup for auto-replies

Use the mailbox **contact@360cloudtech.com** in Hostinger hPanel.

## SMTP settings (defaults)

| Setting | Value |
|---------|--------|
| Host | `smtp.hostinger.com` |
| Port | `465` (SSL) or `587` (TLS) |
| Username | `contact@360cloudtech.com` |
| Password | Your mailbox password from hPanel |

## Environment variables

Copy these into `.env.local`:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@360cloudtech.com
SMTP_PASS=your-mailbox-password
CONTACT_FROM_EMAIL=contact@360cloudtech.com
CONTACT_FROM_NAME=360GrowthCloudTech
```

If port 465 fails, try `SMTP_PORT=587` and `SMTP_SECURE=false`.

## Test before go-live

Send a test message from Hostinger webmail to confirm the mailbox works, then submit a form on the site and check the customer inbox (and spam folder).

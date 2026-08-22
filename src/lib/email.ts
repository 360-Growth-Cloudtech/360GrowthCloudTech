import nodemailer from "nodemailer";
import type { LeadPayload } from "@/lib/schemas/lead";

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || "there";
}

function buildAutoReplyHtml(name: string): string {
  const greeting = firstName(name);
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ebe0;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe0;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(26,21,18,0.08);">
        <tr><td style="background:#e8521a;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:32px 28px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#e8521a;">360GrowthCloudTech</p>
          <h1 style="margin:0 0 20px;font-size:22px;font-weight:800;color:#1a1512;line-height:1.3;">Thank you for reaching out</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#4a4038;">Hi ${greeting},</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#4a4038;">
            Thank you for contacting <strong style="color:#1a1512;">360GrowthCloudTech</strong>.
            We have received your message and a member of our team will get back to you shortly —
            typically within <strong style="color:#1a1512;">2 business hours</strong> during weekdays.
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#4a4038;">
            If your request is urgent, feel free to reply directly to this email.
          </p>
          <p style="margin:0;font-size:15px;line-height:1.65;color:#4a4038;">
            Best regards,<br>
            <strong style="color:#1a1512;">360GrowthCloudTech Team</strong><br>
            <a href="mailto:contact@360cloudtech.com" style="color:#e8521a;text-decoration:none;">contact@360cloudtech.com</a>
          </p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#8a7f75;">© ${new Date().getFullYear()} 360GrowthCloudTech. All rights reserved.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildAutoReplyText(name: string): string {
  const greeting = firstName(name);
  return `Hi ${greeting},

Thank you for contacting 360GrowthCloudTech. We have received your message and a member of our team will get back to you shortly — typically within 2 business hours during weekdays.

If your request is urgent, feel free to reply directly to this email.

Best regards,
360GrowthCloudTech Team
contact@360cloudtech.com`;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_USER, and SMTP_PASS must be set");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export async function sendLeadAutoReply(lead: LeadPayload): Promise<void> {
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "contact@360cloudtech.com";
  const fromName = process.env.CONTACT_FROM_NAME ?? "360GrowthCloudTech";

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: lead.email,
    replyTo: fromEmail,
    subject: "Thank you for contacting 360GrowthCloudTech",
    text: buildAutoReplyText(lead.name),
    html: buildAutoReplyHtml(lead.name),
  });
}

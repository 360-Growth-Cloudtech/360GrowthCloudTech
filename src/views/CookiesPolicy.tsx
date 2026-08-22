import Link from "next/link";
import { LegalDocument, LegalSection, COMPANY, EMAIL, PHONE, CONTACT_PHONE_TEL, WEBSITE } from "@/components/LegalDocument";

const LAST_UPDATED = "2026-08-22";

export default function CookiesPolicy() {
  return (
    <LegalDocument
      title="Cookies Policy"
      subtitle={`How ${COMPANY} uses cookies and similar technologies on ${WEBSITE}.`}
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. What Are Cookies?">
        <p>
          Cookies are small text files placed on your device when you visit a website. They help
          websites function properly, remember preferences, and understand how visitors use the site.
          Similar technologies include local storage, session storage, and pixels.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Cookies">
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Enable core website functionality and security</li>
          <li>Remember preferences and improve user experience</li>
          <li>Understand traffic patterns and measure website performance</li>
          <li>Support forms and communication features</li>
        </ul>
        <p>
          For more information about how we handle personal data, see our{" "}
          <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Types of Cookies We Use">
        <p>
          <strong>Strictly necessary cookies</strong>
        </p>
        <p>
          Required for the website to operate. These may include cookies that support security,
          load balancing, or basic session management. Because the site needs them to function,
          they cannot be disabled through our site controls.
        </p>
        <p>
          <strong>Functional cookies</strong>
        </p>
        <p>
          Allow the website to remember choices you make (such as region or display preferences) and
          provide enhanced features.
        </p>
        <p>
          <strong>Analytics cookies</strong>
        </p>
        <p>
          Help us understand how visitors interact with our website—such as which pages are visited
          and how long users stay—so we can improve content and performance. These cookies collect
          aggregated or pseudonymous information where possible.
        </p>
        <p>
          <strong>Marketing cookies (if used)</strong>
        </p>
        <p>
          May be used to measure the effectiveness of campaigns or deliver relevant content on other
          platforms. We use these only where permitted and, where required, with your consent.
        </p>
      </LegalSection>

      <LegalSection title="4. Third-Party Cookies">
        <p>
          Some cookies are placed by third-party services that appear on our pages, such as analytics
          providers, embedded content, or communication tools. These third parties may collect
          information about your online activity over time and across websites, subject to their own
          privacy policies.
        </p>
        <p>
          We encourage you to review the privacy and cookie policies of any third-party services we
          use.
        </p>
      </LegalSection>

      <LegalSection title="5. Managing Cookies">
        <p>You can control cookies in several ways:</p>
        <ul>
          <li>
            <strong>Browser settings</strong> — Most browsers let you block or delete cookies. See
            your browser&apos;s help section for instructions.
          </li>
          <li>
            <strong>Device settings</strong> — Mobile devices may offer additional privacy controls.
          </li>
          <li>
            <strong>Opt-out tools</strong> — Some analytics providers offer industry opt-out
            mechanisms for interest-based advertising.
          </li>
        </ul>
        <p>
          If you disable cookies, some parts of our website may not function correctly.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookie Retention">
        <p>
          Session cookies expire when you close your browser. Persistent cookies remain on your device
          for a set period or until you delete them. Retention periods vary depending on the purpose
          of each cookie.
        </p>
      </LegalSection>

      <LegalSection title="7. Updates to This Policy">
        <p>
          We may update this Cookies Policy to reflect changes in technology, regulation, or our
          practices. The updated version will be posted on this page with a revised &quot;Last
          updated&quot; date.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>
          If you have questions about our use of cookies, contact us at{" "}
          <a href={`mailto:${EMAIL}`} className="text-primary font-semibold hover:underline">
            {EMAIL}
          </a>{" "}
          or{" "}
          <a href={CONTACT_PHONE_TEL} className="text-primary font-semibold hover:underline">
            {PHONE}
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}

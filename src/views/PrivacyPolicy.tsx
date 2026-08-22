import { LegalDocument, LegalSection, COMPANY, EMAIL, WEBSITE } from "@/components/LegalDocument";

const LAST_UPDATED = "2026-08-22";

export default function PrivacyPolicy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle={`How ${COMPANY} collects, uses, and protects your personal information.`}
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Introduction">
        <p>
          {COMPANY} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates{" "}
          <strong>{WEBSITE}</strong> and provides software engineering, cloud, CRM, and digital
          marketing services. This Privacy Policy explains how we collect, use, disclose,
          and safeguard information when you visit our website, submit a contact or meeting request,
          or otherwise interact with us.
        </p>
        <p>
          By using our website or submitting your information, you agree to the practices described
          in this policy. If you do not agree, please do not use our services or website.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Contact and identity information</strong> — name, email address, phone number,
            company name, and any message you provide through our forms.
          </li>
          <li>
            <strong>Meeting preferences</strong> — preferred date, time, and service interests
            when you schedule a consultation.
          </li>
          <li>
            <strong>Technical and usage data</strong> — IP address, browser type, device
            information, pages viewed, and approximate location derived from your IP address.
          </li>
          <li>
            <strong>Communications</strong> — records of correspondence if you email us or we
            respond to your inquiry.
          </li>
        </ul>
        <p>
          We do not intentionally collect sensitive personal data (such as health, biometric, or
          financial account information) through our public website forms.
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>We use collected information to:</p>
        <ul>
          <li>Respond to inquiries and provide requested information about our services</li>
          <li>Schedule and manage consultations or project discussions</li>
          <li>Send service-related communications, including confirmation emails</li>
          <li>Improve our website, services, and client experience</li>
          <li>Comply with legal obligations and protect our legal rights</li>
          <li>Detect, prevent, and address fraud, abuse, or security issues</li>
        </ul>
        <p>
          We do not sell your personal information to third parties for their marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="4. Legal Bases for Processing">
        <p>Where applicable under data protection laws (including GDPR), we process personal data based on:</p>
        <ul>
          <li>
            <strong>Consent</strong> — when you submit a form or request that we contact you
          </li>
          <li>
            <strong>Legitimate interests</strong> — to operate and improve our business, website,
            and client relationships, where those interests are not overridden by your rights
          </li>
          <li>
            <strong>Contractual necessity</strong> — when processing is required to take steps
            before entering into a service agreement with you
          </li>
          <li>
            <strong>Legal obligation</strong> — when we must comply with applicable law
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. How We Share Information">
        <p>We may share information with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> — such as email hosting, cloud infrastructure,
            analytics, and form processing tools that help us operate our website and communicate
            with you
          </li>
          <li>
            <strong>Professional advisors</strong> — lawyers, accountants, or insurers when
            reasonably necessary
          </li>
          <li>
            <strong>Legal and safety purposes</strong> — when required by law, court order, or to
            protect the rights, property, or safety of {COMPANY}, our clients, or others
          </li>
          <li>
            <strong>Business transfers</strong> — in connection with a merger, acquisition, or
            sale of assets, subject to appropriate confidentiality protections
          </li>
        </ul>
        <p>We require service providers to handle personal data only for authorized purposes.</p>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <p>
          We retain personal information for as long as necessary to fulfill the purposes described
          in this policy, including responding to inquiries, maintaining business records, and
          meeting legal or regulatory requirements. When data is no longer needed, we delete or
          anonymize it using reasonable measures.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We implement administrative, technical, and organizational measures designed to protect
          personal information against unauthorized access, loss, misuse, or alteration. However,
          no method of transmission over the internet or electronic storage is completely secure,
          and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="8. Your Rights">
        <p>
          Depending on your location, you may have rights to access, correct, delete, restrict, or
          object to certain processing of your personal information, and to withdraw consent where
          processing is consent-based. You may also have the right to data portability and to lodge
          a complaint with a supervisory authority.
        </p>
        <p>
          To exercise these rights, contact us at{" "}
          <a href={`mailto:${EMAIL}`} className="text-primary font-semibold hover:underline">
            {EMAIL}
          </a>
          . We may need to verify your identity before responding.
        </p>
      </LegalSection>

      <LegalSection title="9. International Transfers">
        <p>
          If you access our website from outside the country where we operate, your information may
          be transferred to and processed in jurisdictions that may have different data protection
          laws. Where required, we implement appropriate safeguards for such transfers.
        </p>
      </LegalSection>

      <LegalSection title="10. Third-Party Links">
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices or content of those sites. We encourage you to review their privacy
          policies before providing personal information.
        </p>
      </LegalSection>

      <LegalSection title="11. Children&apos;s Privacy">
        <p>
          Our website and services are not directed to individuals under 16 years of age. We do not
          knowingly collect personal information from children. If you believe we have collected
          information from a child, please contact us so we can delete it.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
          the top of this page indicates when revisions were made. Material changes will be posted
          on this page. Continued use of our website after changes constitutes acceptance of the
          updated policy.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}

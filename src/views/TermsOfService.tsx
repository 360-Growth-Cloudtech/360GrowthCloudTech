import { LegalDocument, LegalSection, COMPANY, EMAIL, WEBSITE } from "@/components/LegalDocument";

const LAST_UPDATED = "2026-08-22";

export default function TermsOfService() {
  return (
    <LegalDocument
      title="Terms of Service"
      subtitle={`Terms governing your use of ${COMPANY}'s website and services.`}
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Agreement to Terms">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website
          located at <strong>{WEBSITE}</strong> and related online services operated by {COMPANY}
          (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing
          or using our website, you agree to be bound by these Terms.
        </p>
        <p>
          If you are using our website on behalf of an organization, you represent that you have
          authority to bind that organization to these Terms.
        </p>
      </LegalSection>

      <LegalSection title="2. Our Services">
        <p>
          {COMPANY} provides technology and digital services including, but not limited to, custom
          software development, cloud infrastructure, CRM solutions, digital
          marketing, and related consulting. Specific deliverables, timelines, fees, and obligations
          for paid engagements are defined in separate written agreements, statements of work, or
          proposals—not solely by information on this website.
        </p>
      </LegalSection>

      <LegalSection title="3. Use of the Website">
        <p>You agree to use our website only for lawful purposes. You must not:</p>
        <ul>
          <li>Violate any applicable law or regulation</li>
          <li>Attempt to gain unauthorized access to our systems, accounts, or data</li>
          <li>Interfere with or disrupt the website&apos;s operation or security</li>
          <li>Submit false, misleading, or fraudulent information through our forms</li>
          <li>Use automated means to scrape, harvest, or overload the website without permission</li>
          <li>Transmit malware, spam, or harmful code</li>
        </ul>
        <p>
          We may suspend or restrict access to the website if we reasonably believe you have violated
          these Terms.
        </p>
      </LegalSection>

      <LegalSection title="4. Intellectual Property">
        <p>
          The website and its content—including text, graphics, logos, design, software, and
          branding—are owned by {COMPANY} or our licensors and are protected by intellectual property
          laws. You may not copy, modify, distribute, sell, or create derivative works from our
          content without prior written consent, except for limited personal, non-commercial viewing.
        </p>
        <p>
          Client-owned materials and deliverables created under a signed project agreement are
          governed by that agreement&apos;s intellectual property terms.
        </p>
      </LegalSection>

      <LegalSection title="5. Client Engagements">
        <p>
          Submitting a contact form, scheduling a meeting, or requesting information does not create
          a binding contract for services. A formal engagement begins only when both parties execute
          a written agreement (such as a master services agreement, statement of work, or proposal
          acceptance).
        </p>
        <p>
          Any estimates, timelines, or descriptions on this website are for general information only
          and are not guarantees unless expressly confirmed in writing.
        </p>
      </LegalSection>

      <LegalSection title="6. Fees and Payment">
        <p>
          Pricing for professional services is provided in proposals or contracts. Unless otherwise
          stated in writing, fees are exclusive of taxes, third-party licenses, and reimbursable
          expenses. Payment terms, invoicing schedules, and late payment consequences are defined
          in the applicable client agreement.
        </p>
      </LegalSection>

      <LegalSection title="7. Confidentiality">
        <p>
          We treat non-public business information shared during sales discussions or projects as
          confidential, subject to our mutual obligations in any signed non-disclosure or services
          agreement. You agree not to misuse confidential information we share with you in the course
          of evaluating or receiving our services.
        </p>
      </LegalSection>

      <LegalSection title="8. Disclaimer of Warranties">
        <p>
          THE WEBSITE AND ANY INFORMATION PROVIDED THROUGH IT ARE OFFERED ON AN &quot;AS IS&quot; AND
          &quot;AS AVAILABLE&quot; BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, {COMPANY} DISCLAIMS
          ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          We do not warrant that the website will be uninterrupted, error-free, or free of harmful
          components, or that information on the website is complete or current.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitation of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY} AND ITS DIRECTORS, EMPLOYEES, AND
          AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES,
          ARISING FROM YOUR USE OF THE WEBSITE.
        </p>
        <p>
          OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE WEBSITE OR THESE TERMS SHALL NOT EXCEED
          ONE HUNDRED U.S. DOLLARS (USD $100), EXCEPT WHERE LIABILITY CANNOT BE LIMITED BY APPLICABLE
          LAW.
        </p>
        <p>
          Nothing in these Terms limits liability for fraud, gross negligence, or willful misconduct
          where such limitation is prohibited by law.
        </p>
      </LegalSection>

      <LegalSection title="10. Indemnification">
        <p>
          You agree to indemnify and hold harmless {COMPANY} from claims, damages, losses, and
          expenses (including reasonable legal fees) arising from your misuse of the website, violation
          of these Terms, or infringement of third-party rights resulting from content or information
          you provide to us.
        </p>
      </LegalSection>

      <LegalSection title="11. Termination">
        <p>
          We may terminate or restrict your access to the website at any time, with or without notice,
          for conduct that we believe violates these Terms or is harmful to other users, us, or third
          parties. Provisions that by their nature should survive termination will remain in effect.
        </p>
      </LegalSection>

      <LegalSection title="12. Governing Law">
        <p>
          These Terms are governed by the laws of the State of California, United States, without
          regard to conflict-of-law principles. Any dispute arising from these Terms or the website
          shall be brought in the state or federal courts located in San Francisco County, California,
          and you consent to their jurisdiction, unless mandatory consumer protection laws in your
          jurisdiction provide otherwise.
        </p>
      </LegalSection>

      <LegalSection title="13. Changes to These Terms">
        <p>
          We may revise these Terms at any time by posting an updated version on this page. Your
          continued use of the website after changes become effective constitutes acceptance of the
          revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          For questions about these Terms, contact us at{" "}
          <a href={`mailto:${EMAIL}`} className="text-primary font-semibold hover:underline">
            {EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}

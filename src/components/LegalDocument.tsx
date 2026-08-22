import { PageHero } from "@/components/PageHero";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/contact";

const COMPANY = "360GrowthCloudTech";
const EMAIL = CONTACT_EMAIL;
const PHONE = CONTACT_PHONE;
const WEBSITE = "360cloudtech.com";

export { COMPANY, EMAIL, PHONE, CONTACT_PHONE_TEL, WEBSITE };

export function LegalDocument({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero label="Legal" title={title} subtitle={subtitle} />
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
          </p>
          <div className="space-y-10">{children}</div>
          <div className="mt-14 rounded-2xl border border-border/70 bg-white/60 p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Questions about this document? Contact us at{" "}
              <a href={`mailto:${EMAIL}`} className="font-semibold text-primary hover:underline">
                {EMAIL}
              </a>{" "}
              or{" "}
              <a href={CONTACT_PHONE_TEL} className="font-semibold text-primary hover:underline">
                {PHONE}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <h2 className="display-heading text-xl md:text-2xl text-foreground mb-4">{title}</h2>
      <div className="text-sm md:text-[0.9375rem] text-muted-foreground leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_strong]:text-foreground [&_strong]:font-semibold">
        {children}
      </div>
    </article>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

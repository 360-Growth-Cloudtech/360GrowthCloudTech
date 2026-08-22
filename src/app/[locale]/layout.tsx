import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScheduleMeetingGlobal } from "@/components/ScheduleMeetingGlobal";
import { ScrollProgress } from "@/components/motion";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ScrollProgress />
      <div className="flex min-h-[100dvh] flex-col relative bg-background">
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScheduleMeetingGlobal />
      </div>
    </NextIntlClientProvider>
  );
}

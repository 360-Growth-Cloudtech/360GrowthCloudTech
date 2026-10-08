import { permanentRedirect } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

// Old URL: 308 so search engines transfer its signals to /case-studies.
export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  permanentRedirect({ href: "/case-studies", locale });
}

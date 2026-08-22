import { redirect } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  redirect({ href: "/case-studies", locale });
}

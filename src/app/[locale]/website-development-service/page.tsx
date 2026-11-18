import { permanentRedirect } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

// 308 permanent redirect so search engines transfer signals to /website-development-services
export default async function Page({ params }: Props) {
  const { locale } = await params;
  permanentRedirect({ href: "/website-development-services", locale });
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/views/CaseStudyDetail";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/lib/case-studies-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: study.title,
    description: study.excerpt,
    openGraph: {
      title: study.title,
      description: study.excerpt,
      images: [{ url: study.image }],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetail study={study} />;
}

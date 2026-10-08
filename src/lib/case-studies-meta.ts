import type { CaseStudyImageVariant } from "@/lib/case-studies-data";

export type CaseStudyGalleryMeta = {
  src: string;
  variant?: CaseStudyImageVariant;
};

export type CaseStudyMeta = {
  slug: string;
  /** ISO date for structured data and the sitemap (display dates are localized). */
  publishedAt: string;
  image: string;
  imageVariant?: CaseStudyImageVariant;
  gallery?: CaseStudyGalleryMeta[];
};

export const caseStudyMeta: CaseStudyMeta[] = [
  {
    slug: "lifestyle-gifting-ecommerce-app",
    publishedAt: "2026-09-01",
    image: "/case-studies/lifestyle-gifting-app.png",
    imageVariant: "laptop",
  },
  {
    slug: "himachal-tourism-google-ads",
    publishedAt: "2026-08-10",
    image: "/case-studies/himachal-tourism-google-ads.png",
    imageVariant: "laptop",
  },
  {
    slug: "geetha-studio",
    publishedAt: "2026-03-15",
    image: "/case-studies/geetha-studio.jpg",
    imageVariant: "laptop",
  },
  {
    slug: "atory-hub",
    publishedAt: "2026-03-01",
    image: "/case-studies/atory-hub-home.jpg",
    imageVariant: "laptop",
    gallery: [
      { src: "/case-studies/atory-hub-inspirations.jpg", variant: "laptop" },
      { src: "/case-studies/atory-hub-professionals.png", variant: "laptop" },
    ],
  },
  {
    slug: "healthcare-ivr-platform",
    publishedAt: "2026-08-18",
    image: "/case-studies/healthcare-ivr-platform.png",
    imageVariant: "laptop",
  },
  {
    slug: "dermayoga",
    publishedAt: "2026-07-12",
    image: "/case-studies/dermayoga.jpg",
    gallery: [{ src: "/case-studies/dermayoga-product.jpg", variant: "laptop" }],
  },
  {
    slug: "skinfinity-academy",
    publishedAt: "2026-06-04",
    image: "/case-studies/skinfinity-academy.jpg",
    imageVariant: "laptop",
  },
  {
    slug: "studio-atory",
    publishedAt: "2026-05-22",
    image: "/case-studies/studio-atory.png",
    imageVariant: "laptop",
  },
  {
    slug: "mahasu-travels-crm",
    publishedAt: "2026-04-09",
    image: "/case-studies/mahasu-travels-crm.png",
    imageVariant: "laptop",
  },
];

export function getCaseStudyMetaBySlug(slug: string): CaseStudyMeta | undefined {
  return caseStudyMeta.find((study) => study.slug === slug);
}

export function getCaseStudyPublishedAt(slug: string): string | undefined {
  return getCaseStudyMetaBySlug(slug)?.publishedAt;
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudyMeta.map((study) => study.slug);
}

export type ChallengeCategory = {
  category: string;
  items: Array<{ title: string; desc: string }>;
};

export type SolutionCategory = {
  category: string;
  items: Array<{ title: string; desc: string }>;
};

export type ImpactResultGroup = {
  title: string;
  items: string[];
};

export type CaseStudyContent = {
  slug: string;
  client: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  summary: string;
  challenge: string;
  solution: string[];
  results: string[];
  stack: string[];
  imageAlt: string;
  gallery?: Array<{ alt: string; caption?: string }>;
  clientVision?: string;
  challengeCategories?: ChallengeCategory[];
  solutionCategories?: SolutionCategory[];
  impactResults?: ImpactResultGroup[];
  finalThoughts?: string;
};

export type CaseStudy = Omit<CaseStudyMeta, "gallery"> &
  Omit<CaseStudyContent, "gallery"> & {
    gallery?: Array<{
      src: string;
      alt: string;
      caption?: string;
      variant?: CaseStudyImageVariant;
    }>;
  };

export function mergeCaseStudy(
  meta: CaseStudyMeta,
  content: CaseStudyContent,
): CaseStudy {
  return {
    ...meta,
    ...content,
    gallery: meta.gallery?.map((item, index) => ({
      src: item.src,
      variant: item.variant,
      alt: content.gallery?.[index]?.alt ?? "",
      caption: content.gallery?.[index]?.caption,
    })),
  };
}


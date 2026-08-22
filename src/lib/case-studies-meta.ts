import type { CaseStudyImageVariant } from "@/lib/case-studies-data";

export type CaseStudyGalleryMeta = {
  src: string;
  variant?: CaseStudyImageVariant;
};

export type CaseStudyMeta = {
  slug: string;
  image: string;
  imageVariant?: CaseStudyImageVariant;
  gallery?: CaseStudyGalleryMeta[];
};

export const caseStudyMeta: CaseStudyMeta[] = [
  {
    slug: "himachal-tourism-google-ads",
    image: "/case-studies/himachal-tourism-google-ads.png",
    imageVariant: "laptop",
  },
  {
    slug: "geetha-studio",
    image: "/case-studies/geetha-studio.jpg",
    imageVariant: "laptop",
  },
  {
    slug: "atory-hub",
    image: "/case-studies/atory-hub-home.jpg",
    imageVariant: "laptop",
    gallery: [
      { src: "/case-studies/atory-hub-inspirations.jpg", variant: "laptop" },
      { src: "/case-studies/atory-hub-professionals.png", variant: "laptop" },
    ],
  },
  {
    slug: "healthcare-ivr-platform",
    image: "/case-studies/healthcare-ivr-platform.png",
    imageVariant: "laptop",
  },
  {
    slug: "dermayoga",
    image: "/case-studies/dermayoga.jpg",
    gallery: [{ src: "/case-studies/dermayoga-product.jpg", variant: "laptop" }],
  },
  {
    slug: "skinfinity-academy",
    image: "/case-studies/skinfinity-academy.jpg",
    imageVariant: "laptop",
  },
  {
    slug: "studio-atory",
    image: "/case-studies/studio-atory.png",
    imageVariant: "laptop",
  },
  {
    slug: "mahasu-travels-crm",
    image: "/case-studies/mahasu-travels-crm.png",
    imageVariant: "laptop",
  },
];

export function getCaseStudyMetaBySlug(slug: string): CaseStudyMeta | undefined {
  return caseStudyMeta.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudyMeta.map((study) => study.slug);
}

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

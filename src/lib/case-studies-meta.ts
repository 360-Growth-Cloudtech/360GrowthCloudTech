import type { CaseStudyImageVariant } from "@/lib/case-studies-data";

export type CaseStudyGalleryMeta = {
  src: string;
  variant?: CaseStudyImageVariant;
  /** Intrinsic pixel size, required for the "screen" variant. */
  width?: number;
  height?: number;
};

export type CaseStudyMeta = {
  slug: string;
  /** ISO date for structured data and the sitemap (display dates are localized). */
  publishedAt: string;
  image: string;
  imageVariant?: CaseStudyImageVariant;
  gallery?: CaseStudyGalleryMeta[];
  /** Public URL of the shipped product, shown as "Visit live website". */
  liveUrl?: string;
  /** Mark the live link nofollow (e.g. a staging host before the domain launch). */
  liveUrlNofollow?: boolean;
};

export const caseStudyMeta: CaseStudyMeta[] = [
  {
    slug: "mahasu-travels-website",
    publishedAt: "2026-10-13",
    image: "/case-studies/mahasu-travels-website-home.jpg",
    imageVariant: "laptop",
    // Staging host until the new site replaces the old one on mahasutravels.com.
    liveUrl: "https://mahasu-travels-public-web-94435777749.asia-south2.run.app/",
    liveUrlNofollow: true,
    gallery: [
      { src: "/case-studies/mahasu-travels-website-tour-packages.jpg", variant: "laptop" },
      { src: "/case-studies/mahasu-travels-website-destinations.jpg", variant: "laptop" },
    ],
  },
  {
    slug: "lifestyle-gifting-ecommerce-app",
    publishedAt: "2026-09-01",
    // Illustration (mobile app, no public screenshots): product grid + checkout.
    image: "/case-studies/lifestyle-gifting-app.jpg",
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
    liveUrl: "https://studio-geetha.com/",
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
    gallery: [
      { src: "/case-studies/healthcare-ivr-dashboard.jpg", variant: "screen", width: 1600, height: 866 },
      { src: "/case-studies/healthcare-ivr-live-status.jpg", variant: "screen", width: 1600, height: 868 },
      { src: "/case-studies/healthcare-ivr-appointments.jpg", variant: "screen", width: 1600, height: 867 },
      { src: "/case-studies/healthcare-ivr-rooms.jpg", variant: "screen", width: 1600, height: 868 },
    ],
  },
  {
    slug: "dermayoga",
    publishedAt: "2026-07-12",
    liveUrl: "https://dermayoga.com/",
    image: "/case-studies/dermayoga.jpg",
    gallery: [{ src: "/case-studies/dermayoga-product.jpg", variant: "laptop" }],
  },
  {
    slug: "skinfinity-academy",
    publishedAt: "2026-06-04",
    liveUrl: "https://skinfinityacademy.com/",
    image: "/case-studies/skinfinity-academy.jpg",
    imageVariant: "laptop",
  },
  {
    slug: "studio-atory",
    publishedAt: "2026-05-22",
    liveUrl: "https://atory.co/",
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
  /** Short title for <title>/search results; falls back to `title`. */
  seoTitle?: string;
  /** Search-result description (≤160 chars); falls back to `excerpt`. */
  seoDescription?: string;
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
      width?: number;
      height?: number;
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
      width: item.width,
      height: item.height,
      alt: content.gallery?.[index]?.alt ?? "",
      caption: content.gallery?.[index]?.caption,
    })),
  };
}


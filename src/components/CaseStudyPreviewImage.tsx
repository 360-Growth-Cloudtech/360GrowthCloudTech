import Image from "next/image";
import { LaptopMockup } from "@/components/LaptopMockup";
import type { CaseStudyImageVariant } from "@/lib/case-studies-data";

type CaseStudyPreviewImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Use "laptop" to frame a plain screenshot inside a device mockup. */
  variant?: CaseStudyImageVariant;
};

export function CaseStudyPreviewImage({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 340px",
  variant = "default",
}: CaseStudyPreviewImageProps) {
  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f7f4f0] ring-1 ring-border/50 shadow-[0_12px_40px_rgba(26,21,18,0.08)] ${className}`}
    >
      {variant === "laptop" ? (
        <LaptopMockup src={src} alt={alt} priority={priority} sizes={sizes} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      )}
    </div>
  );
}

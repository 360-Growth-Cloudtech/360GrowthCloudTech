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
  /** Intrinsic size; required for the "screen" variant. */
  width?: number;
  height?: number;
};

export function CaseStudyPreviewImage({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 340px",
  variant = "default",
  width,
  height,
}: CaseStudyPreviewImageProps) {
  // Full product screen in a browser frame, shown whole rather than cropped to a fixed ratio.
  if (variant === "screen" && width && height) {
    return (
      <div className={`overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] ${className}`}>
        <div className="flex items-center gap-1.5 border-b border-border bg-slate-50 px-4 py-2.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes={sizes} className="h-auto w-full" />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f8fafc] ring-1 ring-border/50 shadow-[0_12px_40px_rgba(15,23,42,0.08)] ${className}`}
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

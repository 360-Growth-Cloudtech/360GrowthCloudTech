import Image from "next/image";

const LAPTOP_SCENE_TEMPLATE = "/mockups/laptop-scene-template.jpg";

/** Screen inset tuned to the MacBook display area in `laptop-scene-template.jpg`. */
export const LAPTOP_SCREEN_INSET = {
  left: "9.2%",
  top: "10%",
  width: "81%",
  height: "67.7%",
} as const;

type LaptopMockupProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

export function LaptopMockup({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 340px",
}: LaptopMockupProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={LAPTOP_SCENE_TEMPLATE}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        aria-hidden
        className="pointer-events-none object-cover object-center select-none"
      />
      <div
        className="absolute overflow-hidden bg-[#111111]"
        style={{
          left: LAPTOP_SCREEN_INSET.left,
          top: LAPTOP_SCREEN_INSET.top,
          width: LAPTOP_SCREEN_INSET.width,
          height: LAPTOP_SCREEN_INSET.height,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

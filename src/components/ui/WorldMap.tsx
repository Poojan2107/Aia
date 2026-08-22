import Image from "next/image";

type Props = {
  className?: string;
  activeRegion?: string;
};

/**
 * Figma `World-Map-custom.jpg` already includes markers + UAE contact callout.
 * Render the plate only — no live dots on top.
 */
export function WorldMap({ className = "", activeRegion = "UAE" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-[#eef2f5] ${className}`}>
      <Image
        src="/images/world-map.jpg"
        alt={`AIA global presence map, focused on ${activeRegion}`}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-contain object-center"
        quality={90}
      />
    </div>
  );
}

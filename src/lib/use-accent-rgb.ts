"use client";

import { useEffect, useState } from "react";

/**
 * The page's accent colour as [r, g, b] (0-255), from the --aia-accent-rgb token. Follows the
 * colour palette switch (html[data-palette]) so canvas, SVG and 3D colours set from script
 * change with it. Falls back to the site's own blue.
 */
export function useAccentRgb(): [number, number, number] {
  const [rgb, setRgb] = useState<[number, number, number]>([0, 110, 255]);
  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--aia-accent-rgb");
      const parts = v.split(",").map((x) => Number(x.trim()));
      if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) setRgb(parts as [number, number, number]);
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-palette"] });
    return () => mo.disconnect();
  }, []);
  return rgb;
}

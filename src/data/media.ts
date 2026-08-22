/**
 * Real films under /public/videos.
 * Ambient slots autoplay muted; gallery films wait for a click.
 */
export const media = {
  hero: "/videos/hero.mp4",
  whatWeSolve: "/videos/corporate.mp4",
  whatWeSolveBand: "/videos/corporate.mp4",
  about: "/videos/corporate.mp4",
  sustainability: "/videos/mill.mp4",
  tech: {
    "01": "/videos/mill.mp4",
    "02": undefined as string | undefined,
    "03": undefined as string | undefined,
  },
  gallery: {
    lining: "/videos/mill.mp4",
    corporate: "/videos/corporate.mp4",
    components: "/videos/hero.mp4",
  },
} as const;

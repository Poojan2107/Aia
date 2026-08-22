/**
 * Real films under /public/videos.
 * Ambient slots autoplay muted; gallery films wait for a click.
 */
export const media = {
  hero: "/videos/hero.mp4",
  whatWeSolve: undefined as string | undefined,
  whatWeSolveBand: undefined as string | undefined,
  about: undefined as string | undefined,
  sustainability: undefined as string | undefined,
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

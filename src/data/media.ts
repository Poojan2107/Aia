/**
 * Real films under /public/videos.
 * Ambient slots autoplay muted; gallery films wait for a click.
 */
export const media = {
  hero: "/videos/hero.mp4",
  whatWeSolve: "/videos/what-we-solve.mp4",
  whatWeSolveBand: "/videos/corporate.mp4",
  about: "/videos/about-us.mp4",
  sustainability: "/videos/mill.mp4",
  tech: {
    "01": "/videos/mill.mp4",
    "02": undefined as string | undefined,
    "03": undefined as string | undefined,
  },
} as const;

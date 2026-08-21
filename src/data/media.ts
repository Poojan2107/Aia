/**
 * Point these at real files under /public when assets are ready.
 * Leave undefined to keep the poster-only (LCP-safe) surface.
 */
export const media = {
  hero: undefined as string | undefined,
  whatWeSolve: undefined as string | undefined,
  whatWeSolveBand: undefined as string | undefined,
  about: undefined as string | undefined,
  sustainability: undefined as string | undefined,
  tech: {
    "01": undefined as string | undefined,
    "02": undefined as string | undefined,
    "03": undefined as string | undefined,
  },
  galleryCorporate: undefined as string | undefined,
} as const;

/** Example once files exist:
 * hero: "/videos/hero.mp4"
 */

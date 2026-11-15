/**
 * Every homepage film ships as H.264 MP4 plus a VP9 WebM twin (scripts/video/to-webm.sh).
 * Most browsers play the MP4; Linux browsers without the H.264 decoder (Firefox on Fedora,
 * open-source Chromium builds) get the WebM. The exact codec strings matter: a browser without
 * H.264 may still answer "maybe" to plain "video/mp4", but answers "" to the full codec.
 */
export const MP4_TYPE = 'video/mp4; codecs="avc1.640032"'; // H.264 High profile, level 5.0
export const WEBM_TYPE = 'video/webm; codecs="vp9"';

export const webmTwin = (src: string) => src.replace(/\.mp4$/, ".webm");

/** Client-only: the file this browser can actually play. */
export function playableVideo(src: string): string {
  if (typeof document === "undefined" || !src.endsWith(".mp4")) return src;
  const probe = document.createElement("video");
  return probe.canPlayType(MP4_TYPE) ? src : webmTwin(src);
}

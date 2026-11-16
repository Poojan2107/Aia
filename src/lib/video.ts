/**
 * Every homepage film ships as H.264 MP4 plus a VP9 WebM twin (scripts/video/to-webm.sh).
 * Most browsers play the MP4; Linux browsers without the H.264 decoder (Firefox on Fedora,
 * open-source Chromium builds) get the WebM. The exact codec strings matter: a browser without
 * H.264 may still answer "maybe" to plain "video/mp4", but answers "" to the full codec.
 */
export const MP4_TYPE = 'video/mp4; codecs="avc1.640032"'; // H.264 High profile, level 5.0
export const WEBM_TYPE = 'video/webm; codecs="vp9"';

export const webmTwin = (src: string) => src.replace(/\.mp4$/, ".webm");

let smooth: Promise<boolean> | null = null;

/**
 * Client-only: whether this device should play the background films. Asks the browser's own
 * decoder (Media Capabilities, which counts hardware video decoding: most laptops have it even
 * when WebGL falls back to software) rather than guessing from the GPU. Its "smooth" answer is
 * not reliable on its own, so the films play whenever either format decodes, and stay on their
 * posters only on clearly weak machines: no hardware decoding and 2 or fewer CPU cores (e.g. a
 * small Linux VM). Muted ambient loops play like the hero film does, also with reduced motion on.
 */
export function filmsPlaySmoothly(): Promise<boolean> {
  if (smooth) return smooth;
  const caps = typeof navigator !== "undefined" ? navigator.mediaCapabilities : undefined;
  if (!caps?.decodingInfo) return (smooth = Promise.resolve(true));
  const weakCpu = (navigator.hardwareConcurrency || 4) <= 2;
  const check = (contentType: string) =>
    caps
      .decodingInfo({ type: "file", video: { contentType, width: 1920, height: 1080, bitrate: 4_000_000, framerate: 30 } })
      .then((r) => r.supported && (r.powerEfficient || r.smooth || !weakCpu))
      .catch(() => false);
  // Media Capabilities needs the full VP9 codec string (profile 0, level 4.0, 8-bit).
  smooth = Promise.all([check(MP4_TYPE), check('video/webm; codecs="vp09.00.40.08"')]).then(([mp4, webm]) => mp4 || webm);
  return smooth;
}

/** Client-only: the file this browser can actually play. */
export function playableVideo(src: string): string {
  if (typeof document === "undefined" || !src.endsWith(".mp4")) return src;
  const probe = document.createElement("video");
  return probe.canPlayType(MP4_TYPE) ? src : webmTwin(src);
}

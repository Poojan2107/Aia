/**
 * What kind of WebGL this device has.
 * - "hardware": a real GPU — run the full 3D experience.
 * - "software": WebGL drawn on the CPU (Mesa llvmpipe/softpipe on many Linux laptops and VMs,
 *   SwiftShader, Microsoft Basic Render Driver). Heavy scenes like the globe freeze for seconds
 *   there, so callers should use their lightweight fallback.
 * - "none": no WebGL at all.
 */
export type WebGLTier = "hardware" | "software" | "none";

const SOFTWARE_RENDERERS = /swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen|virgl/i;

let cached: WebGLTier | null = null;

export function webglTier(): WebGLTier {
  if (cached) return cached;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return (cached = "none");
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return (cached = SOFTWARE_RENDERERS.test(renderer) ? "software" : "hardware");
  } catch {
    return (cached = "none");
  }
}

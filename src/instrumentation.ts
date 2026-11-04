/** Runs once when a server instance starts: fail fast on bad production config. */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { checkServerEnv } = await import("@/lib/env.server");
    checkServerEnv();
  }
}

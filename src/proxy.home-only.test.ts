import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";

describe("Home-only lock", () => {
  it("serves the home page and sends every other page home", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_HOME_ONLY", "true");
    const { proxy } = await import("./proxy");
    const { isHomeOnlyAllowedHref } = await import("@/lib/home-only");

    expect(proxy(new NextRequest("http://localhost:3000/")).status).toBe(200);
    for (const path of ["/company/about", "/about-us/", "/dev/models", "/fr/contact", "/contact?x=1"]) {
      const res = proxy(new NextRequest(`http://localhost:3000${path}`));
      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/");
    }

    expect(isHomeOnlyAllowedHref("/")).toBe(true);
    expect(isHomeOnlyAllowedHref("#solutions")).toBe(true);
    expect(isHomeOnlyAllowedHref("/company/about")).toBe(false);
    expect(isHomeOnlyAllowedHref("/dev/models")).toBe(false);
    expect(isHomeOnlyAllowedHref("https://www.linkedin.com/company/aia-engineering-ltd/")).toBe(false);
    vi.unstubAllEnvs();
  });
});

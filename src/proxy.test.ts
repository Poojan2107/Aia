import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

describe("Proxy & Legacy Redirects", () => {
  it("returns 400 Bad Request on malformed URI without crashing", () => {
    const req = new NextRequest("http://localhost:3000/%E0%A4%A");
    const res = proxy(req);
    expect(res.status).toBe(400);
  });

  it("redirects old WordPress URL with trailing slash in a single 301 hop", () => {
    const req = new NextRequest("http://localhost:3000/about-us/");
    const res = proxy(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe("http://localhost:3000/company/about");
  });

  it("redirects committee URL to correct anchor in a single hop", () => {
    const req = new NextRequest(
      "http://localhost:3000/commitee_of_board/corporate-social-responsibility-committee/",
    );
    const res = proxy(req);
    expect(res.status).toBe(301);
    expect(res.headers.get("location")).toBe(
      "http://localhost:3000/company/board-committees#corporate-social-responsibility-committee",
    );
  });

  it("normalises non-legacy routes with trailing slash using 308", () => {
    const req = new NextRequest("http://localhost:3000/company/about/");
    const res = proxy(req);
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("http://localhost:3000/company/about");
  });

  it("redirects localized route to English equivalent using 302", () => {
    const req = new NextRequest("http://localhost:3000/cn/about-us/");
    const res = proxy(req);
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("http://localhost:3000/company/about");
  });
});


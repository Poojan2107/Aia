import { describe, it, expect } from "vitest";
import { legacyRedirects } from "./legacy";
import { allRoutes } from "@/lib/routes";

describe("Legacy Redirects", () => {
  const registeredPaths = new Set(allRoutes().map((r) => r.path));

  it("every redirect target exists in allRoutes() (ignoring fragments)", () => {
    for (const rule of legacyRedirects) {
      if (rule.status === 410) {
        continue;
      }
      const targetPath = rule.to.split("#")[0];
      expect(
        registeredPaths.has(targetPath),
        `Redirect target '${rule.to}' (from '${rule.from}') must exist in registered routes`,
      ).toBe(true);
    }
  });

  it("no redirect target is itself a redirect source (no chains)", () => {
    const froms = new Set(
      legacyRedirects.map((r) => r.from.toLowerCase().replace(/\/+$/, "")),
    );
    for (const rule of legacyRedirects) {
      if (rule.status === 410) continue;
      const targetPath = rule.to.split("#")[0].toLowerCase().replace(/\/+$/, "");
      expect(
        froms.has(targetPath),
        `Redirect target '${rule.to}' is chained as a source '${targetPath}'`,
      ).toBe(false);
    }
  });

  it("nothing redirects to '/' except explicit home redirects", () => {
    for (const rule of legacyRedirects) {
      if (rule.status === 410) continue;
      if (rule.to === "/") {
        expect(rule.from).toBe("/");
      }
    }
  });
});


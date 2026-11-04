import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitContactForm } from "./actions";

// Mock next/headers
vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue({
    get: (key: string) => {
      if (key === "x-forwarded-for") return "192.168.1.100";
      return null;
    },
  }),
}));

describe("submitContactForm", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("silently redirects bot when honeypot bot_trap is filled", async () => {
    const formData = new FormData();
    formData.append("name", "Bot User");
    formData.append("company", "Bot Company");
    formData.append("email", "bot@example.com");
    formData.append("country", "India");
    formData.append("enquiryType", "General");
    formData.append("message", "This is spam content 1234567890");
    formData.append("consent", "on");
    formData.append("bot_trap", "I am a bot");

    try {
      await submitContactForm({}, formData);
      // In Next.js redirect throws, so if it didn't throw redirect, fail:
      expect.unreachable("Expected redirect() to be thrown");
    } catch (err: unknown) {
      const error = err as { digest?: string; message?: string };
      const str = error.digest || error.message || "";
      expect(str).toContain("NEXT_REDIRECT");
      expect(str).toContain("/contact/thank-you");
    }
  });

  it("returns an error in production when CONTACT_WEBHOOK_URL is not configured", async () => {
    process.env.NODE_ENV = "production";
    delete process.env.CONTACT_WEBHOOK_URL;

    const formData = new FormData();
    formData.append("name", "Jane Doe");
    formData.append("company", "AIA Partner");
    formData.append("email", "jane@example.com");
    formData.append("country", "Australia");
    formData.append("enquiryType", "Mining");
    formData.append("message", "We need consultation on grinding media.");
    formData.append("consent", "on");

    const result = await submitContactForm({}, formData);
    expect(result.success).toBe(false);
    expect(result.message).toContain("Contact form submission is currently unavailable");
  });
});

import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-aia-navy px-6 py-16 text-center text-white">
      <BrandLockup tone="light" className="mb-10" />
      <p className="ui-caps mb-4 tracking-[0.16em] text-aia-orange font-semibold">404 — Page Not Found</p>
      <h1 className="display mb-6 text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-white">
        We couldn&apos;t find that page
      </h1>
      <p className="mb-8 max-w-lg text-[1rem] leading-[1.7] text-white/70">
        The link you followed may be outdated or the page has moved as part of our new platform structure. Try navigating to one of the main sections below.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="ui-caps inline-flex h-[46px] items-center rounded-full bg-aia-orange px-6 text-sm font-semibold text-white transition hover:bg-[#d65217]"
        >
          Back to Home
        </Link>
        <Link
          href="/solutions"
          className="ui-caps inline-flex h-[46px] items-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-aia-navy"
        >
          Our Solutions
        </Link>
        <Link
          href="/contact"
          className="ui-caps inline-flex h-[46px] items-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-aia-navy"
        >
          Contact Us
        </Link>
        <Link
          href="/sitemap"
          className="ui-caps inline-flex h-[46px] items-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-aia-navy"
        >
          Sitemap
        </Link>
      </div>
    </main>
  );
}

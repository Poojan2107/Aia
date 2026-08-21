import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-aia-navy px-6 text-center text-aia-cream">
      <BrandLockup tone="light" className="mb-10" />
      <p className="ui-caps mb-4 text-aia-cream/50">404</p>
      <h1 className="display mb-6 text-[clamp(2rem,4vw,3.5rem)]">
        Page not found
      </h1>
      <p className="mb-10 max-w-md text-aia-cream/70">
        The page you requested isn&apos;t available. Return home to continue
        exploring AIA wear solutions.
      </p>
      <Link
        href="/"
        className="ui-caps inline-flex h-[50px] items-center rounded-full border border-aia-cream/40 px-6 text-aia-cream transition hover:bg-aia-cream hover:text-aia-navy"
      >
        Back to home
      </Link>
    </main>
  );
}

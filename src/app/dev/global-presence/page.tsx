import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AiaVegaGlobeSection } from "@/components/home/AiaVegaGlobeSection";

export const metadata: Metadata = {
  title: "AIA & Vega Global Presence · Atomic Globe",
  description: "AIA Engineering and Vega Industries collaboration showcase using AtomicGlobe.",
  robots: { index: false, follow: false },
};

export default function AtomicGlobeDevPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <AiaVegaGlobeSection />
      </main>

      <SiteFooter />
    </div>
  );
}


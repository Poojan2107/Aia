import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AssistChip } from "@/components/ui/AssistChip";
import { MiningProducts } from "@/components/solutions/mining/MiningProducts";

export const metadata: Metadata = {
  title: "Mining Products",
  description:
    "Engineered mining solutions for mill reliability and performance — SAG and ball mill lining systems, discharge assemblies, Verti mill liners, high-chrome grinding media, and mill fastening systems.",
  alternates: {
    canonical: "/solutions/mining/products",
  },
  openGraph: {
    title: "Mining Products | AIA Engineering",
    description:
      "SAG and ball mill liners, discharge systems, Verti mill liners, high-chrome media, and mill fastening systems.",
    url: "/solutions/mining/products",
    images: [
      {
        url: "/images/mining-hero.jpg",
        alt: "Interior of an AIA mining grinding mill",
      },
    ],
  },
};

export default function MiningProductsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <MiningProducts />
      </main>
      <SiteFooter />
      <AssistChip />
    </>
  );
}

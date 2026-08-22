import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AssistChip } from "@/components/ui/AssistChip";
import { MiningServices } from "@/components/solutions/mining/MiningServices";

export const metadata: Metadata = {
  title: "Mining Services",
  description:
    "Mining services for grinding circuits — design modelling, wear scanning, reline supervision, circuit survey, JKSimMet process modelling, mill operation support, marked ball tests, media sizing, and laboratory bench testing.",
  alternates: {
    canonical: "/solutions/mining/services",
  },
  openGraph: {
    title: "Mining Services | AIA Engineering",
    description:
      "Design modelling, wear monitoring, reline supervision, circuit surveys, process modelling, and grinding-media testing for mining mills.",
    url: "/solutions/mining/services",
    images: [
      {
        url: "/images/mining-hero.jpg",
        alt: "Interior of an AIA mining grinding mill",
      },
    ],
  },
};

export default function MiningServicesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <MiningServices />
      </main>
      <SiteFooter />
      <AssistChip />
    </>
  );
}

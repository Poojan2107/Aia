import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AssistChip } from "@/components/ui/AssistChip";
import { MiningLanding } from "@/components/solutions/mining/MiningLanding";

export const metadata: Metadata = {
  title: "Mining",
  description:
    "Advanced comminution and electrochemistry technologies enhancing reliability, throughput and recovery across mining grinding circuits.",
  alternates: {
    canonical: "/solutions/mining",
  },
  openGraph: {
    title: "Mining | AIA Engineering",
    description:
      "Wear solutions, mill uptime and grinding-circuit efficiency for SAG, ball and vertical mills.",
    url: "/solutions/mining",
    images: [
      {
        url: "/images/mining-hero.jpg",
        alt: "Interior of an AIA mining grinding mill",
      },
    ],
  },
};

export default function MiningPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <MiningLanding />
      </main>
      <SiteFooter />
      <AssistChip />
    </>
  );
}

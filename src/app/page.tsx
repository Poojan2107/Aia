import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { AiaVegaGlobeSection } from "@/components/home/AiaVegaGlobeSection";
import { WhatWeSolve } from "@/components/home/WhatWeSolve";
import { IndustryPanels } from "@/components/home/IndustryPanels";
import { Materials } from "@/components/home/Materials";
import { Services } from "@/components/home/Services";
import { Technology } from "@/components/home/Technology";
import { AboutBand } from "@/components/home/AboutBand";
import { GlobalMap } from "@/components/home/GlobalMap";
import { Vision } from "@/components/home/Vision";
import { Gallery } from "@/components/home/Gallery";
import { CaseStudies } from "@/components/home/CaseStudies";
import {
  Sustainability,
  Faq,
  Insights,
} from "@/components/home/ClosingSections";
import { AssistChip } from "@/components/ui/AssistChip";
import { routeById } from "@/lib/routes";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor(routeById("home"));

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <AiaVegaGlobeSection />
        <WhatWeSolve />
        <IndustryPanels />
        <Materials />
        <Services />
        <Technology />
        <AboutBand />
        <GlobalMap />
        <Vision />
        <Gallery />
        <CaseStudies />
        <Sustainability />
        <Faq />
        <Insights />
      </main>
      <SiteFooter />
      <AssistChip />
    </>
  );
}

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { WhatWeSolve } from "@/components/home/WhatWeSolve";
import { Industries } from "@/components/home/Industries";
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
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <WhatWeSolve />
        <Industries />
        <Services />
        <Technology />
        <AboutBand />
        <GlobalMap />
        <Reveal>
          <Vision />
        </Reveal>
        <Gallery />
        <Reveal>
          <CaseStudies />
        </Reveal>
        <Sustainability />
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <Insights />
        </Reveal>
      </main>
      <SiteFooter />
      <AssistChip />
    </>
  );
}

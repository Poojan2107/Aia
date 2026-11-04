import type { Metadata } from "next";
import { GlbPreview, type PreviewModel } from "@/components/dev/GlbPreview";

export const metadata: Metadata = {
  title: "Dev · GLB model preview",
  robots: { index: false, follow: false },
};

const models: PreviewModel[] = [
  {
    id: "fe",
    label: "Feed End (FE_ASSLY)",
    src: "/models/aia/FE_ASSLY.glb",
    sizeLabel: "92 MB",
  },
  {
    id: "de",
    label: "Discharge End (DE_ASSLY)",
    src: "/models/aia/DE_ASSLY.glb",
    sizeLabel: "203 MB",
  },
];

/** Local-only preview of converted AIA GLBs. Not linked from the main nav. */
export default function DevModelsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <GlbPreview models={models} />
    </main>
  );
}

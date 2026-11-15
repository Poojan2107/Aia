"use client";

import { useEffect, useState } from "react";

export type PreviewModel = {
  id: string;
  label: string;
  src: string;
  sizeLabel: string;
};


type Props = {
  models: PreviewModel[];
};

const MODEL_VIEWER_SRC =
  "/vendor/model-viewer-4.0.0.min.js";

export function GlbPreview({ models }: Props) {
  const [activeId, setActiveId] = useState(models[0]?.id ?? "");
  const [scriptReady, setScriptReady] = useState(() => {
    if (typeof window === "undefined" || typeof customElements === "undefined") return false;
    return Boolean(customElements.get("model-viewer"));
  });
  const [loadError, setLoadError] = useState<string | null>(null);
  const active = models.find((m) => m.id === activeId) ?? models[0];

  useEffect(() => {
    if (typeof customElements !== "undefined" && customElements.get("model-viewer")) {
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-model-viewer="aia"]`,
    );
    if (existing) {
      const onLoad = () => setScriptReady(true);
      existing.addEventListener("load", onLoad);
      return () => existing.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = MODEL_VIEWER_SRC;
    script.dataset.modelViewer = "aia";
    script.onload = () => setScriptReady(true);
    script.onerror = () =>
      setLoadError("Could not load model-viewer from CDN. Check network.");
    document.head.appendChild(script);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Local preview · not linked from nav
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          AIA GLB models
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
          Sourced from <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[12px]">AIA Assests/models</code>.
          These files are still CAD-heavy — first load can take a while on local.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {models.map((model) => {
          const selected = model.id === active?.id;
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => setActiveId(model.id)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selected
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500"
              }`}
            >
              {model.label}
              <span className="ml-2 text-xs opacity-70">{model.sizeLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[radial-gradient(circle_at_30%_20%,#f4f4f5,transparent_45%),linear-gradient(180deg,#ececec,#d4d4d8)] shadow-sm">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 text-sm text-neutral-700">
          <span className="font-medium">{active?.label ?? "No model"}</span>
          <span className="font-mono text-xs text-neutral-500">
            {active?.src}
          </span>
        </div>

        <div className="relative aspect-[16/10] w-full min-h-[28rem]">
          {loadError ? (
            <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-red-700">
              {loadError}
            </div>
          ) : !scriptReady || !active ? (
            <div className="absolute inset-0 grid place-items-center text-sm text-neutral-600">
              Loading viewer…
            </div>
          ) : (
            <model-viewer
              key={active.src}
              src={active.src}
              alt={active.label}
              camera-controls
              touch-action="pan-y"
              shadow-intensity="0.7"
              exposure="1.05"
              interaction-prompt="auto"
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            />
          )}
        </div>
      </div>

      <ul className="grid gap-3 text-sm text-neutral-600 md:grid-cols-2">
        {models.map((model) => (
          <li
            key={`meta-${model.id}`}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-3"
          >
            <div className="font-medium text-neutral-900">{model.label}</div>
            <div className="mt-1 font-mono text-xs text-neutral-500">{model.src}</div>
            <div className="mt-1 text-xs">{model.sizeLabel} on disk</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

export function AssistChip() {
  return (
    <button
      type="button"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-40"
      aria-label="Open AIA assistant"
    >
      <span className="relative flex size-12 items-center justify-center rounded-full bg-aia-orange text-white shadow-[0_10px_30px_rgba(218,112,46,0.35)] transition duration-300 group-hover:scale-[1.04] sm:size-[60px]">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden className="size-6 sm:size-7">
          <rect x="7" y="8" width="18" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="13" cy="15" r="1.4" fill="currentColor" />
          <circle cx="19" cy="15" r="1.4" fill="currentColor" />
          <path d="M12 20h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 8V5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="16" cy="4" r="1.3" fill="currentColor" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-aia-orange">
          2
        </span>
      </span>
    </button>
  );
}

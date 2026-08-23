"use client";

export function AssistChip() {
  return (
    <button
      type="button"
      data-aia-assist
      className="group fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-[max(1.5rem,env(safe-area-inset-left))] z-30"
      aria-label="Open AIA assistant"
    >
      <span className="assist-pulse relative flex size-[60px] items-center justify-center rounded-full bg-aia-orange text-white shadow-[0_10px_30px_rgba(var(--aia-accent-rgb),0.35)] transition duration-300 group-hover:scale-[1.04]">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
          <rect x="6.5" y="9" width="19" height="15" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="13" cy="16.5" r="1.5" fill="currentColor" />
          <circle cx="19" cy="16.5" r="1.5" fill="currentColor" />
          <path d="M12.5 21.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 9V5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="16" cy="4.2" r="1.35" fill="currentColor" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-aia-orange">
          2
        </span>
      </span>
    </button>
  );
}

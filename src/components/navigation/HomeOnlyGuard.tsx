"use client";

import { useEffect } from "react";
import { isHomeOnlyAllowedHref } from "@/lib/home-only";

function markLink(el: HTMLAnchorElement) {
  const href = el.getAttribute("href");
  const allowed = isHomeOnlyAllowedHref(href);
  el.dataset.homeOnly = allowed ? "allowed" : "disabled";
  if (allowed) {
    el.removeAttribute("aria-disabled");
    if (el.tabIndex < 0) el.removeAttribute("tabindex");
  } else {
    el.setAttribute("aria-disabled", "true");
    el.tabIndex = -1;
  }
}

/** Blocks navigation away from home; keeps all button/link styling unchanged. */
export function HomeOnlyGuard() {
  useEffect(() => {
    const scan = () => {
      document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(markLink);
    };

    scan();

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (isHomeOnlyAllowedHref(anchor.getAttribute("href"))) return;
      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener("click", onClick, true);

    const observer = new MutationObserver(() => scan());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    return () => {
      document.removeEventListener("click", onClick, true);
      observer.disconnect();
    };
  }, []);

  return null;
}

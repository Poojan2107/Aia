# -*- coding: utf-8 -*-
"""Full crawl of aiaengineering.com -> JSON inventory + Word sitemap (nothing left out)."""
from __future__ import annotations

import json
import re
import html as html_lib
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse, urlunparse

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
JSON_OUT = ROOT / "docs" / "AIA-Engineering-Full-Sitemap-Inventory.json"
DOC_OUT = ROOT / "docs" / "AIA-Engineering-Existing-Website-Sitemap.docx"
BASE = "https://aiaengineering.com"

SITEMAP_FILES = [
    f"{BASE}/post-sitemap.xml",
    f"{BASE}/page-sitemap.xml",
    f"{BASE}/board_of_director-sitemap.xml",
    f"{BASE}/commitee_of_board-sitemap.xml",
    f"{BASE}/news-sitemap.xml",
    f"{BASE}/career-sitemap.xml",
    f"{BASE}/case_study-sitemap.xml",
    f"{BASE}/category-sitemap.xml",
]

LOCALES = ["cn", "fr", "ru", "es"]

SKIP_EXT_ASSET = re.compile(
    r"\.(css|js|map|woff2?|ttf|eot|ico)$", re.I
)
DOC_EXT = re.compile(r"\.(pdf|docx?|xlsx?|pptx?|zip|csv)$", re.I)
IMG_EXT = re.compile(r"\.(png|jpe?g|webp|gif|svg)$", re.I)
MEDIA_EXT = re.compile(r"\.(mp4|webm|mp3|wav)$", re.I)


def norm(url: str, base: str = BASE) -> str | None:
    try:
        u = urlparse(urljoin(base, url))
        if not u.hostname or not u.hostname.endswith("aiaengineering.com"):
            return None
        # strip fragment & default ports
        path = u.path or "/"
        # collapse empty
        cleaned = urlunparse(("https", "aiaengineering.com", path, "", u.query, ""))
        return cleaned
    except Exception:
        return None


def path_of(url: str) -> str:
    return urlparse(url).path or "/"


def classify(url: str) -> str:
    p = path_of(url).lower()
    q = urlparse(url).query
    if DOC_EXT.search(p):
        return "document"
    if IMG_EXT.search(p):
        return "image"
    if MEDIA_EXT.search(p):
        return "media"
    if SKIP_EXT_ASSET.search(p):
        return "asset"
    if "/wp-content/themes/" in p or "/wp-includes/" in p:
        return "asset"
    if "/wp-json" in p or "xmlrpc" in p or p.endswith("/feed") or "/feed/" in p:
        return "system"
    if "sitemap" in p:
        return "sitemap"
    if "/board_of_director/" in p:
        return "board_profile"
    if "/commitee_of_board/" in p:
        return "committee"
    if "/case_study/" in p:
        return "case_study"
    if p.startswith("/career/") or p.rstrip("/") == "/careers":
        return "career"
    if "/news/" in p or p.rstrip("/") == "/news-updates":
        return "news"
    if "/category/" in p:
        return "category"
    if "/investor-" in p or "invertor-" in p:
        return "investor"
    if p.rstrip("/") in ("/cn", "/fr", "/ru", "/es"):
        return "locale_home"
    if p.startswith(("/cn/", "/fr/", "/ru/", "/es/")):
        # nested type
        rest = re.sub(r"^/(cn|fr|ru|es)", "", p)
        sub = classify(BASE + rest)
        if sub in ("page", "locale_home"):
            return "locale_page"
        return f"locale_{sub}" if not sub.startswith("locale_") else sub
    if "/wp-content/uploads/" in p:
        return "upload"
    if q:
        return "page_with_query"
    return "page"


def title_from_html(html: str) -> str:
    og = re.search(
        r'property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']', html, re.I
    ) or re.search(
        r'content=["\']([^"\']+)["\'][^>]*property=["\']og:title["\']', html, re.I
    )
    h1 = re.search(r"<h1[^>]*>([\s\S]*?)</h1>", html, re.I)
    title = re.search(r"<title[^>]*>([^<]+)</title>", html, re.I)
    raw = ""
    if og:
        raw = og.group(1)
    elif h1:
        raw = re.sub(r"<[^>]+>", "", h1.group(1))
    elif title:
        raw = title.group(1)
    return html_lib.unescape(raw).replace("\xa0", " ").strip()[:180]


def extract_locs(xml: str) -> list[tuple[str, str]]:
    locs = re.findall(r"<loc>([^<]+)</loc>", xml)
    mods = re.findall(r"<lastmod>([^<]+)</lastmod>", xml)
    out = []
    for i, loc in enumerate(locs):
        mod = mods[i][:10] if i < len(mods) else ""
        out.append((loc, mod))
    return out


def extract_links(html: str, base_url: str) -> set[str]:
    found: set[str] = set()
    for m in re.finditer(r"""(?:href|src)=["']([^"']+)["']""", html, re.I):
        n = norm(m.group(1), base_url)
        if n:
            found.add(n)
    # bare URLs
    for m in re.finditer(r"https?://(?:www\.)?aiaengineering\.com/[^\s\"'<>]+", html, re.I):
        n = norm(m.group(0))
        if n:
            found.add(n)
    return found


def english_path(url: str) -> str | None:
    p = path_of(url)
    m = re.match(r"^/(cn|fr|ru|es)(/.*)?$", p)
    if m:
        return m.group(2) or "/"
    return p


def crawl() -> dict:
    inventory: dict[str, dict] = {}

    def upsert(url: str, **kwargs):
        n = norm(url)
        if not n:
            return
        # drop pure assets from primary inventory? keep them separately
        row = inventory.setdefault(
            n,
            {
                "url": n,
                "path": path_of(n),
                "type": classify(n),
                "source": set(),
                "lastmod": "",
                "status": "",
                "title": "",
            },
        )
        if "source" in kwargs and kwargs["source"]:
            if isinstance(row["source"], set):
                row["source"].add(kwargs["source"])
            else:
                row["source"] = {kwargs["source"]}
        for k, v in kwargs.items():
            if k == "source":
                continue
            if v not in ("", None):
                row[k] = v
        row["type"] = classify(n)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
        )
        page = context.new_page()
        # Pass Anubis by loading homepage first
        print("Opening homepage (bot challenge)...")
        page.goto(f"{BASE}/", wait_until="domcontentloaded", timeout=120000)
        page.wait_for_timeout(4000)
        # wait until not challenge
        for _ in range(30):
            if "Checking your browser" not in (page.title() or ""):
                break
            page.wait_for_timeout(1000)
        print("Home title:", page.title())

        # Fetch sitemaps via page.evaluate fetch (shares cookies)
        print("Fetching XML sitemaps...")
        for sm in SITEMAP_FILES:
            try:
                data = page.evaluate(
                    """async (u) => {
                        const r = await fetch(u, {credentials:'include'});
                        return {status:r.status, text: await r.text()};
                    }""",
                    sm,
                )
                if data["status"] != 200:
                    print("  FAIL", sm, data["status"])
                    continue
                pairs = extract_locs(data["text"])
                print(f"  {sm.split('/')[-1]}: {len(pairs)}")
                for loc, mod in pairs:
                    upsert(loc, source=sm.split("/")[-1], lastmod=mod)
            except Exception as e:
                print("  ERR", sm, e)

        for lang in LOCALES:
            upsert(f"{BASE}/{lang}/", source="locale-home")

        # BFS crawl content pages
        queue = [
            u
            for u, meta in inventory.items()
            if meta["type"]
            not in ("asset", "system", "image", "media", "sitemap", "document", "upload")
        ]
        seen = set(queue)
        crawled = 0
        max_crawl = 600
        print(f"BFS crawl starting with {len(queue)} seeds...")

        while queue and crawled < max_crawl:
            u = queue.pop(0)
            t = classify(u)
            if t in ("asset", "system", "image", "media", "sitemap", "document", "upload"):
                continue
            crawled += 1
            if crawled % 25 == 0:
                print(f"  crawled {crawled}, queue {len(queue)}, inventory {len(inventory)}")
            try:
                data = page.evaluate(
                    """async (u) => {
                        const r = await fetch(u, {credentials:'include'});
                        const text = await r.text();
                        return {status:r.status, text};
                    }""",
                    u,
                )
                status = data["status"]
                html = data["text"] if status == 200 else ""
                title = title_from_html(html) if html else ""
                upsert(u, status=status, title=title, source="crawl")
                if status != 200 or not html:
                    continue
                # skip if still challenge page
                if "Checking your browser before redirecting" in html[:500]:
                    continue
                for link in extract_links(html, u):
                    upsert(link, source=f"from:{path_of(u)}")
                    ct = classify(link)
                    if link not in seen and ct not in (
                        "asset",
                        "system",
                        "image",
                        "media",
                        "sitemap",
                    ):
                        seen.add(link)
                        if ct not in ("document", "upload"):
                            queue.append(link)
            except Exception as e:
                upsert(u, status=0, title=str(e)[:80], source="crawl-error")

        # Locale expand every English content URL
        print("Expanding locale mirrors...")
        english_urls = [
            u
            for u, meta in list(inventory.items())
            if not path_of(u).startswith(("/cn/", "/fr/", "/ru/", "/es/"))
            and meta["type"]
            not in ("asset", "system", "image", "media", "sitemap", "document", "upload")
        ]
        locale_to_probe = []
        for u in english_urls:
            ep = english_path(u)
            if not ep or ep == "/":
                continue
            for lang in LOCALES:
                lu = f"{BASE}/{lang}{ep}"
                if lu not in inventory:
                    upsert(lu, source="locale-expand")
                locale_to_probe.append(lu)

        # Probe locale URLs for status (batched in page)
        print(f"Probing {len(locale_to_probe)} locale URLs...")
        # unique
        locale_to_probe = sorted(set(locale_to_probe))
        for i in range(0, len(locale_to_probe), 30):
            batch = locale_to_probe[i : i + 30]
            results = page.evaluate(
                """async (urls) => {
                    const out = {};
                    await Promise.all(urls.map(async (u) => {
                        try {
                            const r = await fetch(u, {credentials:'include'});
                            const text = await r.text();
                            let title = '';
                            const og = text.match(/property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
                                || text.match(/content=["']([^"']+)["'][^>]*property=["']og:title["']/i);
                            const h1 = text.match(/<h1[^>]*>([\\s\\S]*?)<\\/h1>/i);
                            const t = text.match(/<title[^>]*>([^<]+)<\\/title>/i);
                            if (og) title = og[1];
                            else if (h1) title = h1[1].replace(/<[^>]+>/g,'');
                            else if (t) title = t[1];
                            out[u] = {status:r.status, title:(title||'').slice(0,160)};
                        } catch(e) { out[u] = {status:0, title:String(e)}; }
                    }));
                    return out;
                }""",
                batch,
            )
            for u, meta in results.items():
                upsert(
                    u,
                    status=meta.get("status", ""),
                    title=html_lib.unescape(meta.get("title") or ""),
                    source="locale-probe",
                )
            print(f"  probed {min(i+30, len(locale_to_probe))}/{len(locale_to_probe)}")

        browser.close()

    # serialize
    items = []
    for u, meta in inventory.items():
        src = meta["source"]
        if isinstance(src, set):
            src = sorted(src)
        items.append(
            {
                "url": meta["url"],
                "path": meta["path"],
                "type": meta["type"],
                "source": src,
                "lastmod": meta.get("lastmod") or "",
                "status": meta.get("status") if meta.get("status") != "" else "",
                "title": meta.get("title") or "",
            }
        )
    items.sort(key=lambda x: (x["path"], x["url"]))

    counts: dict[str, int] = defaultdict(int)
    for it in items:
        counts[it["type"]] += 1

    payload = {
        "capturedAt": datetime.now(timezone.utc).isoformat(),
        "base": BASE,
        "total": len(items),
        "counts": dict(sorted(counts.items())),
        "items": items,
    }
    JSON_OUT.parent.mkdir(parents=True, exist_ok=True)
    JSON_OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {JSON_OUT} ({len(items)} URLs)")
    return payload


def build_doc(payload: dict):
    doc = Document()
    for section in doc.sections:
        section.top_margin = Inches(0.65)
        section.bottom_margin = Inches(0.65)
        section.left_margin = Inches(0.75)
        section.right_margin = Inches(0.75)

    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(10)
    style._element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")

    def h(text, level=1):
        doc.add_heading(text, level=level)

    def p(text, bold=False, italic=False, size=10, color=None):
        para = doc.add_paragraph()
        run = para.add_run(text)
        run.bold = bold
        run.italic = italic
        run.font.size = Pt(size)
        if color:
            run.font.color.rgb = RGBColor(*color)

    def table(headers, rows, font=7):
        t = doc.add_table(rows=1 + len(rows), cols=len(headers))
        t.style = "Table Grid"
        for i, header in enumerate(headers):
            cell = t.rows[0].cells[i]
            cell.text = header
            for para in cell.paragraphs:
                for run in para.runs:
                    run.bold = True
                    run.font.size = Pt(font)
        for r_i, row in enumerate(rows):
            for c_i, val in enumerate(row):
                cell = t.rows[r_i + 1].cells[c_i]
                cell.text = str(val)
                for para in cell.paragraphs:
                    for run in para.runs:
                        run.font.size = Pt(font)
        doc.add_paragraph()

    items = payload["items"]
    counts = payload["counts"]

    # content-focused vs assets
    content_types = {
        "page",
        "page_with_query",
        "investor",
        "board_profile",
        "committee",
        "case_study",
        "career",
        "news",
        "category",
        "locale_home",
        "locale_page",
        "locale_investor",
        "locale_board_profile",
        "locale_committee",
        "locale_case_study",
        "locale_career",
        "locale_news",
        "locale_category",
        "document",
        "upload",
    }
    # include any locale_* dynamically
    for k in counts:
        if k.startswith("locale_") or k in content_types:
            content_types.add(k)

    content_items = [i for i in items if i["type"] in content_types or i["type"].startswith("locale_")]
    docs = [i for i in items if i["type"] == "document"]
    uploads = [i for i in items if i["type"] in ("upload", "image", "media")]
    # Keep images that are under uploads for media inventory; skip theme assets

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = title.add_run("AIA Engineering Limited")
    r.bold = True
    r.font.size = Pt(14)

    t2 = doc.add_paragraph()
    t2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = t2.add_run("Existing Website — COMPLETE Sitemap Inventory")
    r.bold = True
    r.font.size = Pt(18)

    s = doc.add_paragraph()
    s.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = s.add_run(
        f"https://aiaengineering.com/\n"
        f"Captured: {payload['capturedAt']}\n"
        f"Total discovered URLs: {payload['total']}  |  Content/locale/doc rows in tables below: {len(content_items)}"
    )
    r.font.size = Pt(10)

    h("1. What this file contains (nothing left out)")
    for b in [
        "Every URL from Rank Math XML sitemaps (pages, posts, board, committees, news, careers, case studies, categories).",
        "Every additional internal route discovered by crawling those pages (inner links).",
        "All locale mirrors expanded and probed for CN / FR / RU / ES (status codes included).",
        "All PDF/DOC/XLS/PPT/ZIP/CSV documents linked from crawled pages.",
        "Upload/media URLs discovered from page HTML (images/files under /wp-content/uploads/).",
        "Companion JSON with the raw machine-readable inventory: docs/AIA-Engineering-Full-Sitemap-Inventory.json",
    ]:
        doc.add_paragraph(b, style="List Bullet")

    h("2. Counts by type")
    table(
        ["Type", "Count"],
        [[k, str(v)] for k, v in sorted(counts.items(), key=lambda x: (-x[1], x[0]))],
        font=8,
    )

    def section_table(heading, subset, include_title=True):
        h(heading)
        p(f"{len(subset)} URLs", italic=True, size=9)
        rows = []
        for idx, it in enumerate(subset, 1):
            src = it["source"]
            if isinstance(src, list):
                src = ", ".join(src[:3]) + ("…" if len(src) > 3 else "")
            name = it.get("title") or it["path"]
            if include_title:
                rows.append(
                    [
                        str(idx),
                        it["type"],
                        str(it.get("status") or ""),
                        name[:70],
                        it["url"],
                        it.get("lastmod") or "",
                    ]
                )
            else:
                rows.append(
                    [str(idx), it["type"], str(it.get("status") or ""), it["url"], src[:40]]
                )
        if include_title:
            table(["#", "Type", "HTTP", "Title / name", "URL", "Lastmod"], rows, font=6)
        else:
            table(["#", "Type", "HTTP", "URL", "Source"], rows, font=6)

    # Grouped sections
    def by_types(*types):
        return [i for i in items if i["type"] in types]

    def by_prefix(*prefixes):
        return [i for i in items if any(i["path"].startswith(p) for p in prefixes)]

    english_pages = [
        i
        for i in items
        if i["type"] in ("page", "page_with_query", "investor", "news", "career", "category")
        and not i["path"].startswith(("/cn/", "/fr/", "/ru/", "/es/"))
    ]
    section_table("3. English pages / hubs / investor / news / careers / categories", english_pages)

    section_table(
        "4. Board of Directors profiles",
        by_types("board_profile"),
    )
    section_table("5. Board committees", by_types("committee"))
    section_table("6. Case studies", by_types("case_study"))
    section_table(
        "7. Documents (PDF and office files linked from the site)",
        docs,
        include_title=False,
    )

    # Locales — full lists
    for lang, label in [("cn", "Chinese"), ("fr", "French"), ("ru", "Russian"), ("es", "Spanish")]:
        subset = [
            i
            for i in items
            if i["path"] == f"/{lang}" or i["path"].startswith(f"/{lang}/")
            and i["type"] not in ("asset", "system", "image", "media", "sitemap")
        ]
        # Prefer content-ish
        subset = [
            i
            for i in subset
            if i["type"] not in ("asset", "system", "image", "media", "sitemap")
        ]
        section_table(f"8.{label[0].lower()} Locale — {label} (/{lang}/)", subset)

    # Uploads / images discovered (content media)
    media_rows = [
        i
        for i in items
        if i["type"] in ("upload", "image", "media") and "/wp-content/uploads/" in i["path"]
    ]
    h("9. Media & uploads discovered from page HTML")
    p(
        f"{len(media_rows)} files under /wp-content/uploads/ linked from crawled pages "
        "(theme CSS/JS excluded).",
        italic=True,
        size=9,
    )
    table(
        ["#", "Type", "URL"],
        [[str(i + 1), m["type"], m["url"]] for i, m in enumerate(media_rows)],
        font=6,
    )

    # Master flat list — ALL non-asset URLs
    master = [
        i
        for i in items
        if i["type"] not in ("asset", "system", "sitemap")
    ]
    h("10. MASTER FLAT LIST — every non-asset URL")
    p(f"{len(master)} URLs (pages, locales, documents, uploads/media). Theme assets excluded.", italic=True)
    rows = []
    for idx, it in enumerate(master, 1):
        rows.append(
            [
                str(idx),
                it["type"],
                str(it.get("status") or ""),
                (it.get("title") or "")[:50],
                it["url"],
            ]
        )
    table(["#", "Type", "HTTP", "Title", "URL"], rows, font=6)

    h("11. Notes")
    for b in [
        "HTTP blank means the URL was discovered (sitemap/link/locale-expand) but not individually status-probed.",
        "Locale-expanded URLs were HTTP-probed; 404s are still listed so migration can decide redirects.",
        "Duplicate board profile slugs (-2, spelling variants) are included because they exist in the public sitemap.",
        "Re-run scripts/crawl-aia-full-sitemap.py before cutover — the live site changes.",
    ]:
        doc.add_paragraph(b, style="List Bullet")

    p(
        f"Complete inventory JSON: {JSON_OUT.name}  |  Generated automatically from live crawl",
        italic=True,
        size=9,
        color=(0x55, 0x55, 0x55),
    )

    doc.save(str(DOC_OUT))
    print(f"Wrote {DOC_OUT}")


if __name__ == "__main__":
    data = crawl()
    build_doc(data)

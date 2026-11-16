"""Hi-Cr grinding media for the homepage MOC showcase (all "Hi-Cr Grinding Media" tabs).

AIA has no CAD for grinding media (STEP file matrix: "NA"); AIA (Malay, 2026-11-17) approved
showing balls that look like grinding media. Eleven cast balls arranged exactly as on AIA's own
grinding media photo (see PHOTO below); each ball is a near-perfect sphere with a slight cast
irregularity and exact sphere normals. Deterministic (fixed seed).

Output: models/_extracted/grinding-media.json (git-ignored), read by scripts/cad/convert.mjs.
Usage: python -I scripts/cad/grinding-media.py
"""
import json
import math
import random

rng = random.Random(11)


def icosphere(level):
    t = (1 + 5 ** 0.5) / 2
    v = [(-1, t, 0), (1, t, 0), (-1, -t, 0), (1, -t, 0), (0, -1, t), (0, 1, t), (0, -1, -t), (0, 1, -t),
         (t, 0, -1), (t, 0, 1), (-t, 0, -1), (-t, 0, 1)]
    v = [tuple(c / math.sqrt(sum(x * x for x in p)) for c in p) for p in v]
    f = [(0, 11, 5), (0, 5, 1), (0, 1, 7), (0, 7, 10), (0, 10, 11), (1, 5, 9), (5, 11, 4), (11, 10, 2), (10, 7, 6),
         (7, 1, 8), (3, 9, 4), (3, 4, 2), (3, 2, 6), (3, 6, 8), (3, 8, 9), (4, 9, 5), (2, 4, 11), (6, 2, 10), (8, 6, 7), (9, 8, 1)]
    for _ in range(level):
        mid = {}
        def m(a, b):
            k = (min(a, b), max(a, b))
            if k not in mid:
                p = [(v[a][i] + v[b][i]) / 2 for i in range(3)]
                l = math.sqrt(sum(x * x for x in p))
                v.append(tuple(x / l for x in p))
                mid[k] = len(v) - 1
            return mid[k]
        nf = []
        for a, b, c in f:
            ab, bc, ca = m(a, b), m(b, c), m(c, a)
            nf += [(a, ab, ca), (b, bc, ab), (c, ca, bc), (ab, bc, ca)]
        f = nf
    return v, f


def cast_ball(r, seed):
    """Unit icosphere scaled to radius r, with low-frequency bumps (about 1.2% of r)."""
    v, f = icosphere(3)
    g = random.Random(seed)
    waves = [(tuple(g.gauss(0, 1) for _ in range(3)), g.uniform(2, 4), g.uniform(0, 6.28)) for _ in range(4)]
    out = []
    for p in v:
        bump = sum(math.sin(k * sum(d[i] * p[i] for i in range(3)) / math.sqrt(sum(x * x for x in d)) + ph) for d, k, ph in waves)
        s = r * (1 + 0.002 * bump / len(waves) * 2)
        out.append(tuple(c * s for c in p))
    return out, f


# The arrangement of AIA's own grinding media photo (aiaengineering.com/ball-mill/), ball for ball:
# each ball's centre and radius traced on the photo (px, 1400 x 1009 version in
# public/images/products/aia/grinding-media-hicr.webp), listed back to front. Depth is chosen so that
# each ball sits just in front of the balls it overlaps in the photo, never intersecting them.
PHOTO = [  # (name, cx, cy, r) back to front
    ("top left small", 680, 285, 140), ("top right large", 1031, 290, 303), ("left back", 440, 455, 128),
    ("centre back small", 745, 525, 98), ("right edge", 1287, 629, 106), ("left large", 308, 555, 202),
    ("centre behind", 735, 665, 165), ("right middle", 1122, 630, 195), ("left lower", 340, 735, 180),
    ("front centre", 814, 754, 214), ("bottom left", 133, 875, 132),
]
MM_PER_PX = 0.25
placed = []
for name, cx, cy, r in PHOTO:
    x, y, rr = (cx - 700) * MM_PER_PX, (1009 - cy) * MM_PER_PX, r * MM_PER_PX
    z = 0.0
    for (px, py, pz, pr) in placed:  # in front of every overlapping ball behind it
        d2 = (x - px) ** 2 + (y - py) ** 2
        if d2 < (rr + pr) ** 2:
            z = max(z, pz + math.sqrt((rr + pr) ** 2 - d2) + 0.5)
    placed.append((x, y, z, rr))
lift = -min(py - pr for (_, py, _, pr) in placed)  # lowest ball sits on the floor
placed = [(x, y + lift, z, r) for (x, y, z, r) in placed]

parts = []
for n, (x, y, z, r) in enumerate(placed):
    pts, faces = cast_ball(r, n)
    parts.append({
        "name": f"grinding ball {2 * r:.0f} mm #{n + 1}",
        "positions": [c for p in pts for c in (p[0] + x, p[1] + y, p[2] + z)],
        # Exact sphere normals (smooth highlights on a light mesh).
        "normals": [c / math.sqrt(p[0] ** 2 + p[1] ** 2 + p[2] ** 2) for p in pts for c in p],
        "tris": [i2 for t in faces for i2 in t],
    })

out = "models/_extracted/grinding-media.json"
json.dump({"source": "Generated (scripts/cad/grinding-media.py): AIA has no grinding media CAD", "units": "mm", "parts": parts}, open(out, "w"))
print("wrote", out, len(parts), "balls,", sum(len(p["tris"]) // 3 for p in parts), "triangles")

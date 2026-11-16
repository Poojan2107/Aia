"""Verti Mill screw for the homepage MOC showcase (Mining > Hi-Cr with Sintercast).

Input: the parts decoded from AIA's "Verty Mill_Assem_Open Door.pdf" (compressed PRC, decoded
offline with pdf-3d-extractor's prc-decoder.js into a JSON of parts: name, visible, positions, tris).
Output: models/_extracted/verti-mill-screw.json (git-ignored), read by scripts/cad/convert.mjs.

Keeps the visible parts of SHAFT_CURVE_LINER_Assem_16461 (flight liners, shoe liners, curve
liners, shaft) without bolts. AIA's "for Web Site" shaft part ends at y = 426 mm, above the
liners, although the shaft runs through the whole screw (AIA's own Verti Mill renders): it is
continued here at AIA's measured radius (367 mm) and axis, down to the bottom of the shoe liners,
as one separate part named "SHAFT continuation". Nothing else is added or changed.

Usage: python -I scripts/cad/verti-screw.py <decoded-assembly.json>
"""
import json
import math
import sys

src = json.load(open(sys.argv[1], encoding="utf8"))
parts = [
    {"name": p["name"], "positions": p["positions"], "tris": p["tris"]}
    for p in src["parts"]
    if p["visible"] and "SHAFT_CURVE_LINER" in p["name"] and "BOLT" not in p["name"]
]

shaft = next(p for p in parts if "SHAFT & CRUVE" in p["name"] and p["name"].endswith("CirPattern1"))
P = shaft["positions"]
pts = [(P[i], P[i + 1], P[i + 2]) for i in range(0, len(P), 3)]
y0 = min(p[1] for p in pts)  # bottom of AIA's shaft part
cap = [p for p in pts if abs(p[1] - y0) < 1]
cx = sum(p[0] for p in cap) / len(cap)
cz = sum(p[2] for p in cap) / len(cap)
r = max(math.hypot(p[0] - cx, p[2] - cz) for p in cap)
y1 = min(v for p in parts for v in p["positions"][1::3])  # bottom of the shoe liners

N = 96
pos, tris = [], []
for y in (y0, y1):
    for k in range(N):
        a = 2 * math.pi * k / N
        pos += [cx + r * math.cos(a), y, cz + r * math.sin(a)]
pos += [cx, y1, cz]  # bottom cap centre
c = 2 * N
for k in range(N):
    a, b = k, (k + 1) % N
    tris += [a, N + a, N + b, a, N + b, b]  # side wall (outward winding fixed by convert.mjs)
    tris += [N + a, c, N + b]  # bottom cap
parts.append({"name": "SHAFT continuation (AIA shaft CirPattern1, r=%.0f mm)" % r, "positions": pos, "tris": tris})

out = "models/_extracted/verti-mill-screw.json"
json.dump({"source": "Verty Mill_Assem_Open Door.pdf (AIA) > SHAFT_CURVE_LINER_Assem_16461; see scripts/cad/verti-screw.py",
           "units": "mm", "parts": parts}, open(out, "w"))
print("wrote", out, len(parts), "parts; shaft r=%.0f mm, continued from y=%.0f to y=%.0f" % (r, y0, y1))

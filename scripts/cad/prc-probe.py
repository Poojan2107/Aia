"""Local probe: extract the PRC stream from an AIA 3D PDF, split its zlib sections and look for
PRC tessellation entity codes (ISO 14739-1). Usage: python -I scripts/cad/prc-probe.py <pdf>"""
import sys, zlib, fitz

sys.stdout.reconfigure(encoding="utf-8")
doc = fitz.open(sys.argv[1])
raw = None
for x in range(1, doc.xref_length()):
    try:
        if "/PRC" in doc.xref_object(x):
            raw = doc.xref_stream(x)
            break
    except Exception:
        pass
print("PRC bytes", len(raw), "header", raw[:3], "versions", int.from_bytes(raw[3:7], "little"), int.from_bytes(raw[7:11], "little"))

# Find zlib sections (start byte 0x78 followed by a valid stream)
sections = []
i = 0
while i < len(raw):
    if raw[i] == 0x78:
        try:
            d = zlib.decompressobj()
            out = d.decompress(raw[i:])
            used = len(raw) - i - len(d.unused_data)
            if len(out) > 8 and d.eof:
                sections.append((i, used, out))
                i += used
                continue
        except Exception:
            pass
    i += 1


def bits_of(data):
    for byte in data:
        for k in range(7, -1, -1):
            yield (byte >> k) & 1


def uint_pattern(v):
    """PRC WriteUnsignedInteger: for each byte, a 1 bit then 8 bits; then a 0 bit."""
    out = []
    while v:
        out.append(1)
        out += [(v & 0xFF) >> k & 1 for k in range(7, -1, -1)]
        v >>= 8
    out.append(0)
    return out


codes = {170: "TESS", 171: "TESS_3D", 172: "TESS_3D_Compressed", 173: "TESS_Face", 174: "TESS_3D_Wire", 175: "TESS_Markup"}
for n, (off, used, out) in enumerate(sections):
    b = list(bits_of(out))
    s = "".join(map(str, b))
    found = {name: s.count("".join(map(str, uint_pattern(code)))) for code, name in codes.items()}
    print(f"section {n}: at {off}, {used} B compressed -> {len(out)} B   tess-code hits: {found}")

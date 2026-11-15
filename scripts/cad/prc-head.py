"""Local: read the first PRC bitstream values of each section of an AIA 3D PDF."""
import sys, zlib, fitz

sys.stdout.reconfigure(encoding="utf-8")
doc = fitz.open(sys.argv[1])
raw = next(doc.xref_stream(x) for x in range(1, doc.xref_length()) if "/PRC" in (doc.xref_object(x) or ""))
secs, i = [], 0
while i < len(raw):
    if raw[i] == 0x78:
        try:
            d = zlib.decompressobj(); out = d.decompress(raw[i:])
            if d.eof and len(out) > 8:
                secs.append(out); i += len(raw) - i - len(d.unused_data); continue
        except Exception:
            pass
    i += 1


class Bits:
    def __init__(self, data): self.d, self.p = data, 0
    def bit(self):
        b = (self.d[self.p >> 3] >> (7 - (self.p & 7))) & 1; self.p += 1; return b
    def bits(self, n):
        v = 0
        for _ in range(n): v = (v << 1) | self.bit()
        return v
    def uint(self):
        v, shift = 0, 0
        while self.bit():
            v |= self.bits(8) << shift; shift += 8
        return v


for n, s in enumerate(secs):
    b = Bits(s)
    vals = []
    try:
        for _ in range(12): vals.append(b.uint())
    except IndexError:
        pass
    print(f"section {n} ({len(s)} B): first uints {vals}")


def string(b):
    if not b.bit():
        return None
    n = b.uint()
    return bytes(b.bits(8) for _ in range(n)).decode("latin-1")


print("--- tessellation section header")
t = Bits(secs[2])
print("type", t.uint())                     # 305 = FileStructureTessellation
print("attributes", t.uint())               # attribute count
reuse = t.bit()
print("name reuse", reuse, "name", None if reuse else repr(string(t)))
for k in range(4):
    print("next uint", t.uint())

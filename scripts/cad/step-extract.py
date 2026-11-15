"""Local, offline: cut one named part out of a large AIA STEP assembly into its own STEP file.
Follows the part's PRODUCT → shape representation and copies every entity it references.
Usage: python -I scripts/cad/step-extract.py <assembly.STEP> <PRODUCT name> <out.STEP>"""
import re, sys

src, name, out = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(src, encoding="latin-1").read()
header = text[: text.index("DATA;")]
body = text[text.index("DATA;") + 5 : text.rindex("ENDSEC;")]

# Entities: "#123 = TYPE ( ... ) ;" possibly spanning lines.
ents = {}
for m in re.finditer(r"#(\d+)\s*=\s*(.*?);\s*(?=#\d+\s*=|$)", body, re.S):
    ents[int(m.group(1))] = m.group(2).strip()
print("entities", len(ents))

ref = re.compile(r"#(\d+)")
by_type = {}
for k, v in ents.items():
    t = re.match(r"\(?\s*([A-Z_0-9]+)", v)
    if t:
        by_type.setdefault(t.group(1), []).append(k)

# PRODUCT('name' ...) -> PRODUCT_DEFINITION_FORMATION -> PRODUCT_DEFINITION -> PRODUCT_DEFINITION_SHAPE
prod = next(k for k in by_type["PRODUCT"] if re.match(r"PRODUCT\s*\(\s*'" + re.escape(name) + "'", ents[k]))
pdf = next(k for k in by_type.get("PRODUCT_DEFINITION_FORMATION_WITH_SPECIFIED_SOURCE", []) + by_type.get("PRODUCT_DEFINITION_FORMATION", []) if f"#{prod}" in ref.sub(lambda m: m.group(0) + " ", ents[k]).split() or re.search(rf"#{prod}\b", ents[k]))
pd = next(k for k in by_type["PRODUCT_DEFINITION"] if re.search(rf"#{pdf}\b", ents[k]))
pds = [k for k in by_type["PRODUCT_DEFINITION_SHAPE"] if re.search(rf"#{pd}\b", ents[k])]
sdr = [k for k in by_type["SHAPE_DEFINITION_REPRESENTATION"] if any(re.search(rf"#{p}\b", ents[k]) for p in pds)]
roots = set(sdr) | set(pds) | {pd, pdf, prod}
# Styling (colours) that points at this part's items is optional; geometry is what we need.

def close(start):
    stack = list(start)
    while stack:
        k = stack.pop()
        if k in keep or k not in ents:
            continue
        keep.add(k)
        stack.extend(int(r) for r in ref.findall(ents[k]))

keep = set()
close(roots)
# SolidWorks links a part's B-rep to its shape representation with a plain
# SHAPE_REPRESENTATION_RELATIONSHIP that points *at* the representation: follow those back.
rels = [k for k in by_type.get("SHAPE_REPRESENTATION_RELATIONSHIP", []) if "TRANSFORMATION" not in ents[k]]
changed = True
while changed:
    changed = False
    for k in rels:
        if k in keep:
            continue
        refs = {int(r) for r in ref.findall(ents[k])}
        if refs & keep:
            close([k]); changed = True

with open(out, "w", encoding="latin-1") as f:
    f.write(header + "DATA;\n")
    for k in sorted(keep):
        f.write(f"#{k} = {ents[k]};\n")
    f.write("ENDSEC;\nEND-ISO-10303-21;\n")
print(f"part {name}: kept {len(keep)} entities -> {out}")

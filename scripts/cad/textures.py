"""Generate the studio lighting environment and surface-grain textures for the 3D products.
All procedural, generated locally. Usage: python -I scripts/cad/textures.py
- public/models/env/studio.jpg      equirect studio (soft boxes) for realistic metal reflections
- scripts/cad/tex/cast-normal.png    sand-cast grain normal map (tiling)
- scripts/cad/tex/cast-rough.png     roughness variation (tiling)
- scripts/cad/tex/rubber-normal.png  fine moulded-rubber grain normal map (tiling)
"""
import os
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TEX = os.path.join(ROOT, "scripts", "cad", "tex")
ENV = os.path.join(ROOT, "public", "models", "env")
os.makedirs(TEX, exist_ok=True)
os.makedirs(ENV, exist_ok=True)
rng = np.random.default_rng(7)


def tileable_noise(size, scales):
    """Sum of wrapped, blurred white-noise octaves -> seamless 0..1 field."""
    acc = np.zeros((size, size))
    for blur, amp in scales:
        n = rng.random((size, size))
        img = Image.fromarray((n * 255).astype(np.uint8))
        # Wrap-aware blur: tile 3x3, blur, crop the centre.
        big = Image.new("L", (size * 3, size * 3))
        for i in range(3):
            for j in range(3):
                big.paste(img, (i * size, j * size))
        big = big.filter(ImageFilter.GaussianBlur(blur)).crop((size, size, size * 2, size * 2))
        a = np.asarray(big, dtype=float) / 255
        acc += (a - a.mean()) / (a.std() + 1e-6) * amp
    acc = (acc - acc.min()) / (acc.max() - acc.min())
    return acc


def normal_from_height(h, strength):
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * strength
    dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * strength
    n = np.dstack([-dx, -dy, np.ones_like(h)])
    n /= np.linalg.norm(n, axis=2, keepdims=True)
    return Image.fromarray(((n * 0.5 + 0.5) * 255).astype(np.uint8), "RGB")


# Sand-cast iron: fine, even sand grain with a little soft pitting (AIA's photos show an almost
# smooth satin casting skin, not a hammered surface).
cast_h = tileable_noise(512, [(0.5, 1.0), (1.1, 0.45), (3, 0.12)])
normal_from_height(cast_h, 3.2).save(os.path.join(TEX, "cast-normal.png"))
rough = 0.57 + (tileable_noise(512, [(2.5, 1.0), (14, 0.7)]) - 0.5) * 0.18  # ~0.48..0.66
Image.fromarray((np.clip(rough, 0, 1) * 255).astype(np.uint8)).convert("RGB").save(os.path.join(TEX, "cast-rough.png"))

# Moulded rubber: very fine, soft texture.
rub_h = tileable_noise(256, [(0.8, 1.0), (2.5, 0.4)])
normal_from_height(rub_h, 2.2).save(os.path.join(TEX, "rubber-normal.png"))

# Studio environment (equirect 2048x1024): dark grey room, large soft key box, rim strip, floor bounce.
W, H = 2048, 1024
y, x = np.mgrid[0:H, 0:W]
lat = (0.5 - y / H) * np.pi          # +up
lon = (x / W) * 2 * np.pi - np.pi
# Light-grey product studio (cast metal mostly reflects its surroundings): bright cove, softer floor.
env = np.full((H, W), 0.46) + 0.14 * np.clip(lat / (np.pi / 2), 0, 1)
env -= 0.16 * np.clip(-lat / (np.pi / 2), 0, 1)


def softbox(lon0, lat0, w, h, power):
    d_lon = np.angle(np.exp(1j * (lon - lon0)))
    m = np.exp(-((d_lon / w) ** 8) - (((lat - lat0) / h) ** 8))
    return m * power


env += softbox(np.radians(35), np.radians(38), np.radians(28), np.radians(18), 0.9)   # key, upper front-right
env += softbox(np.radians(-120), np.radians(22), np.radians(10), np.radians(30), 0.6)  # rim strip, back-left
env += softbox(np.radians(-30), np.radians(55), np.radians(40), np.radians(12), 0.35)  # broad top fill
env += softbox(np.radians(150), np.radians(5), np.radians(20), np.radians(8), 0.3)    # kicker
img = np.clip(env, 0, 1)
rgb = np.dstack([img * 0.98, img * 0.99, img * 1.02])
Image.fromarray((np.clip(rgb, 0, 1) * 255).astype(np.uint8), "RGB").filter(ImageFilter.GaussianBlur(2)).save(
    os.path.join(TEX, "studio-ldr.jpg"), quality=90)  # reference only; the site uses studio.hdr
print("textures and environment written")

# Web versions embedded in the GLBs: 256 px JPEG; metallic-roughness packed (G = roughness, B = metallic).
def small(name, img):
    img.resize((256, 256), Image.LANCZOS).save(os.path.join(TEX, name), quality=88)

small("cast-normal.jpg", Image.open(os.path.join(TEX, "cast-normal.png")))
r = Image.open(os.path.join(TEX, "cast-rough.png")).convert("L")
small("cast-mr.jpg", Image.merge("RGB", (Image.new("L", r.size, 0), r, Image.new("L", r.size, 255))))
small("rubber-normal.jpg", Image.open(os.path.join(TEX, "rubber-normal.png")))
# Cast-iron tone mottling (base colour multiplier 0.86..1.0), soft blotches at casting scale.
mott = tileable_noise(512, [(22, 1.0), (8, 0.45), (1.2, 0.12)])
tone = 0.86 + mott * 0.14
Image.fromarray((tone * 255).astype(np.uint8)).convert("RGB").resize((256, 256), Image.LANCZOS).save(os.path.join(TEX, "cast-color.jpg"), quality=88)
print("web textures written")


# HDR studio (Radiance RGBE): soft boxes several times brighter than the room, as in a real
# product studio, so dark cast metal still shows its form. This is what the viewer uses.
def write_hdr(path, rgb):
    h, w, _ = rgb.shape
    m = rgb.max(axis=2)
    e = np.where(m > 1e-32, np.floor(np.log2(np.maximum(m, 1e-32))) + 1, 0)
    scale = np.where(m > 1e-32, 256.0 / np.exp2(e), 0)
    rgbe = np.zeros((h, w, 4), np.uint8)
    rgbe[..., :3] = np.clip(rgb * scale[..., None], 0, 255).astype(np.uint8)
    rgbe[..., 3] = np.where(m > 1e-32, e + 128, 0).astype(np.uint8)
    with open(path, "wb") as f:
        f.write(b"#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n" + f"-Y {h} +X {w}\n".encode())
        f.write(rgbe.tobytes())

HW, HH = 256, 128
y2, x2 = np.mgrid[0:HH, 0:HW]
lat2 = (0.5 - y2 / HH) * np.pi
lon2 = (x2 / HW) * 2 * np.pi - np.pi
def box2(lon0, lat0, w, h, p):
    d = np.angle(np.exp(1j * (lon2 - lon0)))
    return np.exp(-((d / w) ** 8) - (((lat2 - lat0) / h) ** 8)) * p
room = 0.55 + 0.3 * np.clip(lat2 / (np.pi / 2), 0, 1) - 0.4 * np.clip(-lat2 / (np.pi / 2), 0, 1)
room += box2(np.radians(35), np.radians(38), np.radians(28), np.radians(18), 10.0)   # key
room += box2(np.radians(-120), np.radians(22), np.radians(10), np.radians(30), 3.5)  # rim
room += box2(np.radians(-30), np.radians(60), np.radians(45), np.radians(12), 2.0)   # top fill
room += box2(np.radians(150), np.radians(6), np.radians(22), np.radians(8), 1.5)     # kicker
write_hdr(os.path.join(ENV, "studio.hdr"), np.dstack([room * 0.98, room, room * 1.03]).astype(np.float32))
print("hdr written")

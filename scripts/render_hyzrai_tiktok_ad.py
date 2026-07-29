from __future__ import annotations

import math
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

import imageio
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "ads"
OUT_DIR.mkdir(parents=True, exist_ok=True)

WORDMARK = Path(r"C:\Users\Administrator\Downloads\HyzrAI-wordmark.png")
MARK = Path(r"C:\Users\Administrator\Downloads\HyzrAI-logo.png")
TEMPLATE_DIR = ROOT / "public" / "templates"

W, H = 1080, 1920
FPS = 30
DURATION = 15
FRAMES = FPS * DURATION

BG = (248, 249, 252)
INK = (8, 9, 13)
MUTED = (108, 111, 122)
FAINT = (236, 237, 242)
LINE = (222, 224, 232)
PURPLE = (103, 91, 255)
PURPLE_DARK = (76, 64, 214)
GREEN = (24, 167, 108)
CREAM = (239, 232, 218)


def clamp01(x: float) -> float:
    return max(0.0, min(1.0, x))


def ease(x: float) -> float:
    x = clamp01(x)
    return 1 - (1 - x) ** 3


def ease_in_out(x: float) -> float:
    x = clamp01(x)
    return 0.5 - 0.5 * math.cos(math.pi * x)


def between(t: float, start: float, end: float) -> float:
    return (t - start) / (end - start)


def lerp(a: float, b: float, p: float) -> float:
    return a + (b - a) * p


@lru_cache(maxsize=None)
def font(kind: str, size: int) -> ImageFont.FreeTypeFont:
    families = {
        "sans": [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"],
        "sans_bold": [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"],
        "serif": [r"C:\Windows\Fonts\georgia.ttf", r"C:\Windows\Fonts\times.ttf"],
        "serif_i": [r"C:\Windows\Fonts\georgiai.ttf", r"C:\Windows\Fonts\timesi.ttf"],
        "mono": [r"C:\Windows\Fonts\consola.ttf", r"C:\Windows\Fonts\cour.ttf"],
    }
    for path in families[kind]:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


F = {
    "hero": font("serif", 96),
    "hero_i": font("serif_i", 106),
    "h1": font("sans_bold", 76),
    "h2": font("sans_bold", 54),
    "h3": font("sans_bold", 36),
    "body": font("sans", 29),
    "body_bold": font("sans_bold", 29),
    "small": font("sans", 22),
    "small_bold": font("sans_bold", 22),
    "ui": font("sans", 18),
    "ui_bold": font("sans_bold", 18),
    "tiny": font("mono", 14),
}


@lru_cache(maxsize=256)
def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    return mask


@lru_cache(maxsize=256)
def shadow_bitmap(size: tuple[int, int], radius: int, blur: int, shadow: tuple[int, int, int, int]) -> Image.Image:
    sw, sh = size
    margin = blur * 3
    im = Image.new("RGBA", (sw + margin * 2, sh + margin * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((margin, margin, margin + sw, margin + sh), radius=radius, fill=shadow)
    return im.filter(ImageFilter.GaussianBlur(blur))


def shadow_card(
    canvas: Image.Image,
    box: tuple[int, int, int, int],
    radius: int = 34,
    fill: tuple[int, int, int, int] = (255, 255, 255, 255),
    outline: tuple[int, int, int, int] | None = (224, 226, 232, 255),
    blur: int = 24,
    shadow: tuple[int, int, int, int] = (18, 24, 36, 28),
    offset: tuple[int, int] = (0, 14),
) -> ImageDraw.ImageDraw:
    x1, y1, x2, y2 = box
    sw, sh = x2 - x1, y2 - y1
    if blur > 0:
        shad = shadow_bitmap((sw, sh), radius, blur, shadow)
        margin = blur * 3
        canvas.alpha_composite(shad, (x1 - margin + offset[0], y1 - margin + offset[1]))
    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=1 if outline else 0)
    return d


def text_center(d: ImageDraw.ImageDraw, xy: tuple[int, int], txt: str, fnt: ImageFont.FreeTypeFont, fill=INK) -> None:
    d.text(xy, txt, font=fnt, fill=fill, anchor="mm")


def text_width(txt: str, fnt: ImageFont.FreeTypeFont) -> int:
    bbox = ImageDraw.Draw(Image.new("RGB", (1, 1))).textbbox((0, 0), txt, font=fnt)
    return bbox[2] - bbox[0]


def paste_center(canvas: Image.Image, img: Image.Image, cx: int, cy: int, opacity: float = 1.0) -> None:
    layer = img.convert("RGBA")
    if opacity < 1:
        alpha = layer.getchannel("A").point(lambda a: int(a * opacity))
        layer.putalpha(alpha)
    canvas.alpha_composite(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2)))


@lru_cache(maxsize=32)
def brand_image(path_str: str, max_size: tuple[int, int], pad: int = 0) -> Image.Image:
    img = Image.open(path_str).convert("RGBA")
    arr = np.array(img)
    white = (arr[:, :, 0] > 244) & (arr[:, :, 1] > 244) & (arr[:, :, 2] > 244)
    arr[:, :, 3] = np.where(white, 0, arr[:, :, 3])
    img = Image.fromarray(arr, "RGBA")
    alpha = np.array(img.getchannel("A"))
    ys, xs = np.where(alpha > 8)
    if len(xs) and len(ys):
        img = img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    if pad:
        padded = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
        padded.alpha_composite(img, (pad, pad))
        img = padded
    scale = min(max_size[0] / img.width, max_size[1] / img.height)
    return img.resize((max(1, int(img.width * scale)), max(1, int(img.height * scale))), Image.Resampling.LANCZOS)


@lru_cache(maxsize=96)
def cover_image(path_str: str, size: tuple[int, int], pos: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    img = Image.open(path_str).convert("RGBA")
    sw, sh = size
    scale = max(sw / img.width, sh / img.height)
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    x = int((nw - sw) * pos[0])
    y = int((nh - sh) * pos[1])
    return img.crop((x, y, x + sw, y + sh)).convert("RGBA")


def paste_rounded(canvas: Image.Image, img: Image.Image, box: tuple[int, int, int, int], radius: int) -> None:
    x1, y1, x2, y2 = box
    size = (x2 - x1, y2 - y1)
    layer = img.resize(size, Image.Resampling.LANCZOS).convert("RGBA")
    mask = rounded_mask(size, radius)
    layer_alpha = layer.getchannel("A")
    layer.putalpha(Image.composite(layer_alpha, Image.new("L", size, 0), mask))
    canvas.alpha_composite(layer, (x1, y1))


def template_path(kind: str) -> Path:
    mapping = {
        "olea": TEMPLATE_DIR / "olea-hero.webp",
        "arbor": TEMPLATE_DIR / "arbor-hero.webp",
        "atlas": TEMPLATE_DIR / "atlas-hero.webp",
        "lucent": TEMPLATE_DIR / "lucent-hero.webp",
        "halcyon": TEMPLATE_DIR / "halcyon-hero.webp",
    }
    return mapping[kind]


def make_synthetic_site(kind: str, size: tuple[int, int]) -> Image.Image:
    w, h = size
    im = Image.new("RGBA", size, (248, 249, 252, 255))
    d = ImageDraw.Draw(im)
    if kind == "dentist":
        d.rectangle((0, 0, w, h), fill=(244, 248, 252))
        d.rounded_rectangle((w - 210, 54, w - 34, h - 42), radius=64, fill=(224, 234, 243))
        d.ellipse((w - 174, 94, w - 76, 192), fill=(255, 255, 255), outline=(204, 216, 228), width=2)
        d.text((34, 42), "CAVO", font=font("sans_bold", 22), fill=(42, 48, 57))
        d.text((34, 104), "Care\nthat smiles\nback.", font=font("serif", 42), fill=INK, spacing=-5)
        d.rounded_rectangle((34, h - 84, 128, h - 48), radius=11, fill=INK)
        d.text((81, h - 66), "Book", font=font("sans_bold", 13), fill=(255, 255, 255), anchor="mm")
    elif kind == "course":
        d.rectangle((0, 0, w, h), fill=(13, 18, 14))
        d.ellipse((w - 260, 15, w + 80, 355), outline=(179, 255, 72), width=2)
        d.rounded_rectangle((w - 210, 96, w - 44, h - 42), radius=18, fill=(26, 38, 27), outline=(61, 76, 62))
        for i in range(4):
            d.rounded_rectangle((w - 185, 130 + i * 42, w - 68, 154 + i * 42), radius=7, fill=(37, 51, 38))
        d.text((34, 40), "FORGE", font=font("sans_bold", 19), fill=(185, 255, 72))
        d.text((34, 106), "Teach better.\nScale further.", font=font("serif", 42), fill=(248, 250, 240), spacing=-5)
        d.rounded_rectangle((34, h - 86, 142, h - 48), radius=11, fill=(185, 255, 72))
        d.text((88, h - 67), "Enroll", font=font("sans_bold", 13), fill=INK, anchor="mm")
    return im


@lru_cache(maxsize=128)
def site_thumb(kind: str, size: tuple[int, int], variant: str = "normal") -> Image.Image:
    if kind in {"olea", "arbor", "atlas", "lucent", "halcyon"}:
        pos = {
            "olea": (0.62, 0.44),
            "arbor": (0.52, 0.46),
            "atlas": (0.52, 0.44),
            "lucent": (0.56, 0.46),
            "halcyon": (0.54, 0.46),
        }[kind]
        im = cover_image(str(template_path(kind)), size, pos).copy()
    else:
        im = make_synthetic_site(kind, size)

    if variant == "dark":
        arr = np.array(im.convert("RGBA")).astype(np.float32)
        arr[:, :, :3] *= 0.35
        arr[:, :, :3] += np.array([5, 6, 8])
        im = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA")
    elif variant == "green":
        overlay = Image.new("RGBA", size, (205, 231, 195, 72))
        im.alpha_composite(overlay)
    if kind == "olea":
        w, h = size
        d = ImageDraw.Draw(im)
        panel_w = int(w * 0.47)
        d.rectangle((0, 0, panel_w, h), fill=(239, 232, 218, 232))
        d.text((int(w * 0.055), int(h * 0.10)), "LUMIERE", font=font("serif", max(12, int(w * 0.042))), fill=INK)
        d.text(
            (int(w * 0.055), int(h * 0.29)),
            "Glow\nnaturally.",
            font=font("serif", max(24, int(w * 0.092))),
            fill=INK,
            spacing=max(-8, -int(w * 0.01)),
        )
        body_size = max(10, int(w * 0.029))
        d.text(
            (int(w * 0.058), int(h * 0.62)),
            "Clean, effective skincare\nfor real results.",
            font=font("sans", body_size),
            fill=(86, 82, 76),
            spacing=3,
        )
        bx, by = int(w * 0.06), int(h * 0.78)
        d.rounded_rectangle((bx, by, bx + int(w * 0.15), by + int(h * 0.075)), radius=max(5, int(w * 0.012)), fill=INK)
        d.text((bx + int(w * 0.075), by + int(h * 0.038)), "Shop", font=font("sans_bold", max(8, int(w * 0.018))), fill=(255, 255, 255), anchor="mm")
    return im


def draw_browser(canvas: Image.Image, x: int, y: int, w: int, h: int, kind: str, radius: int = 26, variant: str = "normal") -> None:
    shadow_card(canvas, (x, y, x + w, y + h), radius=radius, fill=(255, 255, 255, 255), blur=20)
    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle((x, y, x + w, y + 44), radius=radius, fill=(250, 250, 252), outline=(231, 232, 238))
    d.rectangle((x, y + 24, x + w, y + 45), fill=(250, 250, 252))
    for i, c in enumerate([(255, 95, 87), (255, 190, 48), (37, 203, 77)]):
        d.ellipse((x + 20 + i * 18, y + 17, x + 30 + i * 18, y + 27), fill=c)
    body = site_thumb(kind, (w, h - 44), variant)
    paste_rounded(canvas, body, (x, y + 44, x + w, y + h), radius)
    d.rounded_rectangle((x, y, x + w, y + h), radius=radius, outline=(224, 226, 232), width=1)


def draw_pill(d: ImageDraw.ImageDraw, x: int, y: int, label: str, fill=(255, 255, 255), outline=LINE, txt=MUTED) -> int:
    width = text_width(label, F["ui_bold"]) + 50
    d.rounded_rectangle((x, y, x + width, y + 50), radius=25, fill=fill, outline=outline)
    d.text((x + width // 2, y + 25), label, font=F["ui_bold"], fill=txt, anchor="mm")
    return width


def draw_pointer(canvas: Image.Image, x: int, y: int, scale: float = 1.0) -> None:
    d = ImageDraw.Draw(canvas)
    pts = [
        (x, y),
        (x + int(8 * scale), y + int(52 * scale)),
        (x + int(22 * scale), y + int(39 * scale)),
        (x + int(35 * scale), y + int(72 * scale)),
        (x + int(52 * scale), y + int(65 * scale)),
        (x + int(38 * scale), y + int(34 * scale)),
        (x + int(58 * scale), y + int(34 * scale)),
    ]
    d.polygon(pts, fill=(255, 255, 255), outline=INK)


def draw_sparkle(d: ImageDraw.ImageDraw, cx: int, cy: int, r: int, fill=PURPLE) -> None:
    d.polygon(
        [
            (cx, cy - r),
            (cx + r // 4, cy - r // 4),
            (cx + r, cy),
            (cx + r // 4, cy + r // 4),
            (cx, cy + r),
            (cx - r // 4, cy + r // 4),
            (cx - r, cy),
            (cx - r // 4, cy - r // 4),
        ],
        fill=fill,
    )
    d.polygon(
        [
            (cx + r + 26, cy - r // 2),
            (cx + r + 35, cy - 9),
            (cx + r + 56, cy),
            (cx + r + 35, cy + 9),
            (cx + r + 26, cy + r // 2),
            (cx + r + 17, cy + 9),
            (cx + r - 4, cy),
            (cx + r + 17, cy - 9),
        ],
        fill=fill,
    )


@lru_cache(maxsize=1)
def base_bg() -> Image.Image:
    im = Image.new("RGBA", (W, H), BG + (255,))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-270, -210, 660, 610), fill=(231, 237, 255, 130))
    gd.ellipse((510, 1120, 1440, 2050), fill=(232, 242, 255, 115))
    gd.ellipse((280, 360, 1240, 1160), fill=(255, 255, 255, 130))
    glow = glow.filter(ImageFilter.GaussianBlur(92))
    im.alpha_composite(glow)
    rng = np.random.default_rng(4)
    noise = rng.normal(0, 2.2, (H, W, 1))
    arr = np.array(im).astype(np.int16)
    arr[:, :, :3] = np.clip(arr[:, :, :3] + noise, 0, 255)
    return Image.fromarray(arr.astype(np.uint8), "RGBA")


@lru_cache(maxsize=1)
def vignette() -> Image.Image:
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((-310, -220, W + 310, H + 220), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(120))
    alpha = Image.eval(mask, lambda a: int((255 - a) * 0.10))
    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shade.putalpha(alpha)
    return shade


def base() -> Image.Image:
    return base_bg().copy()


def bottom_caption(d: ImageDraw.ImageDraw, txt: str) -> None:
    d.text((W // 2, 1668), txt, font=F["small_bold"], fill=INK, anchor="mm")


def draw_dashboard(canvas: Image.Image, x: int, y: int, w: int, h: int, prompt: str = "") -> None:
    d = shadow_card(canvas, (x, y, x + w, y + h), radius=38, fill=(255, 255, 255, 255), blur=34)
    sidebar = int(w * 0.23)
    d.rounded_rectangle((x, y, x + sidebar, y + h), radius=38, fill=(253, 253, 254), outline=None)
    d.rectangle((x + sidebar - 1, y, x + sidebar, y + h), fill=FAINT)
    logo = brand_image(str(WORDMARK), (150, 50), 0)
    canvas.alpha_composite(logo, (x + 36, y + 38))
    items = ["Overview", "Sites", "Templates", "Plugins", "Analytics"]
    for i, item in enumerate(items):
        yy = y + 142 + i * 55
        selected = i == 0
        if selected:
            d.rounded_rectangle((x + 28, yy, x + sidebar - 26, yy + 42), radius=13, fill=(241, 241, 244))
        d.text((x + 60, yy + 22), item, font=F["ui_bold"] if selected else F["ui"], fill=INK if selected else MUTED, anchor="lm")
    d.rounded_rectangle((x + sidebar + 42, y + 32, x + sidebar + 458, y + 78), radius=17, fill=(255, 255, 255), outline=LINE)
    d.text((x + sidebar + 78, y + 55), "Search sites, plugins, settings...", font=F["ui"], fill=(124, 126, 136), anchor="lm")
    cx = x + sidebar + (w - sidebar) // 2
    left = "What do you want to"
    right = "build?"
    combined = text_width(left, font("sans_bold", 38)) + 18 + text_width(right, font("serif_i", 52))
    d.text((cx - combined // 2, y + 172), left, font=font("sans_bold", 38), fill=INK, anchor="lm")
    d.text((cx - combined // 2 + text_width(left, font("sans_bold", 38)) + 18, y + 172), right, font=font("serif_i", 52), fill=INK, anchor="lm")
    d.text((cx, y + 222), "Describe your site and HyzrAI will get you a head start.", font=F["small"], fill=MUTED, anchor="mm")
    box = (x + sidebar + 120, y + 282, x + w - 86, y + 395)
    d.rounded_rectangle(box, radius=24, fill=(255, 255, 255), outline=LINE, width=1)
    txt = prompt or "Ask HyzrAI to build a clean storefront for my candle brand..."
    d.text((box[0] + 28, box[1] + 38), txt, font=F["small"], fill=(104, 107, 118))
    d.rounded_rectangle((box[2] - 70, box[3] - 67, box[2] - 22, box[3] - 19), radius=15, fill=(145, 145, 151))
    d.line((box[2] - 46, box[3] - 53, box[2] - 46, box[3] - 32), fill=(255, 255, 255), width=3)
    d.line((box[2] - 55, box[3] - 45, box[2] - 46, box[3] - 54, box[2] - 37, box[3] - 45), fill=(255, 255, 255), width=3)
    chip_y = y + 420
    x0 = x + sidebar + 170
    for label in ["Online store", "Portfolio", "Blog"]:
        x0 += draw_pill(d, x0, chip_y, label) + 14
    d.text((x + sidebar + 70, y + 515), "Start with a template", font=F["h3"], fill=INK)
    d.text((x + sidebar + 70, y + 555), "Production-ready designs you can launch in minutes.", font=F["small"], fill=MUTED)
    for i, kind in enumerate(["olea", "arbor", "lucent"]):
        draw_browser(canvas, x + sidebar + 70 + i * 252, y + 615, 222, 150, kind, radius=18)


def scene_intro(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    p = ease(between(t, 0.0, 1.15))
    y = int(650 - (1 - p) * 40)
    text_center(d, (W // 2, y), "Every business,", F["hero"], INK)
    text_center(d, (W // 2, y + 105), "starts with", F["hero"], INK)
    text_center(d, (W // 2, y + 212), "an idea.", F["hero_i"], PURPLE)
    bottom_caption(d, "Big idea. Clean start.")
    return im


def scene_dashboard(t: float) -> Image.Image:
    im = base()
    p = ease(between(t, 1.15, 2.35))
    layer = Image.new("RGBA", (1060, 930), (0, 0, 0, 0))
    draw_dashboard(layer, 0, 0, 1040, 880)
    layer = layer.rotate(-4.5, resample=Image.Resampling.BICUBIC, expand=True)
    x = int(-40 + (1 - p) * -90)
    y = int(345 + (1 - p) * 45)
    im.alpha_composite(layer, (x, y))
    d = ImageDraw.Draw(im)
    bottom_caption(d, "Open HyzrAI.")
    return im


def scene_templates(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    d.text((76, 185), "Choose a template", font=F["h2"], fill=INK)
    d.text((76, 246), "Beautiful starting points for any business.", font=F["small"], fill=MUTED)
    p = ease_in_out(between(t, 2.35, 3.55))
    cards = [
        ("olea", "Skincare", "E-commerce"),
        ("atlas", "Architecture", "Studio"),
        ("dentist", "Dentist", "Bookings"),
        ("course", "Course", "Education"),
        ("lucent", "AI company", "Startup"),
    ]
    for i, (kind, title, tag) in enumerate(cards):
        x = int(70 + i * 298 - p * 265)
        y = 430 + (i % 2) * 38
        draw_browser(im, x, y, 266, 218, kind, radius=24)
        d.text((x + 8, y + 248), title, font=F["small_bold"], fill=INK)
        d.text((x + 8, y + 278), tag, font=font("sans", 18), fill=MUTED)
    bottom_caption(d, "Stunning templates for every industry.")
    return im


def scene_industries(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    d.text((76, 130), "For founders, shops,", font=F["h3"], fill=INK)
    d.text((76, 175), "creators, clinics, and teams.", font=F["h3"], fill=INK)
    cells = [
        ("olea", "Skin care brand", 58, 295),
        ("atlas", "Architect", 560, 295),
        ("dentist", "Dental practice", 58, 650),
        ("course", "Course seller", 560, 650),
    ]
    for i, (kind, label, x, y) in enumerate(cells):
        p = ease(between(t, 3.55 + i * 0.05, 4.35 + i * 0.05))
        yy = int(y + (1 - p) * 54)
        draw_browser(im, x, yy, 462, 286, kind, radius=27)
        d.text((x + 2, yy + 315), label, font=F["small_bold"], fill=INK)
    bottom_caption(d, "Pick one, then make it yours.")
    return im


def scene_prompt(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    typed = "Build me a luxury skincare brand"
    p = ease(between(t, 4.45, 5.55))
    visible = typed[: int(len(typed) * min(1, p * 1.22))]
    x, y, w, h = 70, 705, 940, 255
    shadow_card(im, (x, y, x + w, y + h), radius=34, fill=(255, 255, 255, 255), blur=28)
    d.text((x + 45, y + 72), visible + ("|" if int(t * 8) % 2 else ""), font=F["body"], fill=INK)
    d.text((x + 48, y + h - 58), "HyzrAI Build", font=F["small_bold"], fill=(92, 95, 106))
    d.rounded_rectangle((x + w - 100, y + h - 104, x + w - 36, y + h - 40), radius=20, fill=PURPLE)
    d.line((x + w - 68, y + h - 88, x + w - 68, y + h - 62), fill=(255, 255, 255), width=4)
    d.line((x + w - 80, y + h - 77, x + w - 68, y + h - 89, x + w - 56, y + h - 77), fill=(255, 255, 255), width=4)
    d.text((88, 1090), "AI can start from a blank idea,", font=F["body_bold"], fill=INK)
    d.text((88, 1130), "your photos, or a template.", font=F["body_bold"], fill=INK)
    bottom_caption(d, "Just describe what you want.")
    return im


def scene_building(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    p = ease(between(t, 5.55, 6.55))
    draw_sparkle(d, W // 2 - 10, 720, 30, PURPLE)
    text_center(d, (W // 2, 840), "HyzrAI is building your site...", F["h2"], INK)
    d.rounded_rectangle((215, 985, 865, 1002), radius=8, fill=(225, 227, 238))
    d.rounded_rectangle((215, 985, 215 + int(650 * p), 1002), radius=8, fill=PURPLE)
    labels = ["aesthetic", "copy", "photos", "motion", "layout"]
    for i, label in enumerate(labels):
        a = i / len(labels)
        alpha = ease(between(p, a * 0.7, a * 0.7 + 0.35))
        x = 185 + i * 150
        y = 1095 + int(math.sin(t * 5 + i) * 8)
        d.rounded_rectangle((x, y, x + 120, y + 42), radius=21, fill=(255, 255, 255), outline=LINE)
        d.text((x + 60, y + 21), label, font=F["ui_bold"], fill=tuple(int(lerp(170, 72, alpha)) for _ in range(3)), anchor="mm")
    bottom_caption(d, "Your 1-to-1 AI designer gets to work.")
    return im


def scene_website(t: float) -> Image.Image:
    im = base()
    p = ease(between(t, 6.55, 7.55))
    x = int(54 + (1 - p) * 70)
    y = int(285 + (1 - p) * 36)
    draw_browser(im, x, y, 972, 690, "olea", radius=34)
    d = ImageDraw.Draw(im)
    bottom_caption(d, "Your website appears. Instantly.")
    return im


def draw_ai_panel(canvas: Image.Image, x: int, y: int, p: float) -> None:
    d = ImageDraw.Draw(canvas)
    shadow_card(canvas, (x, y, x + 274, y + 382), radius=23, fill=(255, 255, 255, 248), blur=20)
    d.text((x + 28, y + 38), "Edit with AI", font=F["ui_bold"], fill=INK)
    rows = [("Brand tone", "Warm luxury"), ("Typography", "Elegant serif"), ("Imagery", "Soft + natural")]
    for i, (a, b) in enumerate(rows):
        yy = y + 82 + i * 71
        d.text((x + 28, yy), a, font=font("sans_bold", 16), fill=(54, 57, 66))
        d.text((x + 28, yy + 24), b, font=font("sans", 16), fill=MUTED)
    d.text((x + 28, y + 225), "Colors", font=font("sans_bold", 16), fill=(54, 57, 66))
    for i, c in enumerate([(239, 230, 213), (190, 154, 105), (104, 91, 61), (37, 45, 33)]):
        d.rounded_rectangle((x + 28 + i * 42, y + 256, x + 62 + i * 42, y + 287), radius=8, fill=c, outline=(210, 203, 190))
    d.rounded_rectangle((x + 28, y + 316, x + 246, y + 354), radius=12, fill=PURPLE)
    d.text((x + 137, y + 335), "Apply changes", font=font("sans_bold", 15), fill=(255, 255, 255), anchor="mm")
    if p > 0.55:
        draw_pointer(canvas, x + 210, y + 328, 0.55)


def scene_customize(t: float) -> Image.Image:
    im = base()
    draw_browser(im, 55, 302, 970, 650, "olea", radius=34)
    p = ease(between(t, 7.55, 8.75))
    panel_x = int(820 - (1 - p) * 115)
    draw_ai_panel(im, panel_x, 360, p)
    d = ImageDraw.Draw(im)
    bottom_caption(d, "Customize every detail with AI.")
    return im


def scene_variants(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    p = between(t, 8.75, 10.75)
    variants = [
        ("Change the style.", "olea", "normal"),
        ("Change the colors.", "olea", "green"),
        ("Change the layout.", "atlas", "normal"),
        ("Change everything.", "arbor", "dark"),
    ]
    idx = min(3, int(clamp01(p) * 4))
    label, kind, variant = variants[idx]
    local = ease_in_out((clamp01(p) * 4) % 1)
    y = int(345 - local * 35)
    draw_browser(im, 54, y, 972, 690, kind, radius=34, variant=variant)
    d.text((W // 2, 1110), label, font=F["h3"], fill=INK, anchor="mm")
    for i, (dot_label, _, _) in enumerate(variants):
        color = PURPLE if i == idx else (211, 213, 221)
        d.rounded_rectangle((430 + i * 58, 1168, 468 + i * 58, 1178), radius=5, fill=color)
    bottom_caption(d, "Every element can move, adapt, and refine.")
    return im


def draw_mobile(canvas: Image.Image, x: int, y: int, scale: float = 1.0) -> None:
    w, h = int(268 * scale), int(548 * scale)
    d = ImageDraw.Draw(canvas)
    shadow_card(canvas, (x, y, x + w, y + h), radius=int(48 * scale), fill=(18, 18, 20, 255), blur=24)
    d.rounded_rectangle((x + 11, y + 13, x + w - 11, y + h - 13), radius=int(39 * scale), fill=CREAM)
    d.rounded_rectangle((x + w // 2 - int(50 * scale), y + int(20 * scale), x + w // 2 + int(50 * scale), y + int(40 * scale)), radius=int(10 * scale), fill=(14, 14, 15))
    img = site_thumb("olea", (w - 34, h - 88))
    paste_rounded(canvas, img, (x + 17, y + 60, x + w - 17, y + h - 28), int(24 * scale))
    d.rectangle((x + 17, y + 60, x + int(w * 0.68), y + h - 28), fill=(239, 231, 216, 226))
    d.text((x + 39, y + 96), "LUMIERE", font=font("serif", int(21 * scale)), fill=INK)
    d.text((x + 39, y + 160), "Glow\nnaturally.", font=font("serif", int(37 * scale)), fill=INK, spacing=-4)
    d.rounded_rectangle((x + 39, y + 309, x + 116, y + 338), radius=8, fill=INK)
    d.text((x + 77, y + 324), "Shop", font=font("sans_bold", int(10 * scale)), fill=(255, 255, 255), anchor="mm")


def scene_editor(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    shadow_card(im, (58, 220, 1022, 1295), radius=34, fill=(255, 255, 255, 255), blur=26)
    d.rectangle((58, 220, 225, 1295), fill=(250, 251, 253))
    d.text((96, 278), "Pages", font=F["ui_bold"], fill=MUTED)
    pages = ["Home", "Shop", "About", "Ingredients", "Journal", "Contact"]
    for i, page in enumerate(pages):
        yy = 334 + i * 57
        if i == 0:
            d.rounded_rectangle((84, yy - 16, 198, yy + 25), radius=12, fill=(240, 239, 250))
        d.text((105, yy), page, font=F["ui"], fill=INK if i == 0 else MUTED, anchor="lm")
    draw_browser(im, 260, 288, 510, 390, "olea", radius=22)
    shadow_card(im, (805, 308, 975, 662), radius=20, blur=17)
    d.text((832, 354), "Section", font=F["ui_bold"], fill=INK)
    for i, item in enumerate(["Hero", "Spacing", "Animation", "Fade up"]):
        d.text((832, 405 + i * 53), item, font=F["ui"], fill=MUTED)
    d.rounded_rectangle((832, 590, 948, 632), radius=12, fill=PURPLE)
    d.text((890, 611), "Publish", font=F["ui_bold"], fill=(255, 255, 255), anchor="mm")
    draw_mobile(im, 392, 804, 0.9)
    bottom_caption(d, "Add sections. Edit content. Refine.")
    return im


def scene_responsive(t: float) -> Image.Image:
    im = base()
    p = ease(between(t, 11.95, 13.05))
    draw_browser(im, 100, 430, 880, 568, "olea", radius=32)
    draw_mobile(im, int(372 + (1 - p) * 80), 350, 1.23)
    d = ImageDraw.Draw(im)
    bottom_caption(d, "Perfect on every screen.")
    return im


def scene_live(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    p = ease(between(t, 13.05, 14.05))
    d.ellipse((W // 2 - 56, 612, W // 2 + 56, 724), fill=(82, 201, 132))
    d.line((W // 2 - 23, 668, W // 2 - 3, 690, W // 2 + 31, 646), fill=(255, 255, 255), width=8, joint="curve")
    text_center(d, (W // 2, 820), "Your site is live!", F["h2"], INK)
    shadow_card(im, (240, 915, 840, 992), radius=39, fill=(255, 255, 255, 248), blur=18)
    d.text((W // 2, 953), "lumiere-skin.com", font=F["body"], fill=(77, 81, 92), anchor="mm")
    for i in range(84):
        angle = math.radians((i * 41) % 360)
        radius = 70 + (i % 8) * 38 + 245 * p
        x = W // 2 + int(math.cos(angle) * radius)
        y = 700 + int(math.sin(angle) * radius * 0.85)
        color = [PURPLE, GREEN, (247, 190, 87), (126, 205, 244)][i % 4]
        d.rounded_rectangle((x, y, x + 6, y + 6), radius=3, fill=color)
    bottom_caption(d, "Launch in one click.")
    return im


def scene_end(t: float) -> Image.Image:
    im = base()
    d = ImageDraw.Draw(im)
    p = ease(between(t, 14.05, 15.0))
    mark = brand_image(str(MARK), (168, 168), 0)
    word = brand_image(str(WORDMARK), (455, 132), 0)
    paste_center(im, mark, int(298 - (1 - p) * 20), 750)
    paste_center(im, word, int(648 + (1 - p) * 20), 750)
    d.text((W // 2 - 68, 970), "Build exactly what you", font=F["h3"], fill=INK, anchor="mm")
    d.text((W // 2 + 255, 970), "imagine.", font=font("serif_i", 48), fill=PURPLE, anchor="mm")
    d.rounded_rectangle((336, 1102, 744, 1170), radius=34, fill=INK)
    d.text((W // 2, 1136), "Start building with HyzrAI", font=F["small_bold"], fill=(255, 255, 255), anchor="mm")
    return im


@dataclass(frozen=True)
class Scene:
    start: float
    end: float
    fn: callable


SCENES = [
    Scene(0.00, 1.15, scene_intro),
    Scene(1.15, 2.35, scene_dashboard),
    Scene(2.35, 3.55, scene_templates),
    Scene(3.55, 4.45, scene_industries),
    Scene(4.45, 5.55, scene_prompt),
    Scene(5.55, 6.55, scene_building),
    Scene(6.55, 7.55, scene_website),
    Scene(7.55, 8.75, scene_customize),
    Scene(8.75, 10.75, scene_variants),
    Scene(10.75, 11.95, scene_editor),
    Scene(11.95, 13.05, scene_responsive),
    Scene(13.05, 14.05, scene_live),
    Scene(14.05, 15.00, scene_end),
]


def render_frame(index: int) -> np.ndarray:
    t = index / FPS
    for scene in SCENES:
        if scene.start <= t < scene.end:
            img = scene.fn(t)
            break
    else:
        img = scene_end(t)
    img.alpha_composite(vignette())
    return np.asarray(img.convert("RGB"))


def save_contact_sheet(path: Path) -> None:
    stamps = [0.0, 1.2, 2.4, 3.6, 4.6, 5.6, 6.6, 7.6, 8.9, 10.8, 12.0, 13.1, 14.1]
    thumbs = []
    for stamp in stamps:
        frame = Image.fromarray(render_frame(min(FRAMES - 1, int(stamp * FPS))))
        thumb = frame.resize((216, 384), Image.Resampling.LANCZOS)
        d = ImageDraw.Draw(thumb)
        d.rounded_rectangle((8, 8, 58, 32), radius=7, fill=(42, 45, 54, 210))
        d.text((33, 20), f"{stamp:04.1f}", font=font("sans_bold", 11), fill=(255, 255, 255), anchor="mm")
        thumbs.append(thumb)
    sheet = Image.new("RGB", (216 * 4, 384 * 4), (244, 245, 248))
    for i, thumb in enumerate(thumbs):
        sheet.paste(thumb.convert("RGB"), ((i % 4) * 216, (i // 4) * 384))
    sheet.save(path, quality=94)


def main() -> None:
    out = OUT_DIR / "hyzrai_ecommerce_tiktok_ad_15s.mp4"
    poster = OUT_DIR / "hyzrai_ecommerce_tiktok_ad_contact_sheet.jpg"
    writer = imageio.get_writer(
        str(out),
        fps=FPS,
        codec="libx264",
        pixelformat="yuv420p",
        quality=9,
        macro_block_size=1,
        ffmpeg_params=["-movflags", "+faststart", "-crf", "18", "-preset", "medium"],
    )
    try:
        for i in range(FRAMES):
            writer.append_data(render_frame(i))
            if i % FPS == 0:
                print(f"rendered {i // FPS:02d}s / {DURATION}s")
    finally:
        writer.close()
    save_contact_sheet(poster)
    print(f"video={out}")
    print(f"contact_sheet={poster}")


if __name__ == "__main__":
    main()

from __future__ import annotations

from pathlib import Path

import imageio.v3 as iio
import imageio
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "ads"
FRAMES_DIR = OUT_DIR / "hyzrai_gsap_frames"
VIDEO_OUT = OUT_DIR / "hyzrai_ecommerce_tiktok_ad_real_site_gsap_15s.mp4"
SHEET_OUT = OUT_DIR / "hyzrai_ecommerce_tiktok_ad_real_site_gsap_contact_sheet.jpg"
FPS = 30


def font(size: int) -> ImageFont.ImageFont:
    for candidate in [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"]:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def encode_video() -> None:
    frames = sorted(FRAMES_DIR.glob("frame_*.jpg"))
    if not frames:
        raise SystemExit(f"No frames found in {FRAMES_DIR}")

    writer = imageio.get_writer(
        str(VIDEO_OUT),
        fps=FPS,
        codec="libx264",
        pixelformat="yuv420p",
        quality=10,
        macro_block_size=1,
        ffmpeg_params=["-movflags", "+faststart", "-crf", "16", "-preset", "medium"],
    )
    try:
      for index, frame in enumerate(frames):
          writer.append_data(iio.imread(frame))
          if index % FPS == 0:
              print(f"encoded {index // FPS:02d}s / {len(frames) // FPS}s")
    finally:
      writer.close()


def save_contact_sheet() -> None:
    frames = sorted(FRAMES_DIR.glob("frame_*.jpg"))
    stamps = [0.0, 1.2, 2.4, 3.9, 4.8, 6.0, 7.2, 8.8, 9.6, 10.8, 12.0, 13.2, 14.2, 14.7]
    thumbs: list[Image.Image] = []
    for stamp in stamps:
        idx = min(len(frames) - 1, int(stamp * FPS))
        im = Image.open(frames[idx]).convert("RGB").resize((216, 384), Image.Resampling.LANCZOS)
        draw = ImageDraw.Draw(im)
        draw.rounded_rectangle((8, 8, 58, 32), radius=7, fill=(36, 39, 48))
        draw.text((33, 20), f"{stamp:04.1f}", font=font(11), fill=(255, 255, 255), anchor="mm")
        thumbs.append(im)
    sheet = Image.new("RGB", (216 * 4, 384 * 4), (245, 246, 249))
    for i, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((i % 4) * 216, (i // 4) * 384))
    sheet.save(SHEET_OUT, quality=95)


def main() -> None:
    encode_video()
    save_contact_sheet()
    print(f"video={VIDEO_OUT}")
    print(f"contact_sheet={SHEET_OUT}")


if __name__ == "__main__":
    main()

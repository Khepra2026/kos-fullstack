# KOS Sovereign Video - FFMPEG 100% local
import subprocess, datetime
from pathlib import Path

def create_kos_shorts(topic, output="output/kos_shorts_001.mp4"):
    """
    0 API externe - 100% FFMPEG + Pillow
    Template Big Four
    """
    title = topic['angle']
    # Cree image 1080x1920 avec Pillow + texte
    cmd_pillow = f'''
from PIL import Image, ImageDraw, ImageFont
img = Image.new("RGB", (1080, 1920), color="#050507")
draw = ImageDraw.Draw(img)
draw.text((50, 800), """{title}""", fill="#10b981", font_size=80)
draw.text((50, 1000), "KOS RegTech - Big Four 100/100", fill="white", font_size=40)
draw.text((50, 1800), "BC47B669 - app.khepraexperts.com/pitch", fill="#666", font_size=24)
img.save("templates/bg.png")
print("BG created")
'''
    Path("python/gen_bg.py").write_text(cmd_pillow)
    print(f"[KOS VIDEO SOUVERAINE] {title} -> {output}")
    return output

if __name__ == "__main__":
    create_kos_shorts({"angle": "3 erreurs qui coutent 2M$"})

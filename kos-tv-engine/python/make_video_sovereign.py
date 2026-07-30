from PIL import Image, ImageDraw
from pathlib import Path
import subprocess, sys

Path("output").mkdir(exist_ok=True)

# Cree thumb 1080x1920
img = Image.new('RGB', (1080, 1920), '#050507')
draw = ImageDraw.Draw(img)
draw.rectangle([0,0,1080,400], fill='#10b981')
try:
    # Essaye font grosse
    draw.text((50, 100), 'BCEAO 2026', fill='black')
    draw.text((50, 500), '3 erreurs KYC', fill='white')
    draw.text((50, 600), 'qui coutent 2M$', fill='#10b981')
    draw.text((50, 900), '50M FCFA amende COBAC', fill='#ff4444')
    draw.text((50, 1000), 'Audit manuel 90% echec', fill='white')
    draw.text((50, 1200), 'KOS: Detection 0.3s', fill='#10b981')
    draw.text((50, 1300), 'Audit trail SHA256', fill='white')
    draw.text((50, 1400), 'SOC2 auto', fill='white')
    draw.text((50, 1700), 'app.khepraexperts.com/pitch', fill='#888')
    draw.text((50, 1750), 'Big Four 100/100 BC47B669', fill='#10b981')
except Exception as e:
    print(e)

img.save('output/thumb_1080x1920.png')
print('✅ Thumb OK output/thumb_1080x1920.png')

# Cree video 45s avec ffmpeg (maintenant dispo via conda)
cmd = [
    "ffmpeg", "-y",
    "-loop", "1", "-i", "output/thumb_1080x1920.png",
    "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-t", "45",
    "-c:v", "libx264", "-c:a", "aac",
    "-pix_fmt", "yuv420p",
    "-vf", "scale=1080:1920",
    "-shortest",
    "output/kos_shorts_bceao_001.mp4"
]
print("FFMPEG:", " ".join(cmd))
subprocess.run(cmd, check=True)
print("✅ VIDEO OK: output/kos_shorts_bceao_001.mp4")

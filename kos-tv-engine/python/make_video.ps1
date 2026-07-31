$topic = "BCEAO KYC 2026 - 3 erreurs qui coutent 2M$"
$evidence = "BC47B669"

# Genere image 1080x1920 avec texte
python -c @"
from PIL import Image, ImageDraw
img = Image.new('RGB', (1080, 1920), '#050507')
draw = ImageDraw.Draw(img)
# Fond
draw.rectangle([0,0,1080,400], fill='#10b981')
draw.text((50, 100), 'BCEAO 2026', fill='black', font_size=80)
draw.text((50, 500), '3 erreurs KYC', fill='white', font_size=70)
draw.text((50, 600), 'qui coutent 2M$', fill='#10b981', font_size=70)
draw.text((50, 900), '50M FCFA amende COBAC', fill='#ff4444', font_size=40)
draw.text((50, 1000), 'Audit manuel 90% echec', fill='white', font_size=40)
draw.text((50, 1200), 'KOS: Detection 0.3s', fill='#10b981', font_size=50)
draw.text((50, 1300), 'Audit trail SHA256', fill='white', font_size=40)
draw.text((50, 1400), 'SOC2 auto', fill='white', font_size=40)
draw.text((50, 1700), 'app.khepraexperts.com/pitch', fill='#888', font_size=28)
draw.text((50, 1750), 'Big Four 100/100 BC47B669', fill='#10b981', font_size=24)
img.save('output/thumb_1080x1920.png')
print('Thumb OK')
"@

# Cree video 45s a partir de l'image + audio silence (ou TTS eSpeak si installe)
ffmpeg -y -loop 1 -i output/thumb_1080x1920.png -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -t 45 -c:v libx264 -c:a aac -pix_fmt yuv420p -vf "scale=1080:1920" -shortest output/kos_shorts_bceao_001.mp4
Write-Host "✅ VIDEO OK: output/kos_shorts_bceao_001.mp4 45s 1080x1920" -ForegroundColor Green

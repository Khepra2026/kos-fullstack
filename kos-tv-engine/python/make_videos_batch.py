from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import subprocess, json, textwrap

Path("output").mkdir(exist_ok=True)

topics = [
    {"title": "BCEAO KYC 2026", "subtitle": "3 erreurs qui coutent 2M$", "problem": "Audit manuel 90% echec", "solution": "KOS 0.3s SHA256", "color": "#10b981"},
    {"title": "COBAC AML", "subtitle": "50M FCFA / jour perdus", "problem": "Detection lente = amende", "solution": "KOS temps reel 0.3s", "color": "#ff4444"},
    {"title": "SOC2 Type II", "subtitle": "Big Four 25k€ vs KOS", "problem": "Rapport 3 mois manuel", "solution": "KOS auto audit trail", "color": "#3b82f6"},
    {"title": "PEP Screening UEMOA", "subtitle": "90% banques bloquees", "problem": "Listes PEP non a jour", "solution": "KOS PEP temps reel", "color": "#f59e0b"},
    {"title": "RegTech Togo Hub", "subtitle": "Lome devient hub", "problem": "Compliance coute 40% budget", "solution": "KOS -80% couts BigFour", "color": "#10b981"},
]

def make_video(idx, topic):
    print(f"\n=== VIDEO {idx+1}/5 : {topic['title']} ===")
    # Cree frames animees avec texte qui apparait
    frames_dir = Path(f"output/frames_{idx}")
    frames_dir.mkdir(exist_ok=True)

    # Genere 45 images (1 fps pour 45s) avec animation simple
    for f in range(45):
        img = Image.new('RGB', (1080, 1920), '#050507')
        draw = ImageDraw.Draw(img)

        # Barre top
        draw.rectangle([0,0,1080,300], fill=topic['color'])
        draw.text((50, 80), topic['title'], fill='black')
        draw.text((50, 150), topic['subtitle'], fill='white')

        # Animation: texte qui monte
        y_offset = max(0, 400 - f*10) if f<20 else 0

        if f>5:
            draw.text((50, 500+y_offset), f"❌ {topic['problem']}", fill='#ff6666')
        if f>15:
            draw.text((50, 800+y_offset), f"✅ {topic['solution']}", fill=topic['color'])
            draw.text((50, 900), "Audit trail SHA256", fill='white')
            draw.text((50, 1000), "BC47B669 Immutable", fill='#888')
        if f>25:
            draw.text((50, 1300), "app.khepraexperts.com/pitch", fill='white')
            draw.text((50, 1350), "Big Four 100/100", fill=topic['color'])

        draw.text((50, 1800), f"KOS TV LIVE {idx+1}/5 - {f}s", fill='#444')
        img.save(frames_dir / f"frame_{f:03d}.png")

    # Video depuis frames
    output = f"output/kos_shorts_{idx+1:02d}_{topic['title'].replace(' ','_')}.mp4"
    cmd = [
        "ffmpeg", "-y",
        "-framerate", "1", "-i", f"{frames_dir}/frame_%03d.png",
        "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
        "-t", "45", "-c:v", "libx264", "-c:a", "aac", "-pix_fmt", "yuv420p",
        "-vf", "scale=1080:1920:flags=neighbor,format=yuv420p",
        "-r", "30",
        "-shortest",
        output
    ]
    subprocess.run(cmd, check=True)
    print(f"✅ VIDEO OK {output}")
    return output

videos = []
for i, t in enumerate(topics):
    v = make_video(i, t)
    videos.append({"topic": t, "file": v})

Path("output/batch.json").write_text(json.dumps(videos, indent=2))
print(f"\n✅ BATCH 5 VIDEOS OK")

from pathlib import Path
from PIL import Image, ImageDraw
import subprocess

def make_video_with_voice(topic, idx):
    Path("output/v3").mkdir(parents=True, exist_ok=True)
    from voice_fr_sovereign import tts_kos_script
    voice_file = tts_kos_script(topic)
    print(f"Voice: {voice_file} {Path(voice_file).stat().st_size} bytes")

    frames_dir = Path(f"output/v3/frames_{idx}")
    frames_dir.mkdir(exist_ok=True)

    for f in range(45):
        img = Image.new("RGB", (1080, 1920), "#050507")
        draw = ImageDraw.Draw(img)
        draw.rectangle([0,0,1080,350], fill=topic.get("color","#10b981"))
        draw.text((50, 50), "KOS TV LIVE 24/7 VOIX FR", fill="black")
        draw.text((50, 120), topic["title"], fill="black")
        draw.text((50, 200), topic["subtitle"], fill="white")
        if f>8:
            draw.rectangle([30, 480, 1050, 620], fill="#1a1a1a", outline=topic.get("color","#10b981"))
            draw.text((50, 500), f"{topic['problem']}", fill="#ff6666")
        if f>18:
            draw.rectangle([30, 700, 1050, 900], fill="#0a2a12")
            draw.text((50, 720), f"{topic['solution']}", fill="#10b981")
            draw.text((50, 780), "SHA256 BC47B669", fill="white")
            draw.text((50, 830), "Audit immutable", fill="#888")
        if f>28:
            draw.text((50, 1100), "Big Four 100/100", fill="#10b981")
            draw.text((50, 1150), "SOC2 Type II auto", fill="white")
            draw.text((50, 1250), "app.khepraexperts.com/pitch", fill="white")
        progress = int(1080 * f / 45)
        draw.rectangle([0, 1900, progress, 1920], fill=topic.get("color","#10b981"))
        draw.text((50, 1820), f"KOS TV V3 {idx}/10 VOIX FR", fill="#444")
        img.save(frames_dir / f"frame_{f:03d}.png")

    output = f"output/v3/kos_v3_{idx:02d}_{topic['title'].replace(' ','_').replace('/','_')}_VOIXFR.mp4"
    cmd = ["ffmpeg","-y","-framerate","1","-i",f"{frames_dir}/frame_%03d.png","-i",voice_file,"-c:v","libx264","-c:a","aac","-pix_fmt","yuv420p","-r","30","-shortest","-af","loudnorm=I=-16:TP=-1.5:LRA=11",output]
    subprocess.run(cmd, check=True)
    print(f"✅ V3 VOIX FR OK {output}")
    return output

topics = [
    {"title":"SOC2 Type II","subtitle":"Big Four 25k vs KOS auto","problem":"Rapport 3 mois manuel 25k euros","solution":"KOS auto audit trail SHA256","color":"#3b82f6"},
    {"title":"PEP Screening UEMOA","subtitle":"90% banques bloquees","problem":"Listes PEP non a jour = blocage","solution":"KOS PEP temps reel UEMOA","color":"#f59e0b"},
    {"title":"RegTech Togo Hub","subtitle":"Lome devient hub RegTech","problem":"Compliance 40% budget banque","solution":"KOS -80% couts BigFour Togo","color":"#10b981"},
]

for i,t in enumerate(topics):
    make_video_with_voice(t, i+3)  # 3,4,5

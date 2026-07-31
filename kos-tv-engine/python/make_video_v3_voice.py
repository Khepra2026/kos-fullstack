# Master 5 V3: Video avec voix FR souveraine + audit
from pathlib import Path
from PIL import Image, ImageDraw
import subprocess, json

def make_video_with_voice(topic, idx):
    Path("output/v3").mkdir(parents=True, exist_ok=True)

    # 1. Genere voix FR
    try:
        from voice_fr_sovereign import tts_kos_script
        voice_file = tts_kos_script(topic)
    except:
        voice_file = None
        print("[VOIX] Fallback silence")

    # 2. Genere frames animees Pro
    frames_dir = Path(f"output/v3/frames_{idx}")
    frames_dir.mkdir(exist_ok=True)

    for f in range(45):
        img = Image.new("RGB", (1080, 1920), "#050507")
        draw = ImageDraw.Draw(img)

        # Gradient top
        draw.rectangle([0,0,1080,350], fill=topic.get("color","#10b981"))
        draw.text((50, 50), "KOS TV LIVE 24/7", fill="black")
        draw.text((50, 120), topic["title"], fill="black")
        draw.text((50, 200), topic["subtitle"], fill="white")

        # Contenu qui slide
        if f>8:
            draw.rectangle([30, 480, 1050, 620], fill="#1a1a1a", outline=topic.get("color","#10b981"))
            draw.text((50, 500), f"❌ {topic['problem']}", fill="#ff6666")
        if f>18:
            draw.rectangle([30, 700, 1050, 900], fill="#0a2a12")
            draw.text((50, 720), f"✅ {topic['solution']}", fill="#10b981")
            draw.text((50, 780), "SHA256 BC47B669", fill="white")
            draw.text((50, 830), "Audit immutable", fill="#888")
        if f>28:
            draw.text((50, 1100), "Big Four 100/100", fill="#10b981")
            draw.text((50, 1150), "SOC2 Type II auto", fill="white")
            draw.text((50, 1250), "app.khepraexperts.com/pitch", fill="white")

        # Barre progression
        progress = int(1080 * f / 45)
        draw.rectangle([0, 1900, progress, 1920], fill=topic.get("color","#10b981"))

        img.save(frames_dir / f"frame_{f:03d}.png")

    # 3. Assemble avec voix
    output = f"output/v3/kos_v3_{idx:02d}_{topic['title'].replace(' ','_')}.mp4"
    if voice_file and Path(voice_file).exists():
        cmd = ["ffmpeg","-y","-framerate","1","-i",f"{frames_dir}/frame_%03d.png","-i",voice_file,"-t","45","-c:v","libx264","-c:a","aac","-pix_fmt","yuv420p","-r","30","-shortest",output]
    else:
        cmd = ["ffmpeg","-y","-framerate","1","-i",f"{frames_dir}/frame_%03d.png","-f","lavfi","-i","anullsrc","-t","45","-c:v","libx264","-c:a","aac","-pix_fmt","yuv420p","-r","30","-shortest",output]

    subprocess.run(cmd, check=True)
    print(f"✅ V3 VIDEO OK {output}")
    return output

# Test 1 video V3
if __name__ == "__main__":
    make_video_with_voice({"title":"BCEAO KYC 2026","subtitle":"3 erreurs 2M$ - Voix FR","problem":"Audit manuel 90% echec - 50M amende","solution":"KOS 0.3s SHA256 BC47B669","color":"#10b981"}, 1)

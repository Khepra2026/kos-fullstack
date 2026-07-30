from pathlib import Path
from PIL import Image, ImageDraw
import subprocess

def make_video_with_voice(topic, idx):
    Path("output/v3").mkdir(parents=True, exist_ok=True)

    from voice_fr_sovereign import tts_kos_script
    voice_file = tts_kos_script(topic)
    print(f"Voice file: {voice_file}")

    frames_dir = Path(f"output/v3/frames_{idx}")
    frames_dir.mkdir(exist_ok=True)

    for f in range(45):
        img = Image.new("RGB", (1080, 1920), "#050507")
        draw = ImageDraw.Draw(img)
        draw.rectangle([0,0,1080,350], fill=topic.get("color","#10b981"))
        draw.text((50, 50), "KOS TV LIVE 24/7", fill="black")
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
        img.save(frames_dir / f"frame_{f:03d}.png")

    output = f"output/v3/kos_v3_{idx:02d}_{topic['title'].replace(' ','_').replace('/','_')}.mp4"

    # Avec vraie voix FR
    cmd = [
        "ffmpeg","-y",
        "-framerate","1","-i",f"{frames_dir}/frame_%03d.png",
        "-i", voice_file,
        "-c:v","libx264","-c:a","aac","-pix_fmt","yuv420p",
        "-r","30","-shortest",
        "-af","loudnorm=I=-16:TP=-1.5:LRA=11",
        output
    ]
    subprocess.run(cmd, check=True)
    print(f"✅ V3 VOIX FR OK {output} - {Path(output).stat().st_size} bytes")
    return output

if __name__ == "__main__":
    topics = [
        {"title":"BCEAO KYC 2026","subtitle":"3 erreurs qui coutent 2M$","problem":"Audit manuel 90% echec 50M amende","solution":"KOS 0.3s SHA256","color":"#10b981"},
        {"title":"COBAC AML","subtitle":"50M FCFA jour perdus","problem":"Detection lente = amende","solution":"KOS temps reel 0.3s","color":"#ff4444"},
    ]
    for i,t in enumerate(topics):
        make_video_with_voice(t, i+1)

# Master 4: Voice FR Souveraine - 0 API - FIX Windows
from pathlib import Path
import subprocess, json

def tts_fr_piper(text, output="voices/kos_fr.wav"):
    Path("voices").mkdir(exist_ok=True)
    Path(output).parent.mkdir(exist_ok=True)
    model = Path("models/fr_FR-siwis-medium.onnx")
    model_json = Path("models/fr_FR-siwis-medium.onnx.json")

    if not model.exists():
        print("[VOIX] Download FR siwis...")
        import urllib.request
        base = "https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR/siwis/medium"
        urllib.request.urlretrieve(f"{base}/fr_FR-siwis-medium.onnx", str(model))
        urllib.request.urlretrieve(f"{base}/fr_FR-siwis-medium.onnx.json", str(model_json))
        print("Modele FR OK")

    # Fix: ecrit texte dans fichier temp, piper lit depuis stdin file
    tmp_txt = Path("voices/input.txt")
    tmp_txt.write_text(text, encoding="utf-8")

    cmd = [
        "piper",
        "--model", str(model),
        "--output_file", str(output)
    ]
    print(f"[VOIX FR] {text[:80]} -> {output}")
    with open(tmp_txt, "r", encoding="utf-8") as f_in:
        subprocess.run(cmd, stdin=f_in, check=True)

    print(f"Voix OK {Path(output).stat().st_size} bytes")
    return output

def tts_kos_script(topic):
    script = f"""BCEAO 2026. {topic['subtitle']}.
    Probleme: {topic['problem']}.
    Solution KOS RegTech: {topic['solution']}, detection en zero point trois seconde, audit trail SHA256 immutable.
    Big Four certifie cent sur cent. Demo sur app point khepraexperts point com slash pitch."""
    safe_name = topic['title'].replace(' ','_').replace('/','_')
    return tts_fr_piper(script, f"voices/{safe_name}.wav")

if __name__ == "__main__":
    tts_kos_script({"title":"BCEAO KYC","subtitle":"3 erreurs qui coutent 2 millions","problem":"audit manuel 90 pourcent echec","solution":"KOS 0 point 3 seconde"})

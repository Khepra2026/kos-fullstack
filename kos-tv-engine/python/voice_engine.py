VOICE_ID = "21m00Tcm4TlvDq8ikWAM"
def text_to_speech(text, output="kos-tv-engine/voices/output.mp3"):
    print(f"[VOICE] {len(text)} chars -> {output}")
    return output

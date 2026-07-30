# KOS TV MASTER 24/7 - 100% Souverain - 0 API externe
import time, json, subprocess
from kos_engine import KOSMediaEngine
from voice_engine_sovereign import tts_piper
from video_engine_sovereign import create_kos_shorts

class KOSTV24_7:
    def __init__(self):
        self.engine = KOSMediaEngine()
        self.running = True

    def cycle(self):
        topics = self.engine.scan_trends()
        topic = topics[0]
        print(f"\n=== KOS TV CYCLE {topic['topic']} ===")
        script = self.engine.generate_script(topic)
        print(script)

        # Voice souveraine
        voice_file = tts_piper(script)

        # Video souveraine
        video_file = create_kos_shorts(topic)

        # Audit
        audit = self.engine.audit_trail(script)
        print(f"AUDIT: {audit}")

        # YouTube upload (utilise ton token deja obtenu)
        print(f"[YOUTUBE] Pret a upload: {video_file} - Titre: {topic['angle']}")

        return {"topic": topic, "script": script, "video": video_file, "audit": audit}

    def run_24_7(self, interval_hours=2):
        while self.running:
            self.cycle()
            print(f"Sleep {interval_hours}h - Next cycle")
            time.sleep(interval_hours * 3600)

if __name__ == "__main__":
    tv = KOSTV24_7()
    tv.cycle() # Un cycle test
    # tv.run_24_7() # Decommente pour 24/7 reel

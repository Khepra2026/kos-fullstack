import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KHEPRA_VOICES: Record<string, { voice_id: string; name: string; accent: string; gender: string }> = {
  "celestin-koffi": {
    voice_id: "khepra_celestin_koffi",
    name: "Dr. Célestin Koffi — Expert Institutionnel",
    accent: "Français Afrique de l'Ouest — Autorité Calme",
    gender: "masculin",
  },
  "fatoumata-diallo": {
    voice_id: "khepra_fatoumata_diallo",
    name: "Fatoumata Diallo — Analyste Réglementaire",
    accent: "Français Afrique de l'Ouest — Précision Didactique",
    gender: "féminin",
  },
  "aminata-sow": {
    voice_id: "khepra_aminata_sow",
    name: "Aminata Sow — Conseillère Stratégique",
    accent: "Français Sénégal — Chaleur & Confiance",
    gender: "féminin",
  },
};

interface TTSRequest {
  text: string;
  voice?: string;
  stability?: number;
  similarity_boost?: number;
  model_id?: string;
  output_format?: string;
}

interface TTSResponse {
  audio_url: string | null;
  audio_base64: string | null;
  duration_sec: number;
  voice_used: string;
  model: string;
  characters: number;
  status: string;
  error?: string;
}

async function generateTTS(
  text: string,
  voiceId: string,
  stability: number,
  similarityBoost: number,
  modelId: string,
  outputFormat: string,
): Promise<{ audioBase64: string; durationSec: number }> {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const body = JSON.stringify({
    text,
    model_id: modelId,
    voice_settings: {
      stability,
      similarity_boost: similarityBoost,
    },
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": ELEVENLABS_API_KEY,
      "Accept": outputFormat === "mp3" ? "audio/mpeg" : "audio/mpeg",
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

  const estimatedDurationSec = text.length / 15;

  return { audioBase64, durationSec: estimatedDurationSec };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: TTSRequest = await req.json();
    const {
      text,
      voice = "celestin-koffi",
      stability = 0.5,
      similarity_boost = 0.75,
      model_id = "eleven_multilingual_v2",
      output_format = "mp3",
    } = body;

    if (!text || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Le paramètre text est requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ELEVENLABS_API_KEY) {
      console.warn("[VOICE-ENGINE] ELEVENLABS_API_KEY non configurée — fallback silencieux");

      const estimatedDuration = text.length / 15;
      return new Response(JSON.stringify({
        audio_url: null,
        audio_base64: null,
        duration_sec: estimatedDuration,
        voice_used: voice,
        model: model_id,
        characters: text.length,
        status: "fallback_no_key",
        error: "ELEVENLABS_API_KEY not configured. Add the key in Supabase Secrets to enable TTS.",
      } as TTSResponse), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const voiceConfig = KHEPRA_VOICES[voice] || KHEPRA_VOICES["celestin-koffi"];

    console.log(`[VOICE-ENGINE] Génération TTS: "${text.substring(0, 80)}..." → voix: ${voiceConfig.name}`);

    const { audioBase64, durationSec } = await generateTTS(
      text,
      voiceConfig.voice_id,
      stability,
      similarity_boost,
      model_id,
      output_format,
    );

    console.log(`[VOICE-ENGINE] TTS généré: ${text.length} caractères, ~${Math.round(durationSec)}s`);

    return new Response(JSON.stringify({
      audio_url: null,
      audio_base64: audioBase64,
      duration_sec: durationSec,
      voice_used: voiceConfig.name,
      model: model_id,
      characters: text.length,
      status: "generated",
    } as TTSResponse), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[VOICE-ENGINE] Erreur:", error);
    return new Response(JSON.stringify({
      audio_url: null,
      audio_base64: null,
      duration_sec: 0,
      voice_used: "",
      model: "",
      characters: 0,
      status: "error",
      error: error instanceof Error ? error.message : "Erreur interne TTS",
    } as TTSResponse), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

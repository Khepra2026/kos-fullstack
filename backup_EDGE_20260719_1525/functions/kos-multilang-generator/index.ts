import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ═══════════════════════════════════════════════════════════════════════════
// KOS MULTILANG GENERATOR — 18 Langues (12 Africaines + 6 Internationales)
// Pipeline: FR script → DeepL (si supporté) → Glossary fallback → 18 locales
// ═══════════════════════════════════════════════════════════════════════════

const LOCALES: Record<string, { name: string; deepl: string | null; tts: string; region: string }> = {
  fr: { name: 'Français', deepl: 'FR', tts: 'fr-FR', region: 'UEMOA/CEMAC' },
  en: { name: 'English', deepl: 'EN-GB', tts: 'en-US', region: 'International' },
  ar: { name: 'Arabic', deepl: 'AR', tts: 'ar-SA', region: 'International' },
  pt: { name: 'Portuguese', deepl: 'PT-PT', tts: 'pt-PT', region: 'International' },
  es: { name: 'Spanish', deepl: 'ES', tts: 'es-ES', region: 'International' },
  zh: { name: 'Chinese', deepl: 'ZH', tts: 'zh-CN', region: 'International' },
  ru: { name: 'Russian', deepl: 'RU', tts: 'ru-RU', region: 'International' },
  sw: { name: 'Swahili', deepl: 'EN-GB', tts: 'sw-KE', region: 'Afrique Est' },
  wo: { name: 'Wolof', deepl: null, tts: 'wo-SN', region: 'Sénégal' },
  ee: { name: 'Ewe', deepl: null, tts: 'ee-TG', region: 'Togo/Ghana' },
  ln: { name: 'Lingala', deepl: null, tts: 'ln-CD', region: 'RDC/Congo' },
  ha: { name: 'Hausa', deepl: null, tts: 'ha-NG', region: 'Nigeria/Sahel' },
  bm: { name: 'Bambara', deepl: null, tts: 'bm-ML', region: 'Mali' },
  dy: { name: 'Dioula', deepl: null, tts: 'dy-CI', region: 'CI/BF' },
  sg: { name: 'Sango', deepl: null, tts: 'sg-CF', region: 'Centrafrique' },
  ff: { name: 'Peul', deepl: null, tts: 'ff-SN', region: 'Sahel' },
  yo: { name: 'Yoruba', deepl: null, tts: 'yo-NG', region: 'Nigeria/Benin' },
  am: { name: 'Amharique', deepl: null, tts: 'am-ET', region: 'Éthiopie' },
};

const LOCAL_GLOSSARY: Record<string, Record<string, string>> = {
  wo: { BCEAO: 'BCEAO', compte: 'compte', bloquer: 'téye', PME: 'PME', diagnostic: 'diagnostic', gratuit: 'gratuit', Khepra: 'Khepra', amende: 'amende', TVA: 'TVA', retard: 'retard', sanction: 'sanction' },
  ee: { BCEAO: 'BCEAO', compte: 'akɔnta', bloquer: 'tu', PME: 'PME', diagnostic: 'diagnostic', gratuit: 'gratuit', Khepra: 'Khepra', TVA: 'TVA' },
  ln: { BCEAO: 'BCEAO', bloquer: 'kokanga', PME: 'PME', diagnostic: 'diagnostic', gratuit: 'gratuit', Khepra: 'Khepra', agrément: 'agrément', SFD: 'SFD', porte: 'porte' },
  ha: { BCEAO: 'BCEAO', compte: 'asusu', PME: 'PME', diagnostic: 'diagnostic', Khepra: 'Khepra', amende: 'tara', millions: 'miliyan' },
  bm: { BCEAO: 'BCEAO', crédit: 'jago', PME: 'PME', diagnostic: 'diagnostic', Khepra: 'Khepra', banque: 'banki', SYSCOHADA: 'SYSCOHADA' },
  dy: { BCEAO: 'BCEAO', contrôleur: 'contrôleur', PME: 'PME', diagnostic: 'diagnostic', Khepra: 'Khepra', CNPS: 'CNPS', maintenant: 'sisan' },
};

function glossaryTranslate(text: string, locale: string): string {
  const hooks = LOCAL_GLOSSARY[locale];
  if (!hooks) return text;
  let result = text;
  for (const [fr, local] of Object.entries(hooks)) {
    if (fr !== local) {
      result = result.replace(new RegExp(fr.replace(/[-\/\\^$*+?.()|[\]\]]/g, '\\$&'), 'gi'), local);
    }
  }
  return result;
}

function generateTags(locale: string): string[] {
  const regional: Record<string, string[]> = {
    wo: ['#BCEAO', '#PME', '#Senegal'], ee: ['#OHADA', '#Togo', '#PME'],
    ln: ['#COBAC', '#RDC', '#SFD'], ha: ['#CBN', '#Nigeria', '#SME'],
    bm: ['#BCEAO', '#Mali', '#PME'], dy: ['#BCEAO', '#CotedIvoire', '#PME'],
    sg: ['#COBAC', '#Centrafrique'], ff: ['#BCEAO', '#Sahel'],
    yo: ['#CBN', '#Nigeria'], am: ['#Ethiopie', '#Finance'],
    sw: ['#EAC', '#Kenya'], fr: ['#UEMOA', '#CEMAC'],
    en: ['#Africa', '#Finance'], ar: ['#UEMOA', '#Afrique'],
    pt: ['#PALOP', '#Africa'], es: ['#Africa'], zh: ['#Africa'], ru: ['#Africa'],
  };
  return ['#Khepra', '#KOS360', ...(regional[locale] || ['#Afrique', '#PME'])];
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const startTime = Date.now();

  try {
    const body = await req.json();
    const { script_fr, target_locales, topic } = body;
    if (!script_fr || typeof script_fr !== "string") {
      return new Response(JSON.stringify({ error: "script_fr string required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const locales = (target_locales && Array.isArray(target_locales) && target_locales.length > 0)
      ? target_locales.filter((l: string) => l in LOCALES)
      : Object.keys(LOCALES);

    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
    const hasDeepL = !!(Deno.env.get("DEEPL_API_KEY"));

    const scripts: Record<string, { script: string; title: string; tags: string[]; method: string }> = {};

    for (const locale of locales) {
      const config = LOCALES[locale];
      if (!config) continue;
      const topicStr = topic || script_fr.slice(0, 80);
      const tags = generateTags(locale);

      if (locale === 'fr') {
        scripts[locale] = { script: script_fr, title: topicStr, tags, method: 'source' };
      } else if (config.deepl && hasDeepL) {
        try {
          const deeplRes = await fetch("https://api-free.deepl.com/v2/translate", {
            method: "POST",
            headers: { "Authorization": `DeepL-Auth-Key ${Deno.env.get("DEEPL_API_KEY")}`, "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ text: script_fr.slice(0, 2000), target_lang: config.deepl, source_lang: 'FR' }).toString(),
          });
          if (deeplRes.ok) {
            const data = await deeplRes.json();
            scripts[locale] = { script: data.translations?.[0]?.text || script_fr, title: topicStr, tags, method: 'deepl' };
          } else {
            scripts[locale] = { script: glossaryTranslate(script_fr, locale), title: topicStr, tags, method: 'glossary_fallback' };
          }
        } catch {
          scripts[locale] = { script: glossaryTranslate(script_fr, locale), title: topicStr, tags, method: 'glossary_fallback' };
        }
      } else {
        scripts[locale] = { script: glossaryTranslate(script_fr, locale), title: topicStr, tags, method: 'glossary' };
      }
    }

    if (topic) {
      try {
        await supabase.from("khepra_contents").insert(
          Object.entries(scripts).map(([locale, data]) => ({ locale, script: data.script, title: data.title, tags: data.tags, status: 'draft' }))
        );
      } catch { /* non-blocking */ }
    }

    const methods: Record<string, number> = {};
    Object.values(scripts).forEach(s => { methods[s.method] = (methods[s.method] || 0) + 1; });

    return new Response(JSON.stringify({
      scripts, locales_generated: Object.keys(scripts).length,
      locales_total: locales.length, translation_methods: methods,
      deepl_available: hasDeepL, latency_ms: Date.now() - startTime,
      pipeline: "KOS Multilang Generator → 18 Langues → DeepL + Glossary Fallback",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: errorMessage, latency_ms: Date.now() - startTime }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
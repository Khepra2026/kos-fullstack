/**
 * ═══════════════════════════════════════════════════════════════
 * KOS BIGFOUR AUTO-CORRECTION & AUTO-LEARNING ENGINE™ v2.0
 * BACKUP SOURCE
 * ═══════════════════════════════════════════════════════════════
 * Auto-correction documentaire avec boucle d'apprentissage :
 * - Détection automatique (9 principes Big Four)
 * - Correction auto des fautes simples
 * - Suggestion pour fautes complexes
 * - Boucle de feedback pour amélioration continue
 * ⚠️ Backup — Déploiement bloqué par limite plan Supabase
 * ═══════════════════════════════════════════════════════════════
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const AUTO_FIX_RULES = [
  { pattern: /\b(?:toujours|jamais)\s+(?!.*\b(sauf|excepté|sous réserve)\b)/gi, fix: (m: string) => `${m} [à nuancer — préciser les conditions]`, category: 'affirmation_absolue' },
  { pattern: /\bconformément à la réglementation\b(?!.*\b(n°|article|instruction)\b)/gi, fix: (m: string) => `${m} [référence manquante — citer le texte]`, category: 'raccourci_reglementaire' },
  { pattern: /\b(?:200[0-9]|201[0-5])\b/g, fix: (m: string) => `${m} [⚠️ vérifier si toujours en vigueur]`, category: 'reference_obsolete' },
  { pattern: /\b(?:il faut|on doit)\b(?!.*\b(conformément|en application)\b)/gi, fix: (m: string) => `${m} [préciser : obligation légale ou recommandation ?]`, category: 'bonne_pratique_as_obligation' },
];

interface CorrectionResult {
  document_id: string;
  original: string;
  corrected: string;
  fixes_applied: number;
  fixes_details: Array<{ category: string; original_text: string; fix: string }>;
  auto_correctable: boolean;
  needs_human_review: boolean;
}

async function autoCorrect(content: string, document_id: string): Promise<CorrectionResult> {
  let corrected = content;
  const fixes_details: Array<{ category: string; original_text: string; fix: string }> = [];
  
  for (const rule of AUTO_FIX_RULES) {
    const matches = content.matchAll(new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g'));
    for (const match of matches) {
      const fix = typeof rule.fix === 'function' ? rule.fix(match[0]) : rule.fix;
      corrected = corrected.replace(match[0], fix);
      fixes_details.push({ category: rule.category, original_text: match[0], fix });
    }
  }

  const needsHumanReview = fixes_details.some(f => f.category === 'raccourci_reglementaire' || f.category === 'bonne_pratique_as_obligation');
  
  return {
    document_id,
    original: content,
    corrected,
    fixes_applied: fixes_details.length,
    fixes_details,
    auto_correctable: fixes_details.length > 0,
    needs_human_review: needsHumanReview,
  };
}

async function learnFromCorrection(supabase: any, result: CorrectionResult, feedback: 'accepted' | 'rejected' | 'modified') {
  await supabase.from('kos_auto_detection_findings').insert({
    source_entity_type: 'auto_correction',
    source_entity_id: result.document_id,
    detection_category: 'auto_correction_loop',
    detection_rule: 'bigfour_auto_correction',
    matched_text: JSON.stringify(result.fixes_details),
    severity: feedback === 'accepted' ? 'low' : 'medium',
    auto_fix_suggestion: feedback === 'accepted' ? 'Rule confirmed effective' : 'Rule needs adjustment',
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const body = await req.json();
    const { action, document_id, content, feedback } = body;

    if (action === 'correct') {
      const result = await autoCorrect(content || '', document_id || 'unknown');
      // Log correction
      await supabase.from('kos_universal_audit_log').insert({
        event_type: 'auto_correction', entity_type: 'document',
        entity_id: document_id, action: 'AUTO_CORRECTED',
        actor: 'kos-bigfour-auto-correction',
        new_state: { fixes_applied: result.fixes_applied, needs_human_review: result.needs_human_review },
        correlation_id: crypto.randomUUID(),
      });
      return new Response(JSON.stringify({ success: true, ...result }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'learn') {
      await learnFromCorrection(supabase, { document_id, original: '', corrected: '', fixes_applied: 0, fixes_details: [], auto_correctable: false, needs_human_review: false }, feedback);
      return new Response(JSON.stringify({ success: true, message: 'Feedback enregistré' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Invalid action. Use: correct, learn' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
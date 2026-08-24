import { supabase } from '@/lib/supabase';
import { content } from '@/types/kos';
import { VeilleAnalysis } from '@/agents/VeilleAgent';

function selectBestCTA(regType: string): string {
  const ctas: Record<string, string> = {
    LBCFT: 'Téléchargez notre check-list de mise en conformité LBC-FT',
    IFRS: 'Réservez un diagnostic IFRS 9 avec nos experts',
    ESG: 'Recevez notre guide complet ESG pour institutions financières',
    COBAC: 'Planifiez un audit de conformité COBAC',
    default: 'Contactez Khepra Experts pour un accompagnement sur mesure',
  };
  return ctas[regType] || ctas.default;
}

export function useCopywritingAgent() {
  const generateArticle = async (reg: VeilleAnalysis): Promise<Partial<content>> => {
    const prompt = `
    Structure obligatoire: Hook -> Contexte -> Problématique -> Analyse -> Recommandations -> Valeur ajoutée -> CTA
    Optimisations: AIDA, PAS, StoryBrand, SEO, EEAT, NLP, Conversion
    Longueur: 1500-4000 mots
    Ton: Khepra Experts, niveau Big Four
    Réglementation: ${JSON.stringify(reg)}
    `;

    try {
      const { data, error } = await supabase.functions.invoke('kos-ai-router-v2', {
        body: { prompt, model: 'kos-regtech' },
      });

      if (error) throw new Error(error.message);

      const content = (data as { content?: Record<string, unknown> })?.content || data || {};
      return {
        ...(content as Record<string, unknown>),
        id: `ART-${Date.now()}`,
        faq: (content as Record<string, unknown>).faq || [],
        cta: selectBestCTA(reg.source),
        bibliography: reg.sources,
        sources: reg.sources,
        version: '1.0',
        type: 'veille',
        images: [],
        tables: [],
        infographies: [],
      } as Partial<content>;
    } catch {
      return {
        id: `ART-${Date.now()}`,
        title: reg.title,
        body: reg.rawText || reg.summary,
        hook: `Nouvelle réglementation ${reg.source} publiée — êtes-vous prêts ?`,
        contexte: `Le ${reg.source} a publié le document ${reg.docId}.`,
        problematique: `Les entités régulées doivent se mettre en conformité avant ${reg.deadline || 'la date limite'}.`,
        analyse: reg.summary,
        recommandations: reg.keyPoints,
        valeurAjoutee: 'Khepra Experts accompagne les institutions financières sur ces enjeux.',
        cta: selectBestCTA(reg.source),
        faq: [],
        images: [],
        tables: [],
        infographies: [],
        bibliography: reg.sources,
        sources: reg.sources,
        version: '1.0',
        type: 'veille',
      };
    }
  };

  return { generateArticle };
}




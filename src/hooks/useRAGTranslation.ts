import { useState, useCallback } from 'react';

type Lang = 'fr' | 'en';
type TargetLang = 'en' | 'pt' | 'ar';

interface TranslationCache {
  [key: string]: string; // key format: "fr:{targetLang}:{text}"
}

// ─── Static UI label translations ───
const UI: Record<string, string> = {
  // RAGOrchestratorPanel
  'KOS RAG Orchestrator': 'KOS RAG Orchestrator',
  'Collecte automatique des sources réglementaires': 'Automatic regulatory source collection',
  'Cron actif (dim. 2h)': 'Cron active (Sun 2 AM)',
  'Documents RAG': 'RAG Documents',
  'Depuis sources web': 'From web sources',
  'Saisis manuellement': 'Manually entered',
  'Sources connectées': 'Connected sources',
  'Filtrer par domaine': 'Filter by domain',
  'Source cible (optionnel — laisse vide pour toutes)': 'Target source (optional — leave empty for all)',
  'Dry-Run': 'Dry-Run',
  'Lancer Collecte': 'Launch Collection',
  'Rafraîchir': 'Refresh',
  'Aucun document issu de la collecte automatique': 'No documents from automatic collection',
  'Erreur': 'Error',
  'KOS Automaton en cours d\'exécution...': 'KOS Automaton running...',
  'Dry-Run terminé': 'Dry-Run completed',
  'Collecte terminée': 'Collection completed',
  'Collectés': 'Collected',
  'Ignorés (doublons)': 'Skipped (duplicates)',
  'Échoués': 'Failed',
  'Total en base:': 'Total in database:',
  'documents': 'documents',
  'Logs KOS Automaton': 'KOS Automaton Logs',
  'Répartition par source': 'Breakdown by source',
  'Régulation bancaire': 'Banking Regulation',
  'Marchés financiers': 'Financial Markets',
  'LBC/FT': 'AML/CFT',
  'Droit & Commerce': 'Law & Commerce',
  'Intégration régionale': 'Regional Integration',
  'Normes & Audit': 'Standards & Audit',
  'Développement & Fiscalité': 'Development & Taxation',
  'Cyber & Tech': 'Cyber & Tech',
  'Autres': 'Others',
  // Knowledge Center
  'Khepra Knowledge Center™': 'Khepra Knowledge Center™',
  'Bibliothèque experte de ressources professionnelles : guides, modèles, checklists, matrices et diagnostics.': 'Expert library of professional resources: guides, templates, checklists, matrices, and diagnostics.',
  'Téléchargez les outils utilisés par les Big Four, adaptés au contexte africain.': 'Download tools used by the Big Four, adapted to the African context.',
  'Lead Scoring actif': 'Lead Scoring active',
  'Ressources': 'Resources',
  'Téléchargements': 'Downloads',
  'Leads Générés': 'Leads Generated',
  'Guides Pratiques': 'Practical Guides',
  'Modèles & Templates': 'Models & Templates',
  'Checklists': 'Checklists',
  'Matrices': 'Matrices',
  'Diagnostics': 'Diagnostics',
  'Aucune ressource trouvée.': 'No resources found.',
  'Performance Knowledge Center': 'Knowledge Center Performance',
  'Guides': 'Guides',
  'Modèles': 'Models',
  'Leads/mois': 'Leads/month',
  'Indicateurs Clés — Khepra Knowledge Center™': 'Key Indicators — Khepra Knowledge Center™',
  'Ressources Total': 'Total Resources',
  'Taux Conversion': 'Conversion Rate',
  'Moyen': 'Average',
  'Top Ressource': 'Top Resource',
  'Revenus Attribués': 'Attributed Revenue',
  'par mois': 'per month',
  'catégories': 'categories',
  'téléchargements': 'downloads',
  'Télécharger cette ressource': 'Download this resource',
  'Remplissez le formulaire ci-dessous pour recevoir le lien de téléchargement par email.': 'Fill out the form below to receive the download link by email.',
  'Nom': 'Name',
  'Prénom': 'First Name',
  'Email professionnel': 'Professional Email',
  'Fonction': 'Position',
  'Entreprise': 'Company',
  'Secteur d\'activité': 'Industry',
  'Sélectionnez...': 'Select...',
  'Banque / Finance': 'Banking / Finance',
  'Microfinance / SFD': 'Microfinance / SFD',
  'Assurance': 'Insurance',
  'FinTech': 'FinTech',
  'Industrie': 'Industry',
  'Services': 'Services',
  'Secteur Public': 'Public Sector',
  'Autre': 'Other',
  'Télécharger gratuitement': 'Download for free',
  'Vos données sont confidentielles. Consultez notre politique de confidentialité.': 'Your data is confidential. See our privacy policy.',
  'Chargement des ressources Knowledge Center...': 'Loading Knowledge Center resources...',
  'Impossible de charger les données live': 'Unable to load live data',
  'Réessayer': 'Retry',
  'Les données mock sont affichées en fallback.': 'Mock data displayed as fallback.',
  'questions': 'questions',
  'complétions': 'completions',
  'Lancer': 'Launch',
  'Ressource envoyée par email !': 'Resource sent by email!',
  'Le lien de téléchargement vous a été adressé.': 'The download link has been sent to you.',
  'Voir dans Lead Scoring Command': 'View in Lead Scoring Command',
  'Scoring en cours...': 'Scoring in progress...',
  'Analyse du profil lead en temps réel': 'Real-time lead profile analysis',
  'Erreur de scoring': 'Scoring error',
  'La ressource a bien été envoyée. Réessayez plus tard.': 'The resource has been sent. Please try again later.',
  'LEAD SCORE': 'LEAD SCORE',
  'CHAUD': 'HOT',
  'TIÈDE': 'WARM',
  'FROID': 'COLD',
  'Engagement': 'Engagement',
  'Fit': 'Fit',
  'Urgence': 'Urgency',
  'Budget': 'Budget',
  'Priorité': 'Priority',
  'Réponse recommandée :': 'Recommended response:',
  'Stocké CRM': 'Stored CRM',
  'Next Best Action': 'Next Best Action',
  'Rechercher dans': 'Search in',
  'Pages': 'Pages',
  'Items': 'Items',
  'conv.': 'conv.',
  '/mois': '/month',
  'DONNÉES LIVE — SUPABASE': 'LIVE DATA — SUPABASE',
  'DONNÉES MOCK — DÉMO': 'MOCK DATA — DEMO',
  'KHEPRA KNOWLEDGE CENTER™ — Bibliothèque Numérique de Référence': 'KHEPRA KNOWLEDGE CENTER™ — Digital Reference Library',
  'Mode impression actif': 'Print mode active',
  'Mode impression': 'Print mode',
  'Imprimer': 'Print',
  'Nouvelle recherche': 'New search',
  'Moteur KOS Automaton v2 —': 'KOS Automaton Engine v2 —',
  'documents publics': 'public documents',
  '100+ documents indexés': '100+ indexed documents',
  'TF-IDF Cosine': 'TF-IDF Cosine',
  'vectorisés': 'vectorized',
  'Recherche hybride : TF-IDF Cosine (actif) + pgvector Cosine Similarity (activé dès que les embeddings sont générés).': 'Hybrid search: TF-IDF Cosine (active) + pgvector Cosine Similarity (activated once embeddings are generated).',
  'Aucun embedding vectoriel pour le moment — la recherche sémantique classique reste opérationnelle.': 'No vector embeddings yet — classic semantic search remains operational.',
  'Entrez une recherche': 'Enter a search',
  'Saisissez au moins 3 caractères pour lancer une recherche sémantique': 'Enter at least 3 characters to launch a semantic search',
  'Aucun document trouvé': 'No documents found',
  'Essayez avec d\'autres termes réglementaires ou élargissez votre recherche': 'Try other regulatory terms or broaden your search',
};

const TARGET_LANG_LABELS: Record<TargetLang, string> = {
  en: 'EN',
  pt: 'PT',
  ar: 'AR',
};

// Module-level shared cache so multiple hook instances share translations
const sharedCache: TranslationCache = {};
const sharedPending: Map<string, Promise<string>> = new Map();

export interface UseRAGTranslationReturn {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isEn: boolean;
  targetLang: TargetLang;
  setTargetLang: (tl: TargetLang) => void;
  targetLabels: typeof TARGET_LANG_LABELS;
  t: (fr: string, en?: string) => string;
  translateText: (text: string) => Promise<string>;
  translateBatch: (texts: string[]) => Promise<string[]>;
  translating: boolean;
  getCached: (text: string) => string | null;
  cacheCount: number;
  exportCache: (format: 'csv' | 'json') => void;
}

export function useRAGTranslation(): UseRAGTranslationReturn {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('kos_rag_lang') as Lang) || 'fr';
    } catch {
      return 'fr';
    }
  });
  const [targetLang, setTargetLangState] = useState<TargetLang>(() => {
    try {
      return (localStorage.getItem('kos_rag_target_lang') as TargetLang) || 'en';
    } catch {
      return 'en';
    }
  });
  const [translating, setTranslating] = useState(false);

  const isEn = lang === 'en';

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try { localStorage.setItem('kos_rag_lang', newLang); } catch { /* noop */ }
  }, []);

  const setTargetLang = useCallback((tl: TargetLang) => {
    setTargetLangState(tl);
    try { localStorage.setItem('kos_rag_target_lang', tl); } catch { /* noop */ }
  }, []);

  const t = useCallback((fr: string, en?: string): string => {
    if (lang === 'fr') return fr;
    if (en) return en;
    if (UI[fr]) return UI[fr];
    return fr;
  }, [lang]);

  const getCached = useCallback((text: string): string | null => {
    const key = `fr:${targetLang}:${text}`;
    return sharedCache[key] || null;
  }, [targetLang]);

  const translateText = useCallback(async (text: string): Promise<string> => {
    if (!text || text.trim().length === 0) return text;
    if (lang === 'fr') return text;

    const cacheKey = `fr:${targetLang}:${text}`;
    if (sharedCache[cacheKey]) return sharedCache[cacheKey];
    if (sharedPending.has(cacheKey)) return sharedPending.get(cacheKey)!;

    // For very short strings (1-2 words), try static UI lookup (EN only)
    if (targetLang === 'en' && text.length < 30 && UI[text]) {
      sharedCache[cacheKey] = UI[text];
      return UI[text];
    }

    const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

    const promise = (async () => {
      try {
        const resp = await fetch(`${supabaseUrl}/functions/v1/kos-automaton-engine`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            operation: 'translate',
            content: text,
            source_lang: 'fr',
            target_lang: targetLang,
          }),
        });
        if (!resp.ok) return text;
        const data = await resp.json();
        if (data.success && data.translated) {
          sharedCache[cacheKey] = data.translated;
          return data.translated;
        }
        return text;
      } catch {
        return text;
      } finally {
        sharedPending.delete(cacheKey);
      }
    })();

    sharedPending.set(cacheKey, promise);

    try {
      setTranslating(true);
      return await promise;
    } finally {
      setTranslating(false);
    }
  }, [lang, targetLang]);

  const translateBatch = useCallback(async (texts: string[]): Promise<string[]> => {
    if (lang === 'fr') return texts;
    setTranslating(true);
    try {
      return await Promise.all(texts.map((t) => translateText(t)));
    } finally {
      setTranslating(false);
    }
  }, [lang, translateText]);

  const cacheCount = Object.keys(sharedCache).length;

  const exportCache = useCallback((format: 'csv' | 'json') => {
    const entries = Object.entries(sharedCache);
    if (entries.length === 0) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    let blob: Blob;
    let ext: string;

    if (format === 'json') {
      const groups: Record<string, Record<string, string>> = {};
      entries.forEach(([k, v]) => {
        // k format: "fr:{targetLang}:{text}"
        const parts = k.split(':');
        const pair = `${parts[0]}→${parts[1]}`;
        const original = parts.slice(2).join(':');
        if (!groups[pair]) groups[pair] = {};
        groups[pair][original] = v;
      });
      blob = new Blob([JSON.stringify(groups, null, 2)], { type: 'application/json' });
      ext = 'json';
    } else {
      const header = 'source_lang,target_lang,original_fr,translated';
      const rows = entries.map(([k, v]) => {
        const parts = k.split(':');
        const src = parts[0];
        const tgt = parts[1];
        const original = parts.slice(2).join(':');
        return `"${src}","${tgt}","${original.replace(/"/g, '""')}","${v.replace(/"/g, '""')}"`;
      });
      blob = new Blob([header + '\n' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      ext = 'csv';
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kos-translations-${timestamp}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return {
    lang,
    setLang,
    isEn,
    targetLang,
    setTargetLang,
    targetLabels: TARGET_LANG_LABELS,
    t,
    translateText,
    translateBatch,
    translating,
    getCached,
    cacheCount,
    exportCache,
  };
}
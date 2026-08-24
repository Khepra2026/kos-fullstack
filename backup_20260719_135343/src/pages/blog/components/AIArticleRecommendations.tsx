import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';

interface AIRecommendation {
  titre: string;
  categorie: string;
  raison: string;
}

interface AIRecommendResponse {
  success?: boolean;
  recommendations?: AIRecommendation[];
  source_article?: string;
  tokens_used?: number;
  error?: string;
  status?: string;
  message?: string;
}

interface AIArticleRecommendationsProps {
  articleContent: string | string[];
  articleTitle: string;
  articleCategory: string;
  articleTags: string[];
  articleId: string;
  className?: string;
}

function getCategoryIcon(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes('gouvernance') || lower.includes('governance')) return 'ri-organization-chart';
  if (lower.includes('conformité') || lower.includes('compliance') || lower.includes('réglementaire')) return 'ri-shield-check-line';
  if (lower.includes('finance') || lower.includes('investissement') || lower.includes('fundraising')) return 'ri-money-dollar-circle-line';
  if (lower.includes('esg') || lower.includes('durable')) return 'ri-leaf-line';
  if (lower.includes('prix de transfert') || lower.includes('fiscal')) return 'ri-exchange-dollar-line';
  if (lower.includes('digitale') || lower.includes('digital')) return 'ri-smartphone-line';
  if (lower.includes('due diligence') || lower.includes('acquisition')) return 'ri-file-search-line';
  if (lower.includes('microfinance') || lower.includes('sfd')) return 'ri-bank-line';
  return 'ri-article-line';
}

export default function AIArticleRecommendations({ articleContent, articleTitle, articleCategory, articleTags, articleId, className = '' }: AIArticleRecommendationsProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [recommendations, setRecommendations] = useState<AIRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const [apiMissing, setApiMissing] = useState(false);

  const generateRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('kos-automaton-engine', {
        body: {
          operation: 'recommend',
          content: articleContent,
          titre: articleTitle,
          tags: articleTags,
          limit: 5,
        },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Erreur edge function');
      }

      const response = data as AIRecommendResponse;

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.recommendations && response.recommendations.length > 0) {
        setRecommendations(response.recommendations);
        setGenerated(true);
      } else {
        throw new Error('Aucune recommandation générée');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setApiMissing(message.includes('api_key_missing'));
    } finally {
      setLoading(false);
    }
  }, [articleContent, articleTitle, articleCategory, articleTags, isEn]);

  if (generated && recommendations && recommendations.length > 0) {
    return (
      <div className={`rounded-2xl border border-accent-200 bg-gradient-to-br from-accent-50/60 to-background-50 p-5 sm:p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
            <i className="ri-sparkling-2-line text-white text-sm" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground-950">
              {isEn ? 'AI-Recommended Reads' : 'Lectures Recommandées par IA'}
            </h4>
            <p className="text-[10px] text-foreground-400">
              {isEn ? 'KOS AI — Content Intelligence' : 'KOS AI — Intelligence de Contenu'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="rounded-xl bg-background-50 border border-background-100 p-3.5 hover:border-accent-200 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className={`${getCategoryIcon(rec.categorie)} text-accent-600 text-xs`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-foreground-950 leading-snug mb-1">
                    {rec.titre}
                  </h5>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-100 text-accent-700 mb-1.5">
                    {rec.categorie}
                  </span>
                  <p className="text-xs text-foreground-500 leading-relaxed">
                    {rec.raison}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (apiMissing) {
    return (
      <div className={`rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-key-2-line text-amber-600 text-sm" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground-950 mb-1">
              {isEn ? 'AI Recommendations — Coming Soon' : 'Recommandations IA — Bientôt Disponibles'}
            </h4>
            <p className="text-xs text-foreground-500 leading-relaxed">
              {isEn
                ? 'AI-powered article recommendations will be available once the KOS Automaton engine is fully configured.'
                : 'Les recommandations d\'articles par IA seront disponibles dès que le moteur KOS Automaton sera configuré.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-background-200 bg-background-50 p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center">
          <i className="ri-radar-line text-foreground-500 text-sm" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground-950">
            {isEn ? 'AI-Powered Recommendations' : 'Recommandations IA'}
          </h4>
          <p className="text-[10px] text-foreground-400">
            {isEn ? 'Discover related content' : 'Découvrez du contenu pertinent'}
          </p>
        </div>
      </div>

      <p className="text-xs text-foreground-500 mb-4 leading-relaxed">
        {isEn
          ? 'Let KOS AI analyze this article and suggest related content based on semantic similarity. Discover articles you might have missed.'
          : 'Laissez KOS IA analyser cet article et suggérer du contenu connexe basé sur la similarité sémantique. Découvrez des articles que vous auriez pu manquer.'}
      </p>

      {error && !apiMissing && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
          <i className="ri-error-warning-line mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={generateRecommendations}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 text-white font-semibold text-sm hover:bg-accent-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {isEn ? 'Analyzing...' : 'Analyse en cours...'}
          </>
        ) : (
          <>
            <i className="ri-radar-line" />
            {isEn ? 'Discover Related Articles' : 'Découvrir des Articles Connexes'}
          </>
        )}
      </button>
    </div>
  );
}




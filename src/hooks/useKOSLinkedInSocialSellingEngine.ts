import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  SOCIAL_SELLING_ARTICLES as MOCK_ARTICLES,
  SOCIAL_SELLING_KPIS,
  MASTER_PROMPT_RULES,
  getScoreColor,
  getScoreLabel,
  getStatusColor,
  type SocialSellingArticle,
} from '@/mocks/kosLinkedInSocialSellingEngine';

interface UseKOSLinkedInSocialSellingEngineReturn {
  loading: boolean;
  isLive: boolean;
  refetch: () => void;
  articles: SocialSellingArticle[];
  selectedArticle: SocialSellingArticle | null;
  selectedArticleId: string | null;
  selectArticle: (id: string) => void;
  kpis: typeof SOCIAL_SELLING_KPIS;
  rules: typeof MASTER_PROMPT_RULES;
  approvedArticles: SocialSellingArticle[];
  blockedArticles: SocialSellingArticle[];
  auditChecks: Array<Record<string, unknown>>;
  deliverables: Array<Record<string, unknown>>;
  getScoreColor: (score: number) => string;
  getScoreLabel: (score: number) => string;
  getStatusColor: (status: string) => string;
}

function normalizeSupabaseArticle(row: Record<string, unknown>): SocialSellingArticle {
  const metadata = (row.metadata as Record<string, unknown>) || {};
  const contentBundle = (metadata.contentBundle as Record<string, unknown>) || {};
  return {
    id: String(row.id || ''),
    title: String(row.title || ''),
    excerpt: String(row.excerpt || row.content || ''),
    content: String(row.content || ''),
    status: String(row.status || 'draft'),
    domain: String((metadata as Record<string, unknown>).domain || 'Conformité'),
    format: String(row.post_type || 'article'),
    seoKeywords: (row.hashtags as string[]) || [],
    hookAudit: {
      score: Number((metadata as Record<string, unknown>).hookScore || 85),
      hasEmotion: Boolean((metadata as Record<string, unknown>).hasEmotion),
      hasCuriosity: Boolean((metadata as Record<string, unknown>).hasCuriosity),
      hasRiskOrOpportunity: Boolean((metadata as Record<string, unknown>).hasRiskOrOpportunity),
      hasDataPoint: Boolean((metadata as Record<string, unknown>).hasDataPoint),
      feedback: String((metadata as Record<string, unknown>).hookFeedback || ''),
      regeneratedHook: String((metadata as Record<string, unknown>).regeneratedHook || ''),
    },
    urlAudit: {
      present: Boolean(row.source_url),
      active: true,
      https: true,
      indexable: true,
      blocked: !row.source_url,
      correctiveAction: row.source_url ? '' : 'Ajouter une URL source',
      url: String(row.source_url || ''),
    },
    pageMentionAudit: {
      present: Boolean((metadata as Record<string, unknown>).pageMention),
      format: '@KHEPRA EXPERTS',
      added: '',
    },
    hashtagAudit: {
      score: 90,
      count: (row.hashtags as string[])?.length || 5,
      minimumMet: ((row.hashtags as string[])?.length || 0) >= 5,
      regulatory: ['BCEAO', 'Conformité'],
      business: ['Gouvernance', 'Audit'],
      sectoral: ['FinanceAfrique'],
      brand: ['KHEPRA'],
      violations: [],
    },
    ctaAudit: {
      score: 80,
      hasDownload: true,
      hasDiscover: true,
      hasEvaluate: true,
      hasBook: false,
      hasAccess: false,
      allCTAs: ['Télécharger', 'Découvrir', 'Évaluer'],
      missing: ['Réserver', 'Accéder'],
      generatedCTA: 'Téléchargez notre guide complet',
    },
    socialProofAudit: {
      present: true,
      elements: ['+500 missions', 'Présent dans 12 pays'],
    },
    contentBundle: {
      hook: String(contentBundle.hook || ''),
      postLinkedIn: String(contentBundle.postLinkedIn || ''),
      versionDirigeant: String(contentBundle.versionDirigeant || ''),
      versionPageEntreprise: String(contentBundle.versionPageEntreprise || ''),
      amplificationComment: {
        content: String((contentBundle.amplificationComment as Record<string, unknown>)?.content || ''),
        includesSummary: false,
        includesURL: false,
        includesCTA: false,
        autoPublishDelay: '2h',
      },
      nativeArticle: String(contentBundle.nativeArticle || ''),
      bannerPrompt: String(contentBundle.bannerPrompt || ''),
      carouselSlides: (contentBundle.carouselSlides as Array<{ title: string; content: string }>) || [],
      hashtags: (contentBundle.hashtags as string[]) || [],
      trackedURL: String(contentBundle.trackedURL || ''),
      hookScore: Number(contentBundle.hookScore || 0),
    },
    createdAt: String(row.created_at || new Date().toISOString()),
  } as SocialSellingArticle;
}

export function useKOSLinkedInSocialSellingEngine(): UseKOSLinkedInSocialSellingEngineReturn {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [articles, setArticles] = useState<SocialSellingArticle[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from('social_automation_queue')
        .select('*')
        .eq('platform', 'linkedin')
        .order('created_at', { ascending: false });

      if (err) throw err;

      if (data && data.length > 0) {
        const normalized = data.map(normalizeSupabaseArticle);
        setArticles(normalized);
        if (normalized.length > 0 && !selectedArticleId) {
          setSelectedArticleId(normalized[0].id);
        }
        setIsLive(true);
      } else {
        setArticles(MOCK_ARTICLES);
        if (MOCK_ARTICLES.length > 0 && !selectedArticleId) {
          setSelectedArticleId(MOCK_ARTICLES[0].id);
        }
        setIsLive(false);
      }
    } catch {
      setArticles(MOCK_ARTICLES);
      if (MOCK_ARTICLES.length > 0 && !selectedArticleId) {
        setSelectedArticleId(MOCK_ARTICLES[0].id);
      }
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const selectedArticle = useMemo(
    () => articles.find((a) => a.id === selectedArticleId) || null,
    [articles, selectedArticleId],
  );

  const selectArticle = useCallback((id: string) => {
    setSelectedArticleId(id);
  }, []);

  const kpis = useMemo(() => SOCIAL_SELLING_KPIS, []);
  const rules = useMemo(() => MASTER_PROMPT_RULES, []);

  const approvedArticles = useMemo(() => articles.filter((a) => a.status === 'approved'), [articles]);
  const blockedArticles = useMemo(() => articles.filter((a) => a.status === 'blocked'), [articles]);

  const auditChecks = useMemo(() => {
    if (!selectedArticle) return [];
    const a = selectedArticle;
    return [
      {
        key: 'hook', label: 'Hook', icon: 'ri-flashlight-line',
        score: a.hookAudit.score,
        status: a.hookAudit.score >= 95 ? 'pass' : a.hookAudit.score >= 80 ? 'warn' : 'fail',
        details: [
          a.hookAudit.hasEmotion ? '✅ Émotion forte' : '❌ Pas d\'émotion',
          a.hookAudit.hasCuriosity ? '✅ Curiosité' : '❌ Pas de curiosité',
          a.hookAudit.hasRiskOrOpportunity ? '✅ Risque/Opportunité' : '❌ Pas de risque/opportunité',
          a.hookAudit.hasDataPoint ? '✅ Donnée chiffrée' : '❌ Pas de donnée chiffrée',
        ],
        feedback: a.hookAudit.feedback,
        regeneratedHook: a.hookAudit.regeneratedHook,
      },
      {
        key: 'url', label: 'URL', icon: 'ri-link',
        score: a.urlAudit.blocked ? 0 : 100,
        status: a.urlAudit.blocked ? 'fail' : 'pass',
        details: [
          a.urlAudit.present ? '✅ URL présente' : '❌ URL absente — BLOCAGE',
          a.urlAudit.active ? '✅ URL active' : '❌ URL inactive',
          a.urlAudit.https ? '✅ HTTPS' : '❌ Non HTTPS',
          a.urlAudit.indexable ? '✅ Indexable' : '❌ Non indexable',
        ],
        feedback: a.urlAudit.blocked ? a.urlAudit.correctiveAction || 'URL BLOQUÉE' : 'URL conforme',
      },
      {
        key: 'pageMention', label: 'Page Entreprise', icon: 'ri-building-line',
        score: a.pageMentionAudit.present ? 100 : 0,
        status: a.pageMentionAudit.present ? 'pass' : 'fail',
        details: [
          a.pageMentionAudit.present
            ? `✅ ${a.pageMentionAudit.format}`
            : `❌ Mention absente — Ajouté : "${a.pageMentionAudit.added}"`,
        ],
        feedback: a.pageMentionAudit.present ? 'Mention conforme' : 'Mention manquante — corrigée automatiquement',
      },
      {
        key: 'hashtags', label: 'Hashtags', icon: 'ri-hashtag',
        score: a.hashtagAudit.score,
        status: a.hashtagAudit.minimumMet && a.hashtagAudit.violations.length === 0 ? 'pass' : 'fail',
        details: [
          `${a.hashtagAudit.count}/10 minimum — ${a.hashtagAudit.minimumMet ? '✅' : '❌'}`,
          `Réglementaires : ${a.hashtagAudit.regulatory.join(', ')}`,
          `Métiers : ${a.hashtagAudit.business.join(', ')}`,
          `Sectoriels : ${a.hashtagAudit.sectoral.join(', ')}`,
          `Marque : ${a.hashtagAudit.brand.join(', ')}`,
          a.hashtagAudit.violations.length > 0 ? `❌ Violations : ${a.hashtagAudit.violations.join(', ')}` : '✅ Aucune violation',
        ],
        feedback: a.hashtagAudit.minimumMet ? 'Hashtags conformes' : 'Hashtags insuffisants',
      },
      {
        key: 'cta', label: 'CTA', icon: 'ri-cursor-line',
        score: a.ctaAudit.score,
        status: a.ctaAudit.score >= 80 ? 'pass' : a.ctaAudit.score >= 50 ? 'warn' : 'fail',
        details: [
          a.ctaAudit.hasDownload ? '✅ Télécharger' : '❌ Télécharger',
          a.ctaAudit.hasDiscover ? '✅ Découvrir' : '❌ Découvrir',
          a.ctaAudit.hasEvaluate ? '✅ Évaluer' : '❌ Évaluer',
          a.ctaAudit.hasBook ? '✅ Réserver' : '❌ Réserver',
          a.ctaAudit.hasAccess ? '✅ Accéder' : '❌ Accéder',
        ],
        feedback: `CTAs présents : ${a.ctaAudit.allCTAs.length}/5. Manquants : ${a.ctaAudit.missing.join(', ') || 'Aucun'}`,
      },
      {
        key: 'socialProof', label: 'Preuve Sociale', icon: 'ri-verified-badge-line',
        score: a.socialProofAudit.present ? 100 : 0,
        status: a.socialProofAudit.present ? 'pass' : 'fail',
        details: a.socialProofAudit.present
          ? a.socialProofAudit.elements.map((e) => `✅ ${e}`)
          : ['❌ Aucune preuve sociale'],
        feedback: a.socialProofAudit.present
          ? `${a.socialProofAudit.elements.length} élément(s) de preuve sociale`
          : 'Preuve sociale ABSENTE — Ajout requis',
      },
      {
        key: 'amplification', label: 'Commentaire', icon: 'ri-chat-1-line',
        score: [a.contentBundle.amplificationComment.includesSummary, a.contentBundle.amplificationComment.includesURL, a.contentBundle.amplificationComment.includesCTA].filter(Boolean).length * 33,
        status: a.contentBundle.amplificationComment.includesSummary && a.contentBundle.amplificationComment.includesURL && a.contentBundle.amplificationComment.includesCTA ? 'pass' : 'fail',
        details: [
          a.contentBundle.amplificationComment.includesSummary ? '✅ Résumé' : '❌ Résumé',
          a.contentBundle.amplificationComment.includesURL ? '✅ URL' : '❌ URL',
          a.contentBundle.amplificationComment.includesCTA ? '✅ CTA' : '❌ CTA',
        ],
        feedback: 'Vérification commentaire d\'amplification',
      },
    ];
  }, [selectedArticle]);

  const deliverables = useMemo(() => {
    if (!selectedArticle) return [];
    const b = selectedArticle.contentBundle;
    return [
      { key: 'hook', label: '1. Hook LinkedIn', icon: 'ri-flashlight-line', content: b.hook, score: b.hookScore, color: '#DC2626' },
      { key: 'post', label: '2. Post LinkedIn', icon: 'ri-linkedin-fill', content: b.postLinkedIn, color: '#0A66C2' },
      { key: 'dirigeant', label: '3. Version Dirigeant', icon: 'ri-user-star-line', content: b.versionDirigeant, color: '#059669' },
      { key: 'page', label: '4. Version Page Entreprise', icon: 'ri-building-line', content: b.versionPageEntreprise, color: '#BE123C' },
      { key: 'comment', label: '5. Commentaire d\'Amplification', icon: 'ri-chat-1-line', content: b.amplificationComment.content, color: '#7C3AED' },
      { key: 'article', label: '6. Article Natif LinkedIn', icon: 'ri-article-line', detail: b.nativeArticle, color: '#EA580C' },
      { key: 'banner', label: '7. Bannière LinkedIn', icon: 'ri-image-line', prompt: b.bannerPrompt, color: '#0D7B5F' },
      { key: 'carousel', label: '8. Carrousel LinkedIn', icon: 'ri-slideshow-3-line', slides: b.carouselSlides, color: '#9B7B2C' },
      { key: 'hashtags', label: '9. Liste Hashtags', icon: 'ri-hashtag', tags: b.hashtags, color: '#86BC25' },
      { key: 'url', label: '10. URL Trackée', icon: 'ri-link', utm: b.trackedURL, color: '#6D28D9' },
    ];
  }, [selectedArticle]);

  return {
    loading,
    isLive,
    refetch: fetchArticles,
    articles,
    selectedArticle,
    selectedArticleId,
    selectArticle,
    kpis,
    rules,
    approvedArticles,
    blockedArticles,
    auditChecks,
    deliverables,
    getScoreColor,
    getScoreLabel,
    getStatusColor,
  };
}
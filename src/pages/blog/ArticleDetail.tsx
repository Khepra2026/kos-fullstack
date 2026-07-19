import { useParams, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Component, type ReactNode } from 'react';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { ArticleErrorBoundary } from '@/components/feature/ArticleErrorBoundary';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { ArticleTableOfContents } from '';
import { ArticleNewsletterInline } from '';
import { ArticleServiceBanner } from '';
import { ArticleTags } from '';
import { ShareButtons } from '';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import ArticleAISummary from '';
import AIArticleRecommendations from '';
import { RelatedArticles } from '';
import { ArticleGlossary } from '';
import { DiagnosticScannerCTA } from '';
import { LeadMagnetCTA } from '';
import { PremiumFinalCTA } from '';
import { ArticleContentRenderer } from '';
import { ArticleExecutiveSummary } from '';
import { ArticleCadreReglementaire } from '';
import { ArticlePointsFriction } from '';
import { ArticleArchitectureSolution } from '';
import { ArticleOutilPremium } from '';
import { ArticleReferencesOfficielles } from '';
import { ArticleFAQBlock } from '';
import { ArticleGeoAnswers } from '';
import { MiniGuideCTA } from '';
import { ArticleMethodology } from '';
import { blogArticles } from '@/mocks/blogArticles';
import { blogArticlesEn } from '@/mocks/blogArticlesEn';
import { optimizeImageUrl, optimizeHeroImageUrl, generateLqipUrl } from '@/utils/imageWebP';
import { resolveSlugToId, resolveIdToSlug, buildCanonicalUrl } from '@/data/articleSlugMap';
import LazySection from '@/components/base/LazySection';
import { buildArticleHreflang } from '@/utils/hreflang';
import { resolveOgImageUrl } from '@/components/feature/OgDefaultImage';
import { LOGO_IMAGE_URL } from '@/utils/schemaMarkup';
import { InternalLinks } from '';
import { ArticleNav } from '';
import BigFourSections from '';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

// ── Déduplique par ID (garde la première occurrence) ─────────────────
function deduplicateArticles<T extends { id: string }>(articles: T[]): T[] {
  const seen = new Set<string>();
  return articles.filter(a => {
    if (!a?.id || seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });
}

// ── POOL CONSOLIDÉ DE TOUS LES ARTICLES ──────────────────────────────
const allArticlesFr = deduplicateArticles([
  ...blogArticles,
]);

const allArticlesEn = deduplicateArticles([
  ...blogArticlesEn,
]);

// Pool combiné pour la recherche (fallback langue)
const allArticlesCombined = [...allArticlesFr, ...allArticlesEn];

// ── SEO KEYWORDS DYNAMIQUES PAR ARTICLE ─────────────────────────────
interface ArticleLike {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  zone: string;
  content: string[];
  readTime: string;
  date: string;
  image: string;
  views?: number;
  author?: string;
  authorTitle?: string;
  badge?: string;
  heroSubtitle?: string;
  richContent?: Record<string, any>;
  faq?: Array<{ q?: string; a?: string; question?: string; answer?: string }>;
  geoDirectAnswers?: Array<{ q?: string; a?: string; question?: string; answer?: string }>;
  executiveSummary?: Record<string, any>;
  methodologyNote?: string;
}

function getArticleKeywords(article: ArticleLike, isEn: boolean): string {
  const baseKeywords = isEn
    ? 'KHEPRA EXPERTS, Africa consulting, Francophone Africa, investment advisory, UEMOA, CEMAC, OHADA'
    : 'KHEPRA EXPERTS, conseil Afrique, Afrique francophone, conseil investissement, UEMOA, CEMAC, OHADA';

  const tagKeywords = (article.tags || []).join(', ');
  const categoryKeyword = article.category || '';
  const zoneKeyword = article.zone || '';

  // Mots-clés spécifiques par article ID pour cibler les requêtes SEO stratégiques
  const specificKeywords: Record<string, string> = {
    '12': isEn
      ? 'BCEAO consumer protection, COBAC compliance, SG-CB-UMOA, UEMOA CEMAC financial services, LBC/FT KYC cybersecurity, financial institution conformity, GIABA GABAC, data protection Africa'
      : 'BCEAO, COBAC, SG-CB-UMOA, UEMOA, CEMAC, LBC/FT, KYC, Cybersécurité, Conformité, Politiques publiques, KHEPRA EXPERTS, conseil Afrique, Afrique francophone, conseil investissement, OHADA, protection consommateurs services financiers',
    'premium-due-diligence-acquisition-afrique': isEn
      ? 'due diligence OHADA, business valuation Africa, acquisition Africa, M&A Africa, BCEAO compliance, COBAC compliance, AUSCGIE, SYSCOHADA, private equity Africa, investment readiness'
      : 'due diligence OHADA, valorisation entreprise Afrique, acquisition Afrique, fusion acquisition Afrique, conformité BCEAO, conformité COBAC, AUSCGIE, SYSCOHADA, private equity Afrique, investissement Afrique',
    'premium-agrement-imf-emf-bceao-cobac': isEn
      ? 'IMF licensing BCEAO, EMF licensing COBAC, microfinance license Africa, SFD approval UEMOA, microfinance regulation, financial institution licensing, capital requirements, banking license Africa'
      : 'agrément IMF BCEAO, agrément EMF COBAC, licence microfinance Afrique, agrément SFD UEMOA, réglementation microfinance, licence institution financière, capital social minimum, licence bancaire Afrique',
    'premium-esg-conformite-afrique': isEn
      ? 'ESG compliance Africa, ESG reporting GRI, IFC performance standards, sustainable finance Africa, climate risk banking, ESG framework BCEAO, ESG framework COBAC, green finance Africa, ESG audit'
      : 'conformité ESG Afrique, reporting ESG GRI, standards IFC, finance durable Afrique, risque climatique banque, cadre ESG BCEAO, cadre ESG COBAC, finance verte Afrique, audit ESG',
    'premium-levee-fonds-investisseur-readiness-afrique': isEn
      ? 'fundraising Africa, investor readiness, business plan Africa, DCF valuation, Series A Africa, venture capital Africa, private equity Africa, pitch deck, term sheet, equity financing'
      : 'levée de fonds Afrique, investor readiness, business plan Afrique, valorisation DCF, Series A Afrique, capital investissement Afrique, private equity Afrique, pitch deck, term sheet, financement equity',
    'premium-diagnostic-organisationnel-gouvernance': isEn
      ? 'corporate governance Africa, board evaluation, organizational diagnosis, governance scoring, OECD governance, internal control framework, risk mapping, audit committee, management succession'
      : 'gouvernance entreprise Afrique, évaluation conseil administration, diagnostic organisationnel, scoring gouvernance, gouvernance OCDE, contrôle interne, cartographie risques, comité audit, relève direction',
  };

  const specific = specificKeywords[article.id] || '';
  const parts = [tagKeywords, categoryKeyword, zoneKeyword, specific, baseKeywords].filter(Boolean);
  return parts.join(', ');
}

// ── MAPPING ARTICLE → CTA VARIANTS ──────────────────────────────────
function getDiagnosticVariant(articleId: string, tags: string[]): 'acquisition' | 'governance' | 'finance' | 'compliance' | 'fundraising' | 'esg' | 'default' {
  if (articleId.includes('due-diligence') || tags.some(t => t.toLowerCase().includes('due diligence') || t.toLowerCase().includes('acquisition'))) return 'acquisition';
  if (articleId.includes('gouvernance') || articleId.includes('governance') || tags.some(t => t.toLowerCase().includes('gouvernance') || t.toLowerCase().includes('governance'))) return 'governance';
  if (articleId.includes('conformite') || articleId.includes('compliance') || articleId.includes('agrement') || articleId.includes('license')) return 'compliance';
  if (articleId.includes('levee') || articleId.includes('fonds') || articleId.includes('fundraising') || articleId.includes('raise')) return 'fundraising';
  if (articleId.includes('esg')) return 'esg';
  if (tags.some(t => t.toLowerCase().includes('due diligence') || t.toLowerCase().includes('acquisition'))) return 'acquisition';
  if (tags.some(t => t.toLowerCase().includes('finance') || t.toLowerCase().includes('bilan') || t.toLowerCase().includes('bancaire'))) return 'finance';
  return 'default';
}

function getLeadMagnetVariant(articleId: string, tags: string[]): 'checklist-dd' | 'checklist-governance' | 'checklist-compliance' | 'checklist-fundraising' | 'checklist-esg' | null {
  if (articleId.includes('due-diligence') || tags.some(t => t.toLowerCase().includes('due diligence'))) return 'checklist-dd';
  if (articleId.includes('gouvernance') || articleId.includes('governance') || tags.some(t => t.toLowerCase().includes('gouvernance'))) return 'checklist-governance';
  if (articleId.includes('conformite') || articleId.includes('compliance') || articleId.includes('agrement')) return 'checklist-compliance';
  if (articleId.includes('levee') || articleId.includes('fonds') || articleId.includes('fundraising')) return 'checklist-fundraising';
  if (articleId.includes('esg')) return 'checklist-esg';
  if (tags.some(t => t.toLowerCase().includes('due diligence'))) return 'checklist-dd';
  if (tags.some(t => t.toLowerCase().includes('gouvernance') || t.toLowerCase().includes('governance'))) return 'checklist-governance';
  if (tags.some(t => t.toLowerCase().includes('conformite') || t.toLowerCase().includes('compliance'))) return 'checklist-compliance';
  return null;
}

function getFinalCTAVariant(articleId: string, tags: string[]): 'acquisition' | 'governance' | 'fundraising' | 'esg' | 'compliance' | 'default' {
  return getDiagnosticVariant(articleId, tags) as ReturnType<typeof getFinalCTAVariant>;
}

function dateToIso(dateStr: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr;
  const frMonths: Record<string, string> = {
    janvier: '01', février: '02', mars: '03', avril: '04',
    mai: '05', juin: '06', juillet: '07', août: '08',
    septembre: '09', octobre: '10', novembre: '11', décembre: '12',
  };
  const enMonths: Record<string, string> = {
    january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08',
    september: '09', october: '10', november: '11', december: '12',
  };
  const lower = dateStr.toLowerCase();
  for (const [name, num] of Object.entries({ ...frMonths, ...enMonths })) {
    if (lower.includes(name)) {
      const dayMatch = lower.match(/\d+/);
      const yearMatch = lower.match(/\d{4}/);
      const day = dayMatch ? dayMatch[0].padStart(2, '0') : '01';
      const year = yearMatch ? yearMatch[0] : '2024';
      return `${year}-${num}-${day}`;
    }
  }
  return new Date().toISOString().split('T')[0];
}

// ── Section-level Error Boundary (silently recovers) ──────────────────
class SectionBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[SectionBoundary] Section render crash:', error.message, info.componentStack?.slice(0, 200));
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default function ArticleDetail() {
  const { id: paramId } = useParams<{ id: string }>();
  const location = useLocation();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  // ── Résolution slug sémantique → ID numérique ───────────────────────
  // Fallback : si la route est statique (pas de param :id), extraire le
  // slug depuis le pathname ex. /blog/due-diligence-acquisition-afrique-ohada-guide
  const rawId = paramId
    ?? location.pathname.replace(/^\/blog\//, '').replace(/\/$/, '');

  // ── Résolution slug sémantique → ID numérique (​outgoing slug routes) ─────────────
  // Si le param est un slug sémantique connu, on récupère l'ID réel
  const resolvedId = rawId
    ? (resolveSlugToId(rawId) ?? rawId)
    : undefined;
  const id = resolvedId;

  // ── RECHERCHE ARTICLE DANS TOUS LES POOLS ──────────────────────────
  const articles = isEn ? allArticlesEn : allArticlesFr;
  const article = articles.find((a) => a.id === id);

  // Fallback : chercher dans le pool combiné si non trouvé dans la langue courante
  const articleFallback = !article ? allArticlesCombined.find((a) => a.id === id) : null;
  const resolvedArticle = article || articleFallback;

  // Determine CTA variants
  const tags = resolvedArticle?.tags ?? [];
  const diagnosticVariant = getDiagnosticVariant(id ?? '', tags);
  const leadMagnetType = getLeadMagnetVariant(id ?? '', tags);
  const finalVariant = getFinalCTAVariant(id ?? '', tags);

  // ── BU detection for pillar cross-linking ──
  const getPillarBU = (cat: string): string | null => {
    if (cat.includes('Conformité') || cat === 'Finance') return 'BU1';
    if (cat.includes('Prix de Transfert') || cat.includes('Fiscalité')) return 'BU2';
    if (cat.includes('Gouvernance')) return 'BU3';
    return null;
  };

  if (!resolvedArticle) {
    return (
      <div className="min-h-screen bg-background-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center">
          <div className="w-20 h-20 flex items-center justify-center bg-secondary-100 rounded-full mb-6">
            <i className="ri-article-line text-4xl text-foreground-400"></i>
          </div>
          <h1 className="font-playfair text-3xl font-bold text-foreground-950 mb-4">
            {isEn ? 'Article not found' : 'Article introuvable'}
          </h1>
          <p className="text-foreground-500 mb-8 max-w-md">
            {isEn
              ? 'This article does not exist or has been removed.'
              : "Cet article n'existe pas ou a été supprimé."}
          </p>
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-full font-semibold hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
            {isEn ? 'Back to blog' : 'Retour au blog'}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isoDate = dateToIso(resolvedArticle.date);

  // Article-specific SEO title overrides (from authoritative SEO data)
  const articleTitleOverrides: Record<string, string> = {
    '12': 'KHEPRA Experts | Stratégie, Finance & Conformité',
  };

  const ogTitle = articleTitleOverrides[resolvedArticle.id] || `${resolvedArticle.title} | KHEPRA EXPERTS`;
  const ogDescription =
    resolvedArticle.excerpt.length > 155
      ? resolvedArticle.excerpt.substring(0, 152) + '...'
      : resolvedArticle.excerpt;

  // ── Canonical URL : toujours pointer vers le slug sémantique si dispo ──────────────
  const semanticSlug = resolveIdToSlug(resolvedArticle.id);
  const canonicalPath = semanticSlug
    ? `/blog/${semanticSlug}/`
    : `/blog/${resolvedArticle.id}/`;
  const absoluteArticleUrl = buildCanonicalUrl(resolvedArticle.id, SITE_URL);

  let articleSchema: Record<string, unknown> = { '@type': 'BlogPosting', headline: resolvedArticle.title || '' };
  try {
    const authorPerson = {
      '@type': 'Person',
      '@id': `${SITE_URL}/about#simda-essoyomewe`,
      name: 'SIMDA Essoyomèwè',
      url: `${SITE_URL}/about`,
      jobTitle: 'Fondateur & Directeur Général, KHEPRA EXPERTS',
      description: 'Expert en conformité financière, gouvernance et transformation stratégique en Afrique francophone. 22+ ans d’expérience en zone UEMOA/CEMAC/OHADA.',
      knowsAbout: [
        'conformité BCEAO', 'conformité COBAC', 'réglementation bancaire Afrique',
        'due diligence OHADA', 'ESG Afrique', 'microfinance UEMOA CEMAC',
        'LBC/FT', 'Bâle III Afrique', 'gouvernance financière',
      ],
      sameAs: [
        'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
        `${SITE_URL}/experts`,
      ],
      worksFor: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'KHEPRA EXPERTS',
        url: SITE_URL,
      },
    };

    const publisherOrg = {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_IMAGE_URL,
        width: 250,
        height: 60,
      },
      description: 'Cabinet de conseil spécialisé en conformité réglementaire BCEAO/COBAC, gouvernance financière et transformation stratégique en Afrique francophone.',
      areaServed: [{ '@type': 'Place', name: 'UEMOA' }, { '@type': 'Place', name: 'CEMAC' }, { '@type': 'Place', name: 'Afrique francophone' }],
      sameAs: ['https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/'],
    };

    const breadcrumbList = {
      '@type': 'BreadcrumbList',
      '@id': `${absoluteArticleUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Accueil', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Blog' : 'Blog', item: `${SITE_URL}/blog/` },
        { '@type': 'ListItem', position: 3, name: resolvedArticle.title, item: absoluteArticleUrl },
      ],
    };

    // ── relatedLink Schema.org pour les articles pillar (cross-BU) ──
    const isPillarArticle = resolvedArticle.id.startsWith('pillar-');
    const relatedLinks: Array<{ '@type': string; name: string; url: string }> = [];
    if (isPillarArticle) {
      const currentBU = getPillarBU(resolvedArticle.category);
      const otherBUs = ['BU1', 'BU2', 'BU3'].filter(bu => bu !== currentBU);
      const balanced: typeof allArticlesFr = [];
      const maxPerBU = 3;
      for (const bu of otherBUs) {
        const buArticles = allArticlesFr.filter(
          a => a.id.startsWith('pillar-') && a.id !== resolvedArticle.id && getPillarBU(a.category) === bu
        );
        balanced.push(...buArticles.slice(0, maxPerBU));
      }
      relatedLinks.push(
        ...balanced.slice(0, 6).map(a => ({
          '@type': 'RelatedLink',
          name: a.title,
          url: `${SITE_URL}/blog/${resolveIdToSlug(a.id) || a.id}/`,
        }))
      );
    }

    const webPage = {
      '@type': 'WebPage',
      '@id': `${absoluteArticleUrl}#webpage`,
      url: absoluteArticleUrl,
      name: ogTitle,
      description: ogDescription,
      inLanguage: isEn ? 'en-US' : 'fr-FR',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      breadcrumb: { '@id': `${absoluteArticleUrl}#breadcrumb` },
      datePublished: isoDate,
      dateModified: isoDate,
      ...(relatedLinks.length > 0 ? { relatedLink: relatedLinks } : {}),
    };

    articleSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `${absoluteArticleUrl}#article`,
          headline: resolvedArticle.title,
          description: resolvedArticle.excerpt,
          image: {
            '@type': 'ImageObject',
            url: resolveOgImageUrl(resolvedArticle.image),
            width: 800,
            height: 500,
          },
          datePublished: isoDate,
          dateModified: isoDate,
          author: authorPerson,
          publisher: publisherOrg,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${absoluteArticleUrl}#webpage` },
          keywords: (resolvedArticle.tags || [resolvedArticle.category]).join(', '),
          articleSection: resolvedArticle.category,
          inLanguage: isEn ? 'en' : 'fr',
          url: absoluteArticleUrl,
          isAccessibleForFree: true,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', '.prose p:first-of-type'],
          },
          ...(relatedLinks.length > 0 ? { relatedLink: relatedLinks } : {}),
        },
        webPage,
        breadcrumbList,
        publisherOrg,
        authorPerson,
      ],
    };
  } catch (e) { 
    if (import.meta.env.DEV) {
       
    console.error('[ArticleDetail] articleSchema crash:', e);
    }
  }

  const categoryColorMap: Record<string, string> = {};
  const getCategoryColor = (cat: string): string => {
    if (!cat) return 'bg-secondary-100 text-secondary-800';
    if (cat.includes('Gouvernance') || cat === 'Governance') return 'bg-gold-100 text-gold-800';
    if (cat.includes('Finance') || cat === 'Finance') return 'bg-brand-100 text-brand-800';
    if (cat.includes('Régulation')) return 'bg-emerald-100 text-emerald-800';
    if (cat.includes('Conformité') || cat.includes('Compliance') || cat.includes('GRC')) return 'bg-red-100 text-red-800';
    if (cat.includes('Fiscalité') || cat.includes('Prix de Transfert')) return 'bg-amber-100 text-amber-800';
    if (cat.includes('Fusion') || cat.includes('Acquisition')) return 'bg-violet-100 text-violet-800';
    if (cat.includes('Entrepreneuriat') || cat === 'Entrepreneurship') return 'bg-orange-100 text-orange-800';
    if (cat.includes('Politiques publiques') || cat === 'Public Policy') return 'bg-cyan-100 text-cyan-800';
    if (cat.includes('Ressources Humaines') || cat === 'Human Resources') return 'bg-teal-100 text-teal-800';
    if (cat.includes('Management')) return 'bg-indigo-100 text-indigo-800';
    if (cat.includes('Stratégie') || cat === 'Strategy & Growth') return 'bg-rose-100 text-rose-800';
    if (cat.includes('Transformation digitale') || cat === 'Digital Transformation') return 'bg-teal-100 text-teal-800';
    if (cat.includes('Investissement') || cat === 'Investment') return 'bg-amber-100 text-amber-800';
    if (cat.includes('ESG') || cat.includes('Reporting')) return 'bg-lime-100 text-lime-800';
    return 'bg-secondary-100 text-secondary-800';
  };
  const categoryColor = getCategoryColor(resolvedArticle.category) ?? 'bg-secondary-100 text-secondary-800';

  // CTA variants

  return (
    <ArticleErrorBoundary articleId={id}>
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title={ogTitle}
        description={ogDescription}
        keywords={getArticleKeywords(resolvedArticle, isEn)}
        canonicalPath={canonicalPath}
        ogType="article"
        ogImage={resolveOgImageUrl(resolvedArticle.image)}
        ogImageWidth="800"
        ogImageHeight="500"
        ogImageAlt={`${resolvedArticle.title} – KHEPRA EXPERTS`}
        ogUrl={absoluteArticleUrl}
        articlePublishedTime={isoDate}
        articleModifiedTime={isoDate}
        articleAuthor="SIMDA Essoyomèwè"
        articleSection={resolvedArticle.category}
        articleTags={resolvedArticle.tags || [resolvedArticle.category]}
        twitterLabel1={isEn ? 'Reading time' : 'Temps de lecture'}
        twitterData1={resolvedArticle.readTime}
        twitterLabel2={isEn ? 'Category' : 'Catégorie'}
        twitterData2={resolvedArticle.category}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={articleSchema}
        hreflangLinks={buildArticleHreflang(semanticSlug ?? resolvedArticle.id, isEn ? 'en' : 'fr')}
        preloadImages={[optimizeHeroImageUrl(resolvedArticle.image)]}
      />

      <Navigation />

      {/* Hero image */}
      <div
        className="relative pt-20 overflow-hidden"
        style={(() => {
          try {
            const lqip = generateLqipUrl(optimizeHeroImageUrl(resolvedArticle.image));
            return {
              aspectRatio: '1200 / 420',
              backgroundImage: lqip ? `url(${lqip})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            };
          } catch {
            return { aspectRatio: '1200 / 420' };
          }
        })()}
      >
        <img
          src={optimizeHeroImageUrl(resolvedArticle.image)}
          alt={resolvedArticle.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
          width={1200}
          height={420}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Breadcrumb sur l'image */}
        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb
            variant="light"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Blog' : 'Blog', href: '/blog/' },
              { label: resolvedArticle.title },
            ]}
          />
        </div>

        {/* Catégorie + titre sur l'image */}
        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
              {resolvedArticle.category}
            </span>
            {resolvedArticle.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-accent-500/15 text-accent-400 border border-accent-500/35">
                <i className="ri-award-line text-xs"></i>
                {resolvedArticle.badge}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              <i className="ri-time-line text-xs"></i>
              {resolvedArticle.readTime}
            </span>
          </div>
          <h1 className="font-playfair text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            {resolvedArticle.title}
          </h1>
          {resolvedArticle.heroSubtitle && (
            <p className="text-white/70 text-sm mt-3 leading-relaxed max-w-3xl">{resolvedArticle.heroSubtitle}</p>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Article */}
          <div className="flex-1 min-w-0">

            {/* Meta auteur */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-secondary-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold-300 flex-shrink-0">
                  <img
                    src={optimizeImageUrl("https://readdy.ai/api/search-image?query=Professional%20African%20business%20consultant%20expert%20portrait%20headshot%20formal%20attire%20confident%20smile%20studio%20lighting%20corporate%20executive%20leadership&width=80&height=80&seq=simda-author-photo&orientation=squarish")}
                    alt="SIMDA Essoyomèwè"
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-950">{resolvedArticle.author || 'SIMDA Essoyomèwè'}</p>
                  <p className="text-xs text-foreground-500">
                    {resolvedArticle.authorTitle || (isEn ? 'Founder & CEO, KHEPRA EXPERTS' : 'Fondateur & DG, KHEPRA EXPERTS')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-500 ml-auto">
                <span className="flex items-center gap-1.5">
                  <i className="ri-calendar-line text-gold-500"></i>
                  {resolvedArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-time-line text-gold-500"></i>
                  {resolvedArticle.readTime} {isEn ? 'read' : 'de lecture'}
                </span>
                {resolvedArticle.views !== undefined && (
                  <span className="flex items-center gap-1.5">
                    <i className="ri-eye-line text-gold-500"></i>
                    {resolvedArticle.views >= 1000
                      ? `${(resolvedArticle.views / 1000).toFixed(1)}k`
                      : resolvedArticle.views}{' '}
                    {isEn ? 'views' : 'vues'}
                  </span>
                )}
              </div>
            </div>

            {/* Excerpt mis en avant */}
            <p className="text-lg text-foreground-600 leading-relaxed mb-8 font-medium border-l-4 border-accent-400 pl-5 italic">
              {resolvedArticle.excerpt}
            </p>

            {/* Tags */}
            {resolvedArticle.tags && resolvedArticle.tags.length > 0 && (
              <div className="mb-8">
                <ArticleTags
                  tags={resolvedArticle.tags}
                  selectedTag={null}
                  onTagClick={() => {}}
                  size="md"
                  clickable={false}
                />
              </div>
            )}

            {/* Bannière service associé */}
            <ArticleServiceBanner articleId={resolvedArticle.id} />

            {/* ── RICH CONTENT (Thought Leadership / Big Four Style) ── */}
            {resolvedArticle.richContent && (
              <>
                {resolvedArticle.richContent.executiveSummary && (
                  <LazySection rootMargin="200px" minHeight="200px">
                    <SectionBoundary>
                      <ArticleExecutiveSummary data={resolvedArticle.richContent.executiveSummary} />
                    </SectionBoundary>
                  </LazySection>
                )}

                <MiniGuideCTA guide="gouvernance-imf" />

                {resolvedArticle.richContent.cadreReglementaire && (
                  <LazySection rootMargin="200px" minHeight="300px">
                    <SectionBoundary>
                      <ArticleCadreReglementaire data={resolvedArticle.richContent.cadreReglementaire} />
                    </SectionBoundary>
                  </LazySection>
                )}

                {resolvedArticle.richContent.pointsFriction && (
                  <LazySection rootMargin="200px" minHeight="400px">
                    <SectionBoundary>
                      <ArticlePointsFriction data={resolvedArticle.richContent.pointsFriction} />
                    </SectionBoundary>
                  </LazySection>
                )}

                {resolvedArticle.richContent.architectureSolution && (
                  <LazySection rootMargin="200px" minHeight="400px">
                    <SectionBoundary>
                      <ArticleArchitectureSolution data={resolvedArticle.richContent.architectureSolution} />
                    </SectionBoundary>
                  </LazySection>
                )}

                {resolvedArticle.richContent.outilPremium && (
                  <LazySection rootMargin="200px" minHeight="400px">
                    <SectionBoundary>
                      <ArticleOutilPremium data={resolvedArticle.richContent.outilPremium} />
                    </SectionBoundary>
                  </LazySection>
                )}

                {resolvedArticle.richContent.avertissement && (
                  <div className="mb-8 rounded-2xl border-2 border-accent-200 bg-accent-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-accent-100 border border-accent-300 flex-shrink-0">
                        <i className="ri-information-line text-accent-700 text-base"></i>
                      </div>
                      <p className="text-xs text-accent-800 leading-relaxed">
                        <strong>Avertissement :</strong> {resolvedArticle.richContent.avertissement}
                      </p>
                    </div>
                  </div>
                )}

                {resolvedArticle.richContent.faq && resolvedArticle.richContent.faq.length > 0 && (
                  <LazySection rootMargin="200px" minHeight="300px">
                    <SectionBoundary>
                      <ArticleFAQBlock items={resolvedArticle.richContent.faq} articleId={resolvedArticle.id} />
                    </SectionBoundary>
                  </LazySection>
                )}

                {resolvedArticle.richContent.geoAnswers && resolvedArticle.richContent.geoAnswers.length > 0 && (
                  <LazySection rootMargin="200px" minHeight="300px">
                    <SectionBoundary>
                      <ArticleGeoAnswers items={resolvedArticle.richContent.geoAnswers} articleId={resolvedArticle.id} />
                    </SectionBoundary>
                  </LazySection>
                )}

                {resolvedArticle.richContent.distinctionObligation && (
                  <section className="mb-14 scroll-mt-28" id="distinction-obligation">
                    <h2 id="distinction-obligation-heading" className="text-2xl md:text-3xl font-bold text-foreground-950 leading-tight mt-14 mb-4 scroll-mt-28 flex items-start gap-3" style={{ fontFamily: 'var(--font-heading), serif' }}>
                      <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5 bg-accent-100 text-accent-700 border border-accent-200">
                        <i className="ri-scales-3-line"></i>
                      </span>
                      {resolvedArticle.richContent.distinctionObligation.heading}
                    </h2>
                    <p className="text-sm text-foreground-600 leading-relaxed mb-6">{resolvedArticle.richContent.distinctionObligation.intro}</p>
                    <div className="space-y-8">
                      {(resolvedArticle.richContent.distinctionObligation.categories || []).map((cat: any, ci: number) => (
                        <div key={ci} className={`rounded-2xl border-2 overflow-hidden ${
                          cat.type === 'obligation' ? 'border-red-200' :
                          cat.type === 'bonne-pratique' ? 'border-emerald-200' :
                          'border-amber-200'
                        }`}>
                          <div className={`flex items-start gap-3 px-5 sm:px-6 py-4 border-b-2 ${
                            cat.type === 'obligation' ? 'bg-red-50 border-red-200' :
                            cat.type === 'bonne-pratique' ? 'bg-emerald-50 border-emerald-200' :
                            'bg-amber-50 border-amber-200'
                          }`}>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0 border-2 bg-background-50 ${
                              cat.type === 'obligation' ? 'border-red-200' :
                              cat.type === 'bonne-pratique' ? 'border-emerald-200' :
                              'border-amber-200'
                            }`}>
                              <i className={`${cat.icon || 'ri-shield-check-line'} ${
                                cat.type === 'obligation' ? 'text-red-600' :
                                cat.type === 'bonne-pratique' ? 'text-emerald-600' :
                                'text-amber-600'
                              } text-base`}></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5 ${
                                cat.type === 'obligation' ? 'bg-red-100 text-red-800' :
                                cat.type === 'bonne-pratique' ? 'bg-emerald-100 text-emerald-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {cat.label}
                              </span>
                              <p className="text-sm text-foreground-700 leading-relaxed">{cat.description}</p>
                            </div>
                          </div>
                          <div className="px-5 sm:px-6 py-5">
                            <ul className="space-y-2.5">
                              {(cat.items || []).map((item: any, ii: number) => (
                                <li key={ii} className="flex items-start gap-3 p-3 rounded-xl bg-secondary-100 border border-secondary-200">
                                  <i className={`${
                                    cat.type === 'obligation' ? 'ri-error-warning-line text-red-500' :
                                    cat.type === 'bonne-pratique' ? 'ri-thumb-up-line text-emerald-500' :
                                    'ri-global-line text-amber-500'
                                  } text-sm flex-shrink-0 mt-0.5`}></i>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-foreground-700 leading-relaxed">{item.text}</p>
                                    <p className="text-xs text-foreground-400 mt-0.5 font-mono">{item.reference}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {resolvedArticle.richContent.referencesOfficielles && (
                  <LazySection rootMargin="200px" minHeight="200px">
                    <SectionBoundary>
                      <ArticleReferencesOfficielles data={resolvedArticle.richContent.referencesOfficielles} />
                    </SectionBoundary>
                  </LazySection>
                )}

                {resolvedArticle.richContent.methodologyNote && (
                  <div className="mb-8 rounded-2xl border border-secondary-200 bg-secondary-100 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-background-50 border border-secondary-200 flex-shrink-0">
                        <i className="ri-microscope-line text-foreground-500 text-base"></i>
                      </div>
                      <p className="text-xs text-foreground-500 leading-relaxed italic">
                        {resolvedArticle.richContent.methodologyNote}
                      </p>
                    </div>
                  </div>
                )}

                <MiniGuideCTA guide="gouvernance-imf" />

                {/* CTA premium final spécifique Thought Leadership */}
                <div className="my-10 rounded-2xl p-8 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                  <div className="absolute top-0 right-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }}></div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                        <i className="ri-shield-keyhole-line text-2xl" style={{ color: '#c9a227' }}></i>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a227' }}>Mission de Gouvernance KHEPRA EXPERTS</p>
                        <h3 className="font-playfair text-xl font-bold text-white leading-snug">Évaluez la maturité du dispositif des 3 lignes de défense de votre institution</h3>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
                      Notre mission de diagnostic KHEPRA 3LD-Matrix™ vous fournit un score de maturité confidentiel sur 5 dimensions, une cartographie des conflits de responsabilités et un plan d'action priorisé par niveau de risque réglementaire (Commission Bancaire UMOA).
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}>
                        Demander la mission de diagnostic
                        <i className="ri-arrow-right-line"></i>
                      </Link>
                      <Link to="/charte-deontologique" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap">
                        Consulter notre charte déontologique
                        <i className="ri-external-link-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── Methodology Note (top-level, displayed regardless of richContent presence) ── */}
            {(resolvedArticle as any).methodologyNote && !resolvedArticle.richContent?.methodologyNote && (
              <SectionBoundary>
                <ArticleMethodology data={(resolvedArticle as any).methodologyNote} />
              </SectionBoundary>
            )}

            {/* ── DIAGNOSTIC EXPRESS CTA (haut d'article) ── */}
            <SectionBoundary>
              <DiagnosticScannerCTA variant={diagnosticVariant} />
            </SectionBoundary>

            {/* ── RÉSUMÉ IA KOS (après l'excerpt) ── */}
            <LazySection rootMargin="200px" minHeight="80px">
              <SectionBoundary>
                <ArticleAISummary
                  articleContent={resolvedArticle.content}
                  articleTitle={resolvedArticle.title}
                  articleId={resolvedArticle.id}
                  isEn={isEn}
                  className="mb-8"
                />
              </SectionBoundary>
            </LazySection>

            {/* Corps de l'article avec CTAs injectés (skip si richContent présent) */}
            {!resolvedArticle.richContent && (
              <SectionBoundary>
                <ArticleContentRenderer
                  paragraphs={Array.isArray(resolvedArticle.content) ? resolvedArticle.content : []}
                  articleId={resolvedArticle.id}
                  isEn={isEn}
                  leadMagnetType={leadMagnetType}
                />
              </SectionBoundary>
            )}

            {/* ── TOP-LEVEL RICH ELEMENTS (pour articles sans richContent complet) ── */}
            {!resolvedArticle.richContent && (resolvedArticle as any).executiveSummary && (
              <LazySection rootMargin="200px" minHeight="200px">
                <SectionBoundary>
                  <ArticleExecutiveSummary data={(resolvedArticle as any).executiveSummary} />
                </SectionBoundary>
              </LazySection>
            )}

            {!resolvedArticle.richContent && (resolvedArticle as any).geoDirectAnswers && (resolvedArticle as any).geoDirectAnswers.length > 0 && (
              <LazySection rootMargin="200px" minHeight="300px">
                <SectionBoundary>
                  <ArticleGeoAnswers items={(resolvedArticle as any).geoDirectAnswers} articleId={resolvedArticle.id} />
                </SectionBoundary>
              </LazySection>
            )}

            {!resolvedArticle.richContent && (resolvedArticle as any).faq && (resolvedArticle as any).faq.length > 0 && (
              <LazySection rootMargin="200px" minHeight="300px">
                <SectionBoundary>
                  <ArticleFAQBlock items={(resolvedArticle as any).faq} articleId={resolvedArticle.id} />
                </SectionBoundary>
              </LazySection>
            )}

            {/* ── MAILLAGE INTERNE PILLAR — Cross-BU (BU1↔BU2↔BU3) ── */}
            <LazySection rootMargin="300px" minHeight="200px">
              <SectionBoundary>
                <InternalLinks
                  currentArticleId={resolvedArticle.id}
                  currentCategory={resolvedArticle.category}
                />
              </SectionBoundary>
            </LazySection>

            {/* ── KOS BIG FOUR SECTIONS — FAQ, Références, Méthodologie, Avertissement (tous les articles) ── */}
            <LazySection rootMargin="300px" minHeight="400px">
              <SectionBoundary>
                <BigFourSections
                  articleId={resolvedArticle.id}
                  existingFaq={(resolvedArticle.faq || (resolvedArticle.richContent?.faq || [])).map((f: any) => ({ q: f.q || f.question || '', a: f.a || f.answer || '' }))}
                  existingRefs={(resolvedArticle as any).richContent?.referencesOfficielles?.references || []}
                />
              </SectionBoundary>
            </LazySection>

            {/* ── CTA PREMIUM FINAL (bas d'article, avant le glossaire) ── */}
            <LazySection rootMargin="300px" minHeight="200px">
              <SectionBoundary>
                <PremiumFinalCTA variant={finalVariant} />
              </SectionBoundary>
            </LazySection>

            {/* Glossaire & Sources */}
            <LazySection rootMargin="200px" minHeight="120px">
              <SectionBoundary>
                <ArticleGlossary articleId={resolvedArticle.id} isEn={isEn} />
              </SectionBoundary>
            </LazySection>

            {/* Partage */}
            <LazySection rootMargin="200px" minHeight="80px">
              <div className="mt-12 pt-8 border-t border-secondary-100">
                <SectionBoundary>
                <SocialSharePremium
                  url={absoluteArticleUrl}
                  title={resolvedArticle.title}
                  description={resolvedArticle.excerpt}
                  variant="compact"
                  className="mb-5"
                />
                <div className="border-t border-secondary-100 pt-5">
                  <ShareButtons
                    url={absoluteArticleUrl}
                    title={resolvedArticle.title}
                    excerpt={resolvedArticle.excerpt}
                    isEn={isEn}
                    hashtags={resolvedArticle.tags}
                  />
                </div>
                </SectionBoundary>
              </div>
            </LazySection>

            {/* Articles liés */}
            <LazySection rootMargin="200px" minHeight="300px">
              <SectionBoundary>
              <ArticleNav
                currentArticleId={resolvedArticle.id}
                allArticles={articles.map(a => ({
                  id: a.id,
                  title: a.title,
                  category: a.category,
                  date: a.date,
                }))}
              />
              </SectionBoundary>
            </LazySection>

            {/* Articles liés */}
            <LazySection rootMargin="200px" minHeight="300px">
              <SectionBoundary>
              <RelatedArticles
                articles={articles.filter(a => a.id !== resolvedArticle.id && a.category === resolvedArticle.category).slice(0, 3)}
                currentCategory={resolvedArticle.category}
              />
              </SectionBoundary>
            </LazySection>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">

            {/* Table des matières */}
            {resolvedArticle.content && resolvedArticle.content.length > 0 && (
              <div className="sticky top-28" style={{ contain: 'layout' }}>
                <ArticleTableOfContents
                  content={resolvedArticle.content}
                  isEn={isEn}
                />

                {/* CTA sidebar diagnostic */}
                <div className="mt-6 bg-gradient-to-br from-foreground-950 to-foreground-900 rounded-2xl p-6 text-white">
                  <div className="w-10 h-10 flex items-center justify-center bg-accent-500/20 rounded-xl mb-4">
                    <i className="ri-lightbulb-flash-line text-accent-400 text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading), serif' }}>
                    {isEn
                      ? 'Free Strategic Diagnosis'
                      : 'Diagnostic Stratégique Gratuit'}
                  </h4>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {isEn
                      ? '30 minutes with an expert to identify your transformation levers.'
                      : '30 minutes avec un expert pour identifier vos leviers de transformation.'}
                  </p>
                  <Link
                    to="/tools/diagnostic-organisationnel/"
                    className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-foreground-950 py-2.5 rounded-xl font-semibold text-sm hover:from-accent-600 hover:to-accent-700 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isEn ? 'Start now' : 'Démarrer maintenant'}
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>

                {/* ── RECOMMANDATIONS IA KOS (sidebar) ── */}
                <div className="mt-6">
                  <AIArticleRecommendations
                    articleContent={resolvedArticle.content}
                    articleTitle={resolvedArticle.title}
                    articleCategory={resolvedArticle.category}
                    articleTags={resolvedArticle.tags}
                    articleId={resolvedArticle.id}
                  />
                </div>

                {/* Retour au blog */}
                <Link
                  to="/blog/"
                  className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-foreground-500 hover:text-foreground-800 transition-colors cursor-pointer py-2"
                >
                  <i className="ri-arrow-left-line"></i>
                  {isEn ? 'Back to all articles' : 'Tous les articles'}
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>

      <Footer />
    </div>
    </ArticleErrorBoundary>
  );
}




import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import {
  SERIE_GOUVERNANCE_DATA,
  ARTICLES_SERIE,
  COMPARISON_DATA,
} from './data.tsx';
import { buildHreflang } from '@/utils/hreflang';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

function buildCollectionSchema(d: typeof SERIE_GOUVERNANCE_DATA, isEn: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: d.title,
    description: d.seo.description,
    image: d.heroImage,
    datePublished: d.meta.publishedDate,
    dateModified: d.meta.modifiedDate,
    author: {
      '@type': 'Person',
      name: d.meta.author,
      url: `${SITE_URL}/about`,
      jobTitle: d.meta.authorTitle,
    },
    publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${d.meta.canonicalPath}` },
    keywords: d.seo.keywords,
    inLanguage: isEn ? 'en' : 'fr',
    url: `${SITE_URL}${d.meta.canonicalPath}`,
  };
}

// ─── Color config ────────────────────────────────────────────────────────────
const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; badgeText: string }> = {
  amber: {
    bg: 'bg-accent-50',
    border: 'border-accent-200',
    text: 'text-accent-700',
    badge: 'bg-accent-100',
    badgeText: 'text-accent-800',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
    badge: 'bg-teal-100',
    badgeText: 'text-teal-800',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    badge: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    badge: 'bg-rose-100',
    badgeText: 'text-rose-800',
  },
};

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({
  article,
  index,
}: {
  article: typeof ARTICLES_SERIE[0];
  index: number;
}) {
  const navigate = useNavigate();
  const c = COLOR_MAP[article.color];
  const isEven = index % 2 === 0;

  return (
    <article
      className={`rounded-3xl overflow-hidden border-2 ${c.border} flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} group transition-all duration-300 hover:-translate-y-1 bg-background-50`}
    >
      {/* Image */}
      <div className="lg:w-2/5 flex-shrink-0 relative overflow-hidden" style={{ minHeight: '300px' }}>
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          width={700}
          height={440}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Subject badge floating on image */}
        <div className="absolute bottom-5 left-5 flex items-center gap-3">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-2xl flex-shrink-0 font-playfair font-bold text-xl border-2 ${c.border}`}
            style={{ background: 'rgba(10,10,10,0.85)', color: article.color === 'amber' ? '#c9a227' : article.color === 'emerald' ? '#059669' : article.color === 'teal' ? '#0d9488' : '#4f46e5' }}
          >
            {article.letter}
          </div>
          <div>
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{article.label}</p>
            <p className="text-white font-bold text-sm leading-snug max-w-[180px]">{article.matrix}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-7 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-accent-500/10 text-accent-400 border border-accent-500/25"
            >
              <i className="ri-award-line text-xs"></i>
              THOUGHT LEADERSHIP EXECUTIVE
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${c.badge} ${c.badgeText}`}>
              <i className="ri-time-line text-xs"></i>
              {article.readTime}
            </span>
          </div>

          {/* Circulaire */}
          <p className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 ${c.text}`}>
            <i className={`${article.icon} mr-1.5`}></i>
            {article.circulaire}
          </p>

          <h2 className="font-playfair text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-3">
            {article.title}
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">{article.excerpt}</p>

          {/* Articles referenced */}
          <div className="flex flex-wrap gap-2 mb-5">
            {article.articles.map((art, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${c.bg} ${c.text} border ${c.border}`}
              >
                {art}
              </span>
            ))}
          </div>

          {/* Matrix dimensions */}
          <div className={`rounded-xl ${c.bg} border ${c.border} p-4 mb-5`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${c.text} mb-2.5`}>
              <i className="ri-bar-chart-grouped-line mr-1.5"></i>
              5 Dimensions d'évaluation — {article.matrix}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {article.matrixDimensions.map((dim, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div
                    className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-md border ${c.border} bg-white text-xs font-bold ${c.text}`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs text-gray-700 leading-snug">{dim}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: '#c9a227' }}>
              <img
                src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                alt={SERIE_GOUVERNANCE_DATA.meta.author}
                className="w-full h-full object-cover"
                width={28}
                height={28}
                loading="lazy"
              />
            </div>
            <span className="text-xs text-gray-500">{SERIE_GOUVERNANCE_DATA.meta.author}</span>
          </div>

          <button
            onClick={() => navigate(article.href)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105 ${c.bg} ${c.text} border-2 ${c.border} hover:shadow-md`}
          >
            Lire l'article
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Comparison table ─────────────────────────────────────────────────────────
function ComparisonTable() {
  const [expandedMatrix, setExpandedMatrix] = useState<string | null>(null);

  const colorOrder = ['amber', 'emerald', 'teal', 'indigo', 'rose'];

  return (
    <section id="tableau-comparatif" className="scroll-mt-28">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a227' }}>
          <i className="ri-table-2 mr-1.5"></i>
          Tableau Comparatif
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {COMPARISON_DATA.heading}
        </h2>
        <p className="text-gray-600 text-base max-w-2xl leading-relaxed">
          {COMPARISON_DATA.subheading}
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
        {COMPARISON_DATA.columns.map((col, idx) => {
          const c = COLOR_MAP[colorOrder[idx]];
          const isExpanded = expandedMatrix === col.matrix;
          return (
            <div
              key={col.matrix}
              className={`rounded-2xl border-2 ${c.border} overflow-hidden flex flex-col`}
            >
              {/* Header card */}
              <div className={`${c.bg} px-5 py-4 border-b ${c.border}`}>
                <p className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-1`}>
                  {col.circulaire}
                </p>
                <p className="font-playfair font-bold text-gray-900 leading-snug text-sm">
                  KHEPRA {col.matrix}
                </p>
                <p className="text-xs text-gray-500 mt-1">{col.focus}</p>
              </div>

              {/* Dimensions */}
              <div className="px-5 py-4 flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  5 Dimensions
                </p>
                <div className="space-y-2">
                  {col.dimensions.map((dim, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span
                        className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-md border ${c.border} bg-white text-xs font-bold ${c.text}`}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 leading-snug">{dim.name}</p>
                        <p className={`text-xs font-mono ${c.text} opacity-70`}>{dim.key}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sanctions toggle */}
              <div className="px-5 pb-4">
                <button
                  onClick={() => setExpandedMatrix(isExpanded ? null : col.matrix)}
                  className={`w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider ${c.text} py-2 border-t ${c.border} cursor-pointer`}
                >
                  <span>Sanctions CB-UMOA</span>
                  <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                </button>
                {isExpanded && (
                  <div className="mt-2 space-y-1.5">
                    {col.sanctions.map((s, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <i className="ri-alert-line text-xs text-red-500 flex-shrink-0 mt-0.5"></i>
                        <p className="text-xs text-gray-600 leading-snug">{s}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Maturity scale legend */}
      <div className="rounded-2xl border border-gray-200 p-6 bg-white">
        <p className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <i className="ri-bar-chart-line" style={{ color: '#c9a227' }}></i>
          Échelle de maturité commune aux 5 matrices (Score 1 à 5)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            {
              score: '1',
              label: 'Initié',
              desc: 'Non-conformité structurelle, absence de dispositif',
              color: 'bg-red-50 border-red-200 text-red-700',
            },
            {
              score: '2',
              label: 'Développé',
              desc: 'Dispositif partiel, non systématique',
              color: 'bg-orange-50 border-orange-200 text-orange-700',
            },
            {
              score: '3',
              label: 'Défini',
              desc: 'Conformité formelle, lacunes résiduelles identifiées',
              color: 'bg-amber-50 border-amber-200 text-amber-700',
            },
            {
              score: '4',
              label: 'Géré',
              desc: 'Conformité totale, pilotage actif, zéro non-conformité',
              color: 'bg-teal-50 border-teal-200 text-teal-700',
            },
            {
              score: '5',
              label: 'Optimisé',
              desc: 'Excellence — anticipation, certification, benchmark international',
              color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
            },
          ].map((level, i) => (
            <div key={i} className={`rounded-xl border-2 p-3 ${level.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-playfair font-bold text-xl">{level.score}</span>
                <span className="font-bold text-xs uppercase tracking-wide">{level.label}</span>
              </div>
              <p className="text-xs leading-snug opacity-80">{level.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Regulatory framework overview ────────────────────────────────────────────
function RegulatoryOverview() {
  const frameworks = [
    {
      label: 'Circulaire n°01-2017/CB/C',
      scope: 'Gouvernance + Lanceurs d\'alerte',
      sujets: ['Sujet A', 'Sujet D'],
      icon: 'ri-book-2-line',
      color: 'amber',
    },
    {
      label: 'Circulaire n°02-2017/CB/C',
      scope: 'Dirigeants effectifs',
      sujets: ['Sujet B'],
      icon: 'ri-user-star-line',
      color: 'emerald',
    },
    {
      label: 'Circulaire n°03-2017/CB/C',
      scope: 'Contrôle interne & 3LD',
      sujets: ['Sujet C'],
      icon: 'ri-shield-star-line',
      color: 'teal',
    },
    {
      label: 'Standards internationaux',
      scope: 'OCDE / GAFI / Bâle III / Directive UE',
      sujets: ['A', 'B', 'C', 'D', 'E'],
      icon: 'ri-global-line',
      color: 'indigo',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      {frameworks.map((fw, i) => {
        const c = COLOR_MAP[fw.color];
        return (
          <div key={i} className={`rounded-2xl border-2 ${c.border} ${c.bg} p-5`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 ${c.border} bg-white mb-3`}>
              <i className={`${fw.icon} ${c.text} text-lg`}></i>
            </div>
            <p className={`font-bold text-xs uppercase tracking-wide ${c.text} mb-0.5`}>{fw.label}</p>
            <p className="text-sm font-semibold text-gray-800 mb-2">{fw.scope}</p>
            <div className="flex flex-wrap gap-1.5">
              {fw.sujets.map((s, j) => (
                <span key={j} className={`px-2 py-0.5 rounded-full text-xs font-bold ${c.badge} ${c.badgeText}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SerieGouvernancePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const d = SERIE_GOUVERNANCE_DATA;
  const isEn = i18n.language === 'en';
  const pageUrl = `${SITE_URL}${d.meta.canonicalPath}`;
  const collectionSchema = buildCollectionSchema(d, isEn);

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title={d.seo.title}
        description={d.seo.description}
        keywords={d.seo.keywords}
        canonicalPath={d.meta.canonicalPath}
        hreflangLinks={buildHreflang('/blog/serie-gouvernance-bancaire-uemoa')}
        ogUrl={pageUrl}
        ogType="website"
        ogImage={d.heroImage}
        ogImageWidth="1400"
        ogImageHeight="520"
        ogImageAlt={d.heroAlt}
        articlePublishedTime={d.meta.publishedDate}
        articleModifiedTime={d.meta.modifiedDate}
        articleAuthor={d.meta.author}
        articleSection={d.meta.category}
        articleTags={d.meta.tags}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={collectionSchema}
        twitterLabel1={isEn ? 'Number of articles' : "Nombre d'articles"}
        twitterData1={isEn ? '5 analyses' : '5 analyses'}
        twitterLabel2={isEn ? 'Category' : 'Catégorie'}
        twitterData2={isEn ? 'Bank Governance UEMOA' : 'Gouvernance Bancaire UEMOA'}
      />

      <Navigation />

      {/* ── Hero ── */}
      <div className="relative pt-20 overflow-hidden" style={{ height: '520px' }}>
        <img
          src={d.heroImage}
          alt={d.heroAlt}
          className="absolute inset-0 w-full h-full object-cover object-top"
          width={1400}
          height={520}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(6,6,16,0.65) 0%, transparent 55%)' }} />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb
            variant="light"
            items={[
              { label: d.breadcrumb.home, href: '/' },
              { label: d.breadcrumb.blog, href: '/blog/' },
              { label: d.breadcrumb.current },
            ]}
          />
        </div>

        <div className="absolute bottom-10 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(201,162,39,0.15)', color: '#d4a82a', border: '1px solid rgba(201,162,39,0.35)' }}
            >
              <i className="ri-booklet-line text-xs"></i>
              SÉRIE ÉDITORIALE — QUINTILOGIE
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              <i className="ri-file-chart-line text-xs"></i>
              5 articles • 5 matrices KHEPRA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              <i className="ri-building-line text-xs"></i>
              Commission Bancaire UMOA
            </span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-xl mb-3">
            {d.title}
          </h1>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-3xl">
            {d.subtitle}
          </p>

          {/* Quick jump */}
          <div className="flex flex-wrap gap-3 mt-6">
            {ARTICLES_SERIE.map((art) => {
              const c = COLOR_MAP[art.color];
              return (
                <button
                  key={art.letter}
                  onClick={() => navigate(art.href)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all hover:scale-105 border border-white/20 bg-white/10 text-white hover:border-white/40`}
                >
                  <span className={`w-5 h-5 flex items-center justify-center rounded-md font-bold text-xs ${c.badge} ${c.badgeText}`}>
                    {art.letter}
                  </span>
                  {art.label}
                  <i className="ri-arrow-right-line text-xs"></i>
                </button>
              );
            })}
            <button
              onClick={() => {
                const el = document.getElementById('tableau-comparatif');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all border-2 hover:scale-105"
              style={{ background: 'rgba(201,162,39,0.15)', borderColor: 'rgba(201,162,39,0.4)', color: '#d4a82a' }}
            >
              <i className="ri-table-2 text-xs"></i>
              Tableau comparatif des matrices
            </button>
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Stats bar ── */}
        <div
          className="flex flex-col sm:flex-row gap-5 items-center justify-between py-7 px-8 rounded-3xl my-10"
          style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}
        >
          {[
            { value: '5', label: 'Articles de référence', icon: 'ri-article-line' },
            { value: '5', label: 'Matrices KHEPRA propriétaires', icon: 'ri-tools-line' },
            { value: '120', label: 'Minutes de lecture', icon: 'ri-time-line' },
            { value: '3', label: 'Circulaires CB-UMOA couvertes', icon: 'ri-book-2-line' },
            { value: '6', label: 'Standards internationaux alignés', icon: 'ri-global-line' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <i className={`${stat.icon} text-base`} style={{ color: '#c9a227' }}></i>
                <span className="font-playfair font-bold text-white text-2xl">{stat.value}</span>
              </div>
              <p className="text-xs text-white/50 whitespace-nowrap">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── GEO — Réponse directe IA (40-80 mots) ── */}
        <section className="my-10">
          <div className="rounded-2xl p-6 sm:p-8 border-2" style={{ background: 'rgba(201,162,39,0.04)', borderColor: 'rgba(201,162,39,0.25)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: 'rgba(201,162,39,0.12)' }}>
                <i className="ri-sparkling-line text-base" style={{ color: '#c9a227' }}></i>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>Réponse directe — Gouvernance Bancaire UEMOA</p>
            </div>
            <h2 className="font-playfair text-xl font-bold text-gray-900 mb-3 leading-snug">
              Qu'est-ce que la gouvernance bancaire UEMOA et quelles sont ses exigences réglementaires ?
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-5">
              La gouvernance bancaire UEMOA est encadrée par trois circulaires de la Commission Bancaire de l'UMOA : la <strong>Circulaire n°01-2017/CB/C</strong> (composition du Conseil d'Administration, comités spécialisés, administrateurs indépendants), la <strong>Circulaire n°02-2017/CB/C</strong> (aptitude des dirigeants effectifs, verrou de la nationalité, avis conforme) et la <strong>Circulaire n°03-2017/CB/C</strong> (étanchéité des 3 lignes de défense, audit interne). Le non-respect expose les établissements à des sanctions allant jusqu'au retrait d'agrément, selon le principe de proportionnalité et l'approche basée sur les risques appliqués par la supervision fondée sur les risques de la Commission Bancaire UMOA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Définition', icon: 'ri-book-open-line', text: 'La gouvernance bancaire UEMOA est le dispositif structurel, réglementaire et comportemental garantissant que les établissements de crédit sont dirigés et contrôlés conformément aux exigences prudentielles de la BCEAO et de la Commission Bancaire UMOA.' },
                { title: 'Textes applicables', icon: 'ri-file-text-line', text: 'Circulaires 01, 02 et 03-2017/CB/C + Circulaire 001-2020/CB/C (PPR) + Instructions CB-UMOA n°026 à 029-11-2016 (ratios prudentiels Bâle III) + Directive UEMOA n°02/2015 (LBC/FT) + Standards OCDE, GAFI et Bâle III.' },
                { title: 'Sanctions encourues', icon: 'ri-error-warning-line', text: 'Avertissement, injonction de mise en conformité, limitation d\'activité, suspension temporaire d\'agrément, administration provisoire et retrait d\'agrément (Art. 58, Convention CB-UMOA du 24 avril 1990).' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-4 bg-white border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <i className={`${item.icon} text-sm`} style={{ color: '#c9a227' }}></i>
                    <p className="font-bold text-xs text-gray-900 uppercase tracking-wide">{item.title}</p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intro section ── */}
        <section className="mb-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a227' }}>
              <i className="ri-information-line mr-1.5"></i>
              Objet de la série
            </p>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-tight">
              Une quintilogie conçue pour les Conseils d'Administration et les équipes de gouvernance en zone UEMOA
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed border-l-4 pl-5" style={{ borderColor: '#c9a227' }}>
              <p>
                La Commission Bancaire de l'UMOA a durci, depuis 2022, sa politique de contrôle sur la gouvernance des établissements de crédit. Les Circulaires n°01, 02 et 03-2017/CB/C constituent le corpus normatif de référence, exigeant une mise en conformité sur quatre dimensions critiques que cette série analyse exhaustivement.
              </p>
              <p>
                Chaque article est une analyse technique de niveau Senior Partner, avec un cadre réglementaire structuré, une cartographie des points de friction réels, une architecture de solution en 4 piliers, et une matrice KHEPRA propriétaire permettant d'objectiver le niveau de maturité de l'institution.
              </p>
            </div>
          </div>
        </section>

        {/* ── Regulatory frameworks ── */}
        <section className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#c9a227' }}>
            <i className="ri-scales-3-line mr-1.5"></i>
            Architecture réglementaire couverte
          </p>
          <RegulatoryOverview />
        </section>

        {/* ── Articles ── */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a227' }}>
                <i className="ri-file-list-3-line mr-1.5"></i>
                Les cinq articles de la série
              </p>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900">
                Analyses techniques Executive — 97 min de lecture
              </h2>
            </div>
          </div>

          <div className="space-y-8">
            {ARTICLES_SERIE.map((article, idx) => (
              <ArticleCard key={article.letter} article={article} index={idx} />
            ))}
          </div>
        </section>

        {/* ── Comparative table ── */}
        <div className="mb-20">
          <ComparisonTable />
        </div>

        {/* ── Diagnostic CTA ── */}
        <section className="mb-20">
          <div
            className="rounded-3xl p-10 sm:p-14 relative overflow-hidden text-center"
            style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}
          >
            {/* Background glow effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 70%)' }}></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)' }}></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6"
                style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.3)' }}
              >
                <i className="ri-shield-star-line text-3xl" style={{ color: '#c9a227' }}></i>
              </div>

              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a227' }}>
                Diagnostic de Gouvernance KHEPRA EXPERTS
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                Évaluez la conformité globale de votre institution sur les 5 dimensions de la quintilogie
              </h2>
              <p className="text-white/65 text-sm leading-relaxed mb-8">
                Un diagnostic unifié couvrant les 5 matrices KHEPRA (INDEPENDENCE™ + VISA™ + 3LD™ + WHISTLEBLOWER™ + COMMITTEE™) vous donne une vision complète du niveau de conformité aux Circulaires CB-UMOA et aux standards internationaux. Rapport confidentiel, plan d'action priorisé, délai : 30 jours. Les résultats peuvent varier selon les caractéristiques de chaque établissement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                >
                  <i className="ri-stethoscope-line"></i>
                  Demander le diagnostic unifié
                </button>
                <button
                  onClick={() => navigate('/diagnostic-flash')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm cursor-pointer transition-all border border-white/20 text-white hover:bg-white/10 whitespace-nowrap"
                >
                  <i className="ri-flashlight-line"></i>
                  Diagnostic Flash gratuit
                </button>
              </div>

              <p className="text-xs text-white/35 mt-5 italic">
                Confidentialité absolue. Aucun logo client exposé. Rapport destiné exclusivement au Conseil d'Administration.
              </p>
            </div>
          </div>
        </section>

        {/* ── Disclaimer de conformité ── */}
        <section className="mb-16">
          <div className="rounded-2xl border-2 border-amber-200 p-6 sm:p-8 bg-amber-50/40">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 border-2 border-amber-200 flex-shrink-0">
                <i className="ri-shield-check-line text-lg text-amber-700"></i>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">Disclaimer — Conformité réglementaire</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Cette publication est fournie à titre informatif et ne constitue ni un avis juridique, ni une consultation réglementaire individuelle. Les établissements sont invités à se référer aux textes officiels de la BCEAO et de la Commission Bancaire de l'UMOA ainsi qu'à leurs conseils spécialisés. Les matrices KHEPRA sont des outils d'évaluation propriétaires et ne constituent pas des instruments officiels du régulateur. Les sanctions mentionnées sont indicatives et applicables selon le principe de proportionnalité et l'approche basée sur les risques de la supervision fondée sur les risques.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── About series ── */}
        <section className="mb-16 py-12 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Author */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 mb-4" style={{ borderColor: '#c9a227' }}>
                <img
                  src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                  alt={d.meta.author}
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                  loading="lazy"
                />
              </div>
              <p className="font-bold text-gray-900 text-sm">{d.meta.author}</p>
              <p className="text-xs text-gray-500 max-w-[180px] leading-snug">{d.meta.authorTitle}</p>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a227' }}>
                <i className="ri-quill-pen-line mr-1.5"></i>
                À propos de cette série
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Cette quintilogie est le fruit de plus de dix ans de missions de gouvernance bancaire et de due diligence réglementaire conduites en zone UEMOA par KHEPRA EXPERTS, dans le cadre d'une approche basée sur les risques et du principe de proportionnalité. Chaque article est une synthèse de cas réels traités lors d'inspections du SG-CB-UMOA, de missions de restructuration du Conseil d'Administration et de due diligence pré-acquisition pour des investisseurs institutionnels.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Le niveau de détail technique est volontairement élevé. Ces articles ne sont pas des synthèses grand public. Ils sont rédigés pour les membres du Conseil d'Administration, les Présidents de Comités d'Audit, les Directeurs de la Conformité et les Secrétariats Généraux des établissements de crédit de la zone UEMOA, afin de renforcer la gouvernance prudentielle, la capacité d'absorption des pertes et la continuité des fonctions critiques.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {d.meta.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    <i className="ri-price-tag-3-line text-xs" style={{ color: '#c9a227' }}></i>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Références Officielles ── */}
        <section className="mb-16 py-12 border-t border-gray-100">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#c9a227' }}>
              <i className="ri-book-3-line mr-1.5"></i>
              Références Officielles
            </p>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              Sources institutionnelles et cadres réglementaires
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Les analyses de cette quintilogie s'appuient exclusivement sur les textes officiels émis par la BCEAO, la Commission Bancaire de l'UMOA et les institutions internationales de référence en matière de gouvernance bancaire et de supervision prudentielle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Circulaire N°01-2017/CB/C',
                institution: 'Commission Bancaire de l\'UMOA',
                year: '2017',
                desc: 'Composition du Conseil d\'Administration, comités spécialisés, administrateurs indépendants, protection des lanceurs d\'alerte (Art. 44).',
                link: 'https://www.bceao.int/',
                icon: 'ri-file-text-line',
              },
              {
                title: 'Circulaire N°02-2017/CB/C',
                institution: 'Commission Bancaire de l\'UMOA',
                year: '2017',
                desc: 'Aptitude des dirigeants effectifs, verrou de la nationalité, avis conforme pour les non-ressortissants (Art. 12-16).',
                link: 'https://www.bceao.int/',
                icon: 'ri-file-text-line',
              },
              {
                title: 'Circulaire N°03-2017/CB/C',
                institution: 'Commission Bancaire de l\'UMOA',
                year: '2017',
                desc: 'Organisation du contrôle interne, étanchéité des 3 lignes de défense, audit interne, piste d\'audit numérique (Art. 22-58).',
                link: 'https://www.bceao.int/',
                icon: 'ri-file-text-line',
              },
              {
                title: 'Circulaire N°001-2020/CB/C',
                institution: 'Commission Bancaire de l\'UMOA',
                year: '2020',
                desc: 'Plans Préventifs de Redressement (PPR), dispositifs d\'alerte précoce, gouvernance prudentielle (Art. 1-12).',
                link: 'https://www.bceao.int/',
                icon: 'ri-file-text-line',
              },
              {
                title: 'Convention portant création de la Commission Bancaire',
                institution: 'UMOA — Article 58',
                year: '1990',
                desc: 'Sanctions disciplinaires applicables aux établissements de crédit : avertissement, injonction, suspension, retrait d\'agrément.',
                link: 'https://www.bceao.int/',
                icon: 'ri-scales-3-line',
              },
              {
                title: 'Instructions CB-UMOA n°026 à 029-11-2016',
                institution: 'Commission Bancaire de l\'UMOA',
                year: '2016',
                desc: 'Ratios prudentiels Bâle III : fonds propres, ratio de solvabilité, ratio de liquidité, ratio de levier.',
                link: 'https://www.bceao.int/',
                icon: 'ri-calculator-line',
              },
              {
                title: 'Principes de gouvernance d\'entreprise — OCDE',
                institution: 'Organisation de coopération et de développement économiques',
                year: '2023',
                desc: 'Cadre international de référence pour l\'indépendance des administrateurs, les comités spécialisés et la conduite des affaires.',
                link: 'https://www.oecd.org/corporate/principles-corporate-governance.htm',
                icon: 'ri-global-line',
              },
              {
                title: 'Recommandations GAFI — Rec. 20-22',
                institution: 'Groupe d\'Action Financière',
                year: '2023',
                desc: 'Canaux de signalement internes, protection des lanceurs d\'alerte, conformité des établissements financiers en matière de LBC/FT.',
                link: 'https://www.fatf-gafi.org/',
                icon: 'ri-shield-user-line',
              },
              {
                title: 'Directive (UE) 2019/1937',
                institution: 'Parlement européen et Conseil de l\'UE',
                year: '2019',
                desc: 'Protection des lanceurs d\'alerte, confidentialité, protection contre les représailles, canaux de signalement conformes.',
                link: 'https://eur-lex.europa.eu/eli/dir/2019/1937',
                icon: 'ri-shield-check-line',
              },
            ].map((ref, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-5 bg-white hover:border-amber-200 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <i className={`${ref.icon} text-sm`} style={{ color: '#c9a227' }}></i>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{ref.institution} — {ref.year}</p>
                </div>
                <p className="font-bold text-sm text-gray-900 mb-1">{ref.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{ref.desc}</p>
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <i className="ri-external-link-line"></i>
                  Consulter le texte officiel
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Back to blog ── */}
        <div className="text-center pb-12">
          <a
            href="/blog/"
            onClick={(e) => { e.preventDefault(); navigate('/blog'); }}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
            Retour au blog
          </a>
        </div>
      </div>

      {/* Share */}
      <section className="py-12 bg-background-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={pageUrl}
            title={d.title}
            description={d.description}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
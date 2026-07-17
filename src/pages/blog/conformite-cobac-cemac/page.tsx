import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { ShareButtons } from '@/pages/blog/components/ShareButtons';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { ArticleNewsletterInline } from '@/pages/blog/components/ArticleNewsletterInline';
import { MiniGuideCTA } from '@/pages/blog/components/MiniGuideCTA';
import BlogObservatoireAgrementsCTA from '@/components/feature/BlogObservatoireAgrementsCTA';
import { COBAC_ARTICLE_DATA, COBAC_ARTICLE_CONTENT } from './data.tsx';
import { buildArticleHreflang } from '@/utils/hreflang';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const ARTICLE_URL = `${SITE_URL}/blog/conformite-cobac-cemac/`;

function buildArticleSchema(d: typeof COBAC_ARTICLE_DATA, isEn: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: d.title,
    description: d.seo.description,
    image: d.heroImage,
    datePublished: d.meta.publishedDate,
    dateModified: d.meta.modifiedDate,
    author: { '@type': 'Person', name: d.meta.author, url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
    keywords: d.seo.keywords,
    articleSection: d.meta.category,
    inLanguage: isEn ? 'en' : 'fr',
    url: ARTICLE_URL,
  };
}

function buildFaqSchema(d: typeof COBAC_ARTICLE_DATA) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export default function ConformiteCobacPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const d = COBAC_ARTICLE_DATA;
  const c = COBAC_ARTICLE_CONTENT;

  const articleSchema = buildArticleSchema(d, isEn);
  const faqSchema = buildFaqSchema(d);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title={d.seo.title}
        description={d.seo.description}
        keywords={d.seo.keywords}
        canonicalPath={d.meta.canonicalPath}
        hreflangLinks={buildArticleHreflang('conformite-cobac-cemac', isEn ? 'en' : 'fr')}
        ogUrl={ARTICLE_URL}
        ogType="article"
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
        schemaJson={[articleSchema, faqSchema]}
        twitterLabel1={isEn ? 'Reading time' : 'Temps de lecture'}
        twitterData1={d.meta.readTime}
        twitterLabel2={isEn ? 'Category' : 'Catégorie'}
        twitterData2={d.meta.category}
      />

      <Navigation />

      {/* Hero */}
      <div className="relative pt-20 overflow-hidden" style={{ height: '520px' }}>
        <img
          src={d.heroImage}
          alt={d.heroAlt}
          className="absolute inset-0 w-full h-full object-cover object-top"
          width={1400}
          height={520}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(10,10,10,0.55) 0%, transparent 60%)' }} />

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

        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(201,162,39,0.15)', color: '#d4a82a', border: '1px solid rgba(201,162,39,0.35)' }}
            >
              <i className="ri-award-line text-xs"></i>
              {d.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
              <i className="ri-alert-line text-xs"></i>
              COBAC / CEMAC
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
              <i className="ri-time-line text-xs"></i>
              {d.meta.readTime}
            </span>
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg mb-2">
            {d.title}
          </h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-3xl">{d.subtitle}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          <main className="flex-1 min-w-0" id="main-content">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: '#c9a227' }}>
                  <img
                    src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                    alt={d.meta.author}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{d.meta.author}</p>
                  <p className="text-xs text-gray-500">{d.meta.authorTitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 ml-auto">
                <span className="flex items-center gap-1.5">
                  <i className="ri-calendar-line" style={{ color: '#c9a227' }}></i>
                  {d.publishedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-time-line" style={{ color: '#c9a227' }}></i>
                  {d.meta.readTime}
                </span>
              </div>
            </div>

            {/* Methodology note */}
            <div className="mb-6 rounded-xl p-4 bg-gray-50 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.12)' }}>
                  <i className="ri-scales-3-line text-sm" style={{ color: '#c9a227' }}></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">Méthodologie</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{d.methodologyNote}</p>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic" style={{ borderColor: '#c9a227' }}>
              {d.excerpt}
            </p>

            {/* GEO — Réponse directe IA */}
            <div className="mb-8 rounded-2xl p-5 border-2" style={{ background: 'rgba(201,162,39,0.04)', borderColor: 'rgba(201,162,39,0.22)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 flex items-center justify-center rounded-lg" style={{ background: 'rgba(201,162,39,0.12)' }}>
                  <i className="ri-sparkling-line text-sm" style={{ color: '#c9a227' }}></i>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>Réponse directe</p>
              </div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 mb-2 leading-snug">
                Qu'est-ce que la conformité COBAC / CEMAC pour les institutions financières africaines ?
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                La conformité COBAC / CEMAC désigne le respect des exigences de la <strong>Commission Bancaire de l'Afrique Centrale</strong> (supervision, inspections, sanctions) et de la <strong>BEAC</strong> (ratios prudentiels, politique monétaire). Pour les banques et IMF en zone CEMAC (Cameroun, Gabon, Congo, Tchad, RCA, Guinée Équatoriale), cette conformité conditionne l'accès au financement, la pérennité de l'agrément et la crédibilité auprès des investisseurs internationaux.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Textes COBAC clés', items: ['Convention COBAC 1990 (révisée 2010)', 'Instruction 007-03-2022 (gouvernance)', 'Règlement COBAC R-2018/01 (LBC/FT)', 'Instructions BEAC ratios prudentiels'] },
                  { label: 'Spécificités CEMAC', items: ['6 États membres', 'Taux de change fixe (1 EUR = 655,957 FCFA)', 'Publication des sanctions sur le site COBAC', 'ANIF pour les déclarations de soupçon'] },
                ].map((col, i) => (
                  <div key={i} className="rounded-xl p-3 bg-white border border-gray-100">
                    <p className="font-bold text-xs text-gray-900 uppercase tracking-wide mb-2" style={{ color: '#c9a227' }}>{col.label}</p>
                    <ul className="space-y-1">
                      {col.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <i className="ri-arrow-right-s-line text-xs flex-shrink-0 mt-0.5" style={{ color: '#c9a227' }}></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <MiniGuideCTA guide="gouvernance-imf" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {d.meta.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  <i className="ri-price-tag-3-line text-xs" style={{ color: '#c9a227' }}></i>
                  {tag}
                </span>
              ))}
            </div>

            {/* Executive Summary */}
            <section id="executive-summary" className="mb-14 scroll-mt-28">
              <div className="rounded-2xl overflow-hidden mb-8" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 flex items-center justify-center rounded-xl" style={{ background: 'rgba(201,162,39,0.12)' }}>
                      <i className="ri-file-list-3-line text-base" style={{ color: '#c9a227' }}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>Thought Leadership — Senior Partner</p>
                      <p className="font-playfair text-lg font-bold text-white leading-snug">{c.executiveSummary.heading}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 ml-11 mb-3">{c.executiveSummary.subheading}</p>
                </div>
                <div className="px-6 sm:px-8 py-6 space-y-3">
                  {c.executiveSummary.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-white/75 leading-relaxed">{p}</p>
                  ))}
                  <div className="space-y-3 pt-2">
                    {c.executiveSummary.keyPoints.map((kp, i) => (
                      <div key={i} className="flex gap-3 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ background: '#c9a227' }}></div>
                        <div>
                          <p className="font-bold text-sm mb-1" style={{ color: '#d4a82a' }}>{kp.label}</p>
                          <p className="text-sm text-white/70 leading-relaxed">{kp.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 sm:px-8 pb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Actions requises</p>
                  <div className="space-y-2">
                    {c.executiveSummary.actionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#c9a227' }}></i>
                        </div>
                        <p className="text-sm text-white/70">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Cadre réglementaire */}
            <section id="cadre-reglementaire" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>II</span>
                {c.cadreReglementaire.heading}
              </h2>
              {c.cadreReglementaire.blocks.map((block) => (
                <div key={block.id} className={`rounded-2xl border-2 ${block.border} overflow-hidden mb-6`}>
                  <div className={`flex items-center gap-3 px-5 sm:px-6 py-4 ${block.bg} border-b-2 ${block.border}`}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-xl border-2 ${block.border} bg-white flex-shrink-0`}>
                      <i className={`${block.icon} ${block.color} text-base`}></i>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug">{block.title}</h3>
                  </div>
                  <div className="px-5 sm:px-6 py-5 space-y-4">
                    {block.id === 'A' ? (
                      <>
                        <p className="text-sm text-gray-600 leading-relaxed">{block.intro}</p>
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                          <table className="w-full text-xs min-w-[600px]">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                {block.tableHeaders!.map((h, i) => (
                                  <th key={i} className="px-3 py-3 text-left font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {block.tableRows!.map((row, ri) => (
                                <tr key={ri} className="hover:bg-gray-50/50 transition-colors">
                                  {row.map((cell, ci) => (
                                    <td key={ci} className={`px-3 py-2.5 text-gray-700 align-top text-xs leading-snug ${ci === 0 ? 'font-semibold text-gray-900' : ''}`}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-gray-400 italic">{block.sourceNote}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 leading-relaxed">{block.intro}</p>
                        <ul className="space-y-2.5">
                          {block.bullets!.map((b, i) => (
                            <li key={i} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#c9a227' }}></span>
                              <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-400 italic">{block.sourceNote}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </section>

            {/* Ratios prudentiels */}
            <section id="ratios-prudentiels" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>III</span>
                {c.ratiosPrudentiels.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.ratiosPrudentiels.intro}</p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-xs min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {c.ratiosPrudentiels.table.headers.map((h, i) => (
                        <th key={i} className="px-3 py-3 text-left font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {c.ratiosPrudentiels.table.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50/50 transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-3 py-2.5 text-gray-700 align-top text-xs leading-snug ${ci === 0 ? 'font-semibold text-gray-900' : ''}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic mb-4">{c.ratiosPrudentiels.sourceNote}</p>
              <div className="rounded-xl p-4 border border-red-200 bg-red-50">
                <div className="flex items-start gap-3">
                  <i className="ri-error-warning-line text-red-600 text-sm flex-shrink-0 mt-0.5"></i>
                  <p className="text-sm text-red-700 leading-relaxed">{c.ratiosPrudentiels.alerte}</p>
                </div>
              </div>
            </section>

            <ArticleNewsletterInline />

            {/* Gouvernance */}
            <section id="gouvernance-cobac" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>IV</span>
                {c.gouvernance.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.gouvernance.intro}</p>
              <div className="space-y-4">
                {c.gouvernance.points.map((pt, i) => (
                  <div key={i} className="rounded-xl p-4 bg-white border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 flex items-center justify-center rounded-md text-xs font-bold" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>{i + 1}</div>
                      <p className="font-bold text-sm text-gray-900">{pt.title}</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{pt.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Distinction Obligation vs Recommandation */}
            <section id="distinction-obligation" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-3 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>V</span>
                {c.distinctionObligation.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.distinctionObligation.intro}</p>
              <div className="space-y-6">
                {c.distinctionObligation.categories.map((cat, ci) => {
                  const catColors = {
                    obligation: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700 border-red-200', iconBg: 'rgba(239,68,68,0.1)', iconColor: '#ef4444' },
                    'bonne-pratique': { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', iconBg: 'rgba(16,185,129,0.1)', iconColor: '#10b981' },
                    standard: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700 border-amber-200', iconBg: 'rgba(245,158,11,0.1)', iconColor: '#f59e0b' },
                  };
                  const colors = catColors[cat.type as keyof typeof catColors];
                  return (
                    <div key={ci} className={`rounded-2xl border-2 ${colors.border} overflow-hidden`}>
                      <div className={`flex items-center gap-3 px-5 sm:px-6 py-4 ${colors.bg} border-b-2 ${colors.border}`}>
                        <div className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: colors.iconBg }}>
                          <i className={`${cat.icon} text-base`} style={{ color: colors.iconColor }}></i>
                        </div>
                        <div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.badge}`}>{cat.type === 'obligation' ? 'OBLIGATOIRE' : cat.type === 'bonne-pratique' ? 'RECOMMANDÉ' : 'STANDARD'}</span>
                          <h3 className="font-bold text-gray-900 text-base leading-snug mt-1">{cat.label}</h3>
                        </div>
                      </div>
                      <div className="px-5 sm:px-6 py-4">
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{cat.description}</p>
                        <ul className="space-y-2.5">
                          {cat.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-2.5 bg-white rounded-xl p-3 border border-gray-100">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: colors.iconColor }}></span>
                              <div>
                                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                                <p className="text-xs text-gray-400 mt-1 italic">{item.reference}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <MiniGuideCTA guide="due-diligence" />
            <BlogObservatoireAgrementsCTA variant="observatoire" context="compliance" />

            {/* Différences */}
            <section id="différences-uemoa" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VI</span>
                {c.differences.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.differences.intro}</p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-xs min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {c.differences.table.headers.map((h, i) => (
                        <th key={i} className="px-3 py-3 text-left font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {c.differences.table.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50/50 transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-3 py-2.5 text-gray-700 align-top text-xs leading-snug ${ci === 0 ? 'font-semibold text-gray-900' : ''}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic">{c.differences.sourceNote}</p>
            </section>

            {/* Sanctions */}
            <section id="sanctions" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VII</span>
                {c.sanctions.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.sanctions.intro}</p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-xs min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {c.sanctions.table.headers.map((h, i) => (
                        <th key={i} className="px-3 py-3 text-left font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {c.sanctions.table.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50/50 transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-3 py-2.5 text-gray-700 align-top text-xs leading-snug ${ci === 0 ? 'font-semibold text-gray-900' : ''} ${ci === 0 ? 'w-16' : ''}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl p-4 border border-red-200 bg-red-50">
                <div className="flex items-start gap-3">
                  <i className="ri-error-warning-line text-red-600 text-sm flex-shrink-0 mt-0.5"></i>
                  <p className="text-sm text-red-700 leading-relaxed">{c.sanctions.alerte}</p>
                </div>
              </div>
            </section>

            {/* GEO Direct Answers */}
            <section id="geo-direct-answers" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-3 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VIII</span>
                {c.geoDirect.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.geoDirect.intro}</p>
              <div className="space-y-4">
                {d.geoDirectAnswers.map((item, i) => (
                  <div key={i} className="rounded-xl border-2 overflow-hidden" style={{ borderColor: 'rgba(201,162,39,0.18)' }}>
                    <div className="flex items-start gap-3 px-5 py-4" style={{ background: 'rgba(201,162,39,0.04)' }}>
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.12)' }}>
                        <i className="ri-sparkling-line text-sm" style={{ color: '#c9a227' }}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 mb-2 leading-snug">{item.q}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>IX</span>
                Questions Fréquentes — Niveau Expert
              </h2>
              <div className="space-y-3">
                {d.faq.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-gray-900 text-sm leading-snug">{item.q}</span>
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <i className={`ri-arrow-down-s-line text-gray-400 text-lg transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}></i>
                      </div>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed pt-4">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Bibliographie */}
            <section id="bibliographie" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>X</span>
                {c.bibliographie.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.bibliographie.intro}</p>
              <div className="space-y-6">
                {c.bibliographie.sections.map((sec, si) => (
                  <div key={si} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                    <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                      <h3 className="font-bold text-sm text-gray-900">{sec.title}</h3>
                    </div>
                    <ul className="divide-y divide-gray-50">
                      {sec.items.map((item, ii) => (
                        <li key={ii} className="px-5 py-3 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#c9a227' }}></span>
                          <div>
                            <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                            <p className="text-xs text-gray-400 mt-0.5 font-medium">{item.reference}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 italic mt-4">Cette bibliographie est indicative. Pour les textes officiels dans leur version la plus récente, consulter les sites de la COBAC, de la BEAC, de la CEMAC, du GABAC et les Journaux Officiels nationaux.</p>
            </section>

            {/* Avertissement Juridique */}
            <section id="avertissement" className="mb-14 scroll-mt-28">
              <div className="rounded-2xl border-2 border-gray-300 bg-gray-50 overflow-hidden">
                <div className="flex items-center gap-3 px-5 sm:px-6 py-4 bg-gray-100 border-b-2 border-gray-300">
                  <div className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(107,114,128,0.15)' }}>
                    <i className="ri-information-line text-base text-gray-600"></i>
                  </div>
                  <h3 className="font-bold text-gray-800 text-base">{c.avertissement.heading}</h3>
                </div>
                <div className="px-5 sm:px-6 py-5 space-y-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Article mis à jour le {d.meta.modifiedDate}</p>
                  {c.avertissement.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-gray-600 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </section>

            <MiniGuideCTA guide="gouvernance-imf" />

            {/* Final CTA */}
            <div className="my-10 rounded-2xl p-8 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
              <div className="absolute top-0 right-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }}></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                    <i className="ri-shield-check-line text-2xl" style={{ color: '#c9a227' }}></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a227' }}>Diagnostic KHEPRA COBAC™</p>
                    <h3 className="font-playfair text-xl font-bold text-white leading-snug">Évaluez votre conformité COBAC / CEMAC en 30 jours</h3>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
                  Notre mission de diagnostic couvre les 5 dimensions critiques : ratios prudentiels, gouvernance (Instruction 007-03-2022), LBC/FT, reporting BEAC, et différences UEMOA. Rapport confidentiel, plan d'action priorisé, accompagnement jusqu'à la conformité.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                  >
                    Demander le diagnostic COBAC
                    <i className="ri-arrow-right-line"></i>
                  </button>
                  <button
                    onClick={() => navigate('/guide-gouvernance-imf')}
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Télécharger le Guide Gouvernance IMF
                    <i className="ri-download-line"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <SocialSharePremium
                url={ARTICLE_URL}
                title={d.title}
                description={d.excerpt}
                variant="compact"
                className="mb-5"
              />
              <div className="border-t border-gray-100 pt-5">
                <ShareButtons url={ARTICLE_URL} title={d.title} excerpt={d.excerpt} isEn={false} />
              </div>
            </div>

            {/* Related articles */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">Articles connexes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {d.relatedArticles.map((rel, i) => (
                  <a
                    key={i}
                    href={rel.href}
                    onClick={(e) => { e.preventDefault(); navigate(rel.href); }}
                    className="flex gap-3 group cursor-pointer bg-white rounded-xl border border-gray-100 p-3 hover:border-yellow-200 hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={`https://readdy.ai/api/search-image?query=professional%20african%20banking%20governance%20finance%20compliance%20meeting%20boardroom%20strategy&width=64&height=48&seq=${rel.seq}&orientation=landscape`}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        width={64}
                        height={48}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold mb-1 block" style={{ color: '#c9a227' }}>{rel.category}</span>
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-yellow-700 transition-colors leading-snug">{rel.title}</p>
                      <span className="text-xs text-gray-400 mt-1 block">{rel.readTime}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Table of contents */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Sommaire</p>
                <nav className="space-y-1.5">
                  {d.sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="flex items-start gap-2 text-sm text-gray-600 hover:text-yellow-700 transition-colors cursor-pointer py-1 leading-snug group">
                      <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 group-hover:border-yellow-300 flex-shrink-0 mt-0.5">
                        <i className={`${s.icon} text-xs text-gray-400 group-hover:text-yellow-600`}></i>
                      </div>
                      <span>{s.title}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <MiniGuideCTA guide="gouvernance-imf" variant="sidebar" />

              {/* CTA sidebar */}
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-shield-check-line text-xl" style={{ color: '#c9a227' }}></i>
                </div>
                <h4 className="font-playfair font-bold text-lg mb-2 leading-snug text-white">Diagnostic COBAC / CEMAC</h4>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Audit de conformité complet : ratios, gouvernance, LBC/FT, reporting. Rapport confidentiel sous 30 jours.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-2.5 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                >
                  Demander le diagnostic
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>

              {/* Regulatory sources */}
              <div className="rounded-2xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Références réglementaires</p>
                <div className="space-y-2.5">
                  {[
                    { label: 'Convention COBAC 1990', sub: 'Création et missions', icon: 'ri-file-text-line' },
                    { label: 'Instruction 007-03-2022', sub: 'Gouvernance CEMAC', icon: 'ri-file-text-line' },
                    { label: 'Règlement R-2018/01', sub: 'LBC/FT — CEMAC', icon: 'ri-lock-line' },
                    { label: 'Instructions BEAC', sub: 'Ratios prudentiels', icon: 'ri-bar-chart-line' },
                    { label: 'Bâle III — BCBS', sub: 'Standards prudentiels', icon: 'ri-shield-check-line' },
                  ].map((ref, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-100 bg-gray-50">
                      <i className={`${ref.icon} text-sm flex-shrink-0 mt-0.5`} style={{ color: '#c9a227' }}></i>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs leading-snug">{ref.label}</p>
                        <p className="text-xs text-gray-500">{ref.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="/blog/"
                onClick={(e) => { e.preventDefault(); navigate('/blog'); }}
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer py-2"
              >
                <i className="ri-arrow-left-line"></i>
                Retour au blog
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
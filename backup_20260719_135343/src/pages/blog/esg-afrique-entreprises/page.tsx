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
import { ESG_ARTICLE_DATA, ESG_ARTICLE_CONTENT } from '';
import { buildArticleHreflang } from '@/utils/hreflang';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const ARTICLE_URL = `${SITE_URL}/blog/esg-afrique-entreprises/`;

function buildArticleSchema(d: typeof ESG_ARTICLE_DATA, isEn: boolean) {
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

function buildFaqSchema(d: typeof ESG_ARTICLE_DATA) {
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

export default function EsgAfriquePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const d = ESG_ARTICLE_DATA;
  const c = ESG_ARTICLE_CONTENT;

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
        hreflangLinks={buildArticleHreflang('esg-afrique-entreprises', isEn ? 'en' : 'fr')}
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <i className="ri-leaf-line text-xs"></i>
              ESG / Afrique
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
                Qu'est-ce que le dispositif ESG pour les entreprises africaines et comment l'implémenter ?
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Le dispositif <strong>ESG</strong> (Environnement, Social, Gouvernance) est le cadre standardisé de mesure et de reporting des performances extra-financières des entreprises. Pour les entreprises africaines, il conditionne l'accès aux <strong>financements DFI</strong> (IFC, AFD, BAD, BEI) et des fonds d'impact investing. La mise en œuvre repose sur 4 piliers : (1) évaluation initiale IFC PS1-8, (2) désignation d'un responsable ESG avec budget, (3) mise en place des 12 KPI clés, (4) rapport ESG annuel audité par un tiers indépendant.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Environnement', items: ['Intensité carbone (tCO2/M FCFA)', 'Consommation d\'eau (m3/M FCFA)', '% déchets valorisés'] },
                  { label: 'Social', items: ['Taux accidents (TF)', 'Écart rémunération H/F', '% fournisseurs locaux', '% femmes encadrement'] },
                  { label: 'Gouvernance', items: ['% administrateurs indépendants', 'Délai réponse plaintes', 'Politique anti-corruption', 'Commissaire aux comptes'] },
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

            <MiniGuideCTA guide="esg" />

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

            {/* Cadre normatif */}
            <section id="cadre-normatif" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>II</span>
                {c.cadreNormatif.heading}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-xs min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {c.cadreNormatif.table.headers.map((h, i) => (
                        <th key={i} className="px-3 py-3 text-left font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {c.cadreNormatif.table.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50/50 transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-3 py-2.5 text-gray-700 align-top text-xs leading-snug ${ci === 0 ? 'font-semibold text-gray-900' : ''}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic">{c.cadreNormatif.sourceNote}</p>
            </section>

            {/* 3 piliers */}
            <section id="trois-piliers" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>III</span>
                {c.troisPiliers.heading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {c.troisPiliers.pillars.map((p, i) => (
                  <div key={i} className={`rounded-2xl border-2 ${p.border} ${p.bg} p-5`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 ${p.border} bg-white`}>
                        <i className={`${p.icon} ${p.color} text-xl`}></i>
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${p.color} uppercase tracking-wide`}>{p.letter}</p>
                        <p className="font-playfair font-bold text-gray-900 text-base leading-snug">{p.title}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {p.enjeux.map((e, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs text-gray-700">
                          <i className={`ri-arrow-right-s-line ${p.color} flex-shrink-0 mt-0.5`}></i>
                          <span>{e}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl p-3 bg-white border border-gray-100">
                      <p className="text-xs text-gray-600 leading-relaxed">{p.contexte}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <ArticleNewsletterInline />

            {/* KPI ESG */}
            <section id="kpi-esg" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>IV</span>
                {c.kpiEsg.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.kpiEsg.intro}</p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-xs min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {c.kpiEsg.table.headers.map((h, i) => (
                        <th key={i} className="px-3 py-3 text-left font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {c.kpiEsg.table.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50/50 transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-3 py-2.5 text-gray-700 align-top text-xs leading-snug ${ci === 0 ? 'font-semibold text-gray-900' : ''} ${ci === 0 ? 'w-12' : ''}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 italic">{c.kpiEsg.sourceNote}</p>
            </section>

            <MiniGuideCTA guide="investment-readiness" />

            {/* DFI exigences */}
            <section id="dfi-exigences" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>V</span>
                {c.dfiExigences.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.dfiExigences.intro}</p>
              <div className="space-y-4">
                {c.dfiExigences.institutions.map((inst, i) => (
                  <div key={i} className={`rounded-2xl border-2 ${inst.border} overflow-hidden`}>
                    <div className={`flex items-center gap-3 px-5 sm:px-6 py-4 ${inst.bg} border-b-2 ${inst.border}`}>
                      <div className={`w-8 h-8 flex items-center justify-center rounded-xl border-2 ${inst.border} bg-white flex-shrink-0`}>
                        <i className={`ri-bank-line ${inst.color} text-base`}></i>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-snug">{inst.name}</h3>
                    </div>
                    <div className="px-5 sm:px-6 py-5">
                      <div className="space-y-2 mb-4">
                        {inst.exigences.map((e, j) => (
                          <div key={j} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#c9a227' }}></span>
                            <p className="text-sm text-gray-700 leading-relaxed">{e}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 italic">Source : {inst.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmap */}
            <section id="roadmap-esg" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VI</span>
                {c.roadmap.heading}
              </h2>
              <div className="space-y-4">
                {c.roadmap.phases.map((ph, i) => (
                  <div key={i} className={`rounded-2xl border-2 ${ph.border} overflow-hidden`}>
                    <div className={`flex items-start gap-4 px-5 sm:px-6 py-4 ${ph.bg} border-b-2 ${ph.border}`}>
                      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl border-2 ${ph.border} bg-white`}>
                        <i className={`${ph.icon} ${ph.color} text-lg`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${ph.bg} ${ph.color} border ${ph.border}`}>{ph.phase}</span>
                          <span className="text-xs font-bold text-gray-500">{ph.mois}</span>
                        </div>
                        <p className="font-bold text-gray-900 text-base leading-snug">{ph.title}</p>
                      </div>
                    </div>
                    <div className="px-5 sm:px-6 py-5 space-y-3">
                      {ph.steps.map((step, j) => (
                        <div key={j} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-md text-xs font-bold" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>
                            {j + 1}
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VII</span>
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

            <MiniGuideCTA guide="esg" />

            {/* Final CTA */}
            <div className="my-10 rounded-2xl p-8 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
              <div className="absolute top-0 right-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)' }}></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                    <i className="ri-leaf-line text-2xl" style={{ color: '#c9a227' }}></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a227' }}>Mission ESG KHEPRA EXPERTS</p>
                    <h3 className="font-playfair text-xl font-bold text-white leading-snug">De zéro à DFI-ready en 18 mois — accompagnement complet</h3>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
                  Notre mission ESG KHEPRA EXPERTS vous accompagne sur les 4 phases : diagnostic IFC PS1-8, mise en place du dispositif, reporting GRI, et préparation du dossier DFI. Rapport confidentiel, plan d'action chiffré, accompagnement jusqu'à la certification ESMS.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                  >
                    Demander un diagnostic ESG
                    <i className="ri-arrow-right-line"></i>
                  </button>
                  <button
                    onClick={() => navigate('/guide-esg-afrique')}
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Télécharger le Guide ESG Afrique
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
                        src={`https://readdy.ai/api/search-image?query=professional%20african%20ESG%20sustainability%20green%20finance%20business%20governance%20corporate%20strategy%20boardroom&width=64&height=48&seq=${rel.seq}&orientation=landscape`}
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

              <MiniGuideCTA guide="esg" variant="sidebar" />

              {/* CTA sidebar */}
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-leaf-line text-xl" style={{ color: '#c9a227' }}></i>
                </div>
                <h4 className="font-playfair font-bold text-lg mb-2 leading-snug text-white">Diagnostic ESG KHEPRA</h4>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Gap analysis IFC PS1-8, score ESG, roadmap de mise en conformité DFI. Rapport sous 21 jours.
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
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Standards ESG référents</p>
                <div className="space-y-2.5">
                  {[
                    { label: 'IFC Performance Standards 1-8', sub: '8 normes de performance', icon: 'ri-file-text-line' },
                    { label: 'GRI Standards 2023', sub: 'Divulgation ESG globale', icon: 'ri-file-chart-line' },
                    { label: 'TCFD / IFRS S2', sub: 'Risques climatiques', icon: 'ri-temp-cold-line' },
                    { label: 'IFRS S1 (ISSB)', sub: 'Standard mondial unifié', icon: 'ri-global-line' },
                    { label: 'UN SDG Framework', sub: 'Alignement ODD 2030', icon: 'ri-heart-pulse-line' },
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




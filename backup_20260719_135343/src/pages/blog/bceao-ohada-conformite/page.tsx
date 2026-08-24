import { useState, useEffect, useMemo } from 'react';
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
import { articleFR, articleEN } from '';
import { buildArticleHreflang } from '@/utils/hreflang';
import LazySection from '@/components/base/LazySection';
import BlogObservatoireAgrementsCTA from '@/components/feature/BlogObservatoireAgrementsCTA';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const ARTICLE_URL = `${SITE_URL}/blog/bceao-ohada-conformite/`;
const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=African%20financial%20compliance%20regulatory%20documents%20BCEAO%20OHADA%20legal%20framework%20governance%20professional%20lawyers%20executives%20reviewing%20compliance%20documents%20contracts%20in%20modern%20West%20African%20office%20strategic%20business%20law%20finance%20setting%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=1200&height=440&seq=blog-bceao-ohada-hero-green&orientation=landscape';

function buildFaqSchema(d: typeof articleFR) {
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

function buildArticleSchema(d: typeof articleFR, isEn: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: d.title,
    description: d.metaDescription,
    image: HERO_IMAGE,
    datePublished: '2026-05-11',
    dateModified: '2026-06-20',
    author: { '@type': 'Person', name: d.author, url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
    keywords: d.metaKeywords,
    articleSection: d.category,
    inLanguage: isEn ? 'en' : 'fr',
    url: ARTICLE_URL,
  };
}

export default function BceaoOhadaPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const d = isEn ? articleEN : articleFR;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = useMemo(() => buildFaqSchema(d), [d]);
  const articleSchema = useMemo(() => buildArticleSchema(d, isEn), [d, isEn]);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={d.metaDescription.slice(0, 70) !== d.title ? d.title : d.metaDescription}
        description={d.metaDescription}
        keywords={d.metaKeywords}
        canonicalPath="/blog/bceao-ohada-conformite/"
        hreflangLinks={buildArticleHreflang('bceao-ohada-conformite', isEn ? 'en' : 'fr')}
        ogUrl={ARTICLE_URL}
        ogType="article"
        ogImage={HERO_IMAGE}
        ogImageWidth="1200"
        ogImageHeight="440"
        ogImageAlt={d.heroAlt}
        articlePublishedTime="2026-04-21"
        articleModifiedTime="2026-06-20"
        articleAuthor="SIMDA Essoyomèwè"
        articleSection={d.category}
        articleTags={d.tags}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={[articleSchema, faqSchema]}
        twitterLabel1={isEn ? 'Read time' : 'Temps de lecture'}
        twitterData1={d.readTime}
        twitterLabel2={isEn ? 'Category' : 'Catégorie'}
        twitterData2={d.category}
      />

      <Navigation />

      {/* Hero image */}
      <div className="relative pt-20 h-80 md:h-[440px] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt={d.heroAlt}
          className="w-full h-full object-cover object-top"
          width={1200}
          height={440}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        <div className="absolute top-6 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
          <Breadcrumb
            variant="light"
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: 'Blog', href: '/blog/' },
              { label: isEn ? 'BCEAO/OHADA Compliance' : 'Conformité BCEAO/OHADA' },
            ]}
          />
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: 'rgba(201,162,39,0.15)', color: '#c9a227', border: '1px solid rgba(201,162,39,0.3)' }}>
            {d.category}
          </span>
          <h1 className="font-playfair text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            {d.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Article */}
          <main className="flex-1 min-w-0" id="main-content">

            {/* Meta author */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: '#c9a227' }}>
                  <img
                    src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                    alt="SIMDA Essoyomèwè"
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{d.author}</p>
                  <p className="text-xs text-gray-500">{d.authorTitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 ml-auto">
                <span className="flex items-center gap-1.5"><i className="ri-calendar-line" style={{ color: '#c9a227' }}></i>{d.publishedDate}</span>
                <span className="flex items-center gap-1.5"><i className="ri-time-line" style={{ color: '#c9a227' }}></i>{d.readTime}</span>
              </div>
            </div>

            {/* Methodology note */}
            <div className="mb-6 rounded-xl p-4 bg-gray-50 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.12)' }}>
                  <i className="ri-scales-3-line text-sm" style={{ color: '#c9a227' }}></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">{isEn ? 'Methodology' : 'Méthodologie'}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{d.methodologyNote}</p>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 pl-5 italic" style={{ borderColor: '#c9a227' }}>
              {d.excerpt}
            </p>

            {/* GEO — Réponse directe IA */}
            <div className="mb-8 rounded-2xl p-5 border-2" style={{ background: 'rgba(201,162,39,0.04)', borderColor: 'rgba(201,162,39,0.22)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 flex items-center justify-center rounded-lg" style={{ background: 'rgba(201,162,39,0.12)' }}>
                  <i className="ri-sparkling-line text-sm" style={{ color: '#c9a227' }}></i>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>{isEn ? 'Direct Answer' : 'Réponse directe'}</p>
              </div>
              <h2 className="font-playfair text-lg font-bold text-gray-900 mb-2 leading-snug">
                {isEn
                  ? 'What is BCEAO / OHADA compliance for African financial institutions?'
                  : 'Qu\'est-ce que la conformité BCEAO / OHADA pour les institutions financières africaines ?'}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {isEn
                  ? 'BCEAO / OHADA compliance refers to the simultaneous adherence to the prudential requirements of the Central Bank of West African States (solvency ratios, AML/CFT, governance) and the legal obligations of OHADA law (SYSCOHADA, AUSCGIE). For financial institutions in the WAEMU and CEMAC zones, this compliance conditions access to financing, credibility with investors (IFC, BOAD, AfDB), and the sustainability of the operating license.'
                  : 'La conformité BCEAO / OHADA désigne le respect simultané des exigences prudentielles de la Banque Centrale des États de l\'Afrique de l\'Ouest (ratios de solvabilité, LBC/FT, gouvernance) et des obligations légales du droit OHADA (SYSCOHADA, AUSCGIE). Pour les institutions financières en zone UEMOA et CEMAC, cette conformité conditionne l\'accès au financement, la crédibilité auprès des investisseurs (IFC, BOAD, BAD) et la pérennité de l\'agrément.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: isEn ? 'Key BCEAO texts' : 'Textes BCEAO clés', items: isEn ? ['Instruction No. 005-06-2010 (SFD)', 'Instructions CB-UMOA No. 026-029 (Bâle III ratios)', 'WAEMU Directive No. 02/2015 (AML/CFT)', 'CB-UMOA Circulars 01-02-03/2017 (governance)'] : ['Instruction n°005-06-2010 (SFD)', 'Instructions CB-UMOA n°026 à 029-11-2016 (ratios Bâle III)', 'Directive UEMOA n°02/2015 (LBC/FT)', 'Circulaires CB-UMOA 01-02-03/2017 (gouvernance)'] },
                  { label: isEn ? 'Key OHADA texts' : 'Textes OHADA clés', items: isEn ? ['AUSCGIE revised 2014 (corporate law)', 'AUDCIF revised 2017 (SYSCOHADA)', '17 member states including Côte d\'Ivoire, Senegal, Cameroon, Togo', 'Legal security and access to regional financing'] : ['AUSCGIE révisé 2014 (droit des sociétés)', 'AUDCIF révisé 2017 (SYSCOHADA)', '17 États membres dont Côte d\'Ivoire, Sénégal, Cameroun, Togo', 'Sécurité juridique et accès au financement régional'] },
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

            <MiniGuideCTA guide="due-diligence" />
            <BlogObservatoireAgrementsCTA variant="both" context="compliance" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {d.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  <i className="ri-price-tag-3-line text-xs" style={{ color: '#c9a227' }}></i>
                  {tag}
                </span>
              ))}
            </div>

            {/* Inline CTA offer */}
            <div className="my-8 rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#c9a227' }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6" style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}>
                <div className="w-14 h-14 flex items-center justify-center rounded-xl border bg-white flex-shrink-0" style={{ borderColor: '#c9a227' }}>
                  <i className="ri-shield-check-line text-2xl" style={{ color: '#c9a227' }}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a227' }}>
                    {isEn ? 'COMPLIANCE AUDIT' : 'AUDIT DE CONFORMITÉ'}
                  </p>
                  <h4 className="font-bold text-gray-900 text-base mb-1 leading-snug">
                    {isEn ? 'Free BCEAO/OHADA compliance check — 30 minutes' : 'Vérification gratuite de conformité BCEAO/OHADA — 30 minutes'}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isEn
                      ? 'Our experts assess your regulatory exposure and identify priority corrective actions.'
                      : 'Nos experts évaluent votre exposition réglementaire et identifient les actions correctives prioritaires.'}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                >
                  {isEn ? 'Book now' : 'Réserver maintenant'}
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>

            {/* Article sections */}
            {/* ═══ EXECUTIVE SUMMARY (Big Four) ═══ */}
            <section id="executive-summary" className="mb-14 scroll-mt-28">
              <div className="rounded-2xl overflow-hidden mb-8" style={{ background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)', border: '1px solid rgba(201,162,39,0.2)' }}>
                <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 flex items-center justify-center rounded-xl" style={{ background: 'rgba(201,162,39,0.12)' }}>
                      <i className="ri-file-list-3-line text-base" style={{ color: '#c9a227' }}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>Thought Leadership — Senior Partner</p>
                      <p className="font-playfair text-lg font-bold text-white leading-snug">{isEn ? 'Executive Summary — BCEAO/OHADA Compliance' : 'Executive Summary — Conformité BCEAO/OHADA'}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 ml-11 mb-3">{isEn ? 'Senior Partner Analysis — 14 minutes read' : 'Analyse Senior Partner — 14 minutes de lecture'}</p>
                </div>
                <div className="px-6 sm:px-8 py-6 space-y-3">
                  <p className="text-sm text-white/75 leading-relaxed">
                    {isEn
                      ? 'BCEAO and OHADA compliance constitutes the twin regulatory foundation for any financial institution operating in Francophone Africa. The BCEAO governs prudential ratios, AML/CFT obligations, and governance standards across the 8 WAEMU states, while OHADA law unifies the legal and accounting framework across 17 member states. Together, they define the conditions for licensing, financing access, and institutional credibility.'
                      : 'La conformité BCEAO et OHADA constitue le double socle réglementaire de toute institution financière opérant en Afrique francophone. La BCEAO régit les ratios prudentiels, les obligations LBC/FT et les standards de gouvernance dans les 8 États de l\'UEMOA, tandis que le droit OHADA unifie le cadre juridique et comptable dans 17 États membres. Ensemble, ils définissent les conditions d\'agrément, d\'accès au financement et de crédibilité institutionnelle.'}
                  </p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {isEn
                      ? 'This guide covers the operational roadmap: from BCEAO prudential ratios (solvency ≥ 8%, liquidity ≥ 100%) to OHADA SYSCOHADA accounting framework, including AML/CFT obligations under Directive UEMOA n°02/2015. Every reference is sourced from official texts.'
                      : 'Ce guide couvre la feuille de route opérationnelle : des ratios prudentiels BCEAO (solvabilité ≥ 8%, liquidité ≥ 100%) au référentiel SYSCOHADA de l\'OHADA, en passant par les obligations LBC/FT de la Directive UEMOA n°02/2015. Chaque référence est sourcée à partir des textes officiels.'}
                  </p>
                  <div className="space-y-3 pt-2">
                    {[
                      { label: isEn ? 'Key Point #1' : 'Point clé #1', text: isEn ? 'BCEAO Instruction n°005-06-2010 classifies SFD into 3 categories. Misclassification leads to regulatory sanctions.' : 'L\'Instruction BCEAO n°005-06-2010 classe les SFD en 3 catégories. Une classification erronée expose à des sanctions réglementaires.' },
                      { label: isEn ? 'Key Point #2' : 'Point clé #2', text: isEn ? 'Directive UEMOA n°02/2015 mandates a Risk-Based Approach to AML/CFT. Non-compliance carries criminal liability for executives.' : 'La Directive UEMOA n°02/2015 impose une Approche Basée sur les Risques en LBC/FT. Le non-respect engage la responsabilité pénale des dirigeants.' },
                      { label: isEn ? 'Key Point #3' : 'Point clé #3', text: isEn ? 'SYSCOHADA compliance is a de facto prerequisite for DFI financing. Non-SYSCOHADA financials are systematically rejected.' : 'La conformité SYSCOHADA est un prérequis de facto pour les financements DFI. Les états non conformes sont rejetés.' },
                    ].map((kp, i) => (
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
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">{isEn ? 'Required Actions' : 'Actions requises'}</p>
                  <div className="space-y-2">
                    {[
                      isEn ? 'Conduct gap analysis against BCEAO prudential ratios and CB-UMOA Circulars' : 'Réaliser un gap analysis des ratios prudentiels BCEAO et des Circulaires CB-UMOA',
                      isEn ? 'Designate an independent AML/CFT Compliance Officer reporting to CEO and Board' : 'Désigner un Responsable Conformité LBC/FT indépendant, rattaché au DG et au CA',
                      isEn ? 'Audit financial statements for SYSCOHADA compliance' : 'Auditer les états financiers pour la conformité SYSCOHADA',
                      isEn ? 'Implement documented Risk-Based Approach with client classification' : 'Mettre en place une Approche Basée sur les Risques documentée',
                      isEn ? 'Establish annual compliance monitoring calendar' : 'Établir un calendrier annuel de monitoring de conformité',
                    ].map((item, i) => (
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

            {/* Article sections */}
            {d.sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="mb-12">
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 mt-1" style={{ background: idx % 2 === 0 ? 'rgba(201,162,39,0.12)' : 'rgba(16,185,129,0.12)' }}>
                    <i className="ri-bookmark-line text-base" style={{ color: idx % 2 === 0 ? '#c9a227' : '#22a05a' }}></i>
                  </span>
                  {section.heading}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {section.content}
                </div>
                {idx === 2 && <MiniGuideCTA guide="gouvernance-imf" />}
                {idx === 2 && <ArticleNewsletterInline />}
              </section>
            ))}

            {/* ═══ DISTINCTION OBLIGATION vs RECOMMANDATION (Big Four) ═══ */}
            <section id="distinction-obligation" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-3 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>V</span>
                {d.distinctionObligation.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{d.distinctionObligation.intro}</p>
              <div className="space-y-6">
                {d.distinctionObligation.categories.map((cat, ci) => {
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
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.badge}`}>
                            {cat.type === 'obligation' ? (isEn ? 'MANDATORY' : 'OBLIGATOIRE') : cat.type === 'bonne-pratique' ? (isEn ? 'RECOMMENDED' : 'RECOMMAND\u00C9') : (isEn ? 'STANDARD' : 'STANDARD')}
                          </span>
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

            {/* ═══ RÉFÉRENCES OFFICIELLES (Big Four) ═══ */}
            <section id="references" className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(201,162,39,0.12)' }}>
                  <i className="ri-book-3-line text-base" style={{ color: '#c9a227' }}></i>
                </span>
                {isEn ? 'Official References' : 'Références Officielles'}
              </h2>
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{isEn ? 'Institutional and Regulatory Sources' : 'Sources institutionnelles et réglementaires'}</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { title: isEn ? 'Instruction No. 005-06-2010 — SFD Licensing and Supervision' : 'Instruction n°005-06-2010 — Agrément et surveillance des SFD', institution: 'BCEAO', year: '2018', link: 'https://www.bceao.int', icon: 'ri-file-text-line' },
                    { title: isEn ? 'Instructions No. 026 to 029/11/2016 — Prudential Standards' : 'Instructions n°026 à 029/11/2016 — Normes prudentielles', institution: 'CB-UMOA', year: '2016', link: 'https://www.bceao.int', icon: 'ri-bank-line' },
                    { title: isEn ? 'WAEMU Directive No. 02/2015 — AML/CFT' : 'Directive UEMOA n°02/2015 — LBC/FT', institution: 'UEMOA', year: '2015', link: 'https://www.uemoa.int', icon: 'ri-shield-check-line' },
                    { title: isEn ? 'CB-UMOA Circulars No. 01, 02 and 03-2017/CB/C — Bank Governance' : 'Circulaires CB-UMOA n°01, 02 et 03-2017/CB/C — Gouvernance bancaire', institution: 'CB-UMOA', year: '2017', link: 'https://www.bceao.int', icon: 'ri-file-text-line' },
                    { title: isEn ? 'OHADA Uniform Act on Commercial Company Law (AUSCGIE) — Revised 2014' : 'Acte Uniforme OHADA — Droit des Sociétés Commerciales (AUSCGIE) — Révisé 2014', institution: 'OHADA', year: '2014', link: 'https://www.ohada.org', icon: 'ri-scales-3-line' },
                    { title: isEn ? 'OHADA Uniform Act on Accounting Law (AUDCIF) — SYSCOHADA — Revised 2017' : 'Acte Uniforme OHADA — Droit Comptable (AUDCIF) — SYSCOHADA — Révisé 2017', institution: 'OHADA', year: '2017', link: 'https://www.ohada.org', icon: 'ri-calculator-line' },
                    { title: isEn ? 'FATF Recommendations — International AML/CFT Standards' : 'Recommandations GAFI — Standards internationaux LBC/FT', institution: 'GAFI/FATF', year: '2023', link: 'https://www.fatf-gafi.org', icon: 'ri-global-line' },
                  ].map((ref, i) => (
                    <div key={i} className="flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-gray-50/50 transition-colors">
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white flex-shrink-0 mt-0.5">
                        <i className={`${ref.icon} text-sm`} style={{ color: '#c9a227' }}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm leading-snug mb-0.5">{ref.title}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-gray-500">{ref.institution}</span>
                          <span className="text-xs text-gray-400">— {ref.year}</span>
                          <a href={ref.link} target="_blank" rel="noopener noreferrer nofollow" className="text-xs font-medium flex items-center gap-1 hover:underline cursor-pointer" style={{ color: '#c9a227' }}>
                            <i className="ri-external-link-line text-xs"></i>
                            {isEn ? 'Official source' : 'Source officielle'}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══ GEO DIRECT ANSWERS (Big Four) ═══ */}
            <section id="geo-direct-answers" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-3 scroll-mt-28 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VI</span>
                {isEn ? 'Direct Answers — Key Questions from Leaders' : 'Réponses Directes — Questions clés des dirigeants'}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {isEn
                  ? 'The answers below provide concise, sourced responses to the most frequently asked questions by financial institution leaders in the WAEMU zone. Format optimized for generative AI (GEO — Generative Engine Optimization).'
                  : 'Les réponses ci-dessous sont conçues pour répondre de manière concise et sourcée aux questions les plus fréquemment posées par les dirigeants d’institutions financières en zone UEMOA. Format optimisé pour l’IA générative (GEO — Generative Engine Optimization).'}
              </p>
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
            <section id="faq" className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(201,162,39,0.12)' }}>
                  <i className="ri-chat-3-line text-base" style={{ color: '#c9a227' }}></i>
                </span>
                {isEn ? 'Frequently Asked Questions' : 'Questions fréquemment posées'}
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

            {/* ═══ AVERTISSEMENT JURIDIQUE (Big Four) ═══ */}
            <section id="avertissement" className="mb-14 scroll-mt-28">
              <div className="rounded-2xl border-2 border-gray-300 bg-gray-50 overflow-hidden">
                <div className="flex items-center gap-3 px-5 sm:px-6 py-4 bg-gray-100 border-b-2 border-gray-300">
                  <div className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(107,114,128,0.15)' }}>
                    <i className="ri-information-line text-base text-gray-600"></i>
                  </div>
                  <h3 className="font-bold text-gray-800 text-base">{d.avertissement.heading}</h3>
                </div>
                <div className="px-5 sm:px-6 py-5 space-y-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{isEn ? 'Article updated on' : 'Article mis \u00e0 jour le'} {d.modifiedDate}</p>
                  {d.avertissement.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-gray-600 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <div className="my-10 rounded-2xl border-2 p-8" style={{ borderColor: '#c9a227', background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}>
              <div className="text-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl mx-auto mb-4" style={{ background: 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-calendar-check-line text-2xl" style={{ color: '#c9a227' }}></i>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3">
                  {isEn ? 'Ready to Secure Your Compliance?' : 'Prêt à sécuriser votre conformité ?'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                  {isEn
                    ? 'Request a free 30-minute BCEAO/OHADA compliance diagnosis. Our senior experts analyze your situation and propose a prioritized action plan.'
                    : 'Demandez un diagnostic de conformité BCEAO/OHADA gratuit de 30 minutes. Nos experts seniors analysent votre situation et vous proposent un plan d\'action priorisé.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                  >
                    {isEn ? 'Book a free compliance audit' : 'Demander un audit de conformité gratuit'}
                    <i className="ri-arrow-right-line"></i>
                  </button>
                  <button
                    onClick={() => navigate('/services/levee-de-fonds')}
                    className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:border-gold-400 hover:text-gold-700 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {isEn ? 'Explore fundraising services' : 'Explorer la levée de fonds'}
                    <i className="ri-funds-line"></i>
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  {isEn ? 'Free · Confidential · Response within 24h' : 'Gratuit · Confidentiel · Réponse sous 24h'}
                </p>
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
                <ShareButtons
                  url={ARTICLE_URL}
                  title={d.title}
                  excerpt={d.excerpt}
                  isEn={isEn}
                />
              </div>
            </div>

            {/* Related articles */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">
                {isEn ? 'Related Articles' : 'Articles connexes'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    href: '/blog/daf-externalise-pilotage-financier-pme-afrique',
                    title: isEn ? 'Outsourced CFO: The Strategic Lever for African SMEs' : 'Direction Financière Externalisée : le levier stratégique des PME',
                    category: isEn ? 'Finance' : 'Finance',
                    readTime: isEn ? '14 min read' : '14 min de lecture',
                    seq: 'related-bceao-1',
                  },
                  {
                    href: '/blog/controle-interne-tresorerie-pme-afrique-syscohada',
                    title: isEn ? 'Internal Control and Treasury: Best Practices' : 'Contrôle interne et trésorerie : les meilleures pratiques',
                    category: isEn ? 'Governance' : 'Gouvernance',
                    readTime: isEn ? '10 min read' : '10 min de lecture',
                    seq: 'related-bceao-2',
                  },
                ].map((rel, i) => (
                  <a
                    key={i}
                    href={rel.href}
                    onClick={(e) => { e.preventDefault(); navigate(rel.href); }}
                    className="flex gap-3 group cursor-pointer bg-white rounded-xl border border-gray-100 p-3 hover:border-gold-200 hover:shadow-md transition-all"
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={`https://readdy.ai/api/search-image?query=professional%20african%20business%20finance%20compliance%20governance%20modern%20office%20strategic%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=80&height=64&seq=${rel.seq}-green&orientation=landscape`}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        width={80}
                        height={64}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold mb-1 block" style={{ color: '#c9a227' }}>{rel.category}</span>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-gold-700 transition-colors leading-snug">{rel.title}</p>
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
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                  {isEn ? 'Table of Contents' : 'Table des matières'}
                </p>
                <nav className="space-y-1.5">
                  <a href="#executive-summary" className="flex items-start gap-2 text-sm text-gray-600 hover:text-gold-700 transition-colors cursor-pointer py-1 leading-snug">
                    <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }}></i>
                    <span>{isEn ? 'Executive Summary' : 'Executive Summary'}</span>
                  </a>
                  {d.sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex items-start gap-2 text-sm text-gray-600 hover:text-gold-700 transition-colors cursor-pointer py-1 leading-snug"
                    >
                      <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }}></i>
                      <span>{s.heading}</span>
                    </a>
                  ))}
                  <a href="#distinction-obligation" className="flex items-start gap-2 text-sm text-gray-600 hover:text-gold-700 transition-colors cursor-pointer py-1 leading-snug">
                    <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }}></i>
                    <span>{isEn ? 'Obligations vs Recommendations' : 'Obligations vs Recommandations'}</span>
                  </a>
                  <a href="#references" className="flex items-start gap-2 text-sm text-gray-600 hover:text-gold-700 transition-colors cursor-pointer py-1 leading-snug">
                    <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }}></i>
                    <span>{isEn ? 'Official References' : 'Références Officielles'}</span>
                  </a>
                  <a href="#geo-direct-answers" className="flex items-start gap-2 text-sm text-gray-600 hover:text-gold-700 transition-colors cursor-pointer py-1 leading-snug">
                    <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }}></i>
                    <span>{isEn ? 'Direct Answers' : 'Réponses Directes'}</span>
                  </a>
                  <a href="#faq" className="flex items-start gap-2 text-sm text-gray-600 hover:text-gold-700 transition-colors cursor-pointer py-1 leading-snug">
                    <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }}></i>
                    <span>{isEn ? 'FAQ' : 'Questions fréquentes'}</span>
                  </a>
                  <a href="#avertissement" className="flex items-start gap-2 text-sm text-gray-600 hover:text-gold-700 transition-colors cursor-pointer py-1 leading-snug">
                    <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }}></i>
                    <span>{isEn ? 'Legal Disclaimer' : 'Avertissement Juridique'}</span>
                  </a>
                </nav>
              </div>

              {/* Sidebar CTA */}
              <div className="rounded-2xl p-6 text-white" style={{ background: '#0a0a0a' }}>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.15)' }}>
                  <i className="ri-shield-check-line text-xl" style={{ color: '#c9a227' }}></i>
                </div>
                <h4 className="font-playfair font-bold text-lg mb-2 leading-snug">
                  {isEn ? 'Compliance Audit — Free 30 min' : 'Audit Conformité — Gratuit 30 min'}
                </h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {isEn
                    ? 'Identify your BCEAO/OHADA compliance gaps and receive a prioritized action plan.'
                    : 'Identifiez vos écarts de conformité BCEAO/OHADA et recevez un plan d\'action priorisé.'}
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-2.5 rounded-xl font-semibold text-sm hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #d4af37)', color: '#0a0a0a' }}
                >
                  {isEn ? 'Book my audit' : 'Réserver mon audit'}
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>

              {/* Internal links */}
              <div className="rounded-2xl p-5 border border-gray-200 bg-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                  {isEn ? 'Our Services' : 'Nos Services'}
                </p>
                <div className="space-y-2">
                  {[
                    { href: '/services/conseil-stratégique', icon: 'ri-lightbulb-line', label: isEn ? 'Strategic Advisory' : 'Conseil Stratégique' },
                    { href: '/services/levee-de-fonds', icon: 'ri-funds-line', label: isEn ? 'Fundraising' : 'Levée de Fonds' },
                    { href: '/services/audit-social', icon: 'ri-shield-check-line', label: isEn ? 'Social Audit & HR Compliance' : 'Audit Social & Conformité RH' },
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-50 transition-colors cursor-pointer group"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 group-hover:border-gold-300 transition-colors">
                        <i className={`${link.icon} text-sm`} style={{ color: '#c9a227' }}></i>
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gold-700 transition-colors">{link.label}</span>
                      <i className="ri-arrow-right-line text-xs text-gray-300 group-hover:text-gold-500 ml-auto transition-colors"></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Back to blog */}
              <a
                href="/blog/"
                onClick={(e) => { e.preventDefault(); navigate('/blog'); }}
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer py-2"
              >
                <i className="ri-arrow-left-line"></i>
                {isEn ? 'Back to blog' : 'Retour au blog'}
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}




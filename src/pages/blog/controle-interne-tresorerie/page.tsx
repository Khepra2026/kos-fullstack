import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { ShareButtons } from '@/pages/blog/components/ShareButtons';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import { ArticleNewsletterInline } from '@/pages/blog/components/ArticleNewsletterInline';
import { CONTROLE_DATA } from './data.tsx';
import { buildArticleHreflang } from '@/utils/hreflang';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const ARTICLE_URL = `${SITE_URL}/blog/controle-interne-tresorerie-pme-afrique-syscohada/`;

function buildArticleSchema(d: typeof CONTROLE_DATA.fr, isEn: boolean) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: d.title.replace('\n', ' '),
    description: d.seo.description,
    image: 'https://readdy.ai/api/search-image?query=african%20finance%20team%20implementing%20internal%20control%20treasury%20management%20system%20CFO%20reviewing%20cash%20flow%20dashboards%20audit%20procedures%20modern%20professional%20office%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20financial%20governance%20risk%20management%20operational%20excellence%20SMEs%20west%20africa&width=800&height=500&seq=blog23-controle-tresorerie-green&orientation=landscape',
    datePublished: '2025-04-20',
    dateModified: '2025-04-20',
    author: { '@type': 'Person', name: 'SIMDA Essoyomèwè', url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
    keywords: d.seo.keywords,
    articleSection: d.badge,
    inLanguage: isEn ? 'en' : 'fr',
    url: ARTICLE_URL,
  };
}

function buildFaqSchema(d: typeof CONTROLE_DATA.fr) {
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

export default function ControleInterneTresoreriePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const d = isEn ? CONTROLE_DATA.en : CONTROLE_DATA.fr;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const articleSchema = buildArticleSchema(d, isEn);
  const faqSchema = buildFaqSchema(d);

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={d.seo.title}
        description={d.seo.description}
        keywords={d.seo.keywords}
        canonicalPath="/blog/controle-interne-tresorerie-pme-afrique-syscohada/"
        hreflangLinks={buildArticleHreflang('controle-interne-tresorerie-pme-afrique-syscohada', isEn ? 'en' : 'fr')}
        ogUrl={ARTICLE_URL}
        ogType="article"
        ogImage="https://readdy.ai/api/search-image?query=african%20finance%20team%20implementing%20internal%20control%20treasury%20management%20system%20CFO%20reviewing%20cash%20flow%20dashboards%20audit%20procedures%20modern%20professional%20office%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20financial%20governance%20risk%20management%20operational%20excellence%20SMEs%20west%20africa&width=800&height=500&seq=blog23-controle-tresorerie-green&orientation=landscape"
        ogImageWidth="800"
        ogImageHeight="500"
        ogImageAlt="Contrôle interne et gestion de trésorerie – KHEPRA EXPERTS"
        articlePublishedTime="2025-04-20"
        articleModifiedTime="2025-04-20"
        articleAuthor="SIMDA Essoyomèwè"
        articleSection={d.badge}
        articleTags={d.tagsLabel}
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={[articleSchema, faqSchema]}
      />

      <Navigation />

      {/* Hero */}
      <div className="relative pt-20 h-80 md:h-[440px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=african%20finance%20team%20implementing%20internal%20control%20treasury%20management%20system%20CFO%20reviewing%20cash%20flow%20dashboards%20audit%20procedures%20modern%20professional%20office%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20financial%20governance%20risk%20management%20operational%20excellence%20SMEs%20west%20africa&width=1200&height=440&seq=blog23-hero-green&orientation=landscape"
          alt="Contrôle interne et gestion de trésorerie – KHEPRA EXPERTS"
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
              { label: d.breadcrumb.home, href: '/' },
              { label: d.breadcrumb.blog, href: '/blog/' },
              { label: d.breadcrumb.current },
            ]}
          />
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-strategic-100 text-strategic-800">
            {d.badge}
          </span>
          <h1 className="font-playfair text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
            {d.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i < d.title.split('\n').length - 1 && <br className="hidden md:block" />}</span>
            ))}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Article */}
          <main className="flex-1 min-w-0" id="main-content">

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-strategic-300 flex-shrink-0">
                  <img
                    src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                    alt="SIMDA Essoyomèwè — Directeur Associé & Fondateur, KHEPRA EXPERTS"
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">SIMDA Essoyomèwè</p>
                  <p className="text-xs text-gray-500">{d.authorRole}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 ml-auto">
                <span className="flex items-center gap-1.5"><i className="ri-calendar-line text-strategic-500"></i>{d.date}</span>
                <span className="flex items-center gap-1.5"><i className="ri-time-line text-strategic-500"></i>{d.readTime}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-strategic-400 pl-5 italic">
              {d.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {d.tagsLabel.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  <i className="ri-price-tag-3-line text-xs text-strategic-500"></i>
                  {tag}
                </span>
              ))}
            </div>

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
                      <p className="font-playfair text-lg font-bold text-white leading-snug">{isEn ? 'Executive Summary — Internal Control & Treasury' : 'Executive Summary — Contrôle Interne & Trésorerie'}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 ml-11 mb-3">{isEn ? 'Senior Partner Analysis — 10 minutes read' : 'Analyse Senior Partner — 10 minutes de lecture'}</p>
                </div>
                <div className="px-6 sm:px-8 py-6 space-y-3">
                  <p className="text-sm text-white/75 leading-relaxed">
                    {isEn
                      ? 'Internal control and treasury management form the operational backbone of any resilient African SME. In a BCEAO/OHADA regulatory environment where 60% of SME failures are attributable to cash flow issues and internal fraud, these two functions are not overhead — they are survival mechanisms. This guide provides the operational blueprint: risk identification, segregation of duties, cash flow optimization, and SYSCOHADA-aligned financial reporting.'
                      : 'Le contrôle interne et la gestion de trésorerie forment le socle opérationnel de toute PME africaine résiliente. Dans un environnement réglementaire BCEAO/OHADA où 60% des défaillances de PME sont attribuables à des problèmes de trésorerie et à des fraudes internes, ces deux fonctions ne sont pas du luxe — ce sont des mécanismes de survie. Ce guide fournit le plan opérationnel : identification des risques, séparation des tâches, optimisation du BFR et reporting SYSCOHADA.'}
                  </p>
                  <div className="space-y-3 pt-2">
                    {[
                      { label: isEn ? 'Friction #1' : 'Friction #1', text: isEn ? '60% of African SMEs lack formal segregation of duties — the same person approves payments and reconciles accounts. This structural vulnerability is the primary target of BCEAO prudential inspections.' : '60% des PME africaines n\'ont pas de séparation formelle des tâches — la même personne valide les paiements et rapproche les comptes. Cette vulnérabilité structurelle est la cible prioritaire des inspections prudentielles BCEAO.' },
                      { label: isEn ? 'Friction #2' : 'Friction #2', text: isEn ? 'Working capital (WCR) typically represents 45 to 65 days of revenue for African SMEs. Optimizing it by just 10 days releases cash equivalent to 3-5% of annual revenue — directly fundable toward growth.' : 'Le BFR représente typiquement 45 à 65 jours de chiffre d\'affaires pour les PME africaines. L\'optimiser de seulement 10 jours libère une trésorerie équivalente à 3-5% du CA annuel — directement finançable vers la croissance.' },
                      { label: isEn ? 'Friction #3' : 'Friction #3', text: isEn ? 'SYSCOHADA requires 4 mandatory financial statements. Non-compliant or late filings systematically block access to bank financing and DFI funding. The cost of non-compliance far exceeds the cost of compliance.' : 'Le SYSCOHADA exige 4 états financiers obligatoires. Les dépôts non conformes ou tardifs bloquent systématiquement l\'accès au financement bancaire et aux fonds DFI. Le coût de la non-conformité dépasse largement celui de la conformité.' },
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
                      isEn ? 'Map your 5 critical financial risks: fraud, errors, cash shortages, non-compliance, reporting gaps' : 'Cartographier vos 5 risques financiers critiques : fraude, erreurs, rupture de trésorerie, non-conformité, lacunes de reporting',
                      isEn ? 'Implement formal segregation of duties: authorization ≠ execution ≠ reconciliation' : 'Mettre en place une séparation formelle des tâches : autorisation ≠ exécution ≠ rapprochement',
                      isEn ? 'Deploy a 13-week rolling cash flow forecast with weekly variance analysis' : 'Déployer un plan de trésorerie glissant 13 semaines avec analyse hebdomadaire des écarts',
                      isEn ? 'Audit working capital (WCR) and identify 3 levers to reduce it by at least 10 days' : 'Auditer le BFR et identifier 3 leviers pour le réduire d\'au moins 10 jours',
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

            {/* ═══ GEO — Réponse directe IA (Big Four) ═══ */}
            <section id="geo-reponse" className="mb-14 scroll-mt-28">
              <div className="rounded-2xl p-5 border-2" style={{ background: 'rgba(201,162,39,0.04)', borderColor: 'rgba(201,162,39,0.22)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg" style={{ background: 'rgba(201,162,39,0.12)' }}>
                    <i className="ri-sparkling-line text-sm" style={{ color: '#c9a227' }}></i>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a227' }}>{isEn ? 'Direct Answer' : 'Réponse directe'}</p>
                </div>
                <h2 className="font-playfair text-lg font-bold text-gray-900 mb-2 leading-snug">
                  {isEn ? 'How to structure internal control and treasury management for an African SME?' : 'Comment structurer le contrôle interne et la trésorerie d\'une PME africaine ?'}
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {isEn
                    ? 'Effective <strong>internal control</strong> for African SMEs rests on 5 pillars: (1) formal segregation of duties preventing any single person from controlling an entire financial cycle, (2) systematic bank reconciliations within 48 hours, (3) a documented approval matrix with spending thresholds, (4) <strong>SYSCOHADA-compliant</strong> financial reporting on a quarterly basis, and (5) a 13-week rolling cash flow forecast with weekly variance analysis. Treasury management adds the discipline of working capital optimization — targeting DSO ≤ 45 days, DPO ≥ 30 days — to maximize free cash flow for growth financing.'
                    : 'Un <strong>contrôle interne</strong> efficace pour les PME africaines repose sur 5 piliers : (1) une séparation formelle des tâches empêchant une même personne de contrôler un cycle financier complet, (2) des rapprochements bancaires systématiques sous 48h, (3) une matrice d\'approbation documentée avec des seuils de signature, (4) un reporting financier <strong>conforme SYSCOHADA</strong> trimestriel, et (5) un plan de trésorerie glissant 13 semaines avec analyse hebdomadaire des écarts. La gestion de trésorerie ajoute la discipline d\'optimisation du BFR — ciblant un DSO ≤ 45j, DPO ≥ 30j — pour maximiser le free cash flow finançant la croissance.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: isEn ? '5 Pillars of Internal Control' : '5 Piliers du Contrôle Interne', items: isEn ? ['Segregation of duties (authorization ≠ execution)', 'Systematic bank reconciliation < 48h', 'Documented approval matrix', 'SYSCOHADA quarterly reporting', 'Annual internal audit plan'] : ['Séparation des tâches (autorisation ≠ exécution)', 'Rapprochement bancaire systématique < 48h', 'Matrice d\'approbation documentée', 'Reporting SYSCOHADA trimestriel', 'Plan d\'audit interne annuel'] },
                    { label: isEn ? 'Treasury KPIs' : 'KPI Trésorerie', items: isEn ? ['DSO ≤ 45 days', 'DPO ≥ 30 days', 'Cash buffer ≥ 2 months OPEX', 'WCR / Revenue < 15%', '13-week rolling forecast updated weekly'] : ['DSO ≤ 45 jours', 'DPO ≥ 30 jours', 'Réserve de trésorerie ≥ 2 mois OPEX', 'BFR / CA < 15%', 'Prévisionnel glissant 13 semaines'] },
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
            </section>

            {/* Cluster link to DAF article */}
            <div className="my-8 rounded-2xl border-2 border-gold-200 bg-gradient-to-br from-gold-50 to-yellow-50 overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-gold-200 bg-white flex-shrink-0">
                  <i className="ri-funds-line text-gold-600 text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-700 mb-1">{d.clusterBadge}</p>
                  <h4 className="font-bold text-gray-900 text-base mb-1 leading-snug">{d.clusterTitle}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{d.clusterDesc}</p>
                </div>
                <a href="/blog/daf-externalise-pilotage-financier-pme-afrique/" onClick={(e) => { e.preventDefault(); navigate('/blog/daf-externalise-pilotage-financier-pme-afrique/'); }}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all bg-gold-600 text-white hover:bg-gold-700">
                  {d.clusterCta}
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Section 1 — Risks */}
            <section id="enjeux" className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700 flex-shrink-0">
                  <i className="ri-shield-check-line text-base"></i>
                </span>
                {d.section1Title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {d.risks.map((r, i) => (
                  <div key={i} className={`rounded-xl border ${r.border} ${r.bg} p-5`}>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white border ${r.border} mb-3`}>
                      <i className={`${r.icon} ${r.color} text-xl`}></i>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{r.title}</h3>
                    <p className={`text-xl font-bold ${r.color} mb-1`}>{r.value}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>{d.section1p1}</p>
              </div>
            </section>

            {/* Section 2 — Principles */}
            <section id="principes" className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold-100 text-gold-700 flex-shrink-0">
                  <i className="ri-list-check-2 text-base"></i>
                </span>
                {d.section2Title}
              </h2>
              <div className="space-y-4">
                {d.principles.map((p, i) => (
                  <div key={i} className="flex gap-5 bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 flex-shrink-0 font-playfair font-bold text-gray-400 text-lg">
                      {p.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <i className={`${p.icon} text-strategic-600 text-base`}></i>
                        <h3 className="font-bold text-gray-900 text-base">{p.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <ArticleNewsletterInline />

            {/* Section 3 — Treasury */}
            <section id="tresorerie" className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-strategic-100 text-strategic-700 flex-shrink-0">
                  <i className="ri-money-dollar-circle-line text-base"></i>
                </span>
                {d.section3Title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p dangerouslySetInnerHTML={{ __html: d.section3p1 }} />
                <div className="bg-strategic-50 border border-strategic-200 rounded-xl p-6 my-6">
                  <p className="text-sm font-bold text-strategic-800 mb-3 flex items-center gap-2">
                    <i className="ri-lightbulb-line text-strategic-600"></i>
                    {d.section3actionsBadge}
                  </p>
                  <ul className="space-y-2">
                    {d.section3actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-strategic-800">
                        <i className="ri-check-line text-strategic-600 mt-0.5 flex-shrink-0"></i>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>{d.section3p2}</p>
              </div>
            </section>

            {/* Mid CTA */}
            <div className="my-10 rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 flex items-center justify-center bg-gold-500/20 rounded-xl flex-shrink-0">
                    <i className="ri-calendar-check-line text-gold-400 text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-1">{d.diagBadge}</p>
                    <h3 className="font-playfair text-xl font-bold text-white leading-snug">{d.diagTitle}</h3>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xl">
                  {d.diagDesc} <strong className="text-gold-400">{d.diagValue}</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/offre-commerciale/" onClick={(e) => { e.preventDefault(); navigate('/offre-commerciale/'); }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer whitespace-nowrap">
                    {d.ctaFreeDiag}
                    <i className="ri-arrow-right-line"></i>
                  </a>
                  <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap">
                    <i className="ri-whatsapp-line text-green-400"></i>
                    {d.ctaWhatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Section 4 — WCR */}
            <section id="bfr" className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-100 text-brand-700 flex-shrink-0">
                  <i className="ri-arrow-left-right-line text-base"></i>
                </span>
                {d.section4Title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-6">
                <p dangerouslySetInnerHTML={{ __html: d.section4p1 }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {d.bfrLeviers.map((l, i) => (
                  <div key={i} className={`rounded-xl border ${l.border} ${l.bg} p-5`}>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white border ${l.border} mb-3`}>
                      <i className={`${l.icon} ${l.color} text-xl`}></i>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-3">{l.title}</h3>
                    <ul className="space-y-2">
                      {l.actions.map((a, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                          <i className={`ri-arrow-right-s-line ${l.color} mt-0.5 flex-shrink-0`}></i>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 — Tools */}
            <section id="outils" className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-strategic-100 text-strategic-700 flex-shrink-0">
                  <i className="ri-dashboard-line text-base"></i>
                </span>
                {d.section5Title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p dangerouslySetInnerHTML={{ __html: d.section5p1 }} />
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 my-6">
                  <p className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">{d.kpiTitle}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {d.kpis.map((kpi, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-100">
                        <i className={`${kpi.icon} ${kpi.color} text-base flex-shrink-0`}></i>
                        <span className="text-xs text-gray-700 font-medium leading-tight">{kpi.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p>{d.section5p2}</p>
              </div>
            </section>

            {/* ═══ RÉFÉRENCES OFFICIELLES (Big Four) ═══ */}
            <section id="references" className="mb-14 scroll-mt-28">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-14 mb-6 flex items-start gap-3">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5" style={{ background: 'rgba(201,162,39,0.12)', color: '#c9a227' }}>VII</span>
                {isEn ? 'Official References' : 'Références Officielles'}
              </h2>
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{isEn ? 'Institutional and Regulatory Sources' : 'Sources institutionnelles et réglementaires'}</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { title: isEn ? 'OHADA Uniform Act on Accounting Law (AUDCIF) — SYSCOHADA — Revised 2017' : 'Acte Uniforme OHADA — Droit Comptable (AUDCIF) — SYSCOHADA — Révisé 2017', institution: 'OHADA', year: '2017', link: 'https://www.ohada.org', icon: 'ri-calculator-line' },
                    { title: isEn ? 'CB-UMOA Circular No. 03-2017/CB/C — Internal Control' : 'Circulaire CB-UMOA n°03-2017/CB/C — Contrôle Interne', institution: 'CB-UMOA', year: '2017', link: 'https://www.bceao.int', icon: 'ri-shield-check-line' },
                    { title: isEn ? 'COSO Internal Control — Integrated Framework' : 'COSO — Référentiel de Contrôle Interne Intégré', institution: 'COSO', year: '2013', link: 'https://www.coso.org', icon: 'ri-global-line' },
                    { title: isEn ? 'BCEAO Instruction No. 017-12-2010 — SFD Internal Control' : 'Instruction BCEAO n°017-12-2010 — Organisation du contrôle interne des SFD', institution: 'BCEAO', year: '2018', link: 'https://www.bceao.int', icon: 'ri-bank-line' },
                    { title: isEn ? 'WAEMU Regulation No. 15/2002/CM — SYSCOHADA Framework' : 'Règlement UEMOA n°15/2002/CM — Référentiel SYSCOHADA', institution: 'UEMOA', year: '2002', link: 'https://www.uemoa.int', icon: 'ri-file-text-line' },
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

            {/* Section 6 — FAQ */}
            <section id="faq" className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-100 text-brand-700 flex-shrink-0">
                  <i className="ri-chat-3-line text-base"></i>
                </span>
                {d.section6Title}
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

            {/* Final CTA */}
            <div className="my-10 rounded-2xl border-2 border-strategic-200 bg-gradient-to-br from-strategic-50 via-strategic-50 to-white p-8">
              <div className="text-center">
                <div className="w-14 h-14 flex items-center justify-center bg-strategic-100 rounded-2xl mx-auto mb-4">
                  <i className="ri-shield-check-line text-strategic-600 text-2xl"></i>
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3">{d.ctaFinalTitle}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto">{d.ctaFinalDesc}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/offre-commerciale/" onClick={(e) => { e.preventDefault(); navigate('/offre-commerciale/'); }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-strategic-600 to-strategic-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:from-strategic-700 hover:to-strategic-700 transition-all cursor-pointer whitespace-nowrap shadow-lg">
                    {d.ctaBtn1}
                    <i className="ri-arrow-right-line"></i>
                  </a>
                  <a href="/blog/daf-externalise-pilotage-financier-pme-afrique/" onClick={(e) => { e.preventDefault(); navigate('/blog/daf-externalise-pilotage-financier-pme-afrique/'); }}
                    className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:border-strategic-400 hover:text-strategic-700 transition-all cursor-pointer whitespace-nowrap">
                    <i className="ri-article-line"></i>
                    {d.ctaBtn2}
                  </a>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <SocialSharePremium
                url={ARTICLE_URL}
                title={d.shareTitle}
                description={d.shareExcerpt}
                variant="compact"
                className="mb-5"
              />
              <div className="border-t border-gray-100 pt-5">
                <ShareButtons
                  url={ARTICLE_URL}
                  title={d.shareTitle}
                  excerpt={d.shareExcerpt}
                  isEn={isEn}
                />
              </div>
            </div>

            {/* Related articles */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">{d.relatedTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {d.relatedArticles.map((rel, i) => (
                  <a key={i} href={rel.href} onClick={(e) => { e.preventDefault(); navigate(rel.href); }}
                    className="flex gap-3 group cursor-pointer bg-white rounded-xl border border-gray-100 p-3 hover:border-strategic-200 hover:shadow-md transition-all">
                    <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={`https://readdy.ai/api/search-image?query=professional%20african%20business%20finance%20governance%20strategy%20modern%20office%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=80&height=64&seq=related-controle-${i}-green&orientation=landscape`}
                        alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" width={80} height={64} loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-strategic-700 mb-1 block">{rel.category}</span>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-strategic-700 transition-colors leading-snug">{rel.title}</p>
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

              {/* TOC */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{d.tocTitle}</p>
                <nav className="space-y-2">
                  <a href="#executive-summary" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-strategic-700 transition-colors cursor-pointer py-1 group">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 group-hover:border-strategic-300 group-hover:bg-strategic-50 transition-all flex-shrink-0">
                      <i className="ri-file-list-3-line text-xs text-gray-400 group-hover:text-strategic-600"></i>
                    </div>
                    <span className="leading-snug">{isEn ? 'Executive Summary' : 'Executive Summary'}</span>
                  </a>
                  <a href="#geo-reponse" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-strategic-700 transition-colors cursor-pointer py-1 group">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 group-hover:border-strategic-300 group-hover:bg-strategic-50 transition-all flex-shrink-0">
                      <i className="ri-sparkling-line text-xs text-gray-400 group-hover:text-strategic-600"></i>
                    </div>
                    <span className="leading-snug">{isEn ? 'Direct Answer' : 'Réponse directe'}</span>
                  </a>
                  {d.sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`}
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-strategic-700 transition-colors cursor-pointer py-1 group">
                      <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 group-hover:border-strategic-300 group-hover:bg-strategic-50 transition-all flex-shrink-0">
                        <i className={`${s.icon} text-xs text-gray-400 group-hover:text-strategic-600`}></i>
                      </div>
                      <span className="leading-snug">{s.title}</span>
                    </a>
                  ))}
                    <a href="#references" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-strategic-700 transition-colors cursor-pointer py-1 group">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 group-hover:border-strategic-300 group-hover:bg-strategic-50 transition-all flex-shrink-0">
                      <i className="ri-book-3-line text-xs text-gray-400 group-hover:text-strategic-600"></i>
                    </div>
                    <span className="leading-snug">{isEn ? 'Official References' : 'Références Officielles'}</span>
                  </a>
                </nav>
              </div>

              {/* Sidebar CTA */}
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl p-6 text-white">
                <div className="w-10 h-10 flex items-center justify-center bg-gold-500/20 rounded-xl mb-4">
                  <i className="ri-funds-line text-gold-400 text-xl"></i>
                </div>
                <h4 className="font-playfair font-bold text-lg mb-2 leading-snug">{d.sidebarTitle}</h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{d.sidebarDesc}</p>
                <a href="/offre-commerciale/" onClick={(e) => { e.preventDefault(); navigate('/offre-commerciale/'); }}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer flex items-center justify-center gap-2">
                  {isEn ? 'View full offer' : "Voir l'offre complète"}
                  <i className="ri-arrow-right-line"></i>
                </a>
                <a href="https://wa.me/22893984909" target="_blank" rel="noopener noreferrer"
                  className="mt-2 w-full bg-white/10 border border-white/20 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2">
                  <i className="ri-whatsapp-line text-green-400"></i>
                  {d.sidebarWhatsapp}
                </a>
              </div>

              {/* DAF related article */}
              <div className="bg-gold-50 rounded-2xl p-5 border border-gold-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gold-700 mb-3">{d.clusterBadge}</p>
                <a href="/blog/daf-externalise-pilotage-financier-pme-afrique/" onClick={(e) => { e.preventDefault(); navigate('/blog/daf-externalise-pilotage-financier-pme-afrique/'); }}
                  className="group cursor-pointer block">
                  <div className="w-full h-28 rounded-lg overflow-hidden mb-3">
                    <img
                      src="https://readdy.ai/api/search-image?query=senior%20african%20CFO%20financial%20director%20boardroom%20strategic%20reports%20dashboards%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=300&height=112&seq=sidebar-daf-v2-green&orientation=landscape"
                      alt={d.clusterTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={300}
                      height={112}
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-gold-700 transition-colors leading-snug">
                    {d.clusterTitle}
                  </p>
                  <span className="text-xs text-gold-600 mt-1 flex items-center gap-1">
                    {d.clusterCta} <i className="ri-arrow-right-line"></i>
                  </span>
                </a>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{d.sidebarContact}</p>
                <div className="space-y-3">
                  <a href="tel:+22893984909" className="flex items-center gap-3 text-sm text-gray-700 hover:text-strategic-700 transition-colors cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-strategic-50 border border-strategic-200 flex-shrink-0">
                      <i className="ri-phone-line text-strategic-600 text-sm"></i>
                    </div>
                    +228 93 98 49 09
                  </a>
                  <a href="mailto:contact@khepraexperts.com" className="flex items-center gap-3 text-sm text-gray-700 hover:text-strategic-700 transition-colors cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-strategic-50 border border-strategic-200 flex-shrink-0">
                      <i className="ri-mail-line text-strategic-600 text-sm"></i>
                    </div>
                    contact@khepraexperts.com
                  </a>
                </div>
              </div>

              <a href="/blog/" onClick={(e) => { e.preventDefault(); navigate('/blog/'); }}
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer py-2">
                <i className="ri-arrow-left-line"></i>
                {d.allArticles}
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

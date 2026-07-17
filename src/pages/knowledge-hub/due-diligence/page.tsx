import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';

const SECTIONS = [
  {
    icon: 'ri-file-search-line',
    titleFr: 'Qu\'est-ce que la Due Diligence ?',
    titleEn: 'What is Due Diligence?',
    contentFr: 'La due diligence est un processus d\'investigation exhaustive conduit avant une transaction financière, une acquisition, une prise de participation ou un financement de projet. Elle permet à l\'investisseur ou à la banque de vérifier l\'exactitude des informations fournies, d\'identifier les risques cachés et de prendre une décision éclairée. En Afrique subsaharienne, la due diligence intègre les dimensions financières, juridiques, ESG (environnementales, sociales et de gouvernance), réglementaires (BCEAO, COBAC, OHADA) et opérationnelles.',
    contentEn: 'Due diligence is a comprehensive investigation process conducted before a financial transaction, acquisition, equity investment or project financing. It allows the investor or bank to verify the accuracy of provided information, identify hidden risks and make an informed decision. In sub-Saharan Africa, due diligence integrates financial, legal, ESG (environmental, social and governance), regulatory (BCEAO, COBAC, OHADA) and operational dimensions.',
    color: '#86BC25',
  },
  {
    icon: 'ri-git-branch-line',
    titleFr: 'Les 5 types de Due Diligence pratiqués par Khepra',
    titleEn: '5 types of Due Diligence practiced by Khepra',
    contentFr: '**Financière** : Analyse des états financiers, flux de trésorerie, endettement, valorisation d\'entreprise, projections. **Juridique & OHADA** : Revue des statuts, contrats, litiges, propriété intellectuelle, conformité OHADA. **ESG & IFC** : Conformité aux Standards de Performance IFC, risques environnementaux, gouvernance sociale, chaîne de valeur. **Technique & Opérationnelle** : Audit des systèmes critiques, processus de production, ressources humaines, dépendances clés. **Réglementaire BCEAO/COBAC** : Agrément, ratios prudentiels, KYC/AML, reporting réglementaire, conformité circulaires.',
    contentEn: '**Financial**: Analysis of financial statements, cash flows, debt, business valuation, projections. **Legal & OHADA**: Review of articles, contracts, disputes, intellectual property, OHADA compliance. **ESG & IFC**: Compliance with IFC Performance Standards, environmental risks, social governance, value chain. **Technical & Operational**: Audit of critical systems, production processes, human resources, key dependencies. **BCEAO/COBAC Regulatory**: Authorization, prudential ratios, KYC/AML, regulatory reporting, circular compliance.',
    color: '#86BC25',
  },
  {
    icon: 'ri-route-line',
    titleFr: 'Méthodologie Due Diligence Khepra Experts',
    titleEn: 'Khepra Experts Due Diligence Methodology',
    contentFr: 'Notre processus en 4 phases : **Phase 1 — Scoping** (J1–J3) : Définition du périmètre, liste documentaire, interviews dirigeants. **Phase 2 — Data Collection** (J4–J14) : Revue documentaire, analyse financière, visites terrain. **Phase 3 — Analysis & Red Flags** (J15–J20) : Identification des risques, scoring par domaine, recommandations négociation. **Phase 4 — Rapport Final** (J21–J25) : Rapport exécutif bankable, présentation investisseurs, plan d\'action post-closing. Délai moyen : 3 à 6 semaines selon la complexité.',
    contentEn: 'Our 4-phase process: **Phase 1 — Scoping** (D1–D3): Scope definition, document list, management interviews. **Phase 2 — Data Collection** (D4–D14): Document review, financial analysis, field visits. **Phase 3 — Analysis & Red Flags** (D15–D20): Risk identification, domain scoring, negotiation recommendations. **Phase 4 — Final Report** (D21–D25): Bankable executive report, investor presentation, post-closing action plan. Average timeframe: 3 to 6 weeks depending on complexity.',
    color: '#86BC25',
  },
  {
    icon: 'ri-bank-line',
    titleFr: 'Due Diligence dans le contexte BCEAO/COBAC',
    titleEn: 'Due Diligence in the BCEAO/COBAC context',
    contentFr: 'En zone UEMOA et CEMAC, la due diligence des institutions financières (banques, SFD, EMF) exige une maîtrise spécifique du cadre réglementaire : instruction N°008-05-2015 de la BCEAO sur les SFD, règlement COBAC R-2001-07, circulaires sur les ratios prudentiels Bâle II/III, instructions LBC/FT (GIABA/GABAC). Khepra Experts a réalisé plus de 500 due diligence dans ce contexte, incluant des missions pour des fonds d\'investissement régionaux (CAURIS, Oikocredit) et des banques de développement (BAD, SFI).',
    contentEn: 'In the UEMOA and CEMAC zones, due diligence of financial institutions (banks, SFDs, EMFs) requires specific mastery of the regulatory framework: BCEAO instruction N°008-05-2015 on SFDs, COBAC regulation R-2001-07, circulars on Basel II/III prudential ratios, AML/CFT instructions (GIABA/GABAC). Khepra Experts has conducted more than 500 due diligence in this context, including missions for regional investment funds (CAURIS, Oikocredit) and development banks (ADB, IFC).',
    color: '#86BC25',
  },
];

const FAQS = [
  {
    qFr: 'Combien coûte une due diligence en Afrique ?',
    qEn: 'How much does due diligence cost in Africa?',
    aFr: 'Le coût d\'une due diligence varie de 3 000 € (pré-due diligence d\'une PME) à 80 000 € (due diligence complète d\'un groupe bancaire). Khepra Experts propose des pré-due diligence à partir de 2 500 € pour les PME en investment readiness.',
    aEn: 'The cost of due diligence ranges from €3,000 (pre-due diligence of an SME) to €80,000 (full due diligence of a banking group). Khepra Experts offers pre-due diligence from €2,500 for SMEs in investment readiness.',
  },
  {
    qFr: 'Quelle est la durée d\'une due diligence ?',
    qEn: 'How long does due diligence take?',
    aFr: 'Une pré-due diligence (screening) prend 3 à 5 jours ouvrables. Une due diligence standard dure 3 à 5 semaines. Une due diligence complète multi-dimensions (financière + juridique + ESG + réglementaire) prend 6 à 10 semaines.',
    aEn: 'A pre-due diligence (screening) takes 3 to 5 business days. A standard due diligence lasts 3 to 5 weeks. A complete multi-dimensional due diligence (financial + legal + ESG + regulatory) takes 6 to 10 weeks.',
  },
  {
    qFr: 'Que contient un rapport de due diligence Khepra ?',
    qEn: 'What does a Khepra due diligence report contain?',
    aFr: 'Nos rapports comprennent : un executive summary avec rating global, une analyse financière détaillée avec modèle, une cartographie des risques par domaine, un registre des red flags et deal-breakers, des recommandations de négociation et ajustement de prix, un plan d\'action post-closing, et une présentation investisseurs (pitch).',
    aEn: 'Our reports include: an executive summary with global rating, a detailed financial analysis with model, a risk map by domain, a register of red flags and deal-breakers, negotiation and price adjustment recommendations, a post-closing action plan, and an investor presentation (pitch).',
  },
  {
    qFr: 'Khepra réalise-t-il des due diligence ESG ?',
    qEn: 'Does Khepra conduct ESG due diligence?',
    aFr: 'Oui, Khepra Experts est spécialisé dans la due diligence ESG selon les Standards de Performance IFC (PS 1 à 8), les GRI Standards et les ISSB IFRS S1/S2. Nous évaluons les risques environnementaux et sociaux, la gouvernance d\'entreprise, la chaîne de valeur et la conformité GIABA/GABAC pour les investisseurs institutionnels et les banques de développement.',
    aEn: 'Yes, Khepra Experts specializes in ESG due diligence according to IFC Performance Standards (PS 1 to 8), GRI Standards and ISSB IFRS S1/S2. We assess environmental and social risks, corporate governance, value chain and GIABA/GABAC compliance for institutional investors and development banks.',
  },
];

export default function DueDiligenceHubPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: isEn ? faq.qEn : faq.qFr,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isEn ? faq.aEn : faq.aFr,
      },
    })),
  };

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEn
      ? 'Due Diligence in Africa — Expert Guide BCEAO, COBAC, ESG by Khepra Experts'
      : 'Due Diligence en Afrique — Guide Expert BCEAO, COBAC, ESG par Khepra Experts',
    author: { '@type': 'Organization', name: 'Khepra Experts' },
    publisher: { '@type': 'Organization', name: 'Khepra Experts', logo: { '@type': 'ImageObject', url: 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png' } },
    datePublished: '2026-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Due Diligence Africa — Expert Guide BCEAO, COBAC, ESG | Khepra Experts'
          : 'Due Diligence Afrique — Guide Expert BCEAO, COBAC, ESG | Khepra Experts'}
        description={isEn
          ? 'Complete guide on Due Diligence in Africa: methodology, types (financial, legal, ESG, regulatory), BCEAO/COBAC context, IFC standards. 500+ due diligence conducted by Khepra Experts. Free pre-due diligence.'
          : 'Guide complet sur la Due Diligence en Afrique : méthodologie, types (financière, juridique, ESG, réglementaire), contexte BCEAO/COBAC, standards IFC. 500+ due diligence réalisées par Khepra Experts. Pré-due diligence gratuite.'}
        keywords={isEn
          ? 'due diligence Africa, financial due diligence BCEAO, ESG due diligence IFC, due diligence COBAC, due diligence UEMOA CEMAC, Khepra due diligence, acquisition due diligence Africa'
          : 'due diligence Afrique, due diligence financière BCEAO, due diligence ESG IFC, due diligence COBAC, due diligence UEMOA CEMAC, Khepra due diligence, due diligence acquisition Afrique'}
        canonicalPath="/knowledge-hub/due-diligence"
        schemaJson={[schemaFaq, schemaArticle]}
      />

      <main className="min-h-screen bg-white" itemScope itemType="https://schema.org/Article">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #050c18 0%, #0a1a30 100%)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(212,168,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,42,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(212,168,42,0.12) 0%, transparent 60%)' }} />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs mb-8" aria-label="Breadcrumb">
              <button onClick={() => navigate('/')} className="cursor-pointer transition-colors hover:opacity-80" style={{ color: 'rgba(255,255,255,0.4)' }}>Khepra Experts</button>
              <i className="ri-arrow-right-s-line" style={{ color: 'rgba(255,255,255,0.25)' }} />
              <button onClick={() => navigate('/knowledge-hub')} className="cursor-pointer transition-colors hover:opacity-80" style={{ color: 'rgba(255,255,255,0.4)' }}>Knowledge Hub</button>
              <i className="ri-arrow-right-s-line" style={{ color: 'rgba(255,255,255,0.25)' }} />
              <span className="font-semibold" style={{ color: '#86BC25' }}>Due Diligence</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}>
              <i className="ri-book-open-line text-xs" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>Knowledge Hub</span>
            </div>

            <h1 className="font-playfair font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }} itemProp="headline">
              {isEn ? (
                <>Due Diligence in Africa<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Expert Guide BCEAO, COBAC &amp; ESG
                  </span>
                </>
              ) : (
                <>Due Diligence en Afrique<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Guide Expert BCEAO, COBAC &amp; ESG
                  </span>
                </>
              )}
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-3xl" style={{ color: 'rgba(255,255,255,0.72)' }}>
              {isEn
                ? 'Complete reference guide for conducting due diligence in the African context: regulatory frameworks BCEAO, COBAC, OHADA, IFC Performance Standards, ESG and GRI. By Khepra Experts — 500+ due diligence conducted in 20+ countries.'
                : 'Guide de référence complet pour conduire une due diligence dans le contexte africain : cadres réglementaires BCEAO, COBAC, OHADA, Standards de Performance IFC, ESG et GRI. Par Khepra Experts — 500+ due diligence réalisées dans 20+ pays.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/services/due-diligence-acquisition')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}
              >
                <i className="ri-search-eye-line" />
                {isEn ? 'Request a Due Diligence' : 'Demander une Due Diligence'}
              </button>
              <button
                onClick={() => navigate('/diagnostic-flash')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ border: '1.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.07)', color: '#fff' }}
              >
                <i className="ri-flashlight-line" />
                {isEn ? 'Free Pre-Due Diligence' : 'Pré-Due Diligence Gratuite'}
              </button>
            </div>

            {/* Stats band */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {[
                { value: '500+', label: isEn ? 'due diligence conducted' : 'due diligence réalisées', icon: 'ri-search-eye-line' },
                { value: '20+', label: isEn ? 'countries UEMOA/CEMAC' : 'pays UEMOA/CEMAC', icon: 'ri-global-line' },
                { value: '22 ans', label: isEn ? 'regulatory expertise' : 'd\'expertise réglementaire', icon: 'ri-time-line' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg mx-auto mb-2" style={{ background: 'rgba(212,168,42,0.12)' }}>
                    <i className={`${s.icon} text-sm`} style={{ color: '#86BC25' }} />
                  </div>
                  <div className="font-playfair text-2xl font-bold mb-1" style={{ color: '#86BC25' }}>{s.value}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">

            {/* Article */}
            <article itemProp="articleBody">
              {SECTIONS.map((sec, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${sec.color}12`, border: `1.5px solid ${sec.color}22` }}>
                        <i className={`${sec.icon} text-lg`} style={{ color: sec.color }} />
                      </div>
                      <h2 className="font-playfair text-2xl font-bold text-gray-900">
                        {isEn ? sec.titleEn : sec.titleFr}
                      </h2>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed pl-[52px]"
                      style={{ lineHeight: 1.8 }}
                      dangerouslySetInnerHTML={{ __html: (isEn ? sec.contentEn : sec.contentFr)
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                        .replace(/\n/g, '<br/>') }}
                    />
                  </div>
                </ScrollReveal>
              ))}

              {/* FAQ */}
              <ScrollReveal>
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(212,168,42,0.10)', border: '1.5px solid rgba(212,168,42,0.22)' }}>
                      <i className="ri-question-answer-line text-lg" style={{ color: '#86BC25' }} />
                    </div>
                    <h2 className="font-playfair text-2xl font-bold text-gray-900">FAQ</h2>
                  </div>
                  <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                    {FAQS.map((faq, i) => (
                      <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(212,168,42,0.04)', border: '1px solid rgba(212,168,42,0.12)' }} itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
                        <p className="font-bold text-gray-900 mb-2" itemProp="name">{isEn ? faq.qEn : faq.qFr}</p>
                        <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                          <p className="text-sm text-gray-600 leading-relaxed" itemProp="text">{isEn ? faq.aEn : faq.aFr}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <ScrollReveal>
                <div className="rounded-2xl p-6 sticky top-28" style={{ background: 'linear-gradient(135deg, #050c18, #0a1a30)', border: '1px solid rgba(212,168,42,0.22)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#86BC25' }}>
                    {isEn ? 'Need a Due Diligence?' : 'Besoin d\'une Due Diligence ?'}
                  </p>
                  <p className="text-sm text-white mb-4 leading-relaxed">
                    {isEn
                      ? 'Khepra Experts delivers bankable due diligence reports in 3 to 6 weeks, calibrated for investors, banks and credit committees.'
                      : 'Khepra Experts livre des rapports de due diligence bankables en 3 à 6 semaines, calibrés pour les investisseurs, banques et comités de crédit.'}
                  </p>
                  <button
                    onClick={() => navigate('/services/due-diligence-acquisition')}
                    className="w-full py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:opacity-90 mb-3"
                    style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}
                  >
                    {isEn ? 'Request Due Diligence' : 'Demander une Due Diligence'}
                  </button>
                  <a href="tel:+22893984909" className="block text-center text-xs font-semibold no-underline transition-colors hover:opacity-80" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <i className="ri-phone-line mr-1" /> +228 93 98 49 09
                  </a>
                </div>
              </ScrollReveal>

              {/* Related hubs */}
              <ScrollReveal delay={100}>
                <div className="rounded-2xl p-5" style={{ border: '1px solid rgba(212,168,42,0.14)', background: '#fffdf7' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6B9B1F' }}>
                    {isEn ? 'Related Knowledge Hubs' : 'Knowledge Hubs associés'}
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'ESG Advisory', href: '/knowledge-hub/esg', icon: 'ri-leaf-line', color: '#86BC25' },
                      { label: 'Investment Readiness', href: '/knowledge-hub/bceao', icon: 'ri-funds-line', color: '#86BC25' },
                      { label: 'Gouvernance BCEAO', href: '/knowledge-hub/bceao', icon: 'ri-bank-line', color: '#86BC25' },
                      { label: 'Conformité COBAC', href: '/knowledge-hub/cobac', icon: 'ri-shield-check-line', color: '#86BC25' },
                    ].map((link, i) => (
                      <button key={i} onClick={() => navigate(link.href)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-amber-50"
                        style={{ border: '1px solid transparent' }}
                      >
                        <div className="w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: `${link.color}12` }}>
                          <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{link.label}</span>
                        <i className="ri-arrow-right-line text-xs ml-auto text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #f8f5ee 0%, #fdf9f0 100%)', borderTop: '1px solid rgba(212,168,42,0.15)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              {isEn ? 'Ready to launch your due diligence?' : 'Prêt à lancer votre due diligence ?'}
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {isEn
                ? 'Our teams are available to discuss your project in 24 hours. Free first consultation.'
                : 'Nos équipes sont disponibles pour discuter de votre projet sous 24h. Première consultation gratuite.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/services/due-diligence-acquisition')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a', boxShadow: '0 6px 24px rgba(212,168,42,0.35)' }}
              >
                <i className="ri-search-eye-line" />
                {isEn ? 'Start Due Diligence' : 'Démarrer la Due Diligence'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
                style={{ border: '1.5px solid rgba(212,168,42,0.35)', color: '#6B9B1F' }}
              >
                <i className="ri-mail-line" />
                {isEn ? 'Contact our experts' : 'Contacter nos experts'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
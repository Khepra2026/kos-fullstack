import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import SocialSharePremium from '@/components/feature/SocialSharePremium';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { buildHreflang } from '@/utils/hreflang';
import ServiceNavigation from '@/pages/services/components/ServiceNavigation';
import ServiceFAQ from '@/pages/services/components/ServiceFAQ';
import PremiumServiceCTA from '@/pages/services/components/PremiumServiceCTA';
import { InlineLeadMagnet } from '@/components/feature/InlineLeadMagnet';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const GOUVERNANCE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/services/transformation-digitale#service`,
      name: 'Gouvernance, Risques & Conformité',
      description: 'Conseil en gouvernance d\'entreprise, gestion des risques et conformité réglementaire BCEAO, COBAC, OHADA pour banques, IMF et PME en Afrique francophone. Contrôle interne, COSO, LCB-FT, conformité prudentielle Bâle II/III.',
      url: `${SITE_URL}/services/transformation-digitale`,
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
      },
      serviceType: 'Governance, Risk & Compliance Advisory',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu\'est-ce que la gouvernance d\'entreprise selon les standards BCEAO/COBAC ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La gouvernance d\'entreprise selon les standards BCEAO (Circulaire 01-2017 pour les banques UEMOA) et COBAC (Règlement COBAC R-2016/01) couvre : la composition et le fonctionnement du Conseil d\'Administration, les comités spécialisés (Audit, Risques, Rémunération), l\'indépendance des administrateurs, la déontologie des dirigeants et le système de contrôle interne. Ces textes sont obligatoires pour toute institution financière agréée.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelles sont les trois lignes de défense en contrôle interne ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le modèle des 3 lignes de défense (Circulaire BCEAO 03-2017) distingue : (1) Les opérationnels qui gèrent les risques au quotidien, (2) Les fonctions de contrôle (compliance, gestion des risques, contrôle permanent) qui supervisent, et (3) L\'audit interne qui évalue l\'efficacité du dispositif. La BCEAO exige l\'application rigoureuse de ce modèle pour toutes les banques et SFD sous sa supervision.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelles sont les exigences BCEAO en matière de LCB-FT pour les SFD ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La Directive 02-2015/CM/UEMOA sur la LCB-FT impose aux SFD : la désignation d\'un responsable de conformité, la mise en place d\'un programme KYC (Know Your Customer), la déclaration de transactions suspectes à la CENTIF, la surveillance des personnes politiquement exposées (PPE) et la formation du personnel. Le non-respect expose à des sanctions administratives et des retraits d\'agrément.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment fonctionne le contrôle interne selon le référentiel COSO ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le référentiel COSO (Committee of Sponsoring Organizations) définit 5 composantes du contrôle interne : (1) Environnement de contrôle, (2) Évaluation des risques, (3) Activités de contrôle, (4) Information et communication, (5) Pilotage. COSO est la référence internationale pour l\'audit interne et est compatible avec les exigences BCEAO, COBAC et OHADA. Notre méthodologie d\'audit est alignée sur COSO 2013.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelles sanctions encourt une institution qui ne respecte pas les exigences de gouvernance BCEAO ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les sanctions BCEAO pour non-conformité aux exigences de gouvernance incluent : avertissement formel, injonction de mise en conformité, restriction d\'activités, nomination d\'un administrateur provisoire, suspension des dirigeants et, en dernier recours, retrait d\'agrément. Les sanctions financières peuvent aller jusqu\'à 10% du capital minimum réglementaire. Une mise en conformité proactive est nettement préférable à une intervention réglementaire.',
          },
        },
      ],
    },
  ],
};

export default function TransformationDigitale() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const OUTCOMES = isEn
    ? [
        { val: '22+', label: 'Years of regulatory expertise', sub: 'BCEAO, COBAC, OHADA, COSO', icon: 'ri-medal-line', accent: '#c9a227' },
        { val: '97%', label: 'Compliance rate achieved', sub: 'for supported institutions', icon: 'ri-shield-check-line', accent: '#22a05a' },
        { val: '50+', label: 'MFIs supervised', sub: 'BCEAO regulatory inspections', icon: 'ri-building-line', accent: '#c9a227' },
        { val: '4–8w', label: 'For a governance audit', sub: 'Full diagnosis to action plan', icon: 'ri-time-line', accent: '#22a05a' },
      ]
    : [
        { val: '22+', label: 'Ans d\'expertise réglementaire', sub: 'BCEAO, COBAC, OHADA, COSO', icon: 'ri-medal-line', accent: '#c9a227' },
        { val: '97%', label: 'Taux de conformité atteint', sub: 'pour les institutions accompagnées', icon: 'ri-shield-check-line', accent: '#22a05a' },
        { val: '50+', label: 'IMF supervisées', sub: 'Inspections réglementaires BCEAO', icon: 'ri-building-line', accent: '#c9a227' },
        { val: '4–8s', label: 'Pour un audit gouvernance', sub: 'Diagnostic complet au plan d\'action', icon: 'ri-time-line', accent: '#22a05a' },
      ];

  const GOVERNANCE_PILLARS = isEn
    ? [
        {
          icon: 'ri-building-4-line',
          title: 'Corporate Governance',
          badge: 'BCEAO Circular 01-2017 / COBAC R-2016/01',
          items: [
            'Board of Directors structuring and optimization',
            'Specialized committees (Audit, Risks, Remuneration)',
            'Director independence and ethics assessment',
            'Conflict of interest and related-party transaction policies',
          ],
        },
        {
          icon: 'ri-radar-line',
          title: 'Risk Management (ERM)',
          badge: 'COSO 2013 / Basel II-III / BCEAO/COBAC',
          items: [
            'Enterprise Risk Management (ERM) framework implementation',
            'Risk cartography (credit, market, operational, liquidity)',
            'Basel II/III prudential ratios monitoring',
            'Stress testing and scenario analysis',
          ],
        },
        {
          icon: 'ri-lock-2-line',
          title: 'AML/CFT & Compliance',
          badge: 'WAEMU Directive 02-2015 / COBAC/ANIF',
          items: [
            'AML/CFT (LCB-FT) compliance program',
            'KYC/CDD procedures and customer due diligence',
            'Suspicious transaction reporting to CENTIF/ANIF',
            'PEP (Politically Exposed Persons) monitoring',
          ],
        },
        {
          icon: 'ri-eye-line',
          title: 'Internal Control (3 Lines)',
          badge: 'BCEAO Circular 03-2017 / COSO',
          items: [
            '3 lines of defense model deployment',
            'Internal procedures and control manual development',
            'Internal audit mission planning and execution',
            'Control monitoring and recommendation tracking',
          ],
        },
      ]
    : [
        {
          icon: 'ri-building-4-line',
          title: 'Gouvernance d\'Entreprise',
          badge: 'Circulaire BCEAO 01-2017 / COBAC R-2016/01',
          items: [
            'Structuration et optimisation du Conseil d\'Administration',
            'Comités spécialisés (Audit, Risques, Rémunération)',
            'Évaluation de l\'indépendance et de la déontologie des administrateurs',
            'Politiques conflits d\'intérêts et transactions avec parties liées',
          ],
        },
        {
          icon: 'ri-radar-line',
          title: 'Gestion des Risques (ERM)',
          badge: 'COSO 2013 / Bâle II-III / BCEAO/COBAC',
          items: [
            'Mise en place du cadre Enterprise Risk Management (ERM)',
            'Cartographie des risques (crédit, marché, opérationnel, liquidité)',
            'Suivi ratios prudentiels Bâle II/III',
            'Stress testing et analyse de scénarios',
          ],
        },
        {
          icon: 'ri-lock-2-line',
          title: 'LCB-FT & Conformité',
          badge: 'Directive UEMOA 02-2015 / COBAC/ANIF',
          items: [
            'Programme de conformité LCB-FT',
            'Procédures KYC/CDD et vigilance clientèle',
            'Déclaration de transactions suspectes CENTIF/ANIF',
            'Surveillance des PPE (Personnes Politiquement Exposées)',
          ],
        },
        {
          icon: 'ri-eye-line',
          title: 'Contrôle Interne (3 Lignes)',
          badge: 'Circulaire BCEAO 03-2017 / COSO',
          items: [
            'Déploiement modèle 3 lignes de défense',
            'Élaboration manuels de procédures et de contrôle',
            'Planification et exécution de missions d\'audit interne',
            'Suivi des recommandations et des plans de contrôle',
          ],
        },
      ];

  const REGULATORY_TEXTS = isEn
    ? [
        { ref: 'Circular 01-2017', body: 'BCEAO', topic: 'Corporate governance of credit institutions (UEMOA)' },
        { ref: 'Circular 02-2017', body: 'BCEAO', topic: 'Conditions for executives of credit institutions' },
        { ref: 'Circular 03-2017', body: 'BCEAO', topic: 'Internal control and 3 lines of defense model' },
        { ref: 'Circular 001-2020', body: 'BCEAO', topic: 'Preventive recovery and resolution plans' },
        { ref: 'Directive 02-2015', body: 'UEMOA', topic: 'AML/CFT for financial institutions' },
        { ref: 'COBAC R-2016/01', body: 'COBAC', topic: 'Corporate governance of credit institutions (CEMAC)' },
        { ref: 'OHADA AUSC', body: 'OHADA', topic: 'Revised Uniform Act on Commercial Companies' },
        { ref: 'Basel II/III Africa', body: 'BCEAO/COBAC', topic: 'Prudential ratios adaptation for Africa' },
      ]
    : [
        { ref: 'Circulaire 01-2017', body: 'BCEAO', topic: 'Gouvernance des établissements de crédit (UEMOA)' },
        { ref: 'Circulaire 02-2017', body: 'BCEAO', topic: 'Conditions d\'exercice des dirigeants d\'établissements de crédit' },
        { ref: 'Circulaire 03-2017', body: 'BCEAO', topic: 'Contrôle interne et modèle 3 lignes de défense' },
        { ref: 'Circulaire 001-2020', body: 'BCEAO', topic: 'Plans préventifs de redressement et de résolution' },
        { ref: 'Directive 02-2015', body: 'UEMOA', topic: 'LCB-FT pour les institutions financières' },
        { ref: 'COBAC R-2016/01', body: 'COBAC', topic: 'Gouvernance des établissements de crédit (CEMAC)' },
        { ref: 'OHADA AUSC', body: 'OHADA', topic: 'Acte Uniforme révisé sur les Sociétés Commerciales' },
        { ref: 'Bâle II/III Afrique', body: 'BCEAO/COBAC', topic: 'Adaptation ratios prudentiels pour l\'Afrique' },
      ];

  const DELIVERABLES = isEn
    ? ['Governance audit report (BCEAO/COBAC/OHADA)', 'Risk cartography (ERM matrix)', 'Internal control manual (3 lines of defense)', 'AML/CFT compliance program', 'KYC/CDD procedures', 'Board of directors strengthening plan', 'Regulatory prudential compliance monitoring dashboard', 'Audit recommendations tracking system']
    : ['Rapport d\'audit gouvernance (BCEAO/COBAC/OHADA)', 'Cartographie des risques (matrice ERM)', 'Manuel de contrôle interne (3 lignes de défense)', 'Programme de conformité LCB-FT', 'Procédures KYC/CDD', 'Plan de renforcement du Conseil d\'Administration', 'Tableau de bord suivi conformité prudentielle réglementaire', 'Système de suivi des recommandations d\'audit'];

  const PROBLEMS = isEn
    ? [
        'Governance non-compliant with BCEAO Circular 01-2017 → regulatory sanction risk',
        'Absent or deficient internal control → COBAC/BCEAO audit failure',
        'Incomplete AML/CFT program → exposure to CENTIF/ANIF sanctions',
        'Risk management without ERM framework → uncontrolled financial losses',
      ]
    : [
        'Gouvernance non conforme à la Circulaire BCEAO 01-2017 → risque de sanction réglementaire',
        'Contrôle interne absent ou déficient → échec à l\'audit COBAC/BCEAO',
        'Programme LCB-FT incomplet → exposition aux sanctions CENTIF/ANIF',
        'Gestion des risques sans cadre ERM → pertes financières non maîtrisées',
      ];

  const ANSWERS = isEn
    ? [
        'Governance audit aligned with BCEAO, COBAC and OHADA standards',
        'COSO 2013 methodology — approved by international regulators and investors',
        '22+ years regulatory field experience (Ministry of Finance, BCEAO inspections)',
        'Turnkey action plan deployable in 30 to 90 days',
      ]
    : [
        'Audit gouvernance aligné sur les standards BCEAO, COBAC et OHADA',
        'Méthodologie COSO 2013 — approuvée par les régulateurs et investisseurs internationaux',
        '22+ ans d\'expérience réglementaire terrain (Ministère Finances, inspections BCEAO)',
        'Plan d\'action clé-en-main déployable en 30 à 90 jours',
      ];

  const RELATED = isEn
    ? [
        { title: 'Due Diligence & Acquisition', slug: 'due-diligence-acquisition', icon: 'ri-search-eye-line', kpi: 'Governance DD before any acquisition' },
        { title: 'Investment Readiness', slug: 'levee-de-fonds', icon: 'ri-funds-line', kpi: 'Governance aligned with investor expectations' },
        { title: 'Strategic & ESG Advisory', slug: 'conseil-strategique', icon: 'ri-leaf-line', kpi: 'ESG governance for DFI access' },
      ]
    : [
        { title: 'Due Diligence & Acquisition', slug: 'due-diligence-acquisition', icon: 'ri-search-eye-line', kpi: 'DD gouvernance avant toute acquisition' },
        { title: 'Investment Readiness', slug: 'levee-de-fonds', icon: 'ri-funds-line', kpi: 'Gouvernance alignée sur les attentes investisseurs' },
        { title: 'Conseil Stratégique & ESG', slug: 'conseil-strategique', icon: 'ri-leaf-line', kpi: 'Gouvernance ESG pour accès aux DFI' },
      ];

  const faqItems = GOUVERNANCE_SCHEMA['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Governance, Risk & Compliance Africa | BCEAO COBAC | KHEPRA'
          : 'Gouvernance, Risques & Conformité | BCEAO COBAC | KHEPRA'}
        description={isEn
          ? 'Governance audit, ERM risk management and regulatory compliance (BCEAO, COBAC, OHADA) for banks, MFIs and SMEs in Francophone Africa. COSO methodology. 22+ years of regulatory field experience. Lomé, Togo.'
          : 'Audit gouvernance, gestion des risques ERM et conformité réglementaire (BCEAO, COBAC, OHADA) pour banques, IMF et PME en Afrique francophone. Méthodologie COSO. 22+ ans d\'expérience réglementaire terrain. Lomé, Togo.'}
        keywords={isEn
          ? 'governance Africa BCEAO COBAC, risk management ERM Africa, AML CFT compliance UEMOA CEMAC, internal control COSO Africa, OHADA corporate governance, prudential compliance Africa, BCEAO circular 01-2017, compliance consulting Africa'
          : 'gouvernance Afrique BCEAO COBAC, gestion risques ERM Afrique, conformité LCB-FT UEMOA CEMAC, contrôle interne COSO Afrique, gouvernance OHADA entreprise, conformité prudentielle Afrique, circulaire BCEAO 01-2017, conseil conformité Afrique'}
        ogImage="https://readdy.ai/api/search-image?query=African%20banking%20compliance%20officer%20reviewing%20regulatory%20documents%20governance%20framework%20risk%20matrices%20and%20BCEAO%20compliance%20reports%20in%20premium%20office%20with%20digital%20risk%20dashboards%20on%20screens%2C%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%20editorial%20photography&width=1440&height=900&seq=gouvernance-risques-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/transformation-digitale"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={GOUVERNANCE_SCHEMA}
        hreflangLinks={buildHreflang('/services/transformation-digitale')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Governance, Risk & Compliance' : 'Gouvernance, Risques & Conformité', path: '/services/transformation-digitale' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20banking%20compliance%20officer%20reviewing%20regulatory%20documents%20governance%20framework%20risk%20matrices%20and%20BCEAO%20compliance%20reports%20in%20premium%20office%20with%20digital%20risk%20dashboards%20on%20screens%2C%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%20editorial%20photography&width=1440&height=900&seq=gouvernance-risques-hero-green&orientation=landscape"
              alt={isEn ? 'Governance Risk Compliance KHEPRA EXPERTS Africa' : 'Gouvernance Risques Conformité KHEPRA EXPERTS Afrique'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,162,39,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-government-line">
                  {isEn ? 'Governance · Risk Management · Compliance' : 'Gouvernance · Gestion des Risques · Conformité'}
                </BigFourSubtitleBar>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'Governance is not an option.' : 'La gouvernance n\'est pas une option.'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'It\'s your regulatory survival.' : "C'est votre survie réglementaire."}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'Governance audit, ERM risk management and regulatory compliance (BCEAO, COBAC, OHADA) — we help your institution build a solid, investor-grade institutional framework that passes regulatory scrutiny.'
                    : 'Audit gouvernance, gestion des risques ERM et conformité réglementaire (BCEAO, COBAC, OHADA) — nous aidons votre institution à construire un cadre institutionnel solide, investor-grade, qui passe les inspections réglementaires.'}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? '22+ years regulatory field expertise · 50+ MFIs supervised · CAMELS & COSO methodologies · BCEAO/COBAC compliant'
                      : '22+ ans expertise réglementaire terrain · 50+ IMF supervisées · Méthodologies CAMELS & COSO · Conforme BCEAO/COBAC'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-gouvernance');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-shield-check-line" />
                    {isEn ? 'Governance audit — Request a quote' : 'Audit gouvernance — Demander un devis'}
                  </button>
                  <button
                    onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <i className="ri-list-check-3" />
                    {isEn ? 'Free compliance scorecard' : 'Scorecard conformité gratuit'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {OUTCOMES.map((s, i) => (
                    <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${s.accent}18` }}>
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg mb-3" style={{ background: `${s.accent}15` }}>
                        <i className={`${s.icon} text-base`} style={{ color: s.accent }} />
                      </div>
                      <div className="font-playfair text-2xl font-bold leading-none mb-1" style={{ color: s.accent }}>{s.val}</div>
                      <div className="text-xs font-semibold text-white mb-0.5">{s.label}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(201,162,39,0.07)', border: '1px solid rgba(201,162,39,0.18)' }}>
                  <i className="ri-government-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Former BCEAO Inspector' : 'Ancien Inspecteur BCEAO'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'CAMELS methodology · Field regulatory experience' : 'Méthodologie CAMELS · Expérience terrain réglementaire'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLÈME / TENSION ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <BigFourSubtitleBar variant="left-accent" accentColor="accent">
                  {isEn ? 'The regulatory reality' : 'La réalité réglementaire'}
                </BigFourSubtitleBar>
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? 'A governance gap costs' : 'Une lacune de gouvernance coûte'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'much more than fixing it.' : 'bien plus que de la corriger.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'BCEAO and COBAC regularly sanction institutions whose governance, risk management or AML/CFT systems are insufficient. Sanctions range from formal injunction to license withdrawal — with reputational and financial consequences that can be fatal.'
                    : 'La BCEAO et le COBAC sanctionnent régulièrement les institutions dont la gouvernance, la gestion des risques ou le dispositif LCB-FT sont insuffisants. Les sanctions vont de l\'injonction formelle au retrait d\'agrément — avec des conséquences réputationnelles et financières qui peuvent être fatales.'}
                </p>
                <div className="space-y-3">
                  {PROBLEMS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                      <i className="ri-close-circle-line text-lg mt-0.5 flex-shrink-0 text-red-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl p-10 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
                <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(201,162,39,0.08) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-lightbulb-line">
                    {isEn ? 'The KHEPRA GRC approach' : "L'approche GRC KHEPRA"}
                  </BigFourSubtitleBar>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-4 leading-tight">
                    {isEn ? 'Former BCEAO inspector, 22 years field regulatory experience.' : 'Ancien inspecteur BCEAO, 22 ans d\'expérience réglementaire terrain.'}
                  </h3>
                  <div className="space-y-3">
                    {ANSWERS.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(34,160,90,0.15)' }}>
                          <i className="ri-check-line text-xs" style={{ color: '#22a05a' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-list-check-3" />
                    {isEn ? 'Free compliance scorecard' : 'Scorecard conformité gratuit'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 PILIERS GRC ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-shield-check-line">
                {isEn ? 'Our 4 GRC pillars' : 'Nos 4 piliers GRC'}
              </BigFourSubtitleBar>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight mb-4">
                {isEn ? 'Governance. Risk. Compliance. Three pillars, one integrated framework.' : 'Gouvernance. Risques. Conformité. Trois piliers, un cadre intégré.'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {GOVERNANCE_PILLARS.map((pillar, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.20)' }}>
                      <i className={`${pillar.icon} text-lg`} style={{ color: '#c9a227' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base line-clamp-2" title={pillar.title}>{pillar.title}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,162,39,0.08)', color: '#b8891a' }}>
                        {pillar.badge}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {pillar.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.12)' }}>
                          <i className="ri-check-line text-[9px]" style={{ color: '#c9a227' }} />
                        </div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEXTES RÉGLEMENTAIRES ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-10">
              <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-book-open-line">
                {isEn ? 'Regulatory frameworks mastered' : 'Cadres réglementaires maîtrisés'}
              </BigFourSubtitleBar>
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                {isEn ? 'We know the texts inside out.' : 'Nous connaissons les textes sur le bout des doigts.'}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">{isEn ? 'Reference' : 'Référence'}</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">{isEn ? 'Authority' : 'Autorité'}</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide">{isEn ? 'Topic' : 'Sujet'}</th>
                  </tr>
                </thead>
                <tbody>
                  {REGULATORY_TEXTS.map((text, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">{text.ref}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'rgba(201,162,39,0.10)', color: '#b8891a' }}>
                          {text.body}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{text.topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/knowledge-hub/bceao"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-amber-50"
                style={{ color: '#b8891a', border: '1px solid rgba(201,162,39,0.25)' }}
              >
                <i className="ri-building-line" />
                {isEn ? 'BCEAO Knowledge Hub' : 'Hub BCEAO'}
              </Link>
              <Link
                to="/knowledge-hub/cobac"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-amber-50"
                style={{ color: '#b8891a', border: '1px solid rgba(201,162,39,0.25)' }}
              >
                <i className="ri-bank-line" />
                {isEn ? 'COBAC Knowledge Hub' : 'Hub COBAC'}
              </Link>
            </div>
          </div>
        </section>

        {/* ── LIVRABLES ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-file-list-3-line">
                  {isEn ? 'Deliverables included' : 'Livrables inclus'}
                </BigFourSubtitleBar>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'Turnkey compliance package' : 'Package conformité clé-en-main'}
                </h2>
                <div className="space-y-3">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#c9a227' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-settings-3-line">
                  {isEn ? 'Mission parameters' : 'Paramètres de mission'}
                </BigFourSubtitleBar>
                <div className="space-y-4">
                  <div className="rounded-2xl p-6 bg-white border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-time-line text-lg" style={{ color: '#c9a227' }} />
                      <p className="text-sm font-bold text-gray-900">{isEn ? 'Duration' : 'Durée'}</p>
                    </div>
                    <p className="text-sm text-gray-500">{isEn ? '4 to 12 weeks depending on scope and organization size' : '4 à 12 semaines selon le périmètre et la taille de l\'organisation'}</p>
                  </div>
                  <div className="rounded-2xl p-6 bg-white border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-compass-3-line text-lg" style={{ color: '#c9a227' }} />
                      <p className="text-sm font-bold text-gray-900">{isEn ? 'Methodology' : 'Méthodologie'}</p>
                    </div>
                    <p className="text-sm text-gray-500">{isEn ? 'CAMELS (banking), COSO 2013 (internal control), BCEAO/COBAC/OHADA standards' : 'CAMELS (bancaire), COSO 2013 (contrôle interne), standards BCEAO/COBAC/OHADA'}</p>
                  </div>
                  <div className="rounded-2xl p-6 bg-white border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-team-line text-lg" style={{ color: '#c9a227' }} />
                      <p className="text-sm font-bold text-gray-900">{isEn ? 'Sectors covered' : 'Secteurs couverts'}</p>
                    </div>
                    <p className="text-sm text-gray-500">{isEn ? 'Banks, MFIs (BCEAO/COBAC), EMF, fintech, NGOs, SMEs (OHADA)' : 'Banques, IMF (BCEAO/COBAC), EMF, fintech, ONG, PME (OHADA)'}</p>
                  </div>
                  <button
                    onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-list-check-3" />
                    {isEn ? 'Free BCEAO/COBAC Compliance Scorecard' : 'Scorecard Conformité BCEAO/COBAC Gratuit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Governance, Risk & Compliance' : 'Gouvernance, Risques & Conformité'} />

        {/* ── GUIDE GOUVERNANCE IMF — Lead Magnet CTA ── */}
        <InlineLeadMagnet context="gouvernance" variant="banner" />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="transformation-digitale" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-links-line">
              {isEn ? 'Related services' : 'Services connexes'}
            </BigFourSubtitleBar>
            <div className="grid md:grid-cols-3 gap-5">
              {RELATED.map((s, i) => (
                <Link
                  key={i}
                  to={`/services/${s.slug}`}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.20)' }}>
                    <i className={`${s.icon} text-lg`} style={{ color: '#c9a227' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-amber-700 transition-colors line-clamp-2" title={s.title}>{s.title}</h3>
                  <p className="text-xs text-gray-400 mb-4">{s.kpi}</p>
                  <span className="text-xs font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: '#c9a227' }}>
                    {isEn ? 'Discover' : 'Découvrir'} <i className="ri-arrow-right-line" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <div id="contact-gouvernance">
          <PremiumServiceCTA
            formId="service-gouvernance-conformite"
            formUrl="https://readdy.ai/api/form/d7rjfd6l0bai2p3hap50"
            badge={isEn ? 'Take action now' : 'Passez à l\'action maintenant'}
            title={isEn ? 'Ready to strengthen your governance?' : 'Prêt à renforcer votre gouvernance ?'}
            subtitle={isEn
              ? 'Discuss your governance and compliance challenges with a senior expert and former BCEAO inspector. Free diagnostic, confidential quote within 48h.'
              : 'Discutez de vos enjeux de gouvernance et de conformité avec un expert senior et ancien inspecteur BCEAO. Diagnostic gratuit, devis confidentiel sous 48h.'}
            primaryBtnText={isEn ? 'Request a governance audit' : 'Demander un audit gouvernance'}
            secondaryBtnText={isEn ? 'Free compliance scorecard' : 'Scorecard conformité gratuit'}
            secondaryBtnAction="diagnostic-flash"
            variant="gradient"
          />
        </div>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/transformation-digitale/`}
            title={isEn ? 'Digital Transformation — KHEPRA EXPERTS' : 'Transformation Digitale — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}




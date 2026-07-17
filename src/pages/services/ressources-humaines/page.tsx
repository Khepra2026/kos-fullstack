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
import { SERVICE_SCHEMAS } from '@/utils/serviceSchema';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function RessourcesHumaines() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '+30%', label: 'Staff retention', sub: 'After HR restructuring', icon: 'ri-user-heart-line', accent: '#c9a227' },
        { value: '–40%', label: 'Conflicts & absenteeism', sub: 'Via HR process audit', icon: 'ri-shield-check-line', accent: '#22a05a' },
        { value: '100%', label: 'OHADA compliant', sub: 'Labor law & CIMA standards', icon: 'ri-check-double-line', accent: '#c9a227' },
        { value: '2–6m', label: 'Average duration', sub: 'Audit to full deployment', icon: 'ri-calendar-check-line', accent: '#22a05a' },
      ]
    : [
        { value: '+30%', label: 'Rétention du personnel', sub: 'Après restructuration RH', icon: 'ri-user-heart-line', accent: '#c9a227' },
        { value: '–40%', label: 'Conflits & absentéisme', sub: 'Via audit des processus RH', icon: 'ri-shield-check-line', accent: '#22a05a' },
        { value: '100%', label: 'Conformité OHADA', sub: 'Droit du travail & normes CIMA', icon: 'ri-check-double-line', accent: '#c9a227' },
        { value: '2–6m', label: 'Durée moyenne', sub: 'Audit au déploiement complet', icon: 'ri-calendar-check-line', accent: '#22a05a' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-file-text-line', title: 'HR Audit', duration: '2–3 weeks', desc: 'Full review of HR policies, employment contracts, payroll compliance, job descriptions, and skills mapping against legal and industry standards.', deliverable: 'HR compliance report + gap analysis', accent: '#c9a227' },
        { num: '02', icon: 'ri-organization-chart', title: 'HR Architecture', duration: '2–3 weeks', desc: 'Design of the organizational HR framework: governance, job classification, compensation bands, and performance management system.', deliverable: 'HR framework + job classification grid', accent: '#22a05a' },
        { num: '03', icon: 'ri-star-line', title: 'Talent & Performance', duration: '3–4 weeks', desc: 'Implementation of performance appraisal systems, talent identification, succession planning and career development pathways.', deliverable: 'Performance system + talent matrix', accent: '#c9a227' },
        { num: '04', icon: 'ri-team-line', title: 'Capacity & Culture', duration: '2–4 weeks', desc: 'Training programs for HR teams and managers, culture reinforcement workshops and embedding of HR best practices.', deliverable: 'Training plan + HR procedures manual', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-file-text-line', title: 'Audit RH', duration: '2–3 semaines', desc: 'Revue complète des politiques RH, contrats de travail, conformité salariale, fiches de poste et cartographie des compétences versus standards légaux et sectoriels.', deliverable: 'Rapport de conformité RH + analyse des écarts', accent: '#c9a227' },
        { num: '02', icon: 'ri-organization-chart', title: 'Architecture RH', duration: '2–3 semaines', desc: "Conception du cadre RH organisationnel : gouvernance, classification des emplois, grilles de rémunération et système d'évaluation des performances.", deliverable: 'Référentiel RH + grille de classification des emplois', accent: '#22a05a' },
        { num: '03', icon: 'ri-star-line', title: 'Talent & Performance', duration: '3–4 semaines', desc: "Mise en place de systèmes d'évaluation, identification des talents, planification de la relève et parcours de développement de carrière.", deliverable: 'Système de performance + matrice des talents', accent: '#c9a227' },
        { num: '04', icon: 'ri-team-line', title: 'Capacités & Culture', duration: '2–4 semaines', desc: "Programmes de formation pour les équipes RH et les managers, ateliers de renforcement culturel et ancrage des bonnes pratiques RH.", deliverable: 'Plan de formation + manuel de procédures RH', accent: '#22a05a' },
      ];

  const SECTORS = isEn
    ? [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & MFIs', kpi: 'Staff compliance, compensation restructuring' },
        { icon: 'ri-building-line', label: 'SMEs & Corporates', kpi: 'HR modernization, retention programs' },
        { icon: 'ri-heart-line', label: 'NGOs & International', kpi: 'HR alignment with donor requirements' },
        { icon: 'ri-bank-line', label: 'Banks & Parastatals', kpi: 'Talent management, succession planning' },
        { icon: 'ri-government-line', label: 'Public Sector', kpi: 'Civil service restructuring, HR reform' },
        { icon: 'ri-leaf-line', label: 'Health & Education', kpi: 'Sector-specific HR frameworks' },
      ]
    : [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & SFD', kpi: 'Conformité staff, restructuration salariale' },
        { icon: 'ri-building-line', label: 'PME & Entreprises', kpi: 'Modernisation RH, programmes de fidélisation' },
        { icon: 'ri-heart-line', label: 'ONG & Organisations internationales', kpi: "Alignement RH aux exigences des bailleurs" },
        { icon: 'ri-bank-line', label: 'Banques & Parapublics', kpi: 'Gestion des talents, planification de la relève' },
        { icon: 'ri-government-line', label: 'Secteur Public', kpi: 'Restructuration de la fonction publique' },
        { icon: 'ri-leaf-line', label: 'Santé & Éducation', kpi: 'Référentiels RH sectoriels spécifiques' },
      ];

  const DELIVERABLES = isEn
    ? [
        'HR compliance audit report',
        'Updated employment contracts & HR policies',
        'Job classification framework & compensation grid',
        'Performance evaluation system',
        'Talent identification & succession matrix',
        'HR procedures manual',
      ]
    : [
        'Rapport d\'audit de conformité RH',
        'Contrats de travail & politiques RH mis à jour',
        'Référentiel emplois & grille de rémunération',
        'Système d\'évaluation des performances',
        'Matrice de talents & planification de la relève',
        'Manuel de procédures RH',
      ];

  const PROBLEMS = isEn
    ? [
        'Non-compliant HR practices exposing the company to legal risk',
        'High staff turnover eroding institutional knowledge',
        'No formal performance evaluation system',
        'Undocumented HR policies causing disputes and inconsistency',
      ]
    : [
        'Pratiques RH non conformes exposant l\'entreprise à des risques juridiques',
        'Turn-over élevé qui érode le capital institutionnel',
        'Aucun système formel d\'évaluation des performances',
        'Politiques RH non documentées source de litiges et d\'incohérences',
      ];

  const ANSWERS = isEn
    ? [
        'Full OHADA labor law compliance audit & remediation',
        'Structured HR framework that retains and motivates talent',
        'Formal performance management system tied to KPIs',
        'HR policy manual legally validated and sector-appropriate',
      ]
    : [
        'Audit de conformité droit du travail OHADA & plan de remédiation',
        'Cadre RH structuré qui fidélise et motive les talents',
        'Système de gestion de la performance adossé aux KPI',
        'Manuel de politiques RH validé juridiquement et adapté au secteur',
      ];

  const RELATED = isEn
    ? [
        { title: 'Capacity Building', slug: 'renforcement-capacites', icon: 'ri-team-line', kpi: 'Training programs aligned with HR strategy' },
        { title: 'Social Audit', slug: 'audit-social', icon: 'ri-shield-check-line', kpi: 'Full HR compliance assessment' },
        { title: 'Organizational Development', slug: 'developpement-organisationnel', icon: 'ri-organization-chart', kpi: 'Structure that retains top talent' },
      ]
    : [
        { title: 'Renforcement des Capacités', slug: 'renforcement-capacites', icon: 'ri-team-line', kpi: 'Formations alignées sur la stratégie RH' },
        { title: 'Audit Social', slug: 'audit-social', icon: 'ri-shield-check-line', kpi: 'Évaluation complète de la conformité RH' },
        { title: 'Développement Organisationnel', slug: 'developpement-organisationnel', icon: 'ri-organization-chart', kpi: 'Structure qui fidélise les meilleurs talents' },
      ];

  const faqItems = SERVICE_SCHEMAS['ressources-humaines']['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={t('ressourcesHumaines.seo.title')}
        description={t('ressourcesHumaines.seo.description')}
        keywords={t('ressourcesHumaines.seo.keywords')}
        ogImage="https://readdy.ai/api/search-image?query=African%20HR%20directors%20conducting%20professional%20talent%20management%20workshop%20in%20premium%20corporate%20boardroom%2C%20diverse%20team%20engaged%20in%20structured%20performance%20evaluation%20discussion%2C%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20sophisticated%20corporate%20atmosphere%20modern%20office%20Lom%C3%A9%20Togo%20West%20Africa%20editorial%20photography&width=1440&height=900&seq=rh-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/ressources-humaines"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SERVICE_SCHEMAS['ressources-humaines']}
        hreflangLinks={buildHreflang('/services/ressources-humaines')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Human Resources' : 'Ressources Humaines', path: '/services/ressources-humaines' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20HR%20directors%20conducting%20professional%20talent%20management%20workshop%20in%20premium%20corporate%20boardroom%2C%20diverse%20team%20engaged%20in%20structured%20performance%20evaluation%20discussion%2C%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20sophisticated%20corporate%20atmosphere%20modern%20office%20Lom%C3%A9%20Togo%20West%20Africa%20editorial%20photography&width=1440&height=900&seq=rh-hero-green&orientation=landscape"
              alt={isEn ? 'Human Resources KHEPRA EXPERTS' : 'Ressources Humaines KHEPRA EXPERTS'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,162,39,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-user-heart-line">
                  {t('ressourcesHumaines.badge')}
                </BigFourSubtitleBar>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'Your people are your' : 'Vos talents sont votre'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'most strategic asset.' : 'actif le plus stratégique.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {t('ressourcesHumaines.heroSubtitle')}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {t('ressourcesHumaines.proof')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/diagnostic-flash')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-flashlight-line" />
                    {isEn ? 'Free Diagnostic Flash' : 'Diagnostic Flash Gratuit'}
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    {t('ressourcesHumaines.cta2')}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {OUTCOMES.map((o, i) => (
                    <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${o.accent}18` }}>
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg mb-3" style={{ background: `${o.accent}15` }}>
                        <i className={`${o.icon} text-base`} style={{ color: o.accent }} />
                      </div>
                      <div className="font-playfair text-2xl font-bold leading-none mb-1" style={{ color: o.accent }}>{o.value}</div>
                      <div className="text-xs font-semibold text-white mb-0.5">{o.label}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{o.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(201,162,39,0.07)', border: '1px solid rgba(201,162,39,0.18)' }}>
                  <i className="ri-time-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Duration: 2 to 6 months' : 'Durée : 2 à 6 mois'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? '100% tailored to your context' : '100% adapté à votre contexte'}</p>
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
                  {isEn ? 'A silent cost center' : 'Un centre de coût silencieux'}
                </BigFourSubtitleBar>
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? 'Unmanaged HR is your' : 'Des RH non structurées sont votre'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'biggest hidden cost.' : 'plus grand coût caché.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'Non-compliant HR practices, talent drain, and unresolved labor disputes silently erode margins and credibility — before any audit or investor due diligence reveals them.'
                    : "Des pratiques RH non conformes, la fuite des talents et les conflits sociaux non résolus érodent silencieusement les marges et la crédibilité — avant que le moindre audit ou due diligence investisseur ne les révèle."}
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
                    {isEn ? 'The KHEPRA approach' : "L'approche KHEPRA"}
                  </BigFourSubtitleBar>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-4 leading-tight">
                    {isEn ? 'HR built to retain, comply and perform.' : 'Des RH conçues pour fidéliser, conformer et performer.'}
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
                    onClick={() => navigate('/diagnostic-flash')}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-flashlight-line" />
                    {isEn ? 'Start my diagnostic' : 'Démarrer mon diagnostic'}
                    <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESSUS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <BigFourSubtitleBar variant="left-accent" accentColor="accent">
                {isEn ? 'Our methodology' : 'Notre méthodologie'}
              </BigFourSubtitleBar>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight">
                  {isEn ? '4 phases toward an efficient HR system' : '4 phases vers un système RH performant'}
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">
                  {isEn ? 'Built on OHADA standards, ILO best practices and African business context.' : 'Construit sur les normes OHADA, les bonnes pratiques OIT et le contexte des entreprises africaines.'}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PHASES.map((phase, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all relative">
                  <div className="absolute top-5 right-5 text-4xl font-black leading-none select-none" style={{ color: 'rgba(0,0,0,0.04)' }}>{phase.num}</div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: `${phase.accent}12`, border: `1px solid ${phase.accent}25` }}>
                    <i className={`${phase.icon} text-lg`} style={{ color: phase.accent }} />
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-3" style={{ background: `${phase.accent}12`, color: phase.accent }}>
                    {phase.duration}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2" title={phase.title}>{phase.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{phase.desc}</p>
                  <div className="flex items-start gap-2 pt-4 border-t border-gray-50">
                    <i className="ri-file-text-line text-sm mt-0.5 flex-shrink-0" style={{ color: phase.accent }} />
                    <span className="text-xs text-gray-600 font-medium">{phase.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTEURS + LIVRABLES ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-building-4-line">
                  {isEn ? 'Sectors covered' : 'Secteurs couverts'}
                </BigFourSubtitleBar>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'We structure HR in every sector' : 'Nous structurons les RH dans tous les secteurs'}
                </h2>
                <div className="space-y-3">
                  {SECTORS.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all bg-gray-50/50">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 flex-shrink-0">
                        <i className={`${s.icon} text-lg text-gray-500`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{s.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.kpi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-file-list-3-line">
                  {isEn ? 'Deliverables included' : 'Livrables inclus'}
                </BigFourSubtitleBar>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'Turnkey HR documentation' : 'Documentation RH clé en main'}
                </h2>
                <div className="space-y-3 mb-8">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#c9a227' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-6 border border-gray-100 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="ri-time-line text-lg" style={{ color: '#c9a227' }} />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Duration: 2 to 6 months' : 'Durée : 2 à 6 mois'}</p>
                      <p className="text-xs text-gray-400">{isEn ? '100% tailored — OHADA compliant' : '100% sur mesure — Conformité OHADA'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/diagnostic-flash')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-flashlight-line" />
                    {isEn ? 'Start my Diagnostic Flash' : 'Démarrer mon Diagnostic Flash'}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {isEn ? 'Free — Results in 30 min' : 'Gratuit — Résultats en 30 min'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Human Resources' : 'Ressources Humaines'} />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="ressources-humaines" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-links-line">
              {t('ressourcesHumaines.relatedTitle')}
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
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-10 md:p-14 rounded-3xl" style={{ background: '#0a0a0a' }}>
              <div className="max-w-xl">
                <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-rocket-line">
                  {isEn ? 'Take action now' : "Passez à l'action maintenant"}
                </BigFourSubtitleBar>
                <h2 className="font-playfair text-3xl font-bold text-white mb-3 leading-tight">{t('ressourcesHumaines.ctaTitle')}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{t('ressourcesHumaines.ctaSubtitle')}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={() => navigate('/diagnostic-flash')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                >
                  <i className="ri-flashlight-line" />
                  {isEn ? 'Diagnostic Flash (Free)' : 'Diagnostic Flash (Gratuit)'}
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {t('ressourcesHumaines.ctaBtn2')}
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Share */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SocialSharePremium
            url={`${SITE_URL}/services/ressources-humaines/`}
            title={isEn ? 'Human Resources — KHEPRA EXPERTS' : 'Ressources Humaines — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

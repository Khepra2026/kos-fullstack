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

export default function AuditSocial() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '–60%', label: 'Legal risk exposure', sub: 'After social audit & remediation', icon: 'ri-shield-check-line', accent: '#c9a227' },
        { value: '97%', label: 'Client satisfaction rate', sub: 'On delivered social audits', icon: 'ri-star-line', accent: '#22a05a' },
        { value: '3–6w', label: 'Average duration', sub: 'From launch to final report', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '100%', label: 'OHADA / UEMOA', sub: 'Full regulatory compliance', icon: 'ri-check-double-line', accent: '#22a05a' },
      ]
    : [
        { value: '–60%', label: "Exposition au risque juridique", sub: 'Après audit social & remédiation', icon: 'ri-shield-check-line', accent: '#c9a227' },
        { value: '97%', label: 'Taux de satisfaction client', sub: 'Sur les audits sociaux livrés', icon: 'ri-star-line', accent: '#22a05a' },
        { value: '3–6s', label: 'Durée moyenne', sub: "Du lancement au rapport final", icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '100%', label: 'OHADA / UEMOA', sub: 'Conformité réglementaire totale', icon: 'ri-check-double-line', accent: '#22a05a' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-file-shield-line', title: 'Regulatory Review', duration: '1 week', desc: 'Systematic review of employment contracts, payroll compliance, social declarations, and alignment with OHADA Labor Code and UEMOA directives.', deliverable: 'Regulatory conformity map + risk matrix', accent: '#c9a227' },
        { num: '02', icon: 'ri-heart-pulse-line', title: 'Social Climate Analysis', duration: '1–2 weeks', desc: 'Confidential employee surveys, individual interviews, and focus groups to assess social climate, management quality, and team engagement levels.', deliverable: 'Social climate report + engagement index', accent: '#22a05a' },
        { num: '03', icon: 'ri-alert-line', title: 'Risk Identification', duration: '1 week', desc: 'Cross-referencing findings to produce a prioritized risk register: financial exposure, reputational risks, and compliance gaps requiring immediate action.', deliverable: 'Risk register + criticality scoring', accent: '#c9a227' },
        { num: '04', icon: 'ri-road-map-line', title: 'Remediation Roadmap', duration: '1 week', desc: 'Actionable remediation plan with prioritized corrective actions, implementation timelines, assigned responsibilities, and progress KPIs.', deliverable: 'Remediation roadmap + monitoring dashboard', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-file-shield-line', title: 'Revue réglementaire', duration: '1 semaine', desc: "Examen systématique des contrats de travail, de la conformité salariale, des déclarations sociales et de l'alignement avec le Code du Travail OHADA et les directives UEMOA.", deliverable: 'Cartographie de conformité réglementaire + matrice des risques', accent: '#c9a227' },
        { num: '02', icon: 'ri-heart-pulse-line', title: 'Analyse du climat social', duration: '1–2 semaines', desc: "Enquêtes confidentielles auprès des salariés, entretiens individuels et focus groupes pour évaluer le climat social, la qualité managériale et l'engagement des équipes.", deliverable: 'Rapport de climat social + indice d\'engagement', accent: '#22a05a' },
        { num: '03', icon: 'ri-alert-line', title: 'Identification des risques', duration: '1 semaine', desc: "Croisement des résultats pour produire un registre de risques priorisé : exposition financière, risques réputationnels et lacunes de conformité nécessitant une action immédiate.", deliverable: 'Registre des risques + scoring de criticité', accent: '#c9a227' },
        { num: '04', icon: 'ri-road-map-line', title: 'Feuille de route corrective', duration: '1 semaine', desc: "Plan de remédiation actionnable avec actions correctives priorisées, calendriers de mise en œuvre, responsabilités attribuées et KPI de suivi.", deliverable: 'Feuille de route corrective + tableau de bord de suivi', accent: '#22a05a' },
      ];

  const SECTORS = isEn
    ? [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & MFIs', kpi: 'BCEAO/BEAC staff compliance review' },
        { icon: 'ri-building-line', label: 'SMEs & Corporates', kpi: 'Pre-funding & pre-audit social risk clearance' },
        { icon: 'ri-heart-line', label: 'NGOs & Associations', kpi: 'Donor-required social audit standards' },
        { icon: 'ri-bank-line', label: 'Banks & Parastatal', kpi: 'Labor law & CIMA compliance verification' },
        { icon: 'ri-government-line', label: 'Public Sector', kpi: 'Civil service social compliance reforms' },
        { icon: 'ri-leaf-line', label: 'Industry & Agribusiness', kpi: 'ILO standards & ESG social due diligence' },
      ]
    : [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & SFD', kpi: 'Revue conformité staff BCEAO/BEAC' },
        { icon: 'ri-building-line', label: 'PME & Entreprises', kpi: 'Validation risques sociaux pré-financement' },
        { icon: 'ri-heart-line', label: 'ONG & Associations', kpi: 'Standards audit social requis par les bailleurs' },
        { icon: 'ri-bank-line', label: 'Banques & Parapublics', kpi: 'Vérification conformité droit travail & CIMA' },
        { icon: 'ri-government-line', label: 'Secteur Public', kpi: 'Réformes de conformité sociale de la fonction publique' },
        { icon: 'ri-leaf-line', label: 'Industrie & Agribusiness', kpi: 'Normes OIT & due diligence sociale ESG' },
      ];

  const DELIVERABLES = isEn
    ? [
        'Full social compliance audit report',
        'Risk register with criticality scoring',
        'Social climate analysis & engagement index',
        'Prioritized remediation action plan',
        'Updated HR policy recommendations',
        'Monitoring dashboard & progress KPIs',
      ]
    : [
        'Rapport complet d\'audit de conformité sociale',
        'Registre des risques avec scoring de criticité',
        'Analyse du climat social & indice d\'engagement',
        "Plan d'actions correctif priorisé",
        'Recommandations de mise à jour des politiques RH',
        'Tableau de bord de suivi & KPI de progression',
      ];

  const PROBLEMS = isEn
    ? [
        'Undocumented social practices masking regulatory violations',
        'Social tensions and conflicts damaging team performance',
        'No visibility on legal exposure before investor due diligence',
        'Missing social declarations threatening penalties and fines',
      ]
    : [
        'Pratiques sociales non documentées masquant des infractions réglementaires',
        'Tensions et conflits sociaux dégradant la performance des équipes',
        "Aucune visibilité sur l'exposition juridique avant le due diligence investisseur",
        'Déclarations sociales manquantes exposant à des sanctions et amendes',
      ];

  const ANSWERS = isEn
    ? [
        'Comprehensive mapping of all social compliance gaps',
        'Independent social climate diagnosis protecting management',
        'Full legal exposure report before any external audit',
        'Actionable remediation plan with assigned deadlines',
      ]
    : [
        'Cartographie exhaustive de toutes les lacunes de conformité sociale',
        'Diagnostic indépendant du climat social protégeant la direction',
        'Rapport complet d\'exposition juridique avant tout audit externe',
        "Plan de remédiation actionnable avec délais assignés",
      ];

  const relatedServices = isEn
    ? [
        { title: 'Human Resources', slug: 'ressources-humaines', icon: 'ri-user-heart-line', kpi: 'Complete HR restructuring post-audit' },
        { title: 'Organizational Diagnosis', slug: 'diagnostic-organisationnel', icon: 'ri-search-line', kpi: 'Structural analysis to complement social audit' },
        { title: 'Strategic Advisory', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: 'Social compliance as strategic asset' },
      ]
    : [
        { title: 'Ressources Humaines', slug: 'ressources-humaines', icon: 'ri-user-heart-line', kpi: 'Restructuration RH complète post-audit' },
        { title: 'Diagnostic Organisationnel', slug: 'diagnostic-organisationnel', icon: 'ri-search-line', kpi: 'Analyse structurelle complémentaire à l\'audit social' },
        { title: 'Conseil Stratégique', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: 'La conformité sociale comme actif stratégique' },
      ];

  const faqItems = SERVICE_SCHEMAS['audit-social']['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={t('auditSocial.seo.title')}
        description={t('auditSocial.seo.description')}
        keywords={t('auditSocial.seo.keywords')}
        ogImage="https://readdy.ai/api/search-image?query=African%20compliance%20expert%20auditors%20reviewing%20legal%20HR%20documentation%20employment%20contracts%20social%20declarations%20in%20sophisticated%20dark%20corporate%20boardroom%20with%20organized%20filing%20systems%20and%20regulatory%20reference%20documents%2C%20premium%20professional%20atmosphere%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20West%20Africa&width=1440&height=900&seq=audit-social-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/audit-social"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SERVICE_SCHEMAS['audit-social']}
        hreflangLinks={buildHreflang('/services/audit-social')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Social Audit' : 'Audit Social', path: '/services/audit-social' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20compliance%20expert%20auditors%20reviewing%20legal%20HR%20documentation%20employment%20contracts%20social%20declarations%20in%20sophisticated%20dark%20corporate%20boardroom%20with%20organized%20filing%20systems%20and%20regulatory%20reference%20documents%2C%20premium%20professional%20atmosphere%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20West%20Africa&width=1440&height=900&seq=audit-social-hero-green&orientation=landscape"
              alt={isEn ? 'Social Audit KHEPRA EXPERTS Africa' : 'Audit Social KHEPRA EXPERTS Afrique'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,162,39,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#c9a227' }}>
                    {t('auditSocial.badge')}
                  </span>
                </div>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'Know your social risks' : 'Connaissez vos risques sociaux'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'before they know you.' : 'avant qu\'ils ne vous trouvent.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {t('auditSocial.subtitle')}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn ? 'OHADA · UEMOA · BEAC compliant — absolute confidentiality guaranteed' : 'Conformité OHADA · UEMOA · BEAC — confidentialité absolue garantie'}
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
                    {t('auditSocial.cta2')}
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
                  <i className="ri-lock-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Duration: 3 to 6 weeks' : 'Durée : 3 à 6 semaines'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'Full confidentiality guaranteed' : 'Confidentialité totale garantie'}</p>
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
                <BigFourSubtitleBar label={isEn ? 'The hidden risk' : 'Le risque invisible'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? 'Social non-compliance is' : 'La non-conformité sociale est'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'your biggest blind spot.' : 'votre plus grand angle mort.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'Most organizations only discover their social compliance gaps when it is too late — during an investor due diligence, a labor inspection, or a social conflict. The cost is always exponentially higher than prevention.'
                    : "La plupart des organisations ne découvrent leurs lacunes de conformité sociale que lorsqu'il est trop tard — lors d'un due diligence investisseur, d'une inspection du travail ou d'un conflit social. Le coût est toujours exponentiellement supérieur à la prévention."}
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
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6" style={{ background: '#c9a227' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#c9a227' }}>
                      {isEn ? 'The KHEPRA approach' : "L'approche KHEPRA"}
                    </span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-4 leading-tight">
                    {isEn ? 'An independent audit that protects your organization.' : 'Un audit indépendant qui protège votre organisation.'}
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
              <BigFourSubtitleBar label={isEn ? 'Our methodology' : 'Notre méthodologie'} variant="left-accent" accentColor="primary" className="mb-4" />
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight">
                  {isEn ? '4 phases to full social compliance' : '4 phases vers la conformité sociale totale'}
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">
                  {isEn ? 'Structured approach based on OHADA Labor Code and ILO standards.' : "Approche structurée basée sur le Code du Travail OHADA et les normes OIT."}
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
                <BigFourSubtitleBar label={isEn ? 'Sectors covered' : 'Secteurs couverts'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'Social compliance in every sector' : 'La conformité sociale dans tous les secteurs'}
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
                <BigFourSubtitleBar label={isEn ? 'Deliverables included' : 'Livrables inclus'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'A complete, actionable audit package' : 'Un package d\'audit complet et actionnable'}
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
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Duration: 3 to 6 weeks' : 'Durée : 3 à 6 semaines'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Absolute confidentiality · OHADA & UEMOA standards' : 'Confidentialité absolue · Normes OHADA & UEMOA'}</p>
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
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Social Audit' : 'Audit Social'} />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="audit-social" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BigFourSubtitleBar label={t('auditSocial.relatedTitle')} variant="left-accent" accentColor="primary" className="mb-10" />
            <div className="grid md:grid-cols-3 gap-5">
              {relatedServices.map((s, i) => (
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
                <BigFourSubtitleBar label={isEn ? 'Act before the risk surfaces' : 'Agissez avant que le risque ne remonte'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-3xl font-bold text-white mb-3 leading-tight">{t('auditSocial.ctaTitle')}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{t('auditSocial.ctaSubtitle')}</p>
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
                  {t('auditSocial.ctaBtn2')}
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
            url={`${SITE_URL}/services/audit-social/`}
            title={isEn ? 'Social Audit & HR Compliance — KHEPRA EXPERTS' : 'Audit Social & Conformité RH — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}





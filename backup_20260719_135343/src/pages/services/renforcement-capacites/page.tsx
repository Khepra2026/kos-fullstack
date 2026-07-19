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

export default function RenforcementCapacites() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '+45%', label: 'Skills application rate', sub: '3 months post-training', icon: 'ri-user-star-line', accent: '#c9a227' },
        { value: '97%', label: 'Participant satisfaction', sub: 'On delivered programs', icon: 'ri-star-line', accent: '#22a05a' },
        { value: '100%', label: 'Tailored programs', sub: 'Built for your context', icon: 'ri-settings-line', accent: '#c9a227' },
        { value: '3 fmt', label: 'Delivery formats', sub: 'In-person · Online · Hybrid', icon: 'ri-computer-line', accent: '#22a05a' },
      ]
    : [
        { value: '+45%', label: "Taux d'application des compétences", sub: '3 mois après la formation', icon: 'ri-user-star-line', accent: '#c9a227' },
        { value: '97%', label: 'Satisfaction des participants', sub: 'Sur les programmes livrés', icon: 'ri-star-line', accent: '#22a05a' },
        { value: '100%', label: 'Programmes sur mesure', sub: 'Conçus pour votre contexte', icon: 'ri-settings-line', accent: '#c9a227' },
        { value: '3 fmt', label: 'Formats de livraison', sub: 'Présentiel · Distanciel · Hybride', icon: 'ri-computer-line', accent: '#22a05a' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-search-line', title: 'Needs Diagnostic', duration: '1 week', desc: 'Assessment of current skills, identification of gaps versus strategic objectives and performance benchmarking.', deliverable: 'Skills diagnostic report + training needs matrix', accent: '#c9a227' },
        { num: '02', icon: 'ri-book-open-line', title: 'Program Design', duration: '1–2 weeks', desc: 'Development of customized training modules, learning objectives, pedagogical materials and assessment tools.', deliverable: 'Training program + pedagogical materials', accent: '#22a05a' },
        { num: '03', icon: 'ri-presentation-line', title: 'Training Delivery', duration: 'Variable', desc: 'Interactive training sessions in your chosen format (in-person, online or hybrid). Practice-oriented methodology with real-world African case studies.', deliverable: 'Training completion certificates', accent: '#c9a227' },
        { num: '04', icon: 'ri-user-settings-line', title: 'Coaching & Transfer', duration: '1–3 months', desc: 'Individual and group coaching, on-the-job application support, progress assessment and knowledge transfer to internal trainers.', deliverable: 'Post-training assessment + coaching report', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-search-line', title: 'Diagnostic des besoins', duration: '1 semaine', desc: "Évaluation des compétences actuelles, identification des écarts vs objectifs stratégiques et benchmark de performance.", deliverable: 'Rapport de diagnostic compétences + matrice des besoins en formation', accent: '#c9a227' },
        { num: '02', icon: 'ri-book-open-line', title: 'Conception du programme', duration: '1–2 semaines', desc: "Développement de modules de formation personnalisés, objectifs pédagogiques, supports d'apprentissage et outils d'évaluation.", deliverable: 'Programme de formation + supports pédagogiques', accent: '#22a05a' },
        { num: '03', icon: 'ri-presentation-line', title: 'Animation des formations', duration: 'Variable', desc: "Sessions de formation interactives dans le format de votre choix (présentiel, distanciel ou hybride). Méthodologie orientée pratique avec études de cas africaines.", deliverable: 'Attestations de formation', accent: '#c9a227' },
        { num: '04', icon: 'ri-user-settings-line', title: 'Coaching & Transfert', duration: '1–3 mois', desc: "Coaching individuel et collectif, accompagnement à l'application terrain, évaluation des acquis et transfert de compétences aux formateurs internes.", deliverable: 'Évaluation post-formation + rapport de coaching', accent: '#22a05a' },
      ];

  const SECTORS = isEn
    ? [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & MFIs', kpi: 'BCEAO/BEAC compliance training · credit analysis' },
        { icon: 'ri-building-line', label: 'SMEs & Corporates', kpi: 'Management skills · financial literacy · strategy' },
        { icon: 'ri-heart-line', label: 'NGOs & Associations', kpi: 'Project management · donor reporting · governance' },
        { icon: 'ri-bank-line', label: 'Banks & Financial Institutions', kpi: 'Risk management · AML/KYC · IFRS' },
        { icon: 'ri-government-line', label: 'Public Sector', kpi: 'Public finance · procurement · institutional reform' },
        { icon: 'ri-leaf-line', label: 'Cooperatives & Agrifinance', kpi: 'Agricultural finance · rural credit management' },
      ]
    : [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & SFD', kpi: 'Formation conformité BCEAO/BEAC · analyse crédit' },
        { icon: 'ri-building-line', label: 'PME & Entreprises', kpi: 'Compétences management · finance · stratégie' },
        { icon: 'ri-heart-line', label: 'ONG & Associations', kpi: 'Gestion de projets · reporting bailleurs · gouvernance' },
        { icon: 'ri-bank-line', label: 'Banques & Institutions Financières', kpi: 'Gestion des risques · LCB-FT · IFRS' },
        { icon: 'ri-government-line', label: 'Secteur Public', kpi: 'Finances publiques · marchés publics · réforme institutionnelle' },
        { icon: 'ri-leaf-line', label: 'Coopératives & Agrifinance', kpi: 'Finance agricole · gestion du crédit rural' },
      ];

  const DELIVERABLES = isEn
    ? [
        'Training needs diagnostic report',
        'Customized training modules',
        'Pedagogical materials & workbooks',
        'Training completion certificates',
        'Post-training assessment report',
        'Internal trainer transfer kit',
      ]
    : [
        'Rapport de diagnostic des besoins en formation',
        'Modules de formation personnalisés',
        'Supports pédagogiques & cahiers de travail',
        'Attestations de formation',
        "Rapport d'évaluation post-formation",
        'Kit de transfert aux formateurs internes',
      ];

  const PROBLEMS = isEn
    ? [
        'Generic training that does not fit the African context or your organization',
        'No follow-up after training — skills not applied on the job',
        'Isolated training budget with no connection to strategic objectives',
        'Staff without formal certifications for regulatory inspections',
      ]
    : [
        "Formation générique non adaptée au contexte africain ou à votre organisation",
        "Aucun suivi post-formation — les compétences ne sont pas appliquées sur le terrain",
        "Budget formation isolé sans lien avec les objectifs stratégiques",
        "Personnel sans certifications formelles pour les inspections réglementaires",
      ];

  const ANSWERS = isEn
    ? [
        '100% tailored programs built from your actual skills gaps',
        'Post-training coaching to guarantee on-the-job application',
        'Training objectives tied directly to your strategic KPIs',
        'Certificates and formal documentation for regulatory compliance',
      ]
    : [
        "Programmes 100% sur mesure construits à partir de vos lacunes réelles",
        "Coaching post-formation pour garantir l'application sur le terrain",
        "Objectifs de formation directement liés à vos KPI stratégiques",
        "Attestations et documentation formelle pour la conformité réglementaire",
      ];

  const RELATED = isEn
    ? [
        { title: 'Organizational Development', slug: 'developpement-organisationnel', icon: 'ri-organization-chart', kpi: 'Structure that activates new skills' },
        { title: 'Human Resources', slug: 'ressources-humaines', icon: 'ri-user-heart-line', kpi: 'HR strategy aligned to capacity building' },
        { title: 'Project Management', slug: 'gestion-de-projets', icon: 'ri-task-line', kpi: 'Teams equipped to deliver' },
      ]
    : [
        { title: 'Développement Organisationnel', slug: 'developpement-organisationnel', icon: 'ri-organization-chart', kpi: 'Structure qui active les nouvelles compétences' },
        { title: 'Ressources Humaines', slug: 'ressources-humaines', icon: 'ri-user-heart-line', kpi: 'Stratégie RH alignée sur le renforcement des capacités' },
        { title: 'Gestion de Projets', slug: 'gestion-de-projets', icon: 'ri-task-line', kpi: 'Équipes formées pour livrer' },
      ];

  const faqItems = SERVICE_SCHEMAS['renforcement-capacites']['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Capacity Building Africa | Professional Training | KHEPRA'
          : 'Renforcement des Capacités Afrique | Formation Pro | KHEPRA'}
        description={isEn
          ? 'Tailored capacity building for financial institutions in Africa. BCEAO/BEAC training, post-coaching included. 97% satisfaction, +45% skills application. Lomé, Togo.'
          : 'Renforcement des capacités sur mesure pour institutions financières en Afrique. Formations BCEAO/BEAC, coaching post-formation inclus. 97% satisfaction. Cabinet Lomé, Togo.'}
        keywords={isEn
          ? 'capacity building Africa, professional training financial institution, BCEAO governance training, microfinance capacity building, coaching Africa'
          : 'renforcement capacités Afrique, formation professionnelle institution financière, formation gouvernance BCEAO, renforcement capacités microfinance, coaching Afrique'}
        ogImage="https://readdy.ai/api/search-image?query=African%20professionals%20engaged%20in%20premium%20corporate%20training%20workshop%20facilitator%20presenting%20to%20attentive%20diverse%20group%20modern%20conference%20room%20Lom%C3%A9%20Togo%20West%20Africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20editorial%20photography%20executive%20development%20program%20interactive%20session&width=1440&height=900&seq=renfo-capacites-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/renforcement-capacites"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SERVICE_SCHEMAS['renforcement-capacites']}
        hreflangLinks={buildHreflang('/services/renforcement-capacites')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Capacity Building' : 'Renforcement des Capacités', path: '/services/renforcement-capacites' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20professionals%20engaged%20in%20premium%20corporate%20training%20workshop%20facilitator%20presenting%20to%20attentive%20diverse%20group%20modern%20conference%20room%20Lom%C3%A9%20Togo%20West%20Africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20editorial%20photography%20executive%20development%20program%20interactive%20session&width=1440&height=900&seq=renfo-capacites-hero-green&orientation=landscape"
              alt={isEn ? 'Capacity Building KHEPRA EXPERTS' : 'Renforcement des Capacités KHEPRA EXPERTS'}
              className="w-full h-full object-cover object-center opacity-18"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.97) 0%, rgba(6,13,26,0.88) 60%, rgba(6,13,26,0.82) 100%)' }} />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,162,39,0.4), transparent)' }} />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-team-line">
                  {isEn ? 'Capacity Building · KHEPRA EXPERTS' : 'Renforcement des Capacités · KHEPRA EXPERTS'}
                </BigFourSubtitleBar>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'Invest in your teams.' : 'Investissez dans vos équipes.'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'They are your best ROI.' : "C'est votre meilleur ROI."}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'We design and deliver training programs built for the African context — practical, targeted, with post-training coaching to guarantee real application on the ground.'
                    : "Nous concevons et déployons des programmes de formation construits pour le contexte africain — pratiques, ciblés, avec un coaching post-formation pour garantir une vraie application sur le terrain."}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn ? '97% satisfaction · In-person / Online / Hybrid · Certificates included · 22 years of expertise' : '97% satisfaction · Présentiel / Distanciel / Hybride · Attestations incluses · 22 ans expertise'}
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
                    {isEn ? 'Request a training program' : 'Demander un programme'}
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
                  <i className="ri-award-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Certificates included' : 'Attestations incluses'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'Formal documentation for regulatory compliance' : 'Documentation formelle pour la conformité réglementaire'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLÈME / SOLUTION ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <BigFourSubtitleBar variant="left-accent" accentColor="accent">
                  {isEn ? 'The training trap' : 'Le piège de la formation'}
                </BigFourSubtitleBar>
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? 'Most training is' : 'La plupart des formations sont'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'forgotten within 30 days.' : 'oubliées en moins de 30 jours.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'Generic training without follow-up, disconnected from real objectives, is simply budget wasted. In Africa, the gap between what is taught and what is applied on the ground is the biggest obstacle to performance.'
                    : "La formation générique sans suivi, déconnectée des objectifs réels, est simplement un budget perdu. En Afrique, l'écart entre ce qui est enseigné et ce qui est appliqué sur le terrain est le principal obstacle à la performance."}
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
                    {isEn ? 'Training that actually sticks.' : 'Une formation qui se traduit en résultats.'}
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
                  {isEn ? '4 phases for lasting skills development' : '4 phases pour un développement durable des compétences'}
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">
                  {isEn ? 'From diagnosis to coaching — no training without follow-through.' : 'Du diagnostic au coaching — pas de formation sans suivi.'}
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
                  {isEn ? 'Training for every African sector' : 'Formation pour chaque secteur africain'}
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
                  {isEn ? 'A complete capacity building package' : 'Un package de renforcement des capacités complet'}
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
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Format: In-person · Online · Hybrid' : 'Format : Présentiel · Distanciel · Hybride'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Certificates included · 100% tailored' : 'Attestations incluses · 100% sur mesure'}</p>
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
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Capacity Building' : 'Renforcement des Capacités'} />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="renforcement-capacites" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-links-line">
              {isEn ? 'Complementary Services' : 'Services Complémentaires'}
            </BigFourSubtitleBar>
            <div className="grid md:grid-cols-3 gap-5">
              {RELATED.map((s, i) => (
                <Link key={i} to={`/services/${s.slug}`} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group cursor-pointer">
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
                  {isEn ? 'Invest in your teams' : 'Investissez dans vos équipes'}
                </BigFourSubtitleBar>
                <h2 className="font-playfair text-3xl font-bold text-white mb-3 leading-tight">
                  {isEn ? 'Customized training programs that deliver real results.' : 'Des programmes de formation sur mesure qui livrent de vrais résultats.'}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {isEn ? '30 min · Free · Confidential · Response within 24h' : '30 min · Gratuit · Confidentiel · Réponse sous 24h'}
                </p>
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
                  {isEn ? 'Request a program' : 'Demander un programme de formation'}
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
            url={`${SITE_URL}/services/renforcement-capacites/`}
            title={isEn ? 'Capacity Building — KHEPRA EXPERTS' : 'Renforcement de Capacités — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}





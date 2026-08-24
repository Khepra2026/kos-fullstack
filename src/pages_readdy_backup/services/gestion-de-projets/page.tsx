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

export default function GestionDeProjets() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '90%', label: 'On-time delivery', sub: 'vs. 36% industry average', icon: 'ri-calendar-check-line', accent: '#22a05a' },
        { value: '–35%', label: 'Cost overruns avoided', sub: 'through structured risk management', icon: 'ri-funds-line', accent: '#c9a227' },
        { value: '100%', label: 'Stakeholder alignment', sub: 'via quarterly steering committees', icon: 'ri-team-line', accent: '#22a05a' },
        { value: '3×', label: 'Faster execution', sub: 'with agile methodology in African context', icon: 'ri-rocket-line', accent: '#c9a227' },
      ]
    : [
        { value: '90%', label: 'des projets livrés dans les délais', sub: 'vs. 36% de moyenne secteur', icon: 'ri-calendar-check-line', accent: '#22a05a' },
        { value: '–35%', label: 'de dépassements évités', sub: 'grâce à la gestion proactive des risques', icon: 'ri-funds-line', accent: '#c9a227' },
        { value: '100%', label: 'd\'alignement parties prenantes', sub: 'via comités de pilotage trimestriels', icon: 'ri-team-line', accent: '#22a05a' },
        { value: '3×', label: 'plus rapide à l\'exécution', sub: 'méthodo agile adaptée au contexte africain', icon: 'ri-rocket-line', accent: '#c9a227' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-file-list-3-line', title: 'Project Framing', duration: '1–2 weeks', desc: 'Scope definition, stakeholder mapping, governance structure and risk register. Baseline budget and timeline confirmed.', deliverable: 'Project Charter + RACI Matrix', accent: '#c9a227' },
        { num: '02', icon: 'ri-calendar-schedule-line', title: 'Detailed Planning', duration: '1–2 weeks', desc: 'Work breakdown structure, Gantt chart, resource allocation and communication plan. PMI/PRINCE2/Agile framework selected.', deliverable: 'Detailed project plan + dashboard', accent: '#22a05a' },
        { num: '03', icon: 'ri-dashboard-line', title: 'Execution & Steering', duration: 'Project lifecycle', desc: 'Daily coordination, change request management, risk mitigation, weekly progress reports and milestone validation.', deliverable: 'Bi-weekly progress reports + decision logs', accent: '#c9a227' },
        { num: '04', icon: 'ri-checkbox-circle-line', title: 'Closure & Transfer', duration: '1–2 weeks', desc: 'Final deliverable validation, lessons learned documentation, skills transfer and post-project support plan.', deliverable: 'Closure report + knowledge base', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-file-list-3-line', title: 'Cadrage du projet', duration: '1–2 semaines', desc: 'Définition du périmètre, cartographie des parties prenantes, structure de gouvernance et registre des risques. Budget et planning de référence validés.', deliverable: 'Charte projet + Matrice RACI', accent: '#c9a227' },
        { num: '02', icon: 'ri-calendar-schedule-line', title: 'Planification détaillée', duration: '1–2 semaines', desc: 'WBS, diagramme de Gantt, allocation des ressources et plan de communication. Référentiel PMI/PRINCE2/Agile sélectionné.', deliverable: 'Plan de projet détaillé + tableau de bord', accent: '#22a05a' },
        { num: '03', icon: 'ri-dashboard-line', title: 'Exécution & Pilotage', duration: 'Durée du projet', desc: 'Coordination quotidienne, gestion des évolutions, mitigation des risques, rapports d\'avancement hebdomadaires et validation des jalons.', deliverable: 'Rapports bi-hebdomadaires + registre décisions', accent: '#c9a227' },
        { num: '04', icon: 'ri-checkbox-circle-line', title: 'Clôture & Transfert', duration: '1–2 semaines', desc: 'Validation des livrables finaux, retours d\'expérience, transfert de compétences et plan de support post-projet.', deliverable: 'Rapport de clôture + base de connaissances', accent: '#22a05a' },
      ];

  const PROBLEMS = isEn
    ? [
        '60% of transformation projects in Africa fail — due to poor governance from day one',
        'Resources spread thin across multiple initiatives with no consolidated visibility',
        'Delays cascade into budget overruns that kill ROI before the project even delivers',
      ]
    : [
        '60% des projets de transformation en Afrique échouent — faute de gouvernance dès le départ',
        'Ressources dispersées sur plusieurs initiatives sans visibilité consolidée',
        'Les retards génèrent des dépassements qui annulent le ROI avant la livraison',
      ];

  const ANSWERS = isEn
    ? [
        'Structured governance from day one — clear ownership, no ambiguity',
        'Consolidated dashboard — 360° visibility at every milestone',
        'Proactive risk management — issues resolved before they become crises',
        'Skills transfer included — your teams own the project after us',
      ]
    : [
        'Gouvernance structurée dès J1 — responsabilités claires, zéro ambiguïté',
        'Tableau de bord consolidé — visibilité 360° à chaque jalon',
        'Gestion proactive des risques — les problèmes résolus avant qu\'ils deviennent des crises',
        'Transfert de compétences inclus — vos équipes maîtrisent le projet après notre départ',
      ];

  const DELIVERABLES = isEn
    ? ['Detailed project management plan', 'Governance & steering structure', 'Tracking & reporting tools', 'Risk register & mitigation plan', 'Bi-weekly progress reports', 'Full project documentation']
    : ['Plan de gestion de projet détaillé', 'Structure de gouvernance & pilotage', 'Outils de suivi & reporting', 'Registre des risques & plan de mitigation', 'Rapports d\'avancement bi-hebdomadaires', 'Documentation complète du projet'];

  const RELATED = isEn
    ? [
        { title: 'Strategic Advisory', slug: 'conseil-strategique', icon: 'ri-compass-3-line', kpi: 'Strategic direction to drive your projects' },
        { title: 'Organizational Development', slug: 'developpement-organisationnel', icon: 'ri-organization-chart', kpi: 'Structure designed for execution' },
        { title: 'Capacity Building', slug: 'renforcement-capacites', icon: 'ri-team-line', kpi: 'Teams ready to deliver' },
      ]
    : [
        { title: 'Conseil Stratégique', slug: 'conseil-strategique', icon: 'ri-compass-3-line', kpi: 'La direction stratégique qui oriente vos projets' },
        { title: 'Développement Organisationnel', slug: 'developpement-organisationnel', icon: 'ri-organization-chart', kpi: 'Structure conçue pour l\'exécution' },
        { title: 'Renforcement des Capacités', slug: 'renforcement-capacites', icon: 'ri-team-line', kpi: 'Équipes prêtes à livrer' },
      ];

  const faqItems = SERVICE_SCHEMAS['gestion-de-projets']['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn ? 'Project Management in Africa | PMI PRINCE2 Agile | KHEPRA' : 'Gestion de Projets en Afrique | PMI PRINCE2 Agile | KHEPRA'}
        description={isEn ? 'Expert project management for transformation initiatives in Africa. PMI, PRINCE2 & Agile. 90% on-time delivery, –35% budget overruns. KHEPRA EXPERTS, Lomé, Togo.' : 'Gestion de projets complexes en Afrique. PMI, PRINCE2, Agile. 90% livrables dans les délais, –35% de dépassements. Cabinet KHEPRA EXPERTS, Lomé, Togo.'}
        keywords={isEn ? 'project management Africa, certified project manager, project steering financial institution, PMI PRINCE2 Africa, agile transformation Africa' : 'gestion de projets Afrique, chef de projet certifié, pilotage projet institution financière, PMI PRINCE2 Afrique, gestion projet transformation digitale'}
        ogImage="https://readdy.ai/api/search-image?query=professional%20African%20project%20managers%20strategic%20planning%20session%20with%20timeline%20charts%20Gantt%20roadmap%20on%20screens%20modern%20premium%20office%20Lom%C3%A9%20Togo%20West%20Africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20editorial%20photography%20multi-ethnic%20executive%20team&width=1440&height=900&seq=gestion-projets-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/gestion-de-projets"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SERVICE_SCHEMAS['gestion-de-projets']}
        hreflangLinks={buildHreflang('/services/gestion-de-projets')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Project Management' : 'Gestion de Projets', path: '/services/gestion-de-projets' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=professional%20African%20project%20managers%20strategic%20planning%20session%20with%20timeline%20charts%20Gantt%20roadmap%20on%20screens%20modern%20premium%20office%20Lom%C3%A9%20Togo%20West%20Africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20editorial%20photography%20multi-ethnic%20executive%20team&width=1440&height=900&seq=gestion-projets-hero-green&orientation=landscape"
              alt={isEn ? 'Project Management KHEPRA EXPERTS Africa' : 'Gestion de Projets KHEPRA EXPERTS Afrique'}
              className="w-full h-full object-cover object-center opacity-20"
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
                    {isEn ? 'Project Management · KHEPRA EXPERTS' : 'Gestion de Projets · KHEPRA EXPERTS'}
                  </span>
                </div>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? <>A project without<br />a pilot</> : <>Un projet sans<br />pilote</>}
                  <br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'is a sunken investment.' : "c'est un investissement coulé."}
                  </span>
                </h1>

                <p className="text-lg mb-6 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'We don\'t just coordinate — we drive. From framing to closure: every milestone delivered, every risk anticipated, every stakeholder aligned.'
                    : 'Nous ne coordinons pas — nous pilotons. Du cadrage à la clôture : chaque jalon livré, chaque risque anticipé, chaque partie prenante alignée.'}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn ? '90% on-time delivery · PMI / PRINCE2 / Agile · 20+ countries · 22 years of field experience' : '90% de projets livrés dans les délais · PMI / PRINCE2 / Agile · 20+ pays · 22 ans d\'expérience terrain'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/diagnostic-flash')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-flashlight-line" />
                    {isEn ? 'Free Flash Diagnostic' : 'Diagnostic Flash gratuit'}
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    {isEn ? 'Discuss my project' : 'Discuter de mon projet'}
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
                  <i className="ri-tools-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Methodologies' : 'Méthodologies'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>PMI · PRINCE2 · Agile · SCRUM</p>
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
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{isEn ? 'The reality' : 'Le constat'}</span>
                </div>
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? <>Most African projects<br /></> : <>La majorité des projets africains<br /></>}
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'never reach their ROI target.' : "n'atteignent jamais leur objectif ROI."}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn ? 'The problem isn\'t ambition — it\'s execution without a proven structure. Delays pile up, budgets explode, and sponsors lose confidence.' : 'Le problème n\'est pas l\'ambition — c\'est l\'exécution sans structure éprouvée. Les retards s\'accumulent, les budgets explosent, les sponsors perdent confiance.'}
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
                    <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#c9a227' }}>{isEn ? 'Our answer' : 'Notre réponse'}</span>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-4 leading-tight">
                    {isEn ? 'Structured steering that protects your investment.' : 'Un pilotage structuré qui protège votre investissement.'}
                  </h3>
                  <div className="space-y-3 mb-6">
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-flashlight-line" />
                    {isEn ? 'Start my Flash Diagnostic' : 'Démarrer mon Diagnostic Flash'}
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
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#c9a227' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{isEn ? 'Our Method' : 'Notre méthode'}</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight">
                  {isEn ? '4 phases. A deliverable at every milestone.' : '4 phases. Un livrable à chaque jalon.'}
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">{isEn ? 'No half-completed reports. Each phase activates the next.' : 'Pas de rapports à moitié faits. Chaque phase active la suivante.'}</p>
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

        {/* ── LIVRABLES + SIDEBAR ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{isEn ? 'What you receive' : 'Ce que vous recevez'}</span>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">{isEn ? 'Included deliverables' : 'Livrables inclus'}</h2>
                <div className="grid md:grid-cols-2 gap-3 mb-10">
                  {DELIVERABLES.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(201,162,39,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#c9a227' }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Sectors */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{isEn ? 'Project types' : 'Types de projets'}</span>
                </div>
                <div className="space-y-3">
                  {(isEn ? [
                    { icon: 'ri-smartphone-line', label: 'Digital Transformation', kpi: 'IT systems, mobile banking, ERP' },
                    { icon: 'ri-organization-chart', label: 'Organizational Restructuring', kpi: 'Redesign, merger, spinoff' },
                    { icon: 'ri-shield-check-line', label: 'Regulatory Compliance', kpi: 'BCEAO, BEAC, OHADA certification' },
                    { icon: 'ri-global-line', label: 'Geographic Expansion', kpi: 'Entry into new African markets' },
                    { icon: 'ri-bank-line', label: 'Banking & MFI Projects', kpi: 'Core banking, branch network, agrifinance' },
                  ] : [
                    { icon: 'ri-smartphone-line', label: 'Transformation digitale', kpi: 'SI, mobile banking, ERP' },
                    { icon: 'ri-organization-chart', label: 'Restructuration organisationnelle', kpi: 'Refonte, fusion, scission' },
                    { icon: 'ri-shield-check-line', label: 'Mise en conformité réglementaire', kpi: 'Certification BCEAO, BEAC, OHADA' },
                    { icon: 'ri-global-line', label: 'Expansion géographique', kpi: 'Entrée sur de nouveaux marchés africains' },
                    { icon: 'ri-bank-line', label: 'Projets bancaires & IMF', kpi: 'Core banking, réseau d\'agences, agrifinance' },
                  ]).map((s, i) => (
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
                <div className="rounded-2xl p-6 border border-gray-100 bg-white sticky top-32">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="ri-time-line text-lg" style={{ color: '#c9a227' }} />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Duration · Variable' : 'Durée · Variable'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Finance · NGOs · SMEs · Institutions' : 'Finance · ONG · PME · Institutions'}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-5">
                    {[
                      { icon: 'ri-tools-line', label: 'PMI / PRINCE2 / Agile / SCRUM' },
                      { icon: 'ri-shield-check-line', label: isEn ? '100% confidential' : '100% confidentiel' },
                      { icon: 'ri-global-line', label: isEn ? '20+ African countries' : '20+ pays africains' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <i className={`${item.icon} text-sm`} style={{ color: '#c9a227' }} />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/diagnostic-flash')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 mb-3"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-flashlight-line" />
                    {isEn ? 'Flash Diagnostic — Free' : 'Diagnostic Flash — Gratuit'}
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all border border-gray-200 hover:bg-gray-50 text-gray-700"
                  >
                    {isEn ? 'Request a quote' : 'Demander un devis'}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">{isEn ? 'Free diagnostic · Response within 24h' : 'Diagnostic gratuit · Réponse sous 24h'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Project Management' : 'Gestion de Projets'} />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="gestion-de-projets" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-6" style={{ background: '#c9a227' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{isEn ? 'Complementary Services' : 'Services complémentaires'}</span>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {RELATED.map((service, i) => (
                <Link
                  key={i}
                  to={`/services/${service.slug}`}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.20)' }}>
                    <i className={`${service.icon} text-lg`} style={{ color: '#c9a227' }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-amber-700 transition-colors line-clamp-2" title={service.title}>{service.title}</h3>
                  <p className="text-xs text-gray-400 mb-4">{service.kpi}</p>
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
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#c9a227' }}>{isEn ? 'Take action' : 'Passez à l\'action'}</span>
                </div>
                <h2 className="font-playfair text-3xl font-bold text-white mb-3 leading-tight">
                  {isEn ? 'A complex project to deliver?' : 'Un projet complexe à piloter ?'}
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
                  {isEn ? 'Flash Diagnostic — Free' : 'Diagnostic Flash — Gratuit'}
                </button>
                <button
                  onClick={() => navigate('/case-studies')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {isEn ? 'View our achievements' : 'Voir nos réalisations'}
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
            url={`${SITE_URL}/services/gestion-de-projets/`}
            title={isEn ? 'Project Management — KHEPRA EXPERTS' : 'Gestion de Projets — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}





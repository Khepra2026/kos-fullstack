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

export default function DeveloppementOrganisationnel() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '+30%', label: 'Avg. operational efficiency', sub: 'within 6 months of restructuring', icon: 'ri-bar-chart-line', accent: '#22a05a' },
        { value: '2–4m', label: 'Full redesign timeline', sub: 'from diagnosis to validated structure', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '97%', label: 'Change adoption rate', sub: 'with participatory methodology', icon: 'ri-team-line', accent: '#22a05a' },
        { value: '3×', label: 'Faster decision-making', sub: 'through clear governance & RACI', icon: 'ri-rocket-line', accent: '#c9a227' },
      ]
    : [
        { value: '+30%', label: 'd\'efficacité opérationnelle', sub: 'dans les 6 mois suivant la restructuration', icon: 'ri-bar-chart-line', accent: '#22a05a' },
        { value: '2–4 m', label: 'pour une refonte complète', sub: 'du diagnostic à la structure validée', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '97%', label: 'de taux d\'adoption du changement', sub: 'avec méthodologie participative', icon: 'ri-team-line', accent: '#22a05a' },
        { value: '3×', label: 'plus rapide en prise de décision', sub: 'grâce à une gouvernance claire et RACI', icon: 'ri-rocket-line', accent: '#c9a227' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-search-eye-line', title: 'Organizational Diagnosis', duration: '2–3 weeks', desc: 'Structural analysis, dysfunction mapping, interviews with key stakeholders. Identification of 3 priority reorganization levers.', deliverable: 'Diagnosis report + prioritization matrix', accent: '#c9a227' },
        { num: '02', icon: 'ri-draft-line', title: 'Structure Design', duration: '2–3 weeks', desc: 'Co-creation of the new org chart, roles & responsibilities definition, RACI matrix, governance model aligned with strategy.', deliverable: 'New org chart + validated RACI', accent: '#22a05a' },
        { num: '03', icon: 'ri-flow-chart', title: 'Process Optimization', duration: '3–4 weeks', desc: 'Mapping and streamlining of key processes, SLAs definition, performance KPIs per function, procedures manual.', deliverable: 'Optimized process maps + procedures manual', accent: '#c9a227' },
        { num: '04', icon: 'ri-user-settings-line', title: 'Change & Transfer', duration: '4–8 weeks', desc: 'Change management plan, team communication, manager coaching, skills transfer and post-restructuring follow-up.', deliverable: 'Change plan + post-mission support', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-search-eye-line', title: 'Diagnostic organisationnel', duration: '2–3 semaines', desc: 'Analyse structurelle, cartographie des dysfonctionnements, entretiens avec les parties prenantes clés. Identification des 3 leviers de réorganisation prioritaires.', deliverable: 'Rapport de diagnostic + matrice de priorisation', accent: '#c9a227' },
        { num: '02', icon: 'ri-draft-line', title: 'Design de la structure', duration: '2–3 semaines', desc: 'Co-construction du nouvel organigramme, définition des rôles & responsabilités, matrice RACI, modèle de gouvernance aligné sur la stratégie.', deliverable: 'Nouvel organigramme + RACI validé', accent: '#22a05a' },
        { num: '03', icon: 'ri-flow-chart', title: 'Optimisation des processus', duration: '3–4 semaines', desc: 'Cartographie et optimisation des processus clés, définition des SLAs, KPI de performance par fonction, manuel de procédures.', deliverable: 'Cartographies processus + manuel de procédures', accent: '#c9a227' },
        { num: '04', icon: 'ri-user-settings-line', title: 'Conduite du changement', duration: '4–8 semaines', desc: 'Plan de conduite du changement, communication équipes, coaching des managers, transfert de compétences et suivi post-restructuration.', deliverable: 'Plan de changement + accompagnement post-mission', accent: '#22a05a' },
      ];

  const PROBLEMS = isEn
    ? [
        'Silos and duplicated roles: 40% of tasks performed twice with no clear owner',
        'Governance without teeth: committees exist but no one can decide what matters',
        'Processes built for yesterday: bottlenecks slow execution and erode competitiveness',
      ]
    : [
        'Silos et doublons : 40% des tâches réalisées deux fois, sans responsable clairement identifié',
        'Gouvernance sans dents : des comités existent mais personne ne peut décider ce qui compte',
        'Processus pensés pour hier : les goulots d\'étranglement ralentissent l\'exécution et érodent la compétitivité',
      ];

  const ANSWERS = isEn
    ? [
        'Org chart aligned with strategy — no more shadow hierarchies',
        'Clear RACI — every role, every decision, every accountability defined',
        'Streamlined processes — cut waste, regain 30%+ in execution speed',
        'Participatory change — 97% adoption because teams co-build the solution',
      ]
    : [
        'Organigramme aligné sur la stratégie — plus de hiérarchies fantômes',
        'RACI clair — chaque rôle, chaque décision, chaque responsabilité définis',
        'Processus épurés — supprimer les gaspillages, regagner 30%+ en vitesse d\'exécution',
        'Changement participatif — 97% d\'adoption car les équipes co-construisent la solution',
      ];

  const DELIVERABLES = isEn
    ? ['Comprehensive organizational diagnosis', 'New organizational structure', 'Job descriptions & profiles', 'Optimized processes & procedures', 'Change management plan', 'Implementation support']
    : ['Diagnostic organisationnel complet', 'Nouvelle structure organisationnelle', 'Fiches de poste & profils', 'Processus & procédures optimisés', 'Plan de conduite du changement', 'Accompagnement à la mise en œuvre'];

  const SECTORS = isEn
    ? [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & MFIs', kpi: 'Regulatory alignment + network governance' },
        { icon: 'ri-building-line', label: 'SMEs in growth phase', kpi: 'Structure for scale without chaos' },
        { icon: 'ri-heart-line', label: 'NGOs & Development Projects', kpi: 'Donor-aligned org design' },
        { icon: 'ri-bank-line', label: 'Banks & Financial Institutions', kpi: 'Efficiency + compliance structure' },
        { icon: 'ri-government-line', label: 'Public Sector Agencies', kpi: 'Institutional development & reform' },
      ]
    : [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & SFD', kpi: 'Alignement réglementaire + gouvernance réseau' },
        { icon: 'ri-building-line', label: 'PME en phase de croissance', kpi: 'Structure pour scaler sans chaos' },
        { icon: 'ri-heart-line', label: 'ONG & Projets de Développement', kpi: 'Design organisationnel aligné bailleurs' },
        { icon: 'ri-bank-line', label: 'Banques & Institutions Financières', kpi: 'Structure efficiente + conforme' },
        { icon: 'ri-government-line', label: 'Agences du Secteur Public', kpi: 'Développement institutionnel & réforme' },
      ];

  const RELATED = isEn
    ? [
        { title: 'Organizational Diagnostic', slug: 'diagnostic-organisationnel', icon: 'ri-stethoscope-line', kpi: 'The entry point before any redesign' },
        { title: 'Human Resources', slug: 'ressources-humaines', icon: 'ri-team-line', kpi: 'People strategy aligned to structure' },
        { title: 'Capacity Building', slug: 'renforcement-capacites', icon: 'ri-user-star-line', kpi: 'Teams equipped to run the new design' },
      ]
    : [
        { title: 'Diagnostic Organisationnel', slug: 'diagnostic-organisationnel', icon: 'ri-stethoscope-line', kpi: 'Le point d\'entrée avant toute refonte' },
        { title: 'Ressources Humaines', slug: 'ressources-humaines', icon: 'ri-team-line', kpi: 'Stratégie people alignée à la structure' },
        { title: 'Renforcement des Capacités', slug: 'renforcement-capacites', icon: 'ri-user-star-line', kpi: 'Équipes formées pour faire vivre la refonte' },
      ];

  const faqItems = SERVICE_SCHEMAS['developpement-organisationnel']['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn ? 'Organizational Development Africa | Restructuring | KHEPRA' : 'Développement Organisationnel Afrique | Restructuration | KHEPRA'}
        description={isEn ? 'Organizational redesign & process optimization for institutions in Africa. RACI, governance, change management. +30% efficiency in 6 months. KHEPRA EXPERTS, Lomé, Togo.' : 'Réorganisation et optimisation des processus pour institutions en Afrique. RACI, gouvernance, conduite du changement. +30% efficacité en 6 mois. Cabinet Lomé, Togo.'}
        keywords={isEn ? 'organizational development Africa, org restructuring, design organizational, change management Africa, process optimization financial institution' : 'développement organisationnel Afrique, restructuration organisation, design organisationnel, conduite du changement Afrique, optimisation processus institution financière'}
        ogImage="https://readdy.ai/api/search-image?query=African%20executive%20team%20co-designing%20organizational%20chart%20whiteboard%20strategic%20workshop%20premium%20office%20Lom%C3%A9%20Togo%20West%20Africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20editorial%20photography%20diverse%20professionals%20flowchart%20diagrams&width=1440&height=900&seq=dev-org-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/developpement-organisationnel"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SERVICE_SCHEMAS['developpement-organisationnel']}
        hreflangLinks={buildHreflang('/services/developpement-organisationnel')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Organizational Development' : 'Développement Organisationnel', path: '/services/developpement-organisationnel' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20executive%20team%20co-designing%20organizational%20chart%20whiteboard%20strategic%20workshop%20premium%20office%20Lom%C3%A9%20Togo%20West%20Africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20editorial%20photography%20diverse%20professionals%20flowchart%20diagrams&width=1440&height=900&seq=dev-org-hero-green&orientation=landscape"
              alt={isEn ? 'Organizational Development KHEPRA EXPERTS' : 'Développement Organisationnel KHEPRA EXPERTS'}
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
                    {isEn ? 'Organizational Development · KHEPRA EXPERTS' : 'Développement Organisationnel · KHEPRA EXPERTS'}
                  </span>
                </div>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? <>A structure that slows<br />your teams</> : <>Une structure qui freine<br />vos équipes</>}
                  <br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'is your biggest hidden cost.' : 'est votre plus grand coût caché.'}
                  </span>
                </h1>

                <p className="text-lg mb-6 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'We don\'t reorganize for the sake of it — we redesign for performance. Org chart, processes, governance: every element aligned to your growth strategy.'
                    : 'Nous ne réorganisons pas pour réorganiser — nous redesignons pour performer. Organigramme, processus, gouvernance : chaque élément aligné sur votre stratégie de croissance.'}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn ? '+30% efficiency · 97% adoption · Participatory approach · 22 years of field experience' : '+30% d\'efficacité · 97% d\'adoption · Approche participative · 22 ans d\'expérience terrain'}
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
                    {isEn ? 'Request a diagnosis' : 'Demander un diagnostic'}
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
                  <i className="ri-organization-chart text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Methodology' : 'Méthodologie'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>McKinsey 7S · COSO · LEAN · Co-design</p>
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
                <BigFourSubtitleBar label={isEn ? 'The diagnosis' : 'Le constat'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? <>A dysfunctional structure</> : <>Une structure dysfonctionnelle</>}
                  <br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? "silently bleeds your margins." : 'saigne vos marges en silence.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn ? 'Most organizations grow faster than their structure. What worked at 20 people breaks at 100. The org chart becomes a bottleneck, not an asset.' : 'La plupart des organisations grandissent plus vite que leur structure. Ce qui fonctionnait à 20 personnes se brise à 100. L\'organigramme devient un goulot, pas un atout.'}
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
                    {isEn ? 'A structure built to execute your strategy.' : 'Une structure construite pour exécuter votre stratégie.'}
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
              <BigFourSubtitleBar label={isEn ? 'Our Method' : 'Notre méthode'} variant="left-accent" accentColor="primary" className="mb-4" />
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight">
                  {isEn ? '4 phases. Concrete deliverables.' : '4 phases. Des livrables concrets.'}
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">{isEn ? 'Not a diagnostic that stays on a shelf. Each phase transforms.' : 'Pas un diagnostic qui reste dans un tiroir. Chaque phase transforme.'}</p>
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
                <BigFourSubtitleBar label={isEn ? 'Sectors of intervention' : "Secteurs d\'intervention"} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">{isEn ? 'Proven sector expertise' : 'Expertise sectorielle prouvée'}</h2>
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
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{isEn ? 'What you receive' : 'Ce que vous recevez'}</span>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">{isEn ? 'Included deliverables' : 'Livrables inclus'}</h2>
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
                      <p className="text-xs font-bold text-gray-900">{isEn ? 'Duration · 2 to 4 months' : 'Durée · 2 à 4 mois'}</p>
                      <p className="text-xs text-gray-400">{isEn ? 'Finance · NGOs · SMEs · Institutions' : 'Finance · ONG · PME · Institutions'}</p>
                    </div>
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
                  <p className="text-xs text-center text-gray-400 mt-3">{isEn ? 'Participatory approach · Response within 24h' : 'Approche participative · Réponse sous 24h'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Organizational Development' : 'Développement Organisationnel'} />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="developpement-organisationnel" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BigFourSubtitleBar label={isEn ? 'Complementary Services' : 'Services complémentaires'} variant="left-accent" accentColor="primary" className="mb-10" />
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
                <BigFourSubtitleBar label={isEn ? 'Take action' : "Passez à l\'action"} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-3xl font-bold text-white mb-3 leading-tight">
                  {isEn ? 'Your organizational transformation starts here.' : 'Votre transformation organisationnelle commence ici.'}
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
            url={`${SITE_URL}/services/developpement-organisationnel/`}
            title={isEn ? 'Organizational Development — KHEPRA EXPERTS' : 'Développement Organisationnel — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}





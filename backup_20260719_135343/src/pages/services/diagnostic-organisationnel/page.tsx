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

export default function DiagnosticOrganisationnel() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '4–8 wks', label: 'for a complete diagnostic', sub: 'Report + prioritized action plan', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '100%', label: 'blind spots identified', sub: 'Structure · Processes · Governance · Finance', icon: 'ri-search-eye-line', accent: '#22a05a' },
        { value: '3–5', label: 'growth levers detected', sub: 'Prioritized by impact and feasibility', icon: 'ri-arrow-up-line', accent: '#c9a227' },
        { value: '30 min', label: 'free diagnostic', sub: 'No commitment · Response within 24h', icon: 'ri-stethoscope-line', accent: '#22a05a' },
      ]
    : [
        { value: '4–8 sem.', label: 'pour un diagnostic complet', sub: "Rapport + plan d'action priorisé", icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '100%', label: 'des angles morts identifiés', sub: 'Structure · Processus · Gouvernance · Finance', icon: 'ri-search-eye-line', accent: '#22a05a' },
        { value: '3–5', label: 'leviers de croissance détectés', sub: 'Priorisés par impact et faisabilité', icon: 'ri-arrow-up-line', accent: '#c9a227' },
        { value: '30 min', label: 'de diagnostic gratuit', sub: 'Sans engagement · Réponse sous 24h', icon: 'ri-stethoscope-line', accent: '#22a05a' },
      ];

  const DIMENSIONS = isEn
    ? [
        { icon: 'ri-organization-chart', title: 'Organizational structure', desc: 'Org chart, responsibility allocation, decision chains, structure/strategy alignment.', signal: 'Detects: duplicates, silos, grey areas of responsibility', accent: '#c9a227' },
        { icon: 'ri-flow-chart', title: 'Processes & procedures', desc: 'Key process mapping, bottleneck identification, operational efficiency assessment.', signal: 'Detects: time losses, operational risks, non-compliance', accent: '#22a05a' },
        { icon: 'ri-government-line', title: 'Governance & compliance', desc: 'Governance body assessment, OHADA/BCEAO/BEAC compliance, internal control, risk management.', signal: 'Detects: regulatory exposures, control gaps', accent: '#c9a227' },
        { icon: 'ri-funds-line', title: 'Financial performance', desc: 'Key ratio analysis, cash flow management, profitability by activity, cost structure.', signal: 'Detects: margin leaks, unoptimized working capital, liquidity risks', accent: '#22a05a' },
        { icon: 'ri-team-line', title: 'Human resources', desc: 'Skills/role alignment, organizational culture, performance management, talent retention.', signal: 'Detects: team/strategy misalignment, HR risks', accent: '#c9a227' },
        { icon: 'ri-bar-chart-box-line', title: 'Steering & reporting', desc: 'Dashboard quality, data reliability, frequency and relevance of decision-making reporting.', signal: 'Detects: decisions made without reliable data', accent: '#22a05a' },
      ]
    : [
        { icon: 'ri-organization-chart', title: 'Structure organisationnelle', desc: "Organigramme, répartition des responsabilités, chaînes de décision, adéquation structure/stratégie.", signal: 'Détecte : doublons, silos, zones grises de responsabilité', accent: '#c9a227' },
        { icon: 'ri-flow-chart', title: 'Processus & procédures', desc: "Cartographie des processus clés, identification des goulots d'étranglement, évaluation de l'efficience opérationnelle.", signal: 'Détecte : pertes de temps, risques opérationnels, non-conformités', accent: '#22a05a' },
        { icon: 'ri-government-line', title: 'Gouvernance & conformité', desc: "Évaluation des organes de gouvernance, conformité OHADA/BCEAO/BEAC, contrôle interne, gestion des risques.", signal: 'Détecte : expositions réglementaires, failles de contrôle', accent: '#c9a227' },
        { icon: 'ri-funds-line', title: 'Performance financière', desc: "Analyse des ratios clés, pilotage de la trésorerie, rentabilité par activité, structure de coûts.", signal: 'Détecte : fuites de marge, BFR non optimisé, risques de liquidité', accent: '#22a05a' },
        { icon: 'ri-team-line', title: 'Ressources humaines', desc: "Adéquation compétences/postes, culture organisationnelle, gestion de la performance, rétention des talents.", signal: "Détecte : désalignement équipes/stratégie, risques RH", accent: '#c9a227' },
        { icon: 'ri-bar-chart-box-line', title: 'Pilotage & reporting', desc: "Qualité des tableaux de bord, fiabilité des données, fréquence et pertinence du reporting décisionnel.", signal: 'Détecte : décisions prises sans données fiables', accent: '#22a05a' },
      ];

  const METHODE = isEn
    ? [
        { num: '01', icon: 'ri-file-list-3-line', title: 'Document review', duration: 'Week 1', desc: 'Review of strategic documents, financial reports, procedures, org charts and existing performance indicators.', accent: '#c9a227' },
        { num: '02', icon: 'ri-user-voice-line', title: 'Leadership interviews', duration: 'Weeks 1–2', desc: 'Structured interviews with executives, managers and key staff. Collection of perceptions, blockers and internally identified opportunities.', accent: '#22a05a' },
        { num: '03', icon: 'ri-eye-line', title: 'Field observation', duration: 'Weeks 2–3', desc: 'Direct observation of operational practices and actual working methods versus formal procedures.', accent: '#c9a227' },
        { num: '04', icon: 'ri-bar-chart-grouped-line', title: 'Synthesis & recommendations', duration: 'Weeks 3–4', desc: 'Data consolidation, gap identification, formulation of recommendations prioritized by impact and feasibility.', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-file-list-3-line', title: 'Analyse documentaire', duration: 'Semaine 1', desc: "Revue des documents stratégiques, rapports financiers, procédures, organigrammes et indicateurs de performance existants.", accent: '#c9a227' },
        { num: '02', icon: 'ri-user-voice-line', title: 'Entretiens dirigeants', duration: 'Semaines 1–2', desc: "Interviews structurées des dirigeants, managers et collaborateurs clés. Recueil des perceptions, blocages et opportunités identifiés en interne.", accent: '#22a05a' },
        { num: '03', icon: 'ri-eye-line', title: 'Observation terrain', duration: 'Semaines 2–3', desc: "Observation directe des pratiques opérationnelles, des modes de fonctionnement réels vs. les procédures formelles.", accent: '#c9a227' },
        { num: '04', icon: 'ri-bar-chart-grouped-line', title: 'Synthèse & recommandations', duration: 'Semaines 3–4', desc: "Consolidation des données, identification des écarts, formulation de recommandations priorisées par impact et faisabilité.", accent: '#22a05a' },
      ];

  const DELIVERABLES = isEn
    ? [
        { item: 'Comprehensive diagnostic report (50–80 pages)', detail: 'Exhaustive analysis of all dimensions' },
        { item: 'Organizational SWOT analysis', detail: 'Strengths, weaknesses, opportunities, threats' },
        { item: 'Key process mapping', detail: 'Current flows + recommended target flows' },
        { item: 'Performance assessment', detail: 'Current KPIs vs. sector benchmarks' },
        { item: 'Prioritized recommendations', detail: 'Impact/effort matrix with milestones' },
        { item: 'Detailed action plan', detail: '30d · 90d · 6-month actions with owners' },
      ]
    : [
        { item: 'Rapport de diagnostic complet (50–80 pages)', detail: 'Analyse exhaustive de toutes les dimensions' },
        { item: 'Analyse SWOT organisationnelle', detail: 'Forces, faiblesses, opportunités, menaces' },
        { item: 'Cartographie des processus clés', detail: 'Flux actuels + flux cibles recommandés' },
        { item: 'Évaluation de la performance', detail: 'KPI actuels vs. benchmarks sectoriels' },
        { item: 'Recommandations priorisées', detail: 'Matrice impact/effort avec jalons' },
        { item: "Plan d'action détaillé", detail: "Actions 30j · 90j · 6 mois avec responsables" },
      ];

  const RELATED = isEn
    ? [
        { title: 'Organizational Development', slug: 'developpement-organisationnel', icon: 'ri-organization-chart', kpi: 'Implementation of recommendations' },
        { title: 'Social Audit', slug: 'audit-social', icon: 'ri-shield-check-line', kpi: 'Social & HR compliance' },
        { title: 'Strategic Advisory', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: '+25–40% growth observed' },
      ]
    : [
        { title: 'Développement Organisationnel', slug: 'developpement-organisationnel', icon: 'ri-organization-chart', kpi: 'Mise en œuvre des recommandations' },
        { title: 'Audit Social', slug: 'audit-social', icon: 'ri-shield-check-line', kpi: 'Conformité sociale & RH' },
        { title: 'Conseil Stratégique', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: '+25–40% de croissance observée' },
      ];

  const faqItems = SERVICE_SCHEMAS['diagnostic-organisationnel']['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Organizational Diagnostic Africa | 6 Dimensions | KHEPRA'
          : 'Diagnostic Organisationnel | Évaluation Structurelle | KHEPRA'}
        description={isEn
          ? 'Full organizational assessment in 4–8 weeks: structure, processes, governance, HR. Identify 3–5 growth levers. KHEPRA EXPERTS, financial institutions Africa, Lomé, Togo.'
          : 'Diagnostic organisationnel complet en 4–8 semaines : structure, processus, gouvernance, RH. 3–5 leviers de croissance. Cabinet KHEPRA EXPERTS, institutions financières, Afrique.'}
        keywords={isEn
          ? 'organizational diagnostic Africa, organization audit Togo, performance assessment organization, diagnostic MFI BCEAO'
          : 'diagnostic organisationnel Afrique, audit organisation Togo, évaluation performance organisation, diagnostic SFD BCEAO'}
        ogImage="https://readdy.ai/api/search-image?query=African%20business%20consultants%20conducting%20organizational%20assessment%20with%20tablets%20and%20documents%20in%20modern%20bright%20office%2C%20analyzing%20company%20structure%20and%20processes%2C%20professional%20team%20reviewing%20performance%20charts%20and%20organizational%20diagrams%2C%20clean%20corporate%20workspace%20West%20Africa%20Togo%2C%20editorial%20photography%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=1440&height=900&seq=diag-org-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/diagnostic-organisationnel"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SERVICE_SCHEMAS['diagnostic-organisationnel']}
        hreflangLinks={buildHreflang('/services/diagnostic-organisationnel')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Organizational Diagnostic' : 'Diagnostic Organisationnel', path: '/services/diagnostic-organisationnel' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20business%20consultants%20conducting%20organizational%20assessment%20with%20tablets%20and%20documents%20in%20modern%20bright%20office%2C%20analyzing%20company%20structure%20and%20processes%2C%20professional%20team%20reviewing%20performance%20charts%20and%20organizational%20diagrams%2C%20clean%20corporate%20workspace%20West%20Africa%20Togo%2C%20editorial%20photography%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones&width=1440&height=900&seq=diag-org-hero-green&orientation=landscape"
              alt={isEn ? 'Organizational Diagnostic KHEPRA EXPERTS' : 'Diagnostic Organisationnel KHEPRA EXPERTS'}
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
                    {isEn ? 'Organizational Diagnostic · KHEPRA EXPERTS' : 'Diagnostic Organisationnel · KHEPRA EXPERTS'}
                  </span>
                </div>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'You cannot fix' : 'Vous ne pouvez pas corriger'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'what you cannot see.' : 'ce que vous ne voyez pas.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'In 4 to 8 weeks, we map your entire organization — structure, processes, governance, finance, HR — and deliver a prioritized action plan ranked by impact.'
                    : "En 4 à 8 semaines, nous cartographions l'intégralité de votre organisation — structure, processus, gouvernance, finance, RH — et vous livrons un plan d'action priorisé par impact."}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn
                      ? '6 dimensions analyzed · 3–5 levers identified · 30d/90d/6-month action plan'
                      : "6 dimensions analysées · 3–5 leviers identifiés · Plan d'action 30j/90j/6 mois"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/tools/diagnostic-organisationnel')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                  >
                    <i className="ri-stethoscope-line" />
                    {isEn ? 'Free self-diagnostic' : 'Auto-diagnostic gratuit'}
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    {isEn ? 'Request a full diagnostic' : 'Demander un diagnostic complet'}
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
                  <i className="ri-shield-check-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Participatory & confidential approach' : 'Approche participative & confidentielle'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'All data remains strictly confidential' : 'Toutes les données restent strictement confidentielles'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6 DIMENSIONS ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#c9a227' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'What we analyze' : 'Ce que nous analysons'}
                </span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight">
                  {isEn ? '6 dimensions. Zero blind spots.' : '6 dimensions. Aucun angle mort.'}
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">
                  {isEn
                    ? 'Each dimension reveals improvement levers that leaders cannot see from the inside.'
                    : "Chaque dimension révèle des leviers d'amélioration que les dirigeants ne voient pas de l'intérieur."}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DIMENSIONS.map((d, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: `${d.accent}12`, border: `1px solid ${d.accent}25` }}>
                      <i className={`${d.icon} text-lg`} style={{ color: d.accent }} />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2" title={d.title}>{d.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{d.desc}</p>
                  <div className="flex items-start gap-2 pt-4 border-t border-gray-50">
                    <i className="ri-alert-line text-xs mt-0.5 flex-shrink-0" style={{ color: d.accent }} />
                    <span className="text-xs text-gray-500 italic">{d.signal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MÉTHODE ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: '#c9a227' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'Our method' : 'Notre méthode'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 leading-tight">
                {isEn ? '4 steps. One actionable report.' : '4 étapes. Un rapport actionnable.'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {METHODE.map((step, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all relative">
                  <div className="absolute top-5 right-5 text-4xl font-black leading-none select-none" style={{ color: 'rgba(0,0,0,0.04)' }}>{step.num}</div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: `${step.accent}12`, border: `1px solid ${step.accent}25` }}>
                    <i className={`${step.icon} text-lg`} style={{ color: step.accent }} />
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-3" style={{ background: `${step.accent}12`, color: step.accent }}>
                    {step.duration}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2" title={step.title}>{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVRABLES + CTA ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6" style={{ background: '#c9a227' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    {isEn ? 'What you receive' : 'Ce que vous recevez'}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
                  {isEn ? 'Deliverables included in every diagnostic' : 'Livrables inclus dans chaque diagnostic'}
                </h2>
                <div className="space-y-3">
                  {DELIVERABLES.map((d, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(201,162,39,0.15)' }}>
                        <i className="ri-check-line text-xs" style={{ color: '#c9a227' }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{d.item}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{d.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
                  <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(201,162,39,0.08) 0%, transparent 60%)' }} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px w-6" style={{ background: '#c9a227' }} />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#c9a227' }}>
                        {isEn ? 'Start now' : 'Commencer maintenant'}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-white mb-2 leading-tight">
                      {isEn ? 'Free online self-diagnostic' : 'Auto-diagnostic gratuit en ligne'}
                    </h3>
                    <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.50)' }}>
                      {isEn ? '15 minutes · Immediate results · Personalized report' : '15 minutes · Résultats immédiats · Rapport personnalisé'}
                    </p>
                    <button
                      onClick={() => navigate('/tools/diagnostic-organisationnel')}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                    >
                      <i className="ri-stethoscope-line" />
                      {isEn ? 'Launch self-diagnostic' : "Lancer l'auto-diagnostic"}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl p-6 border border-gray-100 bg-white">
                  <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2">
                    {isEn ? 'Full custom diagnostic' : 'Diagnostic complet sur mesure'}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    {isEn ? '4 to 8 weeks · Participatory · Confidential · All sectors' : '4 à 8 semaines · Participatif · Confidentiel · Tous secteurs'}
                  </p>
                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><i className="ri-check-line text-green-500" /> {isEn ? 'Finance' : 'Finance'}</span>
                    <span className="flex items-center gap-1"><i className="ri-check-line text-green-500" /> {isEn ? 'Microfinance' : 'Microfinance'}</span>
                    <span className="flex items-center gap-1"><i className="ri-check-line text-green-500" /> {isEn ? 'SMEs' : 'PME'}</span>
                    <span className="flex items-center gap-1"><i className="ri-check-line text-green-500" /> {isEn ? 'NGOs' : 'ONG'}</span>
                  </div>
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all border border-gray-200 hover:border-amber-300 text-gray-700 hover:text-amber-700"
                  >
                    {isEn ? 'Request a quote' : 'Demander un devis'}
                    <i className="ri-arrow-right-line" />
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    {isEn ? 'Response within 24h · No commitment' : 'Réponse sous 24h · Sans engagement'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50">
                  <p className="font-playfair text-sm font-bold text-gray-900 italic mb-2">
                    {isEn
                      ? '"The diagnostic reveals what the numbers don\'t say — and that\'s often where the real margins are hiding."'
                      : '"Le diagnostic révèle ce que les chiffres ne disent pas — et c\'est souvent là que se cachent les vraies marges."'}
                  </p>
                  <p className="text-xs text-gray-400">{isEn ? 'SIMDA Essoyomèwè · Founder, KHEPRA EXPERTS' : 'SIMDA Essoyomèwè · Fondateur KHEPRA EXPERTS'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Organizational Diagnostic' : 'Diagnostic Organisationnel'} />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="diagnostic-organisationnel" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-6" style={{ background: '#c9a227' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {isEn ? 'Complementary services' : 'Services complémentaires'}
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {RELATED.map((service, i) => (
                <Link key={i} to={`/services/${service.slug}`} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group cursor-pointer">
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
                  <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#c9a227' }}>
                    {isEn ? 'Take action' : "Passez à l'action"}
                  </span>
                </div>
                <h2 className="font-playfair text-3xl font-bold text-white mb-3 leading-tight">
                  {isEn ? 'Identify your blind spots. Activate the right levers.' : 'Identifiez vos angles morts. Actionnez les bons leviers.'}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {isEn ? 'Free diagnostic · Confidential · Response within 24h' : 'Diagnostic gratuit · Confidentiel · Réponse sous 24h'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={() => navigate('/tools/diagnostic-organisationnel')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #f4d03f)', color: '#0a0a0a' }}
                >
                  <i className="ri-stethoscope-line" />
                  {isEn ? 'Free self-diagnostic' : 'Auto-diagnostic gratuit'}
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {isEn ? 'Full diagnostic' : 'Diagnostic complet'}
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
            url={`${SITE_URL}/services/diagnostic-organisationnel/`}
            title={isEn ? 'Organizational Diagnosis — KHEPRA EXPERTS' : 'Diagnostic Organisationnel — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}





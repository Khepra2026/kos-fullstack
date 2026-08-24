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

export default function CommunicationStrategique() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const OUTCOMES = isEn
    ? [
        { value: '+65%', label: 'Brand recognition', sub: 'Within 6 months of deployment', icon: 'ri-eye-line', accent: '#c9a227' },
        { value: '×3', label: 'Investor engagement', sub: 'With investor-grade messaging', icon: 'ri-links-line', accent: '#22a05a' },
        { value: '2–6m', label: 'Average duration', sub: 'Strategy to full deployment', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '100%', label: 'Tailored', sub: 'Messaging built for your context', icon: 'ri-compass-3-line', accent: '#22a05a' },
      ]
    : [
        { value: '+65%', label: 'Notoriété de marque', sub: 'Dans les 6 mois du déploiement', icon: 'ri-eye-line', accent: '#c9a227' },
        { value: '×3', label: "Engagement investisseurs", sub: 'Avec un messaging investor-grade', icon: 'ri-links-line', accent: '#22a05a' },
        { value: '2–6m', label: 'Durée moyenne', sub: 'Stratégie au déploiement complet', icon: 'ri-calendar-check-line', accent: '#c9a227' },
        { value: '100%', label: 'Sur mesure', sub: 'Messaging construit pour votre contexte', icon: 'ri-compass-3-line', accent: '#22a05a' },
      ];

  const PHASES = isEn
    ? [
        { num: '01', icon: 'ri-compass-line', title: 'Brand Audit & Positioning', duration: '1–2 weeks', desc: 'Analysis of current brand perception, competitive landscape mapping and identification of your unique positioning pillars.', deliverable: 'Brand audit report + positioning platform', accent: '#c9a227' },
        { num: '02', icon: 'ri-palette-line', title: 'Visual Identity & Charter', duration: '2–3 weeks', desc: 'Design or redesign of your visual identity, brand charter, messaging framework and key communication assets.', deliverable: 'Brand charter + visual identity kit', accent: '#22a05a' },
        { num: '03', icon: 'ri-global-line', title: 'Digital Presence Strategy', duration: '2–3 weeks', desc: 'Multi-channel content strategy (LinkedIn, website, email), editorial calendar, SEO content framework and KPI dashboard.', deliverable: 'Editorial calendar + digital strategy plan', accent: '#c9a227' },
        { num: '04', icon: 'ri-megaphone-line', title: 'Activation & Deployment', duration: 'Ongoing', desc: 'Content production, PR outreach, campaign management, social media activation and results tracking.', deliverable: 'Monthly performance report + content library', accent: '#22a05a' },
      ]
    : [
        { num: '01', icon: 'ri-compass-line', title: 'Audit marque & Positionnement', duration: '1–2 semaines', desc: "Analyse de la perception actuelle de votre marque, cartographie du paysage concurrentiel et identification de vos piliers de positionnement différenciants.", deliverable: "Rapport d'audit marque + plateforme de positionnement", accent: '#c9a227' },
        { num: '02', icon: 'ri-palette-line', title: 'Identité visuelle & Charte', duration: '2–3 semaines', desc: "Création ou refonte de votre identité visuelle, charte de marque, cadre de messaging et supports de communication clés.", deliverable: 'Charte de marque + kit identité visuelle', accent: '#22a05a' },
        { num: '03', icon: 'ri-global-line', title: 'Stratégie présence digitale', duration: '2–3 semaines', desc: "Stratégie de contenu multi-canal (LinkedIn, site web, email), calendrier éditorial, cadre SEO et tableau de bord de KPI.", deliverable: 'Calendrier éditorial + plan stratégie digitale', accent: '#c9a227' },
        { num: '04', icon: 'ri-megaphone-line', title: 'Activation & Déploiement', duration: 'Continu', desc: "Production de contenu, relations presse, gestion des campagnes, activation réseaux sociaux et suivi des résultats.", deliverable: 'Rapport mensuel de performance + bibliothèque de contenu', accent: '#22a05a' },
      ];

  const SECTORS = isEn
    ? [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & MFIs', kpi: 'Institutional credibility + client trust' },
        { icon: 'ri-building-line', label: 'SMEs & Corporates', kpi: 'B2B brand positioning + LinkedIn' },
        { icon: 'ri-heart-line', label: 'NGOs & Associations', kpi: 'Donor-facing communications' },
        { icon: 'ri-bank-line', label: 'Banks & Financial Institutions', kpi: 'Regulatory reputation + client messaging' },
        { icon: 'ri-government-line', label: 'Public Sector', kpi: 'Institutional communication & PR' },
        { icon: 'ri-leaf-line', label: 'Startups & Fintechs', kpi: 'Go-to-market + investor communication' },
      ]
    : [
        { icon: 'ri-hand-coin-line', label: 'Microfinance & SFD', kpi: 'Crédibilité institutionnelle + confiance client' },
        { icon: 'ri-building-line', label: 'PME & Entreprises', kpi: 'Positionnement marque B2B + LinkedIn' },
        { icon: 'ri-heart-line', label: 'ONG & Associations', kpi: 'Communications orientées bailleurs' },
        { icon: 'ri-bank-line', label: 'Banques & Institutions Financières', kpi: 'Réputation réglementaire + messaging client' },
        { icon: 'ri-government-line', label: 'Secteur Public', kpi: 'Communication institutionnelle & relations presse' },
        { icon: 'ri-leaf-line', label: 'Startups & Fintechs', kpi: 'Go-to-market + communication investisseurs' },
      ];

  const DELIVERABLES = isEn
    ? [
        'Communication strategy document',
        'Annual communication plan',
        'Brand & editorial charter',
        'Visual identity kit',
        'Multi-channel digital presence strategy',
        'Crisis communication plan',
      ]
    : [
        'Document de stratégie de communication',
        'Plan de communication annuel',
        'Charte de marque et éditoriale',
        'Kit identité visuelle',
        'Stratégie de présence digitale multi-canal',
        'Plan de gestion de crise communication',
      ];

  const PROBLEMS = isEn
    ? [
        'Inconsistent brand identity eroding trust across markets',
        'No structured messaging for investors, donors or partners',
        'Digital presence non-existent or misaligned with your positioning',
        'Crisis communication without a plan — risk of reputational damage',
      ]
    : [
        "Identité de marque incohérente qui érode la confiance sur les marchés",
        "Aucun messaging structuré pour les investisseurs, bailleurs ou partenaires",
        "Présence digitale inexistante ou désalignée avec votre positionnement",
        "Communication de crise sans plan — risque de dommage réputationnel",
      ];

  const ANSWERS = isEn
    ? [
        'Consistent brand identity aligned with your strategic ambition',
        'Investor-grade messaging framework for all stakeholders',
        'Multi-channel digital strategy tied to real business KPIs',
        'Crisis communication protocol to protect your reputation',
      ]
    : [
        "Identité de marque cohérente alignée sur votre ambition stratégique",
        "Cadre de messaging investor-grade pour toutes les parties prenantes",
        "Stratégie digitale multi-canal liée aux KPI business réels",
        "Protocole de communication de crise pour protéger votre réputation",
      ];

  const RELATED = isEn
    ? [
        { title: 'Strategic Advisory', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: 'Strategy that drives your communication' },
        { title: 'Digital Transformation', slug: 'transformation-digitale', icon: 'ri-smartphone-line', kpi: 'Digital channels activation' },
        { title: 'Fundraising', slug: 'levee-de-fonds', icon: 'ri-funds-line', kpi: 'Investor communication & pitch deck' },
      ]
    : [
        { title: 'Conseil Stratégique', slug: 'conseil-strategique', icon: 'ri-lightbulb-line', kpi: 'La stratégie qui oriente votre communication' },
        { title: 'Transformation Digitale', slug: 'transformation-digitale', icon: 'ri-smartphone-line', kpi: "Activation des canaux digitaux" },
        { title: 'Levée de Fonds', slug: 'levee-de-fonds', icon: 'ri-funds-line', kpi: 'Communication investisseurs & pitch deck' },
      ];

  const faqItems = SERVICE_SCHEMAS['communication-strategique']['@graph']
    .find((g: { '@type': string }) => g['@type'] === 'FAQPage')
    ?.mainEntity?.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })) ?? [];

  return (
    <>
      <SeoHead
        title={isEn
          ? 'Strategic Communication Africa | Brand & Messaging | KHEPRA'
          : 'Communication Stratégique Afrique | Image de Marque | KHEPRA'}
        description={isEn
          ? 'Strategic communication & brand consulting for financial institutions in Africa. Investor messaging, digital presence, bilingual FR/EN. +65% brand recognition. KHEPRA EXPERTS, Lomé.'
          : 'Communication stratégique et image de marque pour institutions financières en Afrique. Messaging investisseurs, présence digitale bilingue FR/EN. +65% notoriété. Cabinet Lomé, Togo.'}
        keywords={isEn
          ? 'strategic communication Africa, brand identity financial institution, investor messaging Africa, digital communication UEMOA, public relations Africa'
          : 'communication stratégique Afrique, identité de marque institution financière, messaging investisseurs Afrique, communication digitale UEMOA, relations publiques Afrique'}
        ogImage="https://readdy.ai/api/search-image?query=African%20executive%20communications%20director%20presenting%20brand%20strategy%20on%20large%20premium%20screen%20in%20sleek%20dark%20boardroom%2C%20diverse%20professional%20team%20reviewing%20visual%20identity%20materials%20and%20messaging%20framework%2C%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20editorial%20photography&width=1440&height=900&seq=comm-strat-hero-green&orientation=landscape"
        ogImageWidth={1440}
        ogImageHeight={900}
        canonicalPath="/services/communication-strategique"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
        schemaJson={SERVICE_SCHEMAS['communication-strategique']}
        hreflangLinks={buildHreflang('/services/communication-strategique')}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: isEn ? 'Home' : 'Accueil', path: '/' },
            { label: 'Services', path: '/services' },
            { label: isEn ? 'Strategic Communication' : 'Communication Stratégique', path: '/services/communication-strategique' },
          ]}
        />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=African%20executive%20communications%20director%20presenting%20brand%20strategy%20on%20large%20premium%20screen%20in%20sleek%20dark%20boardroom%2C%20diverse%20professional%20team%20reviewing%20visual%20identity%20materials%20and%20messaging%20framework%2C%20sophisticated%20corporate%20atmosphere%20Lom%C3%A9%20Togo%20West%20Africa%20deloitte%20green%20accent%20lighting%20dark%20charcoal%20tones%20editorial%20photography&width=1440&height=900&seq=comm-strat-hero-green&orientation=landscape"
              alt={isEn ? 'Strategic Communication KHEPRA EXPERTS' : 'Communication Stratégique KHEPRA EXPERTS'}
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
                    {isEn ? 'Strategic Communication · KHEPRA EXPERTS' : 'Communication Stratégique · KHEPRA EXPERTS'}
                  </span>
                </div>

                <h1 className="font-playfair font-bold text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {isEn ? 'Your brand is your' : 'Votre marque est votre'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #f5e199, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'first business asset.' : 'premier actif commercial.'}
                  </span>
                </h1>

                <p className="text-lg mb-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, fontWeight: 300 }}>
                  {isEn
                    ? 'We build communication strategies that make investors trust you, clients choose you, and partners seek you out — in French and English, across every channel.'
                    : "Nous construisons des stratégies de communication qui font que les investisseurs vous font confiance, les clients vous choisissent et les partenaires vous sollicitent — en français et en anglais, sur tous les canaux."}
                </p>

                <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.2)' }}>
                  <i className="ri-check-double-line text-lg" style={{ color: '#22a05a' }} />
                  <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {isEn ? 'Brand identity · Digital strategy · Investor messaging · 22 years of field experience' : 'Identité de marque · Stratégie digitale · Messaging investisseurs · 22 ans terrain'}
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
                    {isEn ? 'Talk about your brand' : 'Parlons de votre marque'}
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
                  <i className="ri-global-line text-lg" style={{ color: '#c9a227' }} />
                  <div>
                    <p className="text-xs font-bold text-white">{isEn ? 'Bilingual FR / EN' : 'Bilingue FR / EN'}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{isEn ? 'Reach investors and partners across Africa' : 'Touchez investisseurs et partenaires partout en Afrique'}</p>
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
                <BigFourSubtitleBar label={isEn ? 'The invisible cost' : 'Le coût invisible'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-5 leading-tight">
                  {isEn ? 'A weak brand costs you' : 'Une marque faible vous coûte'}<br />
                  <span style={{ background: 'linear-gradient(90deg, #c9a227, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {isEn ? 'more than you realize.' : 'plus que vous ne le pensez.'}
                  </span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {isEn
                    ? 'In Africa, where networks and trust drive decisions, a fragmented or invisible brand is a direct competitive disadvantage. Every unclear message is a lost opportunity.'
                    : "En Afrique, où les réseaux et la confiance guident les décisions, une marque fragmentée ou invisible est un désavantage concurrentiel direct. Chaque message flou est une opportunité perdue."}
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
                    {isEn ? 'A brand that makes you the obvious choice.' : 'Une marque qui fait de vous le choix évident.'}
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
                  {isEn ? '4 phases to a powerful brand presence' : '4 phases vers une présence de marque puissante'}
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">
                  {isEn ? 'From audit to full deployment — every phase activates the next.' : "De l'audit au déploiement complet — chaque phase active la suivante."}
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
                  {isEn ? 'We build brands in every sector' : 'Nous construisons des marques dans tous les secteurs'}
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
                  {isEn ? 'A complete communication package' : 'Un package de communication complet'}
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
                      <p className="text-xs text-gray-400">{isEn ? 'Creative & tailored approach — bilingual FR/EN' : 'Approche créative sur mesure — bilingue FR/EN'}</p>
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
        <ServiceFAQ faq={faqItems} serviceName={isEn ? 'Strategic Communication' : 'Communication Stratégique'} />

        {/* ── SERVICE NAV ── */}
        <ServiceNavigation currentSlug="communication-strategique" />

        {/* ── SERVICES LIÉS ── */}
        <section className="py-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BigFourSubtitleBar label={isEn ? 'Complementary Services' : 'Services Complémentaires'} variant="left-accent" accentColor="primary" className="mb-10" />
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
                <BigFourSubtitleBar label={isEn ? 'Build your brand authority' : 'Construisez votre autorité de marque'} variant="left-accent" accentColor="primary" className="mb-5" />
                <h2 className="font-playfair text-3xl font-bold text-white mb-3 leading-tight">
                  {isEn ? 'Develop your brand image and reach.' : 'Développez votre image de marque et votre notoriété.'}
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
                  {isEn ? 'Talk about your communication' : 'Parlons de votre communication'}
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
            url={`${SITE_URL}/services/communication-strategique/`}
            title={isEn ? 'Strategic Communication — KHEPRA EXPERTS' : 'Communication Stratégique — KHEPRA EXPERTS'}
            variant="compact"
            className="justify-center"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}





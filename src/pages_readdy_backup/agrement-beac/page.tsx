import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogObservatoireAgrementsCTA from '@/components/feature/BlogObservatoireAgrementsCTA';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { FAQAccordion } from '@/components/feature/FAQAccordion';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const ETAPES_AGREMENT = [
  {
    step: '01',
    icon: 'ri-file-search-line',
    title: 'Étude de faisabilité & Business Plan',
    desc: 'Élaboration d\'une étude de faisabilité complète avec business plan sur 5 ans conforme aux exigences COBAC. Analyse du marché, projections financières, structuration du capital.',
    deliverables: ['Étude de faisabilité COBAC', 'Business plan 5 ans', 'Projections financières', 'Plan de financement'],
  },
  {
    step: '02',
    icon: 'ri-file-list-3-line',
    title: 'Constitution du dossier d\'agrément',
    desc: 'Montage complet du dossier administratif et réglementaire : statuts, manuels de procédures, politique LBC/FT, due diligence des dirigeants, programme d\'activité.',
    deliverables: ['Dossier administratif complet', 'Manuels de procédures', 'Politique LBC/FT', 'Due diligence dirigeants'],
  },
  {
    step: '03',
    icon: 'ri-government-line',
    title: 'Structuration de la gouvernance',
    desc: 'Mise en place d\'une gouvernance conforme COBAC : composition du CA, comités spécialisés, séparation des pouvoirs, administrateurs indépendants, plan de relève.',
    deliverables: ['Statuts et règlements intérieurs', 'Chartes des comités', 'Politique de gouvernance', 'Plan de relève'],
  },
  {
    step: '04',
    icon: 'ri-send-plane-line',
    title: 'Dépôt & Suivi du dossier',
    desc: 'Coordination avec les autorités (Ministère des Finances, COBAC, BEAC), suivi des demandes de compléments, réponses aux observations, accompagnement jusqu\'à l\'obtention.',
    deliverables: ['Suivi des échanges COBAC/BEAC', 'Réponses aux compléments', 'Coordination institutionnelle', 'Accompagnement jusqu\'à l\'agrément'],
  },
];

const CATEGORIES = [
  {
    title: 'Catégorie 1 — EMF de base',
    desc: 'Établissements qui collectent l\'épargne de leurs membres et leur consentent des crédits. Capital minimum : fixé par la réglementation nationale.',
    capital: 'Variable selon pays',
    forme: 'Coopérative / Mutuelle',
    gouvernance: 'Conseil d\'Administration + Direction',
  },
  {
    title: 'Catégorie 2 — EMF intermédiaire',
    desc: 'Établissements qui collectent l\'épargne et accordent des crédits à des tiers non-membres. SA obligatoire. Activité élargie.',
    capital: '300 millions FCFA',
    forme: 'Société Anonyme',
    gouvernance: 'CA + Comités spécialisés + Audit interne',
  },
  {
    title: 'Catégorie 3 — EMF de grande taille',
    desc: 'Établissements de microfinance de grande envergure avec un volume d\'activité significatif. Exigences prudentielles renforcées.',
    capital: '≥ 300 millions FCFA',
    forme: 'Société Anonyme',
    gouvernance: 'CA + 3 comités + Audit + Risques + Conformité',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce que l\'agrément BEAC et qui le délivre ?',
    answer: 'L\'agrément BEAC est l\'autorisation officielle délivrée aux établissements financiers pour exercer leur activité dans la zone CEMAC. Il est délivré par le Ministre des Finances de l\'État membre concerné, sur avis conforme obligatoire de la COBAC (Commission Bancaire de l\'Afrique Centrale) et avis technique de la BEAC (Banque des États de l\'Afrique Centrale). Sans cet agrément, aucune activité bancaire ou de microfinance n\'est légale en zone CEMAC.',
  },
  {
    question: 'Quels types d\'institutions ont besoin d\'un agrément BEAC/COBAC ?',
    answer: 'Doivent obtenir un agrément : les banques commerciales, les établissements de microfinance (EMF — catégories 1, 2 et 3), les établissements de paiement, les émetteurs de monnaie électronique, les sociétés de transfert d\'argent, les établissements de crédit-bail, et les sociétés financières spécialisées. Toute institution souhaitant exercer une activité financière régulée dans l\'un des 6 pays CEMAC doit être agréée.',
  },
  {
    question: 'Quels sont les délais pour obtenir un agrément COBAC ?',
    answer: 'Les délais varient selon la catégorie et la complétude du dossier : généralement entre 6 et 18 mois. La phase de constitution du dossier prend 2 à 4 mois avec notre accompagnement. L\'instruction par les autorités (COBAC + BEAC + Ministère) prend 4 à 12 mois selon les demandes de compléments. Nous optimisons ces délais grâce à une préparation rigoureuse et une coordination proactive.',
  },
  {
    question: 'Quel est le capital minimum requis pour un EMF en zone CEMAC ?',
    answer: 'Le capital minimum dépend de la catégorie. Pour la catégorie 2 (EMF intermédiaire), le capital minimum est de 300 millions FCFA intégralement libéré (Règlement COBAC R-2017/03). Pour la catégorie 3, le seuil est au minimum de 300 millions FCFA mais peut être supérieur selon le volume d\'activité projeté. Pour la catégorie 1, le capital est fixé par la réglementation nationale de chaque État.',
  },
  {
    question: 'KHEPRA EXPERTS peut-il m\'accompagner pour un agrément au Cameroun, au Gabon ou au Congo ?',
    answer: 'Oui absolument. Nous accompagnons les projets d\'agrément dans tous les pays CEMAC. Notre fondateur a personnellement obtenu un agrément COBAC pour Atlantique Microfinance (AMIFA) au Gabon, avec une expérience directe du processus. Nous maîtrisons les spécificités réglementaires nationales en plus du cadre COBAC/BEAC supranational.',
  },
];

const DIFFERENTIATORS = [
  {
    icon: 'ri-award-line',
    title: 'Expérience directe d\'agrément COBAC',
    desc: 'Notre fondateur a personnellement conduit le processus d\'agrément COBAC pour AMIFA au Gabon — du dossier initial à l\'obtention effective. Une expérience terrain irremplaçable.',
  },
  {
    icon: 'ri-file-list-3-line',
    title: 'Dossier complet clé en main',
    desc: 'Nous prenons en charge l\'intégralité du dossier : étude de faisabilité, business plan, manuels de procédures, politique LBC/FT, due diligence, statuts. Vous vous concentrez sur votre projet.',
  },
  {
    icon: 'ri-government-line',
    title: 'Coordination institutionnelle',
    desc: 'Nous assurons la liaison avec le Ministère des Finances, la COBAC et la BEAC tout au long du processus. Réponses aux demandes de compléments, suivi proactif des délais.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Conformité post-agrément',
    desc: 'Notre accompagnement ne s\'arrête pas à l\'obtention de l\'agrément. Nous assurons le suivi post-agrément et la mise en conformité continue avec les exigences COBAC.',
  },
];

export default function AgrementBEACPage() {
  const navigate = useNavigate();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Agrément BEAC/COBAC — Dossier & Accompagnement | KHEPRA EXPERTS',
    description: 'Obtenez votre agrément BEAC/COBAC en zone CEMAC avec l\'accompagnement expert de KHEPRA EXPERTS. Dossier complet, business plan, due diligence. Expérience directe d\'agrément au Gabon.',
    inLanguage: 'fr-FR',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Agrément BEAC/COBAC — Dossier & Accompagnement', item: `${SITE_URL}/agrement-beac` },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <SeoHead
        title="Agrément BEAC/COBAC — Dossier & Accompagnement | Obtention Licence CEMAC | KHEPRA EXPERTS"
        description="Accompagnement complet pour votre agrément BEAC/COBAC en zone CEMAC. Dossier clé en main, business plan, due diligence dirigeants, coordination COBAC/BEAC. Expérience directe d'agrément au Gabon. Diagnostic gratuit."
        keywords="agrément BEAC, agrément COBAC, dossier agrément CEMAC, licence bancaire CEMAC, agrément microfinance CEMAC, agrément EMF COBAC, capital minimum EMF CEMAC, agrément établissement financier Afrique Centrale, BEAC COBAC licence, KHEPRA EXPERTS agrément"
        canonicalPath="/agrement-beac"
        schemaJson={{ ...schema, ...faqSchema }}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(165deg, #080c14 0%, #0c1420 30%, #111b2a 60%, #0a101c 100%)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(rgba(134,188,37,0.9) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 75% 15%, rgba(134,188,37,0.10) 0%, transparent 55%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full border border-deloitte-400/20" style={{ background: 'rgba(134,188,37,0.06)' }}>
                <i className="ri-bank-line text-sm text-deloitte-400" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-deloitte-400">Agrément & Licences — Zone CEMAC</span>
              </div>
              <h1 className="font-display font-bold text-white mb-5 max-w-4xl leading-[1.08]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                Agrément BEAC/COBAC : obtenez votre licence bancaire en zone CEMAC
              </h1>
              <p className="text-lg font-medium max-w-3xl mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                L'agrément BEAC/COBAC est le sésame obligatoire pour tout établissement financier en Afrique Centrale. KHEPRA EXPERTS vous accompagne de A à Z — de l'étude de faisabilité à l'obtention effective de votre agrément, en passant par la coordination avec la COBAC et la BEAC.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8">
                {[
                  { val: 'Cameroun', label: 'Gabon, Congo, Tchad...' },
                  { val: '6-18', label: 'mois de processus' },
                  { val: '300M+', label: 'FCFA capital minimum Cat. 2' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display font-bold text-deloitte-400" style={{ fontSize: 'clamp(1.1rem, 2.3vw, 1.6rem)' }}>{s.val}</div>
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  Analyse gratuite de votre projet
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-white border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <i className="ri-file-list-3-line mr-2" />
                  Démarrer votre dossier d'agrément
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.25), transparent)' }} />
        </section>

        {/* ═══════════ CATÉGORIES EMF ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Classification COBAC</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Les 3 catégories d'Établissements de Microfinance (EMF)</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">La COBAC classe les EMF en trois catégories selon leur activité et leur taille. Notre accompagnement couvre les trois catégories.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CATEGORIES.map((cat, i) => (
                <div key={i} className="rounded-2xl p-6 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 transition-all hover:-translate-y-1 group">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className="ri-building-2-line text-lg text-deloitte-500" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-[15px]">{cat.title}</h3>
                  <p className="text-[13px] text-neutral-500 mb-4 leading-relaxed">{cat.desc}</p>
                  <div className="space-y-2 pt-4 border-t border-neutral-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Capital minimum</span>
                      <span className="font-bold text-deloitte-600">{cat.capital}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Forme juridique</span>
                      <span className="font-medium text-neutral-700">{cat.forme}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Gouvernance</span>
                      <span className="font-medium text-neutral-700">{cat.gouvernance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PROCESSUS ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Notre accompagnement</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Les 4 étapes vers votre agrément BEAC/COBAC</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {ETAPES_AGREMENT.map((etape, i) => (
                <div key={i} className="relative text-center group">
                  {i < ETAPES_AGREMENT.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(134,188,37,0.4), rgba(134,188,37,0.08))' }} />
                  )}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center font-display text-xl font-bold transition-all group-hover:scale-110 bg-deloitte-50 text-deloitte-600 border-2 border-deloitte-200/50">{etape.step}</div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-2">{etape.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{etape.desc}</p>
                  <div className="text-left pt-3 border-t border-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1 block">Livrables</span>
                    <ul className="space-y-1">
                      {etape.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-[11px] text-neutral-600">
                          <i className="ri-check-line flex-shrink-0 mt-0.5 text-deloitte-500 text-xs" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ POURQUOI KHEPRA ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Pourquoi KHEPRA</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">L'expertise qui fait la différence pour votre agrément</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {DIFFERENTIATORS.map((d, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-neutral-200/70 hover:border-deloitte-200/60 transition-all" style={{ background: '#fafbfc' }}>
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className={`${d.icon} text-lg text-deloitte-500`} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-2">{d.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>

            {/* Founder callout */}
            <div className="mt-10 rounded-2xl p-8 border border-deloitte-200/40" style={{ background: 'linear-gradient(135deg, rgba(134,188,37,0.06), rgba(134,188,37,0.02))' }}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center bg-deloitte-100 rounded-full shrink-0">
                  <i className="ri-user-star-line text-deloitte-600 text-2xl" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-deloitte-600 text-xs font-semibold uppercase tracking-widest mb-1">Expérience directe — Agrément COBAC</p>
                  <p className="font-bold text-neutral-900 text-lg mb-2">SIMDA Essoyomèwè — Fondateur KHEPRA EXPERTS</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Directeur Général d'Atlantique Microfinance (AMIFA) au Gabon (2016–2020). A conduit personnellement le processus complet d'agrément COBAC pour AMIFA — du dossier initial à l'obtention effective. Management de 30+ collaborateurs sous supervision COBAC directe. Cette expérience terrain est intégrée dans notre méthodologie d'accompagnement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">FAQ</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Vos questions sur l'agrément BEAC/COBAC</h2>
            </div>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* Cross-link: Hub Agréments Afrique & Observatoire */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogObservatoireAgrementsCTA variant="both" context="agrement" />
          </div>
        </section>

        {/* ═══════════ CTA FINAL ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-8 md:p-12 border border-deloitte-200/40" style={{ background: 'linear-gradient(135deg, rgba(134,188,37,0.04), rgba(134,188,37,0.01))' }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Votre projet mérite le bon agrément</h2>
              <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                Ne laissez pas la complexité du processus COBAC/BEAC retarder votre projet. Bénéficiez de notre expérience terrain pour sécuriser votre dossier d'agrément.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-calendar-check-line mr-2" />
                  Analyse gratuite de votre projet
                </a>
                <button onClick={() => navigate('/contact')}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-neutral-700 border border-neutral-200 hover:border-neutral-300">
                  <i className="ri-mail-line mr-2" />
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}




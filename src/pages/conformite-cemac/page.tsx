import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { FAQAccordion } from '@/components/feature/FAQAccordion';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const CEMAC_COUNTRIES = [
  { name: 'Cameroun', flag: '🇨🇲', capital: 'Yaoundé', status: 'Marché principal' },
  { name: 'Gabon', flag: '🇬🇦', capital: 'Libreville', status: 'Expérience directe' },
  { name: 'Congo', flag: '🇨🇬', capital: 'Brazzaville', status: 'Zone active' },
  { name: 'Tchad', flag: '🇹🇩', capital: "N'Djamena", status: 'Zone active' },
  { name: 'Rép. Centrafricaine', flag: '🇨🇫', capital: 'Bangui', status: 'Zone active' },
  { name: 'Guinée Équatoriale', flag: '🇬🇶', capital: 'Malabo', status: 'Zone active' },
];

const PILLARS = [
  {
    icon: 'ri-bank-line',
    title: 'Conformité prudentielle BEAC',
    desc: 'Respect des ratios de solvabilité, liquidité, division des risques et fonds propres conformément aux règlements COBAC et aux standards Bâle II/III applicables en zone CEMAC.',
    points: ['Ratio de solvabilité ≥ 8%', 'Division des risques ≤ 25% FPN', 'LCR et NSFR progressifs', 'Reporting prudentiel BEAC'],
    ref: 'COBAC R-2016/03, R-2020/01, Bâle II/III',
  },
  {
    icon: 'ri-government-line',
    title: 'Gouvernance institutionnelle',
    desc: 'Structuration des organes de gouvernance selon les exigences COBAC : Conseil d\'Administration, comités spécialisés, séparation des pouvoirs, administrateurs indépendants.',
    points: ['Composition du CA conforme COBAC', 'Comités spécialisés fonctionnels', 'Politique de conflits d\'intérêts', 'Plan de relève documenté'],
    ref: 'COBAC R-2016/04, OHADA AUSCGIE',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Contrôle interne & Audit',
    desc: 'Mise en place d\'un dispositif de contrôle interne robuste, cartographie des risques COSO, audit interne indépendant, mécanismes de remontée d\'alerte.',
    points: ['Cartographie COSO des processus', 'Audit interne indépendant', 'Contrôle permanent documenté', 'Lanceurs d\'alerte protégés'],
    ref: 'COBAC R-2016/04, COSO 2013',
  },
  {
    icon: 'ri-fingerprint-line',
    title: 'LBC/FT — Conformité GABAC',
    desc: 'Dispositif complet de lutte contre le blanchiment et le financement du terrorisme conforme au Règlement CEMAC n°01/16 et aux recommandations du GAFI.',
    points: ['KYC et due diligence renforcée', 'Déclarations de soupçon ANIF', 'Formation LBC/FT obligatoire', 'Gel des avoirs et sanctions'],
    ref: 'Règlement CEMAC n°01/16, GAFI 2023, GABAC',
  },
  {
    icon: 'ri-file-list-3-line',
    title: 'Agrément & Licences',
    desc: 'Accompagnement complet pour l\'obtention ou le renouvellement d\'agrément COBAC : dossier, business plan, manuels de procédures, due diligence des dirigeants.',
    points: ['Dossier d\'agrément complet', 'Business plan 5 ans COBAC', 'Manuels de procédures', 'Due diligence dirigeants'],
    ref: 'COBAC R-2017/03, R-2017/04',
  },
  {
    icon: 'ri-computer-line',
    title: 'Sécurité SI & PCA',
    desc: 'Conformité au nouveau Règlement COBAC R-2024/01 sur la gouvernance des systèmes d\'information : politique de sécurité, PCA/PRA, notification des incidents au SG-COBAC.',
    points: ['Politique sécurité SI documentée', 'PCA/PRA testés annuellement', 'Notification incidents SG-COBAC', 'Responsabilité CA formalisée'],
    ref: 'COBAC R-2024/01 (en vigueur 01/01/2025)',
  },
];

const METHODOLOGY = [
  { step: '01', icon: 'ri-search-eye-line', title: 'Diagnostic de conformité', desc: 'Audit exhaustif de votre dispositif actuel par rapport aux exigences COBAC/BEAC. Identification de tous les écarts réglementaires et évaluation de leur criticité.', duration: '2-3 semaines' },
  { step: '02', icon: 'ri-file-list-3-line', title: 'Plan de mise en conformité', desc: 'Élaboration d\'une feuille de route détaillée avec actions correctives priorisées, calendrier contraignant, responsables désignés et indicateurs de suivi.', duration: '1-2 semaines' },
  { step: '03', icon: 'ri-tools-line', title: 'Mise en œuvre opérationnelle', desc: 'Accompagnement terrain pour la mise en œuvre des actions : rédaction des procédures, formation des équipes, restructuration de la gouvernance.', duration: '2-4 mois' },
  { step: '04', icon: 'ri-bar-chart-line', title: 'Suivi & veille continue', desc: 'Monitoring de la conformité, ajustements réglementaires, reporting périodique au Conseil et mise à jour de la matrice de conformité.', duration: 'Continu' },
];

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce que la conformité CEMAC et pourquoi est-elle obligatoire ?',
    answer: 'La conformité CEMAC désigne le respect par les établissements financiers de l\'ensemble des règles édictées par la BEAC et la COBAC dans la zone CEMAC (6 pays d\'Afrique Centrale). Elle est obligatoire car tout manquement expose l\'établissement à des sanctions administratives et pécuniaires pouvant aller jusqu\'au retrait d\'agrément. La COBAC dispose de pouvoirs de contrôle sur place et sur pièces pour vérifier cette conformité.',
  },
  {
    question: 'Quelles institutions sont concernées par la réglementation CEMAC ?',
    answer: 'Sont concernées : les banques commerciales, les établissements de microfinance (EMF — catégories 1, 2 et 3), les établissements de paiement, les émetteurs de monnaie électronique, les sociétés de transfert d\'argent, et plus généralement tout établissement agréé par la COBAC dans l\'un des 6 États membres de la CEMAC.',
  },
  {
    question: 'Quelle est la différence entre conformité UEMOA et conformité CEMAC ?',
    answer: 'Les deux zones partagent des principes communs (Bâle II/III, GAFI, COSO) mais les cadres réglementaires sont distincts. La zone UEMOA est régie par la BCEAO et le SG-CB-UMOA, avec des seuils prudentiels différents (ex : division des risques ≤ 75% en UEMOA contre ≤ 25% en CEMAC depuis 2023). La zone CEMAC est régie par la BEAC et la COBAC, avec ses propres règlements. KHEPRA EXPERTS maîtrise les deux cadres.',
  },
  {
    question: 'En combien de temps une institution peut-elle être mise en conformité ?',
    answer: 'Le délai dépend de la taille de l\'établissement et de l\'ampleur des écarts identifiés. Le diagnostic initial est livré sous 2 à 3 semaines. Pour une mise en conformité complète, il faut généralement compter 2 à 6 mois selon le nombre d\'axes à traiter. Nous vous fournissons un calendrier réaliste dès la phase de diagnostic.',
  },
  {
    question: 'KHEPRA EXPERTS intervient-il dans tous les pays CEMAC ?',
    answer: 'Oui. Nous intervenons dans les 6 pays de la zone CEMAC : Cameroun, Congo, Gabon, Guinée Équatoriale, République Centrafricaine et Tchad. Notre fondateur dispose d\'une expérience directe au Gabon (direction d\'AMIFA, agrément COBAC). Nous avons un réseau de partenaires locaux dans chaque pays.',
  },
];

const DIFFERENTIATORS = [
  {
    icon: 'ri-map-pin-2-line',
    title: 'Présence terrain dans les 6 pays CEMAC',
    desc: 'Notre fondateur a dirigé AMIFA au Gabon sous supervision COBAC directe. Nous maîtrisons les spécificités réglementaires locales en plus du cadre supranational COBAC/BEAC.',
  },
  {
    icon: 'ri-scales-line',
    title: 'Double expertise UEMOA + CEMAC',
    desc: 'Cabinet maîtrisant les cadres BCEAO et BEAC — un avantage décisif pour les institutions actives dans les deux zones monétaires. Couverture panafricaine opérationnelle.',
  },
  {
    icon: 'ri-shield-star-line',
    title: 'Méthodologie alignée standards internationaux',
    desc: 'Nos protocoles sont calibrés sur COBAC, COSO, Bâle II/III et les meilleures pratiques internationales — adaptés aux réalités opérationnelles des institutions d\'Afrique Centrale.',
  },
  {
    icon: 'ri-time-line',
    title: 'Délais maîtrisés',
    desc: 'Grâce à notre connaissance approfondie des processus COBAC, nous optimisons les délais de mise en conformité — en moyenne 3 à 6 mois selon la complexité du dossier.',
  },
];

export default function ConformiteCEMACPage() {
  const navigate = useNavigate();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Conformité CEMAC — Mise en Conformité BEAC/COBAC | KHEPRA EXPERTS',
    description: 'Accompagnement complet à la conformité CEMAC pour les institutions financières d\'Afrique Centrale. Diagnostic, plan de mise en conformité et suivi continu. Expertise BEAC/COBAC dans les 6 pays de la zone CEMAC.',
    inLanguage: 'fr-FR',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Conformité CEMAC — Mise en Conformité BEAC/COBAC', item: `${SITE_URL}/conformite-cemac` },
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
        title="Conformité CEMAC — Mise en Conformité BEAC/COBAC | Institutions Financières Afrique Centrale | KHEPRA EXPERTS"
        description="Expert en conformité CEMAC pour les banques, EMF et fintechs en Afrique Centrale. Accompagnement complet BEAC/COBAC : diagnostic, plan de mise en conformité, suivi continu. 6 pays CEMAC, Cameroun, Gabon, Congo. Diagnostic gratuit."
        keywords="conformité CEMAC, mise en conformité CEMAC, réglementation CEMAC, BEAC COBAC conformité, conformité prudentielle CEMAC, gouvernance CEMAC, LBC FT CEMAC, agrément CEMAC, conformité banque Afrique Centrale, KHEPRA EXPERTS CEMAC"
        canonicalPath="/conformite-cemac"
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
                <i className="ri-global-line text-sm text-deloitte-400" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-deloitte-400">Conformité Réglementaire — Zone CEMAC</span>
              </div>
              <h1 className="font-display font-bold text-white mb-5 max-w-4xl leading-[1.08]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                Conformité CEMAC : votre établissement est-il vraiment en règle ?
              </h1>
              <p className="text-lg font-medium max-w-3xl mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                La réglementation COBAC/BEAC évolue en permanence. Bâle III, R-2024/01 sur les SI, renforcement LBC/FT. KHEPRA EXPERTS vous accompagne dans la mise en conformité intégrale de votre institution financière en zone CEMAC — diagnostic, plan d'action et suivi continu.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                {['BEAC', 'COBAC', 'Bâle II/III', 'GABAC', 'GAFI', 'COSO', 'R-2024/01 SI'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-white/8" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>{tag}</span>
                ))}
              </div>

              {/* CEMAC Countries */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {CEMAC_COUNTRIES.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <span>{c.flag}</span>
                    <span className="text-white">{c.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  Diagnostic conformité gratuit
                </a>
                <button
                  onClick={() => navigate('/tools/evaluation-conformite-reglementaire')}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-white border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <i className="ri-shield-check-line mr-2" />
                  Évaluer ma conformité CEMAC
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.25), transparent)' }} />
        </section>

        {/* ═══════════ 6 PILIERS ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Les 6 piliers de la conformité CEMAC</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Le cadre réglementaire complet couvert par nos experts</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-[15px]">Notre approche couvre l'intégralité des exigences BEAC/COBAC pour les institutions financières en zone CEMAC.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PILLARS.map((pillar, i) => (
                <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-neutral-200/70 hover:border-deloitte-200/60 group">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-4 bg-deloitte-50 border border-deloitte-200/40">
                    <i className={`${pillar.icon} text-lg text-deloitte-500`} />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2 text-[15px]">{pillar.title}</h3>
                  <p className="text-[13px] text-neutral-500 mb-4 leading-relaxed">{pillar.desc}</p>
                  <ul className="space-y-1.5 mb-3">
                    {pillar.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-[12px] text-neutral-600">
                        <i className="ri-check-line flex-shrink-0 mt-0.5 text-deloitte-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-neutral-100">
                    <span className="text-[10px] text-neutral-400 italic">{pillar.ref}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ MÉTHODOLOGIE ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Notre méthode</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">4 phases vers la conformité CEMAC intégrale</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {METHODOLOGY.map((phase, i) => (
                <div key={i} className="relative text-center group">
                  {i < METHODOLOGY.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(134,188,37,0.4), rgba(134,188,37,0.08))' }} />
                  )}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center font-display text-xl font-bold transition-all group-hover:scale-110 bg-deloitte-50 text-deloitte-600 border-2 border-deloitte-200/50">{phase.step}</div>
                  <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2" style={{ background: 'rgba(134,188,37,0.1)', color: '#86BC25' }}>{phase.duration}</div>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">{phase.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{phase.desc}</p>
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
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Votre partenaire conformité en Afrique Centrale</h2>
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
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="py-16 md:py-20" style={{ background: '#fafbfc' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">FAQ</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Tout savoir sur la conformité CEMAC</h2>
            </div>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ═══════════ CTA FINAL ═══════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-8 md:p-12 border border-deloitte-200/40" style={{ background: 'linear-gradient(135deg, rgba(134,188,37,0.04), rgba(134,188,37,0.01))' }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Votre conformité CEMAC commence aujourd'hui</h2>
              <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
                Ne laissez pas les exigences BEAC/COBAC freiner votre développement en Afrique Centrale. Diagnostiquez votre conformité en 8 minutes — gratuit, confidentiel, sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/essochamanu/consultation-strategique-30min" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-black"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)' }}>
                  <i className="ri-stethoscope-line mr-2" />
                  Diagnostic conformité gratuit
                </a>
                <button onClick={() => navigate('/contact')}
                  className="px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all hover:scale-105 text-neutral-700 border border-neutral-200 hover:border-neutral-300">
                  <i className="ri-mail-line mr-2" />
                  Contacter nos experts CEMAC
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
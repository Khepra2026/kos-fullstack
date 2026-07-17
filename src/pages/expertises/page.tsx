import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import ScrollReveal from '@/components/feature/ScrollReveal';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const bus = [
  {
    id: 'regulation',
    icon: 'ri-bank-line',
    title: 'Régulation Financière',
    subtitle: 'BCEAO · COBAC · BEAC · Commission Bancaire UMOA',
    description: 'Expertise exclusive en régulation prudentielle des institutions financières africaines. Pré-inspection, contrôle interne, LBC/FT, agrément SFD/EMF, ratios prudentiels, ICAAP/ILAAP, plans préventifs de redressement.',
    expertise: [
      'Pré-inspection BCEAO/COBAC — 215 points de contrôle',
      'Dispositif LBC/FT 8 piliers — GAFI, GIABA, GABAC',
      'Agrément SFD/EMF/Établissement de paiement',
      'Contrôle interne bancaire — COSO & Circulaires CB-UMOA',
      'Ratios prudentiels — Bâle II/III, solvabilité, liquidité',
      'Plans Préventifs de Redressement (PPR) — Circulaire 001-2020',
    ],
    refs: ['Circulaires CB-UMOA 01, 02, 03-2017', 'Circulaire 001-2020/CB/C', 'GAFI 40 Recommandations (2023)', 'COSO Internal Control 2023', 'Bâle II/III — Dispositif UEMOA 2024'],
    href: '/regulation-financiere',
    ctaLabel: 'Explorer la BU Régulation',
    accent: '#86BC25',
  },
  {
    id: 'prix-transfert',
    icon: 'ri-exchange-funds-line',
    title: 'Prix de Transfert & Fiscalité Internationale',
    subtitle: 'OCDE BEPS · UEMOA · CEMAC · Documentation',
    description: 'Expertise approfondie en prix de transfert et fiscalité internationale pour les groupes multinationaux opérant en Afrique. Master File, Local File, benchmarking, défense fiscale, APA.',
    expertise: [
      'Documentation BEPS Action 13 — Master File & Local File',
      'Analyse fonctionnelle FAR — fonctions, actifs, risques',
      'Benchmarking & comparables africains',
      'Défense en contrôle fiscal — contentieux & négociation',
      'APA — Accords Préalables de Prix',
      'Fiscalité des groupes & conventions fiscales',
    ],
    refs: ['OCDE BEPS Action 13 (révisé 2023)', 'Directive UEMOA 01/2011/CM/UEMOA', 'Règlement CEMAC 01/18-CEMAC-UMAC-DFLC', 'Modèle Convention Fiscale OCDE 2017', 'Principes OCDE applicables en matière de PT'],
    href: '/prix-de-transfert',
    ctaLabel: 'Explorer la BU Prix de Transfert',
    accent: '#D4AF37',
  },
  {
    id: 'grc',
    icon: 'ri-shield-check-line',
    title: 'Gouvernance, Risques & Conformité',
    subtitle: 'ERM · Audit Interne · Conseil CA · ESG',
    description: 'Expertise en gouvernance d\'entreprise, gestion des risques et conformité pour les institutions financières, groupes familiaux et entreprises. Approche intégrée GRC alignée sur les meilleurs standards internationaux.',
    expertise: [
      'ERM — Cartographie des risques COSO ERM / ISO 31000',
      'Audit interne — COSO 2023 & Normes IIA (IPPF 2024)',
      'Conseil d\'Administration — structuration & évaluation',
      'Gouvernance des groupes familiaux — OHADA AUSCGIE',
      'Conformité ESG — IFC PS, GRI, ISSB, Taxonomie Verte',
      'Protection des données — RGPD, Malabo, UEMOA',
    ],
    refs: ['COSO ERM 2017 & Internal Control 2023', 'ISO 31000:2018', 'IIA — IPPF 2024', 'AUSCGIE OHADA (révisé 2014)', 'IFC Performance Standards 1-8'],
    href: '/gouvernance-risques',
    ctaLabel: 'Explorer la BU GRC',
    accent: '#6B9B1F',
  },
  {
    id: 'think-tank',
    icon: 'ri-lightbulb-flash-line',
    title: 'Think Tank — Recherche & Prospective',
    subtitle: 'Publications · Position Papers · Policy Briefs · Conférences',
    description: 'Centre de recherche indépendant produisant des analyses prospectives et des études sectorielles pour éclairer les décideurs, régulateurs et investisseurs sur les grandes transformations réglementaires en Afrique francophone.',
    expertise: [
      'Position Papers — analyses approfondies pour décideurs',
      'Policy Briefs — recommandations opérationnelles',
      'Études Sectorielles — 8 filières, 12 pays',
      'Prospective Réglementaire — scénarios à 2-5 ans',
      'Working Papers — recherche empirique originale',
      'Conférences & Événements — dialogues régulateurs-opérateurs',
    ],
    refs: ['Standards de recherche académique', 'Méthodologie Big Four', 'Partenariats universitaires', 'Publications citées par régulateurs', 'Rapport Annuel Think Tank 2025'],
    href: '/think-tank',
    ctaLabel: 'Explorer le Think Tank',
    accent: '#C05A3A',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/expertises#webpage`,
      url: `${SITE_URL}/expertises`,
      name: 'Expertises | 3 Business Units + Think Tank — Régulation, Prix de Transfert, GRC & Recherche',
      description: '4 domaines d\'expertise exclusifs : Régulation Financière (BCEAO/COBAC), Prix de Transfert (BEPS/OCDE), Gouvernance Risques & Conformité (ERM/COSO) et Think Tank (Recherche & Prospective). Aucune expertise générique.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Expertises', item: `${SITE_URL}/expertises` },
        ],
      },
    },
  ],
};

export default function ExpertisesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Expertises | Régulation Financière, Prix de Transfert, Gouvernance & Think Tank — Afrique Francophone"
        description="4 domaines d'expertise exclusifs : Régulation Financière (BCEAO, COBAC, BEAC), Prix de Transfert (BEPS, OCDE), Gouvernance Risques & Conformité (ERM, COSO, IIA) et Think Tank (Recherche & Prospective). Standards Big Four."
        keywords="expertises conseil Afrique, régulation financière BCEAO, prix de transfert Afrique, gouvernance risques Afrique, think tank réglementaire, KHEPRA EXPERTS, expertise COBAC, fiscalité internationale Afrique"
        canonicalPath="/expertises"
        ogType="website"
        ogImage={OG_IMAGES.SERVICES}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        schemaJson={schemaData}
      />
      <Navigation />

      <main className="pt-32 pb-20" id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'Expertises', href: '/expertises' },
          ]} />
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(134,188,37,0.06)', border: '1px solid rgba(134,188,37,0.12)' }}>
              <i className="ri-star-line text-sm" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B9B1F' }}>4 Domaines d'Expertise — Standards Big Four</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#0a0a0a', letterSpacing: '-0.035em' }}>
              Nos expertises sont
              <span style={{ background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 55%, #6B9B1F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> exclusivement</span>
              <br />réglementaires et institutionnelles
            </h1>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(0,0,0,0.55)', fontWeight: 350 }}>
              KHEPRA EXPERTS ne fait pas de conseil générique. Nos 4 domaines d'expertise sont exclusivement centrés sur la régulation financière, la fiscalité internationale, la gouvernance des risques et la recherche prospective en Afrique francophone. Chaque domaine est adossé à des référentiels réglementaires précis et à une pratique terrain de 22 ans.
            </p>
          </div>
        </section>

        {/* 4 BU Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {bus.map((bu, index) => (
              <ScrollReveal key={bu.id} animation="fadeSlideUp" delay={index * 100}>
                <div
                  className="group rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{ background: '#fafaf8', border: '1px solid rgba(134,188,37,0.06)' }}
                  onClick={() => navigate(bu.href)}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: `${bu.accent}12`, border: `1px solid ${bu.accent}25` }}>
                      <i className={`${bu.icon} text-xl`} style={{ color: bu.accent }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1 line-clamp-2" style={{ color: '#0a0a0a' }} title={bu.title}>{bu.title}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wider line-clamp-1" style={{ color: bu.accent }} title={bu.subtitle}>{bu.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'rgba(0,0,0,0.55)' }} title={bu.description}>{bu.description}</p>

                  {/* Expertise list */}
                  <div className="mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider mb-2 block" style={{ color: 'rgba(0,0,0,0.30)' }}>Domaines d'intervention</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {bu.expertise.map((exp, ei) => (
                        <div key={ei} className="flex items-start gap-2">
                          <i className="ri-check-line text-xs mt-0.5 flex-shrink-0" style={{ color: '#86BC25' }} />
                          <span className="text-xs leading-snug line-clamp-1" style={{ color: 'rgba(0,0,0,0.55)' }} title={exp}>{exp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Référentiels */}
                  <div className="mb-5 pt-3" style={{ borderTop: '1px solid rgba(134,188,37,0.06)' }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider mb-2 block" style={{ color: 'rgba(0,0,0,0.30)' }}>Référentiels</span>
                    <div className="flex flex-wrap gap-1.5">
                      {bu.refs.map((ref, ri) => (
                        <span key={ri} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgba(134,188,37,0.04)', color: '#6B9B1F' }}>{ref}</span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: bu.accent }}>
                    <span>{bu.ctaLabel}</span>
                    <i className="ri-arrow-right-line" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Why KHEPRA */}
        <section className="py-16" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-6">Pourquoi cette spécialisation extrême ?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { icon: 'ri-focus-3-line', title: 'Profondeur > Largeur', text: 'Les cabinets généralistes diluent leur expertise. KHEPRA se concentre exclusivement sur ce qu\'il maîtrise : la régulation financière, la fiscalité internationale, la gouvernance et la recherche en Afrique francophone.' },
                { icon: 'ri-shield-check-line', title: 'Crédibilité réglementaire', text: 'Chaque expertise est adossée à des référentiels précis (BCEAO, COBAC, GAFI, OCDE, COSO, IIA). Nos analyses sont citées par les régulateurs et nos publications alimentent le débat institutionnel.' },
                { icon: 'ri-bar-chart-grouped-line', title: 'Résultats mesurables', text: '96% de conformité post-mission, 47 écarts critiques résorbés en moyenne, -87% de redressement fiscal. Chaque mission produit des résultats documentés et vérifiables.' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(134,188,37,0.08)' }}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-3" style={{ background: 'rgba(134,188,37,0.10)' }}>
                    <i className={`${item.icon} text-lg`} style={{ color: '#86BC25' }} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
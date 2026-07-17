import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
import {
  getAllActiveLeadMagnets,
  getLeadMagnetCategories,
  LEAD_MAGNETS,
  type LeadMagnet,
} from '@/mocks/leadMagnets';
import LeadMagnetCard from '@/components/feature/LeadMagnetCard';

const FORM_URLS: Record<string, string> = {
  'checklist-conformite-bceao-cobac': 'https://readdy.ai/api/form/d8g0of3tvf9bji89p1e0',
  'guide-bceao-2026': 'https://readdy.ai/api/form/d8g5dtbtvf9bji89p3k0',
  'guide-levee-fonds-afrique': 'https://readdy.ai/api/form/d8g0ofrtvf9bji89p1eg',
  'simulation-risque-reglementaire': 'https://readdy.ai/api/form/d8g0ofrtvf9bji89p1f0',
  'template-audit-gouvernance': 'https://readdy.ai/api/form/d8g0ogrtvf9bji89p1fg',
  'mini-rapport-due-diligence': 'https://readdy.ai/api/form/d8g0ogrtvf9bji89p1g0',
  'diagnostic-esg-maturite': 'https://readdy.ai/api/form/d8g0ogrtvf9bji89p1gg',
  'diagnostic-flash-conformite-bceao-cobac-2026': 'https://readdy.ai/api/form/d8isqi3700fk75v20mlg',
  'guide-prix-transfert-beps-afrique': 'https://readdy.ai/api/form/d8tpnc4al24muhn2r9r0',
  'simulateur-agrement-microfinance-cemac': 'https://readdy.ai/api/form/d8uer2r9akq3s3aso8jg',
  'barometre-regtech-uemoa-2026': 'https://readdy.ai/api/form/d96m2jf0d76aer3t5610',
  'compliance-ohada-kos-ai': 'https://readdy.ai/api/form/d96m2jf0d76aer3t561g',
  'cartographie-risques-bancaires-afrique': 'https://readdy.ai/api/form/d96m2jf0d76aer3t5620',
};

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Tous',
  conformite: 'Conformité & Régulation',
  finance: 'Finance & Investissement',
  esg: 'ESG & Gouvernance',
  gouvernance: 'Gouvernance',
  'due-diligence': 'Due Diligence',
};

const CATEGORY_ACCENT: Record<string, string> = {
  all: '#374151',
  conformite: '#c9a227',
  finance: '#22a05a',
  esg: '#22a05a',
  gouvernance: '#22a05a',
  'due-diligence': '#22a05a',
};

const STATS = [
  { value: '9', label: 'Ressources gratuites', icon: 'ri-gift-line' },
  { value: '167', label: 'Points de contrôle', icon: 'ri-check-double-line' },
  { value: '129', label: 'Critères d\'évaluation', icon: 'ri-bar-chart-2-line' },
  { value: '48h', label: 'Délai max de livraison', icon: 'ri-time-line' },
];

const leadMagnetsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/lead-magnets#webpage`,
      url: `${SITE_URL}/lead-magnets`,
      name: 'Ressources Gratuites — Conformité, Finance, ESG | KHEPRA EXPERTS',
      description: '7 ressources gratuites pour institutions financières, PME et projets en Afrique francophone. Checklists, guides, diagnostics et templates conformité BCEAO, COBAC, ESG, due diligence.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'KHEPRA EXPERTS' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Ressources Gratuites', item: `${SITE_URL}/lead-magnets` },
        ],
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/lead-magnets#itemlist`,
      name: 'Ressources gratuites KHEPRA EXPERTS — Conformité, Finance, ESG en Afrique',
      numberOfItems: 9,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Checklist Conformité BCEAO/COBAC', url: `${SITE_URL}/lead-magnets/checklist-conformite-bceao-cobac` },
        { '@type': 'ListItem', position: 2, name: 'Guide Levée de Fonds Afrique', url: `${SITE_URL}/lead-magnets/guide-levee-fonds-afrique` },
        { '@type': 'ListItem', position: 3, name: 'Simulation Risque Réglementaire', url: `${SITE_URL}/lead-magnets/simulation-risque-reglementaire` },
        { '@type': 'ListItem', position: 4, name: 'Template Audit Gouvernance', url: `${SITE_URL}/lead-magnets/template-audit-gouvernance` },
        { '@type': 'ListItem', position: 5, name: 'Mini-Rapport Due Diligence', url: `${SITE_URL}/lead-magnets/mini-rapport-due-diligence` },
        { '@type': 'ListItem', position: 6, name: 'Diagnostic ESG Maturité', url: `${SITE_URL}/lead-magnets/diagnostic-esg-maturite` },
        { '@type': 'ListItem', position: 7, name: 'Diagnostic Flash Conformité BCEAO/COBAC 2026', url: `${SITE_URL}/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026` },
        { '@type': 'ListItem', position: 8, name: 'Guide Prix de Transfert BEPS Afrique', url: `${SITE_URL}/lead-magnets/guide-prix-transfert-beps-afrique` },
        { '@type': 'ListItem', position: 9, name: 'Simulateur Agrément Microfinance CEMAC', url: `${SITE_URL}/lead-magnets/simulateur-agrement-microfinance-cemac` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Les ressources KHEPRA EXPERTS sont-elles vraiment gratuites ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, les 7 ressources (checklists, guides, diagnostics et templates) sont entièrement gratuites et disponibles en accès immédiat. Elles couvrent la conformité BCEAO/COBAC, la levée de fonds en Afrique, l\'ESG et la due diligence.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ces ressources sont-elles adaptées au contexte africain ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolument. Chaque ressource intègre les textes réglementaires en vigueur (BCEAO, COBAC, OHADA, IFC, GRI) et est adaptée aux contextes UEMOA et CEMAC, avec des nuances par pays.',
          },
        },
      ],
    },
  ],
};

export default function LeadMagnetsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const allMagnets = getAllActiveLeadMagnets();
  const categories = getLeadMagnetCategories();

  const filtered =
    activeCategory === 'all'
      ? allMagnets
      : allMagnets.filter((lm) => lm.category === activeCategory);

  return (
    <>
      <SeoHead
        title="Ressources Gratuites — Conformité, Finance, ESG | KHEPRA EXPERTS"
        description="7 ressources gratuites pour institutions financières, PME et projets en Afrique francophone. Checklists, guides, diagnostics et templates conformité BCEAO, COBAC, ESG, due diligence."
        canonicalPath="/lead-magnets"
        keywords="ressources gratuites conformité BCEAO, checklist audit COBAC, guide levée fonds Afrique, diagnostic ESG, template gouvernance OHADA, diagnostic flash conformité 2026"
        structuredData={leadMagnetsSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[520px] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20African%20financial%20institution%20team%20working%20with%20regulatory%20compliance%20documents%20and%20digital%20tools%20in%20modern%20boardroom%20with%20Africa%20map%20display%20warm%20amber%20and%20teal%20lighting%20premium%20editorial%20photography%20style%20BCEAO%20COBAC%20regulatory%20environment&width=1800&height=700&seq=lead-magnets-hero-2026&orientation=landscape"
            alt="Ressources KHEPRA EXPERTS"
            className="w-full h-full object-cover object-top opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-teal-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 w-full">
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li><Link to="/" className="hover:text-white/80 transition-colors">Accueil</Link></li>
              <li><i className="ri-arrow-right-s-line"></i></li>
              <li className="text-white/80">Ressources Gratuites</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-400/30 rounded-full text-sm font-medium text-teal-300 mb-6">
              <i className="ri-gift-2-line"></i>
              9 Ressources Premium — Accès Immédiat Gratuit
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Votre boîte à outils{' '}
              <span className="text-teal-400">institutionnelle</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl">
              Checklists, guides, diagnostics et templates conçus pour les décideurs financiers,
              institutionnels et industriels en Afrique francophone. Conformes BCEAO, COBAC,
              OHADA, IFC et GRI.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                  <div className="text-2xl font-bold text-teal-400 mb-0.5">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {['all', ...categories.map((c) => c.value)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'text-white'
                  : 'bg-background-100 text-foreground-600 hover:bg-background-200'
              }`}
              style={
                activeCategory === cat
                  ? { backgroundColor: CATEGORY_ACCENT[cat] || '#374151' }
                  : {}
              }
            >
              {CATEGORY_LABELS[cat] || cat}
              {cat !== 'all' && (
                <span className={`ml-1.5 text-xs ${activeCategory === cat ? 'opacity-70' : 'opacity-50'}`}>
                  ({categories.find((c) => c.value === cat)?.count || 0})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lm) => (
            <LeadMagnetCard
              key={lm.id}
              leadMagnet={lm}
              formUrl={FORM_URLS[lm.id] || ''}
            />
          ))}
        </div>

        {/* Why section */}
        <section className="mt-20 py-16 bg-gradient-to-r from-slate-900 to-teal-900 rounded-3xl px-8 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pourquoi ces ressources sont-elles gratuites ?
            </h2>
            <p className="text-white/70 text-lg">
              Chez KHEPRA, nous croyons que l&apos;expertise partagée génère la confiance.
              Ces ressources représentent des centaines d&apos;heures de travail de notre équipe.
              Elles vous aident à identifier vos besoins — nous sommes là pour les résoudre ensemble.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-shield-star-line',
                title: 'Contenu Expert',
                desc: 'Chaque ressource est rédigée par des experts avec 15+ ans d\'expérience en Afrique francophone.',
              },
              {
                icon: 'ri-award-line',
                title: 'Références Actualisées',
                desc: 'Toutes les ressources référencent les textes réglementaires en vigueur (BCEAO, COBAC, OHADA, IFC).',
              },
              {
                icon: 'ri-global-line',
                title: '15 Pays Couverts',
                desc: 'Adapté aux contextes UEMOA et CEMAC, avec des nuances par pays pour les marchés clés.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="w-12 h-12 flex items-center justify-center bg-teal-500/20 rounded-xl mx-auto mb-4">
                  <i className={`${item.icon} text-2xl text-teal-400`}></i>
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground-900 mb-3">
            Besoin d&apos;un accompagnement personnalisé ?
          </h2>
          <p className="text-foreground-600 mb-6 max-w-xl mx-auto">
            Ces ressources sont un point de départ. Pour aller plus loin, notre équipe peut
            réaliser un diagnostic complet ou vous accompagner dans la mise en conformité.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/diagnostic-flash"
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-flashlight-line"></i>
              Diagnostic Flash Gratuit — 15 min
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-3 border-2 border-foreground-200 text-foreground-700 rounded-xl text-sm font-bold hover:border-teal-500 hover:text-teal-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-calendar-line"></i>
              Prendre Rendez-Vous
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
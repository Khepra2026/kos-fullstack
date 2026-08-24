import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { methodologyFrameworks, type MethodologyFramework } from '@/mocks/methodologies';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const CATEGORIES = [
  { key: 'all', label: 'Toutes', icon: 'ri-apps-line' },
  { key: 'regulation', label: 'Régulation', icon: 'ri-bank-line' },
  { key: 'fiscalite', label: 'Fiscalité', icon: 'ri-exchange-funds-line' },
  { key: 'gouvernance', label: 'Gouvernance', icon: 'ri-shield-check-line' },
  { key: 'strategie', label: 'Stratégie', icon: 'ri-compass-3-line' },
  { key: 'finance', label: 'Finance', icon: 'ri-line-chart-line' },
  { key: 'transformation', label: 'Transformation', icon: 'ri-rocket-line' },
];

const CATEGORY_LABELS: Record<string, string> = {
  regulation: 'Régulation Financière',
  fiscalite: 'Fiscalité Internationale',
  gouvernance: 'Gouvernance & Risques',
  strategie: 'Planification Stratégique',
  finance: 'Ingénierie Financière',
  transformation: 'Transformation Digitale',
};

export default function MethodologiesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return methodologyFrameworks;
    return methodologyFrameworks.filter(m => m.category === activeCategory);
  }, [activeCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/methodologies#webpage`,
        url: `${SITE_URL}/methodologies`,
        name: 'Méthodologies de Recherche | KHEPRA EXPERTS',
        description: 'Cadres méthodologiques exclusifs Big Four : pré-inspection BCEAO/COBAC, prix de transfert BEPS, ERM COSO, LBC/FT GAFI, Business Plan Investment Ready, Due Diligence, Audit ESG, Planification Stratégique.',
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', url: SITE_URL },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Méthodologies', item: `${SITE_URL}/methodologies` },
          ],
        },
      },
    ],
  };

  return (
    <>
      <SeoHead
        title="Méthodologies de Recherche | Cadres Big Four — Pré-Inspection, BEPS, ERM, LBC/FT, Business Plan"
        description="10 cadres méthodologiques exclusifs KHEPRA EXPERTS : pré-inspection BCEAO/COBAC (215 points), prix de transfert BEPS Action 13, ERM COSO/ISO 31000, LBC/FT 8 piliers GAFI, Business Plan Investment Ready, Due Diligence, Audit ESG, Planification Stratégique. Standards Big Four."
        keywords="méthodologies conseil, pré-inspection BCEAO, prix de transfert BEPS, ERM COSO, LBC/FT GAFI, business plan investment ready, due diligence OHADA, audit ESG IFC, méthodologie Big Four, KHEPRA EXPERTS"
        canonicalPath="/methodologies"
        ogType="website"
        ogImage={OG_IMAGES.SERVICES}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        schemaJson={schemaData}
      />
      <Navigation />

      <main className="min-h-screen bg-background-50" id="main-content">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-4">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Méthodologies', href: '/methodologies' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Professional%20research%20methodology%20framework%20visualization%20in%20modern%20consulting%20environment%2C%20abstract%20geometric%20patterns%20representing%20structured%20analytical%20frameworks%2C%20clean%20minimalist%20professional%20atmosphere%20with%20warm%20amber%20and%20dark%20charcoal%20accents%2C%20architectural%20grid%20patterns%2C%20soft%20gradient%20lighting%2C%20corporate%20consulting%20aesthetic%2C%20no%20people&width=1600&height=700&seq=methodologies-hero-2026&orientation=landscape"
              alt="Cadres méthodologiques KHEPRA EXPERTS"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/50"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/15 backdrop-blur-sm border border-white/20">
              <i className="ri-flask-line text-amber-300 text-sm"></i>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">Centre de Recherche & Excellence Méthodologique</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight font-heading">
              Nos Méthodologies de Recherche
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              10 cadres méthodologiques exclusifs développés sur 22 ans de pratique terrain en Afrique francophone. Chaque méthodologie est adossée à des référentiels réglementaires précis (BCEAO, COBAC, GAFI, OCDE, COSO, IFC) et a prouvé son efficacité sur des missions réelles.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/80 backdrop-blur-sm">{methodologyFrameworks.length} cadres méthodologiques</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/80 backdrop-blur-sm">{CATEGORIES.length - 1} domaines d'expertise</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/80 backdrop-blur-sm">22 ans de pratique</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/80 backdrop-blur-sm">100+ missions</span>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="bg-white rounded-2xl border border-background-200/70 p-2 flex flex-wrap gap-1.5 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setExpandedId(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-accent-500 text-white'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${cat.icon} text-sm`}></i>
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Frameworks Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((framework, index) => {
              const isExpanded = expandedId === framework.id;
              return (
                <ScrollReveal key={framework.id} animation="fadeSlideUp" delay={index * 60}>
                  <div
                    className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isExpanded ? 'border-accent-300 shadow-sm' : 'border-background-200/70 hover:border-background-300 hover:-translate-y-1'
                    }`}
                    onClick={() => toggleExpand(framework.id)}
                  >
                    {/* Header */}
                    <div className="p-5 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${framework.accent}12`, border: `1px solid ${framework.accent}30` }}>
                          <i className={`${framework.icon} text-xl`} style={{ color: framework.accent }}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${framework.accent}10`, color: framework.accent }}>
                              {CATEGORY_LABELS[framework.category] || framework.category}
                            </span>
                            <span className="text-[10px] text-foreground-400">{framework.sections} sections</span>
                          </div>
                          <h3 className="text-base font-bold text-foreground-950 leading-snug mb-1 line-clamp-2" title={framework.title}>{framework.title}</h3>
                          <p className="text-xs text-foreground-500">{framework.subtitle}</p>
                        </div>
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-accent-50' : 'bg-background-50'}`}>
                          <i className={`ri-arrow-down-s-line text-sm ${isExpanded ? 'text-accent-600' : 'text-foreground-400'}`}></i>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-5 md:px-6 pb-6 border-t border-background-100 pt-5 space-y-5">
                        {/* Description */}
                        <p className="text-sm text-foreground-600 leading-relaxed text-justify">{framework.description}</p>

                        {/* Scope & Duration */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-background-50 rounded-xl p-3.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-1">Périmètre</span>
                            <p className="text-xs text-foreground-700 leading-snug">{framework.applicationScope}</p>
                          </div>
                          <div className="bg-background-50 rounded-xl p-3.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-1">Durée type</span>
                            <p className="text-xs text-foreground-700 leading-snug">{framework.duration}</p>
                          </div>
                        </div>

                        {/* Standards */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-2">Référentiels & Standards</span>
                          <div className="flex flex-wrap gap-1.5">
                            {framework.standards.map((s, si) => (
                              <span key={si} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-accent-50 text-accent-700 border border-accent-200">{s}</span>
                            ))}
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-2">Livrables</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {framework.deliverables.map((d, di) => (
                              <div key={di} className="flex items-start gap-2">
                                <i className="ri-checkbox-circle-fill text-xs mt-0.5 flex-shrink-0" style={{ color: framework.accent }}></i>
                                <span className="text-xs text-foreground-600">{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Maturity Model */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-400 block mb-2">Modèle de Maturité</span>
                          <div className="space-y-2">
                            {framework.maturityModel.map((mm, mi) => (
                              <div key={mi} className="flex items-start gap-3 p-3 rounded-xl bg-background-50">
                                <div className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${framework.accent}15` }}>
                                  <span className="text-[10px] font-bold" style={{ color: framework.accent }}>{mi + 1}</span>
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-foreground-800">{mm.level}</span>
                                  <p className="text-[11px] text-foreground-500 leading-snug mt-0.5">{mm.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Case Ref */}
                        <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: `${framework.accent}08`, border: `1px solid ${framework.accent}20` }}>
                          <i className="ri-double-quotes-l text-lg flex-shrink-0" style={{ color: framework.accent }}></i>
                          <p className="text-xs text-foreground-700 leading-snug italic">{framework.caseRef}</p>
                        </div>

                        {/* Related Reports CTA */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate('/resources'); }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
                            style={{ background: framework.accent, color: '#fff' }}
                          >
                            <i className="ri-file-download-line"></i>
                            Rapports associés
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate('/approche'); }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer whitespace-nowrap border-2 transition-all hover:bg-background-50"
                            style={{ borderColor: framework.accent, color: framework.accent }}
                          >
                            <i className="ri-route-line"></i>
                            Notre Approche
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-background-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-inbox-line text-3xl text-foreground-300"></i>
              </div>
              <p className="text-foreground-500 text-sm">Aucune méthodologie dans cette catégorie.</p>
            </div>
          )}
        </section>

        {/* Methodological Rigor Banner */}
        <section className="py-16" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <i className="ri-verified-badge-line text-amber-400 text-sm"></i>
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">Rigueur Méthodologique — Standards Big Four</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">Chaque méthodologie est un standard</h2>
            <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed mb-8">
              Nos cadres méthodologiques sont le résultat de 22 années de pratique, 100+ missions en Afrique francophone, et une veille permanente des standards internationaux (BCEAO, COBAC, GAFI, OCDE, COSO, IFC). Ils sont documentés, versionnés, et améliorés en continu à chaque nouvelle mission.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '22', unit: 'ans', label: 'd\'expertise terrain' },
                { value: '100+', unit: '', label: 'missions documentées' },
                { value: '10', unit: '', label: 'cadres méthodologiques' },
                { value: '96%', unit: '', label: 'conformité post-mission' },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(134,188,37,0.08)' }}>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}<span className="text-lg text-amber-400">{stat.unit}</span></div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 py-16">
          <ScrollReveal animation="fadeSlideUp">
            <div className="bg-accent-50 rounded-3xl p-10 md:p-12 text-center border border-accent-200">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-accent-200 mb-6">
                <i className="ri-customer-service-2-line text-accent-600 text-sm"></i>
                <span className="text-xs font-bold text-accent-700 uppercase tracking-wider">Appliquons ces méthodologies à votre contexte</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3 font-heading">Quelle méthodologie correspond à vos enjeux ?</h2>
              <p className="text-sm text-foreground-600 max-w-xl mx-auto mb-8 leading-relaxed">
                Chaque cadre méthodologique est adaptable à votre secteur, votre taille et votre juridiction. Nos experts vous aident à identifier les méthodologies pertinentes et à les déployer opérationnellement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-500 text-white rounded-full font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-accent-600 transition-colors"
                >
                  <i className="ri-mail-line"></i>
                  Nous contacter
                </a>
                <a
                  href="/resources"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-foreground-900 border-2 border-foreground-200 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-50 transition-colors"
                >
                  <i className="ri-file-download-line"></i>
                  Consulter les rapports
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </>
  );
}




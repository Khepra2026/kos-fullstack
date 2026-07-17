import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';
import { ThinkTankDownloadModal } from './components/ThinkTankDownloadModal';
import { thinkTankPublications, thinkTankStats, thinkTankAxes, thinkTankEvents, ThinkTankPublication } from '@/mocks/thinkTankPublications';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const typeLabels: Record<string, { label: string; icon: string; color: string }> = {
  'position-paper': { label: 'Position Paper', icon: 'ri-file-text-line', color: 'from-accent-700 to-accent-900' },
  'policy-brief': { label: 'Policy Brief', icon: 'ri-file-list-3-line', color: 'from-primary-700 to-primary-900' },
  'sector-study': { label: 'Étude Sectorielle', icon: 'ri-bar-chart-grouped-line', color: 'from-primary-700 to-primary-900' },
  'regulatory-foresight': { label: 'Prospective Réglementaire', icon: 'ri-radar-line', color: 'from-secondary-700 to-secondary-900' },
  'working-paper': { label: 'Working Paper', icon: 'ri-article-line', color: 'from-secondary-700 to-secondary-900' },
  'annual-report': { label: 'Rapport Annuel', icon: 'ri-book-2-line', color: 'from-secondary-700 to-secondary-900' },
};

function PublicationCoverOverlay({ featured: isFeatured }: { featured: boolean }) {
  return (
    <>
      {/* Brand badge — top left with hover interaction */}
      <div className="absolute top-2 left-2 z-10 group/badge">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-background-950/70 backdrop-blur-sm border border-primary-400/20 transition-all duration-300 group-hover/badge:bg-background-950/90 group-hover/badge:border-primary-400/50 group-hover/badge:scale-105 group-hover/badge:shadow-lg group-hover/badge:shadow-primary-400/10">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-400 transition-all duration-300 group-hover/badge:bg-accent-400 group-hover/badge:scale-125" />
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/90 transition-all duration-300 group-hover/badge:text-white group-hover/badge:tracking-[0.18em]">KHEPRA</span>
        </div>
      </div>
      {/* Watermark — bottom right with hover fade-in */}
      <div className="absolute bottom-2 right-2 z-10 group/watermark">
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/25 select-none transition-all duration-300 group-hover/watermark:text-white/50 group-hover/watermark:tracking-[0.15em]">THINK TANK</span>
      </div>
      {/* Top edge accent line with hover glow */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 z-10 transition-all duration-300 group-hover:h-[2px] group-hover:shadow-[0_0_8px_rgba(107,155,31,0.4)]" />
    </>
  );
}

export default function ThinkTankPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | string>('all');
  const [selectedPub, setSelectedPub] = useState<ThinkTankPublication | null>(null);
  const [downloadPub, setDownloadPub] = useState<ThinkTankPublication | null>(null);

  const featured = thinkTankPublications.filter(p => p.featured);
  const filtered = activeTab === 'all' ? thinkTankPublications : thinkTankPublications.filter(p => p.type === activeTab);

  const publicationTypes = ['position-paper', 'policy-brief', 'sector-study', 'regulatory-foresight', 'working-paper', 'annual-report'];

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/think-tank#organization`,
        name: 'KHEPRA THINK TANK',
        url: `${SITE_URL}/think-tank`,
        description: 'Centre de recherche et de prospective réglementaire pour l\'Afrique francophone. Publications, études sectorielles, policy briefs et conférences.',
        parentOrganization: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        foundingDate: '2024',
        areaServed: ['UEMOA', 'CEMAC', 'OHADA'],
        contactPoint: { '@type': 'ContactPoint', email: 'thinktank@khepraexperts.com', contactType: 'research' },
      },
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/think-tank#webpage`,
        url: `${SITE_URL}/think-tank`,
        name: 'KHEPRA THINK TANK — Recherche & Prospective Réglementaire pour l\'Afrique Francophone',
        description: 'Centre de recherche indépendant produisant des Position Papers, Policy Briefs, Études Sectorielles et Prospectives Réglementaires pour les décideurs, régulateurs et investisseurs en Afrique francophone.',
        inLanguage: 'fr-FR',
        isPartOf: { '@type': 'WebSite', url: SITE_URL },
        hasPart: thinkTankPublications.map(pub => ({
          '@type': 'ScholarlyArticle',
          '@id': `${SITE_URL}/think-tank#pub-${pub.id}`,
          headline: pub.title,
          description: pub.subtitle,
          author: { '@type': 'Organization', name: 'KHEPRA THINK TANK', url: `${SITE_URL}/think-tank` },
          datePublished: pub.date,
          inLanguage: 'fr-FR',
          about: pub.tags.slice(0, 5),
          publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title="KHEPRA THINK TANK | Recherche, Prospective Réglementaire & Publications — Afrique Francophone"
        description="Centre de recherche indépendant spécialisé en régulation financière, LBC/FT, prix de transfert et gouvernance en Afrique francophone. Position Papers, Policy Briefs, Études Sectorielles. UEMOA · CEMAC · OHADA."
        keywords="think tank Afrique, recherche réglementaire, prospective régulation, publications BCEAO, études sectorielles UEMOA, policy brief GAFI, position paper gouvernance, KHEPRA THINK TANK, recherche LBC/FT Afrique, prix de transfert recherche"
        canonicalPath="/think-tank"
        ogType="website"
        schemaJson={schemaData}
      />
      <Navigation />

      <main id="main-content" className="pt-28">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'Think Tank', href: '/think-tank' },
          ]} />
        </div>

        {/* ═══════════ HERO — Image de fond + overlay sombre premium ═══════════ */}
        <section className="relative overflow-hidden min-h-[580px] md:min-h-[680px] flex items-center">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Professional%20dark%20academic%20research%20library%20with%20warm%20golden%20ambient%20lighting%20leather%20books%20mahogany%20shelves%20and%20an%20elegant%20globe%20subtle%20scholarly%20atmosphere%20premium%20think%20tank%20aesthetic%20deep%20shadows%20rich%20textures%20institutional%20grandeur%20no%20people%20cinematic%20composition&width=1920&height=1080&seq=thinktank-hero-v2&orientation=landscape"
              alt="KHEPRA THINK TANK — Recherche & Prospective Réglementaire"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchpriority="high"
            />
          </div>
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-background-950/85 via-background-950/70 to-background-950/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-background-950/60 via-transparent to-background-950/60" />

          {/* Glow accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, oklch(var(--primary-400)) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, oklch(var(--accent-400)) 0%, transparent 70%)' }} />

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/40 via-accent-400/30 via-primary-400/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="max-w-4xl">
              <ScrollReveal animation="fadeSlideUp">
                <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-background-950/50 backdrop-blur-md border border-primary-400/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-accent-400" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary-300">KHEPRA THINK TANK</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-400/15 text-accent-300 backdrop-blur-md">BU4</span>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeSlideUp" delay={100}>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none mb-6" style={{ letterSpacing: '-0.035em' }}>
                  Recherche & prospective réglementaire pour
                  <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300 bg-clip-text text-transparent"> l'Afrique francophone</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal animation="fadeSlideUp" delay={200}>
                <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl text-white/55 font-light text-justify">
                  Le KHEPRA THINK TANK produit des recherches indépendantes pour éclairer les décideurs, les régulateurs et les investisseurs sur les grandes transformations réglementaires en Afrique francophone. Notre mission : combler le déficit de recherche appliquée sur les cadres prudentiels, fiscaux et de gouvernance en zones UEMOA, CEMAC et OHADA.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fadeSlideUp" delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => { const el = document.getElementById('tt-publications'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-foreground-950"
                    style={{ boxShadow: '0 8px 32px rgba(107,155,31,0.40)' }}
                  >
                    <i className="ri-book-open-line text-lg" />
                    Explorer les publications
                  </button>
                  <button
                    onClick={() => { const el = document.getElementById('tt-events'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 text-accent-300 border border-accent-400/30 bg-accent-400/5 backdrop-blur-md"
                  >
                    <i className="ri-calendar-event-line" />
                    Événements
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════ STATS — Compteurs animés ═══════════ */}
        <section className="py-14 bg-background-50 border-b border-primary-400/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal
              animation="fadeSlideUp"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {thinkTankStats.map((stat, i) => (
                  <div key={i} className="text-center py-6 px-4 rounded-2xl bg-background-100 border border-primary-400/8 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/15">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-400/5 border border-primary-400/10">
                        <i className={`${stat.icon} text-base text-primary-400`} />
                      </div>
                    </div>
                    <div className="font-display text-3xl md:text-4xl font-bold mb-1 text-foreground-950 leading-none">
                      <AnimatedCounter value={parseInt(stat.value)} suffix={stat.suffix} duration={1800} />
                    </div>
                    <div className="text-xs font-medium text-foreground-950/45">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ AXES DE RECHERCHE ═══════════ */}
        <section className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fadeSlideUp">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-primary-400/5 border border-primary-400/10">
                  <i className="ri-focus-3-line text-sm text-primary-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-500">Nos 5 Axes de Recherche</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground-950">Un agenda de recherche structuré</h2>
                <p className="text-base max-w-2xl mx-auto text-foreground-950/55 text-justify">
                  Cinq axes prioritaires couvrant les grands enjeux réglementaires de l'Afrique francophone, nourris par une veille permanente et des partenariats académiques.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {thinkTankAxes.map((axe, i) => (
                <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 80}>
                  <div className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-default group bg-background-100 border border-primary-400/6 h-full flex flex-col">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-primary-400/5 border border-primary-400/12">
                      <i className={`${axe.icon} text-lg text-primary-500`} />
                    </div>
                    <h3 className="text-sm font-bold mb-2 leading-tight text-foreground-950">{axe.title}</h3>
                    <p className="text-xs leading-relaxed mb-3 text-foreground-950/48 text-justify flex-1">{axe.description}</p>
                    <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-primary-400/6">
                      <span className="text-xs font-semibold text-primary-400">{axe.publications} publications</span>
                      <i className="ri-arrow-right-line text-xs text-primary-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PUBLICATIONS VEDETTES ═══════════ */}
        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fadeSlideUp">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-accent-400/8 border border-accent-400/15">
                    <i className="ri-star-line text-sm text-accent-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-600">Publications Vedettes</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground-950">Recherche à fort impact</h2>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((pub, i) => (
                <ScrollReveal key={pub.id} animation="fadeSlideUp" delay={i * 100}>
                  <div
                    onClick={() => setSelectedPub(pub)}
                    className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-background-50 border border-primary-400/6"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                      <div className="sm:col-span-1 h-48 sm:h-full relative overflow-hidden">
                        <img src={pub.image} alt={pub.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <PublicationCoverOverlay featured={pub.featured} />
                        <div className="absolute top-8 left-3 z-10">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${typeLabels[pub.type]?.color || ''}`}>
                            {typeLabels[pub.type]?.label || pub.type}
                          </span>
                        </div>
                      </div>
                      <div className="sm:col-span-2 p-5 md:p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">{pub.zone}</span>
                            <span className="text-xs text-foreground-950/25">·</span>
                            <span className="text-xs text-foreground-950/40">{new Date(pub.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                            <span className="text-xs text-foreground-950/25">·</span>
                            <span className="text-xs text-foreground-950/40">{pub.pages} p.</span>
                          </div>
                          <h3 className="text-base font-bold mb-2 leading-snug text-foreground-950 group-hover:text-primary-600 transition-colors line-clamp-2" title={pub.title}>{pub.title}</h3>
                          <p className="text-xs leading-relaxed line-clamp-2 mb-3 text-foreground-950/50 text-justify" title={pub.subtitle}>{pub.subtitle}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {pub.tags.slice(0, 4).map((tag, ti) => (
                              <span key={ti} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary-400/5 text-primary-500">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); setDownloadPub(pub); }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap transition-all hover:scale-105 text-xs font-semibold bg-gradient-to-r from-primary-500 to-primary-400 text-white"
                          >
                            <i className="ri-download-line text-xs" />
                            Télécharger
                          </button>
                          <span className="text-xs font-semibold flex items-center gap-1 text-accent-400 group-hover:gap-2 transition-all duration-300">
                            Détails <i className="ri-arrow-right-line" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TOUTES LES PUBLICATIONS ═══════════ */}
        <section id="tt-publications" className="py-16 md:py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fadeSlideUp">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold mb-2 text-foreground-950">Toutes les publications</h2>
                <p className="text-sm text-foreground-950/45">Filtrer par type de publication</p>
              </div>
            </ScrollReveal>

            {/* Filtres — pill tabs */}
            <ScrollReveal animation="fadeSlideUp" delay={50}>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${activeTab === 'all' ? 'text-white bg-gradient-to-r from-primary-500 to-primary-400' : 'text-foreground-950/55 bg-background-100 border border-foreground-950/6 hover:border-primary-400/15'}`}
                >
                  Tout
                </button>
                {publicationTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeTab === type ? 'text-white bg-gradient-to-r from-primary-500 to-primary-400' : 'text-foreground-950/55 bg-background-100 border border-foreground-950/6 hover:border-primary-400/15'}`}
                  >
                    <i className={`${typeLabels[type]?.icon} text-xs`} />
                    {typeLabels[type]?.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((pub, i) => (
                <ScrollReveal key={pub.id} animation="fadeSlideUp" delay={i * 60}>
                  <div
                    onClick={() => setSelectedPub(pub)}
                    className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 bg-background-100 border border-primary-400/6 h-full flex flex-col"
                  >
                    <div className="h-40 relative overflow-hidden">
                      <img src={pub.image} alt={pub.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-950/50 to-transparent" />
                      <PublicationCoverOverlay featured={pub.featured} />
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${typeLabels[pub.type]?.color || ''}`}>
                          {typeLabels[pub.type]?.label || pub.type}
                        </span>
                      </div>
                      {pub.featured && (
                        <div className="absolute top-8 right-3 z-10">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-accent-400/80 backdrop-blur-md">Vedette</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary-400">{pub.zone}</span>
                        <span className="text-xs text-foreground-950/20">·</span>
                        <span className="text-xs text-foreground-950/38">{pub.pages} p.</span>
                      </div>
                      <h3 className="text-sm font-bold mb-1.5 leading-snug line-clamp-2 text-foreground-950 group-hover:text-primary-600 transition-colors" title={pub.title}>{pub.title}</h3>
                      <p className="text-xs leading-relaxed line-clamp-2 mb-3 text-foreground-950/45 text-justify flex-1" title={pub.subtitle}>{pub.subtitle}</p>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-primary-400/5">
                        <span className="text-[10px] text-foreground-950/35">{new Date(pub.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setDownloadPub(pub); }}
                            className="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-all hover:scale-110 bg-primary-400/8 border border-primary-400/15"
                            title="Télécharger le PDF"
                          >
                            <i className="ri-download-line text-xs text-primary-400" />
                          </button>
                          <span className="text-xs font-semibold flex items-center gap-1 text-accent-400 group-hover:gap-1.5 transition-all duration-300">
                            Détails <i className="ri-arrow-right-line text-[10px]" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ ÉVÉNEMENTS ═══════════ */}
        <section id="tt-events" className="py-16 md:py-20 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fadeSlideUp">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-accent-400/8 border border-accent-400/15">
                  <i className="ri-calendar-event-line text-sm text-accent-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-600">Agenda 2026</span>
                </div>
                <h2 className="font-display text-3xl font-bold mb-2 text-foreground-950">Conférences & Événements</h2>
                <p className="text-sm text-foreground-950/45">Des rendez-vous d'excellence pour les décideurs, régulateurs et professionnels</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {thinkTankEvents.map((event, i) => (
                <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 80}>
                  <div className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default bg-background-50 border border-primary-400/8 group">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 flex flex-col items-center justify-center rounded-xl flex-shrink-0 text-center transition-colors duration-300 ${event.status === 'upcoming' ? 'bg-primary-400/8 border border-primary-400/15 group-hover:bg-primary-400/12' : 'bg-foreground-950/4 border border-foreground-950/6'}`}>
                        <span className="text-lg font-bold leading-none text-primary-500">{new Date(event.date).getDate()}</span>
                        <span className="text-[10px] font-semibold uppercase text-foreground-950/40">{new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-accent-400/10 text-accent-400">{event.type}</span>
                          {event.status === 'upcoming' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                          )}
                        </div>
                        <h3 className="text-sm font-bold mb-1.5 leading-snug text-foreground-950" title={event.title}>{event.title}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-foreground-950/40">
                          <i className="ri-map-pin-2-line text-xs text-primary-400" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CTA Partenariats — Dark premium ═══════════ */}
        <section className="relative overflow-hidden py-16 md:py-20">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Elegant%20dark%20academic%20conference%20hall%20with%20warm%20golden%20lighting%20empty%20wooden%20podium%20and%20leather%20chairs%20sophisticated%20institutional%20atmosphere%20premium%20consulting%20ambiance%20deep%20rich%20tones%20professional%20environment%20subtle%20dramatic%20lighting&width=1920&height=1080&seq=thinktank-cta-bg-v1&orientation=landscape"
              alt="Partenariats de Recherche KHEPRA THINK TANK"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-950/90 via-background-950/80 to-background-950/95" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/30 via-accent-400/20 via-primary-400/30 to-transparent" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal animation="fadeSlideUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-accent-400/8 border border-accent-400/15 backdrop-blur-md">
                <i className="ri-team-line text-sm text-accent-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent-400">Partenariats de Recherche</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Vous représentez une université, un centre de recherche ou une institution ?</h2>
              <p className="text-base max-w-2xl mx-auto mb-8 text-white/50 text-justify">
                Le KHEPRA THINK TANK collabore avec des universités, centres de recherche et institutions pour produire des recherches à fort impact sur la régulation financière, la gouvernance et la fiscalité en Afrique francophone. Contactez-nous pour explorer les possibilités de partenariat.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fadeSlideUp" delay={100}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:thinktank@khepraexperts.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-foreground-950"
                  style={{ boxShadow: '0 8px 32px rgba(107,155,31,0.40)' }}
                >
                  <i className="ri-mail-send-line text-lg" />
                  Nous contacter
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 text-accent-300 border border-accent-400/30 bg-accent-400/5 backdrop-blur-md"
                >
                  <i className="ri-arrow-right-line" />
                  Page contact
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* ═══════════ MODAL — Détail publication ═══════════ */}
      {selectedPub && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedPub(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 bg-background-50 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-fadeSlideUp" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 z-10 bg-background-50/95 backdrop-blur-md border-b border-secondary-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-400">{typeLabels[selectedPub.type]?.label}</span>
              <button onClick={() => setSelectedPub(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary-100 transition-colors cursor-pointer">
                <i className="ri-close-line text-lg" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary-400">{selectedPub.zone}</span>
                  <span className="text-xs text-foreground-950/20">·</span>
                  <span className="text-xs text-foreground-950/45">{selectedPub.date}</span>
                  <span className="text-xs text-foreground-950/20">·</span>
                  <span className="text-xs text-foreground-950/45">{selectedPub.pages} pages</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground-950">{selectedPub.title}</h2>
                <p className="text-sm italic text-foreground-950/55">{selectedPub.subtitle}</p>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-foreground-950/65 text-justify">{selectedPub.abstract}</p>

              <div className="mb-6">
                <h4 className="text-sm font-bold mb-3 text-foreground-950">Principaux Constats</h4>
                <div className="space-y-2">
                  {selectedPub.keyFindings.map((finding, fi) => (
                    <div key={fi} className="flex items-start gap-2.5">
                      <i className="ri-checkbox-circle-line text-sm mt-0.5 flex-shrink-0 text-primary-400" />
                      <span className="text-sm leading-relaxed text-foreground-950/65 text-justify">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold mb-3 text-foreground-950">Cadre Réglementaire de Référence</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPub.regulatoryFramework.map((ref, ri) => (
                    <span key={ri} className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-400/5 text-primary-500 border border-primary-400/8">{ref}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-primary-400/10">
                <span className="text-xs text-foreground-950/40">Auteur : {selectedPub.author}</span>
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 bg-gradient-to-r from-primary-500 to-primary-400 text-white"
                  onClick={() => {
                    setSelectedPub(null);
                    setTimeout(() => setDownloadPub(selectedPub), 150);
                  }}
                >
                  <i className="ri-download-line" />
                  {selectedPub.downloadLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ThinkTankDownloadModal
        isOpen={downloadPub !== null}
        onClose={() => setDownloadPub(null)}
        publication={downloadPub}
      />

      <Footer />
    </div>
  );
}
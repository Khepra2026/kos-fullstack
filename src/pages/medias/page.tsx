import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const mediaSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/medias#collectionpage`,
      url: `${SITE_URL}/medias`,
      name: 'KOS — Médias & Production de Contenu | Blog, Insights, Webinaires, Studio | Afrique Francophone',
      description: 'Médias KOS : Blog d\'analyse réglementaire, Insights Hub de veille stratégique, Webinaires de formation, Publications de recherche, Think Tank et Studio Média de production de contenu. Intelligence réglementaire pour l\'Afrique francophone.',
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', url: SITE_URL },
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'KHEPRA EXPERTS — KOS Platform',
      url: SITE_URL,
      description: 'Plateforme d\'intelligence réglementaire pour l\'Afrique francophone',
    },
  ],
};

const mediaChannels = [
  {
    id: 'blog',
    title: 'Blog',
    subtitle: 'Analyses & Articles',
    description: '9 400+ articles d\'analyse réglementaire, économique et stratégique. 23 agents IA, publication quotidienne. Le blog KOS est la référence de l\'intelligence réglementaire en Afrique francophone.',
    icon: 'ri-quill-pen-line',
    accent: '#86BC25',
    href: '/blog/',
    stats: [
      { value: '9,4k+', label: 'Articles' },
      { value: '23', label: 'Agents IA' },
    ],
    cta: 'Lire les analyses',
  },
  {
    id: 'insights',
    title: 'Insights Hub',
    subtitle: 'Veille Stratégique',
    description: 'Command center de veille stratégique et réglementaire. Tableaux de bord, tendances marché, opportunités business. Pour décideurs et COMEX.',
    icon: 'ri-lightbulb-flash-line',
    accent: '#D4AF37',
    href: '/insights/',
    stats: [
      { value: '58k', label: 'Visites/semaine' },
      { value: '93.2', label: 'Score SEO' },
    ],
    cta: 'Explorer les insights',
  },
  {
    id: 'publications',
    title: 'Publications',
    subtitle: 'Rapports & Études',
    description: 'Livres blancs, études sectorielles, rapports de recherche et position papers. Production intellectuelle KOS sur les grands enjeux réglementaires africains.',
    icon: 'ri-book-open-line',
    accent: '#6B9B1F',
    href: '/publications/',
    stats: [
      { value: '30+', label: 'Livres blancs' },
      { value: '50+', label: 'Études de cas' },
    ],
    cta: 'Consulter les publications',
  },
  {
    id: 'webinars',
    title: 'Webinaires',
    subtitle: 'Formations en Ligne',
    description: 'Sessions interactives avec les experts KOS sur les sujets brûlants de la régulation : BCEAO, COBAC, LBC/FT, ESG, Cybersécurité bancaire.',
    icon: 'ri-live-line',
    accent: '#2E8B57',
    href: '/webinars/',
    stats: [
      { value: '20+', label: 'Webinaires' },
      { value: 'Live', label: 'Interactif' },
    ],
    cta: 'Participer aux webinaires',
  },
  {
    id: 'think-tank',
    title: 'Think Tank',
    subtitle: 'Recherche & Prospective',
    description: 'Le KHEPRA THINK TANK produit des recherches indépendantes : Position Papers, Policy Briefs, Études Sectorielles et Prospectives Réglementaires. BU4 de KOS.',
    icon: 'ri-lightbulb-flash-line',
    accent: '#D4AF37',
    href: '/think-tank/',
    stats: [
      { value: 'BU4', label: 'Business Unit' },
      { value: '16/an', label: 'Publications' },
    ],
    cta: 'Découvrir le Think Tank',
  },
  {
    id: 'studio',
    title: 'Studio Média',
    subtitle: 'Production de Contenu',
    description: 'Production industrialisée de contenus médias : podcasts, vidéos YouTube, optimisation GEO et conversion commerciale. 4 frameworks, production autonome.',
    icon: 'ri-film-line',
    accent: '#6B9B1F',
    href: '/studio-media/',
    stats: [
      { value: '4', label: 'Frameworks' },
      { value: '100%', label: 'Autonome' },
    ],
    cta: 'Visiter le Studio',
  },
];

export default function MediasPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title="Médias KOS | Blog, Insights, Webinaires, Studio & Think Tank | Intelligence Réglementaire Afrique"
        description="Médias KOS : Blog d'analyse (9 400+ articles), Insights Hub, Webinaires, Publications, Think Tank et Studio Média. Production de contenu sur l'intelligence réglementaire en Afrique francophone."
        keywords="médias KOS, blog réglementaire Afrique, insights stratégiques, webinaires conformité, think tank Afrique, studio média, intelligence réglementaire, publications Afrique"
        canonicalPath="/medias"
        ogType="website"
        structuredData={mediaSchema}
      />
      <Navigation />

      <main id="main-content" className="pt-28">
        {/* ═══ HERO ═══ */}
        <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 65%)' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.18)' }}>
              <i className="ri-film-line text-sm" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#86BC25' }}>KOS — Médias & Production</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              L'intelligence réglementaire
              <span className="block" style={{ background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 55%, #6B9B1F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>en contenu</span>
            </h1>
            <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Blog, insights, webinaires, publications, think tank, studio média — l'écosystème de contenu KOS transforme l'expertise réglementaire en connaissance actionnable pour les décideurs africains. <strong className="text-white font-semibold">Production 100% autonome, 23 agents IA.</strong>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {[
                { value: '9,4k+', label: 'Articles publiés', icon: 'ri-quill-pen-line' },
                { value: '23', label: 'Agents IA de production', icon: 'ri-robot-line' },
                { value: '58k', label: 'Visites/semaine', icon: 'ri-line-chart-line' },
                { value: '6', label: 'Canaux médias', icon: 'ri-stack-line' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <i className={`${s.icon} text-lg mb-2 block`} style={{ color: '#86BC25' }} />
                  <div className="font-heading text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 6 CANAUX MÉDIAS ═══ */}
        <section className="py-16 md:py-24" style={{ background: '#fafaf8' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(134,188,37,0.06)', border: '1px solid rgba(134,188,37,0.12)' }}>
                <i className="ri-stack-line text-sm" style={{ color: '#86BC25' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B9B1F' }}>6 Canaux Médias</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground-950">Un écosystème de contenu intégré</h2>
              <p className="text-base max-w-2xl mx-auto text-foreground-600">Chaque canal a sa mission, son audience, son format. Ensemble, ils couvrent tout le spectre de l'intelligence réglementaire.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaChannels.map((channel, idx) => (
                <ScrollReveal key={channel.id} delay={idx * 80}>
                  <div
                    className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                    style={{ background: '#ffffff', border: '1px solid rgba(134,188,37,0.06)' }}
                    onClick={() => navigate(channel.href)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${channel.accent}12`, border: `1px solid ${channel.accent}25` }}>
                        <i className={`${channel.icon} text-lg`} style={{ color: channel.accent }} />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground-950">{channel.title}</h3>
                        <p className="text-xs text-foreground-500">{channel.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-5 flex-1 text-foreground-600">{channel.description}</p>
                    <div className="flex items-center gap-4 mb-4">
                      {channel.stats.map((stat, si) => (
                        <div key={si} className="text-center">
                          <div className="text-lg font-bold" style={{ color: channel.accent }}>{stat.value}</div>
                          <div className="text-[10px] font-medium uppercase tracking-wider text-foreground-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold pt-3 border-t border-background-100" style={{ color: channel.accent }}>
                      {channel.cta}
                      <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ STUDIO MÉDIA — SPOTLIGHT ═══ */}
        <section className="py-16 md:py-24 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-8 md:p-12" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)', border: '1px solid rgba(212,175,55,0.12)' }}>
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(212,175,55,0.10)', border: '1px solid rgba(212,175,55,0.20)' }}>
                    <i className="ri-film-line text-xs" style={{ color: '#D4AF37' }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#D4AF37' }}>KOS Studio Média</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Production industrialisée de contenu</h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Le Studio Média KOS transforme l'expertise réglementaire en contenus à haute valeur ajoutée. 4 frameworks de production indépendants : Podcast, YouTube, GEO/SEO et Business Dev. Chaque contenu est une machine à générer de l'autorité, de la visibilité et des missions.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-7">
                    {[
                      { icon: 'ri-mic-line', label: 'Podcast', desc: '12 épisodes / an' },
                      { icon: 'ri-video-line', label: 'YouTube', desc: 'Templates calibrés' },
                      { icon: 'ri-search-line', label: 'GEO/SEO', desc: '5 optimisations' },
                      { icon: 'ri-line-chart-line', label: 'Business Dev', desc: '6 étapes' },
                    ].map((fw, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.12)' }}>
                          <i className={`${fw.icon} text-sm`} style={{ color: '#86BC25' }} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{fw.label}</div>
                          <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{fw.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/studio-media')} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#080c14' }}>
                    <i className="ri-film-line" />
                    Visiter le Studio Média
                  </button>
                </div>

                <div className="hidden lg:block">
                  <div className="space-y-3">
                    {[
                      { step: '01', title: 'Analyse', desc: 'Identification du sujet réglementaire à fort potentiel SEO/GEO' },
                      { step: '02', title: 'Production', desc: 'Rédaction, enregistrement, montage — pipeline autonome' },
                      { step: '03', title: 'Optimisation', desc: 'SEO, GEO, Schema.org, miniatures, accroches' },
                      { step: '04', title: 'Publication', desc: 'Multi-canal : site, YouTube, LinkedIn, newsletter' },
                      { step: '05', title: 'Conversion', desc: 'Lead magnet, CTA contextuel, nurturing automatique' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(134,188,37,0.08)' }}>
                        <span className="text-lg font-bold flex-shrink-0" style={{ color: '#86BC25' }}>{item.step}</span>
                        <div>
                          <div className="text-sm font-bold text-white">{item.title}</div>
                          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-20 bg-background-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-6">
                De l'expertise au contenu, du contenu à la mission
              </h2>
              <p className="text-lg mb-8 leading-relaxed text-foreground-600">
                L'écosystème média KOS est votre source d'intelligence réglementaire en Afrique francophone. <strong>Pour un accompagnement personnalisé, devis confidentiel sur mesure.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#080c14' }}>
                  <i className="ri-mail-send-line" />
                  Demander un devis confidentiel
                </button>
                <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:-translate-y-0.5" style={{ border: '1.5px solid rgba(0,0,0,0.15)', color: '#0a0a0a', background: '#ffffff' }}>
                  <i className="ri-quill-pen-line" />
                  Lire le blog
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
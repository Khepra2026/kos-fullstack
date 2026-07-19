import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const PARTNERSHIP_TYPES = [
  {
    id: 'academic',
    icon: 'ri-graduation-cap-line',
    title: 'Partenariats Académiques',
    subtitle: 'Universités & Centres de Recherche',
    description: 'Co-publication, co-édition de rapports, data sharing, stages et chaires de recherche en régulation financière africaine.',
    benefits: [
      'Co-branding sur observatoires sectoriels',
      'Accès gratuit aux données KOS pour la recherche',
      'Stages étudiants (data, conformité, audit)',
      'Conférences conjointes & webinars',
      'Citations académiques → backlinks .edu',
    ],
    cta: 'Devenir partenaire académique',
  },
  {
    id: 'media',
    icon: 'ri-newspaper-line',
    title: 'Partenariats Médias',
    subtitle: 'Presse Économique & Financière Africaine',
    description: 'Diffusion de nos analyses, interviews d\'experts, tribunes et contenus co-produits avec les médias économiques africains.',
    benefits: [
      'Contenu exclusif pour vos lecteurs',
      'Interviews d\'experts KHEPRA sur l\'actualité réglementaire',
      'Tribunes co-signées (CEO, Managing Partner)',
      'Backlinks depuis domaines médias africains',
      'Visibilité mutuelle sur les réseaux sociaux',
    ],
    cta: 'Proposer un partenariat média',
  },
  {
    id: 'thinktank',
    icon: 'ri-lightbulb-line',
    title: 'Think Tanks & Instituts',
    subtitle: 'Policy Research & Advocacy',
    description: 'Collaboration avec les think tanks africains et internationaux sur les politiques publiques, la régulation financière et l\'inclusion.',
    benefits: [
      'Co-publication de policy papers',
      'Données KOS pour vos recherches',
      'Événements conjoints (dîners-débats, conférences)',
      'Backlinks depuis .org et think tanks',
      'Influence sur les politiques publiques africaines',
    ],
    cta: 'Collaborer avec KHEPRA',
  },
  {
    id: 'institution',
    icon: 'ri-building-2-line',
    title: 'Institutions & Régulateurs',
    subtitle: 'BCEAO, COBAC, CIMA, Autorités de Supervision',
    description: 'Partenariats institutionnels pour contribuer à l\'amélioration du cadre réglementaire et à la diffusion des bonnes pratiques.',
    benefits: [
      'Contribution aux consultations publiques',
      'Rapports de benchmarking pour les régulateurs',
      'Formation des équipes de supervision',
      'Backlinks depuis sites institutionnels (.org, .int)',
      'Reconnaissance officielle',
    ],
    cta: 'Contacter notre bureau institutionnel',
  },
];

const BACKLINK_STRATEGY = [
  { pillar: 'Domaines .edu', target: '15 backlinks', status: 'En cours', desc: 'Partenariats avec universités africaines et européennes (Paris 1, Sciences Po, UCAD, Félix Houphouët-Boigny)', progress: 60 },
  { pillar: 'Domaines médias', target: '25 backlinks', status: 'Actif', desc: 'Jeune Afrique, Financial Afrik, Ecofin, Africa Business+, Forbes Afrique, Le Point Éco', progress: 45 },
  { pillar: 'Think Tanks .org', target: '10 backlinks', status: 'En cours', desc: 'IMF, Banque Mondiale, African Development Bank, OIF, Brookings, CERAP', progress: 30 },
  { pillar: 'Institutions .int/.org', target: '8 backlinks', status: 'Planifié', desc: 'BCEAO, COBAC, CIMA, UEMOA, CEMAC, GAFI, OHADA', progress: 15 },
  { pillar: 'Partenaires tech', target: '12 backlinks', status: 'Actif', desc: 'Readdy, Supabase, Vercel, Netlify, LinkedIn, Google Cloud', progress: 50 },
  { pillar: 'Associations pro', target: '10 backlinks', status: 'Planifié', desc: 'APBEF, FAGACE, APIM, Africa Fintech Forum, Chambers of Commerce', progress: 20 },
];

const KPIS = [
  { value: '80', label: 'Total backlinks cible', icon: 'ri-link-m', color: '#2d7518' },
  { value: '6', label: 'Piliers stratégiques', icon: 'ri-stack-line', color: '#5ba832' },
  { value: '4', label: 'Types de partenariats', icon: 'ri-service-line', color: '#d4a82a' },
  { value: '37%', label: 'Progression moyenne', icon: 'ri-line-chart-line', color: '#378e1d' },
];

export default function PartenariatsAcademiquesPage() {
  const navigate = useNavigate();
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null);

  return (
    <>
      <SeoHead
        title="Partenariats Académiques & Backlinks Stratégiques — KHEPRA EXPERTS"
        description="Stratégie de backlinks et partenariats académiques KHEPRA : universités, médias, think tanks, institutions réglementaires. 80 backlinks ciblés, 6 piliers stratégiques, renforcement autorité digitale Afrique francophone. Méthodologie Big Four."
        keywords="partenariats académiques Afrique, backlinks stratégiques, autorité digitale KHEPRA, SEO B2B Afrique francophone, partenariats médias africains, think tanks régulation financière"
        canonicalPath="/partenariats-academiques/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f7f3ec 40%, #faf7f1 100%)' }}>
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,117,24,0.10), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.08), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar label="Stratégie d'Autorité Digitale" variant="centered-pillars" icon="ri-service-line" accentColor="primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 mb-6 text-center leading-tight">
              Partenariats Académiques{' '}
              <span style={{ color: '#2d7518' }}>&</span>{' '}
              <span style={{ color: '#d4a82a' }}>Backlinks Stratégiques</span>
            </h1>
            <p className="text-xl text-foreground-600 mb-10 max-w-3xl mx-auto text-center leading-relaxed">
              Une stratégie de renforcement systématique de l'autorité digitale KOS via 4 types de partenariats et 6 piliers de backlinks. Objectif : <strong className="text-foreground-900">80 backlinks qualifiés</strong> en 12 mois, méthodologie Big Four.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {KPIS.map((kpi, i) => (
                <div key={i} className="bg-white/70 rounded-xl p-5 text-center border border-background-200">
                  <div className="text-2xl font-bold mb-1" style={{ color: kpi.color }}>{kpi.value}</div>
                  <div className="text-xs text-foreground-500 font-medium flex items-center justify-center gap-1.5">
                    <i className={kpi.icon} style={{ color: kpi.color }} />
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Types de Partenariats */}
        <section className="py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="4 Types de Partenariats" variant="left-accent" icon="ri-service-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">Un écosystème de collaborations stratégiques</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Chaque partenariat est conçu pour générer une valeur mutuelle en backlinks, visibilité et crédibilité.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PARTNERSHIP_TYPES.map((partner) => {
                const isExpanded = expandedPartner === partner.id;
                return (
                  <div key={partner.id} className="bg-white rounded-2xl border border-background-200 overflow-hidden transition-all">
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedPartner(isExpanded ? null : partner.id)}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(45,117,24,0.08)', border: '1px solid rgba(45,117,24,0.15)' }}>
                          <i className={`${partner.icon} text-xl`} style={{ color: '#2d7518' }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-display font-bold text-foreground-950">{partner.title}</h3>
                          <p className="text-sm text-foreground-600">{partner.subtitle}</p>
                        </div>
                        <i className={`ri-arrow-up-s-line text-foreground-400 ${!isExpanded ? 'hidden' : ''}`} />
                        <i className={`ri-arrow-down-s-line text-foreground-400 ${isExpanded ? 'hidden' : ''}`} />
                      </div>
                      <p className="text-sm text-foreground-600 leading-relaxed mb-4">{partner.description}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate('/contact/'); }}
                        className="text-sm font-bold cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
                        style={{ color: '#2d7518' }}
                      >
                        {partner.cta} <i className="ri-arrow-right-line" />
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-background-200 pt-4">
                        <p className="text-xs font-bold text-foreground-500 uppercase tracking-widest mb-3">Bénéfices</p>
                        <div className="grid grid-cols-1 gap-2">
                          {partner.benefits.map((b, bi) => (
                            <div key={bi} className="flex items-center gap-2 text-sm text-foreground-700 bg-background-50 rounded-lg px-3 py-2">
                              <i className="ri-check-line text-xs" style={{ color: '#2d7518' }} />
                              {b}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Backlinks Strategy */}
        <section className="py-20 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Stratégie Backlinks" variant="left-accent" icon="ri-link-m" accentColor="accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">6 Piliers pour 80 Backlinks Qualifiés</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Méthodologie Big Four : chaque pilier est mesuré, suivi et optimisé trimestriellement.</p>
            </div>
            <div className="space-y-4 max-w-5xl mx-auto">
              {BACKLINK_STRATEGY.map((pillar, i) => (
                <div key={i} className="bg-white rounded-xl border border-background-200 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#2d7518' }}>Pilier {i + 1}</span>
                        <h3 className="text-base font-bold text-foreground-950">{pillar.pillar}</h3>
                      </div>
                      <p className="text-sm text-foreground-600">{pillar.desc}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: '#d4a82a' }}>{pillar.target}</div>
                        <div className="text-[10px] text-foreground-500">cible</div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        pillar.status === 'Actif' ? 'bg-emerald-100 text-emerald-700' :
                        pillar.status === 'En cours' ? 'bg-amber-100 text-amber-700' :
                        'bg-foreground-100 text-foreground-600'
                      }`}>{pillar.status}</span>
                    </div>
                  </div>
                  <div className="w-full bg-background-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pillar.progress}%`, background: 'linear-gradient(90deg, #2d7518, #5ba832)' }}
                    />
                  </div>
                  <div className="text-[10px] text-foreground-400 mt-1 text-right">{pillar.progress}%</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #0d1f0a 0%, #081a05 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(45,117,24,0.15)', border: '1px solid rgba(45,117,24,0.25)' }}>
              <i className="ri-service-line text-2xl" style={{ color: '#4a9e5b' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Devenez partenaire de KHEPRA EXPERTS</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">Universités, médias, think tanks, institutions — contactez-nous pour construire un partenariat sur mesure.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' }}>
                <i className="ri-mail-send-line" />
                Proposer un partenariat
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}




/* ============================================================
   KOS BU1 — Regulatory Intelligence Authority
   Landing Page — Intelligence Réglementaire Francophone Africa
   Modèle : 100% contractuel, devis confidentiel, zéro SaaS
   ============================================================ */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL_BU1 = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const ENGAGEMENTS = [
  {
    id: 'regulatory-watch',
    icon: 'ri-radar-line',
    name: 'Regulatory Watch™',
    tagline: 'Veille réglementaire automatisée 24/7',
    description: 'Détection des nouveaux textes COBAC, BEAC, BCEAO, GABAC, GAFI en moins de 2h après publication officielle. Alertes multi-canaux : email, Slack, Teams. Déploiement sur mission.',
    features: ['Ingestion automatique RSS/Scraping', 'Classification NLP par domaine', 'Historique 10 ans indexé', 'Alertes personnalisables'],
    metric: '1 500+',
    metricLabel: 'institutions couvertes',
    engagementType: 'Mission de veille',
    color: '#5ba832',
  },
  {
    id: 'executive-briefs',
    icon: 'ri-file-list-3-line',
    name: 'Executive Briefs™',
    tagline: 'Synthèses exécutives trimestrielles board-ready',
    description: 'Briefs 5-7 pages par domaine et juridiction. Format COMEX, CA, DG. Analyse d\'impact + recommandations. Rédigés par IA, validés par des juristes senior.',
    features: ['4 briefs trimestriels/an', 'Format board-ready PDF', 'Analyse d\'impact sectoriel', 'Recommandations actionnables'],
    metric: '5 000+',
    metricLabel: 'décideurs servis',
    engagementType: 'Mission récurrente',
    color: '#d4a82a',
  },
  {
    id: 'compliance-radar',
    icon: 'ri-bar-chart-2-line',
    name: 'Compliance Radar™',
    tagline: 'Heatmap réglementaire interactive en temps réel',
    description: 'Dashboard de heatmap par juridiction, domaine et criticité. Visualisation des textes à venir, deadlines et zones de risque. Multi-utilisateurs.',
    features: ['Heatmap interactive temps réel', 'Filtres multi-critères', 'Alertes deadline automatiques', 'Export PDF/Excel'],
    metric: '98%',
    metricLabel: 'couverture réglementaire',
    engagementType: 'Mission de déploiement',
    color: '#2d7518',
  },
  {
    id: 'interpretation-notes',
    icon: 'ri-book-open-line',
    name: 'Interpretation Notes™',
    tagline: 'Notes juridiques article par article',
    description: 'Analyse détaillée des textes complexes. Implications pratiques, jurisprudence, recommandations. Rédigées par AI + validées par juristes senior. Versioning complet.',
    features: ['Analyse article par article', 'Jurisprudence intégrée', 'Recommandations pratiques', 'Versioning & audit trail'],
    metric: '65%',
    metricLabel: 'réduction temps analyse',
    engagementType: 'Mission ponctuelle',
    color: '#378e1d',
  },
];

const BENEFITS = [
  { icon: 'ri-time-line', label: 'Détection sous 2h', desc: 'Tout nouveau texte réglementaire détecté en moins de 2 heures après publication officielle' },
  { icon: 'ri-shield-check-line', label: '98% Couverture', desc: 'COBAC, BEAC, BCEAO, GABAC, GAFI, GIABA, OHADA — couverture réglementaire totale' },
  { icon: 'ri-brain-line', label: 'Interprétation IA + Expert', desc: 'Intelligence artificielle + validation experte — de l\'information brute à l\'analyse actionable' },
  { icon: 'ri-alarm-line', label: 'Alertes multi-canal', desc: 'Email, Slack, Teams, API — ne manquez plus aucune obligation réglementaire' },
  { icon: 'ri-global-line', label: '17 pays', desc: 'UEMOA (8 pays) + CEMAC (6 pays) + zones francophones additionnelles' },
  { icon: 'ri-file-text-line', label: 'Devis confidentiel', desc: 'Chaque mission est unique — proposition commerciale sur mesure après diagnostic' },
];

const TESTIMONIALS = [
  { role: 'Chief Compliance Officer', org: 'Banque Commerciale CEMAC', quote: 'Le Regulatory Watch™ nous a économisé 40h/mois de veille manuelle. Nous recevons les alertes avant même que notre équipe juridique ait eu le temps de lire le journal officiel.', score: 'Score KOS: 94/100' },
  { role: 'Directeur Général', org: 'Groupe Microfinance UEMOA', quote: 'Les Executive Briefs™ sont devenus notre outil de référence pour les COMEX. 7 pages claires, actionnables, sans les 200 pages de texte original.', score: 'ROI x12 en 6 mois' },
  { role: 'Directeur Risques', org: 'Établissement de Paiement', quote: 'Le Compliance Radar™ nous a permis d\'anticiper la circulaire BCEAO 3 semaines avant sa publication. Nous avions déjà notre plan d\'action prêt.', score: '14 inspections réussies' },
];

const FAQS = [
  { q: 'Quelles autorités réglementaires sont couvertes ?', a: 'COBAC (CEMAC), BEAC, BCEAO, GABAC, GAFI, GIABA, OHADA, Commission Bancaire UEMOA, et toutes les autorités nationales des 17 pays de notre périmètre.' },
  { q: 'Comment est organisée une mission de veille réglementaire ?', a: 'Chaque mission débute par un diagnostic de vos besoins spécifiques. Un Directeur BU1 analyse votre exposition réglementaire, définit le périmètre, puis émet un devis confidentiel. Après signature du contrat, la solution est déployée et configurée pour votre institution.' },
  { q: 'Les données sont-elles mises à jour en temps réel ?', a: 'Oui. Notre pipeline d\'ingestion surveille les sources officielles toutes les 30 minutes. Le délai moyen entre publication officielle et alerte KOS est de 87 minutes.' },
  { q: 'Puis-je intégrer KOS à mon système de gestion des risques ?', a: 'Oui. Nous proposons une API REST complète dans le cadre des missions de déploiement. La documentation technique est fournie et l\'intégration est incluse dans le périmètre contractuel.' },
];

const bu1FaqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL_BU1}/bu1-regulatory-intelligence/#faq`,
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL_BU1}/bu1-regulatory-intelligence/#webpage`,
      url: `${SITE_URL_BU1}/bu1-regulatory-intelligence/`,
      name: 'BU1 — Regulatory Intelligence Authority | Veille Réglementaire, Alertes, Briefs Exécutifs — KOS',
      description: 'KOS BU1 transforme la complexité réglementaire en intelligence exécutive. 17 pays UEMOA/CEMAC. Devis confidentiel sur mesure.',
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${SITE_URL_BU1}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL_BU1 },
          { '@type': 'ListItem', position: 2, name: 'BU1 — Intelligence Réglementaire', item: `${SITE_URL_BU1}/bu1-regulatory-intelligence/` },
        ],
      },
    },
  ],
};

export default function BU1RegulatoryIntelligencePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SeoHead
        title="BU1 — Regulatory Intelligence Authority | Veille Réglementaire, Alertes, Briefs Exécutifs — KOS"
        description="KOS BU1 transforme la complexité réglementaire en intelligence exécutive. Regulatory Watch™, Executive Briefs™, Compliance Radar™ pour les institutions financières d'Afrique Francophone. 17 pays, UEMOA/CEMAC. Devis confidentiel sur mesure."
        keywords="intelligence réglementaire Afrique, veille réglementaire BCEAO COBAC, alertes réglementaires, briefs exécutifs conformité, Compliance Radar"
        canonicalPath="/bu1-regulatory-intelligence/"
        ogType="website"
        schemaJson={bu1FaqSchema}
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f8f4ee 40%, #faf7f2 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(91,168,50,0.12), transparent)' }} />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,42,0.10), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(91,168,50,0.12)', border: '1px solid rgba(91,168,50,0.25)' }}>
                <i className="ri-radar-line text-lg" style={{ color: '#5ba832' }} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(91,168,50,0.08)', color: '#378e1d', border: '1px solid rgba(91,168,50,0.18)' }}>BU1 — REGULATORY INTELLIGENCE AUTHORITY</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 mb-6 max-w-4xl leading-tight">
              Transformez la complexité réglementaire en{' '}
              <span style={{ color: '#5ba832' }}>intelligence exécutive</span>{' '}
              actionnable
            </h1>
            <p className="text-xl text-foreground-600 mb-10 max-w-3xl leading-relaxed">
              Chaque nouveau texte, chaque amendement, chaque circulaire COBAC, BCEAO, BEAC automatiquement ingéré, interprété et distribué en briefs exécutifs board-ready. 17 pays. <strong className="text-foreground-900">Devis confidentiel sur mesure.</strong>
            </p>
            <div className="flex flex-wrap gap-4 mb-14">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #5ba832, #a3d06a)' }}>
                <i className="ri-mail-send-line" />
                Demander un devis confidentiel
              </button>
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border transition-all hover:-translate-y-0.5" style={{ color: '#5ba832', borderColor: 'rgba(91,168,50,0.3)', background: 'rgba(91,168,50,0.04)' }}>
                <i className="ri-calendar-line" />
                Entretien exploratoire — 30 min
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '1 500+', label: 'Institutions couvertes' },
                { value: '< 2h', label: 'Délai détection' },
                { value: '17 pays', label: 'UEMOA + CEMAC' },
                { value: '22+', label: 'Ans d\'expertise' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 text-center bg-white/60 border border-background-200">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#5ba832' }}>{s.value}</div>
                  <div className="text-xs text-foreground-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENTS ── */}
        <section className="py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="4 Types d'Engagement" variant="left-accent" icon="ri-stack-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">De la réglementation brute à l'intelligence exécutive</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Chaque engagement est une couche supplémentaire d'intelligence. De la veille automatisée au brief board-ready, la valeur monte à chaque étape.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ENGAGEMENTS.map((p, i) => (
                <div key={i} className="rounded-2xl p-8 bg-white border border-background-200 hover:border-background-300 transition-all group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                        <i className={`${p.icon} text-xl`} style={{ color: p.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-lg font-display font-bold text-foreground-950 line-clamp-2" title={p.name}>{p.name}</h3>
                        </div>
                        <p className="text-sm text-foreground-600">{p.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>{p.engagementType}</span>
                    </div>
                  </div>
                  <p className="text-foreground-600 text-sm mb-5 leading-relaxed">{p.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {p.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs text-foreground-600">
                        <i className="ri-check-line text-sm flex-shrink-0" style={{ color: p.color }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-background-200 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold" style={{ color: p.color }}>{p.metric}</span>
                      <span className="text-xs text-foreground-500 ml-2">{p.metricLabel}</span>
                    </div>
                    <button onClick={() => navigate('/contact/')} className="text-xs font-bold px-4 py-2 rounded-full cursor-pointer transition-all hover:scale-105 text-white" style={{ background: p.color }}>
                      Devis confidentiel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #f8fdf4 0%, #f0f9e8 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Pourquoi BU1 ?" variant="left-accent" icon="ri-lightbulb-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Pourquoi BU1 Intelligence Réglementaire ?</h2>
              <p className="text-foreground-600 max-w-xl mx-auto">La veille manuelle coûte 40h/mois à une équipe conformité. KOS BU1 automatise 95% de ce travail dans le cadre d'une mission contractuelle.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-background-200">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-4" style={{ background: 'rgba(91,168,50,0.1)', border: '1px solid rgba(91,168,50,0.2)' }}>
                    <i className={`${b.icon} text-base`} style={{ color: '#5ba832' }} />
                  </div>
                  <div className="text-sm font-bold text-foreground-950 mb-1 line-clamp-2" title={b.label}>{b.label}</div>
                  <div className="text-xs text-foreground-600 leading-relaxed">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Témoignages" variant="left-accent" icon="ri-chat-quote-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Ce que disent nos clients</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 border border-background-200">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (<i key={si} className="ri-star-fill text-sm" style={{ color: '#d4a82a' }} />))}
                  </div>
                  <p className="text-foreground-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="pt-4 border-t border-background-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-foreground-950">{t.role}</div>
                      <div className="text-xs text-foreground-500">{t.org}</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(91,168,50,0.1)', color: '#378e1d' }}>{t.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 bg-background-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="FAQ" variant="left-accent" icon="ri-question-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Questions fréquentes</h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-background-200 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-background-50 transition-all text-left">
                    <span className="text-sm font-semibold text-foreground-950">{faq.q}</span>
                    <i className={`ri-arrow-down-s-line text-base text-foreground-500 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #1a2818 0%, #0d1a0a 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(91,168,50,0.15)', border: '1px solid rgba(91,168,50,0.25)' }}>
              <i className="ri-radar-line text-2xl" style={{ color: '#5ba832' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Prêt à industrialiser votre veille réglementaire ?</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">Un Directeur BU1 analyse votre exposition réglementaire et vous transmet une proposition détaillée sous 72 heures. Sans engagement.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #5ba832, #a3d06a)', color: '#0a0a0a' }}>
                <i className="ri-mail-send-line" />
                Demander un devis confidentiel
              </button>
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border border-white/30 text-white hover:bg-white/10 transition-all">
                <i className="ri-phone-line" />
                Parler à un expert
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}




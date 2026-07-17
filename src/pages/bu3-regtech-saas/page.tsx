/* ============================================================
   KOS BU3 — Regulatory Technology Solutions
   Landing Page — Déploiement technologique sur mission
   Modèle : 100% contractuel, devis confidentiel, zéro SaaS
   ============================================================ */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SOLUTIONS = [
  {
    id: 'regulatory-watch-deployment',
    icon: 'ri-radar-line',
    name: 'KOS Regulatory Watch™',
    tagline: 'Déploiement de veille réglementaire automatisée',
    description: 'Mise en place d\'un système de veille réglementaire sur mesure. Ingestion, classification, alerte et stockage de tous les textes COBAC, BEAC, BCEAO, GABAC, GAFI. Déploiement sur votre infrastructure ou environnement sécurisé KOS.',
    features: ['Alertes temps réel (email/Slack/Teams)', 'Base documentaire full-text search', 'Classification automatique', 'Export PDF/Excel + API REST'],
    engagementType: 'Mission de déploiement',
    color: '#5ba832',
  },
  {
    id: 'compliance-score-deployment',
    icon: 'ri-bar-chart-2-line',
    name: 'KOS Compliance Score™',
    tagline: 'Système de scoring de conformité continu multi-axes',
    description: 'Déploiement d\'un système de scoring continu avec Score Global + 5 axes en temps réel. Heatmap conformité, gap analysis automatique, benchmark sectoriel anonymisé, alertes dégradation, rapport board-ready.',
    features: ['Score Global + 5 axes (Gouvernance, AML, Risque, IT, Audit)', 'Benchmark sectoriel anonymisé', 'Alertes dégradation score', 'Rapport board-ready automatique'],
    engagementType: 'Mission de déploiement',
    color: '#d4a82a',
  },
  {
    id: 'inspection-simulator',
    icon: 'ri-stethoscope-line',
    name: 'KOS Inspection Simulator™',
    tagline: 'Simulation d\'inspection COBAC/BCEAO sur mesure',
    description: 'Outil de simulation d\'inspection déployé pour votre institution. Questionnaire dynamique → vérification réponses → identification gaps → rapport d\'inspection simulée → scoring readiness.',
    features: ['Simulation inspection COBAC/BCEAO/Commission Bancaire', 'Questionnaire dynamique adapté', 'Génération plan remédiation', 'Scoring readiness pré-inspection'],
    engagementType: 'Mission de déploiement',
    color: '#2d7518',
  },
  {
    id: 'governance-monitor',
    icon: 'ri-shield-check-line',
    name: 'KOS Governance Monitor™',
    tagline: 'Monitoring continu de la gouvernance CA',
    description: 'Système de suivi des mandats, calcul d\'indépendance CA automatique, calendrier comités, formations obligatoires, évaluations CA. Conformité Circulaire COBAC R-2017/01.',
    features: ['Suivi mandats administrateurs', 'Calcul indépendance CA automatique', 'Calendrier comités + PV', 'Conformité Circulaire COBAC 01/2017'],
    engagementType: 'Mission de déploiement',
    color: '#378e1d',
  },
];

const ENGAGEMENT_MODELS = [
  {
    icon: 'ri-settings-3-line',
    title: 'Déploiement sur mesure',
    desc: 'Analyse de votre architecture existante, déploiement adapté à vos contraintes techniques et réglementaires.',
  },
  {
    icon: 'ri-team-line',
    title: 'Formation équipes',
    desc: 'Transfert de compétences à vos équipes conformité, risque et IT pour une autonomie progressive.',
  },
  {
    icon: 'ri-database-2-line',
    title: 'Hébergement maîtrisé',
    desc: 'Sur votre infrastructure ou environnement sécurisé KOS. Conformité données locales garantie.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Maintenance évolutive',
    desc: 'Mises à jour réglementaires continues, adaptation aux nouveaux textes, support technique.',
  },
  {
    icon: 'ri-file-chart-line',
    title: 'Rapports board-ready',
    desc: 'Livrables format COMEX et CA, tableaux de bord exécutifs, indicateurs clés de conformité.',
  },
  {
    icon: 'ri-lock-line',
    title: 'Sécurité & confidentialité',
    desc: 'Protocoles de sécurité stricts, chiffrement des données, accès restreints et auditables.',
  },
];

const STACK = [
  { layer: 'Couche 1', name: 'Regulatory Data Layer', desc: 'PostgreSQL + pgVector + Supabase Storage + Redis Cache — ingestion et stockage des données réglementaires', icon: 'ri-database-2-line' },
  { layer: 'Couche 2', name: 'Knowledge Graph', desc: 'Modélisation des relations réglementaires — traçabilité texte → obligation → contrôle', icon: 'ri-git-branch-line' },
  { layer: 'Couche 3', name: 'AI Intelligence Layer', desc: 'GPT-4o / Claude + RAG pgVector + ML scoring + Agent orchestration — analyse et scoring', icon: 'ri-brain-line' },
  { layer: 'Couche 4', name: 'Automation Layer', desc: 'Workflows ingestion → alerte → rapport → distribution — automatisation configurable', icon: 'ri-flow-chart' },
  { layer: 'Couche 5', name: 'Client Applications', desc: 'React 19 + Supabase Realtime + REST API + SSO/Authentification — interfaces utilisateurs', icon: 'ri-window-line' },
];

const FAQS = [
  { q: 'Comment se déroule un déploiement KOS Technology ?', a: 'Chaque déploiement commence par un diagnostic de votre infrastructure existante et de vos besoins réglementaires. Un Directeur BU3 conduit l\'analyse, puis émet une proposition commerciale détaillée (devis confidentiel). Après signature du contrat, une équipe dédiée procède au déploiement, à la configuration et à la formation de vos équipes.' },
  { q: 'Les solutions KOS sont-elles hébergées chez nous ou chez KOS ?', a: 'Les deux options sont possibles. Nous pouvons déployer sur votre infrastructure (on-premise) ou dans notre environnement sécurisé. Le choix dépend de vos contraintes de sécurité, de votre régulateur et de vos préférences techniques. Ce point est défini lors de la phase de cadrage.' },
  { q: 'Quel est le délai typique de déploiement ?', a: 'Le délai dépend du périmètre défini contractuellement. Un déploiement standard (1-2 solutions) prend généralement 2 à 4 semaines. Un déploiement multi-solutions ou multi-entités peut s\'étendre sur 6 à 8 semaines. Le calendrier précis est détaillé dans la proposition commerciale.' },
  { q: 'Proposez-vous une maintenance continue après déploiement ?', a: 'Oui. Nos engagements incluent une maintenance évolutive : mises à jour réglementaires, adaptation aux nouveaux textes, support technique et formation continue. Ces services font l\'objet d\'un contrat de maintenance distinct ou intégré à la mission initiale.' },
];

const SITE_URL_BU3 = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const bu3FaqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL_BU3}/bu3-regtech-saas/#faq`,
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
      '@id': `${SITE_URL_BU3}/bu3-regtech-saas/#webpage`,
      url: `${SITE_URL_BU3}/bu3-regtech-saas/`,
      name: 'BU3 — Solutions Technologiques Réglementaires | Déploiement Scoring, Veille, Simulation — KOS',
      description: 'KOS BU3 déploie des solutions technologiques de conformité sur mission. 17 pays UEMOA/CEMAC. Devis confidentiel sur mesure.',
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${SITE_URL_BU3}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL_BU3 },
          { '@type': 'ListItem', position: 2, name: 'BU3 — Solutions Technologiques', item: `${SITE_URL_BU3}/bu3-regtech-saas/` },
        ],
      },
    },
  ],
};

export default function BU3RegulatoryTechnologyPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SeoHead
        title="BU3 — Solutions Technologiques Réglementaires | Déploiement Scoring, Veille, Simulation — KOS Authority"
        description="KOS BU3 déploie des solutions technologiques de conformité sur mission : KOS Compliance Score™, KOS Inspection Simulator™, KOS Regulatory Watch™, KOS Governance Monitor™. Déploiement sur mesure, devis confidentiel. UEMOA, CEMAC."
        keywords="solutions technologiques conformité Afrique, déploiement compliance score BCEAO COBAC, inspection simulator, governance monitor, veille réglementaire automatisée"
        canonicalPath="/bu3-regtech-saas/"
        ogType="website"
        schemaJson={bu3FaqSchema}
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f8f5ed 40%, #faf8f2 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(55,142,29,0.12), transparent)' }} />
            <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(91,168,50,0.10), transparent)' }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(55,142,29,0.12)', border: '1px solid rgba(55,142,29,0.25)' }}>
                <i className="ri-settings-3-line text-lg" style={{ color: '#378e1d' }} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(55,142,29,0.08)', color: '#2d7518', border: '1px solid rgba(55,142,29,0.18)' }}>BU3 — REGULATORY TECHNOLOGY SOLUTIONS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 mb-6 max-w-4xl leading-tight">
              Des solutions technologiques déployées sur{' '}
              <span style={{ color: '#378e1d' }}>mission</span>
              , pas des abonnements
            </h1>
            <p className="text-xl text-foreground-600 mb-10 max-w-3xl leading-relaxed">
              KOS Regulatory Watch™, Compliance Score™, Inspection Simulator™, Governance Monitor™. Chaque solution est déployée dans le cadre d'une mission contractuelle, configurée pour votre institution, avec transfert de compétences. <strong className="text-foreground-900">Devis confidentiel sur mesure.</strong>
            </p>
            <div className="flex flex-wrap gap-4 mb-14">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #378e1d, #5ba832)' }}>
                <i className="ri-mail-send-line" />
                Demander un devis confidentiel
              </button>
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer border transition-all hover:-translate-y-0.5" style={{ color: '#378e1d', borderColor: 'rgba(55,142,29,0.3)', background: 'rgba(55,142,29,0.04)' }}>
                <i className="ri-calendar-line" />
                Entretien exploratoire — 30 min
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '4', label: 'Solutions déployables' },
                { value: '17', label: 'Pays UEMOA + CEMAC' },
                { value: '100%', label: 'Déploiement sur mission' },
                { value: '24/7', label: 'Support contractuel' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 text-center bg-white/60 border border-background-200">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#378e1d' }}>{s.value}</div>
                  <div className="text-xs text-foreground-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTIONS ── */}
        <section className="py-20 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="4 Solutions Technologiques" variant="left-accent" icon="ri-stack-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">Déployées sur mission, adaptées à votre institution</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Chaque solution est indépendante ou combinable dans le cadre d'un engagement contractuel unique.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOLUTIONS.map((p, i) => (
                <div key={i} className="rounded-2xl p-8 bg-white border border-background-200 hover:border-background-300 transition-all">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                      <i className={`${p.icon} text-xl`} style={{ color: p.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-bold text-foreground-950 mb-0.5 line-clamp-2" title={p.name}>{p.name}</h3>
                      <p className="text-sm text-foreground-600">{p.tagline}</p>
                    </div>
                  </div>
                  <p className="text-foreground-600 text-sm mb-5 leading-relaxed">{p.description}</p>
                  <div className="space-y-2 mb-5">
                    {p.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs text-foreground-600">
                        <i className="ri-check-line text-sm flex-shrink-0" style={{ color: p.color }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-background-200 flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}25` }}>{p.engagementType}</span>
                    <button onClick={() => navigate('/contact/')} className="text-xs font-bold px-4 py-2 rounded-full cursor-pointer transition-all hover:scale-105 text-white" style={{ background: p.color }}>
                      Devis confidentiel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MODÈLE D'ENGAGEMENT ── */}
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #f8fdf4 0%, #f0f9e8 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Modèle d'Engagement" variant="left-accent" icon="ri-file-text-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Modèle d'engagement — 100% contractuel</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Pas d'abonnement, pas de self-service. Chaque déploiement technologique est une mission sur mesure, avec devis confidentiel.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ENGAGEMENT_MODELS.map((em, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-background-200">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-4" style={{ background: 'rgba(55,142,29,0.08)', border: '1px solid rgba(55,142,29,0.15)' }}>
                    <i className={`${em.icon} text-base`} style={{ color: '#378e1d' }} />
                  </div>
                  <div className="text-sm font-bold text-foreground-950 mb-1.5 line-clamp-2" title={em.title}>{em.title}</div>
                  <div className="text-xs text-foreground-600 leading-relaxed">{em.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="py-16 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Architecture Technique" variant="left-accent" icon="ri-stack-line" accentColor="primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Architecture technique 5 couches</h2>
              <p className="text-foreground-600 max-w-xl mx-auto">Régulation → Données → Intelligence → Décisions. Chaque couche amplifie la valeur de la précédente.</p>
            </div>
            <div className="space-y-3">
              {STACK.map((s, i) => (
                <div key={i} className="flex items-center gap-5 bg-white rounded-xl p-5 border border-background-200">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(55,142,29,0.1)', border: '1px solid rgba(55,142,29,0.2)' }}>
                    <i className={`${s.icon} text-base`} style={{ color: '#378e1d' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#378e1d' }}>{s.layer}</span>
                      <span className="text-sm font-bold text-foreground-950 line-clamp-1" title={s.name}>{s.name}</span>
                    </div>
                    <div className="text-xs text-foreground-500">{s.desc}</div>
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
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #1a2a10 0%, #0d1f06 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-6" style={{ background: 'rgba(55,142,29,0.15)', border: '1px solid rgba(55,142,29,0.25)' }}>
              <i className="ri-settings-3-line text-2xl" style={{ color: '#5ba832' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Prêt à déployer l'intelligence réglementaire dans votre institution ?</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">Un Directeur BU3 analyse votre contexte et vous transmet une proposition détaillée sous 72 heures. Sans engagement.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #378e1d, #5ba832)', color: '#fff' }}>
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
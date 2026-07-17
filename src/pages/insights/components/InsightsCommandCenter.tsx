import { useNavigate } from 'react-router-dom';

export default function InsightsCommandCenter() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'boardroom',
      icon: 'ri-government-line',
      title: 'Boardroom Intelligence',
      desc: 'Gouvernance, Conseil d\'Administration, reporting stratégique pour administrateurs et DG.',
      color: 'from-slate-800 to-slate-900',
      accent: '#86BC25',
      cta: 'Générer mon rapport CA',
      ctaHref: '/board-report',
      ctaIcon: 'ri-file-chart-line',
      links: [
        { label: 'Rapport du Conseil d\'Administration', href: '/board-report' },
        { label: 'DAF Externalisée', href: '/blog/daf-externalise-pilotage-financier-pme-afrique/' },
        { label: 'Évaluation gouvernance', href: '/tools/evaluation-gouvernance' },
      ],
      tag: 'Prioritaire',
      tagColor: 'bg-gold-500',
    },
    {
      id: 'cfo',
      icon: 'ri-funds-line',
      title: 'CFO & Finance Lab',
      desc: 'Direction financière, trésorerie, contrôle interne, reporting BCEAO pour PME et institutions.',
      color: 'from-strategic-900 to-strategic-950',
      accent: '#86BC25',
      cta: 'Lire les analyses',
      ctaHref: '/blog/daf-externalise-pilotage-financier-pme-afrique/',
      ctaIcon: 'ri-article-line',
      links: [
        { label: 'DAF Externalisée : guide complet', href: '/blog/daf-externalise-pilotage-financier-pme-afrique/' },
        { label: 'Contrôle interne & Trésorerie', href: '/blog/controle-interne-tresorerie-pme-afrique-syscohada/' },
        { label: 'Diagnostic organisationnel', href: '/tools/diagnostic-organisationnel' },
      ],
      tag: 'Finance',
      tagColor: 'bg-strategic-600',
    },
    {
      id: 'gouvernance',
      icon: 'ri-scales-line',
      title: 'Gouvernance & Conformité',
      desc: 'Conformité OHADA, réglementation BCEAO, audit interne, politiques de gouvernance.',
      color: 'from-brand-900 to-brand-950',
      accent: '#0a0a0a',
      cta: 'Évaluer ma conformité',
      ctaHref: '/tools/evaluation-gouvernance',
      ctaIcon: 'ri-shield-check-line',
      links: [
        { label: 'Évaluation gouvernance', href: '/tools/evaluation-gouvernance' },
        { label: 'Audit social', href: '/services/audit-social' },
        { label: 'Conformité SFD', href: '/sfd-conformite' },
      ],
      tag: 'Conformité',
      tagColor: 'bg-brand-600',
    },
    {
      id: 'market',
      icon: 'ri-global-line',
      title: 'Africa Market Intelligence',
      desc: 'Tendances marchés africains, opportunités UEMOA/CEMAC, analyses sectorielles.',
      color: 'from-gold-900 to-gold-950',
      accent: '#86BC25',
      cta: 'Explorer les marchés',
      ctaHref: '/insights',
      ctaIcon: 'ri-map-2-line',
      links: [
        { label: 'Afrique francophone', href: '/regions/afrique-francophone' },
        { label: 'UEMOA & CEMAC', href: '/regions/uemoa-cemac' },
        { label: 'Fintech Afrique', href: '/industries/fintech' },
      ],
      tag: 'Marchés',
      tagColor: 'bg-gold-600',
    },
    {
      id: 'risk',
      icon: 'ri-alarm-warning-line',
      title: 'Risk & Crisis Room',
      desc: 'Gestion des risques opérationnels, financiers et réglementaires. Plans de continuité.',
      color: 'from-brand-900 to-brand-950',
      accent: '#0a0a0a',
      cta: 'Évaluer mes risques',
      ctaHref: '/tools/evaluation-cybersecurite',
      ctaIcon: 'ri-radar-line',
      links: [
        { label: 'Évaluation cybersécurité', href: '/tools/evaluation-cybersecurite' },
        { label: 'Audit inclusion financière', href: '/tools/audit-inclusion-financiere' },
        { label: 'Conseil stratégique', href: '/services/conseil-strategique' },
      ],
      tag: 'Risques',
      tagColor: 'bg-brand-600',
    },
    {
      id: 'strategy',
      icon: 'ri-map-2-line',
      title: 'Strategy Playbooks',
      desc: 'Guides stratégiques actionnables pour PME, ONG et institutions financières africaines.',
      color: 'from-brand-900 to-brand-950',
      accent: '#0a0a0a',
      cta: 'Voir les guides',
      ctaHref: '/resources',
      ctaIcon: 'ri-book-open-line',
      links: [
        { label: 'Ressources & guides PDF', href: '/resources' },
        { label: 'Développement organisationnel', href: '/services/developpement-organisationnel' },
        { label: 'Levée de fonds', href: '/services/levee-de-fonds' },
      ],
      tag: 'Stratégie',
      tagColor: 'bg-brand-600',
    },
    {
      id: 'ai',
      icon: 'ri-robot-line',
      title: 'AI & Performance',
      desc: 'Intelligence artificielle appliquée à la finance, transformation digitale, outils IA.',
      color: 'from-brand-900 to-brand-950',
      accent: '#0a0a0a',
      cta: 'Tester les outils IA',
      ctaHref: '/tools',
      ctaIcon: 'ri-cpu-line',
      links: [
        { label: 'Outils digitaux', href: '/tools' },
        { label: 'Transformation digitale', href: '/services/transformation-digitale' },
        { label: 'Maturité digitale', href: '/tools/maturite-digitale' },
      ],
      tag: 'Innovation',
      tagColor: 'bg-brand-600',
    },
    {
      id: 'tools',
      icon: 'ri-tools-line',
      title: 'Executive Tools',
      desc: 'Outils gratuits de diagnostic, scoring et génération de rapports pour dirigeants.',
      color: 'from-gold-900 to-gold-950',
      accent: '#86BC25',
      cta: 'Accéder aux outils',
      ctaHref: '/tools',
      ctaIcon: 'ri-dashboard-line',
      links: [
        { label: 'Rapport CA gratuit', href: '/board-report' },
        { label: 'Diagnostic organisationnel', href: '/tools/diagnostic-organisationnel' },
        { label: 'Évaluation gouvernance', href: '/tools/evaluation-gouvernance' },
      ],
      tag: 'Gratuit',
      tagColor: 'bg-gold-500',
      highlight: true,
    },
    {
      id: 'cases',
      icon: 'ri-briefcase-line',
      title: 'Case Studies',
      desc: 'Études de cas réels : PME, banques, ONG, SFD transformés par Khepra Experts.',
      color: 'from-strategic-900 to-strategic-950',
      accent: '#86BC25',
      cta: 'Voir les réalisations',
      ctaHref: '/case-studies',
      ctaIcon: 'ri-eye-line',
      links: [
        { label: 'Études de cas', href: '/case-studies' },
        { label: 'Microfinance & SFD', href: '/industries/microfinance' },
        { label: 'PME & Startups', href: '/industries/pme' },
      ],
      tag: 'Preuves',
      tagColor: 'bg-strategic-600',
    },
    {
      id: 'ceo',
      icon: 'ri-newspaper-line',
      title: 'CEO Brief',
      desc: 'Synthèses hebdomadaires pour DG et dirigeants : l\'essentiel en 5 minutes.',
      color: 'from-brand-900 to-brand-950',
      accent: '#0a0a0a',
      cta: 'S\'abonner au brief',
      ctaHref: '/#newsletter',
      ctaIcon: 'ri-mail-send-line',
      links: [
        { label: 'Blog & analyses', href: '/blog' },
        { label: 'Livres blancs', href: '/whitepapers' },
      ],
      tag: 'Newsletter',
      tagColor: 'bg-brand-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-900/10 border border-brand-900/20 text-brand-900 px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
            <i className="ri-layout-grid-line" />
            10 Rubriques Stratégiques
          </div>
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            Votre centre de commandement
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chaque rubrique est conçue pour qualifier, convaincre et convertir. Accédez directement aux ressources adaptées à votre problématique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.id}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${cat.highlight ? 'border-gold-400 ring-2 ring-gold-400/30' : 'border-white/10'}`}
              style={{ background: `linear-gradient(135deg, ${cat.color.includes('from-') ? '' : cat.color})` }}>
              <div className={`bg-gradient-to-br ${cat.color} p-5 h-full flex flex-col`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${cat.accent}25`, border: `1px solid ${cat.accent}40` }}>
                    <i className={`${cat.icon} text-lg`} style={{ color: cat.accent }} />
                  </div>
                  <span className={`px-2 py-0.5 text-white text-xs font-bold rounded-full ${cat.tagColor}`}>{cat.tag}</span>
                </div>

                {/* Title & desc */}
                <h3 className="text-sm font-bold text-white mb-2 leading-tight">{cat.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4 flex-1">{cat.desc}</p>

                {/* Links */}
                <div className="space-y-1 mb-4">
                  {cat.links.map((link, li) => (
                    <a key={li} href={link.href} onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white cursor-pointer transition-colors group/link">
                      <i className="ri-arrow-right-s-line flex-shrink-0" style={{ color: cat.accent }} />
                      <span className="truncate group-hover/link:underline">{link.label}</span>
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <a href={cat.ctaHref} onClick={(e) => { e.preventDefault(); navigate(cat.ctaHref); }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all hover:opacity-90 whitespace-nowrap"
                  style={{ background: cat.accent, color: '#0a0a0a' }}>
                  <i className={`${cat.ctaIcon} text-sm`} />
                  {cat.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

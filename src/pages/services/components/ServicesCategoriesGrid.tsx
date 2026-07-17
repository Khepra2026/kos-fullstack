import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';

interface ServiceCategory {
  id: string;
  icon: string;
  title: string;
  hook: string;
  problem: string;
  solution: string;
  results: string[];
  proof: string;
  cta: string;
  ctaHref: string;
  secondaryCta: string;
  secondaryHref: string;
  color: string;
  accent: string;
  links: { label: string; href: string; badge?: string }[];
}

const categories: ServiceCategory[] = [
  {
    id: 'gouvernance',
    icon: 'ri-government-line',
    title: 'Gouvernance & Conseil d\'Administration',
    hook: 'Un CA non structuré bloque 34% des dossiers de financement — avant même la due diligence',
    problem: 'Vos administrateurs se réunissent 2 fois par an, sans ordre du jour structuré, sans comités spécialisés. Les décisions stratégiques sont prises en dehors des instances. Résultat : les investisseurs refusent d\'avancer, les banques exigent des garanties supplémentaires, la BCEAO signale des manquements.',
    solution: 'Khepra Experts déploie un dispositif de gouvernance complet en 90 jours : charte du CA conforme OHADA, 4 comités spécialisés opérationnels (audit, risques, rémunération, stratégie), formation des administrateurs, reporting Board professionnel automatisé.',
    results: ['+40% vitesse décisionnelle dès 3 mois', 'Accès facilité aux financements bancaires', 'Conformité OHADA/BCEAO garantie', 'Rapport CA généré en 30 minutes'],
    proof: '45+ Conseils d\'Administration structurés · Taux de conformité 100% post-mission',
    cta: 'Générer mon rapport CA gratuit',
    ctaHref: '/board-report',
    secondaryCta: 'Évaluer ma gouvernance',
    secondaryHref: '/tools/evaluation-gouvernance',
    color: 'from-amber-900/40 to-amber-950/60',
    accent: '#86BC25',
    links: [
      { label: 'Rapport CA automatisé', href: '/board-report', badge: 'Gratuit' },
      { label: 'Évaluation gouvernance', href: '/tools/evaluation-gouvernance', badge: 'Gratuit' },
      { label: 'Conseil stratégique', href: '/services/conseil-strategique' },
    ],
  },
  {
    id: 'finance',
    icon: 'ri-funds-line',
    title: 'Performance Financière & Pilotage ALM',
    hook: 'Votre entreprise peut afficher 150M FCFA de CA mensuel et être à -75M de trésorerie réelle simultanément',
    problem: 'Chiffre d\'affaires croissant, trésorerie en crise permanente. BFR non maîtrisé, délais de recouvrement de 75 jours, mismatch actif-passif non détecté, reporting financier mensuel inexistant. Chaque mois sans pilotage structuré vous coûte 3 à 8 points de marge nette.',
    solution: 'DAF externalisée opérationnelle, contrôle interne renforcé, optimisation du BFR et du cash conversion cycle, dispositif ALM pour institutions financières (liquidité, mismatch, stress testing), reporting mensuel automatisé conforme BCEAO.',
    results: ['+3 à 8pts de marge nette récupérés', 'BFR réduit de 25 à 40%', 'Trésorerie prévisible à 90 jours', 'Reporting mensuel en 48h vs 3 semaines'],
    proof: '120+ PME et institutions financières accompagnées · Cas : 180M FCFA de marge retrouvée sans croissance du CA',
    cta: 'Lire le guide DAF',
    ctaHref: '/blog/daf-externalise-pilotage-financier-pme-afrique/',
    secondaryCta: 'Diagnostic financier',
    secondaryHref: '/tools/diagnostic-organisationnel',
    color: 'from-emerald-900/40 to-emerald-950/60',
    accent: '#86BC25',
    links: [
      { label: 'DAF Externalisée', href: '/blog/daf-externalise-pilotage-financier-pme-afrique/', badge: 'Populaire' },
      { label: 'Contrôle interne & Trésorerie', href: '/blog/controle-interne-tresorerie-pme-afrique-syscohada/' },
      { label: 'Audit social', href: '/services/audit-social' },
    ],
  },
  {
    id: 'strategie',
    icon: 'ri-map-2-line',
    title: 'Stratégie & Croissance Structurée',
    hook: 'Piloter à l\'intuition coûte en moyenne 18% de la marge annuelle — chiffré sur 63 missions terrain',
    problem: 'Vous prenez des décisions stratégiques sur la base de ressentis et de tableaux Excel incomplets. Pas de plan stratégique formalisé, pas de KPIs de pilotage, pas de modèle financier prévisionnel. Votre équipe court dans des directions différentes, vos concurrents structurés vous dépassent.',
    solution: 'Diagnostic stratégique 360°, plans stratégiques 3-5 ans actionnables avec OKRs, modélisation financière complète (DCF, scénarios), études de marché UEMOA/CEMAC, accompagnement trimestriel à l\'exécution.',
    results: ['Plan stratégique 3-5 ans opérationnel en 8 semaines', 'Croissance accélérée de 25 à 40%', 'Modèle financier prévisionnel fiable à 18 mois', 'Équipes alignées sur des KPIs actionnables'],
    proof: '200+ plans stratégiques déployés en Afrique francophone',
    cta: 'Diagnostic organisationnel',
    ctaHref: '/tools/diagnostic-organisationnel',
    secondaryCta: 'Conseil stratégique',
    secondaryHref: '/services/conseil-strategique',
    color: 'from-teal-900/40 to-teal-950/60',
    accent: '#86BC25',
    links: [
      { label: 'Conseil stratégique', href: '/services/conseil-strategique' },
      { label: 'Développement organisationnel', href: '/services/developpement-organisationnel' },
      { label: 'Gestion de projets', href: '/services/gestion-de-projets' },
    ],
  },
  {
    id: 'risques',
    icon: 'ri-alarm-warning-line',
    title: 'Risques, Audit & Conformité BCEAO/OHADA',
    hook: 'Les 7 risques invisibles qui détruisent les entreprises africaines rentables — le mismatch ALM est le plus meurtrier',
    problem: 'Risques opérationnels non cartographiés, mismatch actif-passif non détecté dans les IMF, concentration client dépassant 40% du portefeuille, risque de change non couvert, passif fiscal latent. Une inspection BCEAO ou un choc de liquidité peut tout arrêter en 48 heures.',
    solution: 'Audit social et financier complet, cartographie ERM, dispositif ALM pour institutions financières (GAP de liquidité, stress testing, coût des ressources), mise en conformité BCEAO/OHADA/COBAC, plan de continuité d\'activité.',
    results: ['Conformité BCEAO/OHADA garantie à 100%', 'Taux de défaut réduit de 35% en 12 mois', 'ALM opérationnel pour IMF et banques', 'Zéro sanction réglementaire post-mission'],
    proof: '80+ SFD et banques mis en conformité BCEAO · PAR réduit de 12% à 4,2% sur portefeuille agricole',
    cta: 'Évaluer ma conformité',
    ctaHref: '/tools/evaluation-gouvernance',
    secondaryCta: 'Conformité SFD',
    secondaryHref: '/sfd-conformite',
    color: 'from-red-900/40 to-red-950/60',
    accent: '#86BC25',
    links: [
      { label: 'Audit social & conformité', href: '/services/audit-social' },
      { label: 'Conformité SFD/BCEAO', href: '/sfd-conformite' },
      { label: 'Évaluation cybersécurité', href: '/tools/evaluation-cybersecurite', badge: 'Gratuit' },
    ],
  },
  {
    id: 'digital',
    icon: 'ri-smartphone-line',
    title: 'Transformation Digitale Financière',
    hook: 'La digitalisation qui compte n\'est pas celle du marketing — c\'est celle du pilotage financier',
    problem: 'Vos processus financiers tournent sous Excel, votre core banking est obsolète, vos données sont dispersées dans des silos non consolidés. Résultat : délais de clôture de 3 semaines, reporting inexploitable, décisions prises à l\'aveugle. Pour les IMF, l\'absence de système digital ALM amplifie le mismatch actif-passif.',
    solution: 'Diagnostic de maturité digitale financière, feuille de route de transformation ERP/core banking, déploiement de tableaux de bord décisionnels, digitalisation des processus ALM pour institutions, formation des équipes, accompagnement au changement.',
    results: ['+30% de productivité opérationnelle', '80% des transactions digitalisées', 'Clôture mensuelle en 48h vs 3 semaines', 'ROI mesurable dès le 3e mois'],
    proof: '60+ organisations transformées · Cas : coûts opérationnels -35%, 25 000 nouveaux clients en 6 mois',
    cta: 'Tester ma maturité digitale',
    ctaHref: '/tools/maturite-digitale',
    secondaryCta: 'Transformation digitale',
    secondaryHref: '/services/transformation-digitale',
    color: 'from-cyan-900/40 to-cyan-950/60',
    accent: '#86BC25',
    links: [
      { label: 'Transformation digitale', href: '/services/transformation-digitale' },
      { label: 'Maturité digitale', href: '/tools/maturite-digitale', badge: 'Gratuit' },
      { label: 'Fintech & Innovation', href: '/industries/fintech' },
    ],
  },
  {
    id: 'fonds',
    icon: 'ri-money-dollar-circle-line',
    title: 'Levée de Fonds & Investment Readiness',
    hook: '9 dossiers sur 10 sont rejetés avant même la première réunion — la gouvernance et le financier éliminent les candidats',
    problem: 'Business plan sans modèle de valorisation, états financiers non audités ou non retraités, gouvernance floue pour les investisseurs, absence de data room structurée. Les fonds d\'investissement actifs en UEMOA/CEMAC appliquent un filtre 4 niveaux — la plupart des dossiers tombent au niveau 1.',
    solution: 'Structuration financière complète (retraitement des comptes, modélisation DCF), Investor Pack 12 documents, préparation due diligence, pitch deck niveau international, mise en relation avec notre réseau de 40+ fonds actifs en Afrique, accompagnement jusqu\'au closing.',
    results: ['Dossier investisseur clé en main en 6 semaines', 'Taux d\'acceptation multiplié par 3', '2,5Mds FCFA levés cas réel en 4 mois', 'Accompagnement jusqu\'à closing et post-investissement'],
    proof: '35+ levées de fonds réussies · Cas : 2,5 milliards FCFA levés pour groupe agroalimentaire en 4 mois',
    cta: 'Structurer mon dossier',
    ctaHref: '/services/levee-de-fonds',
    secondaryCta: 'Audit inclusion financière',
    secondaryHref: '/tools/audit-inclusion-financiere',
    color: 'from-amber-900/40 to-amber-950/60',
    accent: '#f59e0b',
    links: [
      { label: 'Levée de fonds', href: '/services/levee-de-fonds' },
      { label: 'Offre commerciale', href: '/offre-commerciale' },
      { label: 'PME & Startups', href: '/industries/pme' },
    ],
  },
  {
    id: 'esg',
    icon: 'ri-leaf-line',
    title: 'ESG, Impact & Conformité Réglementaire',
    hook: 'Les bailleurs internationaux exigent un reporting ESG structuré — sans lui, votre accès aux financements concessionnels est bloqué',
    problem: 'Pas de politique ESG formalisée, impact social non mesuré, aucun alignement ODD documenté. Banque Mondiale, AFD, BOAD et fonds d\'impact refusent les dossiers sans due diligence ESG. La BCEAO intègre progressivement les critères de finance durable dans ses exigences prudentielles.',
    solution: 'Diagnostic ESG complet (environnemental, social, gouvernance), politique de gouvernance éthique alignée ODD, mise en place du reporting d\'impact mesurable, charte déontologique institutionnelle, préparation aux exigences de financement vert BCEAO/BAD/AFD.',
    results: ['Politique ESG formalisée en 60 jours', 'Accès aux financements verts et concessionnels', 'Reporting ODD intégré au reporting CA', 'Gouvernance éthique certifiable par auditeurs'],
    proof: 'Alignement ODD sur 100% des missions Khepra · Co-rédaction SNIF Togo avec Banque Mondiale',
    cta: 'Évaluer ma maturité ESG',
    ctaHref: '/tools/evaluation-gouvernance',
    secondaryCta: 'Notre engagement ESG',
    secondaryHref: '/about#esg',
    color: 'from-emerald-900/40 to-emerald-950/60',
    accent: '#86BC25',
    links: [
      { label: 'Gouvernance éthique & ESG', href: '/about#esg' },
      { label: 'Évaluation gouvernance', href: '/tools/evaluation-gouvernance', badge: 'Gratuit' },
      { label: 'Inclusion financière', href: '/industries/microfinance' },
    ],
  },
  {
    id: 'executive',
    icon: 'ri-vip-crown-line',
    title: 'Programs Exécutifs & Advisory DG/DAF',
    hook: 'Les DG qui pilotent à l\'intuition laissent en moyenne 18% de valeur sur la table chaque exercice',
    problem: 'Vous portez seul le poids des décisions stratégiques critiques. Pas de DAF de confiance, pas d\'advisory board, pas de regard externe structuré sur vos chiffres. Vos concurrents qui ont structuré leur pilotage vous dépassent. Le coût d\'opportunité de l\'absence d\'expertise est réel et chiffrable.',
    solution: 'Programmes sur-mesure pour DG, DAF et administrateurs : DAF à temps partagé senior (pas junior), coaching exécutif sur le pilotage financier, advisory board stratégique, formation intensive gouvernance et gestion des risques, tableau de bord décisionnel personnalisé.',
    results: ['DAF senior opérationnel en 2 semaines', 'Décisions stratégiques basées sur données fiables', 'Performance dirigeante mesurable +40%', 'Vision long terme structurée et financée'],
    proof: '150+ dirigeants accompagnés en Afrique francophone · NPS moyen 4,8/5',
    cta: 'Voir l\'offre premium',
    ctaHref: '/offre-commerciale',
    secondaryCta: 'Parler à un expert',
    secondaryHref: '/contact',
    color: 'from-brand-900/60 to-brand-950/80',
    accent: '#86BC25',
    links: [
      { label: 'Offre commerciale premium', href: '/offre-commerciale', badge: 'Premium' },
      { label: 'Rapport CA gratuit', href: '/board-report', badge: 'Gratuit' },
      { label: 'Diagnostic gratuit', href: '/tools/diagnostic-organisationnel', badge: 'Gratuit' },
    ],
  },
];

export default function ServicesCategoriesGrid() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-brand-900/10 border border-brand-900/20 text-brand-900 px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
              <i className="ri-focus-3-line" />
              7 domaines d'expertise — orientés résultats clients
            </div>
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              Vos problèmes. Nos solutions. Vos gains.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chaque service est conçu autour d'un problème client précis. Cliquez sur une catégorie pour voir le détail complet.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {categories.slice(0, 7).map((cat, idx) => (
            <ScrollReveal key={cat.id} animation="fadeSlideUp" delay={idx * 60}>
              <div
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer gradient-border-dark glow-gold-hover ${expanded === cat.id ? 'ring-2 border-transparent' : ''}`}
                style={expanded === cat.id ? { borderColor: cat.accent } : {}}
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}>
                <div className={`bg-gradient-to-br ${cat.color} backdrop-blur-sm p-5 h-full`} style={{ background: `linear-gradient(135deg, #111111ee, #0a0a0aee)` }}>
                  {/* Icon + title */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${cat.accent}20`, border: `1px solid ${cat.accent}40` }}>
                      <i className={`${cat.icon} text-lg`} style={{ color: cat.accent }} />
                    </div>
                    <i className={`${expanded === cat.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-gray-400 text-lg transition-transform`} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-tight line-clamp-2" title={cat.title}>{cat.title}</h3>
                  <p className="text-xs text-gray-400 italic leading-relaxed mb-3 line-clamp-2" title={cat.hook}>&ldquo;{cat.hook}&rdquo;</p>

                  {/* Quick links */}
                  <div className="space-y-1">
                    {cat.links.map((link, li) => (
                      <a key={li} href={link.href} onClick={(e) => { e.stopPropagation(); e.preventDefault(); navigate(link.href); }}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white cursor-pointer transition-colors group/link">
                        <i className="ri-arrow-right-s-line flex-shrink-0" style={{ color: cat.accent }} />
                        <span className="flex-1 group-hover/link:underline truncate">{link.label}</span>
                        {link.badge && <span className="px-1.5 py-0.5 bg-gold-500 text-white text-xs font-bold rounded flex-shrink-0">{link.badge}</span>}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Executive Programs — full width highlight */}
          <ScrollReveal animation="fadeSlideUp" delay={420} className="md:col-span-2 lg:col-span-3 xl:col-span-4">
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
              {(() => {
                const exec = categories[7];
                return (
                  <div className="rounded-2xl overflow-hidden border-2 border-gold-400 ring-2 ring-gold-400/20 gradient-border-dark glow-gold-hover"
                    style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)' }}>
                    <div className="p-6 grid md:grid-cols-3 gap-6 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/40">
                            <i className="ri-vip-crown-line text-gold-400 text-lg" />
                          </div>
                          <div>
                            <span className="px-2 py-0.5 bg-gold-500 text-white text-xs font-bold rounded-full mr-2">Prioritaire</span>
                            <span className="text-white font-bold">{exec.title}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm italic mb-4">&ldquo;{exec.hook}&rdquo;</p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{exec.problem}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {exec.results.map((r, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-emerald-300">
                              <i className="ri-check-line text-emerald-400 flex-shrink-0" />
                              {r}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="text-xs text-gray-400 font-semibold mb-1">{exec.proof}</div>
                        {exec.links.map((link, li) => (
                          <a key={li} href={link.href} onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                            className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/15 hover:border-gold-400/50 bg-white/5 hover:bg-white/10 cursor-pointer transition-all group/exec">
                            <span className="text-sm text-gray-200 group-hover/exec:text-white font-semibold">{link.label}</span>
                            {link.badge && <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${link.badge === 'Premium' ? 'bg-gold-500 text-white' : 'bg-emerald-500 text-white'}`}>{link.badge}</span>}
                          </a>
                        ))}
                        <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                          className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all hover:opacity-90 whitespace-nowrap"
                          style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}>
                          <i className="ri-customer-service-2-line" />
                          Parler à un expert maintenant
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </ScrollReveal>
        </div>

        {/* Expanded detail panel */}
        {expanded && (() => {
          const cat = categories.find(c => c.id === expanded);
          if (!cat) return null;
          return (
            <div className="rounded-2xl overflow-hidden border-2 animate-fadeSlideUp gradient-border-dark glow-gold-hover" style={{ borderColor: cat.accent }}>
              <div className="grid md:grid-cols-2 gap-0" style={{ background: 'linear-gradient(135deg, #0a0a0a, #111111)' }}>
                {/* Left: Problem + Solution */}
                <div className="p-8 border-r border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: `${cat.accent}20`, border: `1px solid ${cat.accent}40` }}>
                      <i className={`${cat.icon} text-2xl`} style={{ color: cat.accent }} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 flex items-center justify-center bg-red-500/20 rounded-lg">
                        <i className="ri-close-circle-line text-red-400 text-sm" />
                      </div>
                      <span className="text-red-300 font-bold text-sm">Le problème</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed pl-8">{cat.problem}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 flex items-center justify-center bg-emerald-500/20 rounded-lg">
                        <i className="ri-check-double-line text-emerald-400 text-sm" />
                      </div>
                      <span className="text-emerald-300 font-bold text-sm">Notre solution</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed pl-8">{cat.solution}</p>
                  </div>
                </div>

                {/* Right: Results + CTAs */}
                <div className="p-8">
                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Résultats attendus</p>
                    <div className="grid grid-cols-2 gap-3">
                      {cat.results.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
                          <i className="ri-check-line text-emerald-400 flex-shrink-0" />
                          <span className="text-xs text-white font-semibold leading-tight">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-xs text-gray-400 font-semibold mb-1">Preuve terrain</p>
                    <p className="text-sm text-gold-300 font-bold">{cat.proof}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a href={cat.ctaHref} onClick={(e) => { e.preventDefault(); navigate(cat.ctaHref); }}
                      className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all hover:opacity-90 whitespace-nowrap"
                      style={{ background: `linear-gradient(135deg, ${cat.accent}, ${cat.accent}cc)`, color: '#0a0a0a' }}>
                      {cat.cta}
                      <i className="ri-arrow-right-line" />
                    </a>
                    <a href={cat.secondaryHref} onClick={(e) => { e.preventDefault(); navigate(cat.secondaryHref); }}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white border border-white/20 hover:border-white/40 cursor-pointer transition-all whitespace-nowrap">
                      {cat.secondaryCta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';

const MODULES = [
  {
    id: 'M1',
    titre: 'Regulatory Intelligence',
    sousTitre: 'Veille Réglementaire Live',
    url: '/regulatory-intelligence',
    description: 'Suivi en temps réel des changements réglementaires sur 11 autorités en zones UEMOA, CEMAC et international. Alertes instantanées, analyse d\'impact, recommandations de conformité.',
    autorites: ['BCEAO', 'COBAC', 'GAFI', 'OHADA', 'UEMOA', 'CEMAC', 'OCDE', 'GIABA', 'GABAC', 'BEAC', 'CIMA'],
    couleur: '#1A1A2E',
    icone: 'ri-notification-3-line',
    stats: '12 alertes actives',
  },
  {
    id: 'M2',
    titre: 'COBAC',
    sousTitre: 'Réglementation Bancaire CEMAC',
    url: '/cobac',
    description: 'Cadre réglementaire COBAC complet : circulaires, règlements, instructions et décisions régissant les établissements de crédit, la microfinance et les systèmes de paiement CEMAC.',
    autorites: ['COBAC', 'BEAC', 'GABAC'],
    couleur: '#991b1b',
    icone: 'ri-bank-line',
    stats: '8 textes réglementaires',
  },
  {
    id: 'M3',
    titre: 'BCEAO',
    sousTitre: 'Réglementation Financière UEMOA',
    url: '/bceao',
    description: 'Cadre réglementaire BCEAO complet : instructions, circulaires, décisions et directives régissant les banques, SFD, fintechs et systèmes de paiement UEMOA.',
    autorites: ['BCEAO', 'UEMOA', 'GIABA'],
    couleur: '#0D7B5F',
    icone: 'ri-government-line',
    stats: '8 textes réglementaires',
  },
  {
    id: 'M4',
    titre: 'GAFI',
    sousTitre: '40 Recommandations LBC/FT',
    url: '/gafi',
    description: 'Cartographie interactive des 40 Recommandations du GAFI. Conformité LBC/FT, évaluations mutuelles pays UEMOA/CEMAC, mesures préventives, transparence des bénéficiaires effectifs.',
    autorites: ['GAFI', 'GIABA', 'GABAC', 'CENTIF', 'ANIF'],
    couleur: '#8B3A4A',
    icone: 'ri-fingerprint-line',
    stats: '8 recommandations clés',
  },
  {
    id: 'M5',
    titre: 'OHADA',
    sousTitre: 'Actes Uniformes — 17 États',
    url: '/ohada',
    description: 'Cartographie interactive des Actes Uniformes OHADA harmonisant le droit des affaires dans 17 États africains. Droit des sociétés, sûretés, comptabilité, arbitrage.',
    autorites: ['OHADA', 'CCJA', 'ERSUMA'],
    couleur: '#4A7A1E',
    icone: 'ri-scales-line',
    stats: '8 Actes Uniformes',
  },
  {
    id: 'M6',
    titre: 'Knowledge Hub',
    sousTitre: 'Bibliothèque Réglementaire',
    url: '/knowledge-hub',
    description: 'Bibliothèque réglementaire interactive. 16 documents réglementaires sourcés : BCEAO, COBAC, GAFI, OHADA, UEMOA, CEMAC, OCDE, ISO, COSO, CIMA. Recherche plein texte et filtres multi-axes.',
    autorites: ['BCEAO', 'COBAC', 'GAFI', 'OHADA', 'ISO', 'COSO', 'CIMA'],
    couleur: '#9B7B2C',
    icone: 'ri-book-2-line',
    stats: '16 documents',
  },
  {
    id: 'M7',
    titre: 'Executive Dashboard',
    sousTitre: 'Cockpit de Pilotage CEO',
    url: '/executive-dashboard',
    description: 'Dashboard exécutif avec KPIs stratégiques, pipeline commercial, alertes critiques multi-agents, performance des 15 agents IA KHEPRA OS 2, et missions actives.',
    autorites: ['KHEPRA OS 2', 'Master Orchestrator', 'CEO Copilot'],
    couleur: '#C2410C',
    icone: 'ri-dashboard-3-line',
    stats: '6 KPI cards · 8 missions',
  },
  {
    id: 'M8',
    titre: 'Compliance Management',
    sousTitre: 'Gestion de la Conformité',
    url: '/compliance-management',
    description: 'Suivi centralisé des contrôles de conformité sur tous les référentiels. Plans d\'actions, analyse des écarts, audit trail et statut conformité en temps réel. BCEAO, COBAC, GAFI, OHADA.',
    autorites: ['BCEAO', 'COBAC', 'GAFI', 'OHADA', 'UEMOA', 'CEMAC'],
    couleur: '#92400e',
    icone: 'ri-checkbox-multiple-line',
    stats: '8 contrôles actifs',
  },
  {
    id: 'M9',
    titre: 'Transfer Pricing',
    sousTitre: 'Prix de Transfert — BEPS',
    url: '/transfer-pricing',
    description: 'Gestion complète de la documentation prix de transfert : Master File, Local File, benchmarking, analyse FAR, CbCR et APA. Conforme BEPS Action 13 pour les groupes UEMOA et CEMAC.',
    autorites: ['OCDE', 'BEPS', 'UEMOA', 'CEMAC'],
    couleur: '#B8543A',
    icone: 'ri-exchange-funds-line',
    stats: '8 dossiers TP',
  },
];

export default function KhepraOS2HubPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <>
      <SeoHead
        title={isEn ? 'KHEPRA OS 2 — Regulatory Intelligence Platform | 9 Modules | KHEPRA EXPERTS' : 'KHEPRA OS 2 — Plateforme d\'Intelligence Réglementaire | 9 Modules | KHEPRA EXPERTS'}
        description={isEn ? 'KHEPRA OS 2: The most advanced regulatory intelligence, compliance, governance, and risk management platform in Francophone Africa. 9 interactive modules, 15 AI agents, 11 regulatory authorities. BCEAO, COBAC, GAFI, OHADA.' : 'KHEPRA OS 2 : La plateforme d\'intelligence réglementaire, conformité, gouvernance et gestion des risques la plus avancée d\'Afrique francophone. 9 modules interactifs, 15 agents IA, 11 autorités réglementaires. BCEAO, COBAC, GAFI, OHADA.'}
        keywords="KHEPRA OS 2, regulatory intelligence Africa, compliance platform, BCEAO, COBAC, GAFI, OHADA, transfer pricing, risk management, governance, RegTech Africa, regulatory dashboard"
        canonicalPath="/khepra-os-2"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[{ label: isEn ? 'Home' : 'Accueil', path: '/' }, { label: 'KHEPRA OS 2', path: '/khepra-os-2' }]} />

        <section className="bg-foreground-950 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/50 border border-emerald-700/30 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Platform v2.0 — Juin 2026
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">KHEPRA OS 2</h1>
              <p className="text-lg text-foreground-300 max-w-3xl mx-auto mb-2">
                {isEn ? 'The most advanced regulatory intelligence, compliance, governance, and risk management platform in Francophone Africa. 9 interactive modules, 21 AI agents, 11 regulatory authorities.' : 'La plateforme d\'intelligence réglementaire, conformité, gouvernance et gestion des risques la plus avancée d\'Afrique francophone. 9 modules interactifs, 21 agents IA, 11 autorités réglementaires.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <div className="px-4 py-2 rounded-full bg-foreground-800 text-xs font-bold"><i className="ri-robot-line mr-1.5 text-emerald-400" />21 Agents IA</div>
                <div className="px-4 py-2 rounded-full bg-foreground-800 text-xs font-bold"><i className="ri-building-line mr-1.5 text-amber-400" />11 Autorités</div>
                <div className="px-4 py-2 rounded-full bg-foreground-800 text-xs font-bold"><i className="ri-global-line mr-1.5 text-blue-400" />17 États OHADA</div>
                <div className="px-4 py-2 rounded-full bg-foreground-800 text-xs font-bold"><i className="ri-database-2-line mr-1.5 text-purple-400" />60+ Textes</div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map(mod => (
              <Link
                key={mod.id}
                to={mod.url}
                className="group bg-white rounded-2xl border border-background-200/70 p-6 hover:shadow-lg hover:border-accent-300/40 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 transition-colors duration-300" style={{ background: `${mod.couleur}12` }}>
                    <i className={`${mod.icone} text-xl`} style={{ color: mod.couleur }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${mod.couleur}15`, color: mod.couleur }}>{mod.id}</span>
                      <span className="text-[10px] text-foreground-400 font-medium">{mod.sousTitre}</span>
                    </div>
                    <h3 className="text-base font-bold font-heading text-foreground-950 group-hover:text-accent-700 transition-colors">{mod.titre}</h3>
                  </div>
                </div>
                <p className="text-xs text-foreground-500 leading-relaxed mb-4 flex-1">{mod.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {mod.autorites.slice(0, 4).map(a => (
                    <span key={a} className="px-2 py-0.5 rounded-full text-[10px] bg-background-100 text-foreground-600 font-medium">{a}</span>
                  ))}
                  {mod.autorites.length > 4 && <span className="px-2 py-0.5 rounded-full text-[10px] bg-background-100 text-foreground-400">+{mod.autorites.length - 4}</span>}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-100">
                  <span className="text-[10px] text-foreground-400">{mod.stats}</span>
                  <span className="text-xs font-bold text-accent-600 group-hover:translate-x-1 transition-transform duration-200 whitespace-nowrap">
                    {isEn ? 'Explore →' : 'Explorer →'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="bg-foreground-950 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(134,188,37,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(194,65,12,0.05) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold font-heading mb-2">{isEn ? 'Ready to activate KHEPRA OS 2?' : 'Prêt à activer KHEPRA OS 2 ?'}</h2>
              <p className="text-sm text-foreground-400 mb-6 max-w-xl mx-auto">
                {isEn ? 'Deploy the complete platform in your organization. 9 regulatory intelligence modules, 21 AI agents, and a Master Orchestrator to coordinate your compliance, governance, and risk strategy.' : 'Déployez la plateforme complète dans votre organisation. 9 modules d\'intelligence réglementaire, 21 agents IA et un Master Orchestrator pour coordonner votre stratégie conformité, gouvernance et risques.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-100 transition-colors">
                  <i className="ri-mail-line mr-2" />{isEn ? 'Request a Demo' : 'Demander une Démo'}
                </Link>
                <Link to="/agent-console" className="px-6 py-3 rounded-full border border-emerald-500/50 text-emerald-400 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-emerald-900/30 transition-colors">
                  <i className="ri-terminal-box-line mr-2" />{isEn ? 'Open Agent Console' : 'Ouvrir la Console Agent'}
                </Link>
                <Link to="/agents-experts" className="px-6 py-3 rounded-full border border-foreground-700 text-white font-semibold text-sm cursor-pointer whitespace-nowrap hover:bg-foreground-800 transition-colors">
                  <i className="ri-robot-line mr-2" />{isEn ? 'Meet the 21 AI Agents' : 'Découvrir les 21 Agents IA'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
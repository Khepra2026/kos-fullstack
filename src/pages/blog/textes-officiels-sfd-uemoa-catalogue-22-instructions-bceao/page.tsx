import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import SchemaWebPage from '@/components/feature/SchemaWebPage';

type StatusType = 'conforme' | 'partiel' | 'absent';
type FilterType = 'tous' | StatusType;

interface Instruction {
  ref: string;
  date: string;
  objet: string;
  categorie: string;
  statut: StatusType;
  description: string;
}

const INSTRUCTIONS_BCEAO_SFD: Instruction[] = [
  { ref: 'Instruction n°005-06-2010', date: 'Juin 2010', objet: 'Éléments constitutifs du dossier de demande d\'agrément des SFD', categorie: 'Agrément', statut: 'conforme', description: 'Définit les 3 catégories de SFD et les dossiers d\'agrément correspondants. Pièce centrale de tout processus d\'agrément.' },
  { ref: 'Instruction n°006-06-2010', date: 'Juin 2010', objet: 'Conditions de fonctionnement des SFD — organisation, structure, administration', categorie: 'Organisation', statut: 'conforme', description: 'Conditions d\'organisation et de gouvernance des SFD. Complémentaire de l\'Instruction n°005.' },
  { ref: 'Instruction n°007-06-2010', date: 'Juin 2010', objet: 'Modalités de contrôle et de sanction des SFD par la BCEAO et la Commission Bancaire', categorie: 'Contrôle & Sanctions', statut: 'conforme', description: 'Définit le régime des sanctions applicables aux SFD. Seuil de contrôle renforcé : 2 milliards FCFA d\'encours.' },
  { ref: 'Instruction n°004-06-2010', date: 'Juin 2010', objet: 'Retrait des groupements d\'épargne et de crédit en activité dans l\'UEMOA', categorie: 'Agrément', statut: 'conforme', description: 'Encadre le processus de retrait d\'agrément des groupements. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°010-08-2010', date: 'Août 2010', objet: 'Règles prudentielles applicables aux SFD (ratios, fonds propres, liquidité)', categorie: 'Prudentiel', statut: 'conforme', description: 'Texte central sur les ratios prudentiels. Solvabilité 15% (unitaires), 10% (affiliés). Liquidité 100%. Division des risques 25%.' },
  { ref: 'Instruction n°017-12-2010', date: 'Décembre 2010', objet: 'Organisation du contrôle interne des SFD', categorie: 'Contrôle interne', statut: 'conforme', description: 'Manuel de procédures obligatoire. 3 lignes de défense SFD. Reporting CA trimestriel.' },
  { ref: 'Instruction n°018-12-2010', date: 'Décembre 2010', objet: 'Obligation de produire un rapport annuel par les SFD', categorie: 'Reporting', statut: 'conforme', description: 'Impose la production d\'un rapport annuel standardisé. Contenu, délais, destinataires définis. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°019-12-2010', date: 'Décembre 2010', objet: 'Mise en place d\'un fonds de sécurité/solidarité au sein des réseaux IMCEC', categorie: 'IMCEC', statut: 'conforme', description: 'Obligation spécifique aux réseaux d\'institutions mutualistes (IMCEC). Fonds de solidarité pour protéger les membres. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°020-12-2010', date: 'Décembre 2010', objet: 'Transmission des indicateurs périodiques par les SFD', categorie: 'Reporting', statut: 'conforme', description: 'Définit le tableau de bord de reporting périodique (mensuel/trimestriel) que les SFD transmettent au SG-CB-UMOA. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°025-02-2009', date: 'Février 2009', objet: 'Référentiel comptable spécifique des SFD de l\'UMOA (RCS) — Plan de comptes', categorie: 'Comptabilité RCS', statut: 'conforme', description: 'Texte fondateur du Référentiel Comptable Spécifique (RCS) des SFD. Socle comptable SFD. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°026-02-2009', date: 'Février 2009', objet: 'Mise en œuvre du plan de comptes prévu par le RCS des SFD', categorie: 'Comptabilité RCS', statut: 'conforme', description: 'Instruction complémentaire au RCS — détaille l\'application du plan de comptes SFD. Indissociable de l\'Instruction n°025. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°030-02-2009', date: 'Février 2009', objet: 'Modalités d\'établissement et de conservation des états financiers SFD', categorie: 'Comptabilité RCS', statut: 'conforme', description: 'Troisième texte du triptyque RCS — modalités de production des états financiers spécifiques aux SFD (BILAN SFD, CR SFD). Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°001-01-2017', date: 'Janvier 2017', objet: 'Modification de la forme juridique, dénomination sociale et siège social d\'un SFD', categorie: 'Modifications statutaires', statut: 'conforme', description: 'Procédure d\'autorisation préalable pour tout changement de forme juridique ou de dénomination d\'un SFD. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°002-01-2017', date: 'Janvier 2017', objet: 'Demande de dérogation individuelle à la condition de nationalité des dirigeants SFD', categorie: 'Dirigeants', statut: 'conforme', description: 'Encadre la dérogation au critère de nationalité pour les postes de dirigeants. Complémentaire de la Circulaire CB-UMOA n°02-2017. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°061-03-2011', date: 'Mars 2011', objet: 'Critères d\'admissibilité des crédits bancaires octroyés aux SFD au refinancement de la BCEAO', categorie: 'Refinancement', statut: 'conforme', description: 'Définit les crédits bancaires aux SFD éligibles au refinancement BCEAO. Crucial pour les SFD qui cherchent à diversifier leur refinancement. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°003-03-2018', date: 'Mars 2018', objet: 'Dispositions particulières FI (Finance Islamique) applicables aux SFD UMOA', categorie: 'Finance islamique', statut: 'conforme', description: 'Texte cadre sur les dispositions générales de la finance islamique dans les SFD. Précède et complète l\'Instruction n°005-05-2018. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°005-05-2018', date: 'Mai 2018', objet: 'Caractéristiques techniques des opérations de finance islamique dans les SFD', categorie: 'Finance islamique', statut: 'conforme', description: 'Catalogue détaillé des produits islamiques autorisés (Murabaha, Ijara, Musharaka, Moudaraba, Wakala). Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°05-06-2014', date: 'Juin 2014', objet: 'Recherche des titulaires de comptes dormants dans les SFD UMOA', categorie: 'Avoirs dormants', statut: 'conforme', description: 'Procédures obligatoires de recherche des titulaires de comptes inactifs. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°06-06-2014', date: 'Juin 2014', objet: 'Transfert à la BCEAO des avoirs dormants des SFD', categorie: 'Avoirs dormants', statut: 'conforme', description: 'Modalités pratiques du versement obligatoire à la BCEAO. Documentation, récépissés, comptabilisation. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°07-06-2014', date: 'Juin 2014', objet: 'Réclamation des avoirs dormants par les titulaires des comptes SFD', categorie: 'Avoirs dormants', statut: 'conforme', description: 'Procédure de restitution aux clients : délais, justificatifs, recours. Obligation d\'information en agence. Article dédié créé le 16 Juin 2026.' },
  { ref: 'Instruction n°008-05-2015', date: 'Mai 2015', objet: 'Émission et gestion de la monnaie électronique en UEMOA', categorie: 'Monnaie électronique', statut: 'conforme', description: 'Encadre les SFD qui émettent de la monnaie électronique. Capital minimum, cantonnement, KYC.' },
  { ref: 'Instruction n°001/01/2024', date: 'Janvier 2024', objet: 'Services de paiement dans l\'UMOA — protection utilisateurs, interopérabilité PI-SPI', categorie: 'Paiements', statut: 'partiel', description: 'Texte le plus récent — connexion PI-SPI obligatoire avant 30 juin 2026. Interopérabilité. Couverture partielle sur le site.' },
];

const CATEGORIES = ['Tous', 'Agrément', 'Prudentiel', 'Contrôle interne', 'Comptabilité RCS', 'Avoirs dormants', 'Finance islamique', 'Reporting', 'Paiements', 'Dirigeants', 'Refinancement'];

const STATS = [
  { label: 'Textes officiels SFD', value: '22', color: 'bg-primary-100 text-primary-800', icon: 'ri-file-list-3-line' },
  { label: 'Conformes sur le site', value: '21', color: 'bg-green-100 text-green-800', icon: 'ri-check-double-line' },
  { label: 'Partiellement couverts', value: '1', color: 'bg-amber-100 text-amber-800', icon: 'ri-alert-line' },
  { label: 'Absents (gap comblé)', value: '0', color: 'bg-green-100 text-green-800', icon: 'ri-checkbox-circle-line' },
];

const statusConfig: Record<StatusType, { label: string; color: string; bg: string }> = {
  conforme: { label: 'Couvert', color: 'text-green-700', bg: 'bg-green-100' },
  partiel: { label: 'Partiel', color: 'text-amber-700', bg: 'bg-amber-100' },
  absent: { label: 'Absent', color: 'text-red-700', bg: 'bg-red-100' },
};

const CataloguePage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('tous');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = INSTRUCTIONS_BCEAO_SFD.filter(inst => {
    const statusOk = activeFilter === 'tous' || inst.statut === activeFilter;
    const catOk = activeCategory === 'Tous' || inst.categorie === activeCategory;
    return statusOk && catOk;
  });

  const couverture = Math.round((INSTRUCTIONS_BCEAO_SFD.filter(i => i.statut === 'conforme').length / INSTRUCTIONS_BCEAO_SFD.length) * 100);

  return (
    <>
      <SeoHead
        title="Textes Officiels SFD UEMOA | Catalogue Complet 22 Instructions BCEAO — Couverture 95%"
        description="Catalogue exhaustif des 22 Instructions BCEAO applicables aux SFD UEMOA. Référentiel Comptable Spécifique, ratios prudentiels, agrément, avoirs dormants, finance islamique. Couverture 95% — 21 textes couverts sur 22. Page pilier de référence."
        keywords="Instructions BCEAO SFD, textes officiels UEMOA, catalogue SFD, référentiel comptable SFD, ratios prudentiels BCEAO, agrément SFD, avoirs dormants, finance islamique, RCS SFD, microfinance UEMOA"
        canonicalPath="/blog/textes-officiels-sfd-uemoa-catalogue-22-instructions-bceao"
        ogType="article"
        articlePublishedTime="2026-06-16T08:00:00+00:00"
        articleAuthor="KHEPRA EXPERTS"
        articleSection="Réglementation SFD UEMOA"
        articleTags={['BCEAO', 'SFD', 'UEMOA', 'Instructions', 'catalogue', 'microfinance', 'conformité', 'RCS', 'prudentiel']}
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />
      <SchemaWebPage
        name="Textes Officiels SFD UEMOA | Catalogue Complet 22 Instructions BCEAO"
        description="Catalogue exhaustif des 22 Instructions BCEAO applicables aux SFD UEMOA. Référentiel Comptable Spécifique, ratios prudentiels, agrément, avoirs dormants, finance islamique."
        url="/blog/textes-officiels-sfd-uemoa-catalogue-22-instructions-bceao/"
      />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="h-[420px] md:h-[540px] w-full bg-cover bg-top relative"
            style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=West%20African%20UEMOA%20regulatory%20compliance%20official%20documents%20BCEAO%20microfinance%20SFD%20catalog%20professional%20institutional%20library%20dark%20navy%20tones%20authoritative%20atmosphere%20legal%20framework%20Dakar%20Abidjan%20Lome%20banking%20regulation&width=1800&height=600&seq=catalogue-bceao-sfd-pillar-2026&orientation=landscape)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
                  <i className="ri-book-open-line" /> Page Pilier — Référence Exhaustive
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-heading">
                  Textes Officiels SFD UEMOA
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-white/90 mb-3">
                  Catalogue Complet — 22 Instructions BCEAO
                </p>
                <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                  L'intégralité du corpus réglementaire applicable aux Systèmes Financiers Décentralisés en zone UEMOA — couverture désormais exhaustive
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-white/60">
                  <span><i className="ri-calendar-line mr-1" />Mis à jour : 16 Juin 2026</span>
                  <span><i className="ri-file-list-3-line mr-1" />22 Instructions BCEAO</span>
                  <span><i className="ri-shield-check-line mr-1" />Couverture actuelle : {couverture}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {STATS.map((stat, i) => (
              <div key={i} className={`p-5 rounded-2xl ${stat.color} border border-background-200`}>
                <i className={`${stat.icon} text-2xl mb-2 block`} />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bannière succès couverture */}
          <div className="p-6 rounded-2xl bg-green-50 border border-green-200 mb-10 flex items-start gap-4">
            <i className="ri-check-double-line text-3xl text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-green-800 text-lg mb-2">Couverture quasi-exhaustive atteinte — 95%</h2>
              <p className="text-green-700 text-sm leading-relaxed mb-2">
                Sur 22 Instructions BCEAO officiellement applicables aux SFD, <strong>21 sont désormais couvertes</strong> par des articles dédiés sur le site. Le gap critique de couverture identifié le 16 Juin 2026 (14 textes absents) a été <strong>entièrement comblé</strong> le même jour par la création de 7 nouveaux articles couvrant les 10 textes restants.
              </p>
              <p className="text-green-700 text-xs leading-relaxed">
                Seul le texte n°001/01/2024 (Services de paiement) conserve un statut de couverture partielle en attendant un article dédié.
              </p>
            </div>
          </div>

          {/* Filtres statut */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="text-sm font-bold text-foreground-700 self-center">Statut :</span>
            {(['tous', 'conforme', 'partiel', 'absent'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeFilter === f
                    ? 'bg-primary-500 text-background-50'
                    : 'bg-background-100 text-foreground-700 hover:bg-background-200 border border-background-200'
                }`}
              >
                {f === 'tous' ? 'Tous les textes' : f === 'conforme' ? '✓ Couverts' : f === 'partiel' ? '~ Partiels' : '✗ Absents'}
              </button>
            ))}
          </div>

          {/* Filtres catégorie */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm font-bold text-foreground-700 self-center">Catégorie :</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-foreground-950 text-background-50'
                    : 'bg-background-100 text-foreground-700 hover:bg-background-200 border border-background-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Résultat du filtre */}
          <p className="text-sm text-foreground-500 mb-6">{filtered.length} texte{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}</p>

          {/* Catalogue */}
          <div className="space-y-3 mb-12">
            {filtered.map((inst, i) => {
              const sConf = statusConfig[inst.statut];
              const isExpanded = expandedId === inst.ref;
              return (
                <div key={i} className="rounded-2xl border border-background-200 bg-background-50 overflow-hidden">
                  <button
                    className="w-full flex items-start gap-4 p-5 text-left cursor-pointer hover:bg-background-100 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : inst.ref)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-foreground-950 text-base">{inst.ref}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${sConf.bg} ${sConf.color}`}>{sConf.label}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-secondary-100 text-secondary-800">{inst.categorie}</span>
                      </div>
                      <p className="text-foreground-700 text-sm">{inst.objet}</p>
                      <p className="text-foreground-500 text-xs mt-0.5">{inst.date}</p>
                    </div>
                    <i className={`${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-xl text-foreground-400 flex-shrink-0 mt-1`} />
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-background-200">
                      <div className="pt-4 space-y-3">
                        <p className="text-foreground-700 text-sm leading-relaxed">{inst.description}</p>
                        {inst.statut === 'absent' && (
                          <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                            <p className="text-red-700 text-xs font-semibold">
                              <i className="ri-error-warning-line mr-1" />
                              Ce texte est <strong>absent</strong> du corpus de conformité SFD courant. Le non-respect des obligations définies expose le SFD à des sanctions lors d'une inspection SG-CB-UMOA.
                            </p>
                          </div>
                        )}
                        <p className="text-foreground-500 text-xs">Source officielle : BCEAO — bceao.int</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RCS Section highlight */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-6 font-heading">
              Le Référentiel Comptable Spécifique (RCS) — Désormais couvert
            </h2>
            <div className="p-6 rounded-2xl border border-green-200 bg-green-50">
              <p className="text-foreground-700 leading-relaxed mb-4">
                Les Instructions BCEAO n°025, 026 et 030-02-2009 constituent le <strong>Référentiel Comptable Spécifique (RCS) des SFD de l'UMOA</strong> — le corpus comptable propre aux SFD, distinct du SYSCOHADA standard. Ce triptyque fondateur est désormais <strong>couvert</strong> par un article dédié.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { ref: 'n°025-02-2009', titre: 'Plan de comptes RCS', desc: 'Définit le plan de comptes spécifique aux SFD. Classes comptables, numérotation, intitulés. Socle du référentiel comptable SFD.' },
                  { ref: 'n°026-02-2009', titre: 'Mise en oeuvre du RCS', desc: 'Guide d\'application du plan de comptes. Instructions de comptabilisation des opérations SFD courantes (crédits, dépôts, cotisations).' },
                  { ref: 'n°030-02-2009', titre: 'États financiers SFD', desc: 'Modèles des états financiers spécifiques : Bilan SFD, Compte de résultat SFD, Tableau emplois-ressources. Délais et destinataires.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-green-100">
                    <div className="text-xs font-bold text-green-600 mb-1">Instruction {item.ref}</div>
                    <h3 className="font-bold text-foreground-950 text-sm mb-2">{item.titre}</h3>
                    <p className="text-foreground-700 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/blog/referentiel-comptable-sfd-rcs-instructions-bceao-025-026-030"
                className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                Lire l'article complet sur le RCS <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </section>

          {/* Articles connexes */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground-950 mb-6 font-heading">Articles dédiés — Corpus BCEAO SFD complet</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'RCS — Référentiel Comptable SFD', subtitle: 'Instructions BCEAO n°025, 026, 030-02-2009 — Plan de comptes, application, états financiers', href: '/blog/referentiel-comptable-sfd-rcs-instructions-bceao-025-026-030', tag: 'Nouveau', color: 'border-primary-300 bg-primary-50' },
                { title: 'Avoirs Dormants SFD UEMOA', subtitle: 'Instructions BCEAO n°05, 06, 07-06-2014 — Recherche, transfert, restitution', href: '/blog/avoirs-dormants-sfd-uemoa', tag: 'Créé 16 Juin', color: 'border-primary-300 bg-primary-50' },
                { title: 'Finance Islamique SFD — Dispositions Générales', subtitle: 'Instruction BCEAO n°003-03-2018 — Principes Charia, guichet islamique, gouvernance', href: '/blog/finance-islamique-sfd-dispositions-generales-instruction-bceao-003-2018', tag: 'Nouveau', color: 'border-accent-300 bg-accent-50' },
                { title: 'Finance Islamique SFD — Produits', subtitle: 'Instruction BCEAO n°005-05-2018 — Murabaha, Ijara, Musharaka, Moudaraba, Wakala', href: '/blog/finance-islamique-sfd-instruction-bceao-005-05-2018', tag: 'Créé 16 Juin', color: 'border-accent-300 bg-accent-50' },
                { title: 'Modifications Statutaires SFD', subtitle: 'Instructions BCEAO n°001, 002-01-2017 — Forme juridique, dérogation nationalité dirigeants', href: '/blog/modifications-statutaires-sfd-instructions-bceao-001-002-2017', tag: 'Nouveau', color: 'border-background-300 bg-background-50' },
                { title: 'Reporting Périodique SFD', subtitle: 'Instructions BCEAO n°018, 020-12-2010 — Rapport annuel, indicateurs mensuels/trimestriels', href: '/blog/reporting-periodique-sfd-instructions-bceao-018-020-2010', tag: 'Nouveau', color: 'border-background-300 bg-background-50' },
                { title: 'Retrait d\'Agrément SFD', subtitle: 'Instruction BCEAO n°004-06-2010 — Groupements d\'épargne et de crédit UEMOA', href: '/blog/retrait-agrement-sfd-instruction-bceao-004-2010', tag: 'Nouveau', color: 'border-background-300 bg-background-50' },
                { title: 'Fonds Sécurité Solidarité IMCEC', subtitle: 'Instruction BCEAO n°019-12-2010 — Protection membres, solidarité réseau', href: '/blog/fonds-securite-solidarite-imcec-instruction-bceao-019-2010', tag: 'Nouveau', color: 'border-background-300 bg-background-50' },
                { title: 'Refinancement BCEAO des SFD', subtitle: 'Instruction BCEAO n°061-03-2011 — Crédits bancaires éligibles, critères', href: '/blog/refinancement-bceao-sfd-instruction-061-2011', tag: 'Nouveau', color: 'border-background-300 bg-background-50' },
                { title: 'Microfinance UEMOA — Ratios Prudentiels', subtitle: 'Instructions n°010-08-2010 et n°017-12-2010', href: '/blog', tag: 'Existant', color: 'border-background-300 bg-background-50' },
              ].map((article, i) => (
                <Link key={i} to={article.href} className={`p-5 rounded-2xl border-2 ${article.color} hover:shadow-md transition-all block`}>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-foreground-950 text-base flex-1">{article.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${article.tag.startsWith('Nouveau') ? 'bg-primary-100 text-primary-800' : 'bg-background-200 text-foreground-600'}`}>{article.tag}</span>
                  </div>
                  <p className="text-foreground-600 text-sm">{article.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 md:p-10 rounded-3xl text-center" style={{ background: 'oklch(var(--foreground-950))' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-background-50 mb-4 font-heading">
              Auditez votre couverture des 22 Instructions BCEAO SFD
            </h2>
            <p className="text-background-50/70 mb-6 max-w-2xl mx-auto">
              KHEPRA EXPERTS réalise des audits exhaustifs couvrant l'intégralité des 22 Instructions BCEAO applicables aux SFD — y compris le RCS, les avoirs dormants et la finance islamique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-foreground-950 bg-primary-500 hover:bg-primary-600 transition-colors whitespace-nowrap"
              >
                Demander un audit de conformité SFD
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/services/audit-pre-inspection-bceao"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold border border-background-50/30 text-background-50 hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                Voir notre service pré-inspection BCEAO
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-5 rounded-2xl bg-background-100 border border-background-200">
            <p className="text-foreground-600 text-xs leading-relaxed">
              <strong>Avertissement :</strong> Ce catalogue est fourni à titre strictement informatif sur la base des textes officiels publiés par la BCEAO à la date de mise à jour (16 Juin 2026). Les textes réglementaires doivent être consultés dans leur version officielle la plus récente sur bceao.int. Les statuts de couverture reflètent l'état de référencement sur le site — ils ne constituent pas une évaluation de conformité individuelle. Seul le SG-CB-UMOA est habilité à apprécier la conformité d'un SFD.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CataloguePage;
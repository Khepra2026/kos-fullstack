import { useNavigate } from 'react-router-dom';
import { resolveIdToSlug } from '@/data/articleSlugMap';

// ── Références des 20 articles pillar (titre + excerpt tronqué + icône par BU) ──
interface PillarRef {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  icon: string;
}

const PILLAR_REFS: PillarRef[] = [
  // BU1 — Régulation & Conformité (9 articles)
  { id: 'pillar-inspection-bceao-guide-complet', title: "Inspection BCEAO : Guide Complet pour Banques, SFD et IMF", excerpt: "Préparez votre institution à une inspection de la Commission Bancaire de l'UMOA. Cadre réglementaire, 5 domaines inspectés, constats fréquents, plan de remédiation 12 semaines.", category: 'Conformité & Réglementation', icon: 'ri-search-eye-line' },
  { id: 'pillar-inspection-cobac-guide-complet', title: "Inspection COBAC : Guide Pratique pour la Zone CEMAC", excerpt: "Préparez votre institution à une inspection COBAC. Cadre CEMAC, spécificités R-2024/01, différences UEMOA/CEMAC, plan de remédiation.", category: 'Conformité & Réglementation', icon: 'ri-search-eye-line' },
  { id: 'pillar-conformite-banque-uemoa', title: "Conformité Bancaire UEMOA : Le Cadre Réglementaire Complet", excerpt: "Architecture de conformité UEMOA : textes fondamentaux, obligations par fonction, ratios prudentiels, dispositif LBC/FT.", category: 'Conformité & Réglementation', icon: 'ri-government-line' },
  { id: 'pillar-ratios-prudentiels-bceao', title: "Ratios Prudentiels BCEAO : Calcul, Interprétation et Conformité", excerpt: "Guide technique des ratios prudentiels : solvabilité, liquidité, division des risques, couverture des immobilisations, réserves obligatoires.", category: 'Finance', icon: 'ri-bar-chart-box-line' },
  { id: 'pillar-agrement-sfd-bceao', title: "Agrément SFD BCEAO : Procédure Complète, Conditions et Délais", excerpt: "Procédure d'agrément SFD : conditions d'éligibilité, dossier type, étapes, délais, motifs de rejet, obligations post-agrément.", category: 'Conformité & Réglementation', icon: 'ri-file-text-line' },
  { id: 'pillar-audit-pre-inspection-bceao', title: "Audit Pré-Inspection BCEAO : Diagnostic Avant l'Arrivée des Inspecteurs", excerpt: "Méthodologie d'audit pré-inspection en 4 phases. Réduction de 70 % des constats, levée des mises en demeure.", category: 'Conformité & Réglementation', icon: 'ri-clipboard-line' },
  { id: 'pillar-lbcft-afrique-francophone', title: "LBC/FT en Afrique Francophone : Cadre, Obligations et Bonnes Pratiques", excerpt: "Dispositif LBC/FT/FP : cadre GAFI, régimes UEMOA (GIABA, CENTIF) et CEMAC (GABAC, ANIF), KYC, bénéficiaires effectifs, déclaration de soupçon.", category: 'Conformité & Réglementation', icon: 'ri-shield-keyhole-line' },
  { id: 'pillar-conformite-fintech-afrique', title: "Conformité Fintech en Afrique : Agrément, Réglementation et Enjeux", excerpt: "Conformité fintech : agrément établissement de paiement, e-KYC, LBC/FT, cybersécurité, protection des données.", category: 'Conformité & Réglementation', icon: 'ri-smartphone-line' },
  { id: 'pillar-protection-donnees-personnelles-afrique', title: "Protection des Données Personnelles en Afrique : Cadre et Mise en Conformité", excerpt: "Protection des données : Convention de Malabo, Règlement UEMOA, RGPD, obligations, droits des personnes, feuille de route.", category: 'Conformité & Réglementation', icon: 'ri-lock-line' },

  // BU2 — Prix de Transfert & Fiscalité (7 articles)
  { id: 'pillar-prix-transfert-afrique', title: "Prix de Transfert en Afrique : Enjeux, Réglementation et Stratégies", excerpt: "Analyse stratégique des prix de transfert en Afrique : cadre OCDE/BEPS, risques de redressement, stratégie de conformité 5 piliers.", category: 'Prix de Transfert & Fiscalité', icon: 'ri-exchange-dollar-line' },
  { id: 'pillar-prix-transfert-uemoa', title: "Prix de Transfert en Zone UEMOA : Directive 01/2011 et Jurisprudence", excerpt: "Cadre prix de transfert UEMOA : Directive 01/2011, transpositions nationales, obligations documentaires, jurisprudence fiscale.", category: 'Prix de Transfert & Fiscalité', icon: 'ri-exchange-dollar-line' },
  { id: 'pillar-documentation-beps-afrique', title: "Documentation BEPS en Afrique : Master File, Local File et CbCR", excerpt: "Guide Action 13 BEPS : contenu du Master File, Local File, CbCR. Spécificités africaines et bonnes pratiques.", category: 'Prix de Transfert & Fiscalité', icon: 'ri-file-list-3-line' },
  { id: 'pillar-master-file-afrique', title: "Master File Afrique : Structurer la Documentation Globale", excerpt: "Préparation du Master File pour les groupes opérant en Afrique : 5 sections, risques pays, chaînes de valeur africaines.", category: 'Prix de Transfert & Fiscalité', icon: 'ri-folder-line' },
  { id: 'pillar-controle-fiscal-prix-transfert', title: "Contrôle Fiscal Prix de Transfert : Anticiper, Préparer, Défendre", excerpt: "Stratégie face au contrôle fiscal : déroulement étape par étape, documents indispensables, erreurs à éviter, plan d'action 30 jours.", category: 'Prix de Transfert & Fiscalité', icon: 'ri-file-search-line' },
  { id: 'pillar-defense-fiscale-afrique', title: "Défense Fiscale en Afrique : Stratégies Avancées Anti-Redressement", excerpt: "Défense fiscale : stratégies préventives, négociation, voies de recours, procédure amiable, APA et rescrits.", category: 'Prix de Transfert & Fiscalité', icon: 'ri-scales-line' },
  { id: 'pillar-fiscalite-internationale-afrique', title: "Fiscalité Internationale en Afrique : Conventions, RAS et Structuration", excerpt: "Fiscalité internationale : conventions fiscales, retenues à la source, établissement stable, impact BEPS 2.0 sur l'Afrique.", category: 'Prix de Transfert & Fiscalité', icon: 'ri-global-line' },

  // BU3 — Gouvernance & Risques (4 articles)
  { id: 'pillar-gouvernance-groupes-familiaux-afrique', title: "Gouvernance des Groupes Familiaux en Afrique : Structuration et Pérennité", excerpt: "Gouvernance des groupes familiaux : Conseil de Famille, charte, pacte d'actionnaires, succession, cadre OHADA.", category: 'Gouvernance', icon: 'ri-community-line' },
  { id: 'pillar-cartographie-risques-entreprise', title: "Cartographie des Risques d'Entreprise : Méthodologie Complète", excerpt: "Cartographie des risques : COSO ERM, ISO 31000, méthodologie 5 étapes, heat map, intégration contrôle interne.", category: 'Gouvernance & Risques', icon: 'ri-radar-line' },
  { id: 'pillar-erm-afrique', title: "ERM en Afrique : Déploiement, Gouvernance et Alignement Stratégique", excerpt: "Enterprise Risk Management : COSO ERM 2017, 3 lignes de défense, appétit au risque, spécificités africaines.", category: 'Gouvernance & Risques', icon: 'ri-shield-line' },
  { id: 'pillar-audit-interne-coso-afrique', title: "Audit Interne en Afrique : Cadre COSO et Exigences BCEAO/COBAC", excerpt: "Audit interne : COSO 2013, normes IIA, exigences BCEAO/COBAC, charte, plan d'audit basé sur les risques.", category: 'Gouvernance & Risques', icon: 'ri-check-double-line' },
];

// ── Déterminer la BU d'un article pillar ──
function getPillarBU(articleId: string, category: string): 'BU1' | 'BU2' | 'BU3' | null {
  if (!articleId.startsWith('pillar-')) return null;
  if (category.includes('Conformité') || category === 'Finance') return 'BU1';
  if (category.includes('Prix de Transfert') || category.includes('Fiscalité')) return 'BU2';
  if (category.includes('Gouvernance')) return 'BU3';
  return null;
}

const BU_LABELS: Record<string, { fr: string; subtitle: string; color: string }> = {
  BU1: { fr: 'Régulation & Conformité', subtitle: 'BCEAO · COBAC · LBC/FT · Agrément', color: 'bg-emerald-500' },
  BU2: { fr: 'Prix de Transfert & Fiscalité', subtitle: 'BEPS · Documentation · Contrôle Fiscal', color: 'bg-amber-500' },
  BU3: { fr: 'Gouvernance & Risques', subtitle: 'ERM · Audit Interne · Groupes Familiaux', color: 'bg-rose-500' },
};

interface InternalLinksProps {
  currentArticleId: string;
  currentCategory: string;
}

export function InternalLinks({ currentArticleId, currentCategory }: InternalLinksProps) {
  const navigate = useNavigate();
  const currentBU = getPillarBU(currentArticleId, currentCategory);
  if (!currentBU) return null;

  // Sélectionner 2-3 articles de chaque autre BU (pas plus de 6 au total)
  const otherBUs = (['BU1', 'BU2', 'BU3'] as const).filter(bu => bu !== currentBU);

  const crossLinks = otherBUs.flatMap(bu => {
    const buArticles = PILLAR_REFS.filter(ref => getPillarBU(ref.id, ref.category) === bu && ref.id !== currentArticleId);
    // Prendre max 3 par BU
    return buArticles.slice(0, 3).map(ref => ({ ...ref, bu }));
  });

  if (crossLinks.length === 0) return null;

  // Grouper par BU pour l'affichage
  const groupedByBU: Record<string, PillarRef[]> = {};
  crossLinks.forEach(link => {
    if (!groupedByBU[link.bu]) groupedByBU[link.bu] = [];
    groupedByBU[link.bu].push(link);
  });

  return (
    <div className="my-12 rounded-2xl border border-foreground-200/70 overflow-hidden">
      {/* En-tête */}
      <div className="bg-foreground-950 px-6 md:px-8 py-5 flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-accent-500/20 rounded-xl flex-shrink-0">
          <i className="ri-links-line text-accent-400 text-xl" aria-hidden="true"></i>
        </div>
        <div>
          <p className="text-xs font-semibold text-accent-400 uppercase tracking-widest mb-0.5">
            Pour approfondir
          </p>
          <p className="text-white text-sm leading-tight opacity-80">
            Explorez nos autres dossiers d&rsquo;expertise — une vision à 360° de la conformité, fiscalité et gouvernance en Afrique francophone.
          </p>
        </div>
      </div>

      {/* Sections par BU */}
      <div className="bg-background-50 divide-y divide-foreground-200/40">
        {otherBUs.map(bu => {
          const articles = groupedByBU[bu];
          if (!articles || articles.length === 0) return null;
          const buInfo = BU_LABELS[bu];

          return (
            <div key={bu} className="px-6 md:px-8 py-5">
              {/* Titre BU */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full ${buInfo.color} flex-shrink-0`}></div>
                <p className="text-xs font-semibold text-foreground-500 uppercase tracking-wide">
                  {buInfo.fr}
                </p>
                <span className="text-xs text-foreground-400 hidden sm:inline">
                  {buInfo.subtitle}
                </span>
              </div>

              {/* Grille d'articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {articles.map(ref => {
                  const slug = resolveIdToSlug(ref.id) || ref.id;
                  return (
                    <button
                      key={ref.id}
                      onClick={() => {
                        navigate(`/blog/${slug}/`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group text-left flex items-start gap-3 p-3 rounded-xl bg-background-100 hover:bg-background-200/70 border border-background-200/60 hover:border-accent-300/40 transition-all cursor-pointer"
                      type="button"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 flex-shrink-0 mt-0.5">
                        <i className={`${ref.icon} text-sm text-accent-600`} aria-hidden="true"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground-900 leading-snug group-hover:text-accent-700 transition-colors line-clamp-2 mb-0.5">
                          {ref.title}
                        </p>
                        <p className="text-xs text-foreground-500 leading-relaxed line-clamp-2 hidden sm:block">
                          {ref.excerpt}
                        </p>
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="ri-arrow-right-s-line text-accent-500 text-sm" aria-hidden="true"></i>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pied */}
      <div className="bg-background-100 px-6 md:px-8 py-3 border-t border-foreground-200/40 flex items-center gap-2">
        <i className="ri-information-line text-foreground-400 text-sm" aria-hidden="true"></i>
        <p className="text-xs text-foreground-500">
          Dossier d&rsquo;expertise rédigé par SIMDA Essoyomèwè — 22+ ans d&rsquo;expérience en conformité, fiscalité et gouvernance en Afrique francophone.
        </p>
      </div>
    </div>
  );
}




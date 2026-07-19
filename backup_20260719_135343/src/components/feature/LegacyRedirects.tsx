import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * ServiceLegacyRedirects
 *
 * Gère les redirections 301 côté client des anciennes URLs de service non-préfixées
 * vers leurs équivalents canoniques sous /services/.
 * Cela résout le problème near-duplicate signalé dans GSC :
 * /conseil-strategique → /services/conseil-strategique/
 * /gouvernance-entreprise → /services/
 * etc.
 */
export function ServiceLegacyRedirects() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const serviceRedirects: Record<string, string> = {
      '/conseil-strategique': '/services/conseil-strategique',
      '/gouvernance-entreprise': '/services',
      '/inclusion-financiere-digitale': '/services',
      '/gestion-risques-entreprise': '/services',
    };

    // Normaliser le pathname (sans slash final pour la comparaison)
    const normalizedPath = pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

    const target = serviceRedirects[normalizedPath];
    if (target) {
      navigate(target, { replace: true });
    }
  }, [pathname, navigate]);

  return null;
}

/**
 * LegacyRedirects
 * 
 * Gère les redirections des anciennes URLs avec ancres (#) vers les nouvelles routes.
 * Ce composant assure la rétrocompatibilité pour les liens externes et les favoris.
 * 
 * Exemples de redirections :
 * - /#services → /services
 * - /#expertise → /expertises
 * - /#contact → /contact
 * - /#about → /about
 * - /#approach → /approche
 */
export function LegacyRedirects() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Mapping des anciennes ancres vers les nouvelles routes
    const redirectMap: Record<string, string> = {
      // ── Pages principales ──
      '#services': '/services',
      '#expertise': '/expertises',
      '#expertises': '/expertises',
      '#about': '/about',
      '#a-propos': '/about',
      '#contact': '/contact',
      '#approach': '/approche',
      '#approche': '/approche',
      '#insights': '/insights',
      '#blog': '/blog',
      '#resources': '/resources',
      '#ressources': '/resources',
      '#case-studies': '/case-studies',
      '#etudes-de-cas': '/case-studies',
      '#partenaires': '/partenaires',
      '#partners': '/partenaires',
      '#equipe': '/equipe',
      '#team': '/equipe',
      '#publications': '/publications',
      '#tools': '/tools',
      '#outils': '/tools',
      '#decideurs': '/decideurs',
      // Désactivé temporairement — page /formations non publique
      // '#formations': '/formations',
      '#solutions': '/solutions',
      '#sitemap': '/sitemap',
      '#legal': '/legal',
      '#privacy': '/privacy',
      '#thank-you': '/thank-you',

      // ── Landing pages spécialisées ──
      '#investisseurs': '/investisseurs',
      '#projets-industriels': '/projets-industriels',
      '#strategie-digitale': '/strategie-digitale',
      '#offre-commerciale': '/offre-commerciale',
      '#diagnostic-flash': '/diagnostic-flash',
      '#board-report': '/board-report',
      '#mon-espace': '/mon-espace',
      '#administrateur': '/administrateur',

      // ── Régions & zones géographiques ──
      '#afrique': '/regions/afrique',
      '#africa': '/regions/africa',
      '#west-africa': '/regions/west-africa',
      '#afrique-de-l-ouest': '/regions/west-africa',
      '#afrique-francophone': '/regions/afrique-francophone',
      '#uemoa-cemac': '/regions/uemoa-cemac',

      // ── Piliers thématiques ──
      '#digital-transformation-africa': '/pillar/digital-transformation-africa',
      '#financial-inclusion-africa': '/pillar/financial-inclusion-africa',
      '#fintech-advisory-africa': '/pillar/fintech-advisory-africa',
      '#microfinance-transformation-africa': '/pillar/microfinance-transformation-africa',
      '#sme-development-africa': '/pillar/sme-development-africa',

      // ── Industries ──
      '#industries': '/industries',
      '#microfinance': '/industries/microfinance',
      '#fintech': '/industries/fintech',
      '#pme': '/industries/pme',
      '#secteur-public': '/industries/public-sector',
      '#public-sector': '/industries/public-sector',
      '#cemac-beac': '/industries/cemac-beac',

      // ── Services individuels (anciennes ancres) ──
      '#conseil-strategique': '/services/conseil-strategique',
      '#gestion-projets': '/services/gestion-de-projets',
      '#developpement-organisationnel': '/services/developpement-organisationnel',
      '#renforcement-capacites': '/services/renforcement-capacites',
      '#diagnostic-organisationnel': '/services/diagnostic-organisationnel',
      '#audit-social': '/services/audit-social',
      '#ressources-humaines': '/services/ressources-humaines',
      '#transformation-digitale': '/services/transformation-digitale',
      '#communication-strategique': '/services/communication-strategique',
      '#levee-fonds': '/services/levee-de-fonds',

      // ── Outils populaires ──
      '#diagnostic-strategique': '/tools/diagnostic-strategique',
      '#evaluation-gouvernance': '/tools/evaluation-gouvernance',
      '#evaluation-conformite-reglementaire': '/tools/evaluation-conformite-reglementaire',
      '#simulateur-financier': '/tools/simulateur-financier',
      '#investment-readiness': '/tools/investment-readiness',
      '#diagnostic-risques': '/tools/diagnostic-risques',
      '#benchmark-sectoriel': '/tools/benchmark-sectoriel',
      '#diagnostic-esg-impact': '/tools/diagnostic-esg-impact',
      '#maturite-digitale': '/tools/maturite-digitale',
      '#evaluation-cybersecurite': '/tools/evaluation-cybersecurite',

      // ── Ancres de sections vers pages dédiées ──
      '#mission': '/about',
      '#vision': '/about',
      '#valeurs': '/about',
      '#stats': '/about',
      '#temoignages': '/case-studies',
      '#actualites': '/blog',
      '#evenements': '/blog',
      '#newsletter': '/blog',
    };

    // Vérifier si l'URL contient une ancre
    const hash = location.hash;
    
    if (hash && redirectMap[hash]) {
      // Rediriger vers la nouvelle route
      const newPath = redirectMap[hash];
      console.log(`🔄 Redirection legacy: ${hash} → ${newPath}`);
      navigate(newPath, { replace: true });
    }
  }, [location.hash, navigate]);

  return null;
}

export default LegacyRedirects;




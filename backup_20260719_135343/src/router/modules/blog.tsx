import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const BlogPage = lazy(() => import('@/pages/blog/page').then(m => ({ default: m.default })));
const ArticleDetailPage = lazy(() => import('@/pages/blog/ArticleDetail').then(m => ({ default: m.default })));
const DAFBlogPage = lazy(() => import('@/pages/blog/daf/page').then(m => ({ default: m.default })));
const ControleInterneTresoreriePage = lazy(() => import('@/pages/blog/controle-interne-tresorerie/page').then(m => ({ default: m.default })));
const BceaoOhadaPage = lazy(() => import('@/pages/blog/bceao-ohada-conformite/page').then(m => ({ default: m.default })));
const IndependanceAdministrateursPage = lazy(() => import('@/pages/blog/independance-administrateurs-circulaire-01-2017/page').then(m => ({ default: m.default })));
const VerrouNationalitePage = lazy(() => import('@/pages/blog/verrou-nationalite-competences-executives-circulaire-02-2017/page').then(m => ({ default: m.default })));
const ProtectionLanceursAlertePage = lazy(() => import('@/pages/blog/protection-lanceurs-alerte-circulaire-01-2017/page').then(m => ({ default: m.default })));
const SerieGouvernanceBancaireUEMOAPage = lazy(() => import('@/pages/blog/serie-gouvernance-bancaire-uemoa/page').then(m => ({ default: m.default })));
const ComitesSpecialisesPage = lazy(() => import('@/pages/blog/comites-specialises-circulaire-01-2017/page').then(m => ({ default: m.default })));
const PPRCirulaire001_2020Page = lazy(() => import('@/pages/blog/plans-preventifs-redressement-circulaire-001-2020/page').then(m => ({ default: m.default })));
const ConformiteCobacPage = lazy(() => import('@/pages/blog/conformite-cobac-cemac/page').then(m => ({ default: m.default })));
const EsgAfriquePage = lazy(() => import('@/pages/blog/esg-afrique-entreprises/page').then(m => ({ default: m.default })));
const AvoirsDormantsPage = lazy(() => import('@/pages/blog/avoirs-dormants-sfd-uemoa/page').then(m => ({ default: m.default })));
const FinanceIslamiquePage = lazy(() => import('@/pages/blog/finance-islamique-sfd-instruction-bceao-005-05-2018/page').then(m => ({ default: m.default })));
const CatalogueInstructionsBceaoPage = lazy(() => import('@/pages/blog/textes-officiels-sfd-uemoa-catalogue-22-instructions-bceao/page').then(m => ({ default: m.default })));
const RCSSFDPage = lazy(() => import('@/pages/blog/referentiel-comptable-sfd-rcs-instructions-bceao-025-026-030/page').then(m => ({ default: m.default })));
const ModifsStatutairesPage = lazy(() => import('@/pages/blog/modifications-statutaires-sfd-instructions-bceao-001-002-2017/page').then(m => ({ default: m.default })));
const ReportingSFDPage = lazy(() => import('@/pages/blog/reporting-periodique-sfd-instructions-bceao-018-020-2010/page').then(m => ({ default: m.default })));
const RetraitAgrementPage = lazy(() => import('@/pages/blog/retrait-agrement-sfd-instruction-bceao-004-2010/page').then(m => ({ default: m.default })));
const IMCECPage = lazy(() => import('@/pages/blog/fonds-securite-solidarite-imcec-instruction-bceao-019-2010/page').then(m => ({ default: m.default })));
const RefinancementPage = lazy(() => import('@/pages/blog/refinancement-bceao-sfd-instruction-061-2011/page').then(m => ({ default: m.default })));
const FIGeneralePage = lazy(() => import('@/pages/blog/finance-islamique-sfd-dispositions-generales-instruction-bceao-003-2018/page').then(m => ({ default: m.default })));
const ReformeSolvabilitePage = lazy(() => import('@/pages/blog/reforme-ratio-solvabilite-uemoa-2026/page').then(m => ({ default: m.default })));
const PrixTransfertBEPSPage = lazy(() => import('@/pages/blog/prix-transfert-5-erreurs-fatales-documentation-beps/page').then(m => ({ default: m.default })));
const CACobacPage = lazy(() => import('@/pages/blog/preparer-conseil-administration-inspection-cobac/page').then(m => ({ default: m.default })));
const ESGISSBPage = lazy(() => import('@/pages/blog/esg-banques-africaines-standards-issb/page').then(m => ({ default: m.default })));
const DigitalisationSFDPage = lazy(() => import('@/pages/blog/digitalisation-sfd-modele-bceao-inclusion-financiere/page').then(m => ({ default: m.default })));
const StressTestsClimatiquesPage = lazy(() => import('@/pages/blog/stress-tests-climatiques-pilier-2-bceao-cobac/page').then(m => ({ default: m.default })));
const LBCFTGAFI2026Page = lazy(() => import('@/pages/blog/lbcft-nouvelles-exigences-gafi-2026/page').then(m => ({ default: m.default })));
const CybersecuriteCOBAC2027Page = lazy(() => import('@/pages/blog/cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle/page').then(m => ({ default: m.default })));
const RegulationFinTechUEMOAPage = lazy(() => import('@/pages/blog/regulation-fintech-uemoa-2026-2027/page').then(m => ({ default: m.default })));
const ALMBancaireUEMOAPage = lazy(() => import('@/pages/blog/gestion-actif-passif-alm-bancaire-uemoa/page').then(m => ({ default: m.default })));
const IFRS9ProvisioningPage = lazy(() => import('@/pages/blog/provisionnement-ifrs9-creances-souffrance-dispositif-prudentiel-bceao-banques-uemoa-2026/page').then(m => ({ default: m.default })));
const AuditCreditScoringPage = lazy(() => import('@/pages/blog/audit-algorithmes-credit-scoring-exigences-bceao-banques-fintechs-uemoa-2026/page').then(m => ({ default: m.default })));
const GouvernanceSFDPage = lazy(() => import('@/pages/blog/gouvernance-sfd-7-piliers-bceao-attirer-investisseurs-uemoa-2026/page').then(m => ({ default: m.default })));
const ProtectionDonneesPage = lazy(() => import('@/pages/blog/protection-donnees-personnelles-secteur-financier-uemoa-rgpd-bceao-2026/page').then(m => ({ default: m.default })));
const FinanceIslamiqueUEMOAPage = lazy(() => import('@/pages/blog/finance-islamique-uemoa-guide-strategique-banques-sfd-fintechs-sharia-compliant-2026/page').then(m => ({ default: m.default })));
const ResilienceCOBACPage = lazy(() => import('@/pages/blog/resilience-operationnelle-bancaire-directive-cobac-2027-dora-afrique-cemac-2026/page').then(m => ({ default: m.default })));
const MicrofinanceRatiosPrudentielsPage = lazy(() => import('@/pages/blog/microfinance-ratios-prudentiels-sfd-emf-bceao-cobac/page').then(m => ({ default: m.default })));
// S26 — 5 nouveaux articles régionaux
const ConformiteSenegalPage = lazy(() => import('@/pages/blog/conformite-senegal-uemoa-bceao-2026/page').then(m => ({ default: m.default })));
const ConformiteCoteDIvoirePage = lazy(() => import('@/pages/blog/conformite-cote-divoire-bceao-uemoa/page').then(m => ({ default: m.default })));
const InspectionCOBACCamerounPage = lazy(() => import('@/pages/blog/inspection-cobac-cameroun-cemac-preparation/page').then(m => ({ default: m.default })));
const AgrementMicrofinanceUEMOACEMACPage = lazy(() => import('@/pages/blog/agrement-microfinance-uemoa-cemac-guide-complet/page').then(m => ({ default: m.default })));
const FintechGabonCEMACPage = lazy(() => import('@/pages/blog/fintech-gabon-cemac-agrement-regulation/page').then(m => ({ default: m.default })));

export const blogRoutes: RouteObject[] = [
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/page/:pageNumber', element: <BlogPage /> },
  { path: '/blog/direction-financiere-externalisee', element: <DAFBlogPage /> },
  { path: '/blog/daf-externalise-pilotage-financier-pme-afrique', element: <DAFBlogPage /> },
  { path: '/blog/controle-interne-tresorerie', element: <ControleInterneTresoreriePage /> },
  { path: '/blog/controle-interne-tresorerie-pme-afrique-syscohada', element: <ControleInterneTresoreriePage /> },
  { path: '/blog/bceao-ohada-conformite', element: <BceaoOhadaPage /> },
  { path: '/blog/3-lignes-defense-circulaire-03-2017', element: <ArticleDetailPage /> },
  { path: '/blog/independance-administrateurs-circulaire-01-2017', element: <IndependanceAdministrateursPage /> },
  { path: '/blog/verrou-nationalite-competences-executives-circulaire-02-2017', element: <VerrouNationalitePage /> },
  { path: '/blog/protection-lanceurs-alerte-circulaire-01-2017', element: <ProtectionLanceursAlertePage /> },
  { path: '/blog/serie-gouvernance-bancaire-uemoa', element: <SerieGouvernanceBancaireUEMOAPage /> },
  { path: '/blog/comites-specialises-circulaire-01-2017', element: <ComitesSpecialisesPage /> },
  { path: '/blog/plans-preventifs-redressement-circulaire-001-2020', element: <PPRCirulaire001_2020Page /> },
  { path: '/blog/protection-consommateurs-financiers-uemoa-cemac', element: <ArticleDetailPage /> },
  { path: '/blog/conformite-cobac-cemac', element: <ConformiteCobacPage /> },
  { path: '/blog/esg-afrique-entreprises', element: <EsgAfriquePage /> },
  { path: '/blog/avoirs-dormants-sfd-uemoa', element: <AvoirsDormantsPage /> },
  { path: '/blog/finance-islamique-sfd-instruction-bceao-005-05-2018', element: <FinanceIslamiquePage /> },
  { path: '/blog/textes-officiels-sfd-uemoa-catalogue-22-instructions-bceao', element: <CatalogueInstructionsBceaoPage /> },
  { path: '/blog/referentiel-comptable-sfd-rcs-instructions-bceao-025-026-030', element: <RCSSFDPage /> },
  { path: '/blog/modifications-statutaires-sfd-instructions-bceao-001-002-2017', element: <ModifsStatutairesPage /> },
  { path: '/blog/reporting-periodique-sfd-instructions-bceao-018-020-2010', element: <ReportingSFDPage /> },
  { path: '/blog/retrait-agrement-sfd-instruction-bceao-004-2010', element: <RetraitAgrementPage /> },
  { path: '/blog/fonds-securite-solidarite-imcec-instruction-bceao-019-2010', element: <IMCECPage /> },
  { path: '/blog/refinancement-bceao-sfd-instruction-061-2011', element: <RefinancementPage /> },
  { path: '/blog/finance-islamique-sfd-dispositions-generales-instruction-bceao-003-2018', element: <FIGeneralePage /> },
  { path: '/blog/fonds-propres-reglementaires-bale-iii', element: <ArticleDetailPage /> },
  { path: '/blog/icaap-ilaap-bale-banques-uemoa', element: <ArticleDetailPage /> },
  { path: '/blog/controle-interne-coso-2013-banques-uemoa', element: <ArticleDetailPage /> },
  { path: '/blog/due-diligence-acquisition-pme-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/reglementation-fintech-afrique-2026', element: <ArticleDetailPage /> },
  { path: '/blog/fiscalite-transfrontaliere-afrique-conventions', element: <ArticleDetailPage /> },
  { path: '/blog/reporting-esg-ifc-gri-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/digitalisation-conformite-regtech-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/stress-testing-portefeuille-credit-uemoa', element: <ArticleDetailPage /> },
  { path: '/blog/evaluation-conseil-administration-uemoa', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-inspection-bceao-guide-complet', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-inspection-cobac-guide-complet', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-conformite-banque-uemoa', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-ratios-prudentiels-bceao', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-agrement-sfd-bceao', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-audit-pre-inspection-bceao', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-lbcft-afrique-francophone', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-prix-transfert-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-prix-transfert-uemoa', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-documentation-beps-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-master-file-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-controle-fiscal-prix-transfert', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-defense-fiscale-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-fiscalite-internationale-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-gouvernance-groupes-familiaux-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-cartographie-risques-entreprise', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-erm-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-audit-interne-coso-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-conformite-fintech-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/pillar-protection-donnees-personnelles-afrique', element: <ArticleDetailPage /> },
  { path: '/blog/reforme-ratio-solvabilite-uemoa-2026', element: <ReformeSolvabilitePage /> },
  { path: '/blog/prix-transfert-5-erreurs-fatales-documentation-beps', element: <PrixTransfertBEPSPage /> },
  { path: '/blog/preparer-conseil-administration-inspection-cobac', element: <CACobacPage /> },
  { path: '/blog/esg-banques-africaines-standards-issb', element: <ESGISSBPage /> },
  { path: '/blog/digitalisation-sfd-modele-bceao-inclusion-financiere', element: <DigitalisationSFDPage /> },
  { path: '/blog/stress-tests-climatiques-pilier-2-bceao-cobac', element: <StressTestsClimatiquesPage /> },
  { path: '/blog/lbcft-nouvelles-exigences-gafi-2026', element: <LBCFTGAFI2026Page /> },
  { path: '/blog/cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle', element: <CybersecuriteCOBAC2027Page /> },
  { path: '/blog/regulation-fintech-uemoa-2026-2027', element: <RegulationFinTechUEMOAPage /> },
  { path: '/blog/gestion-actif-passif-alm-bancaire-uemoa', element: <ALMBancaireUEMOAPage /> },
  { path: '/blog/provisionnement-ifrs9-creances-souffrance-dispositif-prudentiel-bceao-banques-uemoa-2026', element: <IFRS9ProvisioningPage /> },
  { path: '/blog/audit-algorithmes-credit-scoring-exigences-bceao-banques-fintechs-uemoa-2026', element: <AuditCreditScoringPage /> },
  { path: '/blog/gouvernance-sfd-7-piliers-bceao-attirer-investisseurs-uemoa-2026', element: <GouvernanceSFDPage /> },
  { path: '/blog/protection-donnees-personnelles-secteur-financier-uemoa-rgpd-bceao-2026', element: <ProtectionDonneesPage /> },
  { path: '/blog/finance-islamique-uemoa-guide-strategique-banques-sfd-fintechs-sharia-compliant-2026', element: <FinanceIslamiqueUEMOAPage /> },
  { path: '/blog/resilience-operationnelle-bancaire-directive-cobac-2027-dora-afrique-cemac-2026', element: <ResilienceCOBACPage /> },
  { path: '/blog/microfinance-ratios-prudentiels-sfd-emf-bceao-cobac', element: <MicrofinanceRatiosPrudentielsPage /> },
  // S26 — 5 nouveaux articles régionaux
  { path: '/blog/conformite-senegal-uemoa-bceao-2026', element: <ConformiteSenegalPage /> },
  { path: '/blog/conformite-cote-divoire-bceao-uemoa', element: <ConformiteCoteDIvoirePage /> },
  { path: '/blog/inspection-cobac-cameroun-cemac-preparation', element: <InspectionCOBACCamerounPage /> },
  { path: '/blog/agrement-microfinance-uemoa-cemac-guide-complet', element: <AgrementMicrofinanceUEMOACEMACPage /> },
  { path: '/blog/fintech-gabon-cemac-agrement-regulation', element: <FintechGabonCEMACPage /> },
];




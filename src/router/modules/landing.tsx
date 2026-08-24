import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { ComplianceScoreResultSkeleton } from '@/components/feature/ComplianceScoreSkeleton';

// Industries
const IndustriesPage = lazy(() => import('@/pages/industries/page').then(m => ({ default: m.default })));
const MicrofinancePage = lazy(() => import('@/pages/industries/microfinance/page').then(m => ({ default: m.default })));
const PMEPage = lazy(() => import('@/pages/industries/pme/page').then(m => ({ default: m.default })));
const PublicSectorPage = lazy(() => import('@/pages/industries/public-sector/page').then(m => ({ default: m.default })));
const FintechPage = lazy(() => import('@/pages/industries/fintech/page').then(m => ({ default: m.default })));
const CEMACBEACPage = lazy(() => import('@/pages/industries/cemac-beac/page').then(m => ({ default: m.default })));

// Regions
const AfricaPage = lazy(() => import('@/pages/regions/africa/page').then(m => ({ default: m.default })));
const WestAfricaPage = lazy(() => import('@/pages/regions/west-africa/page').then(m => ({ default: m.default })));
const SenegalPage = lazy(() => import('@/pages/regions/senegal/page').then(m => ({ default: m.default })));
const CoteDIvoirePage = lazy(() => import('@/pages/regions/cote-divoire/page').then(m => ({ default: m.default })));
const CamerounPage = lazy(() => import('@/pages/regions/cameroun/page').then(m => ({ default: m.default })));
const GabonPage = lazy(() => import('@/pages/regions/gabon/page').then(m => ({ default: m.default })));
const AfriqueExpertisePage = lazy(() => import('@/pages/regions/afrique/page').then(m => ({ default: m.default })));
const UEMOACEMACPage = lazy(() => import('@/pages/regions/uemoa-cemac/page').then(m => ({ default: m.default })));
const AfriqueFrancophonePage = lazy(() => import('@/pages/regions/afrique-francophone/page').then(m => ({ default: m.default })));

// Regional Language Landing Pages (ISO2 country codes)
const RegionalLangPage = lazy(() => import('@/pages/regional-lang/RegionalLangPage').then(m => ({ default: m.default })));

// Pillar
const ConseilStrategiquePmeAfriquePage = lazy(() => import('@/pages/pillar/conseil-strategique-pme-afrique/page').then(m => ({ default: m.default })));
const TransformationDigitaleOhadaPage = lazy(() => import('@/pages/pillar/transformation-digitale-ohada/page').then(m => ({ default: m.default })));
const LeveeDeFondsAfriquePage = lazy(() => import('@/pages/pillar/levee-de-fonds-afrique/page').then(m => ({ default: m.default })));
const DigitalTransformationAfricaPage = lazy(() => import('@/pages/pillar/digital-transformation-africa/page').then(m => ({ default: m.default })));
const FinancialInclusionAfricaPage = lazy(() => import('@/pages/pillar/financial-inclusion-africa/page').then(m => ({ default: m.default })));
const FintechAdvisoryAfricaPage = lazy(() => import('@/pages/pillar/fintech-advisory-africa/page').then(m => ({ default: m.default })));
const MicrofinanceTransformationAfricaPage = lazy(() => import('@/pages/pillar/microfinance-transformation-africa/page').then(m => ({ default: m.default })));
const SMEDevelopmentAfricaPage = lazy(() => import('@/pages/pillar/sme-development-africa/page').then(m => ({ default: m.default })));

// 8 SEO Piliers Stratégiques — Priorité 3
const AuditRiskAfriquePage = lazy(() => import('@/pages/pillar/audit-risk-afrique/page').then(m => ({ default: m.default })));
const FinancePerformanceAfriquePage = lazy(() => import('@/pages/pillar/finance-performance-afrique/page').then(m => ({ default: m.default })));
const GouvernanceEntrepriseAfriquePage = lazy(() => import('@/pages/pillar/gouvernance-entreprise-afrique/page').then(m => ({ default: m.default })));
const ESGDurabiliteAfriquePage = lazy(() => import('@/pages/pillar/esg-durabilite-afrique/page').then(m => ({ default: m.default })));
const ConformiteReglementaireAfriquePage = lazy(() => import('@/pages/pillar/conformite-reglementaire-afrique/page').then(m => ({ default: m.default })));
const TransformationDigitaleAfriquePage = lazy(() => import('@/pages/pillar/transformation-digitale-afrique/page').then(m => ({ default: m.default })));
const CybersecuriteAfriquePage = lazy(() => import('@/pages/pillar/cybersecurite-afrique/page').then(m => ({ default: m.default })));
const PMEAfriqueCroissancePage = lazy(() => import('@/pages/pillar/pme-afrique-croissance/page').then(m => ({ default: m.default })));

// Geo-Hub
const GeoHubPage = lazy(() => import('@/pages/geo-hub/page').then(m => ({ default: m.default })));
const GeoReussirDueDiligencePage = lazy(() => import('@/pages/geo-hub/reussir-due-diligence-afrique/page').then(m => ({ default: m.default })));
const GeoMiseEnConformiteBceaoPage = lazy(() => import('@/pages/geo-hub/mise-en-conformite-bceao/page').then(m => ({ default: m.default })));
const GeoMiseEnOeuvreESGAfriquePage = lazy(() => import('@/pages/geo-hub/mise-en-oeuvre-esg-afrique/page').then(m => ({ default: m.default })));
const GeoRenforcerGouvernanceEntreprisePage = lazy(() => import('@/pages/geo-hub/renforcer-gouvernance-entreprise/page').then(m => ({ default: m.default })));
const GeoPreparerLeveeFondsAfriquePage = lazy(() => import('@/pages/geo-hub/preparer-levee-fonds-afrique/page').then(m => ({ default: m.default })));
const GeoAgrementSFDBCEAOCOBACPage = lazy(() => import('@/pages/geo-hub/agrement-sfd-bceao-cobac/page').then(m => ({ default: m.default })));
const GeoCartographieRisquesEntreprisePage = lazy(() => import('@/pages/geo-hub/cartographie-risques-entreprise/page').then(m => ({ default: m.default })));
const GeoPreparerMissionBCEAOPage = lazy(() => import('@/pages/geo-hub/preparer-mission-bceao/page').then(m => ({ default: m.default })));

// Case Studies
const CaseStudiesPage = lazy(() => import('@/pages/case-studies/page').then(m => ({ default: m.default })));
const RegTechCaseStudyPage = lazy(() => import('@/pages/case-studies/regtech-conformite-uemoa-cemac/page').then(m => ({ default: m.default })));
const GovernanceBoardCaseStudyPage = lazy(() => import('@/pages/case-studies/gouvernance-board-advisory-uemoa/page').then(m => ({ default: m.default })));
const AgrementMultinationalCaseStudyPage = lazy(() => import('@/pages/case-studies/agrement-multinational-sfd-uemoa-cemac/page').then(m => ({ default: m.default })));
const IngenierieFinanciereIndustrielCaseStudyPage = lazy(() => import('@/pages/case-studies/ingenierie-financiere-projet-industriel-cedao/page').then(m => ({ default: m.default })));
const PrixTransfertCaseStudyPage = lazy(() => import('@/pages/case-studies/prix-transfert-microfinance-groupe-panafricain/page').then(m => ({ default: m.default })));
const PreInspectionBCEAOCaseStudyPage = lazy(() => import('@/pages/case-studies/pre-inspection-bceao-banque-uemoa/page').then(m => ({ default: m.default })));

// Knowledge Hub
const DueDiligenceHubPage = lazy(() => import('@/pages/knowledge-hub/due-diligence/page').then(m => ({ default: m.default })));
const ESGHubPage = lazy(() => import('@/pages/knowledge-hub/esg/page').then(m => ({ default: m.default })));
const BCEAOHubPage = lazy(() => import('@/pages/knowledge-hub/bceao/page').then(m => ({ default: m.default })));
const COBACHubPage = lazy(() => import('@/pages/knowledge-hub/cobac/page').then(m => ({ default: m.default })));

// Guides
const GuideDueDiligencePage = lazy(() => import('@/pages/guide-due-diligence-afrique/page').then(m => ({ default: m.default })));
const GuideESGPage = lazy(() => import('@/pages/guide-esg-afrique/page').then(m => ({ default: m.default })));
const GuideInvestmentReadinessPage = lazy(() => import('@/pages/guide-investment-readiness/page').then(m => ({ default: m.default })));
const GuideGouvernanceIMFPage = lazy(() => import('@/pages/guide-gouvernance-imf/page').then(m => ({ default: m.default })));
const GuideBCEAO2026Page = lazy(() => import('@/pages/guide-bceao-2026/page').then(m => ({ default: m.default })));

// Lead Magnets
const LeadMagnetsPage = lazy(() => import('@/pages/lead-magnets/page').then(m => ({ default: m.default })));
const ChecklistConformitePage = lazy(() => import('@/pages/lead-magnets/checklist-conformite-bceao-cobac/page').then(m => ({ default: m.default })));
const GuideLeveeFondsPage = lazy(() => import('@/pages/lead-magnets/guide-levee-fonds-afrique/page').then(m => ({ default: m.default })));
const SimulationRisquePage = lazy(() => import('@/pages/lead-magnets/simulation-risque-reglementaire/page').then(m => ({ default: m.default })));
const TemplateAuditGouvernancePage = lazy(() => import('@/pages/lead-magnets/template-audit-gouvernance/page').then(m => ({ default: m.default })));
const MiniRapportDDPage = lazy(() => import('@/pages/lead-magnets/mini-rapport-due-diligence/page').then(m => ({ default: m.default })));
const DiagnosticESGLeadPage = lazy(() => import('@/pages/lead-magnets/diagnostic-esg-maturite/page').then(m => ({ default: m.default })));
const DiagnosticFlashConformiteBCEAOCOBAC2026Page = lazy(() => import('@/pages/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026/page').then(m => ({ default: m.default })));
const GuidePrixTransfertBEPSPage = lazy(() => import('@/pages/lead-magnets/guide-prix-transfert-beps-afrique/page').then(m => ({ default: m.default })));
const SimulateurAgrementMicrofinanceCEMACPage = lazy(() => import('@/pages/lead-magnets/simulateur-agrement-microfinance-cemac/page').then(m => ({ default: m.default })));
const BarometreRegTechUEMOA2026Page = lazy(() => import('@/pages/lead-magnets/barometre-regtech-uemoa-2026/page').then(m => ({ default: m.default })));
const ComplianceOHADAKOSAIPage = lazy(() => import('@/pages/lead-magnets/compliance-ohada-kos-ai/page').then(m => ({ default: m.default })));
const CartographieRisquesBancairesAfriquePage = lazy(() => import('@/pages/lead-magnets/cartographie-risques-bancaires-afrique/page').then(m => ({ default: m.default })));
const DiagnosticScoringKBRPage = lazy(() => import('@/pages/lead-magnets/diagnostic-scoring-kbr/page').then(m => ({ default: m.default })));

// Compliance Score
const ComplianceScorePage = lazy(() => import('@/pages/compliance-score/page').then(m => ({ default: m.default })));

// Observatoire Réglementaire Africain
const ObservatoireReglementaireAfricainPage = lazy(() => import('@/pages/observatoire-reglementaire-africain/page').then(m => ({ default: m.default })));

// Hub Agréments Afrique
const AgrementsAfriquePage = lazy(() => import('@/pages/agrements-afrique/page').then(m => ({ default: m.default })));

// Digital Compliance Factory — Bibliothèque publique
const DigitalComplianceFactoryPage = lazy(() => import('@/pages/digital-compliance-factory/page').then(m => ({ default: m.default })));

// Observatoires Sectoriels — Hub enrichi 7 secteurs
const ObservatoiresSectorielsPage = lazy(() => import('@/pages/observatoires-sectoriels/page').then(m => ({ default: m.default })));

// Observatoires Sectoriels — pages détaillées par secteur
const ObservatoireBanquesPage = lazy(() => import('@/pages/observatoires-sectoriels/banques/page').then(m => ({ default: m.default })));
const ObservatoireFintechsPage = lazy(() => import('@/pages/observatoires-sectoriels/fintechs/page').then(m => ({ default: m.default })));
const ObservatoireEnergiePage = lazy(() => import('@/pages/observatoires-sectoriels/energie/page').then(m => ({ default: m.default })));
const ObservatoireAgriculturePage = lazy(() => import('@/pages/observatoires-sectoriels/agriculture/page').then(m => ({ default: m.default })));
const ObservatoirePMEPage = lazy(() => import('@/pages/observatoires-sectoriels/pme/page').then(m => ({ default: m.default })));
const ObservatoireESGPage = lazy(() => import('@/pages/observatoires-sectoriels/esg/page').then(m => ({ default: m.default })));
const ObservatoireMicrofinancePage = lazy(() => import('@/pages/observatoires-sectoriels/microfinance/page').then(m => ({ default: m.default })));
const ComparatifSectorielPage = lazy(() => import('@/pages/observatoires-sectoriels/comparatif/page').then(m => ({ default: m.default })));

// Partenariats Académiques & Backlinks
const PartenariatsAcademiquesPage = lazy(() => import('@/pages/partenariats-academiques/page').then(m => ({ default: m.default })));

// Tableau de Suivi Trimestriel
const TableauSuiviTrimestrielPage = lazy(() => import('@/pages/tableau-de-suivi-trimestriel/page').then(m => ({ default: m.default })));

// BU Landing Pages
const RegulationFinancierePage = lazy(() => import('@/pages/regulation-financiere/page').then(m => ({ default: m.default })));
const PrixTransfertPage = lazy(() => import('@/pages/prix-de-transfert/page').then(m => ({ default: m.default })));
const GouvernanceRisquesPage = lazy(() => import('@/pages/gouvernance-risques/page').then(m => ({ default: m.default })));

// Landing
const AuditFinancierAfriquePage = lazy(() => import('@/pages/audit-financier-afrique/page').then(m => ({ default: m.default })));
const DueDiligencePMEAfriquePage = lazy(() => import('@/pages/due-diligence-pme-afrique/page').then(m => ({ default: m.default })));
const GouvernanceOHADAPage = lazy(() => import('@/pages/gouvernance-ohada/page').then(m => ({ default: m.default })));
const GuideSeoIaAfriquePage = lazy(() => import('@/pages/guide-seo-ia-afrique/page').then(m => ({ default: m.default })));
const InspectionCOBACPage = lazy(() => import('@/pages/inspection-cobac/page').then(m => ({ default: m.default })));
const ConformiteCEMACLandingPage = lazy(() => import('@/pages/conformite-cemac/page').then(m => ({ default: m.default })));
const AgrementBEACPage = lazy(() => import('@/pages/agrement-beac/page').then(m => ({ default: m.default })));
const ConformiteGABACLandingPage = lazy(() => import('@/pages/conformite-gabac/page').then(m => ({ default: m.default })));

// Plateforme RegTech AI
const PlatformRegtechPage = lazy(() => import('@/pages/platform-regtech/page').then(m => ({ default: m.default })));

// Mémo Évaluation KOS
const MemoEvaluationKOSPage = lazy(() => import('@/pages/memo-evaluation-kos/page').then(m => ({ default: m.default })));

// KOS Quality Auto-Correction Dashboard
const qualityAutoCorrectionPage = lazy(() => import('@/pages/kos-quality-auto-correction/page').then(m => ({ default: m.default })));

// KOS Visibility & Monetization Dashboard
const visibilityMonetizationPage = lazy(() => import('@/pages/kos-visibility-monetization/page').then(m => ({ default: m.default })));

// Contribution Communautaire — Traduction Langues Africaines
const ContributionCommunautairePage = lazy(() => import('@/pages/contribution-communautaire/page').then(m => ({ default: m.default })));

// Admin — Community Contributions Dashboard
const AdminCommunityContributionsPage = lazy(() => import('@/pages/admin-community-contributions/page').then(m => ({ default: m.default })));

// KOS RegTech AI — Pipeline Orchestrator Big Four
const regTechAIPage = lazy(() => import('@/pages/kos-regtech-ai/page').then(m => ({ default: m.default })));
// KOS RegTech AI — Historique des pipelines
const regTechAIHistoryPage = lazy(() => import('@/pages/kos-regtech-ai/history/page').then(m => ({ default: m.default })));
// KOS RegTech AI — Analytics
const regTechAIAnalyticsPage = lazy(() => import('@/pages/kos-regtech-ai/analytics/page').then(m => ({ default: m.default })));
// KOS RegTech AI — Video Pipeline
const regTechAIVideoPipelinePage = lazy(() => import('@/pages/kos-regtech-ai/video-pipeline/page').then(m => ({ default: m.default })));
// KOS RegTech AI — Video Preview (Remotion Player + Lecteur)
const regTechAIVideoPreviewPage = lazy(() => import('@/pages/kos-regtech-ai/video-preview/page').then(m => ({ default: m.default })));

export const landingRoutes: RouteObject[] = [
  // Industries
  { path: '/industries', element: <IndustriesPage /> },
  { path: '/industries/microfinance', element: <MicrofinancePage /> },
  { path: '/industries/pme', element: <PMEPage /> },
  { path: '/industries/public-sector', element: <PublicSectorPage /> },
  { path: '/industries/fintech', element: <FintechPage /> },
  { path: '/industries/cemac-beac', element: <CEMACBEACPage /> },
  // Regions
  { path: '/regions/africa', element: <AfricaPage /> },
  { path: '/regions/west-africa', element: <WestAfricaPage /> },
  { path: '/regions/afrique', element: <AfriqueExpertisePage /> },
  { path: '/regions/uemoa-cemac', element: <UEMOACEMACPage /> },
  { path: '/regions/afrique-francophone', element: <AfriqueFrancophonePage /> },
  { path: '/regions/senegal', element: <SenegalPage /> },
  { path: '/regions/cote-divoire', element: <CoteDIvoirePage /> },
  { path: '/regions/cameroun', element: <CamerounPage /> },
  { path: '/regions/gabon', element: <GabonPage /> },
  // Pillar
  { path: '/pillar/conseil-strategique-pme-afrique', element: <ConseilStrategiquePmeAfriquePage /> },
  { path: '/pillar/transformation-digitale-ohada', element: <TransformationDigitaleOhadaPage /> },
  { path: '/pillar/levee-de-fonds-afrique', element: <LeveeDeFondsAfriquePage /> },
  { path: '/pillar/digital-transformation-africa', element: <DigitalTransformationAfricaPage /> },
  { path: '/pillar/financial-inclusion-africa', element: <FinancialInclusionAfricaPage /> },
  { path: '/pillar/fintech-advisory-africa', element: <FintechAdvisoryAfricaPage /> },
  { path: '/pillar/microfinance-transformation-africa', element: <MicrofinanceTransformationAfricaPage /> },
  { path: '/pillar/sme-development-africa', element: <SMEDevelopmentAfricaPage /> },
  // 8 SEO Piliers Stratégiques — Priorité 3
  { path: '/pillar/audit-risk-afrique', element: <AuditRiskAfriquePage /> },
  { path: '/pillar/finance-performance-afrique', element: <FinancePerformanceAfriquePage /> },
  { path: '/pillar/gouvernance-entreprise-afrique', element: <GouvernanceEntrepriseAfriquePage /> },
  { path: '/pillar/esg-durabilite-afrique', element: <ESGDurabiliteAfriquePage /> },
  { path: '/pillar/conformite-reglementaire-afrique', element: <ConformiteReglementaireAfriquePage /> },
  { path: '/pillar/transformation-digitale-afrique', element: <TransformationDigitaleAfriquePage /> },
  { path: '/pillar/cybersecurite-afrique', element: <CybersecuriteAfriquePage /> },
  { path: '/pillar/pme-afrique-croissance', element: <PMEAfriqueCroissancePage /> },
  // Geo-Hub
  { path: '/geo-hub', element: <GeoHubPage /> },
  { path: '/geo-hub/reussir-due-diligence-afrique', element: <GeoReussirDueDiligencePage /> },
  { path: '/geo-hub/mise-en-conformite-bceao', element: <GeoMiseEnConformiteBceaoPage /> },
  { path: '/geo-hub/preparer-levee-fonds-afrique', element: <GeoPreparerLeveeFondsAfriquePage /> },
  { path: '/geo-hub/agrement-sfd-bceao-cobac', element: <GeoAgrementSFDBCEAOCOBACPage /> },
  { path: '/geo-hub/cartographie-risques-entreprise', element: <GeoCartographieRisquesEntreprisePage /> },
  { path: '/geo-hub/preparer-mission-bceao', element: <GeoPreparerMissionBCEAOPage /> },
  { path: '/geo-hub/mise-en-oeuvre-esg-afrique', element: <GeoMiseEnOeuvreESGAfriquePage /> },
  { path: '/geo-hub/renforcer-gouvernance-entreprise', element: <GeoRenforcerGouvernanceEntreprisePage /> },
  // Case Studies
  { path: '/case-studies', element: <CaseStudiesPage /> },
  { path: '/case-studies/regtech-conformite-uemoa-cemac', element: <RegTechCaseStudyPage /> },
  { path: '/case-studies/gouvernance-board-advisory-uemoa', element: <GovernanceBoardCaseStudyPage /> },
  { path: '/case-studies/agrement-multinational-sfd-uemoa-cemac', element: <AgrementMultinationalCaseStudyPage /> },
  { path: '/case-studies/ingenierie-financiere-projet-industriel-cedao', element: <IngenierieFinanciereIndustrielCaseStudyPage /> },
  { path: '/case-studies/prix-transfert-microfinance-groupe-panafricain', element: <PrixTransfertCaseStudyPage /> },
  { path: '/case-studies/pre-inspection-bceao-banque-uemoa', element: <PreInspectionBCEAOCaseStudyPage /> },
  // Knowledge Hub
  { path: '/knowledge-hub/due-diligence', element: <DueDiligenceHubPage /> },
  { path: '/knowledge-hub/esg', element: <ESGHubPage /> },
  { path: '/knowledge-hub/bceao', element: <BCEAOHubPage /> },
  { path: '/knowledge-hub/cobac', element: <COBACHubPage /> },
  // Guides
  { path: '/guide-due-diligence-afrique', element: <GuideDueDiligencePage /> },
  { path: '/guide-esg-afrique', element: <GuideESGPage /> },
  { path: '/guide-investment-readiness', element: <GuideInvestmentReadinessPage /> },
  { path: '/guide-gouvernance-imf', element: <GuideGouvernanceIMFPage /> },
  { path: '/guide-bceao-2026', element: <GuideBCEAO2026Page /> },
  // Lead Magnets
  { path: '/lead-magnets', element: <LeadMagnetsPage /> },
  { path: '/lead-magnets/checklist-conformite-bceao-cobac', element: <ChecklistConformitePage /> },
  { path: '/lead-magnets/guide-levee-fonds-afrique', element: <GuideLeveeFondsPage /> },
  { path: '/lead-magnets/simulation-risque-reglementaire', element: <SimulationRisquePage /> },
  { path: '/lead-magnets/template-audit-gouvernance', element: <TemplateAuditGouvernancePage /> },
  { path: '/lead-magnets/mini-rapport-due-diligence', element: <MiniRapportDDPage /> },
  { path: '/lead-magnets/diagnostic-esg-maturite', element: <DiagnosticESGLeadPage /> },
  { path: '/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026', element: <DiagnosticFlashConformiteBCEAOCOBAC2026Page /> },
  { path: '/lead-magnets/guide-prix-transfert-beps-afrique', element: <GuidePrixTransfertBEPSPage /> },
  { path: '/lead-magnets/simulateur-agrement-microfinance-cemac', element: <SimulateurAgrementMicrofinanceCEMACPage /> },
  { path: '/lead-magnets/barometre-regtech-uemoa-2026', element: <BarometreRegTechUEMOA2026Page /> },
  { path: '/lead-magnets/compliance-ohada-kos-ai', element: <ComplianceOHADAKOSAIPage /> },
  { path: '/lead-magnets/cartographie-risques-bancaires-afrique', element: <CartographieRisquesBancairesAfriquePage /> },
  { path: '/lead-magnets/diagnostic-scoring-kbr', element: <DiagnosticScoringKBRPage /> },
  // Compliance Score
  { path: '/compliance-score', element: <Suspense fallback={<ComplianceScoreResultSkeleton />}><ComplianceScorePage /></Suspense> },
  // Observatoire Réglementaire Africain
  { path: '/observatoire-reglementaire-africain', element: <ObservatoireReglementaireAfricainPage /> },
  // Hub Agréments Afrique
  { path: '/agrements-afrique', element: <AgrementsAfriquePage /> },
  // Digital Compliance Factory
  { path: '/digital-compliance-factory', element: <DigitalComplianceFactoryPage /> },
  // Observatoires Sectoriels
  { path: '/observatoires-sectoriels', element: <ObservatoiresSectorielsPage /> },
  { path: '/observatoires-sectoriels/banques', element: <ObservatoireBanquesPage /> },
  { path: '/observatoires-sectoriels/fintechs', element: <ObservatoireFintechsPage /> },
  { path: '/observatoires-sectoriels/energie', element: <ObservatoireEnergiePage /> },
  { path: '/observatoires-sectoriels/agriculture', element: <ObservatoireAgriculturePage /> },
  { path: '/observatoires-sectoriels/pme', element: <ObservatoirePMEPage /> },
  { path: '/observatoires-sectoriels/esg', element: <ObservatoireESGPage /> },
  { path: '/observatoires-sectoriels/microfinance', element: <ObservatoireMicrofinancePage /> },
  { path: '/observatoires-sectoriels/comparatif', element: <ComparatifSectorielPage /> },
  // Partenariats Académiques & Backlinks
  { path: '/partenariats-academiques', element: <PartenariatsAcademiquesPage /> },
  // Tableau de Suivi Trimestriel
  { path: '/tableau-de-suivi-trimestriel', element: <TableauSuiviTrimestrielPage /> },
  // BU Landing
  { path: '/regulation-financiere', element: <RegulationFinancierePage /> },
  { path: '/prix-de-transfert', element: <PrixTransfertPage /> },
  { path: '/gouvernance-risques', element: <GouvernanceRisquesPage /> },
  // Other Landing
  { path: '/audit-financier-afrique', element: <AuditFinancierAfriquePage /> },
  { path: '/due-diligence-pme-afrique', element: <DueDiligencePMEAfriquePage /> },
  { path: '/gouvernance-ohada', element: <GouvernanceOHADAPage /> },
  { path: '/guide-seo-ia-afrique', element: <GuideSeoIaAfriquePage /> },
  { path: '/inspection-cobac', element: <InspectionCOBACPage /> },
  { path: '/conformite-cemac', element: <ConformiteCEMACLandingPage /> },
  { path: '/agrement-beac', element: <AgrementBEACPage /> },
  { path: '/conformite-gabac', element: <ConformiteGABACLandingPage /> },
  // Plateforme RegTech AI
  { path: '/plateforme-regtech', element: <PlatformRegtechPage /> },
  // Mémo Évaluation KOS
  { path: '/memo-evaluation-kos', element: <MemoEvaluationKOSPage /> },
  // KOS Quality Auto-Correction Dashboard
  { path: '/kos-quality-auto-correction', element: <qualityAutoCorrectionPage /> },
  // KOS Visibility & Monetization Dashboard
  { path: '/kos-visibility-monetization', element: <visibilityMonetizationPage /> },
  { path: '/kos-visibility-monetization/', element: <visibilityMonetizationPage /> },
  // Contribution Communautaire — Traduction Langues Africaines
  { path: '/contribution-communautaire', element: <ContributionCommunautairePage /> },
  { path: '/contribution-communautaire/', element: <ContributionCommunautairePage /> },
  // Admin — Community Contributions Dashboard
  { path: '/admin-community-contributions', element: <AdminCommunityContributionsPage /> },
  { path: '/admin-community-contributions/', element: <AdminCommunityContributionsPage /> },
  // KOS RegTech AI — Pipeline Orchestrator Big Four
  { path: '/kos-regtech-ai', element: <regTechAIPage /> },
  { path: '/kos-regtech-ai/', element: <regTechAIPage /> },
  // KOS RegTech AI — Historique des pipelines
  { path: '/kos-regtech-ai/history', element: <regTechAIHistoryPage /> },
  { path: '/kos-regtech-ai/history/', element: <regTechAIHistoryPage /> },
  // KOS RegTech AI — Analytics
  { path: '/kos-regtech-ai/analytics', element: <regTechAIAnalyticsPage /> },
  { path: '/kos-regtech-ai/analytics/', element: <regTechAIAnalyticsPage /> },
  // KOS RegTech AI — Video Pipeline
  { path: '/kos-regtech-ai/video-pipeline', element: <regTechAIVideoPipelinePage /> },
  { path: '/kos-regtech-ai/video-pipeline/', element: <regTechAIVideoPipelinePage /> },
  // KOS RegTech AI — Video Preview (Remotion Player + Lecteur)
  { path: '/kos-regtech-ai/video-preview', element: <regTechAIVideoPreviewPage /> },
  { path: '/kos-regtech-ai/video-preview/', element: <regTechAIVideoPreviewPage /> },
  // Legacy redirects → handled by _redirects 301 to /pillar/...
  
  // Regional Language Landing Pages (12 ISO2 country codes)
  { path: '/sn', element: <RegionalLangPage /> },
  { path: '/tz', element: <RegionalLangPage /> },
  { path: '/ng', element: <RegionalLangPage /> },
  { path: '/et', element: <RegionalLangPage /> },
  { path: '/za', element: <RegionalLangPage /> },
  { path: '/cd', element: <RegionalLangPage /> },
  { path: '/cm', element: <RegionalLangPage /> },
  { path: '/bf', element: <RegionalLangPage /> },
  { path: '/mz', element: <RegionalLangPage /> },
  { path: '/ke', element: <RegionalLangPage /> },
  { path: '/ne', element: <RegionalLangPage /> },
  { path: '/ci', element: <RegionalLangPage /> },
];




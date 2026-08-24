import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ToolsPage = lazy(() => import('@/pages/tools/page').then(m => ({ default: m.default })));
const DiagnosticOrganisationnelPage = lazy(() => import('@/pages/tools/diagnostic-organisationnel/page').then(m => ({ default: m.default })));
const MaturiteDigitalePage = lazy(() => import('@/pages/tools/maturite-digitale/page').then(m => ({ default: m.default })));
const EvaluationGouvernancePage = lazy(() => import('@/pages/tools/evaluation-gouvernance/page').then(m => ({ default: m.default })));
const DiagnosticTransformationDigitale = lazy(() => import('@/pages/tools/diagnostic-transformation-digitale/page').then(m => ({ default: m.default })));
const EvaluationMaturiteFintech = lazy(() => import('@/pages/tools/evaluation-maturite-fintech/page').then(m => ({ default: m.default })));
const AuditInclusionFinanciere = lazy(() => import('@/pages/tools/audit-inclusion-financiere/page').then(m => ({ default: m.default })));
const CybersecurityAssessmentPage = lazy(() => import('@/pages/tools/evaluation-cybersecurite/page').then(m => ({ default: m.default })));
const EvaluationConformiteReglementairePage = lazy(() => import('@/pages/tools/evaluation-conformite-reglementaire/page').then(m => ({ default: m.default })));
const DiagnosticStrategiquePage = lazy(() => import('@/pages/tools/diagnostic-strategique/page').then(m => ({ default: m.default })));
const SimulateurFinancierPage = lazy(() => import('@/pages/tools/simulateur-financier/page').then(m => ({ default: m.default })));
const StressTestFinancierPage = lazy(() => import('@/pages/tools/stress-test-financier/page').then(m => ({ default: m.default })));
const InvestmentReadinessPage = lazy(() => import('@/pages/tools/investment-readiness/page').then(m => ({ default: m.default })));
const DiagnosticRisquesPage = lazy(() => import('@/pages/tools/diagnostic-risques/page').then(m => ({ default: m.default })));
const PerformanceCommercialePage = lazy(() => import('@/pages/tools/performance-commerciale/page').then(m => ({ default: m.default })));
const BenchmarkSectorielPage = lazy(() => import('@/pages/tools/benchmark-sectoriel/page').then(m => ({ default: m.default })));
const SimulateurROIMarketingPage = lazy(() => import('@/pages/tools/simulateur-roi-marketing/page').then(m => ({ default: m.default })));
const GenerateurRoadmapInnovationPage = lazy(() => import('@/pages/tools/generateur-roadmap-innovation/page').then(m => ({ default: m.default })));
const TableauKPIQualitePage = lazy(() => import('@/pages/tools/tableau-kpi-qualite/page').then(m => ({ default: m.default })));
const DiagnosticRHStrategiquePage = lazy(() => import('@/pages/tools/diagnostic-rh-strategique/page').then(m => ({ default: m.default })));
const DiagnosticESGImpactPage = lazy(() => import('@/pages/tools/diagnostic-esg-impact/page').then(m => ({ default: m.default })));
const DiagnosticPrixTransfertPage = lazy(() => import('@/pages/tools/diagnostic-prix-transfert/page').then(m => ({ default: m.default })));
const DiagnosticPreInspectionBCEAOCOBACPage = lazy(() => import('@/pages/tools/diagnostic-pre-inspection-bceao-cobac/page').then(m => ({ default: m.default })));
const DiagnosticPerenniteFamilialePage = lazy(() => import('@/pages/tools/diagnostic-perennite-familiale/page').then(m => ({ default: m.default })));
const DiagnosticMaturitePilotageStrategiquePage = lazy(() => import('@/pages/tools/diagnostic-maturite-pilotage-strategique/page').then(m => ({ default: m.default })));
const DiagnosticBancabilitePage = lazy(() => import('@/pages/tools/diagnostic-bancabilite/page').then(m => ({ default: m.default })));
const DiagnosticContinuiteActivitePage = lazy(() => import('@/pages/tools/diagnostic-continuite-activite/page').then(m => ({ default: m.default })));
const AuditFlashCobacPage = lazy(() => import('@/pages/tools/audit-flash-cobac/page').then(m => ({ default: m.default })));

// ── Diagnostic RegTech ──
const DiagnosticRegtechPage = lazy(() => import('@/pages/diagnostic-regtech/page').then(m => ({ default: m.default })));

// ── Ultra Lead Magnets Big Four Killer ──
const SimulateurSolvabiliteUEMOAPage = lazy(() => import('@/pages/tools/simulateur-solvabilite-uemoa/page').then(m => ({ default: m.default })));
const ScorecardAgrementReadinessPage = lazy(() => import('@/pages/tools/scorecard-agrement-readiness/page').then(m => ({ default: m.default })));
const CitationCheckerPage = lazy(() => import('@/pages/tools/regulatory-citation-checker/page').then(m => ({ default: m.default })));
const AOBattleCardPage = lazy(() => import('@/pages/tools/ao-battle-card-generator/page').then(m => ({ default: m.default })));
const KnowledgeGapAuditPage = lazy(() => import('@/pages/tools/knowledge-gap-audit/page').then(m => ({ default: m.default })));

// ── Simulateur Solvabilité UEMOA 2026 — Pages associées ──
const SimulateurSolvabiliteResultatPage = lazy(() => import('@/pages/tools/simulateur-solvabilite-resultat/page').then(m => ({ default: m.default })));
const MerciSolvabilitePage = lazy(() => import('@/pages/tools/merci-solvabilite/page').then(m => ({ default: m.default })));
const ApiKosSearchPage = lazy(() => import('@/pages/tools/api-kos-search/page').then(m => ({ default: m.default })));
const SocialKitSolvabilitePage = lazy(() => import('@/pages/tools/social-kit-solvabilite/page').then(m => ({ default: m.default })));

export const toolsRoutes: RouteObject[] = [
  { path: '/tools', element: <ToolsPage /> },
  { path: '/tools/diagnostic-organisationnel', element: <DiagnosticOrganisationnelPage /> },
  { path: '/tools/maturite-digitale', element: <MaturiteDigitalePage /> },
  { path: '/tools/evaluation-gouvernance', element: <EvaluationGouvernancePage /> },
  { path: '/tools/diagnostic-transformation-digitale', element: <DiagnosticTransformationDigitale /> },
  { path: '/tools/evaluation-maturite-fintech', element: <EvaluationMaturiteFintech /> },
  { path: '/tools/audit-inclusion-financiere', element: <AuditInclusionFinanciere /> },
  { path: '/tools/evaluation-cybersecurite', element: <CybersecurityAssessmentPage /> },
  { path: '/tools/evaluation-conformite-reglementaire', element: <EvaluationConformiteReglementairePage /> },
  { path: '/tools/diagnostic-strategique', element: <DiagnosticStrategiquePage /> },
  { path: '/tools/simulateur-financier', element: <SimulateurFinancierPage /> },
  { path: '/tools/stress-test-financier', element: <StressTestFinancierPage /> },
  { path: '/tools/investment-readiness', element: <InvestmentReadinessPage /> },
  { path: '/tools/diagnostic-risques', element: <DiagnosticRisquesPage /> },
  { path: '/tools/performance-commerciale', element: <PerformanceCommercialePage /> },
  { path: '/tools/benchmark-sectoriel', element: <BenchmarkSectorielPage /> },
  { path: '/tools/simulateur-roi-marketing', element: <SimulateurROIMarketingPage /> },
  { path: '/tools/generateur-roadmap-innovation', element: <GenerateurRoadmapInnovationPage /> },
  { path: '/tools/tableau-kpi-qualite', element: <TableauKPIQualitePage /> },
  { path: '/tools/diagnostic-rh-strategique', element: <DiagnosticRHStrategiquePage /> },
  { path: '/tools/diagnostic-esg-impact', element: <DiagnosticESGImpactPage /> },
  { path: '/tools/diagnostic-prix-transfert', element: <DiagnosticPrixTransfertPage /> },
  { path: '/tools/diagnostic-pre-inspection-bceao-cobac', element: <DiagnosticPreInspectionBCEAOCOBACPage /> },
  { path: '/tools/diagnostic-perennite-familiale', element: <DiagnosticPerenniteFamilialePage /> },
  { path: '/tools/diagnostic-maturite-pilotage-strategique', element: <DiagnosticMaturitePilotageStrategiquePage /> },
  { path: '/tools/diagnostic-bancabilite', element: <DiagnosticBancabilitePage /> },
  { path: '/tools/diagnostic-continuite-activite', element: <DiagnosticContinuiteActivitePage /> },
  { path: '/tools/audit-flash-cobac', element: <AuditFlashCobacPage /> },
  // Diagnostic RegTech
  { path: '/diagnostic-regtech', element: <DiagnosticRegtechPage /> },
  // Ultra Lead Magnets Big Four Killer
  { path: '/tools/simulateur-solvabilite-uemoa', element: <SimulateurSolvabiliteUEMOAPage /> },
  { path: '/tools/scorecard-agrement-readiness', element: <ScorecardAgrementReadinessPage /> },
  { path: '/tools/regulatory-citation-checker', element: <CitationCheckerPage /> },
  { path: '/tools/ao-battle-card-generator', element: <AOBattleCardPage /> },
  { path: '/tools/knowledge-gap-audit', element: <KnowledgeGapAuditPage /> },
  // Simulateur Solvabilité UEMOA 2026 — Pages associées
  { path: '/tools/simulateur-solvabilite-resultat', element: <SimulateurSolvabiliteResultatPage /> },
  { path: '/tools/merci-solvabilite', element: <MerciSolvabilitePage /> },
  { path: '/tools/api-kos-search', element: <ApiKosSearchPage /> },
  { path: '/tools/social-kit-solvabilite', element: <SocialKitSolvabilitePage /> },
];




import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ServicesPage = lazy(() => import('@/pages/services/page').then(m => ({ default: m.default })));
const ServiceDetailPage = lazy(() => import('@/pages/services/detail/page').then(m => ({ default: m.default })));
const ConseilStrategiquePage = lazy(() => import('@/pages/services/conseil-strategique/page').then(m => ({ default: m.default })));
const GestionDeProjetsPage = lazy(() => import('@/pages/services/gestion-de-projets/page').then(m => ({ default: m.default })));
const DeveloppementOrganisationnelPage = lazy(() => import('@/pages/services/developpement-organisationnel/page').then(m => ({ default: m.default })));
const RenforcementCapacitesPage = lazy(() => import('@/pages/services/renforcement-capacites/page').then(m => ({ default: m.default })));
const DiagnosticOrganisationnelServicePage = lazy(() => import('@/pages/services/diagnostic-organisationnel/page').then(m => ({ default: m.default })));
const AuditSocialPage = lazy(() => import('@/pages/services/audit-social/page').then(m => ({ default: m.default })));
const RessourcesHumainesPage = lazy(() => import('@/pages/services/ressources-humaines/page').then(m => ({ default: m.default })));
const TransformationDigitalePage = lazy(() => import('@/pages/services/transformation-digitale/page').then(m => ({ default: m.default })));
const CommunicationStrategiquePage = lazy(() => import('@/pages/services/communication-strategique/page').then(m => ({ default: m.default })));
const LeveeDeFondsPage = lazy(() => import('@/pages/services/levee-de-fonds/page').then(m => ({ default: m.default })));
const DueDiligenceAcquisitionPage = lazy(() => import('@/pages/services/due-diligence-acquisition/page').then(m => ({ default: m.default })));
const RegTechRegulatoryEngineeringPage = lazy(() => import('@/pages/services/regtech-regulatory-engineering/page').then(m => ({ default: m.default })));
const GouvernanceFiscaliteInternationalePage = lazy(() => import('@/pages/services/gouvernance-fiscalite-internationale/page').then(m => ({ default: m.default })));
const AuditPreInspectionBCEAOPage = lazy(() => import('@/pages/services/audit-pre-inspection-bceao/page').then(m => ({ default: m.default })));
const AgrementFintechPage = lazy(() => import('@/pages/services/agrement-fintech-etablissement-paiement/page').then(m => ({ default: m.default })));
const CEOAdvisoryBoardPage = lazy(() => import('@/pages/services/ceo-advisory-board/page').then(m => ({ default: m.default })));
const FamilyOfficeAfriquePage = lazy(() => import('@/pages/services/family-office-afrique/page').then(m => ({ default: m.default })));
const RegulatoryIntelligencePage = lazy(() => import('@/pages/services/regulatory-intelligence/page').then(m => ({ default: m.default })));
const ControleInterneBancairePage = lazy(() => import('@/pages/services/controle-interne-bancaire/page').then(m => ({ default: m.default })));
const DefenseFiscalePrixTransfertPage = lazy(() => import('@/pages/services/defense-fiscale-prix-transfert/page').then(m => ({ default: m.default })));
const SFDConformitePage = lazy(() => import('@/pages/sfd-conformite/page').then(m => ({ default: m.default })));
const BoardReportPage = lazy(() => import('@/pages/board-report/page').then(m => ({ default: m.default })));
const DiagnosticFlashPage = lazy(() => import('@/pages/diagnostic-flash/page').then(m => ({ default: m.default })));
const OffreCommercialePage = lazy(() => import('@/pages/offre-commerciale/page').then(m => ({ default: m.default })));
// Désactivé temporairement — non public
// const FormationsPage = lazy(() => import('@/pages/formations/page').then(m => ({ default: m.default })));
// const FormationDetailPage = lazy(() => import('@/pages/formations/detail/page').then(m => ({ default: m.default })));
const DecideursPage = lazy(() => import('@/pages/decideurs/page').then(m => ({ default: m.default })));
const InvestisseursPage = lazy(() => import('@/pages/investisseurs/page').then(m => ({ default: m.default })));
const ProjetsIndustrielsPage = lazy(() => import('@/pages/projets-industriels/page').then(m => ({ default: m.default })));

export const servicesRoutes: RouteObject[] = [
  { path: '/services', element: <ServicesPage /> },
  { path: '/services/conseil-strategique', element: <ConseilStrategiquePage /> },
  { path: '/services/gestion-de-projets', element: <GestionDeProjetsPage /> },
  { path: '/services/developpement-organisationnel', element: <DeveloppementOrganisationnelPage /> },
  { path: '/services/renforcement-capacites', element: <RenforcementCapacitesPage /> },
  { path: '/services/diagnostic-organisationnel', element: <DiagnosticOrganisationnelServicePage /> },
  { path: '/services/audit-social', element: <AuditSocialPage /> },
  { path: '/services/ressources-humaines', element: <RessourcesHumainesPage /> },
  { path: '/services/transformation-digitale', element: <TransformationDigitalePage /> },
  { path: '/services/communication-strategique', element: <CommunicationStrategiquePage /> },
  { path: '/services/levee-de-fonds', element: <LeveeDeFondsPage /> },
  { path: '/services/due-diligence-acquisition', element: <DueDiligenceAcquisitionPage /> },
  { path: '/services/regtech-regulatory-engineering', element: <RegTechRegulatoryEngineeringPage /> },
  { path: '/services/gouvernance-fiscalite-internationale', element: <GouvernanceFiscaliteInternationalePage /> },
  { path: '/services/audit-pre-inspection-bceao', element: <AuditPreInspectionBCEAOPage /> },
  { path: '/services/agrement-fintech-etablissement-paiement', element: <AgrementFintechPage /> },
  { path: '/services/ceo-advisory-board', element: <CEOAdvisoryBoardPage /> },
  { path: '/services/family-office-afrique', element: <FamilyOfficeAfriquePage /> },
  { path: '/services/regulatory-intelligence', element: <RegulatoryIntelligencePage /> },
  { path: '/services/controle-interne-bancaire', element: <ControleInterneBancairePage /> },
  { path: '/services/defense-fiscale-prix-transfert', element: <DefenseFiscalePrixTransfertPage /> },
  { path: '/sfd-conformite', element: <SFDConformitePage /> },
  { path: '/board-report', element: <BoardReportPage /> },
  { path: '/diagnostic-flash', element: <DiagnosticFlashPage /> },
  { path: '/offre-commerciale', element: <OffreCommercialePage /> },
  // Désactivé temporairement — non public
  // { path: '/formations', element: <FormationsPage /> },
  // { path: '/formations/:slug', element: <FormationDetailPage /> },
  { path: '/decideurs', element: <DecideursPage /> },
  { path: '/investisseurs', element: <InvestisseursPage /> },
  { path: '/projets-industriels', element: <ProjetsIndustrielsPage /> },
];
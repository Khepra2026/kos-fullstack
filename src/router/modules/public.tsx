import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import KOSAuthGuard from '@/components/feature/KOSAuthGuard';

const HomePage = lazy(() => import('@/pages/home/page').then(m => ({ default: m.default })));
const AboutPage = lazy(() => import('@/pages/about/page').then(m => ({ default: m.default })));
const ContactPage = lazy(() => import('@/pages/contact/page').then(m => ({ default: m.default })));
const CharteDeontologiquePage = lazy(() => import('@/pages/charte-deontologique/page').then(m => ({ default: m.default })));
const PrivacyPage = lazy(() => import('@/pages/privacy/page').then(m => ({ default: m.default })));
const LegalPage = lazy(() => import('@/pages/legal/page').then(m => ({ default: m.default })));
const CGUPage = lazy(() => import('@/pages/cgu/page').then(m => ({ default: m.default })));
const TermsPage = lazy(() => import('@/pages/terms/page').then(m => ({ default: m.default })));
const CookiesPage = lazy(() => import('@/pages/cookies/page').then(m => ({ default: m.default })));
const SecuriteConformitePage = lazy(() => import('@/pages/securite-conformite/page').then(m => ({ default: m.default })));
const SitemapPage = lazy(() => import('@/pages/sitemap/page').then(m => ({ default: m.default })));
const StrategicReportPage = lazy(() => import('@/pages/strategic-report/page').then(m => ({ default: m.default })));
const ThankYouPage = lazy(() => import('@/pages/thank-you/page').then(m => ({ default: m.default })));
const SolutionsPage = lazy(() => import('@/pages/solutions/page').then(m => ({ default: m.default })));
const ExpertisesPage = lazy(() => import('@/pages/expertises/page').then(m => ({ default: m.default })));
const PublicationsPage = lazy(() => import('@/pages/publications/page').then(m => ({ default: m.default })));
const EquipePage = lazy(() => import('@/pages/equipe/page').then(m => ({ default: m.default })));
const ApprochePage = lazy(() => import('@/pages/approche/page').then(m => ({ default: m.default })));
const PartenairesPage = lazy(() => import('@/pages/partenaires/page').then(m => ({ default: m.default })));
const ExpertsPage = lazy(() => import('@/pages/experts/page').then(m => ({ default: m.default })));
const AgentsExpertsPage = lazy(() => import('@/pages/agents-experts/page').then(m => ({ default: m.default })));
const CareersPage = lazy(() => import('@/pages/careers/page').then(m => ({ default: m.default })));
const PourquoiKhepraPage = lazy(() => import('@/pages/pourquoi-khepra/page').then(m => ({ default: m.default })));
const InsightsPage = lazy(() => import('@/pages/insights/page').then(m => ({ default: m.default })));
const ResourcesPage = lazy(() => import('@/pages/resources/page').then(m => ({ default: m.default })));
const KhepraBusinessReviewPage = lazy(() => import('@/pages/khepra-business-review/page').then(m => ({ default: m.default })));
const WhitepapersPage = lazy(() => import('@/pages/whitepapers/page').then(m => ({ default: m.default })));
const WebinarsPage = lazy(() => import('@/pages/webinars/page').then(m => ({ default: m.default })));
const RegistreTraitementsPage = lazy(() => import('@/pages/registre-traitements/page').then(m => ({ default: m.default })));
const MethodologiesPage = lazy(() => import('@/pages/methodologies/page').then(m => ({ default: m.default })));
const TrustCenterPage = lazy(() => import('@/pages/trust-center/page').then(m => ({ default: m.default })));
const KnowledgeInstitutePage = lazy(() => import('@/pages/knowledge-institute/page').then(m => ({ default: m.default })));
const ObservatoireCOBACPage = lazy(() => import('@/pages/observatoire-cobac/page').then(m => ({ default: m.default })));
const ObservatoireSFDPage = lazy(() => import('@/pages/observatoire-sfd/page').then(m => ({ default: m.default })));
const IndiceConformiteUEMOAPage = lazy(() => import('@/pages/indice-conformite-uemoa/page').then(m => ({ default: m.default })));
const IndiceConformitePage = lazy(() => import('@/pages/indice-conformite/page').then(m => ({ default: m.default })));
const AdvisoryBoardPage = lazy(() => import('@/pages/advisory-board/page').then(m => ({ default: m.default })));
const AuditFinalKOSPage = lazy(() => import('@/pages/audit-final-kos/page').then(m => ({ default: m.default })));
const RevueConformiteQualitePage = lazy(() => import('@/pages/revue-conformite-qualite/page').then(m => ({ default: m.default })));
const DeploiementFinalKOSPage = lazy(() => import('@/pages/deploiement-final-kos/page').then(m => ({ default: m.default })));
const BarometreBCEAO2026Page = lazy(() => import('@/pages/barometre-bceao-2026/page').then(m => ({ default: m.default })));
const BarometreCEMAC2026Page = lazy(() => import('@/pages/barometre-cemac-2026/page').then(m => ({ default: m.default })));
const CampagneBacklinksPage = lazy(() => import('@/pages/campagne-backlinks/page').then(m => ({ default: m.default })));
const RAGSynthesePage = lazy(() => import('@/pages/rag-synthese/page').then(m => ({ default: m.default })));
const SubscriptionPage = lazy(() => import('@/pages/subscription/page').then(m => ({ default: m.default })));
const EditorialHubPage = lazy(() => import('@/pages/editorial-hub/page').then(m => ({ default: m.default })));
const StudioMediaPage = lazy(() => import('@/pages/studio-media/page').then(m => ({ default: m.default })));
const MediasPage = lazy(() => import('@/pages/medias/page').then(m => ({ default: m.default })));
const AvisClientsPage = lazy(() => import('@/pages/avis-clients/page').then(m => ({ default: m.default })));
const PricingPage = lazy(() => import('@/pages/pricing/page').then(m => ({ default: m.default })));
const ScanOhadaPage = lazy(() => import('@/pages/scan-ohada/page').then(m => ({ default: m.default })));
const NewsroomPage = lazy(() => import('@/pages/newsroom/page').then(m => ({ default: m.default })));
const QuestionsPage = lazy(() => import('@/pages/questions/page').then(m => ({ default: m.default })));
const Visibilite100Page = lazy(() => import('@/pages/visibilite-100/page').then(m => ({ default: m.default })));
const LinkedInConnectPage = lazy(() => import('@/pages/linkedin-connect/page').then(m => ({ default: m.default })));
const LinkedInCallbackPage = lazy(() => import('@/pages/linkedin-callback/page').then(m => ({ default: m.default })));
const PublicationDetailPage = lazy(() => import('@/pages/publication/page').then(m => ({ default: m.default })));
const CalendrierEditorialPage = lazy(() => import('@/pages/calendrier-editorial/page').then(m => ({ default: m.default })));

// Knowledge Base — Pages dynamiques générées par KOS AI (EEAT / SEO / GEO)
const KnowledgeBasePage = lazy(() => import('@/pages/knowledge/page').then(m => ({ default: m.default })));

// KOS 4 Business Units Landing Pages
const BU1RegulatoryIntelligencePage = lazy(() => import('@/pages/bu1-regulatory-intelligence/page').then(m => ({ default: m.default })));
const BU2RegulatoryDueDiligencePage = lazy(() => import('@/pages/bu2-regulatory-due-diligence/page').then(m => ({ default: m.default })));
const BU3RegTechSaaSPage = lazy(() => import('@/pages/bu3-regtech-saas/page').then(m => ({ default: m.default })));
const BU4AfricanObservatoryPage = lazy(() => import('@/pages/bu4-african-observatory/page').then(m => ({ default: m.default })));
const ObservatoryDealroomPage = lazy(() => import('@/pages/observatory-dealroom/page').then(m => ({ default: m.default })));

// Hub des Réglementations Nationales
const HubReglementationsNationalesPage = lazy(() => import('@/pages/hub-reglementations-nationales/page').then(m => ({ default: m.default })));

// Due Diligence OHADA — 17 pays
const DueDiligenceOhadaPage = lazy(() => import('@/pages/due-diligence-ohada/page').then(m => ({ default: m.default })));
// KHEPRA DD™ Methodology page
const KhepraDDMethodologiePage = lazy(() => import('@/pages/khepra-dd-methodologie/page').then(m => ({ default: m.default })));

export const publicRoutes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/charte-deontologique', element: <CharteDeontologiquePage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/legal', element: <LegalPage /> },
  { path: '/cgu', element: <CGUPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '/cookies', element: <CookiesPage /> },
  { path: '/securite-conformite', element: <SecuriteConformitePage /> },
  { path: '/sitemap', element: <SitemapPage /> },
  { path: '/strategic-report', element: <StrategicReportPage /> },
  { path: '/thank-you', element: <ThankYouPage /> },
  { path: '/solutions', element: <SolutionsPage /> },
  { path: '/expertises', element: <ExpertisesPage /> },
  { path: '/publications', element: <PublicationsPage /> },
  { path: '/equipe', element: <EquipePage /> },
  { path: '/approche', element: <ApprochePage /> },
  { path: '/partenaires', element: <PartenairesPage /> },
  { path: '/experts', element: <ExpertsPage /> },
  { path: '/agents-experts', element: <KOSAuthGuard><AgentsExpertsPage /></KOSAuthGuard> },
  { path: '/careers', element: <CareersPage /> },
  { path: '/pourquoi-khepra', element: <PourquoiKhepraPage /> },
  { path: '/insights', element: <InsightsPage /> },
  { path: '/resources', element: <ResourcesPage /> },
  { path: '/khepra-business-review', element: <KhepraBusinessReviewPage /> },
  { path: '/khepra-business-review/', element: <KhepraBusinessReviewPage /> },
  { path: '/whitepapers', element: <WhitepapersPage /> },
  { path: '/webinars', element: <WebinarsPage /> },
  { path: '/registre-traitements', element: <RegistreTraitementsPage /> },
  { path: '/methodologies', element: <MethodologiesPage /> },
  { path: '/trust-center', element: <TrustCenterPage /> },
  { path: '/trust-center/', element: <TrustCenterPage /> },
  { path: '/knowledge-institute', element: <KnowledgeInstitutePage /> },
  { path: '/knowledge-institute/', element: <KnowledgeInstitutePage /> },
  { path: '/observatoire-cobac', element: <ObservatoireCOBACPage /> },
  { path: '/observatoire-sfd', element: <ObservatoireSFDPage /> },
  { path: '/indice-conformite-uemoa', element: <IndiceConformiteUEMOAPage /> },
  { path: '/indice-conformite', element: <IndiceConformitePage /> },
  { path: '/advisory-board', element: <KOSAuthGuard><AdvisoryBoardPage /></KOSAuthGuard> },
  { path: '/advisory-board/', element: <KOSAuthGuard><AdvisoryBoardPage /></KOSAuthGuard> },
  { path: '/audit-final-kos', element: <KOSAuthGuard><AuditFinalKOSPage /></KOSAuthGuard> },
  { path: '/revue-conformite-qualite', element: <KOSAuthGuard><RevueConformiteQualitePage /></KOSAuthGuard> },
  { path: '/deploiement-final-kos', element: <KOSAuthGuard><DeploiementFinalKOSPage /></KOSAuthGuard> },
  { path: '/barometre-bceao-2026', element: <BarometreBCEAO2026Page /> },
  { path: '/barometre-cemac-2026', element: <BarometreCEMAC2026Page /> },
  { path: '/campagne-backlinks', element: <CampagneBacklinksPage /> },
  { path: '/rag-synthese', element: <KOSAuthGuard><RAGSynthesePage /></KOSAuthGuard> },
  { path: '/mon-abonnement', element: <KOSAuthGuard><SubscriptionPage /></KOSAuthGuard> },
  { path: '/centre-editorial', element: <KOSAuthGuard><EditorialHubPage /></KOSAuthGuard> },
  { path: '/studio-media', element: <KOSAuthGuard><StudioMediaPage /></KOSAuthGuard> },
  { path: '/medias', element: <KOSAuthGuard><MediasPage /></KOSAuthGuard> },
  { path: '/medias/', element: <KOSAuthGuard><MediasPage /></KOSAuthGuard> },
  { path: '/avis-clients', element: <AvisClientsPage /> },
  { path: '/avis-clients/', element: <AvisClientsPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/pricing/', element: <PricingPage /> },
  { path: '/devis', element: <PricingPage /> },
  { path: '/devis/', element: <PricingPage /> },
  { path: '/scan', element: <ScanOhadaPage /> },
  { path: '/scan/', element: <ScanOhadaPage /> },
  { path: '/newsroom', element: <NewsroomPage /> },
  { path: '/newsroom/', element: <NewsroomPage /> },
  { path: '/questions/:slug', element: <QuestionsPage /> },
  { path: '/visibilite-100', element: <KOSAuthGuard><Visibilite100Page /></KOSAuthGuard> },
  { path: '/visibilite-100/', element: <KOSAuthGuard><Visibilite100Page /></KOSAuthGuard> },
  // LinkedIn Connect — OAuth 2.0 + Publication Automatique
  { path: '/linkedin-connect', element: <LinkedInConnectPage /> },
  { path: '/linkedin-callback', element: <LinkedInCallbackPage /> },
  { path: '/publication/:slug', element: <PublicationDetailPage /> },
  { path: '/calendrier-editorial', element: <CalendrierEditorialPage /> },
  // Knowledge Base — Pages EEAT générées par KOS AI
  { path: '/knowledge/:slug', element: <KnowledgeBasePage /> },
  // KOS 4 Business Units Landing Pages
  { path: '/bu1-regulatory-intelligence', element: <BU1RegulatoryIntelligencePage /> },
  { path: '/bu1-regulatory-intelligence/', element: <BU1RegulatoryIntelligencePage /> },
  { path: '/bu2-regulatory-due-diligence', element: <BU2RegulatoryDueDiligencePage /> },
  { path: '/bu2-regulatory-due-diligence/', element: <BU2RegulatoryDueDiligencePage /> },
  { path: '/bu3-regtech-saas', element: <BU3RegTechSaaSPage /> },
  { path: '/bu3-regtech-saas/', element: <BU3RegTechSaaSPage /> },
  { path: '/bu4-african-observatory', element: <BU4AfricanObservatoryPage /> },
  { path: '/bu4-african-observatory/', element: <BU4AfricanObservatoryPage /> },
  // ── Observatory Dealroom VC ──
  { path: '/observatory-dealroom', element: <ObservatoryDealroomPage /> },
  { path: '/observatory-dealroom/', element: <ObservatoryDealroomPage /> },
  // ── Hub des Réglementations Nationales ──
  { path: '/hub-reglementations-nationales', element: <HubReglementationsNationalesPage /> },
  { path: '/hub-reglementations-nationales/', element: <HubReglementationsNationalesPage /> },
  // ── Due Diligence OHADA 17 pays ──
  { path: '/due-diligence-:country', element: <DueDiligenceOhadaPage /> },
  // ── KHEPRA DD™ Methodology ──
  { path: '/khepra-dd-methodologie', element: <KhepraDDMethodologiePage /> },
  { path: '/khepra-dd-methodologie/', element: <KhepraDDMethodologiePage /> },
];
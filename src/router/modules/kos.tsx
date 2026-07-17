import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import KOSAuthGuard from '@/components/feature/KOSAuthGuard';

// KOS Regulatory Chat — Assistant IA Réglementaire BCEAO/COBAC/CIMA/GAFI/OHADA
const KOSRegulatoryChatPage = lazy(() => import('@/pages/kos-regulatory-chat/page').then(m => ({ default: m.default })));

// KOS RegTech Dashboard — KYC Screening + Compliance Monitor + Audit Trail (Hub 128)
const KOSRegtechDashboardPage = lazy(() => import('@/pages/kos-regtech-dashboard/page').then(m => ({ default: m.default })));

// KOS Video Control Center — Orchestration Pipeline Vidéo Agentique (Hub 134)
const KOSVideoControlCenterPage = lazy(() => import('@/pages/kos-regtech-ai/video-control/page').then(m => ({ default: m.default })));

// KOS Big Four Executive Memo Engine — Format Deloitte/EY/KPMG/PwC (Hub 129)
const KOSBigFourExecutiveMemoPage = lazy(() => import('@/pages/kos-bigfour-executive-memo/page').then(m => ({ default: m.default })));

// KOS Corpus Ingest — Upload PDF réglementaire → kos_regulatory_corpus (Hub 130)
const KOSCorpusIngestPage = lazy(() => import('@/pages/kos-corpus-ingest/page').then(m => ({ default: m.default })));

// KOS Correctives Dashboard — Monitoring Prix de Transfert UEMOA/CEMAC (Hub 131)
const KOSCorrectivesDashboardPage = lazy(() => import('@/pages/kos-correctives-dashboard/page').then(m => ({ default: m.default })));

// KOS Data Leakage Corrector — ISO 27001/42001 RAG Filter (Hub 132)
const KOSDataLeakageCorrectorPage = lazy(() => import('@/pages/kos-data-leakage-corrector/page').then(m => ({ default: m.default })));

// KOS Regulatory Obligations Dashboard — Suivi Obligations BCEAO & Matrice de Risques (Hub 133)
const KOSRegulatoryObligationsDashboardPage = lazy(() => import('@/pages/kos-regulatory-obligations/page').then(m => ({ default: m.default })));

// TikTok OAuth — Connexion & Callback
const TikTokConnectPage = lazy(() => import('@/pages/tiktok-connect/page').then(m => ({ default: m.default })));
const TikTokCallbackPage = lazy(() => import('@/pages/tiktok-callback/page').then(m => ({ default: m.default })));

// YouTube Callback OAuth Proxy
const YouTubeCallbackPage = lazy(() => import('@/pages/youtube-callback/page').then(m => ({ default: m.default })));

// YouTube Connect OAuth
const YouTubeConnectPage = lazy(() => import('@/pages/youtube-connect/page').then(m => ({ default: m.default })));

// KOS Multichannel Command
const KOSMultichannelCommandPage = lazy(() => import('@/pages/kos-multichannel-command/page').then(m => ({ default: m.default })));

// KOS Voice AI Studio — Agent 4
const KOSVoiceAIStudioPage = lazy(() => import('@/pages/kos-voice-ai-studio/page').then(m => ({ default: m.default })));

// KOS Community Manager Command — Agent 8
const KOSCommunityManagerCommandPage = lazy(() => import('@/pages/kos-community-manager-command/page').then(m => ({ default: m.default })));

// KOS YouTube Analytics — Agent 9
const KOSYouTubeAnalyticsPage = lazy(() => import('@/pages/kos-youtube-analytics/page').then(m => ({ default: m.default })));

// Dashboard Central
const KOSDashboardPage = lazy(() => import('@/pages/kos-dashboard/page').then(m => ({ default: m.default })));

// Phase 4 — 7 Hubs
const KOSManagingPartnerOfficePage = lazy(() => import('@/pages/kos-managing-partner-office/page').then(m => ({ default: m.default })));
const KOSConsultingMissionFactoryPage = lazy(() => import('@/pages/kos-consulting-mission-factory/page').then(m => ({ default: m.default })));
const KOSRiskDiligenceCommandPage = lazy(() => import('@/pages/kos-risk-diligence-command/page').then(m => ({ default: m.default })));
const KOSTransformationESGCommandPage = lazy(() => import('@/pages/kos-transformation-esg-command/page').then(m => ({ default: m.default })));
const KOSEnterpriseBrainOSPage = lazy(() => import('@/pages/kos-enterprise-brain-os/page').then(m => ({ default: m.default })));
const KOSAutonomousGrowthMarketPage = lazy(() => import('@/pages/kos-autonomous-growth-market/page').then(m => ({ default: m.default })));
const KOSControlTowerAutomationPage = lazy(() => import('@/pages/kos-control-tower-automation/page').then(m => ({ default: m.default })));
const KOSTenderIntelligencePage = lazy(() => import('@/pages/kos-tender-intelligence/page').then(m => ({ default: m.default })));
const KOSTenderAutomatesAuditPage = lazy(() => import('@/pages/kos-tender-automates-audit/page').then(m => ({ default: m.default })));

// Phase 5 — 2 Hubs
const KOSDataAnalyticsProcessMiningPage = lazy(() => import('@/pages/kos-data-analytics-process-mining/page').then(m => ({ default: m.default })));
const KOSAIGovernanceEthicsPage = lazy(() => import('@/pages/kos-ai-governance-ethics/page').then(m => ({ default: m.default })));

// Enterprise+ — 6 Hubs
const KOSExecutiveCommandPage = lazy(() => import('@/pages/kos-executive-command/page').then(m => ({ default: m.default })));
const KOSInnovationESGCommandPage = lazy(() => import('@/pages/kos-innovation-esg-command/page').then(m => ({ default: m.default })));
const KOSGrowthIntelligenceCommandPage = lazy(() => import('@/pages/kos-growth-intelligence-command/page').then(m => ({ default: m.default })));
const KOSEnterpriseOSCoreCommandPage = lazy(() => import('@/pages/kos-enterprise-os-core-command/page').then(m => ({ default: m.default })));
const KOSTransformationAdvisoryCommandPage = lazy(() => import('@/pages/kos-transformation-advisory-command/page').then(m => ({ default: m.default })));

// Phase 3 — Hyper-Automation — 6 Hubs
const KOSQualityExcellenceCommandPage = lazy(() => import('@/pages/kos-quality-excellence-command/page').then(m => ({ default: m.default })));
const KOSKnowledgeInnovationCommandPage = lazy(() => import('@/pages/kos-knowledge-innovation-command/page').then(m => ({ default: m.default })));
const KOSMarketIntelligenceCommandPage = lazy(() => import('@/pages/kos-market-intelligence-command/page').then(m => ({ default: m.default })));
const KOSDataDecisionCommandPage = lazy(() => import('@/pages/kos-data-decision-command/page').then(m => ({ default: m.default })));
const KOSEnterpriseGovernanceCommandPage = lazy(() => import('@/pages/kos-enterprise-governance-command/page').then(m => ({ default: m.default })));
const KOSPerformanceCoreCommandPage = lazy(() => import('@/pages/kos-performance-core-command/page').then(m => ({ default: m.default })));

// Artifacts Factory
const KOSArtifactsArchitectureGovernancePage = lazy(() => import('@/pages/kos-artifacts-architecture-governance/page').then(m => ({ default: m.default })));
const KOSArtifactsOperationalExcellencePage = lazy(() => import('@/pages/kos-artifacts-operational-excellence/page').then(m => ({ default: m.default })));
const KOSArtifactsGrowthStrategyPage = lazy(() => import('@/pages/kos-artifacts-growth-strategy/page').then(m => ({ default: m.default })));
const KOSArtifactsEnterpriseCommandPage = lazy(() => import('@/pages/kos-artifacts-enterprise-command/page').then(m => ({ default: m.default })));
const KOSEnterpriseKPICommandPage = lazy(() => import('@/pages/kos-enterprise-kpi-command/page').then(m => ({ default: m.default })));

// Automata Big Four
const KOSGSCCommandPage = lazy(() => import('@/pages/kos-gsc-command/page').then(m => ({ default: m.default })));
const KOSSecurityCommandPage = lazy(() => import('@/pages/kos-security-command/page').then(m => ({ default: m.default })));
const KOSLeadScoringCommandPage = lazy(() => import('@/pages/kos-lead-scoring-command/page').then(m => ({ default: m.default })));
const KOSBacklinkCommandPage = lazy(() => import('@/pages/kos-backlink-command/page').then(m => ({ default: m.default })));

// Claude Integration
const KOSStrategicIntelligencePage = lazy(() => import('@/pages/kos-strategic-intelligence/page').then(m => ({ default: m.default })));
const KOSProductionCommandPage = lazy(() => import('@/pages/kos-production-command/page').then(m => ({ default: m.default })));
const KOSGovernanceKnowledgePage = lazy(() => import('@/pages/kos-governance-knowledge/page').then(m => ({ default: m.default })));

// Autonomous
const KOSGrowthOrchestratorPage = lazy(() => import('@/pages/kos-growth-orchestrator/page').then(m => ({ default: m.default })));
const KOSAgentBlockUpdatesPage = lazy(() => import('@/pages/kos-agent-block-updates/page').then(m => ({ default: m.default })));
const KOSUnifiedAutopilotPage = lazy(() => import('@/pages/kos-unified-autopilot/page').then(m => ({ default: m.default })));
const KOSOrchestratorEnginePage = lazy(() => import('@/pages/kos-orchestrator-engine/page').then(m => ({ default: m.default })));
const KOSCorrectiveExecutionEnginePage = lazy(() => import('@/pages/kos-corrective-execution-engine/page').then(m => ({ default: m.default })));
const KOSContentCorrectionEnginePage = lazy(() => import('@/pages/kos-content-correction-engine/page').then(m => ({ default: m.default })));
const KOSCyberTechCorrectionEnginePage = lazy(() => import('@/pages/kos-cyber-tech-correction-engine/page').then(m => ({ default: m.default })));
const KOSDigitalGrowthCorrectionEnginePage = lazy(() => import('@/pages/kos-digital-growth-correction-engine/page').then(m => ({ default: m.default })));
const KOSAutonomousQualitySystemPage = lazy(() => import('@/pages/kos-autonomous-quality-system/page').then(m => ({ default: m.default })));
const KOSResourceCommandCenterPage = lazy(() => import('@/pages/kos-resource-command-center/page').then(m => ({ default: m.default })));
const KOSFullUpgradeCompliancePage = lazy(() => import('@/pages/kos-full-upgrade-compliance/page').then(m => ({ default: m.default })));
const KOSMDPAutomatorPage = lazy(() => import('@/pages/kos-mdp-automator/page').then(m => ({ default: m.default })));
const KOSAutoTaskOrchestratorPage = lazy(() => import('@/pages/kos-auto-task-orchestrator/page').then(m => ({ default: m.default })));
const KOSWebOperationsDeploymentPage = lazy(() => import('@/pages/kos-web-operations-deployment/page').then(m => ({ default: m.default })));

// Automaton, AI, Social, SEO
const KOSAutomatonPage = lazy(() => import('@/pages/kos-automaton/page').then(m => ({ default: m.default })));
const KOSAIVisibilityCommandPage = lazy(() => import('@/pages/kos-ai-visibility-command/page').then(m => ({ default: m.default })));
const KOSSocialMediaCommandPage = lazy(() => import('@/pages/kos-social-media-command/page').then(m => ({ default: m.default })));
const KOSSocialMediaBoardPage = lazy(() => import('@/pages/kos-social-media-board/page').then(m => ({ default: m.default })));
const KOSSocialPublisherPage = lazy(() => import('@/pages/kos-social-publisher/page').then(m => ({ default: m.default })));
const KOSSEOaeoCommandPage = lazy(() => import('@/pages/kos-seo-aeo-command/page').then(m => ({ default: m.default })));

// KHEPRA OS 2
const KhepraOS2HubPage = lazy(() => import('@/pages/khepra-os-2/page').then(m => ({ default: m.default })));
const AgentConsolePage = lazy(() => import('@/pages/agent-console/page').then(m => ({ default: m.default })));
const ThinkTankPage = lazy(() => import('@/pages/think-tank/page').then(m => ({ default: m.default })));
const RegulatoryIntelligenceDashboardPage = lazy(() => import('@/pages/regulatory-intelligence/page').then(m => ({ default: m.default })));
const ExecutiveDashboardPage = lazy(() => import('@/pages/executive-dashboard/page').then(m => ({ default: m.default })));
const KnowledgeHubPage = lazy(() => import('@/pages/knowledge-hub/page').then(m => ({ default: m.default })));
const COBACDashboardPage = lazy(() => import('@/pages/cobac/page').then(m => ({ default: m.default })));
const BCEAODashboardPage = lazy(() => import('@/pages/bceao/page').then(m => ({ default: m.default })));
const GAFIDashboardPage = lazy(() => import('@/pages/gafi/page').then(m => ({ default: m.default })));
const OHADADashboardPage = lazy(() => import('@/pages/ohada/page').then(m => ({ default: m.default })));
const ComplianceManagementPage = lazy(() => import('@/pages/compliance-management/page').then(m => ({ default: m.default })));
const TransferPricingPage = lazy(() => import('@/pages/transfer-pricing/page').then(m => ({ default: m.default })));

// URL Auto-Pointage
const KOSUrlAutoPointagePage = lazy(() => import('@/pages/kos-url-auto-pointage/page').then(m => ({ default: m.default })));

// Performance & SEO Command Center
const KOSPerformanceSEOCommandPage = lazy(() => import('@/pages/kos-performance-seo-command/page').then(m => ({ default: m.default })));

// SEO & Performance Optimization Cockpit — Hub 128
const KOSSEOPerfOptimizationPage = lazy(() => import('@/pages/kos-seo-perf-optimization/page').then(m => ({ default: m.default })));

// Correction Engine
const KOSCorrectionEnginePage = lazy(() => import('@/pages/kos-correction-engine/page').then(m => ({ default: m.default })));
const KOSBlogRegulatoryCorrectionEnginePage = lazy(() => import('@/pages/kos-blog-regulatory-correction-engine/page').then(m => ({ default: m.default })));
const KOSBigFourWebResourcesReviewPage = lazy(() => import('@/pages/kos-big-four-web-resources-review/page').then(m => ({ default: m.default })));

// LinkedIn Distribution Program
const KOSLinkedInDistributionProgramPage = lazy(() => import('@/pages/kos-linkedin-distribution-program/page').then(m => ({ default: m.default })));
// LinkedIn Social Selling Engine — Master Prompt Big Four
const KOSLinkedInSocialSellingEnginePage = lazy(() => import('@/pages/kos-linkedin-social-selling-engine/page').then(m => ({ default: m.default })));

// LinkedIn BU Positioning Pages — Optimisées pour partage LinkedIn
const KOSBU1FinancialRegulationPage = lazy(() => import('@/pages/kos-bu1-financial-regulation/page').then(m => ({ default: m.default })));
const KOSBU2GovernanceDueDiligencePage = lazy(() => import('@/pages/kos-bu2-governance-due-diligence/page').then(m => ({ default: m.default })));
const KOSBU3ClimateESGPage = lazy(() => import('@/pages/kos-bu3-climate-esg/page').then(m => ({ default: m.default })));
const KOSBU4KBRModelPage = lazy(() => import('@/pages/kos-bu4-kbr-model/page').then(m => ({ default: m.default })));

// LinkedIn BU Positioning Pages — English Versions (International Reach)
const KOSBU1FinancialRegulationEnPage = lazy(() => import('@/pages/kos-bu1-financial-regulation-en/page').then(m => ({ default: m.default })));
const KOSBU2GovernanceDueDiligenceEnPage = lazy(() => import('@/pages/kos-bu2-governance-due-diligence-en/page').then(m => ({ default: m.default })));
const KOSBU3ClimateESGEnPage = lazy(() => import('@/pages/kos-bu3-climate-esg-en/page').then(m => ({ default: m.default })));
const KOSBU4KBRModelEnPage = lazy(() => import('@/pages/kos-bu4-kbr-model-en/page').then(m => ({ default: m.default })));

// SEO Autopilot
const KOSSeoAutopilotPage = lazy(() => import('@/pages/kos-seo-autopilot/page').then(m => ({ default: m.default })));

// Research Institute
const KOSResearchInstitutePage = lazy(() => import('@/pages/kos-research-institute/page').then(m => ({ default: m.default })));

// Diagnostic 360
const KOSDiagnostic360Page = lazy(() => import('@/pages/kos-diagnostic-360/page').then(m => ({ default: m.default })));

// Knowledge Center
const KOSKnowledgeCenterPage = lazy(() => import('@/pages/kos-knowledge-center/page').then(m => ({ default: m.default })));

// Global Knowledge Graph
const KOSKnowledgeGraphPage = lazy(() => import('@/pages/kos-knowledge-graph/page').then(m => ({ default: m.default })));

// Institutional Visibility Engine
const KOSInstitutionalVisibilityPage = lazy(() => import('@/pages/kos-institutional-visibility/page').then(m => ({ default: m.default })));

// Fullstack Developer Automates
const KOSFullstackDevAutomatesPage = lazy(() => import('@/pages/kos-fullstack-dev-automates/page').then(m => ({ default: m.default })));

// Web Operations Automates
const KOSWebOpsAutomatesPage = lazy(() => import('@/pages/kos-web-ops-automates/page').then(m => ({ default: m.default })));

// Cyber Security Automates
const KOSCyberSecurityAutomatesPage = lazy(() => import('@/pages/kos-cyber-security-automates/page').then(m => ({ default: m.default })));

// Think Tank Automates
const KOSThinkTankAutomatesPage = lazy(() => import('@/pages/kos-think-tank-automates/page').then(m => ({ default: m.default })));

// Regulatory Compliance Automates
const KOSRegulatoryComplianceAutomatesPage = lazy(() => import('@/pages/kos-regulatory-compliance-automates/page').then(m => ({ default: m.default })));

// Blog Writing Automates (Big Four Level)
const KOSBlogWritingAutomatesPage = lazy(() => import('@/pages/kos-blog-writing-automates/page').then(m => ({ default: m.default })));

// Interactive Tools Review Automates
const KOSInteractiveToolsReviewPage = lazy(() => import('@/pages/kos-interactive-tools-review/page').then(m => ({ default: m.default })));

// Accès KOS (mot de passe)
const KOSAccessPage = lazy(() => import('@/pages/kos-access/page').then(m => ({ default: m.default })));

// KOS Enterprise Engine
const KOSEnterpriseEnginePage = lazy(() => import('@/pages/kos-enterprise-engine/page').then(m => ({ default: m.default })));

// KOS Leadership Agents
const KOSLeadershipAgentsPage = lazy(() => import('@/pages/kos-leadership-agents/page').then(m => ({ default: m.default })));

// KOS Closing Intelligence Engine
const KOSClosingIntelligenceEnginePage = lazy(() => import('@/pages/kos-closing-intelligence-engine/page').then(m => ({ default: m.default })));

// Referents Metiers Automates
const KOSReferentsMetiersAutomatesPage = lazy(() => import('@/pages/kos-referents-metiers-automates/page').then(m => ({ default: m.default })));

// Commercial & Marketing Automates
const KOSCommercialMarketingAutomatesPage = lazy(() => import('@/pages/kos-commercial-marketing-automates/page').then(m => ({ default: m.default })));

// Organisation & Qualité Automates
const KOSOrganisationQualiteAutomatesPage = lazy(() => import('@/pages/kos-organisation-qualite-automates/page').then(m => ({ default: m.default })));

// Commandement Opérationnel Unifié
const KOSCommandementOperationnelUnifiePage = lazy(() => import('@/pages/kos-commandement-operationnel-unifie/page').then(m => ({ default: m.default })));

// LLM Experts Automates
const KOSLlmExpertsAutomatesPage = lazy(() => import('@/pages/kos-llm-experts-automates/page').then(m => ({ default: m.default })));
// LLM Excellence Engine — Master Prompt Big Four
const KOSLlmExcellenceEnginePage = lazy(() => import('@/pages/kos-llm-excellence-engine/page').then(m => ({ default: m.default })));
// Synchroniseur Maître KOS
const KOSMasterSynchronizerPage = lazy(() => import('@/pages/kos-synchroniseur-maitre/page').then(m => ({ default: m.default })));
// Bloc Execution System KOS
const KOSBlockExecutionPage = lazy(() => import('@/pages/kos-block-execution/page').then(m => ({ default: m.default })));

// KOS Global Launch System
const KOSGlobalLaunchPage = lazy(() => import('@/pages/kos-global-launch/page').then(m => ({ default: m.default })));
// Compliance & Quality MAX — Cockpit Unifié 48 Automates
const KOSComplianceQualityMaxPage = lazy(() => import('@/pages/kos-compliance-quality-max/page').then(m => ({ default: m.default })));

// Performance 100% Challenge
const KOSPerformance100ChallengePage = lazy(() => import('@/pages/kos-performance-100-challenge/page').then(m => ({ default: m.default })));

// Global Agent Performance Scan
const KOSGlobalAgentPerformancePage = lazy(() => import('@/pages/kos-global-agent-performance/page').then(m => ({ default: m.default })));

// KOS Constitution — Bloc 1
const KOSConstitutionPage = lazy(() => import('@/pages/kos-constitution/page').then(m => ({ default: m.default })));

// KOS Enterprise Data Model — Bloc 2
const KOSEnterpriseDataModelPage = lazy(() => import('@/pages/kos-enterprise-data-model/page').then(m => ({ default: m.default })));

// KOS Audit Ledger — Bloc 3
const KOSAuditLedgerPage = lazy(() => import('@/pages/kos-audit-ledger/page').then(m => ({ default: m.default })));

// KOS Runtime — Bloc 4
const KOSRuntimePage = lazy(() => import('@/pages/kos-runtime/page').then(m => ({ default: m.default })));

// KOS Control Tower — Bloc 5
const KOSControlTowerPage = lazy(() => import('@/pages/kos-control-tower/page').then(m => ({ default: m.default })));

// KOS Automation Factory — Bloc 10
const KOSAutomationFactoryPage = lazy(() => import('@/pages/kos-automation-factory/page').then(m => ({ default: m.default })));

// Khepra Growth Engine — Bloc 12
const KOSKhepraGrowthEnginePage = lazy(() => import('@/pages/kos-khepra-growth-engine/page').then(m => ({ default: m.default })));
// KOS Trust Center — Bloc 8
const KOSTrustCenterPage = lazy(() => import('@/pages/kos-trust-center/page').then(m => ({ default: m.default })));

// KOS Data Governance — AXE 9
const KOSDataGovernancePage = lazy(() => import('@/pages/kos-data-governance/page').then(m => ({ default: m.default })));

// Schema.org Audit
const KOSSchemaOrgAuditPage = lazy(() => import('@/pages/kos-schema-org-audit/page').then(m => ({ default: m.default })));
// Scientific Intelligence Enhancement — Master Prompt Big Four
const KOSScientificIntelligenceEnhancementPage = lazy(() => import('@/pages/kos-scientific-intelligence-enhancement/page').then(m => ({ default: m.default })));
// Business Opportunity Intelligence — Master Prompt Big Four
const KOSBusinessOpportunityIntelligencePage = lazy(() => import('@/pages/kos-business-opportunity-intelligence/page').then(m => ({ default: m.default })));
// Regulatory Legal Compliance Excellence — Master Prompt Big Four
const KOSRegulatoryLegalComplianceExcellencePage = lazy(() => import('@/pages/kos-regulatory-legal-compliance-excellence/page').then(m => ({ default: m.default })));

// KOS Transformation Program 2026-2028 — Master Plan Big Four
const KOSTransformationProgramPage = lazy(() => import('@/pages/kos-transformation-program/page').then(m => ({ default: m.default })));

// Bloc 00 — PMO & Gouvernance KOS
const KOSPMOGovernancePage = lazy(() => import('@/pages/kos-pmo-governance/page').then(m => ({ default: m.default })));
// Bloc 01 — KHEPRA Knowledge Graph™
const KOSKnowledgeGraphBlocPage = lazy(() => import('@/pages/kos-knowledge-graph-blanc/page').then(m => ({ default: m.default })));
// Bloc 02 — KHEPRA Intelligence Center™
const KOSIntelligenceCenterPage = lazy(() => import('@/pages/kos-intelligence-center/page').then(m => ({ default: m.default })));
// Bloc 03 — GEO Authority Engine™
const KOSGEOAuthorityEnginePage = lazy(() => import('@/pages/kos-geo-authority-engine/page').then(m => ({ default: m.default })));
// Bloc 04 — SEO Big Four™
const KOSSEOBigFourPage = lazy(() => import('@/pages/kos-seo-big-four/page').then(m => ({ default: m.default })));
// Bloc 05 — AO / AMI Intelligence™
const KOSAOAMIPage = lazy(() => import('@/pages/kos-ao-ami-intelligence/page').then(m => ({ default: m.default })));
// Bloc 06 — Partnership Engine™
const KOSPartnershipEnginePage = lazy(() => import('@/pages/kos-partnership-engine/page').then(m => ({ default: m.default })));
// Bloc 07 — Expert Network™
const KOSExpertNetworkPage = lazy(() => import('@/pages/kos-expert-network/page').then(m => ({ default: m.default })));
// Bloc 08 — Regulatory Excellence™
const KOSRegulatoryExcellencePage = lazy(() => import('@/pages/kos-regulatory-excellence/page').then(m => ({ default: m.default })));
// Bloc 11 — Business Development Engine™
const KOSBusinessDevelopmentEnginePage = lazy(() => import('@/pages/kos-business-development-engine/page').then(m => ({ default: m.default })));
// Bloc 12 — Quality & Risk Management™
const KOSQualityRiskManagementPage = lazy(() => import('@/pages/kos-quality-risk-management/page').then(m => ({ default: m.default })));

// SEO On-Page & Content Quality
const KOSSeoOnPageContentPage = lazy(() => import('@/pages/kos-seo-onpage-content/page').then(m => ({ default: m.default })));

// Backlink Intelligence Audit
const KOSBacklinkIntelligenceAuditPage = lazy(() => import('@/pages/kos-backlink-intelligence-audit/page').then(m => ({ default: m.default })));

// SEO Analytics & Competitive Intelligence
const KOSSeoAnalyticsCompetitivePage = lazy(() => import('@/pages/kos-seo-analytics-competitive/page').then(m => ({ default: m.default })));

// SEO Content Strategy & Editorial Command
const KOSSeoContentStrategyPage = lazy(() => import('@/pages/kos-seo-content-strategy/page').then(m => ({ default: m.default })));

// Local SEO & GEO Visibility
const KOSSeoLocalGeoPage = lazy(() => import('@/pages/kos-seo-local-geo/page').then(m => ({ default: m.default })));

// Social SEO & LinkedIn Authority
const KOSSeoSocialAuthorityPage = lazy(() => import('@/pages/kos-seo-social-authority/page').then(m => ({ default: m.default })));

// SEO CRO & Conversion Optimization
const KOSSeoCROConversionPage = lazy(() => import('@/pages/kos-seo-cro-conversion/page').then(m => ({ default: m.default })));

// SEO E-E-A-T & Brand Authority
const KOSSeoEEATAuthorityPage = lazy(() => import('@/pages/kos-seo-eeat-authority/page').then(m => ({ default: m.default })));

// International & Multilingual SEO
const KOSSeoInternationalMultilingualPage = lazy(() => import('@/pages/kos-seo-international-multilingual/page').then(m => ({ default: m.default })));

// SEO Reporting & Executive Command
const KOSSeoReportingExecutivePage = lazy(() => import('@/pages/kos-seo-reporting-executive/page').then(m => ({ default: m.default })));

// Regulatory Compliance Audit — BCEAO/COBAC
const KOSRegulatoryComplianceAuditPage = lazy(() => import('@/pages/kos-regulatory-compliance-audit/page').then(m => ({ default: m.default })));

// Regulatory Compliance Engine™ — Command Center (MASTER PROMPT)
const KOSRegulatoryComplianceEnginePage = lazy(() => import('@/pages/kos-regulatory-compliance-engine/page').then(m => ({ default: m.default })));

// Regulatory Remediation Engine™ — Exécution & Correction
const KOSRegulatoryRemediationEnginePage = lazy(() => import('@/pages/kos-regulatory-remediation-engine/page').then(m => ({ default: m.default })));

// Big Four Remediation Command Center™ — Bureau Central de Transformation
const KOSBigFourRemediationPage = lazy(() => import('@/pages/kos-big-four-remediation/page').then(m => ({ default: m.default })));

// KOS Content Factory Command — Hub 64
const KOSContentFactoryCommandPage = lazy(() => import('@/pages/kos-content-factory-command/page').then(m => ({ default: m.default })));
// KOS Content Calendar — 100 Thématiques Éditoriales
const KOSContentCalendarPage = lazy(() => import('@/pages/kos-content-calendar/page').then(m => ({ default: m.default })));
// KOS Deployment Pipeline Command — Hub 65
const KOSDeploymentPipelinePage = lazy(() => import('@/pages/kos-deployment-pipeline/page').then(m => ({ default: m.default })));

// Stratégie Digitale (KOS protégé)
const StrategieDigitalePage = lazy(() => import('@/pages/strategie-digitale/page').then(m => ({ default: m.default })));

// KOS Strategic Positioning Center — Bloc 1
const KOSStrategicPositioningPage = lazy(() => import('@/pages/kos-strategic-positioning/page').then(m => ({ default: m.default })));

// KOS Thought Leadership Center — Bloc 2
const KOSThoughtLeadershipCenterPage = lazy(() => import('@/pages/kos-thought-leadership-center/page').then(m => ({ default: m.default })));

// KOS Africa Observatories Program — Bloc 11
const KOSAfricaObservatoriesPage = lazy(() => import('@/pages/kos-africa-observatories/page').then(m => ({ default: m.default })));

// KOS Regulatory Intelligence Center — Master Prompt 3
const KOSRegulatoryIntelligenceCenterPage = lazy(() => import('@/pages/kos-regulatory-intelligence-engine/page').then(m => ({ default: m.default })));

// KOS Digital Authority Engine — Master Prompt 6
const KOSDigitalAuthorityEnginePage = lazy(() => import('@/pages/kos-digital-authority-engine/page').then(m => ({ default: m.default })));

// KOS Domain Authority Intelligence — Master Prompt 11
const KOSDomainAuthorityIntelligencePage = lazy(() => import('@/pages/kos-domain-authority-intelligence/page').then(m => ({ default: m.default })));

// KOS SEO Performance Intelligence — Master Prompt 12
const KOSSeoPerformanceIntelligencePage = lazy(() => import('@/pages/kos-seo-performance-intelligence/page').then(m => ({ default: m.default })));

// KOS Multi-Agent Orchestration Framework — Master Prompt 7
const KOSMultiAgentOrchestrationPage = lazy(() => import('@/pages/kos-multi-agent-orchestration/page').then(m => ({ default: m.default })));

// KOS Big Four Maturity Assessment — Master Prompt 10
const KOSBigFourMaturityAssessmentPage = lazy(() => import('@/pages/kos-big-four-maturity-assessment/page').then(m => ({ default: m.default })));

// KOS AI Compliance & Fraud Intelligence — Master Prompt 13
const KOSAIComplianceFraudIntelligencePage = lazy(() => import('@/pages/kos-ai-compliance-fraud-intelligence/page').then(m => ({ default: m.default })));

// KOS Francophone Africa Strategic Intelligence Center — Master Prompt 14
const KOSFrancophoneAfricaStrategicCenterPage = lazy(() => import('@/pages/kos-francophone-africa-strategic-center/page').then(m => ({ default: m.default })));

// KOS Global Visibility Command — Master Prompt 15
const KOSGlobalVisibilityCommandPage = lazy(() => import('@/pages/kos-global-visibility-command/page').then(m => ({ default: m.default })));

// KOS ESG & Regulatory Alignment Command — Master Prompt 16
const KOSESGRegulatoryAlignmentPage = lazy(() => import('@/pages/kos-esg-regulatory-alignment/page').then(m => ({ default: m.default })));

// KOS Phase 1 — Fondations & Conformité Command — Master Prompt 17
const KOSPhase1FoundationsCompliancePage = lazy(() => import('@/pages/kos-phase1-foundations-compliance/page').then(m => ({ default: m.default })));

// KOS Final Orchestration Command™ — Consolidation Ultime
const KOSFinalOrchestrationPage = lazy(() => import('@/pages/kos-final-orchestration/page').then(m => ({ default: m.default })));

// KOS Total Production Go-Live Command™ — Mise en Production Totale
const KOSProductionGoLivePage = lazy(() => import('@/pages/kos-production-go-live/page').then(m => ({ default: m.default })));

// KOS Governance Formalization Command™ — Nominations, Comités, Chartes, Plan Correctif
const KOSGovernanceFormalizationPage = lazy(() => import('@/pages/kos-governance-formalization/page').then(m => ({ default: m.default })));

// KOS Compliance & Security Certification Command™ — KYC/CDD, LCB/FT, CEMAC, ISO 27001
const KOSComplianceSecurityCertificationPage = lazy(() => import('@/pages/kos-compliance-security-certification/page').then(m => ({ default: m.default })));

// KOS ESG & Sustainability Command™ — Bilan Carbone, EcoVadis, GRI/ISSB, Dashboard ESG
const KOSESGSustainabilityCommandPage = lazy(() => import('@/pages/kos-esg-sustainability-command/page').then(m => ({ default: m.default })));

// KOS Digital Performance Command™ — Core Web Vitals, OWASP, SOC 2, Reporting Interactif
const KOSDigitalPerformanceCommandPage = lazy(() => import('@/pages/kos-digital-performance-command/page').then(m => ({ default: m.default })));

// KOS System Integrity Scanner™ — Scan intégral erreurs, bugs, tâches critiques par bloc
const KOSSystemIntegrityScannerPage = lazy(() => import('@/pages/kos-system-integrity-scanner/page').then(m => ({ default: m.default })));

// KOS Scan Complet + Exécution en Bloc — Cockpit de Commandement Unifié (Hub 999)
const KOSScanCompletExecutionPage = lazy(() => import('@/pages/kos-scan-complet-execution/page').then(m => ({ default: m.default })));

// KOS Phase 1 Consolidation Execution™ — Correction 8 Urgences P0
const KOSPhase1ConsolidationPage = lazy(() => import('@/pages/kos-phase1-consolidation/page').then(m => ({ default: m.default })));

// KOS Phase 2 Sécurisation & Performance™ — CSP/WAF, WebP, OWASP, SMSI, Pentest
const KOSPhase2SecurisationPage = lazy(() => import('@/pages/kos-phase2-securisation/page').then(m => ({ default: m.default })));

// KOS Phase 3 Qualité & Documentation™ — TJM, JWT/RLS, EcoVadis, Bundle, Audit Go-Live
const KOSPhase3QualitePage = lazy(() => import('@/pages/kos-phase3-qualite/page').then(m => ({ default: m.default })));

// KOS Phase 4 Go-Live & Production™ — Snapshot, Formation, Migration, COMEX, Monitoring
const KOSPhase4GoLivePage = lazy(() => import('@/pages/kos-phase4-go-live/page').then(m => ({ default: m.default })));

// KOS Phase 5 Expansion & Rayonnement™ — SLA, Expansion CEMAC, Partenariats, SEO, Revenue Ops
const KOSPhase5ExpansionPage = lazy(() => import('@/pages/kos-phase5-expansion/page').then(m => ({ default: m.default })));

// KOS Phase 6 Autonomie Totale & Innovation™ — IA Agentique, Self-Healing, Blockchain, DaaS, R&D
const KOSPhase6InnovationPage = lazy(() => import('@/pages/kos-phase6-innovation/page').then(m => ({ default: m.default })));

// KOS Phase 7 Domination Continentale & Marché Global™
const KOSPhase7DominationPage = lazy(() => import('@/pages/kos-phase7-domination/page').then(m => ({ default: m.default })));

// KOS Phase 8 Singularité & Legacy™
const KOSPhase8SingularitePage = lazy(() => import('@/pages/kos-phase8-singularite/page').then(m => ({ default: m.default })));

// KOS Plan Consolidation Master View™ — Dashboard Unifié 8 Phases
const KOSPlanConsolidationMasterViewPage = lazy(() => import('@/pages/kos-plan-consolidation-master-view/page').then(m => ({ default: m.default })));

// KOS CDO & Growth Engineering Command™ — Hub 72
const KOSCDOEngineeringCommandPage = lazy(() => import('@/pages/kos-cdo-engineering-command/page').then(m => ({ default: m.default })));

// KOS Production Package Factory — Hub 73
const KOSProductionPackageFactoryPage = lazy(() => import('@/pages/kos-production-package-factory/page').then(m => ({ default: m.default })));

// KOS SysOps Health & Resiliency Command — Hub 74
const KOSSysOpsHealthResiliencyCommandPage = lazy(() => import('@/pages/kos-sysops-health-resiliency-command/page').then(m => ({ default: m.default })));

// KOS External API Config Command — Hub 75
const KOSExternalApiConfigCommandPage = lazy(() => import('@/pages/kos-external-api-config-command/page').then(m => ({ default: m.default })));

// KOS YouTube Autonomous Infrastructure — Master Prompt 1 (Hub 76)
const KOSYoutubeAutonomousInfrastructurePage = lazy(() => import('@/pages/kos-youtube-autonomous-infrastructure/page').then(m => ({ default: m.default })));

// KOS YouTube Production Pipeline — Master Prompt 2 (Hub 77)
const KOSYoutubeProductionPipelinePage = lazy(() => import('@/pages/kos-youtube-production-pipeline/page').then(m => ({ default: m.default })));

// KOS YouTube System Scanner & Auto-Production Launcher — Hub 78
const KOSYoutubeSystemScannerPage = lazy(() => import('@/pages/kos-youtube-system-scanner/page').then(m => ({ default: m.default })));

// KOS YouTube Monitoring Center — Hub 79
const KOSYoutubeMonitoringPage = lazy(() => import('@/pages/kos-youtube-monitoring/page').then(m => ({ default: m.default })));

// KOS YouTube Download Studio — Hub 80
const KOSYoutubeDownloadPage = lazy(() => import('@/pages/kos-youtube-download/page').then(m => ({ default: m.default })));

// KOS Video Podcast Publishing Pack — Hub 86
const KOSVideoPodcastPublishingPackPage = lazy(() => import('@/pages/kos-video-podcast-publishing-pack/page').then(m => ({ default: m.default })));

// KOS YouTube Download Center — Centre de Téléchargement
const YoutubeDownloadCenterPage = lazy(() => import('@/pages/youtube-download-center/page').then(m => ({ default: m.default })));

// KOS Youtube Pending Queue — File d'Attente Publication
const YoutubePendingPage = lazy(() => import('@/pages/youtube-pending/page').then(m => ({ default: m.default })));

// KOS Total Governance & Regulatory Excellence™ — Autorité Suprême de Gouvernance
const KOSTotalGovernanceRegulatoryExcellencePage = lazy(() => import('@/pages/kos-total-governance-regulatory-excellence/page').then(m => ({ default: m.default })));

// KOS Global System Upgrade Command™ — Console Unifiée d'Upgrade Système
const KOSGlobalSystemUpgradePage = lazy(() => import('@/pages/kos-global-system-upgrade/page').then(m => ({ default: m.default })));

// KOS YouTube Hybrid Recovery & Corrective Actions™ — Détection Blocages & Auto-Fix
const KOSYoutubeHybridRecoveryPage = lazy(() => import('@/pages/kos-youtube-hybrid-recovery/page').then(m => ({ default: m.default })));

// KOS URL Indexation Command™ — Analyse URLs & Poussée Indexation Google 95%
const KOSUrlIndexationCommandPage = lazy(() => import('@/pages/kos-url-indexation-command/page').then(m => ({ default: m.default })));

// KOS Application Landing — Google Cloud Console OAuth Validation
const KOSLandingPage = lazy(() => import('@/pages/kos-landing/page').then(m => ({ default: m.default })));

// KOS Banking Stack™ — Banking Compliance Infrastructure
const KOSBankingStackPage = lazy(() => import('@/pages/kos-banking-stack/page').then(m => ({ default: m.default })));

// KOS Enterprise Consolidation Command™ — Consolidation & Production Complète
const KOSEnterpriseConsolidationPage = lazy(() => import('@/pages/kos-enterprise-consolidation/page').then(m => ({ default: m.default })));

// KOS 120% Big Four Upgrade Command™ — Transcendance Opérationnelle
const KOS120BigFourUpgradePage = lazy(() => import('@/pages/kos-120-big-four-upgrade/page').then(m => ({ default: m.default })));

// KOS UPG-1 Fondations 120% — Exécution Live
const KOS120Upg1ExecutionPage = lazy(() => import('@/pages/kos-120-upg1-execution/page').then(m => ({ default: m.default })));

// KOS UPG-2 Expansion Intelligence — Exécution Live
const KOS120Upg2ExecutionPage = lazy(() => import('@/pages/kos-120-upg2-execution/page').then(m => ({ default: m.default })));

// KOS UPG-3 Agents 2.0 & Automatisation Anticipative — Exécution Live
const KOS120Upg3ExecutionPage = lazy(() => import('@/pages/kos-120-upg3-execution/page').then(m => ({ default: m.default })));

// KOS UPG-4 Expansion & Monétisation — Pipeline Revenus Dynamique LIVE
const KOS120Upg4ExecutionPage = lazy(() => import('@/pages/kos-120-upg4-execution/page').then(m => ({ default: m.default })));

// KOS Audit Qualité Totale 120% Big Four + Optimisation Système
const KOS120TotalQualityAuditPage = lazy(() => import('@/pages/kos-120-total-quality-audit/page').then(m => ({ default: m.default })));

// KOS Sprint Zéro Budget — Exécution Immédiate 10 Actions
const KOSZeroBudgetSprintPage = lazy(() => import('@/pages/kos-zero-budget-sprint/page').then(m => ({ default: m.default })));

// KOS Sprint 2 Zéro Budget — Les 10 Tâches Restantes
const KOSZeroBudgetSprint2Page = lazy(() => import('@/pages/kos-zero-budget-sprint-2/page').then(m => ({ default: m.default })));

// KOS Budget Unleashed Sprint — Actions Débloquées Budget COMEX
const KOSBudgetUnleashedSprintPage = lazy(() => import('@/pages/kos-budget-unleashed-sprint/page').then(m => ({ default: m.default })));

// KOS Audience Dashboard — Gestion des Audiences (Hub 88)
const KOSAudienceDashboardPage = lazy(() => import('@/pages/kos-audience-dashboard/page').then(m => ({ default: m.default })));

// KOS Self-Evolution Program — Big Four Autonomous Capability Absorption (Hub 89)
const KOSSelfEvolutionPage = lazy(() => import('@/pages/kos-self-evolution/page').then(m => ({ default: m.default })));

// KOS Proprietary Voice Factory — KHEPRA Voice™ (Hub 90)
const KOSProprietaryVoiceFactoryPage = lazy(() => import('@/pages/kos-proprietary-voice-factory/page').then(m => ({ default: m.default })));

// KOS Autonomous Stack Transformation — Désintermédiation API (Hub 91)
const KOSAutonomousStackPage = lazy(() => import('@/pages/kos-autonomous-stack/page').then(m => ({ default: m.default })));

// KOS Knowledge Factory — Production de Connaissances Big Four (Hub 92)
const KOSKnowledgeFactoryPage = lazy(() => import('@/pages/kos-knowledge-factory/page').then(m => ({ default: m.default })));

// KOS Podcast Factory — Chaîne Industrielle de Podcasts (Hub 93)
const KOSPodcastFactoryPage = lazy(() => import('@/pages/kos-podcast-factory/page').then(m => ({ default: m.default })));

// KOS Interview Factory — Interviews d'Experts Virtuels (Hub 94)
const KOSInterviewFactoryPage = lazy(() => import('@/pages/kos-interview-factory/page').then(m => ({ default: m.default })));

// KOS Canva Factory — Industrialisation Design Graphique (Hub 95)
const KOSCanvaFactoryPage = lazy(() => import('@/pages/kos-canva-factory/page').then(m => ({ default: m.default })));

// KOS PowerPoint Factory — Présentations Exécutives Automatiques (Hub 96)
const KOSPowerPointFactoryPage = lazy(() => import('@/pages/kos-powerpoint-factory/page').then(m => ({ default: m.default })));

// KOS Video Factory — Production Vidéo Automatique (Hub 97)
const KOSVideoFactoryPage = lazy(() => import('@/pages/kos-video-factory/page').then(m => ({ default: m.default })));

// KOS Voice Factory — Identité Audio KHEPRA (Hub 98)
const KOSVoiceFactoryPage = lazy(() => import('@/pages/kos-voice-factory/page').then(m => ({ default: m.default })));

// KOS YouTube Factory — @KHEPRAEXPERTS (Hub 99)
const KOSYouTubeFactoryPage = lazy(() => import('@/pages/kos-youtube-factory/page').then(m => ({ default: m.default })));

// KOS Autonomous Media Command Center — Orchestration Globale (Hub 100)
const KOSAutonomousMediaCommandCenterPage = lazy(() => import('@/pages/kos-autonomous-media-command-center/page').then(m => ({ default: m.default })));

// KOS Ultimate Cockpit — Single Pane of Glass (Hub 101)
const KOSUltimateCockpitPage = lazy(() => import('@/pages/kos-ultimate-cockpit/page').then(m => ({ default: m.default })));

// KOS War Room — Pipeline Autonome 8 Agents Live Dashboard
const KOSWarRoomPage = lazy(() => import('@/pages/kos-war-room/page').then(m => ({ default: m.default })));

// KOS Full System Security Scan — Analyse 360° Sécurité (Hub 106)
const KOSFullSystemSecurityScanPage = lazy(() => import('@/pages/kos-full-system-security-scan/page').then(m => ({ default: m.default })));

// KOS Complete Performance · Visibilité · Marketing · Lead Magnets · AMI/AO & 120% Upgrade (Hub 107)
const KOSCompletePerformanceVisibility120UpgradePage = lazy(() => import('@/pages/kos-complete-performance-visibility-120-upgrade/page').then(m => ({ default: m.default })));

// KOS API Independence Command™ — Hub 87
const KOSApiIndependencePage = lazy(() => import('@/pages/kos-api-independence/page').then(m => ({ default: m.default })));

// KOS Ultra Lead Magnets™ — Hub 88
const KOSUltraLeadMagnetsPage = lazy(() => import('@/pages/kos-ultra-lead-magnets/page').then(m => ({ default: m.default })));

// KOS Regulatory Compliance Scanner™ — Hub 89
const KOSRegulatoryComplianceScannerPage = lazy(() => import('@/pages/kos-regulatory-compliance-scanner/page').then(m => ({ default: m.default })));

// KOS Autonomous AI & Media Command™ — Hub 90
const KOSAutonomousAIMediaPage = lazy(() => import('@/pages/kos-autonomous-ai-media/page').then(m => ({ default: m.default })));

// KOS SEO/AEO Public Command™ — Hub 91
const KOSSeoAeoPublicPage = lazy(() => import('@/pages/kos-seo-aeo-public/page').then(m => ({ default: m.default })));

// KOS Risk KRI Heatmap™ — Hub 92
const KOSRiskKriHeatmapPage = lazy(() => import('@/pages/kos-risk-kri-heatmap/page').then(m => ({ default: m.default })));

// KOS Legal & AI Governance Hub™ — Hub 93
const KOSLegalAIGovernancePage = lazy(() => import('@/pages/kos-legal-ai-governance/page').then(m => ({ default: m.default })));

// KOS Quality Innovation & Peer Review™ — Hub 94
const KOSQualityInnovationPage = lazy(() => import('@/pages/kos-quality-innovation/page').then(m => ({ default: m.default })));

// KOS Auto-Learning Engine™ — Hub 95
const KOSAutoLearningEnginePage = lazy(() => import('@/pages/kos-auto-learning-engine/page').then(m => ({ default: m.default })));

// KOS Auto-Learning & Agentic Development — PILLAR 2+3 Unified Command
const KOSAutoLearningAgenticPage = lazy(() => import('@/pages/kos-auto-learning-agentic/page').then(m => ({ default: m.default })));

// KOS Auto-Memorization — Centre de Commande Auto-Apprentissage & Auto-Correction
const KOSAutoMemorizationPage = lazy(() => import('@/pages/kos-auto-memorization/page').then(m => ({ default: m.default })));

// KOS Autonomous Regulatory Watch™ — Hub 96
const KOSAutonomousRegulatoryWatchPage = lazy(() => import('@/pages/kos-autonomous-regulatory-watch/page').then(m => ({ default: m.default })));

// KOS Autonomous Digital Marketing Command™ — Hub 97
const KOSAutonomousDigitalMarketingPage = lazy(() => import('@/pages/kos-autonomous-digital-marketing/page').then(m => ({ default: m.default })));

// KOS Autonomous Think Tank Factory™ — Hub 98
const KOSAutonomousThinkTankPage = lazy(() => import('@/pages/kos-autonomous-think-tank/page').then(m => ({ default: m.default })));

// KOS 150% Big Four Action Plan — 32 Actions J+365 Roadmap
const KOS150BigFourActionPlanPage = lazy(() => import('@/pages/kos-150-big-four-action-plan/page').then(m => ({ default: m.default })));
// KOS 150% Big Four Self-Development™ — Hub 99 (CAPSTONE)
const KOS150BigFourSelfDevelopmentPage = lazy(() => import('@/pages/kos-150-big-four-self-development/page').then(m => ({ default: m.default })));
// KOS Autonomous Knowledge Pipeline™ — [CRAWL]→[NORMALIZE]→[SEED]→[MEMEX]→[SWARM]→[EVAL]→[FLOW]
const KOSAutonomousKnowledgePipelinePage = lazy(() => import('@/pages/kos-autonomous-knowledge-pipeline/page').then(m => ({ default: m.default })));
// KOS Sovereign Init™ — Genesis Block — 5 Phases: CORE→FLOW→MEMEX→SWARM→AUDIT
const KOSSovereignInitPage = lazy(() => import('@/pages/kos-sovereign-init/page').then(m => ({ default: m.default })));

// KOS Total System Optimization Command™ — Hub 100 (OPTIMIZATION CAPSTONE)
const KOSTotalSystemOptimizationPage = lazy(() => import('@/pages/kos-total-system-optimization/page').then(m => ({ default: m.default })));

// KOS Regulatory Brain™ — Textes Réglementaires → Règles Exécutables (Hub 87)
const KOSRegulatoryBrainPage = lazy(() => import('@/pages/kos-regulatory-brain/page').then(m => ({ default: m.default })));

// KOS Workflow Orchestrator™ — Process Conformité → Workflows n8n (Hub 110)
const KOSWorkflowOrchestratorPage = lazy(() => import('@/pages/kos-workflow-orchestrator/page').then(m => ({ default: m.default })));

// KOS Senior Compliance Auditor™ — Audit Conformité COBAC CEMAC (Hub 111)
const KOSSeniorComplianceAuditorPage = lazy(() => import('@/pages/kos-senior-compliance-auditor/page').then(m => ({ default: m.default })));

// KOS Compliance Factory Engine™ — Usine de Conformité Automatisée (Hub 112)
const KOSComplianceFactoryEnginePage = lazy(() => import('@/pages/kos-compliance-factory-engine/page').then(m => ({ default: m.default })));

// KOS Website Automation Engine™ — Générateur de Sites Conformité Dynamiques (Hub 113)
const KOSWebsiteAutomationEnginePage = lazy(() => import('@/pages/kos-website-automation-engine/page').then(m => ({ default: m.default })));

// KOS Autonomous Compliance Pipeline™ — Full Automation Audit COBAC (Hub 114)
const KOSAutonomousCompliancePipelinePage = lazy(() => import('@/pages/kos-autonomous-compliance-pipeline/page').then(m => ({ default: m.default })));

// KOS Regulatory Data Architect™ — Architecture de Données Réglementaires Big Four (Hub 115)
const KOSRegulatoryDataArchitectPage = lazy(() => import('@/pages/kos-regulatory-data-architect/page').then(m => ({ default: m.default })));

// KOS Tests par Bloc Correctifs — Cockpit Unifié 150% Big Four
const KOSTestsParBlocPage = lazy(() => import('@/pages/kos-tests-par-bloc/page').then(m => ({ default: m.default })));

// KOS Transformation Office™ — Redesign Stratégique Consulting → Plateforme Intelligence (Hub 116)
const KOSTransformationOfficePage = lazy(() => import('@/pages/kos-transformation-office/page').then(m => ({ default: m.default })));

// KOS Auto-Expansion Academy™ — Université Autonome KHEPRA EXPERTS (Hub 117)
const KOSAutoExpansionAcademyPage = lazy(() => import('@/pages/kos-auto-expansion-academy/page').then(m => ({ default: m.default })));

// KOS Closing & Growth Engine™ — Aimants à Leads + IA Closing + Auto-Évolution (Hub 118)
const KOSClosingGrowthEnginePage = lazy(() => import('@/pages/kos-closing-growth-engine/page').then(m => ({ default: m.default })));

// KOS Regulatory Citation Validator™ — Agent dédié audit citations réglementaires (Hub 120)
const KOSRegulatoryCitationValidatorPage = lazy(() => import('@/pages/kos-regulatory-citation-validator/page').then(m => ({ default: m.default })));

// KOS Regulatory Health Dashboard™ — KPIs temps réel conformité réglementaire
const KOSRegulatoryHealthDashboardPage = lazy(() => import('@/pages/kos-regulatory-health/page').then(m => ({ default: m.default })));

// KOS ISO + Big Four Total Compliance & Quality Control™ — Cockpit Unifié (Hub 350)
const KOSISOBigFourTotalComplianceControlPage = lazy(() => import('@/pages/kos-iso-bigfour-total-compliance-control/page').then(m => ({ default: m.default })));

// KOS AI Upgrade Dashboard™ — KPIs Big Four + ISO 42001 (Hub 351)
const KOSAIUpgradeDashboardPage = lazy(() => import('@/pages/kos-ai-upgrade-dashboard/page').then(m => ({ default: m.default })));

// KOS ISO 42001 AI Governance Dashboard™ — Certification ISO 42001:2023 (Hub 420)
const KOSISO42001AIGovernancePage = lazy(() => import('@/pages/kos-iso-42001-ai-governance/page').then(m => ({ default: m.default })));

// KOS ISO 9001 Quality Management System™ — Certification ISO 9001:2015 (Hub 900)
const KOSISO9001QualityManagementPage = lazy(() => import('@/pages/kos-iso-9001-quality-management/page').then(m => ({ default: m.default })));

// KOS Africa Intelligence Command — Hub cross-régulateurs
const KOSAfricaIntelligenceCommandPage = lazy(() => import('@/pages/kos-africa-intelligence-command/page').then(m => ({ default: m.default })));

// KOS Enterprise Risk & Resilience — Hub 122
const KOSEnterpriseRiskResiliencePage = lazy(() => import('@/pages/kos-enterprise-risk-resilience/page').then(m => ({ default: m.default })));

// KOS Client Trust & Digital Authority — Hub 123
const KOSClientTrustDigitalAuthorityPage = lazy(() => import('@/pages/kos-client-trust-digital-authority/page').then(m => ({ default: m.default })));

// KOS AI Sovereignty & Ethics — Hub 124
const KOSAISovereigntyEthicsPage = lazy(() => import('@/pages/kos-ai-sovereignty-ethics/page').then(m => ({ default: m.default })));

// KOS Observatoire BCEAO UEMOA — BLOC du Master Audit (Hub 131)
const KOSObservatoireBCEAOPage = lazy(() => import('@/pages/kos-observatoire-bceao/page').then(m => ({ default: m.default })));

// KOS Observatoire BEAC/COBAC CEMAC — Miroir BCEAO (Hub 132)
const KOSObservatoireBEACPage = lazy(() => import('@/pages/kos-observatoire-beac/page').then(m => ({ default: m.default })));

// KOS Observatoire COBAC™ — BLOC 6 du Master Audit 12 Blocs (Hub 130)
const KOSObservatoireCOBACPage = lazy(() => import('@/pages/kos-observatoire-cobac/page').then(m => ({ default: m.default })));

// KOS Regulatory Observatory Africa™ — BLOC 11 (Hub 122)
const KOSRegulatoryObservatoryAfricaPage = lazy(() => import('@/pages/kos-regulatory-observatory-africa/page').then(m => ({ default: m.default })));

// KOS Knowledge Monetization Engine™ — Industrialisation & Vente Connaissances (Hub 121)
const KOSKnowledgeMonetizationEnginePage = lazy(() => import('@/pages/kos-knowledge-monetization-engine/page').then(m => ({ default: m.default })));

// KOS Genora Capitalization™ — Programme Big Four 15 Axes
const KOSGenoraCapitalizationPage = lazy(() => import('@/pages/kos-genora-capitalization/page').then(m => ({ default: m.default })));

// KOS Automation Engine (KAE) — Hub 121
const KOSAutomationEnginePage = lazy(() => import('@/pages/kos-automation-engine/page').then(m => ({ default: m.default })));

// KOS ODSKE Governance Dashboard™ — Hub 150
const KOSOdskeDashboardPage = lazy(() => import('@/pages/kos-odske-dashboard/page').then(m => ({ default: m.default })));

// KOS Corrective Action System™ — Hub 155
const KOSCorrectiveSystemDashboardPage = lazy(() => import('@/pages/kos-cas-dashboard/page').then(m => ({ default: m.default })));

// KOS Enterprise Transformation Assessment 360° — Audit Intégral 20 Axes
const KOSEnterpriseTransformationAssessment360Page = lazy(() => import('@/pages/kos-enterprise-transformation-assessment-360/page').then(m => ({ default: m.default })));

// KOS Corrective Action Blocks — Blocs d'Actions Correctives Optimisés
const KOSCorrectiveActionBlocksPage = lazy(() => import('@/pages/kos-corrective-action-blocks/page').then(m => ({ default: m.default })));

// KOS P0 Execution — Exécution Intégrale des 5 Blocs P0
const KOSP0ExecutionPage = lazy(() => import('@/pages/kos-p0-execution/page').then(m => ({ default: m.default })));

// KOS P1 Execution — Exécution Intégrale des 5 Blocs P1
const KOSP1ExecutionPage = lazy(() => import('@/pages/kos-p1-execution/page').then(m => ({ default: m.default })));

// KOS Tâches Restantes 100% Big Four + ISO — Gap Analysis Final
const KOSTasksRestantes100Page = lazy(() => import('@/pages/kos-tasks-restantes-100/page').then(m => ({ default: m.default })));

// KOS Production Sovereignty — Mise en Production Souveraine 100% Big Four + ISO
const KOSProductionSovereigntyPage = lazy(() => import('@/pages/kos-production-sovereignty/page').then(m => ({ default: m.default })));

// KOS Audit Final Analysis — Analyse Finale Tous Points d'Audit
const KOSAuditFinalAnalysisPage = lazy(() => import('@/pages/kos-audit-final-analysis/page').then(m => ({ default: m.default })));

// KOS Phase 1 P0 Immediate — 9 Actions Critiques · Lancement Immédiat
const KOSPhase1P0ImmediatePage = lazy(() => import('@/pages/kos-phase1-p0-immediate/page').then(m => ({ default: m.default })));

// KOS Phase 2 P0-P1 — Suite Logique Phase 1 · 13 Actions
const KOSPhase2P0P1Page = lazy(() => import('@/pages/kos-phase2-p0-p1/page').then(m => ({ default: m.default })));

// KOS Phase 3 Expansion — Domination Continentale · 8 Actions
const KOSPhase3ExpansionPage = lazy(() => import('@/pages/kos-phase3-expansion/page').then(m => ({ default: m.default })));

// KOS Executive Performance Cockpit — Big Four 03
const KOSExecutiveCockpitPage = lazy(() => import('@/pages/kos-executive-cockpit/page').then(m => ({ default: m.default })));

// KOS ISO 27001 Audit Report — Rapport d'Audit pour Soumission Externe
const KOSISO27001AuditReportPage = lazy(() => import('@/pages/kos-iso-27001-audit-report/page').then(m => ({ default: m.default })));

// KOS Security Dashboard — Monitoring ISO 27001 Edge Functions
const KOSSecurityDashboardPage = lazy(() => import('@/pages/kos-security-dashboard/page').then(m => ({ default: m.default })));

// KOS RLS Guardian Dashboard — Row Level Security Monitoring Temps Réel
const KOSRlsDashboardPage = lazy(() => import('@/pages/kos-rls-dashboard/page').then(m => ({ default: m.default })));

// KBR Dashboard — Khepra Business Review Editorial Command Center
const KBRDashboardPage = lazy(() => import('@/pages/kbr-dashboard/page').then(m => ({ default: m.default })));

// KBR Analytics — Pipeline Lead→MQL→SQL→Mission Dashboard
const KOSKBRAnalyticsPage = lazy(() => import('@/pages/kos-kbr-analytics/page').then(m => ({ default: m.default })));

// KOS Legislative Analyst — Centre d'Analyse d'Impact Réglementaire & Position Papers
const KOSLegislativeAnalystPage = lazy(() => import('@/pages/kos-legislative-analyst/page').then(m => ({ default: m.default })));

// KOS Scientific Director — Think Tank Command Center (Directeur Scientifique)
const KOSScientificDirectorPage = lazy(() => import('@/pages/kos-scientific-director/page').then(m => ({ default: m.default })));

// KOS Growth & Commercial Strategy — Directeur Stratégie Commerciale & Growth Premium
const KOSGrowthCommercialStrategyPage = lazy(() => import('@/pages/kos-growth-commercial-strategy/page').then(m => ({ default: m.default })));

// KOS Mass Infrastructure & Visibility Upgrade™ — Exécution Bloc 5 Domaines
const KOSMassInfraUpgradePage = lazy(() => import('@/pages/kos-mass-infra-upgrade/page').then(m => ({ default: m.default })));

// KOS CDO Innovation Command Center™ — Seeding Claude Agentique
const KOSCdoInnovationCommandPage = lazy(() => import('@/pages/kos-cdo-innovation-command/page').then(m => ({ default: m.default })));

// KOS Chief Agentic Architect Command Center™ — Architecte Systèmes Agentiques
const KOSChiefAgenticArchitectPage = lazy(() => import('@/pages/kos-chief-agentic-architect/page').then(m => ({ default: m.default })));

// KOS Enterprise Security & Resilience Command™ — ISO 27001 + OWASP + SOC 2
const KOSEnterpriseSecurityResiliencePage = lazy(() => import('@/pages/kos-enterprise-security-resilience/page').then(m => ({ default: m.default })));

// KOS RAG Full Seeding Command™ — Injection Massive Documents Réglementaires
const KOSRagFullSeedPage = lazy(() => import('@/pages/kos-rag-full-seed/page').then(m => ({ default: m.default })));

// P1-P5 Master Prompts Big Four
const KOSRagOrchestratorPage = lazy(() => import('@/pages/kos-rag-orchestrator/page').then(m => ({ default: m.default })));
const KOSAutoSeedingPage = lazy(() => import('@/pages/kos-auto-seeding/page').then(m => ({ default: m.default })));
const KOSSeoGeoEeatPage = lazy(() => import('@/pages/kos-seo-geo-eeat/page').then(m => ({ default: m.default })));
const KOSHbrGeneratorPage = lazy(() => import('@/pages/kos-hbr-generator/page').then(m => ({ default: m.default })));
const KOSQualityMonitorPage = lazy(() => import('@/pages/kos-quality-monitor/page').then(m => ({ default: m.default })));

// KOS Total Quality Review & Auto-Healing Auto-Expansion Command™
const KOSTotalQualityReviewPage = lazy(() => import('@/pages/kos-total-quality-review/page').then(m => ({ default: m.default })));

// KOS Test Engines — Diagnostic des 3 moteurs reconstruits
const KOSTestEnginesPage = lazy(() => import('@/pages/kos-test-engines/page').then(m => ({ default: m.default })));

// KOS Knowledge Capitalization Hub™ — Capitalisation documentaire 26 BLOCs + 67 docs métier
const KOSKnowledgeCapitalizationPage = lazy(() => import('@/pages/kos-knowledge-capitalization/page').then(m => ({ default: m.default })));

// KOS Zero-Defect Command Center™ — Cockpit Zéro-Défaut Unifié
const KOSZeroDefectCommandPage = lazy(() => import('@/pages/kos-zero-defect-command/page').then(m => ({ default: m.default })));

// KOS Big Four Governance OKR & Reporting Command Center™ — Pilotage Stratégique
const KOSBigFourGovOKRPage = lazy(() => import('@/pages/kos-big-four-gov-okr/page').then(m => ({ default: m.default })));

// KOS Predictive Auto-Correction Engine™ — Anticipation & Prévention des Défauts
const KOSPredictiveCorrectionEnginePage = lazy(() => import('@/pages/kos-predictive-correction-engine/page').then(m => ({ default: m.default })));

// KOS Auto-Knowledge Development™ — 3 Systèmes d'Auto-Développement Base Connaissances
const KOSAutoKnowledgeDevelopmentPage = lazy(() => import('@/pages/kos-auto-knowledge-development/page').then(m => ({ default: m.default })));

// KOS Agent Auto-Development™ — Auto-Développement des Agents (Hub 119)
const KOSAgentAutoDevelopmentPage = lazy(() => import('@/pages/kos-agent-auto-development/page').then(m => ({ default: m.default })));

// KOS Big Four Quality Governance — Gouvernance Qualité Big Four (Hub 120)
const KOSBigFourQualityGovernancePage = lazy(() => import('@/pages/kos-bigfour-quality-governance/page').then(m => ({ default: m.default })));

// KOS Bloc Total Compliance™ — Lancement Conformité 100% Big Four + 100% ISO
const KOSBlocTotalCompliancePage = lazy(() => import('@/pages/kos-bloc-total-compliance/page').then(m => ({ default: m.default })));

// KOS Compliance Engine v3.1 — 23+ Régulateurs + ISAE 3402
const KOSComplianceEngineV31Page = lazy(() => import('@/pages/kos-compliance-engine-v31/page').then(m => ({ default: m.default })));

// KOS Compliance Engine v4.0 — RAG Universel 285 Sources + Quadruple Ancrage
const KOSComplianceEngineV40Page = lazy(() => import('@/pages/kos-compliance-engine-v40/page').then(m => ({ default: m.default })));

// KOS-ALERT v4.1 — Veille Automatique RAG Universel + Alertes Email
const KOSAlertV41Page = lazy(() => import('@/pages/kos-alert-v41/page').then(m => ({ default: m.default })));
const KOSMasterPromptV50Page = lazy(() => import('@/pages/kos-master-prompt-v50/page').then(m => ({ default: m.default })));
// KOS Master Prompt v6.0 — Autonomous Sovereign
const KOSMasterPromptV60Page = lazy(() => import('@/pages/kos-master-prompt-v60/page').then(m => ({ default: m.default })));
// KOS-6.0 Sovereign Control Tower — Cockpit de Commandement Interactif
const KOSSovereignControlTowerPage = lazy(() => import('@/pages/kos-sovereign-control-tower/page').then(m => ({ default: m.default })));
const KOSUniversalCrawlerPage = lazy(() => import('@/pages/kos-universal-crawler/page').then(m => ({ default: m.default })));
// KOS Full Block Execution Command Center — Exécution en Bloc 3 Piliers
const KOSFullBlockExecutionPage = lazy(() => import('@/pages/kos-full-block-execution/page').then(m => ({ default: m.default })));
// KOS Big4 KHEPRA Architect v1.0 — Partner Knowledge & Innovation
const KOSBig4KhepraArchitectPage = lazy(() => import('@/pages/kos-big4-khepra-architect/page').then(m => ({ default: m.default })));
// KOS Agrément OS v1.0 — Pilotage Agrément IMF/EMF BCEAO-COBAC
const KOSAgrementOSPage = lazy(() => import('@/pages/kos-agrement-os/page').then(m => ({ default: m.default })));
// KOS REX Template v1.0 — Template Retour d'Expérience Standard Big Four
const KOSRexTemplatePage = lazy(() => import('@/pages/kos-rex-template/page').then(m => ({ default: m.default })));
// KOS Agrément OS Module 1 — Maturity Scan Go-Live
const KOSAgrementOSModule1Page = lazy(() => import('@/pages/kos-agrement-os-module-1/page').then(m => ({ default: m.default })));
// KOS Khepra Architect v2.0 — IA Stratège Knowledge Upgrade
const KOSKhepraArchitectPage = lazy(() => import('@/pages/kos-khepra-architect/page').then(m => ({ default: m.default })));
// KOS Full Seed Cockpit — Monitoring Production Big Four ISO
const KOSFullSeedCockpitPage = lazy(() => import('@/pages/kos-full-seed-cockpit/page').then(m => ({ default: m.default })));

// KOS Big Four Audit Execution — Rapport d'Audit 10 Phases
const KOSBigFourAuditExecutionPage = lazy(() => import('@/pages/kos-bigfour-audit-execution/page').then(m => ({ default: m.default })));

// KOS Big Four Audit — Dashboard Synthétique Scan Complet
const KOSBigFourAuditPage = lazy(() => import('@/pages/kos-bigfour-audit/page').then(m => ({ default: m.default })));

// KOS OAuth Security Corrections — Plan d'action 7 jours PKCE + WebView
const KOSOAuthSecurityCorrectionsPage = lazy(() => import('@/pages/kos-oauth-security-corrections/page').then(m => ({ default: m.default })));
const KOSOAuthDemoPage = lazy(() => import('@/pages/kos-oauth-demo/page').then(m => ({ default: m.default })));

// KOS Autonomous Orchestrator — Hermes + Genora + Big Four + Research Center
const KOSAutonomousOrchestratorPage = lazy(() => import('@/pages/kos-autonomous-orchestrator/page').then(m => ({ default: m.default })));

// KOS Cartographie Contrôles Automatisables — 102 contrôles COBAC/BCEAO/OHADA/GIABA/GABAC
const KOSCartographieControlesAutomatisablesPage = lazy(() => import('@/pages/kos-cartographie-controles-automatisables/page').then(m => ({ default: m.default })));

const RiskDashboardPage = lazy(() => import('@/pages/risk-dashboard/page').then(m => ({ default: m.default })));

const ESGDashboardPage = lazy(() => import('@/pages/esg-dashboard/page').then(m => ({ default: m.default })));

const NoteCADashboardPage = lazy(() => import('@/pages/note-ca/page').then(m => ({ default: m.default })));

// KOS Regulatory Chat — Assistant IA Réglementaire (public)

// KOS Search — Moteur de Recherche Réglementaire Public
const KOSSearchPage = lazy(() => import('@/pages/kos-search/page').then(m => ({ default: m.default })));

// KOS Cognitive OS — Dashboard Cognitif Réglementaire Big Four
const KOSCognitiveOSPage = lazy(() => import('@/pages/kos-cognitive-os/page').then(m => ({ default: m.default })));

// KOS-IA Agents War Room — Orchestration Agents IA Big Four
const KOSIAAgentsPage = lazy(() => import('@/pages/kos-ia-agents/page').then(m => ({ default: m.default })));

// KOS GMB OHADA — Google Business Profile 17 Pays
const KOSGmbOhadaPage = lazy(() => import('@/pages/kos-gmb-ohada/page').then(m => ({ default: m.default })));

const _kosRoutes: RouteObject[] = [
  { path: '/kos', element: <KOSLandingPage /> },
  { path: '/kos/', element: <KOSLandingPage /> },
  { path: '/agent-console', element: <AgentConsolePage /> },
  { path: '/agent-console/', element: <AgentConsolePage /> },
  { path: '/bceao', element: <BCEAODashboardPage /> },
  { path: '/bceao/', element: <BCEAODashboardPage /> },
  { path: '/cobac', element: <COBACDashboardPage /> },
  { path: '/cobac/', element: <COBACDashboardPage /> },
  { path: '/compliance-management', element: <ComplianceManagementPage /> },
  { path: '/compliance-management/', element: <ComplianceManagementPage /> },
  { path: '/executive-dashboard', element: <ExecutiveDashboardPage /> },
  { path: '/executive-dashboard/', element: <ExecutiveDashboardPage /> },
  { path: '/gafi', element: <GAFIDashboardPage /> },
  { path: '/gafi/', element: <GAFIDashboardPage /> },
  { path: '/khepra-os-2', element: <KOSAuthGuard><KhepraOS2HubPage /></KOSAuthGuard> },
  { path: '/khepra-os-2/', element: <KOSAuthGuard><KhepraOS2HubPage /></KOSAuthGuard> },
  { path: '/knowledge-hub', element: <KnowledgeHubPage /> },
  { path: '/knowledge-hub/', element: <KnowledgeHubPage /> },
  { path: '/kos-access', element: <KOSAccessPage /> },
  { path: '/kos-access/', element: <KOSAccessPage /> },
  { path: '/kos-agent-block-updates', element: <KOSAgentBlockUpdatesPage /> },
  { path: '/kos-agent-block-updates/', element: <KOSAgentBlockUpdatesPage /> },
  { path: '/kos-ai-governance-ethics', element: <KOSAIGovernanceEthicsPage /> },
  { path: '/kos-ai-governance-ethics/', element: <KOSAIGovernanceEthicsPage /> },
  { path: '/kos-ai-visibility-command', element: <KOSAIVisibilityCommandPage /> },
  { path: '/kos-ai-visibility-command/', element: <KOSAIVisibilityCommandPage /> },
  { path: '/kos-artifacts-architecture-governance', element: <KOSArtifactsArchitectureGovernancePage /> },
  { path: '/kos-artifacts-architecture-governance/', element: <KOSArtifactsArchitectureGovernancePage /> },
  { path: '/kos-artifacts-enterprise-command', element: <KOSArtifactsEnterpriseCommandPage /> },
  { path: '/kos-artifacts-enterprise-command/', element: <KOSArtifactsEnterpriseCommandPage /> },
  { path: '/kos-artifacts-growth-strategy', element: <KOSArtifactsGrowthStrategyPage /> },
  { path: '/kos-artifacts-growth-strategy/', element: <KOSArtifactsGrowthStrategyPage /> },
  { path: '/kos-artifacts-operational-excellence', element: <KOSArtifactsOperationalExcellencePage /> },
  { path: '/kos-artifacts-operational-excellence/', element: <KOSArtifactsOperationalExcellencePage /> },
  { path: '/kos-audit-ledger', element: <KOSAuditLedgerPage /> },
  { path: '/kos-audit-ledger/', element: <KOSAuditLedgerPage /> },
  { path: '/kos-auto-task-orchestrator', element: <KOSAutoTaskOrchestratorPage /> },
  { path: '/kos-auto-task-orchestrator/', element: <KOSAutoTaskOrchestratorPage /> },
  { path: '/kos-automation-factory', element: <KOSAutomationFactoryPage /> },
  { path: '/kos-automation-factory/', element: <KOSAutomationFactoryPage /> },
  { path: '/kos-automaton', element: <KOSAutomatonPage /> },
  { path: '/kos-automaton/', element: <KOSAutomatonPage /> },
  { path: '/kos-autonomous-growth-market', element: <KOSAutonomousGrowthMarketPage /> },
  { path: '/kos-autonomous-growth-market/', element: <KOSAutonomousGrowthMarketPage /> },
  { path: '/kos-autonomous-quality-system', element: <KOSAutonomousQualitySystemPage /> },
  { path: '/kos-autonomous-quality-system/', element: <KOSAutonomousQualitySystemPage /> },
  { path: '/kos-backlink-command', element: <KOSBacklinkCommandPage /> },
  { path: '/kos-backlink-command/', element: <KOSBacklinkCommandPage /> },
  { path: '/kos-backlink-intelligence-audit', element: <KOSBacklinkIntelligenceAuditPage /> },
  { path: '/kos-backlink-intelligence-audit/', element: <KOSBacklinkIntelligenceAuditPage /> },
  { path: '/kos-big-four-remediation', element: <KOSBigFourRemediationPage /> },
  { path: '/kos-big-four-remediation/', element: <KOSBigFourRemediationPage /> },
  { path: '/kos-block-execution', element: <KOSBlockExecutionPage /> },
  { path: '/kos-block-execution/', element: <KOSBlockExecutionPage /> },
  { path: '/kos-blog-writing-automates', element: <KOSBlogWritingAutomatesPage /> },
  { path: '/kos-blog-writing-automates/', element: <KOSBlogWritingAutomatesPage /> },
  { path: '/kos-business-opportunity-intelligence', element: <KOSBusinessOpportunityIntelligencePage /> },
  { path: '/kos-business-opportunity-intelligence/', element: <KOSBusinessOpportunityIntelligencePage /> },
  { path: '/kos-regulatory-legal-compliance-excellence', element: <KOSRegulatoryLegalComplianceExcellencePage /> },
  { path: '/kos-regulatory-legal-compliance-excellence/', element: <KOSRegulatoryLegalComplianceExcellencePage /> },
  { path: '/kos-transformation-program', element: <KOSTransformationProgramPage /> },
  { path: '/kos-transformation-program/', element: <KOSTransformationProgramPage /> },
  { path: '/kos-pmo-governance', element: <KOSPMOGovernancePage /> },
  { path: '/kos-pmo-governance/', element: <KOSPMOGovernancePage /> },
  { path: '/kos-knowledge-graph-enterprise', element: <KOSKnowledgeGraphBlocPage /> },
  { path: '/kos-knowledge-graph-enterprise/', element: <KOSKnowledgeGraphBlocPage /> },
  { path: '/kos-intelligence-center', element: <KOSIntelligenceCenterPage /> },
  { path: '/kos-intelligence-center/', element: <KOSIntelligenceCenterPage /> },
  { path: '/kos-geo-authority-engine', element: <KOSGEOAuthorityEnginePage /> },
  { path: '/kos-geo-authority-engine/', element: <KOSGEOAuthorityEnginePage /> },
  { path: '/kos-seo-big-four', element: <KOSSEOBigFourPage /> },
  { path: '/kos-seo-big-four/', element: <KOSSEOBigFourPage /> },
  { path: '/kos-ao-ami-intelligence', element: <KOSAOAMIPage /> },
  { path: '/kos-ao-ami-intelligence/', element: <KOSAOAMIPage /> },
  { path: '/kos-partnership-engine', element: <KOSPartnershipEnginePage /> },
  { path: '/kos-partnership-engine/', element: <KOSPartnershipEnginePage /> },
  { path: '/kos-expert-network', element: <KOSExpertNetworkPage /> },
  { path: '/kos-expert-network/', element: <KOSExpertNetworkPage /> },
  { path: '/kos-regulatory-excellence', element: <KOSRegulatoryExcellencePage /> },
  { path: '/kos-regulatory-excellence/', element: <KOSRegulatoryExcellencePage /> },
  { path: '/kos-business-development-engine', element: <KOSBusinessDevelopmentEnginePage /> },
  { path: '/kos-business-development-engine/', element: <KOSBusinessDevelopmentEnginePage /> },
  { path: '/kos-quality-risk-management', element: <KOSQualityRiskManagementPage /> },
  { path: '/kos-quality-risk-management/', element: <KOSQualityRiskManagementPage /> },
  { path: '/kos-closing-intelligence', element: <KOSClosingIntelligenceEnginePage /> },
  { path: '/kos-closing-intelligence/', element: <KOSClosingIntelligenceEnginePage /> },
  { path: '/kos-commandement-operationnel-unifie', element: <KOSCommandementOperationnelUnifiePage /> },
  { path: '/kos-commandement-operationnel-unifie/', element: <KOSCommandementOperationnelUnifiePage /> },
  { path: '/kos-commercial-marketing-automates', element: <KOSCommercialMarketingAutomatesPage /> },
  { path: '/kos-commercial-marketing-automates/', element: <KOSCommercialMarketingAutomatesPage /> },
  { path: '/kos-compliance-quality-max', element: <KOSComplianceQualityMaxPage /> },
  { path: '/kos-compliance-quality-max/', element: <KOSComplianceQualityMaxPage /> },
  { path: '/kos-constitution', element: <KOSConstitutionPage /> },
  { path: '/kos-constitution/', element: <KOSConstitutionPage /> },
  { path: '/kos-consulting-mission-factory', element: <KOSConsultingMissionFactoryPage /> },
  { path: '/kos-consulting-mission-factory/', element: <KOSConsultingMissionFactoryPage /> },
  { path: '/kos-content-correction-engine', element: <KOSAuthGuard><KOSContentCorrectionEnginePage /></KOSAuthGuard> },
  { path: '/kos-content-correction-engine/', element: <KOSAuthGuard><KOSContentCorrectionEnginePage /></KOSAuthGuard> },
  { path: '/kos-content-factory-command', element: <KOSContentFactoryCommandPage /> },
  { path: '/kos-content-factory-command/', element: <KOSContentFactoryCommandPage /> },
  { path: '/kos-content-calendar', element: <KOSContentCalendarPage /> },
  { path: '/kos-content-calendar/', element: <KOSContentCalendarPage /> },
  { path: '/kos-control-tower', element: <KOSControlTowerPage /> },
  { path: '/kos-control-tower/', element: <KOSControlTowerPage /> },
  { path: '/kos-control-tower-automation', element: <KOSControlTowerAutomationPage /> },
  { path: '/kos-control-tower-automation/', element: <KOSControlTowerAutomationPage /> },
  { path: '/kos-correction-engine', element: <KOSCorrectionEnginePage /> },
  { path: '/kos-correction-engine/', element: <KOSCorrectionEnginePage /> },
  { path: '/kos-blog-regulatory-correction-engine', element: <KOSBlogRegulatoryCorrectionEnginePage /> },
  { path: '/kos-blog-regulatory-correction-engine/', element: <KOSBlogRegulatoryCorrectionEnginePage /> },
  { path: '/kos-big-four-web-resources-review', element: <KOSBigFourWebResourcesReviewPage /> },
  { path: '/kos-big-four-web-resources-review/', element: <KOSBigFourWebResourcesReviewPage /> },
  { path: '/kos-corrective-execution-engine', element: <KOSAuthGuard><KOSCorrectiveExecutionEnginePage /></KOSAuthGuard> },
  { path: '/kos-corrective-execution-engine/', element: <KOSAuthGuard><KOSCorrectiveExecutionEnginePage /></KOSAuthGuard> },
  { path: '/kos-cyber-security-automates', element: <KOSCyberSecurityAutomatesPage /> },
  { path: '/kos-cyber-security-automates/', element: <KOSCyberSecurityAutomatesPage /> },
  { path: '/kos-cyber-tech-correction-engine', element: <KOSAuthGuard><KOSCyberTechCorrectionEnginePage /></KOSAuthGuard> },
  { path: '/kos-cyber-tech-correction-engine/', element: <KOSAuthGuard><KOSCyberTechCorrectionEnginePage /></KOSAuthGuard> },
  { path: '/kos-dashboard', element: <KOSDashboardPage /> },
  { path: '/kos-dashboard/', element: <KOSDashboardPage /> },
  { path: '/kos-data-analytics-process-mining', element: <KOSDataAnalyticsProcessMiningPage /> },
  { path: '/kos-data-analytics-process-mining/', element: <KOSDataAnalyticsProcessMiningPage /> },
  { path: '/kos-data-decision-command', element: <KOSDataDecisionCommandPage /> },
  { path: '/kos-data-decision-command/', element: <KOSDataDecisionCommandPage /> },
  { path: '/kos-data-governance', element: <KOSDataGovernancePage /> },
  { path: '/kos-data-governance/', element: <KOSDataGovernancePage /> },
  { path: '/kos-deployment-pipeline', element: <KOSDeploymentPipelinePage /> },
  { path: '/kos-deployment-pipeline/', element: <KOSDeploymentPipelinePage /> },
  { path: '/kos-diagnostic-360', element: <KOSDiagnostic360Page /> },
  { path: '/kos-diagnostic-360/', element: <KOSDiagnostic360Page /> },
  { path: '/kos-digital-growth-correction-engine', element: <KOSAuthGuard><KOSDigitalGrowthCorrectionEnginePage /></KOSAuthGuard> },
  { path: '/kos-digital-growth-correction-engine/', element: <KOSAuthGuard><KOSDigitalGrowthCorrectionEnginePage /></KOSAuthGuard> },
  { path: '/kos-enterprise-brain-os', element: <KOSEnterpriseBrainOSPage /> },
  { path: '/kos-enterprise-brain-os/', element: <KOSEnterpriseBrainOSPage /> },
  { path: '/kos-enterprise-data-model', element: <KOSEnterpriseDataModelPage /> },
  { path: '/kos-enterprise-data-model/', element: <KOSEnterpriseDataModelPage /> },
  { path: '/kos-enterprise-engine', element: <KOSEnterpriseEnginePage /> },
  { path: '/kos-enterprise-engine/', element: <KOSEnterpriseEnginePage /> },
  { path: '/kos-enterprise-governance-command', element: <KOSEnterpriseGovernanceCommandPage /> },
  { path: '/kos-enterprise-governance-command/', element: <KOSEnterpriseGovernanceCommandPage /> },
  { path: '/kos-enterprise-kpi-command', element: <KOSEnterpriseKPICommandPage /> },
  { path: '/kos-enterprise-kpi-command/', element: <KOSEnterpriseKPICommandPage /> },
  { path: '/kos-enterprise-os-core-command', element: <KOSEnterpriseOSCoreCommandPage /> },
  { path: '/kos-enterprise-os-core-command/', element: <KOSEnterpriseOSCoreCommandPage /> },
  { path: '/kos-executive-command', element: <KOSExecutiveCommandPage /> },
  { path: '/kos-executive-command/', element: <KOSExecutiveCommandPage /> },
  { path: '/kos-fullstack-dev-automates', element: <KOSFullstackDevAutomatesPage /> },
  { path: '/kos-fullstack-dev-automates/', element: <KOSFullstackDevAutomatesPage /> },
  { path: '/kos-global-agent-performance', element: <KOSGlobalAgentPerformancePage /> },
  { path: '/kos-global-agent-performance/', element: <KOSGlobalAgentPerformancePage /> },
  { path: '/kos-global-launch', element: <KOSGlobalLaunchPage /> },
  { path: '/kos-global-launch/', element: <KOSGlobalLaunchPage /> },
  { path: '/kos-governance-knowledge', element: <KOSGovernanceKnowledgePage /> },
  { path: '/kos-governance-knowledge/', element: <KOSGovernanceKnowledgePage /> },
  { path: '/kos-growth-intelligence-command', element: <KOSGrowthIntelligenceCommandPage /> },
  { path: '/kos-growth-intelligence-command/', element: <KOSGrowthIntelligenceCommandPage /> },
  { path: '/kos-growth-orchestrator', element: <KOSAuthGuard><KOSGrowthOrchestratorPage /></KOSAuthGuard> },
  { path: '/kos-growth-orchestrator/', element: <KOSAuthGuard><KOSGrowthOrchestratorPage /></KOSAuthGuard> },
  { path: '/kos-gsc-command', element: <KOSGSCCommandPage /> },
  { path: '/kos-gsc-command/', element: <KOSGSCCommandPage /> },
  { path: '/kos-innovation-esg-command', element: <KOSInnovationESGCommandPage /> },
  { path: '/kos-innovation-esg-command/', element: <KOSInnovationESGCommandPage /> },
  { path: '/kos-institutional-visibility', element: <KOSInstitutionalVisibilityPage /> },
  { path: '/kos-institutional-visibility/', element: <KOSInstitutionalVisibilityPage /> },
  { path: '/kos-interactive-tools-review', element: <KOSInteractiveToolsReviewPage /> },
  { path: '/kos-interactive-tools-review/', element: <KOSInteractiveToolsReviewPage /> },
  { path: '/kos-khepra-growth-engine', element: <KOSKhepraGrowthEnginePage /> },
  { path: '/kos-khepra-growth-engine/', element: <KOSKhepraGrowthEnginePage /> },
  { path: '/kos-knowledge-center', element: <KOSKnowledgeCenterPage /> },
  { path: '/kos-knowledge-center/', element: <KOSKnowledgeCenterPage /> },
  { path: '/kos-knowledge-graph', element: <KOSKnowledgeGraphPage /> },
  { path: '/kos-knowledge-graph/', element: <KOSKnowledgeGraphPage /> },
  { path: '/kos-knowledge-innovation-command', element: <KOSKnowledgeInnovationCommandPage /> },
  { path: '/kos-knowledge-innovation-command/', element: <KOSKnowledgeInnovationCommandPage /> },
  { path: '/kos-lead-scoring-command', element: <KOSLeadScoringCommandPage /> },
  { path: '/kos-lead-scoring-command/', element: <KOSLeadScoringCommandPage /> },
  { path: '/kos-leadership-agents', element: <KOSLeadershipAgentsPage /> },
  { path: '/kos-leadership-agents/', element: <KOSLeadershipAgentsPage /> },
  { path: '/kos-linkedin-distribution-program', element: <KOSLinkedInDistributionProgramPage /> },
  { path: '/kos-linkedin-distribution-program/', element: <KOSLinkedInDistributionProgramPage /> },
  { path: '/kos-linkedin-social-selling-engine', element: <KOSLinkedInSocialSellingEnginePage /> },
  { path: '/kos-linkedin-social-selling-engine/', element: <KOSLinkedInSocialSellingEnginePage /> },
  { path: '/kos-bu1-financial-regulation', element: <KOSBU1FinancialRegulationPage /> },
  { path: '/kos-bu1-financial-regulation/', element: <KOSBU1FinancialRegulationPage /> },
  { path: '/kos-bu2-governance-due-diligence', element: <KOSBU2GovernanceDueDiligencePage /> },
  { path: '/kos-bu2-governance-due-diligence/', element: <KOSBU2GovernanceDueDiligencePage /> },
  { path: '/kos-bu3-climate-esg', element: <KOSBU3ClimateESGPage /> },
  { path: '/kos-bu3-climate-esg/', element: <KOSBU3ClimateESGPage /> },
  { path: '/kos-bu4-kbr-model', element: <KOSBU4KBRModelPage /> },
  { path: '/kos-bu4-kbr-model/', element: <KOSBU4KBRModelPage /> },
  { path: '/kos-bu1-financial-regulation-en', element: <KOSBU1FinancialRegulationEnPage /> },
  { path: '/kos-bu1-financial-regulation-en/', element: <KOSBU1FinancialRegulationEnPage /> },
  { path: '/kos-bu2-governance-due-diligence-en', element: <KOSBU2GovernanceDueDiligenceEnPage /> },
  { path: '/kos-bu2-governance-due-diligence-en/', element: <KOSBU2GovernanceDueDiligenceEnPage /> },
  { path: '/kos-bu3-climate-esg-en', element: <KOSBU3ClimateESGEnPage /> },
  { path: '/kos-bu3-climate-esg-en/', element: <KOSBU3ClimateESGEnPage /> },
  { path: '/kos-bu4-kbr-model-en', element: <KOSBU4KBRModelEnPage /> },
  { path: '/kos-bu4-kbr-model-en/', element: <KOSBU4KBRModelEnPage /> },
  { path: '/kos-llm-experts-automates', element: <KOSLlmExpertsAutomatesPage /> },
  { path: '/kos-llm-experts-automates/', element: <KOSLlmExpertsAutomatesPage /> },
  { path: '/kos-llm-excellence-engine', element: <KOSLlmExcellenceEnginePage /> },
  { path: '/kos-llm-excellence-engine/', element: <KOSLlmExcellenceEnginePage /> },
  { path: '/kos-managing-partner-office', element: <KOSManagingPartnerOfficePage /> },
  { path: '/kos-managing-partner-office/', element: <KOSManagingPartnerOfficePage /> },
  { path: '/kos-market-intelligence-command', element: <KOSMarketIntelligenceCommandPage /> },
  { path: '/kos-market-intelligence-command/', element: <KOSMarketIntelligenceCommandPage /> },
  { path: '/kos-mdp-automator', element: <KOSAuthGuard><KOSMDPAutomatorPage /></KOSAuthGuard> },
  { path: '/kos-mdp-automator/', element: <KOSAuthGuard><KOSMDPAutomatorPage /></KOSAuthGuard> },
  { path: '/kos-orchestrator-engine', element: <KOSOrchestratorEnginePage /> },
  { path: '/kos-orchestrator-engine/', element: <KOSOrchestratorEnginePage /> },
  { path: '/kos-organisation-qualite-automates', element: <KOSOrganisationQualiteAutomatesPage /> },
  { path: '/kos-organisation-qualite-automates/', element: <KOSOrganisationQualiteAutomatesPage /> },
  { path: '/kos-performance-100-challenge', element: <KOSPerformance100ChallengePage /> },
  { path: '/kos-performance-100-challenge/', element: <KOSPerformance100ChallengePage /> },
  { path: '/kos-performance-core-command', element: <KOSPerformanceCoreCommandPage /> },
  { path: '/kos-performance-core-command/', element: <KOSPerformanceCoreCommandPage /> },
  { path: '/kos-performance-seo-command', element: <KOSPerformanceSEOCommandPage /> },
  { path: '/kos-performance-seo-command/', element: <KOSPerformanceSEOCommandPage /> },
  { path: '/kos-seo-perf-optimization', element: <KOSSEOPerfOptimizationPage /> },
  { path: '/kos-seo-perf-optimization/', element: <KOSSEOPerfOptimizationPage /> },
  { path: '/kos-production-command', element: <KOSProductionCommandPage /> },
  { path: '/kos-production-command/', element: <KOSProductionCommandPage /> },
  { path: '/kos-quality-excellence-command', element: <KOSQualityExcellenceCommandPage /> },
  { path: '/kos-quality-excellence-command/', element: <KOSQualityExcellenceCommandPage /> },
  { path: '/kos-referents-metiers-automates', element: <KOSReferentsMetiersAutomatesPage /> },
  { path: '/kos-referents-metiers-automates/', element: <KOSReferentsMetiersAutomatesPage /> },
  { path: '/kos-regulatory-compliance-audit', element: <KOSRegulatoryComplianceAuditPage /> },
  { path: '/kos-regulatory-compliance-audit/', element: <KOSRegulatoryComplianceAuditPage /> },
  { path: '/kos-regulatory-compliance-automates', element: <KOSRegulatoryComplianceAutomatesPage /> },
  { path: '/kos-regulatory-compliance-automates/', element: <KOSRegulatoryComplianceAutomatesPage /> },
  { path: '/kos-regulatory-compliance-engine', element: <KOSRegulatoryComplianceEnginePage /> },
  { path: '/kos-regulatory-compliance-engine/', element: <KOSRegulatoryComplianceEnginePage /> },
  { path: '/kos-regulatory-remediation-engine', element: <KOSRegulatoryRemediationEnginePage /> },
  { path: '/kos-regulatory-remediation-engine/', element: <KOSRegulatoryRemediationEnginePage /> },
  { path: '/kos-regulatory-intelligence-engine', element: <KOSRegulatoryIntelligenceCenterPage /> },
  { path: '/kos-regulatory-intelligence-engine/', element: <KOSRegulatoryIntelligenceCenterPage /> },
  { path: '/kos-digital-authority-engine', element: <KOSDigitalAuthorityEnginePage /> },
  { path: '/kos-digital-authority-engine/', element: <KOSDigitalAuthorityEnginePage /> },
  { path: '/kos-seo-performance-intelligence', element: <KOSSeoPerformanceIntelligencePage /> },
  { path: '/kos-seo-performance-intelligence/', element: <KOSSeoPerformanceIntelligencePage /> },
  { path: '/kos-domain-authority-intelligence', element: <KOSDomainAuthorityIntelligencePage /> },
  { path: '/kos-domain-authority-intelligence/', element: <KOSDomainAuthorityIntelligencePage /> },
  { path: '/kos-multi-agent-orchestration', element: <KOSMultiAgentOrchestrationPage /> },
  { path: '/kos-multi-agent-orchestration/', element: <KOSMultiAgentOrchestrationPage /> },
  { path: '/kos-big-four-maturity-assessment', element: <KOSBigFourMaturityAssessmentPage /> },
  { path: '/kos-big-four-maturity-assessment/', element: <KOSBigFourMaturityAssessmentPage /> },
  { path: '/kos-ai-compliance-fraud-intelligence', element: <KOSAIComplianceFraudIntelligencePage /> },
  { path: '/kos-ai-compliance-fraud-intelligence/', element: <KOSAIComplianceFraudIntelligencePage /> },
  { path: '/kos-francophone-africa-strategic-center', element: <KOSFrancophoneAfricaStrategicCenterPage /> },
  { path: '/kos-francophone-africa-strategic-center/', element: <KOSFrancophoneAfricaStrategicCenterPage /> },
  { path: '/kos-global-visibility-command', element: <KOSGlobalVisibilityCommandPage /> },
  { path: '/kos-global-visibility-command/', element: <KOSGlobalVisibilityCommandPage /> },
  { path: '/kos-esg-regulatory-alignment', element: <KOSESGRegulatoryAlignmentPage /> },
  { path: '/kos-esg-regulatory-alignment/', element: <KOSESGRegulatoryAlignmentPage /> },
  { path: '/kos-phase1-foundations-compliance', element: <KOSPhase1FoundationsCompliancePage /> },
  { path: '/kos-phase1-foundations-compliance/', element: <KOSPhase1FoundationsCompliancePage /> },
  { path: '/kos-research-institute', element: <KOSResearchInstitutePage /> },
  { path: '/kos-research-institute/', element: <KOSResearchInstitutePage /> },
  { path: '/kos-resource-command-center', element: <KOSAuthGuard><KOSResourceCommandCenterPage /></KOSAuthGuard> },
  { path: '/kos-resource-command-center/', element: <KOSAuthGuard><KOSResourceCommandCenterPage /></KOSAuthGuard> },
  { path: '/kos-risk-diligence-command', element: <KOSRiskDiligenceCommandPage /> },
  { path: '/kos-risk-diligence-command/', element: <KOSRiskDiligenceCommandPage /> },
  { path: '/kos-runtime', element: <KOSRuntimePage /> },
  { path: '/kos-runtime/', element: <KOSRuntimePage /> },
  { path: '/kos-schema-org-audit', element: <KOSSchemaOrgAuditPage /> },
  { path: '/kos-schema-org-audit/', element: <KOSSchemaOrgAuditPage /> },
  { path: '/kos-scientific-intelligence-enhancement', element: <KOSScientificIntelligenceEnhancementPage /> },
  { path: '/kos-scientific-intelligence-enhancement/', element: <KOSScientificIntelligenceEnhancementPage /> },
  { path: '/kos-security-command', element: <KOSSecurityCommandPage /> },
  { path: '/kos-security-command/', element: <KOSSecurityCommandPage /> },
  { path: '/kos-seo-aeo-command', element: <KOSSEOaeoCommandPage /> },
  { path: '/kos-seo-aeo-command/', element: <KOSSEOaeoCommandPage /> },
  { path: '/kos-seo-analytics-competitive', element: <KOSSeoAnalyticsCompetitivePage /> },
  { path: '/kos-seo-analytics-competitive/', element: <KOSSeoAnalyticsCompetitivePage /> },
  { path: '/kos-seo-autopilot', element: <KOSSeoAutopilotPage /> },
  { path: '/kos-seo-autopilot/', element: <KOSSeoAutopilotPage /> },
  { path: '/kos-seo-content-strategy', element: <KOSSeoContentStrategyPage /> },
  { path: '/kos-seo-content-strategy/', element: <KOSSeoContentStrategyPage /> },
  { path: '/kos-seo-cro-conversion', element: <KOSSeoCROConversionPage /> },
  { path: '/kos-seo-cro-conversion/', element: <KOSSeoCROConversionPage /> },
  { path: '/kos-seo-eeat-authority', element: <KOSSeoEEATAuthorityPage /> },
  { path: '/kos-seo-eeat-authority/', element: <KOSSeoEEATAuthorityPage /> },
  { path: '/kos-seo-international-multilingual', element: <KOSSeoInternationalMultilingualPage /> },
  { path: '/kos-seo-international-multilingual/', element: <KOSSeoInternationalMultilingualPage /> },
  { path: '/kos-seo-local-geo', element: <KOSSeoLocalGeoPage /> },
  { path: '/kos-seo-local-geo/', element: <KOSSeoLocalGeoPage /> },
  { path: '/kos-seo-onpage-content', element: <KOSSeoOnPageContentPage /> },
  { path: '/kos-seo-onpage-content/', element: <KOSSeoOnPageContentPage /> },
  { path: '/kos-seo-reporting-executive', element: <KOSSeoReportingExecutivePage /> },
  { path: '/kos-seo-reporting-executive/', element: <KOSSeoReportingExecutivePage /> },
  { path: '/kos-seo-social-authority', element: <KOSSeoSocialAuthorityPage /> },
  { path: '/kos-seo-social-authority/', element: <KOSSeoSocialAuthorityPage /> },
  { path: '/kos-social-media-command', element: <KOSSocialMediaCommandPage /> },
  { path: '/kos-social-media-command/', element: <KOSSocialMediaCommandPage /> },
  { path: '/kos-social-media-board', element: <KOSSocialMediaBoardPage /> },
  { path: '/kos-social-media-board/', element: <KOSSocialMediaBoardPage /> },
  { path: '/kos-social-publisher', element: <KOSSocialPublisherPage /> },
  { path: '/kos-social-publisher/', element: <KOSSocialPublisherPage /> },
  { path: '/youtube-callback', element: <YouTubeCallbackPage /> },
  { path: '/youtube-callback/', element: <YouTubeCallbackPage /> },
  { path: '/youtube-connect', element: <YouTubeConnectPage /> },
  { path: '/youtube-connect/', element: <YouTubeConnectPage /> },
  // TikTok OAuth
  { path: '/tiktok-callback', element: <TikTokCallbackPage /> },
  { path: '/tiktok-callback/', element: <TikTokCallbackPage /> },
  { path: '/tiktok-connect', element: <TikTokConnectPage /> },
  { path: '/tiktok-connect/', element: <TikTokConnectPage /> },
  { path: '/kos-multichannel-command', element: <KOSMultichannelCommandPage /> },
  { path: '/kos-multichannel-command/', element: <KOSMultichannelCommandPage /> },
  { path: '/kos-voice-ai-studio', element: <KOSVoiceAIStudioPage /> },
  { path: '/kos-voice-ai-studio/', element: <KOSVoiceAIStudioPage /> },
  { path: '/kos-community-manager-command', element: <KOSCommunityManagerCommandPage /> },
  { path: '/kos-community-manager-command/', element: <KOSCommunityManagerCommandPage /> },
  { path: '/kos-youtube-analytics', element: <KOSYouTubeAnalyticsPage /> },
  { path: '/kos-youtube-analytics/', element: <KOSYouTubeAnalyticsPage /> },
  { path: '/kos-strategic-intelligence', element: <KOSStrategicIntelligencePage /> },
  { path: '/kos-strategic-intelligence/', element: <KOSStrategicIntelligencePage /> },
  { path: '/kos-synchroniseur-maitre', element: <KOSMasterSynchronizerPage /> },
  { path: '/kos-synchroniseur-maitre/', element: <KOSMasterSynchronizerPage /> },
  { path: '/kos-tender-automates-audit', element: <KOSTenderAutomatesAuditPage /> },
  { path: '/kos-tender-automates-audit/', element: <KOSTenderAutomatesAuditPage /> },
  { path: '/kos-tender-intelligence', element: <KOSTenderIntelligencePage /> },
  { path: '/kos-tender-intelligence/', element: <KOSTenderIntelligencePage /> },
  { path: '/kos-think-tank-automates', element: <KOSThinkTankAutomatesPage /> },
  { path: '/kos-think-tank-automates/', element: <KOSThinkTankAutomatesPage /> },
  { path: '/kos-transformation-advisory-command', element: <KOSTransformationAdvisoryCommandPage /> },
  { path: '/kos-transformation-advisory-command/', element: <KOSTransformationAdvisoryCommandPage /> },
  { path: '/kos-transformation-esg-command', element: <KOSTransformationESGCommandPage /> },
  { path: '/kos-transformation-esg-command/', element: <KOSTransformationESGCommandPage /> },
  { path: '/kos-trust-center', element: <KOSTrustCenterPage /> },
  { path: '/kos-trust-center/', element: <KOSTrustCenterPage /> },
  { path: '/kos-unified-autopilot', element: <KOSUnifiedAutopilotPage /> },
  { path: '/kos-unified-autopilot/', element: <KOSUnifiedAutopilotPage /> },
  { path: '/kos-url-auto-pointage', element: <KOSUrlAutoPointagePage /> },
  { path: '/kos-url-auto-pointage/', element: <KOSUrlAutoPointagePage /> },
  { path: '/kos-web-operations-deployment', element: <KOSWebOperationsDeploymentPage /> },
  { path: '/kos-web-operations-deployment/', element: <KOSWebOperationsDeploymentPage /> },
  { path: '/kos-web-ops-automates', element: <KOSWebOpsAutomatesPage /> },
  { path: '/kos-web-ops-automates/', element: <KOSWebOpsAutomatesPage /> },
  { path: '/kos-strategic-positioning', element: <KOSStrategicPositioningPage /> },
  { path: '/kos-strategic-positioning/', element: <KOSStrategicPositioningPage /> },
  { path: '/kos-thought-leadership-center', element: <KOSThoughtLeadershipCenterPage /> },
  { path: '/kos-thought-leadership-center/', element: <KOSThoughtLeadershipCenterPage /> },
  { path: '/kos-africa-observatories', element: <KOSAfricaObservatoriesPage /> },
  { path: '/kos-africa-observatories/', element: <KOSAfricaObservatoriesPage /> },
  { path: '/ohada', element: <OHADADashboardPage /> },
  { path: '/ohada/', element: <OHADADashboardPage /> },
  { path: '/regulatory-intelligence', element: <RegulatoryIntelligenceDashboardPage /> },
  { path: '/regulatory-intelligence/', element: <RegulatoryIntelligenceDashboardPage /> },
  { path: '/think-tank', element: <ThinkTankPage /> },
  { path: '/think-tank/', element: <ThinkTankPage /> },
  { path: '/transfer-pricing', element: <TransferPricingPage /> },
  { path: '/transfer-pricing/', element: <TransferPricingPage /> },
  { path: '/kos-final-orchestration', element: <KOSFinalOrchestrationPage /> },
  { path: '/kos-final-orchestration/', element: <KOSFinalOrchestrationPage /> },
  { path: '/kos-production-go-live', element: <KOSProductionGoLivePage /> },
  { path: '/kos-production-go-live/', element: <KOSProductionGoLivePage /> },
  { path: '/kos-governance-formalization', element: <KOSGovernanceFormalizationPage /> },
  { path: '/kos-governance-formalization/', element: <KOSGovernanceFormalizationPage /> },
  { path: '/kos-compliance-security-certification', element: <KOSComplianceSecurityCertificationPage /> },
  { path: '/kos-compliance-security-certification/', element: <KOSComplianceSecurityCertificationPage /> },
  { path: '/kos-esg-sustainability-command', element: <KOSESGSustainabilityCommandPage /> },
  { path: '/kos-esg-sustainability-command/', element: <KOSESGSustainabilityCommandPage /> },
  { path: '/kos-digital-performance-command', element: <KOSDigitalPerformanceCommandPage /> },
  { path: '/kos-digital-performance-command/', element: <KOSDigitalPerformanceCommandPage /> },
  { path: '/kos-system-integrity-scanner', element: <KOSSystemIntegrityScannerPage /> },
  { path: '/kos-system-integrity-scanner/', element: <KOSSystemIntegrityScannerPage /> },
  { path: '/kos-scan-complet-execution', element: <KOSScanCompletExecutionPage /> },
  { path: '/kos-scan-complet-execution/', element: <KOSScanCompletExecutionPage /> },
  { path: '/kos-phase1-consolidation', element: <KOSPhase1ConsolidationPage /> },
  { path: '/kos-phase1-consolidation/', element: <KOSPhase1ConsolidationPage /> },
  { path: '/kos-phase2-securisation', element: <KOSPhase2SecurisationPage /> },
  { path: '/kos-phase2-securisation/', element: <KOSPhase2SecurisationPage /> },
  { path: '/kos-phase3-qualite', element: <KOSPhase3QualitePage /> },
  { path: '/kos-phase3-qualite/', element: <KOSPhase3QualitePage /> },
  { path: '/kos-phase4-go-live', element: <KOSPhase4GoLivePage /> },
  { path: '/kos-phase4-go-live/', element: <KOSPhase4GoLivePage /> },
  { path: '/kos-phase5-expansion', element: <KOSPhase5ExpansionPage /> },
  { path: '/kos-phase5-expansion/', element: <KOSPhase5ExpansionPage /> },
  { path: '/kos-phase6-innovation', element: <KOSPhase6InnovationPage /> },
  { path: '/kos-phase6-innovation/', element: <KOSPhase6InnovationPage /> },
  { path: '/kos-phase7-domination', element: <KOSPhase7DominationPage /> },
  { path: '/kos-phase7-domination/', element: <KOSPhase7DominationPage /> },
  { path: '/kos-phase8-singularite', element: <KOSPhase8SingularitePage /> },
  { path: '/kos-phase8-singularite/', element: <KOSPhase8SingularitePage /> },
  { path: '/kos-plan-consolidation-master-view', element: <KOSPlanConsolidationMasterViewPage /> },
  { path: '/kos-plan-consolidation-master-view/', element: <KOSPlanConsolidationMasterViewPage /> },
  { path: '/kos-cdo-engineering-command', element: <KOSCDOEngineeringCommandPage /> },
  { path: '/kos-cdo-engineering-command/', element: <KOSCDOEngineeringCommandPage /> },
  { path: '/kos-production-package-factory', element: <KOSProductionPackageFactoryPage /> },
  { path: '/kos-production-package-factory/', element: <KOSProductionPackageFactoryPage /> },
  { path: '/kos-sysops-health-resiliency-command', element: <KOSSysOpsHealthResiliencyCommandPage /> },
  { path: '/kos-sysops-health-resiliency-command/', element: <KOSSysOpsHealthResiliencyCommandPage /> },
  { path: '/kos-external-api-config-command', element: <KOSExternalApiConfigCommandPage /> },
  { path: '/kos-external-api-config-command/', element: <KOSExternalApiConfigCommandPage /> },
  { path: '/kos-youtube-autonomous-infrastructure', element: <KOSYoutubeAutonomousInfrastructurePage /> },
  { path: '/kos-youtube-autonomous-infrastructure/', element: <KOSYoutubeAutonomousInfrastructurePage /> },
  { path: '/kos-youtube-production-pipeline', element: <KOSYoutubeProductionPipelinePage /> },
  { path: '/kos-youtube-production-pipeline/', element: <KOSYoutubeProductionPipelinePage /> },
  { path: '/kos-youtube-system-scanner', element: <KOSYoutubeSystemScannerPage /> },
  { path: '/kos-youtube-system-scanner/', element: <KOSYoutubeSystemScannerPage /> },
  { path: '/kos-youtube-monitoring', element: <KOSYoutubeMonitoringPage /> },
  { path: '/kos-youtube-monitoring/', element: <KOSYoutubeMonitoringPage /> },
  { path: '/kos-youtube-download', element: <KOSYoutubeDownloadPage /> },
  { path: '/kos-youtube-download/', element: <KOSYoutubeDownloadPage /> },
  { path: '/kos-video-podcast-publishing-pack', element: <KOSVideoPodcastPublishingPackPage /> },
  { path: '/kos-video-podcast-publishing-pack/', element: <KOSVideoPodcastPublishingPackPage /> },
  { path: '/youtube-download-center', element: <YoutubeDownloadCenterPage /> },
  { path: '/youtube-download-center/', element: <YoutubeDownloadCenterPage /> },
  { path: '/youtube-pending', element: <YoutubePendingPage /> },
  { path: '/youtube-pending/', element: <YoutubePendingPage /> },
  { path: '/kos-total-governance-regulatory-excellence', element: <KOSTotalGovernanceRegulatoryExcellencePage /> },
  { path: '/kos-total-governance-regulatory-excellence/', element: <KOSTotalGovernanceRegulatoryExcellencePage /> },
  { path: '/kos-global-system-upgrade', element: <KOSGlobalSystemUpgradePage /> },
  { path: '/kos-global-system-upgrade/', element: <KOSGlobalSystemUpgradePage /> },
  { path: '/kos-youtube-hybrid-recovery', element: <KOSYoutubeHybridRecoveryPage /> },
  { path: '/kos-youtube-hybrid-recovery/', element: <KOSYoutubeHybridRecoveryPage /> },
  { path: '/kos-url-indexation-command', element: <KOSUrlIndexationCommandPage /> },
  { path: '/kos-url-indexation-command/', element: <KOSUrlIndexationCommandPage /> },
  { path: '/kos-banking-stack', element: <KOSBankingStackPage /> },
  { path: '/kos-banking-stack/', element: <KOSBankingStackPage /> },
  { path: '/kos-enterprise-consolidation', element: <KOSEnterpriseConsolidationPage /> },
  { path: '/kos-enterprise-consolidation/', element: <KOSEnterpriseConsolidationPage /> },
  { path: '/kos-120-big-four-upgrade', element: <KOS120BigFourUpgradePage /> },
  { path: '/kos-120-big-four-upgrade/', element: <KOS120BigFourUpgradePage /> },
  { path: '/kos-120-upg1-execution', element: <KOS120Upg1ExecutionPage /> },
  { path: '/kos-120-upg1-execution/', element: <KOS120Upg1ExecutionPage /> },
  { path: '/kos-120-upg2-execution', element: <KOS120Upg2ExecutionPage /> },
  { path: '/kos-120-upg2-execution/', element: <KOS120Upg2ExecutionPage /> },
  { path: '/kos-120-upg3-execution', element: <KOS120Upg3ExecutionPage /> },
  { path: '/kos-120-upg3-execution/', element: <KOS120Upg3ExecutionPage /> },
  { path: '/kos-120-upg4-execution', element: <KOS120Upg4ExecutionPage /> },
  { path: '/kos-120-upg4-execution/', element: <KOS120Upg4ExecutionPage /> },
  { path: '/kos-120-total-quality-audit', element: <KOS120TotalQualityAuditPage /> },
  { path: '/kos-120-total-quality-audit/', element: <KOS120TotalQualityAuditPage /> },
  { path: '/kos-audience-dashboard', element: <KOSAudienceDashboardPage /> },
  { path: '/kos-audience-dashboard/', element: <KOSAudienceDashboardPage /> },
  { path: '/kos-self-evolution', element: <KOSSelfEvolutionPage /> },
  { path: '/kos-self-evolution/', element: <KOSSelfEvolutionPage /> },
  { path: '/kos-proprietary-voice-factory', element: <KOSProprietaryVoiceFactoryPage /> },
  { path: '/kos-proprietary-voice-factory/', element: <KOSProprietaryVoiceFactoryPage /> },
  { path: '/kos-autonomous-stack', element: <KOSAutonomousStackPage /> },
  { path: '/kos-autonomous-stack/', element: <KOSAutonomousStackPage /> },
  { path: '/kos-knowledge-factory', element: <KOSKnowledgeFactoryPage /> },
  { path: '/kos-knowledge-factory/', element: <KOSKnowledgeFactoryPage /> },
  { path: '/kos-podcast-factory', element: <KOSPodcastFactoryPage /> },
  { path: '/kos-podcast-factory/', element: <KOSPodcastFactoryPage /> },
  { path: '/kos-interview-factory', element: <KOSInterviewFactoryPage /> },
  { path: '/kos-interview-factory/', element: <KOSInterviewFactoryPage /> },
  { path: '/kos-canva-factory', element: <KOSCanvaFactoryPage /> },
  { path: '/kos-canva-factory/', element: <KOSCanvaFactoryPage /> },
  { path: '/kos-powerpoint-factory', element: <KOSPowerPointFactoryPage /> },
  { path: '/kos-powerpoint-factory/', element: <KOSPowerPointFactoryPage /> },
  { path: '/kos-video-factory', element: <KOSVideoFactoryPage /> },
  { path: '/kos-video-factory/', element: <KOSVideoFactoryPage /> },
  { path: '/kos-voice-factory', element: <KOSVoiceFactoryPage /> },
  { path: '/kos-voice-factory/', element: <KOSVoiceFactoryPage /> },
  { path: '/kos-youtube-factory', element: <KOSYouTubeFactoryPage /> },
  { path: '/kos-youtube-factory/', element: <KOSYouTubeFactoryPage /> },
  { path: '/kos-autonomous-media-command-center', element: <KOSAutonomousMediaCommandCenterPage /> },
  { path: '/kos-autonomous-media-command-center/', element: <KOSAutonomousMediaCommandCenterPage /> },
  { path: '/kos-ultimate-cockpit', element: <KOSUltimateCockpitPage /> },
  { path: '/kos-ultimate-cockpit/', element: <KOSUltimateCockpitPage /> },
  { path: '/kos-war-room', element: <KOSWarRoomPage /> },
  { path: '/kos-war-room/', element: <KOSWarRoomPage /> },
  { path: '/kos-zero-budget-sprint', element: <KOSZeroBudgetSprintPage /> },
  { path: '/kos-zero-budget-sprint/', element: <KOSZeroBudgetSprintPage /> },
  { path: '/kos-zero-budget-sprint-2', element: <KOSZeroBudgetSprint2Page /> },
  { path: '/kos-zero-budget-sprint-2/', element: <KOSZeroBudgetSprint2Page /> },
  { path: '/kos-budget-unleashed-sprint', element: <KOSBudgetUnleashedSprintPage /> },
  { path: '/kos-budget-unleashed-sprint/', element: <KOSBudgetUnleashedSprintPage /> },
  { path: '/kos-full-system-security-scan', element: <KOSFullSystemSecurityScanPage /> },
  { path: '/kos-full-system-security-scan/', element: <KOSFullSystemSecurityScanPage /> },
  { path: '/kos-complete-performance-visibility-120-upgrade', element: <KOSCompletePerformanceVisibility120UpgradePage /> },
  { path: '/kos-complete-performance-visibility-120-upgrade/', element: <KOSCompletePerformanceVisibility120UpgradePage /> },
  { path: '/kos-api-independence', element: <KOSApiIndependencePage /> },
  { path: '/kos-api-independence/', element: <KOSApiIndependencePage /> },
  { path: '/kos-ultra-lead-magnets', element: <KOSUltraLeadMagnetsPage /> },
  { path: '/kos-ultra-lead-magnets/', element: <KOSUltraLeadMagnetsPage /> },
  { path: '/kos-regulatory-compliance-scanner', element: <KOSRegulatoryComplianceScannerPage /> },
  { path: '/kos-regulatory-compliance-scanner/', element: <KOSRegulatoryComplianceScannerPage /> },
  { path: '/kos-autonomous-ai-media', element: <KOSAutonomousAIMediaPage /> },
  { path: '/kos-autonomous-ai-media/', element: <KOSAutonomousAIMediaPage /> },
  { path: '/kos-seo-aeo-public', element: <KOSSeoAeoPublicPage /> },
  { path: '/kos-seo-aeo-public/', element: <KOSSeoAeoPublicPage /> },
  { path: '/kos-risk-kri-heatmap', element: <KOSRiskKriHeatmapPage /> },
  { path: '/kos-risk-kri-heatmap/', element: <KOSRiskKriHeatmapPage /> },
  { path: '/kos-legal-ai-governance', element: <KOSLegalAIGovernancePage /> },
  { path: '/kos-legal-ai-governance/', element: <KOSLegalAIGovernancePage /> },
  { path: '/kos-quality-innovation', element: <KOSQualityInnovationPage /> },
  { path: '/kos-quality-innovation/', element: <KOSQualityInnovationPage /> },
  { path: '/kos-auto-learning-agentic', element: <KOSAutoLearningAgenticPage /> },
  { path: '/kos-auto-learning-agentic/', element: <KOSAutoLearningAgenticPage /> },
  { path: '/kos-auto-learning-engine', element: <KOSAutoLearningEnginePage /> },
  { path: '/kos-auto-learning-engine/', element: <KOSAutoLearningEnginePage /> },
  { path: '/kos-auto-memorization', element: <KOSAutoMemorizationPage /> },
  { path: '/kos-auto-memorization/', element: <KOSAutoMemorizationPage /> },
  { path: '/kos-autonomous-regulatory-watch', element: <KOSAutonomousRegulatoryWatchPage /> },
  { path: '/kos-autonomous-regulatory-watch/', element: <KOSAutonomousRegulatoryWatchPage /> },
  { path: '/kos-autonomous-digital-marketing', element: <KOSAutonomousDigitalMarketingPage /> },
  { path: '/kos-autonomous-digital-marketing/', element: <KOSAutonomousDigitalMarketingPage /> },
  { path: '/kos-autonomous-think-tank', element: <KOSAutonomousThinkTankPage /> },
  { path: '/kos-autonomous-think-tank/', element: <KOSAutonomousThinkTankPage /> },
  { path: '/kos-150-big-four-action-plan', element: <KOS150BigFourActionPlanPage /> },
  { path: '/kos-150-big-four-action-plan/', element: <KOS150BigFourActionPlanPage /> },
  { path: '/kos-150-big-four-self-development', element: <KOS150BigFourSelfDevelopmentPage /> },
  { path: '/kos-150-big-four-self-development/', element: <KOS150BigFourSelfDevelopmentPage /> },
  { path: '/kos-autonomous-knowledge-pipeline', element: <KOSAutonomousKnowledgePipelinePage /> },
  { path: '/kos-autonomous-knowledge-pipeline/', element: <KOSAutonomousKnowledgePipelinePage /> },
  { path: '/kos-sovereign-init', element: <KOSSovereignInitPage /> },
  { path: '/kos-sovereign-init/', element: <KOSSovereignInitPage /> },
  { path: '/kos-total-system-optimization', element: <KOSTotalSystemOptimizationPage /> },
  { path: '/kos-total-system-optimization/', element: <KOSTotalSystemOptimizationPage /> },
  { path: '/kos-regulatory-brain', element: <KOSRegulatoryBrainPage /> },
  { path: '/kos-regulatory-brain/', element: <KOSRegulatoryBrainPage /> },
  { path: '/kos-workflow-orchestrator', element: <KOSWorkflowOrchestratorPage /> },
  { path: '/kos-workflow-orchestrator/', element: <KOSWorkflowOrchestratorPage /> },
  { path: '/kos-senior-compliance-auditor', element: <KOSSeniorComplianceAuditorPage /> },
  { path: '/kos-senior-compliance-auditor/', element: <KOSSeniorComplianceAuditorPage /> },
  { path: '/kos-compliance-factory-engine', element: <KOSComplianceFactoryEnginePage /> },
  { path: '/kos-compliance-factory-engine/', element: <KOSComplianceFactoryEnginePage /> },
  { path: '/kos-website-automation-engine', element: <KOSWebsiteAutomationEnginePage /> },
  { path: '/kos-website-automation-engine/', element: <KOSWebsiteAutomationEnginePage /> },
  { path: '/kos-autonomous-compliance-pipeline', element: <KOSAutonomousCompliancePipelinePage /> },
  { path: '/kos-autonomous-compliance-pipeline/', element: <KOSAutonomousCompliancePipelinePage /> },
  { path: '/kos-regulatory-data-architect', element: <KOSRegulatoryDataArchitectPage /> },
  { path: '/kos-regulatory-data-architect/', element: <KOSRegulatoryDataArchitectPage /> },
  { path: '/kos-tests-par-bloc', element: <KOSTestsParBlocPage /> },
  { path: '/kos-tests-par-bloc/', element: <KOSTestsParBlocPage /> },
  { path: '/kos-transformation-office', element: <KOSTransformationOfficePage /> },
  { path: '/kos-transformation-office/', element: <KOSTransformationOfficePage /> },
  { path: '/strategie-digitale', element: <StrategieDigitalePage /> },
  { path: '/strategie-digitale/', element: <StrategieDigitalePage /> },
  { path: '/kos-auto-expansion-academy', element: <KOSAutoExpansionAcademyPage /> },
  { path: '/kos-auto-expansion-academy/', element: <KOSAutoExpansionAcademyPage /> },
  { path: '/kos-closing-growth-engine', element: <KOSClosingGrowthEnginePage /> },
  { path: '/kos-closing-growth-engine/', element: <KOSClosingGrowthEnginePage /> },
  { path: '/kos-regulatory-citation-validator', element: <KOSRegulatoryCitationValidatorPage /> },
  { path: '/kos-regulatory-citation-validator/', element: <KOSRegulatoryCitationValidatorPage /> },
  { path: '/kos-regulatory-health', element: <KOSRegulatoryHealthDashboardPage /> },
  { path: '/kos-regulatory-health/', element: <KOSRegulatoryHealthDashboardPage /> },
  { path: '/kos-iso-bigfour-total-compliance-control', element: <KOSISOBigFourTotalComplianceControlPage /> },
  { path: '/kos-iso-bigfour-total-compliance-control/', element: <KOSISOBigFourTotalComplianceControlPage /> },
  { path: '/kos-ai-upgrade-dashboard', element: <KOSAIUpgradeDashboardPage /> },
  { path: '/kos-ai-upgrade-dashboard/', element: <KOSAIUpgradeDashboardPage /> },
  { path: '/kos-knowledge-monetization-engine', element: <KOSKnowledgeMonetizationEnginePage /> },
  { path: '/kos-knowledge-monetization-engine/', element: <KOSKnowledgeMonetizationEnginePage /> },
  { path: '/kos-regulatory-observatory-africa', element: <KOSRegulatoryObservatoryAfricaPage /> },
  { path: '/kos-regulatory-observatory-africa/', element: <KOSRegulatoryObservatoryAfricaPage /> },
  { path: '/kos-enterprise-risk-resilience', element: <KOSEnterpriseRiskResiliencePage /> },
  { path: '/kos-enterprise-risk-resilience/', element: <KOSEnterpriseRiskResiliencePage /> },
  { path: '/kos-client-trust-digital-authority', element: <KOSClientTrustDigitalAuthorityPage /> },
  { path: '/kos-client-trust-digital-authority/', element: <KOSClientTrustDigitalAuthorityPage /> },
  { path: '/kos-ai-sovereignty-ethics', element: <KOSAISovereigntyEthicsPage /> },
  { path: '/kos-ai-sovereignty-ethics/', element: <KOSAISovereigntyEthicsPage /> },
  { path: '/kos-africa-intelligence-command', element: <KOSAfricaIntelligenceCommandPage /> },
  { path: '/kos-africa-intelligence-command/', element: <KOSAfricaIntelligenceCommandPage /> },
  { path: '/kos-observatoire-bceao', element: <KOSObservatoireBCEAOPage /> },
  { path: '/kos-observatoire-bceao/', element: <KOSObservatoireBCEAOPage /> },
  { path: '/kos-observatoire-beac', element: <KOSObservatoireBEACPage /> },
  { path: '/kos-observatoire-beac/', element: <KOSObservatoireBEACPage /> },
  { path: '/kos-observatoire-cobac', element: <KOSObservatoireCOBACPage /> },
  { path: '/kos-observatoire-cobac/', element: <KOSObservatoireCOBACPage /> },
  { path: '/kos-automation-engine', element: <KOSAutomationEnginePage /> },
  { path: '/kos-automation-engine/', element: <KOSAutomationEnginePage /> },
  { path: '/kos-odske-dashboard', element: <KOSOdskeDashboardPage /> },
  { path: '/kos-odske-dashboard/', element: <KOSOdskeDashboardPage /> },
  { path: '/kos-cas-dashboard', element: <KOSCorrectiveSystemDashboardPage /> },
  { path: '/kos-cas-dashboard/', element: <KOSCorrectiveSystemDashboardPage /> },
  { path: '/kos-enterprise-transformation-assessment-360', element: <KOSEnterpriseTransformationAssessment360Page /> },
  { path: '/kos-enterprise-transformation-assessment-360/', element: <KOSEnterpriseTransformationAssessment360Page /> },
  { path: '/kos-corrective-action-blocks', element: <KOSCorrectiveActionBlocksPage /> },
  { path: '/kos-corrective-action-blocks/', element: <KOSCorrectiveActionBlocksPage /> },
  { path: '/kos-p0-execution', element: <KOSP0ExecutionPage /> },
  { path: '/kos-p0-execution/', element: <KOSP0ExecutionPage /> },
  { path: '/kos-p1-execution', element: <KOSP1ExecutionPage /> },
  { path: '/kos-p1-execution/', element: <KOSP1ExecutionPage /> },
  { path: '/kos-tasks-restantes-100', element: <KOSTasksRestantes100Page /> },
  { path: '/kos-tasks-restantes-100/', element: <KOSTasksRestantes100Page /> },
  { path: '/kos-production-sovereignty', element: <KOSProductionSovereigntyPage /> },
  { path: '/kos-production-sovereignty/', element: <KOSProductionSovereigntyPage /> },
  { path: '/kos-audit-final-analysis', element: <KOSAuditFinalAnalysisPage /> },
  { path: '/kos-audit-final-analysis/', element: <KOSAuditFinalAnalysisPage /> },
  { path: '/kos-phase1-p0-immediate', element: <KOSPhase1P0ImmediatePage /> },
  { path: '/kos-phase1-p0-immediate/', element: <KOSPhase1P0ImmediatePage /> },
  { path: '/kos-phase2-p0-p1', element: <KOSPhase2P0P1Page /> },
  { path: '/kos-phase2-p0-p1/', element: <KOSPhase2P0P1Page /> },
  { path: '/kos-phase3-expansion', element: <KOSPhase3ExpansionPage /> },
  { path: '/kos-phase3-expansion/', element: <KOSPhase3ExpansionPage /> },
  { path: '/kos-executive-cockpit', element: <KOSExecutiveCockpitPage /> },
  { path: '/kos-executive-cockpit/', element: <KOSExecutiveCockpitPage /> },
  { path: '/kos-iso-27001-audit-report', element: <KOSISO27001AuditReportPage /> },
  { path: '/kos-iso-27001-audit-report/', element: <KOSISO27001AuditReportPage /> },
  { path: '/kos-iso-42001-ai-governance', element: <KOSISO42001AIGovernancePage /> },
  { path: '/kos-iso-42001-ai-governance/', element: <KOSISO42001AIGovernancePage /> },
  { path: '/kos-iso-9001-quality-management', element: <KOSISO9001QualityManagementPage /> },
  { path: '/kos-iso-9001-quality-management/', element: <KOSISO9001QualityManagementPage /> },
  { path: '/kos-security-dashboard', element: <KOSSecurityDashboardPage /> },
  { path: '/kos-security-dashboard/', element: <KOSSecurityDashboardPage /> },
  { path: '/kos-rls-dashboard', element: <KOSRlsDashboardPage /> },
  { path: '/kos-rls-dashboard/', element: <KOSRlsDashboardPage /> },
  { path: '/kbr-dashboard', element: <KBRDashboardPage /> },
  { path: '/kbr-dashboard/', element: <KBRDashboardPage /> },
  { path: '/kos-kbr-analytics', element: <KOSKBRAnalyticsPage /> },
  { path: '/kos-kbr-analytics/', element: <KOSKBRAnalyticsPage /> },
  { path: '/kos-legislative-analyst', element: <KOSLegislativeAnalystPage /> },
  { path: '/kos-legislative-analyst/', element: <KOSLegislativeAnalystPage /> },
  { path: '/kos-scientific-director', element: <KOSScientificDirectorPage /> },
  { path: '/kos-scientific-director/', element: <KOSScientificDirectorPage /> },
  { path: '/kos-growth-commercial-strategy', element: <KOSGrowthCommercialStrategyPage /> },
  { path: '/kos-growth-commercial-strategy/', element: <KOSGrowthCommercialStrategyPage /> },
  { path: '/kos-mass-infra-upgrade', element: <KOSMassInfraUpgradePage /> },
  { path: '/kos-mass-infra-upgrade/', element: <KOSMassInfraUpgradePage /> },
  { path: '/kos-cdo-innovation-command', element: <KOSCdoInnovationCommandPage /> },
  { path: '/kos-cdo-innovation-command/', element: <KOSCdoInnovationCommandPage /> },
  { path: '/kos-chief-agentic-architect', element: <KOSChiefAgenticArchitectPage /> },
  { path: '/kos-chief-agentic-architect/', element: <KOSChiefAgenticArchitectPage /> },
  { path: '/kos-enterprise-security-resilience', element: <KOSEnterpriseSecurityResiliencePage /> },
  { path: '/kos-enterprise-security-resilience/', element: <KOSEnterpriseSecurityResiliencePage /> },
  { path: '/kos-rag-full-seed', element: <KOSRagFullSeedPage /> },
  { path: '/kos-rag-full-seed/', element: <KOSRagFullSeedPage /> },
  // P1-P5 Master Prompts
  { path: '/kos-rag-orchestrator', element: <KOSRagOrchestratorPage /> },
  { path: '/kos-rag-orchestrator/', element: <KOSRagOrchestratorPage /> },
  { path: '/kos-auto-seeding', element: <KOSAutoSeedingPage /> },
  { path: '/kos-auto-seeding/', element: <KOSAutoSeedingPage /> },
  { path: '/kos-seo-geo-eeat', element: <KOSSeoGeoEeatPage /> },
  { path: '/kos-seo-geo-eeat/', element: <KOSSeoGeoEeatPage /> },
  { path: '/kos-hbr-generator', element: <KOSHbrGeneratorPage /> },
  { path: '/kos-hbr-generator/', element: <KOSHbrGeneratorPage /> },
  { path: '/kos-quality-monitor', element: <KOSQualityMonitorPage /> },
  { path: '/kos-quality-monitor/', element: <KOSQualityMonitorPage /> },
  { path: '/kos-total-quality-review', element: <KOSTotalQualityReviewPage /> },
  { path: '/kos-total-quality-review/', element: <KOSTotalQualityReviewPage /> },
  { path: '/kos-test-engines', element: <KOSTestEnginesPage /> },
  { path: '/kos-test-engines/', element: <KOSTestEnginesPage /> },
  { path: '/kos-genora-capitalization', element: <KOSGenoraCapitalizationPage /> },
  { path: '/kos-genora-capitalization/', element: <KOSGenoraCapitalizationPage /> },
  { path: '/kos-knowledge-capitalization', element: <KOSKnowledgeCapitalizationPage /> },
  { path: '/kos-knowledge-capitalization/', element: <KOSKnowledgeCapitalizationPage /> },
  { path: '/kos-full-upgrade-compliance', element: <KOSFullUpgradeCompliancePage /> },
  { path: '/kos-full-upgrade-compliance/', element: <KOSFullUpgradeCompliancePage /> },
  { path: '/kos-zero-defect-command', element: <KOSAuthGuard><KOSZeroDefectCommandPage /></KOSAuthGuard> },
  { path: '/kos-zero-defect-command/', element: <KOSAuthGuard><KOSZeroDefectCommandPage /></KOSAuthGuard> },
  { path: '/kos-big-four-gov-okr', element: <KOSBigFourGovOKRPage /> },
  { path: '/kos-big-four-gov-okr/', element: <KOSBigFourGovOKRPage /> },
  { path: '/kos-predictive-correction-engine', element: <KOSPredictiveCorrectionEnginePage /> },
  { path: '/kos-predictive-correction-engine/', element: <KOSPredictiveCorrectionEnginePage /> },
  { path: '/kos-agent-auto-development', element: <KOSAgentAutoDevelopmentPage /> },
  { path: '/kos-agent-auto-development/', element: <KOSAgentAutoDevelopmentPage /> },
  { path: '/kos-bigfour-quality-governance', element: <KOSBigFourQualityGovernancePage /> },
  { path: '/kos-bigfour-quality-governance/', element: <KOSBigFourQualityGovernancePage /> },
  { path: '/kos-bloc-total-compliance', element: <KOSBlocTotalCompliancePage /> },
  { path: '/kos-bloc-total-compliance/', element: <KOSBlocTotalCompliancePage /> },
  { path: '/kos-compliance-engine-v31', element: <KOSComplianceEngineV31Page /> },
  { path: '/kos-compliance-engine-v31/', element: <KOSComplianceEngineV31Page /> },
  { path: '/kos-compliance-engine-v40', element: <KOSComplianceEngineV40Page /> },
  { path: '/kos-compliance-engine-v40/', element: <KOSComplianceEngineV40Page /> },
  { path: '/kos-alert-v41', element: <KOSAlertV41Page /> },
  { path: '/kos-alert-v41/', element: <KOSAlertV41Page /> },
  { path: '/kos-master-prompt-v50', element: <KOSMasterPromptV50Page /> },
  { path: '/kos-master-prompt-v50/', element: <KOSMasterPromptV50Page /> },
  { path: '/kos-master-prompt-v60', element: <KOSMasterPromptV60Page /> },
  { path: '/kos-master-prompt-v60/', element: <KOSMasterPromptV60Page /> },
  { path: '/kos-sovereign-control-tower', element: <KOSSovereignControlTowerPage /> },
  { path: '/kos-sovereign-control-tower/', element: <KOSSovereignControlTowerPage /> },
  { path: '/kos-universal-crawler', element: <KOSUniversalCrawlerPage /> },
  { path: '/kos-universal-crawler/', element: <KOSUniversalCrawlerPage /> },
  { path: '/kos-full-block-execution', element: <KOSFullBlockExecutionPage /> },
  { path: '/kos-full-block-execution/', element: <KOSFullBlockExecutionPage /> },
  { path: '/kos-big4-khepra-architect', element: <KOSBig4KhepraArchitectPage /> },
  { path: '/kos-big4-khepra-architect/', element: <KOSBig4KhepraArchitectPage /> },
  { path: '/kos-agrement-os', element: <KOSAgrementOSPage /> },
  { path: '/kos-agrement-os/', element: <KOSAgrementOSPage /> },
  { path: '/kos-rex-template', element: <KOSRexTemplatePage /> },
  { path: '/kos-rex-template/', element: <KOSRexTemplatePage /> },
  { path: '/kos-agrement-os-module-1', element: <KOSAgrementOSModule1Page /> },
  { path: '/kos-agrement-os-module-1/', element: <KOSAgrementOSModule1Page /> },
  { path: '/kos-khepra-architect', element: <KOSKhepraArchitectPage /> },
  { path: '/kos-khepra-architect/', element: <KOSKhepraArchitectPage /> },
  { path: '/kos-search', element: <KOSSearchPage /> },
  { path: '/kos-search/', element: <KOSSearchPage /> },
  { path: '/kos-cognitive-os', element: <KOSCognitiveOSPage /> },
  { path: '/kos-cognitive-os/', element: <KOSCognitiveOSPage /> },
  { path: '/kos-ia-agents', element: <KOSIAAgentsPage /> },
  { path: '/kos-ia-agents/', element: <KOSIAAgentsPage /> },
  { path: '/kos-gmb-ohada', element: <KOSGmbOhadaPage /> },
  { path: '/kos-gmb-ohada/', element: <KOSGmbOhadaPage /> },
  { path: '/kos-bigfour-audit-execution', element: <KOSBigFourAuditExecutionPage /> },
  { path: '/kos-bigfour-audit-execution/', element: <KOSBigFourAuditExecutionPage /> },
  { path: '/kos-bigfour-audit', element: <KOSBigFourAuditPage /> },
  { path: '/kos-bigfour-audit/', element: <KOSBigFourAuditPage /> },
  { path: '/kos-oauth-security-corrections', element: <KOSOAuthSecurityCorrectionsPage /> },
  { path: '/kos-oauth-security-corrections/', element: <KOSOAuthSecurityCorrectionsPage /> },
  { path: '/kos-oauth-demo', element: <KOSOAuthDemoPage /> },
  { path: '/kos-oauth-demo/', element: <KOSOAuthDemoPage /> },
  { path: '/kos-full-seed-cockpit', element: <KOSFullSeedCockpitPage /> },
  { path: '/kos-full-seed-cockpit/', element: <KOSFullSeedCockpitPage /> },
  { path: '/kos-regtech-dashboard', element: <KOSRegtechDashboardPage /> },
  { path: '/kos-regtech-dashboard/', element: <KOSRegtechDashboardPage /> },
  { path: '/kos-regtech-ai/video-control', element: <KOSVideoControlCenterPage /> },
  { path: '/kos-regtech-ai/video-control/', element: <KOSVideoControlCenterPage /> },
  { path: '/kos-bigfour-executive-memo', element: <KOSBigFourExecutiveMemoPage /> },
  { path: '/kos-bigfour-executive-memo/', element: <KOSBigFourExecutiveMemoPage /> },
  { path: '/kos-corpus-ingest', element: <KOSCorpusIngestPage /> },
  { path: '/kos-corpus-ingest/', element: <KOSCorpusIngestPage /> },
  { path: '/kos-correctives-dashboard', element: <KOSCorrectivesDashboardPage /> },
  { path: '/kos-correctives-dashboard/', element: <KOSCorrectivesDashboardPage /> },
  { path: '/kos-data-leakage-corrector', element: <KOSDataLeakageCorrectorPage /> },
  { path: '/kos-data-leakage-corrector/', element: <KOSDataLeakageCorrectorPage /> },
  { path: '/kos-regulatory-obligations', element: <KOSRegulatoryObligationsDashboardPage /> },
  { path: '/kos-regulatory-obligations/', element: <KOSRegulatoryObligationsDashboardPage /> },
  { path: '/kos-autonomous-orchestrator', element: <KOSAutonomousOrchestratorPage /> },
  { path: '/kos-autonomous-orchestrator/', element: <KOSAutonomousOrchestratorPage /> },
  { path: '/kos-regulatory-chat', element: <KOSRegulatoryChatPage /> },
  { path: '/kos-regulatory-chat/', element: <KOSRegulatoryChatPage /> },
  { path: '/kos-cartographie-controles-automatisables', element: <KOSCartographieControlesAutomatisablesPage /> },
  { path: '/kos-cartographie-controles-automatisables/', element: <KOSCartographieControlesAutomatisablesPage /> },
  { path: '/kos-auto-knowledge-development', element: <KOSAutoKnowledgeDevelopmentPage /> },
  { path: '/kos-auto-knowledge-development/', element: <KOSAutoKnowledgeDevelopmentPage /> },
  { path: '/risk-dashboard', element: <RiskDashboardPage /> },
  { path: '/esg-dashboard', element: <ESGDashboardPage /> },
  { path: '/esg-dashboard/', element: <ESGDashboardPage /> },
  { path: '/note-ca', element: <NoteCADashboardPage /> },
  { path: '/note-ca/', element: <NoteCADashboardPage /> },
];

// Applique KOSAuthGuard à toutes les routes sauf /kos-access (login) et /kos (landing)
const PUBLIC_KOS_PATHS = new Set(['/kos-access', '/kos-access/', '/kos', '/kos/', '/youtube-connect', '/youtube-connect/', '/youtube-callback', '/youtube-callback/', '/tiktok-connect', '/tiktok-connect/', '/tiktok-callback', '/tiktok-callback/', '/youtube-pending', '/youtube-pending/', '/youtube-download-center', '/youtube-download-center/', '/kos-regulatory-health', '/kos-regulatory-health/', '/kos-iso-27001-audit-report', '/kos-iso-27001-audit-report/', '/kos-iso-42001-ai-governance', '/kos-iso-42001-ai-governance/', '/kos-iso-9001-quality-management', '/kos-iso-9001-quality-management/', '/kos-security-dashboard', '/kos-security-dashboard/', '/kbr-dashboard', '/kbr-dashboard/', '/kos-kbr-analytics', '/kos-kbr-analytics/', '/kos-legislative-analyst', '/kos-legislative-analyst/', '/kos-scientific-director', '/kos-scientific-director/', '/kos-growth-commercial-strategy', '/kos-growth-commercial-strategy/', '/kos-mass-infra-upgrade', '/kos-mass-infra-upgrade/', '/kos-cdo-innovation-command', '/kos-cdo-innovation-command/', '/kos-chief-agentic-architect', '/kos-chief-agentic-architect/', '/kos-enterprise-security-resilience', '/kos-enterprise-security-resilience/', '/kos-rag-full-seed', '/kos-rag-full-seed/', '/kos-total-quality-review', '/kos-total-quality-review/', '/kos-test-engines', '/kos-test-engines/', '/kos-genora-capitalization', '/kos-genora-capitalization/', '/kos-knowledge-capitalization', '/kos-knowledge-capitalization/', '/kos-full-upgrade-compliance', '/kos-full-upgrade-compliance/', '/kos-bu1-financial-regulation', '/kos-bu1-financial-regulation/', '/kos-bu2-governance-due-diligence', '/kos-bu2-governance-due-diligence/', '/kos-bu3-climate-esg', '/kos-bu3-climate-esg/', '/kos-bu4-kbr-model', '/kos-bu4-kbr-model/', '/kos-bu1-financial-regulation-en', '/kos-bu1-financial-regulation-en/', '/kos-bu2-governance-due-diligence-en', '/kos-bu2-governance-due-diligence-en/', '/kos-bu3-climate-esg-en', '/kos-bu3-climate-esg-en/', '/kos-bu4-kbr-model-en', '/kos-bu4-kbr-model-en/', '/kos-auto-memorization', '/kos-auto-memorization/', '/kos-auto-learning-agentic', '/kos-auto-learning-agentic/', '/kos-auto-learning-engine', '/kos-auto-learning-engine/', '/kos-self-evolution', '/kos-self-evolution/', '/kos-big-four-gov-okr', '/kos-big-four-gov-okr/', '/kos-predictive-correction-engine', '/kos-predictive-correction-engine/', '/kos-agent-auto-development', '/kos-agent-auto-development/', '/kos-bigfour-quality-governance', '/kos-bigfour-quality-governance/', '/kos-bloc-total-compliance', '/kos-bloc-total-compliance/',
  '/kos-rag-orchestrator', '/kos-rag-orchestrator/',
  '/kos-auto-seeding', '/kos-auto-seeding/',
  '/kos-seo-geo-eeat', '/kos-seo-geo-eeat/',
  '/kos-hbr-generator', '/kos-hbr-generator/',
  '/kos-quality-monitor', '/kos-quality-monitor/',
  '/kos-compliance-engine-v31', '/kos-compliance-engine-v31/',
  '/kos-compliance-engine-v40', '/kos-compliance-engine-v40/',
  '/kos-alert-v41', '/kos-alert-v41/',
  '/kos-master-prompt-v50', '/kos-master-prompt-v50/',
  '/kos-master-prompt-v60', '/kos-master-prompt-v60/',
  '/kos-sovereign-control-tower', '/kos-sovereign-control-tower/',
  '/kos-universal-crawler', '/kos-universal-crawler/',
  '/kos-khepra-architect', '/kos-khepra-architect/',
  '/kos-full-seed-cockpit', '/kos-full-seed-cockpit/',
  '/kos-auto-knowledge-development', '/kos-auto-knowledge-development/',
  '/kos-regulatory-chat', '/kos-regulatory-chat/',
  '/kos-cartographie-controles-automatisables', '/kos-cartographie-controles-automatisables/',
  '/kos-ai-upgrade-dashboard', '/kos-ai-upgrade-dashboard/',
  '/kos-search', '/kos-search/',
  '/kos-cognitive-os', '/kos-cognitive-os/',
  '/kos-ia-agents', '/kos-ia-agents/',
  '/kos-gmb-ohada', '/kos-gmb-ohada/',
  '/kos-bigfour-audit-execution', '/kos-bigfour-audit-execution/',
  '/kos-bigfour-audit', '/kos-bigfour-audit/',
  '/kos-oauth-security-corrections', '/kos-oauth-security-corrections/',
  '/kos-oauth-demo', '/kos-oauth-demo/',
]);
export const kosRoutes: RouteObject[] = _kosRoutes.map(route => ({
  ...route,
  element: PUBLIC_KOS_PATHS.has(route.path || '') ? route.element : <KOSAuthGuard>{route.element}</KOSAuthGuard>,
}));
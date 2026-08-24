import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import authGuard from '@/components/feature/authGuard';

// KOS Regulatory Chat — Assistant IA Réglementaire BCEAO/COBAC/CIMA/GAFI/OHADA
const regulatoryChatPage = lazy(() => import('@/pages/kos-regulatory-chat/page').then(m => ({ default: m.default })));

// KOS RegTech Dashboard — KYC Screening + Compliance Monitor + Audit Trail (Hub 128)
const regtechDashboardPage = lazy(() => import('@/pages/kos-regtech-dashboard/page').then(m => ({ default: m.default })));

// KOS Video Control Center — Orchestration Pipeline Vidéo Agentique (Hub 134)
const videoControlCenterPage = lazy(() => import('@/pages/kos-regtech-ai/video-control/page').then(m => ({ default: m.default })));

// KOS Big Four Executive Memo Engine — Format Deloitte/EY/KPMG/PwC (Hub 129)
const bigFourExecutiveMemoPage = lazy(() => import('@/pages/kos-bigfour-executive-memo/page').then(m => ({ default: m.default })));

// KOS Corpus Ingest — Upload PDF réglementaire → kos_regulatory_corpus (Hub 130)
const corpusIngestPage = lazy(() => import('@/pages/kos-corpus-ingest/page').then(m => ({ default: m.default })));

// KOS Correctives Dashboard — Monitoring Prix de Transfert UEMOA/CEMAC (Hub 131)
const correctivesDashboardPage = lazy(() => import('@/pages/kos-correctives-dashboard/page').then(m => ({ default: m.default })));

// KOS Data Leakage Corrector — ISO 27001/42001 RAG Filter (Hub 132)
const dataLeakageCorrectorPage = lazy(() => import('@/pages/kos-data-leakage-corrector/page').then(m => ({ default: m.default })));

// KOS Regulatory Obligations Dashboard — Suivi Obligations BCEAO & Matrice de Risques (Hub 133)
const regulatoryObligationsDashboardPage = lazy(() => import('@/pages/kos-regulatory-obligations/page').then(m => ({ default: m.default })));

// TikTok OAuth — Connexion & Callback
const TikTokConnectPage = lazy(() => import('@/pages/tiktok-connect/page').then(m => ({ default: m.default })));
const TikTokCallbackPage = lazy(() => import('@/pages/tiktok-callback/page').then(m => ({ default: m.default })));

// YouTube Callback OAuth Proxy
const YouTubeCallbackPage = lazy(() => import('@/pages/youtube-callback/page').then(m => ({ default: m.default })));

// YouTube Connect OAuth
const YouTubeConnectPage = lazy(() => import('@/pages/youtube-connect/page').then(m => ({ default: m.default })));

// KOS Multichannel Command
const multichannelCommandPage = lazy(() => import('@/pages/kos-multichannel-command/page').then(m => ({ default: m.default })));

// KOS Voice AI Studio — Agent 4
const voiceAIStudioPage = lazy(() => import('@/pages/kos-voice-ai-studio/page').then(m => ({ default: m.default })));

// KOS Community Manager Command — Agent 8
const communityManagerCommandPage = lazy(() => import('@/pages/kos-community-manager-command/page').then(m => ({ default: m.default })));

// KOS YouTube Analytics — Agent 9
const youTubeAnalyticsPage = lazy(() => import('@/pages/kos-youtube-analytics/page').then(m => ({ default: m.default })));

// Dashboard Central
const dashboardPage = lazy(() => import('@/pages/kos-dashboard/page').then(m => ({ default: m.default })));

// Phase 4 — 7 Hubs
const managingPartnerOfficePage = lazy(() => import('@/pages/kos-managing-partner-office/page').then(m => ({ default: m.default })));
const consultingMissionFactoryPage = lazy(() => import('@/pages/kos-consulting-mission-factory/page').then(m => ({ default: m.default })));
const riskDiligenceCommandPage = lazy(() => import('@/pages/kos-risk-diligence-command/page').then(m => ({ default: m.default })));
const transformationESGCommandPage = lazy(() => import('@/pages/kos-transformation-esg-command/page').then(m => ({ default: m.default })));
const enterpriseBrainOSPage = lazy(() => import('@/pages/kos-enterprise-brain-os/page').then(m => ({ default: m.default })));
const autonomousGrowthMarketPage = lazy(() => import('@/pages/kos-autonomous-growth-market/page').then(m => ({ default: m.default })));
const controlTowerAutomationPage = lazy(() => import('@/pages/kos-control-tower-automation/page').then(m => ({ default: m.default })));
const tenderIntelligencePage = lazy(() => import('@/pages/kos-tender-intelligence/page').then(m => ({ default: m.default })));
const tenderAutomatesAuditPage = lazy(() => import('@/pages/kos-tender-automates-audit/page').then(m => ({ default: m.default })));

// Phase 5 — 2 Hubs
const dataAnalyticsProcessMiningPage = lazy(() => import('@/pages/kos-data-analytics-process-mining/page').then(m => ({ default: m.default })));
const aIGovernanceEthicsPage = lazy(() => import('@/pages/kos-ai-governance-ethics/page').then(m => ({ default: m.default })));

// Enterprise+ — 6 Hubs
const executiveCommandPage = lazy(() => import('@/pages/kos-executive-command/page').then(m => ({ default: m.default })));
const innovationESGCommandPage = lazy(() => import('@/pages/kos-innovation-esg-command/page').then(m => ({ default: m.default })));
const growthIntelligenceCommandPage = lazy(() => import('@/pages/kos-growth-intelligence-command/page').then(m => ({ default: m.default })));
const enterpriseOSCoreCommandPage = lazy(() => import('@/pages/kos-enterprise-os-core-command/page').then(m => ({ default: m.default })));
const transformationAdvisoryCommandPage = lazy(() => import('@/pages/kos-transformation-advisory-command/page').then(m => ({ default: m.default })));

// Phase 3 — Hyper-Automation — 6 Hubs
const qualityExcellenceCommandPage = lazy(() => import('@/pages/kos-quality-excellence-command/page').then(m => ({ default: m.default })));
const knowledgeInnovationCommandPage = lazy(() => import('@/pages/kos-knowledge-innovation-command/page').then(m => ({ default: m.default })));
const marketIntelligenceCommandPage = lazy(() => import('@/pages/kos-market-intelligence-command/page').then(m => ({ default: m.default })));
const dataDecisionCommandPage = lazy(() => import('@/pages/kos-data-decision-command/page').then(m => ({ default: m.default })));
const enterpriseGovernanceCommandPage = lazy(() => import('@/pages/kos-enterprise-governance-command/page').then(m => ({ default: m.default })));
const performanceCoreCommandPage = lazy(() => import('@/pages/kos-performance-core-command/page').then(m => ({ default: m.default })));

// Artifacts Factory
const artifactsArchitectureGovernancePage = lazy(() => import('@/pages/kos-artifacts-architecture-governance/page').then(m => ({ default: m.default })));
const artifactsOperationalExcellencePage = lazy(() => import('@/pages/kos-artifacts-operational-excellence/page').then(m => ({ default: m.default })));
const artifactsGrowthStrategyPage = lazy(() => import('@/pages/kos-artifacts-growth-strategy/page').then(m => ({ default: m.default })));
const artifactsEnterpriseCommandPage = lazy(() => import('@/pages/kos-artifacts-enterprise-command/page').then(m => ({ default: m.default })));
const enterpriseKPICommandPage = lazy(() => import('@/pages/kos-enterprise-kpi-command/page').then(m => ({ default: m.default })));

// Automata Big Four
const gSCCommandPage = lazy(() => import('@/pages/kos-gsc-command/page').then(m => ({ default: m.default })));
const securityCommandPage = lazy(() => import('@/pages/kos-security-command/page').then(m => ({ default: m.default })));
const leadScoringCommandPage = lazy(() => import('@/pages/kos-lead-scoring-command/page').then(m => ({ default: m.default })));
const backlinkCommandPage = lazy(() => import('@/pages/kos-backlink-command/page').then(m => ({ default: m.default })));

// Claude Integration
const strategicIntelligencePage = lazy(() => import('@/pages/kos-strategic-intelligence/page').then(m => ({ default: m.default })));
const productionCommandPage = lazy(() => import('@/pages/kos-production-command/page').then(m => ({ default: m.default })));
const governanceKnowledgePage = lazy(() => import('@/pages/kos-governance-knowledge/page').then(m => ({ default: m.default })));

// Autonomous
const growthOrchestratorPage = lazy(() => import('@/pages/kos-growth-orchestrator/page').then(m => ({ default: m.default })));
const agentBlockUpdatesPage = lazy(() => import('@/pages/kos-agent-block-updates/page').then(m => ({ default: m.default })));
const unifiedAutopilotPage = lazy(() => import('@/pages/kos-unified-autopilot/page').then(m => ({ default: m.default })));
const orchestratorEnginePage = lazy(() => import('@/pages/kos-orchestrator-engine/page').then(m => ({ default: m.default })));
const correctiveExecutionEnginePage = lazy(() => import('@/pages/kos-corrective-execution-engine/page').then(m => ({ default: m.default })));
const contentCorrectionEnginePage = lazy(() => import('@/pages/kos-content-correction-engine/page').then(m => ({ default: m.default })));
const cyberTechCorrectionEnginePage = lazy(() => import('@/pages/kos-cyber-tech-correction-engine/page').then(m => ({ default: m.default })));
const digitalGrowthCorrectionEnginePage = lazy(() => import('@/pages/kos-digital-growth-correction-engine/page').then(m => ({ default: m.default })));
const autonomousQualitySystemPage = lazy(() => import('@/pages/kos-autonomous-quality-system/page').then(m => ({ default: m.default })));
const resourceCommandCenterPage = lazy(() => import('@/pages/kos-resource-command-center/page').then(m => ({ default: m.default })));
const fullUpgradeCompliancePage = lazy(() => import('@/pages/kos-full-upgrade-compliance/page').then(m => ({ default: m.default })));
const mDPAutomatorPage = lazy(() => import('@/pages/kos-mdp-automator/page').then(m => ({ default: m.default })));
const autoTaskOrchestratorPage = lazy(() => import('@/pages/kos-auto-task-orchestrator/page').then(m => ({ default: m.default })));
const webOperationsDeploymentPage = lazy(() => import('@/pages/kos-web-operations-deployment/page').then(m => ({ default: m.default })));

// Automaton, AI, Social, SEO
const automatonPage = lazy(() => import('@/pages/kos-automaton/page').then(m => ({ default: m.default })));
const aIVisibilityCommandPage = lazy(() => import('@/pages/kos-ai-visibility-command/page').then(m => ({ default: m.default })));
const socialMediaCommandPage = lazy(() => import('@/pages/kos-social-media-command/page').then(m => ({ default: m.default })));
const socialMediaBoardPage = lazy(() => import('@/pages/kos-social-media-board/page').then(m => ({ default: m.default })));
const socialPublisherPage = lazy(() => import('@/pages/kos-social-publisher/page').then(m => ({ default: m.default })));
const sEOaeoCommandPage = lazy(() => import('@/pages/kos-seo-aeo-command/page').then(m => ({ default: m.default })));

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
const urlAutoPointagePage = lazy(() => import('@/pages/kos-url-auto-pointage/page').then(m => ({ default: m.default })));

// Performance & SEO Command Center
const performanceSEOCommandPage = lazy(() => import('@/pages/kos-performance-seo-command/page').then(m => ({ default: m.default })));

// SEO & Performance Optimization Cockpit — Hub 128
const sEOPerfOptimizationPage = lazy(() => import('@/pages/kos-seo-perf-optimization/page').then(m => ({ default: m.default })));

// Correction Engine
const correctionEnginePage = lazy(() => import('@/pages/kos-correction-engine/page').then(m => ({ default: m.default })));
const blogRegulatoryCorrectionEnginePage = lazy(() => import('@/pages/kos-blog-regulatory-correction-engine/page').then(m => ({ default: m.default })));
const bigFourWebResourcesReviewPage = lazy(() => import('@/pages/kos-big-four-web-resources-review/page').then(m => ({ default: m.default })));

// LinkedIn Distribution Program
const linkedInDistributionProgramPage = lazy(() => import('@/pages/kos-linkedin-distribution-program/page').then(m => ({ default: m.default })));
// LinkedIn Social Selling Engine — Master Prompt Big Four
const linkedInSocialSellingEnginePage = lazy(() => import('@/pages/kos-linkedin-social-selling-engine/page').then(m => ({ default: m.default })));

// LinkedIn BU Positioning Pages — Optimisées pour partage LinkedIn
const bU1FinancialRegulationPage = lazy(() => import('@/pages/kos-bu1-financial-regulation/page').then(m => ({ default: m.default })));
const bU2GovernanceDueDiligencePage = lazy(() => import('@/pages/kos-bu2-governance-due-diligence/page').then(m => ({ default: m.default })));
const bU3ClimateESGPage = lazy(() => import('@/pages/kos-bu3-climate-esg/page').then(m => ({ default: m.default })));
const bU4KBRModelPage = lazy(() => import('@/pages/kos-bu4-kbr-model/page').then(m => ({ default: m.default })));

// LinkedIn BU Positioning Pages — English Versions (International Reach)
const bU1FinancialRegulationEnPage = lazy(() => import('@/pages/kos-bu1-financial-regulation-en/page').then(m => ({ default: m.default })));
const bU2GovernanceDueDiligenceEnPage = lazy(() => import('@/pages/kos-bu2-governance-due-diligence-en/page').then(m => ({ default: m.default })));
const bU3ClimateESGEnPage = lazy(() => import('@/pages/kos-bu3-climate-esg-en/page').then(m => ({ default: m.default })));
const bU4KBRModelEnPage = lazy(() => import('@/pages/kos-bu4-kbr-model-en/page').then(m => ({ default: m.default })));

// SEO Autopilot
const seoAutopilotPage = lazy(() => import('@/pages/kos-seo-autopilot/page').then(m => ({ default: m.default })));

// Research Institute
const researchInstitutePage = lazy(() => import('@/pages/kos-research-institute/page').then(m => ({ default: m.default })));

// Diagnostic 360
const diagnostic360Page = lazy(() => import('@/pages/kos-diagnostic-360/page').then(m => ({ default: m.default })));

// Knowledge Center
const knowledgeCenterPage = lazy(() => import('@/pages/kos-knowledge-center/page').then(m => ({ default: m.default })));

// Global Knowledge Graph
const knowledgeGraphPage = lazy(() => import('@/pages/kos-knowledge-graph/page').then(m => ({ default: m.default })));

// Institutional Visibility Engine
const institutionalVisibilityPage = lazy(() => import('@/pages/kos-institutional-visibility/page').then(m => ({ default: m.default })));

// Fullstack Developer Automates
const fullstackDevAutomatesPage = lazy(() => import('@/pages/kos-fullstack-dev-automates/page').then(m => ({ default: m.default })));

// Web Operations Automates
const webOpsAutomatesPage = lazy(() => import('@/pages/kos-web-ops-automates/page').then(m => ({ default: m.default })));

// Cyber Security Automates
const cyberSecurityAutomatesPage = lazy(() => import('@/pages/kos-cyber-security-automates/page').then(m => ({ default: m.default })));

// Think Tank Automates
const thinkTankAutomatesPage = lazy(() => import('@/pages/kos-think-tank-automates/page').then(m => ({ default: m.default })));

// Regulatory Compliance Automates
const regulatoryComplianceAutomatesPage = lazy(() => import('@/pages/kos-regulatory-compliance-automates/page').then(m => ({ default: m.default })));

// Blog Writing Automates (Big Four Level)
const blogWritingAutomatesPage = lazy(() => import('@/pages/kos-blog-writing-automates/page').then(m => ({ default: m.default })));

// Interactive Tools Review Automates
const interactiveToolsReviewPage = lazy(() => import('@/pages/kos-interactive-tools-review/page').then(m => ({ default: m.default })));

// Accès KOS (mot de passe)
const accessPage = lazy(() => import('@/pages/kos-access/page').then(m => ({ default: m.default })));

// KOS Enterprise Engine
const enterpriseEnginePage = lazy(() => import('@/pages/kos-enterprise-engine/page').then(m => ({ default: m.default })));

// KOS Leadership Agents
const leadershipAgentsPage = lazy(() => import('@/pages/kos-leadership-agents/page').then(m => ({ default: m.default })));

// KOS Closing Intelligence Engine
const closingIntelligenceEnginePage = lazy(() => import('@/pages/kos-closing-intelligence-engine/page').then(m => ({ default: m.default })));

// Referents Metiers Automates
const referentsMetiersAutomatesPage = lazy(() => import('@/pages/kos-referents-metiers-automates/page').then(m => ({ default: m.default })));

// Commercial & Marketing Automates
const commercialMarketingAutomatesPage = lazy(() => import('@/pages/kos-commercial-marketing-automates/page').then(m => ({ default: m.default })));

// Organisation & Qualité Automates
const organisationQualiteAutomatesPage = lazy(() => import('@/pages/kos-organisation-qualite-automates/page').then(m => ({ default: m.default })));

// Commandement Opérationnel Unifié
const commandementOperationnelUnifiePage = lazy(() => import('@/pages/kos-commandement-operationnel-unifie/page').then(m => ({ default: m.default })));

// LLM Experts Automates
const llmExpertsAutomatesPage = lazy(() => import('@/pages/kos-llm-experts-automates/page').then(m => ({ default: m.default })));
// LLM Excellence Engine — Master Prompt Big Four
const llmExcellenceEnginePage = lazy(() => import('@/pages/kos-llm-excellence-engine/page').then(m => ({ default: m.default })));
// Synchroniseur Maître KOS
const masterSynchronizerPage = lazy(() => import('@/pages/kos-synchroniseur-maitre/page').then(m => ({ default: m.default })));
// Bloc Execution System KOS
const blockExecutionPage = lazy(() => import('@/pages/kos-block-execution/page').then(m => ({ default: m.default })));

// KOS Global Launch System
const globalLaunchPage = lazy(() => import('@/pages/kos-global-launch/page').then(m => ({ default: m.default })));
// Compliance & Quality MAX — Cockpit Unifié 48 Automates
const complianceQualityMaxPage = lazy(() => import('@/pages/kos-compliance-quality-max/page').then(m => ({ default: m.default })));

// Performance 100% Challenge
const performance100ChallengePage = lazy(() => import('@/pages/kos-performance-100-challenge/page').then(m => ({ default: m.default })));

// Global Agent Performance Scan
const globalAgentPerformancePage = lazy(() => import('@/pages/kos-global-agent-performance/page').then(m => ({ default: m.default })));

// KOS Constitution — Bloc 1
const constitutionPage = lazy(() => import('@/pages/kos-constitution/page').then(m => ({ default: m.default })));

// KOS Enterprise Data Model — Bloc 2
const enterpriseDataModelPage = lazy(() => import('@/pages/kos-enterprise-data-model/page').then(m => ({ default: m.default })));

// KOS Audit Ledger — Bloc 3
const auditLedgerPage = lazy(() => import('@/pages/kos-audit-ledger/page').then(m => ({ default: m.default })));

// KOS Runtime — Bloc 4
const runtimePage = lazy(() => import('@/pages/kos-runtime/page').then(m => ({ default: m.default })));

// KOS Control Tower — Bloc 5
const controlTowerPage = lazy(() => import('@/pages/kos-control-tower/page').then(m => ({ default: m.default })));

// KOS Automation Factory — Bloc 10
const automationFactoryPage = lazy(() => import('@/pages/kos-automation-factory/page').then(m => ({ default: m.default })));

// Khepra Growth Engine — Bloc 12
const khepraGrowthEnginePage = lazy(() => import('@/pages/kos-khepra-growth-engine/page').then(m => ({ default: m.default })));
// KOS Trust Center — Bloc 8
const trustCenterPage = lazy(() => import('@/pages/kos-trust-center/page').then(m => ({ default: m.default })));

// KOS Data Governance — AXE 9
const dataGovernancePage = lazy(() => import('@/pages/kos-data-governance/page').then(m => ({ default: m.default })));

// Schema.org Audit
const schemaOrgAuditPage = lazy(() => import('@/pages/kos-schema-org-audit/page').then(m => ({ default: m.default })));
// Scientific Intelligence Enhancement — Master Prompt Big Four
const scientificIntelligenceEnhancementPage = lazy(() => import('@/pages/kos-scientific-intelligence-enhancement/page').then(m => ({ default: m.default })));
// Business Opportunity Intelligence — Master Prompt Big Four
const businessOpportunityIntelligencePage = lazy(() => import('@/pages/kos-business-opportunity-intelligence/page').then(m => ({ default: m.default })));
// Regulatory Legal Compliance Excellence — Master Prompt Big Four
const regulatoryLegalComplianceExcellencePage = lazy(() => import('@/pages/kos-regulatory-legal-compliance-excellence/page').then(m => ({ default: m.default })));

// KOS Transformation Program 2026-2028 — Master Plan Big Four
const transformationProgramPage = lazy(() => import('@/pages/kos-transformation-program/page').then(m => ({ default: m.default })));

// Bloc 00 — PMO & Gouvernance KOS
const pMOGovernancePage = lazy(() => import('@/pages/kos-pmo-governance/page').then(m => ({ default: m.default })));
// Bloc 01 — KHEPRA Knowledge Graph™
const knowledgeGraphBlocPage = lazy(() => import('@/pages/kos-knowledge-graph-blanc/page').then(m => ({ default: m.default })));
// Bloc 02 — KHEPRA Intelligence Center™
const intelligenceCenterPage = lazy(() => import('@/pages/kos-intelligence-center/page').then(m => ({ default: m.default })));
// Bloc 03 — GEO Authority Engine™
const gEOAuthorityEnginePage = lazy(() => import('@/pages/kos-geo-authority-engine/page').then(m => ({ default: m.default })));
// Bloc 04 — SEO Big Four™
const sEOBigFourPage = lazy(() => import('@/pages/kos-seo-big-four/page').then(m => ({ default: m.default })));
// Bloc 05 — AO / AMI Intelligence™
const aOAMIPage = lazy(() => import('@/pages/kos-ao-ami-intelligence/page').then(m => ({ default: m.default })));
// Bloc 06 — Partnership Engine™
const partnershipEnginePage = lazy(() => import('@/pages/kos-partnership-engine/page').then(m => ({ default: m.default })));
// Bloc 07 — Expert Network™
const expertNetworkPage = lazy(() => import('@/pages/kos-expert-network/page').then(m => ({ default: m.default })));
// Bloc 08 — Regulatory Excellence™
const regulatoryExcellencePage = lazy(() => import('@/pages/kos-regulatory-excellence/page').then(m => ({ default: m.default })));
// Bloc 11 — Business Development Engine™
const businessDevelopmentEnginePage = lazy(() => import('@/pages/kos-business-development-engine/page').then(m => ({ default: m.default })));
// Bloc 12 — Quality & Risk Management™
const qualityRiskManagementPage = lazy(() => import('@/pages/kos-quality-risk-management/page').then(m => ({ default: m.default })));

// SEO On-Page & Content Quality
const seoOnPageContentPage = lazy(() => import('@/pages/kos-seo-onpage-content/page').then(m => ({ default: m.default })));

// Backlink Intelligence Audit
const backlinkIntelligenceAuditPage = lazy(() => import('@/pages/kos-backlink-intelligence-audit/page').then(m => ({ default: m.default })));

// SEO Analytics & Competitive Intelligence
const seoAnalyticsCompetitivePage = lazy(() => import('@/pages/kos-seo-analytics-competitive/page').then(m => ({ default: m.default })));

// SEO Content Strategy & Editorial Command
const seoContentStrategyPage = lazy(() => import('@/pages/kos-seo-content-strategy/page').then(m => ({ default: m.default })));

// Local SEO & GEO Visibility
const seoLocalGeoPage = lazy(() => import('@/pages/kos-seo-local-geo/page').then(m => ({ default: m.default })));

// Social SEO & LinkedIn Authority
const seoSocialAuthorityPage = lazy(() => import('@/pages/kos-seo-social-authority/page').then(m => ({ default: m.default })));

// SEO CRO & Conversion Optimization
const seoCROConversionPage = lazy(() => import('@/pages/kos-seo-cro-conversion/page').then(m => ({ default: m.default })));

// SEO E-E-A-T & Brand Authority
const seoEEATAuthorityPage = lazy(() => import('@/pages/kos-seo-eeat-authority/page').then(m => ({ default: m.default })));

// International & Multilingual SEO
const seoInternationalMultilingualPage = lazy(() => import('@/pages/kos-seo-international-multilingual/page').then(m => ({ default: m.default })));

// SEO Reporting & Executive Command
const seoReportingExecutivePage = lazy(() => import('@/pages/kos-seo-reporting-executive/page').then(m => ({ default: m.default })));

// Regulatory Compliance Audit — BCEAO/COBAC
const regulatoryComplianceAuditPage = lazy(() => import('@/pages/kos-regulatory-compliance-audit/page').then(m => ({ default: m.default })));

// Regulatory Compliance Engine™ — Command Center (MASTER PROMPT)
const regulatoryComplianceEnginePage = lazy(() => import('@/pages/kos-regulatory-compliance-engine/page').then(m => ({ default: m.default })));

// Regulatory Remediation Engine™ — Exécution & Correction
const regulatoryRemediationEnginePage = lazy(() => import('@/pages/kos-regulatory-remediation-engine/page').then(m => ({ default: m.default })));

// Big Four Remediation Command Center™ — Bureau Central de Transformation
const bigFourRemediationPage = lazy(() => import('@/pages/kos-big-four-remediation/page').then(m => ({ default: m.default })));

// KOS Content Factory Command — Hub 64
const contentFactoryCommandPage = lazy(() => import('@/pages/kos-content-factory-command/page').then(m => ({ default: m.default })));
// KOS Content Calendar — 100 Thématiques Éditoriales
const contentCalendarPage = lazy(() => import('@/pages/kos-content-calendar/page').then(m => ({ default: m.default })));
// KOS Deployment Pipeline Command — Hub 65
const deploymentPipelinePage = lazy(() => import('@/pages/kos-deployment-pipeline/page').then(m => ({ default: m.default })));

// Stratégie Digitale (KOS protégé)
const StrategieDigitalePage = lazy(() => import('@/pages/strategie-digitale/page').then(m => ({ default: m.default })));

// KOS Strategic Positioning Center — Bloc 1
const strategicPositioningPage = lazy(() => import('@/pages/kos-strategic-positioning/page').then(m => ({ default: m.default })));

// KOS Thought Leadership Center — Bloc 2
const thoughtLeadershipCenterPage = lazy(() => import('@/pages/kos-thought-leadership-center/page').then(m => ({ default: m.default })));

// KOS Africa Observatories Program — Bloc 11
const africaObservatoriesPage = lazy(() => import('@/pages/kos-africa-observatories/page').then(m => ({ default: m.default })));

// KOS Regulatory Intelligence Center — Master Prompt 3
const regulatoryIntelligenceCenterPage = lazy(() => import('@/pages/kos-regulatory-intelligence-engine/page').then(m => ({ default: m.default })));

// KOS Digital Authority Engine — Master Prompt 6
const digitalAuthorityEnginePage = lazy(() => import('@/pages/kos-digital-authority-engine/page').then(m => ({ default: m.default })));

// KOS Domain Authority Intelligence — Master Prompt 11
const domainAuthorityIntelligencePage = lazy(() => import('@/pages/kos-domain-authority-intelligence/page').then(m => ({ default: m.default })));

// KOS SEO Performance Intelligence — Master Prompt 12
const seoPerformanceIntelligencePage = lazy(() => import('@/pages/kos-seo-performance-intelligence/page').then(m => ({ default: m.default })));

// KOS Multi-Agent Orchestration Framework — Master Prompt 7
const multiAgentOrchestrationPage = lazy(() => import('@/pages/kos-multi-agent-orchestration/page').then(m => ({ default: m.default })));

// KOS Big Four Maturity Assessment — Master Prompt 10
const bigFourMaturityAssessmentPage = lazy(() => import('@/pages/kos-big-four-maturity-assessment/page').then(m => ({ default: m.default })));

// KOS AI Compliance & Fraud Intelligence — Master Prompt 13
const aIComplianceFraudIntelligencePage = lazy(() => import('@/pages/kos-ai-compliance-fraud-intelligence/page').then(m => ({ default: m.default })));

// KOS Francophone Africa Strategic Intelligence Center — Master Prompt 14
const francophoneAfricaStrategicCenterPage = lazy(() => import('@/pages/kos-francophone-africa-strategic-center/page').then(m => ({ default: m.default })));

// KOS Global Visibility Command — Master Prompt 15
const globalVisibilityCommandPage = lazy(() => import('@/pages/kos-global-visibility-command/page').then(m => ({ default: m.default })));

// KOS ESG & Regulatory Alignment Command — Master Prompt 16
const eSGRegulatoryAlignmentPage = lazy(() => import('@/pages/kos-esg-regulatory-alignment/page').then(m => ({ default: m.default })));

// KOS Phase 1 — Fondations & Conformité Command — Master Prompt 17
const phase1FoundationsCompliancePage = lazy(() => import('@/pages/kos-phase1-foundations-compliance/page').then(m => ({ default: m.default })));

// KOS Final Orchestration Command™ — Consolidation Ultime
const finalOrchestrationPage = lazy(() => import('@/pages/kos-final-orchestration/page').then(m => ({ default: m.default })));

// KOS Total Production Go-Live Command™ — Mise en Production Totale
const productionGoLivePage = lazy(() => import('@/pages/kos-production-go-live/page').then(m => ({ default: m.default })));

// KOS Governance Formalization Command™ — Nominations, Comités, Chartes, Plan Correctif
const governanceFormalizationPage = lazy(() => import('@/pages/kos-governance-formalization/page').then(m => ({ default: m.default })));

// KOS Compliance & Security Certification Command™ — KYC/CDD, LCB/FT, CEMAC, ISO 27001
const complianceSecurityCertificationPage = lazy(() => import('@/pages/kos-compliance-security-certification/page').then(m => ({ default: m.default })));

// KOS ESG & Sustainability Command™ — Bilan Carbone, EcoVadis, GRI/ISSB, Dashboard ESG
const eSGSustainabilityCommandPage = lazy(() => import('@/pages/kos-esg-sustainability-command/page').then(m => ({ default: m.default })));

// KOS Digital Performance Command™ — Core Web Vitals, OWASP, SOC 2, Reporting Interactif
const digitalPerformanceCommandPage = lazy(() => import('@/pages/kos-digital-performance-command/page').then(m => ({ default: m.default })));

// KOS System Integrity Scanner™ — Scan intégral erreurs, bugs, tâches critiques par bloc
const systemIntegrityScannerPage = lazy(() => import('@/pages/kos-system-integrity-scanner/page').then(m => ({ default: m.default })));

// KOS Scan Complet + Exécution en Bloc — Cockpit de Commandement Unifié (Hub 999)
const scanCompletExecutionPage = lazy(() => import('@/pages/kos-scan-complet-execution/page').then(m => ({ default: m.default })));

// KOS Phase 1 Consolidation Execution™ — Correction 8 Urgences P0
const phase1ConsolidationPage = lazy(() => import('@/pages/kos-phase1-consolidation/page').then(m => ({ default: m.default })));

// KOS Phase 2 Sécurisation & Performance™ — CSP/WAF, WebP, OWASP, SMSI, Pentest
const phase2SecurisationPage = lazy(() => import('@/pages/kos-phase2-securisation/page').then(m => ({ default: m.default })));

// KOS Phase 3 Qualité & Documentation™ — TJM, JWT/RLS, EcoVadis, Bundle, Audit Go-Live
const phase3QualitePage = lazy(() => import('@/pages/kos-phase3-qualite/page').then(m => ({ default: m.default })));

// KOS Phase 4 Go-Live & Production™ — Snapshot, Formation, Migration, COMEX, Monitoring
const phase4GoLivePage = lazy(() => import('@/pages/kos-phase4-go-live/page').then(m => ({ default: m.default })));

// KOS Phase 5 Expansion & Rayonnement™ — SLA, Expansion CEMAC, Partenariats, SEO, Revenue Ops
const phase5ExpansionPage = lazy(() => import('@/pages/kos-phase5-expansion/page').then(m => ({ default: m.default })));

// KOS Phase 6 Autonomie Totale & Innovation™ — IA Agentique, Self-Healing, Blockchain, DaaS, R&D
const phase6InnovationPage = lazy(() => import('@/pages/kos-phase6-innovation/page').then(m => ({ default: m.default })));

// KOS Phase 7 Domination Continentale & Marché Global™
const phase7DominationPage = lazy(() => import('@/pages/kos-phase7-domination/page').then(m => ({ default: m.default })));

// KOS Phase 8 Singularité & Legacy™
const phase8SingularitePage = lazy(() => import('@/pages/kos-phase8-singularite/page').then(m => ({ default: m.default })));

// KOS Plan Consolidation Master View™ — Dashboard Unifié 8 Phases
const planConsolidationMasterViewPage = lazy(() => import('@/pages/kos-plan-consolidation-master-view/page').then(m => ({ default: m.default })));

// KOS CDO & Growth Engineering Command™ — Hub 72
const cDOEngineeringCommandPage = lazy(() => import('@/pages/kos-cdo-engineering-command/page').then(m => ({ default: m.default })));

// KOS Production Package Factory — Hub 73
const productionPackageFactoryPage = lazy(() => import('@/pages/kos-production-package-factory/page').then(m => ({ default: m.default })));

// KOS SysOps Health & Resiliency Command — Hub 74
const sysOpsHealthResiliencyCommandPage = lazy(() => import('@/pages/kos-sysops-health-resiliency-command/page').then(m => ({ default: m.default })));

// KOS External API Config Command — Hub 75
const externalApiConfigCommandPage = lazy(() => import('@/pages/kos-external-api-config-command/page').then(m => ({ default: m.default })));

// KOS YouTube Autonomous Infrastructure — Master Prompt 1 (Hub 76)
const youtubeAutonomousInfrastructurePage = lazy(() => import('@/pages/kos-youtube-autonomous-infrastructure/page').then(m => ({ default: m.default })));

// KOS YouTube Production Pipeline — Master Prompt 2 (Hub 77)
const youtubeProductionPipelinePage = lazy(() => import('@/pages/kos-youtube-production-pipeline/page').then(m => ({ default: m.default })));

// KOS YouTube System Scanner & Auto-Production Launcher — Hub 78
const youtubeSystemScannerPage = lazy(() => import('@/pages/kos-youtube-system-scanner/page').then(m => ({ default: m.default })));

// KOS YouTube Monitoring Center — Hub 79
const youtubeMonitoringPage = lazy(() => import('@/pages/kos-youtube-monitoring/page').then(m => ({ default: m.default })));

// KOS YouTube Download Studio — Hub 80
const youtubeDownloadPage = lazy(() => import('@/pages/kos-youtube-download/page').then(m => ({ default: m.default })));

// KOS Video Podcast Publishing Pack — Hub 86
const videoPodcastPublishingPackPage = lazy(() => import('@/pages/kos-video-podcast-publishing-pack/page').then(m => ({ default: m.default })));

// KOS YouTube Download Center — Centre de Téléchargement
const YoutubeDownloadCenterPage = lazy(() => import('@/pages/youtube-download-center/page').then(m => ({ default: m.default })));

// KOS Youtube Pending Queue — File d'Attente Publication
const YoutubePendingPage = lazy(() => import('@/pages/youtube-pending/page').then(m => ({ default: m.default })));

// KOS Total Governance & Regulatory Excellence™ — Autorité Suprême de Gouvernance
const totalGovernanceRegulatoryExcellencePage = lazy(() => import('@/pages/kos-total-governance-regulatory-excellence/page').then(m => ({ default: m.default })));

// KOS Global System Upgrade Command™ — Console Unifiée d'Upgrade Système
const globalSystemUpgradePage = lazy(() => import('@/pages/kos-global-system-upgrade/page').then(m => ({ default: m.default })));

// KOS YouTube Hybrid Recovery & Corrective Actions™ — Détection Blocages & Auto-Fix
const youtubeHybridRecoveryPage = lazy(() => import('@/pages/kos-youtube-hybrid-recovery/page').then(m => ({ default: m.default })));

// KOS URL Indexation Command™ — Analyse URLs & Poussée Indexation Google 95%
const urlIndexationCommandPage = lazy(() => import('@/pages/kos-url-indexation-command/page').then(m => ({ default: m.default })));

// KOS Application Landing — Google Cloud Console OAuth Validation
const landingPage = lazy(() => import('@/pages/kos-landing/page').then(m => ({ default: m.default })));

// KOS Banking Stack™ — Banking Compliance Infrastructure
const bankingStackPage = lazy(() => import('@/pages/kos-banking-stack/page').then(m => ({ default: m.default })));

// KOS Enterprise Consolidation Command™ — Consolidation & Production Complète
const enterpriseConsolidationPage = lazy(() => import('@/pages/kos-enterprise-consolidation/page').then(m => ({ default: m.default })));

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
const zeroBudgetSprintPage = lazy(() => import('@/pages/kos-zero-budget-sprint/page').then(m => ({ default: m.default })));

// KOS Sprint 2 Zéro Budget — Les 10 Tâches Restantes
const zeroBudgetSprint2Page = lazy(() => import('@/pages/kos-zero-budget-sprint-2/page').then(m => ({ default: m.default })));

// KOS Budget Unleashed Sprint — Actions Débloquées Budget COMEX
const budgetUnleashedSprintPage = lazy(() => import('@/pages/kos-budget-unleashed-sprint/page').then(m => ({ default: m.default })));

// KOS Audience Dashboard — Gestion des Audiences (Hub 88)
const audienceDashboardPage = lazy(() => import('@/pages/kos-audience-dashboard/page').then(m => ({ default: m.default })));

// KOS Self-Evolution Program — Big Four Autonomous Capability Absorption (Hub 89)
const selfEvolutionPage = lazy(() => import('@/pages/kos-self-evolution/page').then(m => ({ default: m.default })));

// KOS Proprietary Voice Factory — KHEPRA Voice™ (Hub 90)
const proprietaryVoiceFactoryPage = lazy(() => import('@/pages/kos-proprietary-voice-factory/page').then(m => ({ default: m.default })));

// KOS Autonomous Stack Transformation — Désintermédiation API (Hub 91)
const autonomousStackPage = lazy(() => import('@/pages/kos-autonomous-stack/page').then(m => ({ default: m.default })));

// KOS Knowledge Factory — Production de Connaissances Big Four (Hub 92)
const knowledgeFactoryPage = lazy(() => import('@/pages/kos-knowledge-factory/page').then(m => ({ default: m.default })));

// KOS Podcast Factory — Chaîne Industrielle de Podcasts (Hub 93)
const podcastFactoryPage = lazy(() => import('@/pages/kos-podcast-factory/page').then(m => ({ default: m.default })));

// KOS Interview Factory — Interviews d'Experts Virtuels (Hub 94)
const interviewFactoryPage = lazy(() => import('@/pages/kos-interview-factory/page').then(m => ({ default: m.default })));

// KOS Canva Factory — Industrialisation Design Graphique (Hub 95)
const canvaFactoryPage = lazy(() => import('@/pages/kos-canva-factory/page').then(m => ({ default: m.default })));

// KOS PowerPoint Factory — Présentations Exécutives Automatiques (Hub 96)
const powerPointFactoryPage = lazy(() => import('@/pages/kos-powerpoint-factory/page').then(m => ({ default: m.default })));

// KOS Video Factory — Production Vidéo Automatique (Hub 97)
const videoFactoryPage = lazy(() => import('@/pages/kos-video-factory/page').then(m => ({ default: m.default })));

// KOS Voice Factory — Identité Audio KHEPRA (Hub 98)
const voiceFactoryPage = lazy(() => import('@/pages/kos-voice-factory/page').then(m => ({ default: m.default })));

// KOS YouTube Factory — @KHEPRAEXPERTS (Hub 99)
const youTubeFactoryPage = lazy(() => import('@/pages/kos-youtube-factory/page').then(m => ({ default: m.default })));

// KOS Autonomous Media Command Center — Orchestration Globale (Hub 100)
const autonomousMediaCommandCenterPage = lazy(() => import('@/pages/kos-autonomous-media-command-center/page').then(m => ({ default: m.default })));

// KOS Ultimate Cockpit — Single Pane of Glass (Hub 101)
const ultimateCockpitPage = lazy(() => import('@/pages/kos-ultimate-cockpit/page').then(m => ({ default: m.default })));

// KOS War Room — Pipeline Autonome 8 Agents Live Dashboard
const warRoomPage = lazy(() => import('@/pages/kos-war-room/page').then(m => ({ default: m.default })));

// KOS Full System Security Scan — Analyse 360° Sécurité (Hub 106)
const fullSystemSecurityScanPage = lazy(() => import('@/pages/kos-full-system-security-scan/page').then(m => ({ default: m.default })));

// KOS Complete Performance · Visibilité · Marketing · Lead Magnets · AMI/AO & 120% Upgrade (Hub 107)
const completePerformanceVisibility120UpgradePage = lazy(() => import('@/pages/kos-complete-performance-visibility-120-upgrade/page').then(m => ({ default: m.default })));

// KOS API Independence Command™ — Hub 87
const apiIndependencePage = lazy(() => import('@/pages/kos-api-independence/page').then(m => ({ default: m.default })));

// KOS Ultra Lead Magnets™ — Hub 88
const ultraLeadMagnetsPage = lazy(() => import('@/pages/kos-ultra-lead-magnets/page').then(m => ({ default: m.default })));

// KOS Regulatory Compliance Scanner™ — Hub 89
const regulatoryComplianceScannerPage = lazy(() => import('@/pages/kos-regulatory-compliance-scanner/page').then(m => ({ default: m.default })));

// KOS Autonomous AI & Media Command™ — Hub 90
const autonomousAIMediaPage = lazy(() => import('@/pages/kos-autonomous-ai-media/page').then(m => ({ default: m.default })));

// KOS SEO/AEO Public Command™ — Hub 91
const seoAeoPublicPage = lazy(() => import('@/pages/kos-seo-aeo-public/page').then(m => ({ default: m.default })));

// KOS Risk KRI Heatmap™ — Hub 92
const riskKriHeatmapPage = lazy(() => import('@/pages/kos-risk-kri-heatmap/page').then(m => ({ default: m.default })));

// KOS Legal & AI Governance Hub™ — Hub 93
const legalAIGovernancePage = lazy(() => import('@/pages/kos-legal-ai-governance/page').then(m => ({ default: m.default })));

// KOS Quality Innovation & Peer Review™ — Hub 94
const qualityInnovationPage = lazy(() => import('@/pages/kos-quality-innovation/page').then(m => ({ default: m.default })));

// KOS Auto-Learning Engine™ — Hub 95
const autoLearningEnginePage = lazy(() => import('@/pages/kos-auto-learning-engine/page').then(m => ({ default: m.default })));

// KOS Auto-Learning & Agentic Development — PILLAR 2+3 Unified Command
const autoLearningAgenticPage = lazy(() => import('@/pages/kos-auto-learning-agentic/page').then(m => ({ default: m.default })));

// KOS Auto-Memorization — Centre de Commande Auto-Apprentissage & Auto-Correction
const autoMemorizationPage = lazy(() => import('@/pages/kos-auto-memorization/page').then(m => ({ default: m.default })));

// KOS Autonomous Regulatory Watch™ — Hub 96
const autonomousRegulatoryWatchPage = lazy(() => import('@/pages/kos-autonomous-regulatory-watch/page').then(m => ({ default: m.default })));

// KOS Autonomous Digital Marketing Command™ — Hub 97
const autonomousDigitalMarketingPage = lazy(() => import('@/pages/kos-autonomous-digital-marketing/page').then(m => ({ default: m.default })));

// KOS Autonomous Think Tank Factory™ — Hub 98
const autonomousThinkTankPage = lazy(() => import('@/pages/kos-autonomous-think-tank/page').then(m => ({ default: m.default })));

// KOS 150% Big Four Action Plan — 32 Actions J+365 Roadmap
const KOS150BigFourActionPlanPage = lazy(() => import('@/pages/kos-150-big-four-action-plan/page').then(m => ({ default: m.default })));
// KOS 150% Big Four Self-Development™ — Hub 99 (CAPSTONE)
const KOS150BigFourSelfDevelopmentPage = lazy(() => import('@/pages/kos-150-big-four-self-development/page').then(m => ({ default: m.default })));
// KOS Autonomous Knowledge Pipeline™ — [CRAWL]→[NORMALIZE]→[SEED]→[MEMEX]→[SWARM]→[EVAL]→[FLOW]
const autonomousKnowledgePipelinePage = lazy(() => import('@/pages/kos-autonomous-knowledge-pipeline/page').then(m => ({ default: m.default })));
// KOS Sovereign Init™ — Genesis Block — 5 Phases: CORE→FLOW→MEMEX→SWARM→AUDIT
const sovereignInitPage = lazy(() => import('@/pages/kos-sovereign-init/page').then(m => ({ default: m.default })));

// KOS Total System Optimization Command™ — Hub 100 (OPTIMIZATION CAPSTONE)
const totalSystemOptimizationPage = lazy(() => import('@/pages/kos-total-system-optimization/page').then(m => ({ default: m.default })));

// KOS Regulatory Brain™ — Textes Réglementaires → Règles Exécutables (Hub 87)
const regulatoryBrainPage = lazy(() => import('@/pages/kos-regulatory-brain/page').then(m => ({ default: m.default })));

// KOS Workflow Orchestrator™ — Process Conformité → Workflows n8n (Hub 110)
const workflowOrchestratorPage = lazy(() => import('@/pages/kos-workflow-orchestrator/page').then(m => ({ default: m.default })));

// KOS Senior Compliance Auditor™ — Audit Conformité COBAC CEMAC (Hub 111)
const seniorComplianceAuditorPage = lazy(() => import('@/pages/kos-senior-compliance-auditor/page').then(m => ({ default: m.default })));

// KOS Compliance Factory Engine™ — Usine de Conformité Automatisée (Hub 112)
const complianceFactoryEnginePage = lazy(() => import('@/pages/kos-compliance-factory-engine/page').then(m => ({ default: m.default })));

// KOS Website Automation Engine™ — Générateur de Sites Conformité Dynamiques (Hub 113)
const websiteAutomationEnginePage = lazy(() => import('@/pages/kos-website-automation-engine/page').then(m => ({ default: m.default })));

// KOS Autonomous Compliance Pipeline™ — Full Automation Audit COBAC (Hub 114)
const autonomousCompliancePipelinePage = lazy(() => import('@/pages/kos-autonomous-compliance-pipeline/page').then(m => ({ default: m.default })));

// KOS Regulatory Data Architect™ — Architecture de Données Réglementaires Big Four (Hub 115)
const regulatoryDataArchitectPage = lazy(() => import('@/pages/kos-regulatory-data-architect/page').then(m => ({ default: m.default })));

// KOS Tests par Bloc Correctifs — Cockpit Unifié 150% Big Four
const testsParBlocPage = lazy(() => import('@/pages/kos-tests-par-bloc/page').then(m => ({ default: m.default })));

// KOS Transformation Office™ — Redesign Stratégique Consulting → Plateforme Intelligence (Hub 116)
const transformationOfficePage = lazy(() => import('@/pages/kos-transformation-office/page').then(m => ({ default: m.default })));

// KOS Auto-Expansion Academy™ — Université Autonome KHEPRA EXPERTS (Hub 117)
const autoExpansionAcademyPage = lazy(() => import('@/pages/kos-auto-expansion-academy/page').then(m => ({ default: m.default })));

// KOS Closing & Growth Engine™ — Aimants à Leads + IA Closing + Auto-Évolution (Hub 118)
const closingGrowthEnginePage = lazy(() => import('@/pages/kos-closing-growth-engine/page').then(m => ({ default: m.default })));

// KOS Regulatory Citation Validator™ — Agent dédié audit citations réglementaires (Hub 120)
const regulatoryCitationValidatorPage = lazy(() => import('@/pages/kos-regulatory-citation-validator/page').then(m => ({ default: m.default })));

// KOS Regulatory Health Dashboard™ — KPIs temps réel conformité réglementaire
const regulatoryHealthDashboardPage = lazy(() => import('@/pages/kos-regulatory-health/page').then(m => ({ default: m.default })));

// KOS ISO + Big Four Total Compliance & Quality Control™ — Cockpit Unifié (Hub 350)
const iSOBigFourTotalComplianceControlPage = lazy(() => import('@/pages/kos-iso-bigfour-total-compliance-control/page').then(m => ({ default: m.default })));

// KOS AI Upgrade Dashboard™ — KPIs Big Four + ISO 42001 (Hub 351)
const aIUpgradeDashboardPage = lazy(() => import('@/pages/kos-ai-upgrade-dashboard/page').then(m => ({ default: m.default })));

// KOS ISO 42001 AI Governance Dashboard™ — Certification ISO 42001:2023 (Hub 420)
const iSO42001AIGovernancePage = lazy(() => import('@/pages/kos-iso-42001-ai-governance/page').then(m => ({ default: m.default })));

// KOS ISO 9001 Quality Management System™ — Certification ISO 9001:2015 (Hub 900)
const iSO9001QualityManagementPage = lazy(() => import('@/pages/kos-iso-9001-quality-management/page').then(m => ({ default: m.default })));

// KOS Africa Intelligence Command — Hub cross-régulateurs
const africaIntelligenceCommandPage = lazy(() => import('@/pages/kos-africa-intelligence-command/page').then(m => ({ default: m.default })));

// KOS Enterprise Risk & Resilience — Hub 122
const enterpriseRiskResiliencePage = lazy(() => import('@/pages/kos-enterprise-risk-resilience/page').then(m => ({ default: m.default })));

// KOS Client Trust & Digital Authority — Hub 123
const clientTrustDigitalAuthorityPage = lazy(() => import('@/pages/kos-client-trust-digital-authority/page').then(m => ({ default: m.default })));

// KOS AI Sovereignty & Ethics — Hub 124
const aISovereigntyEthicsPage = lazy(() => import('@/pages/kos-ai-sovereignty-ethics/page').then(m => ({ default: m.default })));

// KOS Observatoire BCEAO UEMOA — BLOC du Master Audit (Hub 131)
const observatoireBCEAOPage = lazy(() => import('@/pages/kos-observatoire-bceao/page').then(m => ({ default: m.default })));

// KOS Observatoire BEAC/COBAC CEMAC — Miroir BCEAO (Hub 132)
const observatoireBEACPage = lazy(() => import('@/pages/kos-observatoire-beac/page').then(m => ({ default: m.default })));

// KOS Observatoire COBAC™ — BLOC 6 du Master Audit 12 Blocs (Hub 130)
const observatoireCOBACPage = lazy(() => import('@/pages/kos-observatoire-cobac/page').then(m => ({ default: m.default })));

// KOS Regulatory Observatory Africa™ — BLOC 11 (Hub 122)
const regulatoryObservatoryAfricaPage = lazy(() => import('@/pages/kos-regulatory-observatory-africa/page').then(m => ({ default: m.default })));

// KOS Knowledge Monetization Engine™ — Industrialisation & Vente Connaissances (Hub 121)
const knowledgeMonetizationEnginePage = lazy(() => import('@/pages/kos-knowledge-monetization-engine/page').then(m => ({ default: m.default })));

// KOS Genora Capitalization™ — Programme Big Four 15 Axes
const genoraCapitalizationPage = lazy(() => import('@/pages/kos-genora-capitalization/page').then(m => ({ default: m.default })));

// KOS Automation Engine (KAE) — Hub 121
const automationEnginePage = lazy(() => import('@/pages/kos-automation-engine/page').then(m => ({ default: m.default })));

// KOS ODSKE Governance Dashboard™ — Hub 150
const odskeDashboardPage = lazy(() => import('@/pages/kos-odske-dashboard/page').then(m => ({ default: m.default })));

// KOS Corrective Action System™ — Hub 155
const correctiveSystemDashboardPage = lazy(() => import('@/pages/kos-cas-dashboard/page').then(m => ({ default: m.default })));

// KOS Enterprise Transformation Assessment 360° — Audit Intégral 20 Axes
const enterpriseTransformationAssessment360Page = lazy(() => import('@/pages/kos-enterprise-transformation-assessment-360/page').then(m => ({ default: m.default })));

// KOS Corrective Action Blocks — Blocs d'Actions Correctives Optimisés
const correctiveActionBlocksPage = lazy(() => import('@/pages/kos-corrective-action-blocks/page').then(m => ({ default: m.default })));

// KOS P0 Execution — Exécution Intégrale des 5 Blocs P0
const p0ExecutionPage = lazy(() => import('@/pages/kos-p0-execution/page').then(m => ({ default: m.default })));

// KOS P1 Execution — Exécution Intégrale des 5 Blocs P1
const p1ExecutionPage = lazy(() => import('@/pages/kos-p1-execution/page').then(m => ({ default: m.default })));

// KOS Tâches Restantes 100% Big Four + ISO — Gap Analysis Final
const tasksRestantes100Page = lazy(() => import('@/pages/kos-tasks-restantes-100/page').then(m => ({ default: m.default })));

// KOS Production Sovereignty — Mise en Production Souveraine 100% Big Four + ISO
const productionSovereigntyPage = lazy(() => import('@/pages/kos-production-sovereignty/page').then(m => ({ default: m.default })));

// KOS Audit Final Analysis — Analyse Finale Tous Points d'Audit
const auditFinalAnalysisPage = lazy(() => import('@/pages/kos-audit-final-analysis/page').then(m => ({ default: m.default })));

// KOS Phase 1 P0 Immediate — 9 Actions Critiques · Lancement Immédiat
const phase1P0ImmediatePage = lazy(() => import('@/pages/kos-phase1-p0-immediate/page').then(m => ({ default: m.default })));

// KOS Phase 2 P0-P1 — Suite Logique Phase 1 · 13 Actions
const phase2P0P1Page = lazy(() => import('@/pages/kos-phase2-p0-p1/page').then(m => ({ default: m.default })));

// KOS Phase 3 Expansion — Domination Continentale · 8 Actions
const phase3ExpansionPage = lazy(() => import('@/pages/kos-phase3-expansion/page').then(m => ({ default: m.default })));

// KOS Executive Performance Cockpit — Big Four 03
const executiveCockpitPage = lazy(() => import('@/pages/kos-executive-cockpit/page').then(m => ({ default: m.default })));

// KOS ISO 27001 Audit Report — Rapport d'Audit pour Soumission Externe
const iSO27001AuditReportPage = lazy(() => import('@/pages/kos-iso-27001-audit-report/page').then(m => ({ default: m.default })));

// KOS Security Dashboard — Monitoring ISO 27001 Edge Functions
const securityDashboardPage = lazy(() => import('@/pages/kos-security-dashboard/page').then(m => ({ default: m.default })));

// KOS RLS Guardian Dashboard — Row Level Security Monitoring Temps Réel
const rlsDashboardPage = lazy(() => import('@/pages/kos-rls-dashboard/page').then(m => ({ default: m.default })));

// KBR Dashboard — Khepra Business Review Editorial Command Center
const KBRDashboardPage = lazy(() => import('@/pages/kbr-dashboard/page').then(m => ({ default: m.default })));

// KBR Analytics — Pipeline Lead→MQL→SQL→Mission Dashboard
const kBRAnalyticsPage = lazy(() => import('@/pages/kos-kbr-analytics/page').then(m => ({ default: m.default })));

// KOS Legislative Analyst — Centre d'Analyse d'Impact Réglementaire & Position Papers
const legislativeAnalystPage = lazy(() => import('@/pages/kos-legislative-analyst/page').then(m => ({ default: m.default })));

// KOS Scientific Director — Think Tank Command Center (Directeur Scientifique)
const scientificDirectorPage = lazy(() => import('@/pages/kos-scientific-director/page').then(m => ({ default: m.default })));

// KOS Growth & Commercial Strategy — Directeur Stratégie Commerciale & Growth Premium
const growthCommercialStrategyPage = lazy(() => import('@/pages/kos-growth-commercial-strategy/page').then(m => ({ default: m.default })));

// KOS Mass Infrastructure & Visibility Upgrade™ — Exécution Bloc 5 Domaines
const massInfraUpgradePage = lazy(() => import('@/pages/kos-mass-infra-upgrade/page').then(m => ({ default: m.default })));

// KOS CDO Innovation Command Center™ — Seeding Claude Agentique
const cdoInnovationCommandPage = lazy(() => import('@/pages/kos-cdo-innovation-command/page').then(m => ({ default: m.default })));

// KOS Chief Agentic Architect Command Center™ — Architecte Systèmes Agentiques
const chiefAgenticArchitectPage = lazy(() => import('@/pages/kos-chief-agentic-architect/page').then(m => ({ default: m.default })));

// KOS Enterprise Security & Resilience Command™ — ISO 27001 + OWASP + SOC 2
const enterpriseSecurityResiliencePage = lazy(() => import('@/pages/kos-enterprise-security-resilience/page').then(m => ({ default: m.default })));

// KOS RAG Full Seeding Command™ — Injection Massive Documents Réglementaires
const ragFullSeedPage = lazy(() => import('@/pages/kos-rag-full-seed/page').then(m => ({ default: m.default })));

// P1-P5 Master Prompts Big Four
const ragOrchestratorPage = lazy(() => import('@/pages/kos-rag-orchestrator/page').then(m => ({ default: m.default })));
const autoSeedingPage = lazy(() => import('@/pages/kos-auto-seeding/page').then(m => ({ default: m.default })));
const seoGeoEeatPage = lazy(() => import('@/pages/kos-seo-geo-eeat/page').then(m => ({ default: m.default })));
const hbrGeneratorPage = lazy(() => import('@/pages/kos-hbr-generator/page').then(m => ({ default: m.default })));
const qualityMonitorPage = lazy(() => import('@/pages/kos-quality-monitor/page').then(m => ({ default: m.default })));

// KOS Total Quality Review & Auto-Healing Auto-Expansion Command™
const totalQualityReviewPage = lazy(() => import('@/pages/kos-total-quality-review/page').then(m => ({ default: m.default })));

// KOS Test Engines — Diagnostic des 3 moteurs reconstruits
const testEnginesPage = lazy(() => import('@/pages/kos-test-engines/page').then(m => ({ default: m.default })));

// KOS Knowledge Capitalization Hub™ — Capitalisation documentaire 26 BLOCs + 67 docs métier
const knowledgeCapitalizationPage = lazy(() => import('@/pages/kos-knowledge-capitalization/page').then(m => ({ default: m.default })));

// KOS Zero-Defect Command Center™ — Cockpit Zéro-Défaut Unifié
const zeroDefectCommandPage = lazy(() => import('@/pages/kos-zero-defect-command/page').then(m => ({ default: m.default })));

// KOS Big Four Governance OKR & Reporting Command Center™ — Pilotage Stratégique
const bigFourGovOKRPage = lazy(() => import('@/pages/kos-big-four-gov-okr/page').then(m => ({ default: m.default })));

// KOS Predictive Auto-Correction Engine™ — Anticipation & Prévention des Défauts
const predictiveCorrectionEnginePage = lazy(() => import('@/pages/kos-predictive-correction-engine/page').then(m => ({ default: m.default })));

// KOS Auto-Knowledge Development™ — 3 Systèmes d'Auto-Développement Base Connaissances
const autoKnowledgeDevelopmentPage = lazy(() => import('@/pages/kos-auto-knowledge-development/page').then(m => ({ default: m.default })));

// KOS Agent Auto-Development™ — Auto-Développement des Agents (Hub 119)
const agentAutoDevelopmentPage = lazy(() => import('@/pages/kos-agent-auto-development/page').then(m => ({ default: m.default })));

// KOS Big Four Quality Governance — Gouvernance Qualité Big Four (Hub 120)
const bigFourQualityGovernancePage = lazy(() => import('@/pages/kos-bigfour-quality-governance/page').then(m => ({ default: m.default })));

// KOS Bloc Total Compliance™ — Lancement Conformité 100% Big Four + 100% ISO
const blocTotalCompliancePage = lazy(() => import('@/pages/kos-bloc-total-compliance/page').then(m => ({ default: m.default })));

// KOS Compliance Engine v3.1 — 23+ Régulateurs + ISAE 3402
const complianceEngineV31Page = lazy(() => import('@/pages/kos-compliance-engine-v31/page').then(m => ({ default: m.default })));

// KOS Compliance Engine v4.0 — RAG Universel 285 Sources + Quadruple Ancrage
const complianceEngineV40Page = lazy(() => import('@/pages/kos-compliance-engine-v40/page').then(m => ({ default: m.default })));

// KOS-ALERT v4.1 — Veille Automatique RAG Universel + Alertes Email
const alertV41Page = lazy(() => import('@/pages/kos-alert-v41/page').then(m => ({ default: m.default })));
const masterPromptV50Page = lazy(() => import('@/pages/kos-master-prompt-v50/page').then(m => ({ default: m.default })));
// KOS Master Prompt v6.0 — Autonomous Sovereign
const masterPromptV60Page = lazy(() => import('@/pages/kos-master-prompt-v60/page').then(m => ({ default: m.default })));
// KOS-6.0 Sovereign Control Tower — Cockpit de Commandement Interactif
const sovereignControlTowerPage = lazy(() => import('@/pages/kos-sovereign-control-tower/page').then(m => ({ default: m.default })));
const universalCrawlerPage = lazy(() => import('@/pages/kos-universal-crawler/page').then(m => ({ default: m.default })));
// KOS Full Block Execution Command Center — Exécution en Bloc 3 Piliers
const fullBlockExecutionPage = lazy(() => import('@/pages/kos-full-block-execution/page').then(m => ({ default: m.default })));
// KOS Big4 KHEPRA Architect v1.0 — Partner Knowledge & Innovation
const big4KhepraArchitectPage = lazy(() => import('@/pages/kos-big4-khepra-architect/page').then(m => ({ default: m.default })));
// KOS Agrément OS v1.0 — Pilotage Agrément IMF/EMF BCEAO-COBAC
const agrementOSPage = lazy(() => import('@/pages/kos-agrement-os/page').then(m => ({ default: m.default })));
// KOS REX Template v1.0 — Template Retour d'Expérience Standard Big Four
const rexTemplatePage = lazy(() => import('@/pages/kos-rex-template/page').then(m => ({ default: m.default })));
// KOS Agrément OS Module 1 — Maturity Scan Go-Live
const agrementOSModule1Page = lazy(() => import('@/pages/kos-agrement-os-module-1/page').then(m => ({ default: m.default })));
// KOS Khepra Architect v2.0 — IA Stratège Knowledge Upgrade
const khepraArchitectPage = lazy(() => import('@/pages/kos-khepra-architect/page').then(m => ({ default: m.default })));
// KOS Full Seed Cockpit — Monitoring Production Big Four ISO
const fullSeedCockpitPage = lazy(() => import('@/pages/kos-full-seed-cockpit/page').then(m => ({ default: m.default })));

// KOS Big Four Audit Execution — Rapport d'Audit 10 Phases
const bigFourAuditExecutionPage = lazy(() => import('@/pages/kos-bigfour-audit-execution/page').then(m => ({ default: m.default })));

// KOS Big Four Audit — Dashboard Synthétique Scan Complet
const bigFourAuditPage = lazy(() => import('@/pages/kos-bigfour-audit/page').then(m => ({ default: m.default })));

// KOS OAuth Security Corrections — Plan d'action 7 jours PKCE + WebView
const oAuthSecurityCorrectionsPage = lazy(() => import('@/pages/kos-oauth-security-corrections/page').then(m => ({ default: m.default })));
const oAuthDemoPage = lazy(() => import('@/pages/kos-oauth-demo/page').then(m => ({ default: m.default })));

// KOS Autonomous Orchestrator — Hermes + Genora + Big Four + Research Center
const autonomousOrchestratorPage = lazy(() => import('@/pages/kos-autonomous-orchestrator/page').then(m => ({ default: m.default })));

// KOS Cartographie Contrôles Automatisables — 102 contrôles COBAC/BCEAO/OHADA/GIABA/GABAC
const cartographieControlesAutomatisablesPage = lazy(() => import('@/pages/kos-cartographie-controles-automatisables/page').then(m => ({ default: m.default })));

const RiskDashboardPage = lazy(() => import('@/pages/risk-dashboard/page').then(m => ({ default: m.default })));

const ESGDashboardPage = lazy(() => import('@/pages/esg-dashboard/page').then(m => ({ default: m.default })));

const NoteCADashboardPage = lazy(() => import('@/pages/note-ca/page').then(m => ({ default: m.default })));

// KOS Regulatory Chat — Assistant IA Réglementaire (public)

// KOS Search — Moteur de Recherche Réglementaire Public
const searchPage = lazy(() => import('@/pages/kos-search/page').then(m => ({ default: m.default })));

// KOS Cognitive OS — Dashboard Cognitif Réglementaire Big Four
const cognitiveOSPage = lazy(() => import('@/pages/kos-cognitive-os/page').then(m => ({ default: m.default })));

// KOS-IA Agents War Room — Orchestration Agents IA Big Four
const iAAgentsPage = lazy(() => import('@/pages/kos-ia-agents/page').then(m => ({ default: m.default })));

// KOS GMB OHADA — Google Business Profile 17 Pays
const gmbOhadaPage = lazy(() => import('@/pages/kos-gmb-ohada/page').then(m => ({ default: m.default })));

const _kosRoutes: RouteObject[] = [
  { path: '/kos', element: <landingPage /> },
  { path: '/kos/', element: <landingPage /> },
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
  { path: '/khepra-os-2', element: <authGuard><KhepraOS2HubPage /></authGuard> },
  { path: '/khepra-os-2/', element: <authGuard><KhepraOS2HubPage /></authGuard> },
  { path: '/knowledge-hub', element: <KnowledgeHubPage /> },
  { path: '/knowledge-hub/', element: <KnowledgeHubPage /> },
  { path: '/kos-access', element: <accessPage /> },
  { path: '/kos-access/', element: <accessPage /> },
  { path: '/kos-agent-block-updates', element: <agentBlockUpdatesPage /> },
  { path: '/kos-agent-block-updates/', element: <agentBlockUpdatesPage /> },
  { path: '/kos-ai-governance-ethics', element: <aIGovernanceEthicsPage /> },
  { path: '/kos-ai-governance-ethics/', element: <aIGovernanceEthicsPage /> },
  { path: '/kos-ai-visibility-command', element: <aIVisibilityCommandPage /> },
  { path: '/kos-ai-visibility-command/', element: <aIVisibilityCommandPage /> },
  { path: '/kos-artifacts-architecture-governance', element: <artifactsArchitectureGovernancePage /> },
  { path: '/kos-artifacts-architecture-governance/', element: <artifactsArchitectureGovernancePage /> },
  { path: '/kos-artifacts-enterprise-command', element: <artifactsEnterpriseCommandPage /> },
  { path: '/kos-artifacts-enterprise-command/', element: <artifactsEnterpriseCommandPage /> },
  { path: '/kos-artifacts-growth-strategy', element: <artifactsGrowthStrategyPage /> },
  { path: '/kos-artifacts-growth-strategy/', element: <artifactsGrowthStrategyPage /> },
  { path: '/kos-artifacts-operational-excellence', element: <artifactsOperationalExcellencePage /> },
  { path: '/kos-artifacts-operational-excellence/', element: <artifactsOperationalExcellencePage /> },
  { path: '/kos-audit-ledger', element: <auditLedgerPage /> },
  { path: '/kos-audit-ledger/', element: <auditLedgerPage /> },
  { path: '/kos-auto-task-orchestrator', element: <autoTaskOrchestratorPage /> },
  { path: '/kos-auto-task-orchestrator/', element: <autoTaskOrchestratorPage /> },
  { path: '/kos-automation-factory', element: <automationFactoryPage /> },
  { path: '/kos-automation-factory/', element: <automationFactoryPage /> },
  { path: '/kos-automaton', element: <automatonPage /> },
  { path: '/kos-automaton/', element: <automatonPage /> },
  { path: '/kos-autonomous-growth-market', element: <autonomousGrowthMarketPage /> },
  { path: '/kos-autonomous-growth-market/', element: <autonomousGrowthMarketPage /> },
  { path: '/kos-autonomous-quality-system', element: <autonomousQualitySystemPage /> },
  { path: '/kos-autonomous-quality-system/', element: <autonomousQualitySystemPage /> },
  { path: '/kos-backlink-command', element: <backlinkCommandPage /> },
  { path: '/kos-backlink-command/', element: <backlinkCommandPage /> },
  { path: '/kos-backlink-intelligence-audit', element: <backlinkIntelligenceAuditPage /> },
  { path: '/kos-backlink-intelligence-audit/', element: <backlinkIntelligenceAuditPage /> },
  { path: '/kos-big-four-remediation', element: <bigFourRemediationPage /> },
  { path: '/kos-big-four-remediation/', element: <bigFourRemediationPage /> },
  { path: '/kos-block-execution', element: <blockExecutionPage /> },
  { path: '/kos-block-execution/', element: <blockExecutionPage /> },
  { path: '/kos-blog-writing-automates', element: <blogWritingAutomatesPage /> },
  { path: '/kos-blog-writing-automates/', element: <blogWritingAutomatesPage /> },
  { path: '/kos-business-opportunity-intelligence', element: <businessOpportunityIntelligencePage /> },
  { path: '/kos-business-opportunity-intelligence/', element: <businessOpportunityIntelligencePage /> },
  { path: '/kos-regulatory-legal-compliance-excellence', element: <regulatoryLegalComplianceExcellencePage /> },
  { path: '/kos-regulatory-legal-compliance-excellence/', element: <regulatoryLegalComplianceExcellencePage /> },
  { path: '/kos-transformation-program', element: <transformationProgramPage /> },
  { path: '/kos-transformation-program/', element: <transformationProgramPage /> },
  { path: '/kos-pmo-governance', element: <pMOGovernancePage /> },
  { path: '/kos-pmo-governance/', element: <pMOGovernancePage /> },
  { path: '/kos-knowledge-graph-enterprise', element: <knowledgeGraphBlocPage /> },
  { path: '/kos-knowledge-graph-enterprise/', element: <knowledgeGraphBlocPage /> },
  { path: '/kos-intelligence-center', element: <intelligenceCenterPage /> },
  { path: '/kos-intelligence-center/', element: <intelligenceCenterPage /> },
  { path: '/kos-geo-authority-engine', element: <gEOAuthorityEnginePage /> },
  { path: '/kos-geo-authority-engine/', element: <gEOAuthorityEnginePage /> },
  { path: '/kos-seo-big-four', element: <sEOBigFourPage /> },
  { path: '/kos-seo-big-four/', element: <sEOBigFourPage /> },
  { path: '/kos-ao-ami-intelligence', element: <aOAMIPage /> },
  { path: '/kos-ao-ami-intelligence/', element: <aOAMIPage /> },
  { path: '/kos-partnership-engine', element: <partnershipEnginePage /> },
  { path: '/kos-partnership-engine/', element: <partnershipEnginePage /> },
  { path: '/kos-expert-network', element: <expertNetworkPage /> },
  { path: '/kos-expert-network/', element: <expertNetworkPage /> },
  { path: '/kos-regulatory-excellence', element: <regulatoryExcellencePage /> },
  { path: '/kos-regulatory-excellence/', element: <regulatoryExcellencePage /> },
  { path: '/kos-business-development-engine', element: <businessDevelopmentEnginePage /> },
  { path: '/kos-business-development-engine/', element: <businessDevelopmentEnginePage /> },
  { path: '/kos-quality-risk-management', element: <qualityRiskManagementPage /> },
  { path: '/kos-quality-risk-management/', element: <qualityRiskManagementPage /> },
  { path: '/kos-closing-intelligence', element: <closingIntelligenceEnginePage /> },
  { path: '/kos-closing-intelligence/', element: <closingIntelligenceEnginePage /> },
  { path: '/kos-commandement-operationnel-unifie', element: <commandementOperationnelUnifiePage /> },
  { path: '/kos-commandement-operationnel-unifie/', element: <commandementOperationnelUnifiePage /> },
  { path: '/kos-commercial-marketing-automates', element: <commercialMarketingAutomatesPage /> },
  { path: '/kos-commercial-marketing-automates/', element: <commercialMarketingAutomatesPage /> },
  { path: '/kos-compliance-quality-max', element: <complianceQualityMaxPage /> },
  { path: '/kos-compliance-quality-max/', element: <complianceQualityMaxPage /> },
  { path: '/kos-constitution', element: <constitutionPage /> },
  { path: '/kos-constitution/', element: <constitutionPage /> },
  { path: '/kos-consulting-mission-factory', element: <consultingMissionFactoryPage /> },
  { path: '/kos-consulting-mission-factory/', element: <consultingMissionFactoryPage /> },
  { path: '/kos-content-correction-engine', element: <authGuard><contentCorrectionEnginePage /></authGuard> },
  { path: '/kos-content-correction-engine/', element: <authGuard><contentCorrectionEnginePage /></authGuard> },
  { path: '/kos-content-factory-command', element: <contentFactoryCommandPage /> },
  { path: '/kos-content-factory-command/', element: <contentFactoryCommandPage /> },
  { path: '/kos-content-calendar', element: <contentCalendarPage /> },
  { path: '/kos-content-calendar/', element: <contentCalendarPage /> },
  { path: '/kos-control-tower', element: <controlTowerPage /> },
  { path: '/kos-control-tower/', element: <controlTowerPage /> },
  { path: '/kos-control-tower-automation', element: <controlTowerAutomationPage /> },
  { path: '/kos-control-tower-automation/', element: <controlTowerAutomationPage /> },
  { path: '/kos-correction-engine', element: <correctionEnginePage /> },
  { path: '/kos-correction-engine/', element: <correctionEnginePage /> },
  { path: '/kos-blog-regulatory-correction-engine', element: <blogRegulatoryCorrectionEnginePage /> },
  { path: '/kos-blog-regulatory-correction-engine/', element: <blogRegulatoryCorrectionEnginePage /> },
  { path: '/kos-big-four-web-resources-review', element: <bigFourWebResourcesReviewPage /> },
  { path: '/kos-big-four-web-resources-review/', element: <bigFourWebResourcesReviewPage /> },
  { path: '/kos-corrective-execution-engine', element: <authGuard><correctiveExecutionEnginePage /></authGuard> },
  { path: '/kos-corrective-execution-engine/', element: <authGuard><correctiveExecutionEnginePage /></authGuard> },
  { path: '/kos-cyber-security-automates', element: <cyberSecurityAutomatesPage /> },
  { path: '/kos-cyber-security-automates/', element: <cyberSecurityAutomatesPage /> },
  { path: '/kos-cyber-tech-correction-engine', element: <authGuard><cyberTechCorrectionEnginePage /></authGuard> },
  { path: '/kos-cyber-tech-correction-engine/', element: <authGuard><cyberTechCorrectionEnginePage /></authGuard> },
  { path: '/kos-dashboard', element: <dashboardPage /> },
  { path: '/kos-dashboard/', element: <dashboardPage /> },
  { path: '/kos-data-analytics-process-mining', element: <dataAnalyticsProcessMiningPage /> },
  { path: '/kos-data-analytics-process-mining/', element: <dataAnalyticsProcessMiningPage /> },
  { path: '/kos-data-decision-command', element: <dataDecisionCommandPage /> },
  { path: '/kos-data-decision-command/', element: <dataDecisionCommandPage /> },
  { path: '/kos-data-governance', element: <dataGovernancePage /> },
  { path: '/kos-data-governance/', element: <dataGovernancePage /> },
  { path: '/kos-deployment-pipeline', element: <deploymentPipelinePage /> },
  { path: '/kos-deployment-pipeline/', element: <deploymentPipelinePage /> },
  { path: '/kos-diagnostic-360', element: <diagnostic360Page /> },
  { path: '/kos-diagnostic-360/', element: <diagnostic360Page /> },
  { path: '/kos-digital-growth-correction-engine', element: <authGuard><digitalGrowthCorrectionEnginePage /></authGuard> },
  { path: '/kos-digital-growth-correction-engine/', element: <authGuard><digitalGrowthCorrectionEnginePage /></authGuard> },
  { path: '/kos-enterprise-brain-os', element: <enterpriseBrainOSPage /> },
  { path: '/kos-enterprise-brain-os/', element: <enterpriseBrainOSPage /> },
  { path: '/kos-enterprise-data-model', element: <enterpriseDataModelPage /> },
  { path: '/kos-enterprise-data-model/', element: <enterpriseDataModelPage /> },
  { path: '/kos-enterprise-engine', element: <enterpriseEnginePage /> },
  { path: '/kos-enterprise-engine/', element: <enterpriseEnginePage /> },
  { path: '/kos-enterprise-governance-command', element: <enterpriseGovernanceCommandPage /> },
  { path: '/kos-enterprise-governance-command/', element: <enterpriseGovernanceCommandPage /> },
  { path: '/kos-enterprise-kpi-command', element: <enterpriseKPICommandPage /> },
  { path: '/kos-enterprise-kpi-command/', element: <enterpriseKPICommandPage /> },
  { path: '/kos-enterprise-os-core-command', element: <enterpriseOSCoreCommandPage /> },
  { path: '/kos-enterprise-os-core-command/', element: <enterpriseOSCoreCommandPage /> },
  { path: '/kos-executive-command', element: <executiveCommandPage /> },
  { path: '/kos-executive-command/', element: <executiveCommandPage /> },
  { path: '/kos-fullstack-dev-automates', element: <fullstackDevAutomatesPage /> },
  { path: '/kos-fullstack-dev-automates/', element: <fullstackDevAutomatesPage /> },
  { path: '/kos-global-agent-performance', element: <globalAgentPerformancePage /> },
  { path: '/kos-global-agent-performance/', element: <globalAgentPerformancePage /> },
  { path: '/kos-global-launch', element: <globalLaunchPage /> },
  { path: '/kos-global-launch/', element: <globalLaunchPage /> },
  { path: '/kos-governance-knowledge', element: <governanceKnowledgePage /> },
  { path: '/kos-governance-knowledge/', element: <governanceKnowledgePage /> },
  { path: '/kos-growth-intelligence-command', element: <growthIntelligenceCommandPage /> },
  { path: '/kos-growth-intelligence-command/', element: <growthIntelligenceCommandPage /> },
  { path: '/kos-growth-orchestrator', element: <authGuard><growthOrchestratorPage /></authGuard> },
  { path: '/kos-growth-orchestrator/', element: <authGuard><growthOrchestratorPage /></authGuard> },
  { path: '/kos-gsc-command', element: <gSCCommandPage /> },
  { path: '/kos-gsc-command/', element: <gSCCommandPage /> },
  { path: '/kos-innovation-esg-command', element: <innovationESGCommandPage /> },
  { path: '/kos-innovation-esg-command/', element: <innovationESGCommandPage /> },
  { path: '/kos-institutional-visibility', element: <institutionalVisibilityPage /> },
  { path: '/kos-institutional-visibility/', element: <institutionalVisibilityPage /> },
  { path: '/kos-interactive-tools-review', element: <interactiveToolsReviewPage /> },
  { path: '/kos-interactive-tools-review/', element: <interactiveToolsReviewPage /> },
  { path: '/kos-khepra-growth-engine', element: <khepraGrowthEnginePage /> },
  { path: '/kos-khepra-growth-engine/', element: <khepraGrowthEnginePage /> },
  { path: '/kos-knowledge-center', element: <knowledgeCenterPage /> },
  { path: '/kos-knowledge-center/', element: <knowledgeCenterPage /> },
  { path: '/kos-knowledge-graph', element: <knowledgeGraphPage /> },
  { path: '/kos-knowledge-graph/', element: <knowledgeGraphPage /> },
  { path: '/kos-knowledge-innovation-command', element: <knowledgeInnovationCommandPage /> },
  { path: '/kos-knowledge-innovation-command/', element: <knowledgeInnovationCommandPage /> },
  { path: '/kos-lead-scoring-command', element: <leadScoringCommandPage /> },
  { path: '/kos-lead-scoring-command/', element: <leadScoringCommandPage /> },
  { path: '/kos-leadership-agents', element: <leadershipAgentsPage /> },
  { path: '/kos-leadership-agents/', element: <leadershipAgentsPage /> },
  { path: '/kos-linkedin-distribution-program', element: <linkedInDistributionProgramPage /> },
  { path: '/kos-linkedin-distribution-program/', element: <linkedInDistributionProgramPage /> },
  { path: '/kos-linkedin-social-selling-engine', element: <linkedInSocialSellingEnginePage /> },
  { path: '/kos-linkedin-social-selling-engine/', element: <linkedInSocialSellingEnginePage /> },
  { path: '/kos-bu1-financial-regulation', element: <bU1FinancialRegulationPage /> },
  { path: '/kos-bu1-financial-regulation/', element: <bU1FinancialRegulationPage /> },
  { path: '/kos-bu2-governance-due-diligence', element: <bU2GovernanceDueDiligencePage /> },
  { path: '/kos-bu2-governance-due-diligence/', element: <bU2GovernanceDueDiligencePage /> },
  { path: '/kos-bu3-climate-esg', element: <bU3ClimateESGPage /> },
  { path: '/kos-bu3-climate-esg/', element: <bU3ClimateESGPage /> },
  { path: '/kos-bu4-kbr-model', element: <bU4KBRModelPage /> },
  { path: '/kos-bu4-kbr-model/', element: <bU4KBRModelPage /> },
  { path: '/kos-bu1-financial-regulation-en', element: <bU1FinancialRegulationEnPage /> },
  { path: '/kos-bu1-financial-regulation-en/', element: <bU1FinancialRegulationEnPage /> },
  { path: '/kos-bu2-governance-due-diligence-en', element: <bU2GovernanceDueDiligenceEnPage /> },
  { path: '/kos-bu2-governance-due-diligence-en/', element: <bU2GovernanceDueDiligenceEnPage /> },
  { path: '/kos-bu3-climate-esg-en', element: <bU3ClimateESGEnPage /> },
  { path: '/kos-bu3-climate-esg-en/', element: <bU3ClimateESGEnPage /> },
  { path: '/kos-bu4-kbr-model-en', element: <bU4KBRModelEnPage /> },
  { path: '/kos-bu4-kbr-model-en/', element: <bU4KBRModelEnPage /> },
  { path: '/kos-llm-experts-automates', element: <llmExpertsAutomatesPage /> },
  { path: '/kos-llm-experts-automates/', element: <llmExpertsAutomatesPage /> },
  { path: '/kos-llm-excellence-engine', element: <llmExcellenceEnginePage /> },
  { path: '/kos-llm-excellence-engine/', element: <llmExcellenceEnginePage /> },
  { path: '/kos-managing-partner-office', element: <managingPartnerOfficePage /> },
  { path: '/kos-managing-partner-office/', element: <managingPartnerOfficePage /> },
  { path: '/kos-market-intelligence-command', element: <marketIntelligenceCommandPage /> },
  { path: '/kos-market-intelligence-command/', element: <marketIntelligenceCommandPage /> },
  { path: '/kos-mdp-automator', element: <authGuard><mDPAutomatorPage /></authGuard> },
  { path: '/kos-mdp-automator/', element: <authGuard><mDPAutomatorPage /></authGuard> },
  { path: '/kos-orchestrator-engine', element: <orchestratorEnginePage /> },
  { path: '/kos-orchestrator-engine/', element: <orchestratorEnginePage /> },
  { path: '/kos-organisation-qualite-automates', element: <organisationQualiteAutomatesPage /> },
  { path: '/kos-organisation-qualite-automates/', element: <organisationQualiteAutomatesPage /> },
  { path: '/kos-performance-100-challenge', element: <performance100ChallengePage /> },
  { path: '/kos-performance-100-challenge/', element: <performance100ChallengePage /> },
  { path: '/kos-performance-core-command', element: <performanceCoreCommandPage /> },
  { path: '/kos-performance-core-command/', element: <performanceCoreCommandPage /> },
  { path: '/kos-performance-seo-command', element: <performanceSEOCommandPage /> },
  { path: '/kos-performance-seo-command/', element: <performanceSEOCommandPage /> },
  { path: '/kos-seo-perf-optimization', element: <sEOPerfOptimizationPage /> },
  { path: '/kos-seo-perf-optimization/', element: <sEOPerfOptimizationPage /> },
  { path: '/kos-production-command', element: <productionCommandPage /> },
  { path: '/kos-production-command/', element: <productionCommandPage /> },
  { path: '/kos-quality-excellence-command', element: <qualityExcellenceCommandPage /> },
  { path: '/kos-quality-excellence-command/', element: <qualityExcellenceCommandPage /> },
  { path: '/kos-referents-metiers-automates', element: <referentsMetiersAutomatesPage /> },
  { path: '/kos-referents-metiers-automates/', element: <referentsMetiersAutomatesPage /> },
  { path: '/kos-regulatory-compliance-audit', element: <regulatoryComplianceAuditPage /> },
  { path: '/kos-regulatory-compliance-audit/', element: <regulatoryComplianceAuditPage /> },
  { path: '/kos-regulatory-compliance-automates', element: <regulatoryComplianceAutomatesPage /> },
  { path: '/kos-regulatory-compliance-automates/', element: <regulatoryComplianceAutomatesPage /> },
  { path: '/kos-regulatory-compliance-engine', element: <regulatoryComplianceEnginePage /> },
  { path: '/kos-regulatory-compliance-engine/', element: <regulatoryComplianceEnginePage /> },
  { path: '/kos-regulatory-remediation-engine', element: <regulatoryRemediationEnginePage /> },
  { path: '/kos-regulatory-remediation-engine/', element: <regulatoryRemediationEnginePage /> },
  { path: '/kos-regulatory-intelligence-engine', element: <regulatoryIntelligenceCenterPage /> },
  { path: '/kos-regulatory-intelligence-engine/', element: <regulatoryIntelligenceCenterPage /> },
  { path: '/kos-digital-authority-engine', element: <digitalAuthorityEnginePage /> },
  { path: '/kos-digital-authority-engine/', element: <digitalAuthorityEnginePage /> },
  { path: '/kos-seo-performance-intelligence', element: <seoPerformanceIntelligencePage /> },
  { path: '/kos-seo-performance-intelligence/', element: <seoPerformanceIntelligencePage /> },
  { path: '/kos-domain-authority-intelligence', element: <domainAuthorityIntelligencePage /> },
  { path: '/kos-domain-authority-intelligence/', element: <domainAuthorityIntelligencePage /> },
  { path: '/kos-multi-agent-orchestration', element: <multiAgentOrchestrationPage /> },
  { path: '/kos-multi-agent-orchestration/', element: <multiAgentOrchestrationPage /> },
  { path: '/kos-big-four-maturity-assessment', element: <bigFourMaturityAssessmentPage /> },
  { path: '/kos-big-four-maturity-assessment/', element: <bigFourMaturityAssessmentPage /> },
  { path: '/kos-ai-compliance-fraud-intelligence', element: <aIComplianceFraudIntelligencePage /> },
  { path: '/kos-ai-compliance-fraud-intelligence/', element: <aIComplianceFraudIntelligencePage /> },
  { path: '/kos-francophone-africa-strategic-center', element: <francophoneAfricaStrategicCenterPage /> },
  { path: '/kos-francophone-africa-strategic-center/', element: <francophoneAfricaStrategicCenterPage /> },
  { path: '/kos-global-visibility-command', element: <globalVisibilityCommandPage /> },
  { path: '/kos-global-visibility-command/', element: <globalVisibilityCommandPage /> },
  { path: '/kos-esg-regulatory-alignment', element: <eSGRegulatoryAlignmentPage /> },
  { path: '/kos-esg-regulatory-alignment/', element: <eSGRegulatoryAlignmentPage /> },
  { path: '/kos-phase1-foundations-compliance', element: <phase1FoundationsCompliancePage /> },
  { path: '/kos-phase1-foundations-compliance/', element: <phase1FoundationsCompliancePage /> },
  { path: '/kos-research-institute', element: <researchInstitutePage /> },
  { path: '/kos-research-institute/', element: <researchInstitutePage /> },
  { path: '/kos-resource-command-center', element: <authGuard><resourceCommandCenterPage /></authGuard> },
  { path: '/kos-resource-command-center/', element: <authGuard><resourceCommandCenterPage /></authGuard> },
  { path: '/kos-risk-diligence-command', element: <riskDiligenceCommandPage /> },
  { path: '/kos-risk-diligence-command/', element: <riskDiligenceCommandPage /> },
  { path: '/kos-runtime', element: <runtimePage /> },
  { path: '/kos-runtime/', element: <runtimePage /> },
  { path: '/kos-schema-org-audit', element: <schemaOrgAuditPage /> },
  { path: '/kos-schema-org-audit/', element: <schemaOrgAuditPage /> },
  { path: '/kos-scientific-intelligence-enhancement', element: <scientificIntelligenceEnhancementPage /> },
  { path: '/kos-scientific-intelligence-enhancement/', element: <scientificIntelligenceEnhancementPage /> },
  { path: '/kos-security-command', element: <securityCommandPage /> },
  { path: '/kos-security-command/', element: <securityCommandPage /> },
  { path: '/kos-seo-aeo-command', element: <sEOaeoCommandPage /> },
  { path: '/kos-seo-aeo-command/', element: <sEOaeoCommandPage /> },
  { path: '/kos-seo-analytics-competitive', element: <seoAnalyticsCompetitivePage /> },
  { path: '/kos-seo-analytics-competitive/', element: <seoAnalyticsCompetitivePage /> },
  { path: '/kos-seo-autopilot', element: <seoAutopilotPage /> },
  { path: '/kos-seo-autopilot/', element: <seoAutopilotPage /> },
  { path: '/kos-seo-content-strategy', element: <seoContentStrategyPage /> },
  { path: '/kos-seo-content-strategy/', element: <seoContentStrategyPage /> },
  { path: '/kos-seo-cro-conversion', element: <seoCROConversionPage /> },
  { path: '/kos-seo-cro-conversion/', element: <seoCROConversionPage /> },
  { path: '/kos-seo-eeat-authority', element: <seoEEATAuthorityPage /> },
  { path: '/kos-seo-eeat-authority/', element: <seoEEATAuthorityPage /> },
  { path: '/kos-seo-international-multilingual', element: <seoInternationalMultilingualPage /> },
  { path: '/kos-seo-international-multilingual/', element: <seoInternationalMultilingualPage /> },
  { path: '/kos-seo-local-geo', element: <seoLocalGeoPage /> },
  { path: '/kos-seo-local-geo/', element: <seoLocalGeoPage /> },
  { path: '/kos-seo-onpage-content', element: <seoOnPageContentPage /> },
  { path: '/kos-seo-onpage-content/', element: <seoOnPageContentPage /> },
  { path: '/kos-seo-reporting-executive', element: <seoReportingExecutivePage /> },
  { path: '/kos-seo-reporting-executive/', element: <seoReportingExecutivePage /> },
  { path: '/kos-seo-social-authority', element: <seoSocialAuthorityPage /> },
  { path: '/kos-seo-social-authority/', element: <seoSocialAuthorityPage /> },
  { path: '/kos-social-media-command', element: <socialMediaCommandPage /> },
  { path: '/kos-social-media-command/', element: <socialMediaCommandPage /> },
  { path: '/kos-social-media-board', element: <socialMediaBoardPage /> },
  { path: '/kos-social-media-board/', element: <socialMediaBoardPage /> },
  { path: '/kos-social-publisher', element: <socialPublisherPage /> },
  { path: '/kos-social-publisher/', element: <socialPublisherPage /> },
  { path: '/youtube-callback', element: <YouTubeCallbackPage /> },
  { path: '/youtube-callback/', element: <YouTubeCallbackPage /> },
  { path: '/youtube-connect', element: <YouTubeConnectPage /> },
  { path: '/youtube-connect/', element: <YouTubeConnectPage /> },
  // TikTok OAuth
  { path: '/tiktok-callback', element: <TikTokCallbackPage /> },
  { path: '/tiktok-callback/', element: <TikTokCallbackPage /> },
  { path: '/tiktok-connect', element: <TikTokConnectPage /> },
  { path: '/tiktok-connect/', element: <TikTokConnectPage /> },
  { path: '/kos-multichannel-command', element: <multichannelCommandPage /> },
  { path: '/kos-multichannel-command/', element: <multichannelCommandPage /> },
  { path: '/kos-voice-ai-studio', element: <voiceAIStudioPage /> },
  { path: '/kos-voice-ai-studio/', element: <voiceAIStudioPage /> },
  { path: '/kos-community-manager-command', element: <communityManagerCommandPage /> },
  { path: '/kos-community-manager-command/', element: <communityManagerCommandPage /> },
  { path: '/kos-youtube-analytics', element: <youTubeAnalyticsPage /> },
  { path: '/kos-youtube-analytics/', element: <youTubeAnalyticsPage /> },
  { path: '/kos-strategic-intelligence', element: <strategicIntelligencePage /> },
  { path: '/kos-strategic-intelligence/', element: <strategicIntelligencePage /> },
  { path: '/kos-synchroniseur-maitre', element: <masterSynchronizerPage /> },
  { path: '/kos-synchroniseur-maitre/', element: <masterSynchronizerPage /> },
  { path: '/kos-tender-automates-audit', element: <tenderAutomatesAuditPage /> },
  { path: '/kos-tender-automates-audit/', element: <tenderAutomatesAuditPage /> },
  { path: '/kos-tender-intelligence', element: <tenderIntelligencePage /> },
  { path: '/kos-tender-intelligence/', element: <tenderIntelligencePage /> },
  { path: '/kos-think-tank-automates', element: <thinkTankAutomatesPage /> },
  { path: '/kos-think-tank-automates/', element: <thinkTankAutomatesPage /> },
  { path: '/kos-transformation-advisory-command', element: <transformationAdvisoryCommandPage /> },
  { path: '/kos-transformation-advisory-command/', element: <transformationAdvisoryCommandPage /> },
  { path: '/kos-transformation-esg-command', element: <transformationESGCommandPage /> },
  { path: '/kos-transformation-esg-command/', element: <transformationESGCommandPage /> },
  { path: '/kos-trust-center', element: <trustCenterPage /> },
  { path: '/kos-trust-center/', element: <trustCenterPage /> },
  { path: '/kos-unified-autopilot', element: <unifiedAutopilotPage /> },
  { path: '/kos-unified-autopilot/', element: <unifiedAutopilotPage /> },
  { path: '/kos-url-auto-pointage', element: <urlAutoPointagePage /> },
  { path: '/kos-url-auto-pointage/', element: <urlAutoPointagePage /> },
  { path: '/kos-web-operations-deployment', element: <webOperationsDeploymentPage /> },
  { path: '/kos-web-operations-deployment/', element: <webOperationsDeploymentPage /> },
  { path: '/kos-web-ops-automates', element: <webOpsAutomatesPage /> },
  { path: '/kos-web-ops-automates/', element: <webOpsAutomatesPage /> },
  { path: '/kos-strategic-positioning', element: <strategicPositioningPage /> },
  { path: '/kos-strategic-positioning/', element: <strategicPositioningPage /> },
  { path: '/kos-thought-leadership-center', element: <thoughtLeadershipCenterPage /> },
  { path: '/kos-thought-leadership-center/', element: <thoughtLeadershipCenterPage /> },
  { path: '/kos-africa-observatories', element: <africaObservatoriesPage /> },
  { path: '/kos-africa-observatories/', element: <africaObservatoriesPage /> },
  { path: '/ohada', element: <OHADADashboardPage /> },
  { path: '/ohada/', element: <OHADADashboardPage /> },
  { path: '/regulatory-intelligence', element: <RegulatoryIntelligenceDashboardPage /> },
  { path: '/regulatory-intelligence/', element: <RegulatoryIntelligenceDashboardPage /> },
  { path: '/think-tank', element: <ThinkTankPage /> },
  { path: '/think-tank/', element: <ThinkTankPage /> },
  { path: '/transfer-pricing', element: <TransferPricingPage /> },
  { path: '/transfer-pricing/', element: <TransferPricingPage /> },
  { path: '/kos-final-orchestration', element: <finalOrchestrationPage /> },
  { path: '/kos-final-orchestration/', element: <finalOrchestrationPage /> },
  { path: '/kos-production-go-live', element: <productionGoLivePage /> },
  { path: '/kos-production-go-live/', element: <productionGoLivePage /> },
  { path: '/kos-governance-formalization', element: <governanceFormalizationPage /> },
  { path: '/kos-governance-formalization/', element: <governanceFormalizationPage /> },
  { path: '/kos-compliance-security-certification', element: <complianceSecurityCertificationPage /> },
  { path: '/kos-compliance-security-certification/', element: <complianceSecurityCertificationPage /> },
  { path: '/kos-esg-sustainability-command', element: <eSGSustainabilityCommandPage /> },
  { path: '/kos-esg-sustainability-command/', element: <eSGSustainabilityCommandPage /> },
  { path: '/kos-digital-performance-command', element: <digitalPerformanceCommandPage /> },
  { path: '/kos-digital-performance-command/', element: <digitalPerformanceCommandPage /> },
  { path: '/kos-system-integrity-scanner', element: <systemIntegrityScannerPage /> },
  { path: '/kos-system-integrity-scanner/', element: <systemIntegrityScannerPage /> },
  { path: '/kos-scan-complet-execution', element: <scanCompletExecutionPage /> },
  { path: '/kos-scan-complet-execution/', element: <scanCompletExecutionPage /> },
  { path: '/kos-phase1-consolidation', element: <phase1ConsolidationPage /> },
  { path: '/kos-phase1-consolidation/', element: <phase1ConsolidationPage /> },
  { path: '/kos-phase2-securisation', element: <phase2SecurisationPage /> },
  { path: '/kos-phase2-securisation/', element: <phase2SecurisationPage /> },
  { path: '/kos-phase3-qualite', element: <phase3QualitePage /> },
  { path: '/kos-phase3-qualite/', element: <phase3QualitePage /> },
  { path: '/kos-phase4-go-live', element: <phase4GoLivePage /> },
  { path: '/kos-phase4-go-live/', element: <phase4GoLivePage /> },
  { path: '/kos-phase5-expansion', element: <phase5ExpansionPage /> },
  { path: '/kos-phase5-expansion/', element: <phase5ExpansionPage /> },
  { path: '/kos-phase6-innovation', element: <phase6InnovationPage /> },
  { path: '/kos-phase6-innovation/', element: <phase6InnovationPage /> },
  { path: '/kos-phase7-domination', element: <phase7DominationPage /> },
  { path: '/kos-phase7-domination/', element: <phase7DominationPage /> },
  { path: '/kos-phase8-singularite', element: <phase8SingularitePage /> },
  { path: '/kos-phase8-singularite/', element: <phase8SingularitePage /> },
  { path: '/kos-plan-consolidation-master-view', element: <planConsolidationMasterViewPage /> },
  { path: '/kos-plan-consolidation-master-view/', element: <planConsolidationMasterViewPage /> },
  { path: '/kos-cdo-engineering-command', element: <cDOEngineeringCommandPage /> },
  { path: '/kos-cdo-engineering-command/', element: <cDOEngineeringCommandPage /> },
  { path: '/kos-production-package-factory', element: <productionPackageFactoryPage /> },
  { path: '/kos-production-package-factory/', element: <productionPackageFactoryPage /> },
  { path: '/kos-sysops-health-resiliency-command', element: <sysOpsHealthResiliencyCommandPage /> },
  { path: '/kos-sysops-health-resiliency-command/', element: <sysOpsHealthResiliencyCommandPage /> },
  { path: '/kos-external-api-config-command', element: <externalApiConfigCommandPage /> },
  { path: '/kos-external-api-config-command/', element: <externalApiConfigCommandPage /> },
  { path: '/kos-youtube-autonomous-infrastructure', element: <youtubeAutonomousInfrastructurePage /> },
  { path: '/kos-youtube-autonomous-infrastructure/', element: <youtubeAutonomousInfrastructurePage /> },
  { path: '/kos-youtube-production-pipeline', element: <youtubeProductionPipelinePage /> },
  { path: '/kos-youtube-production-pipeline/', element: <youtubeProductionPipelinePage /> },
  { path: '/kos-youtube-system-scanner', element: <youtubeSystemScannerPage /> },
  { path: '/kos-youtube-system-scanner/', element: <youtubeSystemScannerPage /> },
  { path: '/kos-youtube-monitoring', element: <youtubeMonitoringPage /> },
  { path: '/kos-youtube-monitoring/', element: <youtubeMonitoringPage /> },
  { path: '/kos-youtube-download', element: <youtubeDownloadPage /> },
  { path: '/kos-youtube-download/', element: <youtubeDownloadPage /> },
  { path: '/kos-video-podcast-publishing-pack', element: <videoPodcastPublishingPackPage /> },
  { path: '/kos-video-podcast-publishing-pack/', element: <videoPodcastPublishingPackPage /> },
  { path: '/youtube-download-center', element: <YoutubeDownloadCenterPage /> },
  { path: '/youtube-download-center/', element: <YoutubeDownloadCenterPage /> },
  { path: '/youtube-pending', element: <YoutubePendingPage /> },
  { path: '/youtube-pending/', element: <YoutubePendingPage /> },
  { path: '/kos-total-governance-regulatory-excellence', element: <totalGovernanceRegulatoryExcellencePage /> },
  { path: '/kos-total-governance-regulatory-excellence/', element: <totalGovernanceRegulatoryExcellencePage /> },
  { path: '/kos-global-system-upgrade', element: <globalSystemUpgradePage /> },
  { path: '/kos-global-system-upgrade/', element: <globalSystemUpgradePage /> },
  { path: '/kos-youtube-hybrid-recovery', element: <youtubeHybridRecoveryPage /> },
  { path: '/kos-youtube-hybrid-recovery/', element: <youtubeHybridRecoveryPage /> },
  { path: '/kos-url-indexation-command', element: <urlIndexationCommandPage /> },
  { path: '/kos-url-indexation-command/', element: <urlIndexationCommandPage /> },
  { path: '/kos-banking-stack', element: <bankingStackPage /> },
  { path: '/kos-banking-stack/', element: <bankingStackPage /> },
  { path: '/kos-enterprise-consolidation', element: <enterpriseConsolidationPage /> },
  { path: '/kos-enterprise-consolidation/', element: <enterpriseConsolidationPage /> },
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
  { path: '/kos-audience-dashboard', element: <audienceDashboardPage /> },
  { path: '/kos-audience-dashboard/', element: <audienceDashboardPage /> },
  { path: '/kos-self-evolution', element: <selfEvolutionPage /> },
  { path: '/kos-self-evolution/', element: <selfEvolutionPage /> },
  { path: '/kos-proprietary-voice-factory', element: <proprietaryVoiceFactoryPage /> },
  { path: '/kos-proprietary-voice-factory/', element: <proprietaryVoiceFactoryPage /> },
  { path: '/kos-autonomous-stack', element: <autonomousStackPage /> },
  { path: '/kos-autonomous-stack/', element: <autonomousStackPage /> },
  { path: '/kos-knowledge-factory', element: <knowledgeFactoryPage /> },
  { path: '/kos-knowledge-factory/', element: <knowledgeFactoryPage /> },
  { path: '/kos-podcast-factory', element: <podcastFactoryPage /> },
  { path: '/kos-podcast-factory/', element: <podcastFactoryPage /> },
  { path: '/kos-interview-factory', element: <interviewFactoryPage /> },
  { path: '/kos-interview-factory/', element: <interviewFactoryPage /> },
  { path: '/kos-canva-factory', element: <canvaFactoryPage /> },
  { path: '/kos-canva-factory/', element: <canvaFactoryPage /> },
  { path: '/kos-powerpoint-factory', element: <powerPointFactoryPage /> },
  { path: '/kos-powerpoint-factory/', element: <powerPointFactoryPage /> },
  { path: '/kos-video-factory', element: <videoFactoryPage /> },
  { path: '/kos-video-factory/', element: <videoFactoryPage /> },
  { path: '/kos-voice-factory', element: <voiceFactoryPage /> },
  { path: '/kos-voice-factory/', element: <voiceFactoryPage /> },
  { path: '/kos-youtube-factory', element: <youTubeFactoryPage /> },
  { path: '/kos-youtube-factory/', element: <youTubeFactoryPage /> },
  { path: '/kos-autonomous-media-command-center', element: <autonomousMediaCommandCenterPage /> },
  { path: '/kos-autonomous-media-command-center/', element: <autonomousMediaCommandCenterPage /> },
  { path: '/kos-ultimate-cockpit', element: <ultimateCockpitPage /> },
  { path: '/kos-ultimate-cockpit/', element: <ultimateCockpitPage /> },
  { path: '/kos-war-room', element: <warRoomPage /> },
  { path: '/kos-war-room/', element: <warRoomPage /> },
  { path: '/kos-zero-budget-sprint', element: <zeroBudgetSprintPage /> },
  { path: '/kos-zero-budget-sprint/', element: <zeroBudgetSprintPage /> },
  { path: '/kos-zero-budget-sprint-2', element: <zeroBudgetSprint2Page /> },
  { path: '/kos-zero-budget-sprint-2/', element: <zeroBudgetSprint2Page /> },
  { path: '/kos-budget-unleashed-sprint', element: <budgetUnleashedSprintPage /> },
  { path: '/kos-budget-unleashed-sprint/', element: <budgetUnleashedSprintPage /> },
  { path: '/kos-full-system-security-scan', element: <fullSystemSecurityScanPage /> },
  { path: '/kos-full-system-security-scan/', element: <fullSystemSecurityScanPage /> },
  { path: '/kos-complete-performance-visibility-120-upgrade', element: <completePerformanceVisibility120UpgradePage /> },
  { path: '/kos-complete-performance-visibility-120-upgrade/', element: <completePerformanceVisibility120UpgradePage /> },
  { path: '/kos-api-independence', element: <apiIndependencePage /> },
  { path: '/kos-api-independence/', element: <apiIndependencePage /> },
  { path: '/kos-ultra-lead-magnets', element: <ultraLeadMagnetsPage /> },
  { path: '/kos-ultra-lead-magnets/', element: <ultraLeadMagnetsPage /> },
  { path: '/kos-regulatory-compliance-scanner', element: <regulatoryComplianceScannerPage /> },
  { path: '/kos-regulatory-compliance-scanner/', element: <regulatoryComplianceScannerPage /> },
  { path: '/kos-autonomous-ai-media', element: <autonomousAIMediaPage /> },
  { path: '/kos-autonomous-ai-media/', element: <autonomousAIMediaPage /> },
  { path: '/kos-seo-aeo-public', element: <seoAeoPublicPage /> },
  { path: '/kos-seo-aeo-public/', element: <seoAeoPublicPage /> },
  { path: '/kos-risk-kri-heatmap', element: <riskKriHeatmapPage /> },
  { path: '/kos-risk-kri-heatmap/', element: <riskKriHeatmapPage /> },
  { path: '/kos-legal-ai-governance', element: <legalAIGovernancePage /> },
  { path: '/kos-legal-ai-governance/', element: <legalAIGovernancePage /> },
  { path: '/kos-quality-innovation', element: <qualityInnovationPage /> },
  { path: '/kos-quality-innovation/', element: <qualityInnovationPage /> },
  { path: '/kos-auto-learning-agentic', element: <autoLearningAgenticPage /> },
  { path: '/kos-auto-learning-agentic/', element: <autoLearningAgenticPage /> },
  { path: '/kos-auto-learning-engine', element: <autoLearningEnginePage /> },
  { path: '/kos-auto-learning-engine/', element: <autoLearningEnginePage /> },
  { path: '/kos-auto-memorization', element: <autoMemorizationPage /> },
  { path: '/kos-auto-memorization/', element: <autoMemorizationPage /> },
  { path: '/kos-autonomous-regulatory-watch', element: <autonomousRegulatoryWatchPage /> },
  { path: '/kos-autonomous-regulatory-watch/', element: <autonomousRegulatoryWatchPage /> },
  { path: '/kos-autonomous-digital-marketing', element: <autonomousDigitalMarketingPage /> },
  { path: '/kos-autonomous-digital-marketing/', element: <autonomousDigitalMarketingPage /> },
  { path: '/kos-autonomous-think-tank', element: <autonomousThinkTankPage /> },
  { path: '/kos-autonomous-think-tank/', element: <autonomousThinkTankPage /> },
  { path: '/kos-150-big-four-action-plan', element: <KOS150BigFourActionPlanPage /> },
  { path: '/kos-150-big-four-action-plan/', element: <KOS150BigFourActionPlanPage /> },
  { path: '/kos-150-big-four-self-development', element: <KOS150BigFourSelfDevelopmentPage /> },
  { path: '/kos-150-big-four-self-development/', element: <KOS150BigFourSelfDevelopmentPage /> },
  { path: '/kos-autonomous-knowledge-pipeline', element: <autonomousKnowledgePipelinePage /> },
  { path: '/kos-autonomous-knowledge-pipeline/', element: <autonomousKnowledgePipelinePage /> },
  { path: '/kos-sovereign-init', element: <sovereignInitPage /> },
  { path: '/kos-sovereign-init/', element: <sovereignInitPage /> },
  { path: '/kos-total-system-optimization', element: <totalSystemOptimizationPage /> },
  { path: '/kos-total-system-optimization/', element: <totalSystemOptimizationPage /> },
  { path: '/kos-regulatory-brain', element: <regulatoryBrainPage /> },
  { path: '/kos-regulatory-brain/', element: <regulatoryBrainPage /> },
  { path: '/kos-workflow-orchestrator', element: <workflowOrchestratorPage /> },
  { path: '/kos-workflow-orchestrator/', element: <workflowOrchestratorPage /> },
  { path: '/kos-senior-compliance-auditor', element: <seniorComplianceAuditorPage /> },
  { path: '/kos-senior-compliance-auditor/', element: <seniorComplianceAuditorPage /> },
  { path: '/kos-compliance-factory-engine', element: <complianceFactoryEnginePage /> },
  { path: '/kos-compliance-factory-engine/', element: <complianceFactoryEnginePage /> },
  { path: '/kos-website-automation-engine', element: <websiteAutomationEnginePage /> },
  { path: '/kos-website-automation-engine/', element: <websiteAutomationEnginePage /> },
  { path: '/kos-autonomous-compliance-pipeline', element: <autonomousCompliancePipelinePage /> },
  { path: '/kos-autonomous-compliance-pipeline/', element: <autonomousCompliancePipelinePage /> },
  { path: '/kos-regulatory-data-architect', element: <regulatoryDataArchitectPage /> },
  { path: '/kos-regulatory-data-architect/', element: <regulatoryDataArchitectPage /> },
  { path: '/kos-tests-par-bloc', element: <testsParBlocPage /> },
  { path: '/kos-tests-par-bloc/', element: <testsParBlocPage /> },
  { path: '/kos-transformation-office', element: <transformationOfficePage /> },
  { path: '/kos-transformation-office/', element: <transformationOfficePage /> },
  { path: '/strategie-digitale', element: <StrategieDigitalePage /> },
  { path: '/strategie-digitale/', element: <StrategieDigitalePage /> },
  { path: '/kos-auto-expansion-academy', element: <autoExpansionAcademyPage /> },
  { path: '/kos-auto-expansion-academy/', element: <autoExpansionAcademyPage /> },
  { path: '/kos-closing-growth-engine', element: <closingGrowthEnginePage /> },
  { path: '/kos-closing-growth-engine/', element: <closingGrowthEnginePage /> },
  { path: '/kos-regulatory-citation-validator', element: <regulatoryCitationValidatorPage /> },
  { path: '/kos-regulatory-citation-validator/', element: <regulatoryCitationValidatorPage /> },
  { path: '/kos-regulatory-health', element: <regulatoryHealthDashboardPage /> },
  { path: '/kos-regulatory-health/', element: <regulatoryHealthDashboardPage /> },
  { path: '/kos-iso-bigfour-total-compliance-control', element: <iSOBigFourTotalComplianceControlPage /> },
  { path: '/kos-iso-bigfour-total-compliance-control/', element: <iSOBigFourTotalComplianceControlPage /> },
  { path: '/kos-ai-upgrade-dashboard', element: <aIUpgradeDashboardPage /> },
  { path: '/kos-ai-upgrade-dashboard/', element: <aIUpgradeDashboardPage /> },
  { path: '/kos-knowledge-monetization-engine', element: <knowledgeMonetizationEnginePage /> },
  { path: '/kos-knowledge-monetization-engine/', element: <knowledgeMonetizationEnginePage /> },
  { path: '/kos-regulatory-observatory-africa', element: <regulatoryObservatoryAfricaPage /> },
  { path: '/kos-regulatory-observatory-africa/', element: <regulatoryObservatoryAfricaPage /> },
  { path: '/kos-enterprise-risk-resilience', element: <enterpriseRiskResiliencePage /> },
  { path: '/kos-enterprise-risk-resilience/', element: <enterpriseRiskResiliencePage /> },
  { path: '/kos-client-trust-digital-authority', element: <clientTrustDigitalAuthorityPage /> },
  { path: '/kos-client-trust-digital-authority/', element: <clientTrustDigitalAuthorityPage /> },
  { path: '/kos-ai-sovereignty-ethics', element: <aISovereigntyEthicsPage /> },
  { path: '/kos-ai-sovereignty-ethics/', element: <aISovereigntyEthicsPage /> },
  { path: '/kos-africa-intelligence-command', element: <africaIntelligenceCommandPage /> },
  { path: '/kos-africa-intelligence-command/', element: <africaIntelligenceCommandPage /> },
  { path: '/kos-observatoire-bceao', element: <observatoireBCEAOPage /> },
  { path: '/kos-observatoire-bceao/', element: <observatoireBCEAOPage /> },
  { path: '/kos-observatoire-beac', element: <observatoireBEACPage /> },
  { path: '/kos-observatoire-beac/', element: <observatoireBEACPage /> },
  { path: '/kos-observatoire-cobac', element: <observatoireCOBACPage /> },
  { path: '/kos-observatoire-cobac/', element: <observatoireCOBACPage /> },
  { path: '/kos-automation-engine', element: <automationEnginePage /> },
  { path: '/kos-automation-engine/', element: <automationEnginePage /> },
  { path: '/kos-odske-dashboard', element: <odskeDashboardPage /> },
  { path: '/kos-odske-dashboard/', element: <odskeDashboardPage /> },
  { path: '/kos-cas-dashboard', element: <correctiveSystemDashboardPage /> },
  { path: '/kos-cas-dashboard/', element: <correctiveSystemDashboardPage /> },
  { path: '/kos-enterprise-transformation-assessment-360', element: <enterpriseTransformationAssessment360Page /> },
  { path: '/kos-enterprise-transformation-assessment-360/', element: <enterpriseTransformationAssessment360Page /> },
  { path: '/kos-corrective-action-blocks', element: <correctiveActionBlocksPage /> },
  { path: '/kos-corrective-action-blocks/', element: <correctiveActionBlocksPage /> },
  { path: '/kos-p0-execution', element: <p0ExecutionPage /> },
  { path: '/kos-p0-execution/', element: <p0ExecutionPage /> },
  { path: '/kos-p1-execution', element: <p1ExecutionPage /> },
  { path: '/kos-p1-execution/', element: <p1ExecutionPage /> },
  { path: '/kos-tasks-restantes-100', element: <tasksRestantes100Page /> },
  { path: '/kos-tasks-restantes-100/', element: <tasksRestantes100Page /> },
  { path: '/kos-production-sovereignty', element: <productionSovereigntyPage /> },
  { path: '/kos-production-sovereignty/', element: <productionSovereigntyPage /> },
  { path: '/kos-audit-final-analysis', element: <auditFinalAnalysisPage /> },
  { path: '/kos-audit-final-analysis/', element: <auditFinalAnalysisPage /> },
  { path: '/kos-phase1-p0-immediate', element: <phase1P0ImmediatePage /> },
  { path: '/kos-phase1-p0-immediate/', element: <phase1P0ImmediatePage /> },
  { path: '/kos-phase2-p0-p1', element: <phase2P0P1Page /> },
  { path: '/kos-phase2-p0-p1/', element: <phase2P0P1Page /> },
  { path: '/kos-phase3-expansion', element: <phase3ExpansionPage /> },
  { path: '/kos-phase3-expansion/', element: <phase3ExpansionPage /> },
  { path: '/kos-executive-cockpit', element: <executiveCockpitPage /> },
  { path: '/kos-executive-cockpit/', element: <executiveCockpitPage /> },
  { path: '/kos-iso-27001-audit-report', element: <iSO27001AuditReportPage /> },
  { path: '/kos-iso-27001-audit-report/', element: <iSO27001AuditReportPage /> },
  { path: '/kos-iso-42001-ai-governance', element: <iSO42001AIGovernancePage /> },
  { path: '/kos-iso-42001-ai-governance/', element: <iSO42001AIGovernancePage /> },
  { path: '/kos-iso-9001-quality-management', element: <iSO9001QualityManagementPage /> },
  { path: '/kos-iso-9001-quality-management/', element: <iSO9001QualityManagementPage /> },
  { path: '/kos-security-dashboard', element: <securityDashboardPage /> },
  { path: '/kos-security-dashboard/', element: <securityDashboardPage /> },
  { path: '/kos-rls-dashboard', element: <rlsDashboardPage /> },
  { path: '/kos-rls-dashboard/', element: <rlsDashboardPage /> },
  { path: '/kbr-dashboard', element: <KBRDashboardPage /> },
  { path: '/kbr-dashboard/', element: <KBRDashboardPage /> },
  { path: '/kos-kbr-analytics', element: <kBRAnalyticsPage /> },
  { path: '/kos-kbr-analytics/', element: <kBRAnalyticsPage /> },
  { path: '/kos-legislative-analyst', element: <legislativeAnalystPage /> },
  { path: '/kos-legislative-analyst/', element: <legislativeAnalystPage /> },
  { path: '/kos-scientific-director', element: <scientificDirectorPage /> },
  { path: '/kos-scientific-director/', element: <scientificDirectorPage /> },
  { path: '/kos-growth-commercial-strategy', element: <growthCommercialStrategyPage /> },
  { path: '/kos-growth-commercial-strategy/', element: <growthCommercialStrategyPage /> },
  { path: '/kos-mass-infra-upgrade', element: <massInfraUpgradePage /> },
  { path: '/kos-mass-infra-upgrade/', element: <massInfraUpgradePage /> },
  { path: '/kos-cdo-innovation-command', element: <cdoInnovationCommandPage /> },
  { path: '/kos-cdo-innovation-command/', element: <cdoInnovationCommandPage /> },
  { path: '/kos-chief-agentic-architect', element: <chiefAgenticArchitectPage /> },
  { path: '/kos-chief-agentic-architect/', element: <chiefAgenticArchitectPage /> },
  { path: '/kos-enterprise-security-resilience', element: <enterpriseSecurityResiliencePage /> },
  { path: '/kos-enterprise-security-resilience/', element: <enterpriseSecurityResiliencePage /> },
  { path: '/kos-rag-full-seed', element: <ragFullSeedPage /> },
  { path: '/kos-rag-full-seed/', element: <ragFullSeedPage /> },
  // P1-P5 Master Prompts
  { path: '/kos-rag-orchestrator', element: <ragOrchestratorPage /> },
  { path: '/kos-rag-orchestrator/', element: <ragOrchestratorPage /> },
  { path: '/kos-auto-seeding', element: <autoSeedingPage /> },
  { path: '/kos-auto-seeding/', element: <autoSeedingPage /> },
  { path: '/kos-seo-geo-eeat', element: <seoGeoEeatPage /> },
  { path: '/kos-seo-geo-eeat/', element: <seoGeoEeatPage /> },
  { path: '/kos-hbr-generator', element: <hbrGeneratorPage /> },
  { path: '/kos-hbr-generator/', element: <hbrGeneratorPage /> },
  { path: '/kos-quality-monitor', element: <qualityMonitorPage /> },
  { path: '/kos-quality-monitor/', element: <qualityMonitorPage /> },
  { path: '/kos-total-quality-review', element: <totalQualityReviewPage /> },
  { path: '/kos-total-quality-review/', element: <totalQualityReviewPage /> },
  { path: '/kos-test-engines', element: <testEnginesPage /> },
  { path: '/kos-test-engines/', element: <testEnginesPage /> },
  { path: '/kos-genora-capitalization', element: <genoraCapitalizationPage /> },
  { path: '/kos-genora-capitalization/', element: <genoraCapitalizationPage /> },
  { path: '/kos-knowledge-capitalization', element: <knowledgeCapitalizationPage /> },
  { path: '/kos-knowledge-capitalization/', element: <knowledgeCapitalizationPage /> },
  { path: '/kos-full-upgrade-compliance', element: <fullUpgradeCompliancePage /> },
  { path: '/kos-full-upgrade-compliance/', element: <fullUpgradeCompliancePage /> },
  { path: '/kos-zero-defect-command', element: <authGuard><zeroDefectCommandPage /></authGuard> },
  { path: '/kos-zero-defect-command/', element: <authGuard><zeroDefectCommandPage /></authGuard> },
  { path: '/kos-big-four-gov-okr', element: <bigFourGovOKRPage /> },
  { path: '/kos-big-four-gov-okr/', element: <bigFourGovOKRPage /> },
  { path: '/kos-predictive-correction-engine', element: <predictiveCorrectionEnginePage /> },
  { path: '/kos-predictive-correction-engine/', element: <predictiveCorrectionEnginePage /> },
  { path: '/kos-agent-auto-development', element: <agentAutoDevelopmentPage /> },
  { path: '/kos-agent-auto-development/', element: <agentAutoDevelopmentPage /> },
  { path: '/kos-bigfour-quality-governance', element: <bigFourQualityGovernancePage /> },
  { path: '/kos-bigfour-quality-governance/', element: <bigFourQualityGovernancePage /> },
  { path: '/kos-bloc-total-compliance', element: <blocTotalCompliancePage /> },
  { path: '/kos-bloc-total-compliance/', element: <blocTotalCompliancePage /> },
  { path: '/kos-compliance-engine-v31', element: <complianceEngineV31Page /> },
  { path: '/kos-compliance-engine-v31/', element: <complianceEngineV31Page /> },
  { path: '/kos-compliance-engine-v40', element: <complianceEngineV40Page /> },
  { path: '/kos-compliance-engine-v40/', element: <complianceEngineV40Page /> },
  { path: '/kos-alert-v41', element: <alertV41Page /> },
  { path: '/kos-alert-v41/', element: <alertV41Page /> },
  { path: '/kos-master-prompt-v50', element: <masterPromptV50Page /> },
  { path: '/kos-master-prompt-v50/', element: <masterPromptV50Page /> },
  { path: '/kos-master-prompt-v60', element: <masterPromptV60Page /> },
  { path: '/kos-master-prompt-v60/', element: <masterPromptV60Page /> },
  { path: '/kos-sovereign-control-tower', element: <sovereignControlTowerPage /> },
  { path: '/kos-sovereign-control-tower/', element: <sovereignControlTowerPage /> },
  { path: '/kos-universal-crawler', element: <universalCrawlerPage /> },
  { path: '/kos-universal-crawler/', element: <universalCrawlerPage /> },
  { path: '/kos-full-block-execution', element: <fullBlockExecutionPage /> },
  { path: '/kos-full-block-execution/', element: <fullBlockExecutionPage /> },
  { path: '/kos-big4-khepra-architect', element: <big4KhepraArchitectPage /> },
  { path: '/kos-big4-khepra-architect/', element: <big4KhepraArchitectPage /> },
  { path: '/kos-agrement-os', element: <agrementOSPage /> },
  { path: '/kos-agrement-os/', element: <agrementOSPage /> },
  { path: '/kos-rex-template', element: <rexTemplatePage /> },
  { path: '/kos-rex-template/', element: <rexTemplatePage /> },
  { path: '/kos-agrement-os-module-1', element: <agrementOSModule1Page /> },
  { path: '/kos-agrement-os-module-1/', element: <agrementOSModule1Page /> },
  { path: '/kos-khepra-architect', element: <khepraArchitectPage /> },
  { path: '/kos-khepra-architect/', element: <khepraArchitectPage /> },
  { path: '/kos-search', element: <searchPage /> },
  { path: '/kos-search/', element: <searchPage /> },
  { path: '/kos-cognitive-os', element: <cognitiveOSPage /> },
  { path: '/kos-cognitive-os/', element: <cognitiveOSPage /> },
  { path: '/kos-ia-agents', element: <iAAgentsPage /> },
  { path: '/kos-ia-agents/', element: <iAAgentsPage /> },
  { path: '/kos-gmb-ohada', element: <gmbOhadaPage /> },
  { path: '/kos-gmb-ohada/', element: <gmbOhadaPage /> },
  { path: '/kos-bigfour-audit-execution', element: <bigFourAuditExecutionPage /> },
  { path: '/kos-bigfour-audit-execution/', element: <bigFourAuditExecutionPage /> },
  { path: '/kos-bigfour-audit', element: <bigFourAuditPage /> },
  { path: '/kos-bigfour-audit/', element: <bigFourAuditPage /> },
  { path: '/kos-oauth-security-corrections', element: <oAuthSecurityCorrectionsPage /> },
  { path: '/kos-oauth-security-corrections/', element: <oAuthSecurityCorrectionsPage /> },
  { path: '/kos-oauth-demo', element: <oAuthDemoPage /> },
  { path: '/kos-oauth-demo/', element: <oAuthDemoPage /> },
  { path: '/kos-full-seed-cockpit', element: <fullSeedCockpitPage /> },
  { path: '/kos-full-seed-cockpit/', element: <fullSeedCockpitPage /> },
  { path: '/kos-regtech-dashboard', element: <regtechDashboardPage /> },
  { path: '/kos-regtech-dashboard/', element: <regtechDashboardPage /> },
  { path: '/kos-regtech-ai/video-control', element: <videoControlCenterPage /> },
  { path: '/kos-regtech-ai/video-control/', element: <videoControlCenterPage /> },
  { path: '/kos-bigfour-executive-memo', element: <bigFourExecutiveMemoPage /> },
  { path: '/kos-bigfour-executive-memo/', element: <bigFourExecutiveMemoPage /> },
  { path: '/kos-corpus-ingest', element: <corpusIngestPage /> },
  { path: '/kos-corpus-ingest/', element: <corpusIngestPage /> },
  { path: '/kos-correctives-dashboard', element: <correctivesDashboardPage /> },
  { path: '/kos-correctives-dashboard/', element: <correctivesDashboardPage /> },
  { path: '/kos-data-leakage-corrector', element: <dataLeakageCorrectorPage /> },
  { path: '/kos-data-leakage-corrector/', element: <dataLeakageCorrectorPage /> },
  { path: '/kos-regulatory-obligations', element: <regulatoryObligationsDashboardPage /> },
  { path: '/kos-regulatory-obligations/', element: <regulatoryObligationsDashboardPage /> },
  { path: '/kos-autonomous-orchestrator', element: <autonomousOrchestratorPage /> },
  { path: '/kos-autonomous-orchestrator/', element: <autonomousOrchestratorPage /> },
  { path: '/kos-regulatory-chat', element: <regulatoryChatPage /> },
  { path: '/kos-regulatory-chat/', element: <regulatoryChatPage /> },
  { path: '/kos-cartographie-controles-automatisables', element: <cartographieControlesAutomatisablesPage /> },
  { path: '/kos-cartographie-controles-automatisables/', element: <cartographieControlesAutomatisablesPage /> },
  { path: '/kos-auto-knowledge-development', element: <autoKnowledgeDevelopmentPage /> },
  { path: '/kos-auto-knowledge-development/', element: <autoKnowledgeDevelopmentPage /> },
  { path: '/risk-dashboard', element: <RiskDashboardPage /> },
  { path: '/esg-dashboard', element: <ESGDashboardPage /> },
  { path: '/esg-dashboard/', element: <ESGDashboardPage /> },
  { path: '/note-ca', element: <NoteCADashboardPage /> },
  { path: '/note-ca/', element: <NoteCADashboardPage /> },
];

// Applique authGuard à toutes les routes sauf /kos-access (login) et /kos (landing)
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
export const routes: RouteObject[] = _kosRoutes.map(route => ({
  ...route,
  element: PUBLIC_KOS_PATHS.has(route.path || '') ? route.element : <authGuard>{route.element}</authGuard>,
}));




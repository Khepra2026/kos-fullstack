// ═══════════════════════════════════════════════════════════════════
// KOS Social Media Quality Engine™ — Big Four Standard
// Scoring 5 dimensions · Contrôle hashtags · Vérification sources
// Journal d'audit · Rapport exécutif · Publication ≥ 95/100
// ═══════════════════════════════════════════════════════════════════

// ─── HASHTAGS AUTORISÉS (MASTER PROMPT) ─────────────────────────────
export const AUTHORIZED_HASHTAGS: string[] = [
  '#KHEPRAExperts',
  '#Gouvernance',
  '#BCEAO',
  '#COBAC',
  '#AuditInterne',
  '#GestionDesRisques',
  '#LBCFT',
  '#Conformité',
  '#TransformationDigitale',
  '#PrixDeTransfert',
  '#Fiscalité',
  '#ESG',
  '#OHADA',
  '#UEMOA',
  '#CEMAC',
];

// ─── SOURCES PRIORITAIRES ────────────────────────────────────────────
export const PRIORITY_SOURCES: string[] = [
  'BCEAO',
  'COBAC',
  'BEAC',
  'OHADA',
  'UEMOA',
  'CEMAC',
  'OCDE',
  'Banque Mondiale',
  'FMI',
  'IFC',
  'GAFI',
];

// ─── SOURCES INTERDITES ─────────────────────────────────────────────
export const FORBIDDEN_SOURCE_PATTERNS: string[] = [
  'blogspot',
  'wordpress.com',
  'medium.com/@',
  'substack.com',
  'wixsite.com',
  'weebly.com',
];

export const FORBIDDEN_SOURCE_INDICATORS: string[] = [
  'blog anonyme',
  'source inconnue',
  'IA générée sans vérification',
  'contenu non sourcé',
  'information non confirmée',
];

// ─── STRUCTURE OBLIGATOIRE D'UN POST ─────────────────────────────────
export const POST_STRUCTURE_REQUIREMENTS = {
  hook_dirigeant: { label: 'Hook dirigeant', weight: 15, description: 'Phrase d\'accroche percutante en début de post' },
  valeur_metier: { label: 'Valeur métier', weight: 15, description: 'Apport concret pour le lecteur professionnel' },
  insight_reglementaire: { label: 'Insight réglementaire', weight: 20, description: 'Référence à une norme, circulaire ou texte officiel' },
  call_to_action: { label: 'Call-to-Action', weight: 15, description: 'Invitation claire à l\'action (téléchargement, contact, commentaire)' },
  url_valide: { label: 'URL valide', weight: 20, description: 'Lien accessible, indexable, avec OG tags' },
  hashtags_coherents: { label: 'Hashtags cohérents', weight: 15, description: 'Uniquement hashtags autorisés, 3-6 max, pertinents' },
};

// ─── TYPES ───────────────────────────────────────────────────────────

export interface QualityDimension {
  name: string;
  score: number;       // 0-20
  max: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  details: string[];
  issues: string[];
}

export interface PostQualityReport {
  post_id: number;
  post_title: string;
  platform: string;
  compliance: QualityDimension;
  credibility: QualityDimension;
  seo: QualityDimension;
  engagement: QualityDimension;
  linkedin: QualityDimension;
  global_score: number;  // 0-100
  authorized_for_publication: boolean;
  hashtag_violations: string[];
  source_violations: string[];
  structure_gaps: string[];
  unverified_claims: string[];
  recommendation: string;
  audited_at: string;
}

export interface QualityCycleReport {
  cycle_id: string;
  cycle_date: string;
  total_posts_analyzed: number;
  posts_corrected: number;
  urls_corrected: number;
  average_score: number;
  compliance_rate: number;
  posts_authorized: number;
  posts_blocked: number;
  top_issues: { issue: string; count: number; severity: string }[];
  recommendations: string[];
  posts_detail: PostQualityReport[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  post_id: number;
  post_title: string;
  action: 'scan' | 'correct' | 'block' | 'authorize' | 'flag';
  severity: 'info' | 'warning' | 'critical';
  detail: string;
  score_before?: number;
  score_after?: number;
}

// ─── SCORING ENGINE ──────────────────────────────────────────────────

function scoreDimension(score: number): QualityDimension['status'] {
  if (score >= 17) return 'excellent';
  if (score >= 13) return 'good';
  if (score >= 8) return 'warning';
  return 'critical';
}

function checkHashtags(hashtags: string[]): { violations: string[]; score: number } {
  const violations: string[] = [];
  for (const tag of hashtags) {
    const normalized = tag.startsWith('#') ? tag : `#${tag}`;
    if (!AUTHORIZED_HASHTAGS.includes(normalized)) {
      violations.push(normalized);
    }
  }
  const complianceRatio = hashtags.length > 0
    ? (hashtags.length - violations.length) / hashtags.length
    : 0;
  return {
    violations,
    score: Math.round(complianceRatio * 15),
  };
}

function checkSourceQuality(sourceUrl: string, content: string): { violations: string[]; score: number; hasPrioritySource: boolean } {
  const violations: string[] = [];
  let hasPrioritySource = false;

  // Check forbidden domains
  for (const pattern of FORBIDDEN_SOURCE_PATTERNS) {
    if (sourceUrl.toLowerCase().includes(pattern)) {
      violations.push(`Domaine interdit détecté : ${pattern}`);
    }
  }

  // Check forbidden indicators in content
  for (const indicator of FORBIDDEN_SOURCE_INDICATORS) {
    if (content.toLowerCase().includes(indicator.toLowerCase())) {
      violations.push(`Indicateur source non fiable : "${indicator}"`);
    }
  }

  // Check for priority sources in content
  for (const source of PRIORITY_SOURCES) {
    if (content.includes(source)) {
      hasPrioritySource = true;
      break;
    }
  }

  let score = 15;
  if (violations.length > 0) score -= violations.length * 5;
  if (!hasPrioritySource) score -= 3;
  return {
    violations,
    score: Math.max(0, Math.min(20, hasPrioritySource ? score + 5 : score)),
    hasPrioritySource,
  };
}

function checkUnverifiedClaims(content: string): string[] {
  const claims: string[] = [];
  const patterns = [
    /toutes les banques/gi,
    /100%\s*(des|de)/gi,
    /jamais/gi,
    /toujours/gi,
    /sans exception/gi,
    /garanti/gi,
    /certain/gi,
    /infaillible/gi,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && !content.includes('Information non vérifiée')) {
      claims.push(`Affirmation non vérifiée : "${match[0]}" → Remplacer par "Information non vérifiée à ce stade."`);
    }
  }
  return claims;
}

function checkPostStructure(content: string, sourceUrl: string, hashtags: string[]): { gaps: string[]; score: number } {
  const gaps: string[] = [];
  let structureScore = 100;

  // Hook dirigeant — first sentence should grab attention
  const firstSentence = content.split('\n')[0]?.trim();
  if (!firstSentence || firstSentence.length < 20) {
    gaps.push('Hook dirigeant absent ou trop court');
    structureScore -= POST_STRUCTURE_REQUIREMENTS.hook_dirigeant.weight;
  }

  // Valeur métier — should explain what the reader gains
  if (!content.match(/bénéficiez|gagnez|obtenez|découvrez|apprenez|maîtrisez|évitez|protégez|optimisez/gi)) {
    gaps.push('Valeur métier peu explicite — ajouter bénéfice concret pour le lecteur');
    structureScore -= POST_STRUCTURE_REQUIREMENTS.valeur_metier.weight;
  }

  // Insight réglementaire — should reference a norm or official text
  if (!content.match(/BCEAO|COBAC|OHADA|UEMOA|CEMAC|GAFI|Bâle|IFRS|ISO|circulaire|directive|règlement|instruction/gi)) {
    gaps.push('Insight réglementaire manquant — ajouter référence à une norme ou texte officiel');
    structureScore -= POST_STRUCTURE_REQUIREMENTS.insight_reglementaire.weight;
  }

  // Call-to-Action
  if (!content.match(/téléchargez|contactez|diagnostic|lien en commentaire|commentaire 👇|gratuit|réservez|inscrivez|abonnez/gi)) {
    gaps.push('Call-to-Action absent — ajouter invitation claire (téléchargement, contact, commentaire)');
    structureScore -= POST_STRUCTURE_REQUIREMENTS.call_to_action.weight;
  }

  // URL valide
  if (!sourceUrl || !sourceUrl.startsWith('http')) {
    gaps.push('URL invalide ou manquante');
    structureScore -= POST_STRUCTURE_REQUIREMENTS.url_valide.weight;
  }

  // Hashtags cohérents
  const hashtagCheck = checkHashtags(hashtags);
  if (hashtagCheck.violations.length > 0 || hashtags.length === 0 || hashtags.length > 6) {
    gaps.push(hashtags.length === 0
      ? 'Aucun hashtag — ajouter 3-6 hashtags de la liste autorisée'
      : hashtags.length > 6
        ? 'Trop de hashtags (>6) — réduire à 3-6'
        : `${hashtagCheck.violations.length} hashtag(s) non autorisé(s) : ${hashtagCheck.violations.join(', ')}`);
    structureScore -= POST_STRUCTURE_REQUIREMENTS.hashtags_coherents.weight;
  }

  return { gaps, score: Math.max(0, structureScore) };
}

// ─── ANALYSE COMPLÈTE D'UN POST ──────────────────────────────────────

export function analyzePostQuality(
  post: {
    id: number;
    title: string;
    platform: string;
    content: string;
    source_url: string;
    hashtags: string[];
    status: string;
  }
): PostQualityReport {
  const now = new Date().toISOString();

  // 1. Compliance Score (0-20)
  const hashtagCheck = checkHashtags(post.hashtags);
  const complianceIssues: string[] = [];
  if (hashtagCheck.violations.length > 0) {
    complianceIssues.push(`${hashtagCheck.violations.length} hashtag(s) non autorisé(s)`);
  }
  // Check if post references regulatory bodies
  const hasRegRef = /BCEAO|COBAC|OHADA|UEMOA|CEMAC|GAFI|BEAC/gi.test(post.content);
  if (!hasRegRef) complianceIssues.push('Aucune référence à un organisme réglementaire');
  const complianceScore = Math.min(20, (hasRegRef ? 15 : 10) + hashtagCheck.score);

  // 2. Credibility Score (0-20)
  const sourceCheck = checkSourceQuality(post.source_url, post.content);
  const unverifiedClaims = checkUnverifiedClaims(post.content);
  const credibilityIssues = [...sourceCheck.violations, ...unverifiedClaims];
  const credibilityScore = Math.min(20, sourceCheck.score - (unverifiedClaims.length * 4));

  // 3. SEO Score (0-20)
  const seoIssues: string[] = [];
  let seoScore = 16;
  if (!post.title || post.title.length < 10) { seoIssues.push('Titre SEO trop court'); seoScore -= 4; }
  if (post.title && post.title.length > 120) { seoIssues.push('Titre SEO trop long (>120 car.)'); seoScore -= 2; }
  if (!post.source_url) { seoIssues.push('URL source manquante'); seoScore -= 5; }
  if (post.content.length < 200) { seoIssues.push('Contenu trop court pour le SEO'); seoScore -= 3; }

  // 4. Engagement Score (0-20)
  const engagementIssues: string[] = [];
  let engagementScore = 15;
  const hasEmoji = /[\u{1F50D}\u{1F4CA}\u{1F4CB}\u{1F4B0}\u{1F331}\u{26A1}\u{1F3AF}\u{2705}\u{274C}]/u.test(post.content) || /[\u{1F914}\u{1F4A1}\u{1F4E5}\u{1F517}\u{1F4D8}\u{1F7E0}\u{1F534}\u{1F7E1}\u{1F4B8}\u{23F1}]/u.test(post.content);
  if (!hasEmoji) engagementIssues.push('Aucun emoji — ajouter pour lisibilité');
  const hasQuestion = /\?/.test(post.content);
  if (!hasQuestion) engagementIssues.push('Aucune question — ajouter pour susciter l\'interaction');
  const hasDataPoint = /\d+%|\d+\s*M|\d+\s*K|\d+\s*points|\d+\s*contrôles|\d+\s*critères/.test(post.content);
  if (!hasDataPoint) { engagementIssues.push('Aucun chiffre impactant — ajouter statistique ou data point'); engagementScore -= 3; }
  if (hasEmoji) engagementScore += 2;
  if (hasQuestion) engagementScore += 2;
  if (hasDataPoint) engagementScore += 1;

  // 5. LinkedIn Score (0-20)
  const linkedinIssues: string[] = [];
  let linkedinScore = 18;
  if (post.platform !== 'linkedin') { linkedinIssues.push('Post non destiné à LinkedIn'); linkedinScore -= 5; }
  if (post.content.length > 3000) { linkedinIssues.push('Post trop long pour LinkedIn (>3000 car.)'); linkedinScore -= 3; }
  if (post.hashtags.length > 6) { linkedinIssues.push('Trop de hashtags pour LinkedIn'); linkedinScore -= 2; }

  // Structure check
  const structureCheck = checkPostStructure(post.content, post.source_url, post.hashtags);
  // Fold structure gaps into relevant dimensions
  if (structureCheck.gaps.some(g => g.includes('Hook'))) engagementIssues.push(...structureCheck.gaps.filter(g => g.includes('Hook')));
  if (structureCheck.gaps.some(g => g.includes('réglementaire'))) complianceIssues.push(...structureCheck.gaps.filter(g => g.includes('réglementaire')));

  // Global score
  const globalScore = Math.round(
    (complianceScore + credibilityScore + seoScore + engagementScore + linkedinScore) / 100 * 100
  );
  const clampedScore = Math.min(100, Math.max(0, globalScore));

  // Hashtag violations
  const hashtagViolations = hashtagCheck.violations;

  return {
    post_id: post.id,
    post_title: post.title,
    platform: post.platform,
    compliance: {
      name: 'Conformité',
      score: Math.max(0, complianceScore),
      max: 20,
      status: scoreDimension(complianceScore),
      details: [hasRegRef ? 'Références réglementaires détectées' : 'Aucune référence réglementaire', `Hashtags : ${post.hashtags.length - hashtagViolations.length}/${post.hashtags.length} autorisés`],
      issues: complianceIssues,
    },
    credibility: {
      name: 'Crédibilité',
      score: Math.max(0, credibilityScore),
      max: 20,
      status: scoreDimension(credibilityScore),
      details: [sourceCheck.hasPrioritySource ? 'Source prioritaire référencée' : 'Aucune source prioritaire identifiée', `${unverifiedClaims.length} affirmation(s) non vérifiée(s)`],
      issues: credibilityIssues,
    },
    seo: {
      name: 'SEO',
      score: Math.max(0, seoScore),
      max: 20,
      status: scoreDimension(seoScore),
      details: [`Titre : ${post.title.length} car.`, `URL : ${post.source_url ? 'Présente' : 'Manquante'}`],
      issues: seoIssues,
    },
    engagement: {
      name: 'Engagement',
      score: Math.max(0, Math.min(20, engagementScore)),
      max: 20,
      status: scoreDimension(engagementScore),
      details: [`${hasEmoji ? 'Emojis présents' : 'Pas d\'emojis'}`, `${hasQuestion ? 'Question posée' : 'Pas de question'}`, `${hasDataPoint ? 'Data point présent' : 'Pas de data point'}`],
      issues: engagementIssues,
    },
    linkedin: {
      name: 'LinkedIn',
      score: Math.max(0, linkedinScore),
      max: 20,
      status: scoreDimension(linkedinScore),
      details: [`Plateforme : ${post.platform}`, `${post.content.length} caractères`],
      issues: linkedinIssues,
    },
    global_score: clampedScore,
    authorized_for_publication: clampedScore >= 95,
    hashtag_violations: hashtagViolations,
    source_violations: sourceCheck.violations,
    structure_gaps: structureCheck.gaps,
    unverified_claims: unverifiedClaims,
    recommendation: clampedScore >= 95
      ? '✅ Publication autorisée — Tous les critères Big Four sont satisfaits'
      : clampedScore >= 80
        ? '⚠️ Corrections mineures requises avant publication'
        : clampedScore >= 60
          ? '🔶 Révisions significatives nécessaires — score insuffisant'
          : '🔴 Publication bloquée — non-conformité majeure',
    audited_at: now,
  };
}

// ─── CYCLE EXECUTIVE REPORT ──────────────────────────────────────────

export function generateExecutiveReport(reports: PostQualityReport[]): QualityCycleReport {
  const cycleId = `KOS-QC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;
  const totalPosts = reports.length;
  const avgScore = totalPosts > 0 ? Math.round(reports.reduce((s, r) => s + r.global_score, 0) / totalPosts) : 0;
  const authorized = reports.filter(r => r.authorized_for_publication).length;
  const blocked = totalPosts - authorized;
  const complianceRate = totalPosts > 0 ? Math.round((authorized / totalPosts) * 100) : 0;

  // Posts needing correction
  const correctedCount = reports.filter(r => r.global_score < 95 && r.global_score >= 80).length;
  const urlIssues = reports.filter(r => r.seo.issues.some(i => i.includes('URL'))).length;

  // Top issues
  const allIssues: { issue: string; severity: string }[] = [];
  for (const report of reports) {
    for (const dim of [report.compliance, report.credibility, report.seo, report.engagement, report.linkedin]) {
      for (const issue of dim.issues) {
        allIssues.push({ issue, severity: dim.status === 'critical' ? 'critical' : dim.status === 'warning' ? 'high' : 'medium' });
      }
    }
    for (const gap of report.structure_gaps) {
      allIssues.push({ issue: gap, severity: 'medium' });
    }
  }

  // Count top issues
  const issueCounts: Record<string, { count: number; severity: string }> = {};
  for (const item of allIssues) {
    if (!issueCounts[item.issue]) issueCounts[item.issue] = { count: 0, severity: item.severity };
    issueCounts[item.issue].count++;
  }
  const topIssues = Object.entries(issueCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8)
    .map(([issue, data]) => ({ issue, count: data.count, severity: data.severity }));

  // Recommendations
  const recommendations: string[] = [];
  if (complianceRate < 80) recommendations.push('Renforcer la conformité réglementaire des posts — ajouter des références BCEAO/COBAC/OHADA');
  if (reports.some(r => r.hashtag_violations.length > 0)) recommendations.push('Corriger les hashtags non autorisés — utiliser exclusivement la liste officielle KHEPRA');
  if (reports.some(r => r.unverified_claims.length > 0)) recommendations.push('Remplacer toutes les affirmations non vérifiées par "Information non vérifiée à ce stade."');
  if (reports.some(r => r.source_violations.length > 0)) recommendations.push('Éliminer les sources non fiables — privilégier BCEAO, COBAC, OHADA, OCDE, Banque Mondiale');
  if (avgScore < 85) recommendations.push('Plan d\'action qualité urgent — score moyen inférieur au seuil Big Four');
  if (blocked > 0) recommendations.push(`${blocked} post(s) bloqué(s) — correction requise avant toute publication`);

  return {
    cycle_id: cycleId,
    cycle_date: new Date().toISOString(),
    total_posts_analyzed: totalPosts,
    posts_corrected: correctedCount,
    urls_corrected: urlIssues,
    average_score: avgScore,
    compliance_rate: complianceRate,
    posts_authorized: authorized,
    posts_blocked: blocked,
    top_issues: topIssues,
    recommendations,
    posts_detail: reports,
  };
}

// ─── AUDIT LOG ───────────────────────────────────────────────────────

export function generateAuditLog(reports: PostQualityReport[]): AuditLogEntry[] {
  const logs: AuditLogEntry[] = [];
  const now = new Date();
  let counter = 1;

  for (const report of reports) {
    // Scan entry
    logs.push({
      id: `audit-${String(counter++).padStart(4, '0')}`,
      timestamp: new Date(now.getTime() - (reports.length - report.post_id) * 60000).toISOString(),
      post_id: report.post_id,
      post_title: report.post_title,
      action: 'scan',
      severity: 'info',
      detail: `Scan qualité Big Four — Score global : ${report.global_score}/100`,
      score_before: undefined,
      score_after: report.global_score,
    });

    // Authorization decision
    if (report.authorized_for_publication) {
      logs.push({
        id: `audit-${String(counter++).padStart(4, '0')}`,
        timestamp: new Date(now.getTime() - (reports.length - report.post_id) * 60000 + 1000).toISOString(),
        post_id: report.post_id,
        post_title: report.post_title,
        action: 'authorize',
        severity: 'info',
        detail: `✅ Publication autorisée — ${report.global_score}/100 ≥ seuil 95/100`,
      });
    } else {
      logs.push({
        id: `audit-${String(counter++).padStart(4, '0')}`,
        timestamp: new Date(now.getTime() - (reports.length - report.post_id) * 60000 + 1000).toISOString(),
        post_id: report.post_id,
        post_title: report.post_title,
        action: 'block',
        severity: report.global_score < 60 ? 'critical' : 'warning',
        detail: `🚫 Publication bloquée — ${report.global_score}/100 < seuil 95/100. ${report.recommendation}`,
        score_before: report.global_score,
      });
    }

    // Flag specific issues
    if (report.hashtag_violations.length > 0) {
      logs.push({
        id: `audit-${String(counter++).padStart(4, '0')}`,
        timestamp: new Date(now.getTime() - (reports.length - report.post_id) * 60000 + 2000).toISOString(),
        post_id: report.post_id,
        post_title: report.post_title,
        action: 'flag',
        severity: 'warning',
        detail: `Hashtags non autorisés : ${report.hashtag_violations.join(', ')}`,
      });
    }

    if (report.unverified_claims.length > 0) {
      logs.push({
        id: `audit-${String(counter++).padStart(4, '0')}`,
        timestamp: new Date(now.getTime() - (reports.length - report.post_id) * 60000 + 3000).toISOString(),
        post_id: report.post_id,
        post_title: report.post_title,
        action: 'flag',
        severity: 'critical',
        detail: `Affirmations non vérifiées : ${report.unverified_claims.length} détectée(s)`,
      });
    }
  }

  return logs;
}

// ─── AUTO-CORRECTION ENGINE ───────────────────────────────────────────

export interface AutoCorrectionResult {
  post_id: number;
  corrections_applied: string[];
  hashtags_replaced: { old: string; new: string }[];
  structure_added: string[];
  score_before: number;
  score_after: number;
  authorized_after: boolean;
  corrected_content: string;
  corrected_hashtags: string[];
}

const HASHTAG_REPLACEMENT_MAP: Record<string, string> = {
  '#InspectionBancaire': '#AuditInterne',
  '#BâleIII': '#Gouvernance',
  '#ConseilAdministration': '#Gouvernance',
  '#Durabilité': '#ESG',
  '#COSO': '#GestionDesRisques',
  '#ISO31000': '#GestionDesRisques',
  '#ERM': '#GestionDesRisques',
  '#StartupAfrique': '#TransformationDigitale',
  '#PrivateEquity': '#PrixDeTransfert',
  '#KYC': '#LBCFT',
  '#Fintech': '#TransformationDigitale',
  '#RegTech': '#Conformité',
  '#Innovation': '#TransformationDigitale',
  '#Microfinance': '#BCEAO',
  '#SFD': '#BCEAO',
  '#EMF': '#BCEAO',
  '#Agrément': '#Conformité',
  '#LevéeDeFonds': '#PrixDeTransfert',
  '#InvestmentReadiness': '#PrixDeTransfert',
  '#DueDiligence': '#AuditInterne',
  '#Acquisition': '#AuditInterne',
  '#RedFlags': '#GestionDesRisques',
  '#Impact': '#ESG',
  '#DiagnosticGratuit': '#Conformité',
  '#Score': '#GestionDesRisques',
  '#Banque': '#BCEAO',
  '#ScoreRéglementaire': '#GestionDesRisques',
  '#Gratuit': '#KHEPRAExperts',
  '#LeadMagnet': '#KHEPRAExperts',
  '#AgrémentBCEAO': '#Conformité',
  '#ConformitéBancaire': '#Conformité',
  '#GuideGratuit': '#KHEPRAExperts',
  '#InvestissementAfrique': '#PrixDeTransfert',
  '#AuditBancaire': '#AuditInterne',
  '#Checklist': '#Conformité',
  '#Simulation': '#GestionDesRisques',
  '#RisqueRéglementaire': '#GestionDesRisques',
  '#Sanctions': '#GestionDesRisques',
  '#FinancementDFI': '#ESG',
  '#BOAD': '#BCEAO',
  '#IFC': '#BCEAO',
  '#Proparco': '#BCEAO',
  '#Template': '#KHEPRAExperts',
  '#AUSCGIE': '#OHADA',
  '#ConseilAdministration': '#Gouvernance',
  '#PAS DE BONNE REFERRENCE...': '#KHEPRAExperts',
  '#GuideBCEAO': '#BCEAO',
  '#Conformité': '#Conformité',
  '#GuideBCEAO': '#BCEAO',
  '#Agrément': '#Conformité',
  '#Agrément': '#Conformité',
  '#Conformité': '#Conformité',
  '#Diagnostic': '#GestionDesRisques',
  '#Score': '#GestionDesRisques',
  '#Investissement': '#PrixDeTransfert',
  '#InvestissementAfrique': '#PrixDeTransfert',
  '#LevéeDeFonds': '#PrixDeTransfert',
  '#StartupAfrique': '#TransformationDigitale',
  '#VC': '#PrixDeTransfert',
  '#Audit': '#AuditInterne',
  '#Afrique': '#UEMOA',
  '#RedFlags': '#GestionDesRisques',
  '#DiagnosticGratuit': '#Conformité',
  '#FinancementDFI': '#ESG',
  '#BOAD': '#BCEAO',
  '#IFC': '#BCEAO',
  '#Proparco': '#BCEAO',
  '#Afrique': '#UEMOA',
  '#Diagnostic': '#GestionDesRisques',
  '#Score': '#GestionDesRisques',
  '#Impact': '#ESG',
  '#DiagnosticGratuit': '#Conformité',
  '#Template': '#KHEPRAExperts',
  '#AUSCGIE': '#OHADA',
  '#ConseilAdministration': '#Gouvernance',
  '#Audit': '#AuditInterne',
  '#ConseilAdministration': '#Gouvernance',
  '#SimulationRisque': '#GestionDesRisques',
  '#RisqueRéglementaire': '#GestionDesRisques',
  '#Sanctions': '#GestionDesRisques',
};

function replaceUnauthorizedHashtags(hashtags: string[]): { newHashtags: string[]; replacements: { old: string; new: string }[] } {
  const newHashtags: string[] = [];
  const replacements: { old: string; new: string }[] = [];
  const used = new Set<string>();

  for (const tag of hashtags) {
    const normalized = tag.startsWith('#') ? tag : `#${tag}`;
    if (AUTHORIZED_HASHTAGS.includes(normalized)) {
      if (!used.has(normalized)) {
        newHashtags.push(normalized);
        used.add(normalized);
      }
      continue;
    }
    const replacement = HASHTAG_REPLACEMENT_MAP[normalized] || '#KHEPRAExperts';
    if (!used.has(replacement)) {
      newHashtags.push(replacement);
      used.add(replacement);
    }
    replacements.push({ old: normalized, new: replacement });
  }

  // Ensure we have at least 3 hashtags and at most 6
  if (newHashtags.length < 3) {
    const defaults = ['#KHEPRAExperts', '#Gouvernance', '#Conformité'];
    for (const d of defaults) {
      if (!used.has(d)) {
        newHashtags.push(d);
        used.add(d);
      }
      if (newHashtags.length >= 3) break;
    }
  }
  if (newHashtags.length > 6) {
    return { newHashtags: newHashtags.slice(0, 6), replacements };
  }

  return { newHashtags, replacements };
}

function addMissingStructureElements(content: string, gaps: string[]): { newContent: string; added: string[] } {
  let newContent = content;
  const added: string[] = [];

  // Check if hook is missing
  if (gaps.some(g => g.includes('Hook'))) {
    const hook = '🔍 Un constat après 22 ans de conseil en Afrique : le diable est dans les détails réglementaires.\n\n';
    newContent = hook + newContent;
    added.push('Hook dirigeant ajouté en début de post');
  }

  // Check if value proposition is missing
  if (gaps.some(g => g.includes('Valeur métier'))) {
    const value = '\n\n💡 Ce que vous gagnez : méthodologie éprouvée, templates prêts à l\'emploi, et un plan d\'action priorisé sur 90 jours.';
    newContent = newContent + value;
    added.push('Valeur métier ajoutée (bénéfice concret)');
  }

  // Check if regulatory insight is missing
  if (gaps.some(g => g.includes('réglementaire'))) {
    const insight = '\n\n📋 Basé sur les circulaires BCEAO, directives COBAC, et normes OHADA en vigueur.';
    newContent = newContent + insight;
    added.push('Insight réglementaire ajouté (référence normative)');
  }

  // Check if CTA is missing
  if (gaps.some(g => g.includes('Call-to-Action'))) {
    const cta = '\n\n📥 Téléchargez gratuitement notre ressource — lien en commentaire 👇\n\n#KHEPRAExperts #Conformité #Gouvernance';
    newContent = newContent + cta;
    added.push('Call-to-Action ajouté (téléchargement + hashtags)');
  }

  return { newContent, added };
}

export function autoCorrectPost(
  post: {
    id: number;
    title: string;
    platform: string;
    content: string;
    source_url: string;
    hashtags: string[];
    status: string;
  },
  report: PostQualityReport
): AutoCorrectionResult {
  const corrections: string[] = [];
  const hashtagsReplaced: { old: string; new: string }[] = [];
  const structureAdded: string[] = [];

  let correctedContent = post.content;
  let correctedHashtags = [...post.hashtags];

  // 1. Replace unauthorized hashtags
  if (report.hashtag_violations.length > 0) {
    const { newHashtags, replacements } = replaceUnauthorizedHashtags(post.hashtags);
    correctedHashtags = newHashtags;
    hashtagsReplaced.push(...replacements);
    corrections.push(`${replacements.length} hashtag(s) non autorisé(s) remplacé(s)`);
  }

  // 2. Add missing structure elements
  if (report.structure_gaps.length > 0) {
    const { newContent, added } = addMissingStructureElements(correctedContent, report.structure_gaps);
    correctedContent = newContent;
    structureAdded.push(...added);
    corrections.push(`${added.length} élément(s) de structure ajouté(s)`);
  }

  // 3. Remove unverified claims placeholder
  if (report.unverified_claims.length > 0) {
    corrections.push(`${report.unverified_claims.length} affirmation(s) non vérifiée(s) — remplacer par "Information non vérifiée à ce stade."`);
  }

  // Re-analyze the corrected post
  const correctedReport = analyzePostQuality({
    id: post.id,
    title: post.title,
    platform: post.platform,
    content: correctedContent,
    source_url: post.source_url,
    hashtags: correctedHashtags,
    status: post.status,
  });

  return {
    post_id: post.id,
    corrections_applied: corrections,
    hashtags_replaced: hashtagsReplaced,
    structure_added: structureAdded,
    score_before: report.global_score,
    score_after: correctedReport.global_score,
    authorized_after: correctedReport.authorized_for_publication,
    corrected_content: correctedContent,
    corrected_hashtags: correctedHashtags,
  };
}

export function autoCorrectQueue(
  queue: { id: number; title: string; platform: string; content: string; source_url: string; hashtags: string[]; status: string }[]
): { results: AutoCorrectionResult[]; correctedReports: PostQualityReport[]; totalScoreBefore: number; totalScoreAfter: number } {
  const results: AutoCorrectionResult[] = [];
  const correctedReports: PostQualityReport[] = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const post of queue) {
    const report = analyzePostQuality(post);
    totalBefore += report.global_score;

    if (report.global_score >= 80 && report.global_score < 95) {
      const correction = autoCorrectPost(post, report);
      results.push(correction);
      const newReport = analyzePostQuality({
        id: post.id,
        title: post.title,
        platform: post.platform,
        content: correction.corrected_content,
        source_url: post.source_url,
        hashtags: correction.corrected_hashtags,
        status: post.status,
      });
      correctedReports.push(newReport);
      totalAfter += newReport.global_score;
    } else {
      correctedReports.push(report);
      totalAfter += report.global_score;
    }
  }

  return {
    results,
    correctedReports,
    totalScoreBefore: totalBefore,
    totalScoreAfter: totalAfter,
  };
}

// ─── EXPORT DU MOTEUR ────────────────────────────────────────────────

export const QUALITY_ENGINE_CONFIG = {
  version: 'KOS-SME-QEv1.1-BigFour',
  publication_threshold: 95,
  dimensions: [
    { key: 'compliance', name: 'Conformité', max: 20, icon: 'ri-shield-check-line', color: '#059669' },
    { key: 'credibility', name: 'Crédibilité', max: 20, icon: 'ri-verified-badge-line', color: '#0A66C2' },
    { key: 'seo', name: 'SEO', max: 20, icon: 'ri-search-eye-line', color: '#7C3AED' },
    { key: 'engagement', name: 'Engagement', max: 20, icon: 'ri-flashlight-line', color: '#DC2626' },
    { key: 'linkedin', name: 'LinkedIn', max: 20, icon: 'ri-linkedin-fill', color: '#004182' },
  ],
  authorized_hashtags_count: AUTHORIZED_HASHTAGS.length,
  priority_sources_count: PRIORITY_SOURCES.length,
};






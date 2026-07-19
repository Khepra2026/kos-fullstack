// ═══════════════════════════════════════════════════════════════════
// KOS Social URL Correction Engine — Mock Data
// Détection et correction automatisée des erreurs de partage social
// Tous les partages LinkedIn sont rattachés à linkedin.com/company/111941349
// ═══════════════════════════════════════════════════════════════════

export interface UrlHealthReport {
  url: string;
  status: 'healthy' | 'warning' | 'broken' | 'missing_og';
  issue_type: 'missing_og_tags' | 'broken_link' | 'wrong_domain' | 'no_og_image' | 'spa_direct_link' | 'none';
  severity: 'critical' | 'high' | 'medium' | 'low';
  suggestion: string;
  corrected_url?: string;
  og_preview_supported: boolean;
  last_checked: string;
}

export interface SocialUrlCorrectionScan {
  id: string;
  scan_date: string;
  total_urls: number;
  healthy: number;
  warnings: number;
  broken: number;
  missing_og: number;
  fixable_auto: number;
  fixable_manual: number;
  reports: UrlHealthReport[];
}

export interface AutoCorrectionResult {
  original_url: string;
  corrected_url: string;
  fix_type: 'og_proxy_wrap' | 'url_encode' | 'domain_fix' | 'path_fix';
  applied: boolean;
  timestamp: string;
}

// URL patterns that the OG preview function supports
const OG_SUPPORTED_PATTERNS = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/blog',
  '/resources',
  '/blog/bceao-ohada-conformite',
  '/blog/esg-afrique-entreprises',
  '/blog/conformite-cobac-cemac',
  '/blog/serie-gouvernance-bancaire-uemoa',
  '/lead-magnets/guide-bceao-2026',
  '/lead-magnets/checklist-conformite-bceao-cobac',
  '/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026',
  '/lead-magnets/guide-levee-fonds-afrique',
  '/lead-magnets/mini-rapport-due-diligence',
  '/lead-magnets/diagnostic-esg-maturite',
  '/lead-magnets/template-audit-gouvernance',
  '/lead-magnets/simulation-risque-reglementaire',
  '/tools',
  '/case-studies',
  '/think-tank',
  '/webinars',
  '/whitepapers',
  '/formations',
];

function isOgPreviewSupported(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.replace(/\/$/, '');
    return OG_SUPPORTED_PATTERNS.some(p => pathname === p || pathname.startsWith(p + '/'));
  } catch {
    return false;
  }
}

function analyzeUrl(url: string): UrlHealthReport {
  const report: UrlHealthReport = {
    url,
    status: 'healthy',
    issue_type: 'none',
    severity: 'low',
    suggestion: 'URL correcte',
    og_preview_supported: false,
    last_checked: new Date().toISOString(),
  };

  // Vérifier domaine
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('khepraexperts.com')) {
      report.status = 'warning';
      report.issue_type = 'wrong_domain';
      report.severity = 'high';
      report.suggestion = 'Le domaine ne correspond pas à khepraexperts.com — vérifier le source_url';
      report.og_preview_supported = false;
      return report;
    }
  } catch {
    report.status = 'broken';
    report.issue_type = 'broken_link';
    report.severity = 'critical';
    report.suggestion = 'URL malformée — corriger le source_url dans la file d\'attente';
    report.og_preview_supported = false;
    return report;
  }

  // Vérifier support OG preview
  const ogSupported = isOgPreviewSupported(url);
  report.og_preview_supported = ogSupported;

  if (!ogSupported) {
    report.status = 'warning';
    report.issue_type = 'missing_og_tags';
    report.severity = 'medium';
    report.suggestion = 'Cette page n\'a pas de preview OG dédiée. Le partage affichera le fallback générique KHEPRA EXPERTS. Ajouter la route dans og-social-preview.';
    return report;
  }

  // Vérifier si c'est une URL directe SPA (pourrait être wrapée en OG proxy)
  if (url.includes('khepraexperts.com') && !url.includes('supabase.co/functions')) {
    report.status = 'healthy';
    report.issue_type = 'none';
    report.severity = 'low';
    report.suggestion = 'OK — le proxy OG couvre cette page. Les boutons de partage doivent utiliser getOgPreviewUrl().';
  }

  return report;
}

function generateCorrectedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;
    // URL déjà correcte — pas besoin de correction
    return null;
  } catch {
    // URL cassée — essayer de reconstruire
    if (url.startsWith('/')) {
      return `https://khepraexperts.com${url}`;
    }
    return null;
  }
}

// ─── SCAN PRINCIPAL ──────────────────────────────────────────────────
export function scanSocialUrls(urls: string[]): SocialUrlCorrectionScan {
  const reports: UrlHealthReport[] = urls.map(analyzeUrl);

  const healthy = reports.filter(r => r.status === 'healthy').length;
  const warnings = reports.filter(r => r.status === 'warning').length;
  const broken = reports.filter(r => r.status === 'broken').length;
  const missingOg = reports.filter(r => r.issue_type === 'missing_og_tags').length;

  return {
    id: `scan-${Date.now()}`,
    scan_date: new Date().toISOString(),
    total_urls: urls.length,
    healthy,
    warnings,
    broken,
    missing_og: missingOg,
    fixable_auto: broken, // URLs cassées = auto-fixable
    fixable_manual: missingOg, // Missing OG = manuel (ajouter à l'edge function)
    reports,
  };
}

// ─── CORRECTION AUTOMATIQUE ──────────────────────────────────────────
export function autoCorrectUrl(url: string): AutoCorrectionResult | null {
  try {
    new URL(url);
    return null; // URL valide, pas de correction nécessaire
  } catch {
    // URL cassée — tenter de corriger
    if (url.startsWith('/')) {
      const corrected = `https://khepraexperts.com${url}`;
      return {
        original_url: url,
        corrected_url: corrected,
        fix_type: 'domain_fix',
        applied: true,
        timestamp: new Date().toISOString(),
      };
    }
    if (url.includes('khepraexperts') && !url.startsWith('http')) {
      const corrected = `https://${url}`;
      return {
        original_url: url,
        corrected_url: corrected,
        fix_type: 'url_encode',
        applied: true,
        timestamp: new Date().toISOString(),
      };
    }
    return null;
  }
}

// ─── STATISTIQUES DE SANTÉ ───────────────────────────────────────────
export const URL_HEALTH_STATS = {
  total_scanned: 31,
  healthy: 24,
  warnings: 5,
  broken: 0,
  missing_og: 2,
  last_scan: '2026-06-22T08:00:00Z',
  auto_fixed: 3,
  pending_manual: 2,
  og_preview_coverage: '68%',
  linkedin_company_id: '111941349',
  linkedin_company_page: 'https://www.linkedin.com/company/khepra-experts/',
  linkedin_admin_posts: 'https://www.linkedin.com/company/111941349/admin/page-posts/published/',
  domains: {
    'khepraexperts.com': 30,
    'youtube.com': 1,
  },
  top_issues: [
    { type: 'missing_og_tags', count: 2, pages: ['/tools/diagnostic-pre-inspection-bceao', '/geo-hub/mise-en-conformite-bceao'] },
    { type: 'no_og_image', count: 1, pages: ['/blog/daf'] },
  ],
};






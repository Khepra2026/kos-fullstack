import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
export interface DetectionInput {
  block_id: string;
  severity: 'critical' | 'major' | 'minor';
  title: string;
  description: string;
  location: string;
  detected_by: string;
  auto_fix_available: boolean;
  estimated_effort: string;
  related_blocks: string[];
}

export interface ScanBlockResult {
  block_id: string;
  block_name: string;
  health_score: number;
  total_issues: number;
  critical_issues: number;
  major_issues: number;
  minor_issues: number;
  detections: DetectionInput[];
}

export interface ScanSummary {
  totalBlocks: number;
  totalIssues: number;
  criticalIssues: number;
  majorIssues: number;
  minorIssues: number;
  autoFixable: number;
  avgHealthScore: number;
  scannedUrl: string;
  scannedAt: string;
}

export interface PageSpeedResult {
  performance: number;
  fcp: number | null;
  lcp: number | null;
  tbt: number | null;
  cls: number | null;
  si: number | null;
}

// ---------------------------------------------------------------------------
// BLOCK CONFIG
// ---------------------------------------------------------------------------
export const BLOCK_CONFIG: Record<string, {
  icon: string;
  color: string;
  description: string;
  agents: {
    agentId: string;
    agentName: string;
    agentIcon: string;
    agentColor: string;
    role: string;
    status: string;
    detectionsFound: number;
    fixesApplied: number;
  }[];
}> = {
  seo: {
    icon: 'ri-search-eye-line',
    color: '#0D7B5F',
    description: 'Audit technique SEO complet : balises meta, structure Hn, donnees structurees, canonical, images, liens internes.',
    agents: [
      { agentId: 'seo-agent', agentName: 'SEO Agent', agentIcon: 'ri-search-eye-line', agentColor: '#0D7B5F', role: 'primary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
      { agentId: 'geo-agent', agentName: 'GEO Agent', agentIcon: 'ri-global-line', agentColor: '#0891B2', role: 'secondary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
    ],
  },
  security: {
    icon: 'ri-shield-check-line',
    color: '#C2410C',
    description: 'Analyse des headers de securite HTTP, HSTS, CSP, X-Frame-Options, X-Content-Type et conformite OWASP Top 10.',
    agents: [
      { agentId: 'security-agent', agentName: 'Security Agent', agentIcon: 'ri-shield-check-line', agentColor: '#C2410C', role: 'primary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
      { agentId: 'legal-agent', agentName: 'Legal Agent', agentIcon: 'ri-scales-line', agentColor: '#4F46E5', role: 'secondary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
    ],
  },
  content: {
    icon: 'ri-quill-pen-line',
    color: '#4A7A1E',
    description: 'Analyse de la qualite du contenu : longueur, lisibilite, structure des titres, ratio texte/code.',
    agents: [
      { agentId: 'content-agent', agentName: 'Content Agent', agentIcon: 'ri-quill-pen-line', agentColor: '#4A7A1E', role: 'primary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
      { agentId: 'think-tank-agent', agentName: 'Think Tank', agentIcon: 'ri-lightbulb-line', agentColor: '#9B59B6', role: 'secondary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
      { agentId: 'reputation-agent', agentName: 'Reputation Agent', agentIcon: 'ri-star-line', agentColor: '#E8C547', role: 'reviewer', status: 'active', detectionsFound: 0, fixesApplied: 0 },
    ],
  },
  performance: {
    icon: 'ri-speed-up-line',
    color: '#0891B2',
    description: 'Core Web Vitals : LCP, TBT, CLS via Google PageSpeed Insights. Analyse des headers de cache.',
    agents: [
      { agentId: 'seo-agent', agentName: 'SEO Agent', agentIcon: 'ri-search-eye-line', agentColor: '#0D7B5F', role: 'primary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
      { agentId: 'security-agent', agentName: 'Security Agent', agentIcon: 'ri-shield-check-line', agentColor: '#C2410C', role: 'secondary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
      { agentId: 'quality-agent', agentName: 'Quality Agent', agentIcon: 'ri-tools-line', agentColor: '#6B4A3A', role: 'reviewer', status: 'active', detectionsFound: 0, fixesApplied: 0 },
    ],
  },
  social: {
    icon: 'ri-share-line',
    color: '#E8943A',
    description: 'Verification des Open Graph Tags, Twitter Cards, et metadonnees de partage reseaux sociaux.',
    agents: [
      { agentId: 'content-agent', agentName: 'Content Agent', agentIcon: 'ri-quill-pen-line', agentColor: '#4A7A1E', role: 'primary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
      { agentId: 'reputation-agent', agentName: 'Reputation Agent', agentIcon: 'ri-star-line', agentColor: '#E8C547', role: 'secondary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
    ],
  },
  legal: {
    icon: 'ri-scales-line',
    color: '#4F46E5',
    description: 'Verification conformite legale : politique confidentialite, consentement cookies, mentions legales.',
    agents: [
      { agentId: 'legal-agent', agentName: 'Legal Agent', agentIcon: 'ri-scales-line', agentColor: '#4F46E5', role: 'primary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
      { agentId: 'reputation-agent', agentName: 'Reputation Agent', agentIcon: 'ri-star-line', agentColor: '#E8C547', role: 'secondary', status: 'active', detectionsFound: 0, fixesApplied: 0 },
    ],
  },
};

// ---------------------------------------------------------------------------
// SECURITY HEADERS REFERENCE
// ---------------------------------------------------------------------------
const SECURITY_HEADERS = [
  { name: 'strict-transport-security', label: 'HSTS', severity: 'critical' as const, desc: 'Header HSTS absent. Le site est vulnerable aux attaques de downgrade SSL/TLS.' },
  { name: 'content-security-policy', label: 'CSP', severity: 'critical' as const, desc: 'CSP absent. Risque eleve d\'attaques XSS et injection de code malveillant.' },
  { name: 'x-frame-options', label: 'X-Frame-Options', severity: 'major' as const, desc: 'Absence du header. Site vulnerable au clickjacking.' },
  { name: 'x-content-type-options', label: 'X-Content-Type-Options', severity: 'major' as const, desc: 'Absence du header. Risque d\'attaques MIME sniffing.' },
  { name: 'referrer-policy', label: 'Referrer-Policy', severity: 'minor' as const, desc: 'Absence du header. Fuite possible d\'infos via referrers HTTP.' },
  { name: 'permissions-policy', label: 'Permissions-Policy', severity: 'minor' as const, desc: 'Absence du header. APIs navigateur non restreintes.' },
  { name: 'x-xss-protection', label: 'X-XSS-Protection', severity: 'minor' as const, desc: 'Absence du header. Protection XSS supplementaire non activee.' },
];

// ---------------------------------------------------------------------------
// FETCH PAGE VIA CORS PROXY — Multi-fallback robuste
// ---------------------------------------------------------------------------
const CORS_PROXIES = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

async function fetchPageWithProxy(url: string): Promise<{ html: string; rawHeaders: Record<string, string>; status: number; headers: Headers } | null> {
  // Try CORS proxies first
  for (const proxyFn of CORS_PROXIES) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(proxyFn(url), { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) continue;

      const html = await res.text();
      if (!html || html.length < 100) continue;

      const rawHeaders: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        const lowerKey = key.toLowerCase();
        if (lowerKey.startsWith('x-final-')) {
          rawHeaders[lowerKey.replace('x-final-', '')] = val;
        }
        if (lowerKey.startsWith('x-corsproxy-')) {
          rawHeaders[lowerKey.replace('x-corsproxy-', '')] = val;
        }
      });

      return { html, rawHeaders, status: 200, headers: res.headers };
    } catch {
      continue;
    }
  }

  // Last resort: try direct fetch with no-cors (opaque response, can't read body)
  // We can at least verify the site is reachable
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    await fetch(url, { method: 'HEAD', mode: 'no-cors', signal: controller.signal });
    clearTimeout(timeout);
    // Site is reachable but we can't read content — return minimal
    return { html: '', rawHeaders: {}, status: 200, headers: new Headers() };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// PAGE SPEED INSIGHTS (Google API - publique, pas de cle requise)
// ---------------------------------------------------------------------------
async function fetchPageSpeed(url: string): Promise<PageSpeedResult | null> {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&locale=fr`;
    const res = await fetch(apiUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const lighthouse = data?.lighthouseResult;
    if (!lighthouse) return null;
    const audits = lighthouse.audits || {};
    return {
      performance: Math.round((lighthouse.categories?.performance?.score ?? 0) * 100),
      fcp: audits['first-contentful-paint']?.numericValue ?? null,
      lcp: audits['largest-contentful-paint']?.numericValue ?? null,
      tbt: audits['total-blocking-time']?.numericValue ?? null,
      cls: audits['cumulative-layout-shift']?.numericValue ?? null,
      si: audits['speed-index']?.numericValue ?? null,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// FETCH HEADERS ONLY — via proxy CORS
// ---------------------------------------------------------------------------
async function fetchHeadersOnly(url: string): Promise<Record<string, string>> {
  const headerMap: Record<string, string> = {};

  // Try each proxy for headers
  for (const proxyFn of CORS_PROXIES) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(proxyFn(url), { method: 'GET', signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) continue;

      res.headers.forEach((val, key) => {
        const lowerKey = key.toLowerCase();
        if (lowerKey.startsWith('x-final-')) {
          headerMap[lowerKey.replace('x-final-', '')] = val;
        }
        if (lowerKey.startsWith('x-corsproxy-')) {
          headerMap[lowerKey.replace('x-corsproxy-', '')] = val;
        }
      });

      // Also check for specific security headers that proxy might expose
      const securityHeaders = [
        'strict-transport-security', 'content-security-policy',
        'x-frame-options', 'x-content-type-options', 'referrer-policy',
        'permissions-policy', 'x-xss-protection', 'cache-control',
      ];
      for (const h of securityHeaders) {
        const val = res.headers.get(`x-final-${h}`) || res.headers.get(h);
        if (val && !headerMap[h]) {
          headerMap[h] = val;
        }
      }

      if (Object.keys(headerMap).length > 0) break;
    } catch {
      continue;
    }
  }

  return headerMap;
}

// ---------------------------------------------------------------------------
// FALLBACK CONTENT FETCH — jina.ai for text extraction (CORS-friendly)
// ---------------------------------------------------------------------------
async function fetchPageTextFallback(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return '';
    return await res.text();
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------------------
// HTML PARSING HELPERS
// ---------------------------------------------------------------------------
function extractMeta(html: string, name: string, attr: 'name' | 'property'): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${name}["']`, 'i'),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1];
  }
  return null;
}

function countHeadings(html: string): { h1: number; h2: number; h3: number; h4: number } {
  return {
    h1: (html.match(/<h1[\s>]/gi) || []).length,
    h2: (html.match(/<h2[\s>]/gi) || []).length,
    h3: (html.match(/<h3[\s>]/gi) || []).length,
    h4: (html.match(/<h4[\s>]/gi) || []).length,
  };
}

function countImages(html: string): { total: number; withAlt: number; withoutAlt: number } {
  const imgs = html.match(/<img[^>]*>/gi) || [];
  const total = imgs.length;
  const withAlt = imgs.filter((img) => /alt\s*=\s*["'][^"']+["']/i.test(img)).length;
  return { total, withAlt, withoutAlt: total - withAlt };
}

function hasCanonical(html: string): boolean {
  return /<link[^>]+rel\s*=\s*["']canonical["']/i.test(html);
}

function hasStructuredData(html: string): boolean {
  return /<script[^>]+type\s*=\s*["']application\/ld\+json["']/i.test(html);
}

function hasOgTags(html: string) {
  return {
    title: extractMeta(html, 'og:title', 'property') !== null,
    description: extractMeta(html, 'og:description', 'property') !== null,
    image: extractMeta(html, 'og:image', 'property') !== null,
    url: extractMeta(html, 'og:url', 'property') !== null,
    type: extractMeta(html, 'og:type', 'property') !== null,
  };
}

function hasTwitterCard(html: string): boolean {
  return extractMeta(html, 'twitter:card', 'name') !== null;
}

function hasPrivacyRef(html: string): boolean {
  return /politique\s*(de\s*)?\s*confidentialite|privacy\s*policy|confidentialite|donnees\s*personnelles/i.test(html);
}

function hasCookieConsent(html: string): boolean {
  return /cookie\s*(consent|banner)|axeptio|tarteaucitron|didomi|cookieconsent/i.test(html);
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.trim() || null;
}

// ---------------------------------------------------------------------------
// MAIN SCAN ENGINE
// ---------------------------------------------------------------------------
async function performFullScan(url: string): Promise<ScanBlockResult[]> {
  const results: ScanBlockResult[] = [];

  // Parallel: PageSpeed + Page Fetch + Text Fallback
  const [pageSpeed, pageData] = await Promise.all([
    fetchPageSpeed(url),
    fetchPageWithProxy(url),
  ]);

  let html = '';
  let rawHeaders: Record<string, string> = {};

  if (pageData) {
    html = pageData.html;
  }

  // Fallback: try jina.ai for text content if HTML is empty
  let fallbackText = '';
  if (!html || html.length < 100) {
    fallbackText = await fetchPageTextFallback(url);
  }

  // Try to get real headers via proxies
  const headerResult = await fetchHeadersOnly(url);
  rawHeaders = Object.keys(headerResult).length > 0 ? headerResult : pageData?.rawHeaders || {};

  // Manually extract status from HTML if we couldn't get it
  const pageStatus = pageData?.status || 200;
  // Use fallback text for content analysis if HTML is unavailable
  const analysisText = html || fallbackText || '';

  // -------------------------------------------------------------------
  // BLOCK 1: SEO TECHNIQUE
  // -------------------------------------------------------------------
  const seoDetections: DetectionInput[] = [];

  if (analysisText) {
    const title = extractTitle(analysisText);
    const metaDesc = extractMeta(analysisText, 'description', 'name');
    const metaKeywords = extractMeta(analysisText, 'keywords', 'name');
    const headings = countHeadings(analysisText);
    const images = countImages(analysisText);
    const canonical = hasCanonical(analysisText);
    const structuredData = hasStructuredData(analysisText);

    if (headings.h1 === 0) {
      seoDetections.push({ block_id: 'seo', severity: 'critical', title: 'Balise H1 absente', description: 'Aucune balise H1 detectee. La page doit avoir exactement un H1.', location: '/', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '15 min', related_blocks: ['content'] });
    } else if (headings.h1 > 1) {
      seoDetections.push({ block_id: 'seo', severity: 'major', title: `${headings.h1} balises H1 detectees`, description: 'Une seule balise H1 est recommandee par page pour un bon SEO.', location: '/html/head', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '10 min', related_blocks: ['content'] });
    }

    if (!title) {
      seoDetections.push({ block_id: 'seo', severity: 'critical', title: 'Balise Title absente', description: 'Element fondamental du SEO manquant.', location: '/html/head', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '5 min', related_blocks: ['content'] });
    } else if (title.length < 30 || title.length > 65) {
      seoDetections.push({ block_id: 'seo', severity: 'major', title: `Longueur Title : ${title.length} car. (optimum 30-65)`, description: `"${title}"`, location: '/html/head/title', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '5 min', related_blocks: ['content'] });
    }

    if (!metaDesc) {
      seoDetections.push({ block_id: 'seo', severity: 'major', title: 'Meta Description absente', description: 'Impact negatif sur le CTR dans les SERP.', location: '/html/head', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '5 min', related_blocks: ['content'] });
    } else if (metaDesc.length < 120 || metaDesc.length > 160) {
      seoDetections.push({ block_id: 'seo', severity: 'minor', title: `Meta Description : ${metaDesc.length} car. (optimum 120-160)`, description: metaDesc.substring(0, 120) + '...', location: '/html/head', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '5 min', related_blocks: ['content'] });
    }

    if (metaKeywords) {
      seoDetections.push({ block_id: 'seo', severity: 'minor', title: 'Meta Keywords obsolete presente', description: 'Ignoree par Google. Peut etre retiree sans impact.', location: '/html/head', detected_by: 'SEO Agent', auto_fix_available: true, estimated_effort: '1 min', related_blocks: [] });
    }

    if (!canonical) {
      seoDetections.push({ block_id: 'seo', severity: 'major', title: 'Canonical absent', description: 'Risque de contenu duplique aux yeux de Google.', location: '/html/head', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '5 min', related_blocks: [] });
    }

    if (!structuredData) {
      seoDetections.push({ block_id: 'seo', severity: 'major', title: 'Donnees structurees (JSON-LD) absentes', description: 'Les rich snippets ne seront pas affiches.', location: '/html/head', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '30 min', related_blocks: [] });
    }

    if (images.total > 0 && images.withoutAlt > 0) {
      seoDetections.push({ block_id: 'seo', severity: 'major', title: `${images.withoutAlt}/${images.total} images sans alt`, description: 'Perte de referencement Google Images + probleme accessibilite.', location: '/html/body', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: `${Math.ceil(images.withoutAlt * 2)} min`, related_blocks: ['content'] });
    }

    if (headings.h2 === 0 && headings.h1 >= 1) {
      seoDetections.push({ block_id: 'seo', severity: 'minor', title: 'Aucune balise H2', description: 'Structure de contenu plate, difficile a lire.', location: '/html/body', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '20 min', related_blocks: ['content'] });
    }
  } else {
    seoDetections.push({ block_id: 'seo', severity: 'critical', title: 'Page inaccessible', description: `Impossible de recuperer le contenu de ${url} pour l'analyse SEO.`, location: url, detected_by: 'KOS System', auto_fix_available: false, estimated_effort: 'N/A', related_blocks: ['performance', 'security'] });
  }

  const seoScore = Math.max(0, 100 - seoDetections.filter(d => d.severity === 'critical').length * 15 - seoDetections.filter(d => d.severity === 'major').length * 8 - seoDetections.filter(d => d.severity === 'minor').length * 3);

  results.push({
    block_id: 'seo', block_name: 'SEO Technique', health_score: seoScore,
    total_issues: seoDetections.length, critical_issues: seoDetections.filter(d => d.severity === 'critical').length,
    major_issues: seoDetections.filter(d => d.severity === 'major').length, minor_issues: seoDetections.filter(d => d.severity === 'minor').length,
    detections: seoDetections,
  });

  // -------------------------------------------------------------------
  // BLOCK 2: SECURITE OWASP
  // -------------------------------------------------------------------
  const securityDetections: DetectionInput[] = [];

  if (!url.startsWith('https://')) {
    securityDetections.push({ block_id: 'security', severity: 'critical', title: 'HTTPS non utilise', description: 'Le site n\'utilise pas HTTPS. Donnees en clair.', location: url, detected_by: 'Security Agent', auto_fix_available: false, estimated_effort: '4 h', related_blocks: ['seo', 'legal'] });
  }

  if (pageStatus >= 500) {
    securityDetections.push({ block_id: 'security', severity: 'critical', title: `Erreur serveur HTTP ${pageStatus}`, description: 'Page indisponible — impact SEO et UX.', location: url, detected_by: 'Security Agent', auto_fix_available: false, estimated_effort: '2 h', related_blocks: ['seo', 'performance'] });
  } else if (pageStatus >= 400) {
    securityDetections.push({ block_id: 'security', severity: 'major', title: `Erreur client HTTP ${pageStatus}`, description: 'La page retourne un code 4xx.', location: url, detected_by: 'Security Agent', auto_fix_available: false, estimated_effort: '1 h', related_blocks: ['seo'] });
  }

  for (const secHeader of SECURITY_HEADERS) {
    const headerKey = Object.keys(rawHeaders).find(k => k.toLowerCase() === secHeader.name.toLowerCase());
    if (!headerKey) {
      securityDetections.push({
        block_id: 'security', severity: secHeader.severity,
        title: `${secHeader.label} — Header absent`,
        description: secHeader.desc,
        location: `HTTP Response: ${secHeader.name}`,
        detected_by: 'Security Agent', auto_fix_available: false,
        estimated_effort: secHeader.severity === 'critical' ? '1 h' : '30 min',
        related_blocks: ['legal'],
      });
    }
  }

  const securityScore = Math.max(0, 100 - securityDetections.filter(d => d.severity === 'critical').length * 15 - securityDetections.filter(d => d.severity === 'major').length * 8 - securityDetections.filter(d => d.severity === 'minor').length * 3);

  results.push({
    block_id: 'security', block_name: 'Securite OWASP', health_score: securityScore,
    total_issues: securityDetections.length, critical_issues: securityDetections.filter(d => d.severity === 'critical').length,
    major_issues: securityDetections.filter(d => d.severity === 'major').length, minor_issues: securityDetections.filter(d => d.severity === 'minor').length,
    detections: securityDetections,
  });

  // -------------------------------------------------------------------
  // BLOCK 3: QUALITE CONTENU
  // -------------------------------------------------------------------
  const contentDetections: DetectionInput[] = [];

  if (analysisText) {
    const wordCount = analysisText.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
    const headings = countHeadings(analysisText);
    const textContent = analysisText.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const contentRatio = analysisText.length > 0 ? (textContent.length / analysisText.length) * 100 : 0;

    if (wordCount < 300) {
      contentDetections.push({ block_id: 'content', severity: 'major', title: `Contenu faible : ${wordCount} mots`, description: 'Minimum 300 mots recommandes pour le SEO.', location: '/html/body', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: '2 h', related_blocks: ['seo'] });
    }

    if (headings.h2 === 0 && wordCount > 200) {
      contentDetections.push({ block_id: 'content', severity: 'major', title: 'Aucune balise H2', description: 'Structure de contenu plate. Ajouter des sous-titres.', location: '/html/body', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: '30 min', related_blocks: ['seo'] });
    }

    if (contentRatio < 8 && wordCount > 50) {
      contentDetections.push({ block_id: 'content', severity: 'minor', title: `Ratio texte/HTML faible : ${contentRatio.toFixed(1)}%`, description: 'Beaucoup de code pour peu de contenu visible.', location: '/', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: 'N/A', related_blocks: ['seo', 'performance'] });
    }
  }

  const contentScore = Math.max(0, 100 - contentDetections.filter(d => d.severity === 'critical').length * 15 - contentDetections.filter(d => d.severity === 'major').length * 8 - contentDetections.filter(d => d.severity === 'minor').length * 3);

  results.push({
    block_id: 'content', block_name: 'Qualite Contenu', health_score: contentScore,
    total_issues: contentDetections.length, critical_issues: contentDetections.filter(d => d.severity === 'critical').length,
    major_issues: contentDetections.filter(d => d.severity === 'major').length, minor_issues: contentDetections.filter(d => d.severity === 'minor').length,
    detections: contentDetections,
  });

  // -------------------------------------------------------------------
  // BLOCK 4: CORE WEB VITALS
  // -------------------------------------------------------------------
  const perfDetections: DetectionInput[] = [];

  if (pageSpeed) {
    const ps = pageSpeed;
    if (ps.performance < 50) {
      perfDetections.push({ block_id: 'performance', severity: 'critical', title: `Score PageSpeed critique : ${ps.performance}/100`, description: `Score mobile de ${ps.performance}/100. Impact severe SEO et UX.`, location: 'PageSpeed Insights API', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '8 h', related_blocks: ['seo', 'content'] });
    } else if (ps.performance < 75) {
      perfDetections.push({ block_id: 'performance', severity: 'major', title: `Score PageSpeed moyen : ${ps.performance}/100`, description: 'Ameliorations necessaires pour un bon Core Web Vital.', location: 'PageSpeed Insights API', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '4 h', related_blocks: ['seo'] });
    } else if (ps.performance < 90) {
      perfDetections.push({ block_id: 'performance', severity: 'minor', title: `Score PageSpeed : ${ps.performance}/100`, description: 'Quelques optimisations pour le vert (>90).', location: 'PageSpeed Insights API', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '2 h', related_blocks: ['seo'] });
    }

    if (ps.lcp !== null && ps.lcp > 2500) {
      perfDetections.push({ block_id: 'performance', severity: ps.lcp > 4000 ? 'critical' : 'major', title: `LCP : ${(ps.lcp / 1000).toFixed(1)}s (seuil 2.5s)`, description: 'Largest Contentful Paint trop lent. Impact SEO.', location: 'PageSpeed — LCP', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '3 h', related_blocks: ['seo', 'content'] });
    }
    if (ps.tbt !== null && ps.tbt > 200) {
      perfDetections.push({ block_id: 'performance', severity: ps.tbt > 600 ? 'critical' : 'major', title: `TBT : ${Math.round(ps.tbt)}ms (seuil 200ms)`, description: 'Total Blocking Time eleve. Thread principal bloque.', location: 'PageSpeed — TBT', detected_by: 'Security Agent', auto_fix_available: false, estimated_effort: '4 h', related_blocks: ['seo'] });
    }
    if (ps.cls !== null && ps.cls > 0.1) {
      perfDetections.push({ block_id: 'performance', severity: ps.cls > 0.25 ? 'critical' : 'major', title: `CLS : ${ps.cls.toFixed(3)} (seuil 0.1)`, description: 'Cumulative Layout Shift eleve. Contenu instable.', location: 'PageSpeed — CLS', detected_by: 'SEO Agent', auto_fix_available: false, estimated_effort: '3 h', related_blocks: ['seo', 'content'] });
    }
  } else {
    perfDetections.push({ block_id: 'performance', severity: 'minor', title: 'PageSpeed Insights indisponible', description: 'L\'API n\'a pas repondu. Reessayez.', location: 'PageSpeed Insights API', detected_by: 'KOS System', auto_fix_available: true, estimated_effort: 'N/A', related_blocks: [] });
  }

  // Cache headers
  const hasCacheControl = Object.keys(rawHeaders).some(k => k.toLowerCase() === 'cache-control');
  if (!hasCacheControl && pageStatus === 200) {
    perfDetections.push({ block_id: 'performance', severity: 'major', title: 'Cache-Control absent', description: 'Ressources non mises en cache. Performance degradee.', location: 'HTTP Header', detected_by: 'Security Agent', auto_fix_available: false, estimated_effort: '1 h', related_blocks: ['security'] });
  }

  const perfScore = Math.max(0, 100 - perfDetections.filter(d => d.severity === 'critical').length * 15 - perfDetections.filter(d => d.severity === 'major').length * 8 - perfDetections.filter(d => d.severity === 'minor').length * 3);

  results.push({
    block_id: 'performance', block_name: 'Core Web Vitals', health_score: perfScore,
    total_issues: perfDetections.length, critical_issues: perfDetections.filter(d => d.severity === 'critical').length,
    major_issues: perfDetections.filter(d => d.severity === 'major').length, minor_issues: perfDetections.filter(d => d.severity === 'minor').length,
    detections: perfDetections,
  });

  // -------------------------------------------------------------------
  // BLOCK 5: RESEAUX SOCIAUX
  // -------------------------------------------------------------------
  const socialDetections: DetectionInput[] = [];

  if (analysisText) {
    const ogTags = hasOgTags(analysisText);
    const twitterCard = hasTwitterCard(analysisText);

    if (!ogTags.title) socialDetections.push({ block_id: 'social', severity: 'major', title: 'OG Title absent', description: 'Apercus LinkedIn/Facebook incomplets.', location: '/html/head', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: '5 min', related_blocks: ['seo'] });
    if (!ogTags.description) socialDetections.push({ block_id: 'social', severity: 'major', title: 'OG Description absente', description: 'Pas de description pour les partages sociaux.', location: '/html/head', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: '5 min', related_blocks: ['seo'] });
    if (!ogTags.image) socialDetections.push({ block_id: 'social', severity: 'critical', title: 'OG Image absente', description: 'Pas d\'image de preview sociale. Impact negatif sur l\'engagement.', location: '/html/head', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: '15 min', related_blocks: ['seo'] });
    if (!twitterCard) socialDetections.push({ block_id: 'social', severity: 'major', title: 'Twitter Card absente', description: 'Rendu degrade sur Twitter/X.', location: '/html/head', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: '5 min', related_blocks: ['seo'] });
    if (!ogTags.url) socialDetections.push({ block_id: 'social', severity: 'minor', title: 'OG URL absente', description: 'URL canonique sociale non specifiee.', location: '/html/head', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: '2 min', related_blocks: ['seo'] });
    if (!ogTags.type) socialDetections.push({ block_id: 'social', severity: 'minor', title: 'OG Type absent', description: 'Type de contenu social non specifie.', location: '/html/head', detected_by: 'Content Agent', auto_fix_available: false, estimated_effort: '2 min', related_blocks: ['seo'] });
  }

  const socialScore = Math.max(0, 100 - socialDetections.filter(d => d.severity === 'critical').length * 15 - socialDetections.filter(d => d.severity === 'major').length * 8 - socialDetections.filter(d => d.severity === 'minor').length * 3);

  results.push({
    block_id: 'social', block_name: 'Reseaux Sociaux', health_score: socialScore,
    total_issues: socialDetections.length, critical_issues: socialDetections.filter(d => d.severity === 'critical').length,
    major_issues: socialDetections.filter(d => d.severity === 'major').length, minor_issues: socialDetections.filter(d => d.severity === 'minor').length,
    detections: socialDetections,
  });

  // -------------------------------------------------------------------
  // BLOCK 6: CONFORMITE LEGALE
  // -------------------------------------------------------------------
  const legalDetections: DetectionInput[] = [];

  if (analysisText) {
    const hasPrivacy = hasPrivacyRef(analysisText);
    const hasCookies = hasCookieConsent(analysisText);

    if (!hasPrivacy) {
      legalDetections.push({ block_id: 'legal', severity: 'critical', title: 'Politique de confidentialite absente', description: 'Obligation legale (RGPD). Aucune mention detectee.', location: '/', detected_by: 'Legal Agent', auto_fix_available: false, estimated_effort: '4 h', related_blocks: ['security'] });
    }
    if (!hasCookies) {
      legalDetections.push({ block_id: 'legal', severity: 'major', title: 'Consentement cookies absent', description: 'Aucun bandeau cookie detecte. Obligation pour audience europeenne.', location: '/', detected_by: 'Legal Agent', auto_fix_available: false, estimated_effort: '2 h', related_blocks: ['security'] });
    }
  }

  const legalScore = Math.max(0, 100 - legalDetections.filter(d => d.severity === 'critical').length * 15 - legalDetections.filter(d => d.severity === 'major').length * 8 - legalDetections.filter(d => d.severity === 'minor').length * 3);

  results.push({
    block_id: 'legal', block_name: 'Conformite Legale', health_score: legalScore,
    total_issues: legalDetections.length, critical_issues: legalDetections.filter(d => d.severity === 'critical').length,
    major_issues: legalDetections.filter(d => d.severity === 'major').length, minor_issues: legalDetections.filter(d => d.severity === 'minor').length,
    detections: legalDetections,
  });

  return results;
}

// ---------------------------------------------------------------------------
// PUBLIC API
// ---------------------------------------------------------------------------
export async function scanWebsite(url: string, blockIds?: string[]): Promise<{ summary: ScanSummary; results: ScanBlockResult[] }> {
  let cleanUrl = url.trim();
  if (!/^https?:\/\//i.test(cleanUrl)) cleanUrl = 'https://' + cleanUrl;
  cleanUrl = cleanUrl.replace(/\/$/, '');

  const scanResults = await performFullScan(cleanUrl);
  const now = new Date().toISOString();

  const filteredResults = blockIds && blockIds.length > 0
    ? scanResults.filter(r => blockIds.includes(r.block_id))
    : scanResults;

  // Persist to Supabase
  for (const result of filteredResults) {
    const config = BLOCK_CONFIG[result.block_id];
    if (!config) continue;

    const updatedAgents = config.agents.map(agent => ({
      ...agent,
      detectionsFound: result.detections.filter(d =>
        d.detected_by?.toLowerCase().includes(agent.agentId.replace('-agent', ''))
      ).length || result.total_issues,
      fixesApplied: result.detections.filter(d =>
        d.auto_fix_available &&
        d.detected_by?.toLowerCase().includes(agent.agentId.replace('-agent', ''))
      ).length,
    }));

    await supabase.from('kos_block_scans').upsert({
      block_id: result.block_id,
      block_name: result.block_name,
      block_icon: config.icon,
      block_color: config.color,
      description: config.description,
      last_scan: now,
      total_issues: result.total_issues,
      critical_issues: result.critical_issues,
      major_issues: result.major_issues,
      minor_issues: result.minor_issues,
      fixed_issues: 0,
      health_score: result.health_score,
      agent_assignments: updatedAgents,
      updated_at: now,
    }, { onConflict: 'block_id' });

    // Replace old detections
    await supabase.from('kos_block_detections').delete().eq('block_id', result.block_id);

    if (result.detections.length > 0) {
      const detectionRows = result.detections.map((d, idx) => ({
        block_id: d.block_id,
        detection_ref: `${d.block_id}-det-${String(idx + 1).padStart(3, '0')}`,
        severity: d.severity,
        title: d.title,
        description: (d.description || '').substring(0, 300),
        location: d.location,
        detected_by: d.detected_by,
        detected_at: now,
        status: 'open',
        auto_fix_available: d.auto_fix_available,
        estimated_effort: d.estimated_effort || 'N/A',
        related_blocks: d.related_blocks || [],
        updated_at: now,
      }));
      await supabase.from('kos_block_detections').insert(detectionRows);
    }

    // Log
    await supabase.from('kos_execution_logs').insert({
      block_id: result.block_id,
      block_name: result.block_name,
      agent_id: 'kos-scanner',
      agent_name: 'KOS Agent Block Scanner',
      action: `Scan reel — ${result.total_issues} problemes`,
      detections_fixed: 0,
      timestamp: now,
      status: 'success',
      details: `Scan via PageSpeed API + headers HTTP + SEO. ${result.critical_issues} critiques, ${result.major_issues} majeurs. Score ${result.health_score}/100.`,
    });
  }

  const summary: ScanSummary = {
    totalBlocks: filteredResults.length,
    totalIssues: filteredResults.reduce((s, r) => s + r.total_issues, 0),
    criticalIssues: filteredResults.reduce((s, r) => s + r.critical_issues, 0),
    majorIssues: filteredResults.reduce((s, r) => s + r.major_issues, 0),
    minorIssues: filteredResults.reduce((s, r) => s + r.minor_issues, 0),
    autoFixable: filteredResults.reduce((s, r) => s + r.detections.filter(d => d.auto_fix_available).length, 0),
    avgHealthScore: Math.round(filteredResults.reduce((s, r) => s + r.health_score, 0) / Math.max(filteredResults.length, 1)),
    scannedUrl: cleanUrl,
    scannedAt: now,
  };

  return { summary, results: filteredResults };
}




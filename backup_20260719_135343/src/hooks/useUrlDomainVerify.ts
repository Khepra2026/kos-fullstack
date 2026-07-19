import { useState, useEffect, useCallback } from 'react';

const SITE_URL = 'https://khepraexperts.com';
const EXPECTED_DOMAIN = 'khepraexperts.com';
const BAD_DOMAINS = ['example.com', 'localhost', '127.0.0.1', '0.0.0.0', 'example.org'];

export interface DomainViolation {
  id: string;
  source_file: string;
  target_url: string;
  wrong_domain: string;
  expected_domain: string;
  url_type: 'sitemap_url' | 'canonical' | 'og_url' | 'hreflang' | 'internal_link' | 'robots_link' | 'rss_link' | 'llms_link';
  severity: 'critical' | 'high' | 'medium' | 'low';
  fix_url: string;
}

export interface DomainVerifyStats {
  files_scanned: number;
  urls_checked: number;
  violations_found: number;
  sitemaps_scanned: number;
  sitemap_violations: number;
  robots_violations: number;
  rss_violations: number;
  llms_violations: number;
  pages_scanned: number;
  page_violations: number;
}

interface UseUrlDomainVerifyReturn {
  violations: DomainViolation[];
  stats: DomainVerifyStats;
  loading: boolean;
  error: string | null;
  scan: () => Promise<void>;
}

function generateId(): string {
  return `dv-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function verifyUrlsInText(text: string, sourceFile: string, urlType: DomainViolation['url_type']): DomainViolation[] {
  const violations: DomainViolation[] = [];

  for (const badDomain of BAD_DOMAINS) {
    const escaped = badDomain.replace(/\./g, '\\.');
    const urlRegex = new RegExp(`https?://${escaped}[^\\s<>"\'\\)]*`, 'gi');
    let match;
    while ((match = urlRegex.exec(text)) !== null) {
      const badUrl = match[0];
      violations.push({
        id: generateId(),
        source_file: sourceFile,
        target_url: badUrl,
        wrong_domain: badDomain,
        expected_domain: EXPECTED_DOMAIN,
        url_type: urlType,
        severity: badDomain === 'example.com' ? 'critical' : 'high',
        fix_url: badUrl.replace(new RegExp(badDomain, 'g'), EXPECTED_DOMAIN),
      });
    }
  }

  const khepraRegex = /https?:\/\/([a-zA-Z0-9][a-zA-Z0-9-]*\.)*khepra[a-zA-Z0-9-]*\.[a-zA-Z]{2,}[^\s<>"'\\)]*/gi;
  let kmatch;
  while ((kmatch = khepraRegex.exec(text)) !== null) {
    const kurl = kmatch[0];
    try {
      const parsed = new URL(kurl);
      if (parsed.hostname !== EXPECTED_DOMAIN && !parsed.hostname.endsWith('.' + EXPECTED_DOMAIN)) {
        const alreadyCaught = violations.some((v) => v.target_url === kurl);
        if (!alreadyCaught) {
          violations.push({
            id: generateId(),
            source_file: sourceFile,
            target_url: kurl,
            wrong_domain: parsed.hostname,
            expected_domain: EXPECTED_DOMAIN,
            url_type: urlType,
            severity: 'high',
            fix_url: kurl.replace(parsed.hostname, EXPECTED_DOMAIN),
          });
        }
      }
    } catch {
      continue;
    }
  }

  return violations;
}

function verifyPageDomain(html: string, pagePath: string): DomainViolation[] {
  const violations: DomainViolation[] = [];

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
                         html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  if (canonicalMatch) {
    try {
      const parsed = new URL(canonicalMatch[1].replace(/^\/\//, 'https://'));
      if (parsed.hostname !== EXPECTED_DOMAIN && !parsed.hostname.endsWith('.' + EXPECTED_DOMAIN)) {
        violations.push({
          id: generateId(),
          source_file: pagePath,
          target_url: canonicalMatch[1],
          wrong_domain: parsed.hostname,
          expected_domain: EXPECTED_DOMAIN,
          url_type: 'canonical',
          severity: 'critical',
          fix_url: canonicalMatch[1].replace(parsed.hostname, EXPECTED_DOMAIN),
        });
      }
    } catch { /* invalid URL */ }
  }

  const ogMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
                  html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:url["'][^>]*>/i);
  if (ogMatch) {
    try {
      const parsed = new URL(ogMatch[1].replace(/^\/\//, 'https://'));
      if (parsed.hostname !== EXPECTED_DOMAIN && !parsed.hostname.endsWith('.' + EXPECTED_DOMAIN)) {
        violations.push({
          id: generateId(),
          source_file: pagePath,
          target_url: ogMatch[1],
          wrong_domain: parsed.hostname,
          expected_domain: EXPECTED_DOMAIN,
          url_type: 'og_url',
          severity: 'high',
          fix_url: ogMatch[1].replace(parsed.hostname, EXPECTED_DOMAIN),
        });
      }
    } catch { /* invalid */ }
  }

  const hreflangRegex = /<link[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let hm;
  while ((hm = hreflangRegex.exec(html)) !== null) {
    try {
      const parsed = new URL(hm[1].replace(/^\/\//, 'https://'));
      if (parsed.hostname !== EXPECTED_DOMAIN && !parsed.hostname.endsWith('.' + EXPECTED_DOMAIN)) {
        violations.push({
          id: generateId(),
          source_file: pagePath,
          target_url: hm[1],
          wrong_domain: parsed.hostname,
          expected_domain: EXPECTED_DOMAIN,
          url_type: 'hreflang',
          severity: 'high',
          fix_url: hm[1].replace(parsed.hostname, EXPECTED_DOMAIN),
        });
      }
    } catch { /* invalid */ }
  }

  const bodyViolations = verifyUrlsInText(html, pagePath, 'internal_link');
  violations.push(...bodyViolations);

  return violations;
}

const PUBLIC_FILES: Array<{ path: string; urlType: DomainViolation['url_type'] }> = [
  { path: '/sitemap.xml', urlType: 'sitemap_url' },
  { path: '/sitemapindex.xml', urlType: 'sitemap_url' },
  { path: '/sitemap-blog.xml', urlType: 'sitemap_url' },
  { path: '/sitemap-news.xml', urlType: 'sitemap_url' },
  { path: '/robots.txt', urlType: 'robots_link' },
  { path: '/rss.xml', urlType: 'rss_link' },
  { path: '/llms.txt', urlType: 'llms_link' },
  { path: '/llms-full.txt', urlType: 'llms_link' },
];

const KEY_PAGES = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/blog',
  '/services/audit-pre-inspection-bceao',
  '/regulation-financiere',
  '/prix-de-transfert',
  '/gouvernance-risques',
  '/sfd-conformite',
  '/offre-commerciale',
  '/board-report',
];

export function useUrlDomainVerify(): UseUrlDomainVerifyReturn {
  const [violations, setViolations] = useState<DomainViolation[]>([]);
  const [stats, setStats] = useState<DomainVerifyStats>({
    files_scanned: 0,
    urls_checked: 0,
    violations_found: 0,
    sitemaps_scanned: 0,
    sitemap_violations: 0,
    robots_violations: 0,
    rss_violations: 0,
    llms_violations: 0,
    pages_scanned: 0,
    page_violations: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = useCallback(async () => {
    setLoading(true);
    setError(null);
    const allViolations: DomainViolation[] = [];
    const st: DomainVerifyStats = {
      files_scanned: 0,
      urls_checked: 0,
      violations_found: 0,
      sitemaps_scanned: 0,
      sitemap_violations: 0,
      robots_violations: 0,
      rss_violations: 0,
      llms_violations: 0,
      pages_scanned: 0,
      page_violations: 0,
    };

    try {
      // Scan public files
      const fetchPromises = PUBLIC_FILES.map(async ({ path, urlType }) => {
        try {
          const resp = await fetch(`${SITE_URL}${path}`, { cache: 'no-store' });
          if (!resp.ok) return;
          const text = await resp.text();
          const fileViolations = verifyUrlsInText(text, path.replace('/', ''), urlType);
          allViolations.push(...fileViolations);
          st.files_scanned++;
          if (path.includes('sitemap')) {
            st.sitemaps_scanned++;
            st.sitemap_violations += fileViolations.length;
          } else if (path.includes('robots')) {
            st.robots_violations += fileViolations.length;
          } else if (path.includes('rss')) {
            st.rss_violations += fileViolations.length;
          } else if (path.includes('llms')) {
            st.llms_violations += fileViolations.length;
          }
          st.urls_checked += fileViolations.length > 0 ? fileViolations.length : 1;
        } catch {
          // File not accessible, skip
        }
      });

      await Promise.all(fetchPromises);

      // Scan key pages for canonical, og:url, hreflang, hardcoded bad domains
      const pagePromises = KEY_PAGES.map(async (pagePath) => {
        try {
          const resp = await fetch(`${SITE_URL}${pagePath}`, { cache: 'no-store' });
          if (!resp.ok) return;
          const html = await resp.text();
          const pageViolations = verifyPageDomain(html, pagePath);
          allViolations.push(...pageViolations);
          st.pages_scanned++;
          st.page_violations += pageViolations.length;
          st.urls_checked += 10; // rough estimate of links checked
          st.files_scanned++;
        } catch {
          // Page not accessible
        }
      });

      await Promise.all(pagePromises);

      st.violations_found = allViolations.length;

      setViolations(allViolations);
      setStats(st);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du scan de domaine');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    scan();
  }, [scan]);

  return { violations, stats, loading, error, scan };
}




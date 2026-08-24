// ═══════════════════════════════════════════════════════════════
// KOS WAF — Web Application Firewall (Netlify Edge Function)
// Protection DDoS, Injection, Brute Force, Rate Limiting
// ═══════════════════════════════════════════════════════════════

import type { Context } from 'https://edge.netlify.com/v1/index.ts';

interface RateLimitEntry {
  count: number;
  resetAt: number;
  blockedUntil: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 100;
const RATE_LIMIT_FORM_MAX = 10;
const RATE_LIMIT_API_MAX = 30;
const BLOCK_DURATION_MS = 300000;
const MAX_BLOCK_COUNT = 5;
const permanentBlockSet = new Set<string>();

const INJECTION_PATTERNS: RegExp[] = [
  /(\bUNION\b.*\bSELECT\b)/i,
  /(\bSELECT\b.*\bFROM\b)/i,
  /(\bINSERT\b\s+\bINTO\b)/i,
  /(\bDELETE\b\s+\bFROM\b)/i,
  /(\bDROP\b\s+\bTABLE\b)/i,
  /(\bUPDATE\b\s+\bSET\b)/i,
  /(\bEXEC\b\s*\()/i,
  /(<script[\s>])/i,
  /(javascript\s*:)/i,
  /(on\w+\s*=)/i,
  /(\.\.\/|\.\.\\)/i,
  /(\/etc\/passwd)/i,
  /(\/bin\/bash)/i,
  /(\bcmd\b\.exe)/i,
  /(\|.*\b(?:ls|cat|wget|curl|nc|ncat)\b)/i,
  /(\$\{.*\})/i,
  /(<\s*iframe)/i,
];

const FORM_PATHS = ['/contact', '/form', '/submit', '/newsletter', '/diagnostic', '/lead', '/board-report'];
const API_PATHS = ['/api/', '/.netlify/functions/', '/supabase/functions/'];
const BLOCKED_UA_PATTERNS: RegExp[] = [
  /(nmap|nikto|sqlmap|acunetix|burpsuite|nessus|openvas|hydra|gobuster|dirbuster|wifite|aircrack)/i,
  /(zgrab|zgrab2|masscan|whatweb|wpscan|joomscan|droopescan)/i,
  /(python-requests\/|python-urllib|Go-http-client\/1\.1$)/i,
];
const TRUSTED_BOTS = [
  'googlebot', 'google-structured-data-testing-tool', 'bingbot', 'slurp',
  'duckduckbot', 'baiduspider', 'yandexbot', 'facebot', 'twitterbot',
  'linkedinbot', 'ahrefsbot', 'semrushbot', 'dotbot', 'mj12bot',
];

function isTrustedBot(ua: string): boolean {
  return TRUSTED_BOTS.some((bot) => ua.toLowerCase().includes(bot));
}
function getClientIP(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xri = request.headers.get('x-real-ip');
  if (xri) return xri.trim();
  return 'unknown';
}
function getPathCategory(pathname: string): 'form' | 'api' | 'normal' {
  const lower = pathname.toLowerCase();
  if (FORM_PATHS.some((p) => lower.includes(p))) return 'form';
  if (API_PATHS.some((p) => lower.includes(p))) return 'api';
  return 'normal';
}
function checkRateLimit(ip: string, category: 'form' | 'api' | 'normal'): { allowed: boolean; retryAfter?: number } {
  if (permanentBlockSet.has(ip)) return { allowed: false, retryAfter: 86400 };
  const now = Date.now();
  let entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS, blockedUntil: 0 };
    rateLimitStore.set(ip, entry);
  }
  if (entry.blockedUntil > now) {
    return { allowed: false, retryAfter: Math.ceil((entry.blockedUntil - now) / 1000) };
  }
  const maxRequests = category === 'form' ? RATE_LIMIT_FORM_MAX : category === 'api' ? RATE_LIMIT_API_MAX : RATE_LIMIT_MAX_REQUESTS;
  entry.count++;
  if (entry.count > maxRequests) {
    entry.blockedUntil = now + BLOCK_DURATION_MS;
    const blockKey = `block_${ip}`;
    const blockCount = (rateLimitStore.get(blockKey)?.count || 0) + 1;
    rateLimitStore.set(blockKey, { count: blockCount, resetAt: 0, blockedUntil: 0 });
    if (blockCount >= MAX_BLOCK_COUNT) {
      permanentBlockSet.add(ip);
      console.log(`[KOS-WAF] Permanent block applied to IP: ${ip}`);
    }
    return { allowed: false, retryAfter: Math.ceil(BLOCK_DURATION_MS / 1000) };
  }
  return { allowed: true };
}
function detectInjection(url: string, body: string | null, ua: string): string | null {
  const fullText = `${url} ${body || ''} ${ua}`;
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(fullText)) return pattern.source;
  }
  return null;
}
function isBlockedUserAgent(ua: string): boolean {
  return BLOCKED_UA_PATTERNS.some((p) => p.test(ua));
}
function createBlockResponse(reason: string, retryAfter?: number): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-KOS-WAF-Blocked': 'true',
    'X-KOS-WAF-Reason': reason,
  };
  if (retryAfter) headers['Retry-After'] = String(retryAfter);
  return new Response(JSON.stringify({ blocked: true, reason: `KOS WAF Protection — ${reason}`, reference: `KOS-WAF-${Date.now().toString(36).toUpperCase()}` }), { status: 429, headers });
}

export default async function handler(request: Request, context: Context): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;
  const ip = getClientIP(request);
  const ua = request.headers.get('user-agent') || '';

  // ── CRITICAL: Bypass static assets entirely — WAF adds no value here ──
  if (pathname.startsWith('/assets/') || pathname.startsWith('/images/')) {
    return context.next();
  }

  if (isBlockedUserAgent(ua) && !isTrustedBot(ua)) {
    console.log(`[KOS-WAF] Blocked scanner UA from ${ip}: ${ua.slice(0, 80)}`);
    permanentBlockSet.add(ip);
    return createBlockResponse('Malicious scanner detected', 86400);
  }

  const exploitPaths = ['/wp-admin', '/wp-login', '/xmlrpc.php', '/.env', '/.git', '/phpmyadmin', '/adminer', '/config.php', '/admin.php', '/wp-content/plugins/', '/wp-content/themes/', '/wp-includes/'];
  for (const ep of exploitPaths) {
    if (pathname.toLowerCase().startsWith(ep)) {
      return createBlockResponse('Exploit path blocked', 86400);
    }
  }

  let body: string | null = null;
  if (method === 'POST' || method === 'PUT') {
    try { body = await request.clone().text(); } catch { body = null; }
  }
  const injectionMatch = detectInjection(url.toString(), body, ua);
  if (injectionMatch) {
    console.log(`[KOS-WAF] Injection attempt from ${ip}: ${injectionMatch}`);
    permanentBlockSet.add(ip);
    return createBlockResponse('Injection attempt blocked', 86400);
  }

  const category = getPathCategory(pathname);
  const rateLimitResult = checkRateLimit(ip, category);
  if (!rateLimitResult.allowed) {
    console.log(`[KOS-WAF] Rate limit exceeded for ${ip} on ${pathname} (${category})`);
    return createBlockResponse(`Rate limit exceeded (${category})`, rateLimitResult.retryAfter);
  }

  const response = await context.next();
  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-KOS-WAF', 'active');
  newHeaders.set('X-KOS-WAF-Version', '2.0.2');
  newHeaders.set('X-KOS-WAF-IP', ip);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: newHeaders });
}

export const config = { path: '/*' };
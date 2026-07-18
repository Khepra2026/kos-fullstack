import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const SITE_URL = 'https://khepraexperts.com';
const OG_IMAGE_DEFAULT = 'https://readdy.ai/api/search-image?query=premium dark black background with deloitte green geometric spiral pattern elegant minimalist corporate branding KHEPRA EXPERTS strategic consulting africa professional typography clean design high contrast dark green and white accents sophisticated modern aesthetic corporate identity&width=1200&height=630&seq=og-khepra-master-deloitte-v1&orientation=landscape';

const FALLBACK_IMAGE_URL = OG_IMAGE_DEFAULT;

const SITE_DATA = {
  title: 'Khepra Experts | Conseil strategique, finance & transformation digitale en Afrique',
  description: "Khepra Experts accompagne les entreprises et institutions africaines dans leur performance strategique, financiere et digitale. SIMDA Essoyomewe, Directeur Associe. +22 ans d'experience, 15+ pays.",
  siteName: 'KHEPRA EXPERTS',
};

const ALLOWED_DOMAINS = ['static.readdy.ai', 'readdy.ai', 'khepraexperts.com', 'images.unsplash.com', 'imgur.com', 'i.imgur.com'];

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.substring(0, maxLen - 3) + '...';
}

// ─── IMAGE PROXY ──────────────────────────────────────────────────────────────
async function handleImageProxy(reqUrl: URL, corsHeaders: Record<string, string>): Promise<Response> {
  const imageUrl = reqUrl.searchParams.get('url');
  if (!imageUrl) return new Response('Missing ?url= parameter', { status: 400, headers: corsHeaders });

  let parsedUrl: URL;
  try { parsedUrl = new URL(imageUrl); } catch { return new Response('Invalid URL', { status: 400, headers: corsHeaders }); }
  if (!ALLOWED_DOMAINS.some(d => parsedUrl.hostname === d || parsedUrl.hostname.endsWith('.' + d))) {
    return new Response('Domain not allowed', { status: 403, headers: corsHeaders });
  }

  const fetchHeaders = new Headers({ 'User-Agent': 'Mozilla/5.0 (compatible; OGImageBot/1.0; +https://khepraexperts.com)', 'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8' });

  async function fetchAndStream(url: string): Promise<Response | null> {
    try {
      const imageRes = await fetch(url, { method: 'GET', headers: fetchHeaders, redirect: 'follow' });
      if (!imageRes.ok) return null;
      const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
      const contentLength = imageRes.headers.get('content-length');
      const responseHeaders = new Headers(corsHeaders);
      responseHeaders.set('Content-Type', contentType);
      if (contentLength) responseHeaders.set('Content-Length', contentLength);
      responseHeaders.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      responseHeaders.set('X-Content-Type-Options', 'nosniff');
      return new Response(imageRes.body, { status: 200, headers: responseHeaders });
    } catch { return null; }
  }

  const primaryResponse = await fetchAndStream(imageUrl);
  if (primaryResponse) return primaryResponse;
  if (imageUrl !== FALLBACK_IMAGE_URL) {
    const fallbackResponse = await fetchAndStream(FALLBACK_IMAGE_URL);
    if (fallbackResponse) return fallbackResponse;
  }
  return new Response('Image unavailable', { status: 502, headers: corsHeaders });
}

// ─── SOCIAL PREVIEW ───────────────────────────────────────────────────────────
const STATIC_PAGES: Record<string, { title: string; description: string; image?: string }> = {
  '/': { title: 'Khepra Experts | Conseil strategique, finance & transformation digitale en Afrique', description: "Khepra Experts accompagne les entreprises et institutions africaines dans leur performance strategique, financiere et digitale. +22 ans d'experience, 15+ pays." },
  '/about': { title: 'A propos de Khepra Experts | SIMDA Essoyomewe, Directeur Associe', description: "Decouvrez KHEPRA EXPERTS : notre mission, nos valeurs et l'expertise de SIMDA Essoyomewe, Directeur Associe & Fondateur. 22 ans d'experience en conseil strategique et financier en Afrique." },
  '/services': { title: 'Nos Services | Conseil strategique, Finance, Digital — Khepra Experts', description: "Audit financier, gouvernance, transformation digitale, levee de fonds, ressources humaines — les services de KHEPRA EXPERTS pour les entreprises et institutions africaines." },
  '/contact': { title: "Contactez Khepra Experts | Lome, Togo — Afrique de l'Ouest", description: "Contactez KHEPRA EXPERTS pour vos projets de conseil strategique, financier et digital. Bureau a Lome, Togo. Reponse sous 24h." },
  '/blog': { title: 'Blog — Insights strategiques & financiers Afrique | Khepra Experts', description: "Articles d'experts sur la gouvernance, la finance, la transformation digitale et l'inclusion financiere en Afrique. Analyses sectorielles et guides pratiques par KHEPRA EXPERTS." },
  '/resources': { title: 'Ressources gratuites | Guides, Checklists Finance & Gouvernance — Khepra Experts', description: "Telechargez nos guides gratuits : gouvernance PME, conformite SFD, levee de fonds, transformation digitale, LCB-FT UEMOA. Ressources pratiques par KHEPRA EXPERTS." },
  '/lead-magnets': { title: 'Ressources Gratuites — Lead Magnets Conformite & Finance | KHEPRA EXPERTS', description: "Guides, checklists, diagnostics, simulations et templates gratuits pour la conformite BCEAO/COBAC, la levee de fonds, l'ESG et la gouvernance en Afrique." },
};

// Lead Magnets avec leurs meta tags OG
const LEAD_MAGNETS: Record<string, { title: string; description: string; image?: string }> = {
  'guide-bceao-2026': {
    title: 'Guide BCEAO 2026 : Les 7 Contrôles qui Bloquent Votre Agrément | KHEPRA',
    description: 'Telechargez le guide des 7 contrôles BCEAO qui bloquent 80% des agréments. 15 pages de methodologie, base sur les circulaires 2024-2025 et 50+ missions terrain.',
    image: 'https://readdy.ai/api/search-image?query=Professional African banking regulatory compliance guide document with BCEAO official stamps on mahogany desk warm golden amber lighting premium consulting firm atmosphere dark charcoal background with gold accents editorial photography style sophisticated and authoritative&width=1200&height=630&seq=og-guide-bceao-2026&orientation=landscape',
  },
  'checklist-conformite-bceao-cobac': {
    title: 'Checklist Conformite BCEAO COBAC — 127 Points de Contrôle | KHEPRA EXPERTS',
    description: 'Checklist exhaustive de 127 points pour auditer votre conformite BCEAO et COBAC. Gouvernance, ratios prudentiels, LBC/FT, IT. Telechargement gratuit.',
    image: 'https://readdy.ai/api/search-image?query=Professional African banking compliance checklist document on modern desk with BCEAO and COBAC regulatory badges warm amber lighting premium consulting atmosphere clean minimalist composition with gold and navy accents editorial photography style&width=1200&height=630&seq=og-checklist-conformite&orientation=landscape',
  },
  'diagnostic-flash-conformite-bceao-cobac-2026': {
    title: 'Diagnostic Flash Conformite BCEAO/COBAC 2026 — Score en 10 min | KHEPRA EXPERTS',
    description: 'Diagnostic interactif de conformite reglementaire BCEAO et COBAC. 25 questions, 5 domaines, score immediat et plan d\'action. Gratuit. Institutions financieres UEMOA CEMAC.',
    image: 'https://readdy.ai/api/search-image?query=Professional African financial compliance diagnostic dashboard with real-time risk scoring heatmap and regulatory checklist on modern screen in premium banking environment warm amber and charcoal lighting sophisticated consulting atmosphere&width=1200&height=630&seq=og-diag-flash-conformite&orientation=landscape',
  },
  'guide-levee-fonds-afrique': {
    title: 'Guide Levee de Fonds Afrique Francophone — 89 Criteres | KHEPRA EXPERTS',
    description: 'Guide complet pour securiser une levee de fonds en Afrique francophone. 89 criteres, pitch deck, data room, modele financier. Telechargement gratuit.',
    image: 'https://readdy.ai/api/search-image?query=Professional African investment pitch meeting with entrepreneurs and investors reviewing financial projections on large screen in premium boardroom warm emerald lighting sophisticated corporate atmosphere editorial photography style&width=1200&height=630&seq=og-guide-fonds&orientation=landscape',
  },
  'mini-rapport-due-diligence': {
    title: 'Due Diligence Express — Mini Rapport 48h | KHEPRA EXPERTS',
    description: 'Audit express de due diligence en 48h. 6 dimensions : financiere, legale, fiscale, operationnelle, ESG, reglementaire. Matrice des risques et recommandations.',
    image: 'https://readdy.ai/api/search-image?query=Professional African due diligence team analyzing financial documents and risk matrices on multiple screens in dark premium office warm emerald accent lighting editorial photography style sophisticated corporate atmosphere&width=1200&height=630&seq=og-mini-dd&orientation=landscape',
  },
  'diagnostic-esg-maturite': {
    title: 'Diagnostic Maturite ESG — Score IFC GRI ISSB | KHEPRA EXPERTS',
    description: 'Evaluez votre maturite ESG en 12 minutes. 4 piliers : Environnement, Social, Gouvernance, Impact. Score detaille et plan d\'action. Gratuit.',
    image: 'https://readdy.ai/api/search-image?query=Professional African ESG sustainability assessment with green data visualizations and environmental impact charts on modern screens in premium boardroom warm emerald lighting editorial photography style sophisticated corporate atmosphere&width=1200&height=630&seq=og-esg-maturite&orientation=landscape',
  },
  'template-audit-gouvernance': {
    title: 'Template Audit Gouvernance — AUSCGIE OHADA BCEAO COBAC | KHEPRA',
    description: 'Template d\'audit de gouvernance complet conforme AUSCGIE OHADA. Grille d\'evaluation, questionnaires, rapport type. Telechargement gratuit.',
    image: 'https://readdy.ai/api/search-image?query=Professional African corporate governance board meeting with diverse directors reviewing governance framework documents in premium boardroom warm emerald lighting editorial photography style sophisticated atmosphere&width=1200&height=630&seq=og-template-gouvernance&orientation=landscape',
  },
  'simulation-risque-reglementaire': {
    title: 'Simulation Risque Reglementaire Bancaire — Score BCEAO/COBAC | KHEPRA',
    description: 'Evaluez votre exposition aux risques reglementaires en 10 minutes. Simulation BCEAO/COBAC avec score, matrice des risques et plan d\'action.',
    image: 'https://readdy.ai/api/search-image?query=Professional African banking risk assessment dashboard with heatmap and warning indicators on modern screen warm amber and navy lighting premium consulting atmosphere clean minimalist editorial photography&width=1200&height=630&seq=og-simulation-risque&orientation=landscape',
  },
};

interface ArticleData { title: string; excerpt: string; category: string; date: string; readTime: string; tags: string[]; author: string; locale: 'fr' | 'en'; image?: string; }

const ARTICLE_IMAGES: Record<string, string> = {
  bceao: 'https://readdy.ai/api/search-image?query=African financial compliance regulatory documents BCEAO OHADA legal framework governance professional lawyers executives reviewing compliance documents contracts modern West African office strategic business law finance setting warm professional lighting dark green tones&width=1200&height=630&seq=blog-bceao-og-green&orientation=landscape',
  daf: 'https://readdy.ai/api/search-image?query=senior african CFO chief financial officer working with executive team modern boardroom reviewing financial dashboards strategic reports budget forecasts large screens outsourced financial direction expertise governance strategic financial management SMEs west africa warm professional lighting ivory dark green tones&width=1200&height=630&seq=blog22-daf-og-green&orientation=landscape',
  esg: 'https://readdy.ai/api/search-image?query=Vibrant aerial view African continent green sustainable finance impact investing solar energy panels wind turbines lush vegetation ESG governance reporting executives modern eco-friendly office building warm natural light earthy tones green bronze accents environmental social governance sustainable development goals Africa prosperity&width=1200&height=630&seq=blog-esg-africa-og-v2&orientation=landscape',
  cobac: 'https://readdy.ai/api/search-image?query=Central African banking regulatory compliance COBAC BEAC official documents executive boardroom Cameroon Gabon Congo financial institution directors signing prudential compliance framework stone-grey marble surface deep charcoal background rich bronze metallic accents formal corporate atmosphere professional governance oversight&width=1200&height=630&seq=blog-cobac-og-v2&orientation=landscape',
  gouvernanceBancaire: 'https://readdy.ai/api/search-image?query=West African banking governance BCEAO UEMOA Commission Bancaire regulatory board directors meeting elegant dark marble boardroom sophisticated regulatory framework institutional governance amber copper lighting professional executive atmosphere&width=1200&height=630&seq=blog-gouvernance-uemoa-og-v2&orientation=landscape',
};

const ARTICLES_FR: Record<string, ArticleData> = {
  'bceao-ohada-conformite': { title: "Conformite BCEAO/OHADA : cadre reglementaire applicable et implications pour les institutions financieres | KHEPRA EXPERTS", excerpt: "Le cadre reglementaire BCEAO (UEMOA), COBAC (CEMAC) et OHADA definit des obligations precises. La conformite est une condition d'acces au financement institutionnel et un critere de gouvernance.", category: "Finance", date: "2026-04-21", readTime: "8 min", tags: ["BCEAO", "COBAC", "OHADA", "UEMOA", "CEMAC", "Conformite"], author: "SIMDA Essoyomewe", locale: 'fr', image: ARTICLE_IMAGES.bceao },
  'esg-afrique': { title: "ESG en Afrique : Cadre operationnel, reporting et acces aux financements durables | KHEPRA EXPERTS", excerpt: "L'ESG n'est plus optionnel pour les entreprises africaines. Les fonds d'investissement, banques de developpement et partenaires institutionnels exigent un dispositif ESG solide comme condition prealable au financement.", category: "ESG & Finance Durable", date: "2026-05-26", readTime: "14 min", tags: ["ESG", "Afrique", "IFC", "GRI", "finance durable"], author: "SIMDA Essoyomewe", locale: 'fr', image: ARTICLE_IMAGES.esg },
  'cobac-cemac': { title: "Conformite COBAC / CEMAC : le guide complet de la gouvernance bancaire en Afrique Centrale | KHEPRA EXPERTS", excerpt: "La conformite COBAC est le socle de la credibilite des institutions financieres en zone CEMAC.", category: "Finance & Conformite", date: "2026-05-28", readTime: "16 min", tags: ["COBAC", "CEMAC", "BEAC", "conformite bancaire"], author: "SIMDA Essoyomewe", locale: 'fr', image: ARTICLE_IMAGES.cobac },
  'serie-gouvernance-uemoa': { title: "Serie Thought Leadership — Quintilogie Gouvernance Bancaire UEMOA | KHEPRA EXPERTS", excerpt: "Serie editoriale de Thought Leadership sur la gouvernance bancaire UEMOA.", category: "Gouvernance", date: "2026-06-01", readTime: "12 min", tags: ["Gouvernance bancaire", "BCEAO", "UEMOA"], author: "SIMDA Essoyomewe", locale: 'fr', image: ARTICLE_IMAGES.gouvernanceBancaire },
};

const SLUG_TO_ID: Record<string, string> = {
  'bceao-ohada-conformite': 'bceao-ohada-conformite',
  'esg-afrique-entreprises': 'esg-afrique',
  'conformite-cobac-cemac': 'cobac-cemac',
  'serie-gouvernance-bancaire-uemoa': 'serie-gouvernance-uemoa',
};

function buildOgHtml(params: { title: string; description: string; url: string; type: string; locale: string; author?: string; publishedTime?: string; modifiedTime?: string; section?: string; tags?: string[]; readTime?: string; category?: string; ogImage?: string; redirectUrl?: string; }): string {
  const { title, description, url, type, locale, author, publishedTime, modifiedTime, section, tags, readTime, category, ogImage, redirectUrl } = params;
  const safeTitle = escapeHtml(truncate(title, 200));
  const safeDesc = escapeHtml(truncate(description, 300));
  const safeUrl = escapeHtml(url);
  const safeImage = escapeHtml(ogImage || OG_IMAGE_DEFAULT);
  const safeSiteName = escapeHtml(SITE_DATA.siteName);
  const safeAuthor = author ? escapeHtml(author) : '';
  const redirect = redirectUrl || url;
  const articleMeta = type === 'article' ? `\n  <meta property="article:author" content="${safeAuthor}" />\n  <meta property="article:published_time" content="${publishedTime || ''}" />\n  <meta property="article:modified_time" content="${modifiedTime || publishedTime || ''}" />\n  <meta property="article:section" content="${escapeHtml(section || '')}" />\n  ${(tags || []).slice(0, 10).map(tag => `<meta property="article:tag" content="${escapeHtml(tag)}" />`).join('\n  ')}\n  <meta name="author" content="${safeAuthor}" />` : '';
  const twitterLabels = readTime ? `\n  <meta name="twitter:label1" content="Temps de lecture" />\n  <meta name="twitter:data1" content="${escapeHtml(readTime)}" />\n  <meta name="twitter:label2" content="Categorie" />\n  <meta name="twitter:data2" content="${escapeHtml(category || '')}" />` : '';
  return `<!DOCTYPE html>\n<html lang="fr" prefix="og: https://ogp.me/ns#${type === 'article' ? ' article: https://ogp.me/ns/article#' : ''}">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>${safeTitle}</title>\n  <meta name="description" content="${safeDesc}" />\n  <meta name="robots" content="index, follow" />\n  <meta property="og:type" content="${type}" />\n  <meta property="og:url" content="${safeUrl}" />\n  <meta property="og:title" content="${safeTitle}" />\n  <meta property="og:description" content="${safeDesc}" />\n  <meta property="og:image" content="${safeImage}" />\n  <meta property="og:image:secure_url" content="${safeImage}" />\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />\n  <meta property="og:image:type" content="image/jpeg" />\n  <meta property="og:image:alt" content="${safeTitle}" />\n  <meta property="og:site_name" content="${safeSiteName}" />\n  <meta property="og:locale" content="${locale}" />${articleMeta}\n  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:site" content="@KhepraExperts" />\n  <meta name="twitter:creator" content="@KhepraExperts" />\n  <meta name="twitter:title" content="${safeTitle}" />\n  <meta name="twitter:description" content="${safeDesc}" />\n  <meta name="twitter:image" content="${safeImage}" />\n  <meta name="twitter:image:alt" content="${safeTitle}" />${twitterLabels}\n  <link rel="canonical" href="${safeUrl}" />\n  <script>(function(){var ua=(navigator&&navigator.userAgent)?navigator.userAgent:'';var isBot=/bot|crawler|spider|crawling|facebookexternalhit|facebot|linkedinbot|twitterbot|whatsapp|slackbot|telegrambot|discordbot|pinterestbot|googlebot|bingbot|applebot|yandexbot|baiduspider|duckduckbot/i.test(ua);if(!isBot&&'${escapeHtml(redirect)}'){window.location.replace('${escapeHtml(redirect)}');}})();</script>\n</head>\n<body>\n  <h1>${safeTitle}</h1>\n  <p>${safeDesc}</p>\n  <img src="${safeImage}" alt="${escapeHtml(truncate(title, 100))}" width="1200" height="630" />\n  <p><a href="${safeUrl}">Lire la suite sur KHEPRA EXPERTS</a></p>\n</body>\n</html>`;
}

function handleSocialPreview(reqUrl: URL, corsHeaders: Record<string, string>): Response {
  let rawPath = reqUrl.searchParams.get('path') || '/';
  if (rawPath.startsWith('http')) { try { rawPath = new URL(rawPath).pathname; } catch { /* keep */ } }
  const normalizedPath = rawPath.endsWith('/') && rawPath !== '/' ? rawPath.slice(0, -1) : rawPath;
  const canonicalUrl = `${SITE_URL}${normalizedPath}/`.replace(/\/\/$/, '/');

  const htmlHeaders = { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400', 'X-Robots-Tag': 'index, follow', 'Vary': 'User-Agent' };

  // 1. Static pages
  const staticPage = STATIC_PAGES[normalizedPath];
  if (staticPage) {
    return new Response(buildOgHtml({ title: staticPage.title, description: staticPage.description, url: canonicalUrl, type: 'website', locale: 'fr_FR', ogImage: staticPage.image || OG_IMAGE_DEFAULT, redirectUrl: canonicalUrl }), { status: 200, headers: htmlHeaders });
  }

  // 2. Lead Magnets
  const lmMatch = normalizedPath.match(/^\/lead-magnets\/([^/?#]+)/);
  if (lmMatch) {
    const lmSlug = lmMatch[1];
    const lm = LEAD_MAGNETS[lmSlug];
    if (lm) {
      return new Response(buildOgHtml({ title: lm.title, description: lm.description, url: canonicalUrl, type: 'website', locale: 'fr_FR', ogImage: lm.image || OG_IMAGE_DEFAULT, redirectUrl: canonicalUrl }), { status: 200, headers: htmlHeaders });
    }
    // Fallback for unknown lead magnets — still better than generic
    const guessedTitle = lmSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return new Response(buildOgHtml({ title: `${guessedTitle} | Ressource Gratuite KHEPRA EXPERTS`, description: 'Ressource gratuite KHEPRA EXPERTS — Telechargez ce lead magnet exclusif pour les professionnels de la finance et de la conformite en Afrique.', url: canonicalUrl, type: 'website', locale: 'fr_FR', ogImage: OG_IMAGE_DEFAULT, redirectUrl: canonicalUrl }), { status: 200, headers: htmlHeaders });
  }

  // 3. Blog articles
  const blogSlugMatch = normalizedPath.match(/^\/blog\/([^/?#]+)/);
  if (blogSlugMatch) {
    const rawSlug = blogSlugMatch[1];
    const articleId = SLUG_TO_ID[rawSlug] || rawSlug;
    const article = ARTICLES_FR[articleId];
    if (article) {
      const desc = article.excerpt.length > 250 ? article.excerpt.substring(0, 247) + '...' : article.excerpt;
      return new Response(buildOgHtml({ title: article.title, description: desc, url: canonicalUrl, type: 'article', locale: 'fr_FR', author: article.author, publishedTime: article.date, modifiedTime: article.date, section: article.category, tags: article.tags, readTime: article.readTime, category: article.category, ogImage: article.image || OG_IMAGE_DEFAULT, redirectUrl: canonicalUrl }), { status: 200, headers: htmlHeaders });
    }
    // Dynamic blog fallback — extract title from slug
    const blogTitle = rawSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return new Response(buildOgHtml({ title: `${blogTitle} | Blog KHEPRA EXPERTS`, description: `Article KHEPRA EXPERTS : ${blogTitle}. Expertise en conseil strategique, finance et conformite en Afrique.`, url: canonicalUrl, type: 'article', locale: 'fr_FR', ogImage: OG_IMAGE_DEFAULT, redirectUrl: canonicalUrl }), { status: 200, headers: htmlHeaders });
  }

  // 4. Tools pages
  if (normalizedPath.startsWith('/tools/')) {
    const toolName = normalizedPath.replace('/tools/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return new Response(buildOgHtml({ title: `${toolName} | Outil Gratuit KHEPRA EXPERTS`, description: `Outil en ligne gratuit KHEPRA EXPERTS : ${toolName}. Diagnostic, evaluation et recommandations pour les professionnels africains.`, url: canonicalUrl, type: 'website', locale: 'fr_FR', ogImage: OG_IMAGE_DEFAULT, redirectUrl: canonicalUrl }), { status: 200, headers: htmlHeaders });
  }

  // 5. Generic fallback — smarter than before
  const pathSegments = normalizedPath.replace(/^\//, '').split('/').filter(Boolean);
  let fallbackTitle = SITE_DATA.title;
  let fallbackDesc = SITE_DATA.description;

  if (pathSegments.length > 0) {
    const pageName = pathSegments[pathSegments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    fallbackTitle = `${pageName} | KHEPRA EXPERTS`;
    fallbackDesc = `${pageName} — KHEPRA EXPERTS, cabinet de conseil strategique et financier en Afrique. +22 ans d'experience, 15+ pays.`;
  }

  return new Response(buildOgHtml({ title: fallbackTitle, description: fallbackDesc, url: canonicalUrl, type: 'website', locale: 'fr_FR', ogImage: OG_IMAGE_DEFAULT, redirectUrl: canonicalUrl }), { status: 200, headers: htmlHeaders });
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
serve(async (req: Request) => {
  const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'X-Powered-By': 'KHEPRA-OG/4.0' };

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

  const reqUrl = new URL(req.url);
  const action = reqUrl.searchParams.get('action') || 'preview';

  if (action === 'proxy') return handleImageProxy(reqUrl, corsHeaders);

  return handleSocialPreview(reqUrl, corsHeaders);
});

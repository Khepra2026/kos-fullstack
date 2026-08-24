/**
 * KHEPRA ANALYTICS ENGINE — SPA Router Tracking
 * ================================================
 * Gère les pageviews SPA (Single Page Application) pour :
 * - Google Analytics 4 (gtag)
 * - Meta Pixel (fbq)
 * - LinkedIn Insight Tag (insight)
 *
 * Utilisation : appeler trackPageView() dans le listener de route React Router
 * ou dans App.tsx via useEffect avec la location courante.
 */

// ── Configuration depuis variables d'environnement ──
const GA4_ID = import.meta.env.VITE_GA4_ID || '';
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';
const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID || '';
const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

// ── Helpers ──
const isProd = import.meta.env.PROD === true;
const hasGa4 = GA4_ID !== '' && GA4_ID !== 'G-XXXXXXXXXX';
const hasMeta = META_PIXEL_ID !== '' && META_PIXEL_ID !== 'XXXXXXXXXXXXXXXX';
const hasLinkedin = LINKEDIN_PARTNER_ID !== '' && LINKEDIN_PARTNER_ID !== 'XXXXXXX';

/**
 * Type-safe window extensions for analytics
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
    _linkedin_data_partner_ids?: string[];
    lintrk?: any;
  }
}

/**
 * Initialise Google Analytics 4 (gtag.js)
 * Injection asynchrone pour ne pas bloquer le rendu initial.
 */
export function initGA4(): void {
  if (!ENABLE_ANALYTICS || !hasGa4) return;

  // dataLayer fallback
  window.dataLayer = window.dataLayer || [];

  // gtag helper
  window.gtag = function (...args: any[]) {
    window.dataLayer!.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, {
    send_page_view: false, // on gère les pageviews SPA manuellement
    cookie_flags: 'SameSite=None;Secure',
    cookie_expires: 63072000,
    allow_google_signals: true,
    allow_ad_personalization_signals: true,
    anonymize_ip: false,
  });

  // Script asynchrone — chargement différé via requestIdleCallback ou setTimeout 0
  const injectScript = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    script.onload = () => {
      // Script chargé — pageview initial déclenché par trackPageView()
    };
    document.head.appendChild(script);
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(injectScript, { timeout: 2000 });
  } else {
    setTimeout(injectScript, 100);
  }
}

/**
 * Initialise Meta Pixel (Facebook)
 */
export function initMetaPixel(): void {
  if (!ENABLE_ANALYTICS || !hasMeta) return;

  // Snippet Meta Pixel standard
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode!.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js',
  );

  window.fbq!('init', META_PIXEL_ID);
}

/**
 * Initialise LinkedIn Insight Tag
 */
export function initLinkedInInsight(): void {
  if (!ENABLE_ANALYTICS || !hasLinkedin) return;

  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);

  (function (l: any) {
    if (!l) {
      window.lintrk = function (a: any, b: any) {
        window.lintrk.q.push([a, b]);
      };
      window.lintrk.q = [];
    }
    const s = document.getElementsByTagName('script')[0];
    const b = document.createElement('script');
    b.type = 'text/javascript';
    b.async = true;
    b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    s.parentNode!.insertBefore(b, s);
  })(window.lintrk);
}

/**
 * Initialise tous les trackers en une seule fois.
 * À appeler une fois au montage de App.tsx.
 */
export function initAllAnalytics(): void {
  if (!ENABLE_ANALYTICS) {
     
    if (!isProd) console.log('[Analytics] Tracking désactivé (VITE_ENABLE_ANALYTICS=false)');
    return;
  }

  initGA4();
  initMetaPixel();
  initLinkedInInsight();

   
  if (!isProd) {
    console.log('[Analytics] Initialisé — GA4:', hasGa4, 'Meta:', hasMeta, 'LinkedIn:', hasLinkedin);
  }
}

/**
 * Track un pageview SPA (à appeler à chaque changement de route React Router).
 * @param pathname — le path de la nouvelle page (ex: "/services/conseil-strategique")
 * @param title — le titre de la page (optionnel, fallback sur document.title)
 */
export function trackPageView(pathname: string, title?: string): void {
  if (!ENABLE_ANALYTICS) return;

  const pageTitle = title || document.title;
  const pagePath = pathname;
  const pageLocation = `${window.location.origin}${pathname}`;

  // ── GA4 page_view event ──
  if (hasGa4 && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: pageLocation,
      page_path: pagePath,
      send_to: GA4_ID,
    });
  }

  // ── Meta Pixel PageView ──
  if (hasMeta && window.fbq) {
    window.fbq!('track', 'PageView', {
      content_name: pageTitle,
      content_category: 'page_navigation',
    });
  }

  // ── LinkedIn pageView (si disponible) ──
  if (hasLinkedin && window.lintrk) {
    window.lintrk('track', { conversion_id: null });
  }

  // ── Console en dev ──
   
  if (!isProd) {
    console.log(`[Analytics] PageView → ${pagePath} — "${pageTitle}"`);
  }
}

/**
 * Track un événement personnalisé.
 * @param eventName — nom GA4 (snake_case) ou Meta (standard)
 * @param params — paramètres de l'événement
 * @param platforms — plateformes cibles ('ga4' | 'meta' | 'linkedin' | 'all')
 */
export function trackEvent(
  eventName: string,
  params: Record<string, any> = {},
  platforms: ('ga4' | 'meta' | 'linkedin' | 'all')[] = ['all'],
): void {
  if (!ENABLE_ANALYTICS) return;

  const targetAll = platforms.includes('all');

  // ── GA4 ──
  if ((targetAll || platforms.includes('ga4')) && hasGa4 && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      event_source: 'khepra_spa',
    });
  }

  // ── Meta Pixel ──
  if ((targetAll || platforms.includes('meta')) && hasMeta && window.fbq) {
    const metaEventName = eventName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace(/\s/g, '');
    window.fbq!('trackCustom', metaEventName, params);
  }

  // ── LinkedIn ──
  if ((targetAll || platforms.includes('linkedin')) && hasLinkedin && window.lintrk) {
    window.lintrk('track', { conversion_id: params.conversion_id || null });
  }
}

/**
 * Track un événement de conversion (lead, form submit, CTA click, etc.)
 */
export function trackConversion(
  conversionName: string,
  value?: number,
  currency: string = 'XOF',
  params?: Record<string, any>,
): void {
  if (!ENABLE_ANALYTICS) return;

  // GA4 — conversion event
  if (hasGa4 && window.gtag) {
    window.gtag('event', conversionName, {
      value,
      currency,
      ...params,
    });
  }

  // Meta — custom conversion
  if (hasMeta && window.fbq) {
    window.fbq!('trackCustom', conversionName, {
      value: value || 0,
      currency,
      ...params,
    });
  }

  // LinkedIn — conversion event
  if (hasLinkedin && window.lintrk) {
    window.lintrk('track', { conversion_id: params?.conversion_id || null });
  }
}

/**
 * Track un contact/lead submit.
 */
export function trackLeadSubmit(params: {
  form_id: string;
  form_name: string;
  form_location: string;
  service_interest?: string;
  page_path: string;
}): void {
  trackConversion('generate_lead', undefined, 'XOF', {
    event_category: 'engagement',
    event_label: params.form_name,
    form_id: params.form_id,
    form_location: params.form_location,
    service_interest: params.service_interest || 'general',
    page_path: params.page_path,
  });
}

/**
 * Track un clic CTA (Call to Action).
 */
export function trackCTAClick(params: {
  cta_name: string;
  cta_location: string;
  destination?: string;
}): void {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: params.cta_name,
    cta_location: params.cta_location,
    destination: params.destination || '',
  });
}

/**
 * Track une vue d'un service spécifique.
 */
export function trackServiceView(serviceName: string, pagePath: string): void {
  trackEvent('view_service', {
    event_category: 'content',
    event_label: serviceName,
    page_path: pagePath,
  });
}

export default {
  initAllAnalytics,
  trackPageView,
  trackEvent,
  trackConversion,
  trackLeadSubmit,
  trackCTAClick,
  trackServiceView,
};




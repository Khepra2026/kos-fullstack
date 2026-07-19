import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ConversionEvent {
  event: string;
  category: string;
  label: string;
  value?: number;
  metadata?: Record<string, any>;
}

/**
 * Composant de suivi des conversions
 * Track automatiquement les événements importants pour l'analyse des conversions
 */
export function ConversionTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

/**
 * Track une page vue
 */
export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
    });
  }
}

/**
 * Track un événement de conversion
 */
export function trackConversion(event: ConversionEvent) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.event, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.metadata,
    });
  }

  // Log pour debug
  if (import.meta.env.DEV) {
    console.log('🎯 Conversion tracked:', event);
  }
}

/**
 * Track l'ouverture d'un formulaire
 */
export function trackFormOpen(formType: string, formName: string) {
  trackConversion({
    event: 'form_open',
    category: 'Engagement',
    label: formName,
    metadata: { form_type: formType },
  });
}

/**
 * Track le début de remplissage d'un formulaire
 */
export function trackFormStart(formType: string, formName: string) {
  trackConversion({
    event: 'form_start',
    category: 'Engagement',
    label: formName,
    metadata: { form_type: formType },
  });
}

/**
 * Track la soumission d'un formulaire
 */
export function trackFormSubmission(formType: string, formName: string, leadScore?: number) {
  trackConversion({
    event: 'form_submission',
    category: 'Lead',
    label: formName,
    value: leadScore,
    metadata: { form_type: formType },
  });
}

/**
 * Track un clic sur un CTA
 */
export function trackCTAClick(ctaName: string, ctaLocation: string) {
  trackConversion({
    event: 'cta_click',
    category: 'Engagement',
    label: ctaName,
    metadata: { location: ctaLocation },
  });
}

/**
 * Track l'ouverture de Calendly
 */
export function trackCalendlyOpen(source: string) {
  trackConversion({
    event: 'calendly_open',
    category: 'Engagement',
    label: 'Calendly Widget',
    metadata: { source },
  });
}

/**
 * Track une réservation Calendly
 */
export function trackCalendlyBooking(eventType: string) {
  trackConversion({
    event: 'calendly_booking',
    category: 'Conversion',
    label: eventType,
    value: 100, // Valeur arbitraire pour une réservation
  });
}

/**
 * Track le téléchargement d'une ressource
 */
export function trackResourceDownload(resourceName: string, resourceType: string) {
  trackConversion({
    event: 'resource_download',
    category: 'Engagement',
    label: resourceName,
    metadata: { resource_type: resourceType },
  });
}

/**
 * Track un clic sur un lien externe
 */
export function trackExternalLink(url: string, linkText: string) {
  trackConversion({
    event: 'external_link_click',
    category: 'Engagement',
    label: linkText,
    metadata: { url },
  });
}

/**
 * Track le temps passé sur une page
 */
export function trackTimeOnPage(pagePath: string, timeInSeconds: number) {
  if (timeInSeconds < 10) return; // Ignorer les visites très courtes

  trackConversion({
    event: 'time_on_page',
    category: 'Engagement',
    label: pagePath,
    value: timeInSeconds,
  });
}

/**
 * Track la profondeur de scroll
 */
export function trackScrollDepth(pagePath: string, depth: number) {
  const milestones = [25, 50, 75, 100];
  const milestone = milestones.find(m => depth >= m && depth < m + 5);

  if (milestone) {
    trackConversion({
      event: 'scroll_depth',
      category: 'Engagement',
      label: pagePath,
      value: milestone,
    });
  }
}

/**
 * Hook pour tracker le temps passé sur une page
 */
export function useTimeOnPageTracking() {
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackTimeOnPage(location.pathname, timeSpent);
    };
  }, [location]);
}

/**
 * Hook pour tracker la profondeur de scroll
 */
export function useScrollDepthTracking() {
  const location = useLocation();

  useEffect(() => {
    let maxScroll = 0;
    const trackedMilestones = new Set<number>();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;

        const milestones = [25, 50, 75, 100];
        milestones.forEach(milestone => {
          if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone);
            trackScrollDepth(location.pathname, milestone);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);
}




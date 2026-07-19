import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface CalendlyWidgetProps {
  url?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

const CALENDLY_SCRIPT_URL = 'https://assets.calendly.com/assets/external/widget.js';

export function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window not available'));
      return;
    }
    const existing = document.querySelector(`script[src="${CALENDLY_SCRIPT_URL}"]`);
    if (existing) {
      if ((window as any).Calendly) {
        resolve();
      } else {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Calendly script failed')));
      }
      return;
    }
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly script failed'));
    document.body.appendChild(script);
  });
}

export function CalendlyWidget({ url, prefill, utm }: CalendlyWidgetProps) {
  const { i18n } = useTranslation();
  const calendlyUrl = url || 'https://calendly.com/essochamanu/consultation-strategique-30min';
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCalendlyScript().catch(() => {});
  }, []);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      await loadCalendlyScript();
      if ((window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({
          url: calendlyUrl,
          prefill: prefill || {},
          utm: utm || {},
        });
        if ((window as any).gtag) {
          (window as any).gtag('event', 'calendly_open', {
            event_category: 'Engagement',
            event_label: 'Calendly Widget',
          });
        }
      } else {
        window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
      }
    } catch {
      window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsLoading(false);
    }
  }, [calendlyUrl, prefill, utm]);

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        background: 'linear-gradient(135deg, #c9a227, #e8c547)',
        color: '#1a1a1a',
        padding: '0.875rem 1.5rem',
        borderRadius: '9999px',
        fontWeight: 600,
        fontSize: '0.9rem',
        whiteSpace: 'nowrap',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
        border: 'none',
        boxShadow: '0 4px 16px rgba(201,162,39,0.40)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
      }}
    >
      {isLoading ? (
        <i className="ri-loader-4-line text-xl animate-spin"></i>
      ) : (
        <i className="ri-calendar-check-line text-xl"></i>
      )}
      <span>{i18n.language.startsWith('en') ? 'Schedule a consultation' : 'Réserver une consultation'}</span>
    </button>
  );
}

export function CalendlyInlineWidget({ url, height = '700px' }: { url?: string; height?: string }) {
  const calendlyUrl = url || 'https://calendly.com/essochamanu/consultation-strategique-30min';
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        await loadCalendlyScript();
        if (cancelled) return;
        if ((window as any).Calendly && containerRef.current) {
          containerRef.current.innerHTML = '';
          (window as any).Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: containerRef.current,
            prefill: {},
            utm: {},
          });
        }
      } catch {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = `<iframe src="${calendlyUrl}" style="width:100%;height:${height};border:none;" title="Calendly Scheduling" loading="lazy"></iframe>`;
        }
      }
    };

    init();
    return () => { cancelled = true; };
  }, [calendlyUrl, height]);

  return (
    <div
      ref={containerRef}
      style={{ minWidth: '320px', height }}
    />
  );
}




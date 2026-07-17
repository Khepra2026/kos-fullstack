import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import InstitutionalAbstractBackground from '@/components/feature/InstitutionalAbstractBackground';

interface KPICardProps {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
  icon: string;
  delay: number;
  accent: string;
}

function AnimatedNumber({ value, suffix, prefix }: { value: string; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(prefix ? prefix : '');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { i18n } = useTranslation();

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const numericMatch = value.match(/[\d,.]+/);
    if (!numericMatch) {
      setDisplay(`${prefix || ''}${value}${suffix || ''}`);
      return;
    }
    const targetStr = numericMatch[0];
    const isDecimal = targetStr.includes('.');
    const cleanTarget = parseFloat(targetStr.replace(/,/g, ''));
    const duration = 2000;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = cleanTarget * eased;

      if (isDecimal) {
        const formatted = current.toFixed(1);
        setDisplay(`${prefix || ''}${formatted}${suffix || ''}`);
      } else {
        const locale = i18n.language.startsWith('en') ? 'en-US' : 'fr-FR';
        const formatted = Math.round(current).toLocaleString(locale);
        setDisplay(`${prefix || ''}${formatted}${suffix || ''}`);
      }

      if (progress < 1) requestAnimationFrame(step);
      else {
        setDisplay(`${prefix || ''}${targetStr}${suffix || ''}`);
      }
    };
    requestAnimationFrame(step);
  }, [value, suffix, prefix]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) animate();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold tracking-tight tabular-nums">
      {display}
    </div>
  );
}

function KPICard({ value, label, suffix, prefix, icon, delay, accent }: KPICardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 md:p-8 gradient-border glow-gold-hover transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ${delay}ms ease-out, transform 0.7s ${delay}ms ease-out, box-shadow 0.4s ease`,
      }}
    >
      {/* Accent bar top */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: accent }} />

      {/* Icon */}
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: accent + '12' }}
      >
        <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center">
          <i className={`${icon} text-xl`} style={{ color: accent }} />
        </div>
      </div>

      {/* Animated number */}
      <div className="mb-2" style={{ color: accent }}>
        <AnimatedNumber value={value} suffix={suffix} prefix={prefix} />
      </div>

      {/* Label */}
      <p className="text-sm md:text-base text-gray-600 font-medium leading-snug">
        {label}
      </p>
    </div>
  );
}

export function HomeKPIs() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const sectionRef = useRef<HTMLElement>(null);

  const kpis = [
    {
      value: '500',
      suffix: isFr ? 'M€+' : 'M€+',
      label: isFr ? 'de transactions évaluées en due diligence' : 'in transactions evaluated in due diligence',
      icon: 'ri-money-dollar-circle-line',
      delay: 0,
      accent: '#86BC25',
    },
    {
      value: '120',
      suffix: isFr ? 'M€+' : 'M€+',
      label: isFr ? 'levés par nos clients en Investment Readiness' : 'raised by our clients through Investment Readiness',
      icon: 'ri-rocket-line',
      delay: 100,
      accent: '#86BC25',
    },
    {
      value: '80',
      suffix: '+',
      label: isFr ? 'projets industriels & agro-business structurés' : 'industrial & agro-business projects structured',
      icon: 'ri-building-2-line',
      delay: 200,
      accent: '#86BC25',
    },
    {
      value: '100',
      suffix: '%',
      label: isFr ? 'des études de faisabilité acceptées par les comités de crédit' : 'of feasibility studies accepted by credit committees',
      icon: 'ri-checkbox-circle-line',
      delay: 300,
      accent: '#86BC25',
    },
    {
      value: '22',
      suffix: '',
      label: isFr ? 'ans d\'expérience en Afrique francophone' : 'years of experience in French-speaking Africa',
      icon: 'ri-trophy-line',
      delay: 400,
      accent: '#86BC25',
    },
    {
      value: '15',
      suffix: '',
      label: isFr ? 'pays couverts — UEMOA & CEMAC' : 'countries covered — WAEMU & CEMAC',
      icon: 'ri-global-line',
      delay: 500,
      accent: '#86BC25',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="kpis"
      className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Fond abstrait institutionnel — motif data-dashboard */}
      <InstitutionalAbstractBackground opacity={0.035} />

      {/* Overlay dégradé pour préserver la lisibilité */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.7) 100%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-6">
            <BigFourSubtitleBar
              label={isFr ? 'Performance mesurable' : 'Measurable performance'}
              variant="centered-pillars"
              icon="ri-bar-chart-grouped-line"
              accentColor="primary"
            />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 mb-4 leading-tight">
            {isFr ? (
              <>Ce que nous <span className="text-gold-600">mesurons</span>, pas ce que nous prétendons</>
            ) : (
              <>What we <span className="text-gold-600">measure</span>, not what we claim</>
            )}
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed text-justify">
            {isFr
              ? 'Des chiffres vérifiables qui traduisent 22 ans d\'expertise terrain sur des transactions concrètes.'
              : 'Verifiable numbers that reflect 22 years of hands-on expertise on concrete transactions.'}
          </p>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {kpis.map((kpi, i) => (
            <KPICard
              key={i}
              value={kpi.value}
              suffix={kpi.suffix}
              label={kpi.label}
              icon={kpi.icon}
              delay={kpi.delay}
              accent={kpi.accent}
            />
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-shield-check-line text-emerald-600" />
            </div>
            <span>{isFr ? 'Chiffres auditables et traçables' : 'Auditable and traceable numbers'}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-time-line text-gold-600" />
            </div>
            <span>{isFr ? 'Mis à jour annuellement' : 'Updated annually'}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-file-list-3-line text-brand-800" />
            </div>
            <span>{isFr ? 'Sources : mandats clients & banques partenaires' : 'Sources: client mandates & partner banks'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeKPIs;
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

interface Counter {
  value: number;
  target: number;
}

const IMPACT_DATA = [
  {
    icon: 'ri-money-dollar-circle-line',
    valueFr: '50M€+',
    valueEn: '€50M+',
    labelFr: 'de valeur générée pour nos clients',
    labelEn: 'in value generated for clients',
    descFr: 'CA récupéré, financements mobilisés et pertes évitées par nos missions depuis 22 ans.',
    descEn: 'Revenue recovered, financing mobilized and losses prevented across 22 years of missions.',
    color: '#86BC25',
    bg: 'rgba(212,168,42,0.06)',
    border: 'rgba(212,168,42,0.18)',
    numeric: 50,
    suffix: 'M€+',
  },
  {
    icon: 'ri-building-2-line',
    valueFr: '20+',
    valueEn: '20+',
    labelFr: 'secteurs accompagnés',
    labelEn: 'sectors served',
    descFr: 'Microfinance, fintech, PME, secteur public, CEMAC/UEMOA — expertise transversale et sectorielle.',
    descEn: 'Microfinance, fintech, SMEs, public sector, CEMAC/UEMOA — cross-sector expertise.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.18)',
    numeric: 20,
    suffix: '+',
  },
  {
    icon: 'ri-global-line',
    valueFr: '20+',
    valueEn: '20+',
    labelFr: 'pays africains',
    labelEn: 'African countries',
    descFr: 'Présence en Afrique de l\'Ouest et Centrale — UEMOA, CEMAC et au-delà.',
    descEn: 'Operations across West and Central Africa — UEMOA, CEMAC and beyond.',
    color: '#86BC25',
    bg: 'rgba(212,168,42,0.06)',
    border: 'rgba(212,168,42,0.18)',
    numeric: 20,
    suffix: '+',
  },
  {
    icon: 'ri-organization-chart',
    valueFr: '600+',
    valueEn: '600+',
    labelFr: 'organisations accompagnées',
    labelEn: 'organizations supported',
    descFr: 'SFD, IMF, ONG, administrations publiques et entreprises privées transformées avec succès.',
    descEn: 'MFIs, NGOs, public administrations and private companies successfully transformed.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.18)',
    numeric: 600,
    suffix: '+',
  },
];

const RESULTS = [
  {
    icon: 'ri-arrow-up-circle-line',
    metricFr: '+3 à 8pts',
    metricEn: '+3 to 8pts',
    labelFr: 'de marge nette récupérée',
    labelEn: 'in net margin recovered',
    color: '#10b981',
  },
  {
    icon: 'ri-time-line',
    metricFr: '−45 jours',
    metricEn: '−45 days',
    labelFr: 'de délai de recouvrement',
    labelEn: 'in collection delays',
    color: '#86BC25',
  },
  {
    icon: 'ri-shield-check-line',
    metricFr: '100%',
    metricEn: '100%',
    labelFr: 'conformité BCEAO/BEAC',
    labelEn: 'BCEAO/BEAC compliance',
    color: '#10b981',
  },
  {
    icon: 'ri-rocket-line',
    metricFr: '+40%',
    metricEn: '+40%',
    labelFr: 'vitesse décisionnelle',
    labelEn: 'decision-making speed',
    color: '#86BC25',
  },
  {
    icon: 'ri-funds-line',
    metricFr: '3×',
    metricEn: '3×',
    labelFr: 'ROI moyen des missions',
    labelEn: 'average mission ROI',
    color: '#10b981',
  },
  {
    icon: 'ri-user-follow-line',
    metricFr: '98%',
    metricEn: '98%',
    labelFr: 'satisfaction clients',
    labelEn: 'client satisfaction',
    color: '#86BC25',
  },
];

export default function ImpactSection() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState<Counter[]>(IMPACT_DATA.map(() => ({ value: 0, target: 0 })));
  const animStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        if (!animStarted.current) {
          animStarted.current = true;
          IMPACT_DATA.forEach((item, i) => {
            const duration = 1600;
            const steps = 50;
            const increment = item.numeric / steps;
            let current = 0;
            const timer = setInterval(() => {
              current = Math.min(current + increment, item.numeric);
              setCounters(prev => {
                const next = [...prev];
                next[i] = { value: Math.floor(current), target: item.numeric };
                return next;
              });
              if (current >= item.numeric) clearInterval(timer);
            }, duration / steps);
          });
        }
      }
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="notre-impact"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050c18 0%, #091528 50%, #050c18 100%)' }}
    >
      {/* BG decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,42,0.25), rgba(16,185,129,0.15), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,42,0.18), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.22)' }}>
              <i className="ri-bar-chart-fill text-xs" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
                {isEn ? 'Our Measurable Impact' : 'Notre Impact Mesurable'}
              </span>
            </div>
            <h2
              className="font-playfair font-bold text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
            >
              {isEn ? (
                <>Des résultats <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>concrets</span>, pas des promesses</>
              ) : (
                <>Des résultats <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>concrets</span>, pas des promesses</>
              )}
            </h2>
            <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {isEn
                ? '22 years of measurable transformation. Each number below represents a real result achieved with a client in Africa.'
                : '22 ans de transformation mesurable. Chaque chiffre ci-dessous représente un résultat réel obtenu auprès d\'un client en Afrique.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {IMPACT_DATA.map((item, i) => (
            <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 80}>
              <div
                className="rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 cursor-default gradient-border-dark glow-gold-hover"
                style={{ background: item.bg }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-5 flex-shrink-0" style={{ background: `${item.color}15`, border: `1.5px solid ${item.color}28` }}>
                  <i className={`${item.icon} text-xl`} style={{ color: item.color }} />
                </div>
                
                {/* Animated number */}
                <div
                  className="font-playfair font-bold mb-1 leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)', color: item.color }}
                >
                  {visible
                    ? (i === 0
                      ? `${counters[i]?.value ?? 0}M€+`
                      : i === 3
                      ? `${counters[i]?.value ?? 0}+`
                      : `${counters[i]?.value ?? 0}+`)
                    : '0'}
                </div>

                <p className="font-semibold text-white text-sm mb-3 leading-tight">
                  {isEn ? item.labelEn : item.labelFr}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {isEn ? item.descEn : item.descFr}
                </p>

                {/* Bottom accent */}
                <div className="mt-5 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${item.color}50, transparent)` }} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Résultats terrain */}
        <ScrollReveal animation="fadeSlideUp" delay={100}>
          <div className="rounded-3xl overflow-hidden gradient-border-dark glow-gold-hover" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
            <div className="px-8 py-6 border-b flex flex-col sm:flex-row sm:items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#86BC25' }}>
                  {isEn ? 'Field Performance Metrics' : 'Métriques de performance terrain'}
                </p>
                <h3 className="text-white font-bold text-lg font-playfair">
                  {isEn ? 'What our clients gain on average' : 'Ce que gagnent nos clients en moyenne'}
                </h3>
              </div>
              <button
                onClick={() => navigate('/case-studies')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
                style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.30)', color: '#86BC25' }}
              >
                {isEn ? 'View case studies' : 'Voir les études de cas'}
                <i className="ri-arrow-right-line" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {RESULTS.map((r, i) => (
                <div key={i} className="px-6 py-5 flex flex-col items-center text-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: `${r.color}14`, border: `1px solid ${r.color}25` }}>
                    <i className={`${r.icon} text-base`} style={{ color: r.color }} />
                  </div>
                  <div className="font-playfair font-bold text-xl" style={{ color: r.color }}>
                    {isEn ? r.metricEn : r.metricFr}
                  </div>
                  <p className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {isEn ? r.labelEn : r.labelFr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="fadeSlideUp" delay={150}>
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/tools/diagnostic-organisationnel')}
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18', boxShadow: '0 8px 32px rgba(212,168,42,0.40)' }}
            >
              <i className="ri-stethoscope-line text-lg" />
              {isEn ? 'Measure my own potential — Free diagnostic' : 'Mesurer mon potentiel — Diagnostic gratuit'}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}





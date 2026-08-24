import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import OptimizedImage from '@/components/base/OptimizedImage';

const STEPS = [
  {
    number: '01',
    icon: 'ri-search-eye-line',
    titleFr: 'Diagnostic & Audit',
    titleEn: 'Diagnosis & Audit',
    descFr: 'Analyse approfondie de votre contexte : audit financier, gouvernance, gestion des risques et opportunités de transformation.',
    descEn: 'In-depth analysis of your context: financial audit, governance, risk management and transformation opportunities.',
    tag: 'Phase 1',
    accent: '#86BC25',
  },
  {
    number: '02',
    icon: 'ri-lightbulb-flash-line',
    titleFr: 'Co-construction Stratégique',
    titleEn: 'Strategic Co-creation',
    descFr: 'Élaboration collaborative de solutions adaptées : conseil stratégique, gouvernance et transformation digitale.',
    descEn: 'Collaborative development of tailored solutions: strategic advisory, governance and digital transformation.',
    tag: 'Phase 2',
    accent: '#86BC25',
  },
  {
    number: '03',
    icon: 'ri-tools-line',
    titleFr: 'Mise en œuvre & Transformation',
    titleEn: 'Implementation & Transformation',
    descFr: 'Accompagnement opérationnel, transfert de compétences, conduite du changement et suivi de la performance.',
    descEn: 'Operational support, skills transfer, change management and performance monitoring.',
    tag: 'Phase 3',
    accent: '#86BC25',
  },
  {
    number: '04',
    icon: 'ri-line-chart-line',
    titleFr: 'Évaluation & Impact',
    titleEn: 'Evaluation & Impact',
    descFr: 'Mesure d\'impact, audit de performance, ajustements stratégiques et amélioration continue.',
    descEn: 'Impact measurement, performance audit, strategic adjustments and continuous improvement.',
    tag: 'Phase 4',
    accent: '#86BC25',
  },
];

export default function Approach() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActive(a => (a + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [visible]);

  const step = STEPS[active];

  return (
    <section id="approach" ref={ref} className="py-24 overflow-hidden" style={{ background: '#f7f6f3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <BigFourSubtitleBar
              label={isEn ? 'Our Methodology' : 'Notre Méthodologie'}
              variant="left-accent"
              icon="ri-route-line"
              accentColor="accent"
            />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: '#111827' }}>
            {t('approach.title')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed text-justify">
            {t('approach.subtitle')}
          </p>
        </div>

        {/* Layout nombre d'or 61.8/38.2 */}
        <div className="grid lg:grid-cols-[38.2fr_61.8fr] gap-12 lg:gap-16 items-center">

          {/* Colonne gauche — sélecteur d'étapes */}
          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-full text-left group cursor-pointer transition-all duration-300"
              >
                <div
                  className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-400"
                  style={{
                    background: active === i
                      ? `linear-gradient(135deg, ${s.accent}0e 0%, ${s.accent}05 100%)`
                      : 'transparent',
                    border: active === i
                      ? `1.5px solid ${s.accent}30`
                      : '1.5px solid transparent',
                  }}
                >
                  {/* Numéro */}
                  <div
                    className="font-playfair text-4xl font-bold leading-none flex-shrink-0 transition-all duration-300 w-14 text-center"
                    style={{
                      background: active === i
                        ? `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`
                        : 'linear-gradient(135deg, #d1d5db, #9ca3af)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.number}
                  </div>

                  {/* Icône + titre */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <i
                        className={`${s.icon} text-base transition-colors duration-300`}
                        style={{ color: active === i ? s.accent : '#9ca3af' }}
                      />
                      <span
                        className="text-xs font-bold tracking-widest uppercase transition-colors duration-300"
                        style={{ color: active === i ? s.accent : '#9ca3af' }}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <h3
                      className="font-semibold text-base leading-snug transition-colors duration-300"
                      style={{ color: active === i ? '#111827' : '#6b7280' }}
                    >
                      {isEn ? s.titleEn : s.titleFr}
                    </h3>
                  </div>

                  {/* Indicateur actif */}
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background: active === i ? s.accent : 'transparent',
                      boxShadow: active === i ? `0 0 8px ${s.accent}` : 'none',
                    }}
                  />
                </div>

                {/* Barre de progression */}
                {active === i && (
                  <div
                    className="mx-5 h-0.5 rounded-full overflow-hidden mt-0"
                    style={{ background: `${s.accent}18` }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${s.accent}, ${s.accent}88)`,
                        animation: 'progress-bar 3s linear forwards',
                      }}
                    />
                  </div>
                )}
              </button>
            ))}

            <style>{`
              @keyframes progress-bar {
                from { width: 0% }
                to { width: 100% }
              }
            `}</style>
          </div>

          {/* Colonne droite — détail */}
          <div
            key={active}
            className="relative rounded-3xl overflow-hidden"
            style={{ minHeight: 420 }}
          >
            <div className="absolute inset-0">
              <OptimizedImage
                key={active}
                src={`https://readdy.ai/api/search-image?query=professional consulting meeting strategic planning Africa modern office ${active === 0 ? 'audit analysis documents review' : active === 1 ? 'strategy co-creation whiteboard brainstorming' : active === 2 ? 'implementation transformation team execution' : 'evaluation metrics results dashboard charts'} clean bright corporate environment diverse team&width=700&height=500&seq=approach-step-${active}-v3&orientation=landscape`}
                alt={isEn ? step.titleEn : step.titleFr}
                className="w-full h-full"
                width={700}
                height={500}
                aspectRatio="7/5"
                objectFit="cover"
                loading="lazy"
                placeholder="shimmer"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.35) 100%)' }}
              />
            </div>

            <div className="relative z-10 p-10 flex flex-col justify-between h-full" style={{ minHeight: 420 }}>
              <div className="flex items-start justify-between">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-2xl"
                  style={{ background: `${step.accent}22`, border: `1.5px solid ${step.accent}50` }}
                >
                  <i className={`${step.icon} text-2xl`} style={{ color: step.accent }} />
                </div>
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                  style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)' }}
                >
                  {step.tag}
                </span>
              </div>

              {/* Numéro déco */}
              <div
                className="font-playfair font-bold leading-none select-none"
                style={{
                  fontSize: 120,
                  color: 'transparent',
                  WebkitTextStroke: `1px ${step.accent}35`,
                  position: 'absolute',
                  right: 24,
                  bottom: -10,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                {step.number}
              </div>

              <div>
                <h3 className="font-playfair text-3xl font-bold text-white mb-4 leading-tight">
                  {isEn ? step.titleEn : step.titleFr}
                </h3>
                <p className="text-base leading-relaxed text-justify mb-6" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  {isEn ? step.descEn : step.descFr}
                </p>
                <button
                  onClick={() => navigate('/approche')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)`,
                    color: step.accent === '#86BC25' ? '#0a0a0a' : '#ffffff',
                    boxShadow: `0 4px 20px ${step.accent}45`,
                  }}
                >
                  {isEn ? 'Our full approach' : 'Notre approche complète'}
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-5 right-5 flex gap-2 z-20">
              {STEPS.map((s, i) => (
                <button key={i} onClick={() => setActive(i)} className="cursor-pointer transition-all duration-300">
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: active === i ? 20 : 6,
                      height: 6,
                      background: active === i ? s.accent : 'rgba(255,255,255,0.28)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA bas */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              boxShadow: '0 4px 24px rgba(10,10,10,0.25)',
            }}
          >
            <i className="ri-calendar-check-line text-lg" style={{ color: '#86BC25' }} />
            {isEn ? 'Book a free strategic diagnosis' : 'Réserver un diagnostic stratégique gratuit'}
            <i className="ri-arrow-right-line text-sm" style={{ color: '#86BC25' }} />
          </button>
        </div>

      </div>
    </section>
  );
}




import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { AnimatedCounter } from '@/components/base/AnimatedCounter';
import { officialStats } from '@/data/stats';

/* Palette Noir · Vert · Or */
const C = {
  noir:      '#0a0a0a',
  noirCard:  '#141414',
  vert:      '#6B9B1F',
  vertLight: '#86BC25',
  or:        '#c4a235',
  orLight:   '#d4a82a',
};

const STAT_ICONS = ['ri-time-line', 'ri-briefcase-4-line', 'ri-global-line', 'ri-map-pin-2-line'];
const STAT_ACCENTS = [C.or, C.vertLight, C.or, C.vertLight];

export default function Stats() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="relative py-0 overflow-hidden">
      <div
        className="relative"
        style={{ background: C.noir }}
      >
        {/* Grille nombre d'or */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage: `
              linear-gradient(rgba(201,162,39,0.9) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,162,39,0.9) 1px, transparent 1px)
            `,
            backgroundSize: '89px 89px',
          }}
        />
        {/* Lueur vert centré */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '800px',
            height: '160px',
            background: `radial-gradient(ellipse, rgba(34,160,90,0.10) 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Titre */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{
                background: 'rgba(34,160,90,0.10)',
                border: '1px solid rgba(34,160,90,0.28)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: C.vertLight }}
              />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: C.vertLight }}
              >
                {isEn ? 'Our Impact in Numbers' : 'Notre Impact en Chiffres'}
              </span>
            </div>
            <h2
              className="font-playfair text-3xl md:text-4xl font-bold"
              style={{ color: '#ffffff' }}
            >
              {isEn ? '22 years of proven excellence' : '22 ans d\'excellence éprouvée'}
            </h2>
          </div>

          {/* Grille stats — proportions nombre d'or */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {officialStats.map((stat, index) => {
              const accent = STAT_ACCENTS[index];
              return (
                <div
                  key={index}
                  className="group relative rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-default"
                  style={{
                    background: C.noirCard,
                    border: `1px solid ${accent}1a`,
                  }}
                >
                  {/* Lueur hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${accent}14 0%, transparent 70%)`,
                    }}
                  />

                  {/* Icône */}
                  <div
                    className="w-13 h-13 flex items-center justify-center rounded-xl mb-5 relative z-10"
                    style={{
                      width: '52px',
                      height: '52px',
                      background: `${accent}18`,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    <i className={`${STAT_ICONS[index]} text-2xl`} style={{ color: accent }} />
                  </div>

                  {/* Valeur */}
                  <div
                    className="font-playfair text-5xl lg:text-6xl font-bold leading-none mb-2 relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {isVisible ? (
                      <>
                        <AnimatedCounter value={stat.value} duration={2000} />
                        {stat.suffix}
                      </>
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-sm font-semibold relative z-10 mb-1" style={{ color: '#ffffff' }}>
                    {isEn ? stat.labelEn : stat.labelFr}
                  </div>
                  {(isEn ? stat.subLabelEn : stat.subLabelFr) && (
                    <div className="text-xs relative z-10" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      {isEn ? stat.subLabelEn : stat.subLabelFr}
                    </div>
                  )}

                  {/* Ligne déco bas */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-500 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Séparateur décoratif */}
          <div className="mt-16 flex items-center gap-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(34,160,90,0.12)' }} />
            <div className="flex items-center gap-3 flex-shrink-0">
              {[
                { ic: 'ri-verified-badge-fill', c: C.or },
                { ic: 'ri-award-fill',          c: C.vertLight },
                { ic: 'ri-shield-check-fill',   c: C.or },
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{
                    background: `${item.c}12`,
                    border: `1px solid ${item.c}22`,
                  }}
                >
                  <i className={`${item.ic} text-sm`} style={{ color: item.c }} />
                </div>
              ))}
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {isEn ? 'Certified & Recognized' : 'Certifié & Reconnu'}
              </span>
            </div>
            <div className="flex-1 h-px" style={{ background: 'rgba(34,160,90,0.12)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

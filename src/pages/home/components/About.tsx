import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AfricaMapInteractive } from '@/components/feature/AfricaMapInteractive';
import ScrollReveal from '@/components/feature/ScrollReveal';

/* Palette Noir · Vert · Or */
const C = {
  vert:      '#6B9B1F',
  vertLight: '#86BC25',
  or:        '#86BC25',
  orLight:   '#a5d936',
  noir:      '#0d0d0d',
  noirText:  '#111827',
};

export function About() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();

  const pillars = [
    {
      icon: 'ri-shield-star-line',
      title: isEn ? 'Corporate Governance' : 'Gouvernance d\'Entreprise',
      desc: isEn
        ? 'Structuring governance bodies, compliance policies and risk management for lasting performance.'
        : 'Structuration des organes de gouvernance, politiques de conformité et gestion des risques pour une performance durable.',
      accent: C.or,
    },
    {
      icon: 'ri-pie-chart-2-line',
      title: isEn ? 'Financial Audit & Expertise' : 'Audit Financier & Expertise',
      desc: isEn
        ? 'Financial audit, internal control, due diligence and BCEAO compliance for secure strategic decisions.'
        : 'Audit financier, contrôle interne, due diligence et conformité BCEAO pour des décisions stratégiques sécurisées.',
      accent: C.vertLight,
    },
    {
      icon: 'ri-refresh-line',
      title: isEn ? 'Organizational Transformation' : 'Transformation Organisationnelle',
      desc: isEn
        ? 'Organizational diagnosis, digital transformation, change management and skills transfer.'
        : 'Diagnostic organisationnel, transformation digitale, conduite du changement et transfert de compétences.',
      accent: C.or,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24" style={{ background: '#fafaf8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: `${C.or}12`, border: `1px solid ${C.or}28` }}
            >
              <i className="ri-building-4-line text-xs" style={{ color: C.or }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: C.vert }}>
                {isEn ? 'Our Positioning' : 'Notre Positionnement'}
              </span>
            </div>
            <h2
              className="font-playfair text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ color: C.noirText }}
            >
              {isEn ? (
                <>Strategic advisory in Africa<br />
                  <span style={{ background: `linear-gradient(90deg,${C.or},${C.orLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Due Diligence, ESG & Investment Readiness
                  </span>
                </>
              ) : (
                <>Cabinet de référence en Afrique<br />
                  <span style={{ background: `linear-gradient(90deg,${C.or},${C.orLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Due Diligence, ESG & Investment Readiness
                  </span>
                </>
              )}
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed">
              {isEn
                ? 'KHEPRA EXPERTS supports institutional investors, private equity funds, banks, project promoters and public organizations in their due diligence, ESG advisory, investment readiness and financial governance across West and Central Africa, under the regulatory framework of the BCEAO, SG-Commission Bancaire de l\'UMOA, COBAC and IFC Performance Standards.'
                : 'KHEPRA EXPERTS accompagne les investisseurs institutionnels, fonds de private equity, banques, promoteurs de projets et organisations publiques dans leur due diligence, conseil ESG, investment readiness et gouvernance financière en Afrique de l\'Ouest et Centrale, dans le cadre réglementaire de la BCEAO, du SG-Commission Bancaire de l\'UMOA, de la COBAC et des Standards de Performance IFC.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 piliers repositionnés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((p, i) => (
            <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 100}>
              <div
                className="group rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  borderColor: `${p.accent}18`,
                  background: `linear-gradient(135deg, ${p.accent}06 0%, #ffffff 100%)`,
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${p.accent}45`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${p.accent}18`)}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl mb-5"
                  style={{ background: `${p.accent}12`, border: `1.5px solid ${p.accent}28` }}
                >
                  <i className={`${p.icon} text-xl`} style={{ color: p.accent }} />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3" style={{ color: C.noirText }}>
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                <div
                  className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mission + Carte — layout nombre d'or 61.8/38.2 */}
        <div className="grid grid-cols-1 lg:grid-cols-[61.8fr_38.2fr] gap-14 items-center">

          {/* Mission */}
          <ScrollReveal animation="fadeSlideLeft">
            <div>
              <div className="mb-6">
                <div
                  className="h-0.5 w-12 rounded-full mb-6"
                  style={{ background: `linear-gradient(90deg,${C.or},transparent)` }}
                />
                <h3 className="font-playfair text-2xl font-bold mb-4" style={{ color: C.noirText }}>
                  {t('about.mission')}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">{t('about.missionText')}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-bold mb-4" style={{ color: C.noirText }}>
                  {t('about.vision')}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">{t('about.visionText')}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg,${C.vert},${C.vertLight})`,
                    color: '#ffffff',
                    boxShadow: `0 4px 20px ${C.vert}35`,
                  }}
                >
                  {isEn ? 'About us' : 'À propos de nous'}
                  <i className="ri-arrow-right-line" />
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 border"
                  style={{ borderColor: `${C.or}40`, color: C.vert, background: `${C.or}08` }}
                >
                  {isEn ? 'Our services' : 'Nos services'}
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Carte géographique */}
          <ScrollReveal animation="fadeSlideRight">
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: `linear-gradient(135deg,${C.or}06,#ffffff)`,
                borderColor: `${C.or}20`,
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-xl"
                  style={{ background: `${C.or}14` }}
                >
                  <i className="ri-map-pin-2-fill text-xl" style={{ color: C.or }} />
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: C.noirText }}>{t('about.mapTitle')}</h4>
                  <p className="text-xs text-gray-400">{t('about.mapSubtitle')}</p>
                </div>
              </div>
              <AfricaMapInteractive />

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: 'ri-global-line', label: isEn ? 'UEMOA Zone' : 'Zone UEMOA', c: C.vert },
                  { icon: 'ri-global-line', label: isEn ? 'CEMAC Zone' : 'Zone CEMAC', c: C.or },
                  { icon: 'ri-map-pin-2-line', label: isEn ? '20+ countries' : '20+ pays', c: C.vertLight },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: `${b.c}0e`, color: b.c, border: `1px solid ${b.c}22` }}
                  >
                    <i className={`${b.icon} text-xs`} />
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}

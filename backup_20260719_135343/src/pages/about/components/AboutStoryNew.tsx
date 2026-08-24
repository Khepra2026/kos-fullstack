import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';

const TIMELINE_FR = [
  { year: '2002–2010', label: 'Terrain UEMOA', desc: "Gouvernance, audit, structuration financière — 8 pays, 50+ institutions supervisées. La méthode se forge sur le terrain.", color: '#86BC25' },
  { year: '2011–2020', label: 'Direction & Agrément COBAC', desc: "Directeur Général d'Atlantique Microfinance (AMIFA) au Gabon. Agrément COBAC obtenu. 30+ collaborateurs. Expérience CEMAC directe.", color: '#86BC25' },
  { year: '2021–2025', label: 'Conseiller Technique National', desc: "Co-rédaction de la Stratégie Nationale d'Inclusion Financière du Togo (SNIF). Coordination BCEAO/UEMOA.", color: '#86BC25' },
  { year: '2026', label: 'Naissance de Khepra Experts', desc: "22 ans d'expérience institutionnalisés. Un cabinet fondé pour les dirigeants africains qui décident avec rigueur.", color: '#86BC25', highlight: true },
];

const TIMELINE_EN = [
  { year: '2002–2010', label: 'WAEMU Field Work', desc: 'Governance, audit, financial structuring — 8 countries, 50+ institutions supervised. The methodology forged on the ground.', color: '#86BC25' },
  { year: '2011–2020', label: 'CEO & COBAC Licensing', desc: 'Chief Executive Officer of Atlantique Microfinance (AMIFA) in Gabon. COBAC license obtained. 30+ staff. Direct CEMAC experience.', color: '#86BC25' },
  { year: '2021–2025', label: 'National Technical Advisor', desc: "Co-authored Togo's National Financial Inclusion Strategy (NFIS). BCEAO/WAEMU coordination.", color: '#86BC25' },
  { year: '2026', label: 'Founding of Khepra Experts', desc: '22 years of experience institutionalized. A firm founded for African leaders who decide with rigor.', color: '#86BC25', highlight: true },
];

const PROBLEMS_FR = [
  { stat: 'Gouvernance', label: 'structurée pour la résilience organisationnelle', icon: 'ri-government-line' },
  { stat: 'Pilotage', label: 'financier pour l\'optimisation des marges', icon: 'ri-funds-line' },
  { stat: 'Structuration', label: 'stratégique pour l\'accès au financement', icon: 'ri-close-circle-line' },
];

const PROBLEMS_EN = [
  { stat: 'Governance', label: 'structured for organizational resilience', icon: 'ri-government-line' },
  { stat: 'Steering', label: 'for margin optimization', icon: 'ri-funds-line' },
  { stat: 'Structuring', label: 'for access to financing', icon: 'ri-close-circle-line' },
];

export default function AboutStoryNew() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const TIMELINE = isEn ? TIMELINE_EN : TIMELINE_FR;
  const PROBLEMS = isEn ? PROBLEMS_EN : PROBLEMS_FR;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* SECTION 1 : Le diagnostic */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <ScrollReveal animation="fadeSlideLeft">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6" style={{ background: '#86BC25' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'The diagnosis' : 'Le constat'}
                </span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {isEn ? (
                  <>Africa doesn&apos;t lack talent.<br />
                    <span style={{ background: 'linear-gradient(90deg, #86BC25, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      It lacks structure.
                    </span>
                  </>
                ) : (
                  <>L&apos;Afrique ne manque pas de talent.<br />
                    <span style={{ background: 'linear-gradient(90deg, #86BC25, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      Elle manque de structure.
                    </span>
                  </>
                )}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {isEn
                  ? 'Every organization we meet has potential. What it lacks is the strategic backbone to transform it into lasting performance.'
                  : "Chaque organisation que nous rencontrons a du potentiel. Ce qui lui manque, c'est la colonne vertébrale stratégique pour le transformer en performance durable."}
              </p>
              <button
                onClick={() => navigate('/tools/diagnostic-organisationnel')}
                className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer transition-all hover:gap-3"
                style={{ color: '#86BC25' }}
              >
                {isEn ? 'Reveal my blind spots' : 'Révéler mes angles morts'} <i className="ri-arrow-right-line" />
              </button>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {PROBLEMS.map((p, i) => (
              <ScrollReveal key={i} animation="fadeSlideRight" delay={i * 100}>
                <div className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all bg-gray-50/50">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 bg-white border border-gray-100">
                    <i className={`${p.icon} text-xl text-gray-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-playfair text-2xl font-black text-gray-900">{p.stat}</span>
                    <p className="text-sm text-gray-500 mt-0.5 leading-snug">{p.label}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* SECTION 2 : Mission dark block */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="rounded-3xl p-10 md:p-14 mb-24 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
            <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(201,162,39,0.08) 0%, transparent 60%)' }} />
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6" style={{ background: '#86BC25' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#86BC25' }}>
                  {isEn ? 'Our reason for being' : "Notre raison d'être"}
                </span>
              </div>
              <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                {isEn ? (
                  <>Structuring African organizations<br />
                    <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      for lasting and measurable decisions.
                    </span>
                  </>
                ) : (
                  <>Structurer les organisations africaines<br />
                    <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {'pour des décisions durables et mesurables.'}
                    </span>
                  </>
                )}
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {isEn
                  ? 'Structured governance. Steered finances. Activated strategy. We intervene on all three levers simultaneously — because one alone is never enough.'
                  : 'Gouvernance structurée. Finances pilotées. Stratégie actionnée. Nous intervenons sur les trois leviers simultanément — parce qu’un seul ne suffit jamais.'}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: 'ri-leaf-line', label: isEn ? 'Environmental impact' : 'Impact environnemental', accent: '#86BC25' },
                  { icon: 'ri-community-line', label: isEn ? 'Social inclusion' : 'Inclusion sociale', accent: '#86BC25' },
                  { icon: 'ri-scales-line', label: isEn ? 'Ethical governance' : 'Gouvernance éthique', accent: '#86BC25' },
                  { icon: 'ri-shield-star-line', label: isEn ? 'Strict ethics' : 'Déontologie stricte', accent: '#86BC25' },
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: `${tag.accent}12`, border: `1px solid ${tag.accent}25` }}>
                    <i className={`${tag.icon} text-xs`} style={{ color: tag.accent }} />
                    <span className="text-xs font-semibold" style={{ color: tag.accent }}>{tag.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}
                >
                  {isEn ? 'Our services' : 'Nos interventions'}
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  {isEn ? 'Talk to an expert' : 'Parler à un expert'} <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 3 : Timeline fondateur */}
        <div>
          <ScrollReveal animation="fadeSlideUp">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6" style={{ background: '#86BC25' }} />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  {isEn ? 'Founder journey · Firm founded in 2026' : 'Parcours fondateur · Cabinet créé en 2026'}
                </span>
              </div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-10">
                {isEn ? '22 years of field experience. A firm founded in 2026.' : '22 ans de terrain. Un cabinet fondé en 2026.'}
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, #86BC2540, #86BC2540, #86BC2540)' }} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {TIMELINE.map((item, i) => (
                <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 100}>
                  <div className="relative">
                    <div className="hidden lg:flex w-4 h-4 rounded-full border-2 mb-6 relative z-10" style={{ borderColor: item.color, background: item.highlight ? item.color : '#fff' }} />
                    <div
                      className={`rounded-2xl p-5 border transition-all ${item.highlight ? 'border-amber-300' : 'border-gray-100 hover:border-gray-200'}`}
                      style={item.highlight ? { background: 'linear-gradient(135deg, #fffbeb, #fef9e7)', borderColor: '#86BC25' } : { background: '#fafafa' }}
                    >
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="font-playfair text-lg font-black" style={{ color: item.color }}>{item.year}</span>
                        {item.highlight && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#86BC2518', color: '#86BC25' }}>
                            {isEn ? 'Firm founded' : 'Cabinet fondé'}
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-gray-900 text-sm mb-2 line-clamp-2" title={item.label}>{item.label}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}





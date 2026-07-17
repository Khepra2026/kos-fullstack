import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';

const PAINS = [
  {
    icon: 'ri-government-line',
    stat: '80%',
    title: 'des entreprises mal gouvernées stagnent',
    desc: 'Sans Conseil d\'Administration structuré, les décisions sont lentes, les conflits fréquents et les investisseurs méfiants. Votre gouvernance est-elle vraiment solide ?',
    color: '#86BC25',
    cta: 'Évaluer ma gouvernance',
    href: '/tools/evaluation-gouvernance',
  },
  {
    icon: 'ri-funds-line',
    stat: '3-8pts',
    title: 'de marge perdus sans pilotage financier',
    desc: 'Trésorerie imprévisible, recouvrement lent, reporting inexistant. Chaque mois sans pilotage financier structuré vous coûte des points de marge invisibles.',
    color: '#86BC25',
    cta: 'Calculer mes pertes',
    href: '/blog/daf-externalise-pilotage-financier-pme-afrique/',
  },
  {
    icon: 'ri-alarm-warning-line',
    stat: '48h',
    title: 'pour bloquer votre activité sans conformité',
    desc: 'La non-conformité BCEAO/OHADA n\'est pas une option. Une inspection peut suspendre votre agrément en 48 heures. Êtes-vous vraiment en règle ?',
    color: '#ef4444',
    cta: 'Vérifier ma conformité',
    href: '/tools/evaluation-gouvernance',
  },
  {
    icon: 'ri-bar-chart-line',
    stat: '70%',
    title: 'des dossiers de financement rejetés',
    desc: 'Business plan incomplet, états financiers non fiables, gouvernance floue. Les investisseurs et banques refusent votre dossier. Votre structuration est-elle prête ?',
    color: '#86BC25',
    cta: 'Structurer mon dossier',
    href: '/services/levee-de-fonds',
  },
];

export default function TensionBusiness() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
              <i className="ri-error-warning-line" />
              Prise de conscience stratégique
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Ce que vous perdez<br />
              <span style={{ background: 'linear-gradient(90deg, #86BC25, #a5d936)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                sans le savoir
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Chaque mois sans structuration stratégique vous coûte plus que vous ne pensez. Voici les 4 hémorragies silencieuses des entreprises africaines.
            </p>
          </div>
        </ScrollReveal>

        {/* Pain cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {PAINS.map((pain, i) => (
            <ScrollReveal key={i} animation="fadeSlideUp" delay={i * 80}>
              <div
                className={`group relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${active === i ? 'border-transparent ring-2' : 'border-gray-100 hover:border-gray-200'}`}
                style={{
                  background: active === i ? `${pain.color}08` : 'white',
                  ...(active === i ? { borderColor: pain.color } : {}),
                }}
                onClick={() => setActive(i)}
              >
                <div className="text-4xl font-black mb-3 font-playfair" style={{ color: pain.color }}>{pain.stat}</div>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: `${pain.color}15`, border: `1px solid ${pain.color}30` }}>
                  <i className={`${pain.icon} text-xl`} style={{ color: pain.color }} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-3">{pain.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{pain.desc}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(pain.href); }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all hover:gap-2.5 whitespace-nowrap"
                  style={{ color: pain.color }}
                >
                  {pain.cta} <i className="ri-arrow-right-line" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Before / After comparison */}
        <ScrollReveal animation="fadeSlideUp" delay={100}>
          <div className="rounded-3xl overflow-hidden border border-gray-100" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 100%)' }}>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {/* Before */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/15 border border-red-500/30">
                    <i className="ri-close-circle-line text-red-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-400">Avant Khepra Experts</p>
                    <p className="text-white font-bold">Votre situation actuelle</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'Gouvernance informelle, décisions lentes et conflictuelles',
                    'Trésorerie imprévisible, marges érodées sans le savoir',
                    'Non-conformité BCEAO/OHADA, risque de sanction permanent',
                    'Croissance bloquée, investisseurs et banques méfiants',
                    'Reporting inexistant, pilotage à vue',
                    'Équipes sans cap stratégique clair',
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500/20 flex-shrink-0 mt-0.5">
                        <i className="ri-close-line text-red-400 text-xs" />
                      </div>
                      <span className="text-sm text-gray-300 leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-strategic-500/15 border border-strategic-500/30">
                    <i className="ri-check-double-line text-strategic-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-strategic-400">Après Khepra Experts</p>
                    <p className="text-white font-bold">Votre transformation</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'CA structuré, décisions rapides et documentées',
                    'Trésorerie maîtrisée, +3 à 8pts de marge récupérés',
                    'Conformité BCEAO/OHADA garantie, zéro risque de sanction',
                    'Croissance accélérée, investisseurs et banques convaincus',
                    'Reporting mensuel automatisé, pilotage en temps réel',
                    'Équipes alignées sur une vision stratégique claire',
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-strategic-500/20 flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-strategic-400 text-xs" />
                      </div>
                      <span className="text-sm text-gray-200 leading-relaxed">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => navigate('/tools/diagnostic-organisationnel')}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #86BC25, #a5d936)', color: '#0a0a0a' }}
                  >
                    <i className="ri-stethoscope-line" />
                    Obtenir mon diagnostic gratuit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

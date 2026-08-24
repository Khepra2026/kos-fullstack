import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrochureDownload } from '@/hooks/useBrochureDownload';

const hooks = [
  'CA de 150M FCFA, encaissements 45M, charges 120M — résultat : -75M de trésorerie réelle. Votre chiffre d\'affaires ment',
  'Un mismatch actif-passif non détecté tue des IMF rentables — 5 indicateurs ALM à surveiller chaque mois',
  'La non-conformité BCEAO/OHADA peut suspendre votre activité en 48h. 80+ SFD sécurisés sans aucune sanction',
  '9 dossiers de financement sur 10 échouent avant la première réunion — la gouvernance et le financier éliminent avant la négociation',
];

export default function ServicesHeroNew() {
  const navigate = useNavigate();
  const [hookIdx, setHookIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const { handleDownload, isDownloading } = useBrochureDownload('other');

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setHookIdx(i => (i + 1) % hooks.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #141414 100%)' }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      {/* Gold glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            {/* Rotating hook */}
            <div className={`mb-6 transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="inline-flex items-start gap-3 bg-red-500/15 border border-red-400/30 px-4 py-3 rounded-xl max-w-lg">
                <i className="ri-error-warning-line text-red-400 text-lg flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm font-semibold leading-tight">{hooks[hookIdx]}</p>
              </div>
            </div>

            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ce que vous<br />
              <span style={{ background: 'linear-gradient(90deg, #86BC25, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                gagnez
              </span>{' '}
              avec nous
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Khepra Experts transforme vos problèmes de gouvernance, finance et pilotage en résultats mesurables. Pas de consultants juniors. Pas de rapports théoriques. Des missions terrain, des chiffres, des résultats.
            </p>

            {/* Proof stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '+180M', label: 'FCFA de marge retrouvée sans croissance CA', icon: 'ri-line-chart-line' },
                { value: '-35%', label: 'coûts opérationnels post-digitalisation', icon: 'ri-time-line' },
                { value: '100%', label: 'conformité BCEAO/OHADA (80+ SFD)', icon: 'ri-shield-check-line' },
              ].map((s, i) => (
                <div key={i} className="bg-white/8 border border-white/15 rounded-xl p-4 text-center">
                  <i className={`${s.icon} text-gold-400 text-xl mb-1 block`} />
                  <div className="text-xl font-bold text-gold-400">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a href="/tools/diagnostic-organisationnel" onClick={(e) => { e.preventDefault(); navigate('/tools/diagnostic-organisationnel'); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}>
                <i className="ri-stethoscope-line" />
                Diagnostic gratuit — 15 min
              </a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white border border-white/30 hover:border-gold-400 hover:text-gold-300 cursor-pointer whitespace-nowrap transition-all">
                <i className="ri-customer-service-2-line" />
                Parler à un expert
              </a>
              <a
                href="#brochure"
                onClick={(e) => { e.preventDefault(); handleDownload(); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-all hover:opacity-90 no-underline"
                style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.35)', color: '#f4d03f' }}
              >
                {isDownloading ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-file-download-line" />}
                Télécharger la brochure PDF
              </a>
            </div>
          </div>

          {/* Right: Problem → Solution visual */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Problem card */}
              <div className="bg-red-950/60 border border-red-500/30 rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-red-500/20 rounded-lg">
                    <i className="ri-close-circle-line text-red-400" />
                  </div>
                  <span className="text-red-300 font-bold text-sm">Votre situation actuelle</span>
                </div>
                <div className="space-y-2">
                  {[
                    'Trésorerie négative malgré un CA en hausse',
                    'Mismatch actif-passif non détecté (IMF/banques)',
                    'Non-conformité BCEAO — inspection à risque',
                    'Dossier de financement refusé 3 fois de suite',
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-red-200">
                      <i className="ri-arrow-right-s-line text-red-400 flex-shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center mb-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-red-400 to-gold-400" />
                  <div className="w-8 h-8 flex items-center justify-center bg-gold-500 rounded-full">
                    <i className="ri-arrow-down-line text-white font-bold" />
                  </div>
                  <div className="w-0.5 h-6 bg-gradient-to-b from-gold-400 to-emerald-400" />
                </div>
              </div>

              {/* Solution card */}
              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/20 rounded-lg">
                    <i className="ri-check-double-line text-emerald-400" />
                  </div>
                  <span className="text-emerald-300 font-bold text-sm">Après Khepra Experts</span>
                </div>
                <div className="space-y-2">
                  {[
                    '+180M FCFA de marge retrouvée sans croissance CA',
                    'ALM opérationnel — liquidité sous contrôle',
                    'Conformité BCEAO/OHADA 100% post-mission',
                    '2,5Mds FCFA levés en 4 mois (cas réel)',
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-emerald-200">
                      <i className="ri-check-line text-emerald-400 flex-shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-gold-500 text-brand-900 px-3 py-2 rounded-xl font-bold text-xs text-center shadow-xl">
                <div className="text-lg font-black">22</div>
                <div>ans</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 justify-center">
          {[
            { icon: 'ri-award-line', label: '22 ans d\'expérience senior' },
            { icon: 'ri-global-line', label: '23 pays UEMOA/CEMAC/OHADA' },
            { icon: 'ri-funds-line', label: '35+ levées de fonds réussies' },
            { icon: 'ri-shield-check-line', label: '80+ SFD en conformité BCEAO' },
            { icon: 'ri-bar-chart-box-line', label: 'ALM · DAF · Gouvernance · Stratégie' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <i className={`${t.icon} text-gold-500`} />
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




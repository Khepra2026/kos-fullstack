import { useEffect, useState } from 'react';

interface BoardHeroProps {
  onCTAClick: () => void;
}

const STATS = [
  { value: '600+', label: 'Organisations accompagnées' },
  { value: '20+', label: "Ans d'expertise" },
  { value: '20+', label: 'Pays UEMOA & CEMAC' },
  { value: '30min', label: 'Pour votre Board Report' },
];

const TRUST_BADGES = [
  { icon: 'ri-shield-check-fill', label: 'Conforme BCEAO/BEAC' },
  { icon: 'ri-award-fill', label: 'Standard OHADA' },
  { icon: 'ri-verified-badge-fill', label: 'Méthodologie Big4' },
  { icon: 'ri-lock-fill', label: 'Données sécurisées' },
];

export default function BoardHero({ onCTAClick }: BoardHeroProps) {
  const [visible, setVisible] = useState(false);
  const [urgencyCount] = useState(Math.floor(Math.random() * 8) + 5);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #06111e 0%, #0a1628 50%, #0d1f38 100%)' }}>
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=executive%20african%20boardroom%20meeting%20with%20senior%20directors%20reviewing%20strategic%20financial%20reports%20on%20large%20screens%20professional%20governance%20council%20administration%20high%20level%20corporate%20setting%20with%20dark%20charcoal%20green%20accent%20lighting%20representing%20premium%20advisory%20services%20dark%20charcoal%20tones%20with%20deloitte%20green%20accent%20lighting%20no%20blue%20no%20purple&width=1400&height=900&seq=board-hero-green&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-center opacity-20"
          loading="eager"
          width={1400}
          height={900}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(6,17,30,0.95) 0%, rgba(10,22,40,0.88) 50%, rgba(13,31,56,0.92) 100%)' }} />
      </div>

      {/* Décor ornemental */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
        {/* Lignes décoratives */}
        <div className="absolute top-0 left-1/2 w-px h-32 opacity-20" style={{ background: 'linear-gradient(180deg, transparent, #86BC25)' }} />
        <div className="absolute bottom-0 left-1/3 w-px h-24 opacity-15" style={{ background: 'linear-gradient(0deg, transparent, #86BC25)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Colonne gauche — Texte */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge urgence */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.3)' }}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>
                Outil gratuit — {urgencyCount} analyses disponibles cette semaine
              </span>
            </div>

            {/* Titre principal */}
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transformez vos réunions de{' '}
              <span style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Conseil
              </span>{' '}
              en décisions stratégiques actionnables
            </h1>

            {/* Sous-titre */}
            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Générez gratuitement votre <strong className="text-white">reporting complet de Conseil d&apos;Administration</strong> en moins de 30 minutes — structuré, conforme BCEAO/BEAC/OHADA, prêt à présenter.
            </p>

            {/* Points clés */}
            <ul className="space-y-3 mb-10">
              {[
                'Rapport structuré selon les standards internationaux de gouvernance',
                'Conforme aux exigences BCEAO, BEAC, OHADA — zones UEMOA et CEMAC',
                'Adapté aux PME, banques, institutions financières et ONG',
                'Sans compétence technique requise — résultat en 30 minutes',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(212,168,42,0.2)', border: '1px solid rgba(212,168,42,0.4)' }}>
                    <i className="ri-check-line text-xs" style={{ color: '#86BC25' }}></i>
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA principal */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onCTAClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#06111e', boxShadow: '0 8px 32px rgba(212,168,42,0.4)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <i className="ri-file-chart-line text-xl relative z-10"></i>
                <span className="relative z-10">Créer mon rapport gratuit maintenant</span>
                <i className="ri-arrow-right-line relative z-10 group-hover:translate-x-1 transition-transform"></i>
              </button>
              <a
                href="#comment-ca-marche"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(212,168,42,0.3)', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.05)' }}
              >
                <i className="ri-play-circle-line text-lg" style={{ color: '#86BC25' }}></i>
                Comment ça marche ?
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {TRUST_BADGES.map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className={`${badge.icon} text-xs`} style={{ color: '#86BC25' }}></i>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite — Aperçu rapport + stats */}
          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Mockup rapport */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,168,42,0.2)', backdropFilter: 'blur(20px)' }}>
                {/* Header mockup */}
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(212,168,42,0.15)', background: 'rgba(212,168,42,0.06)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(212,168,42,0.2)' }}>
                      <i className="ri-file-chart-2-line text-sm" style={{ color: '#86BC25' }}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">RAPPORT CONSEIL D&apos;ADMINISTRATION</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Généré par KHEPRA EXPERTS</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}>
                    Conforme OHADA
                  </span>
                </div>

                {/* Contenu mockup */}
                <div className="p-6 space-y-4">
                  {[
                    { icon: 'ri-building-line', title: 'Gouvernance & Structure', score: 85, color: '#86BC25' },
                    { icon: 'ri-funds-line', title: 'Performance Financière', score: 72, color: '#22c55e' },
                    { icon: 'ri-shield-check-line', title: 'Conformité Réglementaire', score: 91, color: '#3b82f6' },
                    { icon: 'ri-bar-chart-line', title: 'Stratégie & Opérations', score: 68, color: '#f59e0b' },
                    { icon: 'ri-error-warning-line', title: 'Gestion des Risques', score: 79, color: '#ef4444' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${item.color}15` }}>
                        <i className={`${item.icon} text-sm`} style={{ color: item.color }}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-white">{item.title}</span>
                          <span className="text-xs font-bold" style={{ color: item.color }}>{item.score}/100</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.score}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}99)` }} />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Score global */}
                  <div className="mt-4 pt-4 flex items-center justify-between rounded-xl p-4" style={{ borderTop: '1px solid rgba(212,168,42,0.15)', background: 'rgba(212,168,42,0.06)' }}>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Score de gouvernance global</p>
                      <p className="font-playfair text-2xl font-bold" style={{ color: '#86BC25' }}>79/100</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60 mb-1">Recommandation</p>
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(212,168,42,0.15)', color: '#86BC25', border: '1px solid rgba(212,168,42,0.3)' }}>
                        Accompagnement conseillé
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer mockup */}
                <div className="px-6 py-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(212,168,42,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>KHEPRA EXPERTS — Lomé, Togo</span>
                  <div className="flex items-center gap-2">
                    <i className="ri-download-line text-xs" style={{ color: '#86BC25' }}></i>
                    <span className="text-xs" style={{ color: '#86BC25' }}>Télécharger PDF</span>
                  </div>
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#06111e', boxShadow: '0 8px 24px rgba(212,168,42,0.4)' }}>
                100% Gratuit
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {STATS.map((s, i) => (
                <div key={i} className="text-center py-4 px-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,168,42,0.15)' }}>
                  <p className="font-playfair text-2xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Découvrir</span>
        <i className="ri-arrow-down-line text-lg" style={{ color: 'rgba(212,168,42,0.5)' }}></i>
      </div>
    </section>
  );
}

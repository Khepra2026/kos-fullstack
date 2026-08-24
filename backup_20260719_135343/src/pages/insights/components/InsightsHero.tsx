import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InsightsHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalArticles: number;
  totalViews: number;
}

export default function InsightsHero({ searchQuery, onSearchChange, totalArticles, totalViews }: InsightsHeroProps) {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 40%, #1a1a1a 100%)' }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Gold accent orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="hover:text-gold-400 cursor-pointer transition-colors">Accueil</a>
          <i className="ri-arrow-right-s-line" />
          <span className="text-gold-400 font-semibold">Insights</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-400/30 text-gold-300 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-wider uppercase">
              <i className="ri-command-line text-sm" />
              Centre de Commandement Stratégique
            </div>

            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Khepra<br />
              <span style={{ background: 'linear-gradient(90deg, #86BC25, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Insights Hub
              </span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Intelligence stratégique, analyses financières et outils décisionnels pour les dirigeants d'Afrique francophone. Gouvernance, conformité BCEAO/OHADA, performance PME.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mb-8">
              {[
                { value: `${totalArticles}+`, label: 'Publications', icon: 'ri-article-line' },
                { value: `${Math.round(totalViews / 1000)}K+`, label: 'Lectures', icon: 'ri-eye-line' },
                { value: '15+', label: 'Pays UEMOA', icon: 'ri-map-pin-line' },
                { value: '22 ans', label: "d'expertise", icon: 'ri-award-line' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-gold-400">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a href="/board-report" onClick={(e) => { e.preventDefault(); navigate('/board-report'); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #d4af37)' }}>
                <i className="ri-file-chart-line" />
                Créer mon rapport CA gratuit
              </a>
              <a href="/tools/diagnostic-organisationnel" onClick={(e) => { e.preventDefault(); navigate('/tools/diagnostic-organisationnel'); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white border border-white/30 hover:border-gold-400 hover:text-gold-300 cursor-pointer whitespace-nowrap transition-all">
                <i className="ri-stethoscope-line" />
                Diagnostic gratuit
              </a>
            </div>
          </div>

          {/* Right: Search + Quick access */}
          <div>
            {/* Search bar */}
            <div className={`relative mb-6 transition-all duration-300 ${focused ? 'scale-[1.02]' : ''}`}>
              <div className="absolute inset-0 rounded-2xl opacity-50 blur-xl" style={{ background: focused ? 'linear-gradient(135deg, #86BC2540, #d4af3720)' : 'transparent' }} />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1">
                <div className="flex items-center gap-3 px-4 py-3">
                  <i className="ri-search-line text-gold-400 text-xl flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Rechercher : gouvernance, DAF, BCEAO, trésorerie..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm font-medium focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => onSearchChange('')} className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                      <i className="ri-close-circle-fill text-lg" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick access grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Boardroom Intelligence', icon: 'ri-government-line', href: '/blog/daf-externalise-pilotage-financier-pme-afrique/', color: '#0a0a0a', badge: 'Nouveau' },
                { title: 'CFO & Finance Lab', icon: 'ri-funds-line', href: '/blog/daf-externalise-pilotage-financier-pme-afrique/', color: '#0a0a0a', badge: null },
                { title: 'Executive Tools', icon: 'ri-tools-line', href: '/board-report', color: '#0a0a0a', badge: 'Gratuit' },
                { title: 'Gouvernance & Conformité', icon: 'ri-scales-line', href: '/tools/evaluation-gouvernance', color: '#0a0a0a', badge: null },
                { title: 'Risk & Crisis Room', icon: 'ri-alarm-warning-line', href: '/insights', color: '#0a0a0a', badge: null },
                { title: 'Africa Market Intel', icon: 'ri-global-line', href: '/insights', color: '#0a0a0a', badge: null },
              ].map((item, i) => (
                <a key={i} href={item.href} onClick={(e) => { e.preventDefault(); navigate(item.href); }}
                  className="group relative flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-gold-400/50 cursor-pointer transition-all duration-200 overflow-hidden"
                  style={{ background: `${item.color}80` }}>
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                    <i className={`${item.icon} text-gold-400 text-base`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white leading-tight truncate">{item.title}</div>
                    {item.badge && (
                      <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-gold-500 text-white text-xs font-bold rounded">{item.badge}</span>
                    )}
                  </div>
                  <i className="ri-arrow-right-line text-gray-500 group-hover:text-gold-400 transition-colors text-sm flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





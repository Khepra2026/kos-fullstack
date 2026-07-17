import { FUNNEL } from '@/mocks/digitalStrategySocial';

export default function StrategieFunnel() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-4">
            <i className="ri-filter-3-line text-amber-600" />
            <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">Tunnel de Conversion</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            Funnel Complet : De la Visibilité à la Mission
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            4 étapes optimisées pour transformer un visiteur en client premium,
            avec des outils gratuits à chaque palier pour maximiser la conversion.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-12">
          {FUNNEL.map((stage, i) => {
            const colors = [
              { bg: 'from-blue-50 to-white', border: 'border-blue-200', accent: '#3b82f6', icon: 'ri-megaphone-line' },
              { bg: 'from-emerald-50 to-white', border: 'border-emerald-200', accent: '#10b981', icon: 'ri-gift-line' },
              { bg: 'from-amber-50 to-white', border: 'border-amber-200', accent: '#86BC25', icon: 'ri-phone-line' },
              { bg: 'from-brand-50 to-white', border: 'border-brand-200', accent: '#1e3a5f', icon: 'ri-vip-crown-line' },
            ];
            const c = colors[i];

            return (
              <div
                key={i}
                className={`relative bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-6`}
              >
                {/* Étape numéro */}
                <div
                  className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm text-white shadow-md"
                  style={{ background: c.accent }}
                >
                  {stage.stage}
                </div>

                <div className="flex items-center gap-2 mb-3 mt-1">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: `${c.accent}15` }}>
                    <i className={`${c.icon} text-lg`} style={{ color: c.accent }} />
                  </div>
                  <h3 className="font-bold text-brand-900 text-sm">{stage.name}</h3>
                </div>

                <p className="text-xs text-gray-600 mb-4 leading-relaxed">{stage.description}</p>

                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tactiques</p>
                  {stage.tactics.map((t, ti) => (
                    <p key={ti} className="text-xs text-gray-600 leading-relaxed flex items-start gap-1.5">
                      <i className="ri-checkbox-circle-line text-emerald-500 flex-shrink-0 mt-0.5" />
                      {t}
                    </p>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Outils</p>
                  {stage.tools.map((tool, ti) => (
                    <p key={ti} className="text-xs text-gray-500 leading-relaxed pl-4 border-l border-gray-200">
                      {tool}
                    </p>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-bold mb-1" style={{ color: c.accent }}>
                    CTA : {stage.cta}
                  </p>
                  <p className="text-xs text-gray-400">Conversion : {stage.conversionRate}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conversion rates chain */}
        <div className="bg-brand-950 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-xs text-gray-400">Visiteurs</p>
          </div>
          <i className="ri-arrow-right-line text-gold-400 text-xl hidden md:block" />
          <i className="ri-arrow-down-line text-gold-400 text-xl md:hidden" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gold-400">15%</p>
            <p className="text-xs text-gray-400">→ Leads</p>
          </div>
          <i className="ri-arrow-right-line text-gold-400 text-xl hidden md:block" />
          <i className="ri-arrow-down-line text-gold-400 text-xl md:hidden" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gold-400">3.75%</p>
            <p className="text-xs text-gray-400">→ Appels</p>
          </div>
          <i className="ri-arrow-right-line text-gold-400 text-xl hidden md:block" />
          <i className="ri-arrow-down-line text-gold-400 text-xl md:hidden" />
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">1.1%</p>
            <p className="text-xs text-gray-400">→ Missions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
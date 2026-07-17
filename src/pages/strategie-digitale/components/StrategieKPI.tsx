import { KPIS, DEPLOYMENT_CALENDAR, TOOLS_STACK } from '@/mocks/digitalStrategyKpi';

export default function StrategieKPI() {
  const categories = ['seo', 'leads', 'conversion', 'ia-visibility', 'linkedin', 'revenue'] as const;

  const categoryLabels: Record<string, { label: string; icon: string; color: string }> = {
    seo: { label: 'SEO Google', icon: 'ri-search-line', color: '#3b82f6' },
    leads: { label: 'Leads Générés', icon: 'ri-user-add-line', color: '#10b981' },
    conversion: { label: 'Conversion', icon: 'ri-exchange-line', color: '#d4a82a' },
    'ia-visibility': { label: 'Visibilité IA', icon: 'ri-robot-2-line', color: '#8b5cf6' },
    linkedin: { label: 'LinkedIn', icon: 'ri-linkedin-line', color: '#0A66C2' },
    revenue: { label: 'Revenus', icon: 'ri-money-euro-circle-line', color: '#22a05a' },
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 mb-4">
            <i className="ri-bar-chart-grouped-line text-brand-600" />
            <span className="text-xs font-bold text-brand-700 tracking-widest uppercase">Objectifs KPI</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            KPIs & Calendrier de Déploiement — 12 Mois
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Objectifs mesurables sur 6 axes : SEO, leads, conversion, visibilité IA, LinkedIn et revenus.
            Calendrier de déploiement mois par mois avec livrables et milestones.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {categories.map((cat) => {
            const catKpis = KPIS.filter((k) => k.category === cat);
            const meta = categoryLabels[cat];

            return (
              <div key={cat} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: `${meta.color}15` }}>
                    <i className={`${meta.icon}`} style={{ color: meta.color }} />
                  </div>
                  <h3 className="font-bold text-brand-900 text-sm">{meta.label}</h3>
                </div>
                <div className="space-y-3">
                  {catKpis.map((kpi, i) => (
                    <div key={i} className="border-l-2 border-gray-100 pl-3">
                      <p className="text-xs font-semibold text-brand-800">{kpi.metric}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold" style={{ color: meta.color }}>
                          {kpi.target}
                        </span>
                        <span className="text-xs text-gray-400">{kpi.timeline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Calendrier 12 mois */}
        <div className="mb-16">
          <h3 className="font-bold text-brand-900 text-lg mb-6 flex items-center gap-2">
            <i className="ri-calendar-todo-line text-gold-500" />
            Calendrier de Déploiement — 12 Mois
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPLOYMENT_CALENDAR.map((phase) => (
              <div
                key={phase.month}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-900 text-white font-bold text-sm">
                    M{phase.month}
                  </div>
                  <div>
                    <p className="font-bold text-brand-900 text-sm">{phase.name}</p>
                    <p className="text-xs text-gray-400">{phase.focus}</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-3">
                  {phase.deliverables.slice(0, 3).map((d, di) => (
                    <p key={di} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <i className="ri-checkbox-circle-line text-emerald-500 flex-shrink-0 mt-0.5" />
                      {d}
                    </p>
                  ))}
                  {phase.deliverables.length > 3 && (
                    <p className="text-xs text-gray-400 pl-5">+ {phase.deliverables.length - 3} autres livrables</p>
                  )}
                </div>
                <div className="border-t border-gray-50 pt-2">
                  <p className="text-xs font-bold text-gold-600 mb-1">Milestones</p>
                  <div className="flex flex-wrap gap-1">
                    {phase.milestones.map((m, mi) => (
                      <span key={mi} className="px-2 py-0.5 bg-gold-50 text-gold-700 text-xs rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack technique */}
        <div className="bg-brand-950 rounded-2xl p-8">
          <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
            <i className="ri-tools-line text-gold-400" />
            Stack Technique & Outils Recommandés
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(TOOLS_STACK).map(([category, tools]) => {
              const catNames: Record<string, string> = {
                analytics: 'Analytics',
                seo: 'SEO',
                social: 'Social Media',
                crm: 'CRM & Capture',
                content: 'Content & Copy',
                ai: 'IA & Optimisation',
              };

              return (
                <div key={category} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h4 className="font-bold text-gold-300 text-sm mb-3 uppercase tracking-wider">{catNames[category] || category}</h4>
                  <div className="space-y-2">
                    {tools.map((tool, ti) => (
                      <div key={ti} className="flex items-start gap-2">
                        <i className="ri-check-line text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-white font-medium">{tool.name}</p>
                          <p className="text-xs text-gray-400">{tool.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
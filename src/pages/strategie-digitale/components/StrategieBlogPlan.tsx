import { BLOG_PLAN } from '@/mocks/digitalStrategyContent';

export default function StrategieBlogPlan() {
  const months = [
    { name: 'Janvier', weeks: [1, 2, 3, 4] },
    { name: 'Février', weeks: [5, 6, 7, 8] },
    { name: 'Mars', weeks: [9, 10, 11, 12] },
  ];

  const getFormatColor = (f: string) => {
    switch (f) {
      case 'guide': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'analyse': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'etude-de-cas': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'checklist': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'interview': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getFormatLabel = (f: string) => {
    switch (f) {
      case 'guide': return 'Guide';
      case 'analyse': return 'Analyse';
      case 'etude-de-cas': return 'Étude de Cas';
      case 'checklist': return 'Checklist';
      case 'interview': return 'Interview';
      default: return f;
    }
  };

  const getStageLabel = (s: string) => {
    switch (s) {
      case 'awareness': return 'Sensibilisation';
      case 'consideration': return 'Considération';
      case 'decision': return 'Décision';
      default: return s;
    }
  };

  const getStageColor = (s: string) => {
    switch (s) {
      case 'awareness': return 'text-gray-500';
      case 'consideration': return 'text-amber-600';
      case 'decision': return 'text-emerald-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
            <i className="ri-article-line text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">Plan de Contenu</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            2 Articles / Semaine — Orientés Investisseurs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            12 articles planifiés sur 3 mois avec cibles SEO, funnel stage et schema.org.
            Formats variés : guides, analyses, études de cas, checklists, interviews.
          </p>
        </div>

        <div className="space-y-12">
          {months.map((month) => (
            <div key={month.name}>
              <h3 className="font-bold text-brand-900 text-lg mb-4 flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-900 text-white text-sm font-bold">
                  {month.name[0]}
                </div>
                {month.name} 2026
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {month.weeks.map((week) => {
                  const article = BLOG_PLAN.find((a) => a.publishWeek === week);
                  if (!article) return null;

                  return (
                    <div
                      key={week}
                      className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getFormatColor(article.format)}`}>
                          {getFormatLabel(article.format)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${getStageColor(article.funnelStage)}`}>
                            {getStageLabel(article.funnelStage)}
                          </span>
                          <span className="text-xs text-gray-400">{article.wordCount} mots</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-brand-800 text-sm mb-2 leading-snug">
                        {article.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-search-line text-gray-400" />
                          {article.targetKeyword}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-user-line text-gray-400" />
                          {article.audience === 'both' ? 'Investisseurs + Promoteurs' : article.audience === 'investisseurs' ? 'Investisseurs' : 'Promoteurs'}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-code-box-line text-gray-400" />
                          {article.schemaType}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
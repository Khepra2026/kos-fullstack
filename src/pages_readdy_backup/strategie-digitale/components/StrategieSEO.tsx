import { SEO_KEYWORDS, SEO_PAGES } from '@/mocks/digitalStrategySeo';

export default function StrategieSEO() {
  const priority1 = SEO_KEYWORDS.filter((k) => k.priority === 1);
  const priority2 = SEO_KEYWORDS.filter((k) => k.priority === 2);
  const priority3 = SEO_KEYWORDS.filter((k) => k.priority === 3);

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'low': return 'bg-emerald-100 text-emerald-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getIntentLabel = (i: string) => {
    switch (i) {
      case 'transactional': return 'Transactionnel';
      case 'informational': return 'Informationnel';
      case 'navigational': return 'Navigationnel';
      default: return i;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
            <i className="ri-search-line text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">SEO Google</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            15 Mots-Clés Stratégiques & Architecture SEO
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Chaque page = 1 service = 1 mot-clé principal. 10 pages optimisées avec titles,
            meta descriptions, H1/H2 structurés et schema.org.
          </p>
        </div>

        {/* Mots-clés par priorité */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Priorité 1 */}
          <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-sm">P1</div>
              <h3 className="font-bold text-brand-900">Priorité Maximale</h3>
            </div>
            <div className="space-y-3">
              {priority1.map((k, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-3.5 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-sm text-brand-800 leading-snug">{k.keyword}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ${getDifficultyColor(k.difficulty)}`}>
                      {k.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-bar-chart-line text-gray-400" />
                      {k.volumeEstimate}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-crosshair-line text-gray-400" />
                      {getIntentLabel(k.searchIntent)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priorité 2 */}
          <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-sm">P2</div>
              <h3 className="font-bold text-brand-900">Priorité Élevée</h3>
            </div>
            <div className="space-y-3">
              {priority2.map((k, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-3.5 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-sm text-brand-800 leading-snug">{k.keyword}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ${getDifficultyColor(k.difficulty)}`}>
                      {k.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-bar-chart-line text-gray-400" />
                      {k.volumeEstimate}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-crosshair-line text-gray-400" />
                      {getIntentLabel(k.searchIntent)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priorité 3 */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-500 text-white font-bold text-sm">P3</div>
              <h3 className="font-bold text-brand-900">Priorité Standard</h3>
            </div>
            <div className="space-y-3">
              {priority3.map((k, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-3.5 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-sm text-brand-800 leading-snug">{k.keyword}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ${getDifficultyColor(k.difficulty)}`}>
                      {k.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-bar-chart-line text-gray-400" />
                      {k.volumeEstimate}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-crosshair-line text-gray-400" />
                      {getIntentLabel(k.searchIntent)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture 10 pages */}
        <div className="bg-brand-950 rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gold-500/20">
              <i className="ri-pages-line text-xl text-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Architecture SEO : 10 Pages Optimisées</h3>
              <p className="text-sm text-gray-400">1 page = 1 service = 1 mot-clé principal</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {SEO_PAGES.map((page, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">{page.slug}</span>
                    <h4 className="font-semibold text-white text-sm mt-1 group-hover:text-gold-300 transition-colors">
                      {page.titleSEO}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 bg-gold-500/20 text-gold-300 text-xs font-bold rounded flex-shrink-0">
                    {page.keywordPrincipal}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{page.metaDescription}</p>
                <div className="flex flex-wrap gap-1.5">
                  {page.keywordSecondaires.map((kw, ki) => (
                    <span key={ki} className="px-2 py-0.5 bg-white/8 text-gray-400 text-xs rounded-full">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




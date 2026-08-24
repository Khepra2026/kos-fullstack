import { useState } from 'react';
import { GEO_STRATEGY } from '@/mocks/digitalStrategyContent';

export default function StrategieGEO() {
  const [activeContent, setActiveContent] = useState(0);

  const typeLabels: Record<string, string> = {
    'faq-expert': 'FAQ Experte',
    'guide-complet': 'Guide Complet',
    'etude-cas': 'Étude de Cas',
    'comparaison': 'Comparaison',
    'definition': 'Définition',
  };

  const typeColors: Record<string, string> = {
    'faq-expert': 'bg-purple-50 text-purple-700 border-purple-200',
    'guide-complet': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'etude-cas': 'bg-amber-50 text-amber-700 border-amber-200',
    'comparaison': 'bg-blue-50 text-blue-700 border-blue-200',
    'definition': 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 mb-4">
            <i className="ri-robot-2-line text-purple-600" />
            <span className="text-xs font-bold text-purple-700 tracking-widest uppercase">GEO — Référencement IA</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            Contenu Optimisé pour ChatGPT, Perplexity & Google AI
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Créer du contenu structuré, citable et factuel pour être cité dans les réponses des IA.
            6 types de contenus prioritaires avec faits chiffrés et sources vérifiables.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Sidebar navigation */}
          <div className="md:col-span-4 space-y-3">
            {GEO_STRATEGY.map((content, i) => (
              <button
                key={i}
                onClick={() => setActiveContent(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  activeContent === i
                    ? 'border-gold-400 bg-gold-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:bg-gray-50'
                }`}
              >
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold border mb-2 ${typeColors[content.type]}`}>
                  {typeLabels[content.type]}
                </span>
                <p className={`font-semibold text-sm ${activeContent === i ? 'text-brand-900' : 'text-gray-700'}`}>
                  {content.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">{content.targetQuery}</p>
              </button>
            ))}
          </div>

          {/* Content detail */}
          <div className="md:col-span-8">
            {GEO_STRATEGY[activeContent] && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${typeColors[GEO_STRATEGY[activeContent].type]}`}>
                    {typeLabels[GEO_STRATEGY[activeContent].type]}
                  </span>
                  <span className="text-xs text-gray-400">
                    Page à créer : {GEO_STRATEGY[activeContent].pageToCreate}
                  </span>
                </div>

                <h3 className="font-bold text-brand-900 text-xl mb-4">
                  {GEO_STRATEGY[activeContent].title}
                </h3>

                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Requête type IA</p>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-100 italic">
                    "{GEO_STRATEGY[activeContent].targetQuery}"
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Format structuré</p>
                  <p className="text-sm text-brand-700 font-medium">
                    {GEO_STRATEGY[activeContent].structuredFormat}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Faits chiffrés (à citer)</p>
                  <div className="space-y-2">
                    {GEO_STRATEGY[activeContent].keyFacts.map((fact, fi) => (
                      <div key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                        <i className="ri-check-double-line text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sources à citer</p>
                  <div className="flex flex-wrap gap-2">
                    {GEO_STRATEGY[activeContent].sourcesToCite.map((source, si) => (
                      <span key={si} className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}




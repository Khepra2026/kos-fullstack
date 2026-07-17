import { useState } from 'react';
import { LINKEDIN_PLAN } from '@/mocks/digitalStrategySocial';

export default function StrategieLinkedIn() {
  const [activeWeek, setActiveWeek] = useState(1);
  const weekPosts = LINKEDIN_PLAN.filter((p) => p.week === activeWeek);

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-4">
            <i className="ri-linkedin-line text-blue-600" />
            <span className="text-xs font-bold text-blue-700 tracking-widest uppercase">LinkedIn Prioritaire</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            Ligne Éditoriale d'Autorité — 3 Posts / Semaine
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Positionner le fondateur comme expert reconnu en Afrique francophone.
            Insights marché, analyses projets, erreurs fréquentes investisseurs.
          </p>
        </div>

        {/* Sélecteur de semaine */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {[1, 2, 3].map((w) => (
            <button
              key={w}
              onClick={() => setActiveWeek(w)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer whitespace-nowrap transition-all ${
                activeWeek === w
                  ? 'bg-brand-900 text-white shadow-lg'
                  : 'bg-white text-brand-800 border border-gray-200 hover:border-brand-300'
              }`}
            >
              Semaine {w}
            </button>
          ))}
        </div>

        {/* Posts de la semaine */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {weekPosts.map((post, i) => {
            const typeColors: Record<string, string> = {
              'insight-marche': 'bg-purple-50 text-purple-700 border-purple-200',
              'analyse-projet': 'bg-emerald-50 text-emerald-700 border-emerald-200',
              'erreur-investisseur': 'bg-red-50 text-red-700 border-red-200',
              'etude-cas': 'bg-amber-50 text-amber-700 border-amber-200',
              'tendance': 'bg-blue-50 text-blue-700 border-blue-200',
              'positionnement': 'bg-brand-50 text-brand-700 border-brand-200',
            };
            const typeLabels: Record<string, string> = {
              'insight-marche': 'Insight Marché',
              'analyse-projet': 'Analyse Projet',
              'erreur-investisseur': 'Erreur Investisseur',
              'etude-cas': 'Étude de Cas',
              'tendance': 'Tendance',
              'positionnement': 'Positionnement',
            };

            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${typeColors[post.type] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                    {typeLabels[post.type] || post.type}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">{post.day}</span>
                  {post.estimatedEngagement === 'high' && (
                    <span className="ml-auto px-2 py-0.5 bg-gold-100 text-gold-700 text-xs font-bold rounded-full">
                      High engagement
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-brand-900 text-base mb-3 leading-snug">{post.title}</h3>

                <div className="bg-gray-50 rounded-xl p-4 mb-4 border-l-4 border-gold-400">
                  <p className="text-sm text-gray-600 italic leading-relaxed">{post.hook}</p>
                </div>

                <div className="space-y-1.5 mb-4">
                  {post.bodyStructure.map((line, li) => (
                    <p key={li} className="text-xs text-gray-500 leading-relaxed pl-3 border-l-2 border-gray-200">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-brand-700 font-semibold mb-2">CTA : {post.cta}</p>
                  <div className="flex flex-wrap gap-1">
                    {post.hashtag.map((h, hi) => (
                      <span key={hi} className="text-xs text-gray-400">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ligne éditoriale récap */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h3 className="font-bold text-brand-900 text-lg mb-6 flex items-center gap-2">
            <i className="ri-lightbulb-line text-gold-500" />
            Ligne Éditoriale — Principes Directeurs
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'ri-bar-chart-2-line',
                title: 'Insights Marché',
                desc: 'Données chiffrées, analyses sectorielles, benchmarks pays UEMOA/CEMAC. Toujours sourcé.',
                color: '#8b5cf6',
              },
              {
                icon: 'ri-briefcase-line',
                title: 'Analyses Projets',
                desc: 'Déconstructions de projets réels (anonymisés) avec chiffres, étapes et résultats.',
                color: '#10b981',
              },
              {
                icon: 'ri-error-warning-line',
                title: 'Erreurs Investisseurs',
                desc: 'Leçons apprises, pièges fréquents, contre-exemples avec coûts réels. Éducatif et engageant.',
                color: '#ef4444',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: `${item.color}15` }}
                >
                  <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
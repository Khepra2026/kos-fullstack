export default function GuideTestimonials() {
  const testimonials = [
    {
      name: 'Marie K.',
      role: 'Directrice Marketing',
      company: 'Fintech — Abidjan',
      quote: 'Grâce aux stratégies SEO de KHEPRA, notre trafic organique a augmenté de 340% en 6 mois. Nous sommes maintenant en première page Google sur les requêtes "fintech Côte d\'Ivoire" et "mobile money abidjan".',
      metric: '+340%',
      metricLabel: 'Trafic organique',
    },
    {
      name: 'Amadou S.',
      role: 'Fondateur',
      company: 'Startup PME — Lomé',
      quote: 'Le guide m\'a permis de comprendre comment ChatGPT référence les entreprises africaines. Nous avons restructuré notre contenu et sommes maintenant cités dans les réponses IA sur les services financiers au Togo.',
      metric: '+12k',
      metricLabel: 'Impressions mensuelles',
    },
    {
      name: 'Sophie B.',
      role: 'Responsable Digital',
      company: 'IMF — Cotonou',
      quote: 'L\'approche netlinking régional décrite dans le guide nous a permis de construire des backlinks de qualité sur des sites béninois de référence. Notre autorité de domaine est passée de 18 à 42.',
      metric: '+133%',
      metricLabel: 'Autorité de domaine',
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-trophy-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Résultats concrets</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
            Ce que les dirigeants africains
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}ont déjà accompli
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Des études de cas réelles sur des PME, fintechs et institutions de microfinance qui ont transformé leur visibilité digitale en Afrique francophone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#ffffff', borderColor: 'rgba(212,168,42,0.15)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)', color: '#86BC25' }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#0a1628' }}>{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role} — {t.company}</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-gray-100">
                <div className="font-playfair text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t.metric}
                </div>
                <div className="text-xs text-gray-500">{t.metricLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




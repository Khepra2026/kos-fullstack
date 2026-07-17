export default function OffreResultats() {
  const resultats = [
    {
      icon: 'ri-line-chart-line',
      title: 'Meilleure rentabilité',
      desc: 'Nos clients constatent en moyenne une amélioration de 15 à 25% de leurs marges nettes dans les 12 premiers mois.',
      metric: '+20%',
      metricLabel: 'Marge nette moyenne',
    },
    {
      icon: 'ri-brain-line',
      title: 'Décisions financières fiables',
      desc: 'Tableaux de bord en temps réel, indicateurs clés et reporting mensuel pour piloter avec confiance.',
      metric: '100%',
      metricLabel: 'Visibilité financière',
    },
    {
      icon: 'ri-bank-line',
      title: 'Accès facilité au financement',
      desc: 'Dossiers bancaires structurés, relations investisseurs optimisées, taux d\'acceptation amélioré.',
      metric: '3x',
      metricLabel: 'Plus de chances d\'obtenir un crédit',
    },
    {
      icon: 'ri-building-4-line',
      title: 'Entreprise structurée & crédible',
      desc: 'Gouvernance solide, conformité réglementaire, image professionnelle auprès des partenaires.',
      metric: '360°',
      metricLabel: 'Transformation organisationnelle',
    },
  ];

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #ffffff 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.25)' }}>
            <i className="ri-bar-chart-2-line text-sm text-green-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-green-700">Résultats Mesurables</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
            Ce que vous pouvez{' '}
            <span style={{ background: 'linear-gradient(135deg, #27ae60, #2ecc71)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              attendre concrètement
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Des résultats tangibles, mesurables et durables — pas des promesses vagues.
          </p>
        </div>

        {/* Résultats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {resultats.map((r, i) => (
            <div
              key={i}
              className="flex gap-6 p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default gradient-border glow-gold-hover"
              style={{ background: '#ffffff' }}
            >
              {/* Metric */}
              <div className="flex-shrink-0 text-center">
                <div
                  className="w-20 h-20 flex items-center justify-center rounded-2xl mb-2"
                  style={{ background: 'linear-gradient(160deg, #0a1628 0%, #1a2d4a 100%)' }}
                >
                  <span className="font-playfair font-bold text-lg leading-tight" style={{ color: '#86BC25' }}>{r.metric}</span>
                </div>
                <div className="text-xs text-gray-500 leading-tight max-w-[80px]">{r.metricLabel}</div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <i className={`${r.icon} text-lg`} style={{ color: '#86BC25' }} />
                  <h3 className="font-bold text-base" style={{ color: '#0a1628' }}>{r.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ROI Banner */}
        <div
          className="p-8 rounded-2xl text-center gradient-border-dark glow-gold-hover transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="ri-money-dollar-circle-line text-3xl" style={{ color: '#86BC25' }} />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-white mb-3">
            Retour sur Investissement Garanti
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto text-sm leading-relaxed mb-6">
            Nos honoraires sont conçus pour être <strong className="text-white">auto-financés par les économies réalisées</strong>. 
            En moyenne, nos clients récupèrent leur investissement en moins de 3 mois grâce aux optimisations identifiées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://calendly.com/essochamanu/consultation-strategique-30min', '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a1628' }}
            >
              <i className="ri-calculator-line" />
              Réserver un entretien stratégique
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

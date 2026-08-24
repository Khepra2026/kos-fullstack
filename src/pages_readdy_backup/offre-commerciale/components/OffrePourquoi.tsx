export default function OffrePourquoi() {
  const raisons = [
    {
      icon: 'ri-award-line',
      value: '+20 ans',
      title: 'D\'expérience',
      desc: 'En finance, gouvernance et conseil stratégique pour les entreprises africaines.',
    },
    {
      icon: 'ri-global-line',
      value: '3 pays',
      title: 'Expertise régionale',
      desc: 'Togo, Bénin, Côte d\'Ivoire — connaissance approfondie des marchés locaux.',
    },
    {
      icon: 'ri-bar-chart-grouped-line',
      value: '100%',
      title: 'Orienté résultats',
      desc: 'Chaque mission est mesurée par des indicateurs concrets et des livrables précis.',
    },
    {
      icon: 'ri-building-2-line',
      value: '600+',
      title: 'Organisations',
      desc: 'PME, institutions financières, ONG et projets financés accompagnés avec succès.',
    },
  ];

  const temoignages = [
    {
      nom: 'Kofi A.',
      poste: 'DG, PME Lomé',
      texte: 'KHEPRA EXPERTS a transformé notre gestion financière. En 6 mois, nous avons réduit nos coûts de 18% et obtenu un financement bancaire que nous n\'arrivions pas à décrocher depuis 2 ans.',
      note: 5,
    },
    {
      nom: 'Aminata S.',
      poste: 'Directrice, Institution Microfinance',
      texte: 'Le diagnostic financier gratuit a révélé des pertes invisibles que nous n\'avions pas détectées. L\'accompagnement KHEPRA nous a permis de retrouver la conformité BCEAO en 3 mois.',
      note: 5,
    },
    {
      nom: 'Jean-Marc D.',
      poste: 'Fondateur, Startup Abidjan',
      texte: 'Grâce au DAF externalisé, j\'ai enfin une vision claire de ma trésorerie. Les investisseurs ont été convaincus par la qualité de nos reportings financiers.',
      note: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-trophy-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Pourquoi choisir KHEPRA EXPERTS ?</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
            Une expertise reconnue,{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              des résultats prouvés
            </span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {raisons.map((r, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default gradient-border-dark glow-gold-hover"
              style={{ background: 'linear-gradient(160deg, #0a1628 0%, #1a2d4a 100%)' }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl mx-auto mb-4" style={{ background: 'rgba(212,168,42,0.12)' }}>
                <i className={`${r.icon} text-xl`} style={{ color: '#86BC25' }} />
              </div>
              <div className="font-playfair text-2xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {r.value}
              </div>
              <div className="text-white font-semibold text-sm mb-2">{r.title}</div>
              <div className="text-white/50 text-xs leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>

        {/* Témoignages */}
        <div className="mb-12">
          <h3 className="font-playfair text-2xl font-bold mb-10" style={{ color: '#0a1628' }}>
            Ce que disent nos clients
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {temoignages.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 gradient-border glow-gold-hover"
                style={{ background: '#f8f6f0' }}
              >
                {/* Étoiles */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.note }).map((_, j) => (
                    <i key={j} className="ri-star-fill text-sm" style={{ color: '#86BC25' }} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">&ldquo;{t.texte}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#0a1628' }}
                  >
                    {t.nom.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: '#0a1628' }}>{t.nom}</div>
                    <div className="text-xs text-gray-500">{t.poste}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: 'ri-shield-check-fill', label: 'Certifié BCEAO' },
            { icon: 'ri-verified-badge-fill', label: 'Conforme OHADA' },
            { icon: 'ri-award-fill', label: '+20 ans d\'expertise' },
            { icon: 'ri-global-line', label: 'Présence régionale' },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(212,168,42,0.08)', border: '1px solid rgba(212,168,42,0.2)' }}>
              <i className={`${c.icon} text-sm`} style={{ color: '#86BC25' }} />
              <span className="text-xs font-semibold" style={{ color: '#0a1628' }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





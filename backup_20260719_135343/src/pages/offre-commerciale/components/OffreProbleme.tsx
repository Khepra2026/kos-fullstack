export default function OffreProbleme() {
  const problemes = [
    {
      icon: 'ri-error-warning-line',
      title: 'Décisions financières risquées',
      desc: 'Sans données fiables, chaque décision engage l\'avenir de votre entreprise dans l\'incertitude.',
      color: '#e74c3c',
    },
    {
      icon: 'ri-eye-off-line',
      title: 'Absence de contrôle interne',
      desc: 'Les pertes invisibles s\'accumulent : fraudes, gaspillages, inefficacités non détectées.',
      color: '#e67e22',
    },
    {
      icon: 'ri-funds-box-line',
      title: 'Manque de visibilité sur la trésorerie',
      desc: 'Vous ne savez pas exactement où va votre argent ni comment optimiser vos flux financiers.',
      color: '#f39c12',
    },
    {
      icon: 'ri-bank-line',
      title: 'Difficulté à convaincre banques et investisseurs',
      desc: 'Sans dossier financier structuré, l\'accès au financement reste un obstacle majeur à votre croissance.',
      color: '#c0392b',
    },
  ];

  return (
    <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #f8f6f0 0%, #ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.2)' }}>
            <i className="ri-alert-line text-red-500 text-sm" />
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">Reconnaissez-vous cette situation ?</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
            Votre entreprise génère du chiffre…<br />
            <span className="text-red-600">mais manque de performance ?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Ces problèmes touchent <strong>80% des PME en Afrique de l&apos;Ouest</strong>. Ils freinent votre croissance et exposent votre entreprise à des risques évitables.
          </p>
        </div>

        {/* Problèmes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {problemes.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-5 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default gradient-border glow-gold-hover"
              style={{ background: '#ffffff', boxShadow: `0 4px 24px ${p.color}10` }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: `${p.color}12` }}
              >
                <i className={`${p.icon} text-2xl`} style={{ color: p.color }} />
              </div>
              <div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#0a1628' }}>{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition vers solution */}
        <div
          className="text-center py-10 px-8 rounded-2xl gradient-border-dark glow-gold-hover transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, #86BC25)' }} />
            <i className="ri-arrow-right-circle-line text-2xl" style={{ color: '#86BC25' }} />
            <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
          </div>
          <p className="text-white text-lg font-semibold mb-2">
            Il est temps de structurer votre gestion financière.
          </p>
          <p className="text-white/60 text-sm">
            KHEPRA EXPERTS transforme ces défis en leviers de croissance mesurables.
          </p>
        </div>
      </div>
    </section>
  );
}





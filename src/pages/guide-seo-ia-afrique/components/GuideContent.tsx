export default function GuideContent() {
  const sections = [
    {
      icon: 'ri-search-line',
      title: 'Stratégies SEO adaptées aux marchés africains',
      description: 'Découvrez comment optimiser votre présence sur Google et Bing dans les contextes spécifiques de l\'UEMOA et du CEMAC. Algorithmes locaux, comportements de recherche francophones, et spécificités des moteurs africains.',
      color: '#86BC25',
    },
    {
      icon: 'ri-article-line',
      title: 'Contenu optimisé pour le français africain',
      description: 'Maîtrisez les techniques de rédaction SEO adaptées aux requêtes locales, aux expressions régionales et aux besoins informationnels des décideurs africains. Du SYSCOHADA au BCEAO, apprenez à répondre aux intentions de recherche.',
      color: '#6B9B1F',
    },
    {
      icon: 'ri-link',
      title: 'Netlinking régional et annuaires francophones',
      description: 'Construisez un profil de liens pertinent avec des sites africains de référence, des annuaires professionnels francophones et des partenariats médiatiques locaux. Le guide révèle les secrets du backlinking territorial.',
      color: '#86BC25',
    },
    {
      icon: 'ri-robot-2-line',
      title: 'Intégration des moteurs d\'IA',
      description: 'Positionnez-vous sur ChatGPT, Gemini et Copilot. Comprenez le AIO (AI Optimization) et comment structurer votre contenu pour être cité par les moteurs d\'intelligence artificielle comme source de référence en Afrique.',
      color: '#6B9B1F',
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Études de cas — PME et startups africaines',
      description: 'Analyse détaillée de PME et startups ayant multiplié leur trafic organique. Des cas concrets du Togo, du Bénin, de la Côte d\'Ivoire et du Sénégal avec chiffres, méthodologies et résultats mesurables.',
      color: '#86BC25',
    },
  ];

  return (
    <section id="contenu-guide" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-book-open-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Ce que vous allez découvrir</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
            Les 5 piliers du
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}référencement en Afrique
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Un guide pratique de 47 pages, basé sur l&apos;expérience terrain de KHEPRA EXPERTS dans l&apos;indexation de 163 URLs et le classement sur les requêtes stratégiques du secteur financier africain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#ffffff', borderColor: 'rgba(212,168,42,0.15)' }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `rgba(${section.color === '#86BC25' ? '212,168,42' : '26,107,60'},0.1)`, border: `1px solid ${section.color}30` }}>
                <i className={`${section.icon} text-xl`} style={{ color: section.color }} />
              </div>
              <h3 className="font-bold text-base mb-3 leading-snug" style={{ color: '#0a1628' }}>
                {section.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
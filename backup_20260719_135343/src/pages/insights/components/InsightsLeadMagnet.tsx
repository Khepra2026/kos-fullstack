import { useNavigate } from 'react-router-dom';

export default function InsightsLeadMagnet() {
  const navigate = useNavigate();

  const tools = [
    {
      icon: 'ri-file-chart-line',
      title: 'Rapport Conseil d\'Administration',
      desc: 'Générez un Board Report structuré, conforme OHADA, en moins de 30 minutes.',
      cta: 'Créer mon rapport gratuit',
      href: '/board-report',
      badge: 'Gratuit',
      color: 'gold',
      popular: true,
    },
    {
      icon: 'ri-stethoscope-line',
      title: 'Diagnostic Organisationnel',
      desc: 'Évaluez la maturité de votre organisation en 15 minutes. Score + recommandations.',
      cta: 'Lancer le diagnostic',
      href: '/tools/diagnostic-organisationnel',
      badge: 'Gratuit',
      color: 'emerald',
      popular: false,
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Évaluation Gouvernance',
      desc: 'Mesurez votre niveau de conformité BCEAO/OHADA et identifiez les gaps critiques.',
      cta: 'Évaluer ma gouvernance',
      href: '/tools/evaluation-gouvernance',
      badge: 'Gratuit',
      color: 'blue',
      popular: false,
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Maturité Digitale',
      desc: 'Scoring de transformation digitale pour PME et institutions financières africaines.',
      cta: 'Tester ma maturité',
      href: '/tools/maturite-digitale',
      badge: 'Gratuit',
      color: 'purple',
      popular: false,
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; btn: string }> = {
    gold: { bg: 'bg-gold-50', text: 'text-gold-700', border: 'border-gold-200', btn: 'bg-gradient-to-r from-gold-500 to-gold-600 text-white' },
    emerald: { bg: 'bg-strategic-50', text: 'text-strategic-700', border: 'border-strategic-200', btn: 'bg-strategic-600 text-white' },
    blue: { bg: 'bg-brand-50', text: 'text-brand-700', border: 'border-brand-200', btn: 'bg-brand-700 text-white' },
    purple: { bg: 'bg-brand-50', text: 'text-brand-700', border: 'border-brand-200', btn: 'bg-brand-700 text-white' },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 text-gold-700 px-4 py-1.5 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
              <i className="ri-tools-line" />
              Executive Tools — Accès prioritaire
            </div>
            <h2 className="font-playfair text-3xl font-bold text-gray-900">
              Outils gratuits pour dirigeants
            </h2>
            <p className="text-gray-600 mt-2">Générez des rapports professionnels. Capture email requise pour accéder aux résultats.</p>
          </div>
          <a href="/tools" onClick={(e) => { e.preventDefault(); navigate('/tools'); }}
            className="hidden md:flex items-center gap-2 text-sm font-bold text-gold-600 hover:text-gold-700 cursor-pointer whitespace-nowrap transition-colors">
            Tous les outils
            <i className="ri-arrow-right-line" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool, i) => {
            const c = colorMap[tool.color];
            return (
              <div key={i} className={`relative group rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${tool.popular ? 'border-gold-400 ring-2 ring-gold-400/20' : 'border-gray-100 hover:border-gray-200'}`}
                onClick={() => navigate(tool.href)}>
                {tool.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg">
                    Le plus utilisé
                  </div>
                )}
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${c.bg} border ${c.border}`}>
                  <i className={`${tool.icon} text-2xl ${c.text}`} />
                </div>
                <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full mb-3 ${c.bg} ${c.text} border ${c.border}`}>{tool.badge}</span>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-tight">{tool.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{tool.desc}</p>
                <button className={`w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all hover:opacity-90 whitespace-nowrap ${c.btn}`}>
                  {tool.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Urgency bar */}
        <div className="mt-8 bg-gradient-to-r from-brand-900 to-brand-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-gold-500/20 rounded-xl flex-shrink-0">
              <i className="ri-time-line text-gold-400 text-xl" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Nombre limité d'analyses gratuites par semaine</p>
              <p className="text-gray-300 text-xs mt-0.5">Réservez votre accès maintenant — Méthodologie inspirée des standards Big4</p>
            </div>
          </div>
          <a href="/board-report" onClick={(e) => { e.preventDefault(); navigate('/board-report'); }}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-brand-900 cursor-pointer whitespace-nowrap transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #86BC25, #d4af37)' }}>
            <i className="ri-file-chart-line" />
            Accéder maintenant
          </a>
        </div>
      </div>
    </section>
  );
}





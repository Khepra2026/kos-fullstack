import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function CaseStudiesCTA() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();

  const stats = [
    { value: '15', label: isEn ? 'Documented case studies' : 'Études de cas documentées', icon: 'ri-file-chart-line' },
    { value: '7+', label: isEn ? 'Countries covered' : 'Pays couverts', icon: 'ri-map-pin-2-line' },
    { value: '4', label: isEn ? 'Sectors of expertise' : "Secteurs d'expertise", icon: 'ri-building-4-line' },
    { value: '100%', label: isEn ? 'Measurable results' : 'Résultats mesurables', icon: 'ri-bar-chart-2-line' },
  ];

  const handleContactClick = () => {
    navigate('/diagnostic-flash');
  };

  return (
    <section className="py-24 bg-brand-950 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-end pr-8">
        <span className="font-playfair text-[18rem] font-bold text-amber-200 leading-none" style={{ WebkitTextStroke: '2px currentColor', WebkitTextFillColor: 'transparent' }}>
          KPI
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all gradient-border glow-gold-hover">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gold-500/20 border border-gold-400/30 mx-auto mb-4">
                <i className={`${s.icon} text-gold-400 text-xl`}></i>
              </div>
              <p className="font-playfair text-4xl font-extrabold text-white mb-1">{s.value}</p>
              <p className="text-sm text-white/60 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-400/30 mb-6">
            <i className="ri-chat-quote-line text-gold-400 text-sm"></i>
            <span className="text-sm font-semibold text-gold-300 uppercase tracking-wider">
              {isEn ? 'Your project, our expertise' : 'Votre projet, notre expertise'}
            </span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {isEn
              ? 'Ready to achieve similar results?'
              : 'Prêt à obtenir des résultats similaires ?'}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            {isEn
              ? "Let's discuss your project and identify together the transformation levers for your organization. A free 30-minute strategic diagnostic to get started."
              : "Discutons de votre projet et identifions ensemble les leviers de transformation pour votre organisation. Un diagnostic stratégique gratuit de 30 minutes pour commencer."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 text-base"
            >
              <i className="ri-calendar-check-line text-lg"></i>
              {isEn ? 'Book a free diagnostic' : 'Réserver un diagnostic gratuit'}
            </button>
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold whitespace-nowrap cursor-pointer text-base"
            >
              <i className="ri-briefcase-4-line text-lg"></i>
              {isEn ? 'Discover our services' : 'Découvrir nos services'}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/10">
            {[
              { icon: 'ri-shield-check-line', label: isEn ? 'Confidential' : 'Confidentiel' },
              { icon: 'ri-time-line', label: isEn ? '30 minutes' : '30 minutes' },
              { icon: 'ri-hand-heart-line', label: isEn ? 'No commitment' : 'Sans engagement' },
              { icon: 'ri-global-line', label: isEn ? 'FR / EN' : 'FR / EN' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <i className={`${b.icon} text-emerald-400 text-lg`}></i>
                <span className="text-sm text-white/70 font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

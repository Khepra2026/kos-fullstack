import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function InvestisseursHero() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section
      className="relative min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 45%, #141414 100%)' }}
    >
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Premium%20African%20investment%20advisory%20boardroom%20executive%20meeting%20investors%20reviewing%20financial%20data%20charts%20modern%20dark%20charcoal%20interior%20with%20green%20accent%20lighting%20panoramic%20glass%20windows%20overlooking%20African%20city%20skyline%20at%20dusk%20professional%20corporate%20atmosphere%20dark%20charcoal%20tones%20with%20deloitte%20green%20accent%20lighting%20no%20blue%20no%20purple&width=1920&height=1080&seq=invest-hero-green&orientation=landscape"
          alt="Khepra Experts — Cabinet conseil investisseurs Afrique"
          className="w-full h-full object-cover object-top"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(10,10,10,0.92) 0%, rgba(17,17,17,0.85) 45%, rgba(20,20,20,0.70) 100%)' }} />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(201,162,39,0.18) 0%, transparent 55%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle at 15% 90%, rgba(34,160,90,0.12) 0%, transparent 55%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(34,160,90,0.09)', border: '1px solid rgba(34,160,90,0.22)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
              {isEn ? 'Investor Advisory · 22 Years · 15 Countries' : 'Conseil Investisseurs · 22 ans · 15 pays'}
            </span>
          </div>

          <h1
            className="font-playfair font-bold text-white mb-6 leading-none"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            {isEn ? (
              <>
                Invest better.<br />
                <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #a5d936)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Structure stronger.</span>
              </>
            ) : (
              <>
                Investissez mieux.<br />
                <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #a5d936)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Structurez plus fort.</span>
              </>
            )}
          </h1>

          <div className="flex items-center gap-3 mb-7">
            <div className="h-px rounded-full" style={{ width: '80px', background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#86BC25' }} />
          </div>

          <p className="mb-8 max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 300, fontSize: '1.15rem', lineHeight: 1.7 }}>
            {isEn
              ? 'Due diligence, investment readiness, and feasibility studies for PE/VC funds, impact investors, and acquirers in Francophone Africa. Bankable deliverables. Measurable results.'
              : 'Due diligence, investment readiness et études de faisabilité pour fonds PE/VC, investisseurs d\'impact et acquéreurs en Afrique francophone. Livrables bankables. Résultats mesurables.'}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => navigate('/tools/investment-readiness')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a', boxShadow: '0 8px 32px rgba(201,162,39,0.45)' }}
            >
              <i className="ri-bar-chart-grouped-line text-lg" />
              {isEn ? 'Test my investment readiness — Free' : 'Tester mon investment readiness — Gratuit'}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.05)' }}
            >
              <i className="ri-calendar-check-line text-lg" />
              {isEn ? 'Book a confidential consultation' : 'Prendre rendez-vous confidentiel'}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { icon: 'ri-shield-check-line', label: isEn ? '€500M+ transactions evaluated' : '€500M+ de transactions évaluées', color: '#86BC25' },
              { icon: 'ri-global-line', label: isEn ? '15 Francophone African countries' : '15 pays Afrique francophone', color: '#86BC25' },
              { icon: 'ri-award-line', label: isEn ? 'Big Four methodology' : 'Méthodologie Big Four', color: '#86BC25' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}>
                  <i className={`${t.icon} text-xs`} style={{ color: t.color }} />
                </div>
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.52)' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




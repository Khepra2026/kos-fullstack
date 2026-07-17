import { useNavigate } from 'react-router-dom';

export default function StrategieHero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-[680px] md:min-h-[780px] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050c18 0%, #0a1a30 45%, #0d203d 100%)' }}
    >
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Abstract%20digital%20strategy%20visualization%20with%20interconnected%20nodes%2C%20glowing%20data%20streams%2C%20African%20continent%20silhouette%20in%20premium%20gold%20and%20dark%20navy%20tones%2C%20futuristic%20business%20intelligence%20network%2C%20minimal%20clean%20aesthetic%2C%20dark%20background%20with%20subtle%20golden%20light%20trails%20and%20emerald%20green%20accents%2C%20professional%20corporate%20atmosphere&width=1920&height=1080&seq=strategie-hero-2026&orientation=landscape"
          alt="Stratégie digitale Khepra Experts"
          className="w-full h-full object-cover object-top"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(5,12,24,0.93) 0%, rgba(10,26,48,0.85) 50%, rgba(13,32,61,0.72) 100%)' }} />
        <div className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 15%, rgba(212,168,42,0.20) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 85%, rgba(16,185,129,0.14) 0%, transparent 55%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
              Stratégie Digitale · SEO · GEO · LinkedIn · Conversion
            </span>
          </div>

          <h1
            className="font-playfair font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}
          >
            Transformer la visibilité digitale de
            <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Khepra Experts</span>
          </h1>

          <div className="flex items-center gap-3 mb-7">
            <div className="h-px rounded-full" style={{ width: '80px', background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#86BC25' }} />
          </div>

          <p className="mb-8 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 300, fontSize: '1.15rem', lineHeight: 1.7 }}>
            Stratégie complète pour positionner Khepra Experts comme le cabinet de référence
            "Investment & ESG Advisory Boutique" visible sur Google, les IA et LinkedIn,
            avec un tunnel de conversion performant orienté investisseurs et projets industriels.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => navigate('/investisseurs')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18', boxShadow: '0 8px 32px rgba(212,168,42,0.45)' }}
            >
              <i className="ri-rocket-line text-lg" />
              Voir la landing Investisseurs
            </button>
            <button
              onClick={() => navigate('/projets-industriels')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm text-white cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.05)' }}
            >
              <i className="ri-building-2-line text-lg" />
              Voir la landing Projets
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { icon: 'ri-search-line', label: '15 mots-clés stratégiques', color: '#86BC25' },
              { icon: 'ri-pages-line', label: '10 pages SEO optimisées', color: '#10b981' },
              { icon: 'ri-robot-2-line', label: '6 contenus GEO (IA)', color: '#86BC25' },
              { icon: 'ri-linkedin-line', label: '3 posts/semaine LinkedIn', color: '#10b981' },
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
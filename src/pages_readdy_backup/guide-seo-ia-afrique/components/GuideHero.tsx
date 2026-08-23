import { useState, useEffect } from 'react';

export default function GuideHero() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 47;
    const step = Math.ceil(target / 40);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060e1c 0%, #0a1628 40%, #0d1f3c 100%)' }}
    >
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=professional%20digital%20marketing%20and%20SEO%20technology%20background%20with%20abstract%20neural%20network%20patterns%2C%20search%20engine%20optimization%20concept%2C%20data%20analytics%20visualization%2C%20dark%20navy%20blue%20and%20gold%20color%20scheme%2C%20futuristic%20African%20digital%20economy%20atmosphere%2C%20glowing%20connection%20lines%20and%20nodes%2C%20high%20tech%20corporate%20aesthetic%2C%20clean%20modern%20design&width=1920&height=1080&seq=guide-seo-hero-bg-001&orientation=landscape"
          alt="SEO & IA Afrique Francophone"
          className="w-full h-full object-cover object-top opacity-15"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(6,14,28,0.95) 0%, rgba(10,22,40,0.85) 50%, rgba(13,31,60,0.9) 100%)' }} />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(212,168,42,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,42,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #6B9B1F 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border" style={{ background: 'rgba(212,168,42,0.12)', borderColor: 'rgba(212,168,42,0.35)' }}>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>
            Guide exclusif — Édition 2026
          </span>
        </div>

        {/* Titre principal */}
        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Propulsez votre entreprise
          <br />
          <span style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            en Afrique francophone
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
          Le guide ultime du <strong className="text-white">référencement Google, Bing et des moteurs d&apos;IA</strong> pour les dirigeants, PME et startups en Afrique de l&apos;Ouest et Centrale
        </p>

        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          {[
            { value: `${count}+`, label: 'Pages d\'expertise' },
            { value: '163', label: 'URLs référencées' },
            { value: '3', label: 'Pays couverts' },
          ].map((stat, i) => (
            <div key={i} className="py-4 px-3 rounded-xl" style={{ background: 'rgba(212,168,42,0.08)', border: '1px solid rgba(212,168,42,0.2)' }}>
              <div className="font-playfair text-2xl sm:text-3xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#telecharger-guide"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a1628' }}
          >
            <i className="ri-download-line text-xl" />
            Télécharger gratuitement
          </a>
          <a
            href="#contenu-guide"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{ border: '1px solid rgba(212,168,42,0.4)', color: '#86BC25', background: 'rgba(212,168,42,0.06)' }}
          >
            <i className="ri-arrow-down-line" />
            Découvrir le contenu
          </a>
        </div>

        {/* Garantie */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
          <i className="ri-shield-check-line text-green-400" />
          <span>100% gratuit — Sans engagement — PDF immédiat</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(212,168,42,0.6), transparent)' }} />
        <i className="ri-arrow-down-s-line text-white/30 text-xl" />
      </div>
    </section>
  );
}




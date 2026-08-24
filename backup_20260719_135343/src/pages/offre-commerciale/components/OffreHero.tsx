import { useState, useEffect } from 'react';

const clientProfiles = [
  {
    id: 'regulation',
    label: 'Banques & Assurances',
    icon: 'ri-shield-check-line',
    hook: 'Le régulateur arrive — vous êtes prêt ?',
    pain: 'Non-conformités critiques, menace de sanctions, reporting tardif, 95+ points de contrôle à maîtriser',
    offer: 'Audit à blanc BCEAO/COBAC + Plan de remédiation + Dossier preuves',
    result: '100% conformité — Zéro sanction post-inspection',
  },
  {
    id: 'gouvernance',
    label: 'Investisseurs & Boards',
    icon: 'ri-search-eye-line',
    hook: 'Votre cible cache des failles de gouvernance ?',
    pain: '9 dossiers sur 10 révèlent des conflits d\'intérêts, un CA inopérant ou des risques non documentés',
    offer: 'Due Diligence Gouvernance + Audit Board + Rapport red flags',
    result: 'Rapport en 4 semaines — closing sécurisé',
  },
  {
    id: 'esg',
    label: 'Industries & ESG',
    icon: 'ri-leaf-line',
    hook: 'Vos actifs sont menacés par le risque carbone ?',
    pain: 'Exposition climatique non mesurée, reporting ISSB inexistant, perte de compétitivité face aux financements verts',
    offer: 'Bilan carbone + Stratégie décarbonation + Dossier investisseurs ISSB/GRI',
    result: 'Valorisation actifs sécurisée — Accès financements verts',
  },
  {
    id: 'kbr',
    label: 'Décideurs C-Level',
    icon: 'ri-brain-line',
    hook: 'Vos décisions manquent d\'intelligence actionnable ?',
    pain: 'Données fragmentées, absence de benchmark régional, pas de vision prospective réglementaire',
    offer: 'KBR-Model — Études sectorielles premium + Baromètres + Notes de conjoncture',
    result: 'Intelligence décisionnelle continue — 28 études/an — KOS Knowledge Graph',
  },
];

export default function OffreHero() {
  const [count, setCount] = useState(0);
  const [activeProfile, setActiveProfile] = useState(0);

  useEffect(() => {
    const target = 22;
    const step = Math.ceil(target / 40);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const profile = clientProfiles[activeProfile];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060e1c 0%, #0a1628 40%, #0d1f3c 100%)' }}
    >
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=professional%20african%20business%20executive%20in%20modern%20office%20reviewing%20financial%20charts%20and%20reports%20dark%20charcoal%20atmosphere%20green%20accent%20lighting%20corporate%20setting%20West%20Africa%20business%20district%20high%20contrast%20professional%20photography%20bokeh%20background%20sophisticated%20financial%20advisory%20environment%20dark%20charcoal%20tones%20with%20deloitte%20green%20accent%20lighting%20no%20blue%20no%20purple&width=1920&height=1080&seq=offre-hero-green&orientation=landscape"
          alt="KHEPRA EXPERTS — 4 Business Units 100% Big Four · Intelligence Réglementaire"
          className="w-full h-full object-cover object-top opacity-20"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(6,14,28,0.95) 0%, rgba(10,22,40,0.85) 50%, rgba(13,31,60,0.9) 100%)' }} />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(212,168,42,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,42,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #2E5FA3 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge urgence */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border" style={{ background: 'rgba(212,168,42,0.12)', borderColor: 'rgba(212,168,42,0.35)' }}>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>
            KOS™ — 4 Business Units 100% Big Four · Afrique Francophone
          </span>
        </div>

        {/* Titre principal */}
        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Intelligence Réglementaire,{' '}
          <span style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Gouvernance & ESG
          </span>
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/80">
            Standards Big Four · Réalités africaines
          </span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
          Nous intervenons là où les grands cabinets internationaux ne vont pas — avec leur niveau d'exigence et leur rigueur. Une seule mission : transformer votre organisation en machine à performance.
        </p>

        {/* Profile selector */}
        <div className="inline-flex bg-white/8 rounded-2xl p-1.5 mb-8 gap-1">
          {clientProfiles.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveProfile(i)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-300"
              style={{
                background: activeProfile === i ? 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)' : 'transparent',
                color: activeProfile === i ? '#0a1628' : 'rgba(255,255,255,0.6)',
              }}
            >
              <i className={`${p.icon} text-sm`} />
              {p.label}
            </button>
          ))}
        </div>

        {/* Active profile card */}
        <div className="max-w-2xl mx-auto mb-10 p-6 rounded-2xl text-left gradient-border-dark glow-gold-hover transition-all duration-300" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(212,168,42,0.15)' }}>
              <i className={`${profile.icon} text-lg`} style={{ color: '#86BC25' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white font-bold text-base">{profile.hook}</span>
              </div>
              <p className="text-white/50 text-sm mb-3">{profile.pain}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(212,168,42,0.15)', color: '#86BC25' }}>
                  <i className="ri-check-line mr-1" />{profile.offer}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400">
                  <i className="ri-trophy-line mr-1" />{profile.result}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
          {[
            { value: `${count}+`, label: 'Ans d\'expertise' },
            { value: '€500M+', label: 'Transactions évaluées' },
            { value: '15', label: 'Pays UEMOA/CEMAC' },
            { value: '100%', label: 'Conformité post-mission' },
          ].map((stat, i) => (
            <div key={i} className="py-4 px-3 rounded-xl gradient-border-dark glow-gold-hover transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(212,168,42,0.08)' }}>
              <div className="font-playfair text-2xl sm:text-3xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.open('https://calendly.com/essochamanu/consultation-strategique-30min', '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a1628' }}
          >
            <i className="ri-calendar-check-line text-xl" />
            Réserver un entretien stratégique
          </button>
          <a
            href="#offre-services"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{ border: '1px solid rgba(212,168,42,0.4)', color: '#86BC25', background: 'rgba(212,168,42,0.06)' }}
          >
            <i className="ri-arrow-down-line" />
            Voir nos 4 Business Units
          </a>
        </div>

        {/* Garantie */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
          <i className="ri-shield-check-line text-green-400" />
          <span>Sans engagement — Réponse sous 24h — Confidentialité garantie</span>
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




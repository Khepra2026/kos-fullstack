import { useState } from 'react';

const diagnosticLevels = [
  {
    id: 'flash',
    name: 'Diagnostic FLASH',
    duration: '30 minutes',
    format: 'Appel stratégique',
    price: 'GRATUIT',
    priceNote: 'Sans engagement',
    description: 'Un échange stratégique confidentiel pour identifier vos 3 priorités critiques et valider si un accompagnement KHEPRA est pertinent pour votre situation.',
    deliverables: [
      'Identification des 3 risques financiers prioritaires',
      'Recommandations d\'action immédiates',
      'Orientation vers l\'offre adaptée à votre profil',
    ],
    ideal: 'Dirigeants & DAF qui souhaitent une première opinion d\'expert',
    cta: 'Réserver maintenant',
    ctaAction: 'calendly',
    highlight: false,
    badge: null,
  },
  {
    id: 'standard',
    name: 'Diagnostic STANDARD',
    duration: '3-5 jours',
    format: 'Analyse documentaire + entretiens',
    price: 'Sur devis',
    priceNote: 'Devis personnalisé sous 48h',
    description: 'Analyse approfondie de votre situation financière et organisationnelle. Cartographie des risques, matrice de conformité, plan d\'action priorisé et modèle de projection financière sur 12 mois.',
    deliverables: [
      'Rapport d\'audit financier sur 3 exercices',
      'Cartographie des risques avec matrice de criticité',
      'Matrice de conformité BCEAO / OHADA / COBAC',
      'Plan d\'action priorisé avec Quick Wins identifiés',
      'Modèle de projection financière 12 mois',
    ],
    ideal: 'PME en croissance, SFD, IMF souhaitant un état des lieux complet',
    cta: 'Demander un devis',
    ctaAction: 'expert-modal',
    highlight: true,
    badge: 'Le plus populaire',
  },
  {
    id: 'premium',
    name: 'Diagnostic PREMIUM',
    duration: '2-4 semaines',
    format: 'Due diligence complète + terrain',
    price: 'Sur devis',
    priceNote: 'Investisseurs & projets complexes',
    description: 'Due diligence pluridisciplinaire (financière, légale, technique, ESG) conforme aux standards IFC et BAD. Idéal pour les transactions, les levées de fonds et les projets industriels à fort enjeu.',
    deliverables: [
      'Due diligence financière complète (IFRS / SYSCOHADA)',
      'Revue légale et réglementaire (OHADA, BCEAO, COBAC)',
      'Évaluation technique et opérationnelle',
      'Analyse ESG et conformité standards bailleurs',
      'Rapport red flags avec recommandations de négociation',
      'Modèle financier DCF et valorisation',
    ],
    ideal: 'Investisseurs, fonds PE/VC, bailleurs de développement, groupes industriels',
    cta: 'Contacter un expert',
    ctaAction: 'expert-modal',
    highlight: false,
    badge: null,
  },
];

export default function OffreDiagnostic() {
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', entreprise: '', niveau: 'standard', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeLevel, setActiveLevel] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      const res = await fetch('https://readdy.ai/api/form/d7j6n4rr53quj34gdf20', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ nom: '', email: '', telephone: '', entreprise: '', niveau: 'standard', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 100%)' }}
    >
      {/* Décor */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.35)' }}>
            <i className="ri-stethoscope-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>3 Niveaux de Diagnostic</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            Le diagnostic adapté à{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              votre enjeu
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            De l'appel gratuit 30 minutes à la due diligence pluridisciplinaire — choisissez le niveau qui correspond à votre situation et vos enjeux.
          </p>
        </div>

        {/* Level selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {diagnosticLevels.map((level, i) => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(i)}
              className={`relative text-left p-6 rounded-2xl cursor-pointer transition-all duration-300 gradient-border-dark glow-gold-hover ${activeLevel === i ? 'ring-2' : ''}`}
              style={{
                background: activeLevel === i ? 'rgba(212,168,42,0.12)' : 'rgba(255,255,255,0.04)',
                ['--tw-ring-color' as string]: activeLevel === i ? '#86BC25' : 'transparent',
              }}
            >
              {level.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold text-white rounded-full" style={{ background: '#86BC25', color: '#0a1628' }}>
                  {level.badge}
                </span>
              )}
              <div className="font-bold text-white mb-1">{level.name}</div>
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-time-line text-xs" style={{ color: '#86BC25' }} />
                <span className="text-xs text-white/50">{level.duration}</span>
              </div>
              <div className="font-playfair text-2xl font-bold" style={{ color: '#86BC25' }}>{level.price}</div>
              <div className="text-xs text-white/40 mt-0.5">{level.priceNote}</div>
            </button>
          ))}
        </div>

        {/* Active level detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-14">
          {/* Left: Level detail */}
          <div className="p-8 rounded-2xl gradient-border-dark glow-gold-hover transition-all duration-300" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="mb-6">
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">{diagnosticLevels[activeLevel].name}</h3>
              <div className="flex items-center gap-3 text-xs text-white/50 mb-4">
                <span className="flex items-center gap-1"><i className="ri-time-line" />{diagnosticLevels[activeLevel].duration}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><i className="ri-file-text-line" />{diagnosticLevels[activeLevel].format}</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{diagnosticLevels[activeLevel].description}</p>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#86BC25' }}>Livrables inclus</div>
              <div className="space-y-2.5">
                {diagnosticLevels[activeLevel].deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(212,168,42,0.15)' }}>
                      <i className="ri-check-line text-xs" style={{ color: '#86BC25' }} />
                    </div>
                    <span className="text-sm text-white/80 leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl mb-6" style={{ background: 'rgba(212,168,42,0.06)', border: '1px solid rgba(212,168,42,0.15)' }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#86BC25' }}>Idéal pour</div>
              <p className="text-sm text-white/70">{diagnosticLevels[activeLevel].ideal}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const level = diagnosticLevels[activeLevel];
                  if ((level as any).ctaAction === 'calendly') {
                    window.open('https://calendly.com/essochamanu/consultation-strategique-30min', '_blank', 'noopener,noreferrer');
                  } else {
                    window.dispatchEvent(new CustomEvent('open-expert-modal'));
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a1628' }}
              >
                <i className="ri-calendar-check-line text-lg" />
                {diagnosticLevels[activeLevel].cta}
              </button>
              <a
                href="tel:+22893984909"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
              >
                <i className="ri-phone-line" />
                +228 93 98 49 09
              </a>
            </div>
          </div>

          {/* Right: Formulaire */}
          <div
            className="p-8 rounded-2xl gradient-border-dark glow-gold-hover transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}
          >
            <h3 className="font-playfair text-xl font-bold text-white mb-2">
              Réservez votre créneau
            </h3>
            <p className="text-white/50 text-sm mb-6">Nous vous recontactons sous 24h pour confirmer votre rendez-vous.</p>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4" style={{ background: 'rgba(34,197,94,0.15)' }}>
                  <i className="ri-check-double-line text-3xl text-green-400" />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Demande envoyée !</h4>
                <p className="text-white/60 text-sm">Notre équipe vous contactera dans les 24h pour confirmer votre diagnostic.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-readdy-form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Nom complet *</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,168,42,0.2)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Entreprise</label>
                    <input
                      type="text"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleChange}
                      placeholder="Nom de votre société"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,168,42,0.2)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,168,42,0.2)' }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      placeholder="+228 XX XX XX XX"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,168,42,0.2)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Niveau de diagnostic</label>
                    <select
                      name="niveau"
                      value={formData.niveau}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all cursor-pointer"
                      style={{ background: 'rgba(20,30,50,0.95)', border: '1px solid rgba(212,168,42,0.2)' }}
                    >
                      <option value="flash">Diagnostic FLASH — Gratuit</option>
                      <option value="standard">Diagnostic STANDARD — Devis</option>
                      <option value="premium">Diagnostic PREMIUM — Due Diligence</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Votre principal défi (optionnel)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    maxLength={500}
                    placeholder="Décrivez brièvement votre situation ou votre principal besoin..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all resize-none"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,168,42,0.2)' }}
                  />
                  <div className="text-right text-xs text-white/30 mt-1">{formData.message.length}/500</div>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs">Une erreur est survenue. Veuillez réessayer ou nous contacter directement.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a1628' }}
                >
                  {status === 'submitting' ? (
                    <><i className="ri-loader-4-line animate-spin" /> Envoi en cours...</>
                  ) : (
                    <><i className="ri-calendar-check-line text-lg" /> Réserver mon Diagnostic</>
                  )}
                </button>

                <p className="text-center text-white/30 text-xs">
                  Sans engagement — Confidentialité garantie — Réponse sous 24h
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/10">
          {[
            { icon: 'ri-shield-check-line', label: '100% Confidentiel' },
            { icon: 'ri-time-line', label: 'Réponse sous 24h' },
            { icon: 'ri-gift-line', label: 'Diagnostic Flash gratuit' },
            { icon: 'ri-verified-badge-fill', label: 'Experts certifiés BCEAO' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/50">
              <i className={`${t.icon} text-green-400`} />
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
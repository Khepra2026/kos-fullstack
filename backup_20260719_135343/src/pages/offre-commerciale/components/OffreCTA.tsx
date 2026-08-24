import { Link } from 'react-router-dom';

export default function OffreCTA() {
  const etapes = [
    { num: '01', title: 'Contactez-nous', desc: 'Par WhatsApp, téléphone ou formulaire — réponse sous 24h.' },
    { num: '02', title: 'Diagnostic gratuit', desc: '30 minutes d\'échange stratégique avec un expert KHEPRA.' },
    { num: '03', title: 'Plan d\'action', desc: 'Recommandations concrètes et feuille de route personnalisée.' },
    { num: '04', title: 'Transformation', desc: 'Mise en œuvre accompagnée avec suivi des résultats.' },
  ];

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #ffffff 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Processus */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-route-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Comment ça marche ?</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
            Passez à l&apos;action en{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              4 étapes simples
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {etapes.map((e, i) => (
            <div key={i} className="relative text-center">
              {/* Connecteur */}
              {i < etapes.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[-50%] h-px" style={{ background: 'linear-gradient(90deg, rgba(212,168,42,0.4), transparent)' }} />
              )}
              <div
                className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4 font-playfair text-xl font-bold"
                style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)', color: '#86BC25', border: '1px solid rgba(212,168,42,0.2)' }}
              >
                {e.num}
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#0a1628' }}>{e.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* Lien blog DAF — maillage bidirectionnel */}
        <div className="mb-12 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-amber-200 flex-shrink-0">
            <i className="ri-article-line text-amber-600 text-xl"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">Ressource complémentaire</p>
            <h4 className="font-bold text-gray-900 text-base mb-1 leading-snug">
              Direction Financière Externalisée : le levier stratégique des PME africaines en 2025
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Découvrez en détail comment fonctionne un DAF externalisé, ses missions, son ROI et comment choisir le bon partenaire.
            </p>
          </div>
          <Link
            to="/blog/daf-externalise-pilotage-financier-pme-afrique/"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg"
          >
            Lire l&apos;article
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* CTA Final */}
        <div
          className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center"
          style={{ background: 'linear-gradient(160deg, #0a1628 0%, #1a2d4a 100%)', border: '1px solid rgba(212,168,42,0.2)' }}
        >
          {/* Décor */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.35)' }}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Disponible maintenant</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Votre diagnostic gratuit<br />
              <span style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                vous attend
              </span>
            </h2>

            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-base leading-relaxed">
              30 minutes qui peuvent transformer votre gestion financière. Sans engagement, sans risque — offert gratuitement.
            </p>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <button
                onClick={() => window.open('https://calendly.com/essochamanu/consultation-strategique-30min', '_blank', 'noopener,noreferrer')}
                className="flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #86BC25 0%, #6B9B1F 100%)', color: '#0a1628' }}
              >
                <i className="ri-calendar-check-line text-xl" />
                Réserver un entretien stratégique
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                className="flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid rgba(212,168,42,0.4)', color: '#86BC25', background: 'rgba(212,168,42,0.06)' }}
              >
                <i className="ri-mail-send-line text-xl" />
                Envoyer un message
              </button>
            </div>

            {/* Contacts directs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/10">
              <a
                href="tel:+22893984909"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer text-sm"
              >
                <i className="ri-phone-line" style={{ color: '#86BC25' }} />
                +228 93 98 49 09
              </a>
              <div className="w-px h-4 bg-white/20 hidden sm:block" />
              <a
                href="mailto:contact@khepraexperts.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer text-sm"
              >
                <i className="ri-mail-line" style={{ color: '#86BC25' }} />
                contact@khepraexperts.com
              </a>
              <div className="w-px h-4 bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <i className="ri-map-pin-2-line" style={{ color: '#86BC25' }} />
                Lomé, Togo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





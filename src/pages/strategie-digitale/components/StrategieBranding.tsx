import { BRANDING, SIMPLIFIED_OFFERS } from '@/mocks/digitalStrategySocial';

export default function StrategieBranding() {
  return (
    <section className="py-20 md:py-28 bg-brand-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
            <i className="ri-vip-crown-line text-gold-400" />
            <span className="text-xs font-bold text-gold-300 tracking-widest uppercase">Positionnement & Branding</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            "Investment & ESG Advisory Boutique"
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Repositionnement premium avec slogan, promesse claire et différenciation forte.
            Maximum 4 offres principales, noms internationaux, suppression des doublons.
          </p>
        </div>

        {/* Positionnement central */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-brand-900 to-brand-800 border border-gold-500/20 rounded-2xl p-8 md:p-10 text-center">
            <p className="text-sm text-gold-400 font-bold uppercase tracking-widest mb-3">Positionnement</p>
            <p className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
              {BRANDING.positioning.fr}
            </p>
            <p className="text-lg font-semibold text-gold-300 mb-4">
              "{BRANDING.tagline.fr}"
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
              {BRANDING.promise.fr}
            </p>
          </div>
        </div>

        {/* Les 4 offres simplifiées */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {SIMPLIFIED_OFFERS.map((offer, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: `${offer.color}15` }}
                >
                  <i className={`${offer.icon} text-xl`} style={{ color: offer.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white text-base group-hover:text-gold-300 transition-colors">
                    {offer.name.fr}
                  </h3>
                  <p className="text-xs text-gold-400 font-semibold mt-0.5">{offer.tagline.fr}</p>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{offer.description.fr}</p>
                  <p className="text-xs text-gray-500 mt-2">Cible : {offer.target.fr}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Différenciation */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
            <i className="ri-shield-star-line text-gold-400" />
            5 Différenciateurs Clés
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {BRANDING.differentiation.map((diff, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-gold-500/15 mb-3">
                  <span className="text-gold-400 font-bold text-lg">{i + 1}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{diff.fr}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ton de voix */}
        <div className="mt-8 grid md:grid-cols-5 gap-3">
          {BRANDING.toneOfVoice.map((tone, i) => (
            <div key={i} className="bg-white/3 border border-white/8 rounded-lg px-4 py-3 text-center">
              <p className="text-xs text-gray-400">{tone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
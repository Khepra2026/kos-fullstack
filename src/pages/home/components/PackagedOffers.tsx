import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OFFERS = [
  {
    id: 'diagnostic',
    badge: 'Gratuit',
    badgeColor: 'bg-emerald-500',
    icon: 'ri-stethoscope-line',
    title: 'Diagnostic Stratégique Express',
    tagline: 'Identifiez vos 3 priorités en 15 minutes',
    price: 'Gratuit',
    priceNote: 'Sans engagement',
    color: '#10b981',
    bg: 'from-emerald-950/60 to-emerald-900/40',
    features: [
      'Score de maturité organisationnelle',
      '3 priorités stratégiques identifiées',
      'Recommandations personnalisées',
      'Rapport PDF téléchargeable',
      'Comparaison sectorielle UEMOA',
    ],
    cta: 'Lancer mon diagnostic',
    href: '/tools/diagnostic-organisationnel',
    popular: false,
  },
  {
    id: 'gouvernance',
    badge: 'Le plus demandé',
    badgeColor: 'bg-gold-500',
    icon: 'ri-government-line',
    title: 'Structuration Gouvernance',
    tagline: 'CA opérationnel en 90 jours',
    price: 'Sur devis',
    priceNote: 'ROI garanti',
    color: '#86BC25',
    bg: 'from-amber-950/60 to-amber-900/40',
    features: [
      'Audit de gouvernance complet',
      'Charte du Conseil d\'Administration',
      'Comités spécialisés (Audit, RH, Risques)',
      'Formation des administrateurs',
      'Rapport CA automatisé mensuel',
      'Conformité OHADA garantie',
    ],
    cta: 'Demander un devis',
    href: '/contact',
    popular: true,
  },
  {
    id: 'performance',
    badge: 'ROI rapide',
    badgeColor: 'bg-blue-500',
    icon: 'ri-funds-line',
    title: 'Optimisation Performance',
    tagline: '+3 à 8pts de marge en 6 mois',
    price: 'Sur devis',
    priceNote: 'Résultats mesurables',
    color: '#3b82f6',
    bg: 'from-blue-950/60 to-blue-900/40',
    features: [
      'Pilotage financier & contrôle interne',
      'Contrôle interne & trésorerie',
      'Optimisation du BFR',
      'Reporting mensuel automatisé',
      'Conformité BCEAO/fiscale',
      'Tableau de bord dirigeant',
    ],
    cta: 'Voir l\'offre complète',
    href: '/offre-commerciale',
    popular: false,
  },
];

export default function PackagedOffers() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const openExpertModal = () => {
    window.dispatchEvent(new CustomEvent('open-expert-modal'));
  };

  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #060d1a 0%, #0a1628 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-400/30 text-gold-300 px-4 py-2 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
            <i className="ri-gift-line" />
            Offres packagées — Résultats garantis
          </div>
          <h2 className="font-playfair text-4xl font-bold text-white mb-5">
            Choisissez votre niveau<br />
            <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              d'accompagnement
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            De l'outil gratuit à la mission complète — chaque offre est conçue pour générer un ROI mesurable dès les premiers mois.
          </p>
        </div>

        {/* Offers grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {OFFERS.map((offer) => (
            <div
              key={offer.id}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${offer.popular ? 'border-gold-400 ring-2 ring-gold-400/20 scale-105' : 'border-white/10 hover:border-white/20'}`}
              onClick={() => navigate(offer.href)}
            >
              {/* Popular badge */}
              {offer.popular && (
                <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#060d1a' }}>
                  ⭐ Le plus demandé par les dirigeants africains
                </div>
              )}

              <div className={`bg-gradient-to-br ${offer.bg} p-6 h-full flex flex-col`} style={{ paddingTop: offer.popular ? '3rem' : '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                {/* Badge */}
                <span className={`inline-block px-3 py-1 text-white text-xs font-bold rounded-full mb-4 ${offer.badgeColor}`}>{offer.badge}</span>

                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${offer.color}20`, border: `1px solid ${offer.color}40` }}>
                    <i className={`${offer.icon} text-xl`} style={{ color: offer.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">{offer.title}</h3>
                    <p className="text-xs italic mt-0.5" style={{ color: offer.color }}>{offer.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5 pb-5 border-b border-white/10">
                  <div className="text-2xl font-black text-white">{offer.price}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{offer.priceNote}</div>
                </div>

                {/* Features */}
                <div className="space-y-2.5 flex-1 mb-6">
                  {offer.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2.5">
                      <i className="ri-check-line text-sm flex-shrink-0 mt-0.5" style={{ color: offer.color }} />
                      <span className="text-xs text-gray-300 leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(offer.href); }}
                  className="w-full py-3 rounded-xl font-bold text-sm cursor-pointer transition-all hover:opacity-90 whitespace-nowrap"
                  style={offer.popular
                    ? { background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#060d1a' }
                    : { background: `${offer.color}20`, color: offer.color, border: `1px solid ${offer.color}40` }
                  }
                >
                  {offer.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA unifié */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-6 italic">
            &ldquo;{isEn ? 'Every month without strategic structuring costs you more than you think' : 'Chaque mois sans structuration stratégique vous coûte plus que vous ne pensez'}&rdquo;
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={openExpertModal}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#060d1a', boxShadow: '0 8px 32px rgba(212,168,42,0.30)' }}
            >
              <i className="ri-calendar-check-line text-lg" />
              {isEn ? 'Book a strategic consultation' : 'Réserver un entretien stratégique'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

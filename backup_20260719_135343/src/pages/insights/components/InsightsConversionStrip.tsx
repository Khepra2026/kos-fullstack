import { useNavigate } from 'react-router-dom';

export default function InsightsConversionStrip() {
  const navigate = useNavigate();

  const offers = [
    {
      icon: 'ri-search-eye-line',
      title: 'Audit Gouvernance',
      desc: 'Diagnostic complet de votre gouvernance d\'entreprise selon les standards OHADA et BCEAO.',
      cta: 'Demander un audit',
      href: '/contact',
      color: 'border-gold-400',
      iconBg: 'bg-gold-50',
      iconColor: 'text-gold-600',
    },
    {
      icon: 'ri-file-chart-line',
      title: 'Structuration Reporting',
      desc: 'Mise en place d\'un système de reporting financier et opérationnel adapté à votre structure.',
      cta: 'Structurer mon reporting',
      href: '/offre-commerciale',
      color: 'border-brand-400',
      iconBg: 'bg-brand-50',
      iconColor: 'text-brand-700',
    },
    {
      icon: 'ri-funds-line',
      title: 'DAF Externalisée',
      desc: 'Direction financière externalisée pour PME et ONG : trésorerie, banques, conformité fiscale.',
      cta: 'Découvrir l\'offre',
      href: '/blog/daf-externalise-pilotage-financier-pme-afrique/',
      color: 'border-strategic-400',
      iconBg: 'bg-strategic-50',
      iconColor: 'text-strategic-600',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-900/8 border border-brand-900/15 text-brand-900 px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
            <i className="ri-vip-crown-line" />
            Missions de conseil à forte valeur
          </div>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-3">
            Votre rapport est prêt. Et maintenant ?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Nos experts transforment vos analyses en plans d'action concrets. Choisissez l'accompagnement adapté à votre situation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {offers.map((offer, i) => (
            <div key={i} className={`group rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${offer.color}`}
              onClick={() => navigate(offer.href)}>
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${offer.iconBg}`}>
                <i className={`${offer.icon} text-2xl ${offer.iconColor}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{offer.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{offer.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 group-hover:text-gold-600 transition-colors">
                {offer.cta} <i className="ri-arrow-right-line" />
              </span>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-gradient-to-r from-brand-950 to-brand-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 flex items-center justify-center bg-gold-500/20 rounded-2xl flex-shrink-0">
              <i className="ri-customer-service-2-line text-3xl text-gold-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Parlez à un expert Khepra maintenant</p>
              <p className="text-gray-300 text-sm mt-1">Réponse garantie sous 24h — Consultation initiale gratuite</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #d4af37)', color: '#0a0a0a' }}>
              <i className="ri-calendar-check-line text-lg" />
              Réserver un entretien
            </button>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white cursor-pointer whitespace-nowrap transition-all hover:scale-105"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              <i className="ri-mail-send-line" />
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}





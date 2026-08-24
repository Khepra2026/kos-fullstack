const CLIENTS = [
  { type: 'PME', icon: 'ri-building-2-line', count: '250+', label: 'PME accompagnées' },
  { type: 'Banques', icon: 'ri-bank-line', count: '45+', label: 'Institutions financières' },
  { type: 'ONG', icon: 'ri-heart-line', count: '120+', label: 'ONG & Associations' },
  { type: 'SFD', icon: 'ri-hand-coin-line', count: '80+', label: 'SFD & Microfinance' },
];

const CERTIFICATIONS = [
  { icon: 'ri-shield-check-fill', label: 'Conforme BCEAO', desc: 'Directives prudentielles UEMOA' },
  { icon: 'ri-scales-3-line', label: 'Standard OHADA', desc: 'Acte uniforme révisé' },
  { icon: 'ri-award-fill', label: 'Méthodologie Big4', desc: 'Inspirée des cabinets internationaux' },
  { icon: 'ri-global-line', label: 'Couverture UEMOA', desc: 'Togo, Bénin, Côte d\'Ivoire, Sénégal...' },
];

const TESTIMONIALS = [
  {
    quote: "Grâce à KHEPRA EXPERTS, notre Conseil d'Administration dispose enfin d'un reporting structuré qui nous permet de prendre des décisions éclairées. Un outil indispensable pour notre gouvernance.",
    name: 'Directeur Général',
    role: 'Directeur Général',
    org: 'Banque régionale, Togo',
    country: 'Togo',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20african%20male%20executive%20director%20portrait%20formal%20business%20attire%20confident%20smile%20corporate%20headshot%20warm%20studio%20lighting&width=80&height=80&seq=testimonial1-board&orientation=squarish',
  },
  {
    quote: "Le Board Report généré par KHEPRA nous a permis de convaincre nos bailleurs de fonds en présentant une gouvernance irréprochable. Notre accès au financement a été facilité de 40%.",
    name: 'Secrétaire Générale',
    role: 'Secrétaire Générale',
    org: 'ONG Développement, Afrique de l\'Ouest',
    country: 'Sénégal',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20african%20female%20executive%20secretary%20general%20portrait%20formal%20business%20attire%20confident%20smile%20corporate%20headshot%20warm%20studio%20lighting&width=80&height=80&seq=testimonial2-board&orientation=squarish',
  },
  {
    quote: "En tant que DAF, j'avais besoin d'un outil de reporting CA conforme aux exigences BCEAO. KHEPRA EXPERTS a transformé notre processus de gouvernance en moins d'un mois.",
    name: 'Directeur Financier',
    role: 'Directeur Administratif & Financier',
    org: 'Groupe Industriel, Afrique francophone',
    country: "Côte d'Ivoire",
    avatar: 'https://readdy.ai/api/search-image?query=professional%20african%20male%20CFO%20financial%20director%20portrait%20formal%20business%20attire%20confident%20smile%20corporate%20headshot%20warm%20studio%20lighting&width=80&height=80&seq=testimonial3-board&orientation=squarish',
  },
];

export default function BoardCredibility() {
  return (
    <section id="comment-ca-marche" className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #f8f6f0 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-trophy-line text-xs" style={{ color: '#86BC25' }}></i>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6B9B1F' }}>Cabinet de référence en Afrique francophone</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi faire confiance à{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              KHEPRA EXPERTS ?
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Plus de 20 ans d&apos;expertise en gouvernance, conformité et performance financière au service des organisations africaines.
          </p>
        </div>

        {/* Clients par type */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CLIENTS.map((c, i) => (
            <div key={i} className="text-center py-6 px-4 rounded-2xl" style={{ background: 'white', border: '1px solid rgba(212,168,42,0.15)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl mx-auto mb-3" style={{ background: 'rgba(212,168,42,0.1)' }}>
                <i className={`${c.icon} text-xl`} style={{ color: '#86BC25' }}></i>
              </div>
              <p className="font-playfair text-3xl font-bold mb-1" style={{ color: '#0a1628' }}>{c.count}</p>
              <p className="text-xs text-gray-500">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: 'white', border: '1px solid #f0ebe0' }}>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(212,168,42,0.1)' }}>
                <i className={`${cert.icon} text-lg`} style={{ color: '#86BC25' }}></i>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-0.5">{cert.label}</p>
                <p className="text-xs text-gray-500">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="relative p-6 rounded-2xl" style={{ background: 'white', border: '1px solid rgba(212,168,42,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
              {/* Guillemets décoratifs */}
              <div className="absolute top-4 right-5 font-playfair text-6xl leading-none select-none" style={{ color: 'rgba(212,168,42,0.12)' }}>&ldquo;</div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <i key={j} className="ri-star-fill text-sm" style={{ color: '#86BC25' }}></i>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5 italic relative z-10">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: 'rgba(212,168,42,0.3)' }}>
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" width={40} height={40} loading="lazy" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                  <p className="text-xs" style={{ color: '#86BC25' }}>{t.org} · {t.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bande logos partenaires */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Reconnu par les institutions de référence</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['BCEAO', 'OHADA', 'UEMOA', 'CGAP', 'AFD', 'Banque Mondiale'].map((logo, i) => (
              <div key={i} className="px-5 py-2.5 rounded-lg" style={{ background: '#f8f6f0', border: '1px solid rgba(212,168,42,0.15)' }}>
                <span className="font-bold text-sm" style={{ color: '#0a1628' }}>{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}





const STEPS = [
  {
    num: '01',
    icon: 'ri-file-list-3-line',
    title: 'Remplissez le formulaire',
    desc: 'Répondez à 5 étapes de questions sur votre gouvernance, performance financière, stratégie et risques. Moins de 15 minutes.',
    color: '#86BC25',
  },
  {
    num: '02',
    icon: 'ri-cpu-line',
    title: 'Analyse intelligente',
    desc: 'Notre algorithme analyse vos réponses selon les standards BCEAO, OHADA et les meilleures pratiques de gouvernance internationale.',
    color: '#22c55e',
  },
  {
    num: '03',
    icon: 'ri-file-chart-2-line',
    title: 'Rapport généré',
    desc: 'Votre Board Report structuré est généré instantanément avec un score de gouvernance, des analyses par domaine et des recommandations.',
    color: '#3b82f6',
  },
  {
    num: '04',
    icon: 'ri-customer-service-2-line',
    title: 'Accompagnement expert',
    desc: 'Optionnellement, nos experts KHEPRA valident et enrichissent votre rapport pour un document professionnel prêt à présenter.',
    color: '#f59e0b',
  },
];

const USE_CASES = [
  { icon: 'ri-presentation-line', title: 'Réunions du Conseil', desc: 'Préparez des présentations structurées et professionnelles pour vos administrateurs' },
  { icon: 'ri-bank-line', title: 'Dossiers bancaires', desc: 'Renforcez vos dossiers de financement avec une gouvernance documentée' },
  { icon: 'ri-global-line', title: 'Bailleurs de fonds', desc: 'Répondez aux exigences de gouvernance des partenaires internationaux' },
  { icon: 'ri-shield-check-line', title: 'Audits réglementaires', desc: 'Préparez vos audits BCEAO avec un reporting conforme et structuré' },
  { icon: 'ri-user-star-line', title: 'Investisseurs', desc: 'Démontrez la solidité de votre gouvernance aux investisseurs potentiels' },
  { icon: 'ri-award-line', title: 'Certifications', desc: 'Documentez votre gouvernance pour les processus de certification ISO' },
];

export default function BoardHowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Comment ça marche */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <i className="ri-route-line text-xs" style={{ color: '#86BC25' }}></i>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6B9B1F' }}>Processus simple & rapide</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment générer votre{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Board Report
            </span>{' '}
            en 4 étapes ?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Sans compétence technique requise. Résultat professionnel en moins de 30 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STEPS.map((s, i) => (
            <div key={i} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] right-[-50%] h-px" style={{ background: 'linear-gradient(90deg, rgba(212,168,42,0.4), transparent)' }} />
              )}
              <div className="text-center">
                <div className="relative inline-flex mb-5">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl" style={{ background: `${s.color}12`, border: `1.5px solid ${s.color}30` }}>
                    <i className={`${s.icon} text-3xl`} style={{ color: s.color }}></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full font-bold text-xs" style={{ background: s.color, color: '#fff' }}>
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cas d'usage */}
        <div className="rounded-3xl p-10 lg:p-14" style={{ background: 'linear-gradient(135deg, #f8f6f0 0%, #fdf9f0 100%)', border: '1px solid rgba(212,168,42,0.15)' }}>
          <div className="text-center mb-10">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Pour quels usages ?
            </h3>
            <p className="text-gray-500 text-sm">Votre Board Report KHEPRA s&apos;adapte à tous vos besoins de gouvernance</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white" style={{ border: '1px solid rgba(212,168,42,0.12)' }}>
                <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(212,168,42,0.1)' }}>
                  <i className={`${uc.icon} text-lg`} style={{ color: '#86BC25' }}></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{uc.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgence */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-red-700">
              Nombre limité d&apos;analyses gratuites disponibles cette semaine — Agissez maintenant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}





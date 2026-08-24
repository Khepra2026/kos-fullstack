import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/base/OptimizedImage';

export default function ServicesConversionTunnel() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      icon: 'ri-stethoscope-line',
      title: 'Diagnostic gratuit',
      desc: 'En 15 minutes, identifiez vos 3 priorités stratégiques. Score + recommandations personnalisées.',
      cta: 'Lancer le diagnostic',
      href: '/tools/diagnostic-organisationnel',
      color: '#86BC25',
      badge: 'Gratuit · 15 min',
    },
    {
      num: '02',
      icon: 'ri-file-chart-line',
      title: 'Offre personnalisée',
      desc: 'Sur la base de votre diagnostic, nos experts vous proposent un plan d\'action sur-mesure avec ROI estimé.',
      cta: 'Voir l\'offre commerciale',
      href: '/offre-commerciale',
      color: '#86BC25',
      badge: 'Sous 48h',
    },
    {
      num: '03',
      icon: 'ri-rocket-line',
      title: 'Mission & Résultats',
      desc: 'Déploiement de la mission avec suivi mensuel, KPIs mesurables et rapport d\'impact trimestriel.',
      cta: 'Voir nos réalisations',
      href: '/case-studies',
      color: '#86BC25',
      badge: 'ROI garanti',
    },
  ];

  const testimonials = [
    {
      quote: 'Khepra Experts a structuré notre gouvernance en 3 mois. Notre CA est maintenant opérationnel et nos investisseurs ont confiance.',
      name: 'Directeur Général',
      org: 'PME industrielle, Côte d\'Ivoire',
      result: '+40% vitesse décisionnelle',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20African%20business%20executive%20man%20portrait%20confident%20formal%20suit%20corporate%20headshot%20studio%20lighting%20leadership&width=80&height=80&seq=testimonial-dg-ci&orientation=squarish',
    },
    {
      quote: 'La DAF externalisée nous a permis de récupérer 6 points de marge en 6 mois. Un investissement qui se rembourse seul.',
      name: 'Directeur Administratif et Financier',
      org: 'ONG internationale, Sénégal',
      result: '+6pts de marge nette',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20African%20woman%20executive%20portrait%20confident%20formal%20attire%20corporate%20headshot%20studio%20lighting%20finance%20director&width=80&height=80&seq=testimonial-daf-sn&orientation=squarish',
    },
    {
      quote: 'Grâce à Khepra, nous avons obtenu notre conformité BCEAO en 4 mois et levé 2M€ auprès d\'un fonds d\'impact.',
      name: 'Président Directeur Général',
      org: 'Institution de microfinance, Togo',
      result: '2M€ levés post-conformité',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20African%20man%20executive%20portrait%20confident%20formal%20suit%20corporate%20headshot%20studio%20lighting%20CEO%20microfinance&width=80&height=80&seq=testimonial-pdg-tg&orientation=squarish',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tunnel de conversion */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 text-gold-700 px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
            <i className="ri-route-line" />
            Tunnel Services → Résultats
          </div>
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            De votre problème à vos résultats
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Un processus en 3 étapes, conçu pour minimiser votre effort et maximiser votre ROI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-gold-400 via-emerald-400 to-blue-400 z-0" />

          {steps.map((step, i) => (
            <div key={i}
              className={`relative group rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 z-10 bg-white ${activeStep === i ? 'border-transparent ring-2' : 'border-gray-100 hover:border-gray-200'}`}
              style={activeStep === i ? { borderColor: step.color } : {}}
              onClick={() => setActiveStep(i)}>
              {/* Step number */}
              <div className="absolute -top-4 left-6 px-3 py-1 rounded-full text-xs font-black text-white" style={{ background: step.color }}>
                {step.num}
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 mt-2" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                <i className={`${step.icon} text-2xl`} style={{ color: step.color }} />
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: `${step.color}15`, color: step.color }}>{step.badge}</span>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{step.desc}</p>
              <a href={step.href} onClick={(e) => { e.stopPropagation(); e.preventDefault(); navigate(step.href); }}
                className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer transition-all hover:gap-3 whitespace-nowrap"
                style={{ color: step.color }}>
                {step.cta} <i className="ri-arrow-right-line" />
              </a>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
            Ce que disent nos clients
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <i key={si} className="ri-star-fill text-gold-500 text-sm" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <OptimizedImage
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full"
                      width={40}
                      height={40}
                      aspectRatio="1/1"
                      objectFit="cover"
                      loading="lazy"
                      placeholder="pulse"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{t.name}</p>
                    <p className="text-xs text-gray-500 truncate">{t.org}</p>
                  </div>
                  <span className="flex-shrink-0 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg whitespace-nowrap">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA block */}
        <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)' }}>
          <div className="p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 text-gold-300 px-4 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                <i className="ri-time-line" />
                Nombre limité de diagnostics gratuits par semaine
              </div>
              <h3 className="font-playfair text-3xl font-bold text-white mb-4">
                Votre diagnostic gratuit vous attend
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                En 15 minutes, identifiez vos 3 priorités stratégiques et recevez un plan d'action personnalisé. Sans engagement. Sans jargon.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: 'ri-time-line', label: '15 minutes' },
                  { icon: 'ri-shield-check-line', label: 'Sans engagement' },
                  { icon: 'ri-gift-line', label: '100% gratuit' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <i className={`${f.icon} text-gold-400`} />
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <a href="/tools/diagnostic-organisationnel" onClick={(e) => { e.preventDefault(); navigate('/tools/diagnostic-organisationnel'); }}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base cursor-pointer transition-all hover:scale-105 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}>
                <i className="ri-stethoscope-line text-xl" />
                Lancer mon diagnostic gratuit
              </a>
              <a href="/board-report" onClick={(e) => { e.preventDefault(); navigate('/board-report'); }}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base text-white border border-white/20 hover:border-gold-400/50 cursor-pointer transition-all whitespace-nowrap">
                <i className="ri-file-chart-line text-xl" />
                Générer mon rapport CA
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                className="flex items-center justify-center gap-3 py-3 rounded-2xl font-bold text-sm cursor-pointer transition-all whitespace-nowrap"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,168,42,0.3)', color: '#86BC25' }}>
                <i className="ri-customer-service-2-line text-lg" />
                Réserver un entretien stratégique
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





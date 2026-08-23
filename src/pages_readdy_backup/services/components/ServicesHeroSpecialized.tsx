import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrochureDownload } from '@/hooks/useBrochureDownload';
import OptimizedImage from '@/components/base/OptimizedImage';

const hooks = [
  'Vous investissez sans due diligence rigoureuse ? 60% des transactions africaines échouent par manque de transparence préalable.',
  'Un projet industriel sans étude de faisabilité intégrée = 3× plus de dépassements de budget et 2× plus de retards.',
  '9 dossiers de financement sur 10 échouent avant la première réunion — la gouvernance et le financier éliminent avant la négociation.',
  'Les bailleurs internationaux exigent un reporting ESG structuré — sans lui, l\'accès aux financements concessionnels est bloqué.',
];

export default function ServicesHeroSpecialized() {
  const navigate = useNavigate();
  const [hookIdx, setHookIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const { handleDownload, isDownloading } = useBrochureDownload('other');

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setHookIdx(i => (i + 1) % hooks.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #141414 100%)' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="https://readdy.ai/api/search-image?query=Dark%20charcoal%20corporate%20advisory%20office%20interior%20panoramic%20view%20African%20financial%20district%20skyline%20at%20dusk%20through%20floor%20to%20ceiling%20glass%20windows%20green%20accent%20lighting%20modern%20minimalist%20desk%20with%20financial%20documents%20and%20governance%20frameworks%20premium%20institutional%20atmosphere%20dark%20charcoal%20tones%20with%20deloitte%20green%20accent%20lighting%20professional%20consulting%20environment%20no%20blue%20no%20purple&width=1920&height=1080&seq=services-hero-specialized-v2&orientation=landscape"
          alt="Khepra Experts Services - Due Diligence et structuration de projets en Afrique"
          className="w-full h-full"
          width={1920}
          height={1080}
          aspectRatio="16/9"
          objectFit="cover"
          loading="eager"
          fetchpriority="high"
          placeholder="none"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,12,24,0.92) 0%, rgba(9,21,40,0.88) 50%, rgba(13,28,54,0.75) 100%)' }} />
      </div>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      {/* Gold glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 65%)' }} />
      {/* Subtle green glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            {/* Badge positionnement */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.3)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#86BC25' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
                3 Business Units — Architecture 4 Niveaux (Diagnostic → Abonnement)
              </span>
            </div>

            {/* Rotating hook */}
            <div className={`mb-6 transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="inline-flex items-start gap-3 bg-red-500/15 border border-red-400/30 px-4 py-3 rounded-xl max-w-lg">
                <i className="ri-error-warning-line text-red-400 text-lg flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm font-semibold leading-tight">{hooks[hookIdx]}</p>
              </div>
            </div>

            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Sécurisez chaque<br />
              <span style={{ background: 'linear-gradient(90deg, #86BC25, #f4d03f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                décision
              </span>{' '}
              à haut enjeu
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Nous ne faisons pas tout. Nous excellons sur 3 Business Units pour dirigeants, investisseurs et institutions financières en Afrique francophone. Architecture 4 niveaux : Diagnostic gratuit → Mission Premium → Accompagnement → Abonnement.
            </p>

            {/* 4 offres quick view */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Régulation Financière', sublabel: 'BCEAO/COBAC · Inspection · Due Diligence', icon: 'ri-shield-flash-line', color: '#86BC25', slug: '/services/audit-pre-inspection-bceao' },
                { label: 'Prix de Transfert & Fiscalité', sublabel: 'OCDE BEPS · Documentation · Défense', icon: 'ri-scales-3-line', color: '#86BC25', slug: '/services/gouvernance-fiscalite-internationale' },
                { label: 'Gouvernance, Risques & Conformité', sublabel: 'ERM · Conseil · CEO Advisory · ESG', icon: 'ri-shield-star-line', color: '#86BC25', slug: '/services/family-office-afrique' },
              ].map((bu, i) => (
                <button
                  key={i}
                  onClick={() => navigate(bu.slug)}
                  className="flex flex-col items-start gap-2 px-4 py-4 rounded-xl text-left cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${bu.color}15`, border: `1px solid ${bu.color}30` }}>
                      <i className={`${bu.icon} text-sm`} style={{ color: bu.color }} />
                    </div>
                    <span className="text-sm font-bold text-white">{bu.label}</span>
                  </div>
                  <span className="text-xs text-gray-400 pl-11">{bu.sublabel}</span>
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a href="/tools/diagnostic-organisationnel" onClick={(e) => { e.preventDefault(); navigate('/tools/diagnostic-organisationnel'); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}>
                <i className="ri-stethoscope-line" />
                Diagnostic gratuit — 15 min
              </a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white border border-white/30 hover:border-gold-400 hover:text-gold-300 cursor-pointer whitespace-nowrap transition-all">
                <i className="ri-customer-service-2-line" />
                Parler à un expert
              </a>
              <a
                href="#brochure"
                onClick={(e) => { e.preventDefault(); handleDownload(); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-all hover:opacity-90 no-underline"
                style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.35)', color: '#f4d03f' }}
              >
                {isDownloading ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-file-download-line" />}
                Télécharger la brochure PDF
              </a>
            </div>
          </div>

          {/* Right: Problem → Solution visual spécialisé investisseurs */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Problem card */}
              <div className="bg-red-950/60 border border-red-500/30 rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-red-500/20 rounded-lg">
                    <i className="ri-close-circle-line text-red-400" />
                  </div>
                  <span className="text-red-300 font-bold text-sm">Situation de l'investisseur/promoteur</span>
                </div>
                <div className="space-y-2">
                  {[
                    'Dossier investisseur incomplet — rejet avant la 1ère réunion',
                    'Projet sans étude de faisabilité rigoureuse — surcoûts de 3×',
                    'Due diligence insuffisante — risques cachés non détectés',
                    'Gouvernance non structurée — conformité BCEAO à risque',
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-red-200">
                      <i className="ri-arrow-right-s-line text-red-400 flex-shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center mb-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-red-400 to-gold-400" />
                  <div className="w-8 h-8 flex items-center justify-center bg-gold-500 rounded-full">
                    <i className="ri-arrow-down-line text-white font-bold" />
                  </div>
                  <div className="w-0.5 h-6 bg-gradient-to-b from-gold-400 to-emerald-400" />
                </div>
              </div>

              {/* Solution card */}
              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/20 rounded-lg">
                    <i className="ri-check-double-line text-emerald-400" />
                  </div>
                  <span className="text-emerald-300 font-bold text-sm">Après Khepra Experts</span>
                </div>
                <div className="space-y-2">
                  {[
                    'Dossier bankable conforme BAD/BIDC/IFC — acceptation comité',
                    'Étude intégrée — VAN, TRI, DSCR, sensibilité 10 ans',
                    'Due diligence pluridisciplinaire — vision 360° de la cible',
                    'Conformité BCEAO/OHADA 100% — zéro sanction post-mission',
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-emerald-200">
                      <i className="ri-check-line text-emerald-400 flex-shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-gold-500 text-brand-900 px-3 py-2 rounded-xl font-bold text-xs text-center shadow-xl">
                <div className="text-lg font-black">€500M+</div>
                <div>transactions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar spécialisé */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 justify-center">
          {[
            { icon: 'ri-award-line', label: '22 ans d\'expertise terrain' },
            { icon: 'ri-global-line', label: '15 pays UEMOA/CEMAC' },
            { icon: 'ri-funds-line', label: '€500M+ de transactions évaluées' },
            { icon: 'ri-shield-check-line', label: '100% conformité post-mission' },
            { icon: 'ri-stack-line', label: '3 Business Units — Architecture 4 Niveaux' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <i className={`${t.icon} text-gold-500`} />
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




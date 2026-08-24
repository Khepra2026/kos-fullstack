import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function BlogRelatedLinks() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const relatedLinks = [
    {
      icon: 'ri-service-line',
      title: isEn ? 'Our Services' : 'Nos Services',
      description: isEn 
        ? 'Discover our expertise in governance, finance and strategic consulting' 
        : 'Découvrez notre expertise en gouvernance, finance et conseil stratégique',
      link: '/services',
      color: 'from-brand-500 to-brand-600',
    },
    {
      icon: 'ri-file-download-line',
      title: isEn ? 'Free Resources' : 'Ressources gratuites',
      description: isEn 
        ? 'Download our practical guides and tools for your business' 
        : 'Téléchargez nos guides pratiques et outils pour votre entreprise',
      link: '/resources',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'ri-radar-line',
      title: isEn ? 'African Regulatory Observatory' : 'Observatoire Réglementaire Africain',
      description: isEn
        ? '8 regulators, 1,247 texts tracked — BCEAO, COBAC, CIMA, COSUMAF and more'
        : '8 régulateurs, 1 247 textes suivis — BCEAO, COBAC, CIMA, COSUMAF et plus',
      link: '/observatoire-reglementaire-africain',
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      icon: 'ri-shield-check-line',
      title: isEn ? 'Africa Licensing Hub' : 'Hub Agréments Afrique',
      description: isEn
        ? '6 license types — Banks, EMF/SFD, FinTech, PSP, Insurance CIMA, Financial Markets'
        : '6 types d\'agrément — Banques, EMF/SFD, FinTech, PSP, Assurance CIMA, Marchés Financiers',
      link: '/agrements-afrique',
      color: 'from-gold-500 to-gold-700',
    },
    {
      icon: 'ri-file-list-3-line',
      title: isEn ? 'Digital Compliance Factory' : 'Digital Compliance Factory',
      description: isEn
        ? '78 compliance documents — policies, procedures, risk maps, control matrices'
        : '78 documents de conformité — politiques, procédures, cartographies des risques, matrices de contrôle',
      link: '/digital-compliance-factory',
      color: 'from-slate-500 to-slate-700',
    },
    {
      icon: 'ri-bar-chart-2-line',
      title: isEn ? 'Compliance Score (Free)' : 'Score de Conformité (Gratuit)',
      description: isEn
        ? 'Evaluate your regulatory maturity in 6 domains — governance, AML, prudential, risk, digital, ESG'
        : 'Évaluez votre maturité réglementaire en 6 domaines — gouvernance, LBC/FT, prudentiel, risques, digital, ESG',
      link: '/compliance-score',
      color: 'from-teal-500 to-teal-700',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-left mb-10">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-3">
            {isEn ? 'Go Further with KOS' : 'Aller plus loin avec KOS'}
          </h2>
          <p className="text-gray-600">
            {isEn 
              ? 'Explore our strategic resources, regulatory intelligence tools, and compliance solutions' 
              : 'Explorez nos ressources stratégiques, outils d\'intelligence réglementaire et solutions de conformité'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {relatedLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => navigate(link.link)}
              className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-gold-300 hover:shadow-lg transition-all cursor-pointer text-left"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${link.icon} text-white text-xl`}></i>
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-2 group-hover:text-gold-700 transition-colors">
                {link.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {link.description}
              </p>
              <div className="flex items-center gap-2 text-gold-700 font-medium text-sm group-hover:gap-3 transition-all">
                <span>{isEn ? 'Explore' : 'Explorer'}</span>
                <i className="ri-arrow-right-line"></i>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}




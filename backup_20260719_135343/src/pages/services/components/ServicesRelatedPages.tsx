import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ServicesRelatedPages() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const relatedPages = [
    {
      icon: 'ri-article-line',
      title: isEn ? 'Blog & Insights' : 'Blog & Analyses',
      description: isEn 
        ? 'Expert articles on governance, finance and entrepreneurship in Africa' 
        : 'Articles d\'experts sur la gouvernance, la finance et l\'entrepreneuriat en Afrique',
      link: '/blog',
      color: 'from-brand-500 to-brand-600',
    },
    {
      icon: 'ri-briefcase-line',
      title: isEn ? 'Case Studies' : 'Études de cas',
      description: isEn 
        ? 'Discover our successful projects and concrete results for our clients' 
        : 'Découvrez nos projets réussis et les résultats concrets pour nos clients',
      link: '/case-studies',
      color: 'from-gold-500 to-gold-600',
    },
    {
      icon: 'ri-file-download-line',
      title: isEn ? 'Free Resources' : 'Ressources gratuites',
      description: isEn 
        ? 'Download our practical guides, checklists and tools for your business' 
        : 'Téléchargez nos guides pratiques, checklists et outils pour votre entreprise',
      link: '/resources',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'SFD Conformité',
      description: isEn 
        ? 'Specialized support for microfinance institutions and financial services' 
        : 'Accompagnement spécialisé pour les institutions de microfinance et services financiers',
      link: '/sfd-conformite',
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 rounded-full mb-4">
            <i className="ri-links-line text-gold-700"></i>
            <span className="text-sm font-medium text-gold-900">
              {isEn ? 'Explore More' : 'Explorer davantage'}
            </span>
          </div>
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            {isEn ? 'Related Pages' : 'Pages connexes'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isEn 
              ? 'Continue your exploration and discover our other resources to support your growth' 
              : 'Poursuivez votre exploration et découvrez nos autres ressources pour accompagner votre croissance'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedPages.map((page, index) => (
            <button
              key={index}
              onClick={() => navigate(page.link)}
              className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-gold-300 hover:shadow-xl transition-all cursor-pointer text-left gradient-border glow-gold-hover"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${page.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-gold-700 transition-colors">
                {page.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {page.description}
              </p>
              <div className="flex items-center gap-2 text-gold-700 font-medium text-sm group-hover:gap-3 transition-all">
                <span>{isEn ? 'Discover' : 'Découvrir'}</span>
                <i className="ri-arrow-right-line"></i>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}




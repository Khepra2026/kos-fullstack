import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ResourcesRelatedLinks() {
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
      icon: 'ri-article-line',
      title: isEn ? 'Blog & Insights' : 'Blog & Analyses',
      description: isEn 
        ? 'Expert articles on governance, finance and entrepreneurship in Africa' 
        : 'Articles d\'experts sur la gouvernance, la finance et l\'entrepreneuriat en Afrique',
      link: '/blog',
      color: 'from-gold-500 to-gold-600',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-3">
            {isEn ? 'Continue Your Exploration' : 'Poursuivez votre exploration'}
          </h2>
          <p className="text-gray-600">
            {isEn 
              ? 'Discover our services and expert insights to support your growth' 
              : 'Découvrez nos services et analyses d\'experts pour accompagner votre croissance'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {relatedLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => navigate(link.link)}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all cursor-pointer text-left"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <i className={`${link.icon} text-white text-3xl`}></i>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                {link.title}
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                {link.description}
              </p>
              <div className="flex items-center gap-2 text-amber-700 font-medium group-hover:gap-3 transition-all">
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




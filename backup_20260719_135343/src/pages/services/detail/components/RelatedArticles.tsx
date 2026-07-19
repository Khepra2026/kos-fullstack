import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resolveIdToSlug } from '@/data/articleSlugMap';
import { blogArticles } from '@/mocks/blogArticles';
import { blogArticlesEn } from '@/mocks/blogArticlesEn';

interface RelatedArticlesProps {
  serviceId: string;
  serviceTitle: string;
}

const getCategoryColor = (category: string) => {
  if (category === 'Gouvernance' || category === 'Governance') return 'bg-gold-100 text-gold-800';
  if (category === 'Finance') return 'bg-brand-100 text-brand-800';
  if (category === 'Entrepreneuriat' || category === 'Entrepreneurship') return 'bg-orange-100 text-orange-800';
  if (category === 'Politiques publiques' || category === 'Public Policy') return 'bg-teal-100 text-teal-800';
  if (category === 'Ressources Humaines' || category === 'Human Resources') return 'bg-violet-100 text-violet-800';
  if (category === 'Management') return 'bg-brand-100 text-brand-800';
  return 'bg-gray-100 text-gray-800';
};

interface ServiceArticleConfig {
  articleIds: string[];
  subtitle: { fr: string; en: string };
}

const SERVICE_ARTICLE_MAPPING: Record<string, ServiceArticleConfig> = {
  'corporate-governance': {
    articleIds: ['1', '5', '8', '15', '20'],
    subtitle: {
      fr: 'Approfondissez vos connaissances en gouvernance, conformité BCEAO et contrôle interne',
      en: 'Deepen your knowledge in governance, BCEAO compliance and internal control',
    },
  },
  'financial-digital-inclusion': {
    articleIds: ['9', '10', '11', '15', '20', '21'],
    subtitle: {
      fr: 'Explorez nos analyses sur l\'inclusion financière, la microfinance et la conformité réglementaire',
      en: 'Explore our analyses on financial inclusion, microfinance and regulatory compliance',
    },
  },
  'enterprise-risk-management': {
    articleIds: ['5', '6', '8', '20', '21'],
    subtitle: {
      fr: 'Maîtrisez la gestion des risques, la conformité LBC/FT et les exigences prudentielles BCEAO',
      en: 'Master risk management, AML/CFT compliance and BCEAO prudential requirements',
    },
  },
  'strategic-advisory': {
    articleIds: ['2', '4', '7', '16', '17', '18'],
    subtitle: {
      fr: 'Découvrez nos insights sur la stratégie, la levée de fonds et le développement organisationnel',
      en: 'Discover our insights on strategy, fundraising and organizational development',
    },
  },
};

const getRelatedArticles = (serviceId: string, lang: 'fr' | 'en') => {
  const articles = lang === 'en' ? blogArticlesEn : blogArticles;
  const config = SERVICE_ARTICLE_MAPPING[serviceId];
  if (!config) return [];
  return articles
    .filter((a) => config.articleIds.includes(a.id))
    .slice(0, 4);
};

export function RelatedArticles({ serviceId, serviceTitle }: RelatedArticlesProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';

  const relatedArticles = getRelatedArticles(serviceId, lang);
  const config = SERVICE_ARTICLE_MAPPING[serviceId];

  if (relatedArticles.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <i className="ri-lightbulb-line"></i>
            {lang === 'fr' ? 'Insights d\'experts' : 'Expert Insights'}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {lang === 'fr' ? 'Articles connexes' : 'Related Articles'}
          </h2>
          {config && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {config.subtitle[lang]}
            </p>
          )}
        </div>

        {/* Grille d'articles — 2 colonnes si 4 articles, 3 si 3 */}
        <div className={`grid gap-8 mb-10 ${relatedArticles.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {relatedArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg gradient-border glow-gold-hover overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => {
                navigate(`/blog/${resolveIdToSlug(article.id) || article.id}/`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  title={`${article.title} — KHEPRA EXPERTS`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gold-700 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1 text-gold-700 font-semibold group-hover:gap-2 transition-all">
                    <span>{lang === 'fr' ? 'Lire' : 'Read'}</span>
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA vers le blog */}
        <div className="text-center">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-full hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg whitespace-nowrap cursor-pointer"
          >
            {lang === 'fr' ? 'Voir tous les articles' : 'View all articles'}
            <i className="ri-arrow-right-line text-lg"></i>
          </button>
        </div>
      </div>
    </section>
  );
}





import { useNavigate } from 'react-router-dom';
import { resolveIdToSlug } from '@/data/articleSlugMap';
import { useTranslation } from 'react-i18next';
import { blogArticles } from '@/mocks/blogArticles';
import { blogArticlesEn } from '@/mocks/blogArticlesEn';

interface ServiceLinksProps {
  articleId: string;
}

interface ServiceItem {
  id: string;
  title: { fr: string; en: string };
  icon: string;
  badge: { fr: string; en: string };
}

interface RelatedArticleLink {
  id: string;
  label: { fr: string; en: string };
}

interface ServiceMapping {
  services: ServiceItem[];
  relatedArticles: RelatedArticleLink[];
}

const getMapping = (): Record<string, ServiceMapping> => ({
  '1': {
    services: [
      { id: 'corporate-governance', title: { fr: "Gouvernance d'entreprise", en: 'Corporate Governance' }, icon: 'ri-shield-check-line', badge: { fr: 'Gouvernance', en: 'Governance' } },
      { id: 'enterprise-risk-management', title: { fr: 'Gestion des risques', en: 'Risk Management' }, icon: 'ri-shield-star-line', badge: { fr: 'Risques', en: 'Risks' } },
    ],
    relatedArticles: [
      { id: '5', label: { fr: 'Gestion des risques : anticiper pour mieux performer', en: 'Risk management: anticipate to perform better' } },
      { id: '8', label: { fr: 'Contrôle interne : optimiser vos processus opérationnels', en: 'Internal control: optimize your operational processes' } },
    ],
  },
  '2': {
    services: [
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique & Levée de fonds', en: 'Strategic Advisory & Fundraising' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'Stratégie', en: 'Strategy' } },
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière', en: 'Financial Inclusion' }, icon: 'ri-hand-coin-line', badge: { fr: 'Finance', en: 'Finance' } },
    ],
    relatedArticles: [
      { id: '6', label: { fr: 'Modélisation financière : prévoir pour décider', en: 'Financial modeling: forecast to decide' } },
      { id: '7', label: { fr: "Écosystème startup en Afrique de l'Ouest 2024", en: 'West Africa startup ecosystem 2024' } },
    ],
  },
  '3': {
    services: [
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique', en: 'Strategic Advisory' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'Stratégie', en: 'Strategy' } },
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière', en: 'Financial Inclusion' }, icon: 'ri-hand-coin-line', badge: { fr: 'Impact', en: 'Impact' } },
    ],
    relatedArticles: [
      { id: '7', label: { fr: "Écosystème startup en Afrique de l'Ouest 2024", en: 'West Africa startup ecosystem 2024' } },
      { id: '13', label: { fr: "Fonds d'impact pour l'agrobusiness", en: 'Impact funds for agribusiness' } },
    ],
  },
  '4': {
    services: [
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique', en: 'Strategic Advisory' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'Stratégie', en: 'Strategy' } },
      { id: 'financial-digital-inclusion', title: { fr: 'Transformation digitale', en: 'Digital Transformation' }, icon: 'ri-smartphone-line', badge: { fr: 'Digital', en: 'Digital' } },
    ],
    relatedArticles: [
      { id: '11', label: { fr: 'Produits financiers numériques inclusifs', en: 'Inclusive digital financial products' } },
      { id: '14', label: { fr: 'Stratégies nationales de transformation numérique', en: 'National digital transformation strategies' } },
    ],
  },
  '5': {
    services: [
      { id: 'enterprise-risk-management', title: { fr: 'Gestion des risques', en: 'Risk Management' }, icon: 'ri-shield-star-line', badge: { fr: 'Risques', en: 'Risks' } },
      { id: 'corporate-governance', title: { fr: "Gouvernance d'entreprise", en: 'Corporate Governance' }, icon: 'ri-shield-check-line', badge: { fr: 'Gouvernance', en: 'Governance' } },
    ],
    relatedArticles: [
      { id: '1', label: { fr: "Les clés d'une gouvernance efficace pour les PME africaines", en: 'Keys to effective governance for African SMEs' } },
      { id: '8', label: { fr: 'Contrôle interne : optimiser vos processus opérationnels', en: 'Internal control: optimize your operational processes' } },
    ],
  },
  '6': {
    services: [
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique & Levée de fonds', en: 'Strategic Advisory & Fundraising' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'Finance', en: 'Finance' } },
    ],
    relatedArticles: [
      { id: '2', label: { fr: 'Structurer sa levée de fonds : guide pratique', en: 'Structuring your fundraising: practical guide' } },
      { id: '5', label: { fr: 'Gestion des risques : anticiper pour mieux performer', en: 'Risk management: anticipate to perform better' } },
    ],
  },
  '7': {
    services: [
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique', en: 'Strategic Advisory' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'Stratégie', en: 'Strategy' } },
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière', en: 'Financial Inclusion' }, icon: 'ri-hand-coin-line', badge: { fr: 'FinTech', en: 'FinTech' } },
    ],
    relatedArticles: [
      { id: '2', label: { fr: 'Structurer sa levée de fonds : guide pratique', en: 'Structuring your fundraising: practical guide' } },
      { id: '11', label: { fr: 'Produits financiers numériques inclusifs', en: 'Inclusive digital financial products' } },
    ],
  },
  '8': {
    services: [
      { id: 'corporate-governance', title: { fr: "Gouvernance d'entreprise", en: 'Corporate Governance' }, icon: 'ri-shield-check-line', badge: { fr: 'Gouvernance', en: 'Governance' } },
      { id: 'enterprise-risk-management', title: { fr: 'Gestion des risques', en: 'Risk Management' }, icon: 'ri-shield-star-line', badge: { fr: 'Contrôle', en: 'Control' } },
    ],
    relatedArticles: [
      { id: '1', label: { fr: "Les clés d'une gouvernance efficace pour les PME africaines", en: 'Keys to effective governance for African SMEs' } },
      { id: '5', label: { fr: 'Gestion des risques : anticiper pour mieux performer', en: 'Risk management: anticipate to perform better' } },
    ],
  },
  '9': {
    services: [
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière & Transformation digitale', en: 'Financial Inclusion & Digital Transformation' }, icon: 'ri-smartphone-line', badge: { fr: 'Inclusion', en: 'Inclusion' } },
    ],
    relatedArticles: [
      { id: '10', label: { fr: 'Éducation financière des populations vulnérables', en: 'Financial education for vulnerable populations' } },
      { id: '12', label: { fr: 'Observatoire de la qualité des services financiers', en: 'Financial services quality observatory' } },
    ],
  },
  '10': {
    services: [
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière & Transformation digitale', en: 'Financial Inclusion & Digital Transformation' }, icon: 'ri-smartphone-line', badge: { fr: 'Inclusion', en: 'Inclusion' } },
    ],
    relatedArticles: [
      { id: '9', label: { fr: 'Cadres de concertation dans le secteur financier', en: 'Consultation frameworks in the financial sector' } },
      { id: '11', label: { fr: 'Produits financiers numériques inclusifs', en: 'Inclusive digital financial products' } },
    ],
  },
  '11': {
    services: [
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière & Transformation digitale', en: 'Financial Inclusion & Digital Transformation' }, icon: 'ri-smartphone-line', badge: { fr: 'FinTech', en: 'FinTech' } },
    ],
    relatedArticles: [
      { id: '14', label: { fr: 'Stratégies nationales de transformation numérique', en: 'National digital transformation strategies' } },
      { id: '9', label: { fr: 'Cadres de concertation dans le secteur financier', en: 'Consultation frameworks in the financial sector' } },
    ],
  },
  '12': {
    services: [
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière & Transformation digitale', en: 'Financial Inclusion & Digital Transformation' }, icon: 'ri-smartphone-line', badge: { fr: 'Qualité', en: 'Quality' } },
      { id: 'corporate-governance', title: { fr: "Gouvernance d'entreprise", en: 'Corporate Governance' }, icon: 'ri-shield-check-line', badge: { fr: 'Conformité', en: 'Compliance' } },
    ],
    relatedArticles: [
      { id: '9', label: { fr: 'Cadres de concertation dans le secteur financier', en: 'Consultation frameworks in the financial sector' } },
      { id: '15', label: { fr: 'Nouvelle loi uniforme sur la microfinance', en: 'New uniform microfinance law' } },
    ],
  },
  '13': {
    services: [
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière', en: 'Financial Inclusion' }, icon: 'ri-hand-coin-line', badge: { fr: 'Impact', en: 'Impact' } },
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique', en: 'Strategic Advisory' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'Stratégie', en: 'Strategy' } },
    ],
    relatedArticles: [
      { id: '3', label: { fr: "L'entrepreneuriat social en Afrique", en: 'Social entrepreneurship in Africa' } },
      { id: '11', label: { fr: 'Produits financiers numériques inclusifs', en: 'Inclusive digital financial products' } },
    ],
  },
  '14': {
    services: [
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière & Transformation digitale', en: 'Financial Inclusion & Digital Transformation' }, icon: 'ri-smartphone-line', badge: { fr: 'e-Gov', en: 'e-Gov' } },
    ],
    relatedArticles: [
      { id: '4', label: { fr: 'Transformation digitale : par où commencer pour les PME ?', en: 'Digital transformation: where to start for SMEs?' } },
      { id: '11', label: { fr: 'Produits financiers numériques inclusifs', en: 'Inclusive digital financial products' } },
    ],
  },
  '15': {
    services: [
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière & Conformité', en: 'Financial Inclusion & Compliance' }, icon: 'ri-smartphone-line', badge: { fr: 'Microfinance', en: 'Microfinance' } },
      { id: 'corporate-governance', title: { fr: "Gouvernance d'entreprise", en: 'Corporate Governance' }, icon: 'ri-shield-check-line', badge: { fr: 'Gouvernance', en: 'Governance' } },
    ],
    relatedArticles: [
      { id: '20', label: { fr: 'Conformité BCEAO 2025 : nouvelles exigences réglementaires', en: 'BCEAO Compliance 2025: new regulatory requirements' } },
      { id: '21', label: { fr: 'Gestion des risques LBC/FT pour les SFD', en: 'AML/CFT risk management for DFS' } },
    ],
  },
  '16': {
    services: [
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique', en: 'Strategic Advisory' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'RH', en: 'HR' } },
    ],
    relatedArticles: [
      { id: '17', label: { fr: 'Pratiques innovantes en relations industrielles', en: 'Innovative practices in industrial relations' } },
      { id: '18', label: { fr: 'Développer la culture organisationnelle', en: 'Developing organizational culture' } },
    ],
  },
  '17': {
    services: [
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique', en: 'Strategic Advisory' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'RH', en: 'HR' } },
    ],
    relatedArticles: [
      { id: '16', label: { fr: 'Gestion stratégique des RH et développement des compétences', en: 'Strategic HR management and skills development' } },
      { id: '18', label: { fr: 'Développer la culture organisationnelle', en: 'Developing organizational culture' } },
    ],
  },
  '18': {
    services: [
      { id: 'strategic-advisory', title: { fr: 'Conseil stratégique', en: 'Strategic Advisory' }, icon: 'ri-lightbulb-flash-line', badge: { fr: 'Leadership', en: 'Leadership' } },
      { id: 'corporate-governance', title: { fr: "Gouvernance d'entreprise", en: 'Corporate Governance' }, icon: 'ri-shield-check-line', badge: { fr: 'Culture', en: 'Culture' } },
    ],
    relatedArticles: [
      { id: '16', label: { fr: 'Gestion stratégique des RH et développement des compétences', en: 'Strategic HR management and skills development' } },
      { id: '17', label: { fr: 'Pratiques innovantes en relations industrielles', en: 'Innovative practices in industrial relations' } },
    ],
  },
  '20': {
    services: [
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière & Conformité', en: 'Financial Inclusion & Compliance' }, icon: 'ri-smartphone-line', badge: { fr: 'BCEAO 2025', en: 'BCEAO 2025' } },
      { id: 'corporate-governance', title: { fr: "Gouvernance d'entreprise", en: 'Corporate Governance' }, icon: 'ri-shield-check-line', badge: { fr: 'Gouvernance', en: 'Governance' } },
      { id: 'enterprise-risk-management', title: { fr: 'Gestion des risques', en: 'Risk Management' }, icon: 'ri-shield-star-line', badge: { fr: 'Risques', en: 'Risks' } },
    ],
    relatedArticles: [
      { id: '15', label: { fr: 'Nouvelle loi uniforme sur la microfinance', en: 'New uniform microfinance law' } },
      { id: '21', label: { fr: 'Gestion des risques LBC/FT pour les SFD', en: 'AML/CFT risk management for DFS' } },
    ],
  },
  '21': {
    services: [
      { id: 'enterprise-risk-management', title: { fr: 'Gestion des risques LBC/FT', en: 'AML/CFT Risk Management' }, icon: 'ri-shield-star-line', badge: { fr: 'LBC/FT', en: 'AML/CFT' } },
      { id: 'financial-digital-inclusion', title: { fr: 'Inclusion financière & Conformité', en: 'Financial Inclusion & Compliance' }, icon: 'ri-smartphone-line', badge: { fr: 'SFD', en: 'DFS' } },
      { id: 'corporate-governance', title: { fr: "Gouvernance d'entreprise", en: 'Corporate Governance' }, icon: 'ri-shield-check-line', badge: { fr: 'Conformité', en: 'Compliance' } },
    ],
    relatedArticles: [
      { id: '15', label: { fr: 'Nouvelle loi uniforme sur la microfinance', en: 'New uniform microfinance law' } },
      { id: '20', label: { fr: 'Conformité BCEAO 2025 : nouvelles exigences réglementaires', en: 'BCEAO Compliance 2025: new regulatory requirements' } },
    ],
  },
});

export function ServiceLinks({ articleId }: ServiceLinksProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'fr' ? 'fr' : 'en') as 'fr' | 'en';

  const mapping = getMapping();
  const data = mapping[articleId];

  if (!data || data.services.length === 0) return null;

  const allArticles = lang === 'en' ? blogArticlesEn : blogArticles;

  // Résoudre les titres des articles connexes depuis les mocks
  const resolvedRelatedArticles = data.relatedArticles
    .map((link) => {
      const found = allArticles.find((a) => a.id === link.id);
      return found ? { id: link.id, title: found.title, excerpt: found.excerpt, readTime: found.readTime } : null;
    })
    .filter(Boolean) as { id: string; title: string; excerpt: string; readTime: string }[];

  return (
    <div className="my-12 space-y-6">
      {/* ── Bloc services associés ── */}
      <div className="bg-gradient-to-br from-brand-50 to-gold-50 rounded-2xl p-8 border border-gold-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <i className="ri-service-line text-white text-2xl" aria-hidden="true"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {lang === 'fr' ? 'Nos services associés' : 'Our Related Services'}
            </h3>
            <p className="text-sm text-gray-600">
              {lang === 'fr'
                ? 'Découvrez comment nous pouvons vous accompagner concrètement sur ces sujets'
                : 'Discover how we can concretely support you on these topics'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {data.services.map((service) => (
            <button
              key={service.id}
              onClick={() => navigate(`/services/${service.id}/`)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all group cursor-pointer border border-gray-100 hover:border-gold-300"
              type="button"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`${service.icon} text-gold-700 text-lg`} aria-hidden="true"></i>
                </div>
                <div className="text-left">
                  <span className="block font-semibold text-gray-900 group-hover:text-gold-700 transition-colors text-sm">
                    {service.title[lang]}
                  </span>
                  <span className="inline-block mt-0.5 px-2 py-0.5 bg-gold-50 text-gold-700 text-xs rounded-full font-medium">
                    {service.badge[lang]}
                  </span>
                </div>
              </div>
              <i className="ri-arrow-right-line text-gold-600 text-xl group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
            </button>
          ))}
        </div>
      </div>

      {/* ── Bloc articles connexes ── */}
      {resolvedRelatedArticles.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 flex items-center justify-center bg-brand-50 rounded-lg">
              <i className="ri-article-line text-brand-700 text-lg" aria-hidden="true"></i>
            </div>
            <h3 className="font-bold text-gray-900 text-base">
              {lang === 'fr' ? 'Articles connexes à lire aussi' : 'Related articles to read'}
            </h3>
          </div>
          <div className="space-y-3">
            {resolvedRelatedArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => {
                  navigate(`/blog/${resolveIdToSlug(article.id) || article.id}/`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group cursor-pointer"
                type="button"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-brand-100 rounded-lg flex-shrink-0 mt-0.5">
                  <i className="ri-file-text-line text-brand-700 text-sm" aria-hidden="true"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-brand-700 transition-colors line-clamp-2">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <i className="ri-time-line" aria-hidden="true"></i>
                    {article.readTime}
                  </p>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-brand-600 text-lg flex-shrink-0 mt-1" aria-hidden="true"></i>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ServiceBannerItem {
  id: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  icon: string;
  color: string;
  bg: string;
  border: string;
  cta: { fr: string; en: string };
}

const SERVICES: Record<string, ServiceBannerItem> = {
  'daf-externalise': {
    id: 'daf-externalise',
    title: { fr: 'Direction Financière Externalisée & Conseil Stratégique', en: 'Outsourced CFO & Strategic Advisory' },
    description: {
      fr: "Accédez à une expertise financière de haut niveau sans recruter un DAF à temps plein. Diagnostic gratuit 30 min — Sans engagement.",
      en: 'Access top-level financial expertise without hiring a full-time CFO. Free 30-min diagnosis — No commitment.',
    },
    icon: 'ri-funds-line',
    color: 'text-gold-700',
    bg: 'bg-gold-50',
    border: 'border-gold-300',
    cta: { fr: "Voir l'offre complète", en: 'See full offer' },
  },
  'corporate-governance': {
    id: 'corporate-governance',
    title: { fr: "Gouvernance d'entreprise & Conformité", en: 'Corporate Governance & Compliance' },
    description: {
      fr: "Structurez vos organes de gouvernance, mettez-vous en conformité BCEAO et renforcez votre contrôle interne avec l'accompagnement d'experts.",
      en: 'Structure your governance bodies, achieve BCEAO compliance and strengthen your internal control with expert support.',
    },
    icon: 'ri-shield-check-line',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    cta: { fr: 'Découvrir ce service', en: 'Discover this service' },
  },
  'financial-digital-inclusion': {
    id: 'financial-digital-inclusion',
    title: { fr: 'Inclusion financière & Transformation digitale', en: 'Financial Inclusion & Digital Transformation' },
    description: {
      fr: "Déployez des solutions innovantes pour étendre l'accès aux services financiers et obtenir vos agréments FinTech BCEAO.",
      en: 'Deploy innovative solutions to extend access to financial services and obtain your BCEAO FinTech licenses.',
    },
    icon: 'ri-smartphone-line',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    cta: { fr: 'Découvrir ce service', en: 'Discover this service' },
  },
  'enterprise-risk-management': {
    id: 'enterprise-risk-management',
    title: { fr: "Gestion des risques d'entreprise", en: 'Enterprise Risk Management' },
    description: {
      fr: 'Cartographiez vos risques, renforcez votre dispositif de contrôle interne et préparez-vous aux exigences prudentielles BCEAO 2025.',
      en: 'Map your risks, strengthen your internal control system and prepare for BCEAO 2025 prudential requirements.',
    },
    icon: 'ri-shield-star-line',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    cta: { fr: 'Découvrir ce service', en: 'Discover this service' },
  },
  'strategic-advisory': {
    id: 'strategic-advisory',
    title: { fr: 'Conseil stratégique & Levée de fonds', en: 'Strategic Advisory & Fundraising' },
    description: {
      fr: "Définissez votre stratégie de croissance, structurez votre modèle économique et levez des fonds auprès d'investisseurs africains et internationaux.",
      en: 'Define your growth strategy, structure your business model and raise funds from African and international investors.',
    },
    icon: 'ri-lightbulb-flash-line',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    cta: { fr: 'Découvrir ce service', en: 'Discover this service' },
  },
};

/**
 * Mapping article → service principal à mettre en avant
 */
const ARTICLE_TO_PRIMARY_SERVICE: Record<string, string> = {
  '22': 'daf-externalise',
  '1': 'corporate-governance',
  '2': 'strategic-advisory',
  '3': 'strategic-advisory',
  '4': 'financial-digital-inclusion',
  '5': 'enterprise-risk-management',
  '6': 'strategic-advisory',
  '7': 'strategic-advisory',
  '8': 'corporate-governance',
  '9': 'financial-digital-inclusion',
  '10': 'financial-digital-inclusion',
  '11': 'financial-digital-inclusion',
  '12': 'financial-digital-inclusion',
  '13': 'strategic-advisory',
  '14': 'financial-digital-inclusion',
  '15': 'financial-digital-inclusion',
  '16': 'strategic-advisory',
  '17': 'strategic-advisory',
  '18': 'strategic-advisory',
  '20': 'enterprise-risk-management',
  '21': 'enterprise-risk-management',
};

interface ArticleServiceBannerProps {
  articleId: string;
}

export function ArticleServiceBanner({ articleId }: ArticleServiceBannerProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'fr' ? 'fr' : 'en') as 'fr' | 'en';

  const serviceId = ARTICLE_TO_PRIMARY_SERVICE[articleId];
  if (!serviceId) return null;

  const service = SERVICES[serviceId];
  if (!service) return null;

  // Map service IDs to existing route paths
  const SERVICE_HREF_MAP: Record<string, string> = {
    'daf-externalise': '/offre-commerciale',
    'corporate-governance': '/services/conseil-strategique',
    'strategic-advisory': '/services/conseil-strategique',
    'enterprise-risk-management': '/services/conseil-strategique',
    'financial-digital-inclusion': '/services/transformation-digitale',
  };
  const href = SERVICE_HREF_MAP[service.id] ?? `/services/${service.id}`;

  return (
    <div className={`my-10 rounded-2xl border-2 ${service.border} ${service.bg} overflow-hidden`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6">
        {/* Icône */}
        <div className={`w-14 h-14 flex items-center justify-center rounded-xl border ${service.border} bg-white flex-shrink-0`}>
          <i className={`${service.icon} ${service.color} text-2xl`} aria-hidden="true"></i>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-bold uppercase tracking-widest ${service.color} mb-1`}>
            {lang === 'fr' ? 'Service associé' : 'Related service'}
          </p>
          <h4 className="font-bold text-gray-900 text-base mb-1 leading-snug">
            {service.title[lang]}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {service.description[lang]}
          </p>
        </div>

        {/* CTA */}
        <Link
          to={href}
          className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all border ${service.border} ${service.color} bg-white hover:shadow-md hover:scale-105`}
        >
          {service.cta[lang]}
          <i className="ri-arrow-right-line" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
}




import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ContextualCTAProps {
  variant: 'diagnostic' | 'guide' | 'expert' | 'newsletter';
  title?: string;
  description?: string;
  buttonText?: string;
  buttonIcon?: string;
  onCtaClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ContextualCTA({
  variant,
  title,
  description,
  buttonText,
  buttonIcon,
  onCtaClick,
  className = '',
  size = 'md',
}: ContextualCTAProps) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language as 'fr' | 'en';

  const variants = {
    diagnostic: {
      icon: 'ri-lightbulb-flash-line',
      bg: 'from-brand-900 to-brand-800',
      iconBg: 'bg-gold-500/20',
      iconColor: 'text-gold-400',
      defaultTitle: lang === 'fr' ? 'Diagnostic Stratégique Gratuit' : 'Free Strategic Diagnosis',
      defaultDescription: lang === 'fr' 
        ? '30 minutes avec un expert pour identifier vos leviers de transformation.'
        : '30 minutes with an expert to identify your transformation levers.',
      defaultButtonText: lang === 'fr' ? 'Démarrer le diagnostic' : 'Start diagnosis',
      defaultButtonIcon: 'ri-arrow-right-line',
      action: () => navigate('/tools/diagnostic-organisationnel/'),
    },
    guide: {
      icon: 'ri-book-open-line',
      bg: 'from-emerald-700 to-emerald-800',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
      defaultTitle: lang === 'fr' ? 'Télécharger le Guide Complet' : 'Download Complete Guide',
      defaultDescription: lang === 'fr'
        ? 'Accédez à nos ressources exclusives pour approfondir vos connaissances.'
        : 'Access our exclusive resources to deepen your knowledge.',
      defaultButtonText: lang === 'fr' ? 'Télécharger gratuitement' : 'Download for free',
      defaultButtonIcon: 'ri-download-line',
      action: () => navigate('/resources/'),
    },
    expert: {
      icon: 'ri-customer-service-2-line',
      bg: 'from-gold-600 to-gold-700',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
      defaultTitle: lang === 'fr' ? 'Parler à un Expert' : 'Talk to an Expert',
      defaultDescription: lang === 'fr'
        ? 'Réponse garantie sous 2h ouvrées. Échange confidentiel et sans engagement.'
        : 'Response guaranteed within 2 business hours. Confidential and no-commitment exchange.',
      defaultButtonText: lang === 'fr' ? 'Contacter un expert' : 'Contact an expert',
      defaultButtonIcon: 'ri-phone-line',
      action: () => {
        // Ouvrir le modal expert flottant via l'événement global
        window.dispatchEvent(new Event('open-expert-modal'));
      },
    },
    newsletter: {
      icon: 'ri-mail-line',
      bg: 'from-teal-600 to-teal-700',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
      defaultTitle: lang === 'fr' ? 'Newsletter Insights' : 'Insights Newsletter',
      defaultDescription: lang === 'fr'
        ? 'Recevez nos analyses exclusives et tendances du secteur financier africain.'
        : 'Receive our exclusive analyses and trends from the African financial sector.',
      defaultButtonText: lang === 'fr' ? "S'inscrire maintenant" : 'Subscribe now',
      defaultButtonIcon: 'ri-send-plane-fill',
      action: () => {
        const newsletterSection = document.getElementById('newsletter');
        if (newsletterSection) {
          newsletterSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  };

  const config = variants[variant];

  const sizeClasses = {
    sm: {
      container: 'p-4',
      icon: 'w-8 h-8 text-lg',
      title: 'text-base',
      description: 'text-xs',
      button: 'py-2 text-xs',
    },
    md: {
      container: 'p-6',
      icon: 'w-10 h-10 text-xl',
      title: 'text-lg',
      description: 'text-sm',
      button: 'py-2.5 text-sm',
    },
    lg: {
      container: 'p-8',
      icon: 'w-12 h-12 text-2xl',
      title: 'text-xl',
      description: 'text-base',
      button: 'py-3 text-base',
    },
  };

  const sizeClass = sizeClasses[size];

  const handleClick = () => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'contextual_cta_click', {
        cta_variant: variant,
        page_path: window.location.pathname,
      });
    }

    if (onCtaClick) {
      onCtaClick();
    } else {
      config.action();
    }
  };

  return (
    <div className={`bg-gradient-to-br ${config.bg} rounded-2xl ${sizeClass.container} text-white ${className}`}>
      <div className={`${sizeClass.icon} flex items-center justify-center ${config.iconBg} rounded-xl mb-4`}>
        <i className={`${config.icon} ${config.iconColor}`}></i>
      </div>
      <h4 className={`font-playfair font-bold ${sizeClass.title} mb-2 leading-snug`}>
        {title || config.defaultTitle}
      </h4>
      <p className={`text-gray-200 ${sizeClass.description} mb-4 leading-relaxed`}>
        {description || config.defaultDescription}
      </p>
      <button
        onClick={handleClick}
        className={`w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white ${sizeClass.button} rounded-xl font-semibold transition-all cursor-pointer flex items-center justify-center gap-2`}
      >
        {buttonText || config.defaultButtonText}
        <i className={buttonIcon || config.defaultButtonIcon}></i>
      </button>
    </div>
  );
}

export default ContextualCTA;




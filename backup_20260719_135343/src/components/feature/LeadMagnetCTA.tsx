import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LeadMagnetCTAProps {
  variant?: 'whitepaper' | 'webinar' | 'diagnostic' | 'newsletter';
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (data: any) => void;
}

/**
 * CTA Lead Magnet réutilisable pour capturer des leads
 * Utilisable sur toutes les pages pour proposer des ressources
 */
export default function LeadMagnetCTA({
  variant = 'diagnostic',
  title,
  description,
  buttonText,
  onSubmit,
}: LeadMagnetCTAProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    whitepaper: {
      icon: 'ri-file-text-line',
      gradient: 'from-blue-600 to-blue-700',
      defaultTitle: t('leadMagnet.whitepaper.title'),
      defaultDesc: t('leadMagnet.whitepaper.description'),
      defaultButton: t('leadMagnet.whitepaper.button'),
    },
    webinar: {
      icon: 'ri-live-line',
      gradient: 'from-purple-600 to-purple-700',
      defaultTitle: t('leadMagnet.webinar.title'),
      defaultDesc: t('leadMagnet.webinar.description'),
      defaultButton: t('leadMagnet.webinar.button'),
    },
    diagnostic: {
      icon: 'ri-stethoscope-line',
      gradient: 'from-teal-600 to-teal-700',
      defaultTitle: t('leadMagnet.diagnostic.title'),
      defaultDesc: t('leadMagnet.diagnostic.description'),
      defaultButton: t('leadMagnet.diagnostic.button'),
    },
    newsletter: {
      icon: 'ri-mail-line',
      gradient: 'from-amber-600 to-amber-700',
      defaultTitle: t('leadMagnet.newsletter.title'),
      defaultDesc: t('leadMagnet.newsletter.description'),
      defaultButton: t('leadMagnet.newsletter.button'),
    },
  };

  const config = variants[variant];

  const handleClick = () => {
    if (onSubmit) {
      onSubmit({ variant, action: 'clicked' });
    }

    switch (variant) {
      case 'diagnostic':
        // Ouvrir le modal expert flottant via l'événement global
        window.dispatchEvent(new Event('open-expert-modal'));
        break;
      case 'whitepaper':
        // Rediriger vers la page ressources
        navigate('/resources/');
        break;
      case 'webinar':
        // Rediriger vers la page webinaires
        navigate('/webinars/');
        break;
      case 'newsletter': {
        // Scroll vers la section newsletter ou ouvrir le modal expert
        const newsletterSection = document.getElementById('newsletter');
        if (newsletterSection) {
          newsletterSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.dispatchEvent(new Event('open-expert-modal'));
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
      <div className="flex items-start gap-6">
        <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
          <i className={`${config.icon} text-3xl text-white`}></i>
        </div>
        
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {title || config.defaultTitle}
          </h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {description || config.defaultDesc}
          </p>
          
          <button
            onClick={handleClick}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${config.gradient} text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer`}
          >
            {buttonText || config.defaultButton}
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}




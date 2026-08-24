import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getOgPreviewUrl } from '@/utils/ogPreview';

interface SocialShareWidgetProps {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  hashtags?: string[];
  compact?: boolean;
}

/**
 * Widget de partage social optimisé pour LinkedIn et autres plateformes
 * Génère des posts pré-formatés avec hashtags stratégiques.
 *
 * Pour les bots sociaux (LinkedIn, Facebook, Twitter) : utilise l'URL OG Preview
 * qui sert des meta tags statiques HTML (les bots ne scrapent pas le JS).
 * Pour les humains (WhatsApp, email, copie) : utilise l'URL directe du site.
 */
export const SocialShareWidget = ({
  url,
  title,
  description = '',
  hashtags = [],
  compact = false,
}: SocialShareWidgetProps) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // URL directe du site pour les humains (WhatsApp, email, copie)
  const displayUrl = url.startsWith('http') ? url : `https://khepraexperts.com${url}`;
  // URL OG Preview pour les bots sociaux (LinkedIn, Facebook, Twitter)
  const ogPreviewUrl = getOgPreviewUrl(url);

  // Hashtags par défaut optimisés pour LinkedIn
  const defaultHashtags = isEn
    ? ['FinancialInclusion', 'AfricaConsulting', 'DigitalTransformation', 'Fintech', 'Governance', 'UEMOA', 'CEMAC']
    : ['InclusionFinancière', 'ConseilAfrique', 'TransformationDigitale', 'Fintech', 'Gouvernance', 'UEMOA', 'CEMAC'];

  const allHashtags = [...new Set([...hashtags, ...defaultHashtags])].slice(0, 7);

  // Générer le texte du post LinkedIn optimisé
  const generateLinkedInPost = () => {
    const hashtagString = allHashtags.map(tag => `#${tag}`).join(' ');
    return `${title}\n\n${description}\n\n🔗 ${displayUrl}\n\n${hashtagString}`;
  };

  // Copier le post LinkedIn
  const copyLinkedInPost = async () => {
    try {
      await navigator.clipboard.writeText(generateLinkedInPost());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  // Partager sur LinkedIn — URL OG Preview pour que le bot scrape les bons meta tags
  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogPreviewUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  };

  // Partager sur Twitter/X — URL OG Preview
  const shareOnTwitter = () => {
    const twitterHashtags = allHashtags.slice(0, 3).join(',');
    const twitterUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(ogPreviewUrl)}&text=${encodeURIComponent(title)}&hashtags=${twitterHashtags}`;
    window.open(twitterUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  };

  // Partager sur Facebook — URL OG Preview
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ogPreviewUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  };

  // Partager sur WhatsApp — URL directe (WhatsApp ne scrape pas l'OG)
  const shareOnWhatsApp = () => {
    const whatsappText = `${title}\n\n${displayUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Partager par email — URL directe
  const shareByEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${displayUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const socialButtons = [
    {
      name: 'LinkedIn',
      icon: 'ri-linkedin-fill',
      color: 'bg-[#0A66C2] hover:bg-[#004182]',
      action: shareOnLinkedIn,
      priority: true,
    },
    {
      name: 'Twitter',
      icon: 'ri-twitter-x-fill',
      color: 'bg-gray-900 hover:bg-gray-700',
      action: shareOnTwitter,
      priority: false,
    },
    {
      name: 'Facebook',
      icon: 'ri-facebook-fill',
      color: 'bg-[#1877F2] hover:bg-[#0C63D4]',
      action: shareOnFacebook,
      priority: false,
    },
    {
      name: 'WhatsApp',
      icon: 'ri-whatsapp-fill',
      color: 'bg-[#25D366] hover:bg-[#1DA851]',
      action: shareOnWhatsApp,
      priority: false,
    },
    {
      name: 'Email',
      icon: 'ri-mail-fill',
      color: 'bg-gray-600 hover:bg-gray-500',
      action: shareByEmail,
      priority: false,
    },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {socialButtons.map((button) => (
          <button
            key={button.name}
            onClick={button.action}
            onMouseEnter={() => setShowTooltip(button.name)}
            onMouseLeave={() => setShowTooltip(null)}
            className={`relative flex items-center justify-center w-9 h-9 ${button.color} text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer`}
            aria-label={`${isEn ? 'Share on' : 'Partager sur'} ${button.name}`}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className={`${button.icon} text-base`}></i>
            </div>
            {showTooltip === button.name && (
              <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                {button.name}
              </div>
            )}
          </button>
        ))}
        <button
          onClick={copyLinkedInPost}
          onMouseEnter={() => setShowTooltip('Copy')}
          onMouseLeave={() => setShowTooltip(null)}
          className="relative flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          aria-label={isEn ? 'Copy LinkedIn post' : 'Copier le post LinkedIn'}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            {copied ? (
              <i className="ri-check-line text-green-600 text-base"></i>
            ) : (
              <i className="ri-file-copy-line text-base"></i>
            )}
          </div>
          {showTooltip === 'Copy' && (
            <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
              {copied ? (isEn ? 'Copied!' : 'Copié !') : (isEn ? 'Copy post' : 'Copier')}
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-share-line text-amber-600"></i>
        </div>
        {isEn ? 'Share this article' : 'Partager cet article'}
      </h3>

      {/* Bouton LinkedIn prioritaire */}
      <div className="mb-4">
        <button
          onClick={shareOnLinkedIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap group"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-linkedin-fill text-lg"></i>
          </div>
          <span className="font-medium">
            {isEn ? 'Share on LinkedIn' : 'Partager sur LinkedIn'}
          </span>
          <i className="ri-arrow-right-line text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
        </button>
      </div>

      {/* Copier le post pré-formaté */}
      <div className="mb-4">
        <button
          onClick={copyLinkedInPost}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {copied ? (
              <i className="ri-check-line text-green-600 text-lg"></i>
            ) : (
              <i className="ri-file-copy-line text-lg"></i>
            )}
          </div>
          <span className="font-medium">
            {copied
              ? (isEn ? 'Post copied!' : 'Post copié !')
              : (isEn ? 'Copy LinkedIn post' : 'Copier le post LinkedIn')}
          </span>
        </button>
      </div>

      {/* Autres réseaux sociaux */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-3">
          {isEn ? 'Or share on:' : 'Ou partager sur :'}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {socialButtons.slice(1).map((button) => (
            <button
              key={button.name}
              onClick={button.action}
              className={`flex flex-col items-center justify-center gap-1 p-3 ${button.color} text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer`}
              aria-label={`${isEn ? 'Share on' : 'Partager sur'} ${button.name}`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${button.icon} text-lg`}></i>
              </div>
              <span className="text-xs font-medium">{button.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hashtags suggérés */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">
          {isEn ? 'Suggested hashtags:' : 'Hashtags suggérés :'}
        </p>
        <div className="flex flex-wrap gap-2">
          {allHashtags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialShareWidget;




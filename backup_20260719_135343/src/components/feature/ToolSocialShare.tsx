import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getOgPreviewUrl } from '@/utils/ogPreview';

interface ToolSocialShareProps {
  toolNameFr: string;
  toolNameEn: string;
  score: number;
  levelFr: string;
  levelEn: string;
  url: string;
  hashtags?: string[];
}

/**
 * Widget de partage social optimisé pour les résultats des outils interactifs
 * Partage le score avec un message personnalisé sur LinkedIn, Facebook, Twitter
 */
export const ToolSocialShare = ({
  toolNameFr,
  toolNameEn,
  score,
  levelFr,
  levelEn,
  url,
  hashtags = [],
}: ToolSocialShareProps) => {
  const { i18n } = useTranslation();
  const isFr = !i18n.language.startsWith('en');
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const toolName = isFr ? toolNameFr : toolNameEn;
  const level = isFr ? levelFr : levelEn;

  // Hashtags par défaut optimisés pour les outils Khepra
  const defaultHashtags = isFr
    ? ['KhepraExperts', 'DiagnosticGratuit', 'ConseilStrategique', 'AfriqueFrancophone', 'TransformationDigitale']
    : ['KhepraExperts', 'FreeDiagnostic', 'StrategicConsulting', 'FrancophoneAfrica', 'DigitalTransformation'];

  const allHashtags = [...new Set([...hashtags, ...defaultHashtags])].slice(0, 7);

  // URL directe du site pour affichage et copie (humains)
  const displayUrl = url.startsWith('http') ? url : `https://khepraexperts.com${url}`;
  // URL OG Preview pour les bots sociaux (LinkedIn, Facebook, Twitter)
  const botShareUrl = getOgPreviewUrl(url);

  // Générer le texte du post optimisé
  const generatePostText = () => {
    if (isFr) {
      return `J'ai réalisé le ${toolName} de KHEPRA EXPERTS et obtenu un score de ${score}/100 (${level}).\n\nUn outil gratuit pour évaluer la maturité de votre organisation en Afrique de l'Ouest.\n\n🔗 ${displayUrl}\n\n${allHashtags.map(tag => `#${tag}`).join(' ')}`;
    }
    return `I completed the ${toolName} by KHEPRA EXPERTS and scored ${score}/100 (${level}).\n\nA free tool to assess your organization's maturity in West Africa.\n\n🔗 ${displayUrl}\n\n${allHashtags.map(tag => `#${tag}`).join(' ')}`;
  };

  // Copier le post
  const copyPost = async () => {
    try {
      await navigator.clipboard.writeText(generatePostText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  // Partager sur LinkedIn — URL OG Preview pour que le bot scrape les bons meta tags
  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(botShareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  };

  // Partager sur Twitter/X — URL OG Preview
  const shareOnTwitter = () => {
    const tweetText = isFr
      ? `J'ai obtenu ${score}/100 au ${toolName} de @KhepraExperts ! Niveau : ${level}. Testez gratuitement votre organisation.`
      : `I scored ${score}/100 on ${toolName} by @KhepraExperts! Level: ${level}. Test your organization for free.`;
    const twitterHashtags = allHashtags.slice(0, 3).join(',');
    const twitterUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(botShareUrl)}&text=${encodeURIComponent(tweetText)}&hashtags=${twitterHashtags}`;
    window.open(twitterUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  };

  // Partager sur Facebook — URL OG Preview pour que le bot scrape les bons meta tags
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(botShareUrl)}&quote=${encodeURIComponent(generatePostText())}`;
    window.open(facebookUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  };

  // Partager sur WhatsApp — URL directe (texte, pas de scraping OG)
  const shareOnWhatsApp = () => {
    const whatsappText = generatePostText();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const socialButtons = [
    {
      name: 'LinkedIn',
      icon: 'ri-linkedin-fill',
      color: 'bg-[#0A66C2] hover:bg-[#004182]',
      action: shareOnLinkedIn,
      label: isFr ? 'LinkedIn' : 'LinkedIn',
    },
    {
      name: 'Twitter',
      icon: 'ri-twitter-x-fill',
      color: 'bg-gray-900 hover:bg-gray-700',
      action: shareOnTwitter,
      label: 'X / Twitter',
    },
    {
      name: 'Facebook',
      icon: 'ri-facebook-fill',
      color: 'bg-[#1877F2] hover:bg-[#0C63D4]',
      action: shareOnFacebook,
      label: 'Facebook',
    },
    {
      name: 'WhatsApp',
      icon: 'ri-whatsapp-fill',
      color: 'bg-[#25D366] hover:bg-[#1DA851]',
      action: shareOnWhatsApp,
      label: 'WhatsApp',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm animate-slide-up">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-share-line text-xl text-teal-600"></i>
          </div>
        </div>
        <h4 className="text-lg font-bold text-gray-900">
          {isFr ? 'Partagez votre résultat' : 'Share your result'}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          {isFr
            ? `Votre score de ${score}/100 — ${level}`
            : `Your score: ${score}/100 — ${level}`}
        </p>
      </div>

      {/* Bouton LinkedIn prioritaire */}
      <button
        onClick={shareOnLinkedIn}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap group mb-3"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-linkedin-fill text-lg"></i>
        </div>
        <span className="font-semibold">
          {isFr ? 'Partager sur LinkedIn' : 'Share on LinkedIn'}
        </span>
        <i className="ri-arrow-right-line text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
      </button>

      {/* Autres réseaux */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {socialButtons.slice(1).map((button) => (
          <button
            key={button.name}
            onClick={button.action}
            onMouseEnter={() => setShowTooltip(button.name)}
            onMouseLeave={() => setShowTooltip(null)}
            className={`relative flex flex-col items-center justify-center gap-1 p-3 ${button.color} text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer`}
            aria-label={`${isFr ? 'Partager sur' : 'Share on'} ${button.name}`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`${button.icon} text-lg`}></i>
            </div>
            <span className="text-xs font-medium">{button.label}</span>
            {showTooltip === button.name && (
              <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                {button.name}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Copier le post */}
      <button
        onClick={copyPost}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap mb-4"
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
            ? (isFr ? 'Post copié !' : 'Post copied!')
            : (isFr ? 'Copier le texte du post' : 'Copy post text')}
        </span>
      </button>

      {/* Hashtags */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">
          {isFr ? 'Hashtags suggérés :' : 'Suggested hashtags:'}
        </p>
        <div className="flex flex-wrap gap-2">
          {allHashtags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolSocialShare;




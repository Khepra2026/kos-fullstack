import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getOgPreviewUrl } from '@/utils/ogPreview';
import { getWhatsAppShareUrl } from '@/config/socialProfiles';

interface SocialSharePremiumProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'horizontal' | 'vertical' | 'compact';
  className?: string;
  showCopyLink?: boolean;
  showLinkedIn?: boolean;
  showTwitter?: boolean;
  showWhatsApp?: boolean;
}

export default function SocialSharePremium({
  url,
  title,
  description = '',
  variant = 'horizontal',
  className = '',
  showCopyLink = true,
  showLinkedIn = true,
  showTwitter = true,
  showWhatsApp = true,
}: SocialSharePremiumProps) {
  const { t, i18n } = useTranslation();
  const isFr = !i18n.language.startsWith('en');
  const [copied, setCopied] = useState(false);

  // URL OG Preview pour les bots sociaux (LinkedIn, Facebook, Twitter)
  const ogPreviewUrl = getOgPreviewUrl(url);
  // URL directe pour l'affichage humain et WhatsApp
  const displayUrl = url.startsWith('http') ? url : `https://khepraexperts.com${url}`;
  
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogPreviewUrl)}`;
  const twitterUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(ogPreviewUrl)}&text=${encodeURIComponent(title)}&via=KhepraExperts`;
  const whatsappUrl = getWhatsAppShareUrl(displayUrl, title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback pour navigateurs anciens
      const textArea = document.createElement('textarea');
      textArea.value = displayUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLabel = isFr ? 'Partager' : 'Share';
  const copyLabel = isFr ? 'Copier le lien' : 'Copy link';
  const copiedLabel = isFr ? 'Copié !' : 'Copied!';

  const buttonBase = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95';

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {showLinkedIn && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-200 cursor-pointer"
            title={isFr ? 'Partager sur LinkedIn' : 'Share on LinkedIn'}
            aria-label={isFr ? 'Partager sur LinkedIn' : 'Share on LinkedIn'}
          >
            <i className="ri-linkedin-fill text-lg"></i>
          </a>
        )}
        {showTwitter && (
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/5 text-gray-700 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            title={isFr ? 'Partager sur X' : 'Share on X'}
            aria-label={isFr ? 'Partager sur X' : 'Share on X'}
          >
            <i className="ri-twitter-x-fill text-lg"></i>
          </a>
        )}
        {showWhatsApp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200 cursor-pointer"
            title={isFr ? 'Partager sur WhatsApp' : 'Share on WhatsApp'}
            aria-label={isFr ? 'Partager sur WhatsApp' : 'Share on WhatsApp'}
          >
            <i className="ri-whatsapp-line text-lg"></i>
          </a>
        )}
        {showCopyLink && (
          <button
            onClick={handleCopy}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={copied ? copiedLabel : copyLabel}
            aria-label={copied ? copiedLabel : copyLabel}
          >
            <i className={`text-lg ${copied ? 'ri-check-line' : 'ri-links-line'}`}></i>
          </button>
        )}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{shareLabel}</p>
        {showLinkedIn && (
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"
            className={`${buttonBase} bg-[#0A66C2] text-white hover:bg-[#004182]`}>
            <i className="ri-linkedin-fill text-lg"></i>
            LinkedIn
          </a>
        )}
        {showTwitter && (
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
            className={`${buttonBase} bg-black text-white hover:bg-gray-800`}>
            <i className="ri-twitter-x-fill text-lg"></i>
            X (Twitter)
          </a>
        )}
        {showWhatsApp && (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className={`${buttonBase} bg-[#25D366] text-white hover:bg-[#128C7E]`}>
            <i className="ri-whatsapp-line text-lg"></i>
            WhatsApp
          </a>
        )}
        {showCopyLink && (
          <button onClick={handleCopy}
            className={`${buttonBase} border-2 ${
              copied
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
            }`}>
            <i className={`text-lg ${copied ? 'ri-check-line' : 'ri-links-line'}`}></i>
            {copied ? copiedLabel : copyLabel}
          </button>
        )}
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 ${className}`}>
      <span className="text-sm font-bold text-gray-500 whitespace-nowrap">{shareLabel} :</span>
      <div className="flex items-center gap-2 flex-wrap">
        {showLinkedIn && (
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"
            className={`${buttonBase} bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white`}>
            <i className="ri-linkedin-fill text-lg"></i>
            LinkedIn
          </a>
        )}
        {showTwitter && (
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
            className={`${buttonBase} bg-black/5 text-gray-700 hover:bg-black hover:text-white`}>
            <i className="ri-twitter-x-fill text-lg"></i>
            X
          </a>
        )}
        {showWhatsApp && (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className={`${buttonBase} bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white`}>
            <i className="ri-whatsapp-line text-lg"></i>
            WhatsApp
          </a>
        )}
        {showCopyLink && (
          <button onClick={handleCopy}
            className={`${buttonBase} border ${
              copied
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
            }`}>
            <i className={`text-lg ${copied ? 'ri-check-line' : 'ri-links-line'}`}></i>
            {copied ? copiedLabel : copyLabel}
          </button>
        )}
      </div>
    </div>
  );
}
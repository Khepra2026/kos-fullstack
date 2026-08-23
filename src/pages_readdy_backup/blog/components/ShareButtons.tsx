import { useState } from 'react';
import { getOgPreviewUrl } from '@/utils/ogPreview';

interface ShareButtonsProps {
  url: string;
  title: string;
  excerpt?: string;
  isEn?: boolean;
  vertical?: boolean;
  hashtags?: string[];
}

export function ShareButtons({
  url,
  title,
  excerpt = '',
  isEn = false,
  vertical = false,
  hashtags = [],
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [linkedInClicked, setLinkedInClicked] = useState(false);
  const [postCopied, setPostCopied] = useState(false);

  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
  // URL directe du site pour humains (copie, WhatsApp, Telegram, email, affichage)
  const displayUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  // URL OG Preview pour les bots sociaux (LinkedIn, Facebook, Twitter)
  const ogPreviewUrl = getOgPreviewUrl(url);

  const defaultHashtags = isEn
    ? ['AfricaConsulting', 'UEMOA', 'CEMAC', 'OHADA', 'Governance', 'FinanceAfrica']
    : ['ConseilAfrique', 'UEMOA', 'CEMAC', 'OHADA', 'Gouvernance', 'FinanceAfrique'];

  const allHashtags = [...new Set([...hashtags, ...defaultHashtags])].slice(0, 6);

  const generateLinkedInPost = () => {
    const hashtagString = allHashtags.map((tag) => `#${tag}`).join(' ');
    const shortExcerpt = excerpt.length > 200 ? excerpt.substring(0, 197) + '...' : excerpt;
    return `${title}\n\n${shortExcerpt}\n\n🔗 ${displayUrl}\n\n${hashtagString}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPost = async () => {
    try {
      await navigator.clipboard.writeText(generateLinkedInPost());
      setPostCopied(true);
      setTimeout(() => setPostCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = generateLinkedInPost();
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setPostCopied(true);
      setTimeout(() => setPostCopied(false), 2500);
    }
  };

  // LinkedIn — URL OG Preview pour que le bot scrape les bons meta tags
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogPreviewUrl)}`;

  // Twitter/X — URL OG Preview
  const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(ogPreviewUrl)}&text=${encodeURIComponent(`${title} — KHEPRA EXPERTS`)}`;

  // WhatsApp — URL directe (texte, pas de scraping OG)
  const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${excerpt ? excerpt.substring(0, 120) + '...' : ''}\n\n${displayUrl}`)}`;

  // Facebook — URL OG Preview
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ogPreviewUrl)}`;

  // Telegram — URL directe
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(displayUrl)}&text=${encodeURIComponent(title)}`;

  const handleLinkedInClick = () => {
    setLinkedInClicked(true);
    setTimeout(() => setLinkedInClicked(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        {isEn ? 'Share this article' : 'Partager cet article'}
      </p>

      <div className={`flex ${vertical ? 'flex-col' : 'flex-row flex-wrap'} gap-3`}>
        {/* LinkedIn — bouton principal */}
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={handleLinkedInClick}
          className="whitespace-nowrap inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer bg-[#0A66C2] text-white hover:bg-[#004182]"
          aria-label={isEn ? 'Share on LinkedIn' : 'Partager sur LinkedIn'}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-linkedin-fill text-lg"></i>
          </div>
          <span>LinkedIn</span>
          {linkedInClicked && (
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-check-line text-white text-sm"></i>
            </div>
          )}
        </a>

        {/* Copier le post LinkedIn pré-formaté */}
        <button
          onClick={handleCopyPost}
          className="whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          aria-label={isEn ? 'Copy LinkedIn post' : 'Copier le post LinkedIn'}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {postCopied ? (
              <i className="ri-check-line text-emerald-600 text-base"></i>
            ) : (
              <i className="ri-file-copy-line text-base"></i>
            )}
          </div>
          <span>
            {postCopied
              ? isEn ? 'Post copied!' : 'Post copié !'
              : isEn ? 'Copy LinkedIn post' : 'Copier le post'}
          </span>
        </button>

        {/* Twitter/X */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-gray-900 text-white hover:bg-black transition-all duration-200 cursor-pointer"
          aria-label={isEn ? 'Share on X (Twitter)' : 'Partager sur X (Twitter)'}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-twitter-x-fill text-base"></i>
          </div>
          <span>X / Twitter</span>
        </a>

        {/* Facebook */}
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#1877F2] text-white hover:bg-[#0d65d9] transition-all duration-200 cursor-pointer"
          aria-label={isEn ? 'Share on Facebook' : 'Partager sur Facebook'}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-facebook-fill text-base"></i>
          </div>
          <span>Facebook</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsAppShareUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-all duration-200 cursor-pointer"
          aria-label={isEn ? 'Share on WhatsApp' : 'Partager sur WhatsApp'}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-whatsapp-fill text-base"></i>
          </div>
          <span>WhatsApp</span>
        </a>

        {/* Telegram */}
        <a
          href={telegramShareUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#229ED9] text-white hover:bg-[#1a8bbf] transition-all duration-200 cursor-pointer"
          aria-label={isEn ? 'Share on Telegram' : 'Partager sur Telegram'}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-telegram-fill text-base"></i>
          </div>
          <span>Telegram</span>
        </a>

        {/* Copier le lien */}
        <button
          onClick={handleCopy}
          className={`whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={copied ? (isEn ? 'Link copied!' : 'Lien copié !') : (isEn ? 'Copy link' : 'Copier le lien')}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className={`${copied ? 'ri-check-line' : 'ri-links-line'} text-base`}></i>
          </div>
          <span>{copied ? (isEn ? 'Copied!' : 'Copié !') : (isEn ? 'Copy link' : 'Copier le lien')}</span>
        </button>
      </div>

      {/* URL affichée */}
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
        <i className="ri-link-m text-gray-400 text-sm flex-shrink-0"></i>
        <span className="text-xs text-gray-500 truncate flex-1 font-mono">{displayUrl}</span>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 text-xs text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          {copied ? <i className="ri-check-line text-emerald-500"></i> : <i className="ri-file-copy-line"></i>}
        </button>
      </div>
    </div>
  );
}




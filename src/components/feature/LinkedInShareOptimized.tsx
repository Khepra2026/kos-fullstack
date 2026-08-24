import { useState } from 'react';
import { getOgPreviewUrl } from '@/utils/ogPreview';

interface LinkedInShareOptimizedProps {
  url: string;
  title: string;
  excerpt?: string;
  vertical?: boolean;
  showLabel?: boolean;
}

export const LinkedInShareOptimized = ({
  url,
  title,
  excerpt,
  vertical = false,
  showLabel = true,
}: LinkedInShareOptimizedProps) => {
  const [copied, setCopied] = useState(false);

  // URL directe du site (affichage et copie pour humains)
  const displayUrl = url.startsWith('http') ? url : `https://khepraexperts.com${url}`;
  // URL OG Preview pour les bots sociaux (LinkedIn, Facebook, Twitter)
  const ogPreviewUrl = getOgPreviewUrl(url);

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogPreviewUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  };

  const copyLinkedInPost = () => {
    const postText = `${title}\n\n${excerpt || ''}\n\n🔗 ${displayUrl}\n\n#InclusionFinancière #ConseilAfrique #Gouvernance #TransformationDigitale #UEMOA #CEMAC`;
    
    navigator.clipboard.writeText(postText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-2`}>
      {/* Bouton de partage LinkedIn standard */}
      <button
        onClick={shareOnLinkedIn}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap group"
        aria-label="Partager sur LinkedIn"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-linkedin-fill text-lg"></i>
        </div>
        {showLabel && (
          <span className="text-sm font-medium">Partager sur LinkedIn</span>
        )}
      </button>

      {/* Bouton de copie du post pré-formaté */}
      <button
        onClick={copyLinkedInPost}
        className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap group"
        aria-label="Copier le post LinkedIn"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          {copied ? (
            <i className="ri-check-line text-green-600 text-lg"></i>
          ) : (
            <i className="ri-file-copy-line text-lg"></i>
          )}
        </div>
        {showLabel && (
          <span className="text-sm font-medium">
            {copied ? 'Copié !' : 'Copier le post'}
          </span>
        )}
      </button>
    </div>
  );
};




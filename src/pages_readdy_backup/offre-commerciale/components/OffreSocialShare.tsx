import { useState } from 'react';
const SITE_URL = 'https://khepraexperts.com';

export default function OffreSocialShare() {
  const [copied, setCopied] = useState(false);

  const pageUrl = `${SITE_URL}/offre-commerciale/`;
  const ogPageUrl = pageUrl;
  const shareText = encodeURIComponent(
    'KHEPRA EXPERTS — Direction Financière Externalisée & Conseil Stratégique pour les PME en Afrique de l\'Ouest. Diagnostic Financier Gratuit (30 min). Sans engagement.'
  );
  const shareTitle = encodeURIComponent('KHEPRA EXPERTS — Reprenez le contrôle de vos finances');

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'ri-linkedin-fill',
      color: '#0077B5',
      bg: 'rgba(0,119,181,0.1)',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogPageUrl)}`,
    },
    {
      name: 'Facebook',
      icon: 'ri-facebook-fill',
      color: '#1877F2',
      bg: 'rgba(24,119,242,0.1)',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ogPageUrl)}&quote=${shareText}`,
    },
    {
      name: 'X (Twitter)',
      icon: 'ri-twitter-x-line',
      color: '#000000',
      bg: 'rgba(0,0,0,0.08)',
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(ogPageUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: 'ri-whatsapp-line',
      color: '#25D366',
      bg: 'rgba(37,211,102,0.1)',
      url: `https://wa.me/?text=${shareText}%20${encodeURIComponent(pageUrl)}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const linkedinPost = `🚀 KHEPRA EXPERTS — Direction Financière Externalisée

Votre entreprise génère du chiffre… mais manque de performance ?

❌ Décisions financières risquées
❌ Absence de contrôle interne
❌ Manque de visibilité sur la trésorerie
❌ Difficulté à convaincre banques et investisseurs

✅ Notre solution : DAF Externalisé & Conseil Stratégique

🎁 OFFRE EXCLUSIVE : Diagnostic Financier Gratuit (30 min)
Sans engagement

📞 +228 93 98 49 09
📧 contact@khepraexperts.com

#Finance #PME #AfriqueDeLOuest #Togo #ConseilFinancier #DAF #Gouvernance`;

  const [postCopied, setPostCopied] = useState(false);

  const handleCopyPost = async () => {
    try {
      await navigator.clipboard.writeText(linkedinPost);
      setPostCopied(true);
      setTimeout(() => setPostCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section
      className="py-20 lg:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 100%)' }}
    >
      {/* Décor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.3)' }}>
          <i className="ri-share-line text-sm" style={{ color: '#86BC25' }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Partager cette offre</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
          Partagez avec votre réseau
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-12 text-base">
          Aidez vos contacts dirigeants et PME à découvrir cette opportunité. Un partage peut transformer leur gestion financière.
        </p>

        {/* Boutons sociaux */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {socialLinks.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{ background: s.bg, border: `1px solid ${s.color}40`, color: s.color === '#000000' ? '#fff' : s.color }}
            >
              <i className={`${s.icon} text-lg`} />
              {s.name}
            </a>
          ))}

          {/* Copier le lien */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
          >
            <i className={copied ? 'ri-check-line text-green-400' : 'ri-link text-lg'} />
            {copied ? 'Lien copié !' : 'Copier le lien'}
          </button>
        </div>

        {/* Post LinkedIn prêt à copier */}
        <div
          className="text-left p-6 rounded-2xl mb-6"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,168,42,0.2)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <i className="ri-linkedin-fill text-lg" style={{ color: '#0077B5' }} />
              <span className="text-white font-semibold text-sm">Post LinkedIn prêt à publier</span>
            </div>
            <button
              onClick={handleCopyPost}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{ background: postCopied ? 'rgba(34,197,94,0.2)' : 'rgba(212,168,42,0.15)', border: `1px solid ${postCopied ? 'rgba(34,197,94,0.4)' : 'rgba(212,168,42,0.3)'}`, color: postCopied ? '#4ade80' : '#86BC25' }}
            >
              <i className={postCopied ? 'ri-check-line' : 'ri-file-copy-line'} />
              {postCopied ? 'Copié !' : 'Copier le post'}
            </button>
          </div>
          <pre className="text-white/70 text-xs leading-relaxed whitespace-pre-wrap font-sans">
            {linkedinPost}
          </pre>
        </div>

        <p className="text-white/30 text-xs">
          Copiez ce post et publiez-le directement sur LinkedIn, Facebook ou X pour maximiser votre portée.
        </p>
      </div>
    </section>
  );
}





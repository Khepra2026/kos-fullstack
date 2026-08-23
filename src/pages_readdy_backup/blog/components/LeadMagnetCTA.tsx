import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LEAD_MAGNET_FORM_URL = 'https://readdy.ai/api/form/d7s541aj1g8i0g4g5d3g';

interface LeadMagnetCTAProps {
  type: 'checklist-dd' | 'checklist-governance' | 'checklist-compliance' | 'checklist-fundraising' | 'checklist-esg';
}

const LEAD_MAGNETS = {
  'checklist-dd': {
    fr: {
      title: 'Checklist Due Diligence KHEPRA DD™',
      subtitle: 'Les 10 documents indispensables + les 7 red flags à identifier avant tout closing',
      benefit: 'Évitez un ajustement de prix de 15-30% post-closing',
      cta: 'Télécharger la checklist PDF',
      badge: 'PDF · 4 pages',
    },
    en: {
      title: 'KHEPRA DD™ Due Diligence Checklist',
      subtitle: 'The 10 essential documents + 7 red flags to identify before any closing',
      benefit: 'Avoid a 15-30% post-closing price adjustment',
      cta: 'Download checklist PDF',
      badge: 'PDF · 4 pages',
    },
  },
  'checklist-governance': {
    fr: {
      title: 'Checklist Gouvernance KHEPRA GOV™',
      subtitle: 'Les 5 dimensions évaluées + la grille de scoring 0-100 pour votre CA',
      benefit: 'Un score >70/100 = ROA 2× supérieur',
      cta: 'Télécharger la checklist PDF',
      badge: 'PDF · 3 pages',
    },
    en: {
      title: 'KHEPRA GOV™ Governance Checklist',
      subtitle: 'The 5 evaluated dimensions + the 0-100 scoring grid for your Board',
      benefit: 'A score >70/100 = 2× higher ROA',
      cta: 'Download checklist PDF',
      badge: 'PDF · 3 pages',
    },
  },
  'checklist-compliance': {
    fr: {
      title: 'Checklist Conformité BCEAO/COBAC',
      subtitle: 'Les 15 exigences prioritaires + le calendrier de mise en conformité 90 jours',
      benefit: 'Évitez les sanctions réglementaires',
      cta: 'Télécharger la checklist PDF',
      badge: 'PDF · 5 pages',
    },
    en: {
      title: 'BCEAO/COBAC Compliance Checklist',
      subtitle: 'The 15 priority requirements + the 90-day compliance calendar',
      benefit: 'Avoid regulatory sanctions',
      cta: 'Download checklist PDF',
      badge: 'PDF · 5 pages',
    },
  },
  'checklist-fundraising': {
    fr: {
      title: 'Checklist Investor Readiness KHEPRA RAISE™',
      subtitle: 'Les 5 étapes + les 6 erreurs fatales à éviter avant de lever des fonds',
      benefit: 'Passez de 15% à 65% de taux de succès',
      cta: 'Télécharger la checklist PDF',
      badge: 'PDF · 4 pages',
    },
    en: {
      title: 'KHEPRA RAISE™ Investor Readiness Checklist',
      subtitle: 'The 5 steps + 6 fatal errors to avoid before fundraising',
      benefit: 'Go from 15% to 65% success rate',
      cta: 'Download checklist PDF',
      badge: 'PDF · 4 pages',
    },
  },
  'checklist-esg': {
    fr: {
      title: 'Checklist ESG KHEPRA ESG™',
      subtitle: 'Les 3 piliers + les 12 KPI ESG à suivre mensuellement',
      benefit: 'Débloquez l\'accès aux financements internationaux',
      cta: 'Télécharger la checklist PDF',
      badge: 'PDF · 3 pages',
    },
    en: {
      title: 'KHEPRA ESG™ Checklist',
      subtitle: 'The 3 pillars + 12 ESG KPIs to track monthly',
      benefit: 'Unlock access to international financing',
      cta: 'Download checklist PDF',
      badge: 'PDF · 3 pages',
    },
  },
};

export function LeadMagnetCTA({ type }: LeadMagnetCTAProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const data = isEn ? LEAD_MAGNETS[type].en : LEAD_MAGNETS[type].fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const body = new URLSearchParams();
      body.append('email', email);
      body.append('lead_magnet', type);
      const res = await fetch(LEAD_MAGNET_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="my-14 rounded-2xl border-2 border-gold-300 bg-gradient-to-br from-amber-50 via-white to-yellow-50 overflow-hidden shadow-lg shadow-gold-100/50">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gold-200 bg-gold-50/50">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-10 h-10 flex items-center justify-center bg-gold-100 rounded-xl flex-shrink-0">
            <i className="ri-file-download-line text-gold-600 text-xl"></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-playfair text-lg font-bold text-gray-900">{data.title}</h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gold-100 text-gold-700 text-xs font-semibold rounded-md">
                <i className="ri-vip-crown-line text-xs"></i>
                {data.badge}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{data.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 flex items-center justify-center bg-emerald-100 rounded-lg flex-shrink-0">
            <i className="ri-check-double-line text-emerald-600 text-lg"></i>
          </div>
          <p className="text-sm text-gray-700 font-medium">{data.benefit}</p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-full">
              <i className="ri-check-line text-emerald-600 text-2xl"></i>
            </div>
            <p className="font-semibold text-gray-900">{isEn ? 'Checklist sent!' : 'Checklist envoyée !'}</p>
            <p className="text-sm text-gray-500 text-center max-w-sm">
              {isEn
                ? 'You will receive the PDF checklist by email within a few minutes.'
                : 'Vous recevrez la checklist PDF par e-mail dans quelques minutes.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" data-readdy-form>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <i className="ri-mail-line text-gray-400 text-sm"></i>
              </div>
              <input
                type="email" name="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={isEn ? 'Your professional email' : 'Votre e-mail professionnel'}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit" disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap hover:from-gold-600 hover:to-gold-700 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {status === 'loading' ? (
                <i className="ri-loader-4-line animate-spin text-base"></i>
              ) : (
                <>
                  <i className="ri-download-cloud-line"></i>
                  {data.cta}
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <i className="ri-error-warning-line"></i>
            {isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}
          </p>
        )}

        {status !== 'success' && (
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><i className="ri-shield-check-line text-green-500"></i>{isEn ? 'Confidential' : 'Confidentiel'}</span>
            <span className="flex items-center gap-1"><i className="ri-spam-2-line text-gold-500"></i>{isEn ? 'No spam' : 'Zéro spam'}</span>
            <span className="flex items-center gap-1"><i className="ri-mail-unread-line text-gray-400"></i>{isEn ? 'Unsubscribe anytime' : 'Désinscription facile'}</span>
          </div>
        )}
      </div>
    </div>
  );
}




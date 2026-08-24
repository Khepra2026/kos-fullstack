import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FORM_URL = 'https://readdy.ai/api/form/d7s541aj1g8i0g4g5d3g';

interface PremiumFinalCTAProps {
  variant?: 'acquisition' | 'governance' | 'fundraising' | 'esg' | 'compliance' | 'default';
}

const VARIANTS = {
  acquisition: {
    fr: {
      preTitle: 'Sécurisez votre acquisition avant signature',
      title: 'Un seul risque non détecté peut coûter plusieurs millions.',
      description: 'La KHEPRA DD™ identifie les red flags avant le closing, structure les clauses de garantie et accompagne l\'intégration post-acquisition. Délais : 60 jours. Confidentialité absolue.',
      cta: 'Demander un diagnostic confidentiel',
      trust: 'Réponse sous 24h · NDA systématique · 5 volets complets',
    },
    en: {
      preTitle: 'Secure your acquisition before signing',
      title: 'A single undetected risk can cost several million.',
      description: 'KHEPRA DD™ identifies red flags before closing, structures guarantee clauses, and supports post-acquisition integration. Timeline: 60 days. Absolute confidentiality.',
      cta: 'Request a confidential diagnosis',
      trust: 'Response within 24h · Systematic NDA · 5 complete pillars',
    },
  },
  governance: {
    fr: {
      preTitle: 'Renforcez votre gouvernance',
      title: 'Une gouvernance >70/100 = ROA 2,8% contre 0,9%.',
      description: 'KHEPRA GOV™ évalue votre maturité de gouvernance sur 4 dimensions, produit un score 0-100 et un plan d\'action priorisé. Délais : 60 jours. Conforme aux principes OCDE et exigences BCEAO/COBAC.',
      cta: 'Demander un diagnostic de gouvernance',
      trust: 'Réponse sous 24h · Score de maturité · Plan d\'action 60 jours',
    },
    en: {
      preTitle: 'Strengthen your governance',
      title: 'Governance >70/100 = ROA 2.8% vs 0.9%.',
      description: 'KHEPRA GOV™ evaluates your governance maturity across 4 dimensions, produces a 0-100 score and a prioritized action plan. Timeline: 60 days. Compliant with OECD principles and BCEAO/COBAC requirements.',
      cta: 'Request a governance diagnosis',
      trust: 'Response within 24h · Maturity score · 60-day action plan',
    },
  },
  fundraising: {
    fr: {
      preTitle: 'Préparez votre levée de fonds',
      title: '68% des PME africaines sont rejetées au premier screening.',
      description: 'KHEPRA RAISE™ structure votre dossier d\'investissement, produit une valorisation DCF crédible et accompagne votre roadshow. Délais : 5 à 6 mois. Taux de succès : 65% vs 15% en moyenne.',
      cta: 'Demander un diagnostic investor readiness',
      trust: 'Réponse sous 24h · Valorisation DCF · 5 phases structurées',
    },
    en: {
      preTitle: 'Prepare your fundraising',
      title: '68% of African SMEs are rejected at first screening.',
      description: 'KHEPRA RAISE™ structures your investment file, produces a credible DCF valuation, and supports your roadshow. Timeline: 5 to 6 months. Success rate: 65% vs 15% average.',
      cta: 'Request an investor readiness diagnosis',
      trust: 'Response within 24h · DCF valuation · 5 structured phases',
    },
  },
  esg: {
    fr: {
      preTitle: 'Atteignez la conformité ESG',
      title: '12 Mds USD de financements conditionnés aux clauses ESG.',
      description: 'KHEPRA ESG™ structure votre dispositif ESG opérationnel, produit un rapport de durabilité conforme GRI et prépare votre audit externe. Délais : 180 jours. Condition d\'accès aux financements IFC, BOAD, BAD.',
      cta: 'Demander un diagnostic ESG',
      trust: 'Réponse sous 24h · Rapport GRI · 180 jours',
    },
    en: {
      preTitle: 'Achieve ESG compliance',
      title: '12 billion USD of financing conditioned on ESG clauses.',
      description: 'KHEPRA ESG™ structures your operational ESG framework, produces a GRI-compliant sustainability report, and prepares you for external audit. Timeline: 180 days. Condition for accessing IFC, BOAD, AfDB financing.',
      cta: 'Request an ESG diagnosis',
      trust: 'Response within 24h · GRI report · 180 days',
    },
  },
  compliance: {
    fr: {
      preTitle: 'Sécurisez votre conformité',
      title: 'La non-conformité BCEAO/COBAC = sanctions et perte d\'agrément.',
      description: 'KHEPRA CONFORMITÉ™ cartographie vos écarts vs exigences réglementaires, structure votre plan de mise en conformité et accompagne vos équipes. Délais : 90 jours.',
      cta: 'Demander un audit de conformité',
      trust: 'Réponse sous 24h · 15 exigences prioritaires · Plan 90 jours',
    },
    en: {
      preTitle: 'Secure your compliance',
      title: 'BCEAO/COBAC non-compliance = sanctions and license loss.',
      description: 'KHEPRA COMPLIANCE™ maps your gaps against regulatory requirements, structures your compliance plan, and supports your teams. Timeline: 90 days.',
      cta: 'Request a compliance audit',
      trust: 'Response within 24h · 15 priority requirements · 90-day plan',
    },
  },
  default: {
    fr: {
      preTitle: 'Confiez votre mission à Khepra Experts',
      title: 'Cabinet boutique spécialisé en Investment, Due Diligence & ESG Advisory.',
      description: 'Nous accompagnons les investisseurs institutionnels, les fonds de private equity et les family offices dans l\'évaluation et la structuration de leurs projets en zone UEMOA et CEMAC. Confidentialité absolue.',
      cta: 'Demander un diagnostic confidentiel',
      trust: 'Réponse sous 24h · NDA systématique · Expertise Afrique',
    },
    en: {
      preTitle: 'Entrust your mission to Khepra Experts',
      title: 'Boutique advisory firm specializing in Investment, Due Diligence & ESG.',
      description: 'We support institutional investors, private equity funds, and family offices in the evaluation and structuring of their projects in the UEMOA and CEMAC zones. Absolute confidentiality.',
      cta: 'Request a confidential diagnosis',
      trust: 'Response within 24h · Systematic NDA · Africa expertise',
    },
  },
};

export function PremiumFinalCTA({ variant = 'default' }: PremiumFinalCTAProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const variantData = VARIANTS[variant] ?? VARIANTS.default;
  const data = isEn ? variantData.en : variantData.fr;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const body = new URLSearchParams();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('organization', formData.organization);
      body.append('message', `${variant}: ${formData.message}`);
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setFormData({ name: '', email: '', organization: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="my-16 relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white shadow-2xl shadow-brand-900/20">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-300/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-8 py-14 md:px-14 md:py-16">
        {/* Pre-title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/20 border border-gold-500/30 rounded-full mb-6">
          <i className="ri-shield-star-line text-gold-400 text-sm"></i>
          <span className="text-gold-300 text-sm font-semibold">{data.preTitle}</span>
        </div>

        <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-5 leading-tight max-w-3xl">
          {data.title}
        </h3>

        <p className="text-foreground-200 text-lg leading-relaxed mb-8 max-w-2xl">
          {data.description}
        </p>

        {!showForm ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-bold text-base whitespace-nowrap cursor-pointer shadow-xl shadow-gold-900/30 hover:shadow-gold-900/50 hover:-translate-y-0.5"
            >
              <i className="ri-mail-send-line text-lg"></i>
              {data.cta}
              <i className="ri-arrow-right-line"></i>
            </button>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
              {data.trust.split(' · ').map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <i className={
                    item.includes('24h') ? 'ri-time-line text-gold-400' :
                    item.includes('NDA') ? 'ri-shield-check-line text-green-400' :
                    item.includes('5') || item.includes('complet') || item.includes('complete') ? 'ri-file-list-3-line text-gold-400' :
                    item.includes('Score') || item.includes('score') ? 'ri-bar-chart-line text-gold-400' :
                    item.includes('DCF') ? 'ri-calculator-line text-gold-400' :
                    item.includes('GRI') ? 'ri-leaf-line text-green-400' :
                    item.includes('15') ? 'ri-list-check-2 text-gold-400' :
                    'ri-check-line text-green-400'
                  }></i>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4" data-readdy-form>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text" name="name" required value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder={isEn ? 'Full name' : 'Nom complet'}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
              <input
                type="email" name="email" required value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="Email"
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
              <input
                type="text" name="organization" required value={formData.organization}
                onChange={e => setFormData(p => ({ ...p, organization: e.target.value }))}
                placeholder={isEn ? 'Organization' : 'Organisation'}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            <textarea
              name="message" value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              rows={2} maxLength={500}
              placeholder={isEn ? 'Briefly describe your project (optional)' : 'Décrivez brièvement votre projet (optionnel)'}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm resize-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            ></textarea>

            {status === 'success' && (
              <div className="flex items-center gap-3 bg-green-500/20 border border-green-400/30 rounded-xl p-4">
                <i className="ri-checkbox-circle-fill text-green-400 text-xl"></i>
                <div>
                  <p className="font-semibold text-green-300 text-sm">{isEn ? 'Request sent successfully!' : 'Demande envoyée avec succès !'}</p>
                  <p className="text-green-200 text-sm">{isEn ? 'Our expert will contact you within 24 hours.' : 'Notre expert vous contactera sous 24h.'}</p>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-3 bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                <i className="ri-error-warning-fill text-red-400 text-xl"></i>
                <p className="text-red-200 text-sm">{isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}</p>
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                type="submit" disabled={status === 'loading'}
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:from-gold-600 hover:to-gold-700 transition-all disabled:opacity-50 cursor-pointer shadow-lg"
              >
                {status === 'loading' ? (isEn ? 'Sending...' : 'Envoi...') : data.cta}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
              >
                {isEn ? 'Cancel' : 'Annuler'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}




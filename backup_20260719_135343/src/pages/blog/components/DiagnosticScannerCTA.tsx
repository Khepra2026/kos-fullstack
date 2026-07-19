import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DIAGNOSTIC_FORM_URL = 'https://readdy.ai/api/form/d7s541aj1g8i0g4g5d3g';

interface DiagnosticScannerCTAProps {
  variant?: 'acquisition' | 'governance' | 'finance' | 'compliance' | 'fundraising' | 'esg' | 'default';
}

const VARIANTS = {
  acquisition: {
    fr: {
      title: 'Votre acquisition est-elle à risque ?',
      subtitle: '5 questions pour évaluer la maturité de votre cible avant le closing',
      questions: [
        'Le titre foncier du siège est-il enregistré au cadastre ?',
        'Le taux de couverture des créances douteuses dépasse-t-il 70 % ?',
        'Les statuts sont-ils conformes à l\'AUSCGIE OHADA ?',
        'La cible dispose-t-elle d\'un plan de relève de direction documenté ?',
        'La conformité LBC/FT a-t-elle été auditée dans les 12 derniers mois ?',
      ],
      score0: '2+ réponses = Non → Risque élevé',
      score1: '1 réponse = Non → Risque modéré',
      score2: '0 réponse = Non → Acquisition sûre',
      ctaLabel: 'Diagnostic express — réponse sous 24h',
      ctaSub: 'Gratuit et confidentiel',
    },
    en: {
      title: 'Is Your Acquisition at Risk?',
      subtitle: '5 questions to assess your target\'s maturity before closing',
      questions: [
        'Is the headquarters land title registered in the land registry?',
        'Does the doubtful receivables coverage ratio exceed 70%?',
        'Are the articles of association compliant with OHADA AUSCGIE?',
        'Does the target have a documented management succession plan?',
        'Has AML/CFT compliance been audited in the last 12 months?',
      ],
      score0: '2+ answers = No → High risk',
      score1: '1 answer = No → Moderate risk',
      score2: '0 answer = No → Safe acquisition',
      ctaLabel: 'Express diagnosis — response within 24h',
      ctaSub: 'Free and confidential',
    },
  },
  governance: {
    fr: {
      title: 'Votre gouvernance est-elle prête pour les investisseurs ?',
      subtitle: '5 questions pour évaluer votre maturité de gouvernance',
      questions: [
        'Votre CA compte-t-il au moins 2 administrateurs indépendants ?',
        'Les fonctions de Président du CA et de DG sont-elles séparées ?',
        'Votre Comité d\'Audit au CA est-il opérationnel ?',
        'Le plan de contrôle interne couvre-t-il 90 % des risques ?',
        'Disposez-vous d\'un plan de relève de direction documenté ?',
      ],
      score0: '2+ réponses = Non → Risque élevé',
      score1: '1 réponse = Non → Risque modéré',
      score2: '0 réponse = Non → Gouvernance prête',
      ctaLabel: 'Diagnostic gouvernance — réponse sous 24h',
      ctaSub: 'Gratuit et confidentiel',
    },
    en: {
      title: 'Is Your Governance Investor-Ready?',
      subtitle: '5 questions to assess your governance maturity',
      questions: [
        'Does your Board have at least 2 independent directors?',
        'Are the Chairman and CEO functions separated?',
        'Is your Board-level Audit Committee operational?',
        'Does your internal control plan cover 90% of risks?',
        'Do you have a documented management succession plan?',
      ],
      score0: '2+ answers = No → High risk',
      score1: '1 answer = No → Moderate risk',
      score2: '0 answer = No → Governance ready',
      ctaLabel: 'Governance diagnosis — response within 24h',
      ctaSub: 'Free and confidential',
    },
  },
  finance: {
    fr: {
      title: 'Votre santé financière est-elle sous contrôle ?',
      subtitle: '5 questions pour évaluer la solidité de votre bilan',
      questions: [
        'Votre ratio de solvabilité dépasse-t-il le seuil réglementaire ?',
        'Votre taux de couverture des NPL dépasse-t-il 70 % ?',
        'Produisez-vous un tableau de bord mensuel des ratios ?',
        'Vos états financiers sont-ils certifiés par un commissaire aux comptes ?',
        'Le TFT est-il produit systématiquement chaque mois ?',
      ],
      score0: '2+ réponses = Non → Risque élevé',
      score1: '1 réponse = Non → Risque modéré',
      score2: '0 réponse = Non → Bilan sain',
      ctaLabel: 'Diagnostic financier — réponse sous 24h',
      ctaSub: 'Gratuit et confidentiel',
    },
    en: {
      title: 'Is Your Financial Health Under Control?',
      subtitle: '5 questions to assess the strength of your balance sheet',
      questions: [
        'Does your solvency ratio exceed the regulatory threshold?',
        'Does your NPL coverage ratio exceed 70%?',
        'Do you produce a monthly ratio dashboard?',
        'Are your financial statements certified by a statutory auditor?',
        'Is the CFS produced systematically every month?',
      ],
      score0: '2+ answers = No → High risk',
      score1: '1 answer = No → Moderate risk',
      score2: '0 answer = No → Healthy balance sheet',
      ctaLabel: 'Financial diagnosis — response within 24h',
      ctaSub: 'Free and confidential',
    },
  },
  compliance: {
    fr: {
      title: 'Votre conformité réglementaire est-elle à jour ?',
      subtitle: '5 questions pour évaluer votre conformité BCEAO/COBAC',
      questions: [
        'Vos ratios prudentiels sont-ils calculés mensuellement ?',
        'Votre Comité ALM se réunit-il trimestriellement ?',
        'Votre RCLBC/FT est-il formé et certifié ?',
        'Votre politique LBC/FT a-t-elle été révisée dans les 12 derniers mois ?',
        'Vos états prudentiels sont-ils transmis dans les délais ?',
      ],
      score0: '2+ réponses = Non → Risque élevé',
      score1: '1 réponse = Non → Risque modéré',
      score2: '0 réponse = Non → Conformité validée',
      ctaLabel: 'Audit de conformité — réponse sous 24h',
      ctaSub: 'Gratuit et confidentiel',
    },
    en: {
      title: 'Is Your Regulatory Compliance Up to Date?',
      subtitle: '5 questions to assess your BCEAO/COBAC compliance',
      questions: [
        'Are your prudential ratios calculated monthly?',
        'Does your ALM Committee meet quarterly?',
        'Is your AML/CFT Officer trained and certified?',
        'Has your AML/CFT policy been reviewed in the last 12 months?',
        'Are your prudential statements transmitted within deadlines?',
      ],
      score0: '2+ answers = No → High risk',
      score1: '1 answer = No → Moderate risk',
      score2: '0 answer = No → Compliance validated',
      ctaLabel: 'Compliance audit — response within 24h',
      ctaSub: 'Free and confidential',
    },
  },
  fundraising: {
    fr: {
      title: 'Êtes-vous prêt pour votre levée de fonds ?',
      subtitle: '5 questions pour évaluer votre investor readiness',
      questions: [
        'Disposez-vous d\'un business plan avec modélisation financière sur 5 ans ?',
        'Vos statuts sont-ils conformes à l\'AUSCGIE OHADA ?',
        'Votre CA compte-t-il au moins 2 administrateurs indépendants ?',
        'Votre valorisation est-elle justifiée par méthode DCF ?',
        'Votre dossier ESG est-il structuré si applicable ?',
      ],
      score0: '2+ réponses = Non → Risque élevé',
      score1: '1 réponse = Non → Risque modéré',
      score2: '0 réponse = Non → Prêt à lever',
      ctaLabel: 'Diagnostic investor readiness — réponse sous 24h',
      ctaSub: 'Gratuit et confidentiel',
    },
    en: {
      title: 'Are You Ready for Your Fundraising?',
      subtitle: '5 questions to assess your investor readiness',
      questions: [
        'Do you have a business plan with 5-year financial modeling?',
        'Are your articles of association compliant with OHADA AUSCGIE?',
        'Does your Board have at least 2 independent directors?',
        'Is your valuation justified by DCF method?',
        'Is your ESG file structured if applicable?',
      ],
      score0: '2+ answers = No → High risk',
      score1: '1 answer = No → Moderate risk',
      score2: '0 answer = No → Ready to raise',
      ctaLabel: 'Investor readiness diagnosis — response within 24h',
      ctaSub: 'Free and confidential',
    },
  },
  esg: {
    fr: {
      title: 'Votre conformité ESG est-elle opérationnelle ?',
      subtitle: '5 questions pour évaluer votre maturité ESG',
      questions: [
        'Disposez-vous d\'une politique ESG formelle intégrée aux décisions de crédit ?',
        'Avez-vous un Comité ESG au niveau du CA ?',
        'Vos indicateurs ESG sont-ils suivis mensuellement ?',
        'Avez-vous produit un rapport de durabilité conforme GRI ?',
        'Vos équipes de crédit sont-elles formées aux critères ESG ?',
      ],
      score0: '2+ réponses = Non → Risque élevé',
      score1: '1 réponse = Non → Risque modéré',
      score2: '0 réponse = Non → ESG conforme',
      ctaLabel: 'Diagnostic ESG — réponse sous 24h',
      ctaSub: 'Gratuit et confidentiel',
    },
    en: {
      title: 'Is Your ESG Compliance Operational?',
      subtitle: '5 questions to assess your ESG maturity',
      questions: [
        'Do you have a formal ESG policy integrated into credit decisions?',
        'Do you have an ESG Committee at Board level?',
        'Are your ESG indicators tracked monthly?',
        'Have you produced a GRI-compliant sustainability report?',
        'Are your credit teams trained on ESG criteria?',
      ],
      score0: '2+ answers = No → High risk',
      score1: '1 answer = No → Moderate risk',
      score2: '0 answer = No → ESG compliant',
      ctaLabel: 'ESG diagnosis — response within 24h',
      ctaSub: 'Free and confidential',
    },
  },
  default: {
    fr: {
      title: 'Votre organisation est-elle prête ?',
      subtitle: '5 questions pour évaluer votre maturité stratégique',
      questions: [
        'Votre plan stratégique est-il modélisé financièrement sur 3 à 5 ans ?',
        'Vos KPI sont-ils suivis mensuellement et présentés au CA ?',
        'Votre gouvernance respecte-t-elle les standards BCEAO/COBAC ?',
        'Votre conformité réglementaire est-elle auditée annuellement ?',
        'Disposez-vous d\'un plan de relève de direction documenté ?',
      ],
      score0: '2+ réponses = Non → Risque élevé',
      score1: '1 réponse = Non → Risque modéré',
      score2: '0 réponse = Non → Organisation prête',
      ctaLabel: 'Diagnostic stratégique — réponse sous 24h',
      ctaSub: 'Gratuit et confidentiel',
    },
    en: {
      title: 'Is Your Organization Ready?',
      subtitle: '5 questions to assess your strategic maturity',
      questions: [
        'Is your strategic plan financially modeled over 3 to 5 years?',
        'Are your KPIs tracked monthly and presented to the Board?',
        'Does your governance meet BCEAO/COBAC standards?',
        'Is your regulatory compliance audited annually?',
        'Do you have a documented management succession plan?',
      ],
      score0: '2+ answers = No → High risk',
      score1: '1 answer = No → Moderate risk',
      score2: '0 answer = No → Organization ready',
      ctaLabel: 'Strategic diagnosis — response within 24h',
      ctaSub: 'Free and confidential',
    },
  },
};

export function DiagnosticScannerCTA({ variant = 'default' }: DiagnosticScannerCTAProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const data = isEn ? VARIANTS[variant].en : VARIANTS[variant].fr;
  const noCount = Object.values(checked).filter(Boolean).length;

  const handleToggle = (index: number) => {
    setChecked(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const body = new URLSearchParams();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('organization', formData.organization);
      body.append('message', `Diagnostic ${variant}: ${formData.message} | Score: ${noCount}/5 Non`);
      const res = await fetch(DIAGNOSTIC_FORM_URL, {
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
    <div className="my-14 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 via-white to-amber-50 overflow-hidden shadow-lg shadow-red-100/50">
      {/* Header */}
      <div className="px-6 py-5 border-b border-red-100 bg-red-50/50">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-xl flex-shrink-0">
            <i className="ri-focus-3-line text-red-600 text-xl"></i>
          </div>
          <div>
            <h3 className="font-playfair text-xl font-bold text-gray-900">{data.title}</h3>
          </div>
        </div>
        <p className="text-sm text-gray-500 ml-13">{data.subtitle}</p>
      </div>

      {/* Questions */}
      <div className="px-6 py-5 space-y-3">
        {data.questions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleToggle(i)}
            className={`w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all cursor-pointer border ${
              checked[i]
                ? 'bg-red-50 border-red-200 shadow-sm'
                : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 mt-0.5 border-2 transition-colors ${
              checked[i] ? 'bg-red-500 border-red-500' : 'border-gray-300 bg-white'
            }`}>
              {checked[i] && <i className="ri-check-line text-white text-sm"></i>}
            </div>
            <span className={`text-sm leading-relaxed ${checked[i] ? 'text-red-800 font-medium' : 'text-gray-700'}`}>
              {q}
            </span>
          </button>
        ))}
      </div>

      {/* Score bar */}
      <div className="px-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                noCount === 0 ? 'bg-emerald-500 w-full' :
                noCount === 1 ? 'bg-amber-500 w-1/5' :
                noCount >= 2 ? 'bg-red-500 w-full' : 'bg-gray-200 w-0'
              }`}
              style={{ width: noCount === 0 ? '100%' : noCount >= 2 ? '100%' : `${noCount * 20}%` }}
            ></div>
          </div>
          <span className={`text-sm font-bold whitespace-nowrap ${
            noCount === 0 ? 'text-emerald-600' :
            noCount === 1 ? 'text-amber-600' :
            'text-red-600'
          }`}>
            {noCount}/5 {isEn ? 'No' : 'Non'}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1.5">
          {noCount >= 2 ? data.score0 : noCount === 1 ? data.score1 : data.score2}
        </p>
      </div>

      {/* CTA */}
      <div className="px-6 py-5 border-t border-gray-100">
        {!showForm ? (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-200 cursor-pointer"
            >
              <i className="ri-flashlight-line"></i>
              {data.ctaLabel}
              <i className="ri-arrow-right-line"></i>
            </button>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><i className="ri-shield-check-line text-green-600"></i>{data.ctaSub}</span>
              <span className="flex items-center gap-1"><i className="ri-time-line text-red-500"></i>24h</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3" data-readdy-form>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text" name="name" required value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder={isEn ? 'Full name' : 'Nom complet'}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email" name="email" required value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="Email"
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text" name="organization" required value={formData.organization}
                onChange={e => setFormData(p => ({ ...p, organization: e.target.value }))}
                placeholder={isEn ? 'Organization' : 'Organisation'}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>
            <textarea
              name="message" value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              rows={2} maxLength={500}
              placeholder={isEn ? 'Describe your situation (optional)' : 'Décrivez votre situation (optionnel)'}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <i className="ri-checkbox-circle-fill"></i>
                {isEn ? 'Request sent! Our expert will contact you within 24 hours.' : 'Demande envoyée ! Notre expert vous contactera sous 24h.'}
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <i className="ri-error-warning-fill"></i>
                {isEn ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}
              </div>
            )}
            <button
              type="submit" disabled={status === 'loading'}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 cursor-pointer"
            >
              {status === 'loading' ? (isEn ? 'Sending...' : 'Envoi...') : data.ctaLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}




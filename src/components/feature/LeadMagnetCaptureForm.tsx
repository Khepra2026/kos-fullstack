import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { calculateLeadScore, type ScoringInput } from '@/utils/leadScoring';
import type { LeadMagnet } from '@/mocks/leadMagnets';

interface LeadMagnetCaptureFormProps {
  leadMagnet: LeadMagnet;
  formUrl: string;
  onSuccess?: (email: string) => void;
  variant?: 'modal' | 'inline' | 'hero';
  accentColor?: string;
}

const COUNTRY_OPTIONS = [
  { value: 'CI', label: "Côte d'Ivoire" },
  { value: 'SN', label: 'Sénégal' },
  { value: 'BJ', label: 'Bénin' },
  { value: 'TG', label: 'Togo' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'ML', label: 'Mali' },
  { value: 'CM', label: 'Cameroun' },
  { value: 'GA', label: 'Gabon' },
  { value: 'CG', label: 'Congo' },
  { value: 'GN', label: 'Guinée' },
  { value: 'NE', label: 'Niger' },
  { value: 'autre', label: 'Autre' },
];

export default function LeadMagnetCaptureForm({
  leadMagnet,
  formUrl,
  onSuccess,
  variant = 'inline',
  accentColor,
}: LeadMagnetCaptureFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const color = accentColor || leadMagnet.accentColor;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    leadMagnet.formFields.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) {
        errors[field.name] = 'Ce champ est requis';
      }
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          errors[field.name] = 'Email invalide';
        }
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');

    try {
      // 1. Submit to Readdy Form
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value);
      });
      body.append('lead_magnet', leadMagnet.id);
      body.append('lead_magnet_title', leadMagnet.title);
      body.append('lead_magnet_category', leadMagnet.category);

      await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      // 2. Save lead to Supabase with scoring
      const scoringInput: ScoringInput = {
        fullName: formData.full_name || '',
        email: formData.email || '',
        organization: formData.organization,
        position: formData.position,
        country: formData.country,
        sector: formData.sector || formData.company_size,
        formType: leadMagnet.id,
        leadMagnetCategory: leadMagnet.category,
        activities: [{ type: 'form_submit', count: 1 }],
      };

      const scoringResult = calculateLeadScore(scoringInput);

      await supabase.from('leads').insert({
        full_name: formData.full_name,
        email: formData.email,
        organization: formData.organization || null,
        position: formData.position || null,
        country: formData.country || null,
        sector: formData.sector || null,
        status: 'new',
        lead_score: scoringResult.score,
        lead_category: scoringResult.category,
        form_type: leadMagnet.id,
        source_page: window.location.pathname,
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || null,
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || null,
        score_breakdown: scoringResult.breakdown,
        recommendations: scoringResult.recommendations,
      });

      setSubmitted(true);
      onSuccess?.(formData.email || '');
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessState leadMagnet={leadMagnet} email={formData.email} />;
  }

  const isModal = variant === 'modal';
  const isHero = variant === 'hero';

  return (
    <form
      data-readdy-form
      id={`form-${leadMagnet.id}`}
      onSubmit={handleSubmit}
      className={`${isModal ? 'max-h-[80vh] overflow-y-auto' : ''}`}
    >
      {/* Header */}
      <div className={`${isHero ? 'mb-6' : 'mb-5'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}20` }}
          >
            <i className={`${leadMagnet.icon} text-xl`} style={{ color }}></i>
          </div>
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1"
              style={{ backgroundColor: `${color}15`, color }}
            >
              <i className="ri-download-2-line text-xs"></i>
              {leadMagnet.format} Gratuit
            </div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-foreground-900 leading-tight mb-1">
          {leadMagnet.title}
        </h3>
        <p className="text-sm text-foreground-600">
          Accès immédiat après soumission — {leadMagnet.timeToComplete}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        {leadMagnet.formFields.map((field) => (
          <div key={field.name}>
            <label className="block text-xs font-medium text-foreground-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 transition-all outline-none bg-white text-foreground-900 ${
                  fieldErrors[field.name]
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-background-200 focus:ring-background-200'
                }`}
                style={{ '--tw-ring-color': `${color}30` } as React.CSSProperties}
              >
                <option value="">Sélectionner...</option>
                {(field.options || []).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                maxLength={500}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 transition-all outline-none bg-white resize-none text-foreground-900 ${
                  fieldErrors[field.name]
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-background-200 focus:ring-background-200'
                }`}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 transition-all outline-none bg-white text-foreground-900 ${
                  fieldErrors[field.name]
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-background-200 focus:ring-background-200'
                }`}
              />
            )}
            {fieldErrors[field.name] && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <i className="ri-error-warning-line"></i>
                {fieldErrors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
          <i className="ri-error-warning-line"></i>
          {error}
        </div>
      )}

      {/* CTA Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 py-3 px-5 rounded-xl text-sm font-bold text-white transition-all whitespace-nowrap cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ backgroundColor: color }}
      >
        {loading ? (
          <>
            <i className="ri-loader-4-line animate-spin"></i>
            Envoi en cours...
          </>
        ) : (
          <>
            <i className="ri-download-2-line"></i>
            {leadMagnet.ctaText}
          </>
        )}
      </button>

      {/* Trust signals */}
      <p className="text-xs text-foreground-500 text-center mt-3 flex items-center justify-center gap-1">
        <i className="ri-lock-2-line"></i>
        Confidentialité garantie — Pas de spam — Désabonnement en 1 clic
      </p>
    </form>
  );
}

function SuccessState({ leadMagnet, email }: { leadMagnet: LeadMagnet; email?: string }) {
  return (
    <div className="text-center py-6">
      <div
        className="w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4"
        style={{ backgroundColor: `${leadMagnet.accentColor}15` }}
      >
        <i
          className="ri-checkbox-circle-line text-4xl"
          style={{ color: leadMagnet.accentColor }}
        ></i>
      </div>
      <h3 className="text-xl font-bold text-foreground-900 mb-2">
        Accès envoyé sur votre email
      </h3>
      <p className="text-sm text-foreground-600 mb-4">
        Votre <strong>{leadMagnet.format}</strong> a été envoyé à{' '}
        <strong>{email}</strong>. Vérifiez vos spams si vous ne le recevez pas sous 5 minutes.
      </p>
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
        style={{ backgroundColor: `${leadMagnet.accentColor}15`, color: leadMagnet.accentColor }}
      >
        <i className="ri-mail-check-line"></i>
        Email en route — Vérifiez votre boîte
      </div>
      <div className="mt-6 pt-5 border-t border-background-100">
        <p className="text-xs text-foreground-500 mb-3">
          Prêt pour aller plus loin ?
        </p>
        <a
          href="/diagnostic-flash/"
          className="inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: leadMagnet.accentColor }}
        >
          <i className="ri-flashlight-line"></i>
          Diagnostic Flash Gratuit — 15 min
        </a>
      </div>
    </div>
  );
}




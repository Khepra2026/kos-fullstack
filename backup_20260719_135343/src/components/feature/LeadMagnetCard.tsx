import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { LeadMagnet } from '@/mocks/leadMagnets';
import LeadMagnetCaptureForm from '@/components/feature/LeadMagnetCaptureForm';

interface LeadMagnetCardProps {
  leadMagnet: LeadMagnet;
  formUrl: string;
  showForm?: boolean;
  compact?: boolean;
}

export default function LeadMagnetCard({
  leadMagnet,
  formUrl,
  showForm = false,
  compact = false,
}: LeadMagnetCardProps) {
  const [formVisible, setFormVisible] = useState(showForm);
  const [showModal, setShowModal] = useState(false);

  const categoryLabels: Record<string, string> = {
    conformite: 'Conformité & Régulation',
    finance: 'Finance & Investissement',
    esg: 'ESG & Gouvernement Durable',
    gouvernance: 'Gouvernance & Conformité',
    'due-diligence': 'Due Diligence & Évaluation',
  };

  const formatLabels: Record<string, string> = {
    PDF: 'PDF Téléchargeable',
    Checklist: 'Checklist Interactive',
    Diagnostic: 'Diagnostic Interactif',
    Simulation: 'Simulation',
    Template: 'Template',
  };

  const formatIcons: Record<string, string> = {
    PDF: 'ri-file-pdf-line',
    Checklist: 'ri-check-double-line',
    Diagnostic: 'ri-stethoscope-line',
    Simulation: 'ri-calculator-line',
    Template: 'ri-file-word-line',
  };

  const difficultyColors: Record<string, string> = {
    Facile: 'bg-emerald-50 text-emerald-700',
    Moyen: 'bg-amber-50 text-amber-700',
    Avancé: 'bg-red-50 text-red-700',
  };

  if (compact) {
    return (
      <div className="bg-background-50 border border-background-200 rounded-xl p-4 hover:border-background-300 transition-all group">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ backgroundColor: `${leadMagnet.accentColor}15` }}
          >
            <i
              className={`${leadMagnet.icon} text-lg`}
              style={{ color: leadMagnet.accentColor }}
            ></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-foreground-500">
                {formatLabels[leadMagnet.format]}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${difficultyColors[leadMagnet.difficulty]}`}>
                {leadMagnet.difficulty}
              </span>
            </div>
            <h3 className="text-sm font-bold text-foreground-900 leading-tight mb-1">
              {leadMagnet.title}
            </h3>
            <p className="text-xs text-foreground-600 line-clamp-2 mb-2">
              {leadMagnet.subtitle}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-foreground-500 flex items-center gap-1">
                <i className="ri-time-line"></i>
                {leadMagnet.timeToComplete}
              </span>
              {leadMagnet.stats && (
                <span
                  className="text-xs font-bold"
                  style={{ color: leadMagnet.accentColor }}
                >
                  {leadMagnet.stats.value}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full mt-3 py-2 px-3 rounded-lg text-xs font-bold text-white transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
          style={{ backgroundColor: leadMagnet.accentColor }}
        >
          <i className="ri-download-2-line"></i>
          {leadMagnet.ctaText}
        </button>

        {showModal && (
          <ModalWrapper
            leadMagnet={leadMagnet}
            formUrl={formUrl}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    );
  }

  return (
    <article className="bg-background-50 border border-background-200 rounded-2xl overflow-hidden hover:border-background-300 transition-all group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={leadMagnet.imageUrl}
          alt={leadMagnet.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `linear-gradient(to bottom, transparent, ${leadMagnet.accentColor})` }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white bg-black/30 backdrop-blur-sm">
            {categoryLabels[leadMagnet.category]}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white bg-black/30 backdrop-blur-sm flex items-center gap-1">
            <i className={formatIcons[leadMagnet.format] + ' text-xs'}></i>
            Gratuit
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-white/90 text-xs flex items-center gap-1">
            <i className="ri-time-line"></i>
            {leadMagnet.timeToComplete}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[leadMagnet.difficulty]}`}>
            {leadMagnet.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-7 h-7 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: `${leadMagnet.accentColor}15` }}
          >
            <i
              className={`${leadMagnet.icon} text-sm`}
              style={{ color: leadMagnet.accentColor }}
            ></i>
          </div>
          <span className="text-xs font-medium text-foreground-500">
            {formatLabels[leadMagnet.format]}
          </span>
          {leadMagnet.stats && (
            <span
              className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${leadMagnet.accentColor}15`, color: leadMagnet.accentColor }}
            >
              {leadMagnet.stats.value}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-foreground-900 leading-tight mb-1.5">
          {leadMagnet.title}
        </h3>
        <p className="text-sm text-foreground-600 mb-3 line-clamp-2">
          {leadMagnet.subtitle}
        </p>

        {/* Benefits preview */}
        <ul className="space-y-1 mb-4">
          {leadMagnet.benefits.slice(0, 3).map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
              <i
                className="ri-check-line text-xs mt-0.5 flex-shrink-0"
                style={{ color: leadMagnet.accentColor }}
              ></i>
              {benefit}
            </li>
          ))}
        </ul>

        {/* Target */}
        <div className="flex items-center gap-1.5 mb-4 pb-4 border-b border-background-100">
          <i className="ri-user-line text-xs text-foreground-400"></i>
          <span className="text-xs text-foreground-500">
            Pour : <strong>{leadMagnet.targetAudience}</strong>
          </span>
        </div>

        {/* Form or CTA */}
        {formVisible ? (
          <div className="animate-fadeIn">
            <LeadMagnetCaptureForm
              leadMagnet={leadMagnet}
              formUrl={formUrl}
              variant="inline"
            />
          </div>
        ) : (
          <button
            onClick={() => setFormVisible(true)}
            className="w-full py-3 px-5 rounded-xl text-sm font-bold text-white transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 hover:opacity-90"
            style={{ backgroundColor: leadMagnet.accentColor }}
          >
            <i className="ri-download-2-line"></i>
            {leadMagnet.ctaText}
          </button>
        )}
      </div>
    </article>
  );
}

function ModalWrapper({
  leadMagnet,
  formUrl,
  onClose,
}: {
  leadMagnet: LeadMagnet;
  formUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-background-50 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-background-100 text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer"
        >
          <i className="ri-close-line"></i>
        </button>
        <LeadMagnetCaptureForm
          leadMagnet={leadMagnet}
          formUrl={formUrl}
          variant="modal"
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}




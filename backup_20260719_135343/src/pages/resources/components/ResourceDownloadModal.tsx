import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { jsPDF } from 'jspdf';
import { generateGuideById } from '@/utils/generateGuidePDF';
import { generateGuideByIdEn } from '@/utils/generateGuidePDFEn';
import { errorTracker } from '@/utils/errorTracking';

const WHITEPAPER_FORM_URL = 'https://readdy.ai/api/form/d8q0rl5cg4qspo125egg';
const LOGO_URL = 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png';

async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { mode: 'cors', cache: 'no-cache' });
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function generateAndDownloadWhitepaperPDF(resource: any): Promise<void> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const BRAND_R = 26, BRAND_G = 58, BRAND_B = 42;
  const GOLD_R = 201, GOLD_G = 168, GOLD_B = 76;

  const logoBase64 = await loadImageAsBase64(LOGO_URL);
  const coverBase64 = resource.image ? await loadImageAsBase64(resource.image) : null;

  // Cover page
  if (coverBase64) {
    try { doc.addImage(coverBase64, 'JPEG', 0, 0, 210, 297); } catch { /* fallback */ }
  }
  if (!coverBase64) {
    doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
    doc.rect(0, 0, 210, 297, 'F');
  }
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  (doc as any).setGState(new (doc as any).GState({ opacity: 0.75 }));
  doc.rect(0, 0, 210, 297, 'F');
  (doc as any).setGState(new (doc as any).GState({ opacity: 1 }));

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 195, 210, 1.5, 'F');
  doc.rect(0, 199, 210, 0.5, 'F');
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 205, 210, 92, 'F');

  if (logoBase64) {
    try {
      const fmt = logoBase64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, fmt, 14, 14, 24, 24);
    } catch { /* fallback */ }
  }

  // Badge
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.roundedRect(14, 50, 60, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
  doc.text((resource.category || 'LIVRE BLANC').toUpperCase(), 44, 56.5, { align: 'center' });

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(resource.title, 180);
  doc.text(titleLines, 14, 72);
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 72 + titleLines.length * 12, 50, 1.5, 'F');

  // White block info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
  doc.text('Livre Blanc — KHEPRA EXPERTS', 14, 220);
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 223, 50, 0.8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Pages : ${resource.pages || 'N/A'} | ${resource.year || '2025'}`, 14, 232);
  doc.text('contact@khepraexperts.com', 14, 239);
  doc.text('Lomé, Togo', 14, 246);

  if (logoBase64) {
    try {
      const fmt = logoBase64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, fmt, 172, 212, 24, 24);
    } catch { /* fallback */ }
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('khepraexperts.com', 196, 290, { align: 'right' });

  // Page 2 — Description
  doc.addPage();
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, 'F');

  // Header
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 20, 210, 1.2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('KHEPRA EXPERTS', 14, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 180, 180);
  doc.text(resource.title, 14, 18);

  // Footer
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(0, 284, 210, 13, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 284, 210, 0.8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com | +228 93 98 49 09 | Lomé, Togo', 105, 291, { align: 'center' });

  let y = 32;
  // Section title
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, y, 182, 0.5, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(14, y + 2, 5, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('À propos de ce Livre Blanc', 23, y + 9);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  const descLines = doc.splitTextToSize(resource.description || 'Livre blanc KHEPRA EXPERTS — publication experte en finance, gouvernance et conformité réglementaire en Afrique francophone.', 182);
  doc.text(descLines, 14, y);
  y += descLines.length * 5.5 + 12;

  // Info box
  doc.setFillColor(249, 246, 240);
  doc.roundedRect(14, y, 182, 36, 3, 3, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 3, 36, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
  doc.text('Informations', 22, y + 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  doc.text(`Catégorie : ${resource.category || 'Livre Blanc'}`, 22, y + 17);
  doc.text(`Pages : ${resource.pages || 'N/A'}`, 22, y + 24);
  doc.text(`Publication : ${resource.year || '2025'}`, 22, y + 31);
  y += 48;

  // Closing
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 28, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('Téléchargé depuis KHEPRA EXPERTS', 105, y + 11, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(210, 220, 215);
  doc.text('contact@khepraexperts.com | khepraexperts.com/whitepapers', 105, y + 20, { align: 'center' });

  const sanitized = resource.title.replace(/[^a-z0-9\u00e0-\u00fc\s-]/gi, '').replace(/\s+/g, '-').slice(0, 50);
  doc.save(`KHEPRA-Livre-Blanc-${sanitized}.pdf`);
}

interface ResourceDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: string;
    title: string;
    downloadUrl: string;
    image?: string;
    description?: string;
    pages?: number | string;
    year?: string;
    category?: string;
  } | null;
  isWhitepaper?: boolean;
}

const ResourceDownloadModal = ({ isOpen, onClose, resource, isWhitepaper = false }: ResourceDownloadModalProps) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    organization: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !resource) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName.trim()) {
      setError(t('resources.modal.errors.firstName'));
      return;
    }
    if (!formData.email.trim()) {
      setError(t('resources.modal.errors.email'));
      return;
    }
    if (!validateEmail(formData.email)) {
      setError(t('resources.modal.errors.emailInvalid'));
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('resource_downloads')
        .insert([{
          first_name: formData.firstName.trim(),
          email: formData.email.trim().toLowerCase(),
          organization: formData.organization.trim() || null,
          resource_id: resource.id,
          resource_title: resource.title,
          resource_type: isWhitepaper ? 'whitepaper' : 'guide',
        }]);

      if (dbError) throw dbError;

      if (isWhitepaper) {
        // Submit to Readdy form API
        const formBody = new URLSearchParams({
          firstName: formData.firstName.trim(),
          email: formData.email.trim().toLowerCase(),
          organization: formData.organization.trim() || '',
          resourceId: resource.id,
          resourceTitle: resource.title,
          resourceType: 'whitepaper',
          source: 'whitepapers',
        });
        await fetch(WHITEPAPER_FORM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString(),
        });

        // Generate and download PDF
        await generateAndDownloadWhitepaperPDF(resource);
      } else {
        const currentLang = i18n.language;
        if (currentLang === 'en') {
          await generateGuideByIdEn(resource.id, resource.title);
        } else {
          await generateGuideById(resource.id, resource.title);
        }
      }

      setShowSuccess(true);
      setFormData({ firstName: '', email: '', organization: '' });

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 4000);
    } catch (err) {
      errorTracker.captureError({
        message: (err as Error).message || 'Erreur lors du téléchargement',
        stack: (err as Error).stack,
        type: 'error',
        context: {
          context: 'ResourceDownloadModal',
          resourceId: resource.id,
          resourceTitle: resource.title,
          isWhitepaper,
        },
      });
      setError(t('resources.modal.errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ firstName: '', email: '', organization: '' });
      setError('');
      setShowSuccess(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                {isWhitepaper ? t('whitepapers.downloadModal.title', { defaultValue: 'Télécharger ce livre blanc' }) : t('resources.modal.title')}
              </h3>
              <p className="text-sm text-gray-600">{resource.title}</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Success */}
        {showSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-3xl text-green-600"></i>
            </div>
            <h4 className="font-playfair text-xl font-bold text-gray-900 mb-2">
              {isWhitepaper ? 'Téléchargement lancé !' : t('resources.modal.success.title')}
            </h4>
            <p className="text-gray-600">
              {isWhitepaper
                ? 'Le PDF a été téléchargé. Vous recevrez également une copie par email.'
                : t('resources.modal.success.message')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-readdy-form="" id="whitepaper-download-form" className="p-6 space-y-4">
            <input type="text" name="website_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 pointer-events-none w-0 h-0" />
            <p className="text-sm text-gray-600 mb-4">
              {isWhitepaper
                ? t('whitepapers.downloadModal.subtitle', { defaultValue: 'Renseignez vos informations pour télécharger ce livre blanc en PDF.' })
                : t('resources.modal.subtitle')}
            </p>

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('resources.modal.form.firstName')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('resources.modal.form.firstNamePlaceholder')}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-background-100 disabled:cursor-not-allowed text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('resources.modal.form.email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('resources.modal.form.emailPlaceholder')}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-background-100 disabled:cursor-not-allowed text-sm"
              />
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                {t('resources.modal.form.organization')}{' '}
                <span className="text-gray-400 text-xs">({t('resources.modal.form.optional')})</span>
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder={t('resources.modal.form.organizationPlaceholder')}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-background-100 disabled:cursor-not-allowed text-sm"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <i className="ri-error-warning-line text-red-500 mt-0.5"></i>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {isSubmitting && (
              <div className="flex items-center gap-2 p-3 bg-secondary-50 border border-secondary-200 rounded-lg">
                <i className="ri-loader-4-line animate-spin text-secondary-600"></i>
                <p className="text-sm text-secondary-800">
                  {isWhitepaper
                    ? 'Génération du PDF en cours...'
                    : t('resources.modal.generating')}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-background-50 font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:bg-secondary-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  {t('resources.modal.form.submitting')}
                </>
              ) : (
                <>
                  <i className="ri-download-cloud-line"></i>
                  {isWhitepaper
                    ? 'Télécharger le PDF'
                    : t('resources.modal.form.submit')}
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">{t('resources.modal.privacy')}</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResourceDownloadModal;




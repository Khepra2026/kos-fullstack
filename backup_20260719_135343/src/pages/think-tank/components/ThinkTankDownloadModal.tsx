import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { jsPDF } from 'jspdf';
import type { ThinkTankPublication } from '@/mocks/thinkTankPublications';

const DOWNLOAD_FORM_URL = 'https://readdy.ai/api/form/d8q0rl5cg4qspo125eg0';

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

async function generateAndDownloadThinkTankPDF(pub: ThinkTankPublication): Promise<void> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const BRAND_R = 26, BRAND_G = 58, BRAND_B = 42;
  const GOLD_R = 201, GOLD_G = 168, GOLD_B = 76;
  const LIGHT_R = 249, LIGHT_G = 246, LIGHT_B = 240;

  const logoBase64 = await loadImageAsBase64(LOGO_URL);
  const coverBase64 = await loadImageAsBase64(pub.image);

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

  // Badge type
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.roundedRect(14, 50, 70, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
  const typeLabels: Record<string, string> = {
    'position-paper': 'POSITION PAPER',
    'policy-brief': 'POLICY BRIEF',
    'sector-study': 'ÉTUDE SECTORIELLE',
    'regulatory-foresight': 'PROSPECTIVE RÉG.',
    'working-paper': 'WORKING PAPER',
    'annual-report': 'RAPPORT ANNUEL',
  };
  doc.text((typeLabels[pub.type] || pub.type).toUpperCase(), 49, 56.5, { align: 'center' });

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(pub.title, 180);
  doc.text(titleLines, 14, 72);
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 72 + titleLines.length * 13, 50, 1.5, 'F');

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(200, 215, 208);
  const subLines = doc.splitTextToSize(pub.subtitle, 170);
  doc.text(subLines, 14, 72 + titleLines.length * 13 + 8);

  // White block info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
  doc.text('KHEPRA THINK TANK — Publication de Recherche', 14, 220);
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 223, 50, 0.8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(`Auteur : ${pub.author}`, 14, 232);
  doc.text(`Zone : ${pub.zone} | ${pub.pages} pages`, 14, 239);
  doc.text(`Date : ${pub.date}`, 14, 246);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('thinktank@khepraexperts.com', 196, 290, { align: 'right' });

  // Page 2 — Abstract + Key Findings
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
  doc.text('KHEPRA THINK TANK', 14, 13);

  // Footer
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(0, 284, 210, 13, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 284, 210, 0.8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('thinktank@khepraexperts.com | khepraexperts.com', 105, 291, { align: 'center' });

  let y = 32;
  // Section title
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, y, 182, 0.5, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(14, y + 2, 5, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('Résumé', 23, y + 9);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(70, 70, 70);
  const abstractLines = doc.splitTextToSize(pub.abstract, 182);
  doc.text(abstractLines, 14, y);
  y += abstractLines.length * 5.5 + 8;

  // Key findings
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, y, 182, 0.5, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(14, y + 2, 5, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('Principaux Constats', 23, y + 9);
  y += 20;

  for (const finding of pub.keyFindings) {
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.circle(18, y - 1.5, 1.1, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(70, 70, 70);
    const fl = doc.splitTextToSize(finding, 172);
    doc.text(fl, 22, y);
    y += fl.length * 5.5 + 3;
  }

  y += 5;
  // Regulatory framework
  if (pub.regulatoryFramework.length > 0) {
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.rect(14, y, 182, 0.5, 'F');
    doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
    doc.rect(14, y + 2, 5, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
    doc.text('Cadre Réglementaire de Référence', 23, y + 9);
    y += 20;

    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    const boxH = pub.regulatoryFramework.length * 8 + 12;
    doc.roundedRect(14, y, 182, boxH, 3, 3, 'F');
    doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
    doc.roundedRect(14, y, 3, boxH, 1.5, 1.5, 'F');
    let ry = y + 8;
    for (const ref of pub.regulatoryFramework) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      doc.text(`• ${ref}`, 20, ry);
      ry += 8;
    }
    y += boxH + 10;
  }

  // Footer text
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 28, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
  doc.text('Téléchargé depuis KHEPRA THINK TANK', 105, y + 11, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(210, 220, 215);
  doc.text('thinktank@khepraexperts.com | khepraexperts.com/think-tank', 105, y + 20, { align: 'center' });

  const sanitized = pub.title.replace(/[^a-z0-9\u00e0-\u00fc\s-]/gi, '').replace(/\s+/g, '-').slice(0, 50);
  doc.save(`KHEPRA-ThinkTank-${sanitized}.pdf`);
}

interface ThinkTankDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  publication: ThinkTankPublication | null;
}

export function ThinkTankDownloadModal({ isOpen, onClose, publication }: ThinkTankDownloadModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    jobTitle: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !publication) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName.trim()) {
      setError('Veuillez saisir votre prénom.');
      return;
    }
    if (!formData.lastName.trim()) {
      setError('Veuillez saisir votre nom.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Veuillez saisir votre adresse email.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Veuillez saisir une adresse email valide.');
      return;
    }
    if (!formData.organization.trim()) {
      setError('Veuillez saisir le nom de votre organisation.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Track in Supabase
      const { error: dbError } = await supabase
        .from('resource_downloads')
        .insert([{
          first_name: formData.firstName.trim(),
          email: formData.email.trim().toLowerCase(),
          organization: formData.organization.trim(),
          resource_id: publication.id,
          resource_title: publication.title,
          resource_type: 'think-tank',
        }]);

      if (dbError) {
        console.error('Supabase insert error:', dbError);
      }

      // Submit to Readdy form API
      const formBody = new URLSearchParams({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        organization: formData.organization.trim(),
        jobTitle: formData.jobTitle.trim(),
        publicationId: publication.id,
        publicationTitle: publication.title,
        publicationType: publication.type,
        publicationZone: publication.zone,
        source: 'think-tank',
        page: typeof window !== 'undefined' ? window.location.pathname : '/think-tank',
      });

      await fetch(DOWNLOAD_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      // Generate and download PDF immediately
      await generateAndDownloadThinkTankPDF(publication);

      setShowSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', organization: '', jobTitle: '' });

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 5000);
    } catch (err) {
      console.error('Download error:', err);
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter à thinktank@khepraexperts.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ firstName: '', lastName: '', email: '', organization: '', jobTitle: '' });
      setError('');
      setShowSuccess(false);
      onClose();
    }
  };

  const typeLabels: Record<string, string> = {
    'position-paper': 'Position Paper',
    'policy-brief': 'Policy Brief',
    'sector-study': 'Étude Sectorielle',
    'regulatory-foresight': 'Prospective Réglementaire',
    'working-paper': 'Working Paper',
    'annual-report': 'Rapport Annuel',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-fadeSlideUp bg-background-50" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background-50/95 backdrop-blur-md border-b border-secondary-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
              {typeLabels[publication.type] || publication.type}
            </span>
            <p className="text-sm font-semibold mt-0.5 text-foreground-950">Téléchargement</p>
          </div>
          <button onClick={handleClose} disabled={isSubmitting} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary-100 transition-colors cursor-pointer disabled:opacity-50">
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        {/* Success state */}
        {showSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary-400/10">
              <i className="ri-check-line text-3xl text-primary-400" />
            </div>
            <h4 className="font-display text-xl font-bold mb-2 text-foreground-950">Téléchargement lancé !</h4>
            <p className="text-sm leading-relaxed mb-4 text-foreground-950/55">
              Le PDF de <strong className="text-foreground-950">{publication.title}</strong> a été téléchargé. Vous recevrez également une copie par email sous 24 heures ouvrées.
            </p>
            <p className="text-xs text-foreground-950/35">
              Une question ? <a href="mailto:thinktank@khepraexperts.com" className="font-semibold hover:underline text-primary-400">thinktank@khepraexperts.com</a>
            </p>
          </div>
        ) : (
          <>
            {/* Publication preview */}
            <div className="px-6 pt-5 pb-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-400/5 border border-primary-400/10">
                  <i className="ri-file-pdf-2-line text-lg text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold leading-snug mb-1 text-foreground-950">{publication.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-foreground-950/40">
                    <span>{publication.author}</span>
                    <span>·</span>
                    <span>{publication.pages} pages</span>
                    <span>·</span>
                    <span>{publication.zone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} data-readdy-form="" id="think-tank-download-form" className="px-6 pb-6 space-y-4">
              <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 pointer-events-none w-0 h-0" />
              <div className="border-t pt-4 border-primary-400/8">
                <p className="text-xs mb-4 text-foreground-950/50">
                  Renseignez vos informations pour télécharger cette publication en PDF. Vos données restent strictement confidentielles.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="tt-firstName" className="block text-xs font-semibold mb-1.5 text-foreground-950">
                    Prénom <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="tt-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    disabled={isSubmitting}
                    className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 border-primary-400/20 bg-background-100 focus:ring-primary-400/30"
                  />
                </div>
                <div>
                  <label htmlFor="tt-lastName" className="block text-xs font-semibold mb-1.5 text-foreground-950">
                    Nom <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="tt-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    disabled={isSubmitting}
                    className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 border-primary-400/20 bg-background-100 focus:ring-primary-400/30"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tt-email" className="block text-xs font-semibold mb-1.5 text-foreground-950">
                  Email professionnel <span className="text-red-700">*</span>
                </label>
                <input
                  type="email"
                  id="tt-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vous@organisation.com"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 border-primary-400/20 bg-background-100 focus:ring-primary-400/30"
                />
              </div>

              <div>
                <label htmlFor="tt-organization" className="block text-xs font-semibold mb-1.5 text-foreground-950">
                  Organisation <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="tt-organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise ou institution"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 border-primary-400/20 bg-background-100 focus:ring-primary-400/30"
                />
              </div>

              <div>
                <label htmlFor="tt-jobTitle" className="block text-xs font-semibold mb-1.5 text-foreground-950">
                  Fonction <span className="font-normal text-foreground-950/35">(optionnel)</span>
                </label>
                <input
                  type="text"
                  id="tt-jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Ex: Directeur Conformité, Risk Manager..."
                  disabled={isSubmitting}
                  className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-50 border-primary-400/20 bg-background-100 focus:ring-primary-400/30"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                  <i className="ri-error-warning-line text-sm mt-0.5 flex-shrink-0 text-red-700" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {isSubmitting && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary-400/5 border border-primary-400/10">
                  <i className="ri-loader-4-line animate-spin text-sm text-primary-400" />
                  <p className="text-xs text-primary-500">Génération du PDF en cours...</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-foreground-950"
                style={{ boxShadow: '0 4px 16px rgba(107,155,31,0.25)' }}
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    Génération du PDF...
                  </>
                ) : (
                  <>
                    <i className="ri-download-cloud-line text-lg" />
                    Télécharger le PDF
                  </>
                )}
              </button>

              <p className="text-xs text-center text-foreground-950/35">
                En soumettant ce formulaire, vous acceptez notre{' '}
                <a href="/privacy/" className="font-semibold hover:underline text-primary-400">politique de confidentialité</a>.
                Nous ne partageons jamais vos données.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}




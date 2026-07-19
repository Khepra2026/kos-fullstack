import jsPDF from 'jspdf';
import { trackDownload, type DownloadSource } from '@/utils/downloadTracker';
import {
  LOGO_URL, FOUNDER_URL, COVER_URL, loadImg,
} from '';
import {
  drawPage1, drawPage2, drawPage3, drawPage4, drawPage5, drawPage6,
} from '';
import {
  drawPage1En, drawPage2En, drawPage3En, drawPage4En, drawPage5En, drawPage6En,
} from '';

export async function generateBrochurePDF() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const [logo, coverImg, founderImg] = await Promise.all([
    loadImg(LOGO_URL),
    loadImg(COVER_URL),
    loadImg(FOUNDER_URL),
  ]);

  const pages = [
    { name: 'Page 1 (Cover)', fn: () => drawPage1(doc, logo, coverImg, founderImg) },
    { name: 'Page 2 (Offres)', fn: () => drawPage2(doc, logo) },
    { name: 'Page 3 (Fondateur)', fn: () => drawPage3(doc, logo, founderImg) },
    { name: 'Page 4 (Microfinance)', fn: () => drawPage4(doc, logo) },
    { name: 'Page 5 (CTA)', fn: () => drawPage5(doc, logo) },
    { name: 'Page 6 (Cover Arrière)', fn: () => drawPage6(doc, logo) },
  ];

  for (let i = 0; i < pages.length; i++) {
    try {
      if (i > 0) doc.addPage();
      await pages[i].fn();
    } catch (pageErr) {
      console.error(`[Brochure PDF] ERREUR ${pages[i].name}:`, pageErr);
      throw new Error(`Erreur lors de la génération de ${pages[i].name}: ${pageErr instanceof Error ? pageErr.message : String(pageErr)}`);
    }
  }

  return doc;
}

export async function generateBrochurePDFEn() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const [logo, coverImg, founderImg] = await Promise.all([
    loadImg(LOGO_URL),
    loadImg(COVER_URL),
    loadImg(FOUNDER_URL),
  ]);

  const pages = [
    { name: 'Page 1 EN (Cover)', fn: () => drawPage1En(doc, logo, coverImg, founderImg) },
    { name: 'Page 2 EN (Offers)', fn: () => drawPage2En(doc, logo) },
    { name: 'Page 3 EN (Founder)', fn: () => drawPage3En(doc, logo, founderImg) },
    { name: 'Page 4 EN (Microfinance)', fn: () => drawPage4En(doc, logo) },
    { name: 'Page 5 EN (CTA)', fn: () => drawPage5En(doc, logo) },
    { name: 'Page 6 EN (Back Cover)', fn: () => drawPage6En(doc, logo) },
  ];

  for (let i = 0; i < pages.length; i++) {
    try {
      if (i > 0) doc.addPage();
      await pages[i].fn();
    } catch (pageErr) {
      console.error(`[Brochure PDF EN] ERREUR ${pages[i].name}:`, pageErr);
      throw new Error(`Erreur lors de la génération de ${pages[i].name}: ${pageErr instanceof Error ? pageErr.message : String(pageErr)}`);
    }
  }

  return doc;
}

export async function downloadBrochure(source: DownloadSource = 'other') {
  try {
    const doc = await generateBrochurePDF();
    trackDownload(source).catch(() => {});
    doc.save('KHEPRA-EXPERTS-KOS-REGTECH-AI-Brochure-2026.pdf');
  } catch (err) {
    console.error('[Brochure PDF] Erreur génération:', err);
    throw new Error('Erreur lors de la génération de la brochure. Veuillez réessayer ou contacter contact@khepraexperts.com');
  }
}

export async function downloadBrochureEn(source: DownloadSource = 'other') {
  try {
    const doc = await generateBrochurePDFEn();
    trackDownload(source).catch(() => {});
    doc.save('KHEPRA-EXPERTS-KOS-REGTECH-AI-Brochure-2026-EN.pdf');
  } catch (err) {
    console.error('[Brochure PDF EN] Erreur génération:', err);
    throw new Error('Error generating the brochure. Please try again or contact contact@khepraexperts.com');
  }
}




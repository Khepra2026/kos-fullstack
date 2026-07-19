import { jsPDF } from 'jspdf';

interface RAGSynthesePDFExportProps {
  query: string;
  summary: string;
  keywords: string[];
  results: Array<{
    titre: string;
    domaine: string;
    organisation: string;
    pays: string;
    statut: string;
    description: string;
  }>;
  docCount: number;
  onExportStart?: () => void;
  onExportEnd?: () => void;
}

export default function RAGSynthesePDFExport({
  query,
  summary,
  keywords,
  results,
  docCount,
  onExportStart,
  onExportEnd,
}: RAGSynthesePDFExportProps) {
  const handleExport = async () => {
    onExportStart?.();
    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 14;
      const maxWidth = pageWidth - margin * 2;

      const BRAND_R = 26, BRAND_G = 58, BRAND_B = 42;
      const GOLD_R = 201, GOLD_G = 168, GOLD_B = 76;

      let pageNum = 1;
      let y = 0;

      const addNewPage = () => {
        doc.addPage();
        pageNum++;
        y = 20;

        // Header
        doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
        doc.rect(0, 0, pageWidth, 16, 'F');
        doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
        doc.rect(0, 16, pageWidth, 0.8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
        doc.text('KHEPRA EXPERTS — Synthèse RAG', margin, 11);

        // Footer
        doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
        doc.rect(0, 288, pageWidth, 9, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
        doc.text(`Page ${pageNum} | khepraexperts.com`, pageWidth / 2, 294, { align: 'center' });
      };

      const checkPageBreak = (needed: number) => {
        if (y + needed > 280) {
          addNewPage();
        }
      };

      // === PAGE 1 — Cover ===
      doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Gold bands
      doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
      doc.rect(0, 140, pageWidth, 1.5, 'F');
      doc.rect(0, 144, pageWidth, 0.5, 'F');
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 148, pageWidth, pageHeight - 148, 'F');

      // Badge
      doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
      doc.roundedRect(margin, 40, 55, 9, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
      doc.text('KOS AUTOMATON', margin + 27.5, 46.5, { align: 'center' });

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(30);
      doc.setTextColor(255, 255, 255);
      const coverTitleLines = doc.splitTextToSize('Synthèse RAG', maxWidth);
      doc.text(coverTitleLines, margin, 60);

      // Query
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(200, 215, 208);
      const queryLines = doc.splitTextToSize(query, maxWidth);
      doc.text(queryLines, margin, 72);

      doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
      doc.rect(margin, 72 + queryLines.length * 7, 40, 1.2, 'F');

      // White block
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
      doc.text('Résumé Extractif — KHEPRA EXPERTS', margin, 164);
      doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
      doc.rect(margin, 167, 40, 0.6, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      doc.text(`Recherche : "${query}"`, margin, 176);
      doc.text(`Documents analysés : ${results.length} | Top ${docCount} utilisés pour la synthèse`, margin, 183);
      doc.text(`Généré le : ${new Date().toLocaleDateString('fr-FR')}`, margin, 190);
      doc.text('Moteur : TF-IDF + Cosine Similarity — sans dépendance externe', margin, 197);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
      doc.text('khepraexperts.com/rag-synthese', pageWidth - margin, pageHeight - 10, { align: 'right' });

      // === PAGE 2+ — Content ===
      addNewPage();

      // Summary section
      checkPageBreak(20);
      doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
      doc.rect(margin, y, maxWidth, 0.5, 'F');
      doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
      doc.rect(margin, y + 2, 4, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
      doc.text('Résumé Extractif', margin + 7, y + 8);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(70, 70, 70);
      const summaryLines = doc.splitTextToSize(summary, maxWidth);
      for (const line of summaryLines) {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 5.5;
      }
      y += 5;

      // Keywords
      if (keywords.length > 0) {
        checkPageBreak(20);
        doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
        doc.rect(margin, y, maxWidth, 0.3, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
        doc.text('Mots-clés', margin, y + 6);
        y += 12;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        let kwX = margin;
        let kwY = y;
        for (const kw of keywords) {
          const kwW = doc.getTextWidth(kw) + 12;
          if (kwX + kwW > pageWidth - margin) {
            kwX = margin;
            kwY += 8;
            checkPageBreak(8);
          }
          doc.setFillColor(249, 246, 240);
          doc.roundedRect(kwX, kwY - 5, kwW, 7, 2, 2, 'F');
          doc.setTextColor(70, 70, 70);
          doc.text(kw, kwX + 4, kwY);
          kwX += kwW + 3;
        }
        y = kwY + 14;
      }

      // Documents sources
      checkPageBreak(25);
      doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
      doc.rect(margin, y, maxWidth, 0.5, 'F');
      doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
      doc.rect(margin, y + 2, 4, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(GOLD_R, GOLD_G, GOLD_B);
      doc.text(`Documents Sources (${results.length})`, margin + 7, y + 8);
      y += 18;

      for (let i = 0; i < results.length; i++) {
        const docItem = results[i];
        checkPageBreak(30);

        // Doc card background
        const cardStartY = y;
        doc.setFillColor(249, 246, 240);
        doc.roundedRect(margin, y, maxWidth, 26, 2, 2, 'F');
        doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
        doc.roundedRect(margin, y, 2.5, 26, 1, 1, 'F');

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(BRAND_R, BRAND_G, BRAND_B);
        const titleLines = doc.splitTextToSize(docItem.titre, maxWidth - 8);
        doc.text(titleLines[0], margin + 7, y + 7);
        const titleH = titleLines.length * 4.5;

        // Meta line
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(120, 120, 120);
        doc.text(`${docItem.organisation} · ${docItem.pays} · ${docItem.domaine} · ${docItem.statut}`, margin + 7, y + 7 + titleH + 3);

        // Description (1 line)
        if (docItem.description) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(100, 100, 100);
          const descLine = docItem.description.length > 120
            ? docItem.description.substring(0, 117) + '...'
            : docItem.description;
          doc.text(descLine, margin + 7, y + 7 + titleH + 9);
        }

        y += 30;
      }

      // Disclaimer
      y += 4;
      checkPageBreak(15);
      doc.setFillColor(249, 246, 240);
      doc.roundedRect(margin, y, maxWidth, 14, 2, 2, 'F');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 120, 120);
      doc.text('Résumé extractif généré automatiquement par KOS Automaton (TF-IDF + Cosine Similarity). Les documents sources proviennent de la base RAG Khepra Experts.', margin + 3, y + 5);
      doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} — khepraexperts.com/rag-synthese`, margin + 3, y + 11);

      const sanitized = query.replace(/[^a-z0-9\u00e0-\u00fc\s-]/gi, '').replace(/\s+/g, '-').slice(0, 40);
      doc.save(`KHEPRA-Synthese-RAG-${sanitized}.pdf`);
    } catch {
      // silent
    } finally {
      onExportEnd?.();
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer bg-accent-500 text-white hover:bg-accent-600"
    >
      <i className="ri-file-pdf-line"></i>
      Exporter en PDF
    </button>
  );
}




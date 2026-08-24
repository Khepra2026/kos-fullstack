import { Document, Packer, Paragraph } from 'docx';
import { coverParagraphs } from '';
import { section1Paragraphs } from '';
import { section2Paragraphs } from '';
import { section3Paragraphs } from '';
import { section4Paragraphs } from '';
import { section5Paragraphs } from '';

export async function generateGovernanceArchitectureOptasia(): Promise<Blob> {
  const allParagraphs: Paragraph[] = [
    ...coverParagraphs,
    ...section1Paragraphs,
    ...section2Paragraphs,
    ...section3Paragraphs,
    ...section4Paragraphs,
    ...section5Paragraphs,
  ];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: allParagraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
}




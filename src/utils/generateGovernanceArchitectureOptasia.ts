import { Document, Packer, Paragraph } from 'docx';
import { coverParagraphs } from './governanceOptasia/cover';
import { section1Paragraphs } from './governanceOptasia/section1';
import { section2Paragraphs } from './governanceOptasia/section2';
import { section3Paragraphs } from './governanceOptasia/section3';
import { section4Paragraphs } from './governanceOptasia/section4';
import { section5Paragraphs } from './governanceOptasia/section5';

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
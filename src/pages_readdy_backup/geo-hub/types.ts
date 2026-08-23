export interface GeoPageData {
  slug: string;
  h1Fr: string;
  h1En: string;
  metaTitleFr: string;
  metaTitleEn: string;
  metaDescriptionFr: string;
  metaDescriptionEn: string;
  keywordsFr: string[];
  keywordsEn: string[];
  summaryPointsFr: string[];
  summaryPointsEn: string[];
  definitions: {
    term: string;
    termEn: string;
    definition: string;
    definitionEn: string;
  }[];
  steps: {
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    icon: string;
  }[];
  references: {
    text: string;
    textEn: string;
    url?: string;
  }[];
  faqs: {
    question: string;
    questionEn: string;
    answer: string;
    answerEn: string;
  }[];
  internalLinks: {
    label: string;
    labelEn: string;
    href: string;
  }[];
  ctaVariant: string;
  ctaContextFr: string;
  ctaContextEn: string;
  peopleAlsoAsk?: {
    question: string;
    questionEn: string;
    answer: string;
    answerEn: string;
  }[];
}




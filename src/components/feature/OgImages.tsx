const OG_IMAGE_PROXY = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/og-social-preview?action=proxy&url=';

export const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

/**
 * Helper pour proxyfier une URL readdy.ai via l'Edge Function Supabase.
 * Le proxy garantit les bons headers HTTP pour Facebook, LinkedIn, etc.
 */
function proxy(url: string): string {
  return `${OG_IMAGE_PROXY}${encodeURIComponent(url)}`;
}

const MASTER_IMAGE = proxy('https://readdy.ai/api/search-image?query=Luxurious%20dark%20black%20background%20with%20elegant%20gold%20geometric%20spiral%20pattern%20and%20warm%20champagne%20accents%2C%20premium%20corporate%20branding%20for%20KHEPRA%20EXPERTS%20investment%20advisory%20boutique%20Africa%2C%20sophisticated%20minimalist%20typography%2C%20high%20contrast%20gold%20and%20ivory%20white%20accents%2C%20professional%20dark%20aesthetic%2C%20institutional%20consulting%20identity&width=1200&height=630&seq=og-khepra-master-gold-v1&orientation=landscape');

export const OG_IMAGES = {
  DEFAULT: MASTER_IMAGE,
  HOME: MASTER_IMAGE,

  ABOUT: proxy('https://readdy.ai/api/search-image?query=professional%20african%20business%20consulting%20team%20portrait%20group%20photo%20in%20modern%20boardroom%20Lome%20Togo%20elegant%20suits%20representing%20expertise%20governance%20finance%20digital%20transformation%20strategic%20advisory%20pan-african%20consulting%20firm%20warm%20professional%20lighting%20dark%20green%20corporate%20atmosphere&width=1200&height=630&seq=og-about-khepra-green&orientation=landscape'),

  SERVICES: proxy('https://readdy.ai/api/search-image?query=professional%20african%20business%20consulting%20services%20strategic%20advisory%20governance%20financial%20audit%20digital%20transformation%20team%20meeting%20modern%20office%20West%20Africa%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-services-khepra-green&orientation=landscape'),

  INDUSTRIES: proxy('https://readdy.ai/api/search-image?query=african%20financial%20industry%20sectors%20microfinance%20fintech%20SME%20public%20sector%20banking%20institutions%20modern%20office%20West%20Africa%20professional%20consulting%20team%20warm%20corporate%20lighting%20dark%20green%20and%20black%20corporate%20identity&width=1200&height=630&seq=og-industries-khepra-green&orientation=landscape'),

  BLOG: proxy('https://readdy.ai/api/search-image?query=professional%20african%20business%20insights%20research%20publications%20strategic%20analysis%20governance%20finance%20digital%20transformation%20modern%20library%20office%20setting%20warm%20professional%20lighting%20dark%20green%20and%20black%20corporate%20aesthetic&width=1200&height=630&seq=og-blog-khepra-green&orientation=landscape'),

  INSIGHTS: proxy('https://readdy.ai/api/search-image?query=strategic%20research%20center%20african%20economic%20analysis%20fintech%20reports%20financial%20inclusion%20studies%20think%20tank%20modern%20office%20data%20visualization%20charts%20warm%20professional%20lighting%20dark%20green%20and%20black%20corporate%20identity&width=1200&height=630&seq=og-insights-khepra-green&orientation=landscape'),

  RESOURCES: proxy('https://readdy.ai/api/search-image?query=professional%20business%20resources%20guides%20checklists%20practical%20tools%20finance%20compliance%20digital%20transformation%20Africa%20modern%20library%20office%20setting%20warm%20professional%20lighting%20dark%20green%20and%20black%20corporate%20aesthetic&width=1200&height=630&seq=og-resources-khepra-green&orientation=landscape'),

  CASE_STUDIES: proxy('https://readdy.ai/api/search-image?query=professional%20african%20business%20consulting%20team%20presenting%20measurable%20results%20case%20studies%20charts%20graphs%20KPI%20dashboards%20modern%20boardroom%20West%20Central%20Africa%20financial%20advisory%20success%20stories%20warm%20professional%20lighting%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-case-studies-khepra-green&orientation=landscape'),

  EXPERTS: proxy('https://readdy.ai/api/search-image?query=professional%20african%20business%20consulting%20experts%20consortium%20team%20portrait%20modern%20office%20governance%20financial%20audit%20inclusion%20financiere%20digital%20transformation%20strategic%20advisory%20pan-african%20warm%20professional%20lighting%20dark%20green%20and%20black%20corporate%20atmosphere&width=1200&height=630&seq=og-experts-khepra-green&orientation=landscape'),

  CAREERS: proxy('https://readdy.ai/api/search-image?query=professional%20african%20business%20team%20collaboration%20modern%20office%20Lome%20Togo%20career%20opportunities%20consulting%20firm%20governance%20finance%20digital%20transformation%20multicultural%20team%20warm%20professional%20lighting%20dark%20green%20and%20black%20corporate%20identity&width=1200&height=630&seq=og-careers-khepra-green&orientation=landscape'),

  SOLUTIONS: proxy('https://readdy.ai/api/search-image?query=strategic%20diagnostic%20tools%20african%20business%20organizations%20evaluation%20assessment%20governance%20finance%20digital%20transformation%20Africa%20modern%20office%20data%20analytics%20warm%20professional%20lighting%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-solutions-khepra-green&orientation=landscape'),

  WEBINARS: proxy('https://readdy.ai/api/search-image?query=professional%20online%20webinar%20african%20business%20experts%20presenting%20governance%20finance%20digital%20transformation%20compliance%20modern%20studio%20setup%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20corporate%20aesthetic&width=1200&height=630&seq=og-webinars-khepra-green&orientation=landscape'),

  WHITEPAPERS: proxy('https://readdy.ai/api/search-image?query=professional%20whitepaper%20publications%20african%20business%20finance%20governance%20digital%20transformation%20research%20reports%20elegant%20dark%20navy%20green%20design%20premium%20consulting%20firm%20publication%20aesthetic%20dark%20green%20and%20black%20corporate%20identity&width=1200&height=630&seq=og-whitepapers-khepra-green&orientation=landscape'),

  // Regions FR
  AFRIQUE: proxy('https://readdy.ai/api/search-image?query=pan-african%20strategic%20consulting%20presence%20map%20West%20Central%20Africa%20countries%20Togo%20Benin%20Ivory%20Coast%20Senegal%20Cameroon%20professional%20business%20advisory%20network%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-afrique-khepra-green&orientation=landscape'),

  AFRIQUE_FRANCOPHONE: proxy('https://readdy.ai/api/search-image?query=francophone%20africa%20strategic%20consulting%20UEMOA%20CEMAC%20financial%20inclusion%20governance%20digital%20transformation%20professional%20business%20advisory%20network%20warm%20professional%20lighting%20dark%20green%20and%20black%20corporate%20identity&width=1200&height=630&seq=og-afrique-francophone-khepra-green&orientation=landscape'),

  UEMOA_CEMAC: proxy('https://readdy.ai/api/search-image?query=UEMOA%20CEMAC%20regulatory%20compliance%20BCEAO%20COBAC%20financial%20institutions%20microfinance%20fintech%20West%20Central%20Africa%20professional%20consulting%20advisory%20warm%20professional%20lighting%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-uemoa-cemac-khepra-green&orientation=landscape'),

  WEST_AFRICA: proxy('https://readdy.ai/api/search-image?query=West%20Africa%20strategic%20consulting%20financial%20inclusion%20fintech%20digital%20transformation%20professional%20business%20advisory%20network%20modern%20office%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20corporate%20identity&width=1200&height=630&seq=og-west-africa-khepra-green&orientation=landscape'),

  // Regions EN
  AFRICA: proxy('https://readdy.ai/api/search-image?query=pan-african%20strategic%20consulting%20presence%20map%20Africa%20countries%20professional%20business%20advisory%20network%20governance%20finance%20digital%20transformation%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-africa-khepra-green&orientation=landscape'),

  AFRICA_EN: proxy('https://readdy.ai/api/search-image?query=pan-african%20strategic%20consulting%20presence%20map%20Africa%20countries%20professional%20business%20advisory%20network%20governance%20finance%20digital%20transformation%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-africa-en-khepra-green&orientation=landscape'),

  FRANCOPHONE_AFRICA: proxy('https://readdy.ai/api/search-image?query=Francophone%20Africa%20consulting%20KHEPRA%20EXPERTS%20French-speaking%20African%20countries%20UEMOA%20CEMAC%20regions%20regional%20financial%20integration%20modern%20business%20environment%20dark%20green%20and%20black%20accents%20professional%20corporate%20photography%20clean%20design%20natural%20lighting%20high%20quality%20imagery%20contemporary%20African%20business%20culture&width=1200&height=630&seq=og-francophone-africa-khepra-green&orientation=landscape'),

  // Industries
  MICROFINANCE: proxy('https://readdy.ai/api/search-image?query=microfinance%20institution%20Africa%20BCEAO%20compliance%20governance%20digital%20transformation%20professional%20consulting%20advisory%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-microfinance-khepra-green&orientation=landscape'),

  FINTECH: proxy('https://readdy.ai/api/search-image?query=fintech%20Africa%20digital%20financial%20services%20mobile%20money%20payment%20solutions%20professional%20consulting%20advisory%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-fintech-khepra-green&orientation=landscape'),

  PME: proxy('https://readdy.ai/api/search-image?query=SME%20development%20Africa%20fundraising%20governance%20financial%20structuring%20professional%20consulting%20advisory%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-pme-khepra-green&orientation=landscape'),

  PUBLIC_SECTOR: proxy('https://readdy.ai/api/search-image?query=public%20sector%20Africa%20governance%20institutional%20reform%20financial%20inclusion%20professional%20consulting%20advisory%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-public-sector-khepra-green&orientation=landscape'),

  // Piliers
  DIGITAL_TRANSFORMATION: proxy('https://readdy.ai/api/search-image?query=Digital%20transformation%20in%20Africa%20KHEPRA%20EXPERTS%20technology%20adoption%20business%20process%20digitization%20cloud%20solutions%20modern%20digital%20workspace%20innovation%20automation%20dark%20green%20and%20black%20accents%20professional%20tech%20photography%20clean%20minimalist%20background%20natural%20lighting%20high%20quality%20digital%20imagery%20contemporary%20aesthetic&width=1200&height=630&seq=og-digital-transformation-khepra-green&orientation=landscape'),

  FINANCIAL_INCLUSION: proxy('https://readdy.ai/api/search-image?query=Financial%20inclusion%20in%20Africa%20KHEPRA%20EXPERTS%20accessible%20banking%20services%20mobile%20money%20solutions%20community%20finance%20rural%20urban%20financial%20access%20modern%20inclusive%20banking%20dark%20green%20and%20black%20color%20scheme%20professional%20photography%20clean%20design%20natural%20lighting%20high%20quality%20imagery%20contemporary%20African%20financial%20services&width=1200&height=630&seq=og-financial-inclusion-khepra-green&orientation=landscape'),

  FINTECH_ADVISORY: proxy('https://readdy.ai/api/search-image?query=Fintech%20advisory%20services%20in%20Africa%20KHEPRA%20EXPERTS%20financial%20technology%20consulting%20digital%20banking%20strategy%20payment%20innovation%20modern%20fintech%20ecosystem%20dark%20green%20and%20black%20accents%20professional%20business%20photography%20clean%20minimalist%20design%20natural%20lighting%20high%20quality%20tech%20imagery%20contemporary%20aesthetic&width=1200&height=630&seq=og-fintech-advisory-khepra-green&orientation=landscape'),

  MICROFINANCE_TRANSFORMATION: proxy('https://readdy.ai/api/search-image?query=Microfinance%20transformation%20in%20Africa%20KHEPRA%20EXPERTS%20modernizing%20microfinance%20institutions%20digital%20MFI%20solutions%20regulatory%20compliance%20capacity%20building%20professional%20microfinance%20environment%20dark%20green%20and%20black%20color%20palette%20clean%20corporate%20photography%20natural%20lighting%20high%20quality%20business%20imagery%20contemporary%20aesthetic&width=1200&height=630&seq=og-microfinance-transformation-khepra-green&orientation=landscape'),

  SME_DEVELOPMENT: proxy('https://readdy.ai/api/search-image?query=SME%20development%20and%20growth%20in%20Africa%20KHEPRA%20EXPERTS%20small%20business%20advisory%20entrepreneurship%20support%20business%20scaling%20strategies%20modern%20SME%20workspace%20dark%20green%20and%20black%20accents%20professional%20business%20photography%20clean%20minimalist%20design%20natural%20lighting%20high%20quality%20imagery%20contemporary%20African%20entrepreneurship&width=1200&height=630&seq=og-sme-development-khepra-green&orientation=landscape'),

  STRATEGIC_REPORT: proxy('https://readdy.ai/api/search-image?query=Strategic%20reports%20and%20SEO%20analysis%20KHEPRA%20EXPERTS%20comprehensive%20business%20assessments%20market%20research%20documents%20technical%20audit%20reports%20executive%20summaries%20professional%20office%20desk%20with%20reports%20and%20analytics%20dark%20green%20and%20black%20accents%20clean%20corporate%20photography%20natural%20lighting%20high%20quality%20business%20imagery%20contemporary%20aesthetic&width=1200&height=630&seq=og-strategic-report-khepra-green&orientation=landscape'),

  // Autres pages
  DECIDEURS: proxy('https://readdy.ai/api/search-image?query=african%20business%20decision%20makers%20executives%20boardroom%20strategic%20advisory%20governance%20finance%20digital%20transformation%20professional%20consulting%20warm%20professional%20lighting%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-decideurs-khepra-green&orientation=landscape'),

  SFD_CONFORMITE: proxy('https://readdy.ai/api/search-image?query=SFD%20microfinance%20conformite%20BCEAO%20regulatory%20compliance%20Africa%20professional%20consulting%20advisory%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-sfd-khepra-green&orientation=landscape'),

  TOOLS: proxy('https://readdy.ai/api/search-image?query=strategic%20diagnostic%20tools%20organizational%20assessment%20governance%20finance%20digital%20transformation%20Africa%20modern%20office%20data%20analytics%20warm%20professional%20lighting%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-tools-khepra-green&orientation=landscape'),

  INVESTISSEURS: proxy('https://readdy.ai/api/search-image?query=investors%20due%20diligence%20Africa%20investment%20readiness%20private%20equity%20venture%20capital%20financial%20advisory%20professional%20boardroom%20West%20Africa%20warm%20professional%20lighting%20corporate%20excellence%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-investisseurs-khepra-green&orientation=landscape'),

  PROJETS_INDUSTRIELS: proxy('https://readdy.ai/api/search-image?query=industrial%20projects%20agrobusiness%20Africa%20feasibility%20study%20project%20structuring%20ESG%20compliance%20BAD%20IFC%20standards%20professional%20consulting%20advisory%20warm%20professional%20lighting%20dark%20green%20and%20black%20color%20palette&width=1200&height=630&seq=og-projets-industriels-khepra-green&orientation=landscape'),
} as const;

export const getOgImageConfig = (imageKey: keyof typeof OG_IMAGES) => ({
  url: OG_IMAGES[imageKey],
  width: OG_IMAGE_DIMENSIONS.width,
  height: OG_IMAGE_DIMENSIONS.height,
  alt: `${imageKey.replace(/_/g, ' ')} – KHEPRA EXPERTS | Conseil Stratégique en Afrique`,
});

export default OG_IMAGES;
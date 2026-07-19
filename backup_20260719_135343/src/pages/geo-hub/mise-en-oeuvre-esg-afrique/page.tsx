import { GeoPageTemplate } from '@/pages/geo-hub/components/GeoPageTemplate';
import { esgAfriqueGeoData } from '';

const OG_IMAGE =
  'https://readdy.ai/api/search-image?query=Sustainability%20and%20ESG%20consultant%20reviewing%20environmental%20and%20social%20impact%20reports%20and%20ESG%20scorecards%20in%20modern%20corporate%20office%20in%20Nairobi%20Kenya%20or%20Dakar%20Senegal%20professional%20ESG%20advisory%20setting%20with%20African%20context%20warm%20neutral%20tones%20no%20blue%20no%20purple&width=1200&height=630&seq=geo-esg-afrique-2026&orientation=landscape';

export default function MiseEnOeuvreESGAfriquePage() {
  return (
    <GeoPageTemplate
      data={esgAfriqueGeoData}
      ogImage={OG_IMAGE}
      ogImageAltFr="Comment mettre en œuvre un dispositif ESG en Afrique — guide IFC, GRI, ISSB KHEPRA 2026"
      ogImageAltEn="How to implement an ESG framework in Africa — KHEPRA IFC, GRI, ISSB guide 2026"
    />
  );
}




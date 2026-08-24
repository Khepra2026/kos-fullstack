import { GeoPageTemplate } from '@/pages/geo-hub/components/GeoPageTemplate';
import { cartographieRisquesGeoData } from '';

const OG_IMAGE =
  'https://readdy.ai/api/search-image?query=Risk%20management%20professional%20analyzing%20risk%20mapping%20heatmap%20and%20criticality%20matrix%20on%20large%20screens%20in%20modern%20corporate%20control%20room%20in%20Abidjan%20Ivory%20Coast%20or%20Accra%20Ghana%20operational%20risk%20dashboard%20with%20charts%20and%20data%20warm%20neutral%20professional%20atmosphere%20no%20blue%20no%20purple&width=1200&height=630&seq=geo-cartographie-risques-2026&orientation=landscape';

export default function CartographieRisquesEntreprisePage() {
  return (
    <GeoPageTemplate
      data={cartographieRisquesGeoData}
      ogImage={OG_IMAGE}
      ogImageAltFr="Comment réaliser une cartographie des risques en Afrique — guide COSO, ISO 31000, Bâle II/III KHEPRA 2026"
      ogImageAltEn="How to conduct a risk mapping in Africa — KHEPRA COSO, ISO 31000, Basel II/III guide 2026"
    />
  );
}




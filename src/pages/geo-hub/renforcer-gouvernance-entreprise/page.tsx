import { GeoPageTemplate } from '@/pages/geo-hub/components/GeoPageTemplate';
import { gouvernanceGeoData } from './data';

const OG_IMAGE =
  'https://readdy.ai/api/search-image?query=Corporate%20governance%20experts%20in%20formal%20board%20meeting%20with%20directors%20reviewing%20governance%20documents%20and%20policies%20in%20modern%20boardroom%20in%20Abidjan%20Ivory%20Coast%20or%20Lagos%20Nigeria%20professional%20governance%20advisory%20setting%20with%20African%20business%20leaders%20warm%20neutral%20tones%20no%20blue%20no%20purple&width=1200&height=630&seq=geo-gouvernance-afrique-2026&orientation=landscape';

export default function RenforcerGouvernanceEntreprisePage() {
  return (
    <GeoPageTemplate
      data={gouvernanceGeoData}
      ogImage={OG_IMAGE}
      ogImageAltFr="Comment renforcer la gouvernance d'entreprise en Afrique — guide OCDE, IFC, Circulaires UEMOA KHEPRA 2026"
      ogImageAltEn="How to strengthen corporate governance in Africa — KHEPRA OECD, IFC, WAEMU Circulars guide 2026"
    />
  );
}
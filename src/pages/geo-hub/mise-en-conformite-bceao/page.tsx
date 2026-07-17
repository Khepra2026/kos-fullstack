import { GeoPageTemplate } from '@/pages/geo-hub/components/GeoPageTemplate';
import { conformiteBceaoGeoData } from './data';

const OG_IMAGE =
  'https://readdy.ai/api/search-image?query=African%20banking%20compliance%20professional%20reviewing%20BCEAO%20regulatory%20documents%20and%20prudential%20ratios%20on%20computer%20screens%20in%20modern%20financial%20institution%20office%20Lome%20Togo%20West%20Africa%20compliance%20monitoring%20dashboard%20professional%20corporate%20atmosphere%20neutral%20warm%20tones%20no%20blue%20no%20purple&width=1200&height=630&seq=geo-conformite-bceao-2026&orientation=landscape';

export default function MiseEnConformiteBceaoPage() {
  return (
    <GeoPageTemplate
      data={conformiteBceaoGeoData}
      ogImage={OG_IMAGE}
      ogImageAltFr="Comment mettre en conformité une institution financière avec la BCEAO — guide KHEPRA 2026"
      ogImageAltEn="How to bring a financial institution into BCEAO compliance — KHEPRA guide 2026"
    />
  );
}
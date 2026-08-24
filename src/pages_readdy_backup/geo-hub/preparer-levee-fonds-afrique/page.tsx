import { GeoPageTemplate } from '@/pages/geo-hub/components/GeoPageTemplate';
import { leveeFondsGeoData } from '';

const OG_IMAGE =
  'https://readdy.ai/api/search-image?query=African%20entrepreneur%20presenting%20pitch%20deck%20and%20investment%20readiness%20report%20to%20investors%20in%20modern%20corporate%20meeting%20room%20in%20Abidjan%20Ivory%20Coast%20or%20Lagos%20Nigeria%20professional%20fundraising%20presentation%20with%20data%20charts%20and%20financial%20projections%20warm%20neutral%20executive%20atmosphere%20no%20blue%20no%20purple&width=1200&height=630&seq=geo-levee-fonds-afrique-2026&orientation=landscape';

export default function PreparerLeveeFondsAfriquePage() {
  return (
    <GeoPageTemplate
      data={leveeFondsGeoData}
      ogImage={OG_IMAGE}
      ogImageAltFr="Comment préparer une levée de fonds en Afrique francophone — guide investment readiness KHEPRA 2026"
      ogImageAltEn="How to prepare a fundraising in Francophone Africa — KHEPRA investment readiness guide 2026"
    />
  );
}




import { GeoPageTemplate } from '@/pages/geo-hub/components/GeoPageTemplate';
import { dueDiligenceGeoData } from './data';

const OG_IMAGE =
  'https://readdy.ai/api/search-image?query=Professional%20African%20business%20executives%20reviewing%20financial%20documents%20and%20due%20diligence%20reports%20in%20a%20modern%20boardroom%20in%20Lome%20Togo%20or%20Abidjan%20Ivory%20Coast%20premium%20corporate%20advisory%20setting%20Big%20Four%20style%20analytical%20methodology%20charts%20and%20documents%20visible%20warm%20neutral%20tones%20executive%20atmosphere%20no%20blue%20no%20purple&width=1200&height=630&seq=geo-dd-afrique-2026&orientation=landscape';

export default function ReussirDueDiligenceAfriquePage() {
  return (
    <GeoPageTemplate
      data={dueDiligenceGeoData}
      ogImage={OG_IMAGE}
      ogImageAltFr="Comment réussir une due diligence en Afrique francophone — guide KHEPRA EXPERTS 2026"
      ogImageAltEn="How to succeed in due diligence in Francophone Africa — KHEPRA EXPERTS guide 2026"
    />
  );
}
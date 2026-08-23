import { GeoPageTemplate } from '@/pages/geo-hub/components/GeoPageTemplate';
import { agrementSFDGeoData } from '';

const OG_IMAGE =
  'https://readdy.ai/api/search-image?query=Banking%20regulatory%20compliance%20officer%20reviewing%20SFD%20microfinance%20licensing%20documents%20and%20BCEAO%20regulatory%20forms%20in%20modern%20office%20in%20Lome%20Togo%20or%20Dakar%20Senegal%20official%20stamps%20and%20certificates%20visible%20professional%20government%20relations%20atmosphere%20warm%20neutral%20tones%20no%20blue%20no%20purple&width=1200&height=630&seq=geo-agrement-sfd-2026&orientation=landscape';

export default function AgrementSFDBCEAOCOBACPage() {
  return (
    <GeoPageTemplate
      data={agrementSFDGeoData}
      ogImage={OG_IMAGE}
      ogImageAltFr="Comment obtenir un agrément SFD/EMF BCEAO/COBAC — guide KHEPRA 2026"
      ogImageAltEn="How to obtain SFD/EMF BCEAO/COBAC licensing — KHEPRA guide 2026"
    />
  );
}




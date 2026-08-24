import { GeoPageTemplate } from '@/pages/geo-hub/components/GeoPageTemplate';
import { missionBCEAOGeoData } from '';

const OG_IMAGE =
  'https://readdy.ai/api/search-image?query=Banking%20compliance%20team%20preparing%20for%20BCEAO%20regulatory%20inspection%20with%20organized%20documents%20and%20checklists%20in%20modern%20financial%20institution%20office%20in%20Lome%20Togo%20or%20Ouagadougou%20Burkina%20Faso%20professional%20audit%20preparation%20atmosphere%20warm%20neutral%20tones%20no%20blue%20no%20purple&width=1200&height=630&seq=geo-mission-bceao-2026&orientation=landscape';

export default function PreparerMissionBCEAOPage() {
  return (
    <GeoPageTemplate
      data={missionBCEAOGeoData}
      ogImage={OG_IMAGE}
      ogImageAltFr="Comment préparer une mission d'inspection BCEAO — guide KHEPRA 2026"
      ogImageAltEn="How to prepare for a BCEAO inspection mission — KHEPRA guide 2026"
    />
  );
}




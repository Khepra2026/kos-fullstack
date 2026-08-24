import RegionLandingTemplate from '@/pages/regions/components/RegionLandingTemplate';
import { landingPagesRegionales } from '@/mocks/landingPagesRegionales';

const region = landingPagesRegionales.find(r => r.id === 'cameroun')!;

const heroImageSrc = 'https://readdy.ai/api/search-image?query=Yaounde%20Douala%20Cameroun%20modern%20financial%20district%20with%20warm%20copper%20orange%20and%20deep%20forest%20green%20tones%2C%20Mount%20Cameroon%20volcanic%20backdrop%20with%20atmospheric%20morning%20mist%2C%20sophisticated%20institutional%20banking%20compliance%20atmosphere%2C%20COBAC%20BEAC%20regulatory%20authority%20visual%20metaphor%2C%20clean%20architectural%20editorial%20photography%2C%20Central%20African%20economic%20hub%20premium%20style%20with%20warm%20natural%20daylight&width=1600&height=720&seq=cameroun-hero-2026&orientation=landscape';

const formSubmitUrl = 'https://readdy.ai/api/form/d8uh5ahl2p03kijan2t0';

export default function CamerounPage() {
  return (
    <RegionLandingTemplate
      region={region}
      heroImageSrc={heroImageSrc}
      formSubmitUrl={formSubmitUrl}
    />
  );
}




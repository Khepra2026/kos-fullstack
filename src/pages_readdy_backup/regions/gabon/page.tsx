import RegionLandingTemplate from '@/pages/regions/components/RegionLandingTemplate';
import { landingPagesRegionales } from '@/mocks/landingPagesRegionales';

const region = landingPagesRegionales.find(r => r.id === 'gabon')!;

const heroImageSrc = 'https://readdy.ai/api/search-image?query=Libreville%20Gabon%20modern%20waterfront%20financial%20district%20with%20warm%20golden%20light%20reflecting%20off%20Estuary%20du%20Gabon%2C%20sophisticated%20institutional%20banking%20atmosphere%20with%20deep%20forest%20emerald%20green%20and%20warm%20copper%20oil%20industry%20tones%2C%20COBAC%20regulatory%20compliance%20visual%20metaphor%2C%20clean%20architectural%20editorial%20photography%2C%20Central%20African%20premium%20economic%20hub%20style%20with%20soft%20natural%20warm%20daylight%20and%20brass%20metallic%20accents&width=1600&height=720&seq=gabon-hero-2026&orientation=landscape';

const formSubmitUrl = 'https://readdy.ai/api/form/d8uh5ahl2p03kijan2t0';

export default function GabonPage() {
  return (
    <RegionLandingTemplate
      region={region}
      heroImageSrc={heroImageSrc}
      formSubmitUrl={formSubmitUrl}
    />
  );
}




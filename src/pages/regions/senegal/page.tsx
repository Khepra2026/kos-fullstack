import RegionLandingTemplate from '@/pages/regions/components/RegionLandingTemplate';
import { landingPagesRegionales } from '@/mocks/landingPagesRegionales';

const region = landingPagesRegionales.find(r => r.id === 'senegal')!;

const heroImageSrc = 'https://readdy.ai/api/search-image?query=Dakar%20Senegal%20modern%20financial%20district%20skyline%20with%20warm%20golden%20sunset%20light%20reflecting%20off%20glass%20buildings%2C%20Atlantic%20Ocean%20backdrop%2C%20sophisticated%20institutional%20financial%20hub%20atmosphere%20with%20warm%20amber%20and%20deep%20emerald%20tones%2C%20clean%20architectural%20photography%2C%20West%20African%20economic%20capital%20premium%20editorial%20style%20with%20soft%20natural%20warm%20daylight&width=1600&height=720&seq=senegal-hero-2026&orientation=landscape';

const formSubmitUrl = 'https://readdy.ai/api/form/d8uh5ahl2p03kijan2t0';

export default function SenegalPage() {
  return (
    <RegionLandingTemplate
      region={region}
      heroImageSrc={heroImageSrc}
      formSubmitUrl={formSubmitUrl}
    />
  );
}
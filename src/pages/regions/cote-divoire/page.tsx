import RegionLandingTemplate from '@/pages/regions/components/RegionLandingTemplate';
import { landingPagesRegionales } from '@/mocks/landingPagesRegionales';

const region = landingPagesRegionales.find(r => r.id === 'cote-divoire')!;

const heroImageSrc = 'https://readdy.ai/api/search-image?query=Abidjan%20Ivory%20Coast%20Plateau%20financial%20district%20modern%20skyline%20with%20warm%20golden%20light%2C%20BVRM%20Bourse%20Regionale%20glass%20towers%20reflecting%20warm%20sunset%2C%20sophisticated%20institutional%20financial%20hub%20atmosphere%20with%20warm%20amber%20and%20gold%20tones%2C%20lagoon%20backdrop%2C%20clean%20architectural%20editorial%20photography%2C%20West%20African%20economic%20capital%20premium%20style%20with%20soft%20natural%20warm%20daylight%20and%20emerald%20accents&width=1600&height=720&seq=cdi-hero-2026&orientation=landscape';

const formSubmitUrl = 'https://readdy.ai/api/form/d8uh5ahl2p03kijan2t0';

export default function CoteDIvoirePage() {
  return (
    <RegionLandingTemplate
      region={region}
      heroImageSrc={heroImageSrc}
      formSubmitUrl={formSubmitUrl}
    />
  );
}
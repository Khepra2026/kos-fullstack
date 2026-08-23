import { useTranslation } from 'react-i18next';
import OptimizedImage from '@/components/base/OptimizedImage';

const DecideursHero = () => {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const scrollToProfiles = () => {
    const element = document.getElementById('profiles-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-background-100 via-background-50 to-background-100 py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="https://readdy.ai/api/search-image?query=Premium%20institutional%20boardroom%20with%20warm%20neutral%20tones%20executive%20advisory%20environment%20African%20regulatory%20context%20senior%20partners%20reviewing%20confidential%20documents%20professional%20atmosphere%20natural%20daylight%20through%20floor%20to%20ceiling%20windows%20clean%20architectural%20lines%20warm%20cream%20charcoal%20accents%20institutional%20gravitas%20executive%20decision%20making%20setting&width=1920&height=1080&seq=decideurs-institutional-hero-v2&orientation=landscape"
          alt={isFr ? "KHEPRA EXPERTS — Portail d'accès institutionnel" : "KHEPRA EXPERTS — Institutional access gateway"}
          className="w-full h-full"
          width={1920}
          height={1080}
          aspectRatio="16/9"
          objectFit="cover"
          loading="eager"
          fetchpriority="high"
          placeholder="none"
        />
        <div className="absolute inset-0 bg-background-50/85" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Institutional badge */}
          <div className="inline-flex items-center gap-2 bg-secondary-100 border border-secondary-300/60 rounded-full px-5 py-2 mb-8">
            <i className="ri-building-2-line text-lg text-secondary-700"></i>
            <span className="text-sm font-medium text-secondary-800">
              {isFr ? 'Portail d\'accès institutionnel' : 'Institutional Access Gateway'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground-950">
            {isFr
              ? 'Orientation vers des missions d\'évaluation et d\'accompagnement contractuelles'
              : 'Guidance toward contractual evaluation and advisory engagements'}
          </h1>

          <p className="text-lg text-foreground-700 mb-12 leading-relaxed max-w-3xl mx-auto">
            {isFr
              ? 'Un entretien de qualification préalable permet d\'identifier les axes d\'investigation pertinents au regard de votre exposition réglementaire, de vos enjeux de gouvernance et de vos objectifs stratégiques. Chaque mission fait l\'objet d\'un devis confidentiel.'
              : 'A preliminary qualification discussion identifies relevant areas of investigation based on your regulatory exposure, governance challenges, and strategic objectives. Each engagement is subject to a confidential proposal.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="/contact"
              className="group bg-primary-500 hover:bg-primary-600 text-background-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-calendar-check-line text-xl"></i>
              <span>{isFr ? 'Solliciter un entretien de qualification' : 'Request a qualification discussion'}</span>
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
            </a>
            <button
              onClick={scrollToProfiles}
              className="group bg-background-100 hover:bg-background-200/70 text-foreground-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 border border-background-300/60 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-down-line text-xl group-hover:translate-y-1 transition-transform"></i>
              <span>{isFr ? 'Consulter les profils exécutifs' : 'View executive profiles'}</span>
            </button>
          </div>

          {/* Institutional metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-background-300/60">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">200+</div>
              <div className="text-sm text-foreground-600">
                {isFr ? 'Missions conduites' : 'Missions completed'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">17</div>
              <div className="text-sm text-foreground-600">
                {isFr ? 'Pays de couverture' : 'Countries covered'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">6</div>
              <div className="text-sm text-foreground-600">
                {isFr ? 'Secteurs réglementés' : 'Regulated sectors'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">22</div>
              <div className="text-sm text-foreground-600">
                {isFr ? 'Années d\'exercice' : 'Years of practice'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecideursHero;




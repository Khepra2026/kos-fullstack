import { useTranslation } from 'react-i18next';

const DecideursCTA = () => {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  return (
    <section className="py-20 bg-foreground-950 text-background-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-background-50/10 border border-background-50/20 rounded-full px-5 py-2 mb-6">
          <i className="ri-building-2-line text-xl text-primary-400"></i>
          <span className="text-sm font-medium text-background-50/80">
            {isFr ? 'Cadre d\'intervention institutionnel' : 'Institutional intervention framework'}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-background-50">
          {isFr
            ? 'Un dispositif d\'analyse et d\'accompagnement contractuel'
            : 'A contractual analysis and advisory framework'}
        </h2>

        <p className="text-lg text-background-50/70 mb-12 leading-relaxed max-w-2xl mx-auto">
          {isFr
            ? 'Chaque mission est conduite selon les référentiels applicables (BCEAO, COBAC, OHADA, GAFI, ISSB). Un entretien de qualification préalable, confidentiel et sans engagement, permet d\'identifier les axes d\'investigation pertinents et de proposer un devis adapté à votre contexte.'
            : 'Each engagement is conducted according to applicable standards (BCEAO, COBAC, OHADA, FATF, ISSB). A preliminary, confidential and non-binding qualification discussion identifies relevant areas of investigation and proposes a proposal tailored to your context.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="/contact"
            className="group bg-primary-500 hover:bg-primary-600 text-background-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-calendar-check-line text-xl"></i>
            <span>{isFr ? 'Solliciter un entretien de qualification' : 'Request a qualification discussion'}</span>
            <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        {/* Methodology reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-background-50/10">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <i className="ri-shield-check-line text-2xl text-primary-400"></i>
            </div>
            <div className="text-left">
              <div className="font-bold text-background-50 text-sm">
                {isFr ? 'Référentiels applicables' : 'Applicable standards'}
              </div>
              <div className="text-xs text-background-50/50">
                BCEAO · COBAC · OHADA · GAFI · ISSB
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center">
              <i className="ri-file-text-line text-2xl text-accent-400"></i>
            </div>
            <div className="text-left">
              <div className="font-bold text-background-50 text-sm">
                {isFr ? 'Devis confidentiel' : 'Confidential proposal'}
              </div>
              <div className="text-xs text-background-50/50">
                {isFr ? 'Sur entretien préalable' : 'After preliminary discussion'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-secondary-500/20 rounded-lg flex items-center justify-center">
              <i className="ri-user-star-line text-2xl text-secondary-400"></i>
            </div>
            <div className="text-left">
              <div className="font-bold text-background-50 text-sm">
                {isFr ? 'Équipe d\'intervention' : 'Intervention team'}
              </div>
              <div className="text-xs text-background-50/50">
                {isFr ? 'Direction & spécialistes' : 'Management & specialists'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecideursCTA;




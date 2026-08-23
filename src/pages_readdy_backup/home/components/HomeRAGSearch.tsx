import RAGSearchBar from '@/components/feature/RAGSearchBar';

export default function HomeRAGSearch() {
  const leadMagnets = [
    {
      slug: '/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026',
      label: 'Diagnostic Flash',
      title: 'Conformité BCEAO/COBAC 2026',
      desc: '25 questions · Score en 10 min · Plan d\'action',
      icon: 'ri-flashlight-line',
      color: 'accent',
    },
    {
      slug: '/lead-magnets/guide-bceao-2026',
      label: 'Guide Gratuit',
      title: '7 Contrôles qui Bloquent l\'Agrément',
      desc: '15 pages · 85% de réussite au premier dépôt',
      icon: 'ri-file-shield-line',
      color: 'primary',
    },
    {
      slug: '/lead-magnets/simulation-risque-reglementaire',
      label: 'Simulation',
      title: 'Risque Réglementaire Bancaire',
      desc: '25 questions · Matrice des risques · PDF',
      icon: 'ri-alert-line',
      color: 'secondary',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-background-50 border-b border-background-200" style={{ zIndex: 10, position: 'relative' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 border border-accent-200 mb-4">
            <i className="ri-brain-line text-accent-600 text-sm"></i>
            <span className="text-sm font-semibold text-accent-700 uppercase tracking-wider">
              KOS COGNITIVE OS · Intelligence Réglementaire Africaine
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground-950 mb-3">
            Accédez instantanément à l'intelligence réglementaire africaine
          </h2>
          <p className="text-foreground-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            <strong>462+ documents réglementaires</strong> analysés en temps réel par 16 agents spécialisés Big Four. 
            De la BCEAO à la COBAC, de l'OHADA au GAFI — tout le corpus africain, souverain et sans API externe.
          </p>
        </div>

        <RAGSearchBar />

        {/* Lead Magnets */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {leadMagnets.map((lm) => (
            <a
              key={lm.slug}
              href={lm.slug}
              className="group flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-background-100 border border-background-200 hover:border-primary-300 hover:bg-primary-50/40 transition-all duration-200"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg shrink-0 ${lm.color === 'accent' ? 'bg-accent-100 text-accent-600' : lm.color === 'primary' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'}`}>
                <i className={`${lm.icon} text-lg`}></i>
              </div>
              <div className="text-left">
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${lm.color === 'accent' ? 'text-accent-700' : lm.color === 'primary' ? 'text-primary-700' : 'text-secondary-700'}`}>
                  {lm.label}
                </span>
                <h3 className="text-sm font-semibold text-foreground-900 leading-snug mt-0.5 group-hover:text-primary-700 transition-colors">
                  {lm.title}
                </h3>
                <p className="text-xs text-foreground-500 mt-0.5 leading-snug">
                  {lm.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-foreground-400">
          <span className="flex items-center gap-1.5">
            <i className="ri-checkbox-circle-fill text-accent-600"></i>
            BCEAO · COBAC · BEAC
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-checkbox-circle-fill text-accent-600"></i>
            UEMOA · CEMAC · OHADA
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-checkbox-circle-fill text-accent-600"></i>
            BEPS · GAFI · GIABA · GABAC
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-checkbox-circle-fill text-accent-600"></i>
            ESG · IFC · ISSB · CIMA
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-checkbox-circle-fill text-accent-600"></i>
            RGPD · Cybersécurité · IA
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ri-checkbox-circle-fill text-accent-600"></i>
            200 Citations Vérifiées
          </span>
        </div>
      </div>
    </section>
  );
}




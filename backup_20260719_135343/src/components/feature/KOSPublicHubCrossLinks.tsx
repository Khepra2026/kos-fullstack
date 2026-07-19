import { useNavigate } from 'react-router-dom';

interface CrossLink {
  icon: string;
  label: string;
  href: string;
  description: string;
}

interface publicHubCrossLinksProps {
  currentPage: 'observatoire' | 'agrements' | 'compliance-factory' | 'compliance-score' | 'hub-national' | 'observatoire-pme';
}

const ALL_LINKS: Record<publicHubCrossLinksProps['currentPage'], CrossLink[]> = {
  observatoire: [
    { icon: 'ri-shield-check-line', label: 'Hub Agréments Afrique', href: '/agrements-afrique/', description: '6 types d\'agrément : Banques, EMF/SFD, FinTech, PSP, Assurance CIMA, Marchés Financiers' },
    { icon: 'ri-file-list-3-line', label: 'Digital Compliance Factory', href: '/digital-compliance-factory/', description: '78 documents de conformité — politiques, procédures, matrices de contrôle' },
    { icon: 'ri-bar-chart-2-line', label: 'KOS Compliance Score™', href: '/compliance-score/', description: 'Évaluez votre maturité réglementaire en 6 domaines — diagnostic gratuit' },
  ],
  agrements: [
    { icon: 'ri-radar-line', label: 'Observatoire Réglementaire Africain', href: '/observatoire-reglementaire-africain/', description: '8 régulateurs, 1 247 textes suivis — veille panafricaine' },
    { icon: 'ri-file-list-3-line', label: 'Digital Compliance Factory', href: '/digital-compliance-factory/', description: '78 documents de conformité — politiques, procédures, matrices de contrôle' },
    { icon: 'ri-bar-chart-2-line', label: 'KOS Compliance Score™', href: '/compliance-score/', description: 'Évaluez votre maturité réglementaire en 6 domaines — diagnostic gratuit' },
  ],
  'compliance-factory': [
    { icon: 'ri-radar-line', label: 'Observatoire Réglementaire Africain', href: '/observatoire-reglementaire-africain/', description: '8 régulateurs, 1 247 textes suivis — veille panafricaine' },
    { icon: 'ri-shield-check-line', label: 'Hub Agréments Afrique', href: '/agrements-afrique/', description: '6 types d\'agrément — Banques, EMF/SFD, FinTech, PSP, Assurance CIMA, Marchés Financiers' },
    { icon: 'ri-bar-chart-2-line', label: 'KOS Compliance Score™', href: '/compliance-score/', description: 'Évaluez votre maturité réglementaire en 6 domaines — diagnostic gratuit' },
  ],
  'compliance-score': [
    { icon: 'ri-radar-line', label: 'Observatoire Réglementaire Africain', href: '/observatoire-reglementaire-africain/', description: '8 régulateurs, 1 247 textes suivis — veille panafricaine' },
    { icon: 'ri-shield-check-line', label: 'Hub Agréments Afrique', href: '/agrements-afrique/', description: '6 types d\'agrément — Banques, EMF/SFD, FinTech, PSP, Assurance CIMA, Marchés Financiers' },
    { icon: 'ri-file-list-3-line', label: 'Digital Compliance Factory', href: '/digital-compliance-factory/', description: '78 documents de conformité — politiques, procédures, matrices de contrôle' },
  ],
  'hub-national': [
    { icon: 'ri-radar-line', label: 'Observatoire Réglementaire Africain', href: '/observatoire-reglementaire-africain/', description: '8 régulateurs, 1 247 textes suivis — veille panafricaine' },
    { icon: 'ri-shield-check-line', label: 'Hub Agréments Afrique', href: '/agrements-afrique/', description: '6 types d\'agrément — Banques, EMF/SFD, FinTech, PSP, Assurance CIMA, Marchés Financiers' },
    { icon: 'ri-bar-chart-2-line', label: 'KOS Compliance Score™', href: '/compliance-score/', description: 'Évaluez votre maturité réglementaire en 6 domaines — diagnostic gratuit' },
  ],
  'observatoire-pme': [
    { icon: 'ri-radar-line', label: 'Observatoire Réglementaire Africain', href: '/observatoire-reglementaire-africain/', description: '8 régulateurs, 1 247 textes suivis — veille panafricaine' },
    { icon: 'ri-shield-check-line', label: 'Hub Agréments Afrique', href: '/agrements-afrique/', description: '6 types d\'agrément — Banques, EMF/SFD, FinTech, PSP, Assurance CIMA, Marchés Financiers' },
    { icon: 'ri-bar-chart-2-line', label: 'KOS Compliance Score™', href: '/compliance-score/', description: 'Évaluez votre maturité réglementaire en 6 domaines — diagnostic gratuit' },
  ],
};

export default function publicHubCrossLinks({ currentPage }: publicHubCrossLinksProps) {
  const navigate = useNavigate();
  const links = ALL_LINKS[currentPage] || [];

  if (links.length === 0) return null;

  return (
    <section className="py-16 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest uppercase mb-2 text-foreground-400">KOS — INTELLIGENCE RÉGLEMENTAIRE</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground-950">Explorez aussi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {links.map((link, i) => (
            <button
              key={i}
              onClick={() => navigate(link.href)}
              className="group bg-white rounded-xl p-6 border border-background-200 hover:border-accent-300 hover:shadow-md transition-all cursor-pointer text-left"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-4 bg-accent-100 group-hover:bg-accent-200 transition-colors">
                <i className={`${link.icon} text-lg text-accent-600`} />
              </div>
              <h3 className="text-sm font-bold text-foreground-950 mb-2 group-hover:text-accent-700 transition-colors">
                {link.label}
              </h3>
              <p className="text-xs text-foreground-500 leading-relaxed mb-3">
                {link.description}
              </p>
              <span className="text-xs font-bold text-accent-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Explorer <i className="ri-arrow-right-line" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}




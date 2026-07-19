import { Link } from 'react-router-dom';
import hubLayout from '@/components/feature/hubLayout';

const MERGED_FEATURES = [
  { label: 'Domaines Big Four', icon: 'ri-pie-chart-line', desc: 'Scores par domaine (QUAL, GOUV, CONF, IA, RISK, CYBER, SEO, GEO, DEV, RECH)', target: '/kos-ultimate-cockpit' },
  { label: 'Preuves & Audit', icon: 'ri-file-search-line', desc: 'Registre universel des preuves, règles de validation, piste d\'audit', target: '/kos-ultimate-cockpit' },
  { label: 'Matrice de Risques', icon: 'ri-alert-line', desc: 'Risques actifs, mitigés, probabilité, impact, score', target: '/kos-ultimate-cockpit' },
  { label: 'Gouvernance IA', icon: 'ri-brain-line', desc: 'Registre agents IA, taux hallucination, journal décisions', target: '/kos-ultimate-cockpit' },
  { label: 'Dette Technique', icon: 'ri-tools-line', desc: 'Registre dette technique, criticité, effort estimé', target: '/kos-ultimate-cockpit' },
  { label: 'Certifications', icon: 'ri-award-line', desc: 'ISO 27001, Big Four, progression par standard', target: '/kos-ultimate-cockpit' },
  { label: 'Architecture Cible', icon: 'ri-building-line', desc: 'Composants par phase, maturité, vision', target: '/kos-ultimate-cockpit' },
  { label: 'Migration Mock→Live', icon: 'ri-database-2-line', desc: 'Feature flags, hooks live vs mock, progression', target: '/kos-ultimate-cockpit' },
];

export default function executiveCockpitRedirect() {
  return (
    <hubLayout hubId={3}>
      <div className="min-h-screen bg-background-50 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent-100 flex items-center justify-center">
            <i className="ri-git-merge-line text-accent-600 text-3xl"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3 font-heading">
            KOS Executive Cockpit — Fusionné
          </h1>
          <p className="text-sm text-foreground-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Ce dashboard a été <strong className="text-foreground-950">fusionné dans le KOS Ultimate Cockpit™</strong> — 
            le cockpit unifié qui centralise toute la gouvernance Big Four en un seul point de pilotage.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {MERGED_FEATURES.map(f => (
              <Link
                key={f.label}
                to={f.target}
                className="p-3 rounded-xl bg-background-50 border border-background-200/70 hover:border-accent-300 transition-all text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-100 text-accent-600 flex items-center justify-center mb-2 group-hover:bg-accent-200 transition-colors">
                  <i className={`${f.icon} text-sm`}></i>
                </div>
                <p className="text-xs font-semibold text-foreground-950 mb-1">{f.label}</p>
                <p className="text-[10px] text-foreground-500 leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>

          <Link
            to="/kos-ultimate-cockpit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white font-bold text-sm hover:bg-accent-600 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-accent-500/20"
          >
            <i className="ri-rocket-line"></i>
            Accéder au KOS Ultimate Cockpit™
            <i className="ri-arrow-right-line"></i>
          </Link>

          <p className="mt-6 text-xs text-foreground-400">
            Toutes les fonctionnalités (Domaines, Preuves, Risques, IA, Dette, Certifications, Architecture, Migration) sont maintenant dans le cockpit unifié.
          </p>
        </div>
      </div>
    </hubLayout>
  );
}




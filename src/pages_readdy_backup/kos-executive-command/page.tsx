import { Link } from 'react-router-dom';
import hubLayout from '@/components/feature/hubLayout';

const MERGED_FEATURES = [
  { label: '10 Dimensions', icon: 'ri-dashboard-3-line', desc: 'Pilotage temps réel, scores, tendances, alertes par dimension', target: '/kos-ultimate-cockpit' },
  { label: 'Commander\'s Intent', icon: 'ri-flag-line', desc: 'Synthèse stratégique quotidienne, actions prioritaires, décisions requises', target: '/kos-ultimate-cockpit' },
  { label: 'Commandement', icon: 'ri-radar-line', desc: 'Vue consolidée des 10 dimensions avec statut conforme/surveillance/action', target: '/kos-ultimate-cockpit' },
  { label: 'Exécutif', icon: 'ri-vip-crown-line', desc: 'KPIs, pipeline, missions actives, performance agents IA', target: '/kos-ultimate-cockpit' },
  { label: 'Système', icon: 'ri-server-line', desc: 'Infrastructure, Edge Functions, Cron Jobs, Uptime, Sécurité', target: '/kos-ultimate-cockpit' },
  { label: 'Conformité', icon: 'ri-shield-check-line', desc: 'Cadres réglementaires, alertes consolidées, statut conformité', target: '/kos-ultimate-cockpit' },
  { label: 'Trimestriel', icon: 'ri-calendar-check-line', desc: 'KPI autorité digitale, SEO, IA, heatmap sectorielle', target: '/kos-ultimate-cockpit' },
  { label: 'Médias', icon: 'ri-film-line', desc: '8 usines médias, santé, qualité, automatisation', target: '/kos-ultimate-cockpit' },
];

export default function executiveCommandRedirect() {
  return (
    <hubLayout hubId={17}>
      <div className="min-h-screen bg-background-50 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary-100 flex items-center justify-center">
            <i className="ri-git-merge-line text-primary-600 text-3xl"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3 font-heading">
            KOS Executive Command — Fusionné
          </h1>
          <p className="text-sm text-foreground-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Ce centre de commandement a été <strong className="text-foreground-950">fusionné dans le KOS Ultimate Cockpit™</strong>. 
            Les 10 dimensions de pilotage, le Commander's Intent, et les alertes sont maintenant intégrés au cockpit unifié.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {MERGED_FEATURES.map(f => (
              <Link
                key={f.label}
                to={f.target}
                className="p-3 rounded-xl bg-background-50 border border-background-200/70 hover:border-primary-300 transition-all text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mb-2 group-hover:bg-primary-200 transition-colors">
                  <i className={`${f.icon} text-sm`}></i>
                </div>
                <p className="text-xs font-semibold text-foreground-950 mb-1">{f.label}</p>
                <p className="text-[10px] text-foreground-500 leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>

          <Link
            to="/kos-ultimate-cockpit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-background-50 dark:text-foreground-950 font-bold text-sm hover:bg-primary-600 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-primary-500/20"
          >
            <i className="ri-rocket-line"></i>
            Accéder au KOS Ultimate Cockpit™
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </hubLayout>
  );
}




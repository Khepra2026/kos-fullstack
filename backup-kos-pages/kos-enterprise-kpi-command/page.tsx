import { Link } from 'react-router-dom';
import hubLayout from '@/components/feature/hubLayout';

const MERGED_FEATURES = [
  { label: '15 Domaines', icon: 'ri-stack-line', desc: 'Maturité par domaine, sous-KPIs, initiatives, progression', target: '/kos-ultimate-cockpit' },
  { label: '280 KPIs', icon: 'ri-bar-chart-2-line', desc: 'KPIs suivis, automatisés, au niveau cible AAAA', target: '/kos-ultimate-cockpit' },
  { label: 'Progression', icon: 'ri-line-chart-line', desc: 'Évolution Janvier→Juin 2026, 15 domaines sur 6 mois', target: '/kos-ultimate-cockpit' },
  { label: 'Plan d\'Action', icon: 'ri-task-line', desc: 'Actions correctives, gaps résolus, certification AAAA', target: '/kos-ultimate-cockpit' },
  { label: 'Système', icon: 'ri-cpu-line', desc: 'Agents online, Edge Functions, tables Supabase, monitoring', target: '/kos-ultimate-cockpit' },
  { label: 'Équipes Autonomes', icon: 'ri-team-line', desc: 'Statut des équipes, agents actifs, performance', target: '/kos-ultimate-cockpit' },
  { label: 'Référentiels', icon: 'ri-scales-3-line', desc: 'Cadres de conformité ISO, BCEAO, COBAC, GAFI, OHADA', target: '/kos-ultimate-cockpit' },
  { label: 'Certification', icon: 'ri-verified-badge-line', desc: 'Score global, domaines AAAA, uptime 30j', target: '/kos-ultimate-cockpit' },
];

export default function enterpriseKPICommandRedirect() {
  return (
    <hubLayout hubId={10}>
      <div className="min-h-screen bg-background-50 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent-100 flex items-center justify-center">
            <i className="ri-git-merge-line text-accent-600 text-3xl"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3 font-heading">
            KOS Enterprise KPI Tower — Fusionnée
          </h1>
          <p className="text-sm text-foreground-600 mb-8 max-w-xl mx-auto leading-relaxed">
            La tour KPI a été <strong className="text-foreground-950">fusionnée dans le KOS Ultimate Cockpit™</strong>. 
            Les 15 domaines, 280 KPIs et le suivi de maturité AAAA sont maintenant dans le cockpit unifié.
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
        </div>
      </div>
    </hubLayout>
  );
}






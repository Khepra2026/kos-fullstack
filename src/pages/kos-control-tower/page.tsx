import { Link } from 'react-router-dom';
import KOSHubLayout from '@/components/feature/KOSHubLayout';

const MERGED_FEATURES = [
  { label: 'Cockpit Vue Ensemble', icon: 'ri-dashboard-line', desc: '8 piliers : SEO, Leads, Revenus, Pipeline, Missions, Risques, Conformité, IA', target: '/kos-control-tower-automation' },
  { label: 'SEO & Visibilité', icon: 'ri-search-eye-line', desc: 'Score global, mots-clés, trafic 30j, backlinks, CWV, positions', target: '/kos-control-tower-automation' },
  { label: 'Leads & Croissance', icon: 'ri-user-star-line', desc: 'Total leads, leads chauds, score moyen, taux conversion, pipeline value', target: '/kos-control-tower-automation' },
  { label: 'Revenus & Rentabilité', icon: 'ri-money-dollar-circle-line', desc: 'CA MTD, CA YTD, croissance YoY, atteinte cible, marge moyenne', target: '/kos-control-tower-automation' },
  { label: 'Pipeline Commercial', icon: 'ri-filter-3-line', desc: 'Valeur totale, deals actifs, cycle moyen, win rate, probabilité', target: '/kos-control-tower-automation' },
  { label: 'Missions & Qualité', icon: 'ri-briefcase-line', desc: 'Missions actives, complétées, score qualité, budget, progression', target: '/kos-control-tower-automation' },
  { label: 'Risques & Résilience', icon: 'ri-alert-line', desc: 'Matrice des risques, heatmap, critiques, atténués, mitigation', target: '/kos-control-tower-automation' },
  { label: 'Conformité & IA', icon: 'ri-shield-check-line', desc: 'Contrôles conformité, échéances, agents IA, précision, tâches', target: '/kos-control-tower-automation' },
];

export default function KOSControlTowerRedirect() {
  return (
    <KOSHubLayout hubId={65}>
      <div className="min-h-screen bg-background-50 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary-100 flex items-center justify-center">
            <i className="ri-git-merge-line text-secondary-600 text-3xl"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-3 font-heading">
            KOS Control Tower — Fusionnée
          </h1>
          <p className="text-sm text-foreground-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Cette tour de contrôle a été <strong className="text-foreground-950">fusionnée dans la KOS Control Tower & Automation Factory™</strong>. 
            Les 9 onglets (SEO, Leads, Revenus, Pipeline, Missions, Risques, Conformité, IA) sont maintenant intégrés avec les capacités d'automatisation.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {MERGED_FEATURES.map(f => (
              <Link
                key={f.label}
                to={f.target}
                className="p-3 rounded-xl bg-background-50 border border-background-200/70 hover:border-secondary-300 transition-all text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary-100 text-secondary-600 flex items-center justify-center mb-2 group-hover:bg-secondary-200 transition-colors">
                  <i className={`${f.icon} text-sm`}></i>
                </div>
                <p className="text-xs font-semibold text-foreground-950 mb-1">{f.label}</p>
                <p className="text-[10px] text-foreground-500 leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>

          <Link
            to="/kos-control-tower-automation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-500 text-white font-bold text-sm hover:bg-secondary-600 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-secondary-500/20"
          >
            <i className="ri-rocket-line"></i>
            Accéder à la Control Tower & Automation Factory
            <i className="ri-arrow-right-line"></i>
          </Link>

          <p className="mt-6 text-xs text-foreground-400">
            Tous les onglets business (SEO, Leads, Revenus, Pipeline, Missions, Risques, Conformité, IA) sont maintenant dans la Control Tower Automation.
          </p>
        </div>
      </div>
    </KOSHubLayout>
  );
}
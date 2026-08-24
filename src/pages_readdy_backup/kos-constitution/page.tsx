import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { KOS_CONSTITUTION_DATA, constitutionPolicy } from '@/mocks/constitution';

function CircularGauge({ value, size = 64, strokeWidth = 6 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const getColor = (v: number) => {
    if (v >= 90) return 'var(--primary-500)';
    if (v >= 75) return 'var(--accent-500)';
    if (v >= 50) return 'var(--secondary-500)';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(var(--background-200) / 0.7)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-semibold text-foreground-950">{value}</span>
    </div>
  );
}

function PolicyCard({ policy, isExpanded, onToggle }: { policy: constitutionPolicy; isExpanded: boolean; onToggle: () => void }) {
  const statusBadge = policy.status === 'active'
    ? 'bg-primary-100 text-primary-700'
    : policy.status === 'draft'
    ? 'bg-secondary-100 text-secondary-700'
    : 'bg-accent-100 text-accent-700';

  const statusLabel = policy.status === 'active' ? 'Actif' : policy.status === 'draft' ? 'Brouillon' : 'En revue';

  return (
    <div className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-background-200/30 transition-colors cursor-pointer"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-background-200/70 flex-shrink-0">
          <i className={`${policy.icon} text-lg text-foreground-700`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground-950">{policy.title}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${statusBadge}`}>
              {statusLabel}
            </span>
          </div>
          <p className="text-xs text-foreground-600 mt-0.5 line-clamp-1">{policy.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <CircularGauge value={policy.score} size={44} strokeWidth={4} />
          <i className={`${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-500 text-sm`} />
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-background-200/70 pt-4 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">Contenu</h4>
            <p className="text-sm text-foreground-700 leading-relaxed">{policy.content}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">Standards de référence</h4>
            <div className="flex flex-wrap gap-1.5">
              {policy.standards.map((std: string) => (
                <span key={std} className="text-xs px-2 py-1 rounded-md bg-background-200/70 text-foreground-600 font-medium">
                  {std}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-foreground-500 pt-2 border-t border-background-200/60">
            <span>Propriétaire : <span className="text-foreground-700 font-medium">{policy.owner}</span></span>
            <span>MàJ : <span className="text-foreground-700 font-medium">{policy.last_updated}</span></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function constitutionPage() {
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>('POL-001');
  const data = KOS_CONSTITUTION_DATA;

  const handleToggle = (id: string) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
  };

  return (
    <hubLayout hubId={63} activeTab="Constitution" tabLabel="Bloc 1">
      <main id="main-content">
        {/* Header */}
        <header className="bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary-100 text-primary-700 uppercase tracking-wider">
                    {data.bloc_id}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-background-200/70 text-foreground-600">
                    {data.version}
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground-950">
                  {data.bloc_name}
                </h1>
                <p className="text-sm text-foreground-600 mt-2 max-w-2xl">
                  {data.executive_summary}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-center">
                  <CircularGauge value={data.current_maturity} size={72} strokeWidth={6} />
                  <p className="text-xs text-foreground-500 mt-1">Maturité</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">{data.target_maturity}</div>
                  <p className="text-xs text-foreground-500 mt-1">Cible</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <section className="border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs text-foreground-600">
              <div className="flex items-center gap-1.5">
                <i className="ri-file-text-line text-foreground-500" />
                <span><strong className="text-foreground-950">{data.total_policies}</strong> Politiques</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-check-line text-primary-500" />
                <span><strong className="text-foreground-950">{data.active_policies}</strong> Actives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-medal-line text-accent-500" />
                <span>Score moyen : <strong className="text-foreground-950">{data.avg_score}/100</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-government-line text-foreground-500" />
                <span>Gouvernance : <strong className="text-foreground-950">{data.governance_body}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-loop-left-line text-foreground-500" />
                <span>Revue : <strong className="text-foreground-950">{data.review_cycle}</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Target */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="bg-accent-100/70 border border-accent-200/60 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0">
              <i className="ri-award-line text-sm" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-accent-700">Certification cible</span>
              <p className="text-sm text-foreground-700">{data.certification_target}</p>
            </div>
          </div>
        </section>

        {/* Policies Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
          <div className="space-y-3">
            {data.policies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                isExpanded={expandedPolicy === policy.id}
                onToggle={() => handleToggle(policy.id)}
              />
            ))}
          </div>
        </section>

        {/* Footer Stats */}
        <footer className="border-t border-background-200/70 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { label: 'Score Global', value: `${data.avg_score}/100`, icon: 'ri-medal-line', color: 'text-primary-500' },
                { label: 'Politiques', value: `${data.active_policies}/${data.total_policies}`, icon: 'ri-file-text-line', color: 'text-accent-500' },
                { label: 'Certification', value: 'ISO 5x', icon: 'ri-award-line', color: 'text-secondary-500' },
                { label: 'Version', value: data.version, icon: 'ri-git-branch-line', color: 'text-foreground-500' },
                { label: 'Maturité Cible', value: `${data.target_maturity}/100`, icon: 'ri-flag-line', color: 'text-primary-500' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <i className={`${stat.icon} ${stat.color} text-lg`} />
                  <p className="text-lg font-bold text-foreground-950 mt-1">{stat.value}</p>
                  <p className="text-xs text-foreground-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </hubLayout>
  );
}




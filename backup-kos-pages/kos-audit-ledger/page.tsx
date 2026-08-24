import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { KOS_AUDIT_LEDGER, AuditJournalEntry, RACIMatrixEntry, ComplianceCheckpoint, AuditTrailLink } from '@/mocks/auditLedger';

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
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="oklch(var(--background-200) / 0.7)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={getColor(value)} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
      </svg>
      <span className="absolute text-sm font-semibold text-foreground-950">{value}</span>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: AuditJournalEntry['severity'] }) {
  const styles = {
    info: 'bg-background-200/70 text-foreground-600',
    warning: 'bg-accent-100 text-accent-700',
    critical: 'bg-red-100 text-red-700',
    blocker: 'bg-red-200 text-red-800',
  };
  const labels = { info: 'Info', warning: 'Alerte', critical: 'Critique', blocker: 'Bloquant' };
  return <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${styles[severity]}`}>{labels[severity]}</span>;
}

function EventTypeIcon({ type }: { type: AuditJournalEntry['event_type'] }) {
  const map: Record<string, string> = {
    prompt_ia: 'ri-robot-2-line text-primary-500',
    reponse_ia: 'ri-chat-3-line text-accent-500',
    decision_humaine: 'ri-user-star-line text-secondary-500',
    correction_auto: 'ri-tools-line text-accent-500',
    validation_qualite: 'ri-shield-check-line text-primary-500',
    execution_bloc: 'ri-play-circle-line text-secondary-500',
    alerte_securite: 'ri-alert-line text-red-500',
    modification_donnees: 'ri-database-2-line text-foreground-500',
  };
  return <i className={map[type] || 'ri-record-circle-line'} />;
}

function EventTypeLabel({ type }: { type: AuditJournalEntry['event_type'] }) {
  const map: Record<string, string> = {
    prompt_ia: 'Prompt IA',
    reponse_ia: 'Réponse IA',
    decision_humaine: 'Décision Humaine',
    correction_auto: 'Correction Auto',
    validation_qualite: 'Validation Qualité',
    execution_bloc: 'Exécution Bloc',
    alerte_securite: 'Alerte Sécurité',
    modification_donnees: 'Modif. Données',
  };
  return <span>{map[type] || type}</span>;
}

function StatusBadge({ status }: { status: AuditJournalEntry['status'] }) {
  const styles = {
    logged: 'bg-background-200/70 text-foreground-500',
    reviewed: 'bg-primary-100 text-primary-700',
    escalated: 'bg-red-100 text-red-700',
    resolved: 'bg-accent-100 text-accent-700',
  };
  const labels = { logged: 'Journalisé', reviewed: 'Revu', escalated: 'Escaladé', resolved: 'Résolu' };
  return <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${styles[status]}`}>{labels[status]}</span>;
}

// Tab 1: Overview
function OverviewTab() {
  const data = KOS_AUDIT_LEDGER;

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { label: 'Entries Totales', value: data.total_entries.toLocaleString(), icon: 'ri-file-list-3-line', color: 'text-primary-500' },
          { label: '30 derniers jours', value: data.entries_last_30_days.toLocaleString(), icon: 'ri-calendar-line', color: 'text-accent-500' },
          { label: 'Non résolus critiques', value: data.unresolved_critical, icon: 'ri-alert-line', color: 'text-red-500' },
          { label: 'Activités RACI', value: data.raci_categories, icon: 'ri-organization-chart', color: 'text-secondary-500' },
          { label: 'Checkpoints Conformité', value: data.compliance_checkpoints, icon: 'ri-check-double-line', color: 'text-foreground-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-background-100 border border-background-200/70 rounded-lg p-4 text-center">
            <i className={`${stat.icon} ${stat.color} text-xl mb-1 block`} />
            <p className="text-lg font-bold text-foreground-950">{stat.value}</p>
            <p className="text-xs text-foreground-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Certification & Maturity */}
      <div className="bg-accent-100/70 border border-accent-200/60 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-500 text-background-50 flex-shrink-0">
          <i className="ri-award-line text-sm" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-semibold text-accent-700">Certification cible</span>
          <p className="text-sm text-foreground-700">{data.certification_target}</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <CircularGauge value={data.current_maturity} size={52} strokeWidth={4} />
          <div className="text-center">
            <div className="text-lg font-bold text-primary-500">{data.target_maturity}</div>
            <p className="text-xs text-foreground-500">Cible</p>
          </div>
        </div>
      </div>

      {/* Standards */}
      <div>
        <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">Standards de Référence</h3>
        <div className="flex flex-wrap gap-1.5">
          {data.standards.map((std) => (
            <span key={std} className="text-xs px-2 py-1 rounded-md bg-background-200/70 text-foreground-600 font-medium">{std}</span>
          ))}
        </div>
      </div>

      {/* Entries by Type */}
      <div>
        <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">Répartition par Type d'Événement</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {data.entries_by_type.map((item) => (
            <div key={item.type} className="bg-background-100 border border-background-200/70 rounded-lg p-3 flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-md bg-background-200/70 flex-shrink-0">
                <i className={`${item.icon} text-foreground-600 text-base`} />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-foreground-950">{item.count.toLocaleString()}</p>
                <p className="text-xs text-foreground-500 truncate">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tables de logs interconnectées */}
      <div>
        <h3 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">Tables de Logs Interconnectées</h3>
        <div className="flex flex-wrap gap-2">
          {['activity_logs', 'ai_audit_trail', 'kos_execution_logs', 'orchestration_logs', 'security_logs', 'monitoring_logs', 'cron_job_logs', 'kos_correction_loop_log', 'kos_cross_resolution_logs', 'tender_scraper_logs', 'email_logs', 'geo_visibility_logs', 'audit_intelligence', 'kos_correction_before_after', 'kos_correction_fix_history', 'diagnostic_events', 'kos_challenge_gaps', 'kos_quality_report_sections'].map((table) => (
            <code key={table} className="text-xs px-2 py-1 rounded-md bg-background-100 border border-background-200/70 text-foreground-700 font-mono whitespace-nowrap">{table}</code>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tab 2: Audit Journal
function AuditJournalTab() {
  const data = KOS_AUDIT_LEDGER;
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return data.journal_entries.filter((e) => {
      const matchSearch = !search || e.description.toLowerCase().includes(search.toLowerCase()) || e.source_system.toLowerCase().includes(search.toLowerCase()) || e.entry_id.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || e.event_type === typeFilter;
      const matchSev = severityFilter === 'all' || e.severity === severityFilter;
      return matchSearch && matchType && matchSev;
    });
  }, [data, search, typeFilter, severityFilter]);

  const formatDate = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
          <input type="text" placeholder="Rechercher dans le journal..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm bg-background-100 border border-background-200/70 rounded-md text-foreground-950 placeholder-foreground-400 focus:outline-none focus:border-primary-300" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-md text-foreground-950">
          <option value="all">Tous les types</option>
          <option value="prompt_ia">Prompts IA</option>
          <option value="reponse_ia">Réponses IA</option>
          <option value="decision_humaine">Décisions Humaines</option>
          <option value="correction_auto">Corrections Auto</option>
          <option value="validation_qualite">Validations Qualité</option>
          <option value="execution_bloc">Exécutions Blocs</option>
          <option value="alerte_securite">Alertes Sécurité</option>
          <option value="modification_donnees">Modif. Données</option>
        </select>
        <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="px-3 py-2 text-sm bg-background-100 border border-background-200/70 rounded-md text-foreground-950">
          <option value="all">Toutes sévérités</option>
          <option value="info">Info</option>
          <option value="warning">Alerte</option>
          <option value="critical">Critique</option>
          <option value="blocker">Bloquant</option>
        </select>
      </div>

      <p className="text-xs text-foreground-500">{filtered.length} entrée{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}</p>

      {/* Entries list */}
      <div className="space-y-2">
        {filtered.map((entry) => (
          <div key={entry.entry_id} className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden transition-all">
            <button type="button" onClick={() => setExpandedEntry(expandedEntry === entry.entry_id ? null : entry.entry_id)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-background-200/30 transition-colors cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center rounded-md bg-background-200/70 flex-shrink-0">
                <EventTypeIcon type={entry.event_type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <EventTypeLabel type={entry.event_type} />
                  <SeverityBadge severity={entry.severity} />
                  <StatusBadge status={entry.status} />
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-500 font-mono whitespace-nowrap">{entry.raci_role}</span>
                </div>
                <p className="text-sm font-semibold text-foreground-950 mt-0.5 line-clamp-1">{entry.description}</p>
                <p className="text-xs text-foreground-500">{formatDate(entry.timestamp)} · {entry.source_system} · {entry.entry_id}</p>
              </div>
              <i className={`${expandedEntry === entry.entry_id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-400 text-sm`} />
            </button>
            {expandedEntry === entry.entry_id && (
              <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Détails</h4>
                  <p className="text-sm text-foreground-700 leading-relaxed">{entry.details}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div><span className="text-foreground-500">Système : </span><span className="text-foreground-700 font-medium">{entry.source_system}</span></div>
                  {entry.agent_id && <div><span className="text-foreground-500">Agent : </span><span className="text-foreground-700 font-medium font-mono">{entry.agent_id}</span></div>}
                  {entry.user_id && <div><span className="text-foreground-500">Utilisateur : </span><span className="text-foreground-700 font-medium font-mono">{entry.user_id}</span></div>}
                  <div><span className="text-foreground-500">Timestamp : </span><span className="text-foreground-700 font-medium">{formatDate(entry.timestamp)}</span></div>
                  <div><span className="text-foreground-500">Sévérité : </span><SeverityBadge severity={entry.severity} /></div>
                  <div><span className="text-foreground-500">Statut : </span><StatusBadge status={entry.status} /></div>
                  <div className="col-span-2 sm:col-span-3"><span className="text-foreground-500">Hash vérification : </span><code className="text-xs text-foreground-700 font-mono">{entry.hash_verification}</code></div>
                  <div><span className="text-foreground-500">Rôle RACI : </span><span className="text-foreground-700 font-bold">{entry.raci_role === 'R' ? 'Responsible' : entry.raci_role === 'A' ? 'Accountable' : entry.raci_role === 'C' ? 'Consulted' : 'Informed'}</span></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab 3: RACI Matrix
function RACIMatrixTab() {
  const data = KOS_AUDIT_LEDGER;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(data.raci_matrix.map((r) => r.category));
    return Array.from(cats);
  }, [data]);

  const filtered = useMemo(() => {
    return selectedCategory === 'all' ? data.raci_matrix : data.raci_matrix.filter((r) => r.category === selectedCategory);
  }, [data, selectedCategory]);

  const categoryLabels: Record<string, string> = {
    gouvernance: 'Gouvernance',
    qualite: 'Qualité',
    securite: 'Sécurité',
    ia: 'IA & Éthique',
    donnees: 'Données',
    operations: 'Opérations',
    conformite: 'Conformité',
  };

  const raciColor = (role: string) => {
    if (role === 'R') return 'bg-primary-100 text-primary-700';
    if (role === 'A') return 'bg-accent-100 text-accent-700';
    if (role.includes('C')) return 'bg-secondary-100 text-secondary-700';
    return 'bg-background-200/70 text-foreground-500';
  };

  return (
    <div className="space-y-4">
      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5">
        <button type="button" onClick={() => setSelectedCategory('all')} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedCategory === 'all' ? 'bg-primary-500 text-background-50' : 'bg-background-100 border border-background-200/70 text-foreground-600 hover:bg-background-200/30'}`}>Tous</button>
        {categories.map((cat) => (
          <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedCategory === cat ? 'bg-primary-500 text-background-50' : 'bg-background-100 border border-background-200/70 text-foreground-600 hover:bg-background-200/30'}`}>{categoryLabels[cat] || cat}</button>
        ))}
      </div>

      {/* RACI Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-foreground-600">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary-100 border border-primary-200 inline-block" /> R = Responsible (Exécute)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent-100 border border-accent-200 inline-block" /> A = Accountable (Approuve)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary-100 border border-secondary-200 inline-block" /> C = Consulted (Consulté)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-background-200/70 border border-background-300/60 inline-block" /> I = Informed (Informé)</span>
      </div>

      <p className="text-xs text-foreground-500">{filtered.length} activité{filtered.length > 1 ? 's' : ''} RACI</p>

      {/* RACI Cards */}
      <div className="space-y-2">
        {filtered.map((raci) => (
          <div key={raci.activity_id} className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden">
            <button type="button" onClick={() => setExpandedActivity(expandedActivity === raci.activity_id ? null : raci.activity_id)} className="w-full flex items-center gap-3 p-3 md:p-4 text-left hover:bg-background-200/30 transition-colors cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center rounded-md bg-background-200/70 flex-shrink-0">
                <i className={`${raci.category === 'ia' ? 'ri-robot-2-line' : raci.category === 'securite' ? 'ri-shield-check-line' : raci.category === 'qualite' ? 'ri-medal-line' : raci.category === 'gouvernance' ? 'ri-government-line' : raci.category === 'conformite' ? 'ri-scales-3-line' : raci.category === 'donnees' ? 'ri-database-2-line' : 'ri-settings-3-line'} text-foreground-600 text-sm`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground-950">{raci.activity_name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${raci.category === 'ia' ? 'bg-primary-100 text-primary-700' : raci.category === 'securite' ? 'bg-red-100 text-red-700' : raci.category === 'qualite' ? 'bg-accent-100 text-accent-700' : 'bg-background-200/70 text-foreground-500'}`}>{categoryLabels[raci.category] || raci.category}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-foreground-500">
                  <span><strong className={raciColor('R') + ' px-1.5 py-0.5 rounded'}>{raci.responsible}</strong> (R)</span>
                  <span className="text-foreground-300">·</span>
                  <span><strong className={raciColor('A') + ' px-1.5 py-0.5 rounded'}>{raci.accountable}</strong> (A)</span>
                </div>
              </div>
              <i className={`${expandedActivity === raci.activity_id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-400 text-sm`} />
            </button>
            {expandedActivity === raci.activity_id && (
              <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Description</h4>
                  <p className="text-sm text-foreground-700 leading-relaxed">{raci.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div><span className="text-foreground-500">Consulté (C) : </span><span className="text-foreground-700 font-medium">{raci.consulted.join(', ')}</span></div>
                  <div><span className="text-foreground-500">Informé (I) : </span><span className="text-foreground-700 font-medium">{raci.informed.join(', ')}</span></div>
                  <div><span className="text-foreground-500">Fréquence : </span><span className="text-foreground-700 font-medium">{raci.frequency}</span></div>
                  <div><span className="text-foreground-500">Preuve : </span><span className="text-foreground-700 font-medium">{raci.evidence_type}</span></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab 4: Audit Trail
function AuditTrailTab() {
  const data = KOS_AUDIT_LEDGER;

  const relationshipLabels: Record<string, string> = {
    triggered_by: 'Déclenche',
    validates: 'Valide',
    corrected_by: 'Corrigé par',
    escalated_to: 'Escalade vers',
    depends_on: 'Dépend de',
  };

  const relationshipIcons: Record<string, string> = {
    triggered_by: 'ri-arrow-right-line text-primary-500',
    validates: 'ri-check-double-line text-accent-500',
    corrected_by: 'ri-tools-line text-secondary-500',
    escalated_to: 'ri-arrow-up-circle-line text-red-500',
    depends_on: 'ri-git-branch-line text-foreground-500',
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-foreground-600">{data.audit_trail_links.length} liens de traçabilité identifiés entre les entrées du journal d'audit, formant une piste d'audit infalsifiable.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {data.audit_trail_links.map((link) => (
          <div key={link.link_id} className="bg-background-100 border border-background-200/70 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-semibold text-foreground-500 bg-background-200/70 px-1.5 py-0.5 rounded">{link.link_id}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-500 font-medium whitespace-nowrap">{relationshipLabels[link.relationship] || link.relationship}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <code className="text-xs font-semibold text-primary-500 font-mono">{link.source_entry}</code>
                <i className={`${relationshipIcons[link.relationship]} text-sm`} />
                <code className="text-xs font-semibold text-accent-500 font-mono">{link.target_entry}</code>
              </div>
              <p className="text-xs text-foreground-600">{link.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trail Visualization hint */}
      <div className="bg-background-100 border border-background-200/70 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <i className="ri-git-branch-line" />
          </div>
          <span className="text-sm font-semibold text-foreground-950">Graphe de Piste d'Audit</span>
        </div>
        <p className="text-xs text-foreground-600">La piste d'audit complète est stockée dans 18 tables de logs interconnectées. Chaque entrée est liée à sa source par hash SHA256. Le graphe ci-dessus montre les 12 liens critiques documentés. Pour une visualisation complète du graphe, connectez le Knowledge Graph KOS.</p>
      </div>
    </div>
  );
}

// Tab 5: Compliance
function ComplianceTab() {
  const data = KOS_AUDIT_LEDGER;
  const [expandedCp, setExpandedCp] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-foreground-950">{data.compliance_checkpoints}</p>
          <p className="text-xs text-foreground-500">Checkpoints</p>
        </div>
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-primary-500">{data.compliance_checkpoints_list.filter(c => c.status === 'compliant').length}</p>
          <p className="text-xs text-foreground-500">Conformes</p>
        </div>
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-accent-500">{data.compliance_checkpoints_list.filter(c => c.status === 'partial').length}</p>
          <p className="text-xs text-foreground-500">Partiels</p>
        </div>
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-red-500">{data.compliance_checkpoints_list.filter(c => c.status === 'non_compliant').length}</p>
          <p className="text-xs text-foreground-500">Non conformes</p>
        </div>
        <div className="bg-background-100 border border-background-200/70 rounded-lg px-4 py-3 text-center">
          <p className="text-lg font-bold text-foreground-950">{data.compliant_pct}%</p>
          <p className="text-xs text-foreground-500">Score global</p>
        </div>
      </div>

      <div className="space-y-2">
        {data.compliance_checkpoints_list.map((cp) => (
          <div key={cp.checkpoint_id} className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden">
            <button type="button" onClick={() => setExpandedCp(expandedCp === cp.checkpoint_id ? null : cp.checkpoint_id)} className="w-full flex items-center gap-3 p-3 md:p-4 text-left hover:bg-background-200/30 transition-colors cursor-pointer">
              <div className={`w-9 h-9 flex items-center justify-center rounded-md flex-shrink-0 ${cp.status === 'compliant' ? 'bg-primary-100 text-primary-700' : cp.status === 'partial' ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-700'}`}>
                <i className={cp.status === 'compliant' ? 'ri-check-line' : cp.status === 'partial' ? 'ri-time-line' : 'ri-close-line'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground-950">{cp.checkpoint_id} — {cp.checkpoint_name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${cp.status === 'compliant' ? 'bg-primary-100 text-primary-700' : cp.status === 'partial' ? 'bg-accent-100 text-accent-700' : 'bg-red-100 text-red-700'}`}>
                    {cp.status === 'compliant' ? 'Conforme' : cp.status === 'partial' ? 'Partiel' : 'Non conforme'}
                  </span>
                </div>
                <p className="text-xs text-foreground-500 mt-0.5">{cp.standard_ref}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <CircularGauge value={cp.score} size={36} strokeWidth={3} />
                <i className={`${expandedCp === cp.checkpoint_id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-400 text-sm`} />
              </div>
            </button>
            {expandedCp === cp.checkpoint_id && (
              <div className="px-4 pb-4 border-t border-background-200/70 pt-3 space-y-2">
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1">Exigence</h4>
                  <p className="text-sm text-foreground-700">{cp.requirement}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div><span className="text-foreground-500">Preuve : </span><span className="text-foreground-700 font-medium">{cp.evidence}</span></div>
                  <div><span className="text-foreground-500">Dernier audit : </span><span className="text-foreground-700 font-medium">{cp.last_audit}</span></div>
                  <div><span className="text-foreground-500">Prochain audit : </span><span className="text-foreground-700 font-medium">{cp.next_audit}</span></div>
                  <div><span className="text-foreground-500">Score : </span><span className="text-foreground-700 font-bold">{cp.score}/100</span></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { key: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
  { key: 'journal', label: 'Journal d\'Audit', icon: 'ri-file-list-3-line' },
  { key: 'raci', label: 'Matrice RACI', icon: 'ri-organization-chart' },
  { key: 'trail', label: 'Piste d\'Audit', icon: 'ri-git-branch-line' },
  { key: 'compliance', label: 'Conformité', icon: 'ri-check-double-line' },
];

export default function auditLedgerPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const data = KOS_AUDIT_LEDGER;

  return (
    <hubLayout hubId={65} activeTab={activeTab} tabLabel="Bloc 3">
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
                <p className="text-sm text-foreground-600 mt-2 max-w-3xl">
                  {data.executive_summary}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <CircularGauge value={data.current_maturity} size={64} strokeWidth={5} />
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-500">{data.target_maturity}</div>
                  <p className="text-xs text-foreground-500">Cible</p>
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
                <i className="ri-file-list-3-line text-primary-500" />
                <span><strong className="text-foreground-950">{data.total_entries.toLocaleString()}</strong> Entrées</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-organization-chart text-accent-500" />
                <span><strong className="text-foreground-950">{data.raci_categories}</strong> Activités RACI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-git-branch-line text-secondary-500" />
                <span><strong className="text-foreground-950">{data.audit_trail_links.length}</strong> Liens Piste</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-check-double-line text-foreground-500" />
                <span><strong className="text-foreground-950">{data.compliance_checkpoints}</strong> Checkpoints</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-alert-line text-red-500" />
                <span><strong className="text-foreground-950">{data.unresolved_critical}</strong> Critiques ouverts</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="border-b border-background-200/70 sticky top-0 bg-background-50 z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex gap-0 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-500 font-semibold'
                      : 'border-transparent text-foreground-500 hover:text-foreground-700 hover:border-background-300/60'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-12">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'journal' && <AuditJournalTab />}
          {activeTab === 'raci' && <RACIMatrixTab />}
          {activeTab === 'trail' && <AuditTrailTab />}
          {activeTab === 'compliance' && <ComplianceTab />}
        </section>

        {/* Footer Stats */}
        <footer className="border-t border-background-200/70 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { label: 'Maturité', value: `${data.current_maturity}/100`, icon: 'ri-medal-line', color: 'text-primary-500' },
                { label: 'Entrées', value: data.total_entries.toLocaleString(), icon: 'ri-file-list-3-line', color: 'text-accent-500' },
                { label: 'RACI', value: data.raci_categories, icon: 'ri-organization-chart', color: 'text-secondary-500' },
                { label: 'Liens', value: data.audit_trail_links.length, icon: 'ri-git-branch-line', color: 'text-foreground-500' },
                { label: 'Conformité', value: `${data.compliant_pct}%`, icon: 'ri-check-double-line', color: 'text-primary-500' },
                { label: 'Version', value: data.version, icon: 'ri-hashtag', color: 'text-foreground-500' },
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






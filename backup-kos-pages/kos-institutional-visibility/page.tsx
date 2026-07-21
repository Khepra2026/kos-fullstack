import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useInstitutionalVisibility } from '@/hooks/useInstitutionalVisibility';
import {
  targetSegments,
  visibilityStrategy,
  institutionalCalendar,
  diffusionPlan,
  institutionalFocusKPIs,
  type TargetSegment,
  type VisibilityStrategy,
  type InstitutionalEvent,
  type DiffusionPlan,
} from '@/mocks/institutionalVisibility';

type VisibilityTab = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' | 'a9' | 'segments' | 'strategy' | 'calendar' | 'diffusion' | 'focus-kpis';

interface TabInfo {
  id: VisibilityTab;
  label: string;
  subtitle: string;
  icon: string;
  count: number;
  color: 'primary' | 'accent' | 'secondary';
}

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-xs font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function ProgressBar({ value, max = 100, color = 'primary', label }: { value: number; max?: number; color?: string; label?: string }) {
  const pct = Math.round((value / max) * 100);
  const barColor = color === 'accent' ? 'bg-accent-500' : color === 'secondary' ? 'bg-secondary-500' : 'bg-primary-500';
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs text-foreground-600 mb-1"><span>{label}</span><span>{pct}%</span></div>}
      <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const bgMap: Record<string, string> = {
    Prioritaire: 'bg-amber-100 text-amber-800 border-amber-200',
    Élevée: 'bg-amber-50 text-amber-700 border-amber-200',
    Moyenne: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    Basse: 'bg-background-200 text-foreground-600 border-background-200',
    Critique: 'bg-red-100 text-red-700 border-red-200',
    'Très Haute': 'bg-red-50 text-red-700 border-red-200',
    Haute: 'bg-amber-50 text-amber-700 border-amber-200',
    Publié: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En Relecture': 'bg-purple-100 text-purple-700 border-purple-200',
    'En Rédaction': 'bg-amber-100 text-amber-700 border-amber-200',
    Planifié: 'bg-secondary-100 text-secondary-600 border-secondary-200',
    'En préparation': 'bg-amber-100 text-amber-700 border-amber-200',
    Nouveau: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Production en cours': 'bg-primary-100 text-primary-700 border-primary-200',
    'Manifestation envoyée': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Proposition envoyée': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'En analyse': 'bg-amber-50 text-amber-700 border-amber-200',
    'À Mettre à Jour': 'bg-amber-100 text-amber-700 border-amber-200',
    'En Révision': 'bg-purple-100 text-purple-700 border-purple-200',
    'En cours': 'bg-primary-100 text-primary-700 border-primary-200',
    Préparation: 'bg-amber-100 text-amber-700 border-amber-200',
    critical: 'bg-red-50 text-red-700 border-red-200',
    active: 'bg-amber-50 text-amber-700 border-amber-200',
    watch: 'bg-secondary-100 text-secondary-600 border-secondary-200',
    'Critique (alerte)': 'bg-red-100 text-red-700 border-red-200',
    'Active (alerte)': 'bg-amber-50 text-amber-700 border-amber-200',
    'En forte croissance': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Progression stable': 'bg-secondary-100 text-secondary-600 border-secondary-200',
    'En hausse': 'bg-primary-100 text-primary-700 border-primary-200',
    'En accélération': 'bg-accent-100 text-accent-700 border-accent-200',
    'Forte traction': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Très bon': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Excellent': 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'Très haute': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Stable: 'bg-secondary-100 text-secondary-600 border-secondary-200',
    'En forte hausse': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Haut (qualitatif)': 'bg-primary-100 text-primary-700 border-primary-200',
    'Faible (académique)': 'bg-background-200 text-foreground-600 border-background-200',
    'Non connecté': 'bg-background-200 text-foreground-500 border-background-200',
    'Connecté LinkedIn': 'bg-primary-100 text-primary-700 border-primary-200',
    'Relation existante': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  const classes = bgMap[variant] || 'bg-background-200 text-foreground-700 border-background-200';
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${classes}`}>{label}</span>;
}

function formatNumber(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val.toLocaleString('fr-FR');
}

function formatFCFA(val: number): string {
  if (val >= 1000) return `${(val / 1000).toFixed(1)} Md`;
  if (val >= 1) return `${val} M`;
  return `${val}`;
}

export default function institutionalVisibilityPage() {
  const {
    organizations,
    decisionMakers,
    projects,
    publications,
    procurement,
    reputation,
    alerts,
    expertProfiles,
    distribution,
    kpis,
    isLive,
    loading,
    error,
    refetch,
  } = useInstitutionalVisibility();

  const institutionMappingOrganizations = organizations;
  const decisionMakerIntelligence = decisionMakers;
  const africaProjectMonitor = projects;
  const thoughtLeadershipProductions = publications;
  const procurementAwareness = procurement;
  const reputationAuthority = reputation;
  const strategicRelationshipAlerts = alerts;
  const expertProfilesData = expertProfiles;
  const knowledgeDistributionChannels = distribution;
  const institutionalVisibilityKPIs = kpis;

  const tabs: TabInfo[] = [
    { id: 'a1', label: 'Agent 1 — Institution Mapping', subtitle: 'Registre dynamique des organisations cibles', icon: 'ri-building-2-line', count: institutionMappingOrganizations.length, color: 'primary' },
    { id: 'a2', label: 'Agent 2 — Decision Maker Intel', subtitle: 'Cartographie des fonctions décisionnelles', icon: 'ri-user-search-line', count: decisionMakerIntelligence.length, color: 'secondary' },
    { id: 'a3', label: 'Agent 3 — Project Monitor', subtitle: 'Surveillance continue des projets et AO', icon: 'ri-radar-line', count: africaProjectMonitor.length, color: 'accent' },
    { id: 'a4', label: 'Agent 4 — Thought Leadership', subtitle: 'Production de contenus experts', icon: 'ri-book-open-line', count: thoughtLeadershipProductions.length, color: 'primary' },
    { id: 'a5', label: 'Agent 5 — Procurement Awareness', subtitle: 'Analyse besoins et fiches de compte', icon: 'ri-file-search-line', count: procurementAwareness.length, color: 'secondary' },
    { id: 'a6', label: 'Agent 6 — Reputation Engine', subtitle: 'Score autorité et crédibilité', icon: 'ri-medal-line', count: reputationAuthority.length, color: 'accent' },
    { id: 'a7', label: 'Agent 7 — Strategic Relationships', subtitle: 'Alertes et positionnement stratégique', icon: 'ri-notification-3-line', count: strategicRelationshipAlerts.length, color: 'primary' },
    { id: 'a8', label: 'Agent 8 — Expert Profiles', subtitle: 'CVs, capability statements, références', icon: 'ri-profile-line', count: expertProfilesData.length, color: 'secondary' },
    { id: 'a9', label: 'Agent 9 — Knowledge Distribution', subtitle: 'Distribution multicanal de contenu', icon: 'ri-share-forward-line', count: knowledgeDistributionChannels.length, color: 'accent' },
    { id: 'segments', label: 'MP9 — 7 Segments Cibles', subtitle: 'Banques, SFD, États, Ministères, Bailleurs, ONG, Fonds', icon: 'ri-pie-chart-line', count: targetSegments.length, color: 'primary' },
    { id: 'strategy', label: 'MP9 — Stratégie Visibilité', subtitle: '4 axes stratégiques par segment', icon: 'ri-focus-3-line', count: visibilityStrategy.length, color: 'accent' },
    { id: 'calendar', label: 'MP9 — Calendrier Institutionnel', subtitle: '12 événements clés 2026', icon: 'ri-calendar-event-line', count: institutionalCalendar.length, color: 'secondary' },
    { id: 'diffusion', label: 'MP9 — Plan de Diffusion', subtitle: '8 canaux de distribution', icon: 'ri-share-forward-2-line', count: diffusionPlan.length, color: 'accent' },
    { id: 'focus-kpis', label: 'MP9 — KPIs Focus', subtitle: 'Invitations · Consultations · Partenariats', icon: 'ri-bar-chart-2-line', count: 3, color: 'primary' },
  ];

  const [activeTab, setActiveTab] = useState<VisibilityTab>('a1');

  const kpi = institutionalVisibilityKPIs;

  if (loading) {
    return (
      <hubLayout hubId={61} activeTab="a1" tabLabel="Institutional Visibility">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Chargement des données institutionnelles...</span>
            </div>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && institutionMappingOrganizations.length === 0) {
    return (
      <hubLayout hubId={61} activeTab="a1" tabLabel="Institutional Visibility">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i className="ri-error-warning-line text-xl"></i>
            </div>
            <p className="text-sm text-red-700 font-medium">Erreur de connexion Supabase</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-1.5"></i>Réessayer
            </button>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={61} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">KOS Institutional Visibility Hub</span>
            {isLive ? (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                DONNÉES LIVE — SUPABASE · 9 Agents · 10K+ Orgs
              </span>
            ) : (
              <>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Mode MOCK — 9 Agents · 10K+ Orgs</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Extraction Live — Supabase Ready
                </span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KOS Institutional Visibility Engine&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">
            Système autonome de développement institutionnel, d'intelligence commerciale B2B et de visibilité stratégique.
            9 agents surveillent 10K+ organisations, 100K+ décideurs et 16K+ projets pour positionner Khepra Experts comme référence en Afrique francophone.
          </p>
        </div>

        {/* Global KPI Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Organisations</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(kpi.total_organizations_suivies)}</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-checkbox-circle-fill text-xs"></i>Objectif {formatNumber(kpi.target_organizations)}</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Décideurs</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(kpi.total_decision_makers_cartographies)}</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-user-search-line text-xs text-emerald-600"></i>Cartographiés</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Projets Suivis</p>
            <span className="text-xl font-bold text-foreground-950">{formatNumber(kpi.total_projets_suivis)}</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-radar-line text-xs text-accent-600"></i>En continu</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Opportunités/an</p>
            <span className="text-xl font-bold text-foreground-950">{kpi.total_opportunites_detectees_an}</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600"><i className="ri-arrow-up-line text-xs"></i>Cible {kpi.target_opportunites}</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Consultations</p>
            <span className="text-xl font-bold text-foreground-950">{kpi.total_consultations_qualifiees_an}</span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-briefcase-line text-xs"></i>Qualifiées/an</div>
          </div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-wider text-foreground-500">Publications</p>
            <span className="text-xl font-bold text-foreground-950">{kpi.total_livres_blancs_an}<span className="text-xs text-foreground-500 font-normal"> +{kpi.total_etudes_sectorielles_an}</span></span>
            <div className="flex items-center gap-1 text-xs text-foreground-600"><i className="ri-book-open-line text-xs"></i>Livres blancs + études</div>
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={kpi.score_autorite_global} size={42} strokeWidth={4} color="primary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Autorité</p><p className="text-sm font-bold text-foreground-950">{kpi.score_autorite_global}/100</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={kpi.score_visibilite} size={42} strokeWidth={4} color="accent" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Visibilité</p><p className="text-sm font-bold text-foreground-950">{kpi.score_visibilite}/100</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <CircularGauge value={kpi.score_credibilite_sectorielle} size={42} strokeWidth={4} color="secondary" />
            <div><p className="text-[10px] uppercase tracking-wider text-foreground-500">Crédibilité Sectorielle</p><p className="text-sm font-bold text-foreground-950">{kpi.score_credibilite_sectorielle}/100</p></div>
          </div>
          <div className="flex items-center gap-3 bg-background-100 rounded-lg p-3">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-red-600">{kpi.alertes_critiques}</span>
              <span className="text-[9px] text-foreground-500">Critiques</span>
            </div>
            <div className="h-8 w-px bg-background-200"></div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-foreground-500">Alertes Actives</p>
              <p className="text-sm font-bold text-foreground-950">{kpi.alertes_actives} total<span className="text-[10px] text-foreground-500 font-normal"> · {kpi.actions_en_cours} en cours</span></p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${
                activeTab === t.id
                  ? t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500'
                  : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'
              }`}
            >
              <i className={`${t.icon} text-sm`}></i>
              <span>{t.label.split(' — ')[0]}</span>
              <span className="opacity-60 text-[10px]">{t.count}</span>
            </button>
          ))}
        </div>

        {/* Tab Info Header */}
        {(() => {
          const tab = tabs.find(t => t.id === activeTab)!;
          return (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-background-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tab.color === 'accent' ? 'bg-accent-100 text-accent-700' : tab.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'}`}>
                  <i className={`${tab.icon} text-lg`}></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-950">{tab.label}</p>
                  <p className="text-xs text-foreground-600">{tab.subtitle} &bull; {tab.count} entrées</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center gap-1.5 ${
                isLive
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : 'bg-amber-100 text-amber-700 border-amber-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                {isLive ? 'DONNÉES LIVE — SUPABASE' : 'Mode MOCK'}
              </span>
            </div>
          );
        })()}

        {/* ============================================ */}
        {/* AGENT 1 : Institution Mapping Engine */}
        {/* ============================================ */}
        {activeTab === 'a1' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {institutionMappingOrganizations.map((org) => (
              <div key={org.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-primary-100 flex items-center justify-center text-primary-600"><i className={`${org.icon} text-sm`}></i></div>
                    <div>
                      <p className="text-sm font-semibold text-foreground-950 leading-tight line-clamp-2">{org.name}</p>
                      <p className="text-[11px] text-foreground-500">{org.category} &bull; {org.city}</p>
                    </div>
                  </div>
                  <Badge label={org.statut} variant={org.statut} />
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {org.domaines.map((d, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{d}</span>
                  ))}
                </div>
                <p className="text-xs text-foreground-500 leading-relaxed line-clamp-2 mb-2"><strong>Priorités :</strong> {org.priorites}</p>
                <p className="text-xs text-foreground-600 mb-2 leading-relaxed line-clamp-2"><strong>Dernière :</strong> {org.derniere_consultation}</p>
                <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-background-200/50">
                  <span className="text-foreground-500 flex items-center gap-1"><i className="ri-folder-2-line text-xs"></i>{org.projets_actifs} projets</span>
                  <span className="text-foreground-500 flex items-center gap-1"><i className="ri-funds-line text-xs"></i>{typeof org.budget_annuel_musd === 'string' ? org.budget_annuel_musd : `${org.budget_annuel_musd} MUSD`}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 2 : Decision Maker Intelligence */}
        {/* ============================================ */}
        {activeTab === 'a2' && (
          <div className="space-y-2">
            {decisionMakerIntelligence.map((dm) => (
              <div key={dm.id} className="bg-background-50 border border-background-200/60 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                    dm.priorite === 'Critique' ? 'bg-red-100 text-red-700' :
                    dm.priorite === 'Très Haute' ? 'bg-amber-100 text-amber-700' :
                    dm.priorite === 'Haute' ? 'bg-primary-100 text-primary-700' :
                    'bg-background-200 text-foreground-500'
                  }`}>
                    {dm.nom.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold text-foreground-950">{dm.nom}</span>
                      <Badge label={dm.priorite} variant={dm.priorite} />
                    </div>
                    <p className="text-xs text-foreground-600">{dm.fonction} — {dm.organisation}</p>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-500 mt-0.5">
                      <span>{dm.pays}</span>
                      <span>&bull;</span>
                      <span>{dm.secteur}</span>
                      <span>&bull;</span>
                      <Badge label={dm.contact_status} variant={dm.contact_status} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 3 : Africa Project Monitor */}
        {/* ============================================ */}
        {activeTab === 'a3' && (
          <div className="space-y-3">
            {africaProjectMonitor.map((proj) => (
              <div key={proj.id} className={`bg-background-50 border rounded-lg p-4 ${proj.alerte === 'critique' ? 'border-red-200/70 bg-red-50/20' : proj.alerte === 'active' ? 'border-amber-200/70 bg-amber-50/20' : 'border-background-200/60'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                      proj.alerte === 'critique' ? 'bg-red-100 text-red-700' : proj.alerte === 'active' ? 'bg-amber-100 text-amber-700' : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      <i className="ri-radar-line"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{proj.titre}</h4>
                      <p className="text-xs text-foreground-500">{proj.bailleur} &bull; {proj.budget_musd} MUSD &bull; {proj.pays}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                    <Badge label={proj.statut} variant={proj.statut} />
                    <Badge label={proj.phase} variant={proj.phase === 'Préparation' ? 'Préparation' : proj.statut} />
                  </div>
                </div>
                <p className="text-xs text-foreground-700 mt-2"><strong>Opportunité Khepra :</strong> {proj.opportunite_khepra}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-background-200/50 text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-calendar-line text-xs"></i>{proj.date_debut} → {proj.date_fin}</span>
                  <span className="flex items-center gap-1 text-accent-600 font-medium"><i className="ri-crosshair-line text-xs"></i>Score : {proj.score_opportunite}/100</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 4 : Thought Leadership Factory */}
        {/* ============================================ */}
        {activeTab === 'a4' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {thoughtLeadershipProductions.map((pub) => (
              <div key={pub.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge label={pub.type} variant={pub.statut} />
                  <Badge label={pub.statut} variant={pub.statut} />
                  <span className="text-[10px] text-foreground-500 ml-auto">{pub.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 leading-tight">{pub.titre}</h4>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="text-[10px] bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full border border-accent-200">{pub.theme}</span>
                  {pub.citations > 0 && <span className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{pub.citations} citations</span>}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {pub.canaux.map((c, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
                <div className="mt-auto pt-3 border-t border-background-200/50 flex items-center justify-between text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-pages-line text-xs"></i>{pub.pages}p</span>
                  <span className="flex items-center gap-1 text-primary-600 font-medium"><i className="ri-star-line text-xs"></i>Score qualité : {pub.score_qualite}/10</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 5 : Procurement Awareness Engine */}
        {/* ============================================ */}
        {activeTab === 'a5' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procurementAwareness.map((pa) => (
              <div key={pa.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-secondary-100 flex items-center justify-center text-secondary-600">
                      <i className="ri-file-search-line text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{pa.organisation}</h4>
                      <p className="text-[11px] text-foreground-500">{pa.profil}</p>
                    </div>
                  </div>
                  <CircularGauge value={pa.score_alignement} size={36} strokeWidth={3} color={pa.score_alignement >= 90 ? 'primary' : pa.score_alignement >= 80 ? 'accent' : 'secondary'} />
                </div>
                <p className="text-xs text-foreground-600 mb-2 leading-relaxed">{pa.analyse}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {pa.besoins_detectes.map((b, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{b}</span>
                  ))}
                </div>
                <div className="mt-auto pt-2 border-t border-background-200/50 flex items-center justify-between text-[11px]">
                  <span className="text-foreground-500 flex items-center gap-1"><i className="ri-search-eye-line text-xs"></i>{pa.opportunites_active} opportunités</span>
                  <span className="text-secondary-600 font-medium">{pa.score_alignement}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 6 : Reputation & Authority Engine */}
        {/* ============================================ */}
        {activeTab === 'a6' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reputationAuthority.map((rep) => (
              <div key={rep.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{rep.indicateur}</h4>
                    <p className="text-xs text-foreground-500 mt-0.5">{rep.description}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-foreground-950">{rep.valeur}</span>
                    <span className="text-xs text-foreground-500 ml-1">{rep.unite}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-600">{rep.variation}</span>
                    <p className="text-[9px] text-foreground-500">/ Objectif {rep.objectif}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <ProgressBar value={typeof rep.valeur === 'number' ? Math.round((rep.valeur / rep.objectif) * 100) : 0} color="accent" />
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-foreground-500">Source : {rep.source}</span>
                    <Badge label={rep.label} variant={rep.label} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 7 : Strategic Relationship Engine */}
        {/* ============================================ */}
        {activeTab === 'a7' && (
          <div className="space-y-3">
            {strategicRelationshipAlerts.map((alt) => (
              <div key={alt.id} className={`bg-background-50 border rounded-lg p-4 ${alt.priorite === 'Critique' ? 'border-red-200/70 bg-red-50/20' : alt.priorite === 'Haute' ? 'border-amber-200/70 bg-amber-50/20' : 'border-background-200/60'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                      alt.priorite === 'Critique' ? 'bg-red-100 text-red-700' :
                      alt.priorite === 'Haute' ? 'bg-amber-100 text-amber-700' :
                      'bg-secondary-100 text-secondary-600'
                    }`}>
                      <i className={alt.type_alerte === 'Appel d\'Offres' ? 'ri-file-text-line' : alt.type_alerte === 'Appel à Manifestation' ? 'ri-flag-line' : alt.type_alerte === 'Consultation' ? 'ri-chat-3-line' : alt.type_alerte === 'Nouveau Programme' ? 'ri-lightbulb-line' : alt.type_alerte === 'DAO' ? 'ri-article-line' : 'ri-notification-3-line'}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground-950">{alt.titre}</span>
                        <Badge label={alt.priorite} variant={alt.priorite} />
                        <Badge label={alt.type_alerte} variant={alt.statut === 'Nouveau' ? 'Nouveau' : 'En préparation'} />
                      </div>
                      <p className="text-xs text-foreground-500">{alt.organisation} &bull; Deadline : <strong>{alt.deadline}</strong> &bull; Assigné : <strong>{alt.assigne}</strong></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge label={alt.statut} variant={alt.statut} />
                  </div>
                </div>
                <p className="text-xs text-foreground-700 mt-2"><strong>Action requise :</strong> {alt.action_requise}</p>
                <p className="text-[10px] text-foreground-500 mt-1">Détecté le {alt.date_detection}</p>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 8 : Khepra Expert Profile Engine */}
        {/* ============================================ */}
        {activeTab === 'a8' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {expertProfiles.map((prof) => (
              <div key={prof.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge label={prof.type} variant={prof.statut === 'Publié' ? 'Publié' : 'En préparation'} />
                  <Badge label={prof.statut} variant={prof.statut} />
                  <span className="text-[10px] text-foreground-500 ml-auto">{prof.derniere_maj}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 leading-tight">{prof.titre}</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {prof.secteurs.map((s, i) => (
                    <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="text-xs text-foreground-600 mb-2">
                  <p><strong>Références :</strong> {prof.references_cles.join(', ')}</p>
                  <p><strong>Certs :</strong> {prof.certifications.join(', ')}</p>
                </div>
                <div className="mt-auto pt-3 border-t border-background-200/50 flex items-center justify-between text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-pages-line text-xs"></i>{prof.pages}p</span>
                  <span className="flex items-center gap-1 text-primary-600 font-medium"><i className="ri-star-line text-xs"></i>Qualité : {prof.score_qualite}/10</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* AGENT 9 : Knowledge Distribution Engine */}
        {/* ============================================ */}
        {activeTab === 'a9' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowledgeDistributionChannels.map((ch) => (
              <div key={ch.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col group hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    ch.canal.includes('Site') || ch.canal.includes('Centre') ? 'bg-primary-100 text-primary-600' :
                    ch.canal.includes('LinkedIn') ? 'bg-accent-100 text-accent-600' :
                    ch.canal.includes('Newsletter') || ch.canal.includes('RSS') ? 'bg-secondary-100 text-secondary-600' :
                    'bg-background-200 text-foreground-600'
                  }`}>
                    <i className={
                      ch.canal.includes('Site') ? 'ri-globe-line' :
                      ch.canal.includes('LinkedIn') ? 'ri-share-circle-line' :
                      ch.canal.includes('Newsletter') ? 'ri-mail-line' :
                      ch.canal.includes('Centre') ? 'ri-pages-line' :
                      ch.canal.includes('Conférence') ? 'ri-megaphone-line' :
                      ch.canal.includes('Webinaire') ? 'ri-vidicon-line' :
                      ch.canal.includes('Académique') ? 'ri-graduation-cap-line' :
                      'ri-rss-line'
                    }></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{ch.canal}</h4>
                    <p className="text-[11px] text-foreground-500">{ch.type} &bull; {ch.frequence}</p>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 mb-2 leading-relaxed">{ch.description}</p>
                <div className="mt-auto">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-background-100 rounded p-2 text-center">
                      <p className="text-sm font-bold text-foreground-950">{formatNumber(ch.audience)}</p>
                      <p className="text-[9px] text-foreground-500">Audience</p>
                    </div>
                    <div className="bg-background-100 rounded p-2 text-center">
                      <p className="text-sm font-bold text-foreground-950">{ch.engagement}</p>
                      <p className="text-[9px] text-foreground-500">Engagement</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-foreground-500 flex items-center gap-1"><i className="ri-file-copy-2-line text-xs"></i>{ch.contenus_mois}/mois</span>
                    <span className="text-accent-600 font-medium">{ch.score_efficacite}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* MP9 — SEGMENTS CIBLES : 7 Types d'Acteurs */}
        {/* ============================================ */}
        {activeTab === 'segments' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {targetSegments.map((seg) => (
              <div key={seg.id} className={`bg-background-50 border rounded-lg p-5 hover:border-background-300/80 transition-colors cursor-pointer ${
                seg.priorite === 'Prioritaire'
                  ? 'border-primary-200/70 bg-primary-50/10'
                  : seg.priorite === 'Élevée'
                  ? 'border-accent-200/70 bg-accent-50/10'
                  : 'border-background-200/60'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    seg.couleur === 'accent' ? 'bg-accent-100 text-accent-700' : seg.couleur === 'secondary' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'
                  }`}>
                    <i className={`${seg.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground-950">{seg.nom}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge label={seg.priorite} variant={seg.priorite} />
                      <span className="text-[10px] text-foreground-500">Pénétration {seg.score_penetration}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{seg.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-3 bg-background-100 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground-950">{seg.organisations_suivies}</div>
                    <div className="text-[9px] text-foreground-500">Organisations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground-950">{seg.decideurs_cartographies}</div>
                    <div className="text-[9px] text-foreground-500">Décideurs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground-950">{seg.opportunites_actives}</div>
                    <div className="text-[9px] text-foreground-500">Opportunités</div>
                  </div>
                </div>
                <div className="text-[11px] text-foreground-600 mb-2">
                  <strong>Clés :</strong> {seg.organisations_cles.join(', ')}
                </div>
                <div className="space-y-1.5 pt-3 border-t border-background-200/50">
                  <div className="text-[11px] text-foreground-500 flex items-start gap-1.5">
                    <i className="ri-check-double-line text-emerald-500 mt-0.5"></i>
                    <span>{seg.derniere_action}</span>
                  </div>
                  <div className="text-[11px] text-primary-600 flex items-start gap-1.5 font-medium">
                    <i className="ri-arrow-right-line mt-0.5"></i>
                    <span>{seg.prochaine_action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* MP9 — STRATÉGIE DE VISIBILITÉ */}
        {/* ============================================ */}
        {activeTab === 'strategy' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {visibilityStrategy.map((strat) => (
              <div key={strat.id} className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-100 text-accent-700 flex items-center justify-center">
                      <i className="ri-focus-3-line"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">{strat.axe}</h4>
                      <p className="text-[10px] text-foreground-500">{strat.segment_cible}</p>
                    </div>
                  </div>
                  <Badge label={strat.statut} variant={strat.statut === 'Actif' ? 'Publié' : strat.statut === 'En cours' ? 'En cours' : 'En préparation'} />
                </div>
                <p className="text-xs text-foreground-700 mb-3 font-medium">{strat.objectif}</p>
                <p className="text-xs text-foreground-600 mb-3 leading-relaxed">{strat.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {strat.canaux.map((c, i) => (
                    <span key={i} className="text-[10px] bg-accent-50 text-accent-700 px-2 py-1 rounded-full border border-accent-200">{c}</span>
                  ))}
                </div>
                <div className="space-y-1.5 mb-3">
                  {strat.kpis.map((kpi, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] bg-background-100 rounded-lg p-2">
                      <span className="text-foreground-600">{kpi.label}</span>
                      <span className="font-semibold text-foreground-950">{kpi.valeur} <span className="text-foreground-500 font-normal">→ {kpi.cible}</span></span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-background-200/50 text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-calendar-line text-xs"></i>{strat.calendrier}</span>
                  <span className="flex items-center gap-1"><i className="ri-funds-line text-xs"></i>{strat.budget_estime}</span>
                  <span className="text-xs text-foreground-500">{strat.responsable}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* MP9 — CALENDRIER INSTITUTIONNEL 2026 */}
        {/* ============================================ */}
        {activeTab === 'calendar' && (
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-background-200 hidden sm:block"></div>
            <div className="space-y-0">
              {institutionalCalendar.map((ev, idx) => {
                const isCritique = ev.importance === 'Critique';
                const isHaute = ev.importance === 'Haute';
                const typeColor = ev.type === 'AO Deadline' ? 'bg-red-100 text-red-700 border-red-200' :
                  ev.type === 'Conférence' ? 'bg-accent-100 text-accent-700 border-accent-200' :
                  ev.type === 'Publication' ? 'bg-primary-100 text-primary-700 border-primary-200' :
                  ev.type === 'Webinaire' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                  ev.type === 'Formation' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                  ev.type === 'Networking' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                  'bg-background-200 text-foreground-700 border-background-200';
                return (
                  <div key={ev.id} className={`flex gap-4 pb-5 ${idx === institutionalCalendar.length - 1 ? 'pb-0' : ''}`}>
                    <div className={`hidden sm:flex w-10 flex-shrink-0 items-start justify-center pt-1 relative z-10`}>
                      <div className={`w-[10px] h-[10px] rounded-full border-2 ${isCritique ? 'bg-red-500 border-red-500' : isHaute ? 'bg-amber-500 border-amber-500' : 'bg-background-300 border-background-300'}`}></div>
                    </div>
                    <div className={`flex-1 min-w-0 bg-background-50 border rounded-lg p-4 ${isCritique ? 'border-red-200/60 bg-red-50/10' : isHaute ? 'border-amber-200/60 bg-amber-50/10' : 'border-background-200/60'}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColor}`}>{ev.type}</span>
                          <Badge label={ev.importance} variant={ev.importance} />
                          <Badge label={ev.statut} variant={ev.statut === 'Confirmé' ? 'Publié' : ev.statut === 'En préparation' ? 'En préparation' : 'Planifié'} />
                        </div>
                        <span className="text-xs font-bold text-foreground-950 whitespace-nowrap">{ev.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground-950 mb-1">{ev.evenement}</h4>
                      <p className="text-xs text-foreground-600 mb-2">{ev.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-foreground-500 pt-2 border-t border-background-200/50">
                        <span className="flex items-center gap-1"><i className="ri-group-line text-xs"></i>{ev.segment_cible}</span>
                        <span className="flex items-center gap-1"><i className="ri-file-text-line text-xs"></i>{ev.livrable}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* MP9 — PLAN DE DIFFUSION */}
        {/* ============================================ */}
        {activeTab === 'diffusion' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {diffusionPlan.map((df) => (
              <div key={df.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    df.type === 'Push' ? 'bg-accent-100 text-accent-700' : df.type === 'Pull' ? 'bg-secondary-100 text-secondary-700' : 'bg-primary-100 text-primary-700'
                  }`}>{df.type}</span>
                  <span className="text-[10px] text-foreground-500">{df.frequence}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-2 leading-tight">{df.canal}</h4>
                <p className="text-xs text-foreground-600 mb-3 flex-1">{df.contenu_type}</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-background-100 rounded p-2 text-center">
                    <div className="text-sm font-bold text-foreground-950">{formatNumber(df.audience_estimee)}</div>
                    <div className="text-[9px] text-foreground-500">Audience</div>
                  </div>
                  <div className="bg-background-100 rounded p-2 text-center">
                    <div className="text-sm font-bold text-foreground-950">{df.taux_engagement}</div>
                    <div className="text-[9px] text-foreground-500">Engagement</div>
                  </div>
                </div>
                <div className="text-[10px] text-foreground-600 mb-2 bg-background-100 rounded p-2">
                  <strong>Objectif T3 :</strong> {df.objectif_trimestriel}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-background-200/50 text-[10px]">
                  <span className="text-foreground-500">{df.responsable}</span>
                  <span className="text-accent-600 font-medium">{df.cout_mensuel}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================ */}
        {/* MP9 — KPIs FOCUS : Invitations · Consultations · Partenariats */}
        {/* ============================================ */}
        {activeTab === 'focus-kpis' && (
          <div className="space-y-5">
            {/* Invitations */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center">
                  <i className="ri-mail-send-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Invitations Institutionnelles</h3>
                  <p className="text-xs text-foreground-500">Conférences, panels, keynotes — présence terrain</p>
                </div>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">{institutionalFocusKPIs.invitations.progression}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-foreground-950">{institutionalFocusKPIs.invitations.total_an}</div>
                  <div className="text-[10px] text-foreground-500">Total / an</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary-600">{institutionalFocusKPIs.invitations.conferences}</div>
                  <div className="text-[10px] text-foreground-500">Conférences</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-accent-600">{institutionalFocusKPIs.invitations.panels}</div>
                  <div className="text-[10px] text-foreground-500">Panels</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-secondary-600">{institutionalFocusKPIs.invitations.keynotes}</div>
                  <div className="text-[10px] text-foreground-500">Keynotes</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-foreground-500 mb-1"><span>Taux d'acceptation</span><span>{institutionalFocusKPIs.invitations.taux_acceptation}%</span></div>
                  <div className="h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${institutionalFocusKPIs.invitations.taux_acceptation}%` }}></div>
                  </div>
                </div>
                <div className="text-xs text-foreground-600">Cible : <strong>{institutionalFocusKPIs.invitations.cible_an}/an</strong></div>
              </div>
              <div className="text-[11px] text-foreground-500 space-y-1">
                <p><strong>Dernier :</strong> {institutionalFocusKPIs.invitations.dernier_evenement}</p>
                <p><strong>Prochain :</strong> {institutionalFocusKPIs.invitations.prochain_evenement}</p>
              </div>
            </div>

            {/* Consultations */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-100 text-accent-700 flex items-center justify-center">
                  <i className="ri-briefcase-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Consultations & Appels d'Offres</h3>
                  <p className="text-xs text-foreground-500">AO, AMI, consultations directes — conversion en missions</p>
                </div>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">{institutionalFocusKPIs.consultations.progression}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-foreground-950">{institutionalFocusKPIs.consultations.total_an}</div>
                  <div className="text-[10px] text-foreground-500">Total / an</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-accent-600">{institutionalFocusKPIs.consultations.ao_remportes}</div>
                  <div className="text-[10px] text-foreground-500">AO Remportés</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary-600">{institutionalFocusKPIs.consultations.ami_remportes}</div>
                  <div className="text-[10px] text-foreground-500">AMI Remportés</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-600">{institutionalFocusKPIs.consultations.ca_genere}</div>
                  <div className="text-[10px] text-foreground-500">CA Généré</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-foreground-500 mb-1"><span>Taux de conversion</span><span>{institutionalFocusKPIs.consultations.taux_conversion}%</span></div>
                  <div className="h-2 bg-background-200 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-500 rounded-full" style={{ width: `${institutionalFocusKPIs.consultations.taux_conversion}%` }}></div>
                  </div>
                </div>
                <div className="text-xs text-foreground-600">Cible : <strong>{institutionalFocusKPIs.consultations.cible_an}/an</strong></div>
              </div>
            </div>

            {/* Partenariats */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary-100 text-secondary-700 flex items-center justify-center">
                  <i className="ri-handshake-line text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">Partenariats Stratégiques</h3>
                  <p className="text-xs text-foreground-500">Consortiums, technique, académique, institutionnel</p>
                </div>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">{institutionalFocusKPIs.partenariats.progression}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-foreground-950">{institutionalFocusKPIs.partenariats.total_actifs}</div>
                  <div className="text-[10px] text-foreground-500">Total Actifs</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary-600">{institutionalFocusKPIs.partenariats.consortium}</div>
                  <div className="text-[10px] text-foreground-500">Consortium</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-accent-600">{institutionalFocusKPIs.partenariats.technique}</div>
                  <div className="text-[10px] text-foreground-500">Technique</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-secondary-600">{institutionalFocusKPIs.partenariats.academique}</div>
                  <div className="text-[10px] text-foreground-500">Académique</div>
                </div>
                <div className="bg-background-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-600">{institutionalFocusKPIs.partenariats.institutionnel}</div>
                  <div className="text-[10px] text-foreground-500">Institutionnel</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-foreground-600">Cible : <strong>{institutionalFocusKPIs.partenariats.cible_an}</strong> &bull; <strong>{institutionalFocusKPIs.partenariats.en_negociation}</strong> en négociation</div>
                </div>
              </div>
              <div className="text-[11px] text-foreground-500 space-y-1">
                <strong>Derniers signés :</strong>
                {institutionalFocusKPIs.partenariats.derniers_signes.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-foreground-700 ml-4">
                    <i className="ri-check-line text-emerald-500"></i>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer — Architecture Summary */}
        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-radar-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Institutional Visibility Engine&trade; — 9 Agents Autonomes</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-[11px] text-accent-800/70">
            {tabs.map(t => (
              <span key={t.id} className="flex items-center gap-1">
                <i className={`${t.icon} text-xs`}></i>
                {t.label.split(' — ')[0]}
              </span>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-accent-200/40 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-accent-800/60">
            <span><strong>{formatNumber(kpi.total_organizations_suivies)}</strong> organisations</span>
            <span><strong>{formatNumber(kpi.total_decision_makers_cartographies)}</strong> décideurs</span>
            <span><strong>{kpi.total_opportunites_detectees_an}</strong> opportunités/an</span>
            <span><strong>{kpi.total_interactions_qualifiees_an}</strong> interactions/an</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}






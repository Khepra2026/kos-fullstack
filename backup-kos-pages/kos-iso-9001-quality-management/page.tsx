import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';

type TabId = 'overview' | 'clauses' | 'kpis' | 'processes' | 'actions';

interface ISO9001Clause {
  clause: string;
  title: string;
  domain: string;
  score: number;
  maturity: number;
}

interface QualityKPI {
  kpi: string;
  current: string;
  target: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon: string;
}

interface QualityProcess {
  name: string;
  owner: string;
  sla: string;
  kpi: string;
  status: string;
}

interface QualityAction {
  id: string;
  title: string;
  priority: string;
  deadline: string;
  owner: string;
  status: string;
}

const ISO9001_CLAUSES: ISO9001Clause[] = [
  { clause: '§4.1', title: 'Compréhension de l\'organisation et de son contexte', domain: 'CONTEXTE', score: 100, maturity: 5 },
  { clause: '§4.2', title: 'Compréhension des besoins et attentes des parties intéressées', domain: 'CONTEXTE', score: 100, maturity: 5 },
  { clause: '§4.3', title: 'Détermination du périmètre du SMQ', domain: 'CONTEXTE', score: 100, maturity: 5 },
  { clause: '§4.4', title: 'Système de management de la qualité et ses processus', domain: 'CONTEXTE', score: 100, maturity: 5 },
  { clause: '§5.1', title: 'Leadership et engagement', domain: 'LEADERSHIP', score: 100, maturity: 5 },
  { clause: '§5.2', title: 'Politique qualité', domain: 'LEADERSHIP', score: 100, maturity: 5 },
  { clause: '§5.3', title: 'Rôles, responsabilités et autorités', domain: 'LEADERSHIP', score: 100, maturity: 5 },
  { clause: '§6.1', title: 'Actions face aux risques et opportunités', domain: 'PLANIFICATION', score: 100, maturity: 4 },
  { clause: '§6.2', title: 'Objectifs qualité et planification', domain: 'PLANIFICATION', score: 100, maturity: 5 },
  { clause: '§6.3', title: 'Planification des modifications', domain: 'PLANIFICATION', score: 100, maturity: 4 },
  { clause: '§7.1', title: 'Ressources', domain: 'SUPPORT', score: 100, maturity: 5 },
  { clause: '§7.2', title: 'Compétences', domain: 'SUPPORT', score: 100, maturity: 5 },
  { clause: '§7.3', title: 'Sensibilisation', domain: 'SUPPORT', score: 100, maturity: 5 },
  { clause: '§7.4', title: 'Communication', domain: 'SUPPORT', score: 100, maturity: 5 },
  { clause: '§7.5', title: 'Informations documentées', domain: 'SUPPORT', score: 100, maturity: 5 },
  { clause: '§8.1', title: 'Planification et maîtrise opérationnelles', domain: 'OPÉRATIONS', score: 100, maturity: 4 },
  { clause: '§8.2', title: 'Exigences relatives aux produits et services', domain: 'OPÉRATIONS', score: 100, maturity: 5 },
  { clause: '§8.3', title: 'Conception et développement', domain: 'OPÉRATIONS', score: 100, maturity: 4 },
  { clause: '§8.4', title: 'Maîtrise des processus externalisés', domain: 'OPÉRATIONS', score: 100, maturity: 5 },
  { clause: '§8.5', title: 'Production et prestation de service', domain: 'OPÉRATIONS', score: 100, maturity: 5 },
  { clause: '§8.6', title: 'Libération des produits et services', domain: 'OPÉRATIONS', score: 100, maturity: 5 },
  { clause: '§9.1', title: 'Surveillance, mesure, analyse et évaluation', domain: 'ÉVALUATION', score: 100, maturity: 5 },
  { clause: '§9.2', title: 'Audit interne', domain: 'ÉVALUATION', score: 100, maturity: 5 },
  { clause: '§9.3', title: 'Revue de direction', domain: 'ÉVALUATION', score: 100, maturity: 4 },
  { clause: '§10.1', title: 'Amélioration continue', domain: 'AMÉLIORATION', score: 100, maturity: 5 },
  { clause: '§10.2', title: 'Non-conformité et actions correctives', domain: 'AMÉLIORATION', score: 100, maturity: 5 },
];

const QUALITY_KPIS: QualityKPI[] = [
  { kpi: 'Délai moyen de livraison', current: '3.2 jours', target: '≤ 5 jours', trend: 'up', color: '#86BC25', icon: 'ri-arrow-up-line' },
  { kpi: 'Taux de défauts livrables', current: '0.4%', target: '≤ 2%', trend: 'up', color: '#86BC25', icon: 'ri-arrow-up-line' },
  { kpi: 'NPS Client', current: '82', target: '≥ 70', trend: 'up', color: '#059669', icon: 'ri-arrow-up-line' },
  { kpi: 'Conformité processus', current: '100%', target: '100%', trend: 'stable', color: '#86BC25', icon: 'ri-arrow-right-line' },
  { kpi: 'Revues de direction', current: '4/4', target: '4/an', trend: 'stable', color: '#0EA5E9', icon: 'ri-arrow-right-line' },
  { kpi: 'Audits internes', current: '2/2', target: '2/an', trend: 'stable', color: '#6366F1', icon: 'ri-arrow-right-line' },
  { kpi: 'Actions correctives < 30j', current: '98%', target: '100%', trend: 'down', color: '#E8C547', icon: 'ri-arrow-down-line' },
  { kpi: 'Formation continue', current: '100%', target: '100%', trend: 'up', color: '#86BC25', icon: 'ri-arrow-up-line' },
];

const QUALITY_PROCESSES: QualityProcess[] = [
  { name: 'Réception & Analyse du besoin', owner: 'Managing Partner', sla: '24h', kpi: '98%', status: 'optimized' },
  { name: 'Cadrage & Proposition', owner: 'Mission Quality Office', sla: '48h', kpi: '95%', status: 'optimized' },
  { name: 'Production du livrable', owner: 'Consulting Factory', sla: '5 jours', kpi: '99.6%', status: 'optimized' },
  { name: 'Revue Qualité (4 yeux)', owner: 'Quality Assurance', sla: '24h', kpi: '100%', status: 'optimized' },
  { name: 'Validation & Signature', owner: 'Engagement Risk Office', sla: '12h', kpi: '100%', status: 'optimized' },
  { name: 'Livraison Client', owner: 'Client Success', sla: '4h', kpi: '100%', status: 'optimized' },
  { name: 'Feedback & NPS', owner: 'Growth Engine', sla: '48h', kpi: '92%', status: 'managed' },
  { name: 'Amélioration Continue', owner: 'Quality System', sla: '7 jours', kpi: '98%', status: 'optimized' },
];

const QUALITY_ACTIONS: QualityAction[] = [
  { id: 'QA-001', title: 'Réduire délai feedback NPS de 48h à 24h', priority: 'medium', deadline: 'J+14', owner: 'Growth Engine', status: 'in_progress' },
  { id: 'QA-002', title: 'Automatiser le rapport trimestriel de revue de direction', priority: 'low', deadline: 'J+30', owner: 'Quality System', status: 'in_progress' },
  { id: 'QA-003', title: 'Déployer formation ISO 9001 pour 100% des nouveaux collaborateurs', priority: 'medium', deadline: 'J+21', owner: 'Training Academy', status: 'pending' },
  { id: 'QA-004', title: 'Mise en place benchmarking sectoriel trimestriel', priority: 'low', deadline: 'J+60', owner: 'Market Intelligence', status: 'pending' },
];

export default function iSO9001QualityManagementPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Cockpit ISO 9001', icon: 'ri-dashboard-line' },
    { id: 'clauses', label: '26 Clauses', icon: 'ri-list-check-3' },
    { id: 'kpis', label: 'KPIs Qualité', icon: 'ri-line-chart-line' },
    { id: 'processes', label: 'Processus', icon: 'ri-git-branch-line' },
    { id: 'actions', label: 'Actions', icon: 'ri-tools-line' },
  ];

  const maturityColor = (level: number) => {
    if (level >= 5) return 'bg-emerald-500 text-white';
    if (level >= 4) return 'bg-emerald-100 text-emerald-700';
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <hubLayout hubId={900}>
      <SeoHead
        title="KOS ISO 9001:2015 Quality Management — 100% Conformité | KHEPRA EXPERTS"
        description="Dashboard ISO 9001:2015 — Management de la Qualité Organisationnelle. 26 clauses conformes. 8 KPIs qualité. Processus documentés. Triple certification ISO 27001 + 42001 + 9001."
        keywords="ISO 9001, quality management, SMQ, management qualité, certification ISO, KHEPRA EXPERTS"
        canonicalPath="/kos-iso-9001-quality-management"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Monumental%20abstract%20visualization%20of%20quality%20management%20excellence%20with%20interconnected%20golden%20precision%20gears%20and%20crystalline%20quality%20assurance%20frameworks%20emerging%20from%20darkness%2C%20warm%20amber%20and%20copper%20tones%20with%20subtle%20emerald%20accents%20representing%20continuous%20improvement%20PDCA%20cycles%2C%20precise%20geometric%20patterns%20forming%20circular%20quality%20management%20system%20architecture%2C%20sophisticated%20institutional%20aesthetic%20with%20luminous%20pathways%20connecting%20process%20nodes%2C%20abstract%20representation%20of%20ISO%209001%20certification%20as%20a%20radiant%20central%20core%20emitting%20structured%20light%20beams%20through%20a%20complex%20quality%20ecosystem%2C%20hyper%20realistic%208K%20render%20with%20dramatic%20volumetric%20lighting%20and%20deep%20atmospheric%20shadows%2C%20no%20text%20no%20human%20figures&width=1920&height=700&seq=kos-iso9001-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/30 border border-amber-500/40 backdrop-blur-sm mb-6">
                <i className="ri-award-line text-amber-400 text-sm" />
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">ISO 9001:2015 — MANAGEMENT DE LA QUALITÉ</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Qualité Organisationnelle. Excellence Systémique.
                <span className="block text-amber-400 mt-2">26/26 Clauses. 100% Conformité. Zéro Défaut.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                Système de Management de la Qualité certifiable.
                <strong className="text-white"> 8 processus</strong> documentés et optimisés.
                <strong className="text-white"> 8 KPIs</strong> en temps réel.
                <strong className="text-white"> NPS 82</strong>.
                Triple certification ISO <strong className="text-amber-400">27001 + 42001 + 9001</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                {['26 Clauses Conformes', '8 Processus Optimisés', 'NPS 82', '0 Non-Conformité', 'PDCA Actif', 'Amélioration Continue'].map(badge => (
                  <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs text-amber-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Score ISO 9001</span>
              <div className="text-5xl font-bold text-amber-400 font-heading mt-3 mb-2">100</div>
              <span className="text-sm text-gray-400">/100</span>
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs text-amber-300 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                CERTIFIABLE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <section className="py-10 sm:py-14 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {[
                { label: 'Score ISO 9001', value: '100/100', color: '#86BC25' },
                { label: 'Clauses conformes', value: '26/26', color: '#059669' },
                { label: 'Processus documentés', value: '8', color: '#EA580C' },
                { label: 'NPS Client', value: '82/100', color: '#8B5CF6' },
                { label: 'Maturité moyenne', value: '4.8/5', color: '#0EA5E9' },
                { label: 'Taux de défauts', value: '0.4%', color: '#86BC25' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <span className="block text-xl font-bold font-heading" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="text-[10px] text-foreground-500">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white border border-background-200 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-bar-chart-line text-amber-600" />
                  Distribution par Domaine
                </h3>
                <div className="space-y-3">
                  {[
                    { domain: 'Contexte (4.x)', clauses: 4, maturity: 5.0 },
                    { domain: 'Leadership (5.x)', clauses: 3, maturity: 5.0 },
                    { domain: 'Planification (6.x)', clauses: 3, maturity: 4.3 },
                    { domain: 'Support (7.x)', clauses: 5, maturity: 5.0 },
                    { domain: 'Opérations (8.x)', clauses: 6, maturity: 4.7 },
                    { domain: 'Évaluation (9.x)', clauses: 3, maturity: 4.7 },
                    { domain: 'Amélioration (10.x)', clauses: 2, maturity: 5.0 },
                  ].map(d => (
                    <div key={d.domain} className="flex items-center gap-3">
                      <span className="w-36 text-xs font-medium text-foreground-700 whitespace-nowrap">{d.domain}</span>
                      <div className="flex-1 h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-500" style={{ width: `${d.maturity * 20}%` }} />
                      </div>
                      <span className="w-16 text-xs font-bold text-amber-600 text-right">{d.maturity}/5</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-background-200 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-shield-check-line text-amber-600" />
                  Statut de Certification
                </h3>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                  <p className="text-sm text-amber-800 font-medium flex items-center gap-2">
                    <i className="ri-check-double-line" />
                    <strong>Conclusion :</strong> Le SMQ de KHEPRA EXPERTS est 100% conforme aux exigences ISO 9001:2015.
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    "Politique qualité définie et communiquée à 100% de l'équipe",
                    '8 processus documentés avec SLA et KPIs',
                    'Revue de direction Q1+Q2 2026 réalisées',
                    'Cycle PDCA opérationnel avec amélioration continue mesurée',
                    'NPS 82 — satisfaction client documentée',
                    '0 non-conformité — APTE CERTIFICATION IMMÉDIATE',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CLAUSES */}
      {activeTab === 'clauses' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                26 Clauses ISO 9001:2015 — 100% Conformes
              </h2>
              <p className="text-foreground-600">Maturité moyenne 4.8/5 · Zéro non-conformité · Audit clôturé le 05 Juillet 2026</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ISO9001_CLAUSES.map(c => (
                <div key={c.clause} className="rounded-xl bg-white border border-amber-200 p-4 hover:border-amber-400 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{c.clause}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${maturityColor(c.maturity)}`}>
                      M{c.maturity}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-900 mb-1 leading-tight">{c.title}</h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-background-100">
                    <span className="text-[10px] text-foreground-500">{c.domain}</span>
                    <span className="text-xs font-bold text-amber-600">{c.score}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KPIs */}
      {activeTab === 'kpis' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                KPIs Qualité — Tableau de Bord Temps Réel
              </h2>
              <p className="text-foreground-600">8 indicateurs clés · Cibles ISO 9001 · Suivi continu</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUALITY_KPIS.map(kpi => (
                <div key={kpi.kpi} className="rounded-xl bg-white border border-background-200 p-5">
                  <div className="text-xs text-foreground-500 mb-2">{kpi.kpi}</div>
                  <div className="flex items-end justify-between mb-3">
                    <span className="text-2xl font-bold font-heading" style={{ color: kpi.color }}>{kpi.current}</span>
                    <span className={`text-lg ${kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-red-500' : 'text-foreground-400'}`}>
                      <i className={kpi.icon} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-foreground-500">Cible: {kpi.target}</span>
                    <span className={`font-bold ${kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-600'}`}>
                      {kpi.trend === 'up' ? '▲ Dépasse' : kpi.trend === 'down' ? '▼ Attention' : '● Stable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESSES */}
      {activeTab === 'processes' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                8 Processus Documentés — Chaîne de Valeur Qualité
              </h2>
              <p className="text-foreground-600">Processus ISO 9001 · SLA · KPIs · Amélioration continue PDCA</p>
            </div>
            <div className="space-y-3">
              {QUALITY_PROCESSES.map((proc, i) => (
                <div key={proc.name} className="rounded-xl bg-white border border-background-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-bold text-foreground-900">{proc.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        proc.status === 'optimized' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {proc.status === 'optimized' ? 'Optimisé' : 'Géré'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[10px] text-foreground-500">
                      <span><i className="ri-user-line mr-1" />{proc.owner}</span>
                      <span><i className="ri-timer-line mr-1" />SLA: {proc.sla}</span>
                      <span className="font-bold text-emerald-600"><i className="ri-check-line mr-1" />KPI: {proc.kpi}</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-24 h-1.5 rounded-full bg-background-100 overflow-hidden flex-shrink-0">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: proc.kpi.replace('%', '') }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ACTIONS */}
      {activeTab === 'actions' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Actions d'Amélioration Continue
              </h2>
              <p className="text-foreground-600">Cycle PDCA · 0 actions critiques · 2 actions en cours</p>
            </div>
            <div className="space-y-4">
              {QUALITY_ACTIONS.map(action => {
                const priColor = action.priority === 'high' ? '#DC2626' : action.priority === 'medium' ? '#EA580C' : '#E8C547';
                return (
                  <div key={action.id} className="rounded-xl bg-white border border-background-200 p-5">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${priColor}15`, color: priColor, border: `1px solid ${priColor}40` }}>
                          {action.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-foreground-950 mb-1">{action.title}</h4>
                        <div className="flex flex-wrap gap-3 text-[10px] text-foreground-500">
                          <span><i className="ri-user-line mr-1" />{action.owner}</span>
                          <span><i className="ri-calendar-line mr-1" />{action.deadline}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap ${action.status === 'in_progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                        {action.status === 'in_progress' ? 'En Cours' : 'Planifié'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Ecosystem Links */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">Écosystème Triple Certification ISO</h2>
            <p className="text-foreground-600">Navigation rapide entre les 3 piliers de certification.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'ISO 9001 — Management Qualité', path: '/kos-iso-9001-quality-management', icon: 'ri-award-line', color: '#EA580C', current: true },
              { label: 'ISO 27001 — Sécurité Information', path: '/kos-iso-27001-audit-report', icon: 'ri-shield-check-line', color: '#6366F1', current: false },
              { label: 'ISO 42001 — Gouvernance IA', path: '/kos-iso-42001-ai-governance', icon: 'ri-robot-line', color: '#059669', current: false },
              { label: 'Total Compliance Control', path: '/kos-iso-bigfour-total-compliance-control', icon: 'ri-scales-3-line', color: '#86BC25', current: false },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                link.current ? 'border-amber-300 bg-amber-50/40 ring-2 ring-amber-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
              }`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-xs font-bold text-foreground-700 leading-tight">{link.label}</span>
                {link.current && <span className="block text-[9px] text-amber-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}






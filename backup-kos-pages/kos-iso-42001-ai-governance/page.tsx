import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';

type TabId = 'overview' | 'clauses' | 'digital-twin' | 'eu-ai-act' | 'ethics';

const ISO42001_CLAUSES = [
  { clause: '§4.1', title: 'Compréhension de l\'organisation et de son contexte', domain: 'CONTEXTE', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§4.2', title: 'Compréhension des besoins et attentes des parties intéressées', domain: 'CONTEXTE', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§4.3', title: 'Détermination du périmètre du SMIA', domain: 'CONTEXTE', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§4.4', title: 'Système de management de l\'IA', domain: 'CONTEXTE', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§5.1', title: 'Leadership et engagement', domain: 'LEADERSHIP', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§5.2', title: 'Politique IA', domain: 'LEADERSHIP', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§5.3', title: 'Rôles, responsabilités et autorités', domain: 'LEADERSHIP', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§6.1', title: 'Actions face aux risques et opportunités', domain: 'PLANIFICATION', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§6.2', title: 'Objectifs IA et planification', domain: 'PLANIFICATION', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§7.1', title: 'Ressources', domain: 'SUPPORT', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§7.2', title: 'Compétences', domain: 'SUPPORT', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§7.3', title: 'Sensibilisation', domain: 'SUPPORT', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§7.4', title: 'Communication', domain: 'SUPPORT', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§7.5', title: 'Informations documentées', domain: 'SUPPORT', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§8.1', title: 'Planification et maîtrise opérationnelles', domain: 'OPÉRATIONS', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§8.2', title: 'Évaluation de l\'impact sur l\'IA', domain: 'OPÉRATIONS', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§8.3', title: 'Conception et développement de l\'IA', domain: 'OPÉRATIONS', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§8.4', title: 'Maîtrise des processus externalisés', domain: 'OPÉRATIONS', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§9.1', title: 'Surveillance, mesure, analyse et évaluation', domain: 'ÉVALUATION', score: 100, maturity: 4, status: 'compliant' },
  { clause: '§9.2', title: 'Audit interne', domain: 'ÉVALUATION', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§9.3', title: 'Revue de direction', domain: 'ÉVALUATION', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§10.1', title: 'Amélioration continue', domain: 'AMÉLIORATION', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§10.2', title: 'Non-conformité et actions correctives', domain: 'AMÉLIORATION', score: 100, maturity: 5, status: 'compliant' },
  { clause: '§10.3', title: 'Amélioration continue du SMIA', domain: 'AMÉLIORATION', score: 100, maturity: 5, status: 'compliant' },
  { clause: 'A.10.1', title: 'Transparence et explicabilité', domain: 'ANNEXE A', score: 100, maturity: 5, status: 'compliant' },
  { clause: 'A.10.2', title: 'Contrôle humain', domain: 'ANNEXE A', score: 100, maturity: 5, status: 'compliant' },
  { clause: 'A.10.3', title: 'Exactitude, robustesse et cybersécurité', domain: 'ANNEXE A', score: 100, maturity: 5, status: 'compliant' },
  { clause: 'A.11.1', title: 'Équité et non-discrimination', domain: 'ANNEXE A', score: 100, maturity: 5, status: 'compliant' },
];

const EU_AI_ACT_CATEGORIES = [
  { category: 'Risque Inacceptable', systems: 'Aucun', classification: 'Interdit', status: 'N/A', color: '#DC2626' },
  { category: 'Haut Risque (Annexe III)', systems: 'Agents conformité réglementaire, Agents scoring risque', classification: 'Conformité stricte', status: '✅ 100%', color: '#EA580C' },
  { category: 'Risque Limité', systems: 'Agents RAG, Chatbots, Assistants', classification: 'Transparence obligatoire', status: '✅ 100%', color: '#E8C547' },
  { category: 'Risque Minimal', systems: 'Agents SEO, Médias, Analytics', classification: 'Code de conduite', status: '✅ 100%', color: '#86BC25' },
];

const DIGITAL_TWIN_COMPONENTS = [
  { name: 'API Gateway (NGINX)', status: 'healthy', uptime: '99.93%', latency: '89ms' },
  { name: 'n8n Orchestrator', status: 'healthy', uptime: '99.87%', latency: '210ms' },
  { name: 'Qdrant Vector DB', status: 'healthy', uptime: '99.95%', latency: '42ms' },
  { name: 'PostgreSQL Analytics', status: 'healthy', uptime: '99.91%', latency: '18ms' },
  { name: 'Redis Queue', status: 'healthy', uptime: '99.97%', latency: '5ms' },
  { name: 'MinIO Storage', status: 'healthy', uptime: '99.89%', latency: '95ms' },
  { name: 'Memory Engine', status: 'healthy', uptime: '99.85%', latency: '120ms' },
  { name: 'Governance Engine', status: 'healthy', uptime: '99.90%', latency: '88ms' },
  { name: '75 Agents IA', status: 'healthy', uptime: '99.82%', latency: '310ms' },
  { name: 'RAG Pipeline', status: 'healthy', uptime: '99.88%', latency: '155ms' },
];

const ETHICS_METRICS = [
  { label: 'Décisions IA avec audit trail', value: '100%', color: '#86BC25' },
  { label: 'Hallucinations détectées/mois', value: '23', color: '#EA580C' },
  { label: 'Taux de correction auto', value: '97.4%', color: '#059669' },
  { label: 'Biais détectés (revue trim.)', value: '0', color: '#86BC25' },
  { label: 'Validations humaines', value: '847', color: '#8B5CF6' },
  { label: 'Sessions comité éthique', value: '12', color: '#6366F1' },
];

export default function iSO42001AIGovernancePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Cockpit ISO 42001', icon: 'ri-robot-line' },
    { id: 'clauses', label: '28 Clauses', icon: 'ri-list-check-3' },
    { id: 'digital-twin', label: 'Digital Twin', icon: 'ri-cpu-line' },
    { id: 'eu-ai-act', label: 'EU AI Act', icon: 'ri-scales-3-line' },
    { id: 'ethics', label: 'Éthique & Gouvernance', icon: 'ri-heart-pulse-line' },
  ];

  const maturityColor = (level: number) => {
    if (level >= 5) return 'bg-emerald-500 text-white';
    if (level >= 4) return 'bg-emerald-100 text-emerald-700';
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <hubLayout hubId={420}>
      <SeoHead
        title="KOS ISO 42001:2023 AI Governance — 100% Conformité | KHEPRA EXPERTS"
        description="Dashboard ISO 42001:2023 — Gouvernance de l'Intelligence Artificielle. 28 clauses conformes. Digital Twin. EU AI Act Ready. Conseil d'éthique IA. Triple certification ISO 27001 + 42001 + 9001."
        keywords="ISO 42001, AI governance, EU AI Act, Digital Twin, intelligence artificielle, certification ISO, KHEPRA EXPERTS"
        canonicalPath="/kos-iso-42001-ai-governance"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Futuristic%20artificial%20intelligence%20governance%20command%20center%20with%20holographic%20neural%20network%20visualizations%20floating%20in%20dark%20space%2C%20crystalline%20geometric%20structures%20representing%20AI%20ethics%20framework%20interconnected%20by%20glowing%20golden%20threads%2C%20central%20digital%20twin%20representation%20of%20a%20complex%20system%20with%20real%20time%20data%20streams%2C%20emerald%20and%20warm%20amber%20color%20palette%2C%20sophisticated%20institutional%20aesthetic%20with%20precise%20geometric%20patterns%2C%20abstract%20visualization%20of%20ISO%2042001%20certification%20framework%20as%20luminous%20interconnected%20nodes%20forming%20a%20protective%20shield%20around%20AI%20systems%2C%20hyper%20realistic%208K%20render%20with%20dramatic%20volumetric%20lighting%20and%20deep%20atmospheric%20shadows%2C%20no%20text%20no%20human%20figures&width=1920&height=700&seq=kos-iso42001-hero-2026&orientation=landscape"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600/30 border border-emerald-500/40 backdrop-blur-sm mb-6">
                <i className="ri-robot-line text-emerald-400 text-sm" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">ISO/IEC 42001:2023 — GOUVERNANCE DE L'IA</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Intelligence Artificielle Gouvernée.
                <span className="block text-emerald-400 mt-2">28/28 Clauses. 100% Conformité. EU AI Act Ready.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                Système de Management de l'IA certifiable. <strong className="text-white">75 agents</strong> supervisés.
                <strong className="text-white"> Digital Twin</strong> opérationnel.
                <strong className="text-white"> EU AI Act</strong> — classification complète.
                Triple certification ISO <strong className="text-emerald-400">27001 + 42001 + 9001</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                {['28 Clauses Conformes', 'Digital Twin Live', 'EU AI Act Ready', '75 Agents Supervisés', '0 Non-Conformité'].map(badge => (
                  <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Score ISO 42001</span>
              <div className="text-5xl font-bold text-emerald-400 font-heading mt-3 mb-2">100</div>
              <span className="text-sm text-gray-400">/100</span>
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-300 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                { label: 'Score ISO 42001', value: '100/100', color: '#86BC25' },
                { label: 'Clauses conformes', value: '28/28', color: '#059669' },
                { label: 'Agents IA supervisés', value: '75', color: '#8B5CF6' },
                { label: 'Digital Twin', value: 'LIVE', color: '#6366F1' },
                { label: 'Maturité moyenne', value: '5.0/5', color: '#0EA5E9' },
                { label: 'Non-conformités', value: '0', color: '#86BC25' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <span className="block text-xl font-bold font-heading" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="text-[10px] text-foreground-500">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Maturity Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white border border-background-200 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-bar-chart-line text-emerald-600" />
                  Distribution par Domaine
                </h3>
                <div className="space-y-3">
                  {[
                    { domain: 'Contexte (4.x)', clauses: 4, maturity: 5.0 },
                    { domain: 'Leadership (5.x)', clauses: 3, maturity: 5.0 },
                    { domain: 'Planification (6.x)', clauses: 3, maturity: 5.0 },
                    { domain: 'Support (7.x)', clauses: 4, maturity: 5.0 },
                    { domain: 'Opérations (8.x)', clauses: 4, maturity: 5.0 },
                    { domain: 'Évaluation (9.x)', clauses: 3, maturity: 4.7 },
                    { domain: 'Amélioration (10.x)', clauses: 3, maturity: 5.0 },
                    { domain: 'Annexe A', clauses: 4, maturity: 5.0 },
                  ].map(d => (
                    <div key={d.domain} className="flex items-center gap-3">
                      <span className="w-32 text-xs font-medium text-foreground-700 whitespace-nowrap">{d.domain}</span>
                      <div className="flex-1 h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${d.maturity * 20}%` }} />
                      </div>
                      <span className="w-16 text-xs font-bold text-emerald-600 text-right">{d.maturity}/5</span>
                      <span className="w-8 text-[10px] text-foreground-400 text-right">{d.clauses}c</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-background-200 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-shield-check-line text-emerald-600" />
                  Statut de Certification
                </h3>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
                  <p className="text-sm text-emerald-800 font-medium flex items-center gap-2">
                    <i className="ri-check-double-line" />
                    <strong>Conclusion :</strong> Le SMIA de KHEPRA EXPERTS est 100% conforme aux exigences ISO/IEC 42001:2023.
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    'Périmètre SMIA documenté et approuvé (75 agents, RAG, Digital Twin)',
                    'Classification EU AI Act complétée pour tous les systèmes IA',
                    'Conseil de gouvernance IA + Comité d\'éthique opérationnels',
                    'Modèle d\'évaluation avec détection de drift automatisée',
                    'Traçabilité complète des décisions IA (audit trail)',
                    '0 non-conformité — APTE CERTIFICATION IMMÉDIATE',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0" />
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
                28 Clauses ISO 42001:2023 — 100% Conformes
              </h2>
              <p className="text-foreground-600">Maturité moyenne 5.0/5 · Zéro non-conformité · Audit clôturé le 05 Juillet 2026</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ISO42001_CLAUSES.map(c => (
                <div key={c.clause} className="rounded-xl bg-white border border-emerald-200 p-4 hover:border-emerald-400 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{c.clause}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${maturityColor(c.maturity)}`}>
                      M{c.maturity}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-900 mb-1 leading-tight">{c.title}</h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-background-100">
                    <span className="text-[10px] text-foreground-500">{c.domain}</span>
                    <span className="text-xs font-bold text-emerald-600">{c.score}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DIGITAL TWIN */}
      {activeTab === 'digital-twin' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Digital Twin — Jumeau Numérique KOS
              </h2>
              <p className="text-foreground-600">10 composants modélisés · Simulation d'impact · Auto-correction prédictive</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {DIGITAL_TWIN_COMPONENTS.map(comp => (
                <div key={comp.name} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${comp.status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <h4 className="text-xs font-bold text-foreground-800 mb-1">{comp.name}</h4>
                  <div className="text-[10px] text-foreground-500 space-y-0.5">
                    <div>Uptime: <span className="font-medium text-emerald-600">{comp.uptime}</span></div>
                    <div>Latence: <span className="font-medium text-foreground-700">{comp.latency}</span></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-cpu-line text-indigo-600" />
                Capacités du Digital Twin
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Modélisation Temps Réel', desc: '14 conteneurs Docker modélisés avec métriques live (CPU, RAM, disque, réseau)', icon: 'ri-dashboard-3-line' },
                  { title: 'Simulation d\'Impact', desc: 'Scénarios what-if avant déploiement — prédiction de charge et goulots d\'étranglement', icon: 'ri-flask-line' },
                  { title: 'Auto-Correction Prédictive', desc: 'Détection d\'anomalies avant incident — rollback automatique si seuil critique', icon: 'ri-magic-line' },
                  { title: 'Dashboard Unifié', desc: 'Grafana 14 panels + Prometheus 10 cibles — visibilité totale en temps réel', icon: 'ri-line-chart-line' },
                ].map(cap => (
                  <div key={cap.title} className="rounded-xl bg-background-50 border border-background-100 p-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
                      <i className={`${cap.icon} text-lg text-indigo-600`} />
                    </div>
                    <h4 className="text-sm font-bold text-foreground-900 mb-1">{cap.title}</h4>
                    <p className="text-xs text-foreground-600 leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EU AI ACT */}
      {activeTab === 'eu-ai-act' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                EU AI Act — Classification Complète
              </h2>
              <p className="text-foreground-600">75 systèmes IA classifiés · 4 catégories de risque · 100% conformité</p>
            </div>

            <div className="space-y-4 mb-8">
              {EU_AI_ACT_CATEGORIES.map(cat => (
                <div key={cat.category} className="rounded-2xl bg-white border border-background-200 p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cat.color}15` }}>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-bold text-foreground-950">{cat.category}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}40` }}>
                          {cat.classification}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-600">Systèmes : {cat.systems}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 whitespace-nowrap">{cat.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Exigences EU AI Act — État des Lieux</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Registre des systèmes IA', status: '✅ Complet', detail: '75 systèmes documentés' },
                  { label: 'Documentation technique', status: '✅ Complète', detail: 'Architecture, données, modèles' },
                  { label: 'Transparence utilisateur', status: '✅ Active', detail: 'Badge IA sur toutes les interactions' },
                  { label: 'Supervision humaine', status: '✅ Active', detail: 'Circuit validation 4 yeux' },
                  { label: 'Gestion des risques IA', status: '✅ Active', detail: 'ai_risk_office + risk matrices' },
                  { label: 'Traçabilité décisions', status: '✅ Active', detail: 'ai_audit_trail + 847 validations' },
                  { label: 'Évaluation conformité', status: '✅ Complète', detail: 'model_evaluation_engine' },
                  { label: 'Notification incidents', status: '✅ Active', detail: 'Edge Function alerting' },
                ].map(req => (
                  <div key={req.label} className="rounded-xl bg-background-50 border border-background-100 p-4">
                    <div className="text-xs font-bold text-foreground-800 mb-1">{req.label}</div>
                    <div className="text-sm font-bold text-emerald-600 mb-0.5">{req.status}</div>
                    <div className="text-[10px] text-foreground-500">{req.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ETHICS */}
      {activeTab === 'ethics' && (
        <section className="py-8 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {ETHICS_METRICS.map(m => (
                <div key={m.label} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <span className="block text-xl font-bold font-heading" style={{ color: m.color }}>{m.value}</span>
                  <span className="text-[10px] text-foreground-500">{m.label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white border border-indigo-200 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-government-line text-indigo-600" />
                  Conseil de Gouvernance IA
                </h3>
                <div className="space-y-3">
                  {[
                    'Président : Managing Partner KHEPRA',
                    'Membres : RSSI, DSI, Lead AI, DPO',
                    'Réunions : Mensuelles (12 sessions)',
                    'Missions : Stratégie IA, risques, conformité',
                    'Décisions : 47 résolutions adoptées',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <i className="ri-check-line text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-amber-200 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-heart-pulse-line text-amber-600" />
                  Comité d'Éthique IA
                </h3>
                <div className="space-y-3">
                  {[
                    'Président : Éthicien indépendant',
                    'Membres : 5 experts (droit, philo, tech)',
                    'Réunions : Trimestrielles (4 sessions)',
                    'Missions : Revue éthique, biais, équité',
                    'Avis rendus : 12 (tous suivis)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <i className="ri-check-line text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-emerald-200 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-shield-star-line text-emerald-600" />
                  Audit Trail & Transparence
                </h3>
                <div className="space-y-3">
                  {[
                    'Traçabilité totale : 100% décisions IA',
                    'Registre immuable : blockchain interne',
                    'Validation humaine : circuit 4 yeux',
                    'Explicabilité : rapports auto-générés',
                    'Conformité : ISO 42001 + EU AI Act',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <i className="ri-check-line text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
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
              { label: 'ISO 42001 — Gouvernance IA', path: '/kos-iso-42001-ai-governance', icon: 'ri-robot-line', color: '#059669', current: true },
              { label: 'ISO 27001 — Sécurité Information', path: '/kos-iso-27001-audit-report', icon: 'ri-shield-check-line', color: '#6366F1', current: false },
              { label: 'ISO 9001 — Management Qualité', path: '/kos-iso-9001-quality-management', icon: 'ri-award-line', color: '#EA580C', current: false },
              { label: 'Total Compliance Control', path: '/kos-iso-bigfour-total-compliance-control', icon: 'ri-scales-3-line', color: '#86BC25', current: false },
            ].map(link => (
              <a key={link.path} href={link.path} className={`rounded-xl border p-4 text-center hover:shadow-md transition-all cursor-pointer block ${
                link.current ? 'border-emerald-300 bg-emerald-50/40 ring-2 ring-emerald-400' : 'border-background-200 bg-background-50 hover:border-foreground-200'
              }`}>
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-xs font-bold text-foreground-700 leading-tight">{link.label}</span>
                {link.current && <span className="block text-[9px] text-emerald-700 font-bold mt-1">Vous êtes ici</span>}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}






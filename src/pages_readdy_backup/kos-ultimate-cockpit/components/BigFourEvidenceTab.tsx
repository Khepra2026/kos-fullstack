import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';

const DOMAIN_LABELS: Record<string, string> = {
  QUAL: 'Qualité', GOUV: 'Gouvernance', CONF: 'Conformité', IA: 'Intelligence Artificielle',
  RISK: 'Gestion des Risques', CYBER: 'Cybersécurité', SEO: 'Visibilité Organique',
  GEO: 'Generative Engine', DEV: 'Développement Commercial', RECH: 'Recherche',
};

const DOMAIN_ICONS: Record<string, string> = {
  QUAL: 'ri-shield-check-line', GOUV: 'ri-government-line', CONF: 'ri-scales-3-line',
  IA: 'ri-brain-line', RISK: 'ri-alert-line', CYBER: 'ri-lock-line',
  SEO: 'ri-search-eye-line', GEO: 'ri-global-line', DEV: 'ri-line-chart-line', RECH: 'ri-microscope-line',
};

const DOMAIN_SCORES = [
  { key: 'QUAL', score: 98, target: 99 },
  { key: 'GOUV', score: 96, target: 98 },
  { key: 'CONF', score: 95, target: 98 },
  { key: 'IA', score: 92, target: 97 },
  { key: 'RISK', score: 94, target: 95 },
  { key: 'CYBER', score: 93, target: 97 },
  { key: 'SEO', score: 95, target: 97 },
  { key: 'GEO', score: 91, target: 96 },
  { key: 'DEV', score: 90, target: 95 },
  { key: 'RECH', score: 93, target: 97 },
];

const EVIDENCE_ITEMS = [
  { title: 'Rapport audit ISO 27001 — Contrôle A.12.7', type: 'Audit', domain: 'CYBER', status: 'validated', confidence: 98 },
  { title: 'Registre décisions IA — Validation humaine Q2 2026', type: 'Journal', domain: 'IA', status: 'validated', confidence: 95 },
  { title: 'Matrice risques Big Four v2 — Revue trimestrielle', type: 'Matrice', domain: 'RISK', status: 'validated', confidence: 97 },
  { title: 'Certification Core Web Vitals — Desktop 98/100', type: 'Certification', domain: 'SEO', status: 'validated', confidence: 96 },
  { title: 'Piste d\'audit universelle — 12 847 événements', type: 'Journal', domain: 'GOUV', status: 'validated', confidence: 99 },
  { title: 'Analyse gap conformité BCEAO — Circulaire 03-2024', type: 'Analyse', domain: 'CONF', status: 'pending', confidence: 88 },
];

const RISK_MATRIX = [
  { risque: 'Dette technique critique — Hooks mock-only non migrés', domaine: 'DEV', statut: 'actif', probabilite: 75, impact: 85, mitigation: 'Migration progressive avec feature flags, cible J+60' },
  { risque: 'Hallucination IA — Agents sans validation humaine', domaine: 'IA', statut: 'actif', probabilite: 60, impact: 90, mitigation: 'Hallucination Detection Engine v2 déployé, seuil 95%' },
  { risque: 'Non-conformité BCEAO — Échéance Q3 2026', domaine: 'CONF', statut: 'actif', probabilite: 45, impact: 80, mitigation: 'Regulatory Scout actif, alertes automatiques' },
  { risque: 'Fuite de données — API keys non sécurisées', domaine: 'CYBER', statut: 'mitigé', probabilite: 20, impact: 95, mitigation: 'Supabase Secrets + Edge Functions, audit trimestriel' },
  { risque: 'Obsolescence technologique — Dépendances legacy', domaine: 'DEV', statut: 'mitigé', probabilite: 30, impact: 60, mitigation: 'Veille technologique automatisée, plan migration Q4' },
];

const AI_AGENTS = [
  { name: 'Regulatory Scout v3', model: 'Claude 3.5 Sonnet', decisions: 1247, validated: 1198, hallucinations: 49, risk: 'Faible' },
  { name: 'Quality Review Engine', model: 'GPT-4o', decisions: 892, validated: 856, hallucinations: 36, risk: 'Faible' },
  { name: 'SEO Autopilot', model: 'Claude 3.5 Sonnet', decisions: 2105, validated: 2010, hallucinations: 95, risk: 'Moyen' },
  { name: 'Tender Intelligence', model: 'GPT-4o', decisions: 456, validated: 432, hallucinations: 24, risk: 'Faible' },
  { name: 'Content Factory', model: 'Claude 3 Opus', decisions: 3890, validated: 3650, hallucinations: 240, risk: 'Élevé' },
];

function ScoreBar({ value, target }: { value: number; target: number }) {
  const pct = Math.min((value / target) * 100, 100);
  const color = pct >= 95 ? 'bg-emerald-500' : pct >= 85 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-foreground-950 w-14 text-right">{value}/{target}</span>
    </div>
  );
}

export default function BigFourEvidenceTab() {
  return (
    <div className="space-y-6">
      {/* Domain Scores */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
              <i className="ri-pie-chart-line text-primary-500"></i>
              Scores Big Four par Domaine
            </h2>
            <Link to="/kos-bloc-total-compliance" className="text-xs text-primary-600 hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap">
              <i className="ri-radar-line"></i>Scan Bloc Total
            </Link>
          </div>
          <div className="space-y-2">
            {DOMAIN_SCORES.map(d => (
              <div key={d.key} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-background-100 flex items-center justify-center flex-shrink-0">
                  <i className={`${DOMAIN_ICONS[d.key] || 'ri-folder-line'} text-xs text-foreground-600`}></i>
                </div>
                <span className="text-xs text-foreground-600 w-28 flex-shrink-0">{DOMAIN_LABELS[d.key] || d.key}</span>
                <div className="flex-1">
                  <ScoreBar value={d.score} target={d.target} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Evidence Registry + Risk Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-file-search-line text-accent-500"></i>
              Registre des Preuves
            </h2>
            <div className="space-y-2">
              {EVIDENCE_ITEMS.map((item, i) => {
                const statusColor = item.status === 'validated' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700';
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-100 text-xs">
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${statusColor}`}>
                      {item.status === 'validated' ? '✓' : '⏳'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground-950 font-medium truncate">{item.title}</p>
                      <p className="text-foreground-400">{item.type} · {item.domain} · {item.confidence}% confiance</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-alert-line text-red-500"></i>
              Matrice de Risques Big Four
            </h2>
            <div className="space-y-2">
              {RISK_MATRIX.map((r, i) => (
                <div key={i} className={`p-3 rounded-lg border text-xs ${r.statut === 'actif' ? 'border-red-200 bg-red-50/40' : 'border-emerald-200 bg-emerald-50/40'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground-950">{r.risque}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${r.statut === 'actif' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {r.statut}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground-500 mb-1">
                    <span>Prob: {r.probabilite}%</span>
                    <span>Impact: {r.impact}%</span>
                    <span>Score: {Math.round(r.probabilite * r.impact / 100)}</span>
                  </div>
                  <p className="text-foreground-600 text-[11px]">{r.mitigation}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* AI Governance */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <h2 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-brain-line text-primary-500"></i>
            Gouvernance IA — Top Agents
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-background-200/70">
                  <th className="text-left py-2 px-3 text-foreground-500 font-medium">Agent</th>
                  <th className="text-left py-2 px-3 text-foreground-500 font-medium">Modèle</th>
                  <th className="text-right py-2 px-3 text-foreground-500 font-medium">Décisions</th>
                  <th className="text-right py-2 px-3 text-foreground-500 font-medium">Validées</th>
                  <th className="text-right py-2 px-3 text-foreground-500 font-medium">Hallucinations</th>
                  <th className="text-center py-2 px-3 text-foreground-500 font-medium">Risque</th>
                </tr>
              </thead>
              <tbody>
                {AI_AGENTS.map((a, i) => (
                  <tr key={i} className="border-b border-background-100 hover:bg-background-100/50">
                    <td className="py-2.5 px-3 font-semibold text-foreground-950">{a.name}</td>
                    <td className="py-2.5 px-3 text-foreground-500">{a.model}</td>
                    <td className="py-2.5 px-3 text-right text-foreground-700">{a.decisions.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-600 font-medium">{a.validated.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-red-600 font-medium">{a.hallucinations.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        a.risk === 'Faible' ? 'bg-emerald-100 text-emerald-700' : a.risk === 'Moyen' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>{a.risk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Cross-links */}
      <div className="flex flex-wrap gap-2 justify-center pt-2">
        <Link to="/kos-bloc-total-compliance" className="px-4 py-2 rounded-full bg-primary-500 text-background-50 dark:text-foreground-950 text-xs font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-radar-line mr-1.5"></i>Bloc Total Compliance
        </Link>
        <Link to="/kos-bigfour-quality-governance" className="px-4 py-2 rounded-full bg-accent-500 text-white text-xs font-bold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-shield-check-line mr-1.5"></i>Qualité & Gouvernance
        </Link>
        <Link to="/kos-full-system-security-scan" className="px-4 py-2 rounded-full bg-secondary-500 text-white text-xs font-bold hover:bg-secondary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-lock-line mr-1.5"></i>Security Scan
        </Link>
        <Link to="/kos-full-seed-cockpit" className="px-4 py-2 rounded-full bg-primary-500 text-background-50 dark:text-foreground-950 text-xs font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-database-2-line mr-1.5"></i>Full Seed Cockpit
        </Link>
      </div>
    </div>
  );
}




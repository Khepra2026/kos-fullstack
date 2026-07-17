import { useState } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';

const DOMAINS = [
  { name: 'Qualité & Excellence', icon: 'ri-shield-check-line', score: 98, target: 100, color: 'accent', kpis: 22, agent: 'Quality Review Engine' },
  { name: 'Gouvernance', icon: 'ri-government-line', score: 96, target: 100, color: 'primary', kpis: 18, agent: 'Governance Automaton' },
  { name: 'Conformité Réglementaire', icon: 'ri-scales-3-line', score: 95, target: 100, color: 'accent', kpis: 24, agent: 'Regulatory Scout v3' },
  { name: 'IA & Automatisation', icon: 'ri-brain-line', score: 92, target: 100, color: 'primary', kpis: 20, agent: 'AI Governance Council' },
  { name: 'Gestion des Risques', icon: 'ri-alert-line', score: 94, target: 100, color: 'accent', kpis: 16, agent: 'Risk Matrix Engine' },
  { name: 'Cybersécurité', icon: 'ri-lock-line', score: 93, target: 100, color: 'secondary', kpis: 18, agent: 'Security Scan v2' },
  { name: 'SEO & Visibilité', icon: 'ri-search-eye-line', score: 95, target: 100, color: 'primary', kpis: 20, agent: 'SEO Autopilot' },
  { name: 'GEO & IA Générative', icon: 'ri-global-line', score: 91, target: 100, color: 'accent', kpis: 14, agent: 'GEO Authority Engine' },
  { name: 'Développement Commercial', icon: 'ri-line-chart-line', score: 90, target: 100, color: 'primary', kpis: 22, agent: 'Growth Orchestrator' },
  { name: 'Recherche & Innovation', icon: 'ri-microscope-line', score: 93, target: 100, color: 'secondary', kpis: 12, agent: 'Think Tank Automaton' },
  { name: 'Performance Système', icon: 'ri-speed-up-line', score: 97, target: 100, color: 'accent', kpis: 16, agent: 'Performance Monitor' },
  { name: 'Production Médias', icon: 'ri-film-line', score: 94, target: 100, color: 'primary', kpis: 18, agent: 'Media Command Center' },
  { name: 'Infrastructure', icon: 'ri-server-line', score: 98, target: 100, color: 'secondary', kpis: 14, agent: 'SysOps Health Engine' },
  { name: 'Knowledge Management', icon: 'ri-book-open-line', score: 92, target: 100, color: 'accent', kpis: 16, agent: 'Knowledge Center' },
  { name: 'Expérience Client', icon: 'ri-user-heart-line', score: 91, target: 100, color: 'primary', kpis: 14, agent: 'Client Success AI' },
];

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'];

function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return (
    <div className="flex items-end gap-px h-6">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t-sm bg-accent-500/60" style={{ height: `${((v - min) / range) * 100}%` }}></div>
      ))}
    </div>
  );
}

export default function KPITowerTab() {
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);
  const overallScore = Math.round(DOMAINS.reduce((s, d) => s + d.score, 0) / DOMAINS.length);
  const totalKPIs = DOMAINS.reduce((s, d) => s + d.kpis, 0);

  const colorClasses: Record<string, { bar: string; light: string; text: string; border: string }> = {
    accent: { bar: 'bg-accent-500', light: 'bg-accent-100', text: 'text-accent-700', border: 'border-accent-300' },
    primary: { bar: 'bg-primary-500', light: 'bg-primary-100', text: 'text-primary-700', border: 'border-primary-300' },
    secondary: { bar: 'bg-secondary-500', light: 'bg-secondary-100', text: 'text-secondary-700', border: 'border-secondary-300' },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-foreground-950">{overallScore}%</div>
            <div className="text-xs text-foreground-500">Score Global</div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-foreground-950">{DOMAINS.length}</div>
            <div className="text-xs text-foreground-500">Domaines</div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-foreground-950">{totalKPIs}</div>
            <div className="text-xs text-foreground-500">KPIs Suivis</div>
          </div>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{DOMAINS.filter(d => d.score >= 95).length}/{DOMAINS.length}</div>
            <div className="text-xs text-foreground-500">Domaines ≥ 95%</div>
          </div>
        </div>
      </ScrollReveal>

      {/* Domain Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {DOMAINS.map((domain) => {
          const cls = colorClasses[domain.color] || colorClasses.accent;
          const isSelected = selectedDomain.name === domain.name;
          return (
            <button
              key={domain.name}
              onClick={() => setSelectedDomain(domain)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected ? `${cls.border} bg-background-50 shadow-sm` : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-md ${cls.light} ${cls.text} flex items-center justify-center`}>
                  <i className={`${domain.icon} text-sm`}></i>
                </div>
                <span className="text-xs text-foreground-500 truncate">{domain.agent}</span>
              </div>
              <p className="text-xs font-semibold text-foreground-950 mb-2 line-clamp-1">{domain.name}</p>
              <div className="flex items-end justify-between">
                <span className="text-lg font-bold text-foreground-950">{domain.score}<span className="text-sm text-foreground-500">%</span></span>
                <span className="text-[10px] text-foreground-400">{domain.kpis} KPIs</span>
              </div>
              <div className="h-1.5 bg-background-200 rounded-full overflow-hidden mt-2">
                <div className={`h-full ${cls.bar} rounded-full`} style={{ width: `${domain.score}%` }}></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Detail */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg ${colorClasses[selectedDomain.color]?.light || 'bg-accent-100'} ${colorClasses[selectedDomain.color]?.text || 'text-accent-700'} flex items-center justify-center`}>
              <i className={`${selectedDomain.icon} text-lg`}></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground-950">{selectedDomain.name}</h3>
              <p className="text-xs text-foreground-500">{selectedDomain.kpis} KPIs · Agent: {selectedDomain.agent}</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-2xl font-bold text-foreground-950">{selectedDomain.score}<span className="text-base text-foreground-500">%</span></span>
              <p className="text-xs text-foreground-400">sur {selectedDomain.target}% cible</p>
            </div>
          </div>

          {/* Progression mini */}
          <div className="flex items-end gap-1 h-16 mt-4 mb-2">
            {[88, 90, 91, 93, 94, selectedDomain.score].map((v, i) => {
              const cls = colorClasses[selectedDomain.color] || colorClasses.accent;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-foreground-500">{v}%</span>
                  <div className={`w-full rounded-t-sm ${cls.bar}`} style={{ height: `${(v / 100) * 48}px`, opacity: 0.5 + i * 0.1 }}></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between">
            {MONTHS.map(m => <span key={m} className="text-[10px] text-foreground-400">{m}</span>)}
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2 justify-center pt-2">
        <Link to="/kos-bloc-total-compliance" className="px-4 py-2 rounded-full bg-primary-500 text-background-50 dark:text-foreground-950 text-xs font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-radar-line mr-1.5"></i>Scan Complet
        </Link>
        <Link to="/kos-performance-seo-command" className="px-4 py-2 rounded-full bg-accent-500 text-white text-xs font-bold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-rocket-2-line mr-1.5"></i>Performance SEO
        </Link>
        <Link to="/kos-correction-engine" className="px-4 py-2 rounded-full bg-secondary-500 text-white text-xs font-bold hover:bg-secondary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-tools-line mr-1.5"></i>Correction Engine
        </Link>
      </div>
    </div>
  );
}
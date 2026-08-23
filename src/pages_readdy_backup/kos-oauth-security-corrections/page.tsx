import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import { oauthCorrectionsData } from '@/mocks/oAuthSecurityCorrections';

const severityBadge = (status: string) => {
  if (status === 'non corrigé') return 'bg-red-100 text-red-800 border border-red-300';
  if (status === 'bloquant') return 'bg-red-100 text-red-800 border border-red-300';
  if (status === 'critique') return 'bg-amber-100 text-amber-800 border border-amber-300';
  return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
};

const dayStatusColor = (status: string) => {
  if (status === 'bloquant') return 'border-red-300 bg-red-50';
  if (status === 'critique') return 'border-amber-300 bg-amber-50';
  return 'border-background-200 bg-white';
};

const dayNumberBg = (status: string) => {
  if (status === 'bloquant') return 'bg-red-500 text-white';
  if (status === 'critique') return 'bg-amber-500 text-white';
  return 'bg-foreground-700 text-white';
};

function CodeBlock({ filename, code }: { filename: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="rounded-xl border border-foreground-700 bg-foreground-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-foreground-700 bg-foreground-900">
        <span className="text-[11px] font-mono text-foreground-300">{filename}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[11px] font-bold cursor-pointer px-3 py-1 rounded-lg transition-all whitespace-nowrap bg-foreground-700 text-foreground-200 hover:bg-foreground-600"
        >
          {copied ? '✓ Copié' : 'Copier'}
        </button>
      </div>
      <pre className="p-4 text-xs text-foreground-200 overflow-x-auto leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function oAuthSecurityCorrectionsPage() {
  const [openDay, setOpenDay] = useState<string | null>('J1');
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());
  const [copiedCmd, setCopiedCmd] = useState<number | null>(null);

  const toggleDay = (day: string) => {
    setOpenDay(openDay === day ? null : day);
  };

  const toggleCompleted = (day: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedDays(prev => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const progressionPct = Math.round((completedDays.size / 7) * 100);

  const handleCopyCmd = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopiedCmd(idx);
      setTimeout(() => setCopiedCmd(null), 1800);
    });
  };

  return (
    <div className="min-h-screen bg-background-50">
      <ScrollToTop />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-red-500/10 border border-red-500/20">
            <i className="ri-lock-password-line text-red-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">OAuth Security Corrections — Vite + React</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Corrections OAuth
          </h1>
          <p className="text-base text-foreground-400 max-w-2xl mx-auto">
            Plan d&apos;action 7 jours — Exécution immédiate — 3 failles P0 à corriger en 48h
          </p>
        </div>
      </section>

      {/* Alert P0 */}
      <section className="relative z-10 -mt-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 border-red-400 bg-red-50 p-5 flex items-start gap-4">
          <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-red-500 text-white">
            <i className="ri-alarm-warning-fill text-lg" />
          </span>
          <div>
            <h2 className="text-sm font-black text-red-900 mb-1">{oauthCorrectionsData.alert_p0.title}</h2>
            <p className="text-xs text-red-800">{oauthCorrectionsData.alert_p0.message}</p>
          </div>
        </div>
      </section>

      {/* Vue d'ensemble */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h2 className="text-sm font-bold text-foreground-600 mb-4 uppercase tracking-wider">
          Vue d&apos;ensemble des failles critiques
        </h2>
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Failles P0 */}
          <div className="rounded-2xl border border-background-200 bg-white p-5">
            <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center rounded bg-red-500 text-white text-[10px]">!</span>
              Failles P0 identifiées
            </h3>
            <div className="space-y-3">
              {oauthCorrectionsData.failles_p0.map((f) => (
                <div key={f.id} className="flex items-start gap-3">
                  <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-black bg-red-500 text-white mt-0.5">P0</span>
                  <div>
                    <p className="text-xs font-bold text-foreground-900">{f.title}</p>
                    <p className="text-[11px] text-foreground-500 mt-0.5">Jour {f.day} — Effort : {f.effort}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard OAuth */}
          <div className="rounded-2xl border border-background-200 bg-white p-5">
            <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-bar-chart-2-line text-foreground-600" /> Dashboard OAuth — État actuel vs Cible J7
            </h3>
            <div className="space-y-0">
              <div className="grid grid-cols-3 text-[11px] font-bold text-foreground-500 uppercase tracking-wider pb-2 border-b border-background-200 mb-2">
                <span>Métrique</span><span className="text-center">Actuel</span><span className="text-center">Cible J7</span>
              </div>
              {Object.entries(oauthCorrectionsData.dashboard_metrics).map(([key, val]) => {
                const labels: Record<string, string> = {
                  traffic_per_day: 'Trafic OAuth / jour',
                  error_rate: "Taux d'erreur",
                  active_users: 'Utilisateurs actifs',
                  consent_grant_rate: 'Taux octroi consentement'
                };
                return (
                  <div key={key} className="grid grid-cols-3 items-center py-2.5 border-b border-background-100 last:border-0">
                    <span className="text-xs text-foreground-700">{labels[key]}</span>
                    <span className="text-center text-sm font-black text-red-600">
                      {val.unit ? `${val.current} ${val.unit}` : val.current}
                    </span>
                    <span className="text-center text-sm font-black text-emerald-600">
                      {val.unit ? `${val.target} ${val.unit}` : val.target}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progression globale */}
        <div className="mt-4 rounded-2xl border border-background-200 bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-foreground-800">Progression globale du plan</span>
            <span className="text-xs font-black text-foreground-950">{progressionPct}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-background-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progressionPct}%` }}
            />
          </div>
          <div className="flex items-center gap-4 mt-2 text-[11px] text-foreground-500">
            <span>{completedDays.size}/7 jours complétés</span>
            <span>•</span>
            <span className="text-red-600 font-semibold">3 jours bloquants (J1, J2, J3)</span>
          </div>
        </div>
      </section>

      {/* Plan 7 jours */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h2 className="text-sm font-bold text-foreground-600 mb-4 uppercase tracking-wider flex items-center gap-2">
          <i className="ri-calendar-line text-foreground-500" /> Plan d&apos;action 7 jours exécutable
        </h2>
        <div className="space-y-3">
          {oauthCorrectionsData.plan_7jours.map((plan) => {
            const isOpen = openDay === plan.day;
            const isDone = completedDays.has(plan.day);
            return (
              <div
                key={plan.day}
                className={`rounded-2xl border-2 transition-all overflow-hidden ${isDone ? 'border-emerald-300 bg-emerald-50/50' : dayStatusColor(plan.status)}`}
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => toggleDay(plan.day)}
                  className="w-full flex items-center gap-4 p-5 cursor-pointer text-left"
                >
                  <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl font-black text-sm ${isDone ? 'bg-emerald-500 text-white' : dayNumberBg(plan.status)}`}>
                    {isDone ? '✓' : plan.day}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-bold text-foreground-950">{plan.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${severityBadge(plan.status)}`}>
                        {plan.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-500">{plan.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => toggleCompleted(plan.day, e)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap ${isDone ? 'bg-emerald-500 text-white' : 'bg-white border border-background-300 text-foreground-700 hover:border-emerald-300'}`}
                    >
                      {isDone ? '✓ Fait' : 'Marquer fait'}
                    </button>
                    <i className={`ri-arrow-down-s-line text-foreground-400 text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Content */}
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-background-200 pt-4">
                    {/* Tasks */}
                    <ul className="space-y-2 mb-5">
                      {plan.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-background-100 text-foreground-500 border border-background-200 text-[10px] font-bold mt-0.5">{i + 1}</span>
                          <span className="text-foreground-800">{task}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Code blocks */}
                    <div className="space-y-4">
                      {plan.code_file && plan.code_content && (
                        <CodeBlock filename={plan.code_file} code={plan.code_content} />
                      )}
                      {plan.hook_code_file && plan.hook_code_content && (
                        <CodeBlock filename={plan.hook_code_file} code={plan.hook_code_content} />
                      )}
                      {plan.env_code_file && plan.env_code_content && (
                        <CodeBlock filename={plan.env_code_file} code={plan.env_code_content} />
                      )}
                      {plan.vite_code_file && plan.vite_code_content && (
                        <CodeBlock filename={plan.vite_code_file} code={plan.vite_code_content} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Terminal Setup */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="rounded-2xl border border-foreground-700 bg-foreground-950 overflow-hidden">
          <div className="px-5 py-3 border-b border-foreground-700 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-200 flex items-center gap-2">
              <i className="ri-terminal-box-line text-emerald-400" /> Terminal — Setup complet
            </span>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
          </div>
          <div className="p-5 space-y-1.5">
            {oauthCorrectionsData.terminal_setup.commands.map((cmd, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <span className="text-emerald-400 font-mono text-xs flex-shrink-0">$</span>
                <code className="text-xs font-mono text-foreground-100 flex-1">{cmd}</code>
                <button
                  type="button"
                  onClick={() => handleCopyCmd(cmd, idx)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer bg-foreground-700 text-foreground-300 whitespace-nowrap"
                >
                  {copiedCmd === idx ? '✓' : 'Copier'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post Remediation — Projection */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6">
          <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <i className="ri-line-chart-line text-emerald-600" /> Projection post-remédiation — État J7
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(oauthCorrectionsData.post_remediation_metrics).map(([key, val]) => {
              const labels: Record<string, string> = {
                traffic_per_day: 'Trafic / jour',
                error_rate: "Taux d'erreur",
                active_users: 'Utilisateurs actifs',
                consent_grant_rate: 'Consentement',
                security_score: 'Score sécurité'
              };
              return (
                <div key={key} className="text-center rounded-xl bg-white border border-background-200 p-3">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{labels[key]}</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm font-black text-red-600">{String(val.before)}</span>
                    <i className="ri-arrow-right-line text-foreground-400 text-[10px]" />
                    <span className="text-sm font-black text-emerald-600">{String(val.after)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-emerald-100 border border-emerald-200">
            <p className="text-xs text-emerald-800 font-semibold">
              Condition de GO Live : {oauthCorrectionsData.progression.go_live_condition}
            </p>
          </div>
        </div>
      </section>

      {/* Go-Live Checklist */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
            <h4 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
              <i className="ri-alert-fill text-red-600" /> J1-J3 — Bloquants
            </h4>
            <div className="space-y-2 text-xs">
              {['PKCE + Suppression Implicit Flow', 'Validation domaine + redirect_uri', 'Migration hors WebView'].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`flex-shrink-0 w-4 h-4 flex items-center justify-center rounded border ${completedDays.has(`J${i + 1}`) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-red-300 text-red-400'} text-[10px] font-bold`}>
                    {completedDays.has(`J${i + 1}`) ? '✓' : i + 1}
                  </span>
                  <span className="text-red-800">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
            <h4 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
              <i className="ri-tools-line text-amber-600" /> J4-J5 — Critiques
            </h4>
            <div className="space-y-2 text-xs">
              {['Monitoring @google-cloud/logging', 'Tests E2E Playwright'].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`flex-shrink-0 w-4 h-4 flex items-center justify-center rounded border ${completedDays.has(`J${i + 4}`) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-amber-300 text-amber-400'} text-[10px] font-bold`}>
                    {completedDays.has(`J${i + 4}`) ? '✓' : i + 4}
                  </span>
                  <span className="text-amber-800">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border-2 border-background-200 bg-white p-5">
            <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <i className="ri-rocket-line text-emerald-600" /> J6-J7 — Go-Live
            </h4>
            <div className="space-y-2 text-xs">
              {['Écran consentement Google', 'Prod + Quota 10k/j', 'Monitoring actif'].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`flex-shrink-0 w-4 h-4 flex items-center justify-center rounded border ${completedDays.has(`J${i + 6}`) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-background-300 text-foreground-400'} text-[10px] font-bold`}>
                    {completedDays.has(`J${i + 6}`) ? '✓' : i + 6}
                  </span>
                  <span className="text-foreground-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-xl md:text-2xl font-bold text-white mb-2">
            KOS OAuth Security Corrections™
          </h2>
          <p className="text-xs text-foreground-500 mb-6">
            Plan d&apos;action 7 jours — React + Vite — PKCE + Monitoring + E2E Tests
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/kos-bigfour-audit-execution/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/8 text-foreground-300 border border-white/10">
              <i className="ri-shield-flash-line" /> Audit Big Four
            </Link>
            <Link to="/kos-security-dashboard/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/8 text-foreground-300 border border-white/10">
              <i className="ri-lock-line" /> Security Dashboard
            </Link>
            <Link to="/kos-enterprise-security-resilience/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/8 text-foreground-300 border border-white/10">
              <i className="ri-shield-check-line" /> Enterprise Security
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}




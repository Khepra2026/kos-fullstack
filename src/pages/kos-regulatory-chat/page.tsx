import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  regulators,
  sampleChats,
  defaultObligations,
  compareDescriptions,
  mockAlerts,
  mockMonitoredTextsCount,
  computeMockScore,
  mockExtractObligations,
  nlpTextReferences,
} from '@/mocks/kosRegulatoryChat';
import type { RegulatoryAlert, ComplianceScoreResult, ExtractedObligation } from '@/mocks/kosRegulatoryChat';

interface Source {
  title: string;
  regulator: string;
  confidence: number;
  citation: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

interface ChatSession {
  id: string;
  title: string;
  mode: 'search' | 'obligations' | 'compare' | 'alerts' | 'score' | 'obligations-nlp';
  regulator: string;
  regulator2?: string;
  messages: Message[];
}

type Mode = 'search' | 'obligations' | 'compare' | 'alerts' | 'score' | 'obligations-nlp';

// ── API helpers ──

async function callFastAPI(
  mode: Mode,
  query: string,
  regulator: string,
  payload?: unknown,
): Promise<{ answer?: string; sources?: Source[]; alerts?: unknown[]; score?: unknown; obligations?: unknown[] } | null> {
  try {
    const { data, error } = await supabase.functions.invoke('kos-regulatory-chat-proxy', {
      body: { mode, query, regulator, payload },
    });

    if (error) {
      console.warn('[Chat] Edge Function error:', error);
      return null;
    }

    const response = data as Record<string, unknown>;

    if (response?.fallback) {
      console.warn('[Chat] FastAPI not available, using fallback');
      return null;
    }

    if (response?.error) {
      console.warn('[Chat] API error:', response.error);
      return null;
    }

    return {
      answer: typeof response.answer === 'string' ? response.answer : String(response.answer || response.response || ''),
      sources: ((response.sources || response.source_nodes || []) as Array<Record<string, unknown>>).map((s: Record<string, unknown>) => ({
        title: String(s.title || (s.metadata as Record<string, unknown>)?.title || 'Source réglementaire'),
        regulator: String(s.regulator || (s.metadata as Record<string, unknown>)?.regulator || regulator),
        confidence: Number(s.confidence || s.score || 85),
        citation: String(s.citation || (s.metadata as Record<string, unknown>)?.citation || (s.metadata as Record<string, unknown>)?.article || 'Référence officielle'),
      })),
      alerts: response.alerts as unknown[] | undefined,
      score: response.score as unknown,
      obligations: response.obligations as unknown[] | undefined,
    };
  } catch (err) {
    console.warn('[Chat] API call failed:', err);
    return null;
  }
}

// ── Mock builders ──

function buildMockSearchResponse(regulator: string, _query: string): Message {
  const r = regulators.find(rg => rg.code === regulator) || regulators[0];
  return {
    role: 'assistant',
    content: `Selon les textes en vigueur de **${r.name} (${r.code})**, voici les éléments pertinents concernant votre requête.\n\nLa réglementation applicable dans la zone **${r.zone}** prévoit les dispositions suivantes :\n\n1. **Cadre général** : les établissements assujettis doivent se conformer aux exigences prudentielles et déclaratives définies par les textes de référence de ${r.code}.\n2. **Obligations spécifiques** : chaque texte définit des seuils, ratios et délais à respecter scrupuleusement.\n3. **Sanctions** : le non-respect expose à des sanctions administratives et pécuniaires prévues par les textes de ${r.code}.\n\n> Pour une réponse plus précise, veuillez préciser le type d'établissement (banque, SFD, FinTech, assurance) et le domaine (prudentiel, LBC/FT, gouvernance).\n\n*Mode dégradé — L'API FastAPI n'est pas disponible pour le moment. Les résultats sont génériques.*`,
    sources: [
      { title: `Textes consolidés ${r.code} — ${r.name}`, regulator: r.code, confidence: 85, citation: 'Recueil officiel — Mode dégradé' },
    ],
  };
}

function buildMockObligationsResponse(regulator: string): Message {
  const r = regulators.find(rg => rg.code === regulator);
  const name = r ? r.name : regulator;
  const obligations = defaultObligations[regulator] || defaultObligations.BCEAO;

  return {
    role: 'assistant',
    content: `Voici les **obligations déclaratives** pour **${name} (${regulator})** :\n\n${obligations.map((o, i) => `${i + 1}. **${o.split(' —')[0]}** — ${o.split('— ')[1] || 'Reporting périodique'}`).join('\n')}\n\n> Ces obligations sont issues des textes réglementaires officiels de ${regulator}. Les échéances sont indicatives — se référer aux textes originaux pour les dates exactes.\n\n**Nombre total d'obligations** : ${obligations.length}\n\n*Mode dégradé — L'API FastAPI n'est pas disponible pour le moment. Données issues du référentiel KOS interne.*`,
    sources: [
      { title: `Recueil des Textes ${regulator} — Obligations Déclaratives`, regulator, confidence: 95, citation: 'Référentiel officiel KOS' },
    ],
  };
}

function buildMockCompareResponse(reg1: string, reg2: string): Message {
  const obl1 = defaultObligations[reg1] || defaultObligations.BCEAO;
  const obl2 = defaultObligations[reg2] || defaultObligations.COBAC;
  const maxLen = Math.max(obl1.length, obl2.length);

  let content = `## Comparaison : ${reg1} vs ${reg2}\n\n`;

  for (let i = 0; i < maxLen; i++) {
    content += `### Obligation ${i + 1}\n`;
    content += `| ${reg1} | ${reg2} |\n`;
    content += `|---|---|\n`;
    content += `| ${obl1[i] || '—'} | ${obl2[i] || '—'} |\n\n`;
  }

  content += `---\n**Total ${reg1}** : ${obl1.length} obligations · **Total ${reg2}** : ${obl2.length} obligations\n\n`;
  content += `*Mode dégradé — L'API FastAPI n'est pas disponible pour le moment. Données issues du référentiel KOS interne.*`;

  return {
    role: 'assistant',
    content,
    sources: [
      { title: `Recueil ${reg1} — Obligations Déclaratives`, regulator: reg1, confidence: 95, citation: 'Référentiel officiel KOS' },
      { title: `Recueil ${reg2} — Obligations Déclaratives`, regulator: reg2, confidence: 95, citation: 'Référentiel officiel KOS' },
    ],
  };
}

// ── Composants ──

function LoadingDots({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-accent-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-xs text-foreground-400">{text}</span>
    </div>
  );
}

const severityConfig: Record<string, { bg: string; text: string; icon: string; label: string }> = {
  critical: { bg: 'bg-[oklch(0.55_0.25_20_/_0.12)]', text: 'text-[oklch(0.45_0.22_20)]', icon: 'ri-alert-fill', label: 'Critique' },
  high: { bg: 'bg-[oklch(0.55_0.2_50_/_0.12)]', text: 'text-[oklch(0.45_0.18_50)]', icon: 'ri-error-warning-fill', label: 'Élevée' },
  medium: { bg: 'bg-[oklch(0.6_0.15_90_/_0.12)]', text: 'text-[oklch(0.5_0.12_90)]', icon: 'ri-information-fill', label: 'Moyenne' },
  low: { bg: 'bg-[oklch(0.45_0.06_200_/_0.1)]', text: 'text-[oklch(0.4_0.05_200)]', icon: 'ri-checkbox-circle-fill', label: 'Faible' },
};

const categoryConfig: Record<string, { icon: string; label: string }> = {
  nouveau_texte: { icon: 'ri-file-add-line', label: 'Nouveau texte' },
  modification: { icon: 'ri-file-edit-line', label: 'Modification' },
  echeance: { icon: 'ri-timer-line', label: 'Échéance' },
  sanction: { icon: 'ri-auction-line', label: 'Sanction' },
  consultation: { icon: 'ri-chat-poll-line', label: 'Consultation' },
};

const obligationTypeConfig: Record<string, { bg: string; text: string; icon: string }> = {
  declarative: { bg: 'bg-secondary-100', text: 'text-secondary-700', icon: 'ri-file-text-line' },
  prudentielle: { bg: 'bg-accent-100', text: 'text-accent-700', icon: 'ri-shield-line' },
  gouvernance: { bg: 'bg-primary-100', text: 'text-primary-700', icon: 'ri-building-2-line' },
  controle: { bg: 'bg-[oklch(0.55_0.15_160_/_0.12)]', text: 'text-[oklch(0.45_0.12_160)]', icon: 'ri-search-eye-line' },
  sanction: { bg: 'bg-[oklch(0.55_0.22_20_/_0.12)]', text: 'text-[oklch(0.45_0.2_20)]', icon: 'ri-auction-line' },
};

function MessageBubble({ msg, isUser }: { msg: Message; isUser: boolean }) {
  if (isUser) {
    return (
      <div className="flex gap-4 justify-end">
        <div className="max-w-[85%] order-first">
          <div className="rounded-2xl rounded-br-md px-5 py-3.5 bg-primary-500 text-background-50">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
          <i className="ri-user-line text-primary-600 text-sm"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="w-9 h-9 rounded-xl bg-accent-500 flex items-center justify-center shrink-0 mt-0.5">
        <i className="ri-scales-3-line text-background-50 text-sm"></i>
      </div>
      <div className="max-w-[85%]">
        <div className="rounded-2xl rounded-bl-md px-5 py-3.5 bg-background-100 border border-background-200/60">
          <div
            className="text-sm leading-relaxed whitespace-pre-wrap text-foreground-800"
            dangerouslySetInnerHTML={{
              __html: msg.content
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                .replace(/^### (.*$)/gm, '<h4 class="text-sm font-bold mt-3 mb-1.5">$1</h4>')
                .replace(/^## (.*$)/gm, '<h3 class="text-base font-bold mt-4 mb-2">$1</h3>')
                .replace(/^- (.*$)/gm, '<li class="ml-3 list-disc">$1</li>')
                .replace(/\n\n/g, '</p><p class="mb-1.5">')
                .replace(/^([0-9]+\. )/gm, '<span class="font-semibold">$1</span>'),
            }}
          />
        </div>
        {msg.sources && msg.sources.length > 0 && (
          <div className="mt-2 ml-1 space-y-1.5">
            <p className="text-[10px] text-foreground-400 uppercase tracking-wider font-semibold mb-1">Sources citées</p>
            {msg.sources.map((src, si) => (
              <div key={si} className="flex items-start gap-2 p-2.5 rounded-lg bg-background-50 border border-background-200/50">
                <div className="w-6 h-6 rounded-md bg-accent-100 flex items-center justify-center shrink-0">
                  <i className="ri-file-text-line text-accent-600 text-[10px]"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground-800 leading-snug">{src.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{src.regulator}</span>
                    <span className="text-[10px] text-foreground-400">{src.citation}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <div className="w-10 h-1.5 bg-background-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${src.confidence}%`,
                        backgroundColor: src.confidence >= 90 ? 'oklch(var(--accent-500))' : src.confidence >= 75 ? 'oklch(var(--primary-500))' : 'oklch(var(--secondary-500))',
                      }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-foreground-600 w-7 text-right whitespace-nowrap">{src.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Alertes Dashboard ──

function AlertsDashboard({ alerts, monitoredCount, regulatorFilter, onRegulatorFilterChange, onRefresh, isLoading }: {
  alerts: RegulatoryAlert[];
  monitoredCount: number;
  regulatorFilter: string;
  onRegulatorFilterChange: (v: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}) {
  const filtered = regulatorFilter === 'ALL' ? alerts : alerts.filter(a => a.regulator === regulatorFilter);

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-background-100 border border-background-200/60">
          <p className="text-[10px] text-foreground-400 uppercase tracking-wider font-semibold mb-1">Alertes actives</p>
          <p className="text-xl font-bold text-foreground-950">{alerts.length}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-background-100 border border-background-200/60">
          <p className="text-[10px] text-foreground-400 uppercase tracking-wider font-semibold mb-1">Critiques</p>
          <p className="text-xl font-bold text-[oklch(0.45_0.22_20)]">{alerts.filter(a => a.severity === 'critical').length}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-background-100 border border-background-200/60">
          <p className="text-[10px] text-foreground-400 uppercase tracking-wider font-semibold mb-1">Textes monitorés</p>
          <p className="text-xl font-bold text-foreground-950">{monitoredCount}+</p>
        </div>
        <div className="p-3.5 rounded-xl bg-background-100 border border-background-200/60">
          <p className="text-[10px] text-foreground-400 uppercase tracking-wider font-semibold mb-1">Régulateurs</p>
          <p className="text-xl font-bold text-foreground-950">8</p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center bg-background-100 rounded-full p-0.5 border border-background-200/60">
          {['ALL', 'BCEAO', 'COBAC', 'CIMA', 'GAFI', 'OHADA'].map(code => (
            <button
              key={code}
              onClick={() => onRegulatorFilterChange(code)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                regulatorFilter === code ? 'bg-accent-500 text-background-50 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'
              }`}
            >
              {code === 'ALL' ? 'Tous' : code}
            </button>
          ))}
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background-100 border border-background-200/60 text-xs font-medium text-foreground-600 hover:text-foreground-900 cursor-pointer transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <i className={`ri-refresh-line text-sm ${isLoading ? 'animate-spin' : ''}`}></i>
          Actualiser
        </button>
      </div>

      {/* Alerts feed */}
      <div className="space-y-3">
        {filtered.map(alert => {
          const sev = severityConfig[alert.severity];
          const cat = categoryConfig[alert.category];
          const reg = regulators.find(r => r.code === alert.regulator);
          return (
            <div key={alert.id} className="p-4 rounded-xl bg-background-100 border border-background-200/60 hover:border-accent-300/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${sev.bg} flex items-center justify-center shrink-0`}>
                  <i className={`${sev.icon} ${sev.text} text-base`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${sev.bg} ${sev.text}`}>{sev.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{alert.regulator}{reg ? ` — ${reg.zone}` : ''}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-500 font-medium">
                      <i className={cat.icon + ' mr-1'}></i>{cat.label}
                    </span>
                    <span className="text-[10px] text-foreground-400 ml-auto whitespace-nowrap">{new Date(alert.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-900 mb-1">{alert.title}</h4>
                  <p className="text-xs text-foreground-500 leading-relaxed">{alert.summary}</p>
                  <p className="text-[10px] text-foreground-400 mt-2 italic">{alert.text_reference}</p>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="w-14 h-14 rounded-2xl bg-background-100 flex items-center justify-center mx-auto mb-3">
              <i className="ri-notification-off-line text-2xl text-foreground-300"></i>
            </div>
            <p className="text-sm text-foreground-400">Aucune alerte pour ce filtre</p>
          </div>
        )}
      </div>

      {/* Footer stats */}
      <p className="text-[10px] text-foreground-400 text-center">
        {monitoredCount}+ textes réglementaires monitorés en continu — Mise à jour quotidienne
      </p>
    </div>
  );
}

// ── Score Form & Results ──

function ScoreModule({ onCompute, result, isLoading, apiAvailable }: {
  onCompute: (data: { etablissement: string; type: string; pays: string; taille: string }) => void;
  result: ComplianceScoreResult | null;
  isLoading: boolean;
  apiAvailable: boolean;
}) {
  const [etablissement, setEtablissement] = useState('');
  const [type, setType] = useState('banque');
  const [pays, setPays] = useState('CIV');
  const [taille, setTaille] = useState('moyen');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompute({ etablissement: etablissement || 'Établissement test', type, pays, taille });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-background-100 border border-background-200/70">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-accent-100 flex items-center justify-center">
            <i className="ri-shield-check-line text-accent-600 text-sm"></i>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground-950">KHEPRA Compliance Score™ v2</h3>
            <p className="text-[10px] text-foreground-400">Évaluez votre conformité sur 6 axes réglementaires BCEAO</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Établissement</label>
            <input
              type="text"
              value={etablissement}
              onChange={e => setEtablissement(e.target.value)}
              placeholder="Nom de l'établissement"
              className="w-full px-3 py-2 rounded-lg border border-background-200/70 bg-background-50 text-sm text-foreground-800 placeholder:text-foreground-300 focus:outline-none focus:border-accent-400"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-background-200/70 bg-background-50 text-sm text-foreground-800 cursor-pointer focus:outline-none focus:border-accent-400"
            >
              <option value="banque">Banque</option>
              <option value="sfd">SFD / Microfinance</option>
              <option value="fintech">FinTech / EME</option>
              <option value="assurance">Assurance</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Pays</label>
            <select
              value={pays}
              onChange={e => setPays(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-background-200/70 bg-background-50 text-sm text-foreground-800 cursor-pointer focus:outline-none focus:border-accent-400"
            >
              <option value="CIV">Côte d'Ivoire</option>
              <option value="SEN">Sénégal</option>
              <option value="CMR">Cameroun</option>
              <option value="GAB">Gabon</option>
              <option value="BFA">Burkina Faso</option>
              <option value="MLI">Mali</option>
              <option value="BEN">Bénin</option>
              <option value="TGO">Togo</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Taille</label>
            <select
              value={taille}
              onChange={e => setTaille(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-background-200/70 bg-background-50 text-sm text-foreground-800 cursor-pointer focus:outline-none focus:border-accent-400"
            >
              <option value="petit">Petit (actif {'<'} 50Mds FCFA)</option>
              <option value="moyen">Moyen (50-500Mds FCFA)</option>
              <option value="grand">Grand (actif {'>'} 500Mds FCFA)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent-500 text-background-50 font-semibold text-sm hover:bg-accent-600 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-background-50 border-t-transparent rounded-full animate-spin"></div>
              Analyse en cours...
            </>
          ) : (
            <>
              <i className="ri-shield-check-line"></i>
              Calculer mon Score de Conformité
            </>
          )}
        </button>
      </form>

      {!apiAvailable && result === null && (
        <div className="text-center p-4 rounded-xl bg-[oklch(0.55_0.15_90_/_0.08)] border border-[oklch(0.55_0.15_90_/_0.2)]">
          <p className="text-xs text-[oklch(0.45_0.12_90)]">
            <i className="ri-information-line mr-1"></i>
            L'API FastAPI n'est pas disponible. Remplissez le formulaire pour obtenir un score simulé basé sur le référentiel KOS.
          </p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-5">
          {/* Global score */}
          <div className="p-6 rounded-2xl bg-background-100 border border-background-200/70 text-center">
            <p className="text-xs text-foreground-400 uppercase tracking-wider font-semibold mb-2">KHEPRA Compliance Score™</p>
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(var(--background-200))" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke={result.score >= 80 ? 'oklch(var(--accent-500))' : result.score >= 60 ? 'oklch(var(--primary-500))' : 'oklch(0.5 0.2 50)'}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(result.score / 100) * 327} 327`}
                />
              </svg>
              <span className="absolute text-3xl font-black text-foreground-950">{result.score}</span>
            </div>
            <p className="text-sm font-semibold text-foreground-800">
              {result.score >= 80 ? 'Conformité solide' : result.score >= 60 ? 'Conformité partielle — améliorations nécessaires' : 'Risques de non-conformité significatifs'}
            </p>
            <p className="text-[10px] text-foreground-400 mt-1">sur 100 — 6 axes évalués selon le référentiel BCEAO</p>
          </div>

          {/* Axes breakdown */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-foreground-800">Détail par axe</h4>
            {result.axes.map((axe, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-background-100 border border-background-200/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-foreground-800">{axe.nom}</span>
                  <span className="text-xs font-bold text-foreground-600 whitespace-nowrap">{axe.score}/{axe.max}</span>
                </div>
                <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(axe.score / axe.max) * 100}%`,
                      backgroundColor: axe.score / axe.max >= 0.8 ? 'oklch(var(--accent-500))' : axe.score / axe.max >= 0.6 ? 'oklch(var(--primary-500))' : 'oklch(0.5 0.2 50)',
                    }}
                  ></div>
                </div>
                <p className="text-[10px] text-foreground-400 leading-relaxed">{axe.commentaire}</p>
              </div>
            ))}
          </div>

          {/* Recommandations */}
          <div className="p-4 rounded-xl bg-accent-100/50 border border-accent-200/40">
            <h4 className="text-xs font-bold text-accent-800 mb-2 flex items-center gap-1.5">
              <i className="ri-lightbulb-line"></i>Recommandations prioritaires
            </h4>
            <ul className="space-y-1">
              {result.recommandations.map((rec, i) => (
                <li key={i} className="text-xs text-accent-700 flex items-start gap-1.5">
                  <span className="mt-0.5">•</span> {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ── NLP Extraction Module ──

function NLPExtractionModule({ onExtract, result, isLoading, apiAvailable }: {
  onExtract: (textId: string) => void;
  result: ExtractedObligation[] | null;
  isLoading: boolean;
  apiAvailable: boolean;
}) {
  const [selectedTextId, setSelectedTextId] = useState(nlpTextReferences[0].id);

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Selector */}
      <div className="p-5 rounded-2xl bg-background-100 border border-background-200/70">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center">
            <i className="ri-brain-line text-primary-600 text-sm"></i>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground-950">Extraction NLP d'Obligations</h3>
            <p className="text-[10px] text-foreground-400">Analyse automatique des clauses déclaratives, prudentielles et de contrôle</p>
          </div>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1">Texte réglementaire</label>
            <select
              value={selectedTextId}
              onChange={e => setSelectedTextId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-background-200/70 bg-background-50 text-sm text-foreground-800 cursor-pointer focus:outline-none focus:border-accent-400"
            >
              {nlpTextReferences.map(ref => (
                <option key={ref.id} value={ref.id}>{ref.label} ({ref.regulator} — {ref.obligations} obligations extraites)</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => onExtract(selectedTextId)}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-accent-500 text-background-50 font-semibold text-sm hover:bg-accent-600 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-background-50 border-t-transparent rounded-full animate-spin"></div>
                Extraction...
              </>
            ) : (
              <>
                <i className="ri-brain-line"></i>
                Extraire
              </>
            )}
          </button>
        </div>
      </div>

      {!apiAvailable && result === null && (
        <div className="text-center p-4 rounded-xl bg-[oklch(0.55_0.15_90_/_0.08)] border border-[oklch(0.55_0.15_90_/_0.2)]">
          <p className="text-xs text-[oklch(0.45_0.12_90)]">
            <i className="ri-information-line mr-1"></i>
            L'API FastAPI n'est pas disponible. Sélectionnez un texte pour une extraction simulée via le moteur KOS.
          </p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-foreground-800">{result.length} obligations extraites</h4>
            <span className="text-[10px] text-foreground-400">par NLP Engine KOS</span>
          </div>

          {result.map((obl, i) => {
            const typeStyle = obligationTypeConfig[obl.type];
            return (
              <div key={i} className="p-4 rounded-xl bg-background-100 border border-background-200/60 hover:border-accent-300/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${typeStyle.bg} flex items-center justify-center shrink-0`}>
                    <i className={`${typeStyle.icon} ${typeStyle.text} text-xs`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-bold text-foreground-900">{obl.article}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeStyle.bg} ${typeStyle.text}`}>
                        {obl.type}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200/70 text-foreground-500 font-medium">
                        <i className="ri-timer-line mr-1"></i>{obl.echeance}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-700 leading-relaxed mb-1.5">{obl.description}</p>
                    <p className="text-[10px] text-foreground-400">
                      <i className="ri-auction-line mr-1"></i>{obl.sanction}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Page ──

export default function KOSRegulatoryChatPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatSession[]>(sampleChats);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<Mode>('search');
  const [selectedRegulator, setSelectedRegulator] = useState('BCEAO');
  const [selectedRegulator2, setSelectedRegulator2] = useState('COBAC');
  const [isSearching, setIsSearching] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiAvailable] = useState(true);

  // ── Alerts state ──
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>(mockAlerts);
  const [alertsRegulatorFilter, setAlertsRegulatorFilter] = useState('ALL');
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [alertsFetched, setAlertsFetched] = useState(false);

  // ── Score state ──
  const [scoreResult, setScoreResult] = useState<ComplianceScoreResult | null>(null);
  const [scoreLoading, setScoreLoading] = useState(false);

  // ── NLP state ──
  const [nlpResult, setNlpResult] = useState<ExtractedObligation[] | null>(null);
  const [nlpLoading, setNlpLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = useMemo(() => chats.find(c => c.id === activeChatId), [chats, activeChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, scoreResult, nlpResult]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChatId, mode]);

  // Auto-fetch alerts on first mount
  useEffect(() => {
    if (!alertsFetched) {
      handleRefreshAlerts(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefreshAlerts = useCallback(async (silent = false) => {
    if (!silent) setAlertsLoading(true);

    const apiResp = await callFastAPI('alerts', alertsRegulatorFilter === 'ALL' ? '' : alertsRegulatorFilter, alertsRegulatorFilter === 'ALL' ? '' : alertsRegulatorFilter);

    if (apiResp?.alerts) {
      setAlerts(apiResp.alerts as RegulatoryAlert[]);
    }
    // else keep mock data

    setAlertsLoading(false);
    setAlertsFetched(true);
  }, [alertsRegulatorFilter]);

  const handleComputeScore = useCallback(async (payload: { etablissement: string; type: string; pays: string; taille: string }) => {
    setScoreLoading(true);
    setScoreResult(null);

    const apiResp = await callFastAPI('score', '', '', payload);

    if (apiResp?.score) {
      setScoreResult(apiResp.score as ComplianceScoreResult);
    } else {
      setScoreResult(computeMockScore(payload));
    }

    setScoreLoading(false);
  }, []);

  const handleExtractNLP = useCallback(async (textId: string) => {
    setNlpLoading(true);
    setNlpResult(null);

    const apiResp = await callFastAPI('obligations-nlp', textId, '');

    if (apiResp?.obligations) {
      setNlpResult(apiResp.obligations as ExtractedObligation[]);
    } else {
      setNlpResult(mockExtractObligations(textId));
    }

    setNlpLoading(false);
  }, []);

  // ── Chat handlers ──

  const handleSend = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSearching) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    if (mode === 'compare') {
      const r1n = regulators.find(r => r.code === selectedRegulator)?.name || selectedRegulator;
      const r2n = regulators.find(r => r.code === selectedRegulator2)?.name || selectedRegulator2;
      const userMsgCompare: Message = {
        role: 'user',
        content: `Compare les obligations déclaratives de **${r1n} (${selectedRegulator})** et **${r2n} (${selectedRegulator2})**`,
      };
      setInputValue('');
      setIsSearching(true);

      if (activeChatId) {
        setChats(prev => prev.map(c =>
          c.id === activeChatId ? { ...c, messages: [...c.messages, userMsgCompare] } : c
        ));
      } else {
        const title = `Comparaison ${selectedRegulator} vs ${selectedRegulator2}`;
        const newChat: ChatSession = {
          id: `chat-${Date.now()}`,
          title,
          mode: 'compare',
          regulator: selectedRegulator,
          regulator2: selectedRegulator2,
          messages: [userMsgCompare],
        };
        setChats(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
      }

      const targetId = activeChatId || `chat-${Date.now()}`;

      const [apiResp1, apiResp2] = await Promise.all([
        callFastAPI('obligations', '', selectedRegulator),
        callFastAPI('obligations', '', selectedRegulator2),
      ]);

      let response: Message;

      if (apiResp1 && apiResp2) {
        response = {
          role: 'assistant',
          content: `## Comparaison : ${r1n} (${selectedRegulator}) vs ${r2n} (${selectedRegulator2})\n\n### ${selectedRegulator}\n${apiResp1.answer}\n\n### ${selectedRegulator2}\n${apiResp2.answer}`,
          sources: [...(apiResp1.sources || []), ...(apiResp2.sources || [])],
        };
      } else {
        response = buildMockCompareResponse(selectedRegulator, selectedRegulator2);
      }

      setIsSearching(false);
      setChats(prev => prev.map(c => c.id === targetId ? { ...c, messages: [...c.messages, response] } : c));
      return;
    }

    setInputValue('');
    setIsSearching(true);

    if (activeChatId) {
      setChats(prev => prev.map(c =>
        c.id === activeChatId ? { ...c, messages: [...c.messages, userMsg] } : c
      ));
    } else {
      const title = trimmed.length > 40 ? trimmed.slice(0, 40) + '...' : trimmed;
      const newChat: ChatSession = {
        id: `chat-${Date.now()}`,
        title,
        mode,
        regulator: selectedRegulator,
        messages: [userMsg],
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChat.id);
    }

    const targetId = activeChatId || `chat-${Date.now()}`;

    let response: Message;

    if (mode === 'obligations') {
      const apiResp = await callFastAPI('obligations', '', selectedRegulator);
      if (apiResp) {
        response = { role: 'assistant', content: apiResp.answer || '', sources: apiResp.sources };
      } else {
        response = buildMockObligationsResponse(selectedRegulator);
      }
    } else {
      const apiResp = await callFastAPI('search', trimmed, selectedRegulator);
      if (apiResp) {
        response = { role: 'assistant', content: apiResp.answer || '', sources: apiResp.sources };
      } else {
        response = buildMockSearchResponse(selectedRegulator, trimmed);
      }
    }

    setIsSearching(false);
    setChats(prev => prev.map(c => c.id === targetId ? { ...c, messages: [...c.messages, response] } : c));
  }, [inputValue, isSearching, activeChatId, mode, selectedRegulator, selectedRegulator2]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setInputValue('');
    setScoreResult(null);
    setNlpResult(null);
  };

  const getRegulatorBadge = (code: string) => {
    const r = regulators.find(reg => reg.code === code);
    return r ? { name: r.name, zone: r.zone, flag: r.flag } : { name: code, zone: '', flag: 'ri-bank-line' };
  };

  const getPlaceholder = () => {
    if (mode === 'obligations') return `Lister les obligations déclaratives pour ${selectedRegulator}...`;
    if (mode === 'compare') return `Comparer les obligations ${selectedRegulator} vs ${selectedRegulator2}`;
    return 'Posez une question réglementaire — BCEAO, COBAC, CIMA, GAFI, OHADA...';
  };

  const modeLabel = (m: string) => {
    switch (m) {
      case 'obligations': return 'Obligations';
      case 'compare': return 'Comparaison';
      case 'alerts': return 'Alertes';
      case 'score': return 'Score Conformité';
      case 'obligations-nlp': return 'Extraction NLP';
      default: return 'Recherche';
    }
  };

  const modeIcon = (m: string) => {
    switch (m) {
      case 'obligations': return 'ri-file-list-3-line';
      case 'compare': return 'ri-arrow-left-right-line';
      case 'alerts': return 'ri-notification-3-line';
      case 'score': return 'ri-shield-check-line';
      case 'obligations-nlp': return 'ri-brain-line';
      default: return 'ri-search-line';
    }
  };

  const isChatMode = mode === 'search' || mode === 'obligations' || mode === 'compare';
  const chatModeChats = useMemo(() => chats.filter(c => c.mode === 'search' || c.mode === 'obligations' || c.mode === 'compare'), [chats]);

  return (
    <div className="min-h-screen bg-background-50 flex">
      {/* Sidebar — only for chat modes */}
      <aside className={`${sidebarOpen && isChatMode ? 'w-80' : 'w-0'} transition-all duration-300 bg-background-100/60 border-r border-background-200/60 flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-background-200/60">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-background-50 font-semibold text-sm hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line text-lg"></i>
            Nouvelle recherche
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {chatModeChats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors cursor-pointer group ${
                activeChatId === chat.id
                  ? 'bg-background-200/70'
                  : 'hover:bg-background-200/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-accent-100">
                  <i className={`${modeIcon(chat.mode)} text-accent-600 text-xs`}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground-800 truncate">{chat.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{chat.regulator}{chat.regulator2 ? ` vs ${chat.regulator2}` : ''}</span>
                    <span className="text-[10px] text-foreground-400">{chat.messages.length} msg</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-background-200/60">
          <div className="flex items-center justify-between text-[10px] text-foreground-400">
            <span>{chatModeChats.length} conversations</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              KOS REGTECH AI
            </span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-background-200/70 bg-background-50 px-6 py-3">
          {/* Top row: brand + mode pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-background-200/60 transition-colors cursor-pointer"
            >
              <i className={`${sidebarOpen ? 'ri-sidebar-fold-line' : 'ri-sidebar-unfold-line'} text-foreground-500 text-lg`}></i>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
                <i className="ri-scales-3-line text-background-50 text-sm"></i>
              </div>
              <div>
                <h1 className="text-sm font-bold text-foreground-950">Chat Réglementaire KOS<span className="text-accent-500">™</span></h1>
                <p className="text-[10px] text-foreground-400">Assistant IA · BCEAO · COBAC · CIMA · GAFI · OHADA</p>
              </div>
            </div>

            <div className="ml-auto"></div>
          </div>

          {/* Mode selector — 2 rows */}
          <div className="mt-3 flex items-center flex-wrap gap-1.5">
            <div className="flex items-center bg-background-100 rounded-full p-0.5 border border-background-200/60 flex-wrap">
              {([
                { key: 'search' as Mode, icon: 'ri-search-line', label: 'Recherche' },
                { key: 'obligations' as Mode, icon: 'ri-file-list-3-line', label: 'Obligations' },
                { key: 'compare' as Mode, icon: 'ri-arrow-left-right-line', label: 'Comparer' },
                { key: 'alerts' as Mode, icon: 'ri-notification-3-line', label: 'Alertes' },
                { key: 'score' as Mode, icon: 'ri-shield-check-line', label: 'Score' },
                { key: 'obligations-nlp' as Mode, icon: 'ri-brain-line', label: 'NLP' },
              ] as { key: Mode; icon: string; label: string }[]).map(item => (
                <button
                  key={item.key}
                  onClick={() => { setMode(item.key); setActiveChatId(null); }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    mode === item.key ? 'bg-accent-500 text-background-50 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'
                  }`}
                >
                  <i className={`${item.icon} mr-1`}></i>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Regulator selector for chat modes */}
            {isChatMode && mode === 'compare' ? (
              <div className="flex items-center gap-1.5 ml-auto">
                <select
                  value={selectedRegulator}
                  onChange={(e) => setSelectedRegulator(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 cursor-pointer focus:outline-none focus:border-accent-400"
                >
                  {regulators.map(r => (
                    <option key={r.code} value={r.code}>{r.code}</option>
                  ))}
                </select>
                <span className="text-xs font-bold text-foreground-400">vs</span>
                <select
                  value={selectedRegulator2}
                  onChange={(e) => setSelectedRegulator2(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 cursor-pointer focus:outline-none focus:border-accent-400"
                >
                  {regulators.filter(r => r.code !== selectedRegulator).map(r => (
                    <option key={r.code} value={r.code}>{r.code}</option>
                  ))}
                </select>
              </div>
            ) : isChatMode ? (
              <select
                value={selectedRegulator}
                onChange={(e) => setSelectedRegulator(e.target.value)}
                className="ml-auto px-3 py-1.5 rounded-lg border border-background-200/70 bg-background-50 text-xs font-medium text-foreground-700 cursor-pointer focus:outline-none focus:border-accent-400"
              >
                {regulators.map(r => (
                  <option key={r.code} value={r.code}>{r.code} — {r.name}</option>
                ))}
              </select>
            ) : null}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Chat modes — empty state */}
          {isChatMode && !activeChat && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 flex items-center justify-center rounded-2xl mx-auto mb-6 bg-accent-100">
                  <i className="ri-scales-3-line text-3xl text-accent-600"></i>
                </div>
                <h2 className="text-xl font-bold text-foreground-950 mb-2">
                  Chat Réglementaire KOS
                </h2>
                <p className="text-sm text-foreground-500 mb-6">
                  Posez une question sur les textes BCEAO, COBAC, CIMA, GAFI ou OHADA. L'assistant cite les articles exacts avec les sources officielles.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Ratio de solvabilité minimum BCEAO 2026',
                    'Procédure agrément FinTech UEMOA',
                    'Obligations LBC/FT COBAC déclaratives',
                    'Exigences fonds propres CIMA assurance',
                  ].map((example, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setInputValue(example); }}
                      className="text-left px-3 py-2.5 rounded-xl bg-background-100 border border-background-200/60 text-xs text-foreground-600 hover:text-foreground-900 hover:border-accent-300 cursor-pointer transition-all"
                    >
                      <i className="ri-arrow-right-up-line mr-1.5 text-[10px] text-accent-500"></i>
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat modes — messages */}
          {isChatMode && activeChat && (
            <div className="max-w-3xl mx-auto space-y-5">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium">
                  <i className={getRegulatorBadge(activeChat.regulator).flag + ' text-xs'}></i>
                  {activeChat.regulator}
                  {activeChat.regulator2 && (
                    <>
                      <span className="text-foreground-400">vs</span>
                      <i className={getRegulatorBadge(activeChat.regulator2).flag + ' text-xs'}></i>
                      {activeChat.regulator2}
                    </>
                  )}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-medium">
                  <i className={modeIcon(activeChat.mode)}></i>
                  {modeLabel(activeChat.mode)}
                </span>
              </div>

              {activeChat.mode === 'compare' && activeChat.regulator2 && activeChat.messages.length <= 1 && (
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-background-100 border border-background-200/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <i className={getRegulatorBadge(activeChat.regulator).flag + ' text-sm'}></i>
                      <span className="text-xs font-bold text-foreground-900">{activeChat.regulator}</span>
                    </div>
                    <p className="text-[11px] text-foreground-500 leading-relaxed">{compareDescriptions[activeChat.regulator] || ''}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-background-100 border border-background-200/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <i className={getRegulatorBadge(activeChat.regulator2).flag + ' text-sm'}></i>
                      <span className="text-xs font-bold text-foreground-900">{activeChat.regulator2}</span>
                    </div>
                    <p className="text-[11px] text-foreground-500 leading-relaxed">{compareDescriptions[activeChat.regulator2] || ''}</p>
                  </div>
                </div>
              )}

              {activeChat.messages.map((msg, idx) => (
                <MessageBubble key={idx} msg={msg} isUser={msg.role === 'user'} />
              ))}

              {isSearching && (
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-accent-500 flex items-center justify-center shrink-0">
                    <i className="ri-scales-3-line text-background-50 text-sm"></i>
                  </div>
                  <div className="bg-background-100 border border-background-200/60 rounded-2xl rounded-bl-md px-5 py-4">
                    <LoadingDots text={
                      mode === 'compare'
                        ? `Comparaison ${selectedRegulator} vs ${selectedRegulator2} en cours...`
                        : `Analyse des textes ${selectedRegulator} en cours...`
                    } />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
          )}

          {/* Alerts mode */}
          {mode === 'alerts' && (
            <AlertsDashboard
              alerts={alerts}
              monitoredCount={mockMonitoredTextsCount}
              regulatorFilter={alertsRegulatorFilter}
              onRegulatorFilterChange={setAlertsRegulatorFilter}
              onRefresh={() => handleRefreshAlerts(false)}
              isLoading={alertsLoading}
            />
          )}

          {/* Score mode */}
          {mode === 'score' && (
            <ScoreModule
              onCompute={handleComputeScore}
              result={scoreResult}
              isLoading={scoreLoading}
              apiAvailable={apiAvailable}
            />
          )}

          {/* NLP Extraction mode */}
          {mode === 'obligations-nlp' && (
            <NLPExtractionModule
              onExtract={handleExtractNLP}
              result={nlpResult}
              isLoading={nlpLoading}
              apiAvailable={apiAvailable}
            />
          )}
        </div>

        {/* Input Area — only for chat modes */}
        {isChatMode && (
          <div className="border-t border-background-200/70 bg-background-50 px-6 py-4">
            <div className="max-w-3xl mx-auto">
              {mode === 'compare' && !activeChat && (
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-background-100 border border-background-200/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <i className={getRegulatorBadge(selectedRegulator).flag + ' text-sm'}></i>
                      <span className="text-xs font-bold text-foreground-900">{selectedRegulator}</span>
                    </div>
                    <p className="text-[11px] text-foreground-500 leading-relaxed">{compareDescriptions[selectedRegulator] || ''}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-background-100 border border-background-200/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <i className={getRegulatorBadge(selectedRegulator2).flag + ' text-sm'}></i>
                      <span className="text-xs font-bold text-foreground-900">{selectedRegulator2}</span>
                    </div>
                    <p className="text-[11px] text-foreground-500 leading-relaxed">{compareDescriptions[selectedRegulator2] || ''}</p>
                  </div>
                </div>
              )}
              <div className="relative flex items-end gap-3 bg-background-100 border border-background-200/70 rounded-2xl px-4 py-2.5 focus-within:border-accent-400 focus-within:ring-2 focus-within:ring-accent-400/20 transition-all">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={getPlaceholder()}
                  className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-foreground-950 placeholder:text-foreground-400 py-1.5 min-h-[44px] max-h-[120px]"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isSearching}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 transition-all cursor-pointer ${
                    inputValue.trim() && !isSearching
                      ? 'bg-accent-500 text-background-50 hover:bg-accent-600'
                      : 'bg-background-200 text-foreground-300'
                  }`}
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-background-50 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <i className="ri-arrow-up-line text-lg"></i>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-foreground-400 mt-2 text-center">
                KOS REGTECH AI — Zéro interprétation. Sources officielles exclusivement. Articles cités avec références exactes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
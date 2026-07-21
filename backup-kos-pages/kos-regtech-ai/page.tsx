import { useState } from 'react';
import { useKOSPipeline } from '@/agents/AgentOrchestrator';
import regTechDashboard from '@/components/feature/regTechDashboard';
import { toasterProvider, useToast } from '@/components/feature/toaster';
import { PipelineResult, RegulationSource } from '@/types/kos';
import {
  Zap, Play, RefreshCw, CheckCircle2, XCircle, Clock,
  Globe, Linkedin, Facebook, Instagram, MessageCircle,
  MapPin, Mail, ArrowRight, Brain, FileSearch, PenTool,
  ShieldCheck, Palette, Share2, Send, TrendingUp, Loader2,
  History, BarChart3, Video, Eye,
} from 'lucide-react';

const REGULATORS: { source: RegulationSource; label: string; docId: string }[] = [
  { source: 'BCEAO', label: 'BCEAO — UEMOA', docId: '2026-07-INST-001' },
  { source: 'COBAC', label: 'COBAC — CEMAC', docId: '2026-COBAC-R-045' },
  { source: 'BEAC', label: 'BEAC — CEMAC', docId: '2026-BEAC-INST-022' },
  { source: 'OHADA', label: 'OHADA', docId: '2026-AU-OHADA-12' },
  { source: 'GAFI', label: 'GAFI', docId: '2026-FATF-REC-40' },
  { source: 'IFRS', label: 'IFRS Foundation', docId: '2026-IFRS-9-UPDATE' },
];

const PIPELINE_STEPS = [
  { key: 'Veille réglementaire', label: 'Veille', icon: Brain },
  { key: 'Rédaction + SEO', label: 'Rédaction + SEO', icon: PenTool },
  { key: 'Fact-checking', label: 'Fact-Check', icon: FileSearch },
  { key: 'Contrôle Qualité Big Four', label: 'Contrôle Qualité', icon: ShieldCheck },
  { key: 'Contrôle Marque', label: 'Marque', icon: Palette },
  { key: 'Déclinaison omnicanale', label: 'Omnicanal', icon: Share2 },
  { key: 'Publication', label: 'Publication', icon: Send },
  { key: 'Tracking KPI', label: 'KPI', icon: TrendingUp },
];

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  web: <Globe className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  x: <MessageCircle className="w-4 h-4" />,
  gbp: <MapPin className="w-4 h-4" />,
  newsletter: <Mail className="w-4 h-4" />,
};

function PipelineUI() {
  const { runPipeline, isRunning, lastResult, currentStep, error } = useKOSPipeline();
  const { addToast } = useToast();
  const [selectedRegulator, setSelectedRegulator] = useState(REGULATORS[0]);

  const handleTrigger = async () => {
    const result = await runPipeline({
      id: crypto.randomUUID(),
      type: 'NEW_REGULATION',
      payload: {
        source: selectedRegulator.source,
        docId: selectedRegulator.docId,
      },
    });

    if (result.status === 'SUCCESS') {
      addToast({
        title: 'Pipeline exécuté avec succès',
        description: `Score Qualité: ${result.audit.scoreQualite}% — ${result.results.length} canaux publiés`,
        variant: 'success',
      });
    } else {
      addToast({
        title: 'Pipeline échoué',
        description: error || 'Les seuils Big Four n\'ont pas été atteints',
        variant: 'error',
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className="rounded-2xl p-8 border"
        style={{
          backgroundColor: 'oklch(var(--background-50))',
          borderColor: 'oklch(var(--background-200) / 0.7)',
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 flex items-center justify-center rounded-xl"
            style={{ backgroundColor: 'oklch(var(--accent-100) / 0.8)' }}
          >
            <Zap className="w-6 h-6" style={{ color: 'oklch(var(--accent-500))' }} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>
              KOS REGTECH AI
            </h1>
            <p className="text-sm" style={{ color: 'oklch(var(--foreground-500))' }}>
              Orchestrateur Big Four — Pipeline autonome de contenu réglementaire
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/kos-regtech-ai/video-preview/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
            >
              <Eye className="w-4 h-4" />
              Preview
            </a>
            <a
              href="/kos-regtech-ai/video-pipeline/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'oklch(var(--accent-100) / 0.6)', color: 'oklch(var(--accent-700))' }}
            >
              <Video className="w-4 h-4" />
              Vidéo
            </a>
            <a
              href="/kos-regtech-ai/analytics/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'oklch(var(--primary-100) / 0.5)', color: 'oklch(var(--primary-700))' }}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </a>
            <a
              href="/kos-regtech-ai/history/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-700))' }}
            >
              <History className="w-4 h-4" />
              Historique
            </a>
          </div>
        </div>

        <p className="text-sm mb-6" style={{ color: 'oklch(var(--foreground-600))' }}>
          Détection automatique de nouvelle réglementation → Analyse IA → Rédaction → Contrôle Qualité Big Four → Publication omnicanale.
          <br />
          <span className="font-medium" style={{ color: 'oklch(var(--accent-500))' }}>
            9 agents autonomes • 7 canaux • 100% automatisé
          </span>
        </p>

        {/* Regulator selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {REGULATORS.map(reg => (
            <button
              key={reg.source}
              onClick={() => setSelectedRegulator(reg)}
              disabled={isRunning}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap disabled:opacity-40"
              style={
                selectedRegulator.source === reg.source
                  ? {
                      backgroundColor: 'oklch(var(--accent-500))',
                      color: 'oklch(var(--background-50))',
                    }
                  : {
                      backgroundColor: 'oklch(var(--background-100))',
                      color: 'oklch(var(--foreground-700))',
                    }
              }
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Trigger button */}
        <button
          onClick={handleTrigger}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
          style={{
            backgroundColor: 'oklch(var(--primary-500))',
            color: 'oklch(var(--background-50))',
          }}
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Pipeline en cours...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Déclencher : Nouvelle réglementation {selectedRegulator.source}
            </>
          )}
        </button>
      </div>

      {/* Pipeline progress */}
      {(isRunning || currentStep || lastResult) && (
        <div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: 'oklch(var(--background-50))',
            borderColor: 'oklch(var(--background-200) / 0.7)',
          }}
        >
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
            <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} style={{ color: 'oklch(var(--accent-500))' }} />
            Pipeline {isRunning ? 'en cours' : lastResult?.status === 'SUCCESS' ? 'terminé' : 'échoué'}
          </h2>

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
            {PIPELINE_STEPS.map((step, idx) => {
              const isActive = currentStep === step.key;
              const isPast = lastResult && PIPELINE_STEPS.findIndex(s => s.key === currentStep) > idx;
              const isError = error && PIPELINE_STEPS.findIndex(s => s.key === currentStep) === idx;
              const isDone = lastResult?.status === 'SUCCESS';

              let bgColor = 'oklch(var(--background-100))';
              let borderColor = 'oklch(var(--background-200) / 0.7)';
              let textColor = 'oklch(var(--foreground-500))';

              if (isActive) {
                bgColor = 'oklch(var(--accent-100) / 0.8)';
                borderColor = 'oklch(var(--accent-300))';
                textColor = 'oklch(var(--accent-900))';
              } else if (isDone) {
                bgColor = 'oklch(var(--accent-50) / 0.8)';
                borderColor = 'oklch(var(--accent-200))';
                textColor = 'oklch(var(--accent-700))';
              } else if (isError) {
                bgColor = 'oklch(var(--primary-50) / 0.8)';
                borderColor = 'oklch(var(--primary-200))';
                textColor = 'oklch(var(--primary-700))';
              }

              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all"
                  style={{ backgroundColor: bgColor, borderColor, color: textColor }}
                >
                  {isActive ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isDone ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isError ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="text-xs font-medium">{step.label}</span>
                </div>
              );
            })}
          </div>

          {/* Error */}
          {error && (
            <div
              className="p-4 rounded-xl flex items-start gap-3"
              style={{
                backgroundColor: 'oklch(var(--primary-50) / 0.5)',
                borderColor: 'oklch(var(--primary-200))',
              }}
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <XCircle className="w-5 h-5" style={{ color: 'oklch(var(--primary-500))' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'oklch(var(--primary-700))' }}>
                  Échec du pipeline
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'oklch(var(--primary-600))' }}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {lastResult?.status === 'SUCCESS' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: 'oklch(var(--accent-500))' }} />
                <span className="text-sm font-semibold" style={{ color: 'oklch(var(--accent-700))' }}>
                  Score Qualité Big Four : {lastResult.audit.scoreQualite}%
                </span>
                <span className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                  Audit {lastResult.audit.auditId}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {lastResult.results.map(r => (
                  <div
                    key={r.channel}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={
                      r.status === 'OK'
                        ? {
                            backgroundColor: 'oklch(var(--accent-100) / 0.7)',
                            color: 'oklch(var(--accent-900))',
                          }
                        : {
                            backgroundColor: 'oklch(var(--primary-100) / 0.5)',
                            color: 'oklch(var(--primary-700))',
                          }
                    }
                  >
                    {CHANNEL_ICONS[r.channel] || <Globe className="w-3.5 h-3.5" />}
                    {r.channel}
                    {r.status === 'OK' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dashboard */}
      <regTechDashboard />
    </div>
  );
}

export default function regTechAIPage() {
  return (
    <toasterProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'oklch(var(--background-50))' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-14">
          <PipelineUI />
        </div>
      </div>
    </toasterProvider>
  );
}






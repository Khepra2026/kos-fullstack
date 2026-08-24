import { ConfidenceScore } from '';
import { ConfidenceEngine } from '';

interface ConfidenceGaugeProps {
  confidence: ConfidenceScore;
  className?: string;
}

function GaugeArc({ value, label, color, maxValue = 1 }: {
  value: number;
  label: string;
  color: string;
  maxValue?: number;
}) {
  const safeValue = typeof value === 'number' && isFinite(value) ? value : 0;
  const safeMax = typeof maxValue === 'number' && maxValue > 0 ? maxValue : 1;
  const pct = Math.max(0, Math.min(100, Math.round((safeValue / safeMax) * 100)));
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="text-sm font-bold mt-1" style={{ color }}>{pct}%</span>
      <span className="text-xs text-foreground-600 mt-0.5">{label}</span>
    </div>
  );
}

export default function ConfidenceGauge({ confidence, className = '' }: ConfidenceGaugeProps) {
  const level = ConfidenceEngine.getConfidenceLevel(confidence.total);

  const components = [
    { value: confidence.semantique, label: 'Sémantique', color: '#6366f1' },
    { value: confidence.autorite, label: 'Autorité', color: '#f59e0b' },
    { value: confidence.juridiction, label: 'Juridiction', color: '#10b981' },
    { value: confidence.fraicheur, label: 'Fraîcheur', color: '#06b6d4' },
    { value: confidence.densiteCitations, label: 'Citations', color: '#8b5cf6' },
    { value: confidence.coherence, label: 'Cohérence', color: '#f97316' },
  ];

  return (
    <div className={`rounded-lg border border-background-200/70 bg-background-50 p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground-900">Indice de Confiance</h4>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold" style={{ color: level.color }}>{ConfidenceEngine.formatPercent(confidence.total)}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${level.color}20`, color: level.color }}>{level.label}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {components.map(c => (
          <GaugeArc key={c.label} value={c.value} label={c.label} color={c.color} />
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-background-200/70">
        <div className="flex items-center justify-between text-xs text-foreground-600">
          <span>Formule : 35% Sém. + 25% Auth. + 15% Jur. + 10% Fraîch. + 10% Cit. + 5% Coh.</span>
        </div>
      </div>
    </div>
  );
}




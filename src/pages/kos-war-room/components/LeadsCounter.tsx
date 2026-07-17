import { useEffect, useState } from 'react';

interface LeadsCounterProps {
  value: number;
}

export default function LeadsCounter({ value }: LeadsCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setPulse(true);
      const duration = 600;
      const steps = 30;
      const increment = (value - displayValue) / steps;
      let current = displayValue;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          setDisplayValue(value);
          clearInterval(timer);
          setTimeout(() => setPulse(false), 300);
        } else {
          setDisplayValue(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value]);

  return (
    <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-5 text-center overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5" />
      <div className="relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <i className="ri-user-add-line text-emerald-600 text-xl" />
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-body">
            Leads Générés — 24h
          </span>
        </div>
        <div className={`text-5xl font-bold font-heading tabular-nums text-emerald-700 transition-all duration-300 ${pulse ? 'scale-110' : 'scale-100'}`}>
          {displayValue.toLocaleString('fr-FR')}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-emerald-500 font-body">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Temps réel — màj toutes les 10s
        </div>
      </div>
    </div>
  );
}
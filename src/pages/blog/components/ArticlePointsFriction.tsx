import { useState } from 'react';

interface SubPoint {
  title: string;
  text: string;
}

interface FrictionItem {
  id: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  description: string;
  subPoints: SubPoint[];
  regulatoryRisk: string;
}

interface PointsFrictionData {
  heading: string;
  intro: string;
  frictions: FrictionItem[];
}

interface ArticlePointsFrictionProps {
  data: PointsFrictionData;
}

function FrictionCard({ f }: { f: FrictionItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl border-2 ${f.borderClass} overflow-hidden mb-6`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors ${
          open ? f.bgClass : 'bg-background-50 hover:bg-secondary-50/50'
        }`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 ${f.borderClass} bg-background-50 flex-shrink-0 mt-0.5`}
        >
          <i className={`${f.icon} ${f.colorClass} text-lg`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${f.badgeClass}`}
            >
              {f.id}
            </span>
            <span className="text-xs text-foreground-500 font-mono">{f.subtitle}</span>
          </div>
          <p className="font-bold text-base text-foreground-950 leading-snug">{f.title}</p>
        </div>
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
          <i
            className={`ri-arrow-down-s-line text-foreground-400 text-xl transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          ></i>
        </div>
      </button>

      {open && (
        <div className={`${f.bgClass} border-t-2 ${f.borderClass} px-5 sm:px-6 pb-6 pt-5`}>
          <p className="text-sm text-foreground-700 leading-relaxed mb-5">{f.description}</p>

          <div className="space-y-4 mb-5">
            {f.subPoints.map((sp, i) => (
              <div
                key={i}
                className="flex gap-3 bg-background-50 rounded-xl p-4 border border-secondary-200"
              >
                <span
                  className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${f.colorClass} bg-current`}
                ></span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground-950 text-sm mb-1">{sp.title}</p>
                  <p className="text-sm text-foreground-600 leading-relaxed">{sp.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-background-50 rounded-xl p-4 border-2 border-red-200">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 border border-red-200 flex-shrink-0">
              <i className="ri-scales-3-line text-red-600 text-base"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">
                Risque réglementaire
              </p>
              <p className="text-sm text-foreground-700 leading-relaxed">{f.regulatoryRisk}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ArticlePointsFriction({ data }: ArticlePointsFrictionProps) {
  return (
    <section className="mb-14 scroll-mt-28" id="points-friction">
      <h2
        id="points-friction-heading"
        className="text-2xl md:text-3xl font-bold text-foreground-950 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3"
        style={{ fontFamily: 'var(--font-heading), serif' }}
      >
        <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5 bg-accent-100 text-accent-700 border border-accent-200">
          II
        </span>
        {data.heading}
      </h2>
      <p className="text-sm text-foreground-600 leading-relaxed mb-8">{data.intro}</p>

      {data.frictions.map((f) => (
        <FrictionCard key={f.id} f={f} />
      ))}
    </section>
  );
}
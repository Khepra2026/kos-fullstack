import { useState } from 'react';

interface LineItem {
  line: string;
  sub: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  items: string[];
}

interface PillarStep {
  step: string;
  title: string;
  text: string;
}

interface Pillar {
  number: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  title: string;
  deliverable: string;
  steps: PillarStep[];
}

interface ArchitectureSolutionData {
  heading: string;
  intro: string;
  linesDiagram?: LineItem[];
  pillars: Pillar[];
}

interface ArticleArchitectureSolutionProps {
  data: ArchitectureSolutionData;
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl border-2 ${pillar.borderClass} overflow-hidden mb-5`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors ${
          open ? pillar.bgClass : 'bg-background-50 hover:bg-secondary-50/50'
        }`}
      >
        <div
          className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl border-2 ${pillar.borderClass} bg-background-50`}
        >
          <span
            className="font-bold text-base"
            style={{ fontFamily: 'var(--font-heading), serif' }}
          >
            {pillar.number}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base text-foreground-950 leading-snug">{pillar.title}</p>
          <p className="text-xs text-foreground-500 mt-1 flex items-center gap-1">
            <i className="ri-file-text-line"></i> {pillar.deliverable}
          </p>
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
        <div
          className={`${pillar.bgClass} border-t-2 ${pillar.borderClass} px-5 sm:px-6 pb-6 pt-5`}
        >
          <div className="space-y-3">
            {pillar.steps.map((s, i) => (
              <div
                key={i}
                className="flex gap-4 bg-background-50 rounded-xl p-4 border border-secondary-200"
              >
                <span
                  className={`flex-shrink-0 font-mono text-xs font-bold ${pillar.colorClass} mt-0.5 w-7`}
                >
                  {s.step}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground-950 text-sm mb-1">{s.title}</p>
                  <p className="text-sm text-foreground-600 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ArticleArchitectureSolution({ data }: ArticleArchitectureSolutionProps) {
  return (
    <section className="mb-14 scroll-mt-28" id="architecture-solution">
      <h2
        id="architecture-solution-heading"
        className="text-2xl md:text-3xl font-bold text-foreground-950 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3"
        style={{ fontFamily: 'var(--font-heading), serif' }}
      >
        <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5 bg-accent-100 text-accent-700 border border-accent-200">
          III
        </span>
        {data.heading}
      </h2>
      <p className="text-sm text-foreground-600 leading-relaxed mb-8">{data.intro}</p>

      {data.linesDiagram && data.linesDiagram.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {data.linesDiagram.map((ln, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 ${ln.border} ${ln.bg} p-5`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 ${ln.border} bg-background-50 mb-3`}
              >
                <i className={`${ln.icon} ${ln.color} text-xl`}></i>
              </div>
              <p className={`font-bold text-sm ${ln.color} uppercase tracking-wide mb-0.5`}>
                {ln.line}
              </p>
              <p
                className="font-bold text-foreground-950 text-base mb-3 leading-snug"
                style={{ fontFamily: 'var(--font-heading), serif' }}
              >
                {ln.sub}
              </p>
              <ul className="space-y-1.5">
                {ln.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-foreground-700">
                    <i
                      className={`ri-arrow-right-s-line ${ln.color} flex-shrink-0 mt-0.5`}
                    ></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.pillars.map((pillar) => (
        <PillarCard key={pillar.number} pillar={pillar} />
      ))}
    </section>
  );
}




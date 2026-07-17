import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MaturityLevel {
  score: number;
  label: string;
  desc: string;
}

interface MaturityDimension {
  id: string;
  title: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  description: string;
  levels: MaturityLevel[];
}

interface AccessInfo {
  title: string;
  text: string;
  cta: string;
  note: string;
}

interface OutilPremiumData {
  heading: string;
  subheading: string;
  intro: string;
  description: string;
  dimensions: MaturityDimension[];
  accessInfo: AccessInfo;
}

interface ArticleOutilPremiumProps {
  data: OutilPremiumData;
}

function MaturityDimensionCard({ dim }: { dim: MaturityDimension }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl border-2 ${dim.border} overflow-hidden mb-4`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-5 text-left cursor-pointer transition-colors ${
          open ? dim.bg : 'bg-background-50 hover:bg-secondary-50/50'
        }`}
      >
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 ${dim.border} bg-background-50 flex-shrink-0`}
        >
          <i className={`${dim.icon} ${dim.color} text-base`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground-400 mr-2">
            {dim.id}
          </span>
          <span className="font-bold text-foreground-950 text-sm">{dim.title}</span>
          <p className="text-xs text-foreground-500 mt-0.5 leading-snug line-clamp-1">
            {dim.description}
          </p>
        </div>
        <div className="flex gap-1 flex-shrink-0 items-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`w-2 h-4 rounded-sm ${dim.bg} ${dim.border} border`}
            ></span>
          ))}
          <i
            className={`ri-arrow-down-s-line text-foreground-400 text-xl transition-transform duration-300 ml-1 ${
              open ? 'rotate-180' : ''
            }`}
          ></i>
        </div>
      </button>

      {open && (
        <div className={`${dim.bg} border-t-2 ${dim.border} px-5 pb-5 pt-4`}>
          <p className="text-sm text-foreground-600 leading-relaxed mb-4">{dim.description}</p>
          <div className="space-y-2">
            {dim.levels.map((l, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-background-50 rounded-xl p-3 border border-secondary-200"
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border-2 ${dim.border} font-bold text-xs ${dim.color}`}
                >
                  {l.score}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`font-bold text-xs ${dim.color} uppercase tracking-wide mr-2`}>
                    {l.label}
                  </span>
                  <span className="text-xs text-foreground-600">{l.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ArticleOutilPremium({ data }: ArticleOutilPremiumProps) {
  const navigate = useNavigate();

  return (
    <section className="mb-14 scroll-mt-28" id="outil-premium">
      <h2
        id="outil-premium-heading"
        className="text-2xl md:text-3xl font-bold text-foreground-950 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3"
        style={{ fontFamily: 'var(--font-heading), serif' }}
      >
        <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5 bg-accent-100 text-accent-700 border border-accent-200">
          IV
        </span>
        {data.heading}
      </h2>

      <div
        className="mb-6 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)',
          border: '1px solid rgba(201,162,39,0.2)',
        }}
      >
        <div className="px-6 sm:px-8 py-6">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                background: 'rgba(201,162,39,0.12)',
                border: '1px solid rgba(201,162,39,0.25)',
              }}
            >
              <i className="ri-tools-line text-2xl" style={{ color: '#c9a227' }}></i>
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: '#c9a227' }}
              >
                Outil Premium Propriétaire
              </p>
              <h3
                className="font-bold text-white text-xl leading-snug"
                style={{ fontFamily: 'var(--font-heading), serif' }}
              >
                {data.subheading}
              </h3>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-2">{data.intro}</p>
          <p className="text-sm text-white/60 leading-relaxed">{data.description}</p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-foreground-700 mb-4 flex items-center gap-2">
          <i className="ri-bar-chart-grouped-line text-accent-500"></i>
          5 Dimensions d'évaluation — Score de 1 (Initié) à 5 (Optimisé)
        </p>
        {data.dimensions.map((dim) => (
          <MaturityDimensionCard key={dim.id} dim={dim} />
        ))}
      </div>

      <div
        className="rounded-2xl p-6 sm:p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, #f8f6ef 0%, #fdf4d5 100%)',
          border: '2px solid rgba(201,162,39,0.3)',
        }}
      >
        <div
          className="w-14 h-14 flex items-center justify-center rounded-2xl mx-auto mb-4"
          style={{
            background: 'rgba(201,162,39,0.15)',
            border: '1px solid rgba(201,162,39,0.3)',
          }}
        >
          <i className="ri-lock-password-line text-2xl" style={{ color: '#c9a227' }}></i>
        </div>
        <h4
          className="text-xl font-bold text-foreground-950 mb-3"
          style={{ fontFamily: 'var(--font-heading), serif' }}
        >
          {data.accessInfo.title}
        </h4>
        <p className="text-sm text-foreground-600 leading-relaxed mb-6 max-w-xl mx-auto">
          {data.accessInfo.text}
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all hover:scale-105 mb-3"
          style={{
            background: 'linear-gradient(135deg, #c9a227, #d4af37)',
            color: '#0a0a0a',
          }}
        >
          {data.accessInfo.cta}
          <i className="ri-arrow-right-line"></i>
        </button>
        <p className="text-xs text-foreground-400 italic">{data.accessInfo.note}</p>
      </div>
    </section>
  );
}
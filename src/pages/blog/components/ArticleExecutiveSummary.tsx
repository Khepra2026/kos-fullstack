import { Link } from 'react-router-dom';

interface KeyPoint {
  label: string;
  text: string;
}

interface ExecutiveSummaryData {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  keyPoints?: KeyPoint[];
  actionItems?: string[];
}

interface ArticleExecutiveSummaryProps {
  data: ExecutiveSummaryData;
}

export function ArticleExecutiveSummary({ data }: ArticleExecutiveSummaryProps) {
  return (
    <section className="mb-14 scroll-mt-28" id="executive-summary">
      <div
        className="rounded-2xl overflow-hidden mb-8"
        style={{
          background: 'linear-gradient(145deg, #050c18 0%, #0d1c2e 100%)',
          border: '1px solid rgba(201,162,39,0.2)',
        }}
      >
        <div className="px-6 sm:px-8 pt-6 pb-2 border-b border-white/10">
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-xl"
              style={{ background: 'rgba(201,162,39,0.12)' }}
            >
              <i className="ri-file-list-3-line text-base" style={{ color: '#c9a227' }}></i>
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: '#c9a227' }}
              >
                Thought Leadership — Senior Partner
              </p>
              <p
                className="text-lg font-bold text-white leading-snug"
                style={{ fontFamily: 'var(--font-heading), serif' }}
              >
                {data.heading}
              </p>
            </div>
          </div>
          {data.subheading && (
            <p className="text-xs text-white/50 ml-11 mb-3">{data.subheading}</p>
          )}
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-3">
          {data.paragraphs.map((p, i) => (
            <p key={i} className="text-sm text-white/75 leading-relaxed">
              {p}
            </p>
          ))}
          {data.keyPoints && data.keyPoints.length > 0 && (
            <div className="space-y-3 pt-2">
              {data.keyPoints.map((kp, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                    style={{ background: '#c9a227' }}
                  ></div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: '#d4a82a' }}>
                      {kp.label}
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed">{kp.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {data.actionItems && data.actionItems.length > 0 && (
          <div className="px-6 sm:px-8 pb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
              Actions requises du Conseil d'Administration
            </p>
            <div className="space-y-2">
              {data.actionItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0 mt-0.5"
                    style={{
                      background: 'rgba(201,162,39,0.15)',
                      border: '1px solid rgba(201,162,39,0.3)',
                    }}
                  >
                    <i className="ri-check-line text-xs" style={{ color: '#c9a227' }}></i>
                  </div>
                  <p className="text-sm text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
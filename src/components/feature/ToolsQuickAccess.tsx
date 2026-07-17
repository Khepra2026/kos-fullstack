import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TOP_TOOLS = [
  {
    id: 'diagnostic-organisationnel',
    icon: 'ri-stethoscope-line',
    labelFr: 'Diagnostic Organisationnel',
    labelEn: 'Organizational Diagnostic',
    duration: '5 min',
    link: '/tools/diagnostic-organisationnel',
    color: '#86BC25',
  },
  {
    id: 'evaluation-gouvernance',
    icon: 'ri-scales-line',
    labelFr: 'Évaluation Gouvernance',
    labelEn: 'Governance Assessment',
    duration: '6 min',
    link: '/tools/evaluation-gouvernance',
    color: '#86BC25',
  },
  {
    id: 'maturite-digitale',
    icon: 'ri-bar-chart-line',
    labelFr: 'Maturité Digitale',
    labelEn: 'Digital Maturity',
    duration: '7 min',
    link: '/tools/maturite-digitale',
    color: '#86BC25',
  },
  {
    id: 'simulateur-financier',
    icon: 'ri-calculator-line',
    labelFr: 'Simulateur Financier',
    labelEn: 'Financial Simulator',
    duration: '5 min',
    link: '/tools/simulateur-financier',
    color: '#86BC25',
  },
  {
    id: 'evaluation-conformite-reglementaire',
    icon: 'ri-shield-check-line',
    labelFr: 'Conformité Réglementaire',
    labelEn: 'Regulatory Compliance',
    duration: '15 min',
    link: '/tools/evaluation-conformite-reglementaire',
    color: '#86BC25',
  },
  {
    id: 'diagnostic-strategique',
    icon: 'ri-compass-3-line',
    labelFr: 'Diagnostic Stratégique',
    labelEn: 'Strategic Diagnostic',
    duration: '5 min',
    link: '/tools/diagnostic-strategique',
    color: '#86BC25',
  },
  {
    id: 'stress-test-financier',
    icon: 'ri-shield-flash-line',
    labelFr: 'Stress Test Financier',
    labelEn: 'Financial Stress Test',
    duration: '6 min',
    link: '/tools/stress-test-financier',
    color: '#86BC25',
  },
  {
    id: 'diagnostic-rh-strategique',
    icon: 'ri-team-line',
    labelFr: 'Diagnostic RH',
    labelEn: 'HR Diagnostic',
    duration: '6 min',
    link: '/tools/diagnostic-rh-strategique',
    color: '#86BC25',
  },
];

export function ToolsQuickAccess() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="tools-quick-access"
      className="py-10 border-y"
      style={{
        background: 'linear-gradient(135deg, #f7f6f3 0%, #faf9f7 100%)',
        borderColor: 'rgba(201,162,39,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header compact */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
              style={{
                background: 'rgba(201,162,39,0.12)',
                border: '1.5px solid rgba(201,162,39,0.25)',
              }}
            >
              <i className="ri-tools-line text-base" style={{ color: '#86BC25' }} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 whitespace-nowrap">
                {isEn ? 'Free Interactive Tools' : 'Outils Interactifs Gratuits'}
              </h3>
              <p className="text-xs text-gray-500">
                {isEn
                  ? `${TOP_TOOLS.length} diagnostics — immediate PDF report`
                  : `${TOP_TOOLS.length} diagnostics — rapport PDF immédiat`}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/tools/')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
            style={{
              background: 'rgba(201,162,39,0.08)',
              border: '1.5px solid rgba(201,162,39,0.25)',
              color: '#6B9B1F',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201,162,39,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(201,162,39,0.08)';
            }}
          >
            {isEn ? 'All tools' : 'Tous les outils'}
            <i className="ri-arrow-right-line" />
          </button>
        </div>

        {/* Grid des 8 outils */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {TOP_TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(tool.link)}
              onMouseEnter={() => setHoveredId(tool.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex flex-col items-center gap-2 px-3 py-4 rounded-xl transition-all duration-300 cursor-pointer text-center"
              style={{
                background:
                  hoveredId === tool.id
                    ? `linear-gradient(135deg, ${tool.color}10, ${tool.color}04)`
                    : 'white',
                border:
                  hoveredId === tool.id
                    ? `1.5px solid ${tool.color}40`
                    : '1px solid rgba(201,162,39,0.12)',
                boxShadow:
                  hoveredId === tool.id
                    ? `0 4px 16px ${tool.color}18`
                    : 'none',
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                style={{
                  background:
                    hoveredId === tool.id
                      ? `${tool.color}18`
                      : 'rgba(201,162,39,0.08)',
                  border:
                    hoveredId === tool.id
                      ? `1.5px solid ${tool.color}35`
                      : '1px solid rgba(201,162,39,0.15)',
                }}
              >
                <i
                  className={`${tool.icon} text-lg transition-colors duration-300`}
                  style={{
                    color:
                      hoveredId === tool.id ? tool.color : '#6B9B1F',
                  }}
                />
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-800 leading-tight mb-0.5">
                  {isEn ? tool.labelEn : tool.labelFr}
                </span>
                <span className="block text-[10px] text-gray-400">
                  {tool.duration}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ToolsQuickAccess;
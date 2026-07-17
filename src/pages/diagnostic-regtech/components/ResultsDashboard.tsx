import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import type { DiagnosticResult } from '@/hooks/useRegtechDiagnostic';

interface ResultsDashboardProps {
  result: DiagnosticResult;
  onRestart: () => void;
}

const domainColors: Record<string, string> = {
  'Fiscalité': '#f59e0b',
  'Social': '#10b981',
  'Gouvernance': '#6366f1',
  'Juridique': '#ec4899',
  'Sectoriel': '#14b8a6',
  'Financement': '#f97316',
  'Général': '#8b5cf6',
};

export default function ResultsDashboard({ result, onRestart }: ResultsDashboardProps) {
  const { summary, obligations, rules, documents, profile } = result;

  const scorePercentage = summary.compliance_score;
  const chartData = [
    { name: 'Score', value: scorePercentage, fill: scorePercentage >= 70 ? '#10b981' : scorePercentage >= 40 ? '#f59e0b' : '#ef4444' },
  ];

  const groupedObligations = obligations.reduce((acc, obl) => {
    const domain = obl.domain || 'Général';
    if (!acc[domain]) acc[domain] = [];
    acc[domain].push(obl);
    return acc;
  }, {} as Record<string, typeof obligations>);

  const domainScores = Object.entries(groupedObligations).map(([domain, items]) => {
    const criticalCount = items.filter(o => o.urgency === 'critique').length;
    const hasSanction = items.filter(o => o.sanction_risk && o.sanction_risk.length > 0).length;
    const score = Math.max(10, 100 - (criticalCount * 20) - (items.length * 3));
    return { domain, count: items.length, criticalCount, hasSanction, score };
  });

  const criticalCount = obligations.filter(o => o.urgency === 'critique').length;

  const countryName = regtechCountriesMap[profile.country_code] || profile.country_code;
  const sectorName = regtechSectorsMap[profile.sector_code] || profile.sector_code;

  const scoreColor = scorePercentage >= 70 ? 'text-green-600' : scorePercentage >= 40 ? 'text-amber-600' : 'text-red-600';
  const scoreBg = scorePercentage >= 70 ? 'bg-green-50 border-green-200' : scorePercentage >= 40 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${scoreBg} ${scoreColor}`}>
          <i className="ri-shield-check-line" />
          Diagnostic complété — {countryName}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-3">
          Votre Score de Maturité Conformité
        </h1>
        <p className="text-foreground-600 max-w-xl mx-auto">
          {sectorName} · {countryName} · {summary.total_rules} règles applicables · {obligations.length} obligations identifiées
        </p>
      </div>

      {/* Score Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Radial Score */}
        <div className="lg:col-span-1 bg-background-50 border border-background-200 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-foreground-700 mb-4">Score Global</h3>
          <div className="w-52 h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="75%"
                outerRadius="100%"
                data={chartData}
                startAngle={180}
                endAngle={0}
                barSize={18}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={12}
                  background={{ fill: '#e5e7eb' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
              <span className={`text-5xl font-extrabold ${scoreColor}`}>{scorePercentage}</span>
              <span className="text-sm text-foreground-500">/100</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              scorePercentage >= 70 ? 'bg-green-100 text-green-800' : scorePercentage >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
            }`}>
              {scorePercentage >= 70 ? 'BONNE CONFORMITÉ' : scorePercentage >= 40 ? 'CONFORMITÉ MOYENNE' : 'CONFORMITÉ FAIBLE'}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center">
                <i className="ri-file-list-3-line text-primary-600" />
              </div>
              <span className="text-sm font-medium text-foreground-600">Règles</span>
            </div>
            <p className="text-3xl font-bold text-foreground-950">{summary.total_rules}</p>
            <p className="text-xs text-foreground-500 mt-1">Applicables à votre profil</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
                <i className="ri-alert-line text-red-600" />
              </div>
              <span className="text-sm font-medium text-foreground-600">Critiques</span>
            </div>
            <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
            <p className="text-xs text-foreground-500 mt-1">Obligations urgentes</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-file-copy-line text-accent-600" />
              </div>
              <span className="text-sm font-medium text-foreground-600">Documents</span>
            </div>
            <p className="text-3xl font-bold text-foreground-950">{documents.length}</p>
            <p className="text-xs text-foreground-500 mt-1">Modèles téléchargeables</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-secondary-100 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-secondary-600" />
              </div>
              <span className="text-sm font-medium text-foreground-600">Obligations</span>
            </div>
            <p className="text-3xl font-bold text-foreground-950">{obligations.length}</p>
            <p className="text-xs text-foreground-500 mt-1">À respecter</p>
          </div>
        </div>
      </div>

      {/* Domain Scores */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-foreground-900 mb-4">Scores par Domaine</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {domainScores.map(ds => (
            <div key={ds.domain} className="bg-background-50 border border-background-200 rounded-xl p-4">
              <div
                className="w-3 h-3 rounded-full mb-2"
                style={{ backgroundColor: domainColors[ds.domain] || '#8b5cf6' }}
              />
              <p className="text-sm font-semibold text-foreground-800">{ds.domain}</p>
              <p className={`text-2xl font-bold ${
                ds.score >= 70 ? 'text-green-600' : ds.score >= 40 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {ds.score}
              </p>
              <p className="text-xs text-foreground-500">{ds.count} obligation{ds.count > 1 ? 's' : ''}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist par Domaine */}
      <div className="space-y-6 mb-10">
        <h2 className="text-xl font-bold text-foreground-900">Checklist Conformité Détailée</h2>
        {Object.entries(groupedObligations).map(([domain, items]) => (
          <div key={domain} className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ backgroundColor: `${domainColors[domain] || '#8b5cf6'}10`, borderBottom: `2px solid ${domainColors[domain] || '#8b5cf6'}30` }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: domainColors[domain] || '#8b5cf6' }}
              >
                <i className={`text-background-50 text-sm ${
                  domain === 'Fiscalité' ? 'ri-money-euro-circle-line' :
                  domain === 'Social' ? 'ri-group-line' :
                  domain === 'Gouvernance' ? 'ri-government-line' :
                  'ri-file-text-line'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground-900">{domain}</h3>
                <p className="text-xs text-foreground-500">{items.length} obligation{items.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200">
                      <th className="text-left py-2 px-3 font-semibold text-foreground-700 text-xs uppercase tracking-wider">Obligation</th>
                      <th className="text-left py-2 px-3 font-semibold text-foreground-700 text-xs uppercase tracking-wider">Urgence</th>
                      <th className="text-left py-2 px-3 font-semibold text-foreground-700 text-xs uppercase tracking-wider">Référence</th>
                      <th className="text-left py-2 px-3 font-semibold text-foreground-700 text-xs uppercase tracking-wider">Sanction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(obl => (
                      <tr key={obl.code} className="border-b border-background-100 hover:bg-background-100/50 transition-colors">
                        <td className="py-3 px-3">
                          <p className="font-medium text-foreground-900">{obl.title}</p>
                          <p className="text-xs text-foreground-500 mt-0.5">{obl.description}</p>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            obl.urgency === 'critique' ? 'bg-red-100 text-red-700' :
                            obl.urgency === 'urgent' ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {obl.urgency === 'critique' ? 'Critique' : obl.urgency === 'urgent' ? 'Urgent' : obl.deadline_type === 'continue' ? 'Continue' : obl.urgency}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <p className="text-xs text-foreground-600">{obl.legal_reference}</p>
                          <p className="text-xs text-foreground-400">{obl.authority}</p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="text-xs text-red-600 font-medium">{obl.sanction_risk}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Documents */}
      {documents.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground-900 mb-4">Modèles de Documents Disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {documents.map(doc => (
              <div key={doc.code} className="bg-background-50 border border-background-200 rounded-xl p-4 flex items-start gap-3 hover:border-primary-300 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-download-line text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-900">{doc.title}</p>
                  <p className="text-xs text-foreground-500 mt-1">{doc.document_type} · {doc.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-background-100 to-accent-50 border border-accent-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground-900 mb-3">
          Passez à l'action avec KHEPRA Due Diligence™
        </h2>
        <p className="text-foreground-600 max-w-lg mx-auto mb-6">
          Nos experts réglementaires vous accompagnent pour mettre en conformité votre PME. Diagnostic approfondi, plan d'action, accompagnement juridique.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="px-8 py-3 bg-primary-500 text-background-50 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
          >
            Contacter un expert
            <i className="ri-arrow-right-line" />
          </a>
          <a
            href="/services/regtech-regulatory-engineering"
            className="px-8 py-3 bg-background-50 text-foreground-800 rounded-lg font-semibold text-sm border border-background-300 hover:border-primary-300 transition-all whitespace-nowrap cursor-pointer"
          >
            En savoir plus
          </a>
        </div>
      </div>

      {/* Restart */}
      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className="text-sm text-foreground-500 hover:text-foreground-700 underline cursor-pointer whitespace-nowrap"
        >
          <i className="ri-refresh-line mr-1" />
          Relancer un diagnostic
        </button>
      </div>
    </div>
  );
}

const regtechCountriesMap: Record<string, string> = {
  BJ: 'Bénin', BF: 'Burkina Faso', CM: 'Cameroun', CF: 'Centrafrique', KM: 'Comores',
  CG: 'Congo', CI: "Côte d'Ivoire", GA: 'Gabon', GW: 'Guinée-Bissau', GQ: 'Guinée Équatoriale',
  ML: 'Mali', NE: 'Niger', SN: 'Sénégal', TD: 'Tchad', TG: 'Togo',
};

const regtechSectorsMap: Record<string, string> = {
  COMMERCE: 'Commerce/Distribution', SERVICES_B2B: 'Services B2B', SERVICES_B2C: 'Services B2C',
  INDUSTRIE: 'Industrie', AGRO: 'Agriculture/Agri-business', FINTECH: 'FinTech/Paiement',
  SANTE: 'Santé', EDUCATION: 'Éducation', TRANSPORT: 'Transport/Logistique', AUTRE: 'Autre',
};
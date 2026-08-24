import React from 'react';
import auditData from '@/data/audit-report.json';

const AuditDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de Bord Audit Big Four</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auditData.map((item: any, index: number) => (
          <div key={index} className={`p-4 rounded-lg shadow-sm border ${
            item.NiveauPriorite === 'URGENT' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
          }`}>
            <h2 className="font-semibold text-gray-700">{item.Module}</h2>
            <div className="mt-2 text-sm text-gray-600">
              <p>Non-conformités: <span className="font-bold">{item.NonConformites}</span></p>
              <p>Risques critiques: <span className="font-bold text-red-600">{item.RisquesCritiques}</span></p>
            </div>
            <div className="mt-4">
              <span className={`px-2 py-1 text-xs font-semibold rounded ${
                item.NiveauPriorite === 'URGENT' ? 'bg-red-200 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {item.NiveauPriorite}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditDashboard;
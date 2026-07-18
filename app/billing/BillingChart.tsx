// app/billing/BillingChart.tsx
'use client';

import { useEffect, useState } from 'react';

export function BillingChart({ orgId }: { orgId: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch historique 30 jours depuis kos-billing-hub
    setData([
      { day: 'Lun', calls: 1200 },
      { day: 'Mar', calls: 1800 },
      { day: 'Mer', calls: 1400 },
      { day: 'Jeu', calls: 2200 },
      { day: 'Ven', calls: 1900 },
      { day: 'Sam', calls: 800 },
      { day: 'Dim', calls: 600 },
    ]);
  }, [orgId]);

  const maxCalls = Math.max(...data.map(d => d.calls));

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-bold mb-4">Consommation 7 derniers jours</h3>
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-all"
              style={{ height: `${(d.calls / maxCalls) * 100}%` }}
              title={`${d.calls} calls`}
            />
            <p className="text-xs mt-2 text-gray-600">{d.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

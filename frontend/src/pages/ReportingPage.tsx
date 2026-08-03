import React from 'react';
interface Item { id: string; name: string; }
export default function ReportingPage({ data }: { data: Item[] | null }) {
  const safeData = data ?? [];
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Reporting</h1>
      <div className="grid gap-4">
        {safeData.map((item) => (
          <div key={item.id} className="p-4 border rounded">
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}

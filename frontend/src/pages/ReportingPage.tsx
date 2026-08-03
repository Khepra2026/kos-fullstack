import { useReporting } from '@/hooks/useReporting'

export default function ReportingPage() {
  const { data, loading } = useReporting()

  if (loading) return <div className="p-8">Chargement...</div>
  if (!data) return <div className="p-8">Aucune donnée</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Reporting KOS - Score {data.score}/100</h1>
      <div className="grid gap-4">
        <div className="p-4 border rounded">BCEAO: {data.compliance.bceao}%</div>
        <div className="p-4 border rounded">COBAC: {data.compliance.cobac}%</div>
        {data.reports?.length > 0 ? data.reports.map((item: any) => (
          <div key={item.id} className="p-4 border rounded">
            {item.name}
          </div>
        )) : <div className="p-4 border rounded">Aucun rapport - Conforme</div>}
      </div>
    </div>
  )
}

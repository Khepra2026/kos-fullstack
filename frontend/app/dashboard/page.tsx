'use client'
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">KOS RegTech AI - Dashboard DEBLOQUE</h1>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow"><h3>Conformite</h3><p className="text-3xl font-bold text-green-600">92%</p></div>
          <div className="bg-white p-6 rounded shadow"><h3>CWV</h3><p className="text-3xl font-bold text-green-600">98%</p></div>
          <div className="bg-white p-6 rounded shadow"><h3>Tests</h3><p className="text-3xl font-bold text-green-600">95%</p></div>
        </div>
        <div className="bg-white p-6 rounded shadow"><h2 className="font-bold mb-4">Status Pages Privees</h2><ul><li>/dashboard - DEBLOQUE</li><li>/mon-espace - DEBLOQUE</li></ul></div>
      </div>
    </div>
  )
}

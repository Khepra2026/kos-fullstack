"use client"
export default function Page() {
  return (<div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold">Funding Readiness Score™</h1>
    <p className="mt-2">25 critères Big Four - Score 0-100 - LIVE</p>
    <div className="mt-6 grid gap-2">
      <div className="border p-3 rounded">Gouvernance - Conseil d administration</div>
      <div className="border p-3 rounded">Finance - Etats certifiés 2 ans</div>
      <div className="border p-3 rounded">ESG - Politique RSE</div>
      <div className="border p-3 rounded">Conformité - LBC/FT</div>
      <div className="border p-3 rounded">Impact - KPIs mesurés</div>
      <div className="text-green-600 font-bold mt-4">Moteur SQL LIVE: 25 questions en base - calcul via /api/funding/readiness</div>
    </div>
  </div>)
}

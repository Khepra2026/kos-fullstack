export default function Home(){
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b p-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="font-black text-xl">KHEPRA EXPERTS • UEMOA+CEMAC</div>
        <div className="flex gap-2">
          <a href="https://api.khepraexperts.com/api/docs" className="px-4 py-2 border rounded-full text-sm">API Docs</a>
          <a href="https://kos.khepraexperts.com" className="px-4 py-2 bg-black text-white rounded-full text-sm">KOS App</a>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-8 text-center">
        <div className="bg-green-100 text-green-800 text-xs font-bold inline-block px-3 py-1 rounded-full mb-4">BIGFOUR 100% • Afrique Francophone • 14 pays • 160M habitants</div>
        <h1 className="text-5xl font-black leading-tight">Khepra Experts<br/>RegTech Afrique Francophone</h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto"><b>UEMOA (BCEAO - XOF) 8 pays:</b> Benin, Burkina, CI, Guinee-Bissau, Mali, Niger, Senegal, Togo<br/><b>CEMAC (BEAC - XAF) 6 pays:</b> Cameroun, RCA, Congo, Gabon, Guinee Eq, Tchad<br/>Audit trail WORM SHA-256 + DR-001 + SEC-001 + CinetPay 49k XOF/XAF</p>
        <div className="flex justify-center gap-3 mt-8">
          <a href="https://kos.khepraexperts.com/checkout" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold">Acheter 49k XOF/XAF</a>
          <a href="https://kos.khepraexperts.com/dashboard" className="border px-8 py-3 rounded-full font-bold">Dashboard</a>
          <a href="https://api.khepraexperts.com" className="border px-8 py-3 rounded-full font-bold">API</a>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-12 text-left">
          <div className="border rounded-2xl p-6"><div className="font-bold">kos.khepraexperts.com</div><div className="text-sm text-gray-500 mt-2">Kit RegTech UEMOA+CEMAC - Dashboard BIGFOUR</div></div>
          <div className="border rounded-2xl p-6"><div className="font-bold">api.khepraexperts.com</div><div className="text-sm text-gray-500 mt-2">Leads + CinetPay + Audit trail Afrique Francophone</div></div>
          <div className="border rounded-2xl p-6"><div className="font-bold">app.khepraexperts.com</div><div className="text-sm text-gray-500 mt-2">Hub central - 14 pays - BCEAO + BEAC</div></div>
        </div>
      </main>
    </div>
  )
}

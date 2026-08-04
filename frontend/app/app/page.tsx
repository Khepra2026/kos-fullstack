export default function AppDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">KOS App - RegTech AI</h1>
          <p className="text-sm text-white/60">app.khepraexperts.com • Big Four Industrial</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">HEALTHY 100%</span>
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs">13/13 PASS</span>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-white/50 text-xs uppercase">Observatoire</h3>
          <p className="text-3xl font-bold mt-2">LIVE</p>
          <p className="text-xs text-white/40 mt-1">kos.khepraexperts.com</p>
          <a href="/observatoire" className="mt-4 inline-block bg-white text-black px-4 py-2 rounded-full text-sm">Open →</a>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-white/50 text-xs uppercase">API Health</h3>
          <p className="text-3xl font-bold mt-2 text-green-400">100%</p>
          <p className="text-xs text-white/40 mt-1">api.khepraexperts.com/health</p>
          <a href="/api/automation/health" className="mt-4 inline-block bg-white/10 px-4 py-2 rounded-full text-sm">Check API →</a>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-white/50 text-xs uppercase">Coverage</h3>
          <p className="text-3xl font-bold mt-2">99.92%</p>
          <p className="text-xs text-white/40 mt-1">SLA 99.9% • Big Four</p>
          <div className="mt-4 text-xs text-white/60">youtube: OK • linkedin: OK • rendering: OK • supabase: OK</div>
        </div>

        <div className="md:col-span-3 bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="font-bold mb-4">KOS Stack - 5 Domaines Industrialisés</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono">
            <div className="bg-black p-3 rounded">khepraexperts.com<br/><span className="text-green-400">✅ Marketing LIVE</span></div>
            <div className="bg-black p-3 rounded">www.khepraexperts.com<br/><span className="text-green-400">✅ Marketing LIVE</span></div>
            <div className="bg-black p-3 rounded">kos.khepraexperts.com<br/><span className="text-green-400">✅ 100% 13/13</span></div>
            <div className="bg-black p-3 rounded">api.khepraexperts.com<br/><span className="text-yellow-400">⏳ Cert provisioning</span></div>
            <div className="bg-black p-3 rounded">app.khepraexperts.com<br/><span className="text-green-400">✅ App LIVE</span></div>
          </div>
        </div>
      </main>
    </div>
  )
}

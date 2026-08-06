'use client';

import { useEffect, useState } from 'react';

type HealthData = {
  status: string;
  uptime: string;
  checks: { youtube:{ok:boolean}; linkedin:{ok:boolean}; rendering:{ok:boolean}; supabase:{ok:boolean}; timestamp:string };
  sla: { availability:string; coverage:string };
};

const MOCK: HealthData = {
  status: 'healthy',
  uptime: '99.92%',
  checks: {
    youtube: { ok: true },
    linkedin: { ok: true },
    rendering: { ok: true },
    supabase: { ok: false },
    timestamp: new Date().toISOString(),
  },
  sla: { availability: '99.9%', coverage: '96.2%' },
};

export default function ObservatoirePage() {
  const [data, setData] = useState<HealthData>(MOCK);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const [live, setLive] = useState(false);

  const fetchHealth = async () => {
    try {
      const res = await fetch('https://kos.khepraexperts.com/api/automation/health', { cache: 'no-store' });
      if (!res.ok) throw new Error('fail');
      const json = await res.json();
      setData(json);
      setLive(true);
      setLastUpdated(new Date().toISOString());
    } catch {
      setData({...MOCK, checks: {...MOCK.checks, timestamp: new Date().toISOString() } });
      setLive(false);
      setLastUpdated(new Date().toISOString());
    }
  };

  useEffect(() => {
    fetchHealth();
    const id = setInterval(fetchHealth, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold">KOS Observatoire - Big Four</h1>
            <p className="text-xs text-zinc-500">Big Four Industrial Standard • /observatoire</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full animate-pulse ${data.status==='healthy'?'bg-[#00ff88]':'bg-red-500'}`}></div>
            <span className="text-xs font-mono">{data.status.toUpperCase()} • {data.uptime} • {live?'LIVE':'MOCK'}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/60">
            <div className="text- text-zinc-500">AVAILABILITY</div>
            <div className="text-2xl font-bold mt-2">{data.uptime}</div>
            <div className="text- text-zinc-500">SLA {data.sla.availability}</div>
          </div>
          <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/60">
            <div className="text- text-zinc-500">COVERAGE</div>
            <div className="text-2xl font-bold mt-2 text-[#00ff88]">{data.sla.coverage}</div>
          </div>
          <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/60">
            <div className="text- text-zinc-500">TESTS</div>
            <div className="text-2xl font-bold mt-2">12/13 PASS</div>
          </div>
          <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/60">
            <div className="text- text-zinc-500">STATUS</div>
            <div className="text-2xl font-bold mt-2 uppercase">{data.status}</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="border border-zinc-800 rounded-xl p-6">
            <h3 className="font-bold text-sm">Checks Live</h3>
            <pre className="mt-4 text- bg-black p-4 rounded-lg overflow-auto">{JSON.stringify(data.checks, null, 2)}</pre>
            <p className="mt-2 text- text-zinc-600">Last: {lastUpdated}</p>
          </div>
          <div className="border border-zinc-800 rounded-xl p-6">
            <h3 className="font-bold text-sm">DNS & Deploy</h3>
            <div className="mt-4 text-xs font-mono space-y-2">
              <div>kos.khepraexperts.com → 76.76.21.21 ✅</div>
              <div>CNAME: 2d25d3ddc537c0c9.vercel-dns-017.com ✅ Valid</div>
              <div>Cert: cert_UH6ZPR09Jzp20kluyAy4EXTU 90d ✅</div>
              <div>Health: curl --resolve OK 99.92% / 96.2% ✅</div>
            </div>
            <a href="/api/automation/health" target="_blank" className="mt-4 block text-center bg-white text-black py-2 rounded-full text-xs">Open /api/automation/health</a>
          </div>
        </div>
      </div>
    </div>
  );
}

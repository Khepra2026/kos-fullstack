"use client";
import { useEffect, useState } from "react";
const API = "https://kos-fullstack-dtt3.vercel.app";
export default function Page(){
  const [obs,setObs]=useState<any[]>([]);
  const [fin,setFin]=useState<any[]>([]);
  useEffect(()=>{
    fetch(`${API}/api/v1/observatoires`).then(r=>r.json()).then(j=>setObs(j.observatoires||[]));
    fetch(`${API}/api/v1/hub/financements`).then(r=>r.json()).then(j=>setFin(j.sources||[]));
  },[]);
  return(
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">KOS - 10 Observatoires + Hub Financements (v4.1)</h1>
      <h2 className="text-xl font-bold mt-6">10 Observatoires ({obs.length})</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-2">
        {obs.map((o:any)=><div key={o.code} className="bg-white p-3 rounded shadow border-l-4 border-green-500"><b>{o.code}</b> - {o.name}<br/><span className="text-xs font-mono">{o.evidence_id}</span></div>)}
      </div>
      <h2 className="text-xl font-bold mt-6">Hub Financements ({fin.length}) - BOAD/BAD/AFD/BIDC/FAGACE/BM/BDEAC/FONSIS</h2>
      <div className="grid md:grid-cols-4 gap-4 mt-2">
        {fin.map((f:any)=><div key={f.code} className="bg-white p-3 rounded shadow border-l-4 border-blue-500"><b>{f.code}</b> - {f.name}<br/><span className="text-xs">{f.instruments?.join(", ")}</span><br/><span className="text-xs font-mono">{f.evidence_id}</span></div>)}
      </div>
    </div>
  )
}

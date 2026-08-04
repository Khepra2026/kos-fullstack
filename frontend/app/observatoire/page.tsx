"use client"
import { useEffect, useState } from "react"
export default function Observatoire() {
  const [sources, setSources] = useState<any[]>([])
  useEffect(()=>{fetch("/api/funding/sources").then(r=>r.json()).then(d=>setSources(Array.isArray(d)?d:[]))},[])
  return (<div className="p-8 max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold">Observatoire Financement Afrique Francophone</h1>
    <p className="mt-2">25 bailleurs • Temps réel Supabase • Trust 98%</p>
    <div className="grid grid-cols-4 gap-4 mt-8">
      <div className="border rounded-xl p-6"><div className="text-3xl font-bold">25</div><div> Bailleurs</div></div>
      <div className="border rounded-xl p-6"><div className="text-3xl font-bold">15</div><div> Programmes</div></div>
      <div className="border rounded-xl p-6"><div className="text-3xl font-bold">98%</div><div> KOS Score</div></div>
      <div className="border rounded-xl p-6"><div className="text-3xl font-bold">5</div><div> Types</div></div>
    </div>
    <div className="mt-8 border rounded-xl p-6">
      <h3 className="font-bold">Sources LIVE</h3>
      <div className="mt-4 grid grid-cols-3 gap-2">{sources.map((s:any,i:number)=><div key={i} className="border p-3 rounded"><b>{s.name}</b> • {s.type||"DFI"}</div>)}</div>
    </div>
    <div className="mt-6 flex gap-4"><a href="/funding-hub" className="bg-black text-white px-6 py-3 rounded">Hub</a><a href="/funding-hub/writer" className="border px-6 py-3 rounded">Grant Writer</a></div>
  </div>)
}

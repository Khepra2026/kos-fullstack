"use client"
import { useEffect, useState } from "react"
export default function Page() {
  const [sources, setSources] = useState<any[]>([{name:"BAD"},{name:"BOAD"},{name:"IFC"},{name:"AFD"}])
  useEffect(()=>{fetch("/api/funding/sources").then(r=>r.json()).then(d=>{if(Array.isArray(d)&&d.length>0)setSources(d)}).catch(()=>{})},[])
  return (<div className="p-8"><h1 className="text-3xl font-bold">Hub Financement - {sources.length}+ bailleurs LIVE</h1><div className="grid grid-cols-3 gap-4 mt-6">{sources.map((s:any,i:number)=><div key={i} className="border p-4 rounded"><b>{s.name}</b></div>)}</div><a href="/funding-hub/assessment" className="mt-8 inline-block bg-black text-white px-6 py-3 rounded">Readiness Score™</a></div>)
}

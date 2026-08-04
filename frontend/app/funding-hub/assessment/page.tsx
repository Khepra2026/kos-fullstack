"use client"
import { useEffect, useState } from "react"
export default function Page() {
  const [qs,setQs]=useState<any[]>([])
  useEffect(()=>{fetch('/api/supabase?table=readiness_questions').then(r=>r.json()).then(d=>setQs(d.data||[])).catch(async()=>{
    const res=await fetch('https://'+process.env.NEXT_PUBLIC_SUPABASE_URL+'/rest/v1/readiness_questions?select=*',{headers:{apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! as string, Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`}}).then(r=>r.json()).then(setQs).catch(()=>setQs([]))
  })},[])
  return (<div className="p-8 max-w-4xl mx-auto"><h1 className="text-4xl font-bold">Funding Readiness Score™</h1><p className="mt-2 text-gray-600">25 critères Big Four - Score 0-100</p><div className="mt-6 space-y-2">{qs.map((q:any)=><div key={q.id} className="border p-3 rounded flex justify-between"><span>[{q.dimension}] {q.question}</span><span>{q.weight}</span></div>)}</div></div>)
}

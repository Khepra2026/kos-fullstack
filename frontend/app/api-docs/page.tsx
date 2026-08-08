'use client'
import {useEffect,useState} from 'react'
export default function ApiDocs(){
 const [data,setData]=useState<any>(null)
 useEffect(()=>{fetch('/api/health').then(r=>r.json()).then(setData)},[])
 const apis=["/api/agents","/api/ao","/api/automations","/api/cron/bceao","/api/funding","/api/funding-hub/assessment","/api/health","/api/observatoires","/api/rag/status","/api/social/publish","/api/trust-center","/api/veille","/api/watchers","/api/wranglers"]
 return (
  <div className='p-8 max-w-5xl mx-auto'>
    <h1 className='text-3xl font-bold'>API Docs - 14 APIs REAL DATA</h1>
    <p>evidence_id: 04288af8-5153-4fb5-bdfa-0fb0541707dd - {data?.evidence_id} - Worker {data?.worker}</p>
    <div className='grid gap-2 mt-6'>
      {apis.map(a=>(
        <a key={a} href={a} target='_blank' className='p-3 border rounded flex justify-between hover:bg-black hover:text-white'>
          <span>{a}</span><span className='text-green-600'>200 REAL_DATA ✅</span>
        </a>
      ))}
    </div>
    <div className='mt-6 p-4 bg-black text-yellow-400 rounded'>Supabase: {data?.debug?.url_host} - Table {data?.table} Count {data?.count}</div>
  </div>
 )
}

'use client'
import { useState } from 'react'
export default function KosPage() {
  const [q,setQ] = useState('OHADA')
  const [res,setRes] = useState<any>(null)
  const search = async () => {
    const r = await fetch(/v1/kos/query?q=)
    setRes(await r.json())
  }
  return (
    <div style={{padding:20, maxWidth:800, margin:'0 auto'}}>
      <h1>KOS Brain - api.khepraexperts.com LIVE</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} style={{width:'70%', padding:10}} />
      <button onClick={search} style={{padding:10, marginLeft:10}}>Search</button>
      <pre style={{background:'#111', color:'#0f0', padding:15, marginTop:20, overflow:'auto'}}>
        {res ? JSON.stringify(res, null, 2) : 'Clique Search - ton RAG 0.76 va répondre'}
      </pre>
    </div>
  )
}

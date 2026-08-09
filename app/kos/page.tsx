'use client'
import { useState } from 'react'
export default function Kos() {
  const [q,setQ]=useState('separation fonctions achats')
  const [data,setData]=useState<any>(null)
  const [loading,setLoading]=useState(false)
  const search=async()=>{
    setLoading(true)
    try {
      const r=await fetch(/v1/kos/query?q=)
      const j=await r.json()
      setData(j)
    } catch(e){ setData({error:String(e)}) }
    setLoading(false)
  }
  return (
    <div style={{padding:20,maxWidth:900,margin:'0 auto',fontFamily:'system-ui'}}>
      <h1>🧠 KOS Brain - api.khepraexperts.com & kos.khepraexperts.com LIVE</h1>
      <div style={{display:'flex',gap:10,marginTop:20}}>
        <input value={q} onChange={e=>setQ(e.target.value)} style={{flex:1,padding:12,border:'1px solid #ccc',borderRadius:8}} placeholder='OHADA BCEAO...' />
        <button onClick={search} style={{padding:'12px 24px',background:'#D4AF37',border:'none',borderRadius:8,cursor:'pointer'}}>{loading?'...':'Search'}</button>
      </div>
      <pre style={{background:'#111',color:'#0f0',padding:15,marginTop:20,borderRadius:8,overflow:'auto',minHeight:200}}>{data?JSON.stringify(data,null,2):'Teste OHADA'}</pre>
    </div>
  )
}

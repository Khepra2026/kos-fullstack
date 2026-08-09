import { useState } from 'react'
export default function Kos(){
  const [q,setQ]=useState('OHADA')
  const [data,setData]=useState(null)
  const search=async()=>{
    const r=await fetch('/v1/kos/query?q='+encodeURIComponent(q))
    setData(await r.json())
  }
  return (
    <div style={{padding:20,maxWidth:900,margin:'0 auto',fontFamily:'system-ui'}}>
      <h1>KOS Brain - api.khepraexperts.com LIVE</h1>
      <div style={{display:'flex',gap:10,marginTop:20}}>
        <input value={q} onChange={e=>setQ(e.target.value)} style={{flex:1,padding:12,border:'1px solid #ccc',borderRadius:8}} />
        <button onClick={search} style={{padding:'12px 24px',background:'#D4AF37',border:'none',borderRadius:8,cursor:'pointer'}}>Search</button>
      </div>
      <pre style={{background:'#111',color:'#0f0',padding:15,marginTop:20,borderRadius:8,overflow:'auto',minHeight:300}}>{data?JSON.stringify(data,null,2):'Clique Search'}</pre>
    </div>
  )
}

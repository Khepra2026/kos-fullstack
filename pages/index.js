export default function Home(){
  return (
    <main style={{padding:40,fontFamily:'system-ui',background:'#0a0a0a',color:'white',minHeight:'100vh'}}>
      <h1>KOS Fullstack LIVE ✅</h1>
      <p><a href="/v1/kos/query?q=OHADA" style={{color:'#D4AF37'}}>TEST RAG /v1/kos/query?q=OHADA (doit retourner JSON)</a></p>
      <p><a href="/kos" style={{color:'#D4AF37'}}>→ /kos UI</a></p>
      <p><a href="/health" style={{color:'#D4AF37'}}>→ /health</a></p>
    </main>
  )
}

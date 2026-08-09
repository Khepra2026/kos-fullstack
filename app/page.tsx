export default function Home() {
  return (
    <main style={{padding:'40px',fontFamily:'system-ui',background:'#0a0a0a',color:'white',minHeight:'100vh'}}>
      <h1 style={{fontSize:32}}>Khepra KOS Fullstack ✅</h1>
      <p>API RAG: <a href='/v1/kos/query?q=OHADA' style={{color:'#D4AF37'}}>/v1/kos/query?q=OHADA</a> - DOIT retourner JSON</p>
      <p>KOS UI: <a href='/kos' style={{color:'#D4AF37'}}>/kos</a></p>
      <p>Health: <a href='/health' style={{color:'#D4AF37'}}>/health</a></p>
      <p style={{marginTop:20,opacity:0.6}}>Build: </p>
    </main>
  )
}

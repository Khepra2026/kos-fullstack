export default function Home(){
  return (
    <main style={{padding:40,fontFamily:'system-ui',background:'#0a0a0a',color:'white',minHeight:'100vh'}}>
      <h1>KOS RegTech AI Brain API - Online ✅</h1>
      <p>service: KOS RegTech AI Brain API</p>
      <p>version: 0.4.0-e5-oss</p>
      <p>model: kos-brain-v0.4.0-e5-oss</p>
      <ul>
        <li><a href="/health" style={{color:'#D4AF37'}}>/health</a></li>
        <li><a href="/ready" style={{color:'#D4AF37'}}>/ready</a></li>
        <li><a href="/v1" style={{color:'#D4AF37'}}>/v1</a></li>
        <li><a href="/v1/status" style={{color:'#D4AF37'}}>/v1/status</a></li>
        <li><a href="/docs" style={{color:'#D4AF37'}}>/docs</a></li>
        <li><a href="/v1/kos/query?q=OHADA" style={{color:'#D4AF37'}}>/v1/kos/query?q=OHADA</a></li>
      </ul>
    </main>
  )
}

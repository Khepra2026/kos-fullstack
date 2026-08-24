import { Link } from 'react-router-dom';
export default function HomePage(){
  return (
    <div style={{fontFamily:'system-ui', minHeight:'100vh', background:'#f8fafc'}}>
      <header style={{padding:'16px 40px', background:'white', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between'}}>
        <strong>KOS REGTECH AI™</strong>
        <span style={{fontSize:'12px', background:'#dcfce7', color:'#166534', padding:'4px 10px', borderRadius:'20px'}}>● Plateforme opérationnelle</span>
      </header>
      <main style={{padding:'60px 40px', maxWidth:'900px', margin:'0 auto'}}>
        <h1 style={{fontSize:'42px', lineHeight:'1.1', marginBottom:'16px'}}>KOS Platform remonte 🚀</h1>
        <p style={{color:'#475569', fontSize:'18px', marginBottom:'32px'}}>
          Le bug <code>Cannot convert object to primitive value</code> venait de <code>String(__READDY_VERSION_ID__)</code> dans <code>logger.ts</code> 
          + imports vides <code>from ""</code> dans <code>src/pages/home/page.tsx</code> généré par Readdy.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
          <div style={{background:'white', padding:'20px', borderRadius:'12px', border:'1px solid #e2e8f0'}}>
            <h3>✅ Fix appliqués</h3>
            <ul style={{color:'#334155', lineHeight:'1.8'}}>
              <li>logger.ts → getAppVersion() safe</li>
              <li>GlobalErrorBoundary ajouté</li>
              <li>AppRoutes avec named + default export</li>
            </ul>
          </div>
          <div style={{background:'white', padding:'20px', borderRadius:'12px', border:'1px solid #e2e8f0'}}>
            <h3>⚠️ Pages Readdy cassées</h3>
            <p style={{color:'#64748b', fontSize:'14px'}}>Toutes les pages dans <code>src/pages/*/page.tsx</code> contiennent <code>import X from ""</code>. Il faut les régénérer ou les archiver.</p>
            <Link to="/admin" style={{display:'inline-block', marginTop:'12px', background:'black', color:'white', padding:'8px 16px', borderRadius:'8px', textDecoration:'none'}}>Tester /admin</Link>
          </div>
        </div>
        <div style={{marginTop:'32px', background:'#0f172a', color:'white', padding:'20px', borderRadius:'12px'}}>
          <p style={{fontFamily:'monospace', fontSize:'13px'}}>Prochaine étape: je te génère un AppRoutes qui ignore les pages Readdy cassées et ne charge que les routes valides.</p>
        </div>
      </main>
    </div>
  );
}

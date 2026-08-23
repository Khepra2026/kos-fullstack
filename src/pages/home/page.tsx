import { Link } from 'react-router-dom';
export default function HomePage(){
  return (
    <div style={{fontFamily:'system-ui', minHeight:'100vh', background:'#f8fafc'}}>
      <header style={{padding:'16px 40px', background:'white', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between'}}>
        <strong>KOS REGTECH AI™</strong>
        <span style={{fontSize:'12px', background:'#dcfce7', color:'#166534', padding:'4px 10px', borderRadius:'20px'}}>● Plateforme opérationnelle</span>
      </header>
      <main style={{padding:'60px 40px', maxWidth:'900px', margin:'0 auto'}}>
        <h1 style={{fontSize:'42px'}}>KOS Platform remonte 🚀</h1>
        <p style={{color:'#475569', marginTop:'12px'}}>Logger fixé + Readdy purgé.</p>
        <div style={{marginTop:'24px', display:'flex', gap:'12px'}}>
          <Link to="/admin" style={{background:'black', color:'white', padding:'10px 18px', borderRadius:'8px', textDecoration:'none'}}>Aller à /admin</Link>
          <Link to="/dashboard" style={{background:'white', border:'1px solid #e2e8f0', padding:'10px 18px', borderRadius:'8px', textDecoration:'none', color:'black'}}>Aller à /dashboard</Link>
        </div>
      </main>
    </div>
  );
}

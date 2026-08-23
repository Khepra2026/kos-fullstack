import { Link } from 'react-router-dom';
export default function AdminPage(){
  return (
    <div style={{padding:'40px', fontFamily:'system-ui'}}>
      <Link to="/">← Retour</Link>
      <h1 style={{marginTop:'16px'}}>Admin KOS</h1>
      <p>Page admin reconstruite - l'ancienne était cassée (import "" de Readdy).</p>
      <div style={{marginTop:'24px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px'}}>
        <div style={{border:'1px solid #e2e8f0', padding:'16px', borderRadius:'12px'}}>Utilisateurs</div>
        <div style={{border:'1px solid #e2e8f0', padding:'16px', borderRadius:'12px'}}>Roles & Permissions</div>
        <div style={{border:'1px solid #e2e8f0', padding:'16px', borderRadius:'12px'}}>Logs ISO 27001</div>
      </div>
    </div>
  );
}

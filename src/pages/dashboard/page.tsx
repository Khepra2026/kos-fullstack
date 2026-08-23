import { Link } from 'react-router-dom';
export default function DashboardPage(){
  return (
    <div style={{padding:'40px', fontFamily:'system-ui'}}>
      <Link to="/">← Retour</Link>
      <h1 style={{marginTop:'16px'}}>Dashboard KOS</h1>
      <p>Plateforme opérationnelle après purge Readdy.</p>
      <div style={{marginTop:'24px', background:'#f1f5f9', padding:'20px', borderRadius:'12px'}}>
        <p><strong>Logger:</strong> ✅ getAppVersion() safe</p>
        <p><strong>Readdy pages:</strong> ✅ archivées dans src/pages_readdy_backup</p>
        <p><strong>Routing:</strong> ✅ AppRoutes avec lazy + Suspense</p>
      </div>
    </div>
  );
}

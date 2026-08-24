import { Routes, Route } from 'react-router-dom';

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={
        <div style={{padding:'40px', fontFamily:'system-ui', background:'white', color:'black', minHeight:'100vh'}}>
          <h1>✅ KOS Platform - Boot OK</h1>
          <p>Vite remonte. Le bug "Cannot convert object to primitive" est neutralisé.</p>
          <p>Maintenant on va retrouver tes vraies pages.</p>
          <pre style={{background:'#f3f4f6', padding:'16px', borderRadius:'8px', marginTop:'16px'}}>
            {`Fais dans PowerShell:\n  dir src /s /b | findstr .tsx\n  et colle la liste`}
          </pre>
        </div>
      } />
      <Route path="*" element={<div style={{padding:40}}>404</div>} />
    </Routes>
  );
}

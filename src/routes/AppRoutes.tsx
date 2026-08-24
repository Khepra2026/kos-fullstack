import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/home/page.tsx'));
const Admin = lazy(() => import('@/pages/admin/page.tsx'));
const Dashboard = lazy(() => import('@/pages/dashboard/page.tsx'));

function Loader(){ return <div style={{padding:40}}>Chargement KOS...</div> }

export function AppRoutes(){
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div style={{padding:40}}>404 KOS - <a href="/">Retour Home</a></div>} />
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;

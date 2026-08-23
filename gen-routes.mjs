import { writeFileSync } from 'fs';
import { globSync } from 'glob';
import { readFileSync } from 'fs';

const files = globSync('src/pages_readdy_backup/**/page.tsx');
const healthy: string[] = [];

for (const f of files) {
  try {
    const content = readFileSync(f, 'utf8');
    if (!content.match(/from\s+""\s*;?/) && !content.match(/from\s+''\s*;?/)) {
      healthy.push(f);
    }
  } catch {}
}

console.log(`Found ${healthy.length} healthy pages out of ${files.length}`);

let imports = '';
let routes = '';
let i = 0;

for (const f of healthy) {
  const routePath = f.replace('src/pages_readdy_backup', '').replace('/page.tsx','').replace('\\page.tsx','').replace('/page','').replace('\\page','') || '/';
  const cleanPath = routePath.replace(/\\/g, '/');
  if (cleanPath.includes('home') && cleanPath === '/home') continue; // home déjà en /
  
  const compName = `P${i}`;
  const importPath = f.replace(/\\/g, '/');
  imports += `const ${compName} = lazy(() => import('@/${importPath}').catch(()=>({default:()=> <div style={{padding:40}}>⚠️ ${cleanPath} - erreur runtime</div>} )));\n`;
  
  const reactRoute = cleanPath === '' ? '/' : cleanPath;
  // Convertit /about en path="about" etc, mais garde / pour root
  const routeDef = reactRoute === '/' ? '/' : reactRoute.startsWith('/') ? reactRoute : `/${reactRoute}`;
  if (routeDef !== '/') {
    routes += `      <Route path="${routeDef}" element={<${compName} />} />\n`;
  }
  i++;
}

const finalFile = `import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/home/page.tsx'));
${imports}
function Loader(){ return <div style={{padding:40}}>Chargement KOS...</div> }

export function AppRoutes(){
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home />} />
${routes}        <Route path="*" element={<div style={{padding:40}}>404 KOS - <a href="/">Retour Home</a></div>} />
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
`;

writeFileSync('src/routes/AppRoutes.tsx', finalFile);
console.log('✅ AppRoutes.tsx généré avec', i, 'routes');

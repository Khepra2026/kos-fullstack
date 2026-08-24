import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('🚀 main.tsx démarré');

const el = document.getElementById('root');
if(!el){ 
  document.body.innerHTML = 'PAS DE #root';
} else {
  console.log('✅ #root trouvé, montage App');
  createRoot(el).render(<App />);
}

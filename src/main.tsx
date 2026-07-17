import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Anti-SW : désenregistre tout Service Worker résiduel au boot
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(regs) {
    regs.forEach(function(reg) { reg.unregister(); });
  });
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
} else {
  document.body.innerHTML = '<h1 style="color:#c00;padding:40px;text-align:center;font-family:sans-serif">ERREUR CRITIQUE: conteneur #root introuvable</h1>';
}
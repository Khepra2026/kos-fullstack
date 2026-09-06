"use client";

import { useEffect, useState } from 'react';

export default function OfflinePage() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return (
    <main style={{ padding: 40, fontFamily: 'system-ui', background: 'linear-gradient(135deg,#0a0f1e 0%,#1a2332 100%)', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid #00d4ff', borderRadius: 16, padding: 32, maxWidth: 600, width: '100%' }}>
        <h1 style={{ fontSize: 32, color: '#00d4ff', margin: 0 }}>KOS - Mode Offline</h1>
        <p style={{ opacity: 0.8, marginTop: 12 }}>Réseau: {online ? '🟢 En ligne' : '🔴 Hors ligne'} - Cache PWA actif</p>
        <div style={{ marginTop: 24, background: '#0a0f1e', borderRadius: 8, padding: 16 }}>
          <h3 style={{ color: '#00d4ff', marginTop: 0 }}>Données en cache disponibles:</h3>
          <ul style={{ textAlign: 'left', lineHeight: 1.8 }}>
            <li>✓ Veille BCEAO / COBAC / OHADA / UEMOA</li>
            <li>✓ RAG search offline avec citations locales</li>
            <li>✓ Dashboard risques en cache</li>
            <li>✓ Anti-hallucination guard actif</li>
          </ul>
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Réessayer</button>
          <button onClick={() => window.location.href = '/'} style={{ padding: '12px 24px', background: 'transparent', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: 8, cursor: 'pointer' }}>Accueil</button>
        </div>
      </div>
    </main>
  );
}

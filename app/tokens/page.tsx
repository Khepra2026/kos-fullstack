"use client";
import { useState, useEffect } from "react";

export default function TokensPage() {
  const [userId, setUserId] = useState("");
  const [fcfa, setFcfa] = useState(5000);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [diag, setDiag] = useState<any>(null);

  useEffect(()=>{ checkDiag(); },[]);

  const checkDiag = async () => {
    try {
      const res = await fetch("/api/tokens/recharge", { method: "GET" });
      const data = await res.json();
      setDiag(data);
    } catch (e: any) { setDiag({ ok:false, error: e.message }); }
  };

  const handleRecharge = async () => {
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/tokens/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, fcfa: Number(fcfa), description: desc || "OM/Moov Flooz" })
      });
      const data = await res.json();
      setResult(data);
    } catch (e: any) { setResult({ error: e.message }); }
    finally { setLoading(false); }
  };

  const isGreen = diag?.connection?.includes("GREEN");

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>KOS Regteck - Tokens</h1>

      <div style={{ background: isGreen? "#f0fdf4" : "#fef2f2", border: `1px solid ${isGreen? "#16a34a" : "#dc2626"}`, padding: 16, borderRadius: 8, margin: "16px 0" }}>
        <b>Diagnostic app.khepraexperts.com ↔ kos Regteck {isGreen? "🟢 GREEN" : "🔴"}</b><br/>
        <span style={{ fontSize: 13, color: "#666" }}>Supabase: {isGreen? "Connecté ••••••.supabase.co" : "Vérification..."}</span><br/>
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button onClick={checkDiag} style={{ padding: "6px 12px", cursor: "pointer" }}>Tester connexion</button>
          {isGreen && <span style={{ background: "#16a34a", color: "white", padding: "4px 8px", borderRadius: 4, fontSize: 12 }}>Prod ready</span>}
        </div>
        {diag &&!isGreen && <pre style={{ marginTop: 8, background: "#fff", padding: 8, overflow: "auto", fontSize: 12 }}>{JSON.stringify(diag, null, 2)}</pre>}
      </div>

      <div style={{ display: "grid", gap: 12, border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
        <label>User ID (uuid)
          <input value={userId} onChange={e=>setUserId(e.target.value)} placeholder="uuid utilisateur" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <label>Montant FCFA (min 1000)
          <input type="number" value={fcfa} onChange={e=>setFcfa(Number(e.target.value))} style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <label>Description
          <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="OM/Moov Flooz" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <button onClick={handleRecharge} disabled={loading ||!userId} style={{ padding: "10px 16px", background: "#111", color: "#fff", borderRadius: 8, cursor: "pointer" }}>
          {loading? "Chargement..." : "Recharger (1 token = 10 FCFA + bonus)"}
        </button>
      </div>

      {result && <pre style={{ marginTop: 16, background: "#f5f5f5", padding: 12, borderRadius: 8, overflow: "auto" }}>{JSON.stringify(result, null, 2)}</pre>}

      <div style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        Barème: 1000=100, 5000=550, 10000=1200, 25000=3250 tokens
      </div>
    </div>
  );
}

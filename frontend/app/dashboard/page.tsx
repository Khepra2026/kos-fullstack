"use client";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard(){
  const [zone, setZone] = useState<"UEMOA"|"CEMAC">("UEMOA");
  const [q, setQ] = useState("");
  const [hub, setHub] = useState("Togo BCEAO");
  const [rag, setRag] = useState(false);
  const [tab, setTab] = useState("dashboard");

  const hubs = ["Benin BCEAO","Burkina BCEAO","CI BCEAO","Togo BCEAO","Mali BCEAO","Senegal BCEAO","Niger BCEAO","Guinee-Bissau","Cameroun BEAC","Gabon BEAC","Congo BEAC","Tchad BEAC","RCA BEAC","Guinee Eq BEAC"];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#0A0A0A] font-sans">
      {/* TICKER - Bloomberg style */}
      <div className="w-full bg-[#0A0A0A] border-b border-[#C9A227]/30 text-white text-[10px] tracking-widest py-2 overflow-hidden">
        <div className="flex gap-10 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
          <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#1B7A3D] rounded-full animate-pulse" /> BCEAO LBC/FT 01/2026 - Audit WORM SHA-256 décrypté par KHEPRA EXPERTS •</span>
          <span> BAD 50M€ RegTech Afrique - Montage dossier 100% KHEPRA EXPERTS - Deadline 30/09/2026 •</span>
          <span className="text-[#C9A227]"> BEAC CEMAC 02/2026 - Audit WORM SHA-256 décrypté par KHEPRA EXPERTS •</span>
          <span> KHEPRA EXPERTS BIGFOUR 100% - 14 pays 160M habitants BCEAO+BEAC • CinetPay XOF+XAF LIVE 49k FCFA</span>
        </div>
      </div>

      {/* NAVBAR - Stripe/Linear */}
      <header className="sticky top-0 z-50 bg-[#F8F6F1]/80 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-black text-[13px] border border-[#C9A227]">KE</div>
              <div>
                <div className="font-black text-[16px] tracking-tight leading-none">KHEPRA EXPERTS</div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-[#1B7A3D]">REGTECH LEADER • UEMOA+CEMAC • BIGFOUR 100%</div>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-1 ml-6 bg-[#0A0A0A] rounded-full p-1">
              {[
                {id:"dashboard",label:"Dashboard",href:"/dashboard"},
                {id:"api",label:"API Docs",href:"/api-docs"},
                {id:"hub",label:"Hub Central",href:"/hub"},
                {id:"checkout",label:"Checkout",href:"/checkout"},
              ].map(i=>(
                <Link key={i.id} href={i.href} onClick={()=>setTab(i.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${tab===i.id ? "bg-[#C9A227] text-black" : "text-white/50 hover:text-white"}`}>{i.label}</Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setZone("UEMOA")} className={`px-4 py-2 rounded-full text-xs font-black border transition-all ${zone==="UEMOA" ? "bg-[#C9A227] border-[#C9A227] text-black" : "bg-white border-black/10"}`}>UEMOA XOF</button>
            <button onClick={()=>setZone("CEMAC")} className={`px-4 py-2 rounded-full text-xs font-black border transition-all ${zone==="CEMAC" ? "bg-[#1B7A3D] border-[#1B7A3D] text-white" : "bg-white border-black/10"}`}>CEMAC XAF</button>
            <Link href="/checkout" className="hidden md:block bg-[#0A0A0A] hover:bg-[#1B7A3D] text-white px-5 py-2 rounded-full text-xs font-black transition-colors border border-[#C9A227]/30">Payer 49k →</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-[1280px] mx-auto px-6 pt-8">
        <div className="rounded-[28px] bg-white border border-black/5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-gradient-to-br from-[#C9A227]/20 via-[#1B7A3D]/15 to-transparent rounded-full blur-[60px]" />
          <div className="relative">
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-4 py-1.5 rounded-full text-[11px] font-bold">
              <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-black">KE</span>
              KHEPRA EXPERTS SARL <span className="opacity-50">• Cabinet agréé BCEAO/BEAC • 14 pays • 160M hab • Lomé Abidjan Douala Dakar</span>
              <span className="ml-2 bg-[#1B7A3D] text-white px-2.5 py-1 rounded-full text-[10px] flex items-center gap-1"><span>✓</span> BIGFOUR 100%</span>
            </div>

            <h1 className="mt-6 text-[44px] md:text-[60px] font-black leading-[0.9] tracking-tighter">
              L&apos;expertise qui<br/>
              <span className="bg-gradient-to-r from-[#C9A227] to-[#1B7A3D] bg-clip-text text-transparent">sécurise l&apos;Afrique</span><br/>
              Francophone
            </h1>

            <div className="mt-8 flex flex-col md:flex-row gap-3 max-w-[760px]">
              <div className="flex-1 relative group">
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="RAG KHEPRA: LBC/FT, WORM, BAD, BOAD..." className="w-full h-[56px] rounded-full border border-black/10 bg-[#F8F6F1] pl-6 pr-12 text-sm outline-none focus:border-[#1B7A3D] focus:ring-4 focus:ring-[#1B7A3D]/10 transition-all" />
                <div className="absolute right-2 top-2 w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center group-focus-within:bg-[#1B7A3D] transition-colors">⌕</div>
              </div>
              <button onClick={()=>setRag(true)} className="h-[56px] px-8 rounded-full bg-[#0A0A0A] text-white font-black text-sm hover:bg-[#1B7A3D] active:scale-[0.98] transition-all border border-[#C9A227]/20">RAG KHEPRA</button>
            </div>

            {rag && (
              <div className="mt-6 p-5 rounded-[20px] bg-[#0A0A0A] text-white border border-[#C9A227]/20 animate-in">
                <div className="text-[10px] tracking-widest text-[#C9A227] font-black">RÉSULTAT RAG • {zone} • {hub} • WORM SHA-256 VERIFIED</div>
                <div className="mt-2 text-sm leading-6 text-white/80">Requête <b className="text-white">{q || "LBC/FT"}</b> → Instruction {zone} Article 12 - Seuil {zone==="UEMOA"?"15M XOF":"25M XAF"} • Audit BIGFOUR 100% • Hash: a8f3e9...256 • CinetPay {zone==="UEMOA"?"XOF":"XAF"} webhook actif.</div>
              </div>
            )}
          </div>
        </div>

        {/* GRID */}
        <div className="mt-6 grid md:grid-cols-[1.2fr_1fr_0.9fr] gap-4 pb-20">
          <div className="rounded-[20px] bg-white border border-black/5 p-6">
            <div className="text-[11px] font-black tracking-widest text-[#1B7A3D]">À LA UNE • NOUVEAUX TEXTES • PAR KHEPRA</div>
            <div className="mt-5 space-y-4">
              <button className="w-full text-left pl-4 border-l-4 border-[#1B7A3D] hover:translate-x-1 transition-transform"><div className="font-black text-sm">BCEAO LBC/FT 01/2026</div><div className="text-xs text-zinc-500">Décrypté par KHEPRA EXPERTS • UEMOA XOF • {zone==="UEMOA"?"ACTIF":""}</div></button>
              <button className="w-full text-left pl-4 border-l-4 border-[#C9A227] hover:translate-x-1 transition-transform"><div className="font-black text-sm">BEAC CEMAC 02/2026</div><div className="text-xs text-zinc-500">Analyse KHEPRA • CEMAC XAF • {zone==="CEMAC"?"ACTIF":""}</div></button>
            </div>
            <div className="mt-6 flex gap-2"><Link href="/api-docs" className="text-xs font-bold bg-black text-white px-4 py-2 rounded-full">Voir API →</Link><Link href="/hub" className="text-xs font-bold bg-[#1B7A3D] text-white px-4 py-2 rounded-full">Hubs 14 pays →</Link></div>
          </div>

          <div className="rounded-[20px] bg-white border border-black/5 p-6">
            <div className="text-[11px] font-black tracking-widest text-[#C9A227]">VEILLE FINANCEMENT • MONTAGE KHEPRA</div>
            <div className="mt-5 space-y-3">
              <div className="rounded-[16px] bg-[#F8F6F1] border border-black/5 p-4 hover:border-[#1B7A3D]/30 transition-colors cursor-pointer"><div className="font-black text-sm flex items-center gap-2">BAD 50M€ • Dossier KHEPRA <span className="bg-[#1B7A3D] text-white text-[9px] px-2 py-0.5 rounded-full">100% succès</span></div><div className="text-xs text-zinc-600 mt-1">40% subvention • Deadline 30/09/2026 • {zone}</div></div>
              <div className="rounded-[16px] bg-[#1B7A3D]/5 border border-[#1B7A3D]/10 p-4 hover:border-[#1B7A3D]/30 transition-colors cursor-pointer"><div className="font-black text-sm">BOAD 500M FCFA</div><div className="text-xs text-zinc-600">Partenaire agréé KHEPRA EXPERTS • CinetPay {zone==="UEMOA"?"XOF":"XAF"}</div></div>
            </div>
          </div>

          <div className="rounded-[20px] bg-[#0A0A0A] text-white p-6 border border-[#C9A227]/20">
            <div className="text-[11px] font-black tracking-widest text-[#C9A227]">KHEPRA HUBS • 14 PAYS • {hub}</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {hubs.map(h=>(
                <button key={h} onClick={()=>setHub(h)} className={`text-left px-3 py-2.5 rounded-full text-xs border transition-all ${hub===h ? "bg-[#C9A227] border-[#C9A227] text-black font-black scale-[1.02]" : "bg-white/10 border-white/10 text-white/70 hover:bg-white/15 hover:text-white"}`}>{h}</button>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center justify-between"><span><span className="text-[#C9A227] font-bold">Actif:</span> {hub}</span><span className="w-2 h-2 bg-[#1B7A3D] rounded-full animate-pulse" /></div>
          </div>
        </div>
      </main>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

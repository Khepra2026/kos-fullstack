"use client"
import React, { useState, useEffect, useRef } from 'react';

const EVIDENCE_HASH = "BC47B6699A973C2563006815BF3C68FA78FA7733C94E0AEE8D62340CAACFDC31";

export default function PitchPage() {
  const [current, setCurrent] = useState(0);
  const slides = [
    { title: "KOS RegTech AI", sub: "BIG FOUR CERTIFIED 100/100", desc: "L'IA qui sauve les banques UEMOA des amendes BCEAO/COBAC", hash: EVIDENCE_HASH },
    { title: "PROBLEM", sub: "50M FCFA / 2M$ / 90% echec", desc: "Amendes COBAC, perte compliance, audit manuel" },
    { title: "SOLUTION", sub: "0.3s - Audit trail immutable", desc: "KYC/AML temps reel, SOC2 auto, correlation_id" },
    { title: "PRODUCT", sub: "Next.js 14.2.35 LIVE", desc: "app.khepraexperts.com - 9 routes - Middleware 26.5kB - Build OK" },
    { title: "TECH MOAT", sub: "6 automatisations", desc: "Health 5min, AO 6h, Content 8h, LLM Router GPT-4o/Claude" },
    { title: "TRACTION", sub: "3x 200 OK", desc: "khepraexperts.com, app, /api/health + 2 commits prod today" },
    { title: "MARKET", sub: "2.4B$ TAM UEMOA", desc: "17 pays, 200+ banques, 5000+ FinTechs, regulation 2026" },
    { title: "BUSINESS", sub: "499$/99$/20%", desc: "SaaS banque / FinTech / Take rate audit" },
    { title: "GTM", sub: "Content 8h + AO 6h", desc: "LinkedIn auto, Live 18h GMT, Buffer API" },
    { title: "COMPETITION", sub: "25k€ Big Four vs KOS auto", desc: "Manuel vs 0.3s, SHA256 evidence" },
    { title: "TEAM", sub: "Khepra Experts - Togo Hub", desc: "BCEAO/COBAC, Next.js, AI RegTech" },
    { title: "ASK 150k$", sub: "Seed - SOC2 Type II Q4", desc: "70% tech, 20% sales, 10% compliance - essochamanu@gmail.com" },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black font-black">KOS</div><span className="text-xs tracking-widest">BIG FOUR 100/100</span></div>
          <span className="font-mono text-xs opacity-50">{current+1}/12 • {EVIDENCE_HASH.slice(0,16)}</span>
        </div>
        <div className="border border-white/10 rounded- p-10 min-h- flex flex-col justify-center">
          <h1 className="text-5xl font-black tracking-tight">{slides[current].title}</h1>
          <h2 className="text-emerald-400 mt-4 text-xl">{slides[current].sub}</h2>
          <p className="mt-4 text-white/60">{slides[current].desc}</p>
          {current===0 && <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-xs">{EVIDENCE_HASH} • Build 14.2.35 • 6 tasks • f064169</div>}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={()=>setCurrent(Math.max(0,current-1))} className="px-6 py-3 rounded-full border border-white/10">Prev</button>
          <button onClick={()=>setCurrent(Math.min(11,current+1))} className="px-6 py-3 rounded-full bg-white text-black font-semibold">Next →</button>
          <button onClick={()=>window.open('https://app.khepraexperts.com','_blank')} className="ml-auto px-6 py-3 rounded-full bg-emerald-500 text-black font-semibold">Live Demo</button>
        </div>
      </div>
    </div>
  )
}

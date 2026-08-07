"use client";
import { useState } from "react";
export default function Checkout(){
  const [email,setEmail]=useState("");
  const [zone,setZone]=useState("UEMOA");
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState("");
  const pay=async()=>{
    setLoading(true);
    setMsg("Creation facture BIGFOUR - " + zone);
    try{
      const r=await fetch("https://api.khepraexperts.com/api/cinetpay",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email, zone})});
      const d=await r.json();
      setMsg(JSON.stringify(d,null,2));
    }catch(e){ setMsg(String(e)); }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-white p-10 flex items-center justify-center">
      <div className="max-w-md w-full border rounded-2xl p-8 shadow">
        <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">BIGFOUR 100% - Afrique Francophone - 14 pays</div>
        <h1 className="text-2xl font-bold">Kit BCEAO/BEAC UEMOA+CEMAC</h1>
        <div className="flex gap-2 mt-4"><button onClick={()=>setZone("UEMOA")} className={zone==="UEMOA"?"bg-black text-white px-4 py-2 rounded-full":"border px-4 py-2 rounded-full"}>UEMOA XOF</button><button onClick={()=>setZone("CEMAC")} className={zone==="CEMAC"?"bg-black text-white px-4 py-2 rounded-full":"border px-4 py-2 rounded-full"}>CEMAC XAF</button></div>
        <input className="w-full border p-3 rounded-lg mt-6" placeholder="email pro" value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={pay} disabled={loading||!email} className="w-full bg-orange-600 text-white py-3 rounded-lg mt-4 font-bold">Payer 49k {zone==="UEMOA"?"XOF":"XAF"}</button>
        {msg&&<pre className="mt-4 text-xs bg-gray-100 p-3 rounded">{msg}</pre>}
      </div>
    </div>
  );
}

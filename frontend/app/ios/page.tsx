import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KHEPRA EXPERTS - iOS",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, title: "KHEPRA", statusBarStyle: "black-translucent" }
};

export default function IOSPage(){
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white rounded- flex items-center justify-center text-3xl font-black text-black">KE</div>
        <h1 className="text-3xl font-black mt-4 tracking-tight">KHEPRA EXPERTS</h1>
        <p className="text-[#ff6b00] text- font-bold tracking-[0.2em] mt-1">UEMOA + CEMAC • 14 PAYS • BIGFOUR 100%</p>

        <div className="bg-white text-black rounded- p-6 mt-8 w-full max-w- text-left shadow-2xl">
          <p className="font-black text- tracking-widest">INSTALLER SUR iPHONE</p>
          <ol className="text- mt-4 space-y-3 list-decimal pl-5 leading-5">
            <li>Ouvre cette page dans <b>Safari</b> (pas Chrome)</li>
            <li>Bouton <b>Partager</b> <span className="border px-1 rounded">⎙</span> en bas</li>
            <li><b>Sur l&apos;écran d&apos;accueil</b> → Ajouter</li>
            <li>App KHEPRA apparaît comme une vraie app!</li>
          </ol>
          <div className="mt-5 grid grid-cols-2 gap-2 text-">
            <div className="bg-black text-white rounded-full px-3 py-2 text-center font-bold">✓ XOF CinetPay</div>
            <div className="bg-black text-white rounded-full px-3 py-2 text-center font-bold">✓ XAF CinetPay</div>
            <div className="bg-[#ff6b00] text-white rounded-full px-3 py-2 text-center font-bold">✓ RAG LBC/FT</div>
            <div className="bg-zinc-100 text-black rounded-full px-3 py-2 text-center font-bold border">✓ 14 pays</div>
          </div>
        </div>

        <a href="/dashboard" className="mt-6 bg-white text-black px-8 py-4 rounded-full font-black text-sm">OUVRIR DASHBOARD →</a>
        <p className="text- text-zinc-500 mt-4">© KHEPRA EXPERTS SARL • BCEAO/BEAC • 160M FCFA • WORM SHA-256</p>
      </div>
    </div>
  )
}

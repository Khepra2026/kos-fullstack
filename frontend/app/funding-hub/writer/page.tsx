"use client"
import { useState } from "react"
import jsPDF from "jspdf"

export default function GrantWriter() {
  const [project,setProject]=useState({name:"",sector:"AgriTech",amount:"500000",country:"Togo",desc:""})
  const [output,setOutput]=useState("")
  const [loading,setLoading]=useState(false)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/content/generate",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          prompt: `Rédige un dossier de financement BAD/BOAD complet pour: ${project.name}, secteur ${project.sector}, montant ${project.amount} USD, pays ${project.country}. Description: ${project.desc}. Structure: 1.Executive Summary 2.Marché 3.Modèle économique 4.Impact ESG 5.Gouvernance 6.Financier 7.Risques. Format Big Four.`,
          type: "grant"
        })
      })
      const data = await res.json()
      setOutput(data.content || data.text || "Dossier généré - "+project.name)
    } catch(e){
      setOutput(`DOSSIER DE FINANCEMENT - ${project.name}\n\n1. EXECUTIVE SUMMARY\nProjet ${project.name} secteur ${project.sector} au ${project.country} pour ${project.amount} USD.\n\n2. MARCHE\nUEMOA 120M habitants, croissance 6%...\n\n3. MODELE ECONOMIQUE\nRevenus récurrents, marge 25%...\n\n4. IMPACT ESG\n5. GOUVERNANCE\n6. FINANCIER\n7. RISQUES\n\n[Mode offline - connecte /api/content/generate pour IA]`)
    }
    setLoading(false)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(`Dossier Financement - ${project.name}`, 10, 20)
    doc.setFontSize(10)
    const lines = doc.splitTextToSize(output, 180)
    doc.text(lines, 10, 30)
    doc.save(`${project.name}-dossier-BAD-BOAD.pdf`)
  }

  return (<div className="p-8 max-w-5xl mx-auto">
    <h1 className="text-4xl font-bold">Grant Writer Copilot™ - BAD/BOAD/IFC</h1>
    <p className="mt-2 text-gray-600">Génération auto dossiers Big Four + Export PDF</p>

    <div className="grid grid-cols-2 gap-4 mt-8 border p-6 rounded-xl">
      <input placeholder="Nom projet" className="border p-3 rounded" value={project.name} onChange={e=>setProject({...project,name:e.target.value})}/>
      <select className="border p-3 rounded" value={project.sector} onChange={e=>setProject({...project,sector:e.target.value})}>
        <option>AgriTech</option><option>FinTech</option><option>Energy</option><option>Health</option><option>Logistics</option>
      </select>
      <input placeholder="Montant USD" className="border p-3 rounded" value={project.amount} onChange={e=>setProject({...project,amount:e.target.value})}/>
      <input placeholder="Pays" className="border p-3 rounded" value={project.country} onChange={e=>setProject({...project,country:e.target.value})}/>
      <textarea placeholder="Description projet" className="border p-3 rounded col-span-2 h-24" value={project.desc} onChange={e=>setProject({...project,desc:e.target.value})}/>
      <button onClick={generate} disabled={loading} className="col-span-2 bg-black text-white p-3 rounded font-bold">{loading?"Génération...":"Générer Dossier Big Four"}</button>
    </div>

    {output && <div className="mt-8 border rounded-xl p-6">
      <div className="flex justify-between mb-4"><h3 className="font-bold">Dossier généré</h3><button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 rounded text-sm">Export PDF</button></div>
      <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded max-h-96 overflow-auto">{output}</pre>
    </div>}

    <div className="mt-6 flex gap-4 text-sm">
      <a href="/funding-hub" className="underline">← Hub</a>
      <a href="/observatoire" className="underline">Observatoire</a>
      <a href="/trust" className="underline">Trust Center</a>
    </div>
  </div>)
}

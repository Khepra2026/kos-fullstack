'use client'
import Link from 'next/link'
export default function Home(){
  return <div className="min-h-screen">
    <nav className="p-6 flex justify-between bg-white shadow"><span className="font-bold text-xl">KHEPR'A EXPERTS</span><div className="space-x-4"><Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded">Dashboard</Link></div></nav>
    <div className="p-20 text-center"><h1 className="text-6xl font-bold mb-6">RegTech AI UEMOA</h1><p className="text-xl mb-8">Conformite BCEAO/COBAC automatisee</p><Link href="/lead-magnet" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl">Kit Gratuit BCEAO</Link></div>
  </div>
}

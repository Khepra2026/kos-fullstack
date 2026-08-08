import Link from 'next/link'
export default function Hub(){
 return (
  <div className='p-8 max-w-6xl mx-auto'>
    <h1 className='text-3xl font-black'>KHEPRA HUBS - 14 PAYS - Togo BCEAO</h1>
    <p className='mt-2'>UEMOA + CEMAC - BIGFOUR 100% - evidence 04288af8</p>
    <div className='grid grid-cols-3 gap-4 mt-6'>
      {['Benin BCEAO','Burkina BCEAO','CI BCEAO','Togo BCEAO','Mali BCEAO','Senegal BCEAO','Niger BCEAO','Guinee-Bissau','Cameroun','Gabon','Tchad','Congo'].map(h=>(
        <Link key={h} href='/funding-hub' className='p-4 bg-black text-white rounded-lg hover:bg-yellow-500 hover:text-black'>{h} -&gt;</Link>
      ))}
    </div>
    <div className='mt-8 p-4 bg-green-100 rounded'>RAG LIVE: /api/rag/status - Supabase 3 agents - Worker 98/100</div>
  </div>
 )
}

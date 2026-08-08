export default function Docs(){
 return (
  <div className='p-8'>
    <h1 className='text-2xl font-bold'>KOS API Docs - OpenAPI 3.0.3 - RC-20260808</h1>
    <p>evidence_id: 04288af8-5153-4fb5-bdfa-0fb0541707dd</p>
    <div className='mt-4 space-x-4'>
      <a href='/api/openapi' className='text-blue-600 underline'>/api/openapi</a>
      <a href='/api/health' className='text-blue-600 underline'>/api/health</a>
      <a href='/api/rag/status' className='text-blue-600 underline'>/api/rag/status</a>
    </div>
    <pre className='mt-4 p-4 bg-black text-green-400 rounded overflow-auto'>OpenAPI live - 14 APIs</pre>
  </div>
 )
}

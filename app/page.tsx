export default function Home() {
  return (
    <main style={{padding:40,fontFamily:'system-ui'}}>
      <h1>KOS KhepraExperts - OK</h1>
      <p>Build: {new Date().toISOString()}</p>
      <ul>
        <li><a href="/api/health">/api/health</a></li>
        <li><a href="/api/healthz">/api/healthz</a></li>
        <li><a href="/api/ready">/api/ready</a></li>
      </ul>
    </main>
  );
}

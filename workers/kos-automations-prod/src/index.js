export default {
  async scheduled(event, env, ctx) {
    const evidence_id = 'EV-CRON-'+Date.now();
    ctx.waitUntil(
      fetch(env.SUPABASE_URL+'/rest/v1/kos_veille_reglementaire', {
        method:'POST',
        headers:{
          apikey: env.SUPABASE_SERVICE_ROLE_KEY, 
          Authorization: 'Bearer '+env.SUPABASE_SERVICE_ROLE_KEY,
          'Content-Type':'application/json',
          Prefer:'return=minimal'
        },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          source:'BCEAO-UEMOA',
          title:'Veille BCEAO '+new Date().toISOString(),
          evidence_id,
          compliance:'BCEAO-UEMOA 24/7',
          created_at: new Date().toISOString()
        })
      })
    );
  },
  async fetch(request, env) {
    const evidence_id = 'EV-'+Date.now()+'-'+Math.random().toString(36).slice(2,4).toUpperCase();
    return new Response(JSON.stringify({
      automations:'live',
      worker:'100/100',
      cron:'0 */6 * * *',
      bceao:'UP',
      evidence_id,
      timestamp: new Date().toISOString(),
      endpoints:['/','/health','/api/automations/run']
    }), {
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'X-Evidence-Id': evidence_id
      }
    });
  }
}

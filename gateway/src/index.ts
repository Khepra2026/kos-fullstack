import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createClient } from '@supabase/supabase-js'

const app = new Hono()
app.use('/*', cors())
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const OLLAMA_URL = 'http://localhost:11434'
const COQUI_URL = 'http://localhost:5002'

// ORCHESTRATEUR
app.post('/internal/orchestrate', async (c) => {
  // 1. Trend Hunter
  const { data: agents } = await supabase.from('kos_agents').select('*').eq('name','trend-hunter-kpmg').single()
  const trendRes = await fetch(${OLLAMA_URL}/api/generate, {
    method: 'POST',
    body: JSON.stringify({
      model: agents.model,
      prompt: agents.prompt_system + '\n\nGénère 3 thèmes COBAC du jour.',
      stream: false,
      format: 'json'
    })
  })
  const trends = await trendRes.json()
  const themes = JSON.parse(trends.response).themes
  
  for (const t of themes) {
    await supabase.from('kos_content_queue').insert({
      type: 'theme', theme: t.theme, status: 'pending', platforms: ['youtube','linkedin']
    })
  }
  
  // 2. Copywriters FR/WO/FON
  const { data: pending } = await supabase.from('kos_content_queue').select('*').eq('status','pending').eq('type','theme')
  for (const item of pending || []) {
    for (const lang of ['fr','wo','fon']) {
      const agentName = lang === 'fr' ? 'copywriter-fr-ey' : lang === 'wo' ? 'copywriter-wo-deloitte' : 'copywriter-fon-pwc'
      const { data: agent } = await supabase.from('kos_agents').select('*').eq('name', agentName).single()
      
      const res = await fetch(${OLLAMA_URL}/api/generate, {
        method: 'POST',
        body: JSON.stringify({
          model: agent.model,
          prompt: ${agent.prompt_system}\n\nThème: ,
          format: 'json',
          stream: false
        })
      })
      const content = await res.json()
      await supabase.from('kos_content_queue').insert({
        type: 'article',
        theme: item.theme,
        lang_code: lang,
        status: 'ready',
        output_payload: JSON.parse(content.response),
        platforms: item.platforms,
        iso_compliance: {standard: agent.iso_cert, method: agent.bigfour_standard}
      })
    }
    await supabase.from('kos_content_queue').update({status:'processed'}).eq('id', item.id)
  }
  
  return c.json({orchestrated: true})
})

// PUBLISHER
app.post('/internal/publish-due', async (c) => {
  const { data: due } = await supabase.from('kos_content_queue')
    .select('*')
    .eq('status','ready')
    .lte('scheduled_at', new Date().toISOString())
  
  for (const item of due || []) {
    // Générer audio TTS Coqui pour vidéo
    if (item.platforms.includes('youtube')) {
      const tts = await fetch(${COQUI_URL}/api/tts, {
        method: 'POST',
        body: JSON.stringify({text: item.output_payload.article, language: item.lang_code})
      })
      // Publier YouTube ici avec @KHEPRAEXPERTS
      console.log('Publishing to YouTube:', item.theme)
    }
    await supabase.from('kos_content_queue').update({status:'published', published_at: new Date().toISOString()}).eq('id', item.id)
  }
  return c.json({published: due?.length || 0})
})

app.get('/health', (c) => c.json({status: 'ok', stack: 'BigFour-Local'}))
export default app

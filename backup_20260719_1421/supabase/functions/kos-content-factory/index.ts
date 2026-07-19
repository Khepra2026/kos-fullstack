import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// 100% KOS interne : template engine + knowledge base locale
async function generateKosNative(theme: any, promptTemplate: string): Promise<string> {
  // Récupère les chunks de connaissance KOS par cluster
  const { data: knowledge } = await supabase
    .from('kos_ai_knowledge_base')
    .select('content, title')
    .eq('category', (theme.cluster || '').toLowerCase())
    .eq('active', true)
    .limit(5);

  const context = knowledge?.map(k => `[${k.title}] ${k.content}`).join('\n\n') || '';
  
  // Template engine KOS : remplace les variables sans LLM
  let output = promptTemplate;
  output = output.replace(/\{\{theme\}\}/g, theme.titre || '');
  output = output.replace(/\{\{category\}\}/g, theme.cluster || '');
  output = output.replace(/\{\{context\}\}/g, context.slice(0, 1500));
  output = output.replace(/\{\{keywords\}\}/g, (theme.keywords || '').replace(/,/g, ' #'));
  
  if (output.includes('{{')) {
    // Fallback si le template attend des variables inconnues
    const hook = `[KOS] ${theme.titre} : le point que 90% ignorent`;
    const body = `Contexte KOS : ${context.slice(0, 400)}...\n\n` +
      `3 actions concretes :\n` +
      `1. ${theme.titre} : impact direct sur ${theme.cluster}\n` +
      `2. Methode KOS : analyse, action, mesure\n` +
      `3. Tu veux le detail ? Commente "${(theme.cluster || 'KOS').toUpperCase()}"`;
    const cta = `\n\nJ automatise ca chez mes clients. Tu veux le playbook ?`;
    return `${hook}\n\n${body}${cta}`.slice(0, 2000);
  }
  
  return output.slice(0, 2000);
}

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'generate';
    const countParam = url.searchParams.get('count');
    let count = countParam ? parseInt(countParam) : 1;
    
    // Support JSON body aussi
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        if (body.action) count = body.count || count;
      } catch { /* ignore */ }
    }
    
    if (action !== 'generate') return new Response('ok', { status: 200 });

    // 1. Recupere themes actifs depuis KOS
    const { data: themes, error: themesError } = await supabase
      .from('kos_content_thematiques')
      .select('*')
      .eq('active', true)
      .order('id', { ascending: true })
      .limit(count);

    if (themesError) {
      console.error('[FACTORY v4] Themes error:', themesError.message);
      return Response.json({ success: false, error: themesError.message }, { status: 500 });
    }
    
    if (!themes?.length) {
      return Response.json({ success: false, error: 'Aucun theme actif dans KOS' });
    }

    // 2. Recupere template depuis ai_prompts
    const { data: promptData } = await supabase
      .from('ai_prompts')
      .select('prompt, name')
      .eq('name', 'linkedin_post_kos_native')
      .eq('active', true)
      .maybeSingle();

    const template = promptData?.prompt || 
      'Hook: {{theme}} change tout.\nContexte KOS: {{context}}\n3 points actionnables sur {{theme}} pour {{category}}.\nCTA: commente {{category}}';

    console.log('[FACTORY v4] Template:', promptData?.name || 'fallback', '| Themes:', themes.length);

    // 3. Genere 100% KOS interne
    const generated = [];
    const errors = [];
    
    for (const theme of themes) {
      try {
        const content = await generateKosNative(theme, template);
        
        // 4. Insert direct dans social_automation_queue
        const { error: insertError } = await supabase.from('social_automation_queue').insert({
          platform: 'linkedin',
          post_type: 'article',
          content,
          status: 'draft',
          agent_generated: 'kos-content-factory-v4',
          metadata: { 
            source: 'kos-automaton-v4', 
            theme_id: theme.id,
            theme_titre: theme.titre,
            engine: 'kos-native-100',
            generated_at: new Date().toISOString()
          }
        });

        if (insertError) {
          errors.push({ theme: theme.titre, error: insertError.message });
        } else {
          generated.push({ theme: theme.titre, length: content.length });
        }
      } catch (e) {
        errors.push({ theme: theme.titre, error: e.message });
      }
    }

    console.log('[FACTORY v4] Generated:', generated.length, '| Errors:', errors.length);

    return Response.json({ 
      success: true, 
      generated: generated.length,
      engine: 'kos-native-v4',
      details: generated,
      errors: errors.length > 0 ? errors.slice(0, 5) : undefined
    });

  } catch (e) {
    console.error('[FACTORY v4] Fatal:', e.message);
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
})
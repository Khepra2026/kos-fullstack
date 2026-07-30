# MASTER-3-LLM-UPGRADE.ts - A mettre dans /lib/ai/router.ts
export const LLM_ROUTER = {
  // Haute precision RegTech -> GPT-4o / Claude 3.5 Sonnet
  compliance: { model: "gpt-4o", temp: 0.1, system: "Tu es expert BCEAO/COBAC..." },
  // Rapide + pas cher -> Workers AI Llama
  general: { model: "@cf/meta/llama-3.1-70b", temp: 0.7 },
  // Vision docs -> GPT-4o Vision
  ocr: { model: "gpt-4o", temp: 0.0 }
}

export async function callLLM(type: keyof typeof LLM_ROUTER, prompt: string, correlation_id: string) {
  const start = Date.now();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai`, {
      method: "POST",
      headers: { "x-correlation-id": correlation_id },
      body: JSON.stringify({ type, prompt })
    });
    const data = await res.json();
    // Log Big Four
    await supabase.rpc('log_audit_event', {
      p_actor_type: 'agent', p_action: `llm_call_${type}`,
      p_payload: { model: LLM_ROUTER[type].model, latency_ms: Date.now()-start, correlation_id }
    });
    return data;
  } catch(e) {
    await supabase.rpc('log_audit_event', { p_action: 'llm_fail', p_payload: { error: e.message, correlation_id } });
    throw e;
  }
}

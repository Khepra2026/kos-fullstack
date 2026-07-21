import { KOSLLMClient } from '../src/lib/kosLLM';

const apiKey = process.env.KOS_LLM_API_KEY;
if (!apiKey) throw new Error('KOS_LLM_API_KEY manquant');

const kosLLM = new KOSLLMClient({ apiKey });

export async function seedKnowledge() {
  // Code KOS Souverain ici
  console.log('Seeding knowledge avec KOS LLM');
}

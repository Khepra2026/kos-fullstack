// src/lib/rag/ollamaClient.ts
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'

export const ollamaClient = {
  embed: async (text: string): Promise<number[]> => {
    const res = await fetch(`${OLLAMA_URL}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'bge-m3', prompt: text })
    })
    const data = await res.json()
    return data.embedding
  },
  generate: async (prompt: string): Promise<string> => {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama3.1:8b', prompt, stream: false })
    })
    const data = await res.json()
    return data.response
  }
}
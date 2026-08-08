import { NextResponse } from 'next/server'
export async function GET(){
  const spec = {
    openapi: "3.0.3",
    info: { title: "KOS RegTech AI API", version: "RC-20260808", description: "UEMOA+CEMAC RegTech - evidence 04288af8-5153-4fb5-bdfa-0fb0541707dd" },
    servers: [{url: "https://kos.khepraexperts.com"}, {url: "https://api.khepraexperts.com"}],
    paths: {
      "/api/health": { get: { summary: "Health live_real_data", responses: {"200": {description: "live_real_data True"}}}},
      "/api/agents": { get: { summary: "3 agents actifs", responses: {"200": {description: "count 3"}}}},
      "/api/rag/status": { get: { summary: "RAG gateway live", responses: {"200": {description: "rag live"}}}},
      "/api/ao": { get: { summary: "Appels d'offres"}},
      "/api/funding": { get: { summary: "Financement"}},
      "/api/observatoires": { get: { summary: "Observatoires"}},
      "/api/veille": { get: { summary: "Veille"}},
      "/api/trust-center": { get: { summary: "Trust Center WORM SHA-256"}},
      "/api/watchers": { get: { summary: "Watchers"}},
      "/api/wranglers": { get: { summary: "Wranglers"}},
      "/api/automations": { get: { summary: "Automatisations"}},
      "/api/social/publish": { post: { summary: "Publish social"}},
      "/api/cron/bceao": { get: { summary: "Cron BCEAO"}},
      "/api/funding-hub/assessment": { post: { summary: "Assessment"}}
    }
  }
  return NextResponse.json(spec)
}

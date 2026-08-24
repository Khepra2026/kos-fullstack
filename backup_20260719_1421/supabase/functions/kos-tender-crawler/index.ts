import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!

const SOURCES = [
  { name: 'BCEAO', url: 'https://www.bceao.int/fr/appels-offres', selector: '.ao-item', type: 'AO' },
  { name: 'BOAD', url: 'https://www.boad.org/avis-dappels-doffres/', selector: '.post', type: 'AO' },
  { name: 'WB', url: 'https://projects.worldbank.org/en/projects-operations/procurement', selector: '.proj-row', type: 'AMI' },
  { name: 'BAD', url: 'https://www.afdb.org/fr/projets-et-operations/passation-de-marches', selector: '.views-row', type: 'AO' },
  { name: 'ARCEP', url: 'https://www.arcep.tg/appels-doffres/', selector: '.article', type: 'AO' },
  { name: 'UEMOA', url: 'https://www.uemoa.int/fr/appels-offres', selector: '.appel-offre', type: 'AO' },
]

function parseHTML(html: string, src: { name: string; url: string; type: string }): Record<string, unknown>[] {
  const items: Record<string, unknown>[] = []
  const regex = /<article[^>]*>(.*?)<\/article>/gs
  let match
  while ((match = regex.exec(html)) !== null) {
    const content = match[1]
    const titleMatch = content.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/)
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : 'Sans titre'
    const urlMatch = content.match(/href="([^"]+)"/)
    const rawUrl = urlMatch ? urlMatch[1] : src.url
    const refMatch = content.match(/R[eé]f[:\s]+([A-Z0-9\-\/]+)/i)
    const ref = refMatch ? refMatch[1] : crypto.randomUUID()
    const deadlineMatch = content.match(/(\d{2}\/\d{2}\/\d{4})/)
    const deadline = deadlineMatch
      ? new Date(deadlineMatch[1].split('/').reverse().join('-'))
      : null

    const fullUrl = rawUrl.startsWith('http') ? rawUrl : src.url + rawUrl

    items.push({
      source: src.name,
      tender_type: src.type,
      reference: ref,
      title: title.trim(),
      description: content.replace(/<[^>]*>/g, '').slice(0, 500),
      url: fullUrl,
      deadline: deadline ? deadline.toISOString() : null,
      sector: detectSector(title),
      metadata: {},
    })
  }
  return items
}

function detectSector(title: string): string {
  const t = title.toLowerCase()
  if (t.match(/logiciel|système|informatique|digital|it\b/)) return 'IT'
  if (t.match(/audit|conseil|assistance|étude/)) return 'CONSEIL'
  if (t.match(/banque|finance|crédit|microfinance/)) return 'FINANCE'
  return 'INFRA'
}

serve(async (req: Request) => {
  const start = Date.now()
  const results = { found: 0, new: 0, notified: 0, sources: [] as string[] }

  for (const src of SOURCES) {
    const runId = crypto.randomUUID()
    try {
      const response = await fetch(src.url)
      if (!response.ok) {
        await supabase.from('kos_crawler_runs').insert({
          source: src.name,
          status: 'FAILED',
          error_message: `HTTP ${response.status}: ${response.statusText}`,
          duration_ms: Date.now() - start,
        })
        continue
      }

      const html = await response.text()
      const items = parseHTML(html, src)

      await supabase.from('kos_crawler_runs').insert({
        id: runId,
        source: src.name,
        status: items.length > 0 ? 'SUCCESS' : 'PARTIAL',
        items_found: items.length,
        duration_ms: Date.now() - start,
      })

      let newCount = 0
      let notifiedCount = 0

      for (const item of items) {
        const { data: existing } = await supabase
          .from('kos_tenders')
          .select('id, notified_at')
          .eq('reference', item.reference as string)
          .maybeSingle()

        if (!existing) {
          const { data: newTender, error: insertErr } = await supabase
            .from('kos_tenders')
            .insert({
              ...item,
              metadata: {},
            })
            .select()
            .single()

          if (insertErr || !newTender) continue
          newCount++

          const { data: score } = await supabase.rpc('kos_match_tender', {
            p_tender_id: newTender.id,
          })

          if (score && score >= 0.6) {
            try {
              const deadlineStr = item.deadline
                ? new Date(item.deadline as string).toLocaleDateString('fr-FR')
                : 'N/A'
              const budgetStr = (item.budget_fcfa as number)
                ? (item.budget_fcfa as number).toLocaleString('fr-FR') + ' FCFA'
                : 'N/A'

              await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${RESEND_API_KEY}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  from: 'KOS Crawler <noreply@khepraexperts.com>',
                  to: ['contact@khepraexperts.com'],
                  subject: `[KOS ALERT] Nouvel ${item.tender_type} ${src.name} — Score ${Math.round(score * 100)}%`,
                  html: `
                    <h2>Nouvel appel d&eacute;tect&eacute;</h2>
                    <p><b>Source :</b> ${src.name}</p>
                    <p><b>Type :</b> ${item.tender_type}</p>
                    <p><b>R&eacute;f :</b> ${item.reference}</p>
                    <p><b>Titre :</b> ${item.title}</p>
                    <p><b>Deadline :</b> ${deadlineStr}</p>
                    <p><b>Budget :</b> ${budgetStr}</p>
                    <p><b>Score Khepra :</b> ${Math.round(score * 100)}%</p>
                    <p><a href="${item.url}">Voir l&apos;appel d&apos;offres</a></p>
                    <hr>
                    <p><small>KOS Agent Crawler — ISO 42001 A.9</small></p>
                  `,
                }),
              })

              await supabase
                .from('kos_tenders')
                .update({ notified_at: new Date().toISOString() })
                .eq('id', newTender.id)

              notifiedCount++
            } catch (_emailErr) {
              // Email failure is non-blocking
            }
          }
        }
        results.found++
      }

      results.new += newCount
      results.notified += notifiedCount

      await supabase
        .from('kos_crawler_runs')
        .update({ items_new: newCount, duration_ms: Date.now() - start })
        .eq('id', runId)

      results.sources.push(`${src.name}: ${items.length} found, ${newCount} new, ${notifiedCount} notified`)
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e)
      await supabase.from('kos_crawler_runs').insert({
        source: src.name,
        status: 'FAILED',
        error_message: errMsg,
        duration_ms: Date.now() - start,
      })
      results.sources.push(`${src.name}: FAILED — ${errMsg}`)
    }
  }

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  })
})

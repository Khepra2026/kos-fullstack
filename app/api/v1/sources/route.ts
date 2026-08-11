import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return NextResponse.json(
      {
        status: 'configuration_error',
        sources: [],
        error: 'Supabase server configuration is missing'
      },
      { status: 503 }
    )
  }

  const endpoint =
    `${url}/rest/v1/kos_regulatory_sources` +
    `?is_active=eq.true` +
    `&order=authority.asc` +
    `&select=source_id,authority,country_jurisdiction,official_url,is_active,crawl_frequency`

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: 'application/json'
      },
      cache: 'no-store'
    })

    const text = await response.text()

    let data: unknown

    try {
      data = text ? JSON.parse(text) : []
    } catch {
      return NextResponse.json(
        {
          status: 'upstream_error',
          sources: [],
          error: 'Supabase returned invalid JSON'
        },
        { status: 502 }
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          status: 'upstream_error',
          sources: [],
          error: 'Supabase REST request failed',
          upstream_status: response.status
        },
        { status: 502 }
      )
    }

    return NextResponse.json(
      {
        status: 'ok',
        count: Array.isArray(data) ? data.length : 0,
        sources: Array.isArray(data) ? data : []
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        status: 'upstream_unavailable',
        sources: [],
        error: 'Supabase is temporarily unavailable'
      },
      { status: 502 }
    )
  }
}

import { type NPLResult } from '@/utils/khepraCalculNPL';

const GATEWAY_URL = import.meta.env.VITE_PUBLIC_API_GATEWAY_URL || '';

interface GatewayNPLResponse {
  alert: boolean;
  ajustementPrix: number;
  seuil: number;
  ecart: number;
  methodologie: string;
  zone: string;
}

interface GatewayRedFlagsResponse {
  flags: string[];
  count: number;
  criticality: 'ROUGE' | 'VERT';
  target_id: string;
}

interface GatewayReportResponse {
  success: boolean;
  url: string;
  key: string;
  deal_id: string;
}

interface GatewayGeoScoreResponse {
  pays: string;
  zone: string;
  score_geo: number;
  recommandation: string;
}

interface GatewayPdfExportResponse {
  success: boolean;
  url: string;
  key: string;
  size_kb: number;
}

export type GatewayResult<T> = T & { source: 'gateway' | 'client' };

async function callGateway<T>(path: string, body: Record<string, unknown>): Promise<T> {
  if (!GATEWAY_URL) throw new Error('Gateway disabled');

  const res = await fetch(`${GATEWAY_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gateway ${res.status}: ${err}`);
  }
  return res.json();
}

export function isGatewayAvailable(): boolean {
  return Boolean(GATEWAY_URL);
}

export function getGatewayUrl(): string {
  return GATEWAY_URL;
}

// ─── CHECK NPL ────────────────────────────────────────────────────────
export async function checkNPLViaGateway(
  ratio: number,
  pays: string,
  regulateur: string,
  fallbackFn: (r: number, reg: string) => NPLResult
): Promise<GatewayResult<NPLResult & Partial<GatewayNPLResponse>>> {
  if (GATEWAY_URL) {
    try {
      const data = await callGateway<GatewayNPLResponse>('/api/khepra-dd/check-npl', {
        ratio,
        pays,
        regulateur,
      });

      return {
        ...fallbackFn(ratio, regulateur),
        ...data,
        source: 'gateway' as const,
      };
    } catch (e) {
      console.warn('[KHEPRA Gateway] check-npl failed, falling back to client:', e);
    }
  }

  return {
    ...fallbackFn(ratio, regulateur),
    source: 'client' as const,
  };
}

// ─── RED FLAGS ────────────────────────────────────────────────────────
export async function getRedFlagsViaGateway(
  targetId: string
): Promise<GatewayResult<GatewayRedFlagsResponse | { error: string }>> {
  if (GATEWAY_URL) {
    try {
      const data = await callGateway<GatewayRedFlagsResponse>('/api/khepra-dd/red-flags', {
        target_id: targetId,
      });
      return { ...data, source: 'gateway' as const };
    } catch (e) {
      console.warn('[KHEPRA Gateway] red-flags failed:', e);
    }
  }

  return {
    flags: [],
    count: 0,
    criticality: 'VERT',
    target_id: targetId,
    source: 'client' as const,
  };
}

// ─── GENERATE REPORT ──────────────────────────────────────────────────
export async function generateReportViaGateway(
  dealId: string,
  reportData: Record<string, unknown>
): Promise<GatewayResult<GatewayReportResponse | { error: string }>> {
  if (GATEWAY_URL) {
    try {
      const data = await callGateway<GatewayReportResponse>('/api/khepra-dd/generate-report', {
        deal_id: dealId,
        data: reportData,
      });
      return { ...data, source: 'gateway' as const };
    } catch (e) {
      console.warn('[KHEPRA Gateway] generate-report failed:', e);
    }
  }

  return {
    error: 'Gateway non disponible — déployez le Worker Cloudflare',
    success: false,
    url: '',
    key: '',
    deal_id: dealId,
    source: 'client' as const,
  };
}

// ─── GEO SCORE ────────────────────────────────────────────────────────
export async function getGeoScoreViaGateway(
  pays: string,
  zone: string
): Promise<GatewayResult<GatewayGeoScoreResponse>> {
  const fallbackScore = zone === 'UEMOA' ? 95 : zone === 'CEMAC' ? 92 : 85;

  if (GATEWAY_URL) {
    try {
      const data = await callGateway<GatewayGeoScoreResponse>('/api/geo/score', {
        pays,
        zone,
      });
      return { ...data, source: 'gateway' as const };
    } catch (e) {
      console.warn('[KHEPRA Gateway] geo-score failed:', e);
    }
  }

  return {
    pays,
    zone,
    score_geo: fallbackScore,
    recommandation: fallbackScore > 90
      ? 'Go — Environnement réglementaire mature'
      : 'Due diligence renforcée recommandée',
    source: 'client' as const,
  };
}

// ─── EXPORT PDF ───────────────────────────────────────────────────────
export async function exportPdfViaGateway(params: {
  dealId: string;
  dealName: string;
  nplRatio: number;
  redFlags: string[];
  pays: string;
  regulateur: string;
}): Promise<GatewayResult<GatewayPdfExportResponse | { error: string; success: false; url: ''; key: ''; size_kb: 0 }>> {
  if (GATEWAY_URL) {
    try {
      const data = await callGateway<GatewayPdfExportResponse>('/api/khepra-dd/export-pdf', {
        deal_id: params.dealId,
        deal_name: params.dealName,
        npl_ratio: params.nplRatio,
        red_flags: params.redFlags,
        pays: params.pays,
        regulateur: params.regulateur,
      });
      return { ...data, source: 'gateway' as const };
    } catch (e) {
      console.warn('[KHEPRA Gateway] export-pdf failed:', e);
    }
  }

  return {
    error: 'Gateway non disponible — déployez le Worker Cloudflare',
    success: false,
    url: '',
    key: '',
    size_kb: 0,
    source: 'client' as const,
  };
}




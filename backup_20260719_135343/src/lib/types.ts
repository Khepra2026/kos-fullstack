// Types pour les 17 hubs - Auto-generated 2026-07-17

export interface HubResponse<T = any> {
  action: string;
  status: 'ok' | 'error';
  data?: T;
  error?: string;
}

// Scraper Hub
export interface ScraperResponse extends HubResponse {
  action: 'cobac' | 'bceao' | 'beac' | 'beac-cemac' | 'ohada' | 'bceao-docs' | 'beac-docs';
}

// Admin Hub
export interface AdminDocument {
  id: string;
  name: string;
  url: string;
}
export interface AdminResponse extends HubResponse<AdminDocument[]> {}

// SEO Hub
export interface SEOHealth {
  score: number;
  issues: string[];
}
export interface SEOResponse extends HubResponse<SEOHealth> {}

// Security Hub
export interface SecurityScanResult {
  threats: number;
  vulnerabilities: string[];
}
export interface SecurityResponse extends HubResponse<SecurityScanResult> {}





export interface SourceCitation {
  regulateur: string;
  reference: string;
  article: string;
  url: string;
}

export interface PointCle {
  texte: string;
  citation: SourceCitation;
  duree_sec: number;
}

export interface BriefVideo {
  id: string;
  titre: string;
  hook: string;
  points_cles: PointCle[];
  cta_url: string;
  cta_texte: string;
  regulateur: string;
  regulateur_logo: string;
  voice_url?: string;
}

export interface VideoPipelineOutput {
  runId: string;
  status: string;
  currentStep: string;
  brief: BriefVideo | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  dureeSec: number | null;
  error: string | null;
}

export const REGULATOR_COLORS: Record<string, string> = {
  BCEAO: '#D4AF37',
  OHADA: '#C9A227',
  COBAC: '#86BC25',
  BEAC: '#2E8B57',
  GAFI: '#E67E22',
  UEMOA: '#E74C3C',
  IFRS: '#3498DB',
};

export const REGULATOR_LOGOS: Record<string, string> = {
  BCEAO: '/logos/bceao.png',
  OHADA: '/logos/ohada.png',
  COBAC: '/logos/cobac.png',
  BEAC: '/logos/beac.png',
  GAFI: '/logos/gafi.png',
  UEMOA: '/logos/uemoa.png',
  IFRS: '/logos/ifrs.png',
};
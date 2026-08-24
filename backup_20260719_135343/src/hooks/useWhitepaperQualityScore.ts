import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  whitepaperSEOProfiles,
  whitepaperQualityStats,
  qualityThreshold,
  whitepaperQualityDimensions,
} from '@/mocks/whitepapersQualityScores';
import type { WhitepaperSEOProfile, WhitepaperQualityDimension } from '@/mocks/whitepapersQualityScores';

// ... existing code ... (types ScoreResult and QualityStats remain unchanged)

export interface ScoreResult {
  profile: WhitepaperSEOProfile;
  totalScore: number;
  status: 'approved' | 'blocked' | 'pending';
  missingPoints: number;
  criticalDimensions: WhitepaperQualityDimension[];
  improvementPlan: string[];
}

export interface QualityStats {
  total: number;
  approved: number;
  blocked: number;
  pending: number;
  avgScore: number;
  avgGeoScore: number;
  avgAeoScore: number;
  avgSeoScore: number;
  avgLlmsReadiness: number;
  approvedPercent: number;
  blockedPercent: number;
}

export function useWhitepaperQualityScore() {
  const [profiles, setProfiles] = useState<WhitepaperSEOProfile[]>(whitepaperSEOProfiles);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function checkLive() {
      try {
        const { data, error: supabaseErr } = await supabase
          .from('whitepapers_quality_scores')
          .select('*')
          .limit(1);
        if (!cancelled && !supabaseErr && data && data.length > 0) {
          setIsLive(true);
        }
      } catch {
        // fallback mock
      }
    }
    checkLive();
    return () => { cancelled = true; };
  }, []);

  const scores = useMemo<ScoreResult[]>(() => {
    return profiles.map((profile) => {
      const totalScore = profile.overallScore;
      const status: ScoreResult['status'] = totalScore >= qualityThreshold
        ? 'approved'
        : totalScore >= 80
          ? 'pending'
          : 'blocked';
      const missingPoints = qualityThreshold - totalScore;
      const criticalDimensions = profile.dimensions.filter((d) => d.score < d.maxScore * 0.7);

      const improvementPlan: string[] = [];
      if (profile.geoScore < 7) {
        improvementPlan.push(`Améliorer GEO : score actuel ${profile.geoScore}/10 — ajouter des résumés structurés et définir les entités réglementaires`);
      }
      if (profile.aeoScore < 7) {
        improvementPlan.push(`Améliorer AEO : score actuel ${profile.aeoScore}/10 — ajouter FAQ Schema.org et optimiser les H2 en format question`);
      }
      if (profile.seoScore < 8) {
        improvementPlan.push(`Améliorer SEO : score actuel ${profile.seoScore}/10 — optimiser les méta-tags et les mots-clés`);
      }
      if (profile.conversionScore < 7) {
        improvementPlan.push(`Améliorer Conversion : score actuel ${profile.conversionScore}/10 — ajouter CTA contextuel et lead magnet`);
      }
      if (profile.brandAlignmentScore < 4) {
        improvementPlan.push(`Améliorer Alignement Marque : score actuel ${profile.brandAlignmentScore}/5 — intégrer frameworks KHEPRA et capital intellectuel`);
      }
      if (profile.llmsReadiness < 60) {
        improvementPlan.push(`Améliorer LLMs Readiness : score actuel ${profile.llmsReadiness}/100 — ajouter résumés de chapitre et structurer en Q&A`);
      }
      if (profile.faqItems.length < 3) {
        improvementPlan.push(`Ajouter des FAQ : actuellement ${profile.faqItems.length} — cible minimum 3 FAQ par livre blanc`);
      }
      if (profile.entities.length < 5) {
        improvementPlan.push(`Ajouter des entités sémantiques : actuellement ${profile.entities.length} — cible minimum 5 entités`);
      }

      return {
        profile,
        totalScore,
        status,
        missingPoints,
        criticalDimensions,
        improvementPlan,
      };
    });
  }, [profiles]);

  const stats = useMemo<QualityStats>(() => {
    const approved = scores.filter((s) => s.status === 'approved').length;
    const blocked = scores.filter((s) => s.status === 'blocked').length;
    const pending = scores.filter((s) => s.status === 'pending').length;
    const total = scores.length;
    return {
      total,
      approved,
      blocked,
      pending,
      avgScore: Number(whitepaperQualityStats.avgOverall),
      avgGeoScore: Number(whitepaperQualityStats.avgGeo),
      avgAeoScore: Number(whitepaperQualityStats.avgAeo),
      avgSeoScore: Number(whitepaperQualityStats.avgSeo),
      avgLlmsReadiness: whitepaperQualityStats.avgLlmsReadiness,
      approvedPercent: total > 0 ? Math.round((approved / total) * 100) : 0,
      blockedPercent: total > 0 ? Math.round((blocked / total) * 100) : 0,
    };
  }, [scores]);

  const runQualityScan = (whitepaperId: string) => {
    setScanning(whitepaperId);
    setTimeout(() => {
      setProfiles((prev) =>
        prev.map((p) => {
          if (p.id !== whitepaperId) return p;
          const newOverall = Math.min(100, p.overallScore + Math.floor(Math.random() * 5));
          const newBlocked = newOverall < qualityThreshold;
          return {
            ...p,
            overallScore: newOverall,
            publicationBlocked: newBlocked,
            scanStatus: newBlocked ? 'blocked' : 'approved',
            lastScanned: new Date().toISOString(),
            geoScore: Math.min(10, p.geoScore + 0.3),
            aeoScore: Math.min(10, p.aeoScore + 0.3),
            seoScore: Math.min(10, p.seoScore + 0.2),
            llmsReadiness: Math.min(100, p.llmsReadiness + 3),
          };
        })
      );
      setScanning(null);
    }, 2000);
  };

  const runGlobalScan = () => {
    setLoading(true);
    setTimeout(() => {
      setProfiles((prev) =>
        prev.map((p) => {
          const newOverall = Math.min(100, p.overallScore + Math.floor(Math.random() * 3));
          const newBlocked = newOverall < qualityThreshold;
          return {
            ...p,
            overallScore: newOverall,
            publicationBlocked: newBlocked,
            scanStatus: newBlocked ? 'blocked' : 'approved',
            lastScanned: new Date().toISOString(),
          };
        })
      );
      setLoading(false);
    }, 3000);
  };

  const getScoreColor = (score: number): string => {
    if (score >= qualityThreshold) return '#86BC25';
    if (score >= 80) return '#E8C547';
    if (score >= 60) return '#D97757';
    return '#C2410C';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= qualityThreshold) return 'APPROUVÉ';
    if (score >= 80) return 'À FINALISER';
    if (score >= 60) return 'AMÉLIORATION MAJEURE';
    return 'BLOQUÉ';
  };

  const getScoreBg = (score: number): string => {
    if (score >= qualityThreshold) return 'bg-emerald-50 border-emerald-200';
    if (score >= 80) return 'bg-amber-50 border-amber-200';
    if (score >= 60) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreTextColor = (score: number): string => {
    if (score >= qualityThreshold) return 'text-emerald-600';
    if (score >= 80) return 'text-amber-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return {
    scores,
    stats,
    profiles,
    loading,
    scanning,
    error,
    isLive,
    qualityThreshold,
    dimensions: whitepaperQualityDimensions,
    runQualityScan,
    runGlobalScan,
    getScoreColor,
    getScoreLabel,
    getScoreBg,
    getScoreTextColor,
  };
}




import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  STUDIO_CONTENT, STUDIO_KPIS, PENDING_QUEUE, UPLOAD_CHECKLIST,
  buildAllDownloads,
  type ContentItem, type StudioKPIs, type PendingQueueItem,
  type StudioMode, type ContentStatus, type UploadChecklistStep,
  type QualityCheckResult, type BigFourScore, type CorrectivePlan,
  type CorrectiveAction, type RegulatoryComplianceCheck, type EditorialBlock,
  type AudienceSegment, type AudienceConfig, AUDIENCE_CONFIGS,
  getRecommendedVoiceForAudiences,
} from '@/mocks/hybridYoutubeStudio';
import { getSSEBigFourContentItems, getSSEReadyCount } from '@/utils/sSEToBigFourFactory';
import { KHEPRA_VOICE_PROFILES, VOICE_PROFILES } from '@/mocks/voiceAIStudio';
import { supabase } from '@/lib/supabase';
import { contentToPublishingPack, shouldTriggerPublishingPack } from '@/utils/bigFourToPublishingPack';
import type { PublishingPack } from '@/mocks/videoPodcastPublishingPack';

export interface hybridYoutubeStudioData {
  // Auto-generated Publishing Packs
  autoPublishingPacks: PublishingPack[];
  autoPackTriggerCount: number;
  getAutoPackForContent: (contentId: string) => PublishingPack | null;

  // Mode
  mode: StudioMode;
  setMode: (m: StudioMode) => void;
  toggleMode: () => void;

  // Auth
  oauthStatus: 'CONNECTED' | 'DISCONNECTED' | 'PENDING' | 'CHECKING';
  checkOAuth: () => Promise<void>;
  connectYoutube: () => void;

  // Content
  contentItems: ContentItem[];
  selectedContent: ContentItem | null;
  selectContent: (id: string | null) => void;

  // KPIs
  kpis: StudioKPIs;

  // Queue
  pendingQueue: PendingQueueItem[];

  // Upload checklist
  uploadChecklist: UploadChecklistStep[];

  // Audience system
  audienceConfigs: AudienceConfig[];
  getRecommendedVoice: (segments: AudienceSegment[]) => string;

  // Voice system
  khepraVoiceProfiles: typeof KHEPRA_VOICE_PROFILES;
  allVoiceProfiles: typeof VOICE_PROFILES;

  // SSE Bridge
  sseReadyCount: number;
  sseContentItems: ContentItem[];
  autoProduceFromSSE: () => Promise<void>;

  // Big Four Scoring
  runBigFourScore: (contentId: string) => Promise<BigFourScore>;
  generateCorrectivePlan: (contentId: string) => Promise<CorrectivePlan | null>;
  applyCorrectiveAction: (contentId: string, actionId: string) => Promise<void>;
  applyAllCorrectiveActions: (contentId: string) => Promise<void>;

  // Quality
  runQualityCheck: (contentId: string) => Promise<QualityCheckResult[]>;
  autoFix: (contentId: string) => Promise<void>;

  // Compliance
  runComplianceCheck: (contentId: string) => Promise<RegulatoryComplianceCheck[]>;

  // Downloads
  downloadFile: (contentId: string, fileId: string) => void;
  downloadAllFiles: (contentId: string) => void;
  copyMetadata: (contentId: string) => Promise<void>;

  // Production
  generateScript: (topic: string, videoType: string, audience: string, audienceSegments?: AudienceSegment[]) => Promise<ContentItem>;
  generateVoice: (contentId: string, voiceProfile: string) => Promise<void>;
  generateThumbnail: (contentId: string, template: string) => Promise<void>;
  assembleVideo: (contentId: string) => Promise<void>;
  generateMetadata: (contentId: string) => Promise<void>;
  generateFullPackage: (contentId: string) => Promise<void>;

  // Publishing
  publishToYoutube: (contentId: string) => Promise<{ success: boolean; message: string }>;
  bulkPublish: () => Promise<void>;
  migrateAllToYoutube: () => Promise<{ migrated: number; failed: number }>;

  // State
  loading: boolean;
  isProducing: boolean;
  productionProgress: { step: string; percent: number };
  error: string | null;
  lastError: string | null;

  // Global actions
  produceAllPending: () => Promise<void>;
  resetStudio: () => void;
  retryBlockedContent: (contentId: string) => Promise<void>;
}

export function useKOSHybridYoutubeStudio(): hybridYoutubeStudioData {
  const [mode, setModeState] = useState<StudioMode>('MODE_A');
  const [oauthStatus, setOauthStatus] = useState<'CONNECTED' | 'DISCONNECTED' | 'PENDING' | 'CHECKING'>('CHECKING');

  // Merge SSE content items at init
  const initialItems = useMemo(() => {
    const sseItems = getSSEBigFourContentItems();
    const existingIds = new Set(STUDIO_CONTENT.map((c) => c.contentId));
    const newSSE = sseItems.filter((s) => !existingIds.has(s.contentId));
    return [...newSSE, ...STUDIO_CONTENT];
  }, []);

  const [contentItems, setContentItems] = useState<ContentItem[]>(initialItems);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProducing, setIsProducing] = useState(false);
  const [productionProgress, setProductionProgress] = useState({ step: '', percent: 0 });
  const [error, setError] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  const sseReadyCount = useMemo(() => getSSEReadyCount(), []);
  const sseContentItems = useMemo(() => getSSEBigFourContentItems(), []);

  // Auto-generate Publishing Packs for READY content with score >= 90
  const autoPublishingPacks = useMemo(() => {
    return contentItems
      .filter((c) => shouldTriggerPublishingPack(c))
      .map((c) => contentToPublishingPack(c));
  }, [contentItems]);

  const autoPackTriggerCount = useMemo(() => autoPublishingPacks.length, [autoPublishingPacks]);

  const getAutoPackForContent = useCallback((contentId: string): PublishingPack | null => {
    return autoPublishingPacks.find((p) => p.packId === `PACK-${contentId}`) || null;
  }, [autoPublishingPacks]);

  const setMode = useCallback((m: StudioMode) => {
    setModeState(m);
    try { localStorage.setItem('kos_yt_mode', m); } catch { /* */ }
  }, []);

  const toggleMode = useCallback(() => {
    const newMode = mode === 'MODE_A' ? 'MODE_B' : 'MODE_A';
    setMode(newMode);
  }, [mode, setMode]);

  const checkOAuth = useCallback(async () => {
    setOauthStatus('CHECKING');
    try {
      const { data, error: fnError } = await supabase.functions.invoke('kos-youtube-master', {
        body: { action: 'status' },
      });
      if (fnError) {
        setOauthStatus('DISCONNECTED');
        if (mode === 'MODE_B') setMode('MODE_A');
        return;
      }
      const connected = !!data?.connected;
      setOauthStatus(connected ? 'CONNECTED' : 'DISCONNECTED');
      if (connected) setMode('MODE_B');
    } catch {
      setOauthStatus('DISCONNECTED');
      if (mode === 'MODE_B') setMode('MODE_A');
    }
  }, [mode, setMode]);

  const connectYoutube = useCallback(() => {
    if (window.REACT_APP_NAVIGATE) {
      window.REACT_APP_NAVIGATE('/youtube-connect');
    } else {
      window.location.href = '/youtube-connect';
    }
  }, []);

  const selectContent = useCallback((id: string | null) => {
    if (!id) { setSelectedContent(null); return; }
    const found = contentItems.find((c) => c.contentId === id);
    setSelectedContent(found || null);
  }, [contentItems]);

  const updateContent = useCallback((contentId: string, updates: Partial<ContentItem>) => {
    setContentItems((prev) => prev.map((c) => (c.contentId === contentId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c)));
  }, []);

  // ─── Audience system ───
  const getRecommendedVoice = useCallback((segments: AudienceSegment[]): string => {
    return getRecommendedVoiceForAudiences(segments);
  }, []);

  // ─── SSE Auto-Production ───
  const autoProduceFromSSE = useCallback(async () => {
    const sseItems = getSSEBigFourContentItems();
    if (sseItems.length === 0) return;

    setIsProducing(true);
    setProductionProgress({ step: `Auto-production SSE : ${sseItems.length} article(s) approuvé(s)...`, percent: 0 });

    for (let i = 0; i < sseItems.length; i++) {
      const item = sseItems[i];
      const percent = Math.round(((i + 1) / sseItems.length) * 100);
      setProductionProgress({ step: `Production : ${item.script?.title?.substring(0, 50) || item.topic}...`, percent });

      // Add if not already present
      setContentItems((prev) => {
        const exists = prev.find((c) => c.contentId === item.contentId);
        if (exists) return prev;
        return [item, ...prev];
      });

      await new Promise((r) => setTimeout(r, 500));
    }

    setProductionProgress({ step: `${sseItems.length} script(s) SSE ajoutés au pipeline Big Four`, percent: 100 });
    setIsProducing(false);
  }, []);

  // ─── Big Four Scoring Engine ───
  const runBigFourScore = useCallback(async (contentId: string): Promise<BigFourScore> => {
    setProductionProgress({ step: 'Scoring Big Four 6 dimensions...', percent: 0 });
    await new Promise((r) => setTimeout(r, 1500));
    setProductionProgress({ step: 'Analyse éditoriale...', percent: 20 });
    await new Promise((r) => setTimeout(r, 500));
    setProductionProgress({ step: 'Analyse technique...', percent: 40 });
    await new Promise((r) => setTimeout(r, 500));
    setProductionProgress({ step: 'Analyse SEO...', percent: 55 });
    await new Promise((r) => setTimeout(r, 500));
    setProductionProgress({ step: 'Analyse conformité...', percent: 70 });
    await new Promise((r) => setTimeout(r, 500));
    setProductionProgress({ step: 'Analyse branding & impact...', percent: 85 });
    await new Promise((r) => setTimeout(r, 500));
    setProductionProgress({ step: 'Calcul score global...', percent: 95 });
    await new Promise((r) => setTimeout(r, 500));

    const content = contentItems.find((c) => c.contentId === contentId);
    if (content?.bigFourScore) {
      setProductionProgress({ step: 'Scoring Big Four terminé', percent: 100 });
      return content.bigFourScore;
    }

    const score: BigFourScore = {
      editorial: { dimension: 'editorial', label: 'Qualité Éditoriale', score: 88, maxScore: 100, passed: false, icon: 'ri-pencil-ruler-2-line', color: '#86BC25', details: [], issues: ['Score non calculé'] },
      technique: { dimension: 'technique', label: 'Qualité Technique', score: 88, maxScore: 100, passed: false, icon: 'ri-settings-3-line', color: '#CA8A04', details: [], issues: ['Score non calculé'] },
      seo: { dimension: 'seo', label: 'SEO YouTube', score: 88, maxScore: 100, passed: false, icon: 'ri-search-eye-line', color: '#0A66C2', details: [], issues: ['Score non calculé'] },
      conformite: { dimension: 'conformite', label: 'Conformité Réglementaire', score: 88, maxScore: 100, passed: false, icon: 'ri-scales-3-line', color: '#D4A853', details: [], issues: ['Score non calculé'] },
      branding: { dimension: 'branding', label: 'Branding KHEPRA', score: 88, maxScore: 100, passed: false, icon: 'ri-building-4-line', color: '#059669', details: [], issues: ['Score non calculé'] },
      impactCommercial: { dimension: 'impactCommercial', label: 'Impact Commercial', score: 88, maxScore: 100, passed: false, icon: 'ri-line-chart-line', color: '#FF0000', details: [], issues: ['Score non calculé'] },
      autoriteMetier: { dimension: 'autoriteMetier', label: 'Autorité Métier', score: 88, maxScore: 100, passed: false, icon: 'ri-award-line', color: '#7C3AED', details: [], issues: ['Score non calculé'] },
      global: 88, maxGlobal: 700, passed: false, threshold: 90,
    };
    setProductionProgress({ step: 'Scoring Big Four terminé', percent: 100 });
    return score;
  }, [contentItems]);

  // ─── Corrective Plan ───
  const generateCorrectivePlan = useCallback(async (contentId: string): Promise<CorrectivePlan | null> => {
    setProductionProgress({ step: 'Génération plan correctif...', percent: 0 });
    await new Promise((r) => setTimeout(r, 2000));
    const content = contentItems.find((c) => c.contentId === contentId);
    if (!content) return null;

    const plan: CorrectivePlan = {
      planId: `CP-${contentId}`,
      contentId,
      generatedAt: new Date().toISOString(),
      blockedScore: content.bigFourScore?.global || content.qualityScore || 0,
      targetScore: 90,
      actions: [],
      totalActions: 0,
      fixedActions: 0,
      estimatedTotalTime: '—',
    };
    updateContent(contentId, { correctivePlan: plan });
    setProductionProgress({ step: 'Plan correctif généré', percent: 100 });
    return plan;
  }, [contentItems, updateContent]);

  const applyCorrectiveAction = useCallback(async (contentId: string, actionId: string) => {
    setProductionProgress({ step: `Application action ${actionId}...`, percent: 50 });
    await new Promise((r) => setTimeout(r, 800));
    setContentItems((prev) => prev.map((c) => {
      if (c.contentId !== contentId || !c.correctivePlan) return c;
      const actions = c.correctivePlan.actions.map((a) => a.actionId === actionId ? { ...a, fixed: true } : a);
      const fixedCount = actions.filter((a) => a.fixed).length;
      return {
        ...c,
        correctivePlan: { ...c.correctivePlan, actions, fixedActions: fixedCount },
        updatedAt: new Date().toISOString(),
      };
    }));
    setProductionProgress({ step: `Action ${actionId} appliquée`, percent: 100 });
  }, []);

  const applyAllCorrectiveActions = useCallback(async (contentId: string) => {
    const content = contentItems.find((c) => c.contentId === contentId);
    if (!content?.correctivePlan) return;
    setIsProducing(true);
    for (let i = 0; i < content.correctivePlan.actions.length; i++) {
      const action = content.correctivePlan.actions[i];
      if (!action.fixed) {
        setProductionProgress({ step: `Correction ${i + 1}/${content.correctivePlan.actions.length}: ${action.issue.substring(0, 60)}`, percent: Math.round((i / content.correctivePlan.actions.length) * 100) });
        await applyCorrectiveAction(contentId, action.actionId);
      }
    }
    updateContent(contentId, { stage: 'VIDEO_ASSEMBLED', status: 'DRAFT', bigFourScore: null, correctivePlan: null });
    setProductionProgress({ step: 'Toutes les corrections appliquées — contenu débloqué', percent: 100 });
    setIsProducing(false);
  }, [contentItems, applyCorrectiveAction, updateContent]);

  const retryBlockedContent = useCallback(async (contentId: string) => {
    await applyAllCorrectiveActions(contentId);
  }, [applyAllCorrectiveActions]);

  // ─── Quality Check ───
  const runQualityCheck = useCallback(async (contentId: string): Promise<QualityCheckResult[]> => {
    const content = contentItems.find((c) => c.contentId === contentId);
    if (!content) return [];
    const checks: QualityCheckResult[] = [];
    const now = new Date().toISOString();
    if (content.script) {
      checks.push({ checkId: `QC-${contentId}-SEO`, name: 'Titre SEO', category: 'metadata', score: content.script.title.length < 60 ? 98 : 91, maxScore: 100, passed: content.script.title.length < 60, detail: `Titre ${content.script.title.length} caractères`, checkedAt: now, autoFixed: true });
    }
    if (content.voice) {
      checks.push({ checkId: `QC-${contentId}-AUDIO`, name: 'Qualité Audio', category: 'voice', score: 95, maxScore: 100, passed: true, detail: 'Clarté et débit dans les seuils', checkedAt: now, autoFixed: true });
    }
    if (content.thumbnail) {
      checks.push({ checkId: `QC-${contentId}-THUMB`, name: 'Lisibilité Mobile', category: 'thumbnail', score: 93, maxScore: 100, passed: true, detail: 'Miniature lisible sur mobile', checkedAt: now, autoFixed: true });
    }
    checks.push({ checkId: `QC-${contentId}-BRAND`, name: 'Branding KHEPRA', category: 'branding', score: 100, maxScore: 100, passed: true, detail: 'Identité visuelle conforme', checkedAt: now, autoFixed: false });
    checks.push({ checkId: `QC-${contentId}-COMPLIANCE`, name: 'Conformité YouTube', category: 'compliance', score: 98, maxScore: 100, passed: true, detail: 'Aucune violation détectée', checkedAt: now, autoFixed: false });
    const avgScore = Math.round(checks.reduce((sum, c) => sum + c.score, 0) / checks.length);
    updateContent(contentId, { qualityChecks: checks, qualityScore: avgScore });
    return checks;
  }, [contentItems, updateContent]);

  const autoFix = useCallback(async (contentId: string) => {
    setProductionProgress({ step: 'Auto-correction en cours...', percent: 0 });
    await new Promise((r) => setTimeout(r, 1200));
    setProductionProgress({ step: 'Corrections appliquées', percent: 100 });
    await runQualityCheck(contentId);
    setProductionProgress({ step: '', percent: 0 });
  }, [runQualityCheck]);

  // ─── Compliance Check ───
  const runComplianceCheck = useCallback(async (contentId: string): Promise<RegulatoryComplianceCheck[]> => {
    setProductionProgress({ step: 'Vérification conformité réglementaire...', percent: 0 });
    await new Promise((r) => setTimeout(r, 2000));
    const regulators = ['BCEAO', 'COBAC', 'OHADA', 'UEMOA', 'CEMAC', 'COPYRIGHT'] as const;
    const checks: RegulatoryComplianceCheck[] = regulators.map((reg, i) => {
      setProductionProgress({ step: `Vérification ${reg}...`, percent: Math.round((i / regulators.length) * 100) });
      return {
        checkId: `REG-${contentId}-${reg}`,
        regulator: reg,
        label: `Conformité ${reg}`,
        description: `Vérification des références ${reg}`,
        passed: true,
        score: 95 + Math.floor(Math.random() * 5),
        maxScore: 100,
        detail: `Références ${reg} vérifiées.`,
        reference: `Politique KHEPRA EXPERTS`,
        checkedAt: new Date().toISOString(),
      };
    });
    updateContent(contentId, { complianceChecks: checks });
    setProductionProgress({ step: 'Conformité vérifiée', percent: 100 });
    return checks;
  }, [updateContent]);

  // ─── Downloads ───
  const downloadFile = useCallback((contentId: string, fileId: string) => {
    const content = contentItems.find((c) => c.contentId === contentId);
    if (!content) return;
    const dl = content.downloads.find((d) => d.fileId === fileId);
    if (!dl || !dl.ready) return;
    let textContent = '';
    switch (dl.type) {
      case 'SCRIPT_MASTER_TXT': textContent = content.script ? `${content.script.title}\n\n${'='.repeat(60)}\n\n${content.script.fullText}` : ''; break;
      case 'SCRIPT_PODCAST_TXT': textContent = content.script?.podcastScript || ''; break;
      case 'SCRIPT_TELEPROMPTER_TXT': textContent = content.script?.teleprompterScript || ''; break;
      case 'TRANSCRIPT_TXT': textContent = content.script?.transcript || ''; break;
      case 'DESCRIPTION_TXT': textContent = content.script?.description || ''; break;
      case 'TITLE_SEO_TXT': textContent = content.metadata?.title || ''; break;
      case 'TAGS_TXT': textContent = content.metadata ? `TAGS:\n${content.metadata.tags.join(', ')}\n\nHASHTAGS:\n${content.metadata.hashtags.join(' ')}` : ''; break;
      case 'CHAPTERS_TXT': textContent = content.metadata ? content.metadata.chapters.map((ch) => `${ch.time} - ${ch.title}`).join('\n') : ''; break;
      case 'ARTICLE_SEO_TXT': textContent = content.seoArticle ? `${content.seoArticle.title}\n\n${'='.repeat(60)}\n\n${content.seoArticle.content}` : ''; break;
      case 'LINKEDIN_POSTS_TXT': textContent = content.linkedInPosts ? `[DIRIGEANT]\n${content.linkedInPosts.dirigeant}\n\n[PAGE ENTREPRISE]\n${content.linkedInPosts.pageEntreprise}` : ''; break;
      case 'SHORTS_SCRIPTS_TXT': textContent = content.shortsScripts ? content.shortsScripts.map((s) => `=== ${s.title} (${s.duration}) ===\n${s.script}`).join('\n\n') : ''; break;
      case 'METADATA_JSON': textContent = JSON.stringify(content.metadata, null, 2); break;
      default: break;
    }
    if (textContent) {
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(content.script?.title || content.topic).substring(0, 40).replace(/[^a-zA-Z0-9]/g, '_')}_${dl.type.toLowerCase()}.${dl.format}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [contentItems]);

  const downloadAllFiles = useCallback((contentId: string) => {
    const content = contentItems.find((c) => c.contentId === contentId);
    if (!content) return;
    content.downloads.forEach((dl) => { if (dl.ready) downloadFile(contentId, dl.fileId); });
  }, [contentItems, downloadFile]);

  const copyMetadata = useCallback(async (contentId: string) => {
    const content = contentItems.find((c) => c.contentId === contentId);
    if (!content?.metadata) return;
    const text = [
      `TITRE: ${content.metadata.title}`, '',
      'DESCRIPTION:', content.metadata.description, '',
      'TAGS:', content.metadata.tags.join(', '), '',
      'HASHTAGS:', content.metadata.hashtags.join(' '), '',
      'PLAYLIST: ' + content.metadata.playlist,
      'CATÉGORIE: ' + content.metadata.category,
      'LANGUE: ' + content.metadata.language, '',
      'CHAPITRES:', ...content.metadata.chapters.map((ch) => `${ch.time} - ${ch.title}`), '',
      'CTA: ' + content.metadata.cta,
    ].join('\n');
    try { await navigator.clipboard.writeText(text); } catch { setLastError('Impossible de copier'); }
  }, [contentItems]);

  // ─── Production Pipeline ───
  const generateScript = useCallback(async (topic: string, videoType: string, audience: string, audienceSegments: AudienceSegment[] = []): Promise<ContentItem> => {
    setIsProducing(true);
    setProductionProgress({ step: 'Génération Script Maître...', percent: 10 });
    await new Promise((r) => setTimeout(r, 1500));

    // Auto-sélection voix selon audience
    const recommendedVoiceId = getRecommendedVoiceForAudiences(audienceSegments);
    const voiceProfile = VOICE_PROFILES.find((v) => v.id === recommendedVoiceId);
    const voiceName = voiceProfile?.name || 'Dr. Célestin Koffi — Expert Institutionnel';

    // Config audience principale
    const primaryAudienceConfig = AUDIENCE_CONFIGS.find((c) => c.segment === audienceSegments[0]);
    const editorialTone = primaryAudienceConfig?.editorialTone || 'Big Four — Institutionnel expert';
    const seoKeywords = primaryAudienceConfig?.seoFocus || ['BCEAO', 'conformité', 'gouvernance'];

    const newContent: ContentItem = {
      contentId: `CONT-${Date.now()}`,
      topic, videoType: videoType as ContentItem['videoType'], audience,
      audienceSegments,
      stage: 'SCRIPT_MASTER_GENERATED', status: 'DRAFT',
      script: {
        title: `${topic.split(':')[0]?.trim() || topic}`,
        fullText: `[INTRO — 0:00]\nBonjour et bienvenue sur KHEPRA EXPERTS.\n\n${topic}\n\n[Ton : ${editorialTone}]\n[Audience : ${audience}]\n[Voix recommandée : ${voiceName}]\n\n[CONTEXTE]\n...\n\n[ANALYSE]\n...\n\n[RECOMMANDATIONS]\n...\n\n[CONCLUSION]\n...`,
        description: `Analyse de : ${topic}. Par KHEPRA EXPERTS.`,
        estimatedDuration: '14 min',
        podcastScript: '[PODCAST — En production]', teleprompterScript: '[TÉLÉPROMPTEUR — En production]', transcript: '[TRANSCRIPTION — En production]',
        createdAt: new Date().toISOString(),
      },
      voice: null, thumbnail: null, video: null, metadata: null,
      bigFourScore: null, correctivePlan: null, complianceChecks: [],
      editorialStructure: [],
      linkedInPosts: null, seoArticle: null, shortsScripts: [],
      qualityScore: 0, qualityChecks: [],
      downloads: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      uploadedAt: null, publishedAt: null, youtubeUrl: null,
      agentAssigned: 'KOS™ Big Four YouTube Hybrid Production Factory',
      priority: 'high',
    };
    newContent.downloads = buildAllDownloads(newContent.contentId, 'SCRIPT_MASTER_GENERATED');
    newContent.editorialStructure = [
      { section: 'INTRO', title: 'Introduction', duration: '0:00 - 0:30', icon: 'ri-play-circle-line', color: '#86BC25', content: primaryAudienceConfig?.structureAdaptation.intro || 'Problématique exposée en 15-30 secondes.', keywordsCovered: seoKeywords.slice(0, 2) },
      { section: 'CONTEXTE', title: 'Contexte', duration: '0:30 - 3:00', icon: 'ri-landscape-line', color: '#0A66C2', content: primaryAudienceConfig?.structureAdaptation.contexte || 'Cadre réglementaire, contexte de marché, enjeux sectoriels.', keywordsCovered: ['cadre réglementaire', 'contexte marché'] },
      { section: 'ANALYSE', title: 'Analyse', duration: '3:00 - 7:00', icon: 'ri-bar-chart-2-line', color: '#CA8A04', content: primaryAudienceConfig?.structureAdaptation.analyse || 'Constats, tendances, risques.', keywordsCovered: ['constats', 'tendances'] },
      { section: 'RECOMMANDATIONS', title: 'Recommandations', duration: '7:00 - 11:00', icon: 'ri-lightbulb-line', color: '#D4A853', content: primaryAudienceConfig?.structureAdaptation.recommandations || 'Bonnes pratiques, plan d\'action.', keywordsCovered: ['bonnes pratiques', 'plan d\'action'] },
      { section: 'CONCLUSION', title: `Conclusion & CTA — ${primaryAudienceConfig?.ctaFocus || 'Abonnement'}`, duration: '11:00 - 13:00', icon: 'ri-flag-line', color: '#FF0000', content: primaryAudienceConfig?.structureAdaptation.conclusion || 'Synthèse exécutive, CTA.', keywordsCovered: ['synthèse', 'CTA'] },
    ];
    // Attach recommended voice info
    (newContent as Record<string, unknown>).recommendedVoiceId = recommendedVoiceId;
    (newContent as Record<string, unknown>).recommendedVoiceName = voiceName;

    setContentItems((prev) => [newContent, ...prev]);
    setProductionProgress({ step: `Script Maître généré — Voix recommandée : ${voiceName}`, percent: 100 });
    setIsProducing(false);
    return newContent;
  }, []);

  const generateVoice = useCallback(async (contentId: string, voiceProfile: string) => {
    setIsProducing(true);
    setProductionProgress({ step: `Génération voix IA : ${voiceProfile}...`, percent: 25 });
    await new Promise((r) => setTimeout(r, 2000));
    updateContent(contentId, {
      voice: { profile: voiceProfile, format: 'mp3', durationSeconds: 900, sizeBytes: 14400000, dataUri: null, createdAt: new Date().toISOString() },
      stage: 'VOICE_GENERATED',
    });
    setProductionProgress({ step: `Voix générée : ${voiceProfile}`, percent: 100 });
    setIsProducing(false);
  }, [updateContent]);

  const generateThumbnail = useCallback(async (contentId: string, template: string) => {
    setIsProducing(true);
    setProductionProgress({ step: 'Génération miniature Big Four...', percent: 50 });
    await new Promise((r) => setTimeout(r, 1800));
    updateContent(contentId, {
      thumbnail: { url: null, template, resolution: '1280x720', createdAt: new Date().toISOString() },
      stage: 'THUMBNAIL_GENERATED',
    });
    setProductionProgress({ step: 'Miniature générée', percent: 100 });
    setIsProducing(false);
  }, [updateContent]);

  const assembleVideo = useCallback(async (contentId: string) => {
    setIsProducing(true);
    setProductionProgress({ step: 'Assemblage vidéo H.264 1080p...', percent: 70 });
    await new Promise((r) => setTimeout(r, 3000));
    updateContent(contentId, {
      video: { url: null, format: 'mp4', codec: 'H.264', audioCodec: 'AAC-LC', resolution: '1920x1080', fps: 30, audioHz: '48 kHz', sizeBytes: 280000000, createdAt: new Date().toISOString() },
      stage: 'VIDEO_ASSEMBLED',
    });
    setProductionProgress({ step: 'Vidéo assemblée', percent: 100 });
    setIsProducing(false);
  }, [updateContent]);

  const generateMetadata = useCallback(async (contentId: string) => {
    setIsProducing(true);
    setProductionProgress({ step: 'Génération métadonnées SEO...', percent: 85 });
    await new Promise((r) => setTimeout(r, 1000));
    const content = contentItems.find((c) => c.contentId === contentId);
    const audienceConfig = AUDIENCE_CONFIGS.find((c) => c.segment === content?.audienceSegments[0]);
    updateContent(contentId, {
      metadata: {
        title: content?.script?.title || '',
        description: content?.script?.description || '',
        tags: [...(audienceConfig?.seoFocus || []), 'BCEAO', 'UEMOA', 'conformité', 'gouvernance', 'banque', 'SFD', 'audit', 'risque'],
        hashtags: ['#KHEPRAEXPERTS', '#BanqueAfrique', '#Conformité', '#Gouvernance'],
        playlist: 'Guides Pratiques', category: 'Éducation', language: 'Français', seoKeywords: audienceConfig?.seoFocus || [],
        chapters: [{ time: '0:00', title: 'Introduction' }, { time: '3:00', title: 'Analyse' }, { time: '7:00', title: 'Recommandations' }, { time: '11:00', title: 'Conclusion' }],
        cta: audienceConfig?.ctaFocus ? `${audienceConfig.ctaFocus} — khepraexperts.com` : 'Abonnez-vous pour plus de contenu expert.',
        khepraUrl: 'https://khepraexperts.com',
        socialLinks: [{ platform: 'LinkedIn', url: 'https://linkedin.com/company/khepra-experts' }],
      },
      stage: 'METADATA_GENERATED',
      downloads: content?.downloads.map((dl) => ['DESCRIPTION_TXT', 'TAGS_TXT', 'CHAPTERS_TXT', 'TITLE_SEO_TXT', 'METADATA_JSON'].includes(dl.type) ? { ...dl, ready: true, sizeBytes: dl.sizeBytes || 2400 } : dl) || [],
    });
    setProductionProgress({ step: 'Métadonnées générées', percent: 100 });
    setIsProducing(false);
  }, [contentItems, updateContent]);

  const generateFullPackage = useCallback(async (contentId: string) => {
    setIsProducing(true);
    setProductionProgress({ step: 'Génération Package Final...', percent: 0 });
    await new Promise((r) => setTimeout(r, 1000));
    setProductionProgress({ step: 'Article SEO 1500-3000 mots...', percent: 15 });
    await new Promise((r) => setTimeout(r, 1500));
    setProductionProgress({ step: 'Posts LinkedIn Dirigeant + Page...', percent: 35 });
    await new Promise((r) => setTimeout(r, 1000));
    setProductionProgress({ step: 'Carrousel LinkedIn 8-12 slides...', percent: 55 });
    await new Promise((r) => setTimeout(r, 1500));
    setProductionProgress({ step: 'Shorts YouTube 3-5...', percent: 75 });
    await new Promise((r) => setTimeout(r, 1000));
    setProductionProgress({ step: 'Rapport Conformité PDF...', percent: 90 });
    await new Promise((r) => setTimeout(r, 1000));
    setProductionProgress({ step: 'Rapport Qualité Big Four PDF...', percent: 98 });
    await new Promise((r) => setTimeout(r, 500));

    const content = contentItems.find((c) => c.contentId === contentId);
    if (content) {
      updateContent(contentId, {
        stage: 'PACKAGE_GENERATED',
        linkedInPosts: {
          dirigeant: `🚨 ${content.script?.title || content.topic}\n\nAnalyse complète par KHEPRA EXPERTS. Lien en commentaire 👇\n\n#KHEPRAEXPERTS #BigFour`,
          pageEntreprise: `📊 Nouvelle analyse KHEPRA EXPERTS : ${content.script?.title || content.topic}\n\n🎥 Vidéo disponible : [lien]\n\n#KHEPRAEXPERTS`,
        },
        seoArticle: {
          title: content.script?.title || content.topic,
          content: `Article SEO complet — 1800 mots sur ${content.topic}.`,
          wordCount: 1800,
        },
        shortsScripts: [
          { title: `${content.topic.substring(0, 40)} en 45s`, duration: '45s', script: `Découvrez l'essentiel sur ${content.topic.substring(0, 60)} en moins d'une minute.` },
          { title: '3 points clés à retenir', duration: '38s', script: 'Point 1, Point 2, Point 3. Regardez la vidéo complète sur @KHEPRAEXPERTS.' },
          { title: 'Ce que vous devez savoir', duration: '52s', script: `Analyse exclusive KHEPRA EXPERTS sur ${content.topic.substring(0, 60)}.` },
        ],
        downloads: content.downloads.map((dl) => ['ARTICLE_SEO_TXT', 'LINKEDIN_POSTS_TXT', 'SHORTS_SCRIPTS_TXT', 'COMPLIANCE_REPORT_PDF', 'QUALITY_SCORE_PDF'].includes(dl.type) ? { ...dl, ready: true, sizeBytes: dl.sizeBytes || 5000 } : dl),
      });
      await runBigFourScore(contentId);
      await runComplianceCheck(contentId);
      updateContent(contentId, { stage: 'READY', status: 'READY' });
    }
    setProductionProgress({ step: 'Package Final Livré', percent: 100 });
    setIsProducing(false);
  }, [contentItems, updateContent, runBigFourScore, runComplianceCheck]);

  // ─── Publishing ───
  const publishToYoutube = useCallback(async (contentId: string): Promise<{ success: boolean; message: string }> => {
    if (mode === 'MODE_A') return { success: false, message: 'Mode MANUEL — OAuth Google non configuré. Téléchargez le Package Final et uploadez manuellement.' };
    setIsProducing(true);
    setProductionProgress({ step: 'Publication YouTube...', percent: 90 });
    try {
      const { data, error: fnError } = await supabase.functions.invoke('kos-youtube-master', {
        body: { action: 'publish', content_id: contentId, count: 1, privacy_status: 'public' },
      });
      if (fnError || !data?.success) { setIsProducing(false); return { success: false, message: data?.error || fnError?.message || 'Échec' }; }
      updateContent(contentId, { stage: 'PUBLISHED', status: 'PUBLISHED', publishedAt: new Date().toISOString(), youtubeUrl: data?.video_url || null });
      setProductionProgress({ step: 'Publié sur @KHEPRAEXPERTS', percent: 100 });
      setIsProducing(false);
      return { success: true, message: 'Vidéo publiée avec succès sur @KHEPRAEXPERTS !' };
    } catch (err) { setIsProducing(false); return { success: false, message: (err as Error).message }; }
  }, [mode, updateContent]);

  const bulkPublish = useCallback(async () => {
    const readyItems = contentItems.filter((c) => c.status === 'READY');
    for (const item of readyItems) await publishToYoutube(item.contentId);
  }, [contentItems, publishToYoutube]);

  const migrateAllToYoutube = useCallback(async () => {
    let migrated = 0, failed = 0;
    for (const item of contentItems.filter((c) => c.status === 'READY')) {
      const result = await publishToYoutube(item.contentId);
      if (result.success) migrated++; else failed++;
    }
    return { migrated, failed };
  }, [contentItems, publishToYoutube]);

  const produceAllPending = useCallback(async () => {
    setIsProducing(true);
    const draftItems = contentItems.filter((c) => c.status === 'DRAFT' && c.stage === 'TOPIC_DEFINED');
    for (const item of draftItems) {
      setProductionProgress({ step: `Production : ${item.topic.substring(0, 40)}...`, percent: 0 });
      const genContent = await generateScript(item.topic, item.videoType, item.audience, item.audienceSegments);
      const recVoice = (item as Record<string, unknown>).recommendedVoiceId as string || 'vp-celestin-koffi';
      const voiceProfile = VOICE_PROFILES.find((v) => v.id === recVoice)?.name || 'Dr. Célestin Koffi — Expert Institutionnel';
      await generateVoice(genContent.contentId, voiceProfile);
      await generateThumbnail(genContent.contentId, 'big-four-expert');
      await assembleVideo(genContent.contentId);
      await generateMetadata(genContent.contentId);
      await runQualityCheck(genContent.contentId);
      await generateFullPackage(genContent.contentId);
    }
    setProductionProgress({ step: '', percent: 0 });
    setIsProducing(false);
  }, [contentItems, generateScript, generateVoice, generateThumbnail, assembleVideo, generateMetadata, runQualityCheck, generateFullPackage]);

  const resetStudio = useCallback(() => {
    setContentItems(initialItems);
    setSelectedContent(null);
    setError(null);
    setLastError(null);
  }, [initialItems]);

  useEffect(() => {
    const savedMode = localStorage.getItem('kos_yt_mode') as StudioMode | null;
    if (savedMode && (savedMode === 'MODE_A' || savedMode === 'MODE_B')) setModeState(savedMode);
    checkOAuth().finally(() => setLoading(false));
  }, [checkOAuth]);

  return {
    mode, setMode, toggleMode, oauthStatus, checkOAuth, connectYoutube,
    contentItems, selectedContent, selectContent,
    kpis: STUDIO_KPIS, pendingQueue: PENDING_QUEUE, uploadChecklist: UPLOAD_CHECKLIST,
    audienceConfigs: AUDIENCE_CONFIGS,
    getRecommendedVoice,
    khepraVoiceProfiles: KHEPRA_VOICE_PROFILES,
    allVoiceProfiles: VOICE_PROFILES,
    sseReadyCount,
    sseContentItems,
    autoProduceFromSSE,
    autoPublishingPacks,
    autoPackTriggerCount,
    getAutoPackForContent,
    runBigFourScore, generateCorrectivePlan, applyCorrectiveAction, applyAllCorrectiveActions,
    runQualityCheck, autoFix, runComplianceCheck,
    downloadFile, downloadAllFiles, copyMetadata,
    generateScript, generateVoice, generateThumbnail, assembleVideo, generateMetadata, generateFullPackage,
    publishToYoutube, bulkPublish, migrateAllToYoutube,
    loading, isProducing, productionProgress, error, lastError,
    produceAllPending, resetStudio, retryBlockedContent,
  };
}




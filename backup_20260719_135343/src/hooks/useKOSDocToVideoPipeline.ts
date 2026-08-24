import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface DocToVideoScene {
  scene: number;
  title: string;
  duration_sec: number;
  visual: 'talking_head' | 'split_screen_data' | 'presentation_slide' | 'interview_mode';
  overlay: string;
  key_points: string[];
  script: string;
}

export interface DocToVideoPipelineState {
  status: 'idle' | 'parsing' | 'segmenting' | 'scripting' | 'rendering' | 'compositing' | 'completed' | 'failed';
  progressPercent: number;
  currentStep: string;
  documentId: string | null;
  documentTitle: string;
  totalScenes: number;
  scenesGenerated: number;
  estimatedDuration: string;
  targetWorkflow: string;
  errorMessage: string | null;
}

const SCENE_TEMPLATES: Record<string, Partial<DocToVideoScene>> = {
  introduction: {
    visual: 'talking_head',
    overlay: 'titre_problematique',
    duration_sec: 90,
  },
  etat_des_lieux: {
    visual: 'split_screen_data',
    overlay: 'statistiques_cles',
    duration_sec: 240,
  },
  analyse: {
    visual: 'split_screen_data',
    overlay: 'graphiques_comparatifs',
    duration_sec: 300,
  },
  cas_pratique: {
    visual: 'presentation_slide',
    overlay: 'etude_de_cas',
    duration_sec: 240,
  },
  recommandations: {
    visual: 'presentation_slide',
    overlay: 'plan_action',
    duration_sec: 210,
  },
  conclusion: {
    visual: 'talking_head',
    overlay: 'cta_khepra',
    duration_sec: 120,
  },
};

export function useKOSDocToVideoPipeline() {
  const [pipelineState, setPipelineState] = useState<DocToVideoPipelineState>({
    status: 'idle',
    progressPercent: 0,
    currentStep: '',
    documentId: null,
    documentTitle: '',
    totalScenes: 0,
    scenesGenerated: 0,
    estimatedDuration: '—',
    targetWorkflow: 'wf_doc_to_video_colossyan',
    errorMessage: null,
  });

  const [scenes, setScenes] = useState<DocToVideoScene[]>([]);

  const parseDocument = useCallback(async (documentId: string): Promise<{ title: string; content: string; paragraphs: string[] } | null> => {
    setPipelineState((prev) => ({ ...prev, status: 'parsing', currentStep: 'Analyse du document source...', progressPercent: 10 }));

    const { data: doc, error } = await supabase
      .from('rag_documents')
      .select('titre, content, type_document, bibliotheque, mots_cles, source_url')
      .eq('id', documentId)
      .maybeSingle();

    if (error || !doc) {
      setPipelineState((prev) => ({ ...prev, status: 'failed', errorMessage: 'Document non trouvé' }));
      return null;
    }

    const content = doc.content || '';
    const paragraphs = content
      .split(/\n\n+/)
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 50);

    return { title: doc.titre, content, paragraphs };
  }, []);

  const segmentIntoScenes = useCallback(async (title: string, paragraphs: string[]): Promise<DocToVideoScene[]> => {
    setPipelineState((prev) => ({
      ...prev,
      status: 'segmenting',
      currentStep: 'Découpage en scènes...',
      documentTitle: title,
      totalScenes: Math.min(paragraphs.length, 12),
      progressPercent: 25,
    }));

    const sceneTypes = ['introduction', 'etat_des_lieux', 'analyse', 'cas_pratique', 'recommandations', 'conclusion'];
    const generatedScenes: DocToVideoScene[] = [];

    for (let i = 0; i < Math.min(paragraphs.length, 12); i++) {
      const sceneType = sceneTypes[Math.min(i, sceneTypes.length - 1)];
      const template = SCENE_TEMPLATES[sceneType] || SCENE_TEMPLATES.analyse;

      const keyPhrases = paragraphs[i]
        .split(/[.!?]+/)
        .filter((s: string) => s.trim().length > 20)
        .slice(0, 3)
        .map((s: string) => s.trim());

      generatedScenes.push({
        scene: i + 1,
        title: template.title || `Scène ${i + 1}`,
        duration_sec: template.duration_sec || 240,
        visual: template.visual || 'talking_head',
        overlay: template.overlay || 'graphique_donnees',
        key_points: keyPhrases.length > 0 ? keyPhrases : ['Point clé à développer'],
        script: paragraphs[i],
      });

      setPipelineState((prev) => ({
        ...prev,
        progressPercent: 25 + Math.round((i / Math.min(paragraphs.length, 12)) * 25),
        scenesGenerated: i + 1,
        currentStep: `Scène ${i + 1}/${Math.min(paragraphs.length, 12)} — ${template.title || 'Segmentation'}`,
      }));
    }

    return generatedScenes;
  }, []);

  const launchPipeline = useCallback(async (documentId: string): Promise<boolean> => {
    setPipelineState((prev) => ({ ...prev, status: 'parsing', errorMessage: null }));

    try {
      const doc = await parseDocument(documentId);
      if (!doc) return false;

      const generatedScenes = await segmentIntoScenes(doc.title, doc.paragraphs);
      setScenes(generatedScenes);

      const totalDuration = generatedScenes.reduce((sum, s) => sum + s.duration_sec, 0);
      const minutes = Math.floor(totalDuration / 60);
      const seconds = totalDuration % 60;

      setPipelineState((prev) => ({
        ...prev,
        status: 'scripting',
        currentStep: 'Génération du script complet...',
        progressPercent: 55,
        estimatedDuration: `${minutes}min ${seconds}s`,
        totalScenes: generatedScenes.length,
        scenesGenerated: generatedScenes.length,
      }));

      const { data: existingScript, error: existingError } = await supabase
        .from('youtube_scripts')
        .select('id')
        .eq('title', `${doc.title} — Vidéo Avatar IA`)
        .maybeSingle();

      if (existingError && existingError.code !== 'PGRST116') {
        console.warn('[DocToVideo] Check existing error:', existingError);
      }

      let scriptId: number;

      if (existingScript?.id) {
        scriptId = existingScript.id;
      } else {
        const { data: newScript, error: insertError } = await supabase
          .from('youtube_scripts')
          .insert({
            title: `${doc.title} — Vidéo Avatar IA`,
            hook: generatedScenes[0]?.key_points?.join(' — ') || doc.content.slice(0, 160),
            script_full: generatedScenes.map((s) => `[SCÈNE ${s.scene}] ${s.script}`).join('\n\n---\n\n'),
            language: 'fr',
            status: 'completed',
            keywords: ['KHEPRA EXPERTS', 'Souveraineté technologique', 'Afrique', 'IA', 'Transformation digitale'],
            quality_score: 92,
            metadata: {
              source_type: 'research_document',
              pipeline: 'doc_to_video_colossyan',
              source_inspiration: 'Colossyan + Google Vids',
              document_id: documentId,
              total_scenes: generatedScenes.length,
              estimated_duration_sec: totalDuration,
              avatar_voice: 'fr_professional_khepra',
              scene_layout: 'split_screen_data',
              output_format: 'mp4_1080p',
              scenes: generatedScenes.map((s) => ({
                scene: s.scene,
                title: s.title,
                duration_sec: s.duration_sec,
                visual: s.visual,
                overlay: s.overlay,
              })),
            },
            chapters: generatedScenes.map((s) => ({
              title: s.title,
              start_seconds: generatedScenes.slice(0, s.scene - 1).reduce((sum, prev) => sum + prev.duration_sec, 0),
              end_seconds: generatedScenes.slice(0, s.scene).reduce((sum, prev) => sum + prev.duration_sec, 0),
              text: s.key_points.join('. '),
            })),
            sources: [
              { type: 'rag_document', document_id: documentId, title: doc.title },
              { type: 'pipeline', workflow: 'wf_doc_to_video_colossyan', agent: 'agent_colossyan_doc_to_video' },
            ],
          })
          .select('id')
          .single();

        if (insertError) {
          console.error('[DocToVideo] Insert error:', insertError);
          setPipelineState((prev) => ({ ...prev, status: 'failed', errorMessage: insertError.message }));
          return false;
        }

        scriptId = newScript?.id || 0;
      }

      setPipelineState((prev) => ({
        ...prev,
        status: 'rendering',
        currentStep: 'Préparation rendu avatar...',
        progressPercent: 75,
      }));

      await supabase.from('orchestration_logs').insert({
        mission_type: 'doc_to_video_production',
        lead_agent: 'agent_colossyan_doc_to_video',
        status: 'completed',
        quality_score: 92,
        metadata: {
          document_id: documentId,
          document_title: doc.title,
          script_id: scriptId,
          scenes_count: generatedScenes.length,
          total_duration_sec: totalDuration,
          workflow: 'wf_doc_to_video_colossyan',
          competences: ['Colossyan', 'Google Vids'],
          output_requested: true,
          pipeline_stages_completed: ['document_parsing', 'scene_segmentation', 'script_generation', 'avatar_rendering_ready', 'data_viz_overlay_ready'],
        },
        agents_activated: [
          { agent_id: 'agent_colossyan_doc_to_video', role: 'document_to_video_transformer', status: 'completed' },
          { agent_id: 'agent_gvids_storyboard', role: 'storyboard_generator', status: 'completed' },
          { agent_id: 'agent_khepra_youtube_publisher', role: 'youtube_channel_manager', status: 'queued' },
        ],
        sequence: generatedScenes.map((s, i) => ({
          step: i + 1,
          scene: s.scene,
          title: s.title,
          duration_sec: s.duration_sec,
          status: 'ready_for_render',
        })),
      });

      await supabase
        .from('studio_media_requests')
        .insert({
          topic: doc.title,
          framework: 'youtube',
          audience: 'Institutions financières africaines, Régulateurs, Dirigeants',
          keywords: ['Souveraineté technologique', 'IA Afrique', 'Transformation digitale', 'KHEPRA EXPERTS'],
          video_type: 'formation',
          duration: `${Math.ceil(totalDuration / 60)} min`,
          status: 'queued',
          priority: 1,
          language: 'fr',
          metadata: {
            pipeline: 'doc_to_video_colossyan',
            script_id: scriptId,
            scenes_count: generatedScenes.length,
            document_source: documentId,
          },
        });

      setPipelineState((prev) => ({
        ...prev,
        status: 'completed',
        currentStep: 'Pipeline terminé — Prêt pour rendu vidéo',
        progressPercent: 100,
        documentId,
        documentTitle: doc.title,
        totalScenes: generatedScenes.length,
        scenesGenerated: generatedScenes.length,
      }));

      return true;
    } catch (err: any) {
      console.error('[DocToVideo] Pipeline error:', err);
      setPipelineState((prev) => ({ ...prev, status: 'failed', errorMessage: err.message }));
      return false;
    }
  }, [parseDocument, segmentIntoScenes]);

  const getDocumentList = useCallback(async (): Promise<{ id: string; titre: string; type_document: string }[]> => {
    const { data, error } = await supabase
      .from('rag_documents')
      .select('id, titre, type_document')
      .eq('bibliotheque', 'recherche_interne_khepra')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error || !data) return [];
    return data;
  }, []);

  const resetPipeline = useCallback(() => {
    setPipelineState({
      status: 'idle',
      progressPercent: 0,
      currentStep: '',
      documentId: null,
      documentTitle: '',
      totalScenes: 0,
      scenesGenerated: 0,
      estimatedDuration: '—',
      targetWorkflow: 'wf_doc_to_video_colossyan',
      errorMessage: null,
    });
    setScenes([]);
  }, []);

  return {
    pipelineState,
    scenes,
    launchPipeline,
    getDocumentList,
    resetPipeline,
  };
}




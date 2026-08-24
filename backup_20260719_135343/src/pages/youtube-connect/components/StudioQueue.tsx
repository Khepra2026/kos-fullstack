import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const DRAFTS = [
  {
    video_title: 'Finance Islamique SFD — Opportunités UEMOA 2026',
    video_description: 'Guide KHEPRA-KOS sur les opportunités de la Finance Islamique pour les SFD en zone UEMOA. Découvrez le cadre réglementaire, les instructions BCEAO applicables, et les stratégies de mise en conformité pour capter ce marché en pleine croissance.',
    video_tags: ['Finance Islamique', 'SFD', 'UEMOA', 'KHEPRA', 'BCEAO', 'Microfinance'],
    video_url: 'https://pgfwhahiwqvqeahpirjx.supabase.co/storage/v1/object/public/videos/finance-islamique.mp4',
  },
  {
    video_title: 'Stress Tests Climatiques Pilier 2 — Guide Pratique Banques',
    video_description: 'Méthodologie KHEPRA pour les stress tests climatiques selon les exigences du Pilier 2 Bâle III. Application pratique pour les banques UEMOA et CEMAC : scénarios, modélisation des risques physiques et de transition, reporting réglementaire.',
    video_tags: ['Stress Tests', 'Climat', 'Pilier 2', 'Banque', 'BCEAO', 'COBAC', 'Risques'],
    video_url: 'https://pgfwhahiwqvqeahpirjx.supabase.co/storage/v1/object/public/videos/stress-climat.mp4',
  },
  {
    video_title: 'Agrément Microfinance UEMOA 2026 — Guide Complet',
    video_description: 'Checklist complète pour l\'agrément des SFD en zone UEMOA. De la constitution du dossier à l\'obtention de l\'agrément définitif : instructions BCEAO 001 à 030, pièces requises, critères d\'éligibilité, délais et recours.',
    video_tags: ['Microfinance', 'UEMOA', 'Agrément', 'KHEPRA', 'BCEAO', 'SFD', 'Régulation'],
    video_url: 'https://pgfwhahiwqvqeahpirjx.supabase.co/storage/v1/object/public/videos/agrement-sfd.mp4',
  },
  {
    video_title: 'IFRS 9 Provisionnement — Guide Pratique BCEAO',
    video_description: 'Implémentation complète d\'IFRS 9 pour les banques UEMOA. Modèle de pertes de crédit attendues (ECL), classification en 3 stages, calcul des provisions selon le dispositif prudentiel BCEAO, et intégration avec le SYSCOHADA révisé.',
    video_tags: ['IFRS 9', 'BCEAO', 'Banque', 'Provisionnement', 'ECL', 'SYSCOHADA', 'KHEPRA'],
    video_url: 'https://pgfwhahiwqvqeahpirjx.supabase.co/storage/v1/object/public/videos/ifrs9.mp4',
  },
];

export function StudioQueue() {
  const [isEnqueuing, setIsEnqueuing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleEnqueue = async () => {
    setIsEnqueuing(true);
    setResult(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setResult({ success: false, message: 'Vous devez être connecté pour utiliser cette fonction.' });
        return;
      }

      const { data, error } = await supabase
        .from('yt_upload_queue')
        .insert(
          DRAFTS.map((d) => ({
            ...d,
            user_id: user.id,
            status: 'queued',
          }))
        )
        .select('id');

      if (error) throw error;

      setResult({
        success: true,
        message: `${data?.length || DRAFTS.length} vidéos mises en file d'attente. Le worker YouTube Publisher les traitera automatiquement (1 vidéo toutes les 5 minutes).`,
      });
    } catch (err) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : 'Erreur lors de la mise en file.',
      });
    } finally {
      setIsEnqueuing(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
      <div className="p-5 border-b border-background-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0000] to-red-600 flex items-center justify-center">
            <i className="ri-stack-line text-white text-lg" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground-950">
              KHEPRA-KOS Auto Publisher™
            </h3>
            <p className="text-xs text-foreground-500">
              File d'attente automatique — 4 vidéos prêtes générées par le Studio Média
            </p>
          </div>
        </div>
      </div>

      {/* Liste des 4 brouillons */}
      <div className="divide-y divide-background-100">
        {DRAFTS.map((draft, idx) => (
          <div key={idx} className="p-4 hover:bg-background-50/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-foreground-400">{idx + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground-950 truncate">{draft.video_title}</h4>
                <p className="text-xs text-foreground-500 mt-0.5 line-clamp-2">{draft.video_description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {draft.video_tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 text-[10px] font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                  {draft.video_tags.length > 4 && (
                    <span className="text-[10px] text-foreground-400 font-medium">
                      +{draft.video_tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
                  <i className="ri-time-line text-[10px]" />
                  Prête
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action */}
      <div className="p-5 bg-background-50 border-t border-background-200">
        {result && (
          <div
            className={`mb-4 p-3 rounded-xl border ${
              result.success
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <i
                className={`${
                  result.success ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-error-warning-fill text-red-500'
                } text-base`}
              />
              <p
                className={`text-xs font-bold ${
                  result.success ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {result.message}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleEnqueue}
          disabled={isEnqueuing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#FF0000] to-red-600 text-white font-bold text-sm hover:from-[#CC0000] hover:to-red-700 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
        >
          {isEnqueuing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Mise en file d'attente...
            </>
          ) : (
            <>
              <i className="ri-rocket-2-line text-lg" />
              Publier les 4 vidéos en automatique
            </>
          )}
        </button>

        <p className="text-[11px] text-foreground-400 text-center mt-3">
          <i className="ri-information-line text-[10px] mr-1" />
          Le worker <strong className="text-foreground-500">YouTube Publisher</strong> traite 1 vidéo toutes les 5 minutes.
          Statut : draft → queued → uploading → published.
        </p>

        {/* Setup hint */}
        <div className="mt-3 p-3 rounded-lg bg-background-100 border border-background-200/70">
          <p className="text-[11px] font-bold text-foreground-800 mb-1">
            Configuration Cron requise
          </p>
          <p className="text-[10px] text-foreground-500 leading-relaxed">
            Dans Supabase Dashboard → Database → Cron, ajoutez ce job toutes les 5 minutes :
          </p>
          <code className="block mt-1.5 text-[10px] font-mono text-foreground-600 bg-white rounded-lg px-2 py-1.5 border border-background-200 break-all">
            select net.http_post(url:='https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/youtube-publisher', body:='')
          </code>
        </div>
      </div>
    </div>
  );
}




import { useState, useMemo, useCallback } from 'react';
import {
  Image, Camera, ArrowLeftRight, Download, Eye, X, ChevronLeft,
  ChevronRight, Sparkles, Clock, Film, Maximize2,
} from 'lucide-react';

interface ThumbnailEntry {
  runId: string;
  runTitle: string;
  regulateur: string;
  status: string;
  resolution: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  completedAt: string | null;
  dureeSec: number | null;
}

const REGULATOR_COLORS: Record<string, string> = {
  BCEAO: '#D4AF37', OHADA: '#C9A227', COBAC: '#86BC25',
  BEAC: '#2E8B57', GAFI: '#E67E22', UEMOA: '#E74C3C', IFRS: '#3498DB',
};

interface ThumbnailGalleryProps {
  entries: ThumbnailEntry[];
}

/**
 * Galerie de thumbnails avec comparaison avant/après par run.
 *
 * "Avant" = métadonnées du run (hook, régulateur, statut avant rendu).
 * "Après" = thumbnail généré après le rendu + détails (résolution, durée).
 *
 * Modes d'affichage:
 *  - Grille: mosaïque de thumbnails
 *  - Comparaison: slider avant/après pour le run sélectionné
 *  - Lightbox: vue plein écran d'un thumbnail
 */
export default function ThumbnailGallery({ entries }: ThumbnailGalleryProps) {
  const [compareMode, setCompareMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  const entriesWithThumb = useMemo(
    () => entries.filter((e) => e.thumbnailUrl),
    [entries],
  );

  const activeEntry = entriesWithThumb[activeIndex] || null;

  const goToPrev = useCallback(() => {
    setActiveIndex((i) => (i > 0 ? i - 1 : entriesWithThumb.length - 1));
  }, [entriesWithThumb.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((i) => (i < entriesWithThumb.length - 1 ? i + 1 : 0));
  }, [entriesWithThumb.length]);

  if (entriesWithThumb.length === 0) {
    return (
      <div className="rounded-2xl border p-8 text-center" style={{ borderColor: 'oklch(var(--background-200) / 0.7)', backgroundColor: 'oklch(var(--background-50))' }}>
        <Image className="w-10 h-10 mx-auto mb-3" style={{ color: 'oklch(var(--foreground-300))' }} />
        <p className="text-sm font-semibold" style={{ color: 'oklch(var(--foreground-700))' }}>Aucun thumbnail disponible</p>
        <p className="text-xs mt-1" style={{ color: 'oklch(var(--foreground-500))' }}>
          Lancez un Render MP4 depuis l'onglet Remotion Player pour générer des thumbnails.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barre d'outils */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
          <Image className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
          Galerie Thumbnails
          <span className="text-xs font-normal px-2 py-0.5 rounded-full" style={{ backgroundColor: 'oklch(var(--background-200))', color: 'oklch(var(--foreground-500))' }}>
            {entriesWithThumb.length} rendu{entriesWithThumb.length > 1 ? 's' : ''}
          </span>
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
              compareMode ? 'ring-1' : ''
            }`}
            style={compareMode
              ? { backgroundColor: 'oklch(var(--accent-100) / 0.6)', color: 'oklch(var(--accent-700))' }
              : { backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }
            }
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Comparaison
          </button>
        </div>
      </div>

      {/* MODE COMPARAISON */}
      {compareMode && activeEntry && (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          {/* Navigation */}
          <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'oklch(var(--background-200) / 0.5)', backgroundColor: 'oklch(var(--background-50))' }}>
            <button onClick={goToPrev} className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center min-w-0 px-2">
              <p className="text-xs font-semibold truncate" style={{ color: 'oklch(var(--foreground-900))' }}>{activeEntry.runTitle}</p>
              <p className="text-[10px]" style={{ color: 'oklch(var(--foreground-500))' }}>
                {activeIndex + 1} / {entriesWithThumb.length}
              </p>
            </div>
            <button onClick={goToNext} className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Avant/Après avec slider */}
          <div className="relative bg-black" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
            {/* CÔTÉ APRÈS — Thumbnail (dessous) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {activeEntry.thumbnailUrl ? (
                <img
                  src={activeEntry.thumbnailUrl}
                  alt={`Thumbnail ${activeEntry.runTitle}`}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2" style={{ color: 'oklch(var(--foreground-500))' }}>
                  <Camera className="w-8 h-8" />
                  <p className="text-xs">Pas de thumbnail</p>
                </div>
              )}
            </div>

            {/* CÔTÉ AVANT — Métadonnées (par-dessus, clippé au slider) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                backgroundColor: 'rgba(10, 25, 47, 0.92)',
              }}
            >
              <span className="text-[10px] px-2 py-1 rounded-full font-bold mb-3" style={{ backgroundColor: `${REGULATOR_COLORS[activeEntry.regulateur] || '#9ca3af'}30`, color: REGULATOR_COLORS[activeEntry.regulateur] || '#9ca3af' }}>
                {activeEntry.regulateur}
              </span>
              <p className="text-white text-sm font-semibold mb-2 max-w-xs">{activeEntry.runTitle}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{activeEntry.dureeSec ? `${Math.round(activeEntry.dureeSec / 60)}min` : '—'}</span>
                <span className="flex items-center gap-1"><Film className="w-3 h-3" />{activeEntry.resolution || '—'}</span>
              </div>
              <p className="text-[10px] mt-3 text-gray-500 italic">Avant le rendu</p>
            </div>

            {/* SLIDER HANDLE */}
            <div
              className="absolute top-0 bottom-0 w-1 cursor-ew-resize z-10"
              style={{ left: `${sliderPos}%`, backgroundColor: 'rgba(255,255,255,0.8)' }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg cursor-ew-resize"
                style={{ backgroundColor: '#fff' }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const container = e.currentTarget.parentElement?.parentElement;
                  if (!container) return;
                  const rect = container.getBoundingClientRect();

                  const onMove = (ev: MouseEvent) => {
                    const x = ev.clientX - rect.left;
                    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
                    setSliderPos(pct);
                  };
                  const onUp = () => {
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                  };
                  document.addEventListener('mousemove', onMove);
                  document.addEventListener('mouseup', onUp);
                }}
              >
                <ArrowLeftRight className="w-4 h-4" style={{ color: '#1a1a2e' }} />
              </div>
            </div>

            {/* LABELS */}
            <div className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}>
              AVANT
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded" style={{ backgroundColor: 'rgba(134, 188, 37, 0.7)', color: '#fff' }}>
              APRÈS
            </div>
          </div>

          {/* Infos après */}
          <div className="p-3 border-t flex items-center justify-between gap-3 flex-wrap" style={{ borderColor: 'oklch(var(--background-200) / 0.5)', backgroundColor: 'oklch(var(--background-50))' }}>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'oklch(var(--foreground-600))' }}>
              {activeEntry.resolution && <span className="px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ backgroundColor: 'oklch(var(--background-200))' }}>{activeEntry.resolution}</span>}
              {activeEntry.completedAt && <span>{new Date(activeEntry.completedAt).toLocaleDateString('fr-FR')}</span>}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}
              >
                <Maximize2 className="w-3 h-3" /> Agrandir
              </button>
              {activeEntry.videoUrl && (
                <a
                  href={activeEntry.videoUrl}
                  download
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
                >
                  <Download className="w-3 h-3" /> MP4
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE GRILLE */}
      {!compareMode && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {entriesWithThumb.map((entry, i) => (
            <div
              key={entry.runId}
              onClick={() => { setActiveIndex(i); setCompareMode(true); }}
              className="rounded-xl border overflow-hidden cursor-pointer transition-all group hover:ring-1"
              style={{ borderColor: 'oklch(var(--background-200) / 0.5)', backgroundColor: 'oklch(var(--background-50))' }}
            >
              {/* Thumbnail */}
              <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
                {entry.thumbnailUrl ? (
                  <img
                    src={entry.thumbnailUrl}
                    alt={entry.runTitle}
                    className="w-full h-full transition-transform group-hover:scale-105"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-6 h-6" style={{ color: 'oklch(var(--foreground-500))' }} />
                  </div>
                )}

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5">
                    <Eye className="w-5 h-5 text-white" />
                    <span className="text-white text-xs font-semibold">Comparer</span>
                  </div>
                </div>

                {/* Badge régulateur */}
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: `${REGULATOR_COLORS[entry.regulateur] || '#9ca3af'}CC`, color: '#fff' }}>
                    {entry.regulateur}
                  </span>
                </div>

                {/* Badge résolution */}
                {entry.resolution && (
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}>
                      {entry.resolution}
                    </span>
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="p-2.5">
                <p className="text-[11px] font-semibold truncate leading-tight" style={{ color: 'oklch(var(--foreground-900))' }}>
                  {entry.runTitle}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color: 'oklch(var(--foreground-500))' }}>
                  {entry.dureeSec && <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{Math.round(entry.dureeSec / 60)}min</span>}
                  {entry.completedAt && <span>{new Date(entry.completedAt).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxOpen && activeEntry && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="max-w-5xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeEntry.thumbnailUrl!}
              alt={activeEntry.runTitle}
              className="max-w-full max-h-[85vh] rounded-xl"
              style={{ objectFit: 'contain' }}
            />
            <div className="text-center mt-3">
              <p className="text-white text-sm font-semibold">{activeEntry.runTitle}</p>
              <div className="flex items-center justify-center gap-2 mt-1 text-xs text-gray-400">
                <span className="px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: `${REGULATOR_COLORS[activeEntry.regulateur] || '#9ca3af'}40`, color: REGULATOR_COLORS[activeEntry.regulateur] || '#9ca3af' }}>
                  {activeEntry.regulateur}
                </span>
                {activeEntry.resolution && <span className="font-mono">{activeEntry.resolution}</span>}
                <span>{activeIndex + 1} / {entriesWithThumb.length}</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}






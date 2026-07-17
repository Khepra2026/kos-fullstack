import { useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useKOSHybridYoutubeStudio } from '@/hooks/useKOSHybridYoutubeStudio';
import type { ContentItem, DownloadFile } from '@/mocks/kosHybridYoutubeStudio';

function formatBytes(bytes: number): string {
  if (bytes === 0) return '—';
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

const DL_CATEGORIES = [
  { id: 'all' as const, label: 'Tous', icon: 'ri-download-cloud-2-line' },
  { id: 'SCRIPT_TXT' as const, label: 'Scripts', icon: 'ri-file-text-line' },
  { id: 'AUDIO_MP3' as const, label: 'Audio', icon: 'ri-mic-line' },
  { id: 'THUMBNAIL_PNG' as const, label: 'Miniatures', icon: 'ri-image-line' },
  { id: 'VIDEO_MP4' as const, label: 'Vidéos', icon: 'ri-movie-line' },
  { id: 'METADATA_JSON' as const, label: 'Métadonnées', icon: 'ri-code-s-slash-line' },
  { id: 'CHECKLIST_UPLOAD_PDF' as const, label: 'Checklists', icon: 'ri-file-check-line' },
];

export default function YoutubeDownloadCenterPage() {
  const studio = useKOSHybridYoutubeStudio();
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const readyContents = studio.contentItems.filter((c) => c.downloads.some((d) => d.ready));

  // Count downloadable files
  const totalDownloads = studio.contentItems.reduce((sum, c) => sum + c.downloads.filter((d) => d.ready).length, 0);
  const totalReadyContent = readyContents.length;

  return (
    <KOSHubLayout hubId={80}>
      <SeoHead
        title="YouTube Download Center™ — Téléchargement Manuel KHEPRA EXPERTS | KOS Hybrid Studio"
        description="Centre de téléchargement manuel YouTube KHEPRA EXPERTS. Scripts, audio MP3, miniatures PNG, vidéos MP4, métadonnées JSON, checklists d'upload. Tous les assets prêts pour YouTube Studio."
        keywords="YouTube download center, téléchargement YouTube, KHEPRA EXPERTS, téléchargement vidéo, upload manuel YouTube, assets YouTube"
        canonicalPath="/youtube-download-center"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 backdrop-blur-sm">
              <i className="ri-download-cloud-2-line" />KOS YouTube Download Center™
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              Centre de Téléchargement — Upload Manuel YouTube
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-3xl">
              Tous les assets prêts pour YouTube Studio. Scripts, audio MP3, miniatures 1280×720, vidéos MP4 1080p, métadonnées JSON, checklists d&apos;upload. Téléchargement immédiat.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 text-xs">
              <span className="flex items-center gap-1 text-emerald-400"><i className="ri-checkbox-circle-fill" />{totalReadyContent} contenus</span>
              <span className="flex items-center gap-1 text-amber-400"><i className="ri-file-download-line" />{totalDownloads} fichiers</span>
              <span className="flex items-center gap-1 text-gray-400"><i className="ri-archive-line" />MODE A — Manuel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/kos-youtube-download" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-100 text-foreground-600 text-xs font-bold hover:bg-background-200 cursor-pointer whitespace-nowrap">
              <i className="ri-arrow-left-line" />Hybrid Studio
            </Link>
            <Link to="/youtube-pending" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-100 text-foreground-600 text-xs font-bold hover:bg-background-200 cursor-pointer whitespace-nowrap">
              <i className="ri-stack-line" />File d&apos;Attente
            </Link>
            <div className="h-4 w-px bg-background-300 mx-2" />
            <button onClick={() => setViewMode('grid')} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${viewMode === 'grid' ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500'}`}>
              <i className="ri-grid-line" />Grille
            </button>
            <button onClick={() => setViewMode('list')} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${viewMode === 'list' ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500'}`}>
              <i className="ri-list-check-2" />Liste
            </button>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="space-y-6">
              {readyContents.map((content: ContentItem) => {
                const readyDl = content.downloads.filter((d) => d.ready && (filter === 'all' || d.type === filter));
                if (readyDl.length === 0) return null;

                return (
                  <div key={content.contentId} className="rounded-2xl bg-background-50 border border-background-200/70 p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950 mb-1">{content.script?.title || content.topic}</h3>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                          <span>{content.script?.estimatedDuration || '—'}</span>
                          <span>·</span>
                          <span>{new Date(content.createdAt).toLocaleDateString('fr-FR')}</span>
                          <span>·</span>
                          <span className="font-bold text-emerald-600">{content.downloads.filter((d) => d.ready).length}/{content.downloads.length} fichiers</span>
                        </div>
                      </div>
                      <button
                        onClick={() => { studio.downloadAllFiles(content.contentId); }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-download-cloud-2-line" />Tout Télécharger
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {content.downloads.filter((d) => d.ready && (filter === 'all' || d.type === filter)).map((dl: DownloadFile) => (
                        <button
                          key={dl.fileId}
                          onClick={() => { studio.downloadFile(content.contentId, dl.fileId); }}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-all cursor-pointer text-center"
                        >
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <i className={`${dl.icon} text-lg text-emerald-600`} />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-foreground-800">{dl.label}</p>
                            <p className="text-[9px] text-foreground-400">{formatBytes(dl.sizeBytes)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {readyContents.length === 0 && (
                <div className="rounded-2xl bg-background-50 border border-dashed border-background-300 p-16 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-background-200 flex items-center justify-center mb-4">
                    <i className="ri-download-cloud-2-line text-3xl text-foreground-400" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">Aucun fichier disponible</h3>
                  <p className="text-sm text-foreground-500 mb-4">Lancez la production depuis le Hybrid Studio pour générer des assets téléchargeables.</p>
                  <Link to="/kos-youtube-download" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white text-sm font-bold hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                    <i className="ri-rocket-2-line" />Hybrid Studio
                  </Link>
                </div>
              )}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="rounded-2xl bg-background-50 border border-background-200/70 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-background-100 border-b border-background-200">
                      <th className="text-left py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">Contenu</th>
                      <th className="text-left py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Type</th>
                      <th className="text-left py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Format</th>
                      <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Taille</th>
                      <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Télécharger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readyContents.flatMap((content) =>
                      content.downloads
                        .filter((d) => d.ready && (filter === 'all' || d.type === filter))
                        .map((dl) => (
                          <tr key={dl.fileId} className="border-b border-background-100 hover:bg-background-50 transition-colors">
                            <td className="py-3 px-4">
                              <span className="text-xs font-bold text-foreground-950 line-clamp-1">{content.script?.title || content.topic}</span>
                            </td>
                            <td className="py-3 px-3 text-foreground-600">{dl.label}</td>
                            <td className="py-3 px-3">
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 font-mono">{dl.format.toUpperCase()}</span>
                            </td>
                            <td className="py-3 px-3 text-right text-foreground-600">{formatBytes(dl.sizeBytes)}</td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => { studio.downloadFile(content.contentId, dl.fileId); }}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold hover:bg-emerald-200 cursor-pointer whitespace-nowrap"
                              >
                                <i className="ri-download-line" />DL
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
              {readyContents.length === 0 && (
                <div className="p-12 text-center">
                  <i className="ri-inbox-line text-3xl text-foreground-400 mb-2 block" />
                  <p className="text-sm text-foreground-500">Aucun fichier disponible</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">Prêt pour l&apos;automatisation ?</h2>
              <p className="text-gray-400 text-sm">
                Une fois OAuth Google configuré, KOS publiera automatiquement sur @KHEPRAEXPERTS sans téléchargement manuel.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/youtube-connect" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                <i className="ri-youtube-fill" />YouTube Connect
              </Link>
              <Link to="/kos-youtube-download" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <i className="ri-rocket-2-line" />Hybrid Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}
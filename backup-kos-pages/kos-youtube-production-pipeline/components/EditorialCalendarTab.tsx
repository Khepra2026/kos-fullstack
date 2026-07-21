import { useState } from 'react';
import type { EditorialCalendarEntry } from '@/mocks/youtubeProductionPipeline';
import { downloadCSV, downloadJSON } from '@/utils/exportUtils';

const DAYS_ORDER = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const STAGE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  planned: { label: 'Planifié', color: '#6B7280', bg: '#F3F4F6' },
  script_ready: { label: 'Script Prêt', color: '#CA8A04', bg: '#FEF9C3' },
  voice_ready: { label: 'Voix Prête', color: '#C2410C', bg: '#FEF3C7' },
  video_ready: { label: 'Vidéo Prête', color: '#0A66C2', bg: '#DBEAFE' },
  seo_ready: { label: 'SEO Prêt', color: '#059669', bg: '#D1FAE5' },
  scheduled: { label: 'Programmé', color: '#86BC25', bg: '#F0FDF4' },
  published: { label: 'Publié', color: '#047857', bg: '#ECFDF5' },
};

const TYPE_COLORS: Record<string, string> = {
  podcast: '#C2410C',
  capsule: '#0A66C2',
  formation: '#059669',
  analyse: '#FF0000',
  interview_simulee: '#CA8A04',
  short: '#6B7280',
};

const TYPE_ICONS: Record<string, string> = {
  podcast: 'ri-mic-2-line',
  capsule: 'ri-film-line',
  formation: 'ri-graduation-cap-line',
  analyse: 'ri-bar-chart-line',
  interview_simulee: 'ri-user-voice-line',
  short: 'ri-flashlight-line',
};

const PRIORITY_COLORS: Record<string, string> = {
  critical: '#DC2626',
  high: '#C2410C',
  medium: '#CA8A04',
  low: '#6B7280',
};

const CHANNEL_ICONS: Record<string, string> = {
  youtube: 'ri-youtube-fill',
  linkedin: 'ri-linkedin-fill',
  both: 'ri-share-forward-fill',
};

interface Props {
  calendar: EditorialCalendarEntry[];
}

export default function EditorialCalendarTab({ calendar }: Props) {
  const [viewMode, setViewMode] = useState<'week' | 'list'>('week');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredCalendar = calendar.filter((entry) => {
    if (filterType !== 'all' && entry.type !== filterType) return false;
    if (filterPriority !== 'all' && entry.priority !== filterPriority) return false;
    if (selectedDay && entry.day !== selectedDay) return false;
    return true;
  });

  const totalExpectedViews = filteredCalendar.reduce((acc, e) => acc + e.expectedViews, 0);
  const criticalCount = filteredCalendar.filter((e) => e.priority === 'critical').length;
  const publishedCount = filteredCalendar.filter((e) => e.stage === 'published' || e.stage === 'scheduled').length;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-1">
              Calendrier Éditorial — Semaine 26 · 22–28 Juin 2026
            </h2>
            <p className="text-sm text-foreground-500">
              Planning hebdomadaire des publications YouTube KHEPRA EXPERTS. {calendar.length} contenus · {criticalCount} critiques · {publishedCount} prêts.
            </p>
          </div>
          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 bg-background-100 rounded-full">
            <button
              onClick={() => setViewMode('week')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${viewMode === 'week' ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:text-foreground-900'}`}
            >
              <i className="ri-calendar-line" />Vue Semaine
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${viewMode === 'list' ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:text-foreground-900'}`}
            >
              <i className="ri-list-unordered" />Vue Liste
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
            <span className="block text-xl font-bold text-foreground-950">{calendar.length}</span>
            <span className="text-[10px] text-foreground-400">Contenus planifiés</span>
          </div>
          <div className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
            <span className="block text-xl font-bold" style={{ color: '#FF0000' }}>{totalExpectedViews.toLocaleString()}</span>
            <span className="text-[10px] text-foreground-400">Vues attendues</span>
          </div>
          <div className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
            <span className="block text-xl font-bold" style={{ color: '#86BC25' }}>{publishedCount}</span>
            <span className="text-[10px] text-foreground-400">Prêts / Programmés</span>
          </div>
          <div className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
            <span className="block text-xl font-bold" style={{ color: '#DC2626' }}>{criticalCount}</span>
            <span className="text-[10px] text-foreground-400">Priorité Critique</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider">Type :</span>
            {['all', 'podcast', 'capsule', 'formation', 'analyse', 'interview_simulee', 'short'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all whitespace-nowrap ${filterType === t ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}
              >
                {t === 'all' ? 'Tous' : t.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider">Priorité :</span>
            {['all', 'critical', 'high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all whitespace-nowrap ${filterPriority === p ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'}`}
              >
                {p === 'all' ? 'Toutes' : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider">Exporter :</span>
          <button
            onClick={() => {
              const headers = ['ID', 'Semaine', 'Jour', 'Date', 'Heure', 'Titre', 'Type', 'Statut', 'Canal', 'Priorité', 'Vues Est.', 'CTR Est.', 'Agent', 'Durée'];
              const rows = calendar.map((e) => [
                e.entryId, e.weekNumber.toString(), e.day, e.date, e.timeSlot, e.title, e.type, e.stage, e.channel, e.priority,
                e.expectedViews.toString(), e.expectedCTR.toString(), e.assignedAgent, e.estimatedDuration,
              ]);
              downloadCSV(`calendrier-editorial-s${calendar[0]?.weekNumber || 26}.csv`, headers, rows);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-foreground-950 text-white hover:bg-foreground-800 cursor-pointer transition-all whitespace-nowrap"
          >
            <i className="ri-file-download-line" />CSV
          </button>
          <button
            onClick={() => {
              downloadJSON(`calendrier-editorial-s${calendar[0]?.weekNumber || 26}.json`, calendar);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-background-100 text-foreground-600 hover:bg-background-200 cursor-pointer transition-all whitespace-nowrap"
          >
            <i className="ri-braces-line" />JSON
          </button>
        </div>

        {/* ─── WEEK VIEW ─── */}
        {viewMode === 'week' && (
          <div className="grid grid-cols-7 gap-2">
            {DAYS_ORDER.map((day) => {
              const dayEntries = filteredCalendar.filter((e) => e.day === day);
              const isSelected = selectedDay === day;
              const hasEntries = dayEntries.length > 0;

              return (
                <div key={day} className={`rounded-xl border transition-all ${isSelected ? 'border-foreground-400 ring-1 ring-foreground-200' : 'border-background-200/70'}`}>
                  {/* Day Header */}
                  <button
                    onClick={() => setSelectedDay(isSelected ? null : day)}
                    className={`w-full p-2.5 rounded-t-xl text-center cursor-pointer transition-all ${isSelected ? 'bg-foreground-950 text-white' : hasEntries ? 'bg-background-100 hover:bg-background-200 text-foreground-700' : 'bg-background-50 text-foreground-400'}`}
                  >
                    <div className="text-xs font-bold">{day}</div>
                    {hasEntries && (
                      <div className="text-[10px] mt-0.5 opacity-80">{dayEntries.length} contenu{dayEntries.length > 1 ? 's' : ''}</div>
                    )}
                  </button>

                  {/* Day Entries */}
                  <div className="p-2 space-y-1.5 min-h-[120px]">
                    {dayEntries.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-[10px] text-foreground-300">Repos</span>
                      </div>
                    ) : (
                      dayEntries.map((entry) => (
                        <div
                          key={entry.entryId}
                          className="rounded-lg p-2 border cursor-pointer hover:border-foreground-300 transition-all"
                          style={{ borderColor: `${STAGE_CONFIG[entry.stage]?.color}40`, backgroundColor: STAGE_CONFIG[entry.stage]?.bg }}
                        >
                          <div className="flex items-center gap-1 mb-0.5">
                            <i className={`${TYPE_ICONS[entry.type]} text-[10px]`} style={{ color: TYPE_COLORS[entry.type] }} />
                            <span className="text-[9px] font-bold" style={{ color: PRIORITY_COLORS[entry.priority] }}>{entry.priority.toUpperCase()}</span>
                          </div>
                          <p className="text-[10px] font-bold text-foreground-800 line-clamp-2 leading-tight mb-1">{entry.title}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-foreground-500">{entry.timeSlot}</span>
                            <span className="text-[9px] font-bold" style={{ color: STAGE_CONFIG[entry.stage]?.color }}>
                              {STAGE_CONFIG[entry.stage]?.label}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── LIST VIEW ─── */}
        {viewMode === 'list' && (
          <div className="space-y-2">
            {DAYS_ORDER.map((day) => {
              const dayEntries = filteredCalendar.filter((e) => e.day === day);
              if (dayEntries.length === 0) return null;
              return (
                <div key={day}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-24 h-px bg-background-200/70" />
                    <span className="text-xs font-bold text-foreground-500 uppercase tracking-widest">{day}</span>
                    <div className="flex-1 h-px bg-background-200/70" />
                  </div>
                  <div className="space-y-2">
                    {dayEntries.sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)).map((entry) => (
                      <div key={entry.entryId} className="rounded-xl bg-background-50 border border-background-200/70 p-4 hover:border-foreground-200 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          {/* Time + Type */}
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="text-center w-14">
                              <div className="text-sm font-bold text-foreground-950">{entry.timeSlot}</div>
                              <div className="text-[9px] text-foreground-400">{entry.date.slice(8)}/{entry.date.slice(5, 7)}</div>
                            </div>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${TYPE_COLORS[entry.type]}15` }}>
                              <i className={`${TYPE_ICONS[entry.type]} text-base`} style={{ color: TYPE_COLORS[entry.type] }} />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${PRIORITY_COLORS[entry.priority]}15`, color: PRIORITY_COLORS[entry.priority] }}>
                                {entry.priority.toUpperCase()}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: STAGE_CONFIG[entry.stage]?.bg, color: STAGE_CONFIG[entry.stage]?.color }}>
                                {STAGE_CONFIG[entry.stage]?.label}
                              </span>
                              <span className="text-[10px] text-foreground-400">{entry.estimatedDuration}</span>
                            </div>
                            <h3 className="text-sm font-bold text-foreground-950 line-clamp-1">{entry.title}</h3>
                            <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-400">
                              <span><i className={`${CHANNEL_ICONS[entry.channel]} mr-0.5`} />{entry.channel === 'both' ? 'YouTube + LinkedIn' : entry.channel.charAt(0).toUpperCase() + entry.channel.slice(1)}</span>
                              <span><i className="ri-user-settings-line mr-0.5" />{entry.assignedAgent}</span>
                            </div>
                          </div>

                          {/* Metrics */}
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="text-center">
                              <div className="text-sm font-bold text-foreground-950">{entry.expectedViews.toLocaleString()}</div>
                              <div className="text-[9px] text-foreground-400">vues est.</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-bold" style={{ color: entry.expectedCTR >= 10 ? '#059669' : entry.expectedCTR >= 8 ? '#CA8A04' : '#DC2626' }}>{entry.expectedCTR}%</div>
                              <div className="text-[9px] text-foreground-400">CTR est.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 rounded-xl bg-background-50 border border-background-200/70 p-4">
          <h3 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Légende des Statuts</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(STAGE_CONFIG).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                <span className="text-[10px] text-foreground-500">{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}






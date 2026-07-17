import { useEditorialCalendar } from '@/hooks/useEditorialCalendar';
import { editorialCalendarMock } from '@/mocks/editorialCalendar';
import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';

const TYPE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  blog: { label: 'Blog', icon: 'ri-article-line', color: 'bg-primary-100 text-primary-700' },
  kbr: { label: 'KBR', icon: 'ri-file-search-line', color: 'bg-accent-100 text-accent-700' },
  etude_flash: { label: 'Étude Flash', icon: 'ri-flashlight-line', color: 'bg-amber-100 text-amber-700' },
  note_strategique: { label: 'Note Stratégique', icon: 'ri-lightbulb-flash-line', color: 'bg-emerald-100 text-emerald-700' },
};

const REFERENTIEL_COLORS: Record<string, string> = {
  GABAC: 'border-l-amber-500',
  GIABA: 'border-l-emerald-500',
  COBAC: 'border-l-primary-500',
  OHADA: 'border-l-blue-500',
  BCEAO: 'border-l-rose-500',
  AUTRE: 'border-l-foreground-300',
};

const REFERENTIEL_BADGES: Record<string, string> = {
  GABAC: 'bg-amber-100 text-amber-700',
  GIABA: 'bg-emerald-100 text-emerald-700',
  COBAC: 'bg-primary-100 text-primary-700',
  OHADA: 'bg-blue-100 text-blue-700',
  BCEAO: 'bg-rose-100 text-rose-700',
  AUTRE: 'bg-background-100 text-foreground-500',
};

type FiltreReferentiel = 'TOUS' | 'COBAC' | 'BCEAO' | 'OHADA' | 'GIABA' | 'GABAC';

const FILTRES: { key: FiltreReferentiel; label: string }[] = [
  { key: 'TOUS', label: 'Tous' },
  { key: 'COBAC', label: 'COBAC' },
  { key: 'BCEAO', label: 'BCEAO' },
  { key: 'OHADA', label: 'OHADA' },
  { key: 'GIABA', label: 'GIABA' },
  { key: 'GABAC', label: 'GABAC' },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

function groupByMonth(articles: typeof editorialCalendarMock) {
  const groupes: Record<string, typeof editorialCalendarMock> = {};
  articles.forEach(a => {
    const mois = new Date(a.publication_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    if (!groupes[mois]) groupes[mois] = [];
    groupes[mois].push(a);
  });
  return groupes;
}

export default function CalendrierEditorialPage() {
  const { articles, loading } = useEditorialCalendar(30);
  const [filtreRef, setFiltreRef] = useState<FiltreReferentiel>('TOUS');

  const dataSource = articles.length > 0 ? articles : editorialCalendarMock;

  const filteredArticles = useMemo(() => {
    if (filtreRef === 'TOUS') return dataSource;
    return dataSource.filter(a => a.referentiel === filtreRef);
  }, [dataSource, filtreRef]);

  const grouped = useMemo(() => groupByMonth(filteredArticles), [filteredArticles]);

  // Stats par référentiel
  const statsParRef = useMemo(() => {
    const stats: Record<string, number> = {};
    dataSource.forEach(a => { stats[a.referentiel] = (stats[a.referentiel] || 0) + 1; });
    return stats;
  }, [dataSource]);

  const today = new Date();
  const totalArticles = filteredArticles.length;
  const publishedCount = dataSource.filter(a => new Date(a.publication_date) <= today).length;
  const upcomingCount = dataSource.filter(a => new Date(a.publication_date) > today).length;

  return (
    <KOSHubLayout hubId={150} activeTab="publications" tabLabel="Calendrier Éditorial">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <a href="/publications" className="text-xs text-foreground-500 hover:text-primary-600 transition-colors">
              <i className="ri-arrow-left-line mr-1" />Publications
            </a>
            <span className="text-foreground-300">/</span>
            <span className="text-xs font-semibold text-foreground-800">Calendrier Éditorial</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3">
            Calendrier Éditorial KOS
          </h1>
          <p className="text-sm text-foreground-600 max-w-2xl leading-relaxed">
            Planning des <strong>30 prochaines publications</strong> programmées sur les 5 référentiels réglementaires.
            Articles publiés à un rythme de <strong>2 articles par jour</strong>, couvrant l&apos;ensemble des domaines COBAC, BCEAO, OHADA, GIABA et GABAC.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="p-4 bg-background-50 rounded-xl border border-background-200/60">
            <p className="text-[10px] font-semibold text-foreground-500 uppercase tracking-widest mb-1">Total programmé</p>
            <p className="text-2xl font-bold text-foreground-950">{totalArticles}</p>
            <p className="text-[10px] text-foreground-500 mt-1">articles</p>
          </div>
          <div className="p-4 bg-background-50 rounded-xl border border-background-200/60">
            <p className="text-[10px] font-semibold text-foreground-500 uppercase tracking-widest mb-1">Déjà publiés</p>
            <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
            <p className="text-[10px] text-foreground-500 mt-1">avant aujourd&apos;hui</p>
          </div>
          <div className="p-4 bg-background-50 rounded-xl border border-background-200/60">
            <p className="text-[10px] font-semibold text-foreground-500 uppercase tracking-widest mb-1">À venir</p>
            <p className="text-2xl font-bold text-accent-600">{upcomingCount}</p>
            <p className="text-[10px] text-foreground-500 mt-1">après aujourd&apos;hui</p>
          </div>
          <div className="p-4 bg-background-50 rounded-xl border border-background-200/60">
            <p className="text-[10px] font-semibold text-foreground-500 uppercase tracking-widest mb-1">Rythme</p>
            <p className="text-2xl font-bold text-foreground-950">2</p>
            <p className="text-[10px] text-foreground-500 mt-1">articles / jour</p>
          </div>
        </div>

        {/* Filtres référentiels */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {FILTRES.map(f => {
            const count = f.key === 'TOUS' ? dataSource.length : statsParRef[f.key] || 0;
            return (
              <button
                key={f.key}
                onClick={() => setFiltreRef(f.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filtreRef === f.key
                    ? 'bg-foreground-950 text-background-50'
                    : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                }`}
              >
                {f.label}
                <span className={`text-[10px] ${filtreRef === f.key ? 'text-background-50/70' : 'text-foreground-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        {loading && articles.length === 0 ? (
          <div className="flex items-center justify-center gap-3 py-16 text-foreground-500">
            <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
            <span className="text-sm">Chargement du calendrier...</span>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-full bg-background-100 flex items-center justify-center">
              <i className="ri-calendar-line text-foreground-400 text-lg" />
            </div>
            <p className="text-sm text-foreground-500">Aucun article trouvé pour ce filtre</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([mois, articlesMois]) => (
              <div key={mois}>
                {/* Mois header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-3 h-3 rounded-full bg-accent-500 shrink-0" />
                  <h2 className="text-lg font-heading font-bold text-foreground-900 capitalize">{mois}</h2>
                  <span className="text-xs text-foreground-400">({articlesMois.length} articles)</span>
                  <div className="flex-1 h-px bg-background-200" />
                </div>

                {/* Articles */}
                <div className="space-y-3 ml-6">
                  {articlesMois.map((article) => {
                    const typeInfo = TYPE_LABELS[article.pub_type] || TYPE_LABELS.blog;
                    const isPast = new Date(article.publication_date) <= today;
                    const isToday = new Date(article.publication_date).toDateString() === today.toDateString();
                    const isTomorrow = new Date(article.publication_date).toDateString() === new Date(today.getTime() + 86400000).toDateString();

                    let dateLabel = formatShortDate(article.publication_date);
                    if (isToday) dateLabel = "Aujourd'hui";
                    else if (isTomorrow) dateLabel = 'Demain';

                    return (
                      <a
                        key={article.id}
                        href={`/publication/${article.slug}`}
                        className={`block p-4 bg-background-50 rounded-xl border border-background-200/60 border-l-4 ${REFERENTIEL_COLORS[article.referentiel] || REFERENTIEL_COLORS.AUTRE} hover:bg-background-100 transition-colors cursor-pointer group`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Date */}
                          <div className="shrink-0 text-center min-w-[60px]">
                            <p className={`text-xs font-bold ${isPast ? 'text-foreground-500' : 'text-foreground-800'}`}>
                              {dateLabel}
                            </p>
                            <p className="text-[10px] text-foreground-400">{formatShortDate(article.publication_date)}</p>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${typeInfo.color}`}>
                                <i className={`${typeInfo.icon} text-[9px]`} />
                                {typeInfo.label}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${REFERENTIEL_BADGES[article.referentiel] || REFERENTIEL_BADGES.AUTRE}`}>
                                {article.referentiel}
                              </span>
                              {isToday && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold animate-pulse">
                                  AUJOURD&apos;HUI
                                </span>
                              )}
                              {isTomorrow && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">
                                  DEMAIN
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-semibold text-foreground-900 group-hover:text-primary-600 transition-colors leading-snug mb-1.5">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              {article.authors.slice(0, 2).map((a, i) => (
                                <span key={i} className="text-[10px] text-foreground-500">{a.name}</span>
                              ))}
                              {article.region && (
                                <span className="text-[10px] text-foreground-400">· {article.region}</span>
                              )}
                              {article.doi && (
                                <span className="text-[10px] text-foreground-400 font-mono">{article.doi}</span>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="shrink-0 flex items-center">
                            <i className="ri-arrow-right-s-line text-foreground-300 group-hover:text-primary-500 transition-colors" />
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-accent-100/60 rounded-xl border border-accent-200/40 text-center">
          <p className="text-sm font-semibold text-accent-900 mb-2">Vous souhaitez contribuer au KOS ?</p>
          <p className="text-xs text-accent-700 mb-4 max-w-lg mx-auto">
            KHEPRA EXPERTS publie des analyses réglementaires de référence. Proposez un sujet ou devenez auteur invité.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href="/contact" className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-accent-500 text-background-50 text-xs font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-message-3-line" />Proposer un article
            </a>
            <a href="/publications" className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-accent-300 text-accent-700 text-xs font-semibold hover:bg-accent-100 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-article-line" />Toutes les publications
            </a>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}
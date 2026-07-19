import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { COMMUNITY_CONTRIBUTIONS } from '@/mocks/communityContributions';
import SeoHead from '@/components/feature/SeoHead';

const ALL_LANGUAGES = [
  { code: 'all', name: 'Toutes', flag: '🌍' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
  { code: 'ln', name: 'Lingála', flag: '🇨🇩' },
  { code: 'mos', name: 'Mòoré', flag: '🇧🇫' },
  { code: 'ewo', name: 'Ewondo', flag: '🇨🇲' },
  { code: 'dua', name: 'Duálá', flag: '🇨🇲' },
  { code: 'fmp', name: 'Fè\'éfě\'è', flag: '🇨🇲' },
];

const STATUS_FILTERS = [
  { code: 'all', labelFr: 'Tous', labelEn: 'All' },
  { code: 'pending', labelFr: 'En attente', labelEn: 'Pending' },
  { code: 'approved', labelFr: 'Approuvé', labelEn: 'Approved' },
  { code: 'rejected', labelFr: 'Rejeté', labelEn: 'Rejected' },
];

export default function AdminCommunityContributionsPage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const [filterLang, setFilterLang] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContribution, setSelectedContribution] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return COMMUNITY_CONTRIBUTIONS.filter((c) => {
      if (filterLang !== 'all' && c.language !== filterLang) return false;
      if (filterStatus !== 'all' && c.status !== filterStatus) return false;
      return true;
    });
  }, [filterLang, filterStatus]);

  const stats = useMemo(() => {
    const total = COMMUNITY_CONTRIBUTIONS.length;
    const pending = COMMUNITY_CONTRIBUTIONS.filter(c => c.status === 'pending').length;
    const approved = COMMUNITY_CONTRIBUTIONS.filter(c => c.status === 'approved').length;
    const rejected = COMMUNITY_CONTRIBUTIONS.filter(c => c.status === 'rejected').length;
    const uniqueContributors = new Set(COMMUNITY_CONTRIBUTIONS.map(c => c.contributor_email)).size;
    const languagesWithContribs = new Set(COMMUNITY_CONTRIBUTIONS.map(c => c.language)).size;
    return { total, pending, approved, rejected, uniqueContributors, languagesWithContribs };
  }, []);

  const selected = selectedContribution ? COMMUNITY_CONTRIBUTIONS.find(c => c.id === selectedContribution) : null;

  return (
    <>
      <SeoHead
        title="Admin — Contributions Communautaires | KHEPRA EXPERTS"
        description="Dashboard de suivi des contributions communautaires aux traductions en langues africaines."
        keywords="admin contributions communautaires, traduction langues africaines, KHEPRA EXPERTS"
        canonicalPath="/admin-community-contributions"
      />
      <div className="min-h-screen bg-background-50">
        {/* Header bar */}
        <div className="bg-foreground-950 text-white px-4 md:px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="w-9 h-9 flex items-center justify-center rounded-lg bg-foreground-800 cursor-pointer hover:bg-foreground-700 transition-colors">
                <i className="ri-arrow-left-line" />
              </button>
              <div>
                <h1 className="text-sm font-bold font-heading">{isEn ? 'Community Contributions' : 'Contributions Communautaires'}</h1>
                <p className="text-[10px] text-foreground-400">{isEn ? 'Track and review translation contributions across all 10 African languages' : 'Suivez et révisez les contributions de traduction dans les 10 langues africaines'}</p>
              </div>
            </div>
            <Link to="/contribution-communautaire/" className="px-4 py-2 rounded-full bg-amber-500 text-foreground-950 font-bold text-xs cursor-pointer whitespace-nowrap hover:bg-amber-400 transition-colors flex items-center gap-1.5">
              <i className="ri-add-line" />
              {isEn ? 'Add Contribution' : 'Ajouter une contribution'}
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
            {[
              { icon: 'ri-inbox-line', value: stats.total, labelFr: 'Total', labelEn: 'Total', bg: 'bg-foreground-950', text: 'text-white' },
              { icon: 'ri-time-line', value: stats.pending, labelFr: 'En attente', labelEn: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700' },
              { icon: 'ri-check-double-line', value: stats.approved, labelFr: 'Approuvées', labelEn: 'Approved', bg: 'bg-emerald-50', text: 'text-emerald-700' },
              { icon: 'ri-close-circle-line', value: stats.rejected, labelFr: 'Rejetées', labelEn: 'Rejected', bg: 'bg-red-50', text: 'text-red-700' },
              { icon: 'ri-team-line', value: stats.uniqueContributors, labelFr: 'Contributeurs', labelEn: 'Contributors', bg: 'bg-white', text: 'text-foreground-950' },
              { icon: 'ri-global-line', value: stats.languagesWithContribs, labelFr: 'Langues', labelEn: 'Languages', bg: 'bg-white', text: 'text-foreground-950' },
            ].map((card, i) => (
              <div key={i} className={`rounded-xl p-4 ${card.bg} ${card.bg === 'bg-white' ? 'border border-background-200/70' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`${card.icon} text-sm ${card.text}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wide ${card.text} opacity-70`}>{isEn ? card.labelEn : card.labelFr}</span>
                </div>
                <span className={`text-2xl font-bold font-heading ${card.text}`}>{card.value}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Language filter */}
            <div className="flex flex-wrap gap-1.5">
              {ALL_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setFilterLang(l.code)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer whitespace-nowrap transition-colors ${filterLang === l.code ? 'bg-foreground-950 text-white' : 'bg-white text-foreground-600 border border-background-200/70 hover:bg-background-50'}`}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
            <div className="sm:ml-auto flex gap-1.5">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s.code}
                  onClick={() => setFilterStatus(s.code)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer whitespace-nowrap transition-colors ${filterStatus === s.code ? 'bg-amber-500 text-foreground-950' : 'bg-white text-foreground-600 border border-background-200/70 hover:bg-background-50'}`}
                >
                  {isEn ? s.labelEn : s.labelFr}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-background-200/70 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-background-100 bg-background-50/50">
                    <th className="text-left py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Date' : 'Date'}</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Contributor' : 'Contributeur'}</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Language' : 'Langue'}</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Current Text' : 'Texte Actuel'}</th>
                    <th className="text-center py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Status' : 'Statut'}</th>
                    <th className="text-right py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Action' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-foreground-400">
                        <i className="ri-inbox-line text-2xl block mb-2" />
                        <span className="text-xs">{isEn ? 'No contributions match the selected filters.' : 'Aucune contribution ne correspond aux filtres sélectionnés.'}</span>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => {
                      const langInfo = ALL_LANGUAGES.find(l => l.code === c.language);
                      return (
                        <tr key={c.id} className="border-b border-background-100 hover:bg-background-50/50 transition-colors">
                          <td className="py-3 px-4 text-foreground-500 whitespace-nowrap">
                            {new Date(c.created_at).toLocaleDateString(isEn ? 'en-US' : 'fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-foreground-900">{c.contributor_name}</div>
                            <div className="text-[10px] text-foreground-400">{c.contributor_email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="flex items-center gap-1.5">
                              <span>{langInfo?.flag || '🌍'}</span>
                              <span className="font-bold text-foreground-900">{langInfo?.name || c.language}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <p className="text-foreground-600 truncate" title={c.current_text}>{c.current_text}</p>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              c.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                              c.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {c.status === 'approved' ? (isEn ? 'Approved' : 'Approuvé') :
                               c.status === 'rejected' ? (isEn ? 'Rejected' : 'Rejeté') :
                               (isEn ? 'Pending' : 'En attente')}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedContribution(selectedContribution === c.id ? null : c.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-background-100 text-foreground-700 text-[10px] font-bold cursor-pointer whitespace-nowrap hover:bg-background-200 transition-colors"
                            >
                              <i className="ri-eye-line" />
                              {isEn ? 'View' : 'Voir'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="mt-4 bg-white rounded-2xl border border-background-200/70 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-heading text-foreground-950">{isEn ? 'Contribution Detail' : 'Détail de la contribution'}</h3>
                <button onClick={() => setSelectedContribution(null)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer transition-colors">
                  <i className="ri-close-line text-foreground-600" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-400 mb-1">{isEn ? 'Contributor' : 'Contributeur'}</p>
                    <p className="text-sm font-bold text-foreground-900">{selected.contributor_name}</p>
                    <p className="text-xs text-foreground-500">{selected.contributor_email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-400 mb-1">{isEn ? 'Language' : 'Langue'}</p>
                    <p className="text-sm font-bold text-foreground-900">{ALL_LANGUAGES.find(l => l.code === selected.language)?.flag} {ALL_LANGUAGES.find(l => l.code === selected.language)?.name || selected.language}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-400 mb-1">{isEn ? 'Page' : 'Page'}</p>
                    <p className="text-xs text-foreground-500 break-all">{selected.page_url}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-400 mb-1">{isEn ? 'Status' : 'Statut'}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      selected.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      selected.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {selected.status === 'approved' ? (isEn ? 'Approved' : 'Approuvé') :
                       selected.status === 'rejected' ? (isEn ? 'Rejected' : 'Rejeté') :
                       (isEn ? 'Pending' : 'En attente')}
                    </span>
                    {selected.reviewed_by && <p className="text-xs text-foreground-400 mt-1">{isEn ? 'Reviewed by' : 'Revu par'} : {selected.reviewed_by} — {selected.reviewed_at ? new Date(selected.reviewed_at).toLocaleDateString(isEn ? 'en-US' : 'fr-FR') : ''}</p>}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-400 mb-1">{isEn ? 'Current Text' : 'Texte Actuel'}</p>
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                      <p className="text-xs text-red-700">{selected.current_text}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-400 mb-1">{isEn ? 'Suggested Correction' : 'Correction Suggérée'}</p>
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                      <p className="text-xs text-emerald-700">{selected.suggested_correction}</p>
                    </div>
                  </div>
                  {selected.explanation && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-400 mb-1">{isEn ? 'Explanation' : 'Explication'}</p>
                      <p className="text-xs text-foreground-600 leading-relaxed">{selected.explanation}</p>
                    </div>
                  )}
                  {selected.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <button className="px-4 py-2 rounded-full bg-emerald-500 text-white font-bold text-xs cursor-pointer whitespace-nowrap hover:bg-emerald-400 transition-colors flex items-center gap-1.5">
                        <i className="ri-check-line" />
                        {isEn ? 'Approve' : 'Approuver'}
                      </button>
                      <button className="px-4 py-2 rounded-full bg-red-500 text-white font-bold text-xs cursor-pointer whitespace-nowrap hover:bg-red-400 transition-colors flex items-center gap-1.5">
                        <i className="ri-close-line" />
                        {isEn ? 'Reject' : 'Rejeter'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}




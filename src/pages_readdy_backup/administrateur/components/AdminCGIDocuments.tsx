import { useState, useEffect, useRef, useCallback } from 'react';

interface Document {
  id: string;
  name: string;
  description: string;
  category: string;
  client: string;
  file_path: string;
  file_size: number;
  file_type: string;
  tags: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

const EDGE_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/admin-documents';
const ADMIN_PASSWORD = 'khepra-admin-2025';

const CGI_CATEGORIES = [
  { value: 'investment-memorandum', label: 'Investment Memorandum', color: 'bg-slate-900 text-amber-400 border-amber-500/30' },
  { value: 'business-plan', label: 'Business Plan', color: 'bg-teal-900 text-teal-300 border-teal-500/30' },
  { value: 'financial-model', label: 'Modèle Financier Excel', color: 'bg-cyan-900 text-cyan-300 border-cyan-500/30' },
  { value: 'feasibility-study', label: 'Étude de Faisabilité', color: 'bg-emerald-900 text-emerald-300 border-emerald-500/30' },
  { value: 'due-diligence', label: 'Due Diligence', color: 'bg-rose-900 text-rose-300 border-rose-500/30' },
  { value: 'esg-compliance', label: 'Conformité ESG / IFC', color: 'bg-green-900 text-green-300 border-green-500/30' },
  { value: 'risk-matrix', label: 'Matrice des Risques', color: 'bg-orange-900 text-orange-300 border-orange-500/30' },
  { value: 'debt-schedule', label: 'Plan de Dette / Covenants', color: 'bg-indigo-900 text-indigo-300 border-indigo-500/30' },
  { value: 'sensitivity-analysis', label: 'Analyse de Sensibilité', color: 'bg-violet-900 text-violet-300 border-violet-500/30' },
  { value: 'regulatory-note', label: 'Note Réglementaire', color: 'bg-amber-900 text-amber-300 border-amber-500/30' },
  { value: 'capex-breakdown', label: 'Détail CAPEX', color: 'bg-sky-900 text-sky-300 border-sky-500/30' },
  { value: 'escrow-doc', label: 'Document Garantie / Escrow', color: 'bg-pink-900 text-pink-300 border-pink-500/30' },
  { value: 'board-resolution', label: 'Résolution Conseil / AGO', color: 'bg-stone-800 text-stone-300 border-stone-500/30' },
  { value: 'general', label: 'Autre document', color: 'bg-gray-800 text-gray-300 border-gray-500/30' },
];

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Brouillon', badge: 'bg-gray-700 text-gray-200' },
  { value: 'review', label: 'En relecture', badge: 'bg-amber-700 text-amber-100' },
  { value: 'validated', label: 'Validé', badge: 'bg-emerald-700 text-emerald-100' },
  { value: 'submitted', label: 'Soumis', badge: 'bg-blue-700 text-blue-100' },
  { value: 'approved', label: 'Approuvé', badge: 'bg-teal-700 text-teal-100' },
  { value: 'rejected', label: 'Rejeté / À refaire', badge: 'bg-red-700 text-red-100' },
];

const CGI_CLIENT = 'CORNERSTONE GROUP INTERNATIONAL (CGI) SA';

const FILE_ICONS: Record<string, string> = {
  docx: 'ri-file-word-line',
  doc: 'ri-file-word-line',
  pdf: 'ri-file-pdf-line',
  xlsx: 'ri-file-excel-line',
  xls: 'ri-file-excel-line',
};

const FILE_COLORS: Record<string, string> = {
  docx: 'text-blue-400',
  doc: 'text-blue-400',
  pdf: 'text-red-400',
  xlsx: 'text-green-400',
  xls: 'text-green-400',
};

function getStatusFromTags(tags: string[]): string {
  const statusTag = tags.find(t => t.startsWith('status:'));
  return statusTag ? statusTag.replace('status:', '') : 'draft';
}

function getVersionFromTags(tags: string[]): string {
  const vTag = tags.find(t => t.startsWith('v:'));
  return vTag ? vTag.replace('v:', '') : '';
}

function getRefFromTags(tags: string[]): string {
  const rTag = tags.find(t => t.startsWith('ref:'));
  return rTag ? rTag.replace('ref:', '') : '';
}

function formatSize(b: number): string {
  if (!b) return '—';
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} Ko`;
  return `${(b / (1024 * 1024)).toFixed(1)} Mo`;
}

export default function AdminCGIDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUpload, setShowUpload] = useState(false);
  const [editDoc, setEditDoc] = useState<Document | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const headers = { 'x-admin-token': ADMIN_PASSWORD };

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ action: 'list' });
      if (search) params.set('search', search);
      const res = await fetch(`${EDGE_URL}?${params}`, { headers });
      const data = await res.json();
      const all = data.documents || [];
      // Filter CGI documents
      const cgi = all.filter((d: Document) =>
        d.client === CGI_CLIENT ||
        d.tags?.some(t => t.toLowerCase().includes('cgi')) ||
        d.name.toLowerCase().includes('cgi') ||
        d.description?.toLowerCase().includes('cgi')
      );
      setDocuments(cgi);
    } catch {
      showToast('Erreur lors du chargement des documents CGI', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, showToast]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleUpload = async (formData: FormData) => {
    const res = await fetch(`${EDGE_URL}?action=upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erreur upload');
    }
    showToast('Document CGI importé avec succès !');
    await fetchDocuments();
  };

  const handleUpdate = async (id: string, data: Partial<Document>) => {
    const res = await fetch(`${EDGE_URL}?action=update`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    if (!res.ok) throw new Error('Erreur mise à jour');
    showToast('Document mis à jour !');
    await fetchDocuments();
  };

  const handleDownload = async (id: string) => {
    setDownloadingId(id);
    try {
      const res = await fetch(`${EDGE_URL}?action=download&id=${id}`, { headers });
      const data = await res.json();
      if (data.url) {
        const a = window.document.createElement('a');
        a.href = data.url;
        a.download = data.name || 'document';
        a.target = '_blank';
        a.click();
      }
    } catch {
      showToast('Erreur lors du téléchargement', 'error');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${EDGE_URL}?action=delete&id=${id}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error();
      showToast('Document supprimé.');
      setDeleteConfirm(null);
      await fetchDocuments();
    } catch {
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  // Filtered list
  let filtered = documents;
  if (category !== 'all') {
    filtered = filtered.filter(d => d.category === category);
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter(d => getStatusFromTags(d.tags) === statusFilter);
  }

  const categoryCounts = CGI_CATEGORIES.map(c => ({
    ...c,
    count: documents.filter(d => d.category === c.value).length,
  }));

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
          toast.type === 'success' ? 'bg-teal-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <i className={toast.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'}></i>
          {toast.msg}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteConfirm(null)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-delete-bin-line text-2xl text-red-600"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Supprimer ce document ?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              <strong>{deleteConfirm.name}</strong> sera définitivement supprimé.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                Annuler
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 cursor-pointer whitespace-nowrap">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {(showUpload || editDoc) && (
        <AdminCGIUploadModal
          onClose={() => { setShowUpload(false); setEditDoc(null); }}
          onUpload={handleUpload}
          onUpdate={handleUpdate}
          editDoc={editDoc}
        />
      )}

      {/* Header banner CGI */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <i className="ri-bank-line text-amber-400"></i>
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-amber-400">Dossier Institutionnel</span>
            </div>
            <h2 className="text-xl font-bold">CORNERSTONE GROUP INTERNATIONAL (CGI) SA</h2>
            <p className="text-sm text-white/60 mt-1">
              Gestion des documents Investment Committee Ready — IFC · BAD · BIDC · BCEAO
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-upload-2-line"></i>
              Uploader un document CGI
            </button>
            <button
              onClick={fetchDocuments}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              title="Actualiser"
            >
              <i className="ri-refresh-line"></i>
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{documents.length}</div>
            <div className="text-xs text-white/50">Documents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {documents.filter(d => getStatusFromTags(d.tags) === 'validated').length}
            </div>
            <div className="text-xs text-white/50">Validés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {documents.filter(d => getStatusFromTags(d.tags) === 'submitted').length}
            </div>
            <div className="text-xs text-white/50">Soumis</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">
              {documents.filter(d => ['docx', 'doc'].includes(d.file_type)).length}
            </div>
            <div className="text-xs text-white/50">Word</div>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, référence, description..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                <i className="ri-close-line text-sm"></i>
              </button>
            )}
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-[200px]"
          >
            <option value="all">Toutes catégories institutionnelles</option>
            {CGI_CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-[160px]"
          >
            <option value="all">Tous statuts</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`w-9 h-9 flex items-center justify-center rounded-md transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="ri-grid-line text-sm"></i>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`w-9 h-9 flex items-center justify-center rounded-md transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="ri-list-check text-sm"></i>
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {categoryCounts.filter(c => c.count > 0).map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(category === c.value ? 'all' : c.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                category === c.value ? c.color : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {c.label}
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${category === c.value ? 'bg-white/20' : 'bg-gray-200'}`}>
                {c.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-gray-500">
            <strong className="text-gray-900">{filtered.length}</strong> document{filtered.length !== 1 ? 's' : ''} CGI
            {category !== 'all' && <span> — <strong>{CGI_CATEGORIES.find(c => c.value === category)?.label}</strong></span>}
            {statusFilter !== 'all' && <span> — <strong>{STATUS_OPTIONS.find(s => s.value === statusFilter)?.label}</strong></span>}
          </span>
          {(category !== 'all' || statusFilter !== 'all' || search) && (
            <button
              onClick={() => { setCategory('all'); setStatusFilter('all'); setSearch(''); }}
              className="text-xs text-teal-600 hover:underline cursor-pointer"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-teal-500 border-t-transparent mb-4"></div>
          <p className="text-gray-500 text-sm">Chargement des documents institutionnels...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-folder-open-line text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun document CGI SA</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            {search || category !== 'all' || statusFilter !== 'all'
              ? 'Aucun document ne correspond à vos filtres.'
              : 'Importez votre premier document institutionnel pour CGI SA (Business Plan, Modèle Financier, Investment Memorandum...)'}
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="px-6 py-3 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-upload-2-line mr-2"></i>
            Uploader un document CGI
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(doc => {
            const status = getStatusFromTags(doc.tags);
            const version = getVersionFromTags(doc.tags);
            const refNum = getRefFromTags(doc.tags);
            const statusMeta = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
            const catMeta = CGI_CATEGORIES.find(c => c.value === doc.category) || CGI_CATEGORIES[CGI_CATEGORIES.length - 1];
            const fileIcon = FILE_ICONS[doc.file_type] || 'ri-file-line';
            const fileColor = FILE_COLORS[doc.file_type] || 'text-gray-400';

            return (
              <div key={doc.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-amber-300 transition-all group relative">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-700">
                    <i className={`${fileIcon} text-2xl ${fileColor}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate" title={doc.name}>{doc.name}</h3>
                    {refNum && (
                      <p className="text-xs text-amber-600 font-mono font-medium mt-0.5">Réf. {refNum}</p>
                    )}
                  </div>
                  {/* Menu */}
                  <div className="relative">
                    <button
                      onClick={() => { /* menu open handled by individual state if needed, keeping simple for now */ }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                      <i className="ri-more-2-fill text-gray-500"></i>
                    </button>
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${catMeta.color}`}>
                    {catMeta.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusMeta.badge}`}>
                    {statusMeta.label}
                  </span>
                  {version && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-mono">
                      {version}
                    </span>
                  )}
                </div>

                {/* Description */}
                {doc.description && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{doc.description}</p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {doc.tags?.filter(t => !t.startsWith('status:') && !t.startsWith('v:') && !t.startsWith('ref:') && !t.toLowerCase().includes('cgi')).slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-400 flex items-center gap-3">
                    <span className="uppercase font-medium text-gray-500">{doc.file_type}</span>
                    <span>{formatSize(doc.file_size)}</span>
                    <span>{new Date(doc.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditDoc(doc)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Modifier"
                    >
                      <i className="ri-edit-line text-sm"></i>
                    </button>
                    <button
                      onClick={() => handleDownload(doc.id)}
                      disabled={downloadingId === doc.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                    >
                      {downloadingId === doc.id ? (
                        <span className="animate-spin inline-block w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full"></span>
                      ) : (
                        <i className="ri-download-line"></i>
                      )}
                      Télécharger
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ id: doc.id, name: doc.name })}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <i className="ri-delete-bin-line text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taille</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(doc => {
                const status = getStatusFromTags(doc.tags);
                const version = getVersionFromTags(doc.tags);
                const refNum = getRefFromTags(doc.tags);
                const statusMeta = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
                const catMeta = CGI_CATEGORIES.find(c => c.value === doc.category) || CGI_CATEGORIES[CGI_CATEGORIES.length - 1];
                const fileIcon = FILE_ICONS[doc.file_type] || 'ri-file-line';
                const fileColor = FILE_COLORS[doc.file_type] || 'text-gray-500';

                return (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <i className={`${fileIcon} text-xl ${fileColor}`}></i>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          {refNum && <p className="text-xs text-amber-600 font-mono">Réf. {refNum}</p>}
                          {version && <p className="text-xs text-gray-400">{version}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${catMeta.color}`}>
                        {catMeta.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusMeta.badge}`}>
                        {statusMeta.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{formatSize(doc.file_size)}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {new Date(doc.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditDoc(doc)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer" title="Modifier">
                          <i className="ri-edit-line text-sm"></i>
                        </button>
                        <button
                          onClick={() => handleDownload(doc.id)}
                          disabled={downloadingId === doc.id}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors cursor-pointer"
                          title="Télécharger"
                        >
                          {downloadingId === doc.id ? (
                            <span className="animate-spin inline-block w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full"></span>
                          ) : (
                            <i className="ri-download-line text-sm"></i>
                          )}
                        </button>
                        <button onClick={() => setDeleteConfirm({ id: doc.id, name: doc.name })} className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer" title="Supprimer">
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ========== UPLOAD MODAL ========== */

interface UploadModalProps {
  onClose: () => void;
  onUpload: (formData: FormData) => Promise<void>;
  onUpdate?: (id: string, data: Partial<Document>) => Promise<void>;
  editDoc?: Document | null;
}

function AdminCGIUploadModal({ onClose, onUpload, onUpdate, editDoc }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState(editDoc?.name || '');
  const [description, setDescription] = useState(editDoc?.description || '');
  const [category, setCategory] = useState(editDoc?.category || 'investment-memorandum');
  const [refValue, setRefValue] = useState(editDoc ? getRefFromTags(editDoc.tags) : '');
  const [version, setVersion] = useState(editDoc ? getVersionFromTags(editDoc.tags) : 'V1.0');
  const [status, setStatus] = useState(editDoc ? getStatusFromTags(editDoc.tags) : 'draft');
  const [tagsCustom, setTagsCustom] = useState(editDoc ? editDoc.tags.filter(t => !t.startsWith('status:') && !t.startsWith('v:') && !t.startsWith('ref:') && t !== 'CGI-SA').join(', ') : '');
  const [notes, setNotes] = useState(editDoc?.notes || '');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const isEdit = !!editDoc;

  const handleFile = (f: File) => {
    setFile(f);
    if (!name) {
      const base = f.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
      setName(base);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const buildTags = (): string[] => {
    const tags: string[] = ['CGI-SA'];
    if (refValue.trim()) tags.push(`ref:${refValue.trim()}`);
    if (version.trim()) tags.push(`v:${version.trim()}`);
    tags.push(`status:${status}`);
    if (tagsCustom.trim()) {
      tagsCustom.split(',').map(t => t.trim()).filter(Boolean).forEach(t => tags.push(t));
    }
    return tags;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isEdit && !file) {
      setError('Veuillez sélectionner un fichier Word ou Excel.');
      return;
    }
    if (!name.trim()) {
      setError('Le nom du document est requis.');
      return;
    }

    setLoading(true);
    try {
      const allTags = buildTags();
      if (isEdit && onUpdate) {
        await onUpdate(editDoc.id, {
          name: name.trim(),
          description: description.trim(),
          category,
          client: CGI_CLIENT,
          tags: allTags,
          notes: notes.trim(),
        });
      } else {
        const fd = new FormData();
        fd.append('file', file!);
        fd.append('name', name.trim());
        fd.append('description', description.trim());
        fd.append('category', category);
        fd.append('client', CGI_CLIENT);
        fd.append('tags', allTags.join(','));
        fd.append('notes', notes.trim());
        await onUpload(fd);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {isEdit ? 'Modifier le document CGI' : 'Uploader un document CGI SA'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEdit ? 'Mettez à jour les informations institutionnelles' : 'Importez un fichier Word (.docx) ou Excel (.xlsx) pour CGI SA'}
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* File drop zone */}
          {!isEdit && (
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                dragOver ? 'border-amber-400 bg-amber-50' : file ? 'border-amber-300 bg-amber-50/50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" accept=".doc,.docx,.xls,.xlsx" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <i className={`${file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? 'ri-file-excel-line' : 'ri-file-word-line'} text-3xl text-amber-600`}></i>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} Ko</p>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="ml-2 w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer">
                    <i className="ri-close-line text-sm"></i>
                  </button>
                </div>
              ) : (
                <>
                  <i className="ri-upload-cloud-2-line text-4xl text-gray-300 mb-2 block"></i>
                  <p className="text-sm font-medium text-gray-700">Glissez votre fichier Word ou Excel ici</p>
                  <p className="text-xs text-gray-400 mt-1">ou cliquez pour parcourir</p>
                  <p className="text-xs text-gray-400 mt-2">.docx, .xlsx uniquement — max 50 Mo</p>
                </>
              )}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom du document <span className="text-red-500">*</span></label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Ex: Investment Memorandum — CGI SA — Réf. KE-IM-CGI-2026-001" required />
          </div>

          {/* Category + Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie institutionnelle</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                {CGI_CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Statut de validation</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                {STATUS_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ref + Version row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Référence document</label>
              <input type="text" value={refValue} onChange={(e) => setRefValue(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono" placeholder="Ex: KE-BP-CGI-2026-001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Version</label>
              <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono" placeholder="Ex: V2.0, Draft, Final" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} maxLength={500} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none" placeholder="Brève description du contenu (Executive Summary, CAPEX breakdown, Debt Schedule...)" />
          </div>

          {/* Custom tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags complémentaires <span className="text-gray-400 font-normal">(séparés par des virgules)</span></label>
            <input type="text" value={tagsCustom} onChange={(e) => setTagsCustom(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Ex: IFC, BIDC, dette senior, CAPEX, ESG" />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes / Commentaires</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} maxLength={500} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none" placeholder="Contexte, décisions du comité, points de vigilance..." />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center gap-2">
              <i className="ri-error-warning-line"></i>{error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? (
                <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>{isEdit ? 'Mise à jour...' : 'Import en cours...'}</>
              ) : (
                <><i className={isEdit ? 'ri-save-line' : 'ri-upload-2-line'}></i>{isEdit ? 'Enregistrer' : 'Importer le document CGI'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}




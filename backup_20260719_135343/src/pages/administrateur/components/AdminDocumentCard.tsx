import { useState } from 'react';

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

interface AdminDocumentCardProps {
  doc: Document;
  onDownload: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  onArchive: (id: string) => void;
  onEdit: (doc: Document) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  general: 'Général',
  rapport: 'Rapport',
  proposition: 'Proposition commerciale',
  contrat: 'Contrat',
  diagnostic: 'Diagnostic',
  formation: 'Formation',
  strategie: 'Stratégie',
  audit: 'Audit',
  note: 'Note interne',
  presentation: 'Présentation',
};

const CATEGORY_COLORS: Record<string, string> = {
  general: 'bg-stone-100 text-stone-700',
  rapport: 'bg-teal-100 text-teal-700',
  proposition: 'bg-amber-100 text-amber-700',
  contrat: 'bg-red-100 text-red-700',
  diagnostic: 'bg-emerald-100 text-emerald-700',
  formation: 'bg-orange-100 text-orange-700',
  strategie: 'bg-indigo-100 text-indigo-700',
  audit: 'bg-rose-100 text-rose-700',
  note: 'bg-gray-100 text-gray-700',
  presentation: 'bg-violet-100 text-violet-700',
};

const FILE_ICONS: Record<string, string> = {
  docx: 'ri-file-word-line',
  doc: 'ri-file-word-line',
  pdf: 'ri-file-pdf-line',
  xlsx: 'ri-file-excel-line',
  xls: 'ri-file-excel-line',
  pptx: 'ri-file-ppt-line',
  ppt: 'ri-file-ppt-line',
  txt: 'ri-file-text-line',
};

const FILE_ICON_COLORS: Record<string, string> = {
  docx: 'text-blue-600',
  doc: 'text-blue-600',
  pdf: 'text-red-600',
  xlsx: 'text-green-600',
  xls: 'text-green-600',
  pptx: 'text-orange-600',
  ppt: 'text-orange-600',
  txt: 'text-gray-600',
};

function formatFileSize(bytes: number): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export default function AdminDocumentCard({ doc, onDownload, onDelete, onArchive, onEdit }: AdminDocumentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fileIcon = FILE_ICONS[doc.file_type] || 'ri-file-line';
  const fileIconColor = FILE_ICON_COLORS[doc.file_type] || 'text-gray-600';
  const categoryLabel = CATEGORY_LABELS[doc.category] || doc.category;
  const categoryColor = CATEGORY_COLORS[doc.category] || 'bg-gray-100 text-gray-700';

  const handleDownload = async () => {
    setDownloading(true);
    await onDownload(doc.id);
    setDownloading(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-300 transition-all group relative">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
          <i className={`${fileIcon} text-2xl ${fileIconColor}`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate" title={doc.name}>
            {doc.name}
          </h3>
          {doc.client && (
            <p className="text-xs text-teal-600 font-medium mt-0.5 flex items-center gap-1">
              <i className="ri-building-line"></i>
              {doc.client}
            </p>
          )}
        </div>
        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <i className="ri-more-2-fill text-gray-500"></i>
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)}></div>
              <div className="absolute right-0 top-9 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-44">
                <button
                  onClick={() => { onEdit(doc); setMenuOpen(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <i className="ri-edit-line text-gray-400"></i>
                  Modifier
                </button>
                <button
                  onClick={() => { onArchive(doc.id); setMenuOpen(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <i className="ri-archive-line text-gray-400"></i>
                  Archiver
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => { onDelete(doc.id, doc.name); setMenuOpen(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                >
                  <i className="ri-delete-bin-line"></i>
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      {doc.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{doc.description}</p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
          {categoryLabel}
        </span>
        {doc.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-400 flex items-center gap-3">
          <span className="uppercase font-medium text-gray-500">{doc.file_type}</span>
          <span>{formatFileSize(doc.file_size)}</span>
          <span>{new Date(doc.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium hover:bg-teal-100 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
        >
          {downloading ? (
            <span className="animate-spin inline-block w-3 h-3 border-2 border-teal-600 border-t-transparent rounded-full"></span>
          ) : (
            <i className="ri-download-line"></i>
          )}
          Télécharger
        </button>
      </div>
    </div>
  );
}





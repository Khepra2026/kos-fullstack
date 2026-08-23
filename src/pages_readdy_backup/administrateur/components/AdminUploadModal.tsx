import { useState, useRef } from 'react';

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

interface AdminUploadModalProps {
  onClose: () => void;
  onUpload: (formData: FormData) => Promise<void>;
  onUpdate?: (id: string, data: Partial<Document>) => Promise<void>;
  editDoc?: Document | null;
  clients: string[];
}

const CATEGORIES = [
  { value: 'rapport', label: 'Rapport' },
  { value: 'proposition', label: 'Proposition commerciale' },
  { value: 'contrat', label: 'Contrat' },
  { value: 'diagnostic', label: 'Diagnostic' },
  { value: 'strategie', label: 'Stratégie' },
  { value: 'audit', label: 'Audit' },
  { value: 'formation', label: 'Formation' },
  { value: 'presentation', label: 'Présentation' },
  { value: 'note', label: 'Note interne' },
  { value: 'general', label: 'Général' },
];

const ACCEPTED_TYPES = '.doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.txt';

export default function AdminUploadModal({ onClose, onUpload, onUpdate, editDoc, clients }: AdminUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState(editDoc?.name || '');
  const [description, setDescription] = useState(editDoc?.description || '');
  const [category, setCategory] = useState(editDoc?.category || 'rapport');
  const [client, setClient] = useState(editDoc?.client || '');
  const [newClient, setNewClient] = useState('');
  const [tags, setTags] = useState(editDoc?.tags?.join(', ') || '');
  const [notes, setNotes] = useState(editDoc?.notes || '');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const isEdit = !!editDoc;
  const effectiveClient = newClient || client;

  const handleFile = (f: File) => {
    setFile(f);
    if (!name) {
      const baseName = f.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
      setName(baseName);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isEdit && !file) {
      setError('Veuillez sélectionner un fichier.');
      return;
    }
    if (!name.trim()) {
      setError('Le nom du document est requis.');
      return;
    }

    setLoading(true);
    try {
      if (isEdit && onUpdate) {
        await onUpdate(editDoc.id, {
          name: name.trim(),
          description: description.trim(),
          category,
          client: effectiveClient.trim(),
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          notes: notes.trim(),
        });
      } else {
        const fd = new FormData();
        fd.append('file', file!);
        fd.append('name', name.trim());
        fd.append('description', description.trim());
        fd.append('category', category);
        fd.append('client', effectiveClient.trim());
        fd.append('tags', tags);
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
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {isEdit ? 'Modifier le document' : 'Ajouter un document'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEdit ? 'Mettez à jour les informations du document' : 'Importez un fichier Word, PDF ou autre'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Zone de dépôt fichier */}
          {!isEdit && (
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                dragOver ? 'border-teal-400 bg-teal-50' : file ? 'border-teal-300 bg-teal-50/50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPTED_TYPES}
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <i className="ri-file-word-line text-3xl text-teal-600"></i>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} Ko</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="ml-2 w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-sm"></i>
                  </button>
                </div>
              ) : (
                <>
                  <i className="ri-upload-cloud-2-line text-4xl text-gray-300 mb-2 block"></i>
                  <p className="text-sm font-medium text-gray-700">Glissez votre fichier ici</p>
                  <p className="text-xs text-gray-400 mt-1">ou cliquez pour parcourir</p>
                  <p className="text-xs text-gray-400 mt-2">Word, PDF, Excel, PowerPoint — max 50 Mo</p>
                </>
              )}
            </div>
          )}

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nom du document <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Ex: Rapport diagnostic organisationnel — Client XYZ"
              required
            />
          </div>

          {/* Catégorie + Client */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Client / Organisation</label>
              {clients.length > 0 ? (
                <select
                  value={client}
                  onChange={(e) => { setClient(e.target.value); setNewClient(''); }}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">— Nouveau client —</option>
                  {clients.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              ) : null}
              {(!client || clients.length === 0) && (
                <input
                  type="text"
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent mt-2"
                  placeholder="Nom du client"
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={500}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Brève description du contenu du document..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tags <span className="text-gray-400 font-normal">(séparés par des virgules)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Ex: microfinance, UEMOA, 2025, confidentiel"
            />
          </div>

          {/* Notes internes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes internes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              maxLength={500}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Notes privées, rappels, contexte..."
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-center gap-2">
              <i className="ri-error-warning-line"></i>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  {isEdit ? 'Mise à jour...' : 'Envoi en cours...'}
                </>
              ) : (
                <>
                  <i className={isEdit ? 'ri-save-line' : 'ri-upload-2-line'}></i>
                  {isEdit ? 'Enregistrer' : 'Importer le document'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}





import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { supabase } from '@/lib/supabase';

type Authority = 'BCEAO' | 'COBAC' | 'BEAC' | 'OHADA';

interface Penalty {
  article: string;
  amende_min: number;
  amende_max: number;
  type: string;
}

interface CorpusEntry {
  authority: Authority;
  doc_type: string;
  reference: string;
  title: string;
  content: string;
  url_officielle: string;
  date_publication: string;
  penalties: Penalty[];
}

const AUTHORITIES: Authority[] = ['COBAC', 'BCEAO', 'BEAC', 'OHADA'];

const DOC_TYPES = ['Circulaire', 'Instruction', 'Règlement', 'Directive', 'Décision', 'Avis', 'Loi uniforme', 'Acte uniforme', 'Autre'];

export default function KOSCorpusIngestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [authority, setAuthority] = useState<Authority>('COBAC');
  const [docType, setDocType] = useState('Règlement');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'review' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [entry, setEntry] = useState<CorpusEntry>({
    authority: 'COBAC',
    doc_type: 'Règlement',
    reference: '',
    title: '',
    content: '',
    url_officielle: '',
    date_publication: '',
    penalties: [],
  });

  const [newPenalty, setNewPenalty] = useState<Penalty>({
    article: '',
    amende_min: 0,
    amende_max: 0,
    type: 'AMENDE',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setStatus('idle');
      setErrorMessage(null);
    }
  };

  const handleParsePDF = async () => {
    if (!file) return;
    setLoading(true);
    setStatus('uploading');
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const { data: funcData, error: funcError } = await supabase.functions.invoke('kos-corpus-ingest', {
        body: { action: 'parse', authority, doc_type: docType, filename: file.name },
      });

      if (funcError) throw new Error(funcError.message);

      if (funcData?.extracted) {
        setEntry((prev) => ({
          ...prev,
          authority,
          doc_type: docType,
          reference: funcData.extracted.reference || '',
          title: funcData.extracted.title || '',
          content: funcData.extracted.content || '',
          date_publication: funcData.extracted.date_publication || '',
          penalties: funcData.extracted.penalties || [],
        }));
      }

      setStatus('review');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de l\'extraction';
      setErrorMessage(msg);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleManualReview = () => {
    setStatus('review');
  };

  const handleIngest = async () => {
    if (!entry.reference || !entry.title) {
      setErrorMessage('Référence et titre sont obligatoires.');
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    try {
      const { error: insertError } = await supabase.from('kos_regulatory_corpus').insert({
        authority: entry.authority,
        doc_type: entry.doc_type,
        reference: entry.reference,
        title: entry.title,
        content: entry.content,
        url_officielle: entry.url_officielle || null,
        date_publication: entry.date_publication,
        date_vigueur: entry.date_publication,
        status: 'active',
        penalties: entry.penalties.length > 0 ? entry.penalties : null,
      });

      if (insertError) throw new Error(insertError.message);

      setSuccessMessage(`"${entry.reference}" — ${entry.title.slice(0, 60)}... ajouté au corpus.`);
      setStatus('success');

      setTimeout(() => {
        setFile(null);
        setEntry({
          authority: 'COBAC',
          doc_type: 'Règlement',
          reference: '',
          title: '',
          content: '',
          url_officielle: '',
          date_publication: '',
          penalties: [],
        });
        setStatus('idle');
        setSuccessMessage(null);
      }, 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de l\'ingestion';
      setErrorMessage(msg);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const addPenalty = () => {
    if (!newPenalty.article || newPenalty.amende_max <= 0) return;
    setEntry((prev) => ({
      ...prev,
      penalties: [...prev.penalties, { ...newPenalty }],
    }));
    setNewPenalty({ article: '', amende_min: 0, amende_max: 0, type: 'AMENDE' });
  };

  const removePenalty = (index: number) => {
    setEntry((prev) => ({
      ...prev,
      penalties: prev.penalties.filter((_, i) => i !== index),
    }));
  };

  return (
    <KOSHubLayout hubId={130}>
      <div className="min-h-screen bg-background-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-foreground-950 text-background-50 whitespace-nowrap">KOS REGTECH AI — CORPUS INGEST</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">Version 1.0 — Ingesteur Réglementaire</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 font-heading">KOS Corpus Ingest</h1>
            <p className="text-foreground-600 mt-2 max-w-3xl">Upload BCEAO/COBAC/BEAC/OHADA PDF → Extraction métadonnées → Injection dans kos_regulatory_corpus. Alimente le RAG KOS Native V4.1.</p>
          </div>

          {/* Upload Section */}
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-upload-cloud-2-line text-lg text-primary-600 w-5 h-5 flex items-center justify-center" />
              <span className="font-semibold text-foreground-950 text-sm">1. Charger un PDF réglementaire</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-foreground-500 mb-1.5 block">Autorité</label>
                <select
                  value={authority}
                  onChange={(e) => {
                    setAuthority(e.target.value as Authority);
                    setEntry((prev) => ({ ...prev, authority: e.target.value as Authority }));
                  }}
                  className="w-full bg-background-100 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-950 focus:outline-none focus:border-primary-400 cursor-pointer"
                >
                  {AUTHORITIES.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground-500 mb-1.5 block">Type de document</label>
                <select
                  value={docType}
                  onChange={(e) => {
                    setDocType(e.target.value);
                    setEntry((prev) => ({ ...prev, doc_type: e.target.value }));
                  }}
                  className="w-full bg-background-100 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-950 focus:outline-none focus:border-primary-400 cursor-pointer"
                >
                  {DOC_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-2 border-dashed border-background-200/70 rounded-lg p-8 text-center mb-4 hover:border-primary-300 transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer block">
                <i className="ri-file-pdf-line text-4xl text-red-400 w-10 h-10 flex items-center justify-center mx-auto mb-3" />
                <p className="text-sm text-foreground-600 font-medium">
                  {file ? file.name : 'Cliquer pour uploader un PDF réglementaire'}
                </p>
                {file && (
                  <p className="text-xs text-foreground-400 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleParsePDF}
                disabled={!file || loading}
                className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-background-50 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer whitespace-nowrap transition-colors flex items-center gap-2"
              >
                {loading && status === 'uploading' ? (
                  <>
                    <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center" />
                    Extraction en cours...
                  </>
                ) : (
                  <>
                    <i className="ri-scan-line w-4 h-4 flex items-center justify-center" />
                    Extraire les métadonnées
                  </>
                )}
              </button>
              <button
                onClick={handleManualReview}
                className="bg-background-100 hover:bg-background-200/70 text-foreground-700 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer whitespace-nowrap transition-colors border border-background-200/70 flex items-center gap-2"
              >
                <i className="ri-edit-line w-4 h-4 flex items-center justify-center" />
                Saisie manuelle
              </button>
            </div>
          </div>

          {/* Review & Edit Section */}
          {status === 'review' && (
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-6 mb-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="ri-file-search-line text-lg text-primary-600 w-5 h-5 flex items-center justify-center" />
                  <span className="font-semibold text-foreground-950 text-sm">2. Révision avant ingestion</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 whitespace-nowrap">{entry.authority}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground-500 mb-1.5 block">Référence *</label>
                  <input
                    type="text"
                    value={entry.reference}
                    onChange={(e) => setEntry((prev) => ({ ...prev, reference: e.target.value }))}
                    placeholder="Ex: R-2018/03"
                    className="w-full bg-background-100 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-950 placeholder-foreground-400 focus:outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground-500 mb-1.5 block">Date de publication *</label>
                  <input
                    type="date"
                    value={entry.date_publication}
                    onChange={(e) => setEntry((prev) => ({ ...prev, date_publication: e.target.value }))}
                    className="w-full bg-background-100 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-950 focus:outline-none focus:border-primary-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground-500 mb-1.5 block">Titre *</label>
                <input
                  type="text"
                  value={entry.title}
                  onChange={(e) => setEntry((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Titre complet du texte réglementaire"
                  className="w-full bg-background-100 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-950 placeholder-foreground-400 focus:outline-none focus:border-primary-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground-500 mb-1.5 block">URL Officielle</label>
                <input
                  type="url"
                  value={entry.url_officielle}
                  onChange={(e) => setEntry((prev) => ({ ...prev, url_officielle: e.target.value }))}
                  placeholder="https://..."
                  className="w-full bg-background-100 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-950 placeholder-foreground-400 focus:outline-none focus:border-primary-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground-500 mb-1.5 block">Contenu / Articles clés *</label>
                <textarea
                  value={entry.content}
                  onChange={(e) => setEntry((prev) => ({ ...prev, content: e.target.value }))}
                  rows={8}
                  maxLength={50000}
                  placeholder="Contenu extrait du PDF ou saisi manuellement..."
                  className="w-full bg-background-100 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-950 placeholder-foreground-400 focus:outline-none focus:border-primary-400 resize-y"
                />
                <p className="text-xs text-foreground-400 mt-1 text-right">{entry.content.length} / 50 000 caractères</p>
              </div>

              {/* Penalties */}
              <div>
                <label className="text-xs font-medium text-foreground-500 mb-2 block">Pénalités ({entry.penalties.length})</label>
                {entry.penalties.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {entry.penalties.map((p, i) => (
                      <div key={i} className="flex items-center justify-between bg-background-100 rounded-lg p-3 text-sm flex-wrap gap-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-semibold text-foreground-900">{p.article}</span>
                          <span className="text-foreground-500">{p.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-foreground-700 font-medium whitespace-nowrap">
                            {p.amende_min.toLocaleString('fr-FR')} – {p.amende_max.toLocaleString('fr-FR')} FCFA
                          </span>
                          <button
                            onClick={() => removePenalty(i)}
                            className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                          >
                            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap items-end gap-3 bg-background-100 rounded-lg p-3">
                  <div className="flex-1 min-w-[120px]">
                    <label className="text-xs text-foreground-500 block mb-1">Article</label>
                    <input
                      type="text"
                      value={newPenalty.article}
                      onChange={(e) => setNewPenalty((prev) => ({ ...prev, article: e.target.value }))}
                      placeholder="Art. 15"
                      className="w-full bg-background-50 border border-background-200/70 rounded px-2 py-1.5 text-sm text-foreground-950 focus:outline-none focus:border-primary-400"
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs text-foreground-500 block mb-1">Min (FCFA)</label>
                    <input
                      type="number"
                      value={newPenalty.amende_min || ''}
                      onChange={(e) => setNewPenalty((prev) => ({ ...prev, amende_min: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-background-50 border border-background-200/70 rounded px-2 py-1.5 text-sm text-foreground-950 focus:outline-none focus:border-primary-400"
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs text-foreground-500 block mb-1">Max (FCFA)</label>
                    <input
                      type="number"
                      value={newPenalty.amende_max || ''}
                      onChange={(e) => setNewPenalty((prev) => ({ ...prev, amende_max: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-background-50 border border-background-200/70 rounded px-2 py-1.5 text-sm text-foreground-950 focus:outline-none focus:border-primary-400"
                    />
                  </div>
                  <div className="w-28">
                    <label className="text-xs text-foreground-500 block mb-1">Type</label>
                    <select
                      value={newPenalty.type}
                      onChange={(e) => setNewPenalty((prev) => ({ ...prev, type: e.target.value }))}
                      className="w-full bg-background-50 border border-background-200/70 rounded px-2 py-1.5 text-sm text-foreground-950 focus:outline-none focus:border-primary-400 cursor-pointer"
                    >
                      <option value="AMENDE">Amende</option>
                      <option value="SUSPENSION">Suspension</option>
                      <option value="RETRAIT">Retrait</option>
                      <option value="PENAL">Pénal</option>
                    </select>
                  </div>
                  <button
                    onClick={addPenalty}
                    disabled={!newPenalty.article || newPenalty.amende_max <= 0}
                    className="bg-background-200/70 hover:bg-background-300/60 disabled:opacity-40 text-foreground-700 px-3 py-1.5 rounded text-sm font-medium cursor-pointer whitespace-nowrap transition-colors flex items-center gap-1"
                  >
                    <i className="ri-add-line w-4 h-4 flex items-center justify-center" />
                    Ajouter
                  </button>
                </div>
              </div>

              <button
                onClick={handleIngest}
                disabled={loading || !entry.reference || !entry.title || !entry.content}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-background-50 px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer whitespace-nowrap transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center" />
                    Ingestion en cours...
                  </>
                ) : (
                  <>
                    <i className="ri-check-double-line w-4 h-4 flex items-center justify-center" />
                    Valider & Ingérer dans kos_regulatory_corpus
                  </>
                )}
              </button>
            </div>
          )}

          {/* Success */}
          {status === 'success' && successMessage && (
            <div className="bg-emerald-50 border border-emerald-200/70 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 text-emerald-700 mb-1">
                <i className="ri-checkbox-circle-line text-lg w-5 h-5 flex items-center justify-center" />
                <span className="font-semibold text-sm">Ingestion réussie</span>
              </div>
              <p className="text-sm text-emerald-600">{successMessage}</p>
              <p className="text-xs text-emerald-500 mt-1">Le texte a été ajouté à kos_regulatory_corpus. Relancez kos_local_rag_v4 pour voir l'impact sur le coverage.</p>
            </div>
          )}

          {/* Error */}
          {status === 'error' && errorMessage && (
            <div className="bg-red-50 border border-red-200/70 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 text-red-700 mb-1">
                <i className="ri-error-warning-line text-lg w-5 h-5 flex items-center justify-center" />
                <span className="font-semibold text-sm">Erreur d'ingestion</span>
              </div>
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}

          {/* Error banner (non-fatal) */}
          {errorMessage && status !== 'error' && (
            <div className="bg-amber-50 border border-amber-200/70 rounded-lg p-3 mb-6 flex items-start gap-2">
              <i className="ri-alert-line text-amber-600 w-5 h-5 flex items-center justify-center mt-0.5 shrink-0" />
              <p className="text-sm text-amber-800">{errorMessage}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-background-200/70 text-center text-xs text-foreground-400 space-y-1">
            <p>KOS REGTECH AI · Corpus Ingest Engine V1.0 · Alimentation RAG KOS Native V4.1</p>
            <p>Corpus cible : kos_regulatory_corpus — BCEAO · COBAC · BEAC · OHADA</p>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}
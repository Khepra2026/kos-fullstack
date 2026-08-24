import { useState, useCallback } from 'react';
import SocialMediaPreview, { FORMATS, SocialFormat } from '';
import {
  TEMPLATES,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from '@/mocks/socialMediaTemplates';

interface GeneratedImage {
  id: string;
  url: string;
  name: string;
  format: SocialFormat;
  aspect: string;
}

export default function AdminSocialMediaGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('conformite-sfd-emf');
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>('linkedin');
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleGenerate = useCallback((dataUrl: string, format: SocialFormat) => {
    const formatConfig = FORMATS.find(f => f.id === format)!;
    const templateInfo = TEMPLATES.find(t => t.id === selectedTemplate)!;
    const id = `${selectedTemplate}-${format}-${Date.now()}`;
    setGeneratedImages(prev => [
      ...prev,
      {
        id,
        url: dataUrl,
        name: templateInfo.name,
        format,
        aspect: formatConfig.aspect,
      },
    ]);
    setGenerating(false);
  }, [selectedTemplate]);

  const startGenerate = useCallback(() => {
    setGenerating(true);
  }, []);

  const downloadImage = (url: string, name: string, format: string) => {
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `KHEPRA-${name.replace(/\s+/g, '-').toUpperCase()}-${format.toUpperCase()}.png`;
    a.click();
  };

  const deleteImage = (id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id));
  };

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(filter.toLowerCase()) || t.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(TEMPLATES.map(t => t.category)));
  const currentFormat = FORMATS.find(f => f.id === selectedFormat)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Images de Communication Commerciale</h2>
          <p className="text-sm text-gray-500 mt-1">Infographies premium pour LinkedIn, Facebook, Instagram — 15 templates × 4 formats</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Rechercher un template..."
          disabled={generating}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          disabled={generating}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white disabled:opacity-50"
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{CATEGORY_LABELS[cat] || cat}</option>
          ))}
        </select>
      </div>

      {/* Format selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-700 mr-1">Format :</span>
        {FORMATS.map(f => (
          <button
            key={f.id}
            onClick={() => setSelectedFormat(f.id)}
            disabled={generating}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedFormat === f.id
                ? 'bg-teal-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {f.label}
            <span className="ml-1.5 text-xs opacity-60">{f.aspect}</span>
          </button>
        ))}
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Template selector */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Choisir un template ({filteredTemplates.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredTemplates.map(t => {
              const catColors = CATEGORY_COLORS[t.category];
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  disabled={generating}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedTemplate === t.id
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${catColors?.accent || 'bg-gray-400'}`} />
                    <span className="text-xs font-medium text-gray-500 uppercase">{CATEGORY_LABELS[t.category]}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Aperçu {currentFormat.label} ({currentFormat.aspect})
            </h3>
            <button
              onClick={startGenerate}
              disabled={generating}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-60 whitespace-nowrap cursor-pointer"
            >
              {generating ? (
                <><i className="ri-loader-4-line animate-spin" /> Génération...</>
              ) : (
                <><i className="ri-image-line" /> Générer l&apos;image</>
              )}
            </button>
          </div>
          <SocialMediaPreview
            templateId={selectedTemplate}
            format={selectedFormat}
            generating={generating}
            onGenerate={handleGenerate}
          />
        </div>
      </div>

      {/* Generated images gallery */}
      {generatedImages.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Images générées ({generatedImages.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {generatedImages.map(img => {
              const isVertical = img.format === 'story';
              return (
                <div key={img.id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.name}
                    className={`w-full object-cover ${isVertical ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => downloadImage(img.url, img.name, img.format)}
                      className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-700 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                      title="Télécharger"
                    >
                      <i className="ri-download-line" />
                    </button>
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <i className="ri-delete-bin-line" />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-900 truncate">{img.name}</p>
                    <p className="text-xs text-gray-500">{img.aspect} · PNG</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}




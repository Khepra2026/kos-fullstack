import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    category: string;
    coverImage: string;
    downloads: number;
    chapters?: string[];
  };
  lang: string;
  onDownload: (resource: any) => void;
}

export const ResourceCard = ({ resource, lang, onDownload }: ResourceCardProps) => {
  const { t } = useTranslation();
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
      {/* Cover Image */}
      <div className="relative w-full overflow-hidden bg-gray-100 flex-shrink-0 aspect-[16/9]">
        <img
          src={resource.coverImage}
          alt={resource.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full shadow-lg tracking-wide ${
            lang === 'en' ? 'bg-sky-600 text-white' : 'bg-indigo-700 text-white'
          }`}>
            {lang === 'en' ? 'EN' : 'FR'}
          </span>
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
            {t('resources.card.free')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
            {resource.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <i className="ri-download-line"></i>
            {resource.downloads.toLocaleString()}
          </span>
        </div>

        <h3
          className="font-playfair text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2"
          title={resource.title}
        >
          {resource.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3" title={resource.description}>
          {resource.description}
        </p>

        {/* Aperçu du contenu */}
        {resource.chapters && resource.chapters.length > 0 && (
          <div className="mb-5">
            <button
              onClick={() => setPreviewOpen(!previewOpen)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <i className="ri-list-check-2 text-amber-600"></i>
                {lang === 'en' ? 'Content Preview' : 'Aperçu du contenu'}
                <span className="text-xs font-normal text-amber-600">
                  ({resource.chapters.length} {lang === 'en' ? 'chapters' : 'chapitres'})
                </span>
              </span>
              <i className={previewOpen ? 'ri-arrow-up-s-line text-amber-600 transition-transform duration-200' : 'ri-arrow-down-s-line text-amber-600 transition-transform duration-200'}></i>
            </button>

            {previewOpen && (
              <div className="mt-2 border border-amber-100 rounded-lg overflow-hidden bg-white">
                <ul className="divide-y divide-gray-50">
                  {resource.chapters.map((chapter: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-amber-50/50 transition-colors"
                    >
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-gray-700 leading-snug">{chapter}</span>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2.5 bg-amber-50 border-t border-amber-100 flex items-center gap-2">
                  <i className="ri-lock-unlock-line text-amber-600 text-xs"></i>
                  <span className="text-xs text-amber-700">
                    {lang === 'en'
                      ? 'Full content unlocked after download'
                      : 'Contenu complet débloqué après téléchargement'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={() => onDownload(resource)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-download-cloud-line text-lg"></i>
            {t('resources.card.download')}
          </button>
        </div>
      </div>
    </div>
  );
};
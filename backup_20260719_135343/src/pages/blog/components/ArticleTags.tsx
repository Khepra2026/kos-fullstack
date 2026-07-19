import { useTranslation } from 'react-i18next';

interface ArticleTagsProps {
  tags: string[];
  selectedTag?: string | null;
  onTagClick?: (tag: string) => void;
  size?: 'sm' | 'md';
  clickable?: boolean;
}

/* 
  Le dictionnaire de couleurs doit contenir des clés uniques.
  Certaines clés (« Audit », « Finance », « Startups » étaient déclarées deux fois,
  ce qui provoquait des erreurs de compilation.
  Nous conservons une seule définition pour chaque clé, valable à la fois pour le FR
  et l’EN, car le style souhaité est identique dans les deux langues.
*/
const TAG_COLORS: Record<string, string> = {
  // FR
  'Gouvernance': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  "Conseil d'administration": 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  'Risques': 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
  'Conformité': 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
  'Audit': 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
  // Removed duplicate French/English "Finance" entry – keep the EN version below.
  'Levée de fonds': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'Trésorerie': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'Modélisation': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'Investisseurs': 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
  'FinTech': 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
  'Inclusion financière': 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
  'Transformation digitale': 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',
  'Innovation': 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',
  'ERP': 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',
  'Entrepreneuriat': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
  'Startups': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
  'PME': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
  'Impact social': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
  'ONG': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
  'Business Plan': 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
  'Stratégie': 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
  // EN
  'Governance': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  'Board Advisory': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  'Risk Management': 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
  'Compliance': 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
  // Keep only one "Finance" entry (EN)
  'Finance': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'Fundraising': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'Cash Flow': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'Modeling': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'Investors': 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
  'Financial Inclusion': 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
  'Digital Transformation': 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',
  'Entrepreneurship': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
  'SMEs': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
  'Social Impact': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
  'NGO': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
  'Strategy': 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
};

const DEFAULT_COLOR = 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100';

export function ArticleTags({ tags, selectedTag, onTagClick, size = 'sm', clickable = false }: ArticleTagsProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const sizeClasses = size === 'sm'
    ? 'text-xs px-2.5 py-1'
    : 'text-sm px-3.5 py-1.5';

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const colorClass = TAG_COLORS[tag] || DEFAULT_COLOR;
        const isSelected = selectedTag === tag;

        return (
          <span
            key={tag}
            onClick={clickable && onTagClick ? (e) => { e.stopPropagation(); onTagClick(tag); } : undefined}
            className={`
              inline-flex items-center gap-1 border rounded-full font-medium transition-all
              ${sizeClasses}
              ${colorClass}
              ${clickable ? 'cursor-pointer' : ''}
              ${isSelected ? 'ring-2 ring-offset-1 ring-current font-semibold shadow-sm' : ''}
            `}
          >
            {clickable && <i className="ri-price-tag-3-line text-xs"></i>}
            {tag}
          </span>
        );
      })}
    </div>
  );
}




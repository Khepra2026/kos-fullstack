import type { FC } from 'react';

interface MethodologyNoteProps {
  data: string;
  className?: string;
}

export const ArticleMethodology: FC<MethodologyNoteProps> = ({ data, className = '' }) => {
  if (!data) return null;

  return (
    <div className={`mb-8 rounded-2xl border border-secondary-200 bg-secondary-100 p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-background-50 border border-secondary-200 flex-shrink-0">
          <i className="ri-microscope-line text-foreground-500 text-base"></i>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-foreground-500 mb-1">Note Méthodologique</p>
          <p className="text-xs text-foreground-500 leading-relaxed italic">{data}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleMethodology;




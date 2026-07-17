import { useState, useCallback, type ReactNode } from 'react';
import { useBrochureDownload } from '@/hooks/useBrochureDownload';
import { useToast } from '@/components/base/Toast';

interface BrochureDownloadButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  lang?: 'en';
  source?: import('@/utils/downloadTracker').DownloadSource;
}

const variantStyles: Record<string, string> = {
  primary: 'inline-flex items-center gap-2 bg-primary-500 text-background-50 dark:text-foreground-950 px-6 py-3 rounded-lg hover:bg-primary-600 transition-all font-semibold shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer',
  secondary: 'inline-flex items-center gap-2 bg-background-50/10 backdrop-blur-sm text-background-50 border border-background-50/30 px-6 py-3 rounded-lg hover:bg-background-50/20 transition-all font-semibold whitespace-nowrap cursor-pointer',
  outline: 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-all hover:opacity-90 border border-primary-500 text-primary-700 hover:bg-primary-100',
  ghost: 'inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors cursor-pointer whitespace-nowrap',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function BrochureDownloadButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  lang,
  source = 'other',
}: BrochureDownloadButtonProps) {
  const { handleDownload, isDownloading } = useBrochureDownload(source);
  const { showToast } = useToast();
  const base = variantStyles[variant] || variantStyles.primary;
  const sizeClass = sizeStyles[size] || sizeStyles.md;

  const onClick = useCallback(async () => {
    try {
      await handleDownload(lang);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur lors du téléchargement. Veuillez réessayer.';
      showToast(msg, 'error');
    }
  }, [handleDownload, lang, showToast]);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDownloading}
      className={`${base} ${sizeClass} ${className}`}
      aria-label="Télécharger la brochure PDF"
    >
      {isDownloading ? (
        <>
          <i className="ri-loader-4-line animate-spin" />
          Génération...
        </>
      ) : (
        children
      )}
    </button>
  );
}
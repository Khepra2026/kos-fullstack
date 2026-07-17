import { useState, useCallback } from 'react';
import { downloadBrochure, downloadBrochureEn } from '@/utils/brochurePdf';
import { type DownloadSource } from '@/utils/downloadTracker';

export function useBrochureDownload(source: DownloadSource = 'other') {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async (lang?: 'en') => {
    setIsDownloading(true);
    try {
      if (lang === 'en') {
        await downloadBrochureEn(source);
      } else {
        await downloadBrochure(source);
      }
    } catch (err) {
      console.error('Download failed:', err);
      if (err instanceof Error) {
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
      }
      throw new Error('La génération de la brochure a échoué. Veuillez réessayer ou contacter contact@khepraexperts.com');
    } finally {
      setIsDownloading(false);
    }
  }, [source]);

  return { handleDownload, isDownloading };
}
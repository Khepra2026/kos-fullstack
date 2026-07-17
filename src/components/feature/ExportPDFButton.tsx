import { useState, useCallback } from 'react';
import { exportPdfViaGateway, isGatewayAvailable } from '@/utils/apiGateway';

interface ExportPDFButtonProps {
  pays: string;
  regulateur: string;
  redFlags?: string[];
}

export default function ExportPDFButton({ pays, regulateur, redFlags = [] }: ExportPDFButtonProps) {
  const [open, setOpen] = useState(false);
  const [dealName, setDealName] = useState('');
  const [nplRatio, setNplRatio] = useState(42);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [error, setError] = useState('');

  const gatewayReady = isGatewayAvailable();

  const handleExport = useCallback(async () => {
    setLoading(true);
    setError('');
    setPdfUrl('');

    const dealId = `deal-${Date.now()}-${pays.toLowerCase().replace(/\s/g, '-')}`;

    const result = await exportPdfViaGateway({
      dealId,
      dealName: dealName || `Due Diligence ${pays}`,
      nplRatio,
      redFlags,
      pays,
      regulateur,
    });

    if (result.success) {
      setPdfUrl(result.url);
      window.open(result.url, '_blank');
    } else {
      setError('error' in result ? result.error : 'Erreur inconnue lors de la génération du PDF');
    }
    setLoading(false);
  }, [dealName, nplRatio, redFlags, pays, regulateur]);

  const closePanel = useCallback(() => {
    setOpen(false);
    setError('');
    setPdfUrl('');
  }, []);

  return (
    <>
      {/* Floating Export Button */}
      <div className="fixed bottom-8 right-8 z-50">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-900 to-brand-800 text-white px-6 py-4 rounded-2xl hover:from-brand-800 hover:to-brand-700 transition-all font-semibold shadow-2xl shadow-brand-900/40 cursor-pointer whitespace-nowrap group"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
              <i className="ri-file-pdf-2-line text-gold-400 text-xl"></i>
            </div>
            <div className="text-left">
              <span className="block text-sm leading-tight">Exporter</span>
              <span className="block text-xs text-gray-300 leading-tight">Rapport KHEPRA DD&trade;</span>
            </div>
          </button>
        )}
      </div>

      {/* Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closePanel}></div>
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100 animate-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <i className="ri-file-pdf-2-line text-red-500 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Exporter le rapport PDF</h3>
                  <p className="text-xs text-gray-500">KHEPRA DD&trade; — {pays}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
              >
                <i className="ri-close-line text-gray-400"></i>
              </button>
            </div>

            {/* Gateway status */}
            {!gatewayReady && (
              <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <i className="ri-cloud-off-line text-amber-500"></i>
                <p className="text-xs text-amber-700">
                  KHEPRA Gateway non configurée. L'export PDF nécessite le déploiement du Worker Cloudflare.
                </p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-5">
              {/* Deal Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <i className="ri-building-2-line text-gray-400"></i>
                  Nom de la cible / deal
                </label>
                <input
                  type="text"
                  value={dealName}
                  onChange={(e) => setDealName(e.target.value)}
                  placeholder={`Due Diligence ${pays}`}
                  className="w-full px-4 py-3 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-all"
                />
              </div>

              {/* NPL Ratio */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <i className="ri-funds-line text-gray-400"></i>
                    Ratio NPL (%)
                  </label>
                  <span className="text-lg font-bold font-mono" style={{ color: nplRatio < 70 ? '#D32F2F' : '#2E7D32' }}>
                    {nplRatio}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nplRatio}
                  onChange={(e) => setNplRatio(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between mt-2">
                  {[25, 42, 70, 85].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setNplRatio(val)}
                      className={`text-xs font-medium px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                        nplRatio === val
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Info pill */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-bank-line text-brand-700 text-sm"></i>
                </div>
                <p className="text-xs text-gray-600">
                  Rapport PDF A4 5+ pages — {regulateur}, {pays}. Stocké sur R2 chiffré.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
                  <i className="ri-error-warning-line text-red-500 flex-shrink-0"></i>
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              {/* Success */}
              {pdfUrl && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-xs text-emerald-700 font-medium mb-2">
                    <i className="ri-check-line mr-1"></i>
                    PDF généré avec succès !
                  </p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 underline hover:text-emerald-800 cursor-pointer"
                  >
                    {pdfUrl}
                  </a>
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handleExport}
                disabled={loading || !gatewayReady}
                className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-900 to-brand-800 text-white px-6 py-4 rounded-xl hover:from-brand-800 hover:to-brand-700 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg shadow-brand-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Génération KHEPRA DD&trade;...
                  </>
                ) : (
                  <>
                    <i className="ri-download-2-line text-xl"></i>
                    Générer le rapport PDF
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Format A4 professionnel · Puppeteer Cloudflare · R2 Storage
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
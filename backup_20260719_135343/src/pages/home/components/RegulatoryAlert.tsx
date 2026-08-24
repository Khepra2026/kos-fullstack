import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function RegulatoryAlert() {
  const { t } = useTranslation();

  return (
    <div data-banner="regulatory" className="relative bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100 py-3 px-4 w-full z-[59]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm md:text-base">
        <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
          <span className="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75 pointer-events-none" aria-hidden="true"></span>
          <span className="relative w-3 h-3 bg-red-600 rounded-full" aria-hidden="true"></span>
        </div>
        <p className="text-red-900 font-medium text-center">
          <strong className="font-bold">{t('regulatoryAlert.title')}</strong> {t('regulatoryAlert.message')}
        </p>
        <Link
          to="/services/conseil-strategique/"
          className="flex-shrink-0 px-4 py-1.5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
        >
          {t('regulatoryAlert.cta')}
        </Link>
      </div>
    </div>
  );
}





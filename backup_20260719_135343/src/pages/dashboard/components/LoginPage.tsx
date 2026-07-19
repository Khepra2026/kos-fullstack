import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import { useTranslation } from 'react-i18next';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'khepra2025') {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <SeoHead
        title="Dashboard — KHEPRA EXPERTS"
        description="Tableau de bord privé KHEPRA EXPERTS"
        canonicalPath="/dashboard"
        noIndex={true}
      />
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-sm border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#c19a6b] to-[#a47c48] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="ri-dashboard-3-line text-3xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{t('dashboard.login.title')}</h1>
          <p className="text-xs text-[#c19a6b] font-medium uppercase tracking-wider mb-2">Investment & ESG Advisory Boutique</p>
          <p className="text-slate-500 text-sm">{t('dashboard.login.subtitle')}</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              {t('dashboard.login.passwordLabel')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#c19a6b] focus:border-transparent text-sm ${error ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
              placeholder={t('dashboard.login.passwordPlaceholder')}
              required
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center"></i>
                {t('dashboard.login.incorrectPassword')}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white py-3 rounded-lg font-medium hover:from-[#a47c48] hover:to-[#8b6a3a] transition-all whitespace-nowrap cursor-pointer"
          >
            {t('dashboard.login.loginButton')}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            type="button"
          >
            Retour au site
          </button>
        </div>
      </div>
    </div>
  );
}




import { useNavigate } from 'react-router-dom';

export type AdminView = 'dashboard' | 'documents' | 'social-media' | 'agenda' | 'cgi-documents' | 'linkedin-publisher' | 'hermeneia' | 'pillar-cwv' | 'routing';

interface AdminSidebarProps {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
  onLogout: () => void;
  onChangePassword: () => void;
  documentsCount: number;
  cgiDocumentsCount: number;
}

const NAV_ITEMS: { id: AdminView; label: string; icon: string; badge?: string }[] = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-3-line', badge: 'Partner' },
  { id: 'documents', label: 'Documents', icon: 'ri-folder-line' },
  { id: 'cgi-documents', label: 'Dossiers CGI SA', icon: 'ri-bank-line' },
  { id: 'social-media', label: 'Images de Com', icon: 'ri-image-line' },
  { id: 'agenda', label: 'Agenda Stratégique', icon: 'ri-calendar-event-line' },
  { id: 'linkedin-publisher', label: 'LinkedIn Publisher', icon: 'ri-linkedin-fill' },
  { id: 'hermeneia', label: 'Hermeneia — Rituels', icon: 'ri-sun-line' },
  { id: 'pillar-cwv', label: 'Pillar CWV Audit', icon: 'ri-pulse-line' },
  { id: 'routing', label: 'KOS Routing 150%', icon: 'ri-route-line', badge: 'Live' },
];

export default function AdminSidebar({
  activeView,
  onViewChange,
  onLogout,
  onChangePassword,
  documentsCount,
  cgiDocumentsCount,
}: AdminSidebarProps) {
  const navigate = useNavigate();

  const getCount = (id: AdminView) => {
    if (id === 'documents') return documentsCount;
    if (id === 'cgi-documents') return cgiDocumentsCount;
    return undefined;
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-foreground-950 text-white min-h-screen flex flex-col">
      {/* Logo area */}
      <div className="px-5 py-6 border-b border-white/8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
            <i className="ri-bug-line text-lg text-white"></i>
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">KHEPRA</p>
            <p className="text-amber-400 text-[10px] font-semibold tracking-[0.15em]">EXPERTS</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
          <span className="text-white/40 text-[10px] font-medium tracking-wider uppercase">Console Privée</span>
          <span className="ml-auto px-2 py-0.5 bg-amber-500/15 border border-amber-400/30 rounded text-amber-400 text-[9px] font-bold tracking-wider">PARTNER</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          const count = getCount(item.id);

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-white/50 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 transition-all ${
                isActive ? 'bg-amber-500/20 text-amber-400' : 'text-white/30 group-hover:text-white/60'
              }`}>
                <i className={`${item.icon} text-base`}></i>
              </div>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 bg-amber-500/15 border border-amber-400/30 rounded text-amber-400 text-[9px] font-bold">
                  {item.badge}
                </span>
              )}
              {count !== undefined && count > 0 && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isActive ? 'bg-white/15 text-white' : 'bg-white/5 text-white/40'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <button
          onClick={onChangePassword}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30">
            <i className="ri-key-2-line text-base"></i>
          </div>
          <span>Changer mot de passe</span>
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30">
            <i className="ri-arrow-left-line text-base"></i>
          </div>
          <span>Retour au site</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400/30">
            <i className="ri-logout-box-line text-base"></i>
          </div>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
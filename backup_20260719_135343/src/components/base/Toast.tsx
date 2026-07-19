import { useState, useCallback, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';
interface ToastItem { id: number; message: string; type: ToastType; }

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() { return useContext(ToastContext); }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  let nextId = 0;

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 4000) => {
    const id = ++nextId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const typeStyles: Record<ToastType, { bg: string; icon: string; text: string }> = {
    success: { bg: 'bg-emerald-600', icon: 'ri-check-line', text: 'text-white' },
    error: { bg: 'bg-red-600', icon: 'ri-close-line', text: 'text-white' },
    info: { bg: 'bg-foreground-950', icon: 'ri-information-line', text: 'text-white' },
    warning: { bg: 'bg-amber-600', icon: 'ri-error-warning-line', text: 'text-white' },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map(t => {
          const s = typeStyles[t.type];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl ${s.bg} ${s.text} animate-in slide-in-from-bottom-4 fade-in duration-300 max-w-sm`}
            >
              <i className={`${s.icon} text-lg flex-shrink-0`} />
              <span className="text-sm font-medium leading-tight">{t.message}</span>
              <button
                onClick={() => removeToast(t.id)}
                className="ml-auto w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 cursor-pointer flex-shrink-0 transition-colors"
              >
                <i className="ri-close-line text-xs" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;




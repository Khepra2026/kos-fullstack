import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: 'success' | 'error' | 'info';
}

interface ToasterContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToasterContext = createContext<ToasterContextType>({ addToast: () => {} });

export function useToast() {
  return useContext(ToasterContext);
}

export function toasterProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm border backdrop-blur-sm"
              style={{
                backgroundColor: 'oklch(var(--background-50))',
                borderColor: 'oklch(var(--background-300) / 0.6)',
              }}
            >
              {toast.variant === 'success' && (
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5" style={{ color: 'oklch(var(--accent-500))' }} />
                </div>
              )}
              {toast.variant === 'error' && (
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" style={{ color: 'oklch(var(--primary-500))' }} />
                </div>
              )}
              {toast.variant === 'info' && (
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-5 h-5" style={{ color: 'oklch(var(--secondary-500))' }} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'oklch(var(--foreground-950))' }}>
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="text-xs mt-0.5" style={{ color: 'oklch(var(--foreground-600))' }}>
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded hover:bg-background-100/50 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" style={{ color: 'oklch(var(--foreground-500))' }} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToasterContext.Provider>
  );
}




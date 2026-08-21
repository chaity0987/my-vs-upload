import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Flame, X } from 'lucide-react';
import { ToastInfo } from '../types';

interface ToastProps {
  toasts: ToastInfo[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastInfo; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          bg: 'bg-white border-emerald-300 shadow-emerald-900/5',
          titleColor: 'text-emerald-950',
          textColor: 'text-emerald-800',
        };
      case 'emergency':
        return {
          icon: <Flame className="w-5 h-5 text-rose-600 animate-pulse shrink-0" />,
          bg: 'bg-rose-50 border-rose-400 shadow-rose-900/10',
          titleColor: 'text-rose-950 font-bold',
          textColor: 'text-rose-900',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          bg: 'bg-amber-50 border-amber-300 shadow-amber-900/5',
          titleColor: 'text-amber-950',
          textColor: 'text-amber-800',
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
          bg: 'bg-white border-red-300 shadow-red-900/5',
          titleColor: 'text-red-950',
          textColor: 'text-red-800',
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
          bg: 'bg-white border-slate-200 shadow-slate-900/5',
          titleColor: 'text-slate-900',
          textColor: 'text-slate-700',
        };
    }
  };

  const style = getStyle();

  return (
    <div
      id={`toast-${toast.id}`}
      role="alert"
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-300 transform translate-y-0 ${style.bg}`}
    >
      <div className="mt-0.5">{style.icon}</div>
      <div className="flex-1 text-sm">
        {toast.title && <div className={`font-semibold ${style.titleColor}`}>{toast.title}</div>}
        <div className={style.textColor}>{toast.message}</div>
      </div>
      <button
        id={`toast-close-${toast.id}`}
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

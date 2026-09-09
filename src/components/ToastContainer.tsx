import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useToast } from './ToastContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-4 py-3 rounded-xl glass shadow-xl animate-fade-in-up"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-violet-400 shrink-0" />}
          <p className="text-sm text-slate-200 flex-1">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

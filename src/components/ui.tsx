import { useState, type ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ text, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button onClick={handleCopy} className={`btn-secondary ${className}`} aria-label={label}>
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied' : label}
    </button>
  );
}

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-ink-600 border-t-violet-400"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}

export function LoadingOverlay({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 animate-fade-in">
      <LoadingSpinner size={40} />
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-ink-800 flex items-center justify-center mb-4 text-slate-500">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6">{description}</p>
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        {icon && <div className="text-violet-400">{icon}</div>}
        <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
      </div>
      {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass-card p-6 ${className}`}>{children}</div>;
}

export function Badge({
  children,
  color = 'violet',
}: {
  children: ReactNode;
  color?: 'violet' | 'green' | 'amber' | 'red' | 'blue' | 'slate';
}) {
  const colors: Record<string, string> = {
    violet: 'bg-violet-500/15 text-violet-350 border border-violet-500/30',
    green: 'bg-green-500/15 text-green-400 border border-green-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    red: 'bg-red-500/15 text-red-400 border border-red-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    slate: 'bg-ink-700 text-slate-400 border border-ink-600',
  };
  return <span className={`chip ${colors[color]}`}>{children}</span>;
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/80 text-xs leading-relaxed">
      <Info className="w-4 h-4 shrink-0 mt-0.5" />
      <p>{children}</p>
    </div>
  );
}

function Info({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

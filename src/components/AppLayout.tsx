import { useState, type ReactNode } from 'react';
import { Menu, ArrowLeft, Sparkles } from 'lucide-react';
import type { PageId } from '../types';
import Sidebar from './Sidebar';
import ToastContainer from './ToastContainer';

interface AppLayoutProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
}

export default function AppLayout({ currentPage, onNavigate, children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    onNavigate(page);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 lg:px-8 py-4 bg-ink-950/80 backdrop-blur-xl border-b border-ink-700">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">WorkMate AI</span>
          </div>
        </header>
        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

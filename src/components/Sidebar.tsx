import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  FlaskConical,
  ShieldCheck,
  Info,
  Sparkles,
  X,
} from 'lucide-react';
import type { PageId } from '../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'email', label: 'Smart Email', icon: Mail },
  { id: 'meeting', label: 'Meeting Notes', icon: FileText },
  { id: 'tasks', label: 'Task Planner', icon: ListChecks },
  { id: 'research', label: 'Research Assistant', icon: Search },
  { id: 'chatbot', label: 'AI Chatbot', icon: MessageSquare },
  { id: 'prompt-lab', label: 'Prompt Lab', icon: FlaskConical },
  { id: 'responsible-ai', label: 'Responsible AI', icon: ShieldCheck },
  { id: 'about', label: 'About the Project', icon: Info },
];

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-ink-900 border-r border-ink-700 z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-ink-700">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 group"
            aria-label="Go to landing page"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white leading-tight">WorkMate AI</p>
              <p className="text-[10px] text-slate-500 leading-tight">Work smarter. Move faster.</p>
            </div>
          </button>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 mb-2 text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
            Workspace
          </p>
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-ink-700">
          <div className="px-3 py-3 rounded-xl bg-ink-800/50 border border-ink-600">
            <p className="text-[10px] text-slate-500 mb-1">Prototype Version</p>
            <p className="text-xs text-slate-300 font-medium">WorkMate AI v1.0</p>
            <p className="text-[10px] text-slate-600 mt-1">CAPACITI AI Project</p>
          </div>
        </div>
      </aside>
    </>
  );
}

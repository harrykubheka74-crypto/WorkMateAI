import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  Info,
} from 'lucide-react';
import type { PageId } from '../types';
import { DEMO_STATS } from '../demoData';
import { SectionTitle, Card, Badge } from '../components/ui';

interface DashboardProps {
  onNavigate: (page: PageId) => void;
}

const STATS = [
  { key: 'tasksAssisted', label: 'Tasks Assisted', value: DEMO_STATS.tasksAssisted, icon: ListChecks, color: 'violet' },
  { key: 'emailsGenerated', label: 'Emails Generated', value: DEMO_STATS.emailsGenerated, icon: Mail, color: 'blue' },
  { key: 'meetingsSummarized', label: 'Meetings Summarized', value: DEMO_STATS.meetingsSummarized, icon: FileText, color: 'green' },
  { key: 'researchBriefs', label: 'Research Briefs', value: DEMO_STATS.researchBriefs, icon: Search, color: 'amber' },
  { key: 'timeSavedHours', label: 'Est. Time Saved', value: `${DEMO_STATS.timeSavedHours}h`, icon: Clock, color: 'violet' },
];

const QUICK_ACTIONS: { label: string; icon: typeof Mail; page: PageId; description: string }[] = [
  { label: 'Generate Email', icon: Mail, page: 'email', description: 'Draft a professional email' },
  { label: 'Summarize Meeting', icon: FileText, page: 'meeting', description: 'Turn notes into structured summaries' },
  { label: 'Plan My Tasks', icon: ListChecks, page: 'tasks', description: 'Organize tasks into a timeline' },
  { label: 'Research a Topic', icon: Search, page: 'research', description: 'Generate a research brief' },
  { label: 'Ask WorkMate', icon: MessageSquare, page: 'chatbot', description: 'Chat with the AI assistant' },
];

const RECENT_ACTIVITY = [
  { type: 'email', label: 'Email drafted: Project Progress Update', time: '2 hours ago' },
  { type: 'meeting', label: 'Meeting summarized: Weekly Project Sync', time: '5 hours ago' },
  { type: 'tasks', label: 'Task plan created: Daily Plan (5 tasks)', time: 'Yesterday' },
  { type: 'research', label: 'Research brief: AI in Manufacturing', time: '2 days ago' },
];

const ACTIVITY_ICONS: Record<string, typeof Mail> = {
  email: Mail,
  meeting: FileText,
  tasks: ListChecks,
  research: Search,
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="animate-fade-in">
      <SectionTitle
        title="Dashboard"
        subtitle="Your AI-powered workplace productivity assistant."
        icon={<LayoutDashboard className="w-6 h-6" />}
      />

      {/* Welcome card */}
      <div className="relative overflow-hidden glass-card p-6 lg:p-8 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              <h2 className="text-xl font-bold text-white">Welcome to WorkMate AI</h2>
            </div>
            <p className="text-sm text-slate-400 max-w-lg">
              Your AI-powered workplace productivity assistant. Choose a quick action below to get started.
            </p>
          </div>
          <Badge color="violet">Prototype / Demo Data</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-300">Productivity Overview</h3>
          <span className="text-xs text-slate-500">Prototype data — not verified metrics</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.key} className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-4 h-4 text-violet-400" />
                  <TrendingUp className="w-3 h-3 text-green-400/60" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => onNavigate(action.page)}
                  className="group glass-card p-4 text-left hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{action.label}</p>
                      <p className="text-xs text-slate-500">{action.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Recent Activity</h3>
          <Card className="p-4">
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((activity, i) => {
                const Icon = ACTIVITY_ICONS[activity.type] || Mail;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-ink-800 border border-ink-600 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300 leading-snug">{activity.label}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-ink-800/50 border border-ink-600 text-xs text-slate-500">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />
        <p>
          Statistics shown are prototype/demo values for demonstration purposes. They are not verified
          business results. Connect a real LLM API to generate live data.
        </p>
      </div>
    </div>
  );
}

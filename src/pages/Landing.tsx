import {
  Sparkles,
  Mail,
  FileText,
  ListChecks,
  Search,
  ArrowRight,
  CheckCircle2,
  PenLine,
  Workflow,
  Eye,
  ClipboardCheck,
  Rocket,
  ShieldCheck,
  FlaskConical,
  TrendingUp,
} from 'lucide-react';
import type { PageId } from '../types';

interface LandingProps {
  onNavigate: (page: PageId) => void;
}

const FEATURES = [
  {
    id: 'email' as PageId,
    icon: Mail,
    title: 'Smart Email',
    description: 'Draft professional emails with the right tone, structure, and purpose — without starting from a blank page.',
  },
  {
    id: 'meeting' as PageId,
    icon: FileText,
    title: 'Meeting Summarizer',
    description: 'Turn raw meeting notes into structured summaries with action items, decisions, and key discussion points.',
  },
  {
    id: 'tasks' as PageId,
    icon: ListChecks,
    title: 'Task Planner',
    description: 'Organize your tasks by urgency, importance, and effort into a clear daily or weekly plan.',
  },
  {
    id: 'research' as PageId,
    icon: Search,
    title: 'Research Assistant',
    description: 'Generate structured research briefs with insights, findings, risks, and recommendations.',
  },
];

const HOW_IT_WORKS = [
  { icon: PenLine, title: 'Enter information', description: 'Provide the details, notes, or tasks you want to work with.' },
  { icon: Workflow, title: 'Choose an AI workflow', description: 'Select the right tool for the job — email, summary, plan, or research.' },
  { icon: Sparkles, title: 'Generate structured output', description: 'Get a well-organized first draft in seconds, not minutes.' },
  { icon: Eye, title: 'Review and refine', description: 'Adjust tone, length, or content to match your needs exactly.' },
  { icon: ClipboardCheck, title: 'Take action', description: 'Copy, export, and use your output with confidence.' },
];

const VALUE_POINTS = [
  'Save time. Improve consistency. Focus on higher-value work.',
];

const COMPARISON_WITHOUT = [
  'Manual drafting from scratch',
  'Manual note processing',
  'Manual task organization',
  'Manual research with scattered sources',
];

const COMPARISON_WITH = [
  'AI-assisted drafting with structure',
  'Structured summaries with action items',
  'Prioritized plans with timelines',
  'Research briefs with clear sections',
];

const ROADMAP = [
  { phase: 'Phase 1', title: 'Prototype', status: 'Current', description: 'Working demo with mock AI responses and full UI.' },
  { phase: 'Phase 2', title: 'Real LLM Integration', status: 'Planned', description: 'Connect to a live language model via secure edge functions.' },
  { phase: 'Phase 3', title: 'Calendar & Email Integration', status: 'Planned', description: 'Sync with calendars and email clients for real workflows.' },
  { phase: 'Phase 4', title: 'Live Research with Citations', status: 'Planned', description: 'Verified web research with traceable citations.' },
  { phase: 'Phase 5', title: 'Analytics & Enterprise', status: 'Planned', description: 'Productivity analytics and enterprise deployment features.' },
];

const LEARNING_OBJECTIVES = [
  { icon: Sparkles, title: 'Introduction to AI', description: 'Demonstrates practical AI through email generation, summarization, planning, and research workflows.' },
  { icon: TrendingUp, title: 'Maximizing Productivity', description: 'Reduces repetitive work with structured, AI-assisted outputs that save time and improve consistency.' },
  { icon: FlaskConical, title: 'Prompt Engineering', description: 'Includes a dedicated Prompt Lab teaching the RTC CO framework with before-and-after examples.' },
  { icon: ShieldCheck, title: 'Responsible AI', description: 'A full Responsible AI page covering verification, protection, questioning, and ownership principles.' },
  { icon: Rocket, title: 'Staying Ahead of the AI Curve', description: 'A future roadmap showing the path from prototype to enterprise-grade AI productivity platform.' },
];

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-ink-950">
      {/* Nav bar */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-4 bg-ink-950/80 backdrop-blur-xl border-b border-ink-700">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">WorkMate AI</p>
            <p className="text-[10px] text-slate-500 leading-tight">Work smarter. Move faster.</p>
          </div>
        </div>
        <button onClick={() => onNavigate('dashboard')} className="btn-primary">
          Launch WorkMate AI
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 lg:px-8 pt-16 lg:pt-24 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse-glow" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-violet-350">AI-Powered Workplace Productivity</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight text-balance mb-6 animate-fade-in-up">
            Work smarter. <span className="gradient-text">Move faster.</span>
          </h1>
          <p className="text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            WorkMate AI transforms repetitive workplace tasks into intelligent, structured workflows —
            helping professionals draft, summarize, plan and research faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-fade-in-up">
            <button onClick={() => onNavigate('dashboard')} className="btn-primary w-full sm:w-auto">
              Launch WorkMate AI
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary w-full sm:w-auto"
            >
              Explore Features
            </button>
          </div>

          {/* Dashboard preview mockup */}
          <div className="relative max-w-5xl mx-auto animate-fade-in-up">
            <div className="glass-card p-4 lg:p-6 text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-xs text-slate-500 ml-2">WorkMate AI Dashboard</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Tasks Assisted', value: '47', icon: ListChecks },
                  { label: 'Emails Generated', value: '128', icon: Mail },
                  { label: 'Meetings Summarized', value: '23', icon: FileText },
                  { label: 'Time Saved', value: '31h', icon: TrendingUp },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-xl bg-ink-800/60 border border-ink-600 p-3">
                      <Icon className="w-4 h-4 text-violet-400 mb-2" />
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] text-slate-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                <div className="rounded-xl bg-ink-800/60 border border-ink-600 p-4">
                  <p className="text-xs text-slate-500 mb-2">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    {['Generate Email', 'Summarize Meeting', 'Plan Tasks', 'Research'].map((action) => (
                      <span key={action} className="chip bg-violet-500/10 text-violet-350 border border-violet-500/20">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-ink-800/60 border border-ink-600 p-4">
                  <p className="text-xs text-slate-500 mb-2">Today's Priority</p>
                  <div className="space-y-1.5">
                    {['Finish project report', 'Reply to client', 'Prepare presentation'].map((task, i) => (
                      <div key={task} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-5 h-5 rounded-md bg-violet-500/20 text-violet-350 flex items-center justify-center text-[10px] font-bold">
                          {i + 1}
                        </span>
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section id="features" className="px-4 lg:px-8 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Four AI workflows. One workspace.</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Each tool is designed to reduce repetitive work and give you a structured starting point.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => onNavigate(feature.id)}
                  className="group glass-card p-5 text-left hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
                >
                  <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{feature.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-violet-350 group-hover:gap-2 transition-all">
                    Open tool <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 lg:p-12">
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-3">
              Save time. Improve consistency. Focus on higher-value work.
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              WorkMate AI doesn't replace your judgment — it handles the repetitive first-draft work
              so you can spend your time on what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-sm text-slate-400">From input to action in five steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
                  <div className="glass-card p-5 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-violet-400" />
                      </div>
                      <span className="text-xs font-bold text-violet-350">Step {i + 1}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-ink-600" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Productivity comparison */}
      <section className="px-4 lg:px-8 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">The Productivity Difference</h2>
            <p className="text-xs text-slate-500">Demonstration comparison — prototype measurements, not verified business results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-6 border border-ink-600">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-ink-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-400">W/O</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-300">Without WorkMate AI</h3>
              </div>
              <ul className="space-y-2.5">
                {COMPARISON_WITHOUT.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-slate-600 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-6 border border-violet-500/30">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">With WorkMate AI</h3>
              </div>
              <ul className="space-y-2.5">
                {COMPARISON_WITH.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learning objectives */}
      <section className="px-4 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">What This Project Demonstrates</h2>
            <p className="text-sm text-slate-400">Five core AI learning objectives, shown through real features.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARNING_OBJECTIVES.map((obj) => {
              const Icon = obj.icon;
              return (
                <div key={obj.title} className="glass-card p-5">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{obj.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{obj.description}</p>
                </div>
              );
            })}
            <button
              onClick={() => onNavigate('about')}
              className="glass-card p-5 text-left hover:border-violet-500/30 transition-all flex flex-col justify-center"
            >
              <h3 className="text-sm font-semibold text-white mb-1.5">Learn more about the project</h3>
              <p className="text-xs text-slate-400">Read about the problem, solution, and future roadmap.</p>
              <span className="inline-flex items-center gap-1 text-xs text-violet-350 mt-3">
                About WorkMate AI <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-4 lg:px-8 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Future Roadmap</h2>
            <p className="text-sm text-slate-400">From prototype to enterprise platform.</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-ink-600 hidden sm:block" />
            <div className="space-y-4">
              {ROADMAP.map((item) => (
                <div key={item.phase} className="relative flex items-start gap-4 sm:pl-12">
                  <div className="hidden sm:flex absolute left-0 top-1 w-8 h-8 rounded-full bg-ink-800 border-2 border-violet-500/30 items-center justify-center">
                    <span className="text-[10px] font-bold text-violet-350">{item.phase.split(' ')[1]}</span>
                  </div>
                  <div className="glass-card p-5 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <span
                        className={`chip ${
                          item.status === 'Current'
                            ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                            : 'bg-ink-700 text-slate-400 border border-ink-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative overflow-hidden glass-card p-8 lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
            <div className="relative">
              <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Ready to work smarter?</h2>
              <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
                Launch the WorkMate AI workspace and start reducing repetitive work today.
              </p>
              <button onClick={() => onNavigate('dashboard')} className="btn-primary mx-auto">
                Launch WorkMate AI
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 lg:px-8 py-8 border-t border-ink-700">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">WorkMate AI</p>
              <p className="text-[10px] text-slate-500">CAPACITI AI Project — Prototype</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <button onClick={() => onNavigate('responsible-ai')} className="hover:text-white transition-colors">Responsible AI</button>
            <button onClick={() => onNavigate('prompt-lab')} className="hover:text-white transition-colors">Prompt Lab</button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

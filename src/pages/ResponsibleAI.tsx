import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  HelpCircle,
  UserCheck,
  AlertTriangle,
  Eye,
  FileSearch,
  Pencil,
  ThumbsUp,
  Rocket,
  Brain,
  Clock,
  Puzzle,
  Layers,
  Zap,
} from 'lucide-react';
import { SectionTitle, Card } from '../components/ui';

const PRINCIPLES = [
  {
    title: 'VERIFY',
    icon: CheckCircle2,
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    description: 'AI-generated information should be checked before important decisions are made.',
  },
  {
    title: 'PROTECT',
    icon: Lock,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    description: 'Never enter passwords, confidential business information or sensitive personal information.',
  },
  {
    title: 'QUESTION',
    icon: HelpCircle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    description: 'AI systems can produce inaccurate, incomplete or biased information.',
  },
  {
    title: 'OWN',
    icon: UserCheck,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    description: 'The human user remains responsible for the final decision or communication.',
  },
];

const LIMITATIONS = [
  { icon: Brain, title: 'Hallucinations', description: 'AI can generate information that sounds correct but is entirely fabricated.' },
  { icon: AlertTriangle, title: 'Bias', description: 'AI models may reflect biases present in their training data.' },
  { icon: Clock, title: 'Outdated Information', description: 'AI knowledge has a cutoff date and may not reflect recent developments.' },
  { icon: Puzzle, title: 'Missing Context', description: 'AI lacks full context about your specific situation or organization.' },
  { icon: Layers, title: 'Incorrect Interpretation', description: 'AI may misunderstand the intent or nuance of your input.' },
  { icon: Zap, title: 'Overconfidence', description: 'AI presents information with confidence regardless of its actual accuracy.' },
];

const WORKFLOW = [
  { icon: Sparkles, label: 'AI Generates', description: 'The AI produces a draft or summary' },
  { icon: Eye, label: 'Human Reviews', description: 'A person reads and evaluates the output' },
  { icon: FileSearch, label: 'Fact-check', description: 'Key claims are verified against reliable sources' },
  { icon: Pencil, label: 'Edit', description: 'Adjustments are made for accuracy and tone' },
  { icon: ThumbsUp, label: 'Approve', description: 'A human confirms the output is ready' },
  { icon: Rocket, label: 'Use', description: 'The approved output is put into action' },
];

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  );
}

export default function ResponsibleAI() {
  return (
    <div className="animate-fade-in">
      <SectionTitle
        title="Responsible AI"
        subtitle="Principles and practices for using AI ethically in the workplace."
        icon={<ShieldCheck className="w-6 h-6" />}
      />

      {/* Hero headline */}
      <div className="relative overflow-hidden glass-card p-8 lg:p-12 mb-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
        <div className="relative">
          <ShieldCheck className="w-10 h-10 text-violet-400 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
            AI assists. <span className="gradient-text">Humans decide.</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            WorkMate AI is designed to support human judgment, not replace it. Every output should be
            reviewed, verified, and approved by a human before use.
          </p>
        </div>
      </div>

      {/* Four principles */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Four Core Principles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon;
            return (
              <Card key={principle.title} className={`p-5 ${principle.bg}`}>
                <div className="w-11 h-11 rounded-xl bg-ink-800 flex items-center justify-center mb-4">
                  <Icon className={`w-5 h-5 ${principle.color}`} />
                </div>
                <h4 className="text-base font-bold text-white mb-2 tracking-wide">{principle.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{principle.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Known limitations */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Known AI Limitations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LIMITATIONS.map((limitation) => {
            const Icon = limitation.icon;
            return (
              <div key={limitation.title} className="rounded-xl bg-ink-850/50 border border-ink-600 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-ink-800 border border-ink-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{limitation.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{limitation.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Human validation workflow */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Human Validation Workflow</h3>
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            {WORKFLOW.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-3 flex-1">
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <p className="text-xs font-semibold text-white mb-0.5">{step.label}</p>
                    <p className="text-[10px] text-slate-500">{step.description}</p>
                  </div>
                  {i < WORKFLOW.length - 1 && (
                    <div className="hidden lg:block w-8 h-px bg-ink-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Commitment statement */}
      <Card className="p-6 border border-violet-500/20">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Our Commitment to Responsible AI</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              WorkMate AI is built with responsible AI principles at its core. The AI never invents names,
              dates, or facts. It clearly labels its output as AI-generated. It reminds users to verify
              important information. And it always defers to human judgment for final decisions. This is
              not just a feature — it is the foundation of how the product is designed.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

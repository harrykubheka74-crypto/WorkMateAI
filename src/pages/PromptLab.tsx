import { useState } from 'react';
import { FlaskConical, Sparkles, ArrowRight, RefreshCw, XCircle, CheckCircle2, User, Wrench, FileText, Target, AlertTriangle, ListOrdered } from 'lucide-react';
import { SectionTitle, Card, Disclaimer, Badge } from '../components/ui';
import { useToast } from '../components/ToastContext';

const FRAMEWORK = [
  { letter: 'R', title: 'Role', icon: User, description: 'Tell the AI who it should act as.', example: 'You are a professional workplace communication assistant.' },
  { letter: 'T', title: 'Task', icon: Target, description: 'Clearly define what needs to be done.', example: 'Draft a concise professional email to a manager.' },
  { letter: 'C', title: 'Context', icon: FileText, description: 'Provide relevant information.', example: 'The first stage of the project has been completed.' },
  { letter: 'C', title: 'Constraints', icon: AlertTriangle, description: 'Specify rules and limitations.', example: 'Do not invent information. Keep it under 200 words.' },
  { letter: 'O', title: 'Output', icon: ListOrdered, description: 'Define the required response format.', example: 'Provide a subject line and email body.' },
];

const BAD_PROMPT = 'Write an email about my project.';

const GOOD_PROMPT = 'You are a professional workplace communication assistant. Draft a concise professional email to a manager explaining that the first stage of a project has been completed and requesting feedback on the next stage. Do not invent information. Provide a subject line and email body.';

const PIPELINE = [
  { label: 'Vague Prompt', description: 'Write an email about my project.', quality: 'poor' },
  { label: 'Structured Prompt', description: 'Use RTC CO framework: Role, Task, Context, Constraints, Output.', quality: 'better' },
  { label: 'Better Output', description: 'A clear, professional, well-structured email draft.', quality: 'best' },
];

const QUALITY_COLORS: Record<string, string> = {
  poor: 'text-red-400 border-red-500/30 bg-red-500/5',
  better: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
  best: 'text-green-400 border-green-500/30 bg-green-500/5',
};

const QUALITY_ICONS: Record<string, typeof XCircle> = {
  poor: XCircle,
  better: Sparkles,
  best: CheckCircle2,
};

export default function PromptLab() {
  const { showToast } = useToast();
  const [role, setRole] = useState('');
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [constraints, setConstraints] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [builtPrompt, setBuiltPrompt] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleBuild = () => {
    const parts: string[] = [];
    if (role.trim()) parts.push(role.trim());
    if (task.trim()) parts.push(task.trim());
    if (context.trim()) parts.push(context.trim());
    if (constraints.trim()) parts.push(constraints.trim());
    if (outputFormat.trim()) parts.push(outputFormat.trim());

    if (parts.length === 0) {
      showToast('Fill in at least one field to build a prompt.', 'error');
      return;
    }

    setBuiltPrompt(parts.join(' '));
    setGenerated(false);
    showToast('Prompt built using RTC CO framework.', 'success');
  };

  const handleGenerate = () => {
    if (!builtPrompt) return;
    setGenerated(true);
    showToast('Output generated for comparison.', 'success');
  };

  const handleLoadExample = () => {
    setRole('You are a professional workplace communication assistant.');
    setTask('Draft a concise professional email to a manager explaining that the first stage of a project has been completed and requesting feedback on the next stage.');
    setContext('The first stage of the project has been completed successfully.');
    setConstraints('Do not invent information. Keep it under 200 words.');
    setOutputFormat('Provide a subject line and email body.');
    showToast('Example loaded.', 'info');
  };

  const handleClear = () => {
    setRole('');
    setTask('');
    setContext('');
    setConstraints('');
    setOutputFormat('');
    setBuiltPrompt('');
    setGenerated(false);
  };

  const mockOutput = `Subject: Project Stage 1 Completion — Feedback Requested

Dear [Manager Name],

I am writing to inform you that the first stage of the project has been completed successfully. I would appreciate your feedback on the completed work before I proceed to the next stage.

Could you please review the deliverables and share any comments or directions you may have? I am happy to discuss at your convenience.

Best regards,
[Your Name]`;

  return (
    <div className="animate-fade-in">
      <SectionTitle
        title="Prompt Lab"
        subtitle="Good AI output begins with good instructions."
        icon={<FlaskConical className="w-6 h-6" />}
      />

      {/* Intro */}
      <Card className="p-6 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
            <FlaskConical className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-1">Why Prompt Engineering Matters</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The quality of AI output depends directly on the quality of the instructions you provide.
              Structured prompts produce more reliable, useful, and accurate results. WorkMate AI uses
              the <span className="text-violet-350 font-semibold">RTC CO</span> framework to build effective prompts.
            </p>
          </div>
        </div>
      </Card>

      {/* RTC CO Framework */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">The RTC CO Framework</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {FRAMEWORK.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-violet-350 leading-none">{item.letter}</p>
                    <p className="text-xs font-semibold text-white">{item.title}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-2">{item.description}</p>
                <p className="text-[11px] text-slate-500 italic leading-relaxed border-l-2 border-ink-600 pl-2">
                  {item.example}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bad vs Good prompt */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Vague vs. Structured Prompt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 border border-red-500/20">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-4 h-4 text-red-400" />
              <h4 className="text-sm font-semibold text-red-400">Bad Prompt</h4>
            </div>
            <p className="text-sm text-slate-400 italic bg-ink-900/50 rounded-lg p-3 border border-ink-600">
              "{BAD_PROMPT}"
            </p>
            <ul className="mt-3 space-y-1.5">
              <li className="text-xs text-slate-500 flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-red-400/50 mt-1.5 shrink-0" />No role defined</li>
              <li className="text-xs text-slate-500 flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-red-400/50 mt-1.5 shrink-0" />No context provided</li>
              <li className="text-xs text-slate-500 flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-red-400/50 mt-1.5 shrink-0" />No output format specified</li>
              <li className="text-xs text-slate-500 flex items-start gap-1.5"><span className="w-1 h-1 rounded-full bg-red-400/50 mt-1.5 shrink-0" />No constraints on what to avoid</li>
            </ul>
          </Card>

          <Card className="p-5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <h4 className="text-sm font-semibold text-green-400">Good Prompt</h4>
            </div>
            <p className="text-sm text-slate-300 bg-ink-900/50 rounded-lg p-3 border border-ink-600">
              {GOOD_PROMPT}
            </p>
            <ul className="mt-3 space-y-1.5">
              <li className="text-xs text-slate-400 flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-400/60 mt-0.5 shrink-0" />Role: communication assistant</li>
              <li className="text-xs text-slate-400 flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-400/60 mt-0.5 shrink-0" />Task: draft email to manager</li>
              <li className="text-xs text-slate-400 flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-400/60 mt-0.5 shrink-0" />Context: project stage completed</li>
              <li className="text-xs text-slate-400 flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-400/60 mt-0.5 shrink-0" />Constraints: don't invent info</li>
              <li className="text-xs text-slate-400 flex items-start gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-400/60 mt-0.5 shrink-0" />Output: subject line + body</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Pipeline visual */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">The Improvement Pipeline</h3>
        <div className="flex flex-col md:flex-row items-center gap-3">
          {PIPELINE.map((stage, i) => {
            const Icon = QUALITY_ICONS[stage.quality];
            return (
              <div key={stage.label} className="flex items-center gap-3 flex-1">
                <div className={`flex-1 rounded-xl border p-4 ${QUALITY_COLORS[stage.quality]}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4" />
                    <p className="text-sm font-semibold">{stage.label}</p>
                  </div>
                  <p className="text-xs text-slate-400">{stage.description}</p>
                </div>
                {i < PIPELINE.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-600 shrink-0 hidden md:block rotate-90 md:rotate-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Prompt testing area */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-300">Prompt Testing Area</h3>
          <div className="flex gap-2">
            <button onClick={handleLoadExample} className="btn-ghost text-xs">Load Example</button>
            <button onClick={handleClear} className="btn-ghost text-xs">Clear</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Builder */}
          <div className="glass-card p-6">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Build Your Prompt</h4>
            <div className="space-y-4">
              <div>
                <label className="label-text">
                  <User className="w-3 h-3 inline mr-1" />
                  R — Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. You are a professional email assistant..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">
                  <Target className="w-3 h-3 inline mr-1" />
                  T — Task
                </label>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="e.g. Draft a professional email to a manager..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">
                  <FileText className="w-3 h-3 inline mr-1" />
                  C — Context
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. The first stage of the project is complete..."
                  rows={2}
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="label-text">
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  C — Constraints
                </label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="e.g. Do not invent information. Keep under 200 words."
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">
                  <ListOrdered className="w-3 h-3 inline mr-1" />
                  O — Output Format
                </label>
                <input
                  type="text"
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  placeholder="e.g. Provide a subject line and email body."
                  className="input-field"
                />
              </div>
              <button onClick={handleBuild} className="btn-primary w-full">
                <Wrench className="w-4 h-4" />
                Build Prompt
              </button>
            </div>
          </div>

          {/* Output comparison */}
          <div className="glass-card p-6">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Compare Output</h4>

            {builtPrompt ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 mb-2">Your Structured Prompt</p>
                  <div className="rounded-xl bg-ink-900/50 border border-violet-500/20 p-4 text-sm text-slate-200 leading-relaxed">
                    {builtPrompt}
                  </div>
                </div>

                <button onClick={handleGenerate} className="btn-secondary w-full">
                  <Sparkles className="w-4 h-4" />
                  Generate Output
                </button>

                {generated && (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-500">Generated Output</p>
                      <Badge color="green">Structured</Badge>
                    </div>
                    <div className="rounded-xl bg-ink-900/50 border border-ink-600 p-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {mockOutput}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <Wrench className="w-8 h-8 text-slate-600 mb-3" />
                <p className="text-sm text-slate-500">
                  Build a prompt using the RTC CO framework on the left, then generate and compare output quality.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Disclaimer>
          Prompt engineering is a skill that improves with practice. The same AI model can produce very
          different results depending on how the prompt is structured. Always review and refine your prompts
          based on the output you receive.
        </Disclaimer>
      </div>
    </div>
  );
}

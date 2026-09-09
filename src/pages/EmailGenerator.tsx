import { useState } from 'react';
import { Mail, Sparkles, RefreshCw, FileText, Zap } from 'lucide-react';
import type { Audience, EmailInput, EmailOutput, EmailPurpose, Tone } from '../types';
import { generateEmail, regenerateEmail } from '../aiService';
import { DEMO_EMAIL_INPUT } from '../demoData';
import { SectionTitle, LoadingOverlay, EmptyState, Disclaimer, Badge } from '../components/ui';
import CopyButton from '../components/ui';
import { useToast } from '../components/ToastContext';

const AUDIENCES: Audience[] = ['Manager', 'Client', 'Team', 'Colleague', 'Other'];
const TONES: Tone[] = ['Formal', 'Professional', 'Friendly', 'Persuasive', 'Concise'];
const PURPOSES: EmailPurpose[] = ['Request', 'Follow-up', 'Update', 'Apology', 'Invitation', 'Thank You', 'General'];

export default function EmailGenerator() {
  const { showToast } = useToast();
  const [input, setInput] = useState<EmailInput>({
    audience: 'Manager',
    tone: 'Professional',
    purpose: 'Update',
    subject: '',
    keyInfo: '',
    deadline: '',
    callToAction: '',
  });
  const [output, setOutput] = useState<EmailOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);

  const handleGenerate = async () => {
    if (!input.keyInfo.trim()) {
      showToast('Please enter key information before generating.', 'error');
      return;
    }
    setLoading(true);
    setOutput(null);
    try {
      const result = await generateEmail(input);
      setOutput(result);
      showToast('Email generated successfully.', 'success');
    } catch {
      showToast('Failed to generate email. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async (mode: 'formal' | 'concise') => {
    if (!output) return;
    setRefining(true);
    try {
      const result = await regenerateEmail(input, output, mode);
      setOutput(result);
      showToast(mode === 'formal' ? 'Email made more formal.' : 'Email made more concise.', 'success');
    } catch {
      showToast('Failed to refine email.', 'error');
    } finally {
      setRefining(false);
    }
  };

  const handleLoadDemo = () => {
    setInput({ ...DEMO_EMAIL_INPUT, deadline: '', callToAction: '' });
    showToast('Demo data loaded.', 'info');
  };

  const handleClear = () => {
    setInput({
      audience: 'Manager',
      tone: 'Professional',
      purpose: 'Update',
      subject: '',
      keyInfo: '',
      deadline: '',
      callToAction: '',
    });
    setOutput(null);
  };

  const fullEmailText = output
    ? `${output.subject}\n\n${output.greeting}\n\n${output.body}\n\n${output.closing}`
    : '';

  return (
    <div className="animate-fade-in">
      <SectionTitle
        title="Smart Email Generator"
        subtitle="Draft professional emails with the right tone, structure, and purpose."
        icon={<Mail className="w-6 h-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input form */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Email Details</h3>
            <div className="flex gap-2">
              <button onClick={handleLoadDemo} className="btn-ghost text-xs">Load Demo</button>
              <button onClick={handleClear} className="btn-ghost text-xs">Clear</button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label-text">Recipient / Audience</label>
              <div className="flex flex-wrap gap-2">
                {AUDIENCES.map((a) => (
                  <button
                    key={a}
                    onClick={() => setInput({ ...input, audience: a })}
                    className={`chip transition-all ${
                      input.audience === a
                        ? 'bg-violet-500/20 text-violet-350 border border-violet-500/40'
                        : 'bg-ink-800 text-slate-400 border border-ink-600 hover:border-ink-500'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-text">Tone</label>
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setInput({ ...input, tone: t })}
                    className={`chip transition-all ${
                      input.tone === t
                        ? 'bg-violet-500/20 text-violet-350 border border-violet-500/40'
                        : 'bg-ink-800 text-slate-400 border border-ink-600 hover:border-ink-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-text">Purpose</label>
              <div className="flex flex-wrap gap-2">
                {PURPOSES.map((p) => (
                  <button
                    key={p}
                    onClick={() => setInput({ ...input, purpose: p })}
                    className={`chip transition-all ${
                      input.purpose === p
                        ? 'bg-violet-500/20 text-violet-350 border border-violet-500/40'
                        : 'bg-ink-800 text-slate-400 border border-ink-600 hover:border-ink-500'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-text" htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                value={input.subject}
                onChange={(e) => setInput({ ...input, subject: e.target.value })}
                placeholder="e.g. Project Progress Update"
                className="input-field"
              />
            </div>

            <div>
              <label className="label-text" htmlFor="keyInfo">Key Information</label>
              <textarea
                id="keyInfo"
                value={input.keyInfo}
                onChange={(e) => setInput({ ...input, keyInfo: e.target.value })}
                placeholder="Enter the key information the email should contain..."
                rows={4}
                className="input-field resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text" htmlFor="deadline">Deadline (optional)</label>
                <input
                  id="deadline"
                  type="text"
                  value={input.deadline}
                  onChange={(e) => setInput({ ...input, deadline: e.target.value })}
                  placeholder="e.g. Friday, 15 March"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text" htmlFor="cta">Call to Action (optional)</label>
                <input
                  id="cta"
                  type="text"
                  value={input.callToAction}
                  onChange={(e) => setInput({ ...input, callToAction: e.target.value })}
                  placeholder="e.g. Please review by EOD"
                  className="input-field"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Generating...' : 'Generate Email'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Generated Email</h3>
            {output && <Badge color="green">Ready</Badge>}
          </div>

          {loading ? (
            <LoadingOverlay label="Generating your email..." />
          ) : output ? (
            <div className="animate-fade-in">
              <div className="space-y-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Subject</p>
                  <p className="text-sm font-semibold text-white">{output.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Greeting</p>
                  <p className="text-sm text-slate-200">{output.greeting}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Body</p>
                  <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{output.body}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Closing</p>
                  <p className="text-sm text-slate-200 whitespace-pre-wrap">{output.closing}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-ink-700">
                <CopyButton text={fullEmailText} label="Copy" />
                <button onClick={handleGenerate} disabled={refining} className="btn-secondary">
                  <RefreshCw className={`w-4 h-4 ${refining ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
                <button onClick={() => handleRefine('formal')} disabled={refining} className="btn-secondary">
                  <FileText className="w-4 h-4" />
                  Make More Formal
                </button>
                <button onClick={() => handleRefine('concise')} disabled={refining} className="btn-secondary">
                  <Zap className="w-4 h-4" />
                  Make More Concise
                </button>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<Mail className="w-7 h-7" />}
              title="No email generated yet"
              description="Fill in the details on the left and click Generate Email to create a professional draft."
            />
          )}
        </div>
      </div>

      <div className="mt-6">
        <Disclaimer>
          The AI will never invent names, dates, commitments, or facts that were not supplied by you.
          Placeholders like [Manager Name] indicate where you should add specific details before sending.
        </Disclaimer>
      </div>
    </div>
  );
}

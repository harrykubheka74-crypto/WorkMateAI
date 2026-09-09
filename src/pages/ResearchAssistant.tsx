import { useState } from 'react';
import { Search, Sparkles, RefreshCw, BookOpen, Lightbulb, CheckCircle2, TrendingUp, AlertTriangle, Wrench, Target, HelpCircle } from 'lucide-react';
import type { ResearchAudience, ResearchDepth, ResearchInput, ResearchOutput } from '../types';
import { researchTopic } from '../aiService';
import { DEMO_RESEARCH_INPUT } from '../demoData';
import { SectionTitle, LoadingOverlay, EmptyState, Card, Disclaimer, Badge } from '../components/ui';
import CopyButton from '../components/ui';
import { useToast } from '../components/ToastContext';

const DEPTHS: ResearchDepth[] = ['Quick Overview', 'Standard', 'Detailed'];
const AUDIENCES: ResearchAudience[] = ['Beginner', 'Student', 'Professional', 'Executive'];

const SECTIONS: { key: keyof ResearchOutput; title: string; icon: typeof BookOpen; color: string }[] = [
  { key: 'simpleExplanation', title: 'Simple Explanation', icon: BookOpen, color: 'text-violet-400' },
  { key: 'keyInsights', title: 'Key Insights', icon: Lightbulb, color: 'text-amber-400' },
  { key: 'importantFindings', title: 'Important Findings', icon: CheckCircle2, color: 'text-green-400' },
  { key: 'benefits', title: 'Benefits', icon: TrendingUp, color: 'text-blue-400' },
  { key: 'risks', title: 'Risks & Limitations', icon: AlertTriangle, color: 'text-red-400' },
  { key: 'practicalApplications', title: 'Practical Applications', icon: Wrench, color: 'text-violet-400' },
  { key: 'recommendations', title: 'Recommendations', icon: Target, color: 'text-green-400' },
  { key: 'furtherQuestions', title: 'Questions for Further Research', icon: HelpCircle, color: 'text-amber-400' },
];

export default function ResearchAssistant() {
  const { showToast } = useToast();
  const [input, setInput] = useState<ResearchInput>({
    topic: '',
    depth: 'Standard',
    audience: 'Professional',
  });
  const [output, setOutput] = useState<ResearchOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.topic.trim()) {
      showToast('Please enter a topic or paste source material.', 'error');
      return;
    }
    setLoading(true);
    setOutput(null);
    try {
      const result = await researchTopic(input);
      setOutput(result);
      showToast('Research brief generated.', 'success');
    } catch {
      showToast('Failed to generate research brief.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemo = () => {
    setInput(DEMO_RESEARCH_INPUT);
    showToast('Demo data loaded.', 'info');
  };

  const handleClear = () => {
    setInput({ topic: '', depth: 'Standard', audience: 'Professional' });
    setOutput(null);
  };

  const buildBriefText = () => {
    if (!output) return '';
    let text = `Research Brief: ${input.topic}\nDepth: ${input.depth} | Audience: ${input.audience}\n\n`;
    text += `Simple Explanation:\n${output.simpleExplanation}\n\n`;
    text += `Key Insights:\n${output.keyInsights.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\n`;
    text += `Important Findings:\n${output.importantFindings.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\n`;
    text += `Benefits:\n${output.benefits.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\n`;
    text += `Risks & Limitations:\n${output.risks.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\n`;
    text += `Practical Applications:\n${output.practicalApplications.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\n`;
    text += `Recommendations:\n${output.recommendations.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\n`;
    text += `Questions for Further Research:\n${output.furtherQuestions.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}`;
    return text;
  };

  return (
    <div className="animate-fade-in">
      <SectionTitle
        title="AI Research Assistant"
        subtitle="Generate structured research briefs with insights, findings, risks, and recommendations."
        icon={<Search className="w-6 h-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="glass-card p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Research Input</h3>
            <div className="flex gap-2">
              <button onClick={handleLoadDemo} className="btn-ghost text-xs">Load Demo</button>
              <button onClick={handleClear} className="btn-ghost text-xs">Clear</button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label-text" htmlFor="topic">Topic or Source Material</label>
              <textarea
                id="topic"
                value={input.topic}
                onChange={(e) => setInput({ ...input, topic: e.target.value })}
                placeholder="Enter a topic or paste source material..."
                rows={4}
                className="input-field resize-none"
              />
            </div>

            <div>
              <label className="label-text">Research Depth</label>
              <div className="flex flex-wrap gap-2">
                {DEPTHS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setInput({ ...input, depth: d })}
                    className={`chip transition-all ${
                      input.depth === d
                        ? 'bg-violet-500/20 text-violet-350 border border-violet-500/40'
                        : 'bg-ink-800 text-slate-400 border border-ink-600 hover:border-ink-500'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-text">Audience</label>
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

            <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Generating...' : 'Generate Research Brief'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Research Brief</h3>
            <div className="flex items-center gap-2">
              {output && <Badge color="green">Ready</Badge>}
              {output && <Badge color="slate">{input.depth}</Badge>}
            </div>
          </div>

          {loading ? (
            <LoadingOverlay label="Generating your research brief..." />
          ) : output ? (
            <div className="space-y-4 animate-fade-in">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const content = output[section.key];
                return (
                  <Card key={section.key} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`w-4 h-4 ${section.color}`} />
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{section.title}</h4>
                    </div>
                    {typeof content === 'string' ? (
                      <p className="text-sm text-slate-300 leading-relaxed">{content}</p>
                    ) : (
                      <ul className="space-y-2">
                        {(content as string[]).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${section.color.replace('text-', 'bg-')}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                );
              })}

              <div className="flex flex-wrap gap-2 pt-2 border-t border-ink-700">
                <CopyButton text={buildBriefText()} label="Copy Brief" />
                <button onClick={handleGenerate} disabled={loading} className="btn-secondary">
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<Search className="w-7 h-7" />}
              title="No research brief yet"
              description="Enter a topic, choose your depth and audience, then click Generate Research Brief to create a structured brief."
            />
          )}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Disclaimer>
          This prototype does not perform live web research. Verify important claims using reliable sources.
          The AI distinguishes between information you provide and AI-generated interpretation, but all
          findings should be independently verified before use in professional contexts.
        </Disclaimer>
      </div>
    </div>
  );
}

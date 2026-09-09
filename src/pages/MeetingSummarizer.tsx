import { useState } from 'react';
import { FileText, Sparkles, RefreshCw, Download, ClipboardList, CheckCircle2, Users, Calendar } from 'lucide-react';
import type { MeetingInput, MeetingOutput } from '../types';
import { summarizeMeeting } from '../aiService';
import { DEMO_MEETING_INPUT } from '../demoData';
import { SectionTitle, LoadingOverlay, EmptyState, Card, Disclaimer, Badge } from '../components/ui';
import CopyButton from '../components/ui';
import { useToast } from '../components/ToastContext';

export default function MeetingSummarizer() {
  const { showToast } = useToast();
  const [input, setInput] = useState<MeetingInput>({
    notes: '',
    title: '',
    date: '',
    attendees: '',
  });
  const [output, setOutput] = useState<MeetingOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!input.notes.trim()) {
      showToast('Please paste meeting notes before summarizing.', 'error');
      return;
    }
    setLoading(true);
    setOutput(null);
    try {
      const result = await summarizeMeeting(input);
      setOutput(result);
      showToast('Meeting summarized successfully.', 'success');
    } catch {
      showToast('Failed to summarize meeting.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemo = () => {
    setInput(DEMO_MEETING_INPUT);
    showToast('Demo data loaded.', 'info');
  };

  const handleClear = () => {
    setInput({ notes: '', title: '', date: '', attendees: '' });
    setOutput(null);
  };

  const handleExport = () => {
    if (!output) return;
    let text = '';
    if (input.title) text += `Meeting: ${input.title}\n`;
    if (input.date) text += `Date: ${input.date}\n`;
    if (input.attendees) text += `Attendees: ${input.attendees}\n`;
    text += `\n--- Executive Summary ---\n${output.executiveSummary}\n`;
    text += `\n--- Key Discussion Points ---\n${output.keyDiscussionPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n`;
    text += `\n--- Decisions Made ---\n${output.decisionsMade.map((d, i) => `${i + 1}. ${d}`).join('\n')}\n`;
    text += `\n--- Action Items ---\n${output.actionItems.map((a, i) => `${i + 1}. ${a.task} | ${a.responsible} | ${a.deadline} | ${a.status}`).join('\n')}\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-summary${input.title ? `-${input.title.toLowerCase().replace(/\s+/g, '-')}` : ''}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Summary exported.', 'success');
  };

  const buildSummaryText = () => {
    if (!output) return '';
    let text = '';
    if (input.title) text += `Meeting: ${input.title}\n`;
    if (input.date) text += `Date: ${input.date}\n`;
    if (input.attendees) text += `Attendees: ${input.attendees}\n`;
    text += `\nExecutive Summary: ${output.executiveSummary}\n\n`;
    text += `Key Discussion Points:\n${output.keyDiscussionPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n`;
    text += `Decisions Made:\n${output.decisionsMade.map((d, i) => `${i + 1}. ${d}`).join('\n')}\n\n`;
    text += `Action Items:\n${output.actionItems.map((a, i) => `${i + 1}. ${a.task} | ${a.responsible} | ${a.deadline} | ${a.status}`).join('\n')}`;
    return text;
  };

  return (
    <div className="animate-fade-in">
      <SectionTitle
        title="Meeting Notes Summarizer"
        subtitle="Turn raw meeting notes into structured summaries with action items and decisions."
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Meeting Notes</h3>
            <div className="flex gap-2">
              <button onClick={handleLoadDemo} className="btn-ghost text-xs">Load Demo</button>
              <button onClick={handleClear} className="btn-ghost text-xs">Clear</button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label-text" htmlFor="meetingTitle">Meeting Title (optional)</label>
              <input
                id="meetingTitle"
                type="text"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
                placeholder="e.g. Weekly Project Sync"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text" htmlFor="meetingDate">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Date (optional)
                </label>
                <input
                  id="meetingDate"
                  type="date"
                  value={input.date}
                  onChange={(e) => setInput({ ...input, date: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text" htmlFor="attendees">
                  <Users className="w-3 h-3 inline mr-1" />
                  Attendees (optional)
                </label>
                <input
                  id="attendees"
                  type="text"
                  value={input.attendees}
                  onChange={(e) => setInput({ ...input, attendees: e.target.value })}
                  placeholder="e.g. Sarah, David, Maria"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="label-text" htmlFor="notes">Meeting Notes</label>
              <textarea
                id="notes"
                value={input.notes}
                onChange={(e) => setInput({ ...input, notes: e.target.value })}
                placeholder="Paste your meeting notes here..."
                rows={8}
                className="input-field resize-none"
              />
            </div>

            <button onClick={handleSummarize} disabled={loading} className="btn-primary w-full">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Summarizing...' : 'Summarize Meeting'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Summary</h3>
            {output && <Badge color="green">Ready</Badge>}
          </div>

          {loading ? (
            <LoadingOverlay label="Summarizing your meeting notes..." />
          ) : output ? (
            <div className="space-y-4 animate-fade-in">
              {/* Executive Summary */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="w-4 h-4 text-violet-400" />
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Executive Summary</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{output.executiveSummary}</p>
              </Card>

              {/* Key Discussion Points */}
              <Card className="p-4">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Key Discussion Points</h4>
                <ul className="space-y-1.5">
                  {output.keyDiscussionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="w-5 h-5 rounded-md bg-violet-500/15 text-violet-350 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Decisions Made */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Decisions Made</h4>
                </div>
                <ul className="space-y-1.5">
                  {output.decisionsMade.map((decision, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
                      {decision}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Action Items */}
              <Card className="p-4">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Action Items</h4>
                <div className="space-y-2">
                  {output.actionItems.map((item, i) => (
                    <div key={i} className="rounded-lg bg-ink-800/60 border border-ink-600 p-3">
                      <p className="text-sm text-slate-200 font-medium mb-1.5">{item.task}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge color="blue">{item.responsible}</Badge>
                        <Badge color="amber">{item.deadline}</Badge>
                        <Badge color="slate">{item.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-ink-700">
                <CopyButton text={buildSummaryText()} label="Copy Summary" />
                <button onClick={handleExport} className="btn-secondary">
                  <Download className="w-4 h-4" />
                  Export Summary
                </button>
                <button onClick={handleSummarize} disabled={loading} className="btn-secondary">
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<FileText className="w-7 h-7" />}
              title="No summary yet"
              description="Paste your meeting notes on the left and click Summarize Meeting to generate a structured summary."
            />
          )}
        </div>
      </div>

      <div className="mt-6">
        <Disclaimer>
          If a person or deadline is not present in the source material, it will be displayed as "Not specified."
          The AI will never guess missing information. Always verify action items with meeting participants.
        </Disclaimer>
      </div>
    </div>
  );
}

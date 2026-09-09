import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Plus, History, AlertTriangle } from 'lucide-react';
import type { ChatMessage } from '../types';
import { chatWithAssistant } from '../aiService';
import { DEMO_CHAT_MESSAGES, DEMO_CHAT_HISTORY, QUICK_PROMPTS } from '../demoData';
import { SectionTitle, LoadingSpinner, Disclaimer } from '../components/ui';
import { useToast } from '../components/ToastContext';

let msgCounter = 100;

export default function Chatbot() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    msgCounter += 1;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-${msgCounter}`,
      role: 'user',
      content: messageText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAssistant(messageText, messages);
      msgCounter += 1;
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-${msgCounter}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      showToast('Failed to get response.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    showToast('New chat started.', 'info');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="animate-fade-in">
      <SectionTitle
        title="AI Chatbot"
        subtitle="Your interactive workplace AI assistant."
        icon={<MessageSquare className="w-6 h-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat history sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-semibold text-white">Chat History</h3>
              </div>
              <button
                onClick={handleNewChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Start new chat"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5">
              {DEMO_CHAT_HISTORY.map((item) => (
                <button
                  key={item.id}
                  onClick={() => showToast(`Loading: ${item.title}`, 'info')}
                  className="w-full text-left px-3 py-2.5 rounded-lg bg-ink-800/50 border border-ink-600 hover:border-violet-500/30 transition-all group"
                >
                  <p className="text-xs font-medium text-slate-300 truncate group-hover:text-white transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-slate-600 truncate mt-0.5">{item.preview}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-3">
          <div className="glass-card flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7 text-violet-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">How can I help you today?</h3>
                  <p className="text-sm text-slate-500 max-w-md mb-6">
                    I can help you draft emails, summarize notes, plan tasks, research topics, and prepare for meetings.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt.label}
                        onClick={() => handleSend(prompt.text)}
                        className="chip bg-ink-800 text-slate-300 border border-ink-600 hover:border-violet-500/30 hover:text-white transition-all"
                      >
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-ink-700 border border-ink-600'
                        : 'bg-violet-500/15 border border-violet-500/30'
                    }`}>
                      {msg.role === 'user' ? (
                        <span className="text-xs font-bold text-slate-300">You</span>
                      ) : (
                        <Sparkles className="w-4 h-4 text-violet-400" />
                      )}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-violet-500/15 border border-violet-500/20'
                        : 'bg-ink-800/60 border border-ink-600'
                    }`}>
                      <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-ink-800/60 border border-ink-600">
                    <LoadingSpinner size={20} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length > 0 && (
              <div className="px-4 py-2 border-t border-ink-700 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.slice(0, 4).map((prompt) => (
                  <button
                    key={prompt.label}
                    onClick={() => handleSend(prompt.text)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-ink-800 text-slate-400 hover:text-white hover:bg-ink-700 border border-ink-600 transition-all"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-ink-700">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="input-field flex-1"
                  aria-label="Chat message input"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="btn-primary px-4"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Disclaimer>
              AI-generated responses may contain errors. Review important information before acting on it.
              This is a prototype — responses are simulated for demonstration.
            </Disclaimer>
          </div>
        </div>
      </div>
    </div>
  );
}

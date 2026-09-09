import { useState } from 'react';
import { ListChecks, Sparkles, RefreshCw, Plus, Trash2, Clock, Target, Lightbulb } from 'lucide-react';
import type { PlanMode, Priority, TaskInput, TaskPlanOutput } from '../types';
import { planTasks } from '../aiService';
import { DEMO_TASKS } from '../demoData';
import { SectionTitle, LoadingOverlay, EmptyState, Card, Badge, Disclaimer } from '../components/ui';
import { useToast } from '../components/ToastContext';

const PRIORITIES: Priority[] = ['Critical', 'High', 'Medium', 'Low'];
const PLAN_MODES: PlanMode[] = ['Daily Plan', 'Weekly Plan'];

const PRIORITY_COLORS: Record<Priority, 'red' | 'amber' | 'blue' | 'slate'> = {
  Critical: 'red',
  High: 'amber',
  Medium: 'blue',
  Low: 'slate',
};

let taskCounter = 0;

export default function TaskPlanner() {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<TaskInput[]>([]);
  const [planMode, setPlanMode] = useState<PlanMode>('Daily Plan');
  const [output, setOutput] = useState<TaskPlanOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const addTask = () => {
    taskCounter += 1;
    const newTask: TaskInput = {
      id: `task-${Date.now()}-${taskCounter}`,
      name: '',
      description: '',
      deadline: '',
      priority: 'Medium',
      estimatedDuration: '',
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, field: keyof TaskInput, value: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const loadDemo = () => {
    setTasks(DEMO_TASKS.map((t) => ({ ...t, id: `demo-${Date.now()}-${t.id}` })));
    showToast('Demo tasks loaded.', 'info');
  };

  const clearAll = () => {
    setTasks([]);
    setOutput(null);
  };

  const handleBuildPlan = async () => {
    const validTasks = tasks.filter((t) => t.name.trim());
    if (validTasks.length === 0) {
      showToast('Please add at least one task with a name.', 'error');
      return;
    }
    setLoading(true);
    setOutput(null);
    try {
      const result = await planTasks(validTasks, planMode);
      setOutput(result);
      showToast('Plan built successfully.', 'success');
    } catch {
      showToast('Failed to build plan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <SectionTitle
        title="AI Task Planner"
        subtitle="Organize your tasks by urgency, importance, and effort into a clear plan."
        icon={<ListChecks className="w-6 h-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Your Tasks</h3>
            <div className="flex gap-2">
              <button onClick={loadDemo} className="btn-ghost text-xs">Load Demo</button>
              <button onClick={clearAll} className="btn-ghost text-xs">Clear</button>
            </div>
          </div>

          {/* Plan mode */}
          <div className="mb-4">
            <label className="label-text">Planning Mode</label>
            <div className="flex gap-2">
              {PLAN_MODES.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPlanMode(mode)}
                  className={`chip transition-all ${
                    planMode === mode
                      ? 'bg-violet-500/20 text-violet-350 border border-violet-500/40'
                      : 'bg-ink-800 text-slate-400 border border-ink-600 hover:border-ink-500'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Task list */}
          <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto pr-1">
            {tasks.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">No tasks yet. Add a task or load demo data.</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="rounded-xl bg-ink-800/60 border border-ink-600 p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                      placeholder="Task name"
                      className="input-field flex-1 text-sm py-2"
                    />
                    <button
                      onClick={() => removeTask(task.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      aria-label="Remove task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={task.description}
                    onChange={(e) => updateTask(task.id, 'description', e.target.value)}
                    placeholder="Description (optional)"
                    className="input-field text-sm py-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={task.deadline}
                      onChange={(e) => updateTask(task.id, 'deadline', e.target.value)}
                      className="input-field text-sm py-2"
                    />
                    <input
                      type="text"
                      value={task.estimatedDuration}
                      onChange={(e) => updateTask(task.id, 'estimatedDuration', e.target.value)}
                      placeholder="e.g. 2 hours"
                      className="input-field text-sm py-2"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p}
                        onClick={() => updateTask(task.id, 'priority', p)}
                        className={`chip text-xs transition-all ${
                          task.priority === p
                            ? `bg-violet-500/20 text-violet-350 border border-violet-500/40`
                            : 'bg-ink-700 text-slate-400 border border-ink-600 hover:border-ink-500'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={addTask} className="btn-secondary flex-1">
              <Plus className="w-4 h-4" />
              Add Task
            </button>
            <button onClick={handleBuildPlan} disabled={loading} className="btn-primary flex-1">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Building...' : 'Build My Plan'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">{planMode}</h3>
            {output && <Badge color="green">Ready</Badge>}
          </div>

          {loading ? (
            <LoadingOverlay label="Building your plan..." />
          ) : output ? (
            <div className="space-y-5 animate-fade-in">
              {/* Today's Priority */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-violet-400" />
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Today's Priority</h4>
                </div>
                <div className="space-y-2">
                  {output.priorities.map((priority, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-violet-500/15 text-violet-350 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-200">{priority}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Timeline */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-violet-400" />
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Timeline</h4>
                </div>
                <div className="space-y-2">
                  {output.timeline.map((block, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-24 shrink-0">
                        <span className="text-xs font-mono text-violet-350">{block.time}</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          block.priority === 'Critical' ? 'bg-red-400' :
                          block.priority === 'High' ? 'bg-amber-400' :
                          block.priority === 'Medium' ? 'bg-blue-400' : 'bg-slate-500'
                        }`} />
                        <span className="text-sm text-slate-200">{block.task}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendations */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Productivity Recommendations</h4>
                </div>
                <ul className="space-y-2">
                  {output.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </Card>

              <button onClick={handleBuildPlan} disabled={loading} className="btn-secondary w-full">
                <RefreshCw className="w-4 h-4" />
                Regenerate Plan
              </button>
            </div>
          ) : (
            <EmptyState
              icon={<ListChecks className="w-7 h-7" />}
              title="No plan built yet"
              description="Add your tasks on the left, choose a planning mode, and click Build My Plan to create a prioritized timeline."
            />
          )}
        </div>
      </div>

      <div className="mt-6">
        <Disclaimer>
          The AI organizes tasks using urgency, importance, deadlines, and estimated effort. This is a
          productivity aid — adjust the plan based on your actual schedule and energy levels.
        </Disclaimer>
      </div>
    </div>
  );
}

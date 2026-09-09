import type {
  DashboardStats,
  EmailInput,
  MeetingInput,
  ResearchInput,
  TaskInput,
} from './types';

export const DEMO_STATS: DashboardStats = {
  tasksAssisted: 47,
  emailsGenerated: 128,
  meetingsSummarized: 23,
  researchBriefs: 12,
  timeSavedHours: 31,
};

export const DEMO_EMAIL_INPUT: EmailInput = {
  audience: 'Manager',
  tone: 'Formal',
  purpose: 'Update',
  subject: 'Project Progress Update',
  keyInfo:
    'The first stage of the project has been completed and I would like feedback before proceeding to the next stage.',
};

export const DEMO_MEETING_INPUT: MeetingInput = {
  title: 'Weekly Project Sync',
  date: '2026-09-08',
  attendees: 'Sarah, David, James, Maria',
  notes:
    'Team discussed project milestones. Sarah will prepare the presentation. David will review the data. The team agreed that the first draft should be ready by Friday.',
};

export const DEMO_TASKS: TaskInput[] = [
  {
    id: 'demo-1',
    name: 'Finish project report',
    description: 'Complete the Q3 project report with updated metrics and analysis.',
    deadline: '2026-09-10',
    priority: 'Critical',
    estimatedDuration: '3 hours',
  },
  {
    id: 'demo-2',
    name: 'Prepare presentation',
    description: 'Create slides for the upcoming stakeholder presentation.',
    deadline: '2026-09-11',
    priority: 'High',
    estimatedDuration: '2 hours',
  },
  {
    id: 'demo-3',
    name: 'Reply to client',
    description: 'Respond to the client email regarding project scope changes.',
    deadline: '2026-09-09',
    priority: 'High',
    estimatedDuration: '30 minutes',
  },
  {
    id: 'demo-4',
    name: 'Review project data',
    description: 'Review the latest data exports and identify key trends.',
    deadline: '2026-09-12',
    priority: 'Medium',
    estimatedDuration: '1.5 hours',
  },
  {
    id: 'demo-5',
    name: 'Attend team meeting',
    description: 'Weekly team sync to discuss progress and blockers.',
    deadline: '2026-09-09',
    priority: 'Medium',
    estimatedDuration: '1 hour',
  },
];

export const DEMO_RESEARCH_INPUT: ResearchInput = {
  topic: 'Artificial Intelligence in Manufacturing',
  depth: 'Standard',
  audience: 'Professional',
};

export const DEMO_CHAT_MESSAGES = [
  {
    id: 'demo-chat-1',
    role: 'user' as const,
    content: 'Help me prepare for tomorrow\'s team meeting.',
    timestamp: Date.now() - 60000,
  },
  {
    id: 'demo-chat-2',
    role: 'assistant' as const,
    content:
      'Absolutely. I can help you create an agenda, summarize previous notes, identify action items or prepare questions. Which would you like to start with?',
    timestamp: Date.now() - 55000,
  },
];

export const DEMO_CHAT_HISTORY = [
  { id: 'hist-1', title: 'Team meeting prep', preview: 'Help me prepare for tomorrow\'s team meeting...' },
  { id: 'hist-2', title: 'Client email draft', preview: 'Draft a follow-up email to the client about...' },
  { id: 'hist-3', title: 'Research: AI in healthcare', preview: 'Explain how AI is being used in healthcare...' },
  { id: 'hist-4', title: 'Task planning', preview: 'Plan my day with these 5 tasks...' },
];

export const QUICK_PROMPTS = [
  { label: 'Draft an email', text: 'Help me draft a professional email.' },
  { label: 'Plan my day', text: 'Help me plan my day with my current tasks.' },
  { label: 'Summarize notes', text: 'Summarize my meeting notes for me.' },
  { label: 'Explain a topic', text: 'Explain a topic I\'m researching.' },
  { label: 'Prepare meeting questions', text: 'Prepare questions for my upcoming meeting.' },
  { label: 'Improve this message', text: 'Help me improve a message I\'ve written.' },
];

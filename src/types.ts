export type PageId =
  | 'landing'
  | 'dashboard'
  | 'email'
  | 'meeting'
  | 'tasks'
  | 'research'
  | 'chatbot'
  | 'prompt-lab'
  | 'responsible-ai'
  | 'about';

export type Audience = 'Manager' | 'Client' | 'Team' | 'Colleague' | 'Other';
export type Tone = 'Formal' | 'Professional' | 'Friendly' | 'Persuasive' | 'Concise';
export type EmailPurpose = 'Request' | 'Follow-up' | 'Update' | 'Apology' | 'Invitation' | 'Thank You' | 'General';

export interface EmailInput {
  audience: Audience;
  tone: Tone;
  purpose: EmailPurpose;
  subject: string;
  keyInfo: string;
  deadline?: string;
  callToAction?: string;
}

export interface EmailOutput {
  subject: string;
  greeting: string;
  body: string;
  closing: string;
}

export interface MeetingInput {
  notes: string;
  title?: string;
  date?: string;
  attendees?: string;
}

export interface ActionItem {
  task: string;
  responsible: string;
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface MeetingOutput {
  executiveSummary: string;
  keyDiscussionPoints: string[];
  decisionsMade: string[];
  actionItems: ActionItem[];
}

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type PlanMode = 'Daily Plan' | 'Weekly Plan';

export interface TaskInput {
  id: string;
  name: string;
  description: string;
  deadline: string;
  priority: Priority;
  estimatedDuration: string;
}

export interface TimeBlock {
  time: string;
  task: string;
  priority: Priority;
}

export interface TaskPlanOutput {
  priorities: string[];
  timeline: TimeBlock[];
  recommendations: string[];
}

export type ResearchDepth = 'Quick Overview' | 'Standard' | 'Detailed';
export type ResearchAudience = 'Beginner' | 'Student' | 'Professional' | 'Executive';

export interface ResearchInput {
  topic: string;
  depth: ResearchDepth;
  audience: ResearchAudience;
}

export interface ResearchOutput {
  simpleExplanation: string;
  keyInsights: string[];
  importantFindings: string[];
  benefits: string[];
  risks: string[];
  practicalApplications: string[];
  recommendations: string[];
  furtherQuestions: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface PromptTestInput {
  role: string;
  task: string;
  context: string;
  constraints: string;
  output: string;
}

export interface DashboardStats {
  tasksAssisted: number;
  emailsGenerated: number;
  meetingsSummarized: number;
  researchBriefs: number;
  timeSavedHours: number;
}

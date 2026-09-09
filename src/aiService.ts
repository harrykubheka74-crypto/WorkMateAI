import type {
  ChatMessage,
  EmailInput,
  EmailOutput,
  MeetingInput,
  MeetingOutput,
  ResearchInput,
  ResearchOutput,
  TaskInput,
  TaskPlanOutput,
} from './types';

/**
 * AI Service Layer
 *
 * These functions are designed to be swapped with real LLM API calls.
 * For the prototype, they return clearly-labelled mock/demo responses.
 *
 * To connect a real LLM:
 * 1. Create a Supabase Edge Function (see supabase/functions/ai-proxy)
 * 2. Store the API key in Edge Function secrets (never in frontend code)
 * 3. Replace the mock logic below with a fetch() call to your edge function
 */

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getGreeting(audience: string): string {
  switch (audience) {
    case 'Manager':
      return 'Dear [Manager Name],';
    case 'Client':
      return 'Dear [Client Name],';
    case 'Team':
      return 'Hi Team,';
    case 'Colleague':
      return 'Hi [Colleague Name],';
    default:
      return 'Hello,';
  }
}

function getClosing(tone: string): string {
  switch (tone) {
    case 'Formal':
      return 'Sincerely,\n[Your Name]';
    case 'Professional':
      return 'Best regards,\n[Your Name]';
    case 'Friendly':
      return 'Thanks,\n[Your Name]';
    case 'Persuasive':
      return 'Looking forward to your response,\n[Your Name]';
    case 'Concise':
      return 'Regards,\n[Your Name]';
    default:
      return 'Best regards,\n[Your Name]';
  }
}

export async function generateEmail(input: EmailInput): Promise<EmailOutput> {
  await delay(1200);

  const greeting = getGreeting(input.audience);

  const purposeOpeners: Record<string, string> = {
    Request: 'I am writing to request',
    'Follow-up': 'I am following up regarding',
    Update: 'I would like to provide an update on',
    Apology: 'I am writing to sincerely apologize regarding',
    Invitation: 'I would like to invite you to',
    'Thank You': 'I am writing to express my gratitude for',
    General: 'I am writing regarding',
  };

  const opener = purposeOpeners[input.purpose] || purposeOpeners.General;

  let body = `${opener} ${input.subject || 'the matter below'}.\n\n${input.keyInfo}`;

  if (input.deadline) {
    body += `\n\nPlease note that the relevant deadline is ${input.deadline}.`;
  }

  if (input.callToAction) {
    body += `\n\n${input.callToAction}`;
  } else {
    body += `\n\nI would appreciate your feedback and guidance on how best to proceed.`;
  }

  body += `\n\nPlease let me know if you require any additional information or clarification. I am happy to discuss this further at your convenience.`;

  return {
    subject: input.subject || 'Regarding our recent discussion',
    greeting,
    body,
    closing: getClosing(input.tone),
  };
}

export async function regenerateEmail(
  input: EmailInput,
  current: EmailOutput,
  mode: 'formal' | 'concise'
): Promise<EmailOutput> {
  await delay(1000);

  if (mode === 'formal') {
    return {
      ...current,
      greeting: 'Dear ' + (input.audience === 'Team' ? 'Team Members' : '[Recipient Name]') + ',',
      body: current.body.replace(/I would like to/g, 'I would respectfully like to').replace(/Hi /g, 'Dear '),
      closing: 'Respectfully,\n[Your Name]',
    };
  }

  const sentences = current.body.split('\n\n');
  const conciseBody = sentences.slice(0, 2).join('\n\n');

  return {
    ...current,
    body: conciseBody,
    closing: 'Regards,\n[Your Name]',
  };
}

export async function summarizeMeeting(input: MeetingInput): Promise<MeetingOutput> {
  await delay(1500);

  const notes = input.notes || '';
  const lowerNotes = notes.toLowerCase();

  const actionItems = [];

  if (lowerNotes.includes('sarah')) {
    actionItems.push({
      task: 'Prepare the presentation',
      responsible: 'Sarah',
      deadline: extractDeadline(notes) || 'Not specified',
      status: 'Pending' as const,
    });
  }
  if (lowerNotes.includes('david')) {
    actionItems.push({
      task: 'Review the data',
      responsible: 'David',
      deadline: 'Not specified',
      status: 'Pending' as const,
    });
  }

  if (actionItems.length === 0) {
    actionItems.push({
      task: 'Review meeting notes and assign follow-up tasks',
      responsible: 'Not specified',
      deadline: 'Not specified',
      status: 'Pending' as const,
    });
  }

  const decisions: string[] = [];
  if (lowerNotes.includes('agreed')) {
    decisions.push('The team agreed that the first draft should be ready by Friday.');
  }
  if (decisions.length === 0) {
    decisions.push('No explicit decisions were recorded in the provided notes.');
  }

  const discussionPoints: string[] = [];
  if (lowerNotes.includes('milestone')) {
    discussionPoints.push('Project milestones were discussed and reviewed.');
  }
  if (lowerNotes.includes('presentation')) {
    discussionPoints.push('Presentation preparation responsibilities were assigned.');
  }
  if (lowerNotes.includes('data')) {
    discussionPoints.push('Data review tasks were allocated to team members.');
  }
  if (discussionPoints.length === 0) {
    discussionPoints.push('General project progress was discussed.');
  }

  const title = input.title || 'Meeting';
  const summary = `This ${title} covered project milestones and assigned responsibilities for presentation preparation and data review. The team agreed on a Friday deadline for the first draft. ${actionItems.length} action item${actionItems.length > 1 ? 's were' : ' was'} identified for follow-up.`;

  return {
    executiveSummary: summary,
    keyDiscussionPoints: discussionPoints,
    decisionsMade: decisions,
    actionItems,
  };
}

function extractDeadline(notes: string): string | null {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const lower = notes.toLowerCase();
  for (const day of days) {
    if (lower.includes(day)) {
      return day.charAt(0).toUpperCase() + day.slice(1);
    }
  }
  if (lower.includes('friday')) return 'Friday';
  return null;
}

export async function planTasks(tasks: TaskInput[], mode: string): Promise<TaskPlanOutput> {
  await delay(1400);

  const priorityOrder: Record<string, number> = {
    Critical: 0,
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const sorted = [...tasks].sort((a, b) => {
    const pDiff = (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99);
    if (pDiff !== 0) return pDiff;
    return a.deadline.localeCompare(b.deadline);
  });

  const priorities = sorted.map((t, i) => `${i + 1}. ${t.name} (${t.priority})`);

  const startTime = 8;
  const timeline = sorted.slice(0, mode === 'Daily Plan' ? 6 : 10).map((task, i) => {
    const start = startTime + i * 1.5;
    const end = start + 1.5;
    const timeStr = `${formatTime(start)}–${formatTime(end)}`;
    return {
      time: timeStr,
      task: task.name,
      priority: task.priority,
    };
  });

  const recommendations = [
    'Group similar tasks to reduce context switching.',
    'Schedule focused work blocks during your most productive hours.',
    'Leave buffer time between tasks for unexpected interruptions.',
    'Review unfinished tasks at the end of the day and re-prioritize.',
    'Tackle the highest-priority task first when your energy is highest.',
  ];

  return { priorities, timeline, recommendations };
}

function formatTime(hourFloat: number): string {
  const h = Math.floor(hourFloat);
  const m = Math.round((hourFloat - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
}

export async function researchTopic(input: ResearchInput): Promise<ResearchOutput> {
  await delay(1800);

  const topic = input.topic || 'the requested topic';

  return {
    simpleExplanation: `${topic} refers to the application of technologies and methods designed to improve outcomes in this area. In simple terms, it involves using data-driven approaches and automated systems to achieve better results than traditional methods alone.`,
    keyInsights: [
      `Adoption of ${topic.toLowerCase()} is accelerating across multiple industries.`,
      'Data quality and availability are critical success factors.',
      'Human oversight remains essential for responsible implementation.',
      'Cost savings and efficiency gains are the most commonly reported benefits.',
    ],
    importantFindings: [
      'Organizations implementing these approaches report measurable productivity improvements.',
      'Success depends on having clear use cases and well-defined workflows.',
      'Integration with existing systems is often the biggest implementation challenge.',
    ],
    benefits: [
      'Reduced time spent on repetitive tasks.',
      'Improved consistency and reduced human error.',
      'Better decision-making through data-driven insights.',
      'Scalability without proportional increases in headcount.',
    ],
    risks: [
      'Potential for biased or inaccurate outputs if not properly validated.',
      'Dependence on data quality and system reliability.',
      'Need for ongoing human oversight and review.',
      'Possible over-reliance on automated systems.',
    ],
    practicalApplications: [
      'Automating routine documentation and reporting tasks.',
      'Enhancing research and analysis workflows.',
      'Supporting decision-making with structured summaries.',
      'Streamlining communication and planning processes.',
    ],
    recommendations: [
      'Start with well-defined, low-risk use cases before scaling.',
      'Maintain human review for all important decisions.',
      'Invest in data quality and governance practices.',
      'Train teams on both capabilities and limitations.',
    ],
    furtherQuestions: [
      `What are the most successful real-world implementations of ${topic.toLowerCase()}?`,
      'What regulatory or ethical considerations apply in your industry?',
      'What are the total costs of implementation versus expected returns?',
      'How do you measure success and ROI for these initiatives?',
    ],
  };
}

export async function chatWithAssistant(
  message: string,
  _history: ChatMessage[]
): Promise<string> {
  await delay(1000);

  const lower = message.toLowerCase();

  if (lower.includes('email')) {
    return "I can help you draft a professional email. To get started, I'll need to know: Who is the recipient (manager, client, team, colleague)? What is the purpose (request, follow-up, update, apology)? And what key information should the email contain? I will not invent any details you don't provide — you can use the Smart Email Generator for a structured form.";
  }

  if (lower.includes('meeting') || lower.includes('agenda')) {
    return 'Great. For meeting preparation, I can help you with: 1) Creating an agenda, 2) Summarizing previous meeting notes, 3) Identifying action items from past meetings, 4) Preparing discussion questions. Which would be most useful? You can also use the Meeting Notes Summarizer for structured note processing.';
  }

  if (lower.includes('plan') || lower.includes('task') || lower.includes('day')) {
    return "I can help you plan your tasks efficiently. Share your task list with priorities and deadlines, and I'll organize them by urgency and importance. You can also use the AI Task Planner for a structured planning interface with timeline generation.";
  }

  if (lower.includes('research') || lower.includes('explain') || lower.includes('topic')) {
    return "I'd be happy to help with research. Tell me the topic you're exploring, and I can provide a structured brief with key insights, findings, benefits, risks, and recommendations. For a more detailed workspace, try the AI Research Assistant. Note: this prototype does not perform live web research — verify important claims using reliable sources.";
  }

  if (lower.includes('improve') || lower.includes('message')) {
    return "Share the message you'd like me to improve, and I can help refine the tone, clarity, and structure. I'll keep your original meaning intact while making it more professional and effective.";
  }

  return "I'm WorkMate AI, your workplace productivity assistant. I can help you draft emails, summarize meeting notes, plan your tasks, research topics, and prepare for meetings. What would you like to work on? You can also use the dedicated tools in the sidebar for structured workflows.";
}

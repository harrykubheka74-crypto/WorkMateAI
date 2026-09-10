---
name: workmate-ai-saas
description: Conventions for building a premium dark-mode AI productivity SaaS in Bolt — design system, page structure, AI service layer, responsible AI guardrails, and prompt engineering patterns. Use whenever the user asks to build, extend, or restyle an AI-powered workplace productivity app, a SaaS dashboard with AI tools, or any project matching the WorkMate AI pattern (email drafting, meeting summarization, task planning, research briefs, chatbot, prompt lab).
---

# WorkMate AI SaaS

A reference for building a premium AI-powered workplace productivity SaaS application. The conventions below capture the design system, architecture, and responsible-AI guardrails used in WorkMate AI and should be applied to any similar build.

## Design system

Dark professional interface with a violet AI accent. Never use purple gradients as a default — the accent is a single violet hue applied sparingly to icons, active states, and key CTAs.

### Colors (Tailwind custom ramp)

```
ink:     950 #070710  900 #0b0b18  850 #0f0f20  800 #131325  700 #1a1a30  600 #22223f  500 #2d2d4f  400 #3a3a5c
violet:  350 #a78bfa  400 #8b5cf6  500 #7c3aed  600 #6d28d9
```

- Background: `bg-ink-950` (page), `bg-ink-900` (sidebar), `bg-ink-850` (cards via glass).
- Primary text: `text-white` for headings, `text-slate-200` for body, `text-slate-400` for secondary, `text-slate-500` for muted.
- Accent: `text-violet-400` for icons, `bg-violet-500` for primary buttons, `bg-violet-500/15` with `border-violet-500/30` for active/hover states.

### Typography

- Font: Inter (sans), JetBrains Mono (mono). Import via Google Fonts in `index.css`.
- Body line-height 150%, headings 120%. Max 3 font weights: 400, 600, 700.
- Section titles: `text-2xl font-bold text-white tracking-tight` with an optional icon in `text-violet-400`.

### Reusable component classes (defined in `index.css` `@layer components`)

| Class | Purpose |
|-------|---------|
| `glass` | `bg-ink-850/60 backdrop-blur-xl border border-white/5` |
| `glass-card` | Same as glass + `rounded-2xl` |
| `btn-primary` | Violet bg, white text, hover glow, active scale |
| `btn-secondary` | Ink-700 bg, subtle border |
| `btn-ghost` | Transparent, hover bg-white/5 |
| `input-field` | Ink-800 bg, violet focus ring |
| `select-field` | Same as input-field + cursor-pointer |
| `label-text` | `text-xs uppercase tracking-wider text-slate-400` |
| `chip` | Small pill for tags/selectable options |
| `nav-link` / `nav-link-active` | Sidebar items |

### Spacing & layout

- 8px spacing system (Tailwind default).
- Cards: `glass-card p-6` with `rounded-2xl`.
- Page padding: `px-4 lg:px-8 py-6 lg:py-8`, max-width `max-w-7xl mx-auto`.
- Grid: `grid-cols-1 lg:grid-cols-2` for input/output layouts, `sm:grid-cols-2 lg:grid-cols-4` for card grids.

### Animations

Use sparingly — only `animate-fade-in` on page mount and `animate-fade-in-up` for key content. Avoid unnecessary motion.

## Page structure

Every page follows this pattern:

1. `SectionTitle` component at the top (title, subtitle, icon).
2. Input/output grid: left column is the form, right column is the result.
3. `LoadingOverlay` while AI processes.
4. `EmptyState` before first generation.
5. `Disclaimer` at the bottom of every AI tool page.

### Landing page

The landing page is standalone (no sidebar). It includes: hero with headline + dual CTAs, dashboard preview mockup, feature cards, value proposition, how-it-works steps, productivity comparison, learning objectives, roadmap, and footer.

### App pages

All non-landing pages share `AppLayout` with a persistent sidebar. The sidebar collapses to a hamburger menu on mobile.

## AI service layer

All AI logic lives in `src/aiService.ts` as async functions returning typed outputs. Each function:

- Accepts a typed input interface (from `src/types.ts`).
- Returns a typed output interface.
- Uses a `delay()` helper to simulate processing time.
- Returns clearly-labelled mock/demo responses for the prototype.
- Is structured so it can be swapped for a real LLM call via a Supabase Edge Function without changing the function signature.

### Required functions

```
generateEmail(input: EmailInput): Promise<EmailOutput>
summarizeMeeting(input: MeetingInput): Promise<MeetingOutput>
planTasks(tasks: TaskInput[], mode: string): Promise<TaskPlanOutput>
researchTopic(input: ResearchInput): Promise<ResearchOutput>
chatWithAssistant(message: string, history: ChatMessage[]): Promise<string>
```

### Connecting a real LLM

1. Create a Supabase Edge Function under `supabase/functions/`.
2. Store the API key in Edge Function secrets — never in frontend code or `.env` values exposed to the browser.
3. Replace the mock logic in `aiService.ts` with a `fetch()` call to the edge function.
4. Keep the same function signatures so pages don't need changes.

Never hard-code API keys. Never expose secrets in frontend code.

## Responsible AI guardrails

These are non-negotiable for every AI tool page:

1. **Never invent information.** If the user didn't supply a name, date, or fact, use a placeholder like `[Manager Name]` or display "Not specified" — never guess.
2. **Label all output as AI-generated.** Every AI tool page includes a `Disclaimer` component at the bottom.
3. **Display missing information honestly.** Meeting action items show "Not specified" for missing people or deadlines.
4. **State limitations clearly.** The Research Assistant states it does not perform live web research. The Chatbot states responses may contain errors.
5. **Dedicated Responsible AI page.** Four principles (VERIFY, PROTECT, QUESTION, OWN), known limitations, and a human validation workflow: AI generates → Human reviews → Fact-check → Edit → Approve → Use.

## Prompt engineering

The Prompt Lab page teaches the RTC CO framework:

- **R — Role**: Tell the AI who it should act as.
- **T — Task**: Clearly define what needs to be done.
- **C — Context**: Provide relevant information.
- **C — Constraints**: Specify rules and limitations.
- **O — Output**: Define the required response format.

Include a bad-vs-good prompt comparison and a hands-on prompt builder where users fill in each RTC CO field and generate output to compare.

## UX requirements

Every AI tool must have:

- Loading state (`LoadingOverlay` with a descriptive label).
- Empty state (`EmptyState` with icon, title, description).
- Error handling (toast notification via `useToast`).
- Success notification (toast on successful generation).
- Copy-to-clipboard (`CopyButton` component).
- Clear/Reset button.
- Load Demo button (pre-fills with realistic demo data).
- Responsive layout (stacks on mobile, side-by-side on desktop).
- Accessible labels (`aria-label` on icon buttons, `label` + `id` on form fields).
- Keyboard-friendly controls (Enter to send in chat, tabbable buttons).

## Demo data

All demo data lives in `src/demoData.ts` with realistic workplace examples:

- Email: Manager, Formal, "Project Progress Update", stage-1 completion info.
- Meeting: "Team discussed project milestones. Sarah will prepare the presentation. David will review the data. The team agreed that the first draft should be ready by Friday."
- Tasks: Finish project report, Prepare presentation, Reply to client, Review project data, Attend team meeting.
- Research: "Artificial Intelligence in Manufacturing".

## Types

All shared types live in `src/types.ts`. Every AI input and output has an explicit interface. Union types (e.g., `Audience`, `Tone`, `Priority`) are defined as string literal unions and exported for reuse.

## File organization

```
src/
  types.ts          # All shared TypeScript types
  demoData.ts       # Demo/prototype data
  aiService.ts      # AI service functions (mock → real LLM)
  App.tsx           # Page router (useState-based, no router lib)
  index.css         # Tailwind layers + component classes
  components/
    AppLayout.tsx   # Sidebar + header + main content wrapper
    Sidebar.tsx     # Navigation sidebar (collapsible on mobile)
    ui.tsx          # Shared UI primitives (Card, Badge, CopyButton, etc.)
    ToastContext.tsx    # Toast provider + hook
    ToastContainer.tsx  # Toast UI
  pages/
    Landing.tsx
    Dashboard.tsx
    EmailGenerator.tsx
    MeetingSummarizer.tsx
    TaskPlanner.tsx
    ResearchAssistant.tsx
    Chatbot.tsx
    PromptLab.tsx
    ResponsibleAI.tsx
    About.tsx
```

Navigation is `useState`-based in `App.tsx` — no router library. The `PageId` union type in `types.ts` enumerates all pages. The landing page renders standalone; all other pages render inside `AppLayout`.

## Icons

Use `lucide-react` exclusively. Import each icon explicitly at the top of the file — never reference an icon without importing it.

## Assessment alignment

The project must visibly demonstrate five learning objectives:

1. **Introduction to AI** — practical AI tools for real workplace tasks.
2. **Maximizing productivity** — structured outputs that reduce repetitive work.
3. **Prompt engineering** — dedicated Prompt Lab with RTC CO framework.
4. **Responsible AI** — dedicated page with principles, limitations, and workflow.
5. **Staying ahead of the curve** — future roadmap from prototype to enterprise.

Each objective should have a visible explanatory section (on the landing page and/or About page).

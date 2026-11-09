// ─── Data types ──────────────────────────────────────────────────────────────

export interface CarouselSlide {
  src: string;
  caption: string;
}

export interface Exhibit {
  type: "image" | "diagram" | "video" | "carousel";
  src: string;
  caption: string;
  gated?: boolean;
  playbackRate?: number;
  slides?: CarouselSlide[]; // used when type === "carousel"
}

export interface PhaseSection {
  id: string;
  title: string;
  text: string;
  exhibit?: Exhibit;
}

export interface Phase {
  id: string;
  title: string;
  summary: string;          // 1–2 sentences, shown collapsed / used as teaser
  detail?: string;          // full markdown content, shown expanded (standard phases)
  exhibits?: Exhibit[];
  sections?: PhaseSection[]; // paired layout: each section has its own exhibit
  status?: "in-progress" | "done";
}

/** Minimal shape passed to the browser for phases that are locked server-side. */
export interface LockedPhase {
  id: string;
  title: string;
  summary: string;
  status?: "in-progress" | "done";
}

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  status?: string;
  gated: boolean;
  summary: string;  // for /work index card
  phases: Phase[];
  heroImage?: string; // optional hero image path override (defaults to /images/case-studies/{slug}-hero.png)
  heroVideo?: string; // optional hero video path, shown instead of hero image
  heroCaption?: string; // optional caption shown below the hero video
  heroPlaybackRate?: number; // optional playback rate for hero video (default 1.3)
  // Optional flat-summary fields for case studies that don't use the phase stepper
  overview?: string;
  numbers?: string;
}

// ─── Case study data ──────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  // ── 1. AI Summarization ───────────────────────────────────────────────────
  {
    slug: "ai-summarization",
    title: "AI summarization feature for Maximo 9.3",
    role: "Design owner, AI Strategy & Discovery Squad | IBM Maximo Manage",
    timeline: "Jun 2026 – Present",
    gated: false,
    heroVideo: "/images/case-studies/Summarization 9.3/Hero video.mp4",
    summary:
      "From a vague 'summarize any page' request to a validated insight system: discovery tooling, synthesis, data-science handoff and output review.",
    phases: [
      {
        id: "reframe",
        title: "The reframe",
        summary:
          "The ask was compression. Voice-of-customer research said users needed connection.",
        detail: `The ask: let users summarize any page, such as a work order, an asset or a list.

24 "day in the life" interviews with asset managers, maintenance supervisors and technicians said otherwise. The problem wasn't too much information. It was scattered information: six systems, three tabs and a stack of paper to answer one question: *what needs my attention right now?*

So the thesis shifted from **summarize a record** to **surface a decision**.

> "Users do not want more information. Users want help connecting information."
> — synthesized finding, 9.3 AI Capabilities research playback`,
        exhibits: [],
      },
      {
        id: "discovery-tooling",
        title: "Discovery tooling | BOB + VOC corpus",
        summary:
          "Built an AI research agent to make 24 interviews searchable, not just readable.",
        detail: `Reading 24 long interviews once and pulling quotes wouldn't hold up across personas, roles and industries. So I turned them into a searchable corpus with BOB, built with my team lead. It was my first hands-on use of BOB.

- **A custom agent mode ("voc-analyst")** with a strict schema for every interview: participant, role, industry, challenges and tools, then a narrative summary.
- **An MCP server ("virtual-voc")** so the agent could search and count patterns across all interviews instead of relying on memory.
- **A calibration set** of reference KPIs and a sample use case, to check the agent's output before running it on real interviews.
- **A feasibility check** against the Maximo AI Assistant's existing tools, so every opportunity stayed grounded in what was buildable.`,
        exhibits: [
          {
            type: "carousel",
            src: "",
            caption: "Discovery tooling artefacts",
            slides: [
              {
                src: "/images/case-studies/Summarization 9.3/Custom Yaml.png",
                caption: "custom_modes.yaml — the voc-analyst agent definition: a scoped BOB mode with enforced interview schema, structured frontmatter fields, and permissions that kept the agent's output consistent across every file in the corpus.",
              },
              {
                src: "/images/case-studies/Summarization 9.3/Interview Md .png",
                caption: "Interview docs converted to structured .md files — consistent frontmatter fields (participant, role, industry, company, challenges, tools) followed by a narrative summary, making 24 interviews queryable as a single corpus rather than 24 differently-shaped documents.",
              },
            ],
          },
        ],
      },
      {
        id: "synthesis",
        title: "Synthesis: Painpoints to opportunity areas",
        summary:
          "Persona painpoints mapped to real Maximo data, so design intent traced to what the system could build.",
        detail: `I mapped painpoints for the two highest-impact personas, Asset Manager and Maintenance Supervisor, on Mural. The mobile team did the same for technicians in parallel.

For supervisors, two use cases stood out:

1. **Shift handoff:** what happened overnight, what's blocked, what needs attention now.
2. **Prioritize today's work:** new, urgent and blocked work, ranked by safety and production impact.

I broke each use case down to the Maximo objects and fields it needs (WORKORDER, ASSET, WPMATERIAL, WFASSIGNMENT and more). That's what made the handoff actionable rather than aspirational.`,
        exhibits: [
          { type: "image", src: "/images/case-studies/Summarization 9.3/Mural snapshot.png", caption: "Mural synthesis; persona painpoints → AI summary opportunity → what should be included" },
        ],
      },
      {
        id: "handoff",
        title: "Handoff to data science",
        summary:
          "A buildable spec, not a slide deck.",
        detail: `The inclusion criteria, object and field mapping and example outputs went to the Data Science team as a Jira story. It had clear acceptance criteria, and every recommendation traced back to the research.

The mobile team used the same structure for technicians, so both halves of the product converged on one architecture.`,
        exhibits: [
          { type: "image", src: "/images/case-studies/Summarization 9.3/Data science doc handoff.png", caption: "Snapshot of hand off document with Maximo object structure and field mapping for every AI information need" },
        ]
      },
      {
        id: "build-collaboration",
        title: "Staying in the build",
        summary:
          "Handed over for execution. I now review the summary and insight outputs it produces.",
        detail: `Data Science built an intent/input/output framework: what a summary contains, what data it pulls, and how it's analyzed and formatted.

The work has now been handed over for execution. I review the summary and insight outputs it produces, both for individual records and for multiple records across work orders, tickets, work queues and more.

For each, I provide the schema and the information signals the output should draw on, so it stays grounded in user needs rather than technical convenience.`,
        exhibits: [
          { type: "image", src: "/images/case-studies/Summarization 9.3/Summary configuration tool.png", caption: "Current intent/input/output framework — mapping what each summary should surface, what Maximo data feeds it, and how the output is structured and formatted." },
        ],
      },
      {
        id: "validation",
        title: "Validating with users",
        summary:
          "5 participants: relevance came easily, trust had to be earned with evidence.",
        detail: `Prefer video? Watch the [playback presentation](https://drive.google.com/file/d/1FqPvbvPGtKlvextDW7WSTdS8w28GVfKz/view?usp=sharing).

Before going further, I planned and led usability testing of early AI-insight concepts with 5 participants. It tested three questions: what should surface first, what builds trust, and where AI actually saves investigation effort.

- **Relevance was high (4.2/5)** when information matched the person's role.
- **Trust lagged (3.4/5).** It came from visible evidence and transparent reasoning, not confidence scores.
- **Five needs recurred across roles:** what's urgent, what's blocked, what's broken, what happened before, and why it matters.

These became five design principles now shaping Maximo's AI direction: progressive disclosure, always show evidence, surface exceptions over routine, pair current state with history, and always recommend a next action.`,
        exhibits: [
          {
            type: "carousel",
            src: "",
            caption: "Validation study artefacts",
            slides: [
              {
                src: "/images/case-studies/Summarization 9.3/metrics.png",
                caption: "Study metrics — relevance (4.2/5), trust (3.4/5), actionability, and investigation effort across 5 participants.",
              },
              {
                src: "/images/case-studies/Summarization 9.3/Container.png",
                caption: "Participant priorities highlighting the density of information needs.",
              },
              {
                src: "/images/case-studies/Summarization 9.3/design principles.png",
                caption: "Recurring design principles that emerged from the study that can be used to define future AI experiences.",
              },
            ],
          },
        ],
      },
      {
        id: "current-status",
        title: "Where this stands",
        summary:
          "Discovery and validation done. Now in execution, with design review of every output.",
        detail: `Discovery and validation are complete, and the work is now in execution. I stay involved by reviewing what the summaries and insights actually produce.

[Watch a preview of the future insight-generation tool](https://drive.google.com/file/d/1A9EkFnc6JDhEc2rT87gW1xusv1eRz7n1/view?usp=sharing), a concept for helping users set up their own insights.

What this project shows:

- Reframing a feature request into the right problem, using evidence
- Building research tooling when standard methods wouldn't scale
- Turning design intent into a buildable spec, and staying involved through execution
- Letting user feedback reshape the direction, not just confirm it`,
        exhibits: [],
      },
    ],
  },

  // ── 2. 9.2 Usability Testing & Playback ──────────────────────────────────
  {
    slug: "9-2-usability-testing",
    title: "Validating 9.2 AI Assistant features with users",
    role: "Design owner for usability validation, AI Strategy & Discovery Squad | IBM Maximo Manage",
    timeline: "Mar - May 2026",
    gated: false,
    heroVideo: "/images/case-studies/9.2%20validation%20plan/Hero%20-%209.2%20usability.mp4",
    heroCaption: "The Maximo Assistant's reasoning trace for a simple query: planning, retrieving and generating results.",
    heroPlaybackRate: 1.4,
    summary: "I planned the study, recruited participants, ran every session and synthesized findings from 8 users across 3 companies. The results, presented to executives, shaped 9.3 priorities.",
    phases: [
      {
        id: "methodology",
        title: "Designing the validation plan",
        summary: "Before any user saw a prototype, I wrote the plan: what to test, how to measure it and what success looked like.",
        sections: [
          {
            id: "methodology-context",
            title: "",
            text: "When I joined, the team was shipping a growing set of agentic capabilities for the Maximo Assistant. None had been tested with real users. My first owned project was closing that gap, starting with a proper validation plan, not just a script.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/validation%20plan.png", caption: "Validation plan — objectives, methodology, and task scenarios." },
          },
          {
            id: "methodology-detail",
            title: "What the plan covered",
            text: "**Goal:** Does the assistant behave the way users expect on common asset management tasks? Does it surface the right information, support confident decisions and fit into their workflow?\n\n**Scope:** Every planned 9.2 feature, plus early post-9.2 items like RAG-based document search.\n\n**Method:** Moderated Teams sessions with a clickable Figma prototype, so we could watch people think aloud.\n\n**Tasks:** Five connected scenarios, each harder than the last. Take a tour, run a simple query, check one asset's condition, ask a general knowledge question, then check condition across several assets.\n\n**Metrics:** Task success without help, a 7-point trust rating after each task, and single-question ratings for usefulness and effort. That way rounds could be compared on numbers, not anecdotes.\n\nI ran it with teammates Jen and Danial. We rotated facilitator and note-taker roles so no one person's fatigue or bias shaped every session.",
          },
        ],
      },
      {
        id: "recruiting",
        title: "Recruiting and participant infrastructure",
        summary: "Personal outreach to real Maximo users at three companies, tracked so every contact came with context.",
        sections: [
          {
            id: "recruiting-context",
            title: "",
            text: "8 participants across three rounds and three companies, from asset managers and maintenance planners to solutions architects and admins. There was no recruiting panel. It was direct outreach to people who use Maximo, many from an earlier 9.1 round.\n\nI wrote the outreach, tracked every reply, and logged each contact's role, company, conversation history and referrals. When someone referred a colleague, I checked that person's role before inviting them.\n\nThat spreadsheet later grew into a reusable participant tracking system for future studies.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Participant%20structure.png", caption: "Participant repository on Monday: 45+ contacts, multiple orgs and 12+ roles, built for reuse across studies." },
          },
        ],
      },
      {
        id: "sessions",
        title: "Running the sessions",
        summary: "Hour-long moderated sessions with a shared note structure, so findings could be compared across participants.",
        sections: [
          {
            id: "sessions-detail",
            title: "",
            text: "Every session followed the same shape: intro and consent, screener questions, five tasks, then a closing questionnaire.\n\nI built a note template that put the script, what the participant did and what they said side by side. Roles could rotate without losing consistency, and synthesis didn't depend on interpreting scattered notes.\n\nModerated sessions paid off. One admin walked us through his workaround: a separate data warehouse outside Maximo, because queries across applications were too slow. That doesn't come out in a survey.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Script%2C%20session%20notes.png", caption: "Session script and live notes: non-leading facilitator prompts, with a parallel column for what the participant did and said." },
          },
        ],
      },
      {
        id: "current-state",
        title: "Measuring the baseline",
        summary: "First, we measured how hard the job already was. That set the bar for the AI.",
        sections: [
          {
            id: "current-state-detail",
            title: "",
            text: "Two baseline questions anchored the study:\n\n- **Finding information: 5.6/7.** Easy, but only if you already knew where to look. It got harder with closed projects, records with many linked entries, or moving between applications.\n- **Understanding asset condition: 4/7.** A synthesis problem, not a tooling gap. People pieced together work orders, history, meter data, inspections and notes in their heads. One participant used Maximo as a starting point, then asked a technician what was really going on.\n\nThat gap between *finding* records and *understanding* them became the lens for everything we tested next.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Base%20line%20rating.png", caption: "Baseline ratings: 5.6/7 for finding data, 4/7 for understanding asset condition." },
          },
        ],
      },
      {
        id: "findings",
        title: "Testing each AI capability",
        summary: "Five capability areas. Reasoning and confirmation was the big one, but each taught us something.",
        sections: [
          {
            id: "chat-history",
            title: "Chat history",
            text: "It matched what people expect from any chat app. Everyone understood the list, the grouping and the pinning, and renamed or pinned chats without help. The gap was scale: titles were often unclear or cut off, and 3 of 8 suggested AI-generated titles and better grouping.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/other%20capabilitys.png", caption: "Testing summary across assistant launch, quick starters, and chat history — three capabilities users navigated without guidance." },
          },
          {
            id: "normal-query",
            title: "Finding records with a simple query",
            text: "Asked to find assets at a site with open work orders, all 8 valued the expanded results view. But a good answer raised the next question. People wanted to refine it, see which assets had the most work orders, or add work order type and duration. The assistant should support investigation, not end it.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Simple%20query%201.png", caption: "Reasoning (query tool) findings: 8/8 valued the reasoning trace and 7/8 read it correctly, but technical language caused friction." },
          },
          {
            id: "condition-assessment",
            title: "Condition assessment, single and multiple assets",
            text: "Single-asset insights felt the most immediately useful, matching how people already assess assets by hand (\"very close to evaluation work I perform manually\"). The friction: the view was long and dense, and 3 people asked for a way to copy the insight.\n\nWith multiple assets, people quickly outgrew per-asset summaries. Looking at five pumps, they wanted the pattern, not five paragraphs: \"tell me what's important across these assets.\" That line became one of the clearest signals for 9.3: summaries across a whole fleet, and root causes.",
            exhibit: { type: "carousel", src: "", caption: "Single and multi-asset condition insight findings", slides: [
              { src: "/images/case-studies/9.2%20validation%20plan/single%20asset.png", caption: "Single-asset insight: closely matched how users already assess assets. Key ask: a way to copy insights out." },
              { src: "/images/case-studies/9.2%20validation%20plan/mult%20asset%20.png", caption: "Multi-asset insight: valued, but users wanted patterns and priorities across assets, not repeated summaries." },
            ]},
          },
          {
            id: "gen-llm",
            title: "General knowledge, with and without references",
            text: "Without references, 100% understood when an answer came from general knowledge rather than Maximo data. They moved naturally from \"what happened\" to \"how do I fix it\".\n\nWith references, the source was the sticking point. 5 of 8 wanted to see more clearly where information came from, and 3 of 8 stayed unsure of the source. That made the case for investing in document search and citation for 9.3.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Gen%20knowledge.png", caption: "General knowledge and references: 100% understood the difference from Maximo data, but 3/8 stayed unsure of the source." },
          },
          {
            id: "reasoning-confirmation",
            title: "Reasoning and confirmation, the big one",
            text: "The capability we spent the most time on.\n\n- **Reasoning trace:** 8 of 8 valued it for transparency and 7 of 8 read it correctly. But terms like \"href\" and \"single query operation\" confused people, and across multiple assets the repeated steps felt redundant.\n- **Confirmation:** 7 of 8 understood Continue/Cancel as checking the selected records, and genuinely checked type, location, priority and count. But the buttons didn't say what would happen next. We recommended copy like \"Confirm records to generate insights\".\n- **Confidence scores:** 7 of 8 understood them, but nearly everyone wanted to know what was behind the number: which records, how recent, what was missing. Confidence without evidence didn't build trust.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Chat%20Assist%20UT%20-%20Current%20Experience.png", caption: "Reasoning and trust: 8/8 valued the trace, but terms like 'href' reduced clarity. Users wanted reasoning linked to records." },
          },
        ],
      },
      {
        id: "outcome",
        title: "Synthesis, scores, and shaping 9.3",
        summary: "6.8/7 on productivity impact, 6.4/7 on condition insight value, and clear priorities for 9.3.",
        sections: [
          {
            id: "outcome-detail",
            title: "",
            text: "Closing scores: **6.8/7** for potential productivity impact and **6.4/7** for condition insights. Trust in the reasoning was lower at **5.8/7**: people understood *what* it did more than they trusted *why*. That distinction later became central to the 9.3 summarization work.\n\nI presented the synthesis at a team playback, then at an executive session, where it shaped three 9.3 priorities:\n\n- **Context-aware, role-based workflows:** from isolated answers to a path from insight, to follow-up question, to action.\n- **Source-backed, explainable confidence:** more document search and citation, and clear evidence behind every score.\n- **Ranking problems across many assets:** shared root causes and ranked priorities, not the same single-asset template repeated.\n\nThe testing wasn't a final check before shipping. It decided what got built next.",
            exhibit: { type: "carousel", src: "", caption: "Outcome scores and 9.3 priorities shaped by testing", slides: [
              { src: "/images/case-studies/9.2%20validation%20plan/Final%20outcome%20results.png", caption: "Closing scores: 6.8/7 productivity impact, 6.4/7 condition insight value." },
              { src: "/images/case-studies/9.2%20validation%20plan/9.3%20priotieis.png", caption: "9.3 priorities shaped by testing: context-aware workflows, source-backed confidence and patterns across assets." },
            ]},
          },
        ],
      },
    ],
  },

  // ── 3. UXDRT ─────────────────────────────────────────────────────────────
  {
    slug: "uxdrt",
    title: "UXDRT (UX Delivery Readiness Tracker)",
    role: "UX QA Contributor: Assistant 9.2, AI Strategy & Discovery Squad | IBM Maximo Manage",
    timeline: "April 2026 – ongoing (9.2 release cycle to 9.3)",
    heroImage: "/images/case-studies/uxdrt/Hero.png",
    gated: false,
    summary:
      "UXDRT was a tracker built by my team lead Jen to replace the fragmented Box Notes and Slack approach that broke down in 9.1. It gave the UX/CD/PM team a single source of truth for QA findings across AI configuration, agentic Maximo Assistant, and related tools; from first observation through to Jira handoff and validation.",
    overview:
      "Design QA is a critical step in delivering high-quality, customer-centered features; without structure, findings get scattered, ownership is unclear, and issues fall through the cracks. In Maximo 9.1, the team tracked QA across 6 Box Notes alongside Slack. It became unmanageable almost immediately. UXDRT was introduced in 9.2 as a centralized Monday.com board with a structured triage workflow, turning a fragmented process into a single source of truth for the UX/CD/PM team working across AI configuration, agentic Maximo Assistant, and related tools.",
    numbers:
      "390 findings tracked in 9.2, up from 113 in 9.1: a 242% increase reflecting more thorough QA coverage, not declining quality. 68% mapped to Jira, 142 fixed, 35 moved to backlog, and roughly 10% traced back to a direct improvement in Carbon AI Chat.",
    phases: [
      {
        id: "context",
        title: "The problem",
        summary:
          "Box Notes and Slack were the QA tools in 9.1. By 9.2, with more complex and dynamic capabilities to cover, that approach had already failed.",
        detail: `Design QA is rarely just about spotting defects. Each observation can require investigation, cross-functional input, and iteration before it's ready to hand off to engineering. Without structure, that complexity compounds quickly.

In 9.1, the team tracked QA findings across 6 Box Notes alongside Slack threads. Even at that scale it was unmanageable: scattered conversations, unclear ownership, no visibility into status, and a real risk of issues being lost before reaching development.

In 9.2, with a growing set of AI capabilities to cover (AI configuration, agentic Maximo Assistant, multi-asset flows, reasoning steps, and more), it was clear that approach would not scale.

Common challenges the team faced:
- Identifying an issue was straightforward; understanding it required investigation that had no good home
- QA conversations fragmented across Slack, Box Notes, and direct messages
- Logging every observation directly to Jira without investigation overwhelmed engineering with underspecified tickets
- No structured way to track status, assign ownership, or return to validate a fix
- No visibility into the volume or distribution of QA work being done`,
        exhibits: [],
      },
      {
        id: "solution",
        title: "The solution: UXDRT",
        summary:
          "My team lead Jen designed and built UXDRT: a centralized Monday.com board that gave the team a structured workflow from first observation to validated fix.",
        detail: `UXDRT was built by my team lead Jen as a centralized QA tracking and triage system on Monday.com. The board replaced the fragmented multi-tool approach with a single source of truth for all UX QA findings, covering the full team working across AI configuration, agentic Maximo Assistant, and related tools.

Each finding is documented as its own item on the Monday.com board with a clear issue description, screenshots, comments, links to relevant Slack threads, and a severity rating aligned to Jira. From there, a structured triage workflow defines exactly what needs to happen next:

Capture → Investigate → Triage → Prepare for Dev → Validate

Triage statuses (Needs Investigation, Investigating, Needs Design, Issue Needed, Issue Created) make ownership and next steps explicit. Once a Jira issue is created, it's linked directly from the board, and the item stays open until the fix is validated after implementation.

When an issue is ready to escalate, the team creates a well-scoped Jira ticket from the Monday board item with full context, severity, screenshots, and investigation notes already attached. This means engineering receives fewer but more actionable and well-defined issues, reducing rework and back-and-forth.

Dashboard views on the board give the team live visibility into total findings, severity distribution, triage progress, and what's ready to validate: making QA work quantifiable for the first time.`,
        exhibits: [
          {
            type: "image",
            src: "/images/case-studies/uxdrt/Board.png",
            caption: "UXDRT Monday.com board: issue descriptions grouped by capability, with Triage Status, Severity, Issue Link, Jira Status, Release Target, and Triage Owner columns visible.",
          },
        ],
      },
      {
        id: "workflow",
        title: "Workflow",
        summary:
          "A structured five-step flow ensured every finding moved intentionally from observation to resolution.",
        detail: `The UXDRT workflow follows a clear, repeatable sequence:

1. Capture: when an issue is observed, a team member adds an item to the board with a description, screenshots, links to Slack threads, and a severity rating (aligned to Jira).

2. Investigate: if the observation needs more context, it's assigned a Triage Owner and status moves to Needs Investigation or Investigating. This creates a dedicated space for follow-up without losing thread in Slack.

3. Triage: once understood, the issue is classified as Needs Design, Issue Needed, or Issue Created. Severity and ownership are confirmed.

4. Prepare for Dev: a well-scoped Jira ticket is created with full investigation context. The Jira link is recorded on the Monday board item, and Jira Status is tracked from the board.

5. Validate: after engineering delivers a fix, the team returns to validate the resolution. Items stay open until testing confirms the fix is complete.

This progression ensures nothing is lost between discovery and delivery, and gives engineering a clear, well-documented issue every time.`,
        exhibits: [],
      },
      {
        id: "impact",
        title: "By the numbers",
        summary:
          "390 findings tracked in 9.2 vs. 113 in 9.1; not a quality decline, a measurement improvement.",
        detail: `In 9.1, the team tracked approximately 113 issues total: around 90 for Maximo Assistant and query capability, and 23 for AI configuration.

In 9.2, 390 issues were identified and tracked (314 on Monday, 76 from Box Notes fixed before the migration): a 242% increase. That growth reflects more thorough and consistent QA coverage enabled by the new system, not a drop in product quality.

Team-wide 9.2 totals:
- 390 total findings tracked
- 68% mapped to Jira issues (approximately 263 of 390)
- 142 issues fixed
- 35 issues moved to backlog
- ~10% of findings traced back to a direct improvement in Carbon AI Chat

The team also went from 5 Box Notes covering different areas to a single Monday.com board: one source of truth for everything.

Expected efficiency gains for teams adopting this process:
- 30–50% reduction in time spent organizing QA findings
- 25–40% improvement in Jira ticket quality
- 15–25% faster QA cycles overall`,
        exhibits: [],
      },
    ],
  },

  // ── 4. Guardium Exclusion Builder ────────────────────────────────────────
  {
    slug: "guardium-exclusion-builder",
    title: "Exclusion Builder: Feature redesign for Guardium",
    role: "UX design lead, Protect Squad | Guardium Data Protection | IBM Data Security",
    timeline: "Sept – Oct 2025",
    gated: false,
    summary:
      "Analysts needed a way to suppress known safe activity from generating threat cases, without losing control over what got blocked or why. I redesigned the exclusion rule builder inside Guardium's Active Threat Analytics from a rigid, all-inputs form into a guided, real-time, explainable builder, then supported it through dev handoff and validated it with real users.",
    phases: [
      {
        id: "context",
        title: "Context and the problem",
        summary:
          "As Design Lead for Protect, I covered both Vulnerability Assessment and Active Threat Analytics. This case study covers one capability in depth: the Exclusion Builder.",
        sections: [
          {
            id: "context-ia",
            title: "My role",
            text: "I was the UX lead for the Protect squad within Guardium Data Protection, covering both Vulnerability Assessment and Analytics. Active Threat Analytics generates cases, structured folders of suspicious activity like repeated failed logins, SQL injections, or data leaks, so analysts can quickly investigate and respond to real threats.",
            exhibit: { type: "image", src: "/images/case-studies/guardium-exclusion-builder/IA.png", caption: "Information architecture of Guardium Data Protection, showing where Active Threat Analytics sits within the Protect squad." },
          },
          {
            id: "context-problem",
            title: "The problem",
            text: "Not every flagged activity is actually a threat. Analysts needed a way to create exclusion rules, suppressing known safe or repetitive activity (an admin account running routine maintenance, for example) so it stopped generating noise and let them focus on what mattered.\n\nI defined the problem by auditing customer RFE tickets on Jira and running a heuristic evaluation of the legacy tool.",
            exhibit: { type: "image", src: "/images/case-studies/ATA-problem-statement.png", caption: "Summary of painpoints identified from customer tickets and our study of the legacy tool." },
          },
        ],
      },
      {
        id: "redesign",
        title: "Redesigning the builder",
        summary:
          "The legacy tool forced people to start with dates and see every field at once. I rebuilt it as a linear, one-input-per-row flow with a real-time preview of exactly what the rule would affect.",
        sections: [
          {
            id: "redesign-legacy",
            title: "The problem with the legacy builder",
            text: "The legacy condition builder had a specific set of problems: it forced users to start with dates, which set the wrong mental model from the first step. It didn't support multiple values or show dependencies between fields. Every rule was a set of isolated inputs, not one coherent idea. And the data grid exposed too much detail to read as a natural summary.",
            exhibit: { type: "image", src: "/images/case-studies/guardium-exclusion-builder/Legacy builder.png", caption: "Legacy exclusion builder — all inputs exposed at once, no dependency logic, date-first mental model." },
          },
          {
            id: "redesign-solution",
            title: "The redesign",
            text: "I reframed the whole model around a few principles: show only the properties relevant to what someone's actually building, reveal one input at a time so people build precise exclusions instead of guessing, and make the impact of a rule visible before it's applied, not after.\n\nConcretely, that meant starting the flow with a name and description, so intent gets defined before any technical detail like IPs or databases enters the picture. The rule itself moved from a cluttered all-inputs layout to a linear, one-input-per-row builder, with a property automatically disabled once it's used, so invalid entries aren't possible in the first place. Dependency logic got explained inline, through tooltips and example entries, instead of leaving people to infer it.",
            exhibit: { type: "image", src: "/images/case-studies/guardium-exclusion-builder/solutions.png", caption: "Redesigned linear builder — one input per row, properties disabled once used, dependency logic explained inline." },
          },
          {
            id: "redesign-preview",
            title: "Real-time rule impact preview",
            text: "The biggest trust builder was a real-time preview: as someone built a condition, they could immediately see which existing cases matched it, with a checkbox to close those cases instantly and links to inspect them first. That single addition turned the builder from something you'd hesitate to use into something you could commit to with confidence.",
          },
        ],
      },
      {
        id: "scheduling",
        title: "Scheduling and explainability",
        summary:
          "Rules needed to run on a schedule, not just indefinitely, and analysts needed to understand exactly what they'd built without reading raw logic.",
        sections: [
          {
            id: "scheduling-recurrence",
            title: "Scheduling",
            text: "Once the core builder worked, the next gap was time. By default, a rule now runs indefinitely from today, so most people don't have to think about scheduling at all, but once someone defines a period, repeat options like weekly, monthly, quarterly, or a fully custom recurrence become available. A calendar-style preview highlights the exact days a rule will be active, and the interface uses natural language phrasing wherever possible, something like 'this repeats on the first Sunday of every month' rather than a raw rule string.",
            exhibit: { type: "video", src: "/images/case-studies/guardium-exclusion-builder/scheduler feature.mp4.mov", caption: "Scheduler feature — OOTB recurrence options and calendar preview, so analysts could define when a rule runs and see exactly which days it would trigger.", playbackRate: 1.5, gated: true },
          },
          {
            id: "scheduling-explainability",
            title: "Explainability",
            text: "Explainability mattered just as much after a rule was saved as while it was being built. The language used during creation carries through to the saved rule's summary, so an analyst reviewing an existing exclusion sees the same terms they'd use to build a new one. Expanding a row in the exclusion list shows a read-only summary reflecting exactly what was built, condition, description, and repeat pattern together, so anyone (including someone who didn't create the rule) can understand it later. A filter fly-out and a simple enable and disable toggle rounded out day-to-day management.",
            exhibit: { type: "image", src: "/images/case-studies/guardium-exclusion-builder/Explainability.png", caption: "Saved exclusion list with read-only summary matching the components used during creation, with added enhancements like filters, toggle and modify actions." },
          },
        ],
      },
      {
        id: "handoff",
        title: "Design to dev handoff",
        summary:
          "Structured Figma phases, fully clickable prototypes, and active collaboration that turned design questions into tracked engineering work.",
        detail: "I organized the Figma file into clear phases, exploration, prototype, and redlines, so the work stayed reusable rather than becoming one sprawling file. Delivery included fully clickable prototypes with an intro, a stated problem, and a scripted walkthrough of the workflow, so anyone reviewing it (PM, engineering, or a customer) could see the reasoning, not just the screens.\n\nDevelopment support ran through active Slack collaboration. When a design question came up mid-build, I converted it into a tracked Jira enhancement rather than letting it stay a side conversation, and kept redlines updated as the design evolved. Dev annotations covered logic, content rules, edge cases, empty states, and behavioral guidelines in detail; the goal was that engineering shouldn't have to guess at intent on anything ambiguous.",
        exhibits: [
          { type: "image", src: "/images/case-studies/guardium-exclusion-builder/Dev handoff.png", caption: "Figma file structure, exploration through redlines, and detailed dev annotations." },
        ],
      },
      {
        id: "validation",
        title: "Validating with real analysts",
        summary:
          "Tested through IBM's Sponsored User Program. The real-time preview and calendar view were the clear wins, and one participant asked for exactly the kind of intelligence I'd later build toward in AI-native work.",
        sections: [
          {
            id: "validation-findings",
            title: "What we heard",
            text: "I validated the design with real analysts through Guardium's Sponsored User Program, running tasks and open-ended questions focused on building, scheduling, and editing rules.\n\nThe response was strongly positive on the core reframe. One participant said the rule builder made complex rules easier to handle because related properties were grouped together, with inline notifications guiding them without errors. Another called the ability to see which cases and categories would be impacted while setting up a rule a huge confidence builder; it meant not accidentally blocking something important. A third specifically called out the calendar preview as more flexible than simply picking start and end dates.",
            exhibit: { type: "image", src: "/images/case-studies/guardium-exclusion-builder/resarch validation.png", caption: "Sponsored User Program findings, participant quotes on rule building and scheduling." },
          },
          {
            id: "validation-lookahead",
            title: "What it pointed toward",
            text: "Not every reaction was purely positive, and that's worth keeping in the story. One participant wanted the tool to go further: auto-suggest exclusions based on past cases, or let them quickly block common activity like failed logins with one action, rather than building every rule manually. At the time, that was outside scope. Looking back, it's a fairly direct preview of the AI-assisted, pattern-driven design work I've moved toward since.",
          },
        ],
      },
      {
        id: "beyond-exclusions",
        title: "Beyond exclusions: Threat analytics landscape",
        summary:
          "Similar to Exclusions, I owned end-to-end design of other areas in the release — Case Dashboard, Case Details, Risk Spotter, Vulnerability Assessments, and ATA Setup.",
        sections: [
          {
            id: "beyond-exclusions-overview",
            title: "Beyond Exclusions: Threat analytics landscape",
            text: "Similar to Exclusions, I owned end to end design of other areas such as the Case Dashboard, Case details, Risk Spotter, Vulnerability assessments and ATA setup for the v.12.2.1 release. The carousel shows a few screens of before and after across these areas.",
            exhibit: {
              type: "carousel",
              src: "",
              caption: "Before and after screens across Case Dashboard, Case Details, Risk Spotter, Vulnerability Assessments and ATA Setup.",
              slides: [
                { src: "/images/case-studies/guardium-exclusion-builder/Dashboard1.png", caption: "Case Dashboard" },
                { src: "/images/case-studies/guardium-exclusion-builder/Case details.png", caption: "Case Details" },
                { src: "/images/case-studies/guardium-exclusion-builder/VA.png", caption: "Vulnerability Assessments" },
              ],
            },
          },
        ],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/**
 * Returns the stripped-down representation of every phase that is safe to send
 * to a locked visitor's browser. No detail, no exhibits, no sections, no video
 * URLs — only what is needed to render the collapsed rows.
 */
export function getLockedPhaseSummaries(phases: Phase[]): LockedPhase[] {
  return phases.map(({ id, title, summary, status }) => ({
    id,
    title,
    summary,
    ...(status ? { status } : {}),
  }));
}

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
  summary: string;          // 1–2 sentences, shown collapsed
  detail?: string;          // full markdown content, shown expanded (standard phases)
  exhibits?: Exhibit[];
  sections?: PhaseSection[]; // paired layout: each section has its own exhibit
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
      "From a vague 'summarize any page' feature request to a validated, evidence-driven insight system; discovery tooling, synthesis, data-science handoff, and ongoing build collaboration.",
    phases: [
      {
        id: "reframe",
        title: "The reframe",
        summary:
          "The original ask treated summarization as compression. Voice-of-customer research said otherwise.",
        detail: `The AI team was asked to build a summarization feature: let users summarize any page such as a work order, an asset, a list. It sounded simple. It wasn't the right problem.

Looking at a Voice-of-Customer corpus of 24 "day in the life" interviews across asset managers, maintenance supervisors, and technicians, the pattern was clear: users weren't asking to read less. They were asking to understand faster. The real friction wasn't information volume, it was fragmentation; the same person checking six systems, three tabs, and a stack of paper before they could answer one question: what actually needs my attention right now?

From "summarize a record" to "surface a decision" became the thesis for everything that followed.

> "Users do not want more information. Users want help connecting information."
> — synthesized finding, 9.3 AI Capabilities research playback`,
        exhibits: [],
      },
      {
        id: "discovery-tooling",
        title: "Discovery tooling | BOB + VOC corpus",
        summary:
          "Built a custom AI research agent to make 24+ interviews queryable, not just readable.",
        detail: `Reading 24 long-form interviews once and pulling a few quotes wasn't going to hold up to the scale of patterns needed across personas, roles, and industries. Instead of treating the interviews as static documents, I structured them as a working research corpus; my first real, hands-on use of BOB, built with my team lead. I adapted the approach from a pattern used on another project, then refined the prompts and schema for this use case.

What I built, concretely:

**A custom BOB agent mode** ("voc-analyst"), a scoped role with its own permissions and a strictly enforced schema for any interview file the agent created: structured frontmatter (participant, role, industry, company, experience, location, assets managed, key challenges, tools used) followed by a narrative summary. This is what made the corpus consistent enough to query, rather than 24 differently-shaped documents.

**An MCP server** ("virtual-voc") giving the agent tools to search, retrieve, and get stats across the corpus, so patterns could be pulled systematically instead of relying on memory or manual re-reading.

**A calibration set**; seed content including reference KPIs and a sample use case, used to lock in the format and validate the agent's output before running it against real customer interviews.

**A feasibility check, not just a wishlist**; the corpus sat alongside a folder documenting the Maximo AI Assistant's existing tool architecture. Every opportunity area coming out of discovery could be checked against what the assistant could technically already do, keeping synthesis grounded in feasibility rather than aspirational feature requests.`,
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
          "Persona-level painpoints, mapped to real Maximo data objects so design intent traced to what the system could build.",
        detail: `Working with the highest-impact personas; Asset Manager and Maintenance Supervisor, painpoints were broken down on a Mural board, run in parallel with the mobile/technician design team covering their side of the product.

For Maintenance Supervisors specifically, two use cases surfaced clearly:

1. **Shift-handoff summary**: What happened overnight, what's still blocked, what needs immediate attention.
2. **Prioritize today's work**: What's new, what's urgent, what's blocked, ranked by safety and production impact.

Each opportunity was then broken down to the level of what Maximo data it would actually require; objects, relationships, and fields (WORKORDER, ASSET, WPMATERIAL, WFASSIGNMENT, and more) so the design intent could be traced directly to what the system could realistically surface. This wasn't a nice-to-have step; it's what made the handoff to engineering actionable instead of aspirational.`,
        exhibits: [
          { type: "image", src: "/images/case-studies/Summarization 9.3/Mural snapshot.png", caption: "Mural synthesis; persona painpoints → AI summary opportunity → what should be included" },
        ],
      },
      {
        id: "handoff",
        title: "Handoff to data science",
        summary:
          "A structured spec, not a slide deck: inclusion criteria and object mapping the engineering team could build against.",
        detail: `The synthesis; inclusion criteria, object/field mapping, and example outputs was packaged into a structured spec and handed to the Data Science team building the summarization config engine, as a Jira story with explicit acceptance criteria: findings documented, information needs synthesized, playback delivered, and full traceability from research evidence to every recommendation.

The same process ran in parallel for the technician/mobile side, led by colleagues on that team, using the same inclusion-criteria structure so both halves of the product could converge on one architecture rather than diverging into two.`,
        exhibits: [
          { type: "image", src: "/images/case-studies/Summarization 9.3/Data science doc handoff.png", caption: "Snapshot of hand off document with Maximo object structure and field mapping for every AI information need" },
        ]
      },
      {
        id: "build-collaboration",
        title: "Staying in the build",
        summary:
          "Handoff wasn't the end, ongoing collaboration to simplify a config architecture that outgrew itself.",
        detail: `The intent/input/output framework the Data Science team built, defining what the summary should contain, what data to pull, how to analyze it, and how to format the output; needed continuous design input to stay grounded in real user needs rather than technical convenience.

That collaboration is ongoing. The config architecture the Data Science team built itself another BOB project, became more complex than it needed to be as capability grew. Currently working with them to simplify it, running a local instance of the config tool to test and propose a cleaner structure directly rather than only specifying requirements from the outside.`,
        exhibits: [
          { type: "image", src: "/images/case-studies/Summarization 9.3/Summary configuration tool.png", caption: "Current intent/input/output framework — mapping what each summary should surface, what Maximo data feeds it, and how the output is structured and formatted." },
        ],
        status: "in-progress",
      },
      {
        id: "validation",
        title: "Validating with users",
        summary:
          "5-participant UT: relevance was easy, trust had to be earned through evidence.",
        detail: `Skip the read and watch the [playback presentation](https://drive.google.com/file/d/1FqPvbvPGtKlvextDW7WSTdS8w28GVfKz/view?usp=sharing) from the user session.

Before committing further design direction, I planned and led a round of usability testing — 5 participants, evaluating early AI-insight concepts against three questions: what should surface first, what builds trust, and where AI actually reduces investigation effort.

What was learned:

Relevance was high (4.2/5) when information matched role context, but trust (3.4/5) didn't follow automatically. Trust wasn't driven by AI confidence scores; it was driven by visible evidence and transparency in the reasoning.

Participants converged on five recurring information needs, regardless of role: what's urgent, what's blocked, what's broken, what happened before, why this matters.

Five concrete design principles emerged and are now shaping the OOTB AI direction for Maximo: progressive disclosure, always show evidence, surface exceptions over routine status, pair current state with historical context, and always recommend a next action.`,
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
          "Discovery and validation are done. Config simplification is active now.",
        detail: `This work is still in motion. Discovery and validation are complete; the config architecture simplification is active right now. That's an honest reflection of what strategic AI design work actually looks like; it's not a single ship date, it's a design system that keeps getting refined as the underlying capability matures.

[Watch a quick preview of the future insight generation tool](https://drive.google.com/file/d/1A9EkFnc6JDhEc2rT87gW1xusv1eRz7n1/view?usp=sharing) — this is a conceptual idea of how we can better onboard users to configure different insights.

What this project demonstrates:
- Reframing a feature request into the right problem, grounded in evidence rather than assumption
- Building the discovery infrastructure itself when off-the-shelf methods wouldn't scale
- Translating design intent into a spec engineers could build against, and staying embedded through the build, not just at handoff
- Closing the loop with real users, and letting what they said reshape the direction rather than confirm it`,
        exhibits: [],
        status: "in-progress",
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
    heroCaption: "Quick preview of the Maximo Assistant — reasoning trace shown for a simple query as it plans, retrieves, and generates results.",
    heroPlaybackRate: 1.4,
    summary:
      "I planned the validation methodology, built the recruiting and participant infrastructure, ran and note-took every session, synthesized findings across 8 users from 3 companies, and brought results to an executive playback that shaped 9.3 priorities.",
    phases: [
      {
        id: "methodology",
        title: "Designing the validation plan",
        summary:
          "Before any prototype went in front of a user, I wrote the plan: what we were testing, how we'd measure it, and what success looked like.",
        sections: [
          {
            id: "methodology-context",
            title: "",
            text: "When I joined the team, several designers were shipping a growing set of agentic capabilities for the Maximo Assistant. None of it had been validated with real users. My first owned project was closing that gap.\n\nI started by writing a proper validation plan, not just a script. That meant defining:",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/validation%20plan.png", caption: "Validation plan — objectives, methodology, and task scenarios." },
          },
          {
            id: "methodology-detail",
            title: "What the plan covered",
            text: "**The goal** — Understand whether the assistant behaves the way users expect when completing common asset management tasks. Does it surface the right information at the right time? Does it help people make confident decisions? Does it actually fit into their workflow, or does it feel bolted on?\n\n**The scope** — Every feature currently planned for 9.2, plus a few post-9.2 items like RAG based document search, tested early so we'd have signal before they were fully built.\n\n**The method** — Moderated sessions over Teams, using a clickable Figma prototype, so we could watch people think out loud rather than just collect survey answers.\n\n**The tasks** — Five scenarios that built on each other rather than testing features in isolation: launch the assistant and take a tour, run a simple query that returns a large list of assets, investigate the condition of a single asset, follow up with a general knowledge question, then repeat the condition check across multiple assets. Each task got harder and more realistic than the last.\n\n**The metrics** — Task success without moderator help, a post task trust rating on a 7 point scale, and separate single item measures for perceived usefulness and effort. I wanted numbers we could compare across rounds, not just anecdotes.\n\nI ran this with two teammates, Jen and Danial, rotating facilitator and note taker roles across sessions so no single person's fatigue or bias shaped every transcript.",
          },
        ],
      },
      {
        id: "recruiting",
        title: "Recruiting and participant infrastructure",
        summary:
          "Structured, personal outreach across three real companies, tracked closely enough to know who we'd spoken to before and what they cared about.",
        sections: [
          {
            id: "recruiting-context",
            title: "",
            text: "We recruited 8 participants across three rounds and three companies, covering roles from asset managers and maintenance planners to solutions architects and admins. The last 2 participants landed in a third round after the original two-round schedule. This wasn't a recruiting panel, it was direct outreach to people who actually use Maximo, many of whom we'd spoken to in a previous 9.1 round.\n\nI wrote and sent the outreach emails myself, tracked every reply, and kept a running record of who'd been contacted, what they said, what role they were being slotted into, and who they'd referred us to. When a contact suggested other people at their company, I followed up specifically to understand each new person's role before inviting them, so we weren't guessing whether someone was actually relevant to the study.\n\nThis is the same instinct that later became the reusable participant tracking system I built for future studies. Here, at the very start, it looked like a detailed spreadsheet of names, roles, companies, and conversation history. It worked because every contact had context attached to them, not just an email address.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Participant%20structure.png", caption: "Participant repository built on Monday — 45+ contacts across multiple orgs and 12+ roles, structured for cross-study reuse." },
          },
        ],
      },
      {
        id: "sessions",
        title: "Running the sessions",
        summary:
          "Moderated, hour long sessions with a shared note taking structure so findings could actually be compared across participants.",
        sections: [
          {
            id: "sessions-detail",
            title: "",
            text: "Each session followed the same shape: a short introduction and consent step, screener questions about the participant's role and Maximo experience, then the five task scenarios, then a closing questionnaire.\n\nI built the note taking template so that facilitator and note taker roles could rotate across sessions without losing consistency. Every session captured the same structure: what the script asked, what the participant did, and what they said, side by side, so synthesis later wasn't a matter of interpreting scattered notes.\n\nOne thing that stands out from the raw session transcripts: participants gave us more than surface reactions. In one session, a Maximo admin for a facilities focused organization walked us through his actual workaround process, building a separate data warehouse outside Maximo because cross application queries were too slow inside the tool. That kind of detail doesn't show up in a survey. It only comes out when someone is thinking out loud in front of you, which is exactly why we chose moderated sessions over a self serve survey.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Script%2C%20session%20notes.png", caption: "Session script and live note-taking doc — facilitator prompts written to be non-leading, with a parallel column for the note-taker to capture what the participant did and said without interrupting." },
          },
        ],
      },
      {
        id: "current-state",
        title: "What we learned",
        summary:
          "Before testing the assistant, we measured how hard the job already was. It set the bar for what the AI needed to beat.",
        sections: [
          {
            id: "current-state-detail",
            title: "",
            text: "Two baseline questions anchored the whole study: how easy is it to find information in Maximo today, and how easy is it to understand an asset's condition today.\n\nFinding data rated 5.6 out of 7, somewhat easy, but only once someone already knew what they were looking for. Participants relied heavily on prior knowledge of the system rather than being guided to information. Difficulty spiked when projects were closed, when service records had many linked entries, or when someone had to cross from one application into another.\n\nUnderstanding asset condition rated a full point and a half lower, 4 out of 7. This wasn't a tooling gap, it was a synthesis problem. Participants described manually pulling together work orders, work order history, meter data, logs, inspections, and notes, then holding all of it in their head to form a judgment. One participant put it plainly: he'd use Maximo as a starting point, then go find a technician and ask them what was really going on.\n\nThat gap, between being able to find records and being able to understand what's actually happening, became the lens for everything we tested next.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Base%20line%20rating.png", caption: "Baseline ratings for current Maximo experience — 5.6/7 for finding data, 4/7 for understanding asset condition. The gap between locating records and synthesising them set the bar for what the assistant needed to beat." },
          },
        ],
      },
      {
        id: "findings",
        title: "Testing each AI capability",
        summary:
          "We tested five capability areas. Reasoning and confirmation was the big one, but every capability taught us something specific.",
        sections: [
          {
            id: "chat-history",
            title: "Chat history",
            text: "Chat history aligned closely with what people already expected from a chat tool. Everyone understood the list as previous conversations, recognized chronological grouping and pinned chats, and expected clicking into a chat to resume or review it, similar to any consumer chat app. Renaming a conversation and pinning it for later were both used naturally, without us explaining how. The main gap was scale: conversation titles were often unclear or truncated, and 3 of 8 participants suggested AI-summarized titles and better grouping as history grows.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/other%20capabilitys.png", caption: "Testing summary across assistant launch, quick starters, and chat history — three capabilities users navigated without guidance." },
          },
          {
            id: "normal-query",
            title: "Finding records with a simple query",
            text: "This was a basic test, asking the assistant to find assets at a specific site with open work orders. All 8 participants valued the expanded results view, it made scanning the response far easier than the default inline reply. But a good first answer just raised the next question. Several participants immediately wanted to refine the query rather than stop at the initial results, check which assets had the most work orders tied to them, or add more analytical depth like work order type and actual duration. That's the right instinct to build toward, an assistant that supports investigation, not one that ends it after one answer.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Simple%20query%201.png", caption: "Reasoning (query tool) findings — 8/8 valued the reasoning trace for transparency, 7/8 interpreted it correctly, but technical language created friction." },
          },
          {
            id: "condition-assessment",
            title: "Condition assessment, single and multiple assets",
            text: "Single asset insights were where the assistant felt most immediately useful. People understood insights as summaries of condition, historical data, and action oriented health evaluations, exactly how they already evaluate assets manually. One participant said it was very close to evaluation work I perform manually. The friction was presentation, the default view felt too long and dense, and three participants asked for a way to copy the generated insight out.\n\nMulti-asset insights were valued too, but participants outgrew asset by asset summaries fast. Once you're looking at five pumps instead of one, you don't want five separate paragraphs, you want the pattern across them. One participant put it directly: tell me what's important across these assets, not just what's happening to each one. That single line became one of the clearest signals for what 9.3 needed to prioritize, fleet level summaries and root cause patterns, not repeated single asset templates.",
            exhibit: { type: "carousel", src: "", caption: "Single and multi-asset condition insight findings", slides: [
              { src: "/images/case-studies/9.2%20validation%20plan/single%20asset.png", caption: "Single asset insight — strongly aligned with how users already evaluate assets manually. Key ask: a way to copy insights out." },
              { src: "/images/case-studies/9.2%20validation%20plan/mult%20asset%20.png", caption: "Multiple asset insight — users valued it, but wanted cross-asset patterns and priorities, not repeated per-asset summaries." },
            ]},
          },
          {
            id: "gen-llm",
            title: "General knowledge, with and without references",
            text: "When the assistant answered from general knowledge rather than Maximo data, with no reference attached, 100% of participants correctly understood the distinction. People shifted naturally from what happened to how do I fix it, and several immediately asked follow up questions like whether replacement parts were available.\n\nWhen references were introduced, source visibility became the real sticking point. Everyone saw value in references for validating information and accessing documentation, but 5 of 8 wanted stronger visibility into exactly where information came from, and 3 of 8 remained uncertain about the actual source even after seeing the general knowledge label. That gap directly informed the case for investing further in document search and citation for 9.3.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Gen%20knowledge.png", caption: "General knowledge + references — 100% understood the distinction from Maximo data, but 3/8 remained uncertain of the actual source, directly informing the case for document search in 9.3." },
          },
          {
            id: "reasoning-confirmation",
            title: "Reasoning and confirmation, the big one",
            text: "This was the capability we spent the most time validating, and it earned that attention. All 8 participants valued the reasoning trace for transparency, trust, and understanding what the assistant was doing, and 7 of 8 interpreted it correctly the first time. It had a ceiling though, technical phrasing like href and single query operation confused people, and once they understood the assistant was repeating the same analysis pattern across multiple assets, the reasoning trace started to feel redundant rather than reassuring.\n\nConfirmation states worked for a similar reason. 7 of 8 correctly understood the continue or cancel step as validating the selected records before analysis, and people genuinely checked asset type, description, location, priority, and record count before deciding, real cognitive work. But Continue and Cancel didn't clearly communicate their consequences. We recommended changing the confirmation copy to something closer to Confirm records to generate insights, so the action matched the thinking users were already doing.\n\nConfidence scores followed the same pattern. 7 of 8 understood the rating correctly, but almost everyone wanted to know what was behind the number, which records contributed, how recent the data was, whether anything was missing. Confidence without evidence didn't fully land as trust.",
            exhibit: { type: "image", src: "/images/case-studies/9.2%20validation%20plan/Chat%20Assist%20UT%20-%20Current%20Experience.png", caption: "Reasoning and trust — 8/8 valued the reasoning trace, but technical terms like 'href' and 'single query operation' reduced clarity. Users wanted reasoning linked to records, not just shown." },
          },
        ],
      },
      {
        id: "outcome",
        title: "Synthesis, scores, and shaping 9.3",
        summary:
          "6.8/7 on productivity impact. 6.4/7 on condition insight value. And a set of clear, evidence backed priorities for what came next.",
        sections: [
          {
            id: "outcome-detail",
            title: "",
            text: "Across the closing questionnaire, participants rated the assistant's potential productivity impact at 6.8 out of 7, and the value of condition insights specifically at 6.4 out of 7. Trust in the reasoning explanation landed lower, at 5.8, reflecting the gap between understanding what it's doing and fully trusting why it's doing it, which is exactly the distinction that later became central to the 9.3 summarization work.\n\nI synthesized findings across all 8 participants and brought them to a wider team playback, then to an executive session, where the results directly shaped 9.3 priorities:\n\nContext aware, role based workflows, moving the assistant from answering isolated questions toward supporting a full path from insight to follow up question to procedure to action.\n\nSource backed, explainable confidence, continued investment in document search and citation, plus clearer explanations of what data and reasoning sat behind every confidence score.\n\nBetter multi asset scanning and prioritization, surfacing shared root causes and ranked priority across assets instead of repeating the same single asset template.\n\nThis wasn't usability testing as a final check before ship. It was usability testing as the thing that decided what got built next.",
            exhibit: { type: "carousel", src: "", caption: "Outcome scores and 9.3 priorities shaped by testing", slides: [
              { src: "/images/case-studies/9.2%20validation%20plan/Final%20outcome%20results.png", caption: "Closing scores — 6.8/7 productivity impact, 6.4/7 condition insight value. Users understood and valued the assistant most when it helped them move from a question to a decision." },
              { src: "/images/case-studies/9.2%20validation%20plan/9.3%20priotieis.png", caption: "9.3 priorities shaped directly by testing — context-aware workflows, source-backed confidence, multi-asset patterns, and evolving the assistant from retrieval toward action-oriented insights." },
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
      "Analysts needed a way to suppress known safe activity from generating threat cases, without losing control over what got blocked or why. I launched the exclusion rule builder inside Guardium's Active Threat Analytics from a rigid, all-inputs form into a guided, real-time, explainable builder, then supported it through to dev handoff and validated it with real users.",
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
            exhibit: { type: "video", src: "/images/case-studies/guardium-exclusion-builder/scheduler feature.mp4.mov", caption: "Scheduler feature — OOTB recurrence options and calendar preview, so analysts could define when a rule runs and see exactly which days it would trigger.", playbackRate: 1.5 },
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

// ─── Helper ───────────────────────────────────────────────────────────────────

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

// ─── Data types ──────────────────────────────────────────────────────────────

export interface Exhibit {
  type: "image" | "diagram";
  src: string;
  caption: string;
}

export interface Phase {
  id: string;
  title: string;
  summary: string;   // 1–2 sentences, shown collapsed
  detail: string;    // full markdown content, shown expanded
  exhibits?: Exhibit[];
  status?: "done" | "in-progress";
}

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  status: string;
  gated: boolean;
  summary: string;  // for /work index card
  phases: Phase[];
}

// ─── Case study data ──────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  // ── 1. AI Summarization ───────────────────────────────────────────────────
  {
    slug: "ai-summarization",
    title: "AI Summarization",
    role: "Lead Designer, AI Strategy & Discovery Squad — IBM Maximo Manage",
    timeline: "Jun 2026 – Present",
    status: "In progress",
    gated: false,
    summary:
      "From a vague 'summarize any page' feature request to a validated, evidence-driven insight system — discovery tooling, synthesis, data-science handoff, and ongoing build collaboration.",
    phases: [
      {
        id: "reframe",
        title: "The Reframe",
        summary:
          "The original ask treated summarization as compression. Voice-of-customer research said otherwise.",
        detail: `The AI team was asked to build a summarization feature: let users summarize any page — a work order, an asset, a list. It sounded simple. It wasn't the right problem.

Looking at a Voice-of-Customer corpus of 24 "day in the life" interviews across asset managers, maintenance supervisors, and technicians, the pattern was clear: users weren't asking to read less. They were asking to understand faster. The real friction wasn't information volume, it was fragmentation — the same person checking six systems, three tabs, and a stack of paper before they could answer one question: what actually needs my attention right now?

That reframe — from "summarize a record" to "surface a decision" — became the thesis for everything that followed.

> "Users do not want more information. Users want help connecting information."
> — synthesized finding, 9.3 AI Capabilities research playback`,
        exhibits: [],
        status: "done",
      },
      {
        id: "discovery-tooling",
        title: "Discovery Tooling — BOB + VOC Corpus",
        summary:
          "Built a custom AI research agent to make 24+ interviews queryable, not just readable.",
        detail: `Reading 24 long-form interviews once and pulling a few quotes wasn't going to hold up to the scale of patterns needed across personas, roles, and industries. Instead of treating the interviews as static documents, I structured them as a working research corpus — my first real, hands-on use of BOB, built with my team lead. I adapted the approach from a pattern used on another project, then refined the prompts and schema for this use case.

What I built, concretely:

**A custom BOB agent mode** ("voc-analyst") — a scoped role with its own permissions and a strictly enforced schema for any interview file the agent created: structured frontmatter (participant, role, industry, company, experience, location, assets managed, key challenges, tools used) followed by a narrative summary. This is what made the corpus consistent enough to query, rather than 27 differently-shaped documents.

**An MCP server** ("virtual-voc") giving the agent tools to search, retrieve, and get stats across the corpus — so patterns could be pulled systematically instead of relying on memory or manual re-reading.

**A calibration set** — seed content including reference KPIs and a sample use case — used to lock in the format and validate the agent's output before running it against real customer interviews.

**A feasibility check, not just a wishlist** — the corpus sat alongside a folder documenting the Maximo AI Assistant's existing tool architecture. Every opportunity area coming out of discovery could be checked against what the assistant could technically already do, keeping synthesis grounded in feasibility rather than aspirational feature requests.`,
        exhibits: [
          { type: "image", src: "", caption: "custom_modes.yaml — voc-analyst agent definition and enforced interview schema" },
          { type: "image", src: "", caption: "voc-corpus/interviews — 27 structured customer interviews" },
          { type: "image", src: "", caption: "tools/ — existing assistant capability reference, used for feasibility grounding" },
        ],
        status: "done",
      },
      {
        id: "synthesis",
        title: "Synthesis — Painpoints to Opportunity Areas",
        summary:
          "Persona-level painpoints, mapped to real Maximo data objects so design intent traced to what the system could build.",
        detail: `Working with the highest-impact personas — Asset Manager and Maintenance Supervisor — painpoints were broken down on a Mural board, run in parallel with the mobile/technician design team covering their side of the product.

For Maintenance Supervisors specifically, two use cases surfaced clearly:
1. Shift-handoff summary — what happened overnight, what's still blocked, what needs immediate attention
2. Prioritize today's work — what's new, what's urgent, what's blocked, ranked by safety and production impact

Each opportunity was then broken down to the level of what Maximo data it would actually require — objects, relationships, and fields (WORKORDER, ASSET, WPMATERIAL, WFASSIGNMENT, and more) — so the design intent could be traced directly to what the system could realistically surface. This wasn't a nice-to-have step; it's what made the handoff to engineering actionable instead of aspirational.`,
        exhibits: [
          { type: "image", src: "", caption: "Mural synthesis — persona painpoints → AI summary opportunity → what should be included" },
        ],
        status: "done",
      },
      {
        id: "handoff",
        title: "Handoff to Data Science",
        summary:
          "A structured spec, not a slide deck — inclusion criteria and object mapping the engineering team could build against.",
        detail: `The synthesis — inclusion criteria, object/field mapping, and example outputs — was packaged into a structured spec and handed to the Data Science team building the summarization config engine, as a Jira story with explicit acceptance criteria: findings documented, information needs synthesized, playback delivered, and full traceability from research evidence to every recommendation.

The same process ran in parallel for the technician/mobile side, led by colleagues on that team, using the same inclusion-criteria structure so both halves of the product could converge on one architecture rather than diverging into two.`,
        exhibits: [
          { type: "image", src: "", caption: "Jira acceptance criteria — synthesis, artifact linking, traceability" },
        ],
        status: "done",
      },
      {
        id: "build-collaboration",
        title: "Staying in the Build",
        summary:
          "Handoff wasn't the end — ongoing collaboration to simplify a config architecture that outgrew itself.",
        detail: `The intent/input/output framework the Data Science team built — defining what the summary should contain, what data to pull, how to analyze it, and how to format the output — needed continuous design input to stay grounded in real user needs rather than technical convenience.

That collaboration is ongoing. The config architecture the Data Science team built — itself another BOB project — became more complex than it needed to be as capability grew. Currently working with them to simplify it, running a local instance of the config tool to test and propose a cleaner structure directly rather than only specifying requirements from the outside.`,
        exhibits: [
          { type: "image", src: "", caption: "Intents, inputs, outputs — collaborative framework diagram" },
          { type: "image", src: "", caption: "AI Summary Configuration Framework — current vs. future admin mental model" },
        ],
        status: "in-progress",
      },
      {
        id: "validation",
        title: "Validating with Users",
        summary:
          "5-participant UT: relevance was easy, trust had to be earned through evidence.",
        detail: `Before committing further design direction, I planned and led a round of usability testing — 5 participants, evaluating early AI-insight concepts against three questions: what should surface first, what builds trust, and where AI actually reduces investigation effort.

What was learned:

Relevance was high (4.2/5) when information matched role context — but trust (3.4/5) didn't follow automatically. Trust wasn't driven by AI confidence scores; it was driven by visible evidence and transparency in the reasoning.

Participants converged on five recurring information needs, regardless of role: what's urgent, what's blocked, what's broken, what happened before, why this matters.

Five concrete design principles emerged and are now shaping the OOTB AI direction for Maximo: progressive disclosure, always show evidence, surface exceptions over routine status, pair current state with historical context, and always recommend a next action.`,
        exhibits: [
          { type: "image", src: "", caption: "Research metrics — relevance, trust, actionability, efficiency" },
          { type: "image", src: "", caption: "Five information needs, prioritization table with example insight text" },
        ],
        status: "done",
      },
      {
        id: "current-status",
        title: "Where This Stands",
        summary:
          "Discovery and validation are done. Config simplification is active now.",
        detail: `This work is still in motion. Discovery and validation are complete; the config architecture simplification is active right now. That's an honest reflection of what strategic AI design work actually looks like — it's not a single ship date, it's a design system that keeps getting refined as the underlying capability matures.

What this project demonstrates:
- Reframing a feature request into the right problem, grounded in evidence rather than assumption
- Building the discovery infrastructure itself when off-the-shelf methods wouldn't scale
- Translating design intent into a spec engineers could build against — and staying embedded through the build, not just at handoff
- Closing the loop with real users, and letting what they said reshape the direction rather than confirm it`,
        exhibits: [],
        status: "in-progress",
      },
    ],
  },

  // ── 2. 9.2 Usability Testing & Playback ──────────────────────────────────
  {
    slug: "usability-testing-playback",
    title: "9.2 Usability Testing & Playback",
    role: "Lead UX Designer",
    timeline: "2024",
    status: "Complete",
    gated: true,
    summary:
      "Structured the usability testing programme for the 9.2 release and drove playback to stakeholders — connecting research signal directly to release decisions.",
    phases: [
      {
        id: "tbd-1",
        title: "Phase TBD",
        summary: "Placeholder — phases to be defined.",
        detail: "**Placeholder — real copy and phases coming.**",
        status: "done",
      },
    ],
  },

  // ── 3. UXDRT ─────────────────────────────────────────────────────────────
  {
    slug: "uxdrt",
    title: "UXDRT",
    role: "Contributor",
    timeline: "2023",
    status: "Complete",
    gated: false,
    summary:
      "Contributed to the UX Design Research Toolkit — a shared resource that reduced redundant research set-up time across teams by ~40%.",
    phases: [], // UXDRT uses a single-page summary, not a phase stepper
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

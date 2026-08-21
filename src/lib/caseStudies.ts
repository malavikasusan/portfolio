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
    role: "Lead UX Designer",
    timeline: "2024",
    status: "In progress",
    gated: true,
    summary:
      "End-to-end design lead on an AI-powered summarization feature — from discovery tooling through synthesis, data-science handoff, and build collaboration.",
    phases: [
      {
        id: "discovery",
        title: "Discovery tooling",
        summary:
          "Built and ran discovery using BOB and the VOC corpus to surface latent user needs around information density and cognitive load.",
        detail:
          "**Placeholder — real copy coming.** This phase covers the research approach, tooling decisions, participant recruitment, and key artifacts produced during discovery.",
        status: "done",
      },
      {
        id: "synthesis",
        title: "Synthesis",
        summary:
          "Translated qualitative signals into a prioritised opportunity map shared across design, PM, and data science.",
        detail:
          "**Placeholder — real copy coming.** This phase covers affinity mapping, Jobs-to-be-Done framing, and the synthesis artefacts that drove alignment.",
        status: "done",
      },
      {
        id: "ds-handoff",
        title: "Handoff to Data Science",
        summary:
          "Defined model success criteria and edge-case taxonomy; co-created the evaluation rubric with the DS team.",
        detail:
          "**Placeholder — real copy coming.** Details the design–DS collaboration protocol, the artefacts handed off, and how quality criteria were negotiated.",
        status: "done",
      },
      {
        id: "build",
        title: "Build collaboration",
        summary:
          "Embedded with engineering during build to resolve interaction edge cases and maintain design intent under technical constraint.",
        detail:
          "**Placeholder — real copy coming.** Covers sprint-level design support, decision log, and the trade-offs accepted during implementation.",
        status: "done",
      },
      {
        id: "validation",
        title: "Validation (UT)",
        summary:
          "Ran moderated usability tests to validate comprehension and trust; iterated on summary presentation format.",
        detail:
          "**Placeholder — real copy coming.** Test plan, participant profiles, key findings, and the design changes made post-research.",
        status: "done",
      },
      {
        id: "current",
        title: "Current status",
        summary:
          "Feature is live in limited availability; monitoring satisfaction and time-on-task metrics post-launch.",
        detail:
          "**Placeholder — real copy coming.** Post-launch metrics, open questions, and next planned iteration.",
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

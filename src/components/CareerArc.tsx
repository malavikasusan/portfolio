"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OrgPart = { text: string; href?: string };

interface CareerEntry {
  id: string;
  period: string;
  role: string;
  orgParts: OrgPart[];
  detail: React.ReactNode;
}

const career: CareerEntry[] = [
  {
    id: "ibm-alm",
    period: "Jan 2026 – present",
    role: "Product Designer, Asset Lifecycle Management",
    orgParts: [
      { text: "IBM Sustainability, " },
      { text: "Maximo Manage", href: "https://www.ibm.com/products/maximo" },
    ],
    detail:
      "Selected for an internal move to a newly formed AI squad based on a leadership track record in Data Security. Design owner for the 9.3 summarization capability, drove it from a vague feature request into a validated, evidence-backed AI insight system, including a custom MCP-integrated research agent and a self-coded summary generator now adopted by Platform teams. Leading context and clarification design for Maximo Assistant 9.3, covering 15 use-case categories with structured behaviour rules and confidence-driven decision frameworks.",
  },
  {
    id: "ibm-security",
    period: "Mar 2024 – Jan 2026",
    role: "UX Lead, Risk Management",
    orgParts: [
      { text: "IBM Data Security, " },
      { text: "Guardium Data Protection", href: "https://www.ibm.com/products/guardium-data-protection#overview" },
    ],
    detail:
      "Promoted from product designer to UX lead. Led design across Threat Analytics and Vulnerability Management, defining risk, trust, and behavioural analytics journeys including dashboard modernisation, configuration, and AI-assisted investigation workflows aligned to Carbon Design System. Launched conversational GenAI flows for CEL/SQL translation, policy generation, and threat summarisation using watsonx.ai, reducing investigation effort by 12x.",
  },
  {
    id: "chainlink",
    period: "Jul 2023 – Mar 2024",
    role: "Product Designer (Contract)",
    orgParts: [
      { text: "Chainlink", href: "https://chain.link/" },
    ],
    detail:
      "Simplified complex blockchain and smart-contract workflows for Console, Chainlink's unified on-chain services dashboard, within a 3-person design pod. Owned trigger configuration, data-fetch steps, template-based flow creation, and a live Solidity code preview. Led design of a unified adaptive navigation system replacing fragmented per-product headers across ~20+ surfaces.",
  },
  {
    id: "msc",
    period: "Sept 2022 – Dec 2023",
    role: "MSc in Interaction & Experience Design",
    orgParts: [
      { text: "University of Limerick", href: "https://www.ul.ie/study/postgraduate/interaction-and-experience-design-ma-or-msc" },
      { text: ", Ireland" },
    ],
    detail: null,
  },
  {
    id: "hypersonix",
    period: "Jul 2021 – Jul 2022",
    role: "Product Designer",
    orgParts: [
      { text: "Hypersonix.ai", href: "https://hypersonix.ai/" },
    ],
    detail:
      "Launched App Studio, a demand-forecasting tool covering the full pipeline as a user-facing experience. Designed Ask Jarvix, a natural-language search interface for enterprise data queries sitting across two backend systems. Helped establish Sonic Design System, Hypersonix's 0-to-1 design system, and contributed to Profit-GPT, a BI dashboard for retail profitability analytics.",
  },
  {
    id: "aphelia",
    period: "Jul 2020 – Jul 2021",
    role: "Product Designer",
    orgParts: [
      { text: "Aphelia Innovations", href: "https://www.apheliainnovations.com/" },
    ],
    detail:
      "Progressed from intern to full-time in 2 months. Owned 0-to-1 design for two financial-domain products, converting manual Excel workflows into monitoring software and building a loan-model-ratio calculator. Designed DigiDonor (QR-based charity app) and contributed onboarding design for Sevaro, a WCAG 2.0-compliant telehealth app.",
  },
  {
    id: "architecture",
    period: "2016 – 2020",
    role: "Associate Design Lead",
    orgParts: [
      { text: "Architecture — " },
      { text: "Atelier D'Arts", href: "https://share.google/AxeYLSf7lHxyQ1Myu" },
      { text: ", " },
      { text: "Flying Elephant Studio", href: "https://flyingelephant.in/" },
      { text: ", " },
      { text: "Talati & Panthaky Associates", href: "https://talatiandpartners.com/" },
    ],
    detail:
      "Four years across architecture studios in Bangalore and Mumbai, spatial design, complex systems, and client-facing project delivery. Built a foundation in systems thinking that continues to inform product and UX practice. Transitioned into product design via an MSc in Interaction & Experience Design at the University of Limerick.",
  },
  {
    id: "barch",
    period: "2012 – 2013",
    role: "Bachelor of Architecture",
    orgParts: [
      { text: "HCCA", href: "https://holycrescentcollege.edu.in/" },
      { text: ", Kochi, India" },
    ],
    detail: null,
  },
];

function OrgLine({ parts }: { parts: OrgPart[] }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        color: "var(--color-muted)",
        letterSpacing: "0.03em",
        margin: 0,
      }}
    >
      {parts.map((p, i) =>
        p.href ? (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            {p.text}
          </a>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </p>
  );
}

const orgLinkStyle: React.CSSProperties = {};

export default function CareerArc() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section style={{ marginBottom: "var(--space-16)" }}>
      {/* Section header — label left, resume button right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-2)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Career arc
        </span>

        {/* Resume — secondary style button */}
        <a
          href="/images/case-studies/Senior Product Designer_Malavika Susan_UX (2026).pdf"
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35em",
            fontSize: "var(--text-xs)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
            color: "var(--color-accent)",
            textDecoration: "none",
            border: "1px solid var(--color-accent)",
            borderRadius: "4px",
            padding: "0.3em 0.7em",
          }}
        >
          Resume
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
            <path
              d="M6 1v7M3.5 6l2.5 2.5L8.5 6M2 10h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Career list — always visible */}
      <div role="list">
        {career.map((entry) => {
          const isOpen = openId === entry.id;
          const hasDetail = !!entry.detail;

          return (
            <div
              key={entry.id}
              role="listitem"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <button
                onClick={() => hasDetail && toggle(entry.id)}
                aria-expanded={hasDetail ? isOpen : undefined}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: hasDetail ? "pointer" : "default",
                  padding: "var(--space-6) 0",
                  display: "grid",
                  gridTemplateColumns: "9.5rem 1fr auto",
                  gap: "var(--space-4)",
                  alignItems: "start",
                  textAlign: "left",
                  color: "var(--color-text)",
                }}
              >
                {/* Period */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-muted)",
                    letterSpacing: "0.03em",
                    lineHeight: "1.5rem",
                    whiteSpace: "nowrap",
                    paddingTop: "2px",
                  }}
                >
                  {entry.period}
                </span>

                {/* Role + org — org always visible to prevent layout jump */}
                <div>
                  <p
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    {entry.role}
                  </p>
                  <OrgLine parts={entry.orgParts} />
                </div>

                {/* Chevron — only when there's expandable detail */}
                {hasDetail ? (
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "block",
                      color: "var(--color-muted)",
                      lineHeight: 1,
                      userSelect: "none",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                ) : (
                  /* Spacer to keep grid alignment consistent */
                  <span style={{ width: "14px", display: "block" }} />
                )}
              </button>

              {/* Expanded detail */}
              {hasDetail && (
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="career-detail"
                        style={{
                          paddingLeft: "calc(9.5rem + var(--space-4))",
                          paddingRight: "calc(14px + var(--space-4))",
                          paddingBottom: "var(--space-8)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "var(--text-sm)",
                            color: "var(--color-muted)",
                            lineHeight: 1.7,
                          }}
                        >
                          {entry.detail as string}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
        <div style={{ borderTop: "1px solid var(--color-border)" }} />
      </div>
    </section>
  );
}

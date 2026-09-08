"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { Exhibit, Phase, PhaseSection } from "@/lib/caseStudies";

interface PhaseStepperProps {
  phases: Phase[];
}

const statusLabel: Record<NonNullable<Phase["status"]>, string> = {
  done: "Complete",
  "in-progress": "In progress",
};

function ExhibitBlock({ ex }: { ex: Exhibit }) {
  if (ex.gated) {
    return (
      <div
        style={{
          padding: "var(--space-6)",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "var(--space-3)",
          }}
        >
          Access required
        </p>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text)",
            lineHeight: 1.6,
            marginBottom: "var(--space-4)",
          }}
        >
          {ex.caption} — available on request.
        </p>
        <a
          href="mailto:you@example.com?subject=Portfolio access request"
          style={{
            display: "inline-block",
            fontSize: "var(--text-xs)",
            fontWeight: 500,
            color: "var(--color-accent)",
            border: "1px solid var(--color-accent)",
            padding: "var(--space-2) var(--space-4)",
            letterSpacing: "0.01em",
          }}
        >
          Request access →
        </a>
      </div>
    );
  }

  if (ex.type === "video") {
    return (
      <a
        href={ex.src || undefined}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          padding: "var(--space-4) var(--space-5)",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
          textDecoration: "none",
          cursor: ex.src ? "pointer" : "default",
          opacity: ex.src ? 1 : 0.5,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{ flexShrink: 0, color: "var(--color-accent)" }}
        >
          <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="6.5,5 11.5,8 6.5,11" fill="currentColor" />
        </svg>
        <span style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)", lineHeight: 1.5 }}>
          {ex.caption}
        </span>
      </a>
    );
  }

  // image / diagram — placeholder block
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-muted)",
          letterSpacing: "0.04em",
        }}
      >
        {ex.type} · {ex.src}
      </span>
    </div>
  );
}

export default function PhaseStepper({ phases }: PhaseStepperProps) {
  const [openId, setOpenId] = useState<string | null>(phases[0]?.id ?? null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div role="list">
      {phases.map((phase, index) => {
        const isOpen = openId === phase.id;

        return (
          <div
            key={phase.id}
            role="listitem"
            style={{
              borderTop: "1px solid var(--color-border)",
            }}
          >
            {/* ── Phase header (button) ── */}
            <button
              onClick={() => toggle(phase.id)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "var(--space-6) 0",
                display: "grid",
                gridTemplateColumns: "1.5rem 1fr auto",
                gap: "var(--space-4)",
                alignItems: "start",
                textAlign: "left",
                color: "var(--color-text)",
              }}
            >
              {/* Step number */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-muted)",
                  lineHeight: "1.5rem",
                  letterSpacing: "0.04em",
                  paddingTop: "2px",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title + summary */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    marginBottom: isOpen ? "var(--space-2)" : 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {phase.title}
                  </span>

                  {phase.status && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        color:
                          phase.status === "in-progress"
                            ? "var(--color-accent)"
                            : "var(--color-muted)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {statusLabel[phase.status]}
                    </span>
                  )}
                </div>

                {!isOpen && (
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-muted)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {phase.summary}
                  </p>
                )}
              </div>

              {/* Toggle indicator */}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  fontSize: "var(--text-lg)",
                  fontWeight: 300,
                  color: "var(--color-muted)",
                  lineHeight: 1,
                  userSelect: "none",
                  marginTop: "2px",
                }}
                aria-hidden
              >
                +
              </motion.span>
            </button>

            {/* ── Expanded content ── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      paddingLeft: "calc(1.5rem + var(--space-4))",
                      paddingBottom: "var(--space-8)",
                    }}
                  >
                    {phase.sections ? (
                      /* ── Sections layout: each section has subheading + exhibit + text ── */
                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
                        {phase.sections.map((section: PhaseSection) => (
                          <div key={section.id}>
                            {/* Subheading */}
                            <p
                              style={{
                                fontSize: "var(--text-sm)",
                                fontWeight: 600,
                                color: "var(--color-text)",
                                marginBottom: "var(--space-4)",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {section.title}
                            </p>

                            {/* Exhibit — paired with this section */}
                            <ExhibitBlock ex={section.exhibit} />

                            {/* Text — below the exhibit */}
                            <div
                              style={{
                                fontSize: "var(--text-sm)",
                                color: "var(--color-muted)",
                                lineHeight: 1.75,
                                marginTop: "var(--space-4)",
                              }}
                            >
                              <ReactMarkdown
                                components={{
                                  p: ({ children }) => (
                                    <p style={{ marginBottom: "var(--space-3)" }}>{children}</p>
                                  ),
                                }}
                              >
                                {section.text}
                              </ReactMarkdown>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* ── Standard layout: detail text + exhibits at the end ── */
                      <>
                        {/* Detail text — rendered as markdown */}
                        <div
                          style={{
                            fontSize: "var(--text-sm)",
                            color: "var(--color-muted)",
                            lineHeight: 1.75,
                            marginBottom:
                              phase.exhibits && phase.exhibits.length > 0
                                ? "var(--space-6)"
                                : 0,
                          }}
                          className="phase-detail"
                        >
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p style={{ marginBottom: "var(--space-4)" }}>{children}</p>
                              ),
                              strong: ({ children }) => (
                                <strong style={{ fontWeight: 600, color: "var(--color-text)" }}>{children}</strong>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote
                                  style={{
                                    borderLeft: "2px solid var(--color-accent)",
                                    paddingLeft: "var(--space-4)",
                                    margin: "var(--space-4) 0",
                                    color: "var(--color-muted)",
                                    fontStyle: "italic",
                                  }}
                                >
                                  {children}
                                </blockquote>
                              ),
                              ol: ({ children }) => (
                                <ol style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-4)" }}>{children}</ol>
                              ),
                              ul: ({ children }) => (
                                <ul style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-4)" }}>{children}</ul>
                              ),
                              li: ({ children }) => (
                                <li style={{ marginBottom: "var(--space-1)" }}>{children}</li>
                              ),
                            }}
                          >
                            {phase.detail}
                          </ReactMarkdown>
                        </div>

                        {/* Exhibits */}
                        {phase.exhibits && phase.exhibits.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "var(--space-4)",
                            }}
                          >
                            {phase.exhibits.map((ex, ei) => (
                              <figure key={ei} style={{ margin: 0 }}>
                                <ExhibitBlock ex={ex} />
                                {!ex.gated && ex.type !== "video" && ex.caption && (
                                  <figcaption
                                    style={{
                                      fontSize: "var(--text-xs)",
                                      color: "var(--color-muted)",
                                      marginTop: "var(--space-2)",
                                      fontFamily: "var(--font-mono)",
                                      letterSpacing: "0.02em",
                                    }}
                                  >
                                    {ex.caption}
                                  </figcaption>
                                )}
                              </figure>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Final border */}
      <div style={{ borderTop: "1px solid var(--color-border)" }} />
    </div>
  );
}

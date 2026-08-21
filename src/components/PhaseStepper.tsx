"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Phase } from "@/lib/caseStudies";

interface PhaseStepperProps {
  phases: Phase[];
}

const statusLabel: Record<NonNullable<Phase["status"]>, string> = {
  done: "Complete",
  "in-progress": "In progress",
};

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
                    {/* Detail text */}
                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-muted)",
                        lineHeight: 1.75,
                        marginBottom:
                          phase.exhibits && phase.exhibits.length > 0
                            ? "var(--space-6)"
                            : 0,
                      }}
                    >
                      {phase.detail}
                    </p>

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
                            {/* Placeholder exhibit block */}
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
                            {ex.caption && (
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import AutoplayVideo from "@/components/AutoplayVideo";
import CarouselBlock from "@/components/CarouselBlock";
import type { Exhibit, Phase, PhaseSection } from "@/lib/caseStudies";

interface PhaseStepperProps {
  phases: Phase[];
}

const statusLabel: Record<NonNullable<Phase["status"]>, string> = {
  done: "Complete",
  "in-progress": "In progress",
};

function ExhibitBlock({ ex }: { ex: Exhibit }) {
  if (ex.type === "carousel" && ex.slides) {
    return <CarouselBlock slides={ex.slides} caption={ex.caption} />;
  }

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
    // Inline player for non-gated .mov / .mp4 files
    if (!ex.gated && ex.src) {
      return (
        <figure style={{ margin: "0 0 40px" }}>
          <AutoplayVideo
            src={ex.src}
            style={{ width: "100%", display: "block" }}
            playbackRate={ex.playbackRate}
          />
          <figcaption
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-muted)",
              letterSpacing: "0.04em",
              marginTop: "var(--space-2)",
            }}
          >
            {ex.caption}
          </figcaption>
        </figure>
      );
    }
    // Gated or no-src: link pill
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

  // image / diagram — real image or placeholder
  if (ex.src) {
    return (
      <figure style={{ margin: "0 0 40px" }}>
        <img
          src={ex.src}
          alt={ex.caption}
          style={{ width: "100%", display: "block" }}
        />
        <figcaption
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.04em",
            marginTop: "var(--space-2)",
          }}
        >
          {ex.caption}
        </figcaption>
      </figure>
    );
  }

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
        marginBottom: "40px",
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
        {ex.type} · {ex.caption}
      </span>
    </div>
  );
}

export default function PhaseStepper({ phases }: PhaseStepperProps) {
  const [openId, setOpenId] = useState<string | null>(phases[0]?.id ?? null);
  // Mutable counter shared between the ol and li renderers to number pain-point items
  const liCounter = { current: 0 };

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
                      paddingRight: "calc(1.125rem + var(--space-4))",
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
                                marginBottom: "4px",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {section.title}
                            </p>

                            {/* Text — above the exhibit */}
                            <div
                              style={{
                                fontSize: "var(--text-sm)",
                                color: "var(--color-muted)",
                                lineHeight: 1.75,
                                marginBottom: "var(--space-4)",
                              }}
                            >
                              <ReactMarkdown
                                components={{
                                  p: ({ children }) => (
                                    <p style={{ marginBottom: "4px" }}>{children}</p>
                                  ),
                                }}
                              >
                                {section.text}
                              </ReactMarkdown>
                            </div>

                            {/* Exhibit — after the text (optional) */}
                            {section.exhibit && <ExhibitBlock ex={section.exhibit} />}
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
                              ol: ({ children }) => {
                                // Reset the per-list counter for pain-point items
                                liCounter.current = 0;
                                return (
                                  <ol
                                    style={{
                                      listStyle: "none",
                                      padding: 0,
                                      margin: "var(--space-4) 0",
                                    }}
                                  >
                                    {children}
                                  </ol>
                                );
                              },
                              ul: ({ children }) => (
                                <ul style={{ paddingLeft: "var(--space-6)", marginBottom: "var(--space-4)" }}>{children}</ul>
                              ),
                              li: ({ children }) => {
                                // Pain-point items: li > [strong "Title", " — body text..."]
                                // react-markdown renders the strong directly as first child (no p wrapper)
                                const nodes = Array.isArray(children) ? children : [children];
                                const firstNode = nodes[0];
                                const isPainPoint =
                                  firstNode !== null &&
                                  typeof firstNode === "object" &&
                                  "type" in (firstNode as object) &&
                                  (firstNode as React.ReactElement).type === "strong";

                                if (isPainPoint) {
                                  const [titleEl, ...bodyNodes] = nodes;
                                  liCounter.current += 1;
                                  const num = String(liCounter.current).padStart(2, "0");
                                  const title = (titleEl as React.ReactElement<{ children: React.ReactNode }>).props.children;
                                  return (
                                    <li style={{ marginBottom: "var(--space-6)" }}>
                                      {/* Red number */}
                                      <span
                                        style={{
                                          display: "block",
                                          fontFamily: "var(--font-mono)",
                                          fontSize: "var(--text-base)",
                                          fontWeight: 700,
                                          color: "#BC3B42",
                                          marginBottom: "var(--space-2)",
                                          letterSpacing: "0.04em",
                                        }}
                                      >
                                        {num}
                                      </span>
                                      {/* Bold red title */}
                                      <p
                                        style={{
                                          fontWeight: 700,
                                          color: "#BC3B42",
                                          fontSize: "var(--text-sm)",
                                          marginBottom: "var(--space-1)",
                                          lineHeight: 1.4,
                                        }}
                                      >
                                        {title}
                                      </p>
                                      {/* Body text */}
                                      <span style={{ color: "var(--color-muted)" }}>{bodyNodes}</span>
                                    </li>
                                  );
                                }
                                return (
                                  <li style={{ marginBottom: "var(--space-1)" }}>{children}</li>
                                );
                              },
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
                              <ExhibitBlock key={ei} ex={ex} />
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

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import AutoplayVideo from "@/components/AutoplayVideo";
import CarouselBlock from "@/components/CarouselBlock";
import type { Exhibit, Phase, PhaseSection, LockedPhase } from "@/lib/caseStudies";

const CASE_STUDY_CONTACT_EMAIL = "malavikasusan18@gmail.com";

// ── Exhibit helpers ───────────────────────────────────────────────────────────

function ExhibitPlaceholder({ caption }: { caption: string }) {
  return (
    <div
      style={{
        padding: "var(--space-4) var(--space-6)",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        borderRadius: "4px",
        marginBottom: "var(--space-6)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-muted)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Available after unlocking
      </p>
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-muted)",
          lineHeight: 1.5,
          marginTop: "var(--space-1)",
          marginBottom: 0,
        }}
      >
        {caption}
      </p>
    </div>
  );
}

function ExhibitBlock({ ex, locked }: { ex: Exhibit; locked?: boolean }) {
  if (locked || ex.gated) return <ExhibitPlaceholder caption={ex.caption} />;

  if (ex.type === "carousel" && ex.slides) {
    return <CarouselBlock slides={ex.slides} caption={ex.caption} />;
  }

  if (ex.type === "video") {
    if (ex.src) {
      return (
        <figure style={{ margin: "0 0 40px" }}>
          <AutoplayVideo src={ex.src} style={{ width: "100%", display: "block" }} playbackRate={ex.playbackRate} />
          <figcaption style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", letterSpacing: "0.04em", marginTop: "var(--space-2)" }}>
            {ex.caption}
          </figcaption>
        </figure>
      );
    }
    return <ExhibitPlaceholder caption={ex.caption} />;
  }

  if (ex.src) {
    return (
      <figure style={{ margin: "0 0 40px" }}>
        <img src={ex.src} alt={ex.caption} style={{ width: "100%", display: "block" }} />
        <figcaption style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", letterSpacing: "0.04em", marginTop: "var(--space-2)" }}>
          {ex.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <div style={{ width: "100%", aspectRatio: "16/9", backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", letterSpacing: "0.04em" }}>
        {ex.type} · {ex.caption}
      </span>
    </div>
  );
}

// ── Phase 1 content ───────────────────────────────────────────────────────────

function Phase1Content({ phase }: { phase: Phase }) {
  const liCounter = { current: 0 };
  return (
    <div style={{ paddingLeft: "calc(1.5rem + var(--space-4))", paddingRight: "calc(1.125rem + var(--space-4))", paddingBottom: "var(--space-8)" }}>
      {phase.sections ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
          {phase.sections.map((section: PhaseSection) => (
            <div key={section.id}>
              {section.title && (
                <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text)", marginBottom: "4px", letterSpacing: "-0.01em" }}>
                  {section.title}
                </p>
              )}
              <div style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)", lineHeight: 1.75, marginBottom: "var(--space-4)" }}>
                <ReactMarkdown components={{ p: ({ children }) => <p style={{ marginBottom: "4px" }}>{children}</p> }}>
                  {section.text}
                </ReactMarkdown>
              </div>
              {section.exhibit && <ExhibitBlock ex={section.exhibit} locked={section.exhibit.gated} />}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)", lineHeight: 1.75, marginBottom: phase.exhibits && phase.exhibits.length > 0 ? "var(--space-6)" : 0 }}
            className="phase-detail"
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => <p style={{ marginBottom: "var(--space-4)" }}>{children}</p>,
                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>{children}</a>,
                strong: ({ children }) => <strong style={{ fontWeight: 600, color: "var(--color-text)" }}>{children}</strong>,
                blockquote: ({ children }) => (
                  <blockquote style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "var(--space-4)", margin: "var(--space-4) 0", color: "var(--color-muted)", fontStyle: "italic" }}>
                    {children}
                  </blockquote>
                ),
                ol: ({ children }) => { liCounter.current = 0; return <ol style={{ listStyle: "none", padding: 0, margin: "var(--space-4) 0" }}>{children}</ol>; },
                ul: ({ children }) => <ul style={{ listStyle: "disc", paddingLeft: "var(--space-6)", marginBottom: "var(--space-4)" }}>{children}</ul>,
                li: ({ children }) => {
                  const nodes = Array.isArray(children) ? children : [children];
                  const firstNode = nodes[0];
                  const isPainPoint = firstNode !== null && typeof firstNode === "object" && "type" in (firstNode as object) && (firstNode as React.ReactElement).type === "strong";
                  if (isPainPoint) {
                    const [titleEl, ...bodyNodes] = nodes;
                    liCounter.current += 1;
                    const num = String(liCounter.current).padStart(2, "0");
                    const title = (titleEl as React.ReactElement<{ children: React.ReactNode }>).props.children;
                    return (
                      <li style={{ marginBottom: "var(--space-6)" }}>
                        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--text-base)", fontWeight: 700, color: "#BC3B42", marginBottom: "var(--space-2)", letterSpacing: "0.04em" }}>{num}</span>
                        <p style={{ fontWeight: 700, color: "#BC3B42", fontSize: "var(--text-sm)", marginBottom: "var(--space-1)", lineHeight: 1.4 }}>{title}</p>
                        <span style={{ color: "var(--color-muted)" }}>{bodyNodes}</span>
                      </li>
                    );
                  }
                  return <li style={{ display: "list-item", marginBottom: "var(--space-1)" }}>{children}</li>;
                },
              }}
            >
              {phase.detail}
            </ReactMarkdown>
          </div>
          {phase.exhibits && phase.exhibits.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {phase.exhibits.map((ex, ei) => <ExhibitBlock key={ei} ex={ex} locked={ex.gated} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Status labels ─────────────────────────────────────────────────────────────

const statusLabel: Record<NonNullable<Phase["status"]>, string> = {
  done: "Complete",
  "in-progress": "In progress",
};

// ── Password form (shown below the faded rows) ────────────────────────────────

function LockForm({ caseStudyTitle }: { caseStudyTitle: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const mailtoHref = `mailto:${CASE_STUDY_CONTACT_EMAIL}?subject=${encodeURIComponent(`Password request: ${caseStudyTitle}`)}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(
          res.status === 429
            ? "Too many attempts. Please wait a few minutes."
            : data?.error === "wrong_password"
            ? "That password did not work. Try again or request access."
            : "Something went wrong. Please try again."
        );
        setPassword("");
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-4)",
        width: "100%",
      }}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
      >
        <label
          htmlFor="lf-pw"
          style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text)", textAlign: "center" }}
        >
          Enter password
        </label>

        <input
          id="lf-pw"
          ref={inputRef}
          type="password"
          value={password}
          autoComplete="current-password"
          disabled={loading}
          onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }}
          placeholder="Password"
          aria-describedby={error ? "lf-error" : undefined}
          style={{
            width: "100%",
            fontSize: "var(--text-sm)",
            color: "var(--color-text)",
            background: "transparent",
            border: `1px solid ${error ? "#BC3B42" : "var(--color-border)"}`,
            borderRadius: "6px",
            padding: "var(--space-3) var(--space-4)",
            outline: "none",
          }}
        />

        <p
          id="lf-error"
          role="alert"
          aria-live="polite"
          style={{ fontSize: "var(--text-xs)", color: "#BC3B42", minHeight: "1.2em", margin: 0, textAlign: "center", visibility: error ? "visible" : "hidden" }}
        >
          {error || " "}
        </p>

        <button
          type="submit"
          disabled={loading || !password.trim()}
          style={{
            width: "100%",
            fontSize: "var(--text-sm)",
            fontWeight: 500,
            color: "#fff",
            background: loading || !password.trim() ? "var(--color-text)" : "var(--color-accent)",
            border: `1px solid ${loading || !password.trim() ? "var(--color-text)" : "var(--color-accent)"}`,
            borderRadius: "6px",
            padding: "var(--space-3) var(--space-4)",
            cursor: loading || !password.trim() ? "not-allowed" : "pointer",
            opacity: loading || !password.trim() ? 0.5 : 1,
            transition: "background 120ms ease, border-color 120ms ease, opacity 120ms ease",
          }}
        >
          {loading ? "Checking..." : "Submit"}
        </button>
      </form>

      <a
        href={mailtoHref}
        style={{ fontSize: "var(--text-xs)", color: "var(--color-muted)", textDecoration: "underline", textUnderlineOffset: "2px" }}
      >
        Request password
      </a>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface LockedPhaseStepperProps {
  firstPhase: Phase;
  lockedPhases: LockedPhase[];
  caseStudyTitle: string;
}

export default function LockedPhaseStepper({ firstPhase, lockedPhases, caseStudyTitle }: LockedPhaseStepperProps) {
  const [phase1Open, setPhase1Open] = useState(true);

  return (
    <div role="list">
      {/* ── Phase 1: fully interactive ── */}
      <div role="listitem" style={{ borderTop: "1px solid var(--color-border)" }}>
        <button
          onClick={() => setPhase1Open((o) => !o)}
          aria-expanded={phase1Open}
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "var(--space-6) 0", display: "grid", gridTemplateColumns: "1.5rem 1fr auto", gap: "var(--space-4)", alignItems: "start", textAlign: "left", color: "var(--color-text)" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", lineHeight: "1.5rem", letterSpacing: "0.04em", paddingTop: "2px" }}>
            01
          </span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: phase1Open ? "var(--space-2)" : 0 }}>
              <span style={{ fontSize: "var(--text-base)", fontWeight: 500, letterSpacing: "-0.01em" }}>{firstPhase.title}</span>
              {firstPhase.status && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: firstPhase.status === "in-progress" ? "var(--color-accent)" : "var(--color-muted)", letterSpacing: "0.04em" }}>
                  {statusLabel[firstPhase.status]}
                </span>
              )}
            </div>
            {!phase1Open && (
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)", lineHeight: 1.6, margin: 0 }}>{firstPhase.summary}</p>
            )}
          </div>
          <motion.span
            animate={{ rotate: phase1Open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "block", color: "var(--color-muted)", lineHeight: 1, userSelect: "none", marginTop: "2px", flexShrink: 0 }}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {phase1Open && (
            <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
              <Phase1Content phase={firstPhase} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Phases 2+: locked rows fading into hero image, then form below ── */}
      {lockedPhases.length > 0 && (
        <>
          {/* Rows + fade + hero image — all in one relative container */}
          <div style={{ position: "relative" }}>
            {/* Locked rows — non-interactive */}
            <div aria-hidden="true" style={{ userSelect: "none", pointerEvents: "none" }}>
              {lockedPhases.map((phase, idx) => (
                <div key={phase.id} role="listitem" style={{ borderTop: "1px solid var(--color-border)" }}>
                  <div style={{ width: "100%", padding: "var(--space-6) 0", display: "grid", gridTemplateColumns: "1.5rem 1fr auto", gap: "var(--space-4)", alignItems: "start", textAlign: "left", color: "var(--color-text)", opacity: 0.6 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", lineHeight: "1.5rem", letterSpacing: "0.04em", paddingTop: "2px" }}>
                      {String(idx + 2).padStart(2, "0")}
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                        <span style={{ fontSize: "var(--text-base)", fontWeight: 500, letterSpacing: "-0.01em" }}>{phase.title}</span>
                        {phase.status && (
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: phase.status === "in-progress" ? "var(--color-accent)" : "var(--color-muted)", letterSpacing: "0.04em" }}>
                            {statusLabel[phase.status]}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)", lineHeight: 1.6, margin: 0, marginTop: "var(--space-1)" }}>{phase.summary}</p>
                    </div>
                    <span style={{ display: "block", color: "var(--color-muted)", lineHeight: 1, marginTop: "2px", flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--color-border)" }} />
            </div>

            {/* Fade gradient — fades rows into background */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(248,247,245,0.7) 0%, rgba(248,247,245,0.8) 20%, #F8F7F5 40%)",
                pointerEvents: "none",
              }}
            />

            {/* Hero image — overlapping row 03 */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(100%, 300px)",
                pointerEvents: "none",
                zIndex: 1,
              }}
              aria-hidden="true"
            >
              <img
                src="/images/password hero.jpeg"
                alt=""
                style={{ width: "100%", display: "block" }}
              />
            </div>

            {/* Password form — overlaid below the image */}
            <div
              style={{
                position: "absolute",
                top: "220px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(100%, 360px)",
                zIndex: 2,
                paddingBottom: "var(--space-8)",
              }}
            >
              <LockForm caseStudyTitle={caseStudyTitle} />
            </div>

            {/* Spacer: enough to contain image + form */}
            <div style={{ height: "580px" }} aria-hidden="true" />
          </div>
        </>
      )}
    </div>
  );
}

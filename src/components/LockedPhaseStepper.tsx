"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Phase, LockedPhase } from "@/lib/caseStudies";

const CASE_STUDY_CONTACT_EMAIL = "malavikasusan18@gmail.com";

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
  lockedPhases: LockedPhase[];
  caseStudyTitle: string;
}

/**
 * Shown to visitors without access. Every phase, including 01, is a collapsed,
 * faded row (titles + summaries only), with the password form over them.
 */
export default function LockedPhaseStepper({ lockedPhases, caseStudyTitle }: LockedPhaseStepperProps) {
  return (
    <div role="list">
      {/* Rows + fade sit behind the image + form, which alone sets the height */}
      <div style={{ position: "relative" }}>
        {/* Locked rows — non-interactive, clipped to the form's height (rows past
            the fade are invisible anyway) */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", userSelect: "none", pointerEvents: "none" }}>
          {lockedPhases.map((phase, idx) => (
            <div key={phase.id} role="listitem" style={{ borderTop: "1px solid var(--color-border)" }}>
              <div style={{ width: "100%", padding: "var(--space-6) 0", display: "grid", gridTemplateColumns: "1.5rem 1fr auto", gap: "var(--space-4)", alignItems: "start", textAlign: "left", color: "var(--color-text)", opacity: 0.6 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", lineHeight: "1.5rem", letterSpacing: "0.04em", paddingTop: "2px" }}>
                  {String(idx + 1).padStart(2, "0")}
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

        {/* Hero image + password form */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
            paddingBottom: "var(--space-8)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/password hero.jpeg"
            alt=""
            aria-hidden="true"
            style={{ width: "min(100%, 300px)", display: "block", pointerEvents: "none" }}
          />
          <div style={{ width: "min(100%, 360px)", marginTop: "22px" }}>
            <LockForm caseStudyTitle={caseStudyTitle} />
          </div>
        </div>
      </div>
    </div>
  );
}

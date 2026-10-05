"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

// TODO: Replace with your actual contact email if different
const CASE_STUDY_CONTACT_EMAIL = "malavikasusan18@gmail.com";

interface LockCardProps {
  caseStudyTitle: string;
}

export default function LockCard({ caseStudyTitle }: LockCardProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const mailtoHref = `mailto:${CASE_STUDY_CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Password request: ${caseStudyTitle}`
  )}`;

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
        if (res.status === 429) {
          setError("Too many attempts. Please wait a few minutes and try again.");
        } else {
          setError(
            data?.error === "wrong_password"
              ? "That password did not work. Try again or request access."
              : "Something went wrong. Please try again."
          );
        }
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
        padding: "var(--space-12) var(--page-gutter)",
        gap: "var(--space-6)",
      }}
    >
      {/* Envelope illustration */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        style={{ color: "var(--color-muted)" }}
      >
        {/* Envelope body */}
        <rect
          x="4"
          y="12"
          width="40"
          height="28"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Envelope flap (V) */}
        <polyline
          points="4,12 24,28 44,12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Lock circle on flap */}
        <circle
          cx="24"
          cy="34"
          r="5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Lock shackle */}
        <path
          d="M21 34v-2.5a3 3 0 0 1 6 0V34"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div style={{ textAlign: "center", maxWidth: "360px", width: "100%" }}>
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
        >
          <label
            htmlFor="lock-card-pw"
            style={{
              display: "block",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--color-text)",
              marginBottom: "var(--space-1)",
              textAlign: "center",
            }}
          >
            Enter password
          </label>

          <input
            id="lock-card-pw"
            ref={inputRef}
            type="password"
            value={password}
            autoComplete="current-password"
            disabled={loading}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e as unknown as React.FormEvent);
            }}
            placeholder="Password"
            aria-describedby={error ? "lock-card-error" : undefined}
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

          {/* Error message — announced to screen readers */}
          <p
            id="lock-card-error"
            role="alert"
            aria-live="polite"
            style={{
              fontSize: "var(--text-xs)",
              color: "#BC3B42",
              minHeight: "1.2em",
              margin: 0,
              visibility: error ? "visible" : "hidden",
            }}
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
              background: "var(--color-text)",
              border: "1px solid var(--color-text)",
              borderRadius: "6px",
              padding: "var(--space-3) var(--space-4)",
              cursor: loading || !password.trim() ? "not-allowed" : "pointer",
              opacity: loading || !password.trim() ? 0.5 : 1,
              transition: "opacity 120ms ease",
            }}
          >
            {loading ? "Checking..." : "Submit"}
          </button>
        </form>

        <a
          href={mailtoHref}
          style={{
            display: "inline-block",
            marginTop: "var(--space-4)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          Request password
        </a>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";

const PASSWORD = "younowhaveaccess";

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [reason, setReason] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === PASSWORD) {
      setUnlocked(true);
    } else {
      setError("Incorrect password. Try again, or request access below.");
      setPassword("");
      passwordRef.current?.focus();
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "var(--space-24) var(--page-gutter)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--space-12)",
        alignItems: "center",
      }}
    >
      {/* Tenor GIF — left column */}
      <div style={{ width: "100%", aspectRatio: "1.41593", overflow: "hidden", position: "sticky", top: "var(--space-24)" }}>
        <iframe
          src="https://tenor.com/embed/16109385"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          title="You don't have permission"
        />
      </div>

      {/* Form — right column */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>

        {/* Name + reason combined */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <label
            htmlFor="pg-reason"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--color-text)",
              letterSpacing: "-0.01em",
            }}
          >
            Name and where are you reaching out from?
          </label>
          <textarea
            id="pg-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="e.g. I'm a recruiter at Acme Co reviewing your application…"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text)",
              background: "transparent",
              border: "1px solid var(--color-border)",
              padding: "var(--space-3) var(--space-4)",
              outline: "none",
              resize: "vertical",
              width: "100%",
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <label
            htmlFor="pg-password"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--color-text)",
              letterSpacing: "-0.01em",
            }}
          >
            Password
          </label>
          <input
            id="pg-password"
            ref={passwordRef}
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="Enter password"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text)",
              background: "transparent",
              border: `1px solid ${error ? "#BC3B42" : "var(--color-border)"}`,
              padding: "var(--space-3) var(--space-4)",
              outline: "none",
              width: "100%",
            }}
          />
          {error && (
            <p style={{ fontSize: "var(--text-xs)", color: "#BC3B42", marginTop: "2px" }}>
              {error}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <button
            type="submit"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "#ffffff",
              background: "var(--color-text)",
              border: "1px solid var(--color-text)",
              padding: "var(--space-3) var(--space-6)",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            Submit
          </button>
          <a
            href={`mailto:malavikasusan18@gmail.com?subject=Requesting portfolio view access&body=${encodeURIComponent(reason)}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--color-text)",
              background: "transparent",
              border: "1px solid var(--color-border)",
              padding: "var(--space-3) var(--space-6)",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Request access
          </a>
        </div>
      </form>
    </div>
  );
}

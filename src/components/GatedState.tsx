export default function GatedState({ title }: { title: string }) {
  return (
    <div
      style={{
        padding: "var(--space-12) 0",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-muted)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "var(--space-4)",
        }}
      >
        Access required
      </p>
      <p
        style={{
          fontSize: "var(--text-base)",
          color: "var(--color-text)",
          marginBottom: "var(--space-6)",
          maxWidth: "440px",
          lineHeight: 1.65,
        }}
      >
        <strong>{title}</strong> contains confidential client work. Request
        access to view the full case study.
      </p>
      <a
        href="mailto:you@example.com?subject=Portfolio access request"
        style={{
          display: "inline-block",
          fontSize: "var(--text-sm)",
          fontWeight: 500,
          color: "var(--color-accent)",
          border: "1px solid var(--color-accent)",
          padding: "var(--space-3) var(--space-6)",
          letterSpacing: "0.01em",
          transition: "opacity 150ms ease",
        }}
      >
        Request access →
      </a>
    </div>
  );
}

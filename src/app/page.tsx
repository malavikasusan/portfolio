export default function Home() {
  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "var(--space-24) var(--space-6)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-muted)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "var(--space-8)",
        }}
      >
        — Coming soon
      </p>
      <h1
        style={{
          fontSize: "var(--text-3xl)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          marginBottom: "var(--space-6)",
        }}
      >
        Portfolio
      </h1>
    </div>
  );
}

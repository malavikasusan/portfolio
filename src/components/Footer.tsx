export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        marginTop: "var(--space-24)",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "var(--space-8) var(--page-gutter)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-xs)",
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            letterSpacing: "0.03em",
          }}
        >
          &copy; {year}
        </span>

        <span
          style={{
            fontSize: "var(--text-xs)",
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            letterSpacing: "0.03em",
          }}
        >
          Built with Next.js
        </span>
      </div>
    </footer>
  );
}

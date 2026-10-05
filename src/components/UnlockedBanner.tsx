interface UnlockedBannerProps {
  /** Path to redirect to after clearing the cookie, e.g. "/work/ai-summarization" */
  currentPath: string;
}

/**
 * A quiet server-rendered banner shown to unlocked visitors.
 * The "Lock again" link hits the /api/lock GET endpoint which clears the
 * cookie and redirects back to this page.
 */
export default function UnlockedBanner({ currentPath }: UnlockedBannerProps) {
  const lockHref = `/api/lock?next=${encodeURIComponent(currentPath)}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        marginBottom: "var(--space-4)",
        fontSize: "var(--text-xs)",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.04em",
        color: "var(--color-muted)",
      }}
    >
      {/* Small lock-open icon */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        style={{ color: "var(--color-muted)", flexShrink: 0 }}
      >
        <rect x="1.5" y="5.5" width="9" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M3.5 5.5V3.5a2.5 2.5 0 0 1 5 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
      <span>Unlocked</span>
      <span style={{ color: "var(--color-border)" }}>·</span>
      <a
        href={lockHref}
        style={{
          color: "var(--color-muted)",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
        }}
      >
        Lock again
      </a>
    </div>
  );
}

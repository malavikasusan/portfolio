import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "var(--space-24) var(--space-6)",
      }}
    >
      {/* Name + positioning */}
      <FadeIn>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "var(--space-6)",
          }}
        >
          Designer — Your Name
        </p>

        <h1
          style={{
            fontSize: "var(--text-3xl)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            marginBottom: "var(--space-8)",
            maxWidth: "560px",
          }}
        >
          I design products that earn trust through clarity.
        </h1>
      </FadeIn>

      {/* Short intro */}
      <FadeIn delay={0.08}>
        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-muted)",
            lineHeight: 1.7,
            maxWidth: "500px",
            marginBottom: "var(--space-16)",
          }}
        >
          UX lead at [Company]. I work across discovery, design systems,
          and research — typically on enterprise tooling and AI-adjacent
          product work.
        </p>
      </FadeIn>

      {/* Work entry points */}
      <FadeIn delay={0.14}>
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "var(--space-8)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "var(--space-6)",
            }}
          >
            Selected work
          </p>

          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            }}
          >
            {workItems.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/work/${item.slug}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "var(--space-6)",
                    paddingBottom: "var(--space-4)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  className="work-link"
                >
                  <span
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-muted)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {item.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/work"
            style={{
              display: "inline-block",
              marginTop: "var(--space-6)",
              fontSize: "var(--text-sm)",
              color: "var(--color-accent)",
              fontWeight: 500,
            }}
          >
            All case studies →
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

const workItems = [
  {
    slug: "ai-summarization",
    title: "AI Summarization",
    year: "2024",
  },
  {
    slug: "usability-testing-playback",
    title: "9.2 Usability Testing & Playback",
    year: "2024",
  },
  {
    slug: "uxdrt",
    title: "UXDRT",
    year: "2023",
  },
];

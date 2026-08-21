import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { caseStudies } from "@/lib/caseStudies";

export const metadata = {
  title: "Malavika — AI Designer",
  description:
    "Portfolio of Malavika, AI Designer — discovery, design systems, and research on enterprise and AI-adjacent products.",
};

export default function Home() {
  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "var(--space-24) var(--page-gutter)",
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
          Malavika — AI Designer
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
          I design AI products that earn trust through clarity.
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
          UX lead working at the intersection of AI and enterprise software.
          I work across discovery, design systems, and research — turning
          complex model behaviour into interfaces people can actually reason
          about.
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
            }}
          >
            {caseStudies.map((cs) => (
              <li key={cs.slug}>
                <Link
                  href={`/work/${cs.slug}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "var(--space-6)",
                    padding: "var(--space-4) 0",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                    }}
                  >
                    {cs.title}
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
                    {cs.timeline}
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

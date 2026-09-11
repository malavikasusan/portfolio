import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { caseStudies } from "@/lib/caseStudies";

export const metadata = {
  title: "Work",
  description: "Case studies and selected work",
};

export default function WorkIndex() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "var(--space-24) var(--page-gutter)",
      }}
    >
      {/* Header */}
      <FadeIn>
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
          Work
        </p>
        <h1
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-16)",
          }}
        >
          Case studies
        </h1>
      </FadeIn>

      {/* Case study list — reverse chronological */}
      <div>
        {caseStudies.map((cs, i) => (
          <FadeIn key={cs.slug} delay={i * 0.06}>
            <Link
              href={`/work/${cs.slug}`}
              style={{
                display: "block",
                paddingTop: "var(--space-8)",
                paddingBottom: "var(--space-8)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              {/* Row 1: title + year */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "var(--space-6)",
                  marginBottom: "var(--space-2)",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
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
              </div>

              {/* Row 2: role + status */}
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                  alignItems: "center",
                  marginBottom: "var(--space-4)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-muted)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {cs.role}
                </span>
                {cs.gated && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-muted)",
                      letterSpacing: "0.03em",
                      paddingLeft: "var(--space-4)",
                      borderLeft: "1px solid var(--color-border)",
                    }}
                  >
                    Gated
                  </span>
                )}
              </div>

              {/* Summary */}
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-muted)",
                  lineHeight: 1.65,
                }}
              >
                {cs.summary}
              </p>
            </Link>
          </FadeIn>
        ))}

        {/* Final border */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
          }}
        />
      </div>
    </div>
  );
}

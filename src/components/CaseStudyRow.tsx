import Link from "next/link";
import ProjectThumb from "@/components/ProjectThumb";
import { getHeroMedia, type CaseStudy } from "@/lib/caseStudies";

/** One case study in a list: hero thumbnail on the left, details on the right. */
export default function CaseStudyRow({ cs }: { cs: CaseStudy }) {
  const href = `/work/${cs.slug}`;

  return (
    <div
      className="cs-row"
      style={{
        paddingTop: "var(--space-8)",
        paddingBottom: "var(--space-8)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <ProjectThumb href={href} title={cs.title} media={getHeroMedia(cs)} />

      <Link href={href} style={{ display: "block", minWidth: 0 }}>
        {/* Row 1: title + timeline */}
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
            className="cs-timeline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-muted)",
              whiteSpace: "nowrap",
              flexShrink: 0,
              textAlign: "right",
            }}
          >
            {cs.slug === "uxdrt" ? (
              <>
                April 2026 – ongoing
                <span className="uxdrt-timeline-detail"> (9.2 release cycle to 9.3)</span>
              </>
            ) : (
              cs.timeline
            )}
          </span>
        </div>

        {/* Row 2: role + gated badge */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-4)",
            alignItems: "center",
            marginBottom: "var(--space-2)",
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
    </div>
  );
}

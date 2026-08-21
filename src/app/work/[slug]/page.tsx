import { notFound } from "next/navigation";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PhaseStepper from "@/components/PhaseStepper";
import GatedState from "@/components/GatedState";
import { getCaseStudy, caseStudies } from "@/lib/caseStudies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-generate all case study routes at build time
export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return {
    title: cs ? `${cs.title} — Work` : "Work",
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) notFound();

  // UXDRT is a single-page summary (no phase stepper)
  const isSinglePage = cs.slug === "uxdrt";

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "var(--space-24) var(--space-6)",
      }}
    >
      {/* Back link */}
      <FadeIn>
        <Link
          href="/work"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.04em",
            marginBottom: "var(--space-12)",
          }}
        >
          ← Work
        </Link>

        {/* Metadata row */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-6)",
            marginBottom: "var(--space-6)",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Role", value: cs.role },
            { label: "Timeline", value: cs.timeline },
            { label: "Status", value: cs.status },
          ].map(({ label, value }) => (
            <div key={label}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-muted)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "var(--space-1)",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text)",
                  letterSpacing: "0.02em",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "var(--space-6)",
          }}
        >
          {cs.title}
        </h1>

        {/* Summary */}
        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-muted)",
            lineHeight: 1.7,
            maxWidth: "520px",
            marginBottom: "var(--space-16)",
          }}
        >
          {cs.summary}
        </p>
      </FadeIn>

      {/* ── Content area ── */}
      <FadeIn delay={0.1}>
        {cs.gated ? (
          <GatedState title={cs.title} />
        ) : isSinglePage ? (
          /* UXDRT: single-page summary layout */
          <div>
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
                  marginBottom: "var(--space-4)",
                }}
              >
                Contribution overview
              </p>
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-muted)",
                  lineHeight: 1.75,
                  maxWidth: "520px",
                }}
              >
                Placeholder — full content coming. This case study will
                include a contribution summary, key metrics (e.g. ~40%
                reduction in redundant research set-up), and supporting
                artefacts.
              </p>
            </div>
          </div>
        ) : (
          /* Phase stepper */
          <PhaseStepper phases={cs.phases} />
        )}
      </FadeIn>
    </div>
  );
}

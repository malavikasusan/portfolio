import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PhaseStepper from "@/components/PhaseStepper";
import GatedState from "@/components/GatedState";
import AutoplayVideo from "@/components/AutoplayVideo";
import PasswordGate from "@/components/PasswordGate";
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
    <PasswordGate>
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "var(--space-24) var(--page-gutter)",
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

        {/* Title */}
        <h1
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "var(--space-4)",
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
            marginBottom: "var(--space-8)",
          }}
        >
          {cs.summary}
        </p>

        {/* Hero image / video */}
        {cs.slug === "guardium-exclusion-builder" ? (
          <>
            <AutoplayVideo
              src="/images/case-studies/guardium-exclusion-builder-hero.mov"
              style={{ width: "100%", display: "block" }}
            />
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-muted)",
                letterSpacing: "0.04em",
                marginTop: "var(--space-2)",
                marginBottom: "var(--space-4)",
              }}
            >
              Quick peek at the redesigned exclusion (aka rule builder) — used by security analysts to suppress known or repetitive activity. Skip the read and watch the{" "}
              <a
                href="https://drive.google.com/file/d/1AjvjkSlqH4rQFoM_LrqdSHxYcbZAM7Nm/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-accent)", textDecoration: "underline" }}
              >
                product demo here
              </a>
              . PS: crank it to 1.25× — it hits different.
            </p>
          </>
        ) : (
          <Image
            src={`/images/case-studies/${cs.slug}-hero.png`}
            alt={cs.title}
            width={720}
            height={405}
            style={{ width: "100%", height: "auto", display: "block", marginBottom: "var(--space-6)" }}
          />
        )}

      </FadeIn>

      {/* ── Content area ── */}
      <FadeIn delay={0.1}>
        {cs.gated ? (
          <GatedState title={cs.title} />
        ) : isSinglePage ? (
          /* UXDRT: single-page summary layout — content from caseStudies.ts */
          <div>
            <div
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "var(--space-8)",
                marginBottom: "var(--space-10)",
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
                }}
              >
                {cs.overview}
              </p>
            </div>

            {cs.numbers && (
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
                  By the numbers
                </p>
                <p
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--color-muted)",
                    lineHeight: 1.75,
                  }}
                >
                  {cs.numbers}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Phase stepper */
          <PhaseStepper phases={cs.phases} />
        )}
      </FadeIn>
    </div>
    </PasswordGate>
  );
}

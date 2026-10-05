import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import type { Metadata } from "next";

// Force dynamic rendering so cookies() is evaluated per-request, not at build time
export const dynamic = "force-dynamic";
import FadeIn from "@/components/FadeIn";
import PhaseStepper from "@/components/PhaseStepper";
import AutoplayVideo from "@/components/AutoplayVideo";
import LockedPhaseStepper from "@/components/LockedPhaseStepper";
import UnlockedBanner from "@/components/UnlockedBanner";
import {
  getCaseStudy,
  getLockedPhaseSummaries,
  caseStudies,
} from "@/lib/caseStudies";
import { verifyCookieValue, COOKIE_NAME } from "@/lib/auth";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Slugs that have the Medium-style password gate
const GATED_SLUGS = new Set([
  "ai-summarization",
  "9-2-usability-testing",
  "uxdrt",
  "guardium-exclusion-builder",
]);

// Pre-generate all case study routes at build time
export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) {
    return { title: "Case Study Not Found" };
  }

  const title = cs.title;
  const description = cs.summary;
  const url = `${SITE_URL}/work/${cs.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/work/${cs.slug}`,
    },
    // Locked pages stay indexable — preview text only reaches crawlers
    robots: { index: true, follow: true },
    openGraph: {
      title: `${title} | Malavika Susan`,
      description,
      url,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Malavika Susan — Senior Product Designer, Enterprise Software & AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Malavika Susan`,
      description,
      images: ["/twitter-image"],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) notFound();

  // ── Auth check (server-side, cookie never leaves server) ──────────────────
  const isGated = GATED_SLUGS.has(slug);

  let hasAccess = false;
  if (isGated) {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(COOKIE_NAME)?.value ?? "";
    hasAccess = cookieValue ? verifyCookieValue(cookieValue) : false;
  } else {
    // Non-gated pages are always accessible
    hasAccess = true;
  }

  const currentPath = `/work/${slug}`;

  return (
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
          &larr; Work
        </Link>

        {/* Unlocked banner */}
        {isGated && hasAccess && <UnlockedBanner currentPath={currentPath} />}

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

        {/* Public summary — always shown */}
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

        {/* Hero image / video — always shown */}
        {cs.heroVideo ? (
          <>
            <AutoplayVideo
              src={cs.heroVideo}
              playbackRate={cs.heroPlaybackRate}
              style={{
                width: "100%",
                display: "block",
                marginBottom: cs.heroCaption ? "var(--space-2)" : "var(--space-6)",
              }}
            />
            {cs.heroCaption && (
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-muted)",
                  letterSpacing: "0.04em",
                  marginTop: 0,
                  marginBottom: "var(--space-6)",
                }}
              >
                {cs.heroCaption}
              </p>
            )}
          </>
        ) : cs.slug === "guardium-exclusion-builder" ? (
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
              . PS: crank it to 1.25x — it hits different.
            </p>
          </>
        ) : (
          <Image
            src={cs.heroImage ?? `/images/case-studies/${cs.slug}-hero.png`}
            alt={cs.title}
            width={720}
            height={405}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              marginBottom: "var(--space-6)",
            }}
          />
        )}
      </FadeIn>

      {/* ── Content area ── */}
      <FadeIn delay={0.1}>
        {hasAccess ? (
          // UNLOCKED: pass full phase data to the interactive stepper
          <PhaseStepper phases={cs.phases} />
        ) : (
          // LOCKED: pass only first phase + stripped summaries for 2+
          // No detail/exhibits/sections/video URLs for phases 2+ reach the client
          <LockedPhaseStepper
            firstPhase={cs.phases[0]}
            lockedPhases={getLockedPhaseSummaries(cs.phases)}
            caseStudyTitle={cs.title}
          />
        )}
      </FadeIn>
    </div>
  );
}

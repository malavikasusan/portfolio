import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { caseStudies } from "@/lib/caseStudies";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Malavika Susan | Senior Product Designer, Enterprise Software & AI",
  description:
    "Senior product designer in Dublin designing enterprise software and AI: GenAI assistants, conversation design and research. Currently at IBM.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Malavika Susan | Senior Product Designer, Enterprise Software & AI",
    description:
      "Senior product designer in Dublin designing enterprise software and AI: GenAI assistants, conversation design and research. Currently at IBM.",
    url: SITE_URL,
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
    title: "Malavika Susan | Senior Product Designer, Enterprise Software & AI",
    description:
      "Senior product designer in Dublin designing enterprise software and AI: GenAI assistants, conversation design and research. Currently at IBM.",
    images: ["/twitter-image"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Malavika Susan",
  jobTitle: "Senior Product Designer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dublin",
    addressCountry: "Ireland",
  },
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/in/malavikasusan/"],
  worksFor: {
    "@type": "Organization",
    name: "IBM",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University of Limerick",
  },
  knowsAbout: [
    "enterprise software",
    "generative AI",
    "conversation design",
    "agentic AI",
    "UX research",
    "design systems",
    "data security",
  ],
};

export default function Home() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "var(--space-24) var(--page-gutter)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Hero — large centred serif text */}
      <FadeIn>
        <div
          style={{
            textAlign: "center",
            marginBottom: "var(--space-16)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "var(--text-lg)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-muted)",
              marginBottom: "var(--space-4)",
            }}
          >
            Okay! You found me.
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              maxWidth: "780px",
              margin: "0 auto var(--space-6)",
            }}
          >
            I make interfaces.
            <br />
            I ask questions.
            <br />
            I follow interesting problems down rabbit holes.
          </h1>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-muted)",
              lineHeight: 1.6,
              maxWidth: "540px",
              margin: "0 auto var(--space-12)",
            }}
          >
            Senior Product Designer based in Dublin, Ireland.
            <br />
            Currently shipping AI features for{" "}
            <a
              href="https://www.ibm.com/products/maximo/ai-asset-management"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E8580A", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              Maximo
            </a>
            , IBM
          </p>

          {/* Illustration — gif */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/misskalem-cat-13812_512.gif"
            alt=""
            style={{
              width: "140px",
              height: "140px",
              objectFit: "contain",
              display: "inline-block",
            }}
          />
        </div>
      </FadeIn>

      {/* Work entry points */}
      <FadeIn delay={0.14}>
        <div>
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
            Selected work
          </p>

          <div>
            {caseStudies
              .filter((cs) => cs.slug === "ai-summarization" || cs.slug === "guardium-exclusion-builder")
              .map((cs, i) => (
                <FadeIn key={cs.slug} delay={0.14 + i * 0.06}>
                  <Link
                    href={`/work/${cs.slug}`}
                    style={{
                      display: "block",
                      paddingTop: "var(--space-8)",
                      paddingBottom: "var(--space-8)",
                      borderTop: "1px solid var(--color-border)",
                    }}
                  >
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
                        {cs.timeline}
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
                </FadeIn>
              ))}

            {/* Final border */}
            <div style={{ borderTop: "1px solid var(--color-border)" }} />
          </div>

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

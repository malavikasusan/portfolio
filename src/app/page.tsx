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
  },
  twitter: {
    card: "summary_large_image",
    title: "Malavika Susan | Senior Product Designer, Enterprise Software & AI",
    description:
      "Senior product designer in Dublin designing enterprise software and AI: GenAI assistants, conversation design and research. Currently at IBM.",
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
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-muted)",
              letterSpacing: "0.06em",
              marginBottom: "var(--space-2)",
            }}
          >
            Designer based in Dublin
          </p>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-muted)",
              lineHeight: 1.6,
              maxWidth: "540px",
              margin: "0 auto var(--space-12)",
            }}
          >
            Senior product designer for enterprise software and AI. Currently designing AI assistants at IBM.
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

import type { Metadata } from "next";
import CaseStudyRow from "@/components/CaseStudyRow";
import FadeIn from "@/components/FadeIn";
import { caseStudies } from "@/lib/caseStudies";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies in enterprise AI and security design: AI assistant validation, AI summarization, QA systems and a threat analytics rule builder.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Malavika Susan",
    description:
      "Case studies in enterprise AI and security design: AI assistant validation, AI summarization, QA systems and a threat analytics rule builder.",
    url: `${SITE_URL}/work`,
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
    title: "Work | Malavika Susan",
    description:
      "Case studies in enterprise AI and security design: AI assistant validation, AI summarization, QA systems and a threat analytics rule builder.",
    images: ["/twitter-image"],
  },
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
            <CaseStudyRow cs={cs} />
          </FadeIn>
        ))}

        {/* Final border */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
          }}
        />
      </div>

      {/* ── Earlier work + site note ── */}
      <div
        style={{
          marginTop: "var(--space-3)",
          paddingTop: "var(--space-8)",
        }}
      >
        <figure
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-2)",
            margin: "0 0 var(--space-8)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/1_W0ur9D98GGM9HGstpvF1ZA.gif"
            alt=""
            style={{
              width: "180px",
              height: "auto",
            }}
          />

          <figcaption
            style={{
              maxWidth: "680px",
              fontSize: "var(--text-xs)",
              fontStyle: "italic",
              color: "var(--color-muted)",
              lineHeight: 1.75,
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            A note on how this site was built: this is the first project I’ve designed and published using AI-native tools end to end, built with an AI coding assistant rather than my usual Figma-first process.
          </figcaption>
        </figure>

        <div
          aria-hidden="true"
          style={{
            borderTop: "1px solid var(--color-border)",
            marginBottom: "var(--space-8)",
          }}
        />

        {/* Earlier work */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "var(--space-2)",
          }}
        >
          Earlier work
        </p>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-muted)",
            lineHeight: 1.75,
            marginBottom: "var(--space-2)",
          }}
        >
          Before AI-native design became my playground, I spent years designing digital products from the interface up.
        </p>
        <a
          href="https://portfoliomalavika.framer.website/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
          style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}
        >
          Explore my earlier work
        </a>
      </div>
    </div>
  );
}

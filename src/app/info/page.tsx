import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Info",
  description: "About Malavika — AI Designer",
};

const career = [
  {
    period: "2026 – present",
    role: "AI Designer, Discovery & Strategy",
    org: "IBM — Asset Lifecycle Management (Maximo)",
    detail:
      "Internal move to the AI Strategy & Discovery squad for Maximo. Leading end-to-end AI design across a new set of agentic capabilities for the Maximo Assistant — from VOC research and synthesis through usability validation and executive playback. First project owned start to finish: designing the validation methodology, recruiting infrastructure, and research framework for the 9.2 release.",
  },
  {
    period: "Mar 2024 – 2026",
    role: "UX Design Lead",
    org: "IBM — Data Security (Guardium)",
    detail:
      "Led UX across Security Analytics and Vulnerability Management for Guardium Data Protection. Launched AI-assisted threat management using watsonx.ai — conversational GenAI flows for CEL/SQL translation, policy generation, and threat summarization, reducing investigation effort by 12x. Threat Summarization adopted by 68% of users. Facilitated cross-functional workshops with users, SMEs, and engineering; delivered 77%+ task completion across key analytics flows through structured usability studies.",
  },
  {
    period: "Jul 2023 – Mar 2024",
    role: "Product Designer",
    org: "Chainlink Labs",
    detail:
      "Designed enterprise-grade workflows and modular UI for the Chainlink Console, unifying developer tools and improving developer efficiency by 13%. Shipped PegSwap (ERC-677) through high-fidelity prototypes enabling cross-chain token movement.",
  },
  {
    period: "Jul 2021 – Jul 2022",
    role: "Product Designer",
    org: "Hypersonix.ai",
    detail:
      "Launched Profit-GPT, an AI-enabled BI dashboard for profitability and assortment tracking. Designed Ask Jarvix, a GenAI assistant for natural language business data queries. Scaled the Sonic Design System with reusable components and documentation for enterprise BI tools.",
  },
  {
    period: "Jul 2020 – Jul 2021",
    role: "UX Designer",
    org: "Aphelia Innovations (Agency)",
    detail:
      "Redesigned and launched SportsDapp with enhanced information architecture and modern visuals. Collaborated on Sevaro, an accessible telehealth platform built to WCAG 2.0.",
  },
  {
    period: "2016 – 2020",
    role: "Associate Design Lead",
    org: "Architecture — Atelier D'Arts & Architecture, Flying Elephant Studio, Talati & Panthaky Partners",
    detail:
      "Four years of architecture practice across studios in India — spatial design, complex systems, and client-facing project delivery. Transitioned into product design via an MSc in Interaction & Experience Design at the University of Limerick.",
  },
];

const skills = [
  "Discovery & research",
  "AI/ML product design",
  "Design systems",
  "Usability testing",
  "Cross-functional facilitation",
  "Figma",
];

export default function InfoPage() {
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
        {/* "Hello." */}
        <p
          style={{
            fontSize: "var(--text-lg)",
            fontStyle: "italic",
            color: "var(--color-muted)",
            marginBottom: "var(--space-8)",
          }}
        >
          Hello.
        </p>

        {/* Intro line — name + profile photo inline */}
        <p
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            marginBottom: "var(--space-8)",
          }}
        >
          {"I'm Malavika "}
          {/* Profile photo — inline with text */}
          <span
            style={{
              display: "inline-block",
              width: "1.6em",
              height: "1.6em",
              borderRadius: "50%",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              verticalAlign: "middle",
              marginRight: "0.15em",
              position: "relative",
              top: "-0.05em",
            }}
          />{", "}
          <span
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              padding: "0.1em 0.4em",
            }}
          >
            an AI designer
          </span>
          {" working on enterprise software."}
        </p>

        {/* Body paragraph */}
        <p
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: 1.75,
            marginBottom: "var(--space-8)",
            maxWidth: "560px",
          }}
        >
          {"I focus on the parts where model behaviour needs to be made legible, where research has to move fast, and where "}
          <span
            style={{
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            design has to hold its own
          </span>
          {" against engineering and product pressure. I work end-to-end — discovery, synthesis, testing, shipped product."}
        </p>

        {/* Closing pill + sign-off */}
        <p
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: 1.75,
            marginBottom: "var(--space-6)",
            maxWidth: "560px",
          }}
        >
          <span
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              padding: "0.1em 0.4em",
              fontSize: "var(--text-base)",
            }}
          >
            {"It's nice to meet you."}
          </span>
        </p>

        <p
          style={{
            fontStyle: "italic",
            fontSize: "var(--text-lg)",
            color: "var(--color-muted)",
            marginBottom: "var(--space-16)",
          }}
        >
          Malavika
        </p>
      </FadeIn>

      {/* ── Career arc ── */}
      <FadeIn delay={0.08}>
        <section style={{ marginBottom: "var(--space-16)" }}>
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
            Career arc
          </p>

          <div>
            {career.map((entry, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "7rem 1fr",
                  gap: "var(--space-6)",
                  paddingTop: "var(--space-6)",
                  paddingBottom: "var(--space-6)",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                {/* Period */}
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-muted)",
                      letterSpacing: "0.03em",
                      lineHeight: 1.6,
                    }}
                  >
                    {entry.period}
                  </span>
                </div>

                {/* Role + detail */}
                <div>
                  <p
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    {entry.role}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-muted)",
                      letterSpacing: "0.03em",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    {entry.org}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {entry.detail}
                  </p>
                </div>
              </div>
            ))}
            {/* Final border */}
            <div style={{ borderTop: "1px solid var(--color-border)" }} />
          </div>
        </section>
      </FadeIn>

      {/* ── Skills ── */}
      <FadeIn delay={0.14}>
        <section style={{ marginBottom: "var(--space-16)" }}>
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
            Focus areas
          </p>

          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
            }}
          >
            {skills.map((skill) => (
              <li
                key={skill}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-muted)",
                  letterSpacing: "0.04em",
                  border: "1px solid var(--color-border)",
                  padding: "var(--space-2) var(--space-3)",
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* ── Contact ── */}
      <FadeIn delay={0.18}>
        <section>
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
            Contact
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {[
              { label: "Email", href: "mailto:you@example.com", display: "you@example.com" },
              { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", display: "linkedin.com/in/yourhandle" },
            ].map(({ label, href, display }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "var(--space-6)",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-muted)",
                    letterSpacing: "0.04em",
                    width: "5rem",
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <a
                  href={href}
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-accent)",
                    fontWeight: 500,
                  }}
                >
                  {display}
                </a>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}

import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Info",
  description: "About Malavika — AI Designer",
};

const career = [
  {
    period: "2023 – present",
    role: "AI Designer",
    org: "[Current Company]",
    detail:
      "Leading UX across AI-powered features — summarization, synthesis, and intelligent assistants. Working end-to-end from discovery through to shipped product, embedded with cross-functional teams.",
  },
  {
    period: "2021 – 2023",
    role: "Senior UX Designer",
    org: "[Previous Company]",
    detail:
      "Placeholder — add your role context here. Focus area, team size, products owned.",
  },
  {
    period: "2019 – 2021",
    role: "UX Designer",
    org: "[Earlier Company]",
    detail:
      "Placeholder — add your role context here.",
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
        maxWidth: "720px",
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
          Info
        </p>

        <h1
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-8)",
          }}
        >
          Malavika
        </h1>

        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-muted)",
            lineHeight: 1.7,
            maxWidth: "500px",
            marginBottom: "var(--space-16)",
          }}
        >
          AI Designer working on enterprise software. I focus on the hard
          parts — where model behaviour needs to be made legible, where
          research needs to move fast, and where design has to hold its
          own against engineering and product pressure.
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

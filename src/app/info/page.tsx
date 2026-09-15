import FadeIn from "@/components/FadeIn";
import LifeCarousel from "@/components/LifeCarousel";
import CareerArc from "@/components/CareerArc";

export const metadata = {
  title: "Info",
  description: "About Malavika — Senior Product Designer",
};


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
        <div style={{ textAlign: "center" }}>
          {/* Intro — name + photo on first line, question on second */}
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "calc(clamp(2rem, 5vw, 3.5rem) - 2px)",
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              maxWidth: "780px",
              margin: "0 auto var(--space-6)",
            }}
          >
            {"Hi, I\u2019m Malavika Susan "}
            {/* Profile photo — inline with text, enlarges on hover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/Image.jpg"
              alt="Malavika"
              className="profile-photo"
              style={{
                width: "1.6em",
                height: "1.6em",
                marginLeft: "0.3em",
                marginRight: "0.3em",
              }}
            />
            <br />
            {"Maker of sense from messy things."}
          </p>

          {/* Second line */}
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "var(--text-lg)",
              fontStyle: "italic",
              color: "var(--color-muted)",
              lineHeight: 1.75,
              marginBottom: "var(--space-8)",
            }}
          >
            {"Mostly because I don\u2019t trust \u201cthat\u2019s just how it works\u201d as an answer."}
          </p>

          {/* Body paragraph */}
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-muted)",
              lineHeight: 1.65,
              marginBottom: "var(--space-8)",
            }}
          >
            {"I\u2019m a product designer working across enterprise software and AI. I like pulling apart complicated systems, finding the useful thread in a pile of ambiguity, where system behaviour needs to be made legible, and putting things back together in a way that makes sense to humans."}
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/u_mey4kjj5ww-angry-2498_512.gif"
            alt="Animated character at a computer"
            style={{
              width: "140px",
              height: "140px",
              objectFit: "contain",
              display: "inline-block",
              marginBottom: "var(--space-8)",
            }}
          />
        </div>
      </FadeIn>

      {/* ── Career arc ── */}
      <FadeIn delay={0.08}>
        <CareerArc />
      </FadeIn>

      {/* ── Life carousel ── */}
      <FadeIn delay={0.14}>
        <section
          className="life-carousel-section"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-12)",
            alignItems: "center",
            marginBottom: "var(--space-16)",
          }}
        >
          {/* Left — text */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "var(--text-2xl)",
                fontWeight: 400,
                lineHeight: 1.4,
                marginBottom: "var(--space-4)",
              }}
            >
              Peek into my world.
            </p>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-muted)",
                lineHeight: 1.75,
              }}
            >
              Chasing great architecture and great food, one trip at a time and bringing it all home to cook for friends and family.
            </p>
          </div>

          {/* Right — carousel */}
          <LifeCarousel />
        </section>
      </FadeIn>

      {/* ── Contact ── */}
      <FadeIn delay={0.18}>
        <section>
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "var(--text-2xl)",
              fontWeight: 400,
              lineHeight: 1.5,
              marginBottom: "var(--space-6)",
            }}
          >
            {"Have a question?"}
          </p>

          <div
            style={{
              display: "flex",
              gap: "var(--space-6)",
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:malavikasusan18@gmail.com"
              className="link-accent"
              style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
            >
              Send me an email
            </a>
            <a
              href="https://www.linkedin.com/in/malavikasusan/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
              style={{ fontSize: "var(--text-base)", fontWeight: 500 }}
            >
              Find me on LinkedIn
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}

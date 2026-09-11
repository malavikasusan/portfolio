"use client";

import { useState } from "react";
import type { CarouselSlide } from "@/lib/caseStudies";

interface CarouselBlockProps {
  slides: CarouselSlide[];
  caption: string;
}

export default function CarouselBlock({ slides, caption }: CarouselBlockProps) {
  const [index, setIndex] = useState(0);
  const current = slides[index];
  const total = slides.length;

  return (
    <figure style={{ margin: "0 0 40px" }}>
      {/* Slide */}
      <div style={{ position: "relative", width: "100%", backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
        {current.src ? (
          <img
            src={current.src}
            alt={current.caption}
            style={{ width: "100%", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-muted)",
                letterSpacing: "0.04em",
              }}
            >
              {current.caption}
            </span>
          </div>
        )}
      </div>

      {/* Controls + slide caption */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "var(--space-2)",
          gap: "var(--space-4)",
        }}
      >
        <figcaption
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.04em",
            flex: 1,
          }}
        >
          {current.src ? current.caption : caption}
        </figcaption>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexShrink: 0 }}>
          <button
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            aria-label="Previous slide"
            style={{
              background: "none",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              padding: "2px 8px",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-muted)",
              lineHeight: 1.6,
            }}
          >
            ←
          </button>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-muted)",
              letterSpacing: "0.04em",
            }}
          >
            {index + 1} / {total}
          </span>
          <button
            onClick={() => setIndex((i) => (i + 1) % total)}
            aria-label="Next slide"
            style={{
              background: "none",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              padding: "2px 8px",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-muted)",
              lineHeight: 1.6,
            }}
          >
            →
          </button>
        </div>
      </div>
    </figure>
  );
}

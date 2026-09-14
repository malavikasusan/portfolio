"use client";

import { useState } from "react";

const slides = [
  { src: "/images/case-studies/images/28FF3489-1355-4F00-8AC3-1E4BD980E16B.JPG", caption: "Hallgrímskirkja, Reykjavik, Iceland", objectPosition: "center top" },
  { src: "/images/case-studies/images/IMG_7674.jpg", caption: "Jökulsárlón Glacier Lagoon, Iceland" },
  { src: "/images/case-studies/images/IMG_9623.jpg", caption: "Carmo Convent Ruins, Lisbon, Portugal" },
  { src: "/images/case-studies/images/8e726e7b-0c8b-40b6-a4cc-49a3f25f6a61.jpg", caption: "Shillong, Meghalaya" },
  { src: "/images/case-studies/images/IMG_1460.jpg", caption: "Recent design thinking workshop at IBM" },
  { src: "/images/case-studies/images/IMG_6590.jpg", caption: "An artist at Glendalough hike, Dublin" },
  { src: "/images/case-studies/images/IMG_8815.jpg", caption: "Dog's Bay Beach, Ireland" },
  { src: "/images/case-studies/images/IMG_2149.jpg", caption: "Hagia Sophia, Istanbul" },
  { src: "/images/case-studies/images/IMG_1705.jpg", caption: "Blarney Castle & Gardens" },
  { src: "/images/case-studies/images/de4e1be9-3f7c-4fde-96ee-7dc2ecdcc5a7.jpg", caption: "Onam Sadhya, homemade" },
];

export default function LifeCarousel() {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index];

  return (
    <div>
      {/* Slide */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/5",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {current.src ? (
          <img
            src={current.src}
            alt={current.caption || `Photo ${index + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: (current as {objectPosition?: string}).objectPosition ?? "center center", display: "block" }}
          />
        ) : (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-border)",
              letterSpacing: "0.06em",
            }}
          >
            {`Photo ${index + 1}`}
          </span>
        )}

        {/* Prev / next hit areas */}
        <button
          onClick={() => setIndex((i) => (i - 1 + total) % total)}
          aria-label="Previous photo"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "40%",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        />
        <button
          onClick={() => setIndex((i) => (i + 1) % total)}
          aria-label="Next photo"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "40%",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Caption + controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "var(--space-2)",
          gap: "var(--space-3)",
          minHeight: "1.6em",
        }}
      >
        {/* Caption */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-muted)",
            letterSpacing: "0.03em",
            flex: 1,
          }}
        >
          {current.caption}
        </span>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexShrink: 0 }}>
          <button
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            aria-label="Previous photo"
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
            aria-label="Next photo"
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
    </div>
  );
}

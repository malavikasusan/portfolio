"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { HeroMedia } from "@/lib/caseStudies";

interface ProjectThumbProps {
  href: string;
  title: string;
  media: HeroMedia;
}

const overlayButton: React.CSSProperties = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  color: "#fff",
  background: "rgba(26, 25, 23, 0.6)",
  cursor: "pointer",
  zIndex: 2,
};

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Case study list thumbnail. Fills the height of the text beside it.
 * Videos get play/pause and fullscreen; images get fullscreen only.
 * Clicking anywhere else opens the case study.
 */
export default function ProjectThumb({ href, title, media }: ProjectThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Native controls only while the video is fullscreen
  useEffect(() => {
    if (media.type !== "video") return;
    const onFullscreenChange = () => {
      const v = videoRef.current;
      if (v && document.fullscreenElement !== v) v.controls = false;
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [media.type]);

  // Close the image lightbox with Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (media.type === "video" && media.playbackRate) v.playbackRate = media.playbackRate;
      v.play();
    } else {
      v.pause();
    }
  }

  function openFullscreen() {
    if (media.type === "image") {
      setLightboxOpen(true);
      return;
    }
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) {
      v.controls = true;
      v.requestFullscreen();
    } else {
      // iOS Safari only supports fullscreen on the video itself
      v.webkitEnterFullscreen?.();
    }
    v.play();
  }

  return (
    <div className="cs-thumb">
      {media.type === "video" ? (
        <video
          ref={videoRef}
          // #t= makes mobile browsers show a first frame instead of a blank box
          src={`${media.src}#t=0.1`}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Image src={media.src} alt="" fill sizes="(max-width: 600px) 100vw, 240px" style={{ objectFit: "cover" }} />
      )}

      {/* Whole thumbnail opens the case study; the buttons sit above it */}
      <Link href={href} aria-label={title} tabIndex={-1} style={{ position: "absolute", inset: 0, zIndex: 1 }} />

      {media.type === "video" && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause ${title} preview` : `Play ${title} preview`}
          style={{
            ...overlayButton,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            opacity: playing ? 0 : 1,
            transition: "opacity 150ms ease",
          }}
          className="cs-thumb-play"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 1.5v11l9.5-5.5z" fill="currentColor" />
            </svg>
          )}
        </button>
      )}

      <button
        type="button"
        onClick={openFullscreen}
        aria-label={`View ${title} ${media.type} fullscreen`}
        style={{ ...overlayButton, top: "8px", right: "8px", width: "28px", height: "28px", borderRadius: "6px" }}
      >
        <FullscreenIcon />
      </button>

      {lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(26, 25, 23, 0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--page-gutter)",
              cursor: "zoom-out",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.src} alt={title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              autoFocus
              style={{ ...overlayButton, top: "16px", right: "16px", width: "36px", height: "36px", borderRadius: "50%", fontSize: "20px", lineHeight: 1 }}
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

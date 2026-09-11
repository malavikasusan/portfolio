"use client";

import { useEffect, useRef } from "react";

interface AutoplayVideoProps {
  src: string;
  style?: React.CSSProperties;
  playbackRate?: number;
}

export default function AutoplayVideo({ src, style, playbackRate = 1.3 }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      style={style}
    />
  );
}

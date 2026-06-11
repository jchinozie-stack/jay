"use client";

import { useEffect, useRef } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Looping background video with a JS-driven crossfade: the clip fades in
 * on load, fades out 0.55s before it ends, then silently rewinds and
 * fades back in — an endless loop with no hard cut. All fades run on
 * requestAnimationFrame (no CSS transitions), and each new fade resumes
 * from the current opacity so interruptions stay smooth.
 *
 * Drop in estate footage when available:
 *   <FadingVideo src="/videos/estate-aerial.mp4" className="absolute inset-0 w-full h-full object-cover" />
 */
export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55;

    const fadeTo = (target: number, duration = FADE_MS) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const from = parseFloat(video.style.opacity || "0");
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        video.style.opacity = String(from + (target - from) * t);
        if (t < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const onLoadedData = () => {
      video.style.opacity = "0";
      video.play().catch(() => {});
      fadeTo(1);
    };

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  );
}

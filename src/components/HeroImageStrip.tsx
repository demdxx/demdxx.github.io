"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { slogan, type Locale } from "@/lib/i18n";

const IMAGE_SRC = "/main.jpg";
const HOVER_DELAY_MS = 2000;
const OVERLAY_TRANSITION_MS = 400;

type HeroImageStripProps = {
  locale: Locale;
};

export function HeroImageStrip({ locale }: HeroImageStripProps) {
  const [expanded, setExpanded] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const open = useCallback(() => {
    clearHoverTimer();
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHovering(false);
    setExpanded(true);
    setOverlayMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayVisible(true));
    });
  }, [clearHoverTimer]);

  const close = useCallback(() => {
    if (!overlayMounted && !expanded) return;

    setOverlayVisible(false);
    setExpanded(false);

    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOverlayMounted(false);
      closeTimerRef.current = null;
    }, OVERLAY_TRANSITION_MS);
  }, [expanded, overlayMounted]);

  const handleMouseEnter = () => {
    setHovering(true);
    clearHoverTimer();
    timerRef.current = setTimeout(open, HOVER_DELAY_MS);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    clearHoverTimer();
  };

  const handleClick = () => {
    if (expanded || overlayMounted) {
      close();
      return;
    }
    open();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (expanded || overlayMounted) close();
      else open();
    }
    if (event.key === "Escape" && (expanded || overlayMounted)) {
      close();
    }
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!overlayMounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && overlayVisible) close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [overlayMounted, overlayVisible, close]);

  useEffect(
    () => () => {
      clearHoverTimer();
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [clearHoverTimer],
  );

  const tagline = slogan[locale];

  const overlay =
    mounted && overlayMounted
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className={`hero-overlay fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10 ${
              overlayVisible ? "hero-overlay--visible" : ""
            }`}
            style={{ height: "100dvh", width: "100vw" }}
          >
            <button
              type="button"
              aria-label="Close image"
              onClick={close}
              className="hero-overlay-backdrop absolute inset-0 bg-[#050510]/50 backdrop-blur-md"
            />

            <div className="hero-overlay-content relative z-10 flex w-full max-w-5xl flex-col items-center gap-4 sm:gap-5">
              <p className="hero-overlay-slogan text-center font-[family-name:var(--font-display)] text-base tracking-[0.25em] uppercase sm:text-lg md:text-xl">
                <span className="hero-overlay-slogan-main">{tagline.main}</span>
                {tagline.translation && (
                  <span className="mt-1 block text-[0.55em] normal-case tracking-[0.18em] text-fuchsia-300/75">
                    {tagline.translation}
                  </span>
                )}
              </p>

              <div
                className="hero-overlay-panel w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20 shadow-[0_0_80px_rgba(0,245,255,0.12)]"
                style={{ maxHeight: "calc(100dvh - 8rem)" }}
              >
                <Image
                  src={IMAGE_SRC}
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="h-auto max-h-[calc(100dvh-8rem)] w-full object-contain"
                  priority
                />
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              className="hero-overlay-close absolute top-4 right-4 z-20 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-[family-name:var(--font-display)] text-xs tracking-widest text-cyan-200/90 uppercase backdrop-blur-md transition-colors hover:border-cyan-400/40 hover:text-cyan-100"
            >
              Close
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        aria-label={expanded ? "Close image" : "Expand image"}
        aria-expanded={expanded || overlayMounted}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(0,245,255,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_50px_rgba(0,245,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
      >
        <div className="relative h-[4.5rem] w-full overflow-hidden md:h-20">
          <Image
            src={IMAGE_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050510]/60 via-transparent to-[#050510]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/80 via-transparent to-[#050510]/40" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-4 py-2">
          <span className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.25em] text-cyan-200/70 uppercase">
            {hovering ? "Opening…" : "Tap or hold"}
          </span>
          {hovering && (
            <span
              className="h-0.5 origin-left animate-[hero-hover-progress_2s_linear_forwards] rounded-full bg-cyan-400/80"
              style={{ width: "4rem" }}
              aria-hidden
            />
          )}
        </div>
      </button>

      {overlay}
    </>
  );
}

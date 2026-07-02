"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GameScreenshot } from "@/types/game.types";

type ScreenshotSliderProps = {
  screenshots: GameScreenshot[];
  fallbackImage?: string;
  gameName?: string;
};

export function ScreenshotSlider({
  screenshots,
  fallbackImage,
  gameName,
}: ScreenshotSliderProps) {
  const slides = useMemo(() => {
    if (screenshots.length > 0) return screenshots;
    if (fallbackImage) return [{ id: 0, image: fallbackImage }];
    return [];
  }, [fallbackImage, screenshots]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const hasMultipleSlides = slides.length > 1;

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  if (!activeSlide) {
    return (
      <section className="w-full rounded-xl border border-white/15 bg-black/20 p-6 text-center text-sm text-white/80">
        Tidak ada screenshot untuk game ini.
      </section>
    );
  }

  return (
    <section className="w-full space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Screenshot</h2>
        <p className="text-sm text-white/70">
          {activeIndex + 1} / {slides.length}
        </p>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/30 shadow">
        <Image
          src={activeSlide.image}
          alt={`Screenshot ${gameName || "game"} ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
          priority={activeIndex === 0}
        />

        {hasMultipleSlides && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Screenshot sebelumnya"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition hover:bg-black/80"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Screenshot berikutnya"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition hover:bg-black/80"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultipleSlides && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {slides.map((slide, index) => (
            <button
              key={slide.id || slide.image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Buka screenshot ${index + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition ${
                index === activeIndex
                  ? "border-emerald-400"
                  : "border-white/15 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";

export type ComparisonSliderProps = {
  leftImage: string;
  rightImage: string;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
};

export default function ComparisonSlider({
  leftImage,
  rightImage,
  leftLabel = "风景",
  rightLabel = "运动记录",
  className = "",
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className={`relative select-none overflow-hidden rounded-2xl ${className}`}>
      {/* Background image (right) */}
      <div className="absolute inset-0">
        <img
          src={rightImage}
          alt={rightLabel}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
          {rightLabel}
        </span>
      </div>

      {/* Foreground image (left) clipped by width */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={leftImage}
          alt={leftLabel}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
          {leftLabel}
        </span>
      </div>

      {/* Slider divider */}
      <div
        className="absolute top-0 bottom-0 w-1 -translate-x-1/2 cursor-ew-resize bg-white shadow-md"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
          <svg
            className="h-4 w-4 text-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Invisible range input for interaction */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

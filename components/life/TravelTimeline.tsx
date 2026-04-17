"use client";

import DefaultTimeline from "./DefaultTimeline";
import Stack from "./Stack";
import type { LifeItem } from "@/lib/life-data";

export type TravelTimelineProps = {
  items: LifeItem[];
};

export default function TravelTimeline({ items }: TravelTimelineProps) {
  return (
    <div className="relative left-1/2 w-[66.67vw] -translate-x-1/2">
      <DefaultTimeline
        items={items}
        renderMedia={(item) => {
        const images = item.images && item.images.length > 0 ? item.images : [item.src];
        return (
          <div className="relative aspect-[16/9] w-full">
            <Stack
              cards={images.slice().reverse().map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${item.title} ${idx + 1}`}
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
              ))}
              autoplay={false}
              className="h-full w-full"
            />
          </div>
        );
      }}
      />
    </div>
  );
}

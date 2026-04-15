"use client";

import DefaultTimeline from "./DefaultTimeline";
import Stack from "./Stack";
import type { LifeItem } from "@/lib/life-data";

export type TravelTimelineProps = {
  items: LifeItem[];
};

export default function TravelTimeline({ items }: TravelTimelineProps) {
  return (
    <DefaultTimeline
      items={items}
      renderMedia={(item) => {
        const images = item.images && item.images.length > 0 ? item.images : [item.src];
        return (
          <div className="relative aspect-[4/3] w-full">
            <Stack
              cards={images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${item.title} ${idx + 1}`}
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
              ))}
              autoplay={images.length > 1}
              autoplayDelay={3500}
              pauseOnHover
              className="h-full w-full"
            />
          </div>
        );
      }}
    />
  );
}

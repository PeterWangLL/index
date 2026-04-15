"use client";

import Image from "next/image";
import type { LifeItem } from "@/lib/life-data";

export type DefaultTimelineProps = {
  items: LifeItem[];
  renderMedia?: (item: LifeItem, isLeft: boolean) => React.ReactNode;
};

export default function DefaultTimeline({ items, renderMedia }: DefaultTimelineProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-6 py-16 text-center">
        <p className="text-foreground/60">该分类下暂时没有记录。</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Center line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10 md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-12">
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          const aspectClass =
            item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]";

          return (
            <div key={item.id} className="relative flex items-start md:items-center">
              {/* Dot */}
              <div className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-foreground/40 ring-4 ring-background md:left-1/2" />

              {/* Content */}
              <div
                className={`ml-10 w-full md:ml-0 md:w-1/2 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12 md:text-left"
                }`}
              >
                <time className="block text-xs font-medium text-foreground/50">
                  {item.date}
                </time>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{item.desc}</p>
                <div
                  className={`mt-4 overflow-hidden rounded-2xl bg-foreground/[0.03] ${
                    isLeft ? "md:ml-auto" : ""
                  }`}
                >
                  {renderMedia ? (
                    renderMedia(item, isLeft)
                  ) : (
                    <div className={`relative ${aspectClass}`}>
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

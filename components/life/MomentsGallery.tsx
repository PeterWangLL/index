"use client";

import { useState } from "react";
import CircularGallery from "./CircularGallery";
import YearTabs from "./YearTabs";
import type { LifeItem } from "@/lib/life-data";

export type MomentsGalleryProps = {
  items: LifeItem[];
  years: number[];
  defaultYear: number;
};

export default function MomentsGallery({ items, years, defaultYear }: MomentsGalleryProps) {
  const [activeYear, setActiveYear] = useState(defaultYear);
  const yearItems = items.filter((i) => new Date(i.date).getFullYear() === activeYear);
  const galleryItems = yearItems.map((i) => ({ image: i.src, text: i.title }));

  return (
    <div className="space-y-4">
      <YearTabs years={years} activeYear={activeYear} onChange={setActiveYear} />
      <div className="relative left-1/2 h-[55vh] min-h-[420px] w-[66.67vw] -translate-x-1/2 rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
        {galleryItems.length > 0 ? (
          <CircularGallery items={galleryItems} bend={2} textColor="#6A2C70" borderRadius={0.05} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-foreground/50">
            该年份下暂无记录
          </div>
        )}
      </div>
    </div>
  );
}

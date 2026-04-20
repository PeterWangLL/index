"use client";

import { useMemo, useState } from "react";
import CircularGallery from "./CircularGallery";
import { getAssetPath } from "@/lib/utils";
import type { LifeItem } from "@/lib/life-data";

const ARCHIVE_YEAR = 2025;

export type MomentsGalleryProps = {
  items: LifeItem[];
};

export default function MomentsGallery({ items }: MomentsGalleryProps) {
  const tabs = useMemo(() => {
    const groups: Record<string, LifeItem[]> = {};
    items.forEach((item) => {
      const year = new Date(item.date).getFullYear();
      const key = year <= ARCHIVE_YEAR ? `${ARCHIVE_YEAR}~` : String(year);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return Object.entries(groups)
      .map(([key, groupItems]) => ({
        key,
        label: key,
        items: groupItems,
      }))
      .sort((a, b) => {
        // numeric descending for year tabs, archive key always last if it were older,
        // but since archive is <= 2025 and future years are > 2025, future years come first
        const na = a.key.endsWith("~") ? ARCHIVE_YEAR : parseInt(a.key);
        const nb = b.key.endsWith("~") ? ARCHIVE_YEAR : parseInt(b.key);
        return nb - na;
      });
  }, [items]);

  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "2025~");
  const activeItems = tabs.find((t) => t.key === activeTab)?.items ?? [];
  const galleryItems = activeItems.map((i) => ({ image: getAssetPath(i.src), text: i.title }));

  return (
    <div className="space-y-4">
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab.key === activeTab
                ? "bg-[#B83B5E] text-white"
                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
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

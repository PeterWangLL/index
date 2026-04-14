"use client";

import { useState } from "react";

const lifeCategories = [
  { key: "all", label: "全部" },
  { key: "fitness", label: "健身" },
  { key: "travel", label: "旅游" },
  { key: "hiking", label: "爬山" },
  { key: "moments", label: "时刻" },
  { key: "photography", label: "随拍" },
];

export default function Life() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <section id="life" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Life</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            记录生活中的美好瞬间 — 健身、旅行、爬山、重要时刻，以及随手拍下的光影。
          </p>
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {lifeCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat.key
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Bento grid placeholder */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="aspect-[4/3] rounded-2xl bg-foreground/5 sm:col-span-2 lg:col-span-2" />
          <div className="aspect-[4/3] rounded-2xl bg-foreground/5" />
          <div className="aspect-[4/3] rounded-2xl bg-foreground/5" />
          <div className="aspect-[4/3] rounded-2xl bg-foreground/5 sm:col-span-2 lg:col-span-2" />
        </div>

        <p className="mt-8 text-sm text-foreground/50">
          这里只展示精选内容，更多记录持续更新中……
        </p>
      </div>
    </section>
  );
}

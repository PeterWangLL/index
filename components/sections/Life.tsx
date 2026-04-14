"use client";

import { useState } from "react";
import Image from "next/image";

const lifeCategories = [
  { key: "all", label: "全部" },
  { key: "fitness", label: "健身" },
  { key: "travel", label: "旅游" },
  { key: "hiking", label: "爬山" },
  { key: "moments", label: "时刻" },
  { key: "photography", label: "随拍" },
];

const lifeItems = [
  {
    category: "photography",
    title: "火箭升空",
    desc: "见证一束光撕裂夜空，那是人类最浪漫的倔强。",
    layout: "wide",
    src: "/images/life/photography/rocket-launching-at-night-with-bright-flames-and-smoke--tT9l_dkakk.jpeg",
  },
  {
    category: "hiking",
    title: "山与野花",
    desc: "富士山下的秋日，风一吹，整片芦苇都在发光。",
    layout: "normal",
    src: "/images/life/hiking/a-majestic-mountain-peak-behind-wildflowers-under-a-clear-sky-ho0_jE0q9T0.jpeg",
  },
  {
    category: "photography",
    title: "日落海浪",
    desc: "橙红色的天空倒映在海面上，浪潮一层一层涌来。",
    layout: "normal",
    src: "/images/life/photography/ocean-waves-at-sunset-with-warm-orange-sky-eSLJG0y5S4U.jpeg",
  },
  {
    category: "photography",
    title: "海岸礁石",
    desc: "浪花撞击礁石的瞬间，是大海最沉默的呐喊。",
    layout: "wide",
    src: "/images/life/photography/rocky-coastline-with-waves-crashing-against-shore-AImfs6Xh1ZA.jpeg",
  },
  {
    category: "travel",
    title: "雪山列车",
    desc: "瑞士少女峰下的红色火车，像是从童话里开出来的。",
    layout: "normal",
    src: "/images/life/travel/a-red-train-travels-through-a-snowy-mountain-landscape-jllQYsBvFnA.jpeg",
  },
  {
    category: "fitness",
    title: "冲浪者",
    desc: "等待一个完美的浪，和等待一个灵感一样需要耐心。",
    layout: "normal",
    src: "/images/life/fitness/two-surfers-wait-for-waves-near-a-rocky-coastline-MA0nBwOmuwQ.jpeg",
  },
];

export default function Life() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? lifeItems
      : lifeItems.filter((item) => item.category === activeCategory);

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

        {/* Featured Bento grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl bg-foreground/5 ${
                item.layout === "wide" ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className={`relative ${item.layout === "wide" ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={item.layout === "wide" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/90">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-foreground/50">
          这里只展示精选内容，更多记录持续更新中……
        </p>
      </div>
    </section>
  );
}

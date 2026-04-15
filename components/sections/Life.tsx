"use client";

import { useState } from "react";
import Image from "next/image";
import {
  lifeCategories,
  getFeaturedItems,
} from "@/lib/life-data";

export default function Life() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = getFeaturedItems(activeCategory);

  return (
    <section id="life" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Life</h2>
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
                  ? "bg-[#B83B5E] text-white"
                  : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 精选网格 */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-foreground/10 bg-foreground/5 px-6 py-16 text-center">
            <p className="text-foreground/60">该分类下暂时没有精选内容。</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl bg-foreground/5 ${
                  item.layout === "wide" ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative ${
                    item.layout === "wide" ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  {/* 所有照片统一使用 object-cover 按标准比例裁剪，避免留白 */}
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={
                      item.layout === "wide"
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 查看全部入口 */}
        <div className="mt-8 flex items-center justify-end">
          <a
            href={`/life/${activeCategory}`}
            className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-4 py-1.5 text-sm font-medium text-foreground/80 hover:bg-foreground/10 transition-colors"
          >
            查看全部
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

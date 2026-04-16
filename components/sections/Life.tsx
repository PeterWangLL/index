"use client";

import { useState } from "react";
import Image from "next/image";
import { getFeaturedItems } from "@/lib/life-data";
import SpaceMap from "./SpaceMap";
import TimeChart from "./TimeChart";

export default function Life() {
  const [activeTab, setActiveTab] = useState<"featured" | "viz">("featured");

  const filteredItems = getFeaturedItems("all");

  return (
    <section id="life" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Life</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            记录生活中的美好瞬间 — 健身、旅行、爬山、重要时刻，以及随手拍下的光影。
          </p>
        </div>

        {/* Tabs: 精选 + Viz icon */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("featured")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "featured"
                ? "bg-[#B83B5E] text-white"
                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
            }`}
          >
            精选
          </button>
          <button
            onClick={() => setActiveTab("viz")}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "viz"
                ? "bg-[#B83B5E] text-white"
                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
            }`}
            aria-label="Space & Time"
            title="Space & Time"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        {activeTab === "featured" && (
          <>
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
                      <Image
                        src={item.images?.[0] ?? item.src}
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
          </>
        )}

        {activeTab === "viz" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <SpaceMap />
            <TimeChart />
          </div>
        )}

        {/* 查看全部入口 */}
        <div className="mt-8 flex items-center justify-end">
          <a
            href="/life/all"
            className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-4 py-1.5 text-sm font-medium text-foreground/80 hover:bg-foreground/10 transition-colors"
          >
            查看全部
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

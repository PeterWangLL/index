"use client";

import { useState } from "react";
import Image from "next/image";
import { getFeaturedItems, lifeCategories, type LifeItem } from "@/lib/life-data";
import { getAssetPath } from "@/lib/utils";
import SpaceMap from "./SpaceMap";
import TimeChart from "./TimeChart";

function FeaturedCard({
  item,
  className = "",
  innerClassName = "",
}: {
  item: LifeItem;
  className?: string;
  innerClassName?: string;
}) {
  const isWide = item.layout === "wide";
  const isPortrait = item.orientation === "portrait";
  const aspectClass = isWide
    ? "aspect-[16/9]"
    : isPortrait
    ? "aspect-[3/4]"
    : "aspect-[4/3]";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-foreground/5 ${aspectClass} ${className}`}
    >
      <div className={`relative h-full w-full ${innerClassName}`}>
        <Image
          src={getAssetPath(item.images?.[0] ?? item.src)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            isWide
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-8">
        <h3 className="font-semibold text-white drop-shadow">{item.title}</h3>
      </div>
    </div>
  );
}

export default function Life() {
  const [activeTab, setActiveTab] = useState<"featured" | "viz">("featured");

  const items = getFeaturedItems("all");
  const row1 = items.slice(0, 2);   // 泰山, 黄山
  const row2 = items.slice(2, 4);   // 云杉坪, 转经筒
  const row3 = items.slice(4, 7);   // 东方明珠, 松赞干布寺, 香巴拉佛塔

  return (
    <section id="life" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Life</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            Where I&apos;ve been. How I spend my time.
          </p>
        </div>

        {/* Tabs: 精选 + 足迹 + 查看全部 */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
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
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "viz"
                ? "bg-[#B83B5E] text-white"
                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
            }`}
          >
            足迹
          </button>

          <a
            href={`/life/${lifeCategories[0]?.key}`}
            className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-4 py-1.5 text-sm font-medium text-foreground/80 hover:bg-foreground/10 transition-colors"
          >
            查看全部
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        {activeTab === "featured" && (
          <>
            {items.length === 0 ? (
              <div className="rounded-2xl border border-foreground/10 bg-foreground/5 px-6 py-16 text-center">
                <p className="text-foreground/60">该分类下暂时没有精选内容。</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Row 1: 泰山 (1/3) + 黄山 (2/3) — 等高，泰山定高 */}
                <div className="flex gap-4">
                  <FeaturedCard item={row1[0]} className="flex-1" />
                  <div className="group relative flex-[2] overflow-hidden rounded-2xl bg-foreground/5">
                    <Image
                      src={getAssetPath(row1[1].images?.[0] ?? row1[1].src)}
                      alt={row1[1].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-8">
                      <h3 className="font-semibold text-white drop-shadow">{row1[1].title}</h3>
                    </div>
                  </div>
                </div>

                {/* Row 2: 云杉坪 (2/3) + 转经筒 (1/3) — 等高，转经筒定高 */}
                <div className="flex gap-4">
                  <div className="group relative flex-[2] overflow-hidden rounded-2xl bg-foreground/5">
                    <Image
                      src={getAssetPath(row2[0].images?.[0] ?? row2[0].src)}
                      alt={row2[0].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-8">
                      <h3 className="font-semibold text-white drop-shadow">{row2[0].title}</h3>
                    </div>
                  </div>
                  <FeaturedCard item={row2[1]} className="flex-1" />
                </div>

                {/* Row 3: 东方明珠 + 松赞干布寺 + 香巴拉佛塔 (各 1/3) */}
                <div className="grid gap-4 grid-cols-3">
                  {row3.map((item) => (
                    <FeaturedCard key={item.id} item={item} />
                  ))}
                </div>
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
      </div>
    </section>
  );
}

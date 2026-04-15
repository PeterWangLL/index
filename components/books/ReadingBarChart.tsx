"use client";

import { readingTimeStats } from "@/lib/books-data";

export default function ReadingBarChart() {
  const maxHours = Math.max(...readingTimeStats.map((d) => d.hours));

  return (
    <div className="rounded-2xl bg-foreground/5 p-6 sm:p-8">
      <h3 className="mb-6 text-lg font-semibold">阅读时长</h3>
      <div className="flex h-48 items-end justify-between gap-2 sm:gap-4">
        {readingTimeStats.map((item) => {
          const heightPercent = (item.hours / maxHours) * 100;
          return (
            <div key={item.year} className="flex flex-1 flex-col items-center gap-2">
              <div className="text-xs font-medium text-foreground/60 sm:text-sm">
                {item.hours}h
                {item.minutes > 0 && (
                  <span className="block text-[10px] text-foreground/40 sm:inline sm:ml-0.5">
                    {item.minutes}m
                  </span>
                )}
              </div>
              <div
                className="w-full max-w-[48px] rounded-t-lg bg-foreground/20 transition-all duration-500 hover:bg-foreground/30 hover:scale-y-105 origin-bottom"
                style={{ height: `${heightPercent}%` }}
                title={`${item.year}年：${item.hours}小时${item.minutes}分钟`}
              />
              <div className="text-xs font-medium text-foreground/50">{item.year}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

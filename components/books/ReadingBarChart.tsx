"use client";

import { motion } from "framer-motion";
import { readingTimeStats } from "@/lib/books-data";

export default function ReadingBarChart() {
  const maxHours = Math.max(...readingTimeStats.map((d) => d.hours));

  return (
    <div className="flex h-full flex-col rounded-2xl bg-[#F5F0E8] p-6 sm:p-8">
      <h3 className="mb-6 text-lg font-semibold text-[#2C2A26]">阅读时长</h3>
      <div className="flex h-[180px] items-end justify-between gap-2 sm:gap-4">
        {readingTimeStats.map((item, idx) => {
          const heightPercent = Math.max((item.hours / maxHours) * 100, 4);
          return (
            <div key={item.year} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div className="text-xs font-medium text-[#6B6560] sm:text-sm">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 + 0.3, duration: 0.4 }}
                >
                  {item.hours}h
                </motion.span>
                {item.minutes > 0 && (
                  <span className="block text-[10px] text-[#A9A094] sm:inline sm:ml-0.5">
                    {item.minutes}m
                  </span>
                )}
              </div>
              <div
                className="w-full max-w-[48px]"
                style={{ height: `${heightPercent}%` }}
              >
                <motion.div
                  className="h-full w-full rounded-t-lg bg-[#C4B7A6] origin-bottom hover:bg-[#B0A290]"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.08,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05 }}
                  title={`${item.year}年：${item.hours}小时${item.minutes}分钟`}
                />
              </div>
              <motion.div
                className="text-xs font-medium text-[#8B8277]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 + 0.4, duration: 0.4 }}
              >
                {item.year}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

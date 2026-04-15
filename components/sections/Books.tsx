"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { generalStats, booksList } from "@/lib/books-data";
import ReadingBarChart from "@/components/books/ReadingBarChart";
import GenreRadar from "@/components/books/GenreRadar";
import BookCard from "@/components/books/BookCard";
import FadeIn from "@/components/motion/FadeIn";
import CountUp from "@/components/motion/CountUp";

const featuredSlugs = [
  "cang-lang-zhi-shui",
  "xiao-xiang-ren-jia",
  "ping-fan-de-shi-jie",
  "bai-lu-yuan",
  "bai-nian-gu-du",
  "ming-chao-na-xie-shi",
  "san-ti",
  "fan-ren-xiu-xian-zhuan",
];

const featuredBooks = featuredSlugs
  .map((slug) => booksList.find((b) => b.slug === slug))
  .filter(Boolean);

export default function Books() {
  return (
    <section id="books" className="bg-background py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Books</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            微信读书重度用户。阅读是我理解世界和自我的方式。
          </p>
        </FadeIn>

        {/* 核心数据 */}
        <div className="grid gap-4 sm:grid-cols-3">
          {generalStats.map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <motion.div
                className="rounded-2xl bg-[#F9ED69]/25 p-6 text-center"
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className="text-4xl font-bold text-[#B83B5E]">
                  <CountUp target={stat.value} duration={1.8} />
                </div>
                <div className="mt-1 text-sm text-foreground/70">{stat.label}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* 柱状图 + 雷达图 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <FadeIn delay={0.1} className="h-full lg:col-span-2">
            <ReadingBarChart />
          </FadeIn>
          <FadeIn delay={0.2} className="h-full lg:col-span-1">
            <GenreRadar />
          </FadeIn>
        </div>

        {/* 喜欢的书（固定 8 本） */}
        <div className="mt-10">
          <FadeIn>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">喜欢的书</h3>
              <span className="text-sm text-foreground/60">8 本精选</span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {featuredBooks.map((book, idx) => (
              <FadeIn key={book!.slug} delay={idx * 0.06} y={16}>
                <BookCard book={book!} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 查看全部入口 */}
        <FadeIn delay={0.2} className="mt-6 flex items-center justify-end">
          <Link
            href="/books"
            className="inline-flex items-center gap-1 rounded-full bg-[#F9ED69] px-4 py-1.5 text-sm font-medium text-foreground hover:bg-[#F9ED69]/80 transition-colors"
          >
            查看全部书单
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
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

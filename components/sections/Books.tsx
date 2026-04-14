"use client";

import Link from "next/link";

const stats = [
  { value: 486, label: "总阅读时长（小时）" },
  { value: 42, label: "读完的书" },
  { value: 128, label: "连续听书天数" },
];

const books = [
  {
    slug: "zhi-shen-shi-nei",
    title: "置身事内",
    author: "兰小欢",
    summary: "读懂中国政府与经济发展的入门书，视角清晰，案例扎实。",
  },
  {
    slug: "the-little-prince",
    title: "小王子",
    author: "圣埃克苏佩里",
    summary: "小时候看是童话，长大后再读才发现全是人生隐喻。",
  },
  {
    slug: "the-courage-to-be-disliked",
    title: "被讨厌的勇气",
    author: "岸见一郎",
    summary: "阿德勒心理学的通俗解读，教会我课题分离与活在当下。",
  },
  {
    slug: "hackers-and-painters",
    title: "黑客与画家",
    author: "Paul Graham",
    summary: "程序员与艺术创作的跨界思考，关于创业、设计与财富的观念启蒙。",
  },
];

export default function Books() {
  return (
    <section id="books" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Books</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            微信读书重度用户。大学时读得多，现在坚持每天听书15分钟。
          </p>
        </div>

        {/* Stats + Book cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Stats cards */}
          <div className="space-y-4 lg:col-span-1">
            {stats.map((stat, idx) => (
              <div key={idx} className="rounded-2xl bg-foreground/5 p-6">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Book list */}
          <div className="flex gap-6 overflow-x-auto pb-4 lg:col-span-2">
            {books.map((book) => (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="group shrink-0 w-36 space-y-3"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-lg bg-foreground/10">
                  {/* Book cover placeholder - replace with actual image later */}
                  <div className="h-full w-full bg-foreground/5 transition-transform group-hover:scale-105" />
                </div>
                <div>
                  <h3 className="font-medium leading-tight group-hover:text-foreground/80 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-foreground/50">{book.author}</p>
                </div>
                <p className="text-xs text-foreground/70 line-clamp-3">{book.summary}</p>
                <span className="inline-block text-xs font-medium text-foreground/60 hover:text-foreground transition-colors">
                  阅读笔记 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

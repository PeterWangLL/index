import Link from "next/link";
import { generalStats, getFavoriteBooks } from "@/lib/books-data";
import ReadingBarChart from "@/components/books/ReadingBarChart";
import GenreRadar from "@/components/books/GenreRadar";
import BookCard from "@/components/books/BookCard";

const favoriteBooks = getFavoriteBooks();

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/#books"
            className="inline-flex items-center gap-1 text-sm text-[#8B8277] hover:text-[#5C5348] transition-colors"
          >
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            返回主页
          </a>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#2C2A26] sm:text-4xl">Books</h1>
          <p className="mt-2 text-[#6B6560]">
            微信读书重度用户。阅读是我理解世界和自我的方式。
          </p>
        </div>

        {/* 核心数据 */}
        <div className="grid gap-4 sm:grid-cols-3">
          {generalStats.map((stat, idx) => (
            <div key={idx} className="rounded-2xl bg-[#F5F0E8] p-6 text-center">
              <div className="text-3xl font-bold text-[#4A443D]">{stat.value}</div>
              <div className="mt-1 text-sm text-[#8B8277]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 柱状图 + 雷达图 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ReadingBarChart />
          </div>
          <div className="lg:col-span-1">
            <GenreRadar />
          </div>
        </div>

        {/* 全部喜欢的书 */}
        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#2C2A26]">喜欢的书</h2>
            <span className="text-sm text-[#8B8277]">
              按阅读时间从新到旧
            </span>
          </div>
          <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {favoriteBooks.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>

        {/* Bottom back link */}
        <div className="mt-16 text-center">
          <a
            href="/#books"
            className="inline-flex items-center gap-2 rounded-full bg-[#F5F0E8] px-5 py-2 text-sm font-medium text-[#5C5348] hover:bg-[#EBE4D8] transition-colors"
          >
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            返回主页
          </a>
        </div>
      </div>
    </main>
  );
}

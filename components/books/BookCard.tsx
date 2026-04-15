"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Book } from "@/lib/books-data";

export default function BookCard({ book }: { book: Book }) {
  const hasNotes = !!book.content;

  return (
    <Link href={`/books/${book.slug}`} className="group block">
      <motion.div
        className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#E8E2D8] shadow-sm"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center">
            <span className="text-xs font-medium text-[#A9A094] line-clamp-3">
              {book.title}
            </span>
          </div>
        )}
        {hasNotes && (
          <span className="absolute right-2 top-2 rounded-full bg-[#A89882] px-1.5 py-0.5 text-[10px] font-medium text-[#FDFBF7]">
            笔记
          </span>
        )}
      </motion.div>
      <div className="mt-2.5">
        <h4 className="text-sm font-medium leading-snug text-[#2C2A26] line-clamp-2 group-hover:text-[#4A443D] transition-colors">
          {book.title}
        </h4>
        <p className="mt-0.5 text-xs text-[#8B8277] line-clamp-1">{book.author}</p>
      </div>
    </Link>
  );
}

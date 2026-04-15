"use client";

import Link from "next/link";
import type { Book } from "@/lib/books-data";

export default function BookCard({ book }: { book: Book }) {
  const hasNotes = !!book.content;

  return (
    <Link
      href={`/books/${book.slug}`}
      className="group block w-[110px] shrink-0 sm:w-[130px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 transition-transform duration-300 group-hover:scale-[1.02]">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center">
            <span className="text-xs font-medium text-foreground/40 line-clamp-3">
              {book.title}
            </span>
          </div>
        )}
        {hasNotes && (
          <span className="absolute right-2 top-2 rounded-full bg-foreground/90 px-1.5 py-0.5 text-[10px] font-medium text-background">
            笔记
          </span>
        )}
      </div>
      <div className="mt-2.5">
        <h4 className="text-sm font-medium leading-snug text-foreground/90 line-clamp-2 group-hover:text-foreground transition-colors">
          {book.title}
        </h4>
        <p className="mt-0.5 text-xs text-foreground/50 line-clamp-1">{book.author}</p>
      </div>
    </Link>
  );
}

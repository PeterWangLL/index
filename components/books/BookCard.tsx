"use client";

import Link from "next/link";
import type { Book } from "@/lib/books-data";
import { getAssetPath } from "@/lib/utils";
import TiltedCard from "@/components/animations/TiltedCard";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`} className="group block">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl">
        {book.cover ? (
          <TiltedCard
            imageSrc={getAssetPath(book.cover)}
            altText={book.title}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            scaleOnHover={1.03}
            rotateAmplitude={16}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-[#F9ED69]/20 p-3 text-center">
            <span className="text-xs font-medium text-foreground/70 line-clamp-3">
              {book.title}
            </span>
          </div>
        )}
      </div>
      <div className="mt-2.5">
        <h4 className="text-sm font-medium leading-snug text-foreground line-clamp-2 group-hover:text-[#B83B5E] transition-colors">
          {book.title}
        </h4>
        <p className="mt-0.5 text-xs text-foreground/60 line-clamp-1">{book.author}</p>
      </div>
    </Link>
  );
}

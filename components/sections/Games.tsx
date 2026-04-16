"use client";

import Link from "next/link";
import { gameItems } from "@/lib/game-data";
import ChromaGrid from "@/components/game/ChromaGrid";

export default function Games() {
  return (
    <section id="games" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Games</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            Downtime.
          </p>
        </div>

        <ChromaGrid items={gameItems} radius={280} />

        {/* View all */}
        <div className="mt-10 flex items-center justify-end">
          <Link
            href="/game"
            className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-4 py-1.5 text-sm font-medium text-foreground/80 hover:bg-foreground/10 transition-colors"
          >
            查看全部
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
        </div>
      </div>
    </section>
  );
}

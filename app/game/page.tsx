import { gameItems } from "@/lib/game-data";
import ChromaGrid from "@/components/game/ChromaGrid";

export const metadata = {
  title: "Games | Peter Wang",
};

export default function GamesPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/#games"
            className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-[#B83B5E] transition-colors"
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
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Games
          </h1>
          <p className="mt-2 text-foreground/70">
            一些打发时间的快乐来源。
          </p>
        </div>

        <ChromaGrid items={gameItems} radius={320} />

        {/* Bottom back link */}
        <div className="mt-16 text-center">
          <a
            href="/#games"
            className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-5 py-2 text-sm font-medium text-foreground/80 hover:bg-foreground/10 transition-colors"
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

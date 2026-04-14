"use client";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20"
    >
      <div className="z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
          Peter Wang
        </h1>
        <p className="mt-6 max-w-lg text-lg text-foreground/70 sm:text-xl">
          在代码与生活的交界处，寻找自己的节奏。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-foreground/50">
          <span className="rounded-full bg-foreground/5 px-3 py-1">#programming</span>
          <span className="rounded-full bg-foreground/5 px-3 py-1">#gaming</span>
          <span className="rounded-full bg-foreground/5 px-3 py-1">#music</span>
          <span className="rounded-full bg-foreground/5 px-3 py-1">#hiking</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-foreground/30 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-foreground/50" />
        </div>
      </div>
    </section>
  );
}

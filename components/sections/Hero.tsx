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
          Code. Hike. Read. Live.
        </p>
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

"use client";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20"
    >
      <div className="z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl">
          Peter Wang
        </h1>
        <p className="mt-6 max-w-lg text-lg text-foreground/70 sm:text-xl">
          在代码与生活的交界处，寻找自己的节奏。
        </p>
      </div>
    </section>
  );
}

"use client";

export default function Music() {
  return (
    <section id="music" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Music</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            孙燕姿歌迷。音乐是生活中不可或缺的背景音。
          </p>
        </div>

        {/* Music cards / album covers placeholder */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="shrink-0 w-48 space-y-3"
            >
              <div className="aspect-square rounded-xl bg-foreground/10" />
              <div className="h-4 w-3/4 rounded bg-foreground/10" />
              <div className="h-3 w-1/2 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

export default function Games() {
  return (
    <section id="games" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Games</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            炉石传说酒馆战棋、哈迪斯、文明6 — 再打一回合就睡。
          </p>
        </div>

        {/* Games Bento grid placeholder */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="aspect-[4/3] rounded-2xl bg-foreground/5 sm:col-span-2 lg:col-span-2" />
          <div className="aspect-[4/3] rounded-2xl bg-foreground/5" />
          <div className="aspect-[4/3] rounded-2xl bg-foreground/5" />
          <div className="aspect-[4/3] rounded-2xl bg-foreground/5 sm:col-span-2 lg:col-span-2" />
        </div>
      </div>
    </section>
  );
}

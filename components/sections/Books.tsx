"use client";

export default function Books() {
  return (
    <section id="books" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Books</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            微信读书重度用户。大学时读得多，现在坚持每天听书15分钟。
          </p>
        </div>

        {/* Stats + Book cards placeholder */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Stats cards */}
          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-2xl bg-foreground/5 p-6">
              <div className="text-3xl font-bold">0</div>
              <div className="mt-1 text-sm text-foreground/60">总阅读时长（小时）</div>
            </div>
            <div className="rounded-2xl bg-foreground/5 p-6">
              <div className="text-3xl font-bold">0</div>
              <div className="mt-1 text-sm text-foreground/60">读完的书</div>
            </div>
            <div className="rounded-2xl bg-foreground/5 p-6">
              <div className="text-3xl font-bold">0</div>
              <div className="mt-1 text-sm text-foreground/60">连续听书天数</div>
            </div>
          </div>

          {/* Book list */}
          <div className="flex gap-6 overflow-x-auto pb-4 lg:col-span-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="shrink-0 w-36 space-y-3">
                <div className="aspect-[2/3] rounded-lg bg-foreground/10" />
                <div className="h-4 w-3/4 rounded bg-foreground/10" />
                <div className="h-3 w-1/2 rounded bg-foreground/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

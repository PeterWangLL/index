"use client";

export default function Code() {
  return (
    <section id="code" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Code</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            记录技术成长过程中的思考、笔记与实践。
          </p>
        </div>

        {/* Articles grid placeholder */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-colors hover:border-foreground/20"
            >
              <div className="h-5 w-3/4 rounded bg-foreground/10" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-foreground/10" />
                <div className="h-3 w-5/6 rounded bg-foreground/10" />
              </div>
              <div className="mt-6 flex gap-2">
                <span className="h-5 w-12 rounded bg-foreground/10" />
                <span className="h-5 w-12 rounded bg-foreground/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

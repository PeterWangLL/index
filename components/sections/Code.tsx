"use client";

const articles = [
  {
    title: "Next.js 静态导出的踩坑记录",
    summary: "从动态路由到图片优化，梳理我在配置 output: 'export' 时遇到的几个典型问题。",
    tags: ["Next.js", "Frontend"],
    date: "2025-04-10",
  },
  {
    title: "React 动画库选型笔记",
    summary: "对比 Framer Motion、GSAP 和 CSS 动画在不同场景下的优劣，以及我的选择逻辑。",
    tags: ["React", "Animation"],
    date: "2025-03-22",
  },
  {
    title: "Tailwind CSS 4 升级体验",
    summary: "新版的 @import 语法、主题变量变化，以及迁移过程中的兼容性处理。",
    tags: ["Tailwind", "CSS"],
    date: "2025-02-15",
  },
];

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

        {/* Articles grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-colors hover:border-foreground/20"
            >
              <div>
                <h3 className="text-lg font-semibold leading-snug group-hover:text-foreground/90 transition-colors">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                  {article.summary}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-medium text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-foreground/40">{article.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

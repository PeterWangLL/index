"use client";

export default function Introduction() {
  const tags = ["程序员", "孙燕姿歌迷", "文明6玩家", "微信读书用户", "徒步爱好者"];

  return (
    <section id="introduction" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Avatar placeholder */}
          <div className="flex justify-center md:justify-start">
            <div className="h-64 w-64 rounded-2xl bg-foreground/10" />
          </div>

          {/* Text content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Introduction</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                这里是第一段自我介绍，讲述我是谁，我在做什么，以及我对技术和生活的热情。
              </p>
              <p>
                这里是第二段自我介绍，可以提到我的工作经历、技术方向，或者一些有趣的生活理念。
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-foreground/5 px-4 py-1.5 text-sm font-medium text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

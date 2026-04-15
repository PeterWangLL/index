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
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Introduction</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                你好，我是 Peter，一名热爱前端技术的开发者。比起追逐最新的框架，我更在意代码是否优雅、用户体验是否流畅，以及一个产品从想法到落地的完整过程。
              </p>
              <p>
                工作之余，我喜欢用音乐填满通勤的间隙，用游戏探索另一个世界的规则，用徒步感受山风与海拔的变化，用阅读和听书保持思考的习惯。我相信技术是为了让生活更好，而生活本身才是目的。
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#F9ED69]/30 px-4 py-1.5 text-sm font-medium text-foreground/80"
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

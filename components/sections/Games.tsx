"use client";

const games = [
  {
    title: "炉石传说：酒馆战棋",
    desc: "从 6000 分跌跌撞撞爬上 8000，偏爱机械和鱼人阵容。",
    detail: " favorite 英雄：米尔豪斯、托奇",
  },
  {
    title: "Hades",
    desc: "一款让我心甘情愿死上百次的 Roguelike，每一把武器都有独特的爽感。",
    detail: "通关次数：32 次 |  favorite 武器：盾4",
  },
  {
    title: "文明6",
    desc: `刚入坑 50 小时，还在「神级」难度门前徘徊。每次都说再来一回合，然后天就亮了。`,
    detail: " favorite 领袖：秦始皇 | 最大成就：飞天胜利一次",
  },
];

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

        {/* Games cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-colors hover:border-foreground/20"
            >
              <div>
                <h3 className="text-lg font-semibold">{game.title}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  {game.desc}
                </p>
              </div>
              <p className="mt-6 text-xs text-foreground/50">{game.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

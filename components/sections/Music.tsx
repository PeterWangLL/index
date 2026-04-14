"use client";

import { useState } from "react";

const tracks = [
  {
    period: "2025.04",
    title: "爱错",
    artist: "王力宏",
    summary: "最近单曲循环最多的一首。副歌的情绪递进很抓人，像是在唱一种明知道会错却还是奋不顾身的状态。",
    detail: "这首歌的旋律线条非常流畅，编曲上用了很多弦乐铺垫，到了副歌突然释放。最近加班回家路上经常听，有一种说不出的共鸣。",
  },
  {
    period: "2025.02",
    title: "天黑黑",
    artist: "孙燕姿",
    summary: "小时候听的是旋律，现在听的是开头那一句「我的小时候，吵闹任性的时候」。",
    detail: "孙燕姿的歌好像总有一种魔力，隔几年再听，听懂的部分就会多一层。《天黑黑》现在对我来说，更像是一首关于「回家」的歌。",
  },
  {
    period: "2024.11",
    title: "沙漏",
    artist: "陶喆",
    summary: "一首相对冷门但很有味道的 R&B，节奏舒服，适合周末午后。",
    detail: "陶喆后期的作品里，这首是我私心最爱的之一。没有太复杂的编曲，但吉他和人声的配合恰到好处，有一种岁月沉淀下来的松弛感。",
  },
];

export default function Music() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="music" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Music</h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            音乐是情绪的日记。这里记录某段时间里，反复播放的那几首歌。
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-foreground/20">
          {tracks.map((track, idx) => (
            <div key={idx} className="relative">
              {/* dot */}
              <div className="absolute -left-[21px] top-2 h-2 w-2 rounded-full bg-foreground/40" />

              <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-5 transition-colors hover:border-foreground/20">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    {track.title}
                    <span className="ml-2 text-sm font-normal text-foreground/50">{track.artist}</span>
                  </h3>
                  <span className="text-xs text-foreground/40">{track.period}</span>
                </div>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{track.summary}</p>

                {expanded === idx && (
                  <p className="mt-3 text-sm text-foreground/60 leading-relaxed border-t border-foreground/10 pt-3">
                    {track.detail}
                  </p>
                )}

                <button
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                  className="mt-3 text-xs font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  {expanded === idx ? "收起" : "展开更多"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

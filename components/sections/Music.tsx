"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ElectricBorder from "@/components/animations/ElectricBorder";
import OrbitImages from "@/components/animations/OrbitImages";
import { artist, albumCovers } from "@/lib/music-data";
import { getAssetPath } from "@/lib/utils";

const notes = [
  {
    title: "天黑黑",
    rotate: -2,
    tape: "#B83B5E25",
    lines: [
      "我爱上 让我奋不顾身的一个人",
      "我以为 这就是我所追求的世界",
      "然而横冲直撞 被误解被骗",
      "是否成人的世界背后 总有残缺",
    ],
  },
  {
    title: "遇见",
    rotate: 1.5,
    tape: "#F08A5D35",
    lines: [
      "我遇见谁 会有怎样的对白",
      "我等的人 他在多远的未来",
      "我听见风来自地铁和人海",
      "我排着队 拿着爱的号码牌",
    ],
  },
  {
    title: "我怀念的",
    rotate: -1,
    tape: "#4CAF5030",
    lines: [
      "我怀念的是无话不说",
      "我怀念的是一起做梦",
      "我怀念的是争吵以后",
      "还是想要爱你的冲动",
    ],
  },
];

export default function Music() {
  return (
    <section id="music" className="py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Music</h2>
          <p className="mt-4 mx-auto max-w-2xl text-foreground/70">
            Stefanie Sun. On repeat.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5 items-center">
          {/* Left: Electric Border - Artist Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:col-span-2"
          >
            <ElectricBorder
              color={artist.color}
              speed={1.2}
              chaos={0.12}
              borderRadius={24}
              className="w-full max-w-[18rem] sm:max-w-[20rem]"
            >
              <div className="relative flex flex-col overflow-hidden rounded-3xl bg-foreground/[0.02]">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={getAssetPath(artist.image)}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 288px, 320px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                  <p className="text-sm font-medium text-white/80 tracking-wide">代表作</p>
                  <p className="mt-1 text-2xl font-bold text-white">{artist.track}</p>
                  <p className="mt-1 text-base font-medium text-white/90">{artist.name}</p>
                </div>
              </div>
            </ElectricBorder>
          </motion.div>

          {/* Right: Lyrics quote + Orbit Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full lg:col-span-3 lg:h-[420px]"
          >
            {/* Lyrics floating above orbit on large screens */}
            <div className="relative z-10 mb-8 flex flex-nowrap items-start justify-center gap-3 sm:gap-4 lg:absolute lg:inset-x-0 lg:top-4 lg:mb-0">
              {notes.map((note) => (
                <div
                  key={note.title}
                  className="relative inline-block w-auto min-w-max rounded-xl border border-[#E8E0D0] bg-[#FFFDF0] px-5 py-4 shadow-md dark:border-[#6A2C7040] dark:bg-[#2D1B33] sm:px-7 sm:py-5 lg:px-8 lg:py-6"
                  style={{ transform: `rotate(${note.rotate}deg)` }}
                >
                  {/* Tape strip */}
                  <div
                    className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rounded-sm opacity-80 sm:w-24"
                    style={{ backgroundColor: note.tape }}
                  />
                  <div className="space-y-1.5 text-center">
                    {note.lines.map((line, idx) => (
                      <p
                        key={idx}
                        className="whitespace-nowrap text-sm font-medium text-foreground/80 sm:text-base"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Orbit */}
            <div className="relative h-[260px] w-full sm:h-[300px] lg:absolute lg:left-0 lg:right-0 lg:top-[40px] lg:h-[260px]">
              <OrbitImages
                images={albumCovers.map(getAssetPath)}
                altPrefix="专辑封面"
                shape="ellipse"
                responsive
                baseWidth={1200}
                radiusX={520}
                radiusY={100}
                itemSize={120}
                duration={26}
                rotation={-6}
                showPath
                pathColor={`${artist.color}30`}
                pathWidth={2}
                easing="linear"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ElectricBorder from "@/components/animations/ElectricBorder";
import OrbitImages from "@/components/animations/OrbitImages";
import { artist, albumCovers } from "@/lib/music-data";

const lyrics = [
  "我怀念的是无话不说",
  "我怀念的是一起做梦",
  "我怀念的是争吵以后",
  "还是想要爱你的冲动",
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
            听歌不算多，但会反复循环喜欢的几首。这里是一个冷门歌手的代表作小角落。
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
                    src={artist.image}
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
            className="relative w-full lg:col-span-3 lg:h-[500px]"
          >
            {/* Lyrics floating above orbit on large screens */}
            <div className="relative z-10 mb-6 text-center lg:absolute lg:inset-x-0 lg:top-6 lg:mb-0">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: artist.color }}
              >
                代表作歌词
              </p>
              <div className="space-y-1">
                {lyrics.map((line, idx) => (
                  <motion.p
                    key={idx}
                    className="text-base font-medium text-foreground/80 sm:text-lg"
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      delay: idx * 0.8,
                      ease: "easeInOut",
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Orbit */}
            <div className="relative h-[280px] w-full sm:h-[340px] lg:absolute lg:inset-0 lg:h-auto">
              <OrbitImages
                images={albumCovers}
                altPrefix="专辑封面"
                shape="ellipse"
                responsive
                baseWidth={1200}
                radiusX={520}
                radiusY={140}
                itemSize={130}
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

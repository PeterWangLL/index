"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { genreStats } from "@/lib/books-data";

export default function GenreRadar() {
  const maxCount = Math.max(...genreStats.map((g) => g.count));
  const levels = 4;
  const cx = 150;
  const cy = 130;
  const radius = 80;
  const total = genreStats.length;

  const points = genreStats.map((g, i) => {
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    const r = (g.count / maxCount) * radius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y, label: g.label, count: g.count, angle };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const [tooltip, setTooltip] = useState<{
    label: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="relative flex h-full min-h-[220px] flex-col rounded-2xl bg-foreground/[0.03] p-6 backdrop-blur-sm sm:p-8">
      <h3 className="mb-2 text-lg font-semibold text-foreground">阅读偏好</h3>
      <div className="relative flex flex-1 items-center justify-center">
        <motion.svg
          viewBox="0 0 300 260"
          className="w-full max-w-[280px]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <defs>
            <radialGradient id="radarFill" cx={cx} cy={cy} r={radius} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F08A5D" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F9ED69" stopOpacity="0.2" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid circles */}
          {Array.from({ length: levels }).map((_, i) => {
            const r = ((i + 1) / levels) * radius;
            return (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.2}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              />
            );
          })}

          {/* Axes */}
          {points.map((p, i) => (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + radius * Math.cos(p.angle)}
              y2={cy + radius * Math.sin(p.angle)}
              stroke="currentColor"
              strokeOpacity={0.2}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            />
          ))}

          {/* Data polygon */}
          <motion.polygon
            points={polygonPoints}
            fill="url(#radarFill)"
            stroke="#B83B5E"
            strokeWidth={2.5}
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Data points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={5}
              fill="#6A2C70"
              stroke="var(--background)"
              strokeWidth={2}
              filter="url(#glow)"
              className="cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.4, ease: "backOut" }}
              onMouseEnter={() => setTooltip({ label: p.label, count: p.count, x: p.x, y: p.y })}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}

          {/* Labels */}
          {points.map((p, i) => {
            const labelRadius = radius + 26;
            const x = cx + labelRadius * Math.cos(p.angle);
            const y = cy + labelRadius * Math.sin(p.angle);
            let textAnchor: "middle" | "start" | "end" = "middle";
            if (Math.abs(x - cx) > 10) {
              textAnchor = x > cx ? "start" : "end";
            }
            return (
              <motion.text
                key={i}
                x={x}
                y={y}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="fill-foreground text-[12px] font-medium"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
              >
                {p.label}
              </motion.text>
            );
          })}
        </motion.svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-20 rounded-lg border border-foreground/10 bg-white/95 px-3 py-2 text-xs font-medium text-foreground shadow-lg"
            style={{
              left: `calc(50% + ${((tooltip.x - cx) / 300) * 100}% - 2rem)`,
              top: `calc(50% + ${((tooltip.y - cy) / 260) * 100}% - 2.5rem)`,
            }}
          >
            <div className="text-foreground/70">{tooltip.label}</div>
            <div className="text-sm font-semibold text-[#B83B5E]">{tooltip.count}h</div>
          </div>
        )}
      </div>
    </div>
  );
}

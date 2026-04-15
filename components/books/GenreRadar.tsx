"use client";

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

  return (
    <div className="rounded-2xl bg-foreground/5 p-6 sm:p-8">
      <h3 className="mb-2 text-lg font-semibold">阅读偏好</h3>
      <div className="relative mx-auto w-full max-w-[320px]">
        <svg viewBox="0 0 300 260" className="w-full">
          {/* Grid circles */}
          {Array.from({ length: levels }).map((_, i) => {
            const r = ((i + 1) / levels) * radius;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="currentColor"
                className="text-foreground/10"
              />
            );
          })}

          {/* Axes */}
          {points.map((p, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + radius * Math.cos(p.angle)}
              y2={cy + radius * Math.sin(p.angle)}
              stroke="currentColor"
              className="text-foreground/10"
            />
          ))}

          {/* Data polygon */}
          <polygon
            points={polygonPoints}
            fill="currentColor"
            className="text-foreground/15"
            stroke="currentColor"
            strokeWidth={2}
          />

          {/* Data points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="currentColor"
              className="text-foreground/60"
            />
          ))}

          {/* Labels */}
          {points.map((p, i) => {
            const labelRadius = radius + 22;
            const x = cx + labelRadius * Math.cos(p.angle);
            const y = cy + labelRadius * Math.sin(p.angle);
            let textAnchor: "middle" | "start" | "end" = "middle";
            if (Math.abs(x - cx) > 10) {
              textAnchor = x > cx ? "start" : "end";
            }
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="fill-foreground/70 text-[11px] font-medium"
              >
                {p.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

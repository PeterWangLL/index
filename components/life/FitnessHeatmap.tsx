"use client";

import { useMemo, useState } from "react";
import type { FitnessRecord } from "@/lib/life-data";

const TYPE_COLORS: Record<FitnessRecord["type"], string> = {
  strength: "#B83B5E",
  cardio: "#4ECDC4",
  outdoor: "#F7DC6F",
  rest: "#E5E7EB",
};

const TYPE_LABELS: Record<FitnessRecord["type"], string> = {
  strength: "力量",
  cardio: "有氧",
  outdoor: "户外",
  rest: "休息",
};

function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getMonthName(m: number) {
  return `${m + 1}月`;
}

export type FitnessHeatmapProps = {
  records: FitnessRecord[];
};

export default function FitnessHeatmap({ records }: FitnessHeatmapProps) {
  const today = useMemo(() => new Date(), []);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const recordMap = useMemo(() => {
    const map = new Map<string, FitnessRecord>();
    records.forEach((r) => map.set(r.date, r));
    return map;
  }, [records]);

  // ========== Year View ==========
  const { yearData, monthMarkers } = useMemo(() => {
    const year = selectedYear;
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    const firstMonday = new Date(start);
    firstMonday.setDate(start.getDate() - ((start.getDay() + 6) % 7));

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    for (let d = new Date(firstMonday); d <= end; d.setDate(d.getDate() + 1)) {
      currentWeek.push(new Date(d));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length) {
      while (currentWeek.length < 7) {
        const last = currentWeek[currentWeek.length - 1];
        const next = new Date(last);
        next.setDate(last.getDate() + 1);
        currentWeek.push(next);
      }
      weeks.push(currentWeek);
    }

    // 计算每个月第一个非空周的索引，用于放置月份标签
    const markers: { month: number; weekIndex: number }[] = [];
    for (let m = 0; m < 12; m++) {
      const idx = weeks.findIndex((week) =>
        week.some((date) => date.getFullYear() === year && date.getMonth() === m)
      );
      if (idx !== -1) markers.push({ month: m, weekIndex: idx });
    }

    return { yearData: weeks, monthMarkers: markers };
  }, [selectedYear]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    records.forEach((r) => years.add(new Date(r.date).getFullYear()));
    const list = Array.from(years).sort((a, b) => b - a);
    return list.length ? list : [today.getFullYear()];
  }, [records, today]);

  const cellSize = 14; // px
  const colGap = 4; // px

  const DayCell = ({ date }: { date: Date | null }) => {
    if (!date) {
      return <div className="h-3.5 w-3.5 rounded-sm bg-transparent" />;
    }
    const key = formatDate(date);
    const record = recordMap.get(key);
    const color = record ? TYPE_COLORS[record.type] : "rgba(0,0,0,0.05)";
    return (
      <div
        className="h-3.5 w-3.5 rounded-sm"
        style={{ backgroundColor: color }}
        title={record ? `${key} ${TYPE_LABELS[record.type]}` : key}
      />
    );
  };

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Year selector */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {availableYears.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                selectedYear === y
                  ? "bg-[#B83B5E] text-white"
                  : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-x-auto rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-6 md:px-6">
        {/* 月份标签对齐到对应周列 */}
        <div className="relative mb-2 h-5" style={{ marginLeft: 34 }}>
          {monthMarkers.map(({ month, weekIndex }) => (
            <span
              key={month}
              className="absolute top-0 whitespace-nowrap text-xs text-foreground/50"
              style={{ left: weekIndex * (cellSize + colGap) }}
            >
              {getMonthName(month)}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {/* weekday labels */}
          <div className="flex flex-col justify-around py-0.5 pr-2 text-xs text-foreground/50">
            <span>一</span>
            <span>三</span>
            <span>五</span>
            <span>日</span>
          </div>
          <div className="flex gap-1 pr-4">
            {yearData.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((date, dIdx) => (
                  <DayCell key={dIdx} date={date} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/70">
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: TYPE_COLORS.strength }} />
          <span>力量</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: TYPE_COLORS.cardio }} />
          <span>有氧</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: TYPE_COLORS.outdoor }} />
          <span>户外</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-foreground/10" />
          <span>未打卡</span>
        </div>
      </div>
    </div>
  );
}

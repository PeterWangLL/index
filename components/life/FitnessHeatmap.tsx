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
  const yearData = useMemo(() => {
    const year = selectedYear;
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    // first Monday
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
    return weeks;
  }, [selectedYear]);



  const availableYears = useMemo(() => {
    const years = new Set<number>();
    records.forEach((r) => years.add(new Date(r.date).getFullYear()));
    const list = Array.from(years).sort((a, b) => b - a);
    return list.length ? list : [today.getFullYear()];
  }, [records, today]);

  const DayCell = ({ date, size = "sm" }: { date: Date | null; size?: "sm" | "md" | "lg" }) => {
    if (!date) {
      return (
        <div
          className={`rounded-md bg-transparent ${
            size === "sm" ? "h-4 w-4" : size === "md" ? "h-8 w-8" : "h-10 w-full"
          }`}
        />
      );
    }
    const key = formatDate(date);
    const record = recordMap.get(key);
    const color = record ? TYPE_COLORS[record.type] : "rgba(0,0,0,0.05)";
    const dim =
      size === "sm" ? "h-4 w-4" : size === "md" ? "h-8 w-8" : "h-10 w-full";
    return (
      <div className="group relative">
        <div
          className={`rounded-md ${dim}`}
          style={{ backgroundColor: color }}
          title={record ? `${key} ${TYPE_LABELS[record.type]} ${record.duration}min` : key}
        />
        {record && (
          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {key} · {TYPE_LABELS[record.type]} · {record.duration}min
            {record.note ? ` · ${record.note}` : ""}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative left-1/2 w-[66.67vw] -translate-x-1/2 space-y-6">
      {/* Year selector */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {availableYears.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                selectedYear === y
                  ? "bg-foreground text-white"
                  : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-6 md:px-6">
        <div>
          <div className="mb-3 grid grid-cols-12 gap-1 pl-10 text-xs text-foreground/50">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="text-center">
                {getMonthName(i)}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {/* weekday labels */}
            <div className="flex flex-col justify-around py-1 pr-3 text-xs text-foreground/50">
              <span>一</span>
              <span>三</span>
              <span>五</span>
              <span>日</span>
            </div>
            <div
              className="grid flex-1 gap-1"
              style={{ gridTemplateColumns: `repeat(${yearData.length}, minmax(0, 1fr))` }}
            >
              {yearData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((date, dIdx) => (
                    <DayCell key={dIdx} date={date} size="sm" />
                  ))}
                </div>
              ))}
            </div>
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
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(0,0,0,0.05)" }} />
          <span>未打卡</span>
        </div>
      </div>
    </div>
  );
}

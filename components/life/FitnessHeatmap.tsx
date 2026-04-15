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
  const [view, setView] = useState<"week" | "month" | "year">("month");
  const today = useMemo(() => new Date(), []);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

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

  // ========== Month View ==========
  const monthData = useMemo(() => {
    const year = selectedYear;
    const month = selectedMonth;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday-based
    const days: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    while (days.length % 7 !== 0) days.push(null);
    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [selectedYear, selectedMonth]);

  // ========== Week View ==========
  const weekData = useMemo(() => {
    const current = new Date(today);
    const monday = new Date(current);
    monday.setDate(current.getDate() - ((current.getDay() + 6) % 7));
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    return days;
  }, [today]);

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
            size === "sm" ? "h-3 w-3" : size === "md" ? "h-8 w-8" : "h-10 w-full"
          }`}
        />
      );
    }
    const key = formatDate(date);
    const record = recordMap.get(key);
    const color = record ? TYPE_COLORS[record.type] : "rgba(0,0,0,0.05)";
    const dim =
      size === "sm" ? "h-3 w-3" : size === "md" ? "h-8 w-8" : "h-10 w-full";
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
    <div className="space-y-6">
      {/* View Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-full bg-foreground/5 p-1">
          {(["week", "month", "year"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                view === v
                  ? "bg-[#B83B5E] text-white"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {v === "week" ? "周" : v === "month" ? "月" : "年"}
            </button>
          ))}
        </div>

        {view === "year" && (
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
        )}

        {view === "month" && (
          <>
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
            <div className="flex gap-1">
              {Array.from({ length: 12 }, (_, i) => i).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                    selectedMonth === m
                      ? "bg-[#B83B5E] text-white"
                      : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10"
                  }`}
                >
                  {m + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-4 py-6 md:px-6">
        {view === "year" && (
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="mb-2 flex gap-1 pl-8 text-[10px] text-foreground/50">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="w-[calc(100%/12)] text-center">
                    {getMonthName(i)}
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {/* weekday labels */}
                <div className="flex flex-col justify-around py-1 pr-2 text-[10px] text-foreground/50">
                  <span>一</span>
                  <span>三</span>
                  <span>五</span>
                  <span>日</span>
                </div>
                <div className="flex gap-1">
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
        )}

        {view === "month" && (
          <div>
            <div className="mb-3 text-lg font-semibold">
              {selectedYear}年{selectedMonth + 1}月
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-foreground/60">
              <div>周一</div>
              <div>周二</div>
              <div>周三</div>
              <div>周四</div>
              <div>周五</div>
              <div>周六</div>
              <div>周日</div>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {monthData.flat().map((date, idx) => {
                const record = date ? recordMap.get(formatDate(date)) : null;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg border p-2 ${
                      record
                        ? "border-transparent"
                        : "border-foreground/5 bg-foreground/[0.02]"
                    }`}
                    style={record ? { backgroundColor: `${TYPE_COLORS[record.type]}15` } : {}}
                  >
                    {date ? (
                      <>
                        <span className="text-xs text-foreground/60">{date.getDate()}</span>
                        {record ? (
                          <span
                            className="text-[10px] font-medium"
                            style={{ color: TYPE_COLORS[record.type] }}
                          >
                            {TYPE_LABELS[record.type]}
                          </span>
                        ) : (
                          <span className="text-[10px] text-foreground/30">—</span>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-foreground/20">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "week" && (
          <div>
            <div className="mb-3 text-lg font-semibold">本周</div>
            <div className="grid grid-cols-7 gap-2">
              {weekData.map((date) => {
                const record = recordMap.get(formatDate(date));
                return (
                  <div
                    key={date.toISOString()}
                    className="flex flex-col items-center gap-2 rounded-xl border border-foreground/10 p-3"
                  >
                    <span className="text-xs text-foreground/50">
                      {date.getMonth() + 1}/{date.getDate()}
                    </span>
                    <div
                      className="h-8 w-8 rounded-md"
                      style={{
                        backgroundColor: record ? TYPE_COLORS[record.type] : "rgba(0,0,0,0.05)",
                      }}
                    />
                    <span className="text-[10px] text-foreground/70">
                      {record ? `${TYPE_LABELS[record.type]}` : "未打卡"}
                    </span>
                    {record && (
                      <span className="text-[10px] text-foreground/50">{record.duration}min</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
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

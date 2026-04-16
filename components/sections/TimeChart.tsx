"use client";

import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const timeData = [
  { age: 0, family: 60, studying: 10, playing: 30, coding: 0, reading: 0, football: 0 },
  { age: 6, family: 45, studying: 35, playing: 20, coding: 0, reading: 0, football: 0 },
  { age: 12, family: 35, studying: 50, playing: 15, coding: 0, reading: 0, football: 0 },
  { age: 15, family: 25, studying: 60, playing: 15, coding: 0, reading: 0, football: 0 },
  { age: 18, family: 15, studying: 55, playing: 10, coding: 5, reading: 15, football: 0 },
  { age: 19, family: 12, studying: 45, playing: 8, coding: 20, reading: 15, football: 0 },
  { age: 20, family: 10, studying: 35, playing: 7, coding: 30, reading: 18, football: 0 },
  { age: 21, family: 10, studying: 25, playing: 8, coding: 35, reading: 22, football: 0 },
  { age: 22, family: 10, studying: 10, playing: 5, coding: 55, reading: 10, football: 10 },
  { age: 23, family: 10, studying: 8, playing: 5, coding: 52, reading: 10, football: 15 },
];

const layers = [
  { key: "family", label: "Family", color: "#F9ED69" },
  { key: "studying", label: "Studying", color: "#F08A5D" },
  { key: "playing", label: "Playing", color: "#A8E6CF" },
  { key: "reading", label: "Reading", color: "#B4F1F1" },
  { key: "football", label: "Football", color: "#4CAF50" },
  { key: "coding", label: "Coding", color: "#B83B5E" },
] as const;

export default function TimeChart() {
  const option = useMemo(
    () =>
    ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            type: "dashed",
            color: "rgba(106,44,112,0.25)",
          },
          label: { show: false },
        },
        backgroundColor: "rgba(255,255,255,0.98)",
        borderColor: "rgba(106,44,112,0.08)",
        borderRadius: 12,
        padding: [12, 16],
        textStyle: { color: "#6A2C70", fontSize: 13 },
        extraCssText: "box-shadow: 0 4px 20px rgba(0,0,0,0.08);",
        position: (point, _params, _dom, _rect, size) => {
          const x = point[0];
          const y = point[1];
          const boxWidth = size.contentSize[0];
          const boxHeight = size.contentSize[1];
          const viewWidth = size.viewSize[0];
          const viewHeight = size.viewSize[1];

          let posX = x + 15;
          let posY = y - boxHeight / 2;

          if (posX + boxWidth > viewWidth) {
            posX = x - boxWidth - 15;
          }
          if (posY < 0) {
            posY = 10;
          } else if (posY + boxHeight > viewHeight) {
            posY = viewHeight - boxHeight - 10;
          }
          return [posX, posY];
        },
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        containLabel: false,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: timeData.map((d) => d.age),
        show: false,
      },
      yAxis: {
        type: "value",
        max: 100,
        show: false,
      },
      series: layers.map((l) => ({
        name: l.label,
        type: "line",
        stack: "Total",
        smooth: 0.4,
        lineStyle: { width: 0 },
        itemStyle: { color: l.color },
        showSymbol: false,
        areaStyle: { opacity: 0.95, color: l.color },
        emphasis: {
          focus: "series",
          blurScope: "coordinateSystem",
          itemStyle: { opacity: 1 },
          areaStyle: { opacity: 1 },
        },
        blur: {
          areaStyle: { opacity: 0.1 },
          lineStyle: { opacity: 0.1 },
        },
        data: timeData.map((d) => d[l.key as keyof typeof d]),
      })),
    } as echarts.EChartsOption),
    []
  );

  return (
    <div className="flex flex-col rounded-2xl border border-foreground/10 bg-white/60 p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-2xl font-bold tracking-tight text-foreground">Time</h3>
      <p className="mt-2 text-sm text-foreground/70">
        这是我分配时间的方式，最近专注于工作和健身。
      </p>
      <div className="mt-4 h-64 w-full overflow-hidden rounded-2xl bg-white/40">
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {layers.map((l) => (
          <div key={l.key} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-xs text-foreground/70">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

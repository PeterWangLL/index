"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import chinaGeoJson from "china-geojson/src/geojson/china.json";

// 去过的省份（根据城市数据推导）
const visitedProvinces = ["江苏", "上海", "安徽", "山东", "云南"];

// Register once
echarts.registerMap("china", chinaGeoJson as any);

type ZoomLevel = "small" | "medium" | "large";

const zoomConfigs: Record<ZoomLevel, { zoom: number; center: [number, number] }> = {
  small: { zoom: 1.0, center: [105, 36] },
  medium: { zoom: 2.2, center: [118, 32] },
  large: { zoom: 5.0, center: [120.5, 31.8] },
};

export default function SpaceMap() {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("medium");
  const config = zoomConfigs[zoomLevel];
  const chartRef = useRef<ReactECharts>(null);
  const [markerPos, setMarkerPos] = useState<{ x: number; y: number } | null>(null);

  const updateMarker = useCallback(() => {
    const chart = (chartRef.current as any)?.getEchartsInstance?.();
    if (!chart) return;
    const pos = chart.convertToPixel({ geoIndex: 0 }, [118.8, 32.06]);
    if (pos && Array.isArray(pos)) {
      setMarkerPos({ x: pos[0], y: pos[1] });
    }
  }, []);

  useEffect(() => {
    const chart = (chartRef.current as any)?.getEchartsInstance?.();
    if (!chart) return;

    chart.on("finished", updateMarker);
    const t = setTimeout(updateMarker, 50);
    return () => {
      chart.off("finished", updateMarker);
      clearTimeout(t);
    };
  }, [updateMarker, zoomLevel]);

  const option = useMemo(
    () =>
      ({
        backgroundColor: "#E0F2F1",
        geo: {
          map: "china",
          roam: false,
          zoom: config.zoom,
          center: config.center,
          label: { show: false },
          itemStyle: {
            areaColor: "#F1F8E9",
            borderColor: "#ffffff",
            borderWidth: 1,
            shadowColor: "rgba(0,0,0,0.05)",
            shadowBlur: 5,
            shadowOffsetY: 2,
          },
          emphasis: {
            disabled: true,
          },
          regions: visitedProvinces.map((name) => ({
            name,
            itemStyle: {
              areaColor: "#B83B5E",
              borderColor: "#ffffff",
              borderWidth: 1,
            },
            select: {
              disabled: true,
            },
            emphasis: {
              disabled: true,
            },
          })),
        },
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "rgba(255,255,255,0.95)",
          borderColor: "rgba(106,44,112,0.1)",
          borderRadius: 8,
          textStyle: { color: "#6A2C70" },
          formatter: (params: { name?: string; seriesType?: string }) => {
            if (params.seriesType === "scatter") {
              return "所在地 · 南京";
            }
            if (visitedProvinces.includes(params.name || "")) {
              return `${params.name} · 去过`;
            }
            return params.name;
          },
        },
      } as echarts.EChartsOption),
    [config.center, config.zoom]
  );

  return (
    <div className="flex flex-col rounded-2xl border border-foreground/10 bg-white/60 p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-2xl font-bold tracking-tight text-foreground">Footprint</h3>
      <p className="mt-2 text-sm text-foreground/70">
        这是我的旅行足迹。目前定居在南京，中国。
      </p>
      <div className="relative mt-4 h-64 w-full overflow-hidden rounded-xl">
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: "100%", width: "100%" }}
        />

        {/* Custom location pin overlay */}
        {markerPos && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: markerPos.x,
              top: markerPos.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 drop-shadow"
              style={{ color: "#FDE047" }}
            >
              <defs>
                <mask id="pin-hole">
                  <rect width="24" height="24" fill="white" />
                  <circle cx="12" cy="10.5" r="3" fill="black" />
                </mask>
              </defs>
              <path
                fill="currentColor"
                stroke="none"
                mask="url(#pin-hole)"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
        )}

        {/* Zoom controls */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 p-1 shadow">
          {(["small", "medium", "large"] as ZoomLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setZoomLevel(lvl)}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                zoomLevel === lvl
                  ? "bg-[#B83B5E] text-white"
                  : "text-foreground/70 hover:bg-foreground/5"
              }`}
              aria-label={lvl === "small" ? "全国" : lvl === "medium" ? "华东" : "江浙沪"}
              title={lvl === "small" ? "全国" : lvl === "medium" ? "华东" : "江浙沪"}
            >
              {lvl === "small" ? "−" : lvl === "medium" ? "◯" : "＋"}
            </button>
          ))}
        </div>

        {/* Location label */}
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-foreground shadow">
          南京, 中国
        </div>
      </div>
    </div>
  );
}

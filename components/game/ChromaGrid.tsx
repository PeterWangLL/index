"use client";

import { useRef } from "react";
import { getAssetPath } from "@/lib/utils";
import "./ChromaGrid.css";

export type ChromaGridItem = {
  image: string;
  title: string;
  subtitle?: string;
  borderColor?: string;
  gradient?: string;
  wide?: boolean;
  aspectClass?: string;
};

export type ChromaGridProps = {
  items: ChromaGridItem[];
  className?: string;
  radius?: number;
};

export default function ChromaGrid({
  items,
  className = "",
  radius = 300,
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rootRef.current || !fadeRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rootRef.current.style.setProperty("--x", `${x}px`);
    rootRef.current.style.setProperty("--y", `${y}px`);
    fadeRef.current.style.opacity = "0";
  };

  const handleLeave = () => {
    if (!fadeRef.current) return;
    fadeRef.current.style.opacity = "1";
  };

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Group items into rows based on a max of 3 columns
  const rows: ChromaGridItem[][] = [];
  let currentRow: ChromaGridItem[] = [];
  let currentCols = 0;
  const MAX_COLS = 3;

  items.forEach((item) => {
    const itemCols = item.wide ? 2 : 1;
    if (currentCols + itemCols > MAX_COLS && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [item];
      currentCols = itemCols;
    } else {
      currentRow.push(item);
      currentCols += itemCols;
    }
  });
  if (currentRow.length) rows.push(currentRow);

  return (
    <div
      ref={rootRef}
      className={`chroma-grid relative flex flex-col gap-3 lg:gap-4 ${className}`}
      style={{ "--r": `${radius}px` } as React.CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {rows.map((row, rowIdx) => {
        const template = row
          .map((item) => (item.wide ? "2fr" : "1fr"))
          .join(" ");
        return (
          <div
            key={rowIdx}
            className="grid gap-3 lg:gap-4"
            style={{ gridTemplateColumns: template }}
          >
            {row.map((item, i) => (
              <article
                key={i}
                className="chroma-card"
                onMouseMove={handleCardMove}
                style={{
                  "--card-border": item.borderColor || "transparent",
                  "--card-gradient":
                    item.gradient || "linear-gradient(145deg, #333, #000)",
                } as React.CSSProperties}
              >
                <div
                  className={`chroma-img-wrapper ${
                    item.aspectClass || "aspect-[4/3]"
                  }`}
                >
                  <img src={getAssetPath(item.image)} alt={item.title} loading="lazy" />
                </div>
                <footer className="chroma-info">
                  <h3 className="name text-base font-semibold">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <span className="role text-sm">{item.subtitle}</span>
                  )}
                </footer>
              </article>
            ))}
          </div>
        );
      })}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
}

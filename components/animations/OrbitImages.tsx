"use client";

import { useMemo, useEffect, useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import "./OrbitImages.css";

function generateEllipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx: number, cy: number, r: number) {
  return generateEllipsePath(cx, cy, r, r);
}

interface OrbitItemProps {
  item: ReactNode;
  index: number;
  totalItems: number;
  path: string;
  itemSize: number;
  rotation: number;
  progress: MotionValue<number>;
  fill: boolean;
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }: OrbitItemProps) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;

  const offsetDistance = useTransform(progress, (p) => {
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return `${offset}%`;
  });

  return (
    <motion.div
      className="orbit-item"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: `path("${path}")`,
        offsetRotate: "0deg",
        offsetAnchor: "center center",
        offsetDistance,
      }}
    >
      <div style={{ transform: `rotate(${-rotation}deg)` }}>{item}</div>
    </motion.div>
  );
}

interface OrbitImagesProps {
  images?: string[];
  altPrefix?: string;
  shape?: "circle" | "ellipse" | "square" | "rectangle" | "triangle" | "star" | "heart" | "infinity" | "wave" | "custom";
  customPath?: string;
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  starPoints?: number;
  starInnerRatio?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: "normal" | "reverse";
  fill?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  easing?: string;
  paused?: boolean;
  centerContent?: ReactNode;
  responsive?: boolean;
}

export default function OrbitImages({
  images = [],
  altPrefix = "Orbiting image",
  shape = "ellipse",
  customPath,
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = "normal",
  fill = true,
  width = 100,
  height = 100,
  className = "",
  showPath = false,
  pathColor = "rgba(0,0,0,0.1)",
  pathWidth = 2,
  easing = "linear",
  paused = false,
  centerContent,
  responsive = false,
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    switch (shape) {
      case "circle":
        return generateCirclePath(designCenterX, designCenterY, radius);
      case "ellipse":
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
      case "square":
        return `M ${designCenterX - radius} ${designCenterY - radius} L ${designCenterX + radius} ${designCenterY - radius} L ${designCenterX + radius} ${designCenterY + radius} L ${designCenterX - radius} ${designCenterY + radius} Z`;
      case "rectangle":
        return `M ${designCenterX - radiusX} ${designCenterY - radiusY} L ${designCenterX + radiusX} ${designCenterY - radiusY} L ${designCenterX + radiusX} ${designCenterY + radiusY} L ${designCenterX - radiusX} ${designCenterY + radiusY} Z`;
      case "triangle": {
        const size = radius * 2;
        const h = (size * Math.sqrt(3)) / 2;
        const hs = size / 2;
        return `M ${designCenterX} ${designCenterY - h / 1.5} L ${designCenterX + hs} ${designCenterY + h / 3} L ${designCenterX - hs} ${designCenterY + h / 3} Z`;
      }
      case "star": {
        const step = Math.PI / starPoints;
        const outerR = radius;
        const innerR = radius * starInnerRatio;
        let p = "";
        for (let i = 0; i < 2 * starPoints; i++) {
          const r = i % 2 === 0 ? outerR : innerR;
          const angle = i * step - Math.PI / 2;
          const x = designCenterX + r * Math.cos(angle);
          const y = designCenterY + r * Math.sin(angle);
          p += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
        }
        return p + " Z";
      }
      case "heart": {
        const s = radius / 15;
        return `M ${designCenterX} ${designCenterY + 12 * s} C ${designCenterX - 20 * s} ${designCenterY - 5 * s}, ${designCenterX - 12 * s} ${designCenterY - 18 * s}, ${designCenterX} ${designCenterY - 8 * s} C ${designCenterX + 12 * s} ${designCenterY - 18 * s}, ${designCenterX + 20 * s} ${designCenterY - 5 * s}, ${designCenterX} ${designCenterY + 12 * s}`;
      }
      case "infinity":
        return `M ${designCenterX} ${designCenterY} C ${designCenterX + radiusX * 0.5} ${designCenterY - radiusY}, ${designCenterX + radiusX} ${designCenterY - radiusY}, ${designCenterX + radiusX} ${designCenterY} C ${designCenterX + radiusX} ${designCenterY + radiusY}, ${designCenterX + radiusX * 0.5} ${designCenterY + radiusY}, ${designCenterX} ${designCenterY} C ${designCenterX - radiusX * 0.5} ${designCenterY + radiusY}, ${designCenterX - radiusX} ${designCenterY + radiusY}, ${designCenterX - radiusX} ${designCenterY} C ${designCenterX - radiusX} ${designCenterY - radiusY}, ${designCenterX - radiusX * 0.5} ${designCenterY - radiusY}, ${designCenterX} ${designCenterY}`;
      case "wave": {
        const w = radiusX * 2;
        const amplitude = radiusY;
        const waves = 3;
        const pts: string[] = [];
        const segs = waves * 20;
        const hw = w / 2;
        for (let i = 0; i <= segs; i++) {
          const x = designCenterX - hw + (w * i) / segs;
          const y = designCenterY + Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
          pts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
        }
        for (let i = segs; i >= 0; i--) {
          const x = designCenterX - hw + (w * i) / segs;
          const y = designCenterY - Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
          pts.push(`L ${x} ${y}`);
        }
        return pts.join(" ") + " Z";
      }
      case "custom":
        return customPath || generateCirclePath(designCenterX, designCenterY, radius);
      default:
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
    }
  }, [shape, customPath, designCenterX, designCenterY, radiusX, radiusY, radius, starPoints, starInnerRatio]);

  useEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;
    let rafId: number;
    let lastTime = performance.now();
    const speed = 100 / (duration * 1000);
    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      const current = progress.get();
      const next = current + (direction === "reverse" ? -1 : 1) * delta * speed;
      progress.set(next);
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [progress, duration, direction, paused]);

  const containerWidth = responsive ? "100%" : typeof width === "number" ? width : "100%";
  const containerHeight = responsive
    ? "auto"
    : typeof height === "number"
    ? height
    : typeof width === "number"
    ? width
    : "auto";

  const items = images.map((src, index) => (
    <img key={src} src={src} alt={`${altPrefix} ${index + 1}`} draggable={false} className="orbit-image" />
  ));

  return (
    <div
      ref={containerRef}
      className={`orbit-container ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
        aspectRatio: responsive ? "1 / 1" : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className={responsive ? "orbit-scaling-container orbit-scaling-container--responsive" : "orbit-scaling-container"}
        style={{
          width: responsive ? baseWidth : "100%",
          height: responsive ? baseWidth : "100%",
          transform: responsive ? `translate(-50%, -50%) scale(${scale})` : undefined,
        }}
      >
        <div className="orbit-rotation-wrapper" style={{ transform: `rotate(${rotation}deg)` }}>
          {showPath && (
            <svg width="100%" height="100%" viewBox={`0 0 ${baseWidth} ${baseWidth}`} className="orbit-path-svg">
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / scale} />
            </svg>
          )}

          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>

      {centerContent && <div className="orbit-center-content">{centerContent}</div>}
    </div>
  );
}

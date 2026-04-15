"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
}

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0) as MotionValue<number>;
  const y = useMotionValue(0) as MotionValue<number>;
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    if (halfWidth === 0 || halfHeight === 0) return;

    const offsetX = e.clientX - rect.left - halfWidth;
    const offsetY = e.clientY - rect.top - halfHeight;

    const rotationX = (offsetY / halfHeight) * -rotateAmplitude;
    const rotationY = (offsetX / halfWidth) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    setLastY(0);
  }

  return (
    <figure
      ref={ref}
      style={{
        height: containerHeight,
        width: containerWidth,
        position: "relative",
        perspective: 800,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          width: imageWidth,
          height: imageHeight,
          position: "relative",
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          style={{
            width: imageWidth,
            height: imageHeight,
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            borderRadius: 12,
            willChange: "transform",
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              willChange: "transform",
              transform: "translateZ(30px)",
            }}
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>
    </figure>
  );
}

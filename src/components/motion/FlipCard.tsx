"use client";

import { useState } from "react";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
}

/** CSS 3D 翻转卡片：点击翻转，正面/反面各放不同内容 */
export default function FlipCard({
  front, back, width = "100%", height = 180, className,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`cursor-pointer ${className ?? ""}`}
      style={{ width, height: typeof height === "number" ? height : height, perspective: 800 }}
      onClick={() => setFlipped(!flipped)}
    >
      <div style={{
        width: "100%", height: "100%",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* 正面 */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            border: "2px solid var(--border-medium)",
            background: "var(--color-bg)",
          }}>
          <div className="p-5 h-full flex flex-col justify-center items-center text-center">
            {front}
          </div>
          <div className="absolute bottom-2 right-3 text-[10px]"
            style={{ color: "var(--color-text-muted)" }}>
            点击翻转 →
          </div>
        </div>
        {/* 背面 */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "2px solid var(--color-brand)",
            background: "var(--color-gray-50)",
          }}>
          <div className="p-5 h-full flex flex-col justify-center items-center text-center">
            {back}
          </div>
          <div className="absolute bottom-2 right-3 text-[10px]"
            style={{ color: "var(--color-text-muted)" }}>
            ← 翻回去
          </div>
        </div>
      </div>
    </div>
  );
}
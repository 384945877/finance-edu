"use client";

interface ProgressRingProps {
  value: number;       // 0-100
  size?: number;       // px
  stroke?: number;     // px
  color?: string;
  bgColor?: string;
  label?: string;
  className?: string;
}

/** SVG 环形进度条（带动画） */
export default function ProgressRing({
  value, size = 80, stroke = 6, color = "var(--color-brand)",
  bgColor = "var(--color-gray-100)", label, className,
}: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference;

  return (
    <div className={`inline-flex flex-col items-center gap-1 ${className ?? ""}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* 背景环 */}
        <circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={bgColor} strokeWidth={stroke} />
        {/* 进度环 */}
        <circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      </svg>
      {/* 中心文字 */}
      <div className="absolute flex items-center justify-center"
        style={{ width: size, height: size }}>
        <span className="text-sm font-bold" style={{ color }}>
          {Math.round(value)}%
        </span>
      </div>
      {label && (
        <span className="text-[11px] font-medium" style={{ color: "var(--color-text-muted)" }}>
          {label}
        </span>
      )}
    </div>
  );
}
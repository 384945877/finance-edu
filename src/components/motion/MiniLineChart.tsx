"use client";

interface DataPoint {
  label?: string;
  value: number;
}

interface MiniLineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  showDots?: boolean;
  showLabels?: boolean;
  animate?: boolean;
  className?: string;
}

/** 纯 SVG 迷你折线图，支持渐变填充和动画 */
export default function MiniLineChart({
  data, width = 300, height = 120, color = "#22c55e",
  fillColor, showDots = true, showLabels = false, animate = true, className,
}: MiniLineChartProps) {
  if (data.length < 2) return null;

  const pad = { top: 10, right: 10, bottom: showLabels ? 24 : 10, left: 10 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: pad.left + (i / (data.length - 1)) * w,
    y: pad.top + h - ((d.value - min) / range) * h,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${pad.top + h} L${points[0].x},${pad.top + h} Z`;
  const gradId = `fill-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg width={width} height={height} className={className}
      viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColor ?? color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={fillColor ?? color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {/* 填充 */}
      <path d={areaPath} fill={`url(#${gradId})`}
        style={animate ? { opacity: 0, animation: "fadeIn 0.8s 0.3s forwards" } : undefined} />
      {/* 线 */}
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        style={animate ? {
          strokeDasharray: w * 2,
          strokeDashoffset: w * 2,
          animation: `lineGrow 1s ease-out forwards`,
        } : undefined} />
      {/* 点 */}
      {showDots && points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color}
          style={animate ? { opacity: 0, animation: `fadeIn 0.3s ${0.8 + i * 0.05}s forwards` } : undefined} />
      ))}
      {/* 标签 */}
      {showLabels && data.map((d, i) => (
        <text key={i} x={points[i].x} y={height - 4} textAnchor="middle"
          fill="var(--color-text-muted)" fontSize={9}>
          {d.label}
        </text>
      ))}
      <style>{`
        @keyframes lineGrow { to { stroke-dashoffset: 0; } }
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
    </svg>
  );
}